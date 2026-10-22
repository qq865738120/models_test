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
        source=m.ROOT/'templates/03-dispatch/public/materials/mock-api.js'
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
const totals=()=>Promise.all(['all','pending','assigned','delivered'].map(async status=>(await api.query({status,page:1,pageSize:1})).total));
assert.deepEqual(await totals(),[2,2,0,0]);
await api.assign({ids:['a'],courierId:'P03'});
assert.deepEqual(await totals(),[2,1,1,0]);
for(const pageSize of [20,50,100]) {const page=await api.query({page:1,pageSize});assert.equal(page.items.length,2);assert.equal(page.total,2);assert.equal(page.pageSize,pageSize);}
assert.equal((await api.detail('a')).courierId,'P03');

'''
            test=Path(folder)/'test.mjs'; test.write_text(script)
            result=subprocess.run(['node',str(test)],capture_output=True,text=True,timeout=10)
            self.assertEqual(result.returncode,0,result.stderr)

    def test_rubrics_and_prompt_separation(self):
        standard=read_standard(m.ROOT/'llm-evaluation-standard.html')
        for task in catalog():
            self.assertEqual(sum(d['weight'] for d in task['rubric']),100)
            prompt=candidate_task(task['id'],standard)
            self.assertIn('output/answers.json' if task.get('delivery')=='answers-json' else 'output/index.html',prompt)
            for word in ('评分','权重','扣分','加权'):
                if task.get('scoringMode')!='objective': self.assertNotIn(word,prompt)
                self.assertNotIn(word,(m.ROOT/'rules/COMMON_RULES.md').read_text())

    def test_score_zero_missing_and_weighting(self):
        dims=[{'id':'structure','weight':25},{'id':'motion','weight':75}]
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

    def test_binary_scores_use_whole_weights_and_reject_partial_credit(self):
        dims=[{'id':'A','weight':35},{'id':'B','weight':65}]
        self.assertEqual(score_values(dims,{'A':1,'B':0},'binary'),({'A':1,'B':0},35))
        self.assertEqual(score_values(dims,{'A':1,'B':1},'binary')[1],100)
        self.assertEqual(score_values(dims,{'A':0,'B':0},'binary')[1],0)
        for value in (True,.5,2,10,-1,float('nan')):
            with self.subTest(value=value),self.assertRaises(StudioError):
                score_values(dims,{'A':value,'B':0},'binary')

    def test_hybrid_scores_use_binary_api_weights_and_manual_ten_point_scale(self):
        dims=[{'id':'query','weight':40,'scoring':'auto'},
              {'id':'visual','weight':60,'scoring':'manual'}]
        self.assertEqual(score_values(dims,{'query':1,'visual':5},'hybrid')[1],70)
        self.assertEqual(score_values(dims,{'query':0,'visual':10},'hybrid')[1],60)
        self.assertIsNone(score_values(dims,{'query':None,'visual':10},'hybrid')[1])
        for value in (.5,2,10,-1,True):
            with self.subTest(value=value),self.assertRaises(StudioError):
                score_values(dims,{'query':value,'visual':5},'hybrid')


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

    def test_static_import_and_freeze_ignore_browser_runtime_links(self):
        run=self.init(task='2'); project=run/'tasks/02-static'; studio=self.studio()
        profile=project/'.runtime/cdp-profile'
        profile.mkdir(parents=True)
        # Chrome uses an external, possibly stale socket symlink.
        (profile/'SingletonSocket').symlink_to(self.root/'missing-browser-socket')
        (profile/'SingletonCookie').symlink_to('missing-cookie')
        self.assertEqual(m.integrity(run,'02-static'),[])
        detail=studio.import_artifact(run.name,'02-static','initial')
        artifact=detail['tasks']['02-static']['artifacts']['initial'][0]
        self.assertEqual((studio.artifacts/artifact['id']/'files/index.html').read_bytes(),
                         (project/'output/index.html').read_bytes())
        m.snapshot(argparse.Namespace(run=str(run),task='2',phase='initial',allow_invalid=False))
        self.assertFalse((run/'control/snapshots/02-static/initial/project/.runtime').exists())
        m.release_change(run,'02-static',project)
        self.assertEqual(m.integrity(run,'02-static'),[])
        # Runtime exclusions must not weaken delivery link validation.
        (project/'output/leak').symlink_to(profile/'SingletonSocket')
        with self.assertRaisesRegex(ValueError,'越界'):
            m.integrity(run,'02-static')

    def test_immutable_versions_score_binding_and_persistence(self):
        run=self.init(); source=self.output(run); studio=self.studio()
        # Historical score-to-artifact binding stays unchanged when review is manual.
        pinned=m.load(run/'control/rubric.json')
        next(t for t in pinned['tasks'] if t['id']=='01-svg').pop('scoringMode',None)
        m.dump(run/'control/rubric.json',pinned)
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

    def binary_run(self):
        run=self.init(task='6')
        options={letter:'option '+letter for letter in 'ABCDEF'}
        question=lambda ident,weight,answer,multiple=False:{'id':ident,'question':ident,'weight':weight,
            'options':options,'multiple':multiple,'answer':answer,'scoring':'exact'}
        key={'version':'longread-qa-v2','phases':{
            'initial':[question('P01',20,'A'),question('P02',30,'B'),question('N01',50,'AC',True)],
            'change':[question('C01',60,'D'),question('C02',40,'A')]}}
        key_path=run/'control/private/06-memory/answer-key.json';m.dump(key_path,key)
        pinned=m.load(run/'control/rubric.json')
        spec=next(t for t in pinned['tasks'] if t['id']=='06-memory')
        rubric=lambda phase:[{'id':q['id'],'name':q['id'],'weight':q['weight'],'description':'核对答案',
            'anchors':[{'score':0,'text':'错误'},{'score':1,'text':'正确'}]} for q in key['phases'][phase]]
        spec.update(delivery='answers-json',scoringMode='objective',questionVersion=key['version'],
            answerKeySha256=m.sha(key_path),rubric=rubric('initial'),rubricChange=rubric('change'))
        m.dump(run/'control/rubric.json',pinned)
        return run,key

    def test_answers_import_auto_grades_archived_versions_and_blocks_manual_scores(self):
        run,key=self.binary_run();studio=self.studio()
        output=run/'tasks/06-memory/output';m.dump(output/'answers.json',{'P01':'a','P02':'D','N01':'C A'})
        first=studio.import_artifact(run.name,'06-memory','initial')
        artifact=first['tasks']['06-memory']['artifacts']['initial'][0]
        score=first['review']['scores'][artifact['id']]
        self.assertEqual(score['values'],{'P01':1,'P02':0,'N01':1})
        self.assertEqual(score['total'],70)
        self.assertEqual(score['autoGrade']['correct'],2)
        self.assertEqual(first['run']['taskScores']['06-memory']['initial']['score'],70)
        self.assertEqual(score['questionVersion'],key['version'])
        self.assertEqual(score['answerSha256'],m.sha(studio.artifacts/artifact['id']/'files/answers.json'))
        self.assertEqual(score['answerKeySha256'],m.sha(studio.artifacts/artifact['id']/'answer-key.json'))
        self.assertFalse((output/'index.html').exists())
        self.assertFalse((output/'answer-key.json').exists())
        self.assertFalse((studio.artifacts/artifact['id']/'files/answer-key.json').exists())
        with self.assertRaisesRegex(StudioError,'不允许手工修改'):
            studio.save_score(run.name,'06-memory','initial',{'revision':first['review']['revision'],
                'artifactId':artifact['id'],'values':{'P01':.5,'P02':1,'N01':1}})
        m.dump(output/'answers.json',{'P01':'D','P02':'B'})
        second=studio.import_artifact(run.name,'06-memory','initial')
        self.assertEqual(second['run']['taskScores']['06-memory']['initial']['score'],30)
        self.assertEqual(second['review']['scores'][artifact['id']],score)
        self.assertEqual(m.load(studio.artifacts/artifact['id']/'files/answers.json')['P01'],'a')
        self.assertEqual(self.studio().detail(run.name)['review']['scores'][artifact['id']]['total'],70)
        export=studio.export('csv')[0].decode()
        self.assertIn('scoring_mode,question_version,answer_key_sha256',export)
        self.assertIn('objective,longread-qa-v2',export)

    def test_evidence_tiers_import_with_partial_credit_and_cannot_be_manually_overridden(self):
        run,key=self.binary_run()
        key['version']='longread-qa-v2'
        for questions in key['phases'].values():
            for q in questions:
                q['options']={letter:'option '+letter for letter in 'ABCDEF'}
                q['scoring']='exact'
        q=key['phases']['initial'][-1]
        q.update(multiple=False,answer='C',scoring='evidence-tier',
                 creditByAnswer={'A':0,'B':0.5,'C':1,'D':0,'E':1,'F':0.5})
        key_path=run/'control/private/06-memory/answer-key.json';m.dump(key_path,key)
        pinned=m.load(run/'control/rubric.json')
        spec=next(t for t in pinned['tasks'] if t['id']=='06-memory')
        spec.update(scoringMode='objective',questionVersion=key['version'],answerKeySha256=m.sha(key_path))
        m.dump(run/'control/rubric.json',pinned)
        m.dump(run/'tasks/06-memory/output/answers.json',{'P01':'A','P02':'B','N01':'F'})
        studio=self.studio()
        detail=studio.import_artifact(run.name,'06-memory','initial')
        artifact=detail['tasks']['06-memory']['artifacts']['initial'][-1]
        score=detail['review']['scores'][artifact['id']]
        self.assertEqual(score['total'],75)
        self.assertEqual(score['values'],{'P01':1,'P02':1,'N01':0.5})
        self.assertEqual((score['autoGrade']['correct'],score['autoGrade']['partial']),(2,1))
        self.assertEqual(score['scoringMode'],'objective')
        self.assertEqual(score['autoGrade']['items'][-1]['creditByAnswer'],q['creditByAnswer'])
        with self.assertRaisesRegex(StudioError,'不允许手工修改'):
            studio.save_score(run.name,'06-memory','initial',{'revision':detail['review']['revision'],
                'artifactId':artifact['id'],'values':{'P01':1,'P02':1,'N01':1}})

    def test_binary_answer_scores_remain_locked_when_other_tasks_are_manual(self):
        run,_=self.binary_run()
        pinned=m.load(run/'control/rubric.json')
        next(t for t in pinned['tasks'] if t['id']=='06-memory')['scoringMode']='binary'
        m.dump(run/'control/rubric.json',pinned)
        m.dump(run/'tasks/06-memory/output/answers.json',{'P01':'A','P02':'B','N01':'AC'})
        studio=self.studio()
        detail=studio.import_artifact(run.name,'06-memory','initial')
        artifact=detail['tasks']['06-memory']['artifacts']['initial'][0]
        before=(run/'control/review.json').read_bytes()
        self.assertEqual(next(t for t in detail['rubric'] if t['id']=='06-memory')['scoringMode'],'binary')
        with self.assertRaisesRegex(StudioError,'不允许手工修改'):
            studio.save_score(run.name,'06-memory','initial',{'revision':detail['review']['revision'],
                'artifactId':artifact['id'],'values':{'P01':0,'P02':0,'N01':0}})
        self.assertEqual((run/'control/review.json').read_bytes(),before)

    def test_answers_snapshot_phase_keys_and_invalid_json(self):
        run,_=self.binary_run();studio=self.studio()
        output=run/'tasks/06-memory/output'
        m.dump(output/'answers.json',{'P01':'A','P02':'B','N01':'AC'})
        m.snapshot(argparse.Namespace(run=str(run),task='6',phase='initial',allow_invalid=False))
        m.write(output/'answers.json','{}')
        frozen=studio.import_artifact(run.name,'06-memory','initial')
        self.assertEqual(frozen['run']['taskScores']['06-memory']['initial']['score'],100)
        m.dump(output/'answers.json',{'P01':'A','P02':'B','N01':'AC'})
        m.release_change(run,'06-memory',run/'tasks/06-memory')
        m.dump(output/'answers.json',{'C01':'D','C02':'B'})
        changed=studio.import_artifact(run.name,'06-memory','change')
        artifact=changed['tasks']['06-memory']['artifacts']['change'][0]
        self.assertEqual(changed['review']['scores'][artifact['id']]['values'],{'C01':1,'C02':0})
        self.assertEqual(changed['run']['taskScores']['06-memory']['change']['score'],60)
        m.write(output/'answers.json','<script>alert("candidate")</script>')
        invalid=studio.import_artifact(run.name,'06-memory','change')
        artifact=invalid['tasks']['06-memory']['artifacts']['change'][-1]
        self.assertEqual(invalid['review']['scores'][artifact['id']]['total'],0)
        self.assertTrue(invalid['review']['scores'][artifact['id']]['autoGrade']['errors'])
        preview=(studio.artifacts/artifact['id']/'files/index.html').read_text()
        self.assertIn('&lt;script&gt;',preview);self.assertNotIn('<script>',preview)

    def test_answers_reject_mismatched_frozen_key_and_rubric(self):
        run,key=self.binary_run();studio=self.studio()
        m.dump(run/'tasks/06-memory/output/answers.json',{'P01':'A'})
        key['phases']['initial'][0]['answer']='D'
        m.dump(run/'control/private/06-memory/answer-key.json',key)
        with self.assertRaisesRegex(StudioError,'固定版本'):
            studio.import_artifact(run.name,'06-memory','initial')
        self.assertFalse(studio.review(run)['artifacts'])
        pinned=m.load(run/'control/rubric.json')
        spec=next(t for t in pinned['tasks'] if t['id']=='06-memory')
        spec['answerKeySha256']=m.sha(run/'control/private/06-memory/answer-key.json')
        spec['questionVersion']='another-version';m.dump(run/'control/rubric.json',pinned)
        with self.assertRaisesRegex(StudioError,'版本'):
            studio.import_artifact(run.name,'06-memory','initial')
        spec['questionVersion']=key['version'];spec['rubric'][0]['weight']=21
        m.dump(run/'control/rubric.json',pinned)
        with self.assertRaisesRegex(StudioError,'权重'):
            studio.import_artifact(run.name,'06-memory','initial')

    def test_historical_research_html_keeps_manual_scoring(self):
        run=self.init(task='6');studio=self.studio()
        pinned=m.load(run/'control/rubric.json')
        spec=next(t for t in pinned['tasks'] if t['id']=='06-memory')
        for field in ('delivery','scoringMode','questionVersion','answerKeySha256'): spec.pop(field,None)
        spec['rubric']=catalog()[0]['rubric']
        m.dump(run/'control/rubric.json',pinned)
        output=run/'tasks/06-memory/output';m.dump(output/'answers.json',{})
        with self.assertRaises(StudioError): studio.import_artifact(run.name,'06-memory','initial')
        m.write(output/'index.html','<!doctype html><html>旧版论文报告</html>')
        detail=studio.import_artifact(run.name,'06-memory','initial')
        artifact=detail['tasks']['06-memory']['artifacts']['initial'][0]
        self.assertNotIn(artifact['id'],detail['review']['scores'])
        detail=studio.save_score(run.name,'06-memory','initial',{'revision':detail['review']['revision'],
            'artifactId':artifact['id'],'values':{d['id']:7.5 for d in spec['rubric']}})
        self.assertEqual(detail['review']['scores'][artifact['id']]['total'],75)

    def test_model_edits_archive_and_export(self):
        run=self.init(); self.output(run); studio=self.studio()
        d=studio.import_artifact(run.name,'01-svg','initial'); a=d['tasks']['01-svg']['artifacts']['initial'][0]
        studio.save_score(run.name,'01-svg','initial',{'revision':1,'artifactId':a['id'],'values':{d['id']:None if d.get('scoring')=='auto' else 0 for d in catalog()[0]['rubric']}})
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
