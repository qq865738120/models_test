import contextlib
import copy
import http.client
import json
import os
import secrets
import shutil
import subprocess
import sys
import tempfile
import threading
import time
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch
from urllib.parse import parse_qs, urlsplit

from evalkit import manager as m
from evalkit import fullstack
from evalkit.http_checks import grade_api
from evalkit.studio import ArtifactHandler, Studio, StudioError
from evalkit.history import history_report


class ContractServer:
    """Trusted test-only HTTP fixture; never distributed into candidate workspaces."""
    def __init__(self, seed, broken_query=False, omit_detail_field=False):
        self.seed=copy.deepcopy(seed)
        self.broken_query=broken_query
        self.omit_detail_field=omit_detail_field
        self.lock=threading.Lock()
        self.server=None

    @property
    def base_url(self):
        return f'http://127.0.0.1:{self.server.server_port}'

    def start(self):
        owner=self
        self.orders=copy.deepcopy(self.seed)
        class Handler(BaseHTTPRequestHandler):
            def log_message(self,*args): pass
            def send(self,status,payload):
                data=json.dumps(payload).encode()
                self.send_response(status); self.send_header('Content-Type','application/json')
                self.send_header('Content-Length',str(len(data))); self.end_headers();self.wfile.write(data)
            def error(self,status):
                self.send(status,{'error':{'code':{400:'INVALID_ARGUMENT',404:'NOT_FOUND',409:'CONFLICT'}[status],'message':'fixture error'}})
            def do_GET(self):
                url=urlsplit(self.path)
                with owner.lock:
                    rows=copy.deepcopy(owner.orders)
                if url.path=='/health': return self.send(200,{'ok':True})
                if url.path=='/api/couriers':
                    return self.send(200,{'items':[{'id':key,'name':name} for key,name in
                        [('P01','鹈鹕一号'),('P02','鹈鹕二号'),('P03','鹈鹕三号')]]})
                if url.path=='/api/stats':
                    return self.send(200,{'all':len(rows),'updatedAt':m.now(),
                        **{s:sum(row['status']==s for row in rows) for s in ['pending','assigned','delivered']}})
                if url.path.startswith('/api/orders/'):
                    row=next((r for r in rows if r['id']==url.path.split('/')[-1]),None)
                    if row and owner.omit_detail_field:
                        row.pop('courierId',None)
                    return self.send(200,row) if row else self.error(404)
                if url.path!='/api/orders': return self.error(404)
                params=parse_qs(url.query,keep_blank_values=True)
                if set(params)-{'q','status','page','pageSize'} or any(len(v)!=1 for v in params.values()):
                    return self.error(400)
                try:
                    page=int(params.get('page',['1'])[0]);size=int(params.get('pageSize',['20'])[0])
                    if not 1<=page<=9007199254740991 or not 1<=size<=100: raise ValueError()
                except ValueError: return self.error(400)
                status=params.get('status',['all'])[0];q=params.get('q',[''])[0].strip().lower()
                if status not in ('all','pending','assigned','delivered'): return self.error(400)
                rows=[r for r in rows if (status=='all' or r['status']==status) and
                      any(q in str(r[key]).lower() for key in ('id','customer','address'))]
                rows.sort(key=lambda r:r['id'])
                total=len(rows)+(1 if owner.broken_query else 0)
                self.send(200,{'items':rows[(page-1)*size:page*size],'total':total,'page':page,'pageSize':size})
            def do_POST(self):
                if self.path!='/api/assign': return self.error(404)
                try:
                    if self.headers.get('Content-Type','').split(';')[0]!='application/json': raise ValueError()
                    body=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
                    if not isinstance(body,dict) or set(body)!={'ids','courierId'}: raise ValueError()
                    ids=body['ids'];courier=body['courierId']
                    if (not isinstance(ids,list) or not 1<=len(ids)<=100 or
                            any(not isinstance(key,str) or not key for key in ids) or len(set(ids))!=len(ids) or
                            courier not in ('P01','P02','P03')): raise ValueError()
                except (ValueError,TypeError): return self.error(400)
                with owner.lock:
                    mapping={row['id']:row for row in owner.orders}
                    if any(key not in mapping for key in ids): return self.error(404)
                    selected=[mapping[key] for key in ids]
                    if any(row['status']!='pending' for row in selected): return self.error(409)
                    for row in selected: row.update(status='assigned',courierId=courier)
                    self.send(200,{'items':selected})
        self.server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
        self.thread=threading.Thread(target=self.server.serve_forever,daemon=True);self.thread.start()
        return self

    def close(self):
        if self.server:
            self.server.shutdown();self.server.server_close();self.thread.join()
            self.server=None

    def restart(self):
        self.close();return self.start()


