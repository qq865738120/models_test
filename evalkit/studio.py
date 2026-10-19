"""Local-only host studio. Submissions are never executed by the Python server."""
import argparse
import csv
import io
import json
import math
import mimetypes
import os
import secrets
import shutil
import threading
import uuid
import webbrowser
from urllib.request import urlopen
from urllib.error import URLError
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

from . import manager as m
from .reasoning import normalize_reasoning, reasoning_options, set_reasoning
from .harnesses import normalize_harness, harness_options
from .catalog import SUITE_ID, SUITE_NAME, RUBRIC_VERSION, catalog


class StudioError(ValueError):
    def __init__(self,message,status=400): super().__init__(message); self.status=status


def clean_text(value,name,limit=200):
    if not isinstance(value,str) or not value.strip() or len(value)>limit:
        raise StudioError(f'{name}不能为空，且不能超过{limit}字')
    return value.strip()


def safe_file(base,relative):
    if base.is_symlink() or any(p.is_symlink() for p in base.parents):
        raise StudioError('不允许访问链接目录',404)
    if not relative or '\\' in relative or '\x00' in relative:
        raise StudioError('路径无效',404)
    path=Path(relative)
    if path.is_absolute() or any(p in ('..','.') or p.startswith('.') for p in path.parts):
        raise StudioError('不允许访问该路径',404)
    target=base/path
    cursor=base
    for part in path.parts:
        cursor=cursor/part
        if cursor.is_symlink(): raise StudioError('不允许访问链接文件',404)
    if not m.inside(target,base) or not target.is_file(): raise StudioError('文件不存在',404)
    return target


def score_values(rubric,values):
    if not isinstance(values,dict) or set(values)-{d['id'] for d in rubric}:
        raise StudioError('评分维度无效')
    normalized={}
    for dimension in rubric:
        value=values.get(dimension['id'])
        if value is not None and (isinstance(value,bool) or not isinstance(value,(int,float)) or not math.isfinite(value) or not 0<=value<=10):
            raise StudioError('每项评分必须为0到10之间的有限数字')
        normalized[dimension['id']]=value
    complete=all(v is not None for v in normalized.values())
    total=round(sum(normalized[d['id']]*d['weight']/10 for d in rubric),2) if complete else None
    return normalized,total


