import argparse
import datetime as dt
import hashlib
import html
import json
import os
import platform
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import urllib.request
import uuid
import zipfile
from pathlib import Path

from .assets import TASKS, VERSION, SEED, generate, write, dump
from .standard import read_standard
from .reasoning import normalize_reasoning, set_reasoning
from .harnesses import normalize_harness, HARNESS_OPTIONS
from .catalog import SUITE_ID, SUITE_NAME, RUBRIC_VERSION, catalog, candidate_task, candidate_change

ROOT = Path(__file__).resolve().parents[1]
PREPARED = ROOT / '.prepared'
RUNS = ROOT / 'runs'
RULE_NAMES = ('COMMON_RULES.md', 'AGENTS.md', 'CLAUDE.md', 'TASK.md')
PROTECTED_ROOTS = ('materials', 'public/materials', 'vendor', 'public/vendor', 'tools', 'node_modules')
PROTECTED_FILES = RULE_NAMES + ('package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', '.gitignore', '.npmrc')
PAPER_URL = 'https://arxiv.org/pdf/2410.10813v2'


def now():
    return dt.datetime.now(dt.timezone.utc).isoformat()


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load(path):
    return json.loads(path.read_text(encoding='utf-8'))


def fail(message):
    raise ValueError(message)


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name('.' + path.name + '-' + uuid.uuid4().hex)
    try:
        dump(temp, value)
        os.replace(temp, path)
    finally:
        temp.unlink(missing_ok=True)


def inside(path, boundary):
    try:
        path.resolve().relative_to(boundary.resolve())
        return True
    except (ValueError, RuntimeError):
        return False


def files(root, skip=()):
    """Never follow directory symlinks; reject external links and special files."""
    for current, dirs, names in os.walk(root, followlinks=False):
        here = Path(current)
        for name in list(dirs):
            path = here / name
            rel = path.relative_to(root).as_posix()
            if any(rel == s or rel.startswith(s + '/') for s in skip):
                dirs.remove(name)
                continue
            if path.is_symlink():
                dirs.remove(name)
                if not inside(path, root): fail(f'目录链接越界：{rel}')
                yield path
        for name in sorted(names):
            path = here / name
            rel = path.relative_to(root).as_posix()
            if any(rel == s or rel.startswith(s + '/') for s in skip): continue
            if path.is_symlink():
                if not inside(path, root): fail(f'文件链接越界：{rel}')
            elif not stat.S_ISREG(path.lstat().st_mode):
                fail(f'不支持特殊文件：{rel}')
            elif path.stat().st_nlink > 1:
                fail(f'不接受硬链接文件：{rel}')
            yield path


def manifest(root, skip=()):
    result = {}
    for path in files(root, skip):
        rel = path.relative_to(root).as_posix()
        if path.is_symlink():
            result[rel] = {'link': os.readlink(path)}
        else:
            result[rel] = {'sha256': sha(path), 'executable': bool(path.stat().st_mode & 0o111)}
    return dict(sorted(result.items()))


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()


def protected(rel):
    return rel in PROTECTED_FILES or any(rel == p or rel.startswith(p + '/') for p in PROTECTED_ROOTS)


def run_command(argv, cwd, env=None):
    print('准备：' + cwd.name + ' / ' + ' '.join(argv[:3]), flush=True)
    subprocess.run(argv, cwd=cwd, env=env, check=True)


def prepare(args):
    if PREPARED.exists() and not args.rebuild:
        fail('材料已经准备。新运行直接使用 init；更换材料请显式 prepare --rebuild，旧运行仍保持原版本。')
    if not shutil.which('npm'): fail('准备前端材料需要 Node.js 与 npm；doctor 可查看环境。')
    root_staging = Path(tempfile.mkdtemp(prefix='.prepare-', dir=ROOT))
    try:
        generate(ROOT, root_staging, longread=True)
        standard = read_standard(ROOT / 'llm-evaluation-standard.html')
        rules = (ROOT / 'rules/COMMON_RULES.md').read_text()
        for n, (key, (title, budget, change_budget)) in enumerate(TASKS.items(), 1):
            project = root_staging / 'tasks' / key
            task_text = candidate_task(key, standard)
            # section包含两段pre：只保留初始段，变更的具体要求不进入工作区。
            write(project / 'TASK.md', task_text + '\n')
            for name in RULE_NAMES[:3]: write(project / name, rules)
            if (project / 'package.json').exists():
                write(project/'.npmrc', 'cache=.runtime/npm\nlogs-dir=.runtime/npm/logs\nupdate-notifier=false\naudit=false\nfund=false\n')
                # 所有依赖进入单题目录，不采用通向管理目录的共享链接。
                env = dict(os.environ, npm_config_cache=str(ROOT / '.cache/npm'))
                lock = ROOT / 'templates' / key / 'package-lock.json'
                if lock.exists(): shutil.copy(lock, project / 'package-lock.json')
                run_command(['npm', 'ci' if lock.exists() else 'install', '--ignore-scripts', '--no-audit', '--no-fund'], project, env)
                # esbuild 的平台包通过 optional dependency 安装；显式验证可运行。
                run_command(['npm', 'run', 'build'], project)
                shutil.rmtree(project / 'dist', ignore_errors=True)
                shutil.rmtree(project / 'output', ignore_errors=True)
                write(project / 'output/.keep', '')
                shutil.rmtree(project / '.runtime', ignore_errors=True)
                shutil.copy(project / 'package-lock.json', lock)
                local_docs(project)
            if key == '05-game3d': copy_ammo(project)
            if key == '06-memory':
                from .longread import prepare_pdf_renderer
                prepare_pdf_renderer(ROOT, project)
            write(project / 'materials/START.md', start_instructions(key))
        for n, key in enumerate(TASKS, 1):
            write(root_staging / 'admin' / key / 'change.txt', candidate_change(key, standard) + '\n')
            write(root_staging / 'admin' / key / 'rubric.txt', json.dumps(next(t for t in catalog() if t['id']==key),ensure_ascii=False,indent=2) + '\n')
            if key=='06-memory':
                dump(root_staging/'admin'/key/'rubric.json', next(t for t in catalog() if t['id']==key))
        dump(root_staging/'rubric.json', {'version':RUBRIC_VERSION,'tasks':catalog()})
        entries = manifest(root_staging)
        meta = {'suiteId':SUITE_ID,'version':VERSION,'seed':SEED,'preparedAt':now(),'standardSha256':sha(ROOT/'llm-evaluation-standard.html'),
            'rulesSha256':sha(ROOT/'rules/COMMON_RULES.md'),'bundleSha256':digest(entries), 'files':entries,
            'platform':platform.platform(),'architecture':platform.machine(),'node':version('node'),'npm':version('npm'),
            'status':'pilot-unverified','manualCalibration':None}
        dump(root_staging / 'bundle.json', meta)
        if PREPARED.exists():
            backup = ROOT / ('.prepared-backup-' + uuid.uuid4().hex[:8])
            PREPARED.rename(backup)
            try: root_staging.rename(PREPARED)
            except Exception:
                backup.rename(PREPARED); raise
            print('旧材料备份：' + str(backup))
        else: root_staging.rename(PREPARED)
        print('材料准备完成：' + meta['bundleSha256'] + '\n状态：试运行；正式比较前需按预跑清单校准。')
    finally:
        if root_staging.exists(): shutil.rmtree(root_staging)