class HTTPGradeTests(unittest.TestCase):
    def setUp(self):
        from evalkit.dispatch import seed_orders
        self.seed=seed_orders()
    def server(self,broken=False):
        server=ContractServer(self.seed,broken).start()
        self.addCleanup(server.close);return server
    def test_black_box_checks_and_restart_are_all_observed(self):
        server=self.server()
        report=grade_api(server.base_url,self.seed,restart=server.restart)
        self.assertTrue(report['checks'])
        self.assertTrue(all(row['passed'] is True for row in report['checks']),report)
        self.assertEqual({r['group'] for r in report['checks']},
                         {'architecture','query','assignment','validation','consistency','runtime'})
    def test_wrong_query_is_not_accepted_and_unrun_restart_is_unknown(self):
        server=self.server(True)
        report=grade_api(server.base_url,self.seed)
        by_id={r['id']:r for r in report['checks']}
        self.assertFalse(by_id['default_page']['passed'])
        self.assertIsNone(by_id['restart_resets_seed']['passed'])
        self.assertTrue(by_id['concurrent_assignment']['passed'])
    def test_missing_nullable_detail_field_is_not_equal_to_present_null(self):
        server=ContractServer(self.seed,omit_detail_field=True).start()
        self.addCleanup(server.close)
        rows={row['id']:row for row in grade_api(server.base_url,self.seed)['checks']}
        self.assertFalse(rows['detail']['passed'])
        self.assertFalse(rows['read_after_write']['passed'])


class FullstackTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.root=Path(self.temp.name).resolve()
        self.patch=patch.object(m,'ROOT',self.root);self.patch.start()
        self.runs_patch=patch.object(m,'RUNS',self.root/'runs');self.runs_patch.start()
        self.studio=Studio(self.root/'data')
    def tearDown(self):
        self.studio.worker.shutdown()
        self.runs_patch.stop();self.patch.stop();self.temp.cleanup()
    def make_run(self,delivery='fullstack-node',key='03-dispatch'):
        run=self.root/'runs/test-run';project=run/'tasks'/key
        m.write(project/'output/index.html','<!doctype html><html>test</html>')
        m.write(project/'output/server/index.mjs','throw new Error("must not execute during import");')
        m.dump(project/'output/server/data/orders.json',[])
        m.dump(run/'control/baseline.json',{key:m.manifest(project)})
        m.dump(run/'control/run.json',{'id':run.name,'suiteId':m.SUITE_ID,'model':'test','repeat':1,
            'createdAt':m.now(),'rubricVersion':'test','bundleSha256':'fixture','materialVersion':'fixture',
            'tasks':{key:{'phase':'initial','initialSnapshot':None,'changeSnapshot':None}}})
        task={'id':key,'number':key[:2],
            'delivery':delivery,'scoringMode':'hybrid','automationVersion':'old-checks',
            'scoringGuidance':'自动核验后自动评分，不能人工修改。','rubric':[
                {'id':'query' if key=='03-dispatch' else 'api','weight':50,'scoring':'auto','description':'自动核验接口',
                 'checks':['自动验收接口成功和失败响应'],'anchors':[]},
                {'id':'visual','weight':50,'scoring':'manual'}]}
        if key in ('01-svg','02-static','05-game3d'):
            from evalkit.task_revision import RUBRICS, CHANGES
            task.update(rubric=copy.deepcopy(RUBRICS[key]),rubricChange=copy.deepcopy(CHANGES[key]))
        if key=='04-game2d':
            from evalkit.catalog import catalog
            current=next(t for t in catalog() if t['id']==key)
            task.update(rubric=current['rubric'],rubricChange=current['rubricChange'])
            task['rubric'] += [{'id':'accessibility','weight':10,'scoring':'auto'},
                               {'id':'delivery','weight':5,'scoring':'auto'}]
            task['rubricChange'].append({'id':'delivery','weight':5,'scoring':'auto'})
        if key in ('01-svg','02-static','04-game2d','05-game3d'):
            task['rubric'][0].update(description='自动核验接口',checks=['自动验收接口成功和失败响应'])
            for field in ('rubric','rubricChange'):
                for dimension in task[field]: dimension['scoring']='auto'
        m.dump(run/'control/rubric.json',{'version':'test','tasks':[task]})
        return run,project
    def imported(self,delivery='fullstack-node',key='03-dispatch'):
        run,project=self.make_run(delivery,key)
        with patch('subprocess.Popen',side_effect=AssertionError('import must not run code')):
            detail=self.studio.import_artifact(run.name,key,'initial')
        artifact=detail['tasks'][key]['artifacts']['initial'][0]
        return run,project,detail,artifact
    def preview(self):
        server=ThreadingHTTPServer(('127.0.0.1',0),ArtifactHandler)
        server.studio=self.studio;server.admin_origin='http://127.0.0.1:8787'
        self.studio.preview_origin=f'http://127.0.0.1:{server.server_port}'
        threading.Thread(target=server.serve_forever,daemon=True).start()
        self.addCleanup(server.server_close);self.addCleanup(server.shutdown)
        return server
    def call(self,server,path,method='GET',body=None,headers=None):
        connection=http.client.HTTPConnection('127.0.0.1',server.server_port,timeout=2)
        connection.request(method,path,body=body,headers=headers or {})
        response=connection.getresponse();data=response.read()
        result=response.status,dict(response.getheaders()),data
        connection.close();return result
    def test_import_archives_backend_without_execution_and_history_checks_it(self):
        run,_,_,artifact=self.imported()
        base,checksum=fullstack.validate_artifact(artifact['id'],self.studio.data)
        self.assertEqual(checksum,artifact['sha256'])
        self.assertEqual(artifact['delivery'],'fullstack-node')
        self.assertTrue(history_report()['passed'])
        (base/'files/server/index.mjs').unlink()
        self.assertFalse(history_report()['passed'])
        with self.assertRaisesRegex(ValueError,'完整性'):fullstack.validate_artifact(artifact['id'],self.studio.data)
    def test_missing_backend_entry_rejected(self):
        run,project=self.make_run()
        (project/'output/server/index.mjs').unlink()
        with self.assertRaises(StudioError):self.studio.import_artifact(run.name,'03-dispatch','initial')
    def test_static_preview_hides_backend_and_unstarted_api_is_503(self):
        _,_,_,artifact=self.imported();server=self.preview();prefix='/artifacts/'+artifact['id']
        self.assertEqual(self.call(server,prefix+'/index.html')[0],200)
        self.assertEqual(self.call(server,prefix+'/server/index.mjs')[0],404)
        self.assertEqual(self.call(server,prefix+'/server/data/orders.json')[0],404)
        self.assertEqual(self.call(server,prefix+'/api/orders')[0],503)
        self.assertEqual(self.call(server,prefix+'/api/assign','POST','{}',{'Content-Type':'application/json','Origin':'null'})[0],503)
        self.assertEqual(self.call(server,prefix+'/api/assign','POST','{}',{'Content-Type':'application/json','Origin':'https://example.invalid'})[0],403)
        status,headers,_=self.call(server,prefix+'/api/assign','OPTIONS',headers={'Origin':'null',
            'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type'})
        self.assertEqual(status,204);self.assertEqual(headers['Access-Control-Allow-Origin'],'*')
        self.assertFalse(self.studio.backend_status(artifact['id'])['running'])
    def test_old_html_does_not_gain_backend_routes_or_execution(self):
        _,_,_,artifact=self.imported('html');server=self.preview();prefix='/artifacts/'+artifact['id']
        self.assertEqual(self.call(server,prefix+'/server/index.mjs')[0],200)
        self.assertEqual(self.call(server,prefix+'/api/orders')[0],404)
        self.assertEqual(self.call(server,prefix+'/api/assign','POST','{}',{'Content-Type':'application/json'})[0],405)
        self.assertEqual(self.studio.backend_status(artifact['id'])['status'],'unavailable')
    def test_historical_hybrid_dimensions_are_manually_editable_and_history_is_retained(self):
        run,_,detail,artifact=self.imported(key='01-svg')
        body={'revision':detail['review']['revision'],'artifactId':artifact['id'],
              'values':{'anatomy':10,'pedals':10,'expression':5}}
        saved=self.studio.save_score(run.name,'01-svg','initial',body)
        self.assertEqual(saved['review']['scores'][artifact['id']]['total'],80)
        review=self.studio.review(run)
        historical={'artifactId':artifact['id'],'values':{'anatomy':10,'pedals':10,'expression':None},
            'automation':{'checks':[{'id':'health','passed':True}]},'total':None}
        review['scores'][artifact['id']]=historical
        m.dump(run/'control/review.json',review)
        saved=self.studio.save_score(run.name,'01-svg','initial',
            {**body,'revision':review['revision'],'values':{'anatomy':5,'pedals':5,'expression':5}})
        score=saved['review']['scores'][artifact['id']]
        self.assertEqual(score['total'],50)
        self.assertEqual(score['scoringMode'],'manual')
        self.assertNotIn('automation',score)
        self.assertEqual(saved['review']['scoreHistory'][-1],historical)
    def test_creative_tasks_allow_manual_scores_without_automatic_prerequisite(self):
        for key in ('01-svg','02-static','04-game2d','05-game3d'):
            with self.subTest(key=key):
                run,_,detail,artifact=self.imported(key=key)
                pinned=(run/'control/rubric.json').read_bytes()
                review_before=(run/'control/review.json').read_bytes()
                viewed=self.studio.detail(run.name)
                self.assertEqual((run/'control/review.json').read_bytes(),review_before)
                for task in (viewed['rubric'][0],viewed['run']['taskCatalog'][0]):
                    self.assertEqual(task['scoringMode'],'manual')
                    self.assertNotIn('automationVersion',task)
                    self.assertNotIn('自动',task['scoringGuidance'])
                    if key!='01-svg':
                        self.assertEqual(task['rubric'][0]['description'],'人工核验接口')
                        self.assertEqual(task['rubric'][0]['checks'],['人工验收接口成功和失败响应'])
                    self.assertTrue(all(d['scoring']=='manual' for d in task['rubric']))
                saved=self.studio.save_score(run.name,key,'initial',{
                    'revision':detail['review']['revision'],'artifactId':artifact['id'],
                    'values':{d['id']:8 for d in viewed['rubric'][0]['rubric']}})
                self.assertEqual(saved['review']['scores'][artifact['id']]['total'],80)
                self.assertEqual((run/'control/rubric.json').read_bytes(),pinned)
                if key=='02-static':
                    self.assertEqual({d['id']:d['weight'] for d in viewed['rubric'][0]['rubric']},
                                     {'impact':40,'craft':30,'content':30})
                    self.assertEqual({d['id']:d['weight'] for d in viewed['rubric'][0]['rubricChange']},
                                     {'kids':43,'integration':43,'preservation':14})
                    self.assertEqual(saved['review']['scores'][artifact['id']]['rubricVersion'],'pelican-rubric-14')
                    self.assertEqual(saved['review']['scores'][artifact['id']]['sourceRubricVersion'],'test')
                    meta=m.load(run/'control/run.json');meta['tasks'][key]['phase']='change'
                    m.dump(run/'control/run.json',meta)
                    changed=self.studio.import_artifact(run.name,key,'change')
                    changed_artifact=changed['tasks'][key]['artifacts']['change'][0]
                    final=self.studio.save_score(run.name,key,'change',{
                        'revision':changed['review']['revision'],'artifactId':changed_artifact['id'],
                        'values':{'kids':10,'integration':5,'preservation':0}})
                    self.assertEqual(final['review']['scores'][changed_artifact['id']]['total'],64.5)
                    self.assertEqual(final['review']['scores'][artifact['id']]['total'],80)
                    self.assertEqual((run/'control/rubric.json').read_bytes(),pinned)
                if key in ('04-game2d','05-game3d'):
                    self.assertNotIn('delivery',{d['id'] for d in viewed['rubric'][0]['rubric']})
                    self.assertNotIn('runtime',{d['id'] for d in viewed['rubric'][0]['rubric']})
                    self.assertEqual(saved['review']['scores'][artifact['id']]['rubricVersion'],'pelican-rubric-14')
                    meta=m.load(run/'control/run.json');meta['tasks'][key]['phase']='change'
                    m.dump(run/'control/run.json',meta)
                    changed=self.studio.import_artifact(run.name,key,'change')
                    changed_artifact=changed['tasks'][key]['artifacts']['change'][0]
                    dimensions=changed['rubric'][0]['rubricChange']
                    self.assertNotIn('delivery',{d['id'] for d in dimensions})
                    final=self.studio.save_score(run.name,key,'change',{
                        'revision':changed['review']['revision'],'artifactId':changed_artifact['id'],
                        'values':{d['id']:7.5 for d in dimensions}})
                    self.assertEqual(final['review']['scores'][changed_artifact['id']]['total'],75)
                    self.assertEqual(final['review']['scores'][artifact['id']]['total'],80)
                    self.assertEqual((run/'control/rubric.json').read_bytes(),pinned)
    def test_svg_new_dimensions_do_not_rewrite_or_invent_historical_scores(self):
        from evalkit.studio import score_values
        run,_,detail,artifact=self.imported(key='01-svg')
        pinned=(run/'control/rubric.json').read_bytes()
        for phase in ('initial','change'):
            if phase=='change':
                meta=m.load(run/'control/run.json');meta['tasks']['01-svg']['phase']='change'
                m.dump(run/'control/run.json',meta)
                detail=self.studio.import_artifact(run.name,'01-svg','change')
                artifact=detail['tasks']['01-svg']['artifacts']['change'][0]
            values=({'anatomy':10,'pedals':5,'expression':8,'timeline':0,'loop':0,'delivery':0}
                    if phase=='initial' else {'retiming':10,'sync':10,'continuity':10,'visual':10,'delivery':10})
            historical={'artifactId':artifact['id'],'values':values,'total':46 if phase=='initial' else 100,
                        'rubricVersion':'pelican-rubric-10','scoringMode':'manual'}
            review=self.studio.review(run);review['scores'][artifact['id']]=historical
            m.dump(run/'control/review.json',review)
            before=(run/'control/review.json').read_bytes()
            viewed=self.studio.detail(run.name)
            self.assertEqual(viewed['review']['scores'][artifact['id']],historical)
            self.assertEqual((run/'control/review.json').read_bytes(),before)
            rubric=viewed['rubric'][0]['rubricChange' if phase=='change' else 'rubric']
            projected={d['id']:values.get(d['id']) for d in rubric}
            self.assertEqual(score_values(rubric,projected)[1],77 if phase=='initial' else None)
            if phase=='change':
                self.assertEqual(projected,{'anatomy':None,'pedals':None,'expression':None})
            saved=self.studio.save_score(run.name,'01-svg',phase,{
                'revision':review['revision'],'artifactId':artifact['id'],'values':projected})
            score=saved['review']['scores'][artifact['id']]
            self.assertEqual(score['values'],projected)
            self.assertEqual(score['total'],77 if phase=='initial' else None)
            self.assertEqual(score['rubricVersion'],'pelican-rubric-14')
            self.assertEqual(saved['review']['scoreHistory'][-1],historical)
            self.assertEqual((run/'control/rubric.json').read_bytes(),pinned)
    def test_auto_grade_endpoint_is_retired_without_starting_jobs(self):
        run,_,_,artifact=self.imported(key='01-svg')
        before=(run/'control/review.json').read_bytes()
        with patch.object(self.studio,'submit') as submit,self.assertRaisesRegex(StudioError,'已取消自动核验') as error:
            self.studio.auto_grade(run.name,'01-svg',{'phase':'initial','artifactId':artifact['id']})
        self.assertEqual(error.exception.status,410)
        submit.assert_not_called()
        self.assertEqual((run/'control/review.json').read_bytes(),before)
    def test_dispatch_api_grade_still_dispatches_explicit_background_job(self):
        run,_,_,artifact=self.imported()
        module=SimpleNamespace(run_auto_grade=lambda studio,r,k,p,a:{'runId':r,'artifactId':a})
        with patch.dict(sys.modules,{'evalkit.automation':module}),patch.object(self.studio,'submit',side_effect=lambda label,fn,**kwargs:fn()):
            result=self.studio.auto_grade(run.name,'03-dispatch',{'phase':'initial','artifactId':artifact['id']})
        self.assertEqual(result,{'runId':run.name,'artifactId':artifact['id']})
    def test_dispatch_api_scores_are_binary_and_cannot_be_set_by_manual_save(self):
        from evalkit.hybrid_revision import DISPATCH_API_VERSION
        run,_,detail,artifact=self.imported()
        body={'revision':detail['review']['revision'],'artifactId':artifact['id'],'values':{'query':1,'visual':5}}
        with self.assertRaisesRegex(StudioError,'不能手工修改'):
            self.studio.save_score(run.name,'03-dispatch','initial',body)
        pending=self.studio.save_score(run.name,'03-dispatch','initial',{**body,'values':{'query':None,'visual':5}})
        self.assertIsNone(pending['review']['scores'][artifact['id']]['total'])
        review=self.studio.review(run)
        report={'version':DISPATCH_API_VERSION,'sourceSha256':artifact['sha256'],
                'checks':[{'id':'query','dimensionId':'query','passed':True}]}
        review['scores'][artifact['id']]={'artifactId':artifact['id'],'values':{'query':1,'visual':5},
            'automation':report,'total':75}
        m.dump(run/'control/review.json',review)
        with self.assertRaisesRegex(StudioError,'不能手工修改'):
            self.studio.save_score(run.name,'03-dispatch','initial',
                {**body,'revision':review['revision'],'values':{'query':0,'visual':8}})
        saved=self.studio.save_score(run.name,'03-dispatch','initial',
            {**body,'revision':review['revision'],'values':{'query':1,'visual':8}})
        self.assertEqual(saved['review']['scores'][artifact['id']]['total'],90)
        self.assertEqual(saved['review']['scores'][artifact['id']]['automation'],report)
    def test_old_dispatch_automatic_scores_are_not_reused_as_binary_credit(self):
        run,_,detail,artifact=self.imported()
        review=self.studio.review(run)
        historical={'artifactId':artifact['id'],'values':{'query':10,'visual':5},
            'automation':{'version':'pelican-checks-1','sourceSha256':artifact['sha256']},'total':75}
        review['scores'][artifact['id']]=historical
        m.dump(run/'control/review.json',review)
        before=(run/'control/review.json').read_bytes()
        viewed=self.studio.detail(run.name)
        score=viewed['review']['scores'][artifact['id']]
        self.assertTrue(score['automationStale'])
        self.assertEqual(score['values'],{'query':None,'visual':5})
        self.assertIsNone(score['total'])
        self.assertEqual(viewed['run']['taskScores']['03-dispatch']['initial']['score'],75)
        self.assertEqual((run/'control/review.json').read_bytes(),before)
        body={'revision':review['revision'],'artifactId':artifact['id'],'values':{'query':10,'visual':8}}
        with self.assertRaisesRegex(StudioError,'不能手工修改'):
            self.studio.save_score(run.name,'03-dispatch','initial',body)
        saved=self.studio.save_score(run.name,'03-dispatch','initial',{**body,'values':{'query':None,'visual':8}})
        self.assertEqual(saved['review']['scoreHistory'][-1],historical)
        self.assertNotIn('automation',saved['review']['scores'][artifact['id']])
    def test_proxy_routes_have_finite_allowlist(self):
        for method,path in [('GET','http://localhost/api/orders'),('POST','/api/orders'),
                            ('GET','/api/../server/index.mjs'),('POST','/__control'),('GET','/api/orders/a/b')]:
            self.assertFalse(fullstack.allowed_route(method,path),(method,path))
        self.assertTrue(fullstack.allowed_route('GET','/api/orders?q=abc&page=2'))
        self.assertTrue(fullstack.allowed_route('POST','/api/assign'))

    def test_live_proxy_authenticates_bridge_and_drops_private_headers(self):
        _,_,_,artifact=self.imported()
        class API(BaseHTTPRequestHandler):
            def log_message(self,*args): pass
            def do_GET(self):
                data=json.dumps({'path':self.path,'cookie':self.headers.get('Cookie'),
                                 'authorization':self.headers.get('Authorization')}).encode()
                self.send_response(200);self.send_header('Content-Type','application/json')
                self.send_header('Set-Cookie','private=never-forward')
                self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        api=ThreadingHTTPServer(('127.0.0.1',0),API)
        threading.Thread(target=api.serve_forever,daemon=True).start()
        self.addCleanup(api.server_close);self.addCleanup(api.shutdown)
        bridge=ThreadingHTTPServer(('127.0.0.1',0),fullstack.BridgeHandler)
        bridge.runtime=SimpleNamespace(port=api.server_port,process=SimpleNamespace(poll=lambda:None))
        bridge.token=secrets.token_hex(32);bridge.artifact_id=artifact['id'];bridge.artifact_sha=artifact['sha256']
        threading.Thread(target=bridge.serve_forever,daemon=True).start()
        self.addCleanup(bridge.server_close);self.addCleanup(bridge.shutdown)
        registration=fullstack.registry_path(artifact['id'])
        m.dump(registration,{'artifactId':artifact['id'],'artifactSha256':artifact['sha256'],
                            'token':bridge.token,'port':bridge.server_port,'pid':os.getpid()})
        self.assertTrue(self.studio.backend_status(artifact['id'])['running'])
        self.assertEqual(self.call(bridge,'/__runtime_status')[0],403)
        preview=self.preview()
        status,headers,body=self.call(preview,'/artifacts/'+artifact['id']+'/api/orders?q=abc',
                                     headers={'Cookie':'secret','Authorization':'Bearer secret','Origin':'null'})
        self.assertEqual(status,200)
        self.assertEqual(json.loads(body),{'path':'/api/orders?q=abc','cookie':None,'authorization':None})
        self.assertNotIn('Set-Cookie',headers)
        record=m.load(registration);record['artifactSha256']='0'*64;m.dump(registration,record)
        self.assertFalse(self.studio.backend_status(artifact['id'])['running'])


