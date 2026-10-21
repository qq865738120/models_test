"""Validate portable artifact archives without touching task workspaces or scores."""
import json
import re
import subprocess

from . import manager as m
from .studio import safe_file


def history_report(tracked=False):
    root=m.ROOT.resolve()
    problems=[]
    required=set()
    artifacts=[]
    runs=0

    def require(path):
        required.add(path.relative_to(root).as_posix())
        if not path.is_file() or path.is_symlink():
            raise ValueError(f'历史文件缺失或为链接：{path.relative_to(root)}')

    for run_file in sorted(m.RUNS.resolve().glob('*/control/run.json')):
        runs+=1
        run_id=run_file.parent.parent.name
        try:
            run=m.get_run(run_id)
            require(run_file)
            meta=m.load(run_file)
            # Old runs may use the catalog fallback and have no imported works.
            rubric=run/'control/rubric.json'
            if rubric.exists() or meta.get('suiteId')==m.SUITE_ID: require(rubric)
            review_path=run/'control/review.json'
            if not review_path.exists(): continue
            require(review_path)
            review=m.load(review_path)
            for task_id,phases in review.get('artifacts',{}).items():
                if task_id not in meta['tasks']: raise ValueError(f'成果引用了不存在的题目：{task_id}')
                for phase,items in phases.items():
                    if phase not in ('initial','change'): raise ValueError(f'成果阶段无效：{phase}')
                    for item in items:
                        artifact_id=item['id']
                        if not re.fullmatch(r'[0-9a-f]{32}',artifact_id):
                            raise ValueError('成果编号无效')
                        label=f'{run_id}/{task_id}/{phase}/{artifact_id}'
                        try:
                            base=root/'data/artifacts'/artifact_id
                            manifest_path=safe_file(base,'manifest.json')
                            require(manifest_path)
                            manifest=m.load(manifest_path)
                            if any(manifest.get(k)!=v for k,v in (
                                ('runId',run_id),('taskId',task_id),('phase',phase))):
                                raise ValueError('成果清单与轮次、题目或阶段不一致')
                            files=base/'files'
                            safe_file(files,'index.html')
                            actual=m.manifest(files)
                            if any('link' in info for info in actual.values()):
                                raise ValueError('归档成果不能包含链接')
                            if actual!=manifest['files'] or m.digest(actual)!=item['sha256']:
                                raise ValueError('归档成果缺失或内容与导入时不一致')
                            entry='answers.json' if item.get('delivery')=='answers-json' else 'index.html'
                            safe_file(files,entry)
                            if item.get('delivery')=='fullstack-node' or manifest.get('delivery')=='fullstack-node':
                                if item.get('delivery')!=manifest.get('delivery'):
                                    raise ValueError('前后端成果交付类型与归档清单不一致')
                                from .fullstack import BACKEND_FILES
                                for relative in BACKEND_FILES: require(safe_file(files,relative))
                            if item.get('entry')!=entry or item['fileCount']!=len(actual):
                                raise ValueError('成果入口或文件数量与记录不一致')
                            if item.get('answerKeySha256') or manifest.get('answerKeySha256'):
                                key_path=safe_file(base,'answer-key.json')
                                require(key_path)
                                key_sha=m.sha(key_path)
                                if key_sha!=item.get('answerKeySha256') or key_sha!=manifest.get('answerKeySha256'):
                                    raise ValueError('归档标准答案与导入时不一致')
                            for name in actual: require(files/name)
                            artifacts.append({'run':run_id,'task':task_id,'phase':phase,
                                'id':artifact_id,'files':len(actual)})
                        except (ValueError,OSError,KeyError,TypeError) as exc:
                            problems.append(f'{label}：{exc}')
        except (ValueError,OSError,KeyError,TypeError) as exc:
            problems.append(f'{run_id}：{exc}')

    if tracked:
        result=subprocess.run(['git','-C',str(m.ROOT),'ls-files','--cached','-z'],
            check=True,capture_output=True)
        committed=set(result.stdout.decode('utf-8').split('\0'))
        problems.extend(f'历史展示文件尚未纳入Git：{p}' for p in sorted(required-committed))
    return {'passed':not problems,'runs':runs,'artifacts':artifacts,'problems':problems}


def verify_history(args,verbose=True):
    report=history_report(tracked=getattr(args,'tracked',False))
    if verbose or not report['passed']:
        print(json.dumps(report,ensure_ascii=False,indent=2))
    else:
        print(f"历史作品校验通过：{report['runs']} 个轮次，{len(report['artifacts'])} 个作品版本。",flush=True)
    if not report['passed']: raise ValueError('历史作品校验未通过，请恢复上述归档文件；无需安装题目依赖。')
    return report