def revise_prepared(args):
    """Offline revision: verify and copy the old bundle before making a new version."""
    if PREPARED.is_symlink(): fail('准备目录不得是符号链接')
    meta = load(PREPARED/'bundle.json')
    if meta.get('version') == VERSION: fail('当前材料已经是新版，拒绝重复修订')
    if meta.get('version') not in ('pelican-v1.0-longread-20261018','pelican-v1.0-prompts-20261019','pelican-v1.0-pages-20261019','pelican-v1.0-objective-20261020','pelican-v1.0-six-tasks-20261020','pelican-v1.0-hybrid-20261020','pelican-v1.0-longread-v2-20261020','pelican-v1.0-manual-review-20261020','pelican-v1.0-review-r11-20261020','pelican-v1.0-longread-v3-20261021','pelican-v1.0-creative-20261021','pelican-v1.0-longread-v4-20261021','pelican-v1.0-project-rules-20261021') or meta.get('suiteId') != SUITE_ID:
        fail('仅支持从兼容的五题或六题材料包离线修订；其他版本请 prepare --rebuild')
    entries = manifest(PREPARED, skip=('bundle.json','approval.json'))
    if digest(entries) != meta['bundleSha256']: fail('旧材料完整性校验失败，拒绝修订')
    staging = Path(tempfile.mkdtemp(prefix='.prepare-',dir=ROOT))
    try:
        shutil.copytree(PREPARED,staging,dirs_exist_ok=True,symlinks=True)
        (staging/'approval.json').unlink(missing_ok=True)
        # This is the only conversion boundary for pre-r8 material IDs. Runtime
        # task selection accepts canonical IDs, never a numeric-prefix alias.
        previous_ids={'02-dispatch':'03-dispatch','03-game2d':'04-game2d',
                      '04-game3d':'05-game3d','05-memory':'06-memory'}
        for area in ('tasks','admin'):
            for previous,current in previous_ids.items():
                source=staging/area/previous
                if not source.exists(): continue
                destination=staging/area/current
                if destination.exists(): fail('新旧题目目录同时存在，拒绝覆盖：'+current)
                source.rename(destination)
        for key in TASKS:
            project=staging/'tasks'/key
            for filename in ('package.json','package-lock.json'):
                path=project/filename
                if not path.exists(): continue
                value=load(path)
                value['name']='llm-bench-'+key
                if filename=='package-lock.json' and '' in value.get('packages',{}):
                    value['packages']['']['name']=value['name']
                dump(path,value)
        standard = read_standard(ROOT/'llm-evaluation-standard.html')
        from .objective import install as install_objective
        install_objective(staging)
        static_project=staging/'tasks/02-static'
        shutil.copytree(ROOT/'templates/02-static',static_project,dirs_exist_ok=True)
        write(static_project/'output/.keep','')
        write(static_project/'.gitignore','__pycache__/\n.runtime/\n')
        from .dispatch import install as install_dispatch
        install_dispatch(staging/'tasks/03-dispatch', ROOT/'templates')
        from .automation_contract import install as install_automation_contract
        for key in TASKS:
            if key != '06-memory':
                install_automation_contract(staging/'tasks'/key, key)
            write(staging/'tasks'/key/'TASK.md',candidate_task(key,standard)+'\n')
            write(staging/'admin'/key/'change.txt',candidate_change(key,standard)+'\n')
            write(staging/'admin'/key/'rubric.txt',json.dumps(next(t for t in catalog() if t['id']==key),ensure_ascii=False,indent=2)+'\n')
            for name in RULE_NAMES[:3]:
                write(staging/'tasks'/key/name,(ROOT/'rules/COMMON_RULES.md').read_text())
            write(staging/'tasks'/key/'materials/START.md',start_instructions(key))
            if key == '06-memory':
                dump(staging/'admin'/key/'rubric.json',next(t for t in catalog() if t['id']==key))
        from .assets import install_game_materials
        for key in ('04-game2d', '05-game3d'):
            install_game_materials(staging/'tasks'/key, key)
        dump(staging/'catalog.json',{key:{'title':v[0],'initialMinutes':v[1],'changeMinutes':v[2]} for key,v in TASKS.items()})
        dump(staging/'rubric.json',{'version':RUBRIC_VERSION,'tasks':catalog()})
        entries=manifest(staging,skip=('bundle.json','approval.json'))
        updated={**meta,'version':VERSION,'preparedAt':now(),'files':entries,'bundleSha256':digest(entries),
                 'rulesSha256':sha(ROOT/'rules/COMMON_RULES.md'),
                 'previousBundleSha256':meta['bundleSha256'],'status':'pilot-unverified','manualCalibration':None}
        dump(staging/'bundle.json',updated)
        # Detect concurrent changes before swapping; never overwrite an existing backup.
        if digest(manifest(PREPARED,skip=('bundle.json','approval.json'))) != meta['bundleSha256']:
            fail('修订期间原材料变化，拒绝替换')
        backup=ROOT/('.prepared-backup-'+uuid.uuid4().hex)
        PREPARED.rename(backup)
        try: staging.rename(PREPARED)
        except Exception:
            backup.rename(PREPARED); raise
        print('新版材料已离线修订：'+updated['bundleSha256']+'\n旧材料备份：'+str(backup))
    finally:
        if staging.exists(): shutil.rmtree(staging)