@unittest.skipUnless(sys.platform=='darwin' and shutil.which('node'),'需要macOS和Node验证隔离运行')
class SandboxTests(unittest.TestCase):
    def test_local_http_works_but_external_io_processes_and_network_are_blocked(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory).resolve();server=root/'server';server.mkdir()
            sentinel=root/'outside.txt';sentinel.write_text('preserve')
            program="""import http from 'node:http';import fs from 'node:fs';import net from 'node:net';
import {spawnSync} from 'node:child_process';const checks={};let assigned=false;
try{fs.readFileSync(OUTSIDE);checks.read=false}catch(e){checks.read=e.code==='ERR_ACCESS_DENIED'}
try{fs.writeFileSync(OUTSIDE,'bad');checks.write=false}catch(e){checks.write=e.code==='ERR_ACCESS_DENIED'}
try{spawnSync('/usr/bin/true');checks.child=false}catch(e){checks.child=e.code==='ERR_ACCESS_DENIED'}
const socket=net.connect({host:'192.0.2.1',port:80});socket.on('error',e=>{checks.network=['EPERM','EACCES'].includes(e.code);socket.destroy()});
http.createServer((q,s)=>{if(q.url==='/api/assign')assigned=true;
s.setHeader('Content-Type','application/json');s.end(JSON.stringify(q.url==='/health'?{ok:true}:{...checks,assigned}))}).listen(+process.env.PORT,process.env.HOST);
""".replace('OUTSIDE',json.dumps(str(sentinel)))
            (server/'index.mjs').write_text(program)
            with fullstack.BackendInstance(server,runtime_root=root/'runtime') as runtime:
                checks=json.loads(fullstack.http_request(runtime.port,'GET','/api/orders')[1])
                self.assertTrue(all(checks[key] for key in ['read','write','child','network']),checks)
                fullstack.http_request(runtime.port,'POST','/api/assign',b'{}')
                self.assertTrue(json.loads(fullstack.http_request(runtime.port,'GET','/api/orders')[1])['assigned'])
                runtime.restart()
                self.assertFalse(json.loads(fullstack.http_request(runtime.port,'GET','/api/orders')[1])['assigned'])
            self.assertEqual(sentinel.read_text(),'preserve')
            self.assertFalse(list((root/'runtime').iterdir()))
    def test_unsupported_system_never_falls_back(self):
        with patch.object(fullstack.sys,'platform','unsupported'):
            with self.assertRaisesRegex(ValueError,'不降级'):fullstack.require_runtime()

    def test_explicit_preview_registers_and_sigterm_cleans_processes(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory).resolve();artifact_id='a'*32
            base=root/'data/artifacts'/artifact_id
            m.write(base/'files/index.html','<!doctype html><html>runtime test</html>')
            m.write(base/'files/server/index.mjs',"""import http from 'node:http';
http.createServer((q,s)=>{s.setHeader('Content-Type','application/json');s.end(JSON.stringify(q.url==='/health'?{ok:true}:{items:[]}))}).listen(+process.env.PORT,process.env.HOST);""")
            m.dump(base/'files/server/data/orders.json',[])
            m.dump(base/'manifest.json',{'delivery':'fullstack-node','files':m.manifest(base/'files')})
            code="from pathlib import Path; import sys; from types import SimpleNamespace; from evalkit import manager as m; from evalkit.fullstack import preview_api; m.ROOT=Path(sys.argv[1]); preview_api(SimpleNamespace(artifact=sys.argv[2]))"
            process=subprocess.Popen([sys.executable,'-c',code,str(root),artifact_id],
                stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
            try:
                with patch.object(m,'ROOT',root):
                    deadline=time.monotonic()+10
                    while time.monotonic()<deadline and process.poll() is None:
                        if fullstack.runtime_status(artifact_id)['running']: break
                        time.sleep(.05)
                    if process.poll() is not None:
                        self.fail('启动命令失败：'+process.communicate(timeout=2)[1])
                    self.assertTrue(fullstack.runtime_status(artifact_id)['running'])
                    registration=fullstack.read_registration(artifact_id)
                    self.assertEqual(fullstack.proxy_request(artifact_id,'GET','/api/orders')[0],200)
                    process.terminate()
                    stdout,stderr=process.communicate(timeout=5)
                    self.assertEqual(process.returncode,0,(stdout,stderr))
                    self.assertFalse(fullstack.registry_path(artifact_id).exists())
                    self.assertFalse(fullstack.runtime_status(artifact_id)['running'])
                    with self.assertRaises(ProcessLookupError):os.kill(registration['childPid'],0)
                    self.assertFalse(list((root/'.runtime').glob('node-api-*')))
            finally:
                if process.poll() is None:
                    process.kill()
                process.communicate(timeout=3)


if __name__=='__main__':
    unittest.main()
