import http.client
import json
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from unittest.mock import patch

from evalkit import manager as m
from evalkit.catalog import catalog, SUITE_ID
from evalkit.history import history_report
from evalkit.studio import Handler, Studio, StudioError


class DeleteRunTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.root=Path(self.temp.name).resolve()
        self.patches=[patch.object(m,'ROOT',self.root),patch.object(m,'RUNS',self.root/'runs')]
        for item in self.patches: item.start()
        (self.root/'runs').mkdir()
        self.studio=Studio(self.root/'data')

    def tearDown(self):
        self.studio.worker.shutdown()
        for item in reversed(self.patches): item.stop()
        self.temp.cleanup()

    def run_fixture(self,ident='test-run'):
        run=m.RUNS/ident
        m.dump(run/'control/run.json',{'id':ident,'model':'测试模型','suiteId':SUITE_ID,
            'createdAt':'2026-10-20T00:00:00Z','tasks':{'01-svg':{'phase':'initial'}}})
        m.dump(run/'control/rubric.json',{'tasks':catalog()})
        m.dump(run/'control/review.json',{'revision':0,'artifacts':{},'scores':{},'scoreHistory':[]})
        m.write(run/'tasks/01-svg/solution/saved.txt','候选成果保持原样')
        return run

    def artifact(self,run,ident):
        base=self.studio.artifacts/ident
        m.write(base/'files/index.html','<!doctype html><html>saved</html>')
        files=m.manifest(base/'files')
        m.dump(base/'manifest.json',{'runId':run.name,'taskId':'01-svg',
            'phase':'initial','files':files})
        record={'id':ident,'sha256':m.digest(files),'entry':'index.html','fileCount':len(files)}
        self.reference(run,record)
        return base,record

    def reference(self,run,record):
        review=self.studio.review(run)
        review['artifacts'].setdefault('01-svg',{}).setdefault('initial',[]).append(record)
        m.dump(run/'control/review.json',review)

    def delete(self,ident='test-run'):
        return self.studio.delete_run(ident,{'confirmation':ident})

    def test_moves_run_and_artifacts_out_of_active_storage_and_preserves_bytes(self):
        run=self.run_fixture()
        artifact,_=self.artifact(run,'a'*32)
        before_run=m.manifest(run); before_artifact=m.manifest(artifact)
        self.assertTrue(history_report()['passed'])
        result=self.delete()
        trash=Path(result['trashPath'])
        self.assertTrue(result['deleted'])
        self.assertEqual(result['movedArtifactIds'],['a'*32])
        self.assertEqual(m.manifest(trash/'run'),before_run)
        self.assertEqual(m.manifest(trash/'artifacts'/('a'*32)),before_artifact)
        self.assertEqual(m.load(trash/'deletion.json')['originalRunPath'],str(run))
        self.assertFalse(run.exists()); self.assertFalse(artifact.exists())
        self.assertEqual(self.studio.runs(),[])
        report=history_report()
        self.assertTrue(report['passed']); self.assertEqual(report['runs'],0)
        self.assertEqual(report['artifacts'],[])
        with self.assertRaises(StudioError) as error: self.studio.detail(run.name)
        self.assertEqual(error.exception.status,404)

    def test_confirmation_must_match_complete_run_id(self):
        run=self.run_fixture()
        before=m.manifest(run)
        for body in ({},{'confirmation':True},{'confirmation':'测试模型'},
                     {'confirmation':'test'},{'confirmation':'test-run '},None):
            with self.subTest(body=body),self.assertRaisesRegex(StudioError,'完整运行编号'):
                self.studio.delete_run(run.name,body)
        self.assertEqual(m.manifest(run),before)
        self.assertFalse((self.root/'.trash').exists())

    def test_other_runs_and_shared_artifacts_are_retained(self):
        deleted=self.run_fixture(); other=self.run_fixture('keep-me')
        shared,record=self.artifact(other,'a'*32)
        self.reference(deleted,record)
        unique,_=self.artifact(deleted,'b'*32)
        other_before=m.manifest(other); shared_before=m.manifest(shared)
        result=self.delete()
        self.assertEqual(result['retainedArtifactIds'],['a'*32])
        self.assertEqual(result['movedArtifactIds'],['b'*32])
        self.assertEqual(m.manifest(other),other_before)
        self.assertEqual(m.manifest(shared),shared_before)
        self.assertFalse(unique.exists())
        self.assertEqual([r['id'] for r in self.studio.runs()],['keep-me'])
        report=history_report()
        self.assertTrue(report['passed'],report['problems'])
        self.assertEqual([a['id'] for a in report['artifacts']],['a'*32])

    def test_failed_rename_restores_every_completed_move(self):
        run=self.run_fixture()
        first,_=self.artifact(run,'a'*32)
        second,_=self.artifact(run,'b'*32)
        before={path:m.manifest(path) for path in (run,first,second)}
        rename=Path.rename
        def fail_run(source,destination):
            if source==run: raise OSError('injected move failure')
            return rename(source,destination)
        with patch.object(Path,'rename',fail_run),self.assertRaisesRegex(StudioError,'已恢复'):
            self.delete()
        for path,files in before.items(): self.assertEqual(m.manifest(path),files)
        self.assertEqual(list((self.root/'.trash/runs').iterdir()),[])

    def test_missing_old_artifact_does_not_prevent_cleanup_of_a_broken_test_run(self):
        run=self.run_fixture()
        self.reference(run,{'id':'a'*32})
        result=self.delete()
        self.assertEqual(result['missingArtifactIds'],['a'*32])
        self.assertFalse(run.exists())

    def test_invalid_ids_cannot_select_a_path_outside_runs(self):
        run=self.run_fixture()
        for ident in ('../test-run','/tmp/test-run','x/y','x\\y','.', '..'):
            with self.subTest(ident=ident),self.assertRaises(StudioError):
                self.delete(ident)
        self.assertTrue(run.exists())
        review=self.studio.review(run)
        review['artifacts']={'01-svg':{'initial':[{'id':'../outside'}]}}
        m.dump(run/'control/review.json',review)
        with self.assertRaisesRegex(StudioError,'成果引用记录无效'): self.delete()
        self.assertTrue(run.exists())

    def test_refuses_symlinked_run_or_host_owned_paths(self):
        run=self.run_fixture()
        outside=self.root/'outside'; outside.mkdir()
        cases=[run/'control/review.json',self.studio.artifacts,self.studio.data,self.root/'.trash']
        for path in cases:
            with self.subTest(path=path):
                original=path.with_name(path.name+'-original')
                if path.exists(): path.rename(original)
                target=original if original.exists() else outside
                path.symlink_to(target,target_is_directory=target.is_dir())
                try:
                    with self.assertRaises(StudioError): self.delete()
                    self.assertTrue(run.exists())
                finally:
                    path.unlink()
                    if original.exists(): original.rename(path)
        run.rename(outside/'saved-run')
        run.symlink_to(outside/'saved-run',target_is_directory=True)
        with self.assertRaises(StudioError): self.delete()
        self.assertTrue((outside/'saved-run/control/run.json').exists())

    def test_refuses_symlinked_artifact_directory_and_ambiguous_shared_reference(self):
        run=self.run_fixture()
        artifact,_=self.artifact(run,'a'*32)
        saved=self.root/'saved-artifact'; artifact.rename(saved)
        artifact.symlink_to(saved,target_is_directory=True)
        with self.assertRaises(StudioError): self.delete()
        artifact.unlink(); saved.rename(artifact)
        other=self.run_fixture('other')
        (other/'control/review.json').write_text('invalid json')
        with self.assertRaisesRegex(StudioError,'无法核对其他轮次'): self.delete()
        self.assertTrue(run.exists()); self.assertTrue(artifact.exists())

    def test_queued_and_running_jobs_block_only_their_run(self):
        self.run_fixture(); self.run_fixture('other')
        for state in ('queued','running'):
            self.studio.jobs={'job':{'runId':'test-run','status':state}}
            with self.subTest(state=state),self.assertRaises(StudioError) as error:
                self.delete()
            self.assertEqual(error.exception.status,409)
        result=self.delete('other')
        self.assertTrue(result['deleted'])
        self.studio.jobs={'job':{'runId':'test-run','status':'done'}}
        self.assertTrue(self.delete()['deleted'])

    def test_unlocked_background_job_registers_run_until_job_finishes(self):
        run=self.run_fixture()
        started=threading.Event(); finish=threading.Event()
        def operation():
            started.set()
            if not finish.wait(5): raise AssertionError('test did not release job')
            return {'runId':run.name}
        job=self.studio.submit('Test background operation',operation,locked=False,run_id=run.name)
        try:
            self.assertTrue(started.wait(2))
            self.assertEqual(self.studio.jobs[job['id']]['runId'],run.name)
            with self.assertRaises(StudioError) as error: self.delete()
            self.assertEqual(error.exception.status,409)
        finally: finish.set()
        self.studio.worker.shutdown()
        self.assertEqual(self.studio.jobs[job['id']]['status'],'done')
        self.assertTrue(self.delete()['deleted'])

    def test_delete_http_requires_csrf_and_exact_confirmation(self):
        run=self.run_fixture()
        server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
        server.studio=self.studio
        thread=threading.Thread(target=server.serve_forever,daemon=True); thread.start()
        def request(body,token=None):
            client=http.client.HTTPConnection('127.0.0.1',server.server_port)
            try:
                headers={'Content-Type':'application/json'}
                if token is not None: headers['X-Pelican-Token']=token
                client.request('DELETE','/api/runs/'+run.name,json.dumps(body),headers)
                response=client.getresponse()
                return response.status,json.loads(response.read())
            finally: client.close()
        try:
            self.assertEqual(request({'confirmation':run.name})[0],403)
            self.assertEqual(request({},self.studio.token)[0],400)
            status,body=request({'confirmation':run.name},self.studio.token)
            self.assertEqual(status,200); self.assertTrue(body['deleted'])
            self.assertEqual(request({'confirmation':run.name},self.studio.token)[0],404)
        finally:
            server.shutdown(); server.server_close(); thread.join()


if __name__=='__main__': unittest.main()