def version(command):
    if not shutil.which(command): return None
    return subprocess.run([command, '--version'], capture_output=True, text=True).stdout.strip()


def local_docs(project):
    dest = project / 'materials/dependency-docs'
    for path in sorted((project / 'node_modules').glob('**/README*')):
        if path.is_file() and not path.is_symlink() and path.stat().st_size <= 500_000:
            rel = path.relative_to(project / 'node_modules')
            target = dest / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(path, target)


def copy_ammo(project):
    candidates = [p for p in (project / 'node_modules').glob('**/ammo.wasm.js') if p.is_file()]
    if not candidates: fail('依赖包内未找到本地Ammo物理资源')
    folder = candidates[0].parent
    dest = project / 'public/vendor/ammo'
    dest.mkdir(parents=True, exist_ok=True)
    for name in ('ammo.wasm.js', 'ammo.wasm.wasm', 'ammo.js'):
        path = folder / name
        if path.exists(): shutil.copy(path, dest / name)
    if not (dest / 'ammo.wasm.wasm').exists(): fail('本地Ammo WASM不完整')


def start_instructions(key):
    if key == '01-svg': return '将SVG内联到output/index.html。运行 python3 -m http.server 5173 --bind 127.0.0.1 --directory output，打开 http://127.0.0.1:5173/。\n'
    if key == '02-static': return (ROOT / 'templates/02-static/materials/START.md').read_text(encoding='utf-8')
    if key == '03-dispatch':
        from .dispatch import START_TEXT
        return START_TEXT
    if key == '06-memory': return '先阅读TASK.md、materials/INDEX.md和materials/novel/INDEX.md。论文有PDF和按PDF页码提取的TXT，小说有完整TXT及58个分节。按需检索和交叉阅读。只将各题答案写入output/answers.json，可参考materials/answer-template.json的题号；无需HTML、报告、解释或引用。禁止修改materials。\n'
    return 'npm run dev\n构建 npm run build，最终入口output/index.html；生产预览 npm run preview。依赖已在项目内安装，所有资源使用相对路径。\n性能采样：控制台粘贴tools/performance.js原文，使用window.bench。\n'


def ensure_prepared(profile='local'):
    if not (PREPARED / 'bundle.json').exists(): fail('尚未准备材料，请先 python3 bench.py prepare；双击入口可自动准备。')
    meta = load(PREPARED / 'bundle.json')
    if meta.get('suiteId') != SUITE_ID or meta.get('version') != VERSION: fail('现有材料版本不同；先 prepare --rebuild 生成当前版本材料。')
    arch = lambda value: {'aarch64':'arm64','x86_64':'amd64'}.get(value,value)
    same_arch=arch(meta['architecture'])==arch(platform.machine())
    same_platform=meta['platform'].split('-')[0]==platform.platform().split('-')[0]
    if not same_arch or (not same_platform and not (profile=='sandbox' and meta['platform'].startswith('Linux'))):
        fail('材料预装依赖与当前平台不同。普通模式需在本机准备，sandbox模式需在同架构Linux容器准备；不可直接复用跨平台node_modules。')
    current = manifest(PREPARED, skip=('bundle.json', 'approval.json'))
    if digest(current) != meta['bundleSha256']: fail('准备材料已变化；请保留证据并显式重建，不可继续初始化')
    return meta


def task_keys(value):
    if value == 'all': return list(TASKS)
    if value in TASKS: return [value]
    count=len(TASKS)
    try: return [list(TASKS)[int(value)-1]] if 1 <= int(value) <= count else fail(f'题号必须为1–{count}或all')
    except (ValueError, IndexError, TypeError): fail(f'未知题号；使用1–{count}、all或题目目录名称')


def slug(value):
    value = re.sub(r'[^a-zA-Z0-9_-]+', '-', value).strip('-').lower()[:60]
    return value or 'model'


def safe_id(value):
    if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_-]{0,100}', value): fail('运行编号只能使用字母、数字、横线和下划线')
    return value