class Studio:
    def __init__(self,data=None,preview_port=8788):
        self.data=Path(data or m.ROOT/'data').resolve()
        self.data.mkdir(parents=True,exist_ok=True)
        self.artifacts=self.data/'artifacts'; self.artifacts.mkdir(exist_ok=True)
        self.lock=threading.RLock()
        self.worker=ThreadPoolExecutor(max_workers=1)
        self.jobs={}
        self.token=secrets.token_urlsafe(32)
        self.preview_origin=f'http://127.0.0.1:{preview_port}'

    def submit(self,label,operation):
        job={'id':uuid.uuid4().hex,'label':label,'status':'queued','createdAt':m.now()}
        with self.lock: self.jobs[job['id']]=job
        def work():
            job.update(status='running')
            try:
                with self.lock: result=operation()
                job.update(status='done',result=result,finishedAt=m.now())
            except Exception as exc: job.update(status='failed',error=str(exc),finishedAt=m.now())
            m.atomic_json(self.data/'jobs'/f"{job['id']}.json",job)
        self.worker.submit(work)
        return dict(job)

    def run(self,run_id):
        try: return m.get_run(m.safe_id(run_id))
        except ValueError as exc: raise StudioError(str(exc),404)

    def review(self,run):
        path=run/'control/review.json'
        return m.load(path) if path.exists() else {'revision':0,'artifacts':{},'scores':{},'scoreHistory':[]}

    def task(self,run_id,key,phase):
        if phase not in ('initial','change'): raise StudioError('阶段无效')
        run=self.run(run_id)
        meta=m.load(run/'control/run.json')
        if meta.get('suiteId')!=SUITE_ID: raise StudioError('这是旧版历史记录；请新建v1.0轮次')
        if key not in meta['tasks']: raise StudioError('本轮未选择该题',404)
        return run,meta,run/'tasks'/key

    def summary(self,run):
        meta=m.load(run/'control/run.json'); review=self.review(run)
        task_scores={}; artifact_count=0
        for key in meta['tasks']:
            task_scores[key]={}
            for phase in ('initial','change'):
                items=review['artifacts'].get(key,{}).get(phase,[]); artifact_count+=len(items)
                artifact=items[-1] if items else None
                score=review['scores'].get(artifact['id']) if artifact else None
                task_scores[key][phase]={'score':score['total'] if score else None,
                    'artifactId':artifact['id'] if artifact else None,
                    'eligible':bool(artifact and artifact.get('integrityPassed'))}
        return {k:meta.get(k) for k in ('id','suiteId','suiteName','model','repeat','createdAt','bundleSha256','materialVersion','rubricVersion','archived','notes','harness','harnessCustom')}|{
            'reasoningLevel':meta.get('environment',{}).get('reasoningLevel'),
            'reasoningOriginal':meta.get('environment',{}).get('reasoning'),
            'taskCatalog':m.load(run/'control/rubric.json')['tasks'] if (run/'control/rubric.json').exists() else catalog(),
            'legacy':meta.get('suiteId')!=SUITE_ID,'taskScores':task_scores,'artifactCount':artifact_count,'taskIds':list(meta['tasks'])}

    def runs(self):
        result=[]
        for path in m.RUNS.glob('*/control/run.json'):
            if path.parent.parent.name.startswith('.') or path.is_symlink(): continue
            try: result.append(self.summary(self.run(path.parent.parent.name)))
            except (OSError,ValueError,KeyError): continue
        return sorted(result,key=lambda r:r['createdAt'],reverse=True)

    def detail(self,run_id):
        run=self.run(run_id); meta=m.load(run/'control/run.json'); review=self.review(run)
        for phases in review['artifacts'].values():
            for items in phases.values():
                for item in items:
                    item['url']=f"{self.preview_origin}/artifacts/{item['id']}/index.html"
        legacy=meta.get('suiteId')!=SUITE_ID
        tasks={}
        for key,state in meta['tasks'].items():
            prompts={}
            if not legacy:
                for phase in ('initial','change'):
                    path=run/'control/prompts'/f'{key}-{phase}.txt'
                    if path.exists(): prompts[phase]=path.read_text()
            tasks[key]={'state':state,'path':str(run/'tasks'/key),'prompts':prompts,
                'artifacts':review['artifacts'].get(key,{})}
        rubric=m.load(run/'control/rubric.json')['tasks'] if (run/'control/rubric.json').exists() else catalog()
        return {'run':self.summary(run),'tasks':tasks,'review':review,'rubric':rubric,'path':str(run)}

    def create_run(self,body):
        model=clean_text(body.get('model'),'模型名称',120)
        harness=normalize_harness(body.get('harness'),body.get('harnessCustom',''))
        reasoning=normalize_reasoning(body.get('reasoningLevel'))
        repeat=body.get('repeat',1)
        if isinstance(repeat,bool) or not isinstance(repeat,int) or not 1<=repeat<=1000: raise StudioError('重复编号需为1到1000的整数')
        task=body.get('task','all')
        if not isinstance(task,str): raise StudioError('题号无效')
        m.task_keys(task)
        def operation():
            run=m.init_run(argparse.Namespace(model=model,repeat=repeat,task=task,profile='local',run_id=None,harness=harness['harness'],harness_custom=harness['harnessCustom'],reasoning_level=reasoning))
            return {'runId':run.name}
        return self.submit('初始化测评项目',operation)

    def update_run(self,run_id,body):
        with self.lock:
            run=self.run(run_id); meta=m.load(run/'control/run.json')
            if 'model' in body: meta['model']=clean_text(body['model'],'模型名称',120)
            if any(k in body for k in ('harness','harnessCustom')):
                updated=normalize_harness(body.get('harness',meta.get('harness')),body.get('harnessCustom',meta.get('harnessCustom','')))
                if any(meta.get(k)!=v for k,v in updated.items()):
                    meta.setdefault('harnessHistory',[]).append({'at':m.now(),'before':{k:meta.get(k) for k in updated},'after':updated})
                meta.update(updated)
            if 'reasoningLevel' in body: set_reasoning(meta,body['reasoningLevel'],m.now())
            if 'notes' in body:
                if not isinstance(body['notes'],str) or len(body['notes'])>4000: raise StudioError('备注过长')
                meta['notes']=body['notes']
            if 'archived' in body:
                if not isinstance(body['archived'],bool): raise StudioError('归档参数无效')
                meta['archived']=body['archived']
            m.atomic_json(run/'control/run.json',meta)
            return self.detail(run_id)

    def import_artifact(self,run_id,key,phase):
        with self.lock:
            run,meta,project=self.task(run_id,key,phase)
            state=meta['tasks'][key]
            frozen=state.get(phase+'Snapshot')
            if frozen:
                source_project=run/'control/snapshots'/key/phase/'project'
                snapshot=m.load(source_project.parent/'snapshot.json')
                if m.manifest(source_project)!=snapshot['files']: raise StudioError('阶段快照已变化，不能导入')
                issues=snapshot['issues']
            else:
                if state['phase']!=phase: raise StudioError('该阶段尚未开放')
                source_project=project; issues=m.integrity(run,key)
            source=source_project/'output'
            if source.is_symlink(): raise StudioError('成果目录不能是链接')
            index=safe_file(source,'index.html')
            try: text=index.read_text(encoding='utf-8')
            except UnicodeError: raise StudioError('成果入口必须为UTF-8 HTML')
            if not any(s in text.lower() for s in ('<html','<!doctype html')): raise StudioError('output/index.html不是完整HTML页面')
            paths=list(m.files(source))
            if any(p.is_symlink() for p in paths): raise StudioError('成果资源不能包含链接')
            if sum(p.stat().st_size for p in paths)>512*1024*1024: raise StudioError('成果超过512MB，请移除不需要的文件')
            if len(paths)>15000: raise StudioError('成果文件过多，请勿把node_modules放入output')
            expected=m.manifest(source)
            artifact_id=uuid.uuid4().hex
            staging=self.artifacts/('.pending-'+artifact_id)
            dest=self.artifacts/artifact_id
            try:
                shutil.copytree(source,staging/'files')
                if m.manifest(staging/'files')!=expected or m.manifest(source)!=expected:
                    raise StudioError('导入期间成果发生变化；请停止写入再重试')
                record={'id':artifact_id,'createdAt':m.now(),'entry':'index.html','sha256':m.digest(expected),
                    'fileCount':len(expected),'integrityPassed':not issues,'issues':issues,
                    'url':f'{self.preview_origin}/artifacts/{artifact_id}/index.html'}
                m.dump(staging/'manifest.json',{'runId':run_id,'taskId':key,'phase':phase,'files':expected})
                staging.rename(dest)
                review=self.review(run)
                review['artifacts'].setdefault(key,{}).setdefault(phase,[]).append(record)
                review['revision']+=1
                m.atomic_json(run/'control/review.json',review)
                return self.detail(run_id)
            finally:
                if staging.exists(): shutil.rmtree(staging)

    def save_score(self,run_id,key,phase,body):
        with self.lock:
            run,meta,_=self.task(run_id,key,phase)
            review=self.review(run)
            if body.get('revision')!=review['revision']: raise StudioError('记录已更新，请刷新后再保存评分',409)
            artifact_id=body.get('artifactId')
            if artifact_id not in [a['id'] for a in review['artifacts'].get(key,{}).get(phase,[])]: raise StudioError('请先导入该阶段的HTML成果')
            task_rubric=next(t for t in m.load(run/'control/rubric.json')['tasks'] if t['id']==key)
            rubric=task_rubric.get('rubricChange',task_rubric['rubric']) if phase=='change' else task_rubric['rubric']
            values,total=score_values(rubric,body.get('values'))
            notes=body.get('notes','')
            if not isinstance(notes,str) or len(notes)>10000: raise StudioError('评语过长')
            record={'artifactId':artifact_id,'values':values,'total':total,'notes':notes,'savedAt':m.now(),'rubricVersion':meta['rubricVersion']}
            previous=review['scores'].get(artifact_id)
            if previous: review['scoreHistory'].append(previous)
            review['scores'][artifact_id]=record; review['revision']+=1
            m.atomic_json(run/'control/review.json',review)
            return self.detail(run_id)

    def action(self,run_id,key,body):
        phase=body.get('phase','initial'); run,meta,project=self.task(run_id,key,phase)
        action=body.get('action')
        def operation():
            if action=='snapshot': m.snapshot(argparse.Namespace(run=str(run),task=key,phase=phase,allow_invalid=False))
            elif action=='release': m.release_change(run,key,project)
            elif action=='start': m.mark_start(argparse.Namespace(run=str(run),task=key))
            elif action=='check':
                issues=m.integrity(run,key)
                record={'at':m.now(),'task':key,'passed':not issues,'issues':issues}
                m.dump(run/'control/audits'/('studio-'+uuid.uuid4().hex+'.json'),record)
                return record
            else: raise StudioError('未知操作')
            return {'runId':run_id}
        if action not in ('snapshot','release','start','check'): raise StudioError('未知操作')
        return self.submit({'snapshot':'冻结阶段成果','release':'开放追加任务','start':'记录开始时间','check':'检查材料完整性'}[action],operation)

    def export(self,kind):
        records=[]
        for run in self.runs():
            path=self.run(run['id'])
            records.append({'run':run,'review':self.review(path)})
        if kind=='json': return json.dumps({'suite':SUITE_NAME,'exportedAt':m.now(),'records':records},ensure_ascii=False,indent=2).encode(),'application/json; charset=utf-8'
        out=io.StringIO(); writer=csv.writer(out)
        writer.writerow(['model','harness','harness_custom','reasoning_level','reasoning_original','rubric_version','run_id','repeat','suite','material_hash','task','phase','artifact','dimension','score_0_10','total_100','saved_at'])
        # Prefix formula-like user text for safe spreadsheet opening.
        cell=lambda s: "'"+s if isinstance(s,str) and s.startswith(('=','+','-','@','\t','\r')) else s
        for item in records:
            run=item['run']; review=item['review']
            for key,phases in review['artifacts'].items():
                for phase,artifacts in phases.items():
                    for artifact in artifacts:
                        score=review['scores'].get(artifact['id'])
                        if not score: continue
                        for dimension,value in score['values'].items():
                            writer.writerow([cell(run['model']),run.get('harness') or '',cell(run.get('harnessCustom') or ''),cell(run.get('reasoningLevel') or ''),cell(run.get('reasoningOriginal') or ''),run['rubricVersion'],run['id'],run['repeat'],run['suiteId'],run['bundleSha256'],key,phase,artifact['id'],dimension,value,score['total'],score['savedAt']])
        return ('\ufeff'+out.getvalue()).encode(),'text/csv; charset=utf-8'


