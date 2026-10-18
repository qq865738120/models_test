import argparse
import http.client
import json
import threading
import subprocess
import tempfile
import unittest
from pathlib import Path
from http.server import ThreadingHTTPServer

import test_lifecycle as fixture
from evalkit import manager as m
from evalkit.catalog import catalog, candidate_task
from evalkit.standard import read_standard
from evalkit.studio import Studio, StudioError, Handler, ArtifactHandler, score_values, safe_file


class ScoreTests(unittest.TestCase):
    def test_browser_mock_atomic_failure_and_response_race(self):
        source=m.ROOT/'templates/02-dispatch/public/materials/mock-api.js'
        with tempfile.TemporaryDirectory() as folder:
            module=Path(folder)/'mock.mjs'; module.write_bytes(source.read_bytes())
            script='''import assert from 'node:assert/strict';
import {createMockApiFromData} from './mock.mjs';
const api=createMockApiFromData([{id:'a',customer:'A',address:'x',status:'pending'},{id:'b',customer:'B',address:'x',status:'pending'}]);
api.control({delays:{a:40,b:0}});
const order=[];await Promise.all([api.query({q:'a'}).then(()=>order.push('a')),api.query({q:'b'}).then(()=>order.push('b'))]);assert.deepEqual(order,['b','a']);
api.control({failNextAssign:true});await assert.rejects(api.assign({ids:['a','b'],courierId:'P01'}));assert.equal((await api.detail('a')).status,'pending');
const result=await Promise.allSettled([api.assign({ids:['a'],courierId:'P01'}),api.assign({ids:['a','b'],courierId:'P02'})]);assert.equal(result[0].status,'fulfilled');assert.equal(result[1].status,'rejected');assert.equal((await api.detail('b')).status,'pending');
api.control({reset:true});assert.equal((await api.detail('a')).status,'pending');
'''
            test=Path(folder)/'test.mjs'; test.write_text(script)
            result=subprocess.run(['node',str(test)],capture_output=True,text=True,timeout=10)
            self.assertEqual(result.returncode,0,result.stderr)

    def test_rubrics_and_prompt_separation(self):
        standard=read_standard(m.ROOT/'llm-evaluation-standard.html')
        for task in catalog():
            self.assertEqual(sum(d['weight'] for d in task['rubric']),100)
            prompt=candidate_task(task['id'],standard)
            self.assertIn('output/index.html',prompt)
            for word in ('评分','权重','扣分','加权'):
                self.assertNotIn(word,prompt)
                self.assertNotIn(word,(m.ROOT/'rules/COMMON_RULES.md').read_text())

    def test_score_zero_missing_and_weighting(self):
        dims=catalog()[0]['rubric']
        values={d['id']:0 for d in dims}
        self.assertEqual(score_values(dims,values)[1],0)
        values[dims[0]['id']]=10
        self.assertEqual(score_values(dims,values)[1],25)
        del values[dims[1]['id']]
        self.assertIsNone(score_values(dims,values)[1])

    def test_rejects_invalid_scores(self):
        dims=catalog()[0]['rubric']; key=dims[0]['id']
        for value in (True,-1,11,float('nan'),float('inf'),'5'):
            with self.subTest(value=value),self.assertRaises(StudioError): score_values(dims,{key:value})
        with self.assertRaises(StudioError): score_values(dims,{'unknown':5})