def init_run(args):
    harness = normalize_harness(getattr(args,"harness",None),getattr(args,"harness_custom",""))
    reasoning = normalize_reasoning(getattr(args,"reasoning_level",None))
    bundle = ensure_prepared(args.profile)
    if args.profile=='sandbox' and not bundle['platform'].startswith('Linux'):
        fail('sandbox模式需要Linux准备材料。先用运行镜像在Linux环境 prepare --rebuild，再在宿主机 init --profile sandbox。')
    if args.repeat < 1: fail('重复编号必须≥1')
    keys = task_keys(args.task)
    run_id = safe_id(args.run_id or (dt.datetime.now().strftime('%Y%m%d-%H%M%S')+'-'+slug(args.model)+'-r'+str(args.repeat)+'-'+uuid.uuid4().hex[:6]))
    RUNS.mkdir(exist_ok=True)
    if RUNS.is_symlink(): fail('runs 不得是符号链接')
    destination = RUNS / run_id
    if destination.exists() or destination.is_symlink(): fail('运行目录已存在，拒绝覆盖；请换一个运行编号')
    temp = Path(tempfile.mkdtemp(prefix='.initializing-', dir=RUNS))
    try:
        shutil.copytree(PREPARED / 'admin', temp / 'control/private')
        # 仅分发所选题；其他题目的变更和保留数据留在原管理项目中。
        for key in list(TASKS):
            if key not in keys and (temp/'control/private'/key).exists(): shutil.rmtree(temp/'control/private'/key)
        baselines = {}; meta_tasks = {}
        for key in keys:
            source = PREPARED / 'tasks' / key
            project = temp / 'tasks' / key
            shutil.copytree(source, project, symlinks=True)
            baselines[key] = manifest(project)
            meta_tasks[key] = {'phase':'initial','initialSnapshot':None,'changeSnapshot':None,'changeReleasedAt':None,'startedAt':None,'finishedAt':None}
            write(temp/'control/prompts'/f'{key}-initial.txt', initial_prompt(key))
        approval = load(PREPARED/'approval.json') if (PREPARED/'approval.json').exists() else None
        dump(temp/'control/baseline.json', baselines)
        pinned=load(PREPARED/'rubric.json') if (PREPARED/'rubric.json').exists() else {'version':RUBRIC_VERSION,'tasks':catalog()}
        dump(temp/'control/rubric.json', pinned)
        dump(temp/'control/run.json', {**harness,'id':run_id,'suiteId':SUITE_ID,'suiteName':SUITE_NAME,'rubricVersion':pinned['version'],'model':args.model,'repeat':args.repeat,'createdAt':now(),
            'bundleSha256':bundle['bundleSha256'],'materialVersion':bundle['version'],'rulesSha256':bundle['rulesSha256'],
            'preparedEnvironment':{name:bundle[name] for name in ('platform','architecture','node','npm')},
            'profile':args.profile,'enforcement':'rules-only' if args.profile=='local' else 'sandbox-planned-unverified',
            'toolPolicy':'offline; no extra models/agents/connectors; single task root',
            'environment':{'platform':platform.platform(),'python':platform.python_version(),'node':version('node'),'npm':version('npm'),'browser':None,'agentClient':None,'reasoning':None,'reasoningLevel':reasoning,'temperature':None,'hardware':None},
            'calibration':approval,'tasks':meta_tasks,'manualInterventions':[], 'cost':{'tokens':None,'amount':None,'unit':None,'source':None},'results':{}})
        temp.rename(destination)
        render_page(destination)
        print('已初始化：' + str(destination))
        for key in keys:
            print('智能体项目根目录：' + str(destination/'tasks'/key))
        print('复制提示词：' + str(destination/'control/START.html'))
        print('隔离状态：规则约束' if args.profile=='local' else '隔离状态：待将全部智能体工具接入容器；尚不能记为强制隔离')
        return destination
    finally:
        if temp.exists(): shutil.rmtree(temp)


def initial_prompt(key):
    source = PREPARED/'tasks'/key
    objective = key == '06-memory' and (source/'materials/questions.json').exists()
    delivery = ('阅读材料并作答，最终只交付output/answers.json，不需要HTML或DELIVERY.md。\n\n' if objective
                else '已预装依赖；正式测试禁止联网安装。实现并自测，最终交付 output/index.html 与 output/DELIVERY.md。\n\n')
    return ('你正在参加同一条件下的开发与研究能力评测。本次授权范围仅为当前单题项目。\n'
        '先读取当前项目 COMMON_RULES.md、TASK.md、materials/START.md。不要读取项目父目录或评测管理目录。\n'
        + delivery
        + (source/'COMMON_RULES.md').read_text() + '\n\n' + (source/'TASK.md').read_text())


def get_run(value):
    candidate = Path(value)
    if not candidate.is_absolute():
        candidate = (ROOT/candidate) if candidate.parts and candidate.parts[0]=='runs' else RUNS/candidate
    if candidate.is_symlink(): fail('运行目录不得是符号链接')
    candidate = candidate.resolve()
    if candidate.parent != RUNS.resolve() or not (candidate/'control/run.json').is_file(): fail('必须指定本项目 runs 下的完整运行编号')
    if (candidate/'control').is_symlink(): fail('control目录不得是链接')
    return candidate


def get_task(run, value):
    if value=='all': fail('该操作每次处理一道题，不能使用all')
    available=load(run/'control/run.json')['tasks']
    if value in available:
        key=value
    else:
        # A task's displayed number belongs to its pinned run, not today's suite.
        # Pre-catalog runs retain the numeric prefix of their original IDs.
        pinned=run/'control/rubric.json'
        definitions=(load(pinned)['tasks'] if pinned.exists()
                     else [{'id':key,'number':key.split('-',1)[0]} for key in available])
        try: number=int(value)
        except (TypeError,ValueError): fail('本次运行未初始化该题')
        matches=[item['id'] for item in definitions
                 if item['id'] in available and int(item.get('number',item['id'].split('-',1)[0]))==number]
        if len(matches)!=1: fail('本次运行未初始化该题，或固定题号不唯一；请使用题目目录名称')
        key=matches[0]
    project = run/'tasks'/key
    if project.is_symlink() or not inside(project, run/'tasks'): fail('任务目录越界')
    return key,project


def integrity(run, key):
    baseline=load(run/'control/baseline.json')[key]
    project=run/'tasks'/key
    # 浏览器等临时状态不归档，也不扫描其 socket / 临时链接。
    # 其余路径仍检查链接边界，只对公开的受保护路径判定变更。
    current=manifest(project,skip=('.runtime',))
    problems=[]
    for name in sorted(set(baseline)|set(current)):
        if protected(name) and current.get(name)!=baseline.get(name):
            problems.append({'path':name,'kind':'missing' if name not in current else 'added' if name not in baseline else 'modified'})
    return problems