class Handler(BaseHTTPRequestHandler):
    server_version='PelicanStudio/1.0'
    def log_message(self,format,*args): pass

    def guard(self,mutation=False):
        host=self.headers.get('Host','')
        allowed={f'127.0.0.1:{self.server.server_port}',f'localhost:{self.server.server_port}'}
        if host not in allowed: raise StudioError('Host不被允许',403)
        origin=self.headers.get('Origin')
        if origin is not None and origin not in {f'http://{h}' for h in allowed}: raise StudioError('拒绝跨来源管理请求',403)
        if mutation:
            if not secrets.compare_digest(self.headers.get('X-Pelican-Token',''),self.server.studio.token): raise StudioError('页面会话已失效，请刷新',403)
            if self.headers.get('Content-Type','').split(';')[0]!='application/json': raise StudioError('请求格式必须为JSON',415)

    def send(self,data,content_type='application/json; charset=utf-8',status=200,download=None):
        if not isinstance(data,bytes): data=json.dumps(data,ensure_ascii=False,allow_nan=False).encode()
        self.send_response(status)
        self.send_header('Content-Type',content_type); self.send_header('Content-Length',str(len(data)))
        self.send_header('Cache-Control','no-store'); self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('X-Frame-Options','DENY')
        self.send_header('Referrer-Policy','no-referrer')
        self.send_header('Content-Security-Policy',f"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-src {self.server.studio.preview_origin}; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")
        if download: self.send_header('Content-Disposition',f'attachment; filename="{download}"')
        self.end_headers(); self.wfile.write(data)

    def body(self):
        length=int(self.headers.get('Content-Length','0'))
        if length<0 or length>1024*1024: raise StudioError('请求过大',413)
        value=json.loads(self.rfile.read(length))
        if not isinstance(value,dict): raise StudioError('JSON必须为对象')
        return value

    def do_GET(self): self.dispatch('GET')
    def do_POST(self): self.dispatch('POST')
    def do_PATCH(self): self.dispatch('PATCH')
    def do_OPTIONS(self): self.send({'error':'跨来源请求不被允许'},status=403)

    def dispatch(self,method):
        try:
            self.guard(method!='GET')
            parts=unquote(urlparse(self.path).path).strip('/').split('/')
            studio=self.server.studio
            body=self.body() if method!='GET' else None
            if parts==['api','health']: return self.send({'suite':SUITE_NAME,'ok':True})
            if parts==['api','bootstrap'] and method=='GET':
                prepared=None
                if (m.PREPARED/'bundle.json').exists():
                    meta=m.load(m.PREPARED/'bundle.json')
                    prepared={'ready':meta.get('suiteId')==SUITE_ID and meta.get('version')==m.VERSION,'hash':meta['bundleSha256'],'version':meta['version']}
                return self.send({'suiteId':SUITE_ID,'suiteName':SUITE_NAME,'harnessOptions':harness_options(),'reasoningOptions':reasoning_options(),'tasks':catalog(),'runs':studio.runs(),
                    'token':studio.token,'prepared':prepared,'storage':str(studio.data),'runsPath':str(m.RUNS),'previewOrigin':studio.preview_origin})
            if parts==['api','runs']:
                if method=='GET': return self.send(studio.runs())
                if method=='POST': return self.send(studio.create_run(body),status=202)
            if parts==['api','prepare'] and method=='POST':
                return self.send(studio.submit('准备v1.0材料与依赖',lambda:(m.prepare(argparse.Namespace(rebuild=True)) or {'ready':True})),status=202)
            if len(parts)==3 and parts[:2]==['api','jobs'] and method=='GET':
                job=studio.jobs.get(parts[2])
                if not job: raise StudioError('后台任务不存在或服务已重新启动',404)
                return self.send(dict(job))
            if len(parts)==3 and parts[:2]==['api','export'] and method=='GET' and parts[2] in ('json','csv'):
                data,kind=studio.export(parts[2]); return self.send(data,kind,download='pelican-evaluation.'+parts[2])
            if len(parts)==3 and parts[:2]==['api','runs']:
                if method=='GET': return self.send(studio.detail(parts[2]))
                if method=='PATCH': return self.send(studio.update_run(parts[2],body))
            if len(parts)==6 and parts[:2]==['api','runs'] and parts[3]=='tasks' and method=='POST':
                run_id,key,action=parts[2],parts[4],parts[5]
                if action=='artifacts': return self.send(studio.import_artifact(run_id,key,body.get('phase','initial')))
                if action=='scores': return self.send(studio.save_score(run_id,key,body.get('phase','initial'),body))
                if action=='action': return self.send(studio.action(run_id,key,body),status=202)
            if parts[0]=='api': raise StudioError('接口不存在',404)
            if method!='GET': raise StudioError('不支持该操作',405)
            relative='/'.join(parts) or 'index.html'
            if relative=='': relative='index.html'
            path=safe_file(m.ROOT/'web/dist',relative)
            return self.send(path.read_bytes(),mimetypes.guess_type(path.name)[0] or 'application/octet-stream')
        except (StudioError,ValueError,KeyError,OSError) as exc:
            self.send({'error':str(exc)},status=getattr(exc,'status',400))