class StudioTests(unittest.TestCase):
    setUp=fixture.LifecycleTests.setUp
    tearDown=fixture.LifecycleTests.tearDown
    init=fixture.LifecycleTests.init

    def studio(self):
        studio=Studio(self.root/'data')
        self.addCleanup(studio.worker.shutdown)
        return studio

    def output(self,run,text='first'):
        source=run/'tasks/01-svg/output'
        m.write(source/'index.html',f'<!doctype html><html><body>{text}<script src="app.js"></script></body></html>')
        m.write(source/'app.js','document.body.dataset.loaded="yes"')
        return source

    def test_immutable_versions_score_binding_and_persistence(self):
        run=self.init(); source=self.output(run); studio=self.studio()
        detail=studio.import_artifact(run.name,'01-svg','initial')
        artifact=detail['tasks']['01-svg']['artifacts']['initial'][0]
        values={d['id']:8 for d in catalog()[0]['rubric']}
        body={'revision':detail['review']['revision'],'artifactId':artifact['id'],'values':values,'notes':'evidence'}
        updated=studio.save_score(run.name,'01-svg','initial',body)
        self.assertEqual(updated['run']['taskScores']['01-svg']['initial']['score'],80)
        with self.assertRaises(StudioError) as error: studio.save_score(run.name,'01-svg','initial',body)
        self.assertEqual(error.exception.status,409)
        self.output(run,'second')
        again=studio.import_artifact(run.name,'01-svg','initial')
        self.assertIsNone(again['run']['taskScores']['01-svg']['initial']['score'])
        self.assertIn('first',(studio.artifacts/artifact['id']/'files/index.html').read_text())
        restarted=self.studio(); restarted.preview_origin='http://127.0.0.1:9000'
        saved=restarted.detail(run.name)
        self.assertEqual(saved['review']['scores'][artifact['id']]['total'],80)
        self.assertTrue(saved['tasks']['01-svg']['artifacts']['initial'][0]['url'].startswith(restarted.preview_origin))
        with self.assertRaises(StudioError): studio.save_score(run.name,'01-svg','change',{**body,'revision':again['review']['revision']})

    def test_frozen_source_and_invalid_integrity(self):
        run=self.init(); self.output(run); studio=self.studio()
        m.snapshot(argparse.Namespace(run=str(run),task='1',phase='initial',allow_invalid=False))
        self.output(run,'after freeze')
        d=studio.import_artifact(run.name,'01-svg','initial')
        a=d['tasks']['01-svg']['artifacts']['initial'][0]
        self.assertIn('first',(studio.artifacts/a['id']/'files/index.html').read_text())
        other=self.init('invalid'); self.output(other)
        m.write(other/'tasks/01-svg/TASK.md','tampered')
        result=studio.import_artifact(other.name,'01-svg','initial')
        self.assertFalse(result['run']['taskScores']['01-svg']['initial']['eligible'])

    def test_rejects_traversal_symlinks_and_non_html(self):
        run=self.init(); source=self.output(run); studio=self.studio()
        for name in ('../TASK.md','/etc/passwd','.hidden','nested/../../TASK.md','x\\file'):
            with self.assertRaises(StudioError): safe_file(source,name)
        m.write(source/'index.html','not html')
        with self.assertRaises(StudioError): studio.import_artifact(run.name,'01-svg','initial')
        self.output(run)
        (source/'linked').symlink_to(source/'app.js')
        with self.assertRaises(StudioError): studio.import_artifact(run.name,'01-svg','initial')

    def test_model_edits_archive_and_export(self):
        run=self.init(); self.output(run); studio=self.studio()
        d=studio.import_artifact(run.name,'01-svg','initial'); a=d['tasks']['01-svg']['artifacts']['initial'][0]
        studio.save_score(run.name,'01-svg','initial',{'revision':1,'artifactId':a['id'],'values':{d['id']:0 for d in catalog()[0]['rubric']}})
        d=studio.update_run(run.name,{'model':'=unsafe','archived':True,'notes':'local'})
        self.assertTrue(d['run']['archived'])
        self.assertIn("'=unsafe",studio.export('csv')[0].decode())
        self.assertEqual(json.loads(studio.export('json')[0])['records'][0]['run']['model'],'=unsafe')

    def test_http_boundaries_and_preview(self):
        run=self.init(); self.output(run); studio=self.studio()
        admin=ThreadingHTTPServer(('127.0.0.1',0),Handler); admin.studio=studio
        preview=ThreadingHTTPServer(('127.0.0.1',0),ArtifactHandler); preview.studio=studio
        studio.preview_origin=f'http://127.0.0.1:{preview.server_port}'
        preview.admin_origin=f'http://127.0.0.1:{admin.server_port}'
        for server in (admin,preview):
            threading.Thread(target=server.serve_forever,daemon=True).start()
            self.addCleanup(server.server_close); self.addCleanup(server.shutdown)
        def request(server,path,method='GET',body=None,headers=None):
            conn=http.client.HTTPConnection('127.0.0.1',server.server_port)
            conn.request(method,path,json.dumps(body) if body is not None else None,headers or {})
            response=conn.getresponse(); result=(response.status,dict(response.getheaders()),response.read());conn.close();return result
        self.assertEqual(request(admin,'/api/bootstrap')[0],200)
        self.assertEqual(request(admin,'/api/bootstrap',headers={'Host':'evil.invalid'})[0],403)
        self.assertEqual(request(admin,'/api/bootstrap',headers={'Origin':'null'})[0],403)
        self.assertEqual(request(admin,'/api/runs/'+run.name,'PATCH',{'model':'changed'})[0],403)
        headers={'X-Pelican-Token':studio.token,'Content-Type':'application/json','Origin':preview.admin_origin}
        self.assertEqual(request(admin,'/api/runs/'+run.name,'PATCH',{'model':'changed'},headers)[0],200)
        self.assertEqual(request(admin,'/api/runs','POST',{'model':'m','task':[]},headers)[0],400)
        self.assertEqual(request(admin,'/api/bootstrap',headers={'Origin':studio.preview_origin})[0],403)
        d=studio.import_artifact(run.name,'01-svg','initial'); a=d['tasks']['01-svg']['artifacts']['initial'][0]
        status,headers,body=request(preview,f"/artifacts/{a['id']}/index.html")
        self.assertEqual(status,200);self.assertIn(b'first',body)
        self.assertIn('sandbox allow-scripts;',headers['Content-Security-Policy'])
        self.assertNotIn('allow-same-origin',headers['Content-Security-Policy'])
        self.assertEqual(headers['Access-Control-Allow-Origin'],'*')
        self.assertEqual(request(preview,f"/artifacts/{a['id']}/../manifest.json")[0],404)
        self.assertEqual(request(preview,'/api/bootstrap')[0],404)


if __name__=='__main__': unittest.main()
