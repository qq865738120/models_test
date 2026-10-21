import argparse
import http.client
import json
import shutil
import subprocess
import threading
import unittest
from http.server import ThreadingHTTPServer
from unittest.mock import patch

import test_lifecycle as fixture
from evalkit import manager as m
from evalkit import launcher
from evalkit.history import history_report, verify_history
from evalkit.studio import ArtifactHandler, Handler, Studio


class HistoryTests(unittest.TestCase):
    setUp=fixture.LifecycleTests.setUp
    tearDown=fixture.LifecycleTests.tearDown
    init=fixture.LifecycleTests.init

    def archive(self):
        run=self.init(task='all')
        # This fixture represents the historical five-HTML-task suite, even
        # when a later catalog changes the fifth task's delivery format.
        rubric=m.load(run/'control/rubric.json')
        rubric['tasks']=[task for task in rubric['tasks'] if task['id']!='02-static']
        for task in rubric['tasks']:
            task.pop('delivery',None); task.pop('scoringMode',None)
            task['number']=task['id'].split('-',1)[0]
        m.dump(run/'control/rubric.json',rubric)
        meta=m.load(run/'control/run.json')
        meta['tasks'].pop('02-static')
        m.dump(run/'control/run.json',meta)
        baseline=m.load(run/'control/baseline.json'); baseline.pop('02-static')
        m.dump(run/'control/baseline.json',baseline)
        for relative in ('tasks/02-static','control/private/02-static'):
            shutil.rmtree(run/relative)
        (run/'control/prompts/02-static-initial.txt').unlink()
        studio=Studio(self.root/'data')
        self.addCleanup(studio.worker.shutdown)
        for key in meta['tasks']:
            output=run/'tasks'/key/'output'
            m.write(output/'index.html','<!doctype html><html><button onclick="this.textContent=\'ok\'">Play</button><script src="dist/app.js"></script></html>')
            m.write(output/'dist/app.js','document.body.dataset.ready="yes"')
            (output/'vendor').mkdir(exist_ok=True)
            (output/'vendor/physics.wasm').write_bytes(b'\x00asm\x01\x00\x00\x00')
            studio.import_artifact(run.name,key,'initial')
        return run,studio

    def test_all_tasks_replay_without_prepared_or_source_workspaces(self):
        run,studio=self.archive()
        before=m.manifest(run/'control')
        shutil.rmtree(run/'tasks')
        shutil.rmtree(self.prepared)
        report=verify_history(argparse.Namespace(tracked=False))
        self.assertTrue(report['passed'])
        self.assertEqual(len(report['artifacts']),5)
        self.assertEqual(m.manifest(run/'control'),before)

        admin=ThreadingHTTPServer(('127.0.0.1',0),Handler); admin.studio=studio
        preview=ThreadingHTTPServer(('127.0.0.1',0),ArtifactHandler); preview.studio=studio
        studio.preview_origin=f'http://127.0.0.1:{preview.server_port}'
        preview.admin_origin=f'http://127.0.0.1:{admin.server_port}'
        for server in (admin,preview):
            threading.Thread(target=server.serve_forever,daemon=True).start()
            self.addCleanup(server.server_close); self.addCleanup(server.shutdown)
        def get(server,path):
            conn=http.client.HTTPConnection('127.0.0.1',server.server_port,timeout=5)
            conn.request('GET',path); response=conn.getresponse()
            result=response.status,dict(response.getheaders()),response.read()
            conn.close(); return result
        self.assertEqual(get(admin,'/api/bootstrap')[0],200)
        status,_,body=get(admin,'/api/runs/'+run.name)
        self.assertEqual(status,200)
        detail=json.loads(body)
        for key in detail['tasks']:
            artifact=detail['tasks'][key]['artifacts']['initial'][0]
            root=f"/artifacts/{artifact['id']}/"
            for resource in ('index.html','dist/app.js','vendor/physics.wasm'):
                status,headers,body=get(preview,root+resource)
                self.assertEqual(status,200,(key,resource))
                if resource.endswith('.wasm'):
                    self.assertEqual(headers['Content-Type'],'application/wasm')
                    self.assertEqual(body,b'\x00asm\x01\x00\x00\x00')

    def test_missing_or_modified_resource_fails_without_rewriting_history(self):
        run,studio=self.archive()
        before=m.manifest(run/'control')
        asset=next(studio.artifacts.glob('*/files/dist/app.js'))
        asset.write_text('changed')
        self.assertFalse(history_report()['passed'])
        asset.unlink()
        with self.assertRaisesRegex(ValueError,'历史作品校验未通过'):
            verify_history(argparse.Namespace(tracked=False))
        self.assertEqual(m.manifest(run/'control'),before)

    def test_tracked_check_detects_ignored_artifact_resource(self):
        _,studio=self.archive()
        subprocess.run(['git','init','-q',str(self.root)],check=True,capture_output=True)
        m.write(self.root/'.gitignore','node_modules/\n.runtime/\n/web/dist/\n**/tasks/*/dist/\n')
        subprocess.run(['git','-C',str(self.root),'add','.gitignore','runs','data'],check=True,capture_output=True)
        self.assertTrue(history_report(tracked=True)['passed'])
        asset=next(studio.artifacts.glob('*/files/dist/app.js'))
        subprocess.run(['git','-C',str(self.root),'rm','--cached',str(asset)],check=True,capture_output=True)
        report=history_report(tracked=True)
        self.assertFalse(report['passed'])
        self.assertTrue(any('尚未纳入Git' in p and 'dist/app.js' in p for p in report['problems']))

    def test_answer_archive_keeps_its_generated_html_preview(self):
        run,studio=self.archive()
        review=m.load(run/'control/review.json')
        artifact=review['artifacts']['06-memory']['initial'][0]
        base=studio.artifacts/artifact['id']
        m.write(base/'files/answers.json','{"answers":{}}')
        files=m.manifest(base/'files')
        artifact.update(entry='answers.json',delivery='answers-json',sha256=m.digest(files),fileCount=len(files))
        manifest=m.load(base/'manifest.json'); manifest['files']=files
        m.dump(base/'manifest.json',manifest); m.dump(run/'control/review.json',review)
        self.assertTrue(history_report()['passed'])
        (base/'files/index.html').unlink()
        self.assertFalse(history_report()['passed'])

    def test_answer_archive_verifies_private_key_content_and_tracking(self):
        from evalkit.objective import answer_key
        run=self.init(task='6');key=answer_key()
        m.dump(run/'control/private/06-memory/answer-key.json',key)
        m.dump(run/'tasks/06-memory/output/answers.json',{q['id']:q['answer'] for q in key['phases']['initial']})
        studio=Studio(self.root/'data');self.addCleanup(studio.worker.shutdown)
        detail=studio.import_artifact(run.name,'06-memory','initial')
        artifact=detail['tasks']['06-memory']['artifacts']['initial'][0]
        key_path=studio.artifacts/artifact['id']/'answer-key.json'
        original=key_path.read_bytes()
        self.assertTrue(history_report()['passed'])
        key_path.write_text('{}')
        report=history_report()
        self.assertFalse(report['passed'])
        self.assertTrue(any('归档标准答案' in p for p in report['problems']))
        key_path.unlink()
        self.assertFalse(history_report()['passed'])
        key_path.write_bytes(original)
        subprocess.run(['git','init','-q',str(self.root)],check=True,capture_output=True)
        subprocess.run(['git','-C',str(self.root),'add','runs','data'],check=True,capture_output=True)
        self.assertTrue(history_report(tracked=True)['passed'])
        subprocess.run(['git','-C',str(self.root),'rm','--cached',str(key_path)],check=True,capture_output=True)
        report=history_report(tracked=True)
        self.assertFalse(report['passed'])
        self.assertTrue(any('尚未纳入Git' in p and p.endswith('/answer-key.json') for p in report['problems']))

    def test_launch_installs_only_workbench_and_refreshes_changed_lock(self):
        web=self.root/'web'
        m.write(web/'package.json','{}'); m.write(web/'package-lock.json','first')
        args=argparse.Namespace(port=8787,open=False)
        def install(*argv,**kwargs): (web/'node_modules').mkdir(exist_ok=True)
        with patch.object(launcher,'verify_history') as verify,patch.object(launcher,'serve') as serve, \
                patch.object(launcher.shutil,'which',return_value='/tools/npm'), \
                patch.object(m,'version',return_value='test'), \
                patch.object(launcher.subprocess,'run',side_effect=install) as run:
            launcher.launch(args)
            self.assertEqual([c.args[0][1:] for c in run.call_args_list],[['ci'],['run','build']])
            self.assertTrue(all(c.kwargs['cwd']==web for c in run.call_args_list))
            run.reset_mock(); launcher.launch(args)
            self.assertEqual([c.args[0][1:] for c in run.call_args_list],[['run','build']])
            m.write(web/'package-lock.json','second')
            run.reset_mock(); launcher.launch(args)
            self.assertEqual([c.args[0][1:] for c in run.call_args_list],[['ci'],['run','build']])
            self.assertEqual(verify.call_count,3); self.assertEqual(serve.call_count,3)


if __name__=='__main__': unittest.main()