class ArtifactHandler(BaseHTTPRequestHandler):
    server_version='PelicanPreview/1.0'
    def log_message(self,format,*args): pass
    def do_GET(self):
        try:
            if self.headers.get('Host') not in {f'127.0.0.1:{self.server.server_port}',f'localhost:{self.server.server_port}'}: raise StudioError('Host不被允许',403)
            parts=unquote(urlparse(self.path).path).strip('/').split('/')
            if len(parts)<3 or parts[0]!='artifacts' or len(parts[1])!=32 or any(c not in '0123456789abcdef' for c in parts[1]): raise StudioError('成果不存在',404)
            base=self.server.studio.artifacts/parts[1]/'files'
            path=safe_file(base,'/'.join(parts[2:]))
            data=path.read_bytes(); origin=self.server.studio.preview_origin
            self.send_response(200)
            self.send_header('Content-Type',mimetypes.guess_type(path.name)[0] or 'application/octet-stream')
            self.send_header('Content-Length',str(len(data)))
            self.send_header('Access-Control-Allow-Origin','*')
            self.send_header('X-Content-Type-Options','nosniff')
            self.send_header('Cache-Control','no-store')
            self.send_header('Referrer-Policy','no-referrer')
            self.send_header('Content-Security-Policy',f"default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' {origin}; style-src 'unsafe-inline' {origin}; img-src data: blob: {origin}; font-src data: {origin}; media-src blob: {origin}; connect-src {origin}; worker-src blob: {origin}; object-src 'none'; base-uri 'none'; form-action 'none'; sandbox allow-scripts; frame-ancestors {self.server.admin_origin}")
            self.end_headers(); self.wfile.write(data)
        except (StudioError,ValueError,OSError) as exc:
            data=str(exc).encode(); self.send_response(getattr(exc,'status',404)); self.send_header('Content-Type','text/plain; charset=utf-8'); self.send_header('Content-Length',str(len(data))); self.end_headers(); self.wfile.write(data)
    def do_POST(self): self.send_error(405)