def check(args):
    run=get_run(args.run)
    keys=list(load(run/'control/run.json')['tasks']) if args.task=='all' else [get_task(run,args.task)[0]]
    findings={}
    for key in keys:
        try: findings[key]=integrity(run,key)
        except ValueError as exc: findings[key]=[{'path':'filesystem','kind':'unsafe','detail':str(exc)}]
    output={'checkedAt':now(),'passed':not any(findings.values()),'findings':findings,
        'scope':'受保护文件完整性与链接边界；不证明没有越界读取、不代表功能评分'}
    path=run/'control/audits'/('check-'+uuid.uuid4().hex+'.json')
    dump(path,output)
    print(json.dumps(output,ensure_ascii=False,indent=2))
    if not output['passed']: raise SystemExit(2)


def snapshot(args):
    run=get_run(args.run); key,project=get_task(run,args.task)
    metadata=load(run/'control/run.json'); state=metadata['tasks'][key]
    if args.phase != state['phase']: fail('只能冻结当前阶段；先冻结initial，再用 prompt --phase change 释放变更')
    dest=run/'control/snapshots'/key/args.phase
    if dest.exists(): fail('该阶段已冻结，拒绝覆盖')
    issues=integrity(run,key)
    if issues and not args.allow_invalid: fail('受保护材料变化，无法作为有效交付冻结；可 --allow-invalid 保留违规样本')
    dest.parent.mkdir(parents=True,exist_ok=True)
    temp=Path(tempfile.mkdtemp(prefix='.freezing-',dir=dest.parent))
    try:
        included=manifest(project,skip=('node_modules','dist','.git','__pycache__','.runtime'))
        tree=temp/'project'
        tree.mkdir()
        for rel, info in included.items():
            src=project/rel; target=tree/rel
            target.parent.mkdir(parents=True,exist_ok=True)
            if 'link' in info:
                # A link to an omitted tree would make a snapshot non-self-contained.
                resolved=src.resolve().relative_to(project.resolve()).as_posix()
                if any(resolved==s or resolved.startswith(s+'/') for s in ('node_modules','dist','.git','.runtime')):
                    fail('成果链接指向未归档目录，无法冻结：'+rel)
                target.symlink_to(info['link'])
            else: shutil.copy2(src,target)
        if manifest(tree)!=included or manifest(project,skip=('node_modules','dist','.git','__pycache__','.runtime'))!=included:
            fail('冻结期间文件变化，请停止智能体与服务后重试')
        if integrity(run,key)!=issues:
            fail('冻结期间依赖或受保护材料变化，请停止智能体与服务后重试')
        freeze={'phase':args.phase,'createdAt':now(),'sourceSha256':digest(included),'files':included,
            'integrityPassed':not issues,'issues':issues,'bundleSha256':metadata['bundleSha256'],
            'note':'node_modules按锁文件与材料哈希记录，不复制；dist可从归档源码构建。功能和人工分数未自动判定。'}
        dump(temp/'snapshot.json',freeze)
        temp.rename(dest)
        # 只读提高误操作门槛，不宣称阻止同用户管理员篡改。
        for path in files(dest):
            if not path.is_symlink(): path.chmod(path.stat().st_mode & ~0o222)
        state[args.phase+'Snapshot']=str(dest.relative_to(run))
        state['finishedAt']=now()
        atomic_json(run/'control/run.json',metadata)
        render_page(run)
        print('阶段已冻结：'+str(dest)+'\n源码哈希：'+freeze['sourceSha256'])
    finally:
        if temp.exists(): shutil.rmtree(temp)


def release_change(run,key,project):
    metadata=load(run/'control/run.json'); state=metadata['tasks'][key]
    if state['changeSnapshot']: fail('追加阶段已冻结，不能继续释放')
    if not state['initialSnapshot']: fail('初始成果尚未冻结，先 snapshot --phase initial')
    snapshot_path=run/state['initialSnapshot']
    freeze=load(snapshot_path/'snapshot.json')
    if not freeze['integrityPassed']: fail('初始样本已无效，请保留证据并重新开始独立运行')
    if state['phase']=='change': return
    if manifest(snapshot_path/'project')!=freeze['files']: fail('初始快照已被篡改，不能释放追加阶段')
    if digest(manifest(project,skip=('node_modules','dist','.git','__pycache__','.runtime')))!=freeze['sourceSha256']:
        fail('当前成果与冻结的初始成果不同，不能悄悄带入额外修改')
    if integrity(run,key): fail('受保护文件变化，不能释放追加阶段')
    if key=='06-memory' and (run/'control/private/06-memory/change-corpus.json').exists() and not (run/'control/private/06-memory/answer-key.json').exists():
        dest=project/'materials/change'
        if dest.exists(): fail('第二阶段资料路径已存在，拒绝覆盖')
        dest.mkdir()
        shutil.copy(run/'control/private/06-memory/change-corpus.json',dest/'corpus.json')
        shutil.copy(run/'control/private/06-memory/change-dev.json',dest/'dev.json')
        baselines=load(run/'control/baseline.json')
        for rel,info in manifest(project,skip=('.runtime',)).items():
            if rel.startswith('materials/change/'): baselines[key][rel]=info
        atomic_json(run/'control/baseline.json',baselines)
    spec=pinned_task(run,key); budget=spec['changeMinutes']
    text=f'初始阶段已冻结。现在开始固定追加阶段，预算{budget}分钟。继续遵守COMMON_RULES.md，勿改写初始快照。\n\n'+(run/'control/private'/key/'change.txt').read_text()
    write(run/'control/prompts'/f'{key}-change.txt',text)
    # 在被测项目内加入当前阶段要求；此文件同样受保护。
    write(project/'materials/CHANGE.md',text)
    baselines=load(run/'control/baseline.json')
    baselines[key]['materials/CHANGE.md']=manifest(project,skip=('.runtime',))['materials/CHANGE.md']
    atomic_json(run/'control/baseline.json',baselines)
    state.update(phase='change',changeReleasedAt=now(),startedAt=None,finishedAt=None)
    atomic_json(run/'control/run.json',metadata)
    render_page(run)


def prompt(args):
    run=get_run(args.run); key,project=get_task(run,args.task)
    if args.phase=='change': release_change(run,key,project)
    path=run/'control/prompts'/f'{key}-{args.phase}.txt'
    text=path.read_text()
    if args.copy:
        if not shutil.which('pbcopy'): fail('当前平台没有pbcopy，请从START.html复制')
        subprocess.run(['pbcopy'],input=text,text=True,check=True)
        print('已复制当前阶段提示词：'+str(path))
    else: print(text)


def render_page(run):
    metadata=load(run/'control/run.json'); cards=[]
    if metadata.get('suiteId')==SUITE_ID:
        url='http://127.0.0.1:8787/?run='+metadata['id']
        write(run/'control/START.html',f'''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>鹈鹕测评 v1.0</title><style>body{{margin:0;background:#101812;color:#dfe6d7;font:16px/1.8 system-ui;display:grid;place-items:center;min-height:100vh}}main{{max-width:620px;padding:40px}}a{{color:#eab17c}}small{{color:#91a083}}</style><main><small>PELICAN EVALUATION STUDIO</small><h1>鹈鹕测评 v1.0</h1><p>模型：{html.escape(metadata['model'])}</p><p><a href="{html.escape(url)}">打开主持人工作台 →</a></p><p>先双击项目根目录的「启动鹈鹕测评.command」。题目、提示词、作品和评分统一在工作台中查看。</p><small>如使用了自定义端口，请在相应工作台中选择本轮记录。</small></main></html>''')
        return
    enforcement={'rules-only':'规则约束，尚未强制隔离','sandbox-planned-unverified':'待接入受限环境，尚未验证','terminal-container-only; full-agent isolation unverified':'终端容器已启动，完整智能体接入尚未验证'}.get(metadata['enforcement'],metadata['enforcement'])
    for key,state in metadata['tasks'].items():
        title=pinned_task(run,key)['title']
        texts=[]
        for phase,label in [('initial','初始阶段'),('change','追加阶段')]:
            path=run/'control/prompts'/f'{key}-{phase}.txt'
            if path.exists():
                text=html.escape(path.read_text())
                texts.append(f'<h3>{label}</h3><button data-copy="{key}-{phase}">复制提示词</button><textarea id="{key}-{phase}" readonly>{text}</textarea>')
            else:
                texts.append('<p class="muted">追加提示词未释放：先冻结初始成果，再在评测管理终端使用 prompt --phase change。</p>')
        project=html.escape(str(run/'tasks'/key))
        phase_label='初始阶段' if state['phase']=='initial' else '追加阶段'
        cards.append(f'<section><h2>{html.escape(key)} · {html.escape(title)}</h2><p>智能体项目根目录</p><code>{project}</code><p>当前阶段：{phase_label}</p>'+''.join(texts)+'</section>')
    body=f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>评测提示词</title><style>