def serve(args):
    if not 1024<=args.port<=65534: raise ValueError('端口需为1024到65534')
    if not (m.ROOT/'web/dist/index.html').exists(): raise ValueError('请先在web目录安装依赖并执行npm run build')
    url=f'http://127.0.0.1:{args.port}'
    try:
        with urlopen(url+'/api/bootstrap',timeout=1) as response: existing=json.load(response)
        if existing.get('suiteId')==SUITE_ID and existing.get('storage')==str((m.ROOT/'data').resolve()):
            print('工作台已经运行：'+url)
            if args.open: webbrowser.open(url)
            return
        raise ValueError('端口已被其他工作台占用，请使用--port指定不同端口')
    except (URLError,OSError,json.JSONDecodeError): pass
    studio=Studio(preview_port=args.port+1)
    admin=ThreadingHTTPServer(('127.0.0.1',args.port),Handler); admin.studio=studio
    try: preview=ThreadingHTTPServer(('127.0.0.1',args.port+1),ArtifactHandler)
    except Exception: admin.server_close(); raise
    preview.studio=studio; preview.admin_origin=f'http://127.0.0.1:{args.port}'
    thread=threading.Thread(target=preview.serve_forever,daemon=True); thread.start()
    url=f'http://127.0.0.1:{args.port}'
    print(f'{SUITE_NAME}：{url}\n本地保存：{studio.data}\n关闭此终端会停止服务，文件和评分仍保留。',flush=True)
    if args.open: webbrowser.open(url)
    try: admin.serve_forever()
    except KeyboardInterrupt: pass
    finally:
        preview.shutdown(); preview.server_close(); admin.server_close(); studio.worker.shutdown(wait=True)