body{{margin:0;background:#f3f6fb;color:#1a2b42;font:16px/1.7 system-ui,sans-serif}}main{{max-width:1024px;margin:40px auto;padding:0 24px}}section{{background:white;border:1px solid #dfe5ef;border-radius:14px;padding:28px;margin:24px 0}}h1{{font-size:30px}}h2{{font-size:22px}}code{{display:block;overflow-wrap:anywhere;background:#eff3fa;padding:12px}}textarea{{box-sizing:border-box;width:100%;height:300px;font:14px/1.6 system-ui;border:1px solid #d2dbe8;padding:16px;margin-top:12px;resize:vertical}}button{{background:#2767cf;color:white;border:0;border-radius:8px;padding:10px 18px;font:inherit;cursor:pointer}}.muted{{color:#6b788e}}#status{{min-height:26px}}</style></head><body><main>
<h1>大模型评测 · 复制提示词</h1><p>模型：{html.escape(metadata['model'])} · 重复 {metadata['repeat']} · {html.escape(metadata['materialVersion'])}</p>
<p>请在智能体中只打开下面的单题目录。此管理页面留给主持人；每题独立新会话。当前限制方式：{html.escape(enforcement)}。</p><p id="status" aria-live="polite"></p>{''.join(cards)}</main><script>
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{{const box=document.getElementById(button.dataset.copy);box.focus();box.select();try{{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(box.value);else if(!document.execCommand('copy'))throw Error('clipboard');document.getElementById('status').textContent='提示词已复制'}}catch(e){{document.getElementById('status').textContent='已选中文本，请按 Command+C 或 Ctrl+C 复制'}}}}));</script></body></html>'''
    write(run/'control/START.html',body)


def export_project(args):
    run=get_run(args.run); key,project=get_task(run,args.task)
    state=load(run/'control/run.json')['tasks'][key]
    if state['phase']!='initial' or state['initialSnapshot']: fail('上传材料包仅导出初始起始项目；已开始的运行不能伪装成干净材料')
    if integrity(run,key): fail('输入材料已变化，拒绝导出')
    baseline=load(run/'control/baseline.json')[key]
    current=manifest(project)
    if current!=baseline: fail('工作区已包含实现变更，不能作为初始化材料导出')
    output=run/'control/exports'/f'{key}.zip'
    output.parent.mkdir(parents=True,exist_ok=True)
    if output.exists(): fail('导出包已存在，拒绝覆盖')
    with zipfile.ZipFile(output,'x',compression=zipfile.ZIP_DEFLATED) as archive:
        for path in files(project,skip=('node_modules','dist','.git','__pycache__','.runtime')):
            if path.is_symlink(): fail('上传材料包不接受链接')
            archive.write(path,key+'/'+path.relative_to(project).as_posix())
    print('已导出公开材料（不含依赖、隐藏数据、追加提示词）：'+str(output))


def calibrate(args):
    meta=ensure_prepared()
    if not args.note.strip(): fail('必须提供真实人工预跑与校准证据路径或说明')
    path=PREPARED/'approval.json'
    if path.exists(): fail('本材料已有校准记录，拒绝覆盖')
    dump(path, {'bundleSha256':meta['bundleSha256'],'recordedAt':now(),'evidence':args.note,
        'status':'operator-attested','note':'仅保存主持人预跑声明，不自动验证声明真实性；必须连同原始证据评审。'})
    print('已记录主持人预跑声明；证据真实性需人工复查。')


def pinned_task(run,key):
    path=run/'control/rubric.json'
    if path.exists():
        return next(t for t in load(path)['tasks'] if t['id']==key)
    title,minutes,change=TASKS[key]
    if key=='06-memory': title,minutes='NPC真的记住你了吗',90
    return {'title':title,'minutes':minutes,'changeMinutes':change}


def mark_start(args):
    run=get_run(args.run); key,_=get_task(run,args.task)
    metadata=load(run/'control/run.json'); state=metadata['tasks'][key]
    if state[state['phase']+'Snapshot']: fail('当前阶段已冻结')
    if state['startedAt']: fail('当前阶段已开始，拒绝重置计时')
    index=1 if state['phase']=='initial' else 2
    state['startedAt']=now()
    state['deadlineAt']=(dt.datetime.now(dt.timezone.utc)+dt.timedelta(minutes=pinned_task(run,key)['minutes' if index==1 else 'changeMinutes'])).isoformat()
    atomic_json(run/'control/run.json',metadata)
    print('计时已记录，UTC截止：'+state['deadlineAt']+'。主持人负责停止宿主智能体；此命令不控制客户端采样。')


def status(args):
    run=get_run(args.run)
    metadata=load(run/'control/run.json')
    print(json.dumps({'id':metadata['id'],'model':metadata['model'],'repeat':metadata['repeat'],
        'materialVersion':metadata['materialVersion'],'bundleSha256':metadata['bundleSha256'],
        'enforcement':metadata['enforcement'],'calibrated':bool(metadata['calibration']),
        'tasks':metadata['tasks'],'promptPage':str(run/'control/START.html')},ensure_ascii=False,indent=2))


def record(args):
    run=get_run(args.run)
    metadata=load(run/'control/run.json')
    for name in ('agentClient','browser','reasoning','temperature','hardware'):
        value=getattr(args,name)
        if value is not None: metadata['environment'][name]=value
    if getattr(args,'reasoning_level',None) is not None:
        set_reasoning(metadata,args.reasoning_level,now())
    if args.intervention:
        metadata['manualInterventions'].append({'at':now(),'note':args.intervention})
    atomic_json(run/'control/run.json',metadata)
    print('运行环境记录已更新。人工提示须保留；受辅助结果不能混入无辅助主榜。')


def sandbox_command(run,key,project,image):
    if ',' in str(project): fail('Docker mount参数不支持当前路径中的逗号')
    argv=['docker','run','--rm','-it','--network','none','--read-only','--cap-drop','ALL',
        '--security-opt','no-new-privileges','--pids-limit','256','--cpus','4','--memory','8g','--memory-swap','8g',
        '--user',f'{os.getuid()}:{os.getgid()}','--tmpfs','/tmp:rw,nosuid,nodev,size=512m,mode=1777',
        '--mount',f'type=bind,source={project},target=/work', '--workdir','/work',
        '--env','HOME=/tmp/bench-home','--env','npm_config_cache=/tmp/npm-cache']
    for name in PROTECTED_FILES+PROTECTED_ROOTS:
        path=project/name
        # Nested mounts may overlap (e.g. public/materials); exact paths are disjoint here.
        if path.exists():
            argv.extend(['--mount',f'type=bind,source={path},target=/work/{name},readonly'])
    argv.extend([image,'bash'])
    return argv


def sandbox(args):
    run=get_run(args.run); key,project=get_task(run,args.task)
    if integrity(run,key): fail('工作区材料已变化，不能启动受限环境')
    metadata=load(run/'control/run.json')
    if not metadata['preparedEnvironment']['platform'].startswith('Linux'):
        fail('本轮依赖在宿主平台准备，不能直接用于Linux容器；请按README在容器准备材料后创建sandbox运行。')
    image=args.image
    if not re.fullmatch(r'[a-zA-Z0-9._:/@-]+',image): fail('镜像名称格式不合法')
    cmd=sandbox_command(run,key,project,image)
    import shlex
    print(shlex.join(cmd))
    print('仅此容器内的终端受到限制；宿主客户端文件工具不受约束。无外网、仅/work可持久写，/tmp为临时运行库目录。')
    print('必须让智能体的所有文件/终端/浏览器操作进入此容器。可在容器中使用chromium --headless --no-sandbox读取本地服务。')
    if args.launch:
        if not shutil.which('docker'): fail('未安装Docker，未启动容器')
        info=subprocess.run(['docker','image','inspect',image,'--format','{{.Id}}'],check=True,text=True,capture_output=True)
        metadata=load(run/'control/run.json')
        metadata['sandboxImageId']=info.stdout.strip()
        metadata['enforcement']='terminal-container-only; full-agent isolation unverified'
        atomic_json(run/'control/run.json',metadata)
        subprocess.run(cmd,check=True)


def doctor(args):
    data={'python':platform.python_version(),'node':version('node'),'npm':version('npm'),
        'docker':version('docker'),'materialsPrepared':(PREPARED/'bundle.json').exists(),
        'ordinaryLocalEnforcement':'rules-only','platform':platform.platform(),
        'warning':'未接入受限环境的宿主智能体不能被此项目强制限制文件读取。'}
    print(json.dumps(data,ensure_ascii=False,indent=2))


def wizard(args):
    if not (PREPARED/'bundle.json').exists(): prepare(argparse.Namespace(rebuild=False))
    model=input('模型完整名称（例如模型+客户端版本）：').strip()
    if not model: fail('模型名称不能为空')
    print('\n'.join(f'{i}. {value[0]}' for i,value in enumerate(TASKS.values(),1)))
    task=input(f'题号1–{len(TASKS)}，或all（回车默认all）：').strip() or 'all'
    repeat=int(input('独立重复编号（回车默认1）：').strip() or '1')
    path=init_run(argparse.Namespace(model=model,task=task,repeat=repeat,profile='local',run_id=None))
    if sys.platform=='darwin': subprocess.run(['open',str(path/'control/START.html')],check=True)


def main(argv=None):
    from .studio import serve
    from .history import verify_history
    from .launcher import launch
    from .objective import grade_run
    from .automation import auto_grade_cli, prepare_checks
    from .fullstack import preview_api
    parser=argparse.ArgumentParser(description='多模型评测：材料准备、单题初始化、提示词和两阶段留档')
    sub=parser.add_subparsers(dest='command',required=True)
    p=sub.add_parser('launch',help='校验历史作品，安装/构建工作台后启动；不安装题目依赖'); p.add_argument('--port',type=int,default=8787); p.add_argument('--open',action='store_true'); p.set_defaults(func=launch)
    p=sub.add_parser('verify-history',help='只读校验历史作品、资源清单与轮次关联，不检查题目依赖'); p.add_argument('--tracked',action='store_true',help='同时检查历史展示所需文件均已纳入Git'); p.set_defaults(func=verify_history)
    p=sub.add_parser('serve',help='启动鹈鹕测评工作台'); p.add_argument('--port',type=int,default=8787); p.add_argument('--open',action='store_true'); p.set_defaults(func=serve)
    p=sub.add_parser('prepare',help='联网准备一次材料与依赖，不启动模型'); p.add_argument('--rebuild',action='store_true'); p.set_defaults(func=prepare)
    p=sub.add_parser('revise-prepared',help='离线复制兼容的旧版材料并应用新版提示词与评分，保留旧包'); p.set_defaults(func=revise_prepared)
    p=sub.add_parser('prepare-checks',help='准备主持人的自动验收依赖；仅准备阶段联网'); p.set_defaults(func=prepare_checks)
    p=sub.add_parser('preview-api',help='显式启动一份归档独享的离线Node接口，Ctrl+C停止')
    p.add_argument('--artifact',required=True); p.set_defaults(func=preview_api)
    p=sub.add_parser('auto-grade',help='仅对第3题归档运行离线HTTP接口评分，保存接口分并保留人工分')
    p.add_argument('--run',required=True); p.add_argument('--task',required=True)
    p.add_argument('--phase',choices=['initial','change'],default='initial')
    p.add_argument('--artifact',help='默认使用该阶段最新归档版本'); p.add_argument('--output',help='另存接口评分JSON报告，拒绝覆盖'); p.set_defaults(func=auto_grade_cli)
    p=sub.add_parser('grade',help='按本轮固定标准答案自动评分长文本题（新版第6题），只读答案并输出报告')
    p.add_argument('--run',required=True); p.add_argument('--phase',choices=['initial','change'],default='initial')
    p.add_argument('--answers',help='可选UTF-8答案JSON；默认读取本阶段快照，未冻结时读工作区')
    p.add_argument('--output',help='保存JSON评分报告，拒绝覆盖已有文件'); p.set_defaults(func=grade_run)
    p=sub.add_parser('init',help='离线初始化一个新的模型运行'); p.add_argument('--model',required=True); p.add_argument('--task',default='all'); p.add_argument('--repeat',type=int,default=1); p.add_argument('--run-id'); p.add_argument('--profile',choices=['local','sandbox'],default='local'); p.add_argument('--harness',choices=[i for i,_,_ in HARNESS_OPTIONS]); p.add_argument('--harness-custom',default=''); p.add_argument('--reasoning-level',choices=['1','2','3','4','5','unsupported'],help='归一化思考强度1至5档；不支持调整选unsupported'); p.set_defaults(func=init_run)
    p=sub.add_parser('doctor',help='检查本机环境'); p.set_defaults(func=doctor)
    p=sub.add_parser('wizard',help='交互式一键初始化'); p.set_defaults(func=wizard)
    p=sub.add_parser('calibrate',help='记录主持人的真实预跑证据声明'); p.add_argument('--note',required=True); p.set_defaults(func=calibrate)
    p=sub.add_parser('status',help='查看阶段、环境与提示词路径'); p.add_argument('--run',required=True); p.set_defaults(func=status)
    p=sub.add_parser('record',help='记录客户端、浏览器、设置和人工介入'); p.add_argument('--run',required=True)
    for name in ('agentClient','browser','reasoning','temperature','hardware'): p.add_argument('--'+name)
    p.add_argument('--reasoning-level',choices=['1','2','3','4','5','unsupported'])
    p.add_argument('--intervention'); p.set_defaults(func=record)
    for command,func in [('prompt',prompt),('check',check),('snapshot',snapshot),('export',export_project),('start',mark_start),('sandbox',sandbox)]:
        p=sub.add_parser(command)
        p.add_argument('--run',required=True,help='运行编号或runs中的绝对目录')
        p.add_argument('--task',default='all' if command=='check' else None,required=command!='check')
        if command in ('prompt','snapshot'): p.add_argument('--phase',choices=['initial','change'],default='initial')
        if command=='prompt': p.add_argument('--copy',action='store_true')
        if command=='snapshot': p.add_argument('--allow-invalid',action='store_true',help='保留被污染的无效样本，不使其变成有效成绩')
        if command=='sandbox':
            p.add_argument('--image',default='llm-bench-runtime:1'); p.add_argument('--launch',action='store_true')
        p.set_defaults(func=func)
    args=parser.parse_args(argv)
    try:
        args.func(args)
    except (ValueError, OSError, subprocess.CalledProcessError) as exc:
        print('操作未完成：'+str(exc),file=sys.stderr)
        return 1
    return 0
