"""Host-owned, version-bound checks of immutable artifact copies."""
import contextlib
import copy
import json
import os
import shutil
import signal
import subprocess
import tempfile
from html.parser import HTMLParser
from pathlib import Path

from . import manager as m
from . import fullstack
from .automation_contract import VERSION as CONTRACT_VERSION
from .hybrid_revision import DISPATCH_API_VERSION as VERSION, RUBRIC_VERSION, apply_dispatch_review
from .dispatch import seed_orders

BROWSER_TIMEOUT = 240


def check(ident, dimension, passed, message):
    return {'id': ident, 'dimensionId': dimension, 'passed': passed,
            'message': str(message)[:2000]}


def bind_artifact(studio, run_id, key, phase, artifact_id):
    """Validate both the association and the bytes before using an archive."""
    from .studio import StudioError, safe_file
    run, meta, _ = studio.task(run_id, key, phase)
    pinned = m.load(safe_file(run/'control', 'rubric.json'))
    task = next((t for t in pinned['tasks'] if t['id'] == key), None)
    if key != '03-dispatch':
        raise StudioError('该题已取消自动核验；仅第3题接口使用评分脚本')
    if not task or task.get('delivery') != fullstack.DELIVERY:
        raise StudioError('此轮不是统一 Node.js 接口题，不能运行接口评分')
    if task.get('automationVersion') not in (CONTRACT_VERSION, VERSION):
        raise StudioError('历史轮次未固定受支持的接口契约，不能执行代码')
    task = apply_dispatch_review(task)
    review = studio.review(run)
    record = next((a for a in review['artifacts'].get(key, {}).get(phase, [])
                   if a['id'] == artifact_id), None)
    if record is None:
        raise StudioError('成果不属于所选题目与阶段')
    base = fullstack.artifact_path(artifact_id, studio.data)
    manifest = m.load(safe_file(base, 'manifest.json'))
    if any(manifest.get(field) != value for field, value in
           [('runId', run_id), ('taskId', key), ('phase', phase)]):
        raise StudioError('成果归档关联与评分记录不同')
    safe_file(base/'files', 'index.html')
    actual = m.manifest(base/'files')
    sha = m.digest(actual)
    if (actual != manifest.get('files') or sha != record.get('sha256') or
            any('link' in row for row in actual.values())):
        raise StudioError('归档成果完整性校验失败')
    if task.get('delivery') == fullstack.DELIVERY:
        if manifest.get('delivery') != fullstack.DELIVERY or record.get('delivery') != fullstack.DELIVERY:
            raise StudioError('前后端成果交付类型不匹配')
        for relative in fullstack.BACKEND_FILES:
            safe_file(base/'files', relative)
    rubric = task.get('rubricChange', task['rubric']) if phase == 'change' else task['rubric']
    return {'run': run, 'meta': meta, 'task': task, 'rubric': rubric, 'base': base,
            'manifest': manifest, 'sha': sha, 'pinnedSha': m.digest(pinned)}


def normalize_checks(rows, rubric):
    """A failed check is zero; unavailable observation makes its dimension pending."""
    ids = {d['id'] for d in rubric if d.get('scoring') == 'auto'}
    result, seen = [], set()
    if not isinstance(rows, list):
        rows = [check('invalid-report', '*', None, '验收工具未返回有效检查列表')]
    for row in rows:
        if (not isinstance(row, dict) or not isinstance(row.get('id'), str) or
                row.get('passed') is not None and type(row.get('passed')) is not bool or
                not isinstance(row.get('message'), str)):
            row = check('invalid-report', '*', None, '验收工具返回了无效检查项')
        dimension = row.get('dimensionId')
        if dimension != '*' and dimension not in ids:
            row = check('unknown-dimension', '*', None, '验收工具返回了不属于本阶段的评分维度')
            dimension = '*'
        for target in sorted(ids) if dimension == '*' else [dimension]:
            ident = row['id']+(':'+target if dimension == '*' else '')
            if (ident, target) in seen:
                continue
            seen.add((ident, target))
            result.append(check(ident, target, row.get('passed'), row['message']))
    for target in sorted(ids):
        if not any(r['dimensionId'] == target for r in result):
            result.append(check('unobserved:'+target, target, None, '本维度尚无有效自动观测'))
    values = {}
    for target in ids:
        group = [r['passed'] for r in result if r['dimensionId'] == target]
        values[target] = None if None in group else int(all(group))
    return result, values


def http_dimensions(report, phase):
    # Runtime/build remains a prerequisite, not an independently scored dimension.
    mapping = {'architecture': 'query', 'query': 'query', 'assignment': 'assignment',
               'validation': 'validation', 'consistency': 'assignment'}
    return [check('http:'+row['id'], 'regression' if phase == 'change' else mapping[row['group']],
                  row['passed'], row['message'])
            for row in report['checks'] if row.get('group') in mapping]


def browser_checks(output, key, phase, directory, api_base=None, seed=None, initial_text=None):
    """Run only the installed host harness; dependency installation is a separate action."""
    runtime = m.ROOT/'evaluation-runtime'
    script = runtime/'browser-checks.mjs'
    node = shutil.which('node')
    if not node or not script.is_file() or not (runtime/'node_modules/playwright-core/package.json').is_file():
        return [check('browser-environment', '*', None,
                      '自动验收环境未准备；请运行 python3 bench.py prepare-checks。不会自动联网安装。')]
    args = {'root': str(output.resolve()), 'taskId': key, 'phase': phase,
            'apiBase': api_base, 'seed': seed}
    if initial_text is not None:
        args['initialText'] = initial_text
    arg_path = directory/'browser-args.json'
    m.dump(arg_path, args)
    process = None
    try:
        process = subprocess.Popen([node, str(script), str(arg_path)], cwd=runtime,
            stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            start_new_session=True, text=True)
        stdout, stderr = process.communicate(timeout=BROWSER_TIMEOUT)
        if process.returncode:
            return [check('browser-environment', '*', None,
                          '浏览器验收工具执行失败：'+stderr[-1500:])]
        report = json.loads(stdout)
        return report['checks']
    except subprocess.TimeoutExpired:
        return [check('browser-timeout', '*', None, '浏览器验收超过240秒，结果待核验')]
    except (OSError, ValueError, KeyError, TypeError) as exc:
        return [check('browser-environment', '*', None, '浏览器验收工具不可用：'+str(exc))]
    finally:
        if process is not None:
            # Chromium belongs to this disposable process group, including on timeout.
            with contextlib.suppress(ProcessLookupError):
                os.killpg(process.pid, signal.SIGTERM)
            if process.poll() is None:
                try:
                    process.communicate(timeout=3)
                except subprocess.TimeoutExpired:
                    with contextlib.suppress(ProcessLookupError):
                        os.killpg(process.pid, signal.SIGKILL)
                    process.communicate()


def initial_content(studio, run_id, key):
    """Optional comparison material stays host-side and must also be an intact archive."""
    run = studio.run(run_id)
    items = studio.review(run)['artifacts'].get(key, {}).get('initial', [])
    if not items:
        return None
    binding = bind_artifact(studio, run_id, key, 'initial', items[-1]['id'])
    class MainText(HTMLParser):
        def __init__(self):
            super().__init__()
            self.main = 0
            self.ignored = 0
            self.parts = []
        def handle_starttag(self, tag, attrs):
            if tag == 'main':
                self.main += 1
            if tag in ('script', 'style', 'noscript', 'template'):
                self.ignored += 1
        def handle_endtag(self, tag):
            if self.main and not self.ignored and tag in (
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'div', 'section', 'blockquote'):
                self.parts.append('。')
            if tag == 'main':
                self.main = max(0, self.main-1)
            if tag in ('script', 'style', 'noscript', 'template'):
                self.ignored = max(0, self.ignored-1)
        def handle_data(self, text):
            if self.main and not self.ignored:
                self.parts.append(text)
    parser = MainText()
    parser.feed((binding['base']/'files/index.html').read_text(encoding='utf-8'))
    return ''.join(parser.parts).strip() or None


def observe(binding, output, directory, phase, initial_text=None):
    key = binding['task']['id']
    if key != '03-dispatch' or binding['task'].get('delivery') != fullstack.DELIVERY:
        raise ValueError('接口评分仅支持第3题的 Node.js 归档')
    fixed_seed = seed_orders()
    try:
        if m.load(output/'server/data/orders.json') != fixed_seed:
            return [check('fixed-seed', '*', False, '后端归档的10,000条种子与本轮固定材料不同；未执行代码')]
    except (OSError, ValueError):
        return [check('fixed-seed', '*', False, '后端固定种子无法读取；未执行代码')]
    try:
        fullstack.require_runtime()
    except (OSError, ValueError, subprocess.SubprocessError) as exc:
        return [check('node-environment', '*', None, str(exc))]
    server_manifest = {name.removeprefix('server/'): row for name, row in binding['manifest']['files'].items()
                       if name.startswith('server/')}
    instance = fullstack.BackendInstance(output/'server', runtime_root=directory,
                                         expected_manifest=server_manifest)
    try:
        try:
            instance.start()
        except ValueError as exc:
            return [check('node-startup', '*', False, str(exc))]
        except (OSError, subprocess.SubprocessError) as exc:
            return [check('node-environment', '*', None, str(exc))]
        try:
            rows = http_dimensions(fullstack.grade_api(instance.base_url, fixed_seed, restart=instance.restart), phase)
        except (OSError, ValueError, TypeError, KeyError, subprocess.SubprocessError) as exc:
            rows = [check('http-environment', '*', None, 'HTTP验收工具异常：'+str(exc))]
        return rows
    finally:
        instance.close()


def run_auto_grade(studio, run_id, key, phase, artifact_id):
    from .studio import StudioError, score_values
    started = m.now()
    with studio.lock:
        binding = bind_artifact(studio, run_id, key, phase, artifact_id)
        initial_text = None
    runtime = m.ROOT/'.runtime'
    runtime.mkdir(exist_ok=True)
    if runtime.is_symlink() or any(p.is_symlink() for p in runtime.parents):
        raise StudioError('自动验收临时目录不能包含链接')
    with tempfile.TemporaryDirectory(prefix='auto-grade-', dir=runtime) as name:
        directory = Path(name).resolve()
        output = directory/'output'
        shutil.copytree(binding['base']/'files', output, symlinks=True)
        if m.manifest(output) != binding['manifest']['files']:
            raise StudioError('创建验收副本期间成果变化')
        rows = observe(binding, output, directory, phase, initial_text)
        if m.manifest(output) != binding['manifest']['files']:
            raise StudioError('验收期间归档副本被修改')
    checks, auto_values = normalize_checks(rows, binding['rubric'])
    checked = m.now()
    checks = [{**row, 'sourceSha256': binding['sha'], 'checkedAt': checked} for row in checks]
    with studio.lock:
        current = bind_artifact(studio, run_id, key, phase, artifact_id)
        if (current['manifest'] != binding['manifest'] or current['sha'] != binding['sha'] or
                current['pinnedSha'] != binding['pinnedSha']):
            raise StudioError('验收期间成果或本轮规范变化；未保存评分', 409)
        review = studio.review(current['run'])
        previous = review['scores'].get(artifact_id)
        values = {d['id']: previous.get('values', {}).get(d['id']) if previous else None
                  for d in binding['rubric']}
        values.update(auto_values)
        values, total = score_values(binding['rubric'], values, 'hybrid')
        record = {'artifactId': artifact_id, 'values': values, 'total': total,
                  'notes': previous.get('notes', '') if previous else '', 'savedAt': checked,
                  'rubricVersion': RUBRIC_VERSION, 'sourceRubricVersion': current['meta']['rubricVersion'],
                  'scoringMode': 'hybrid',
                  'automation': {'version': VERSION, 'sourceSha256': binding['sha'],
                                 'startedAt': started, 'checkedAt': checked, 'checks': checks}}
        if previous:
            review['scoreHistory'].append(previous)
        review['scores'][artifact_id] = record
        review['revision'] += 1
        m.atomic_json(current['run']/'control/review.json', review)
    automatic = [d for d in binding['rubric'] if d.get('scoring') == 'auto']
    api_score = (sum(values[d['id']]*d['weight'] for d in automatic)
                 if all(values[d['id']] is not None for d in automatic) else None)
    return {'runId': run_id, 'artifactId': artifact_id, 'phase': phase,
            'version': VERSION, 'rubricVersion': RUBRIC_VERSION, 'sourceSha256': binding['sha'],
            'apiScore': api_score, 'apiMax': sum(d['weight'] for d in automatic),
            'values': auto_values, 'checks': checks, 'total': total}


def auto_grade_cli(args):
    from .studio import Studio
    run = m.get_run(args.run)
    key, _ = m.get_task(run, args.task)
    if key != '03-dispatch':
        raise ValueError('该题已取消自动核验；仅第3题接口使用评分脚本')
    report_path = Path(args.output).expanduser().resolve() if getattr(args, 'output', None) else None
    if report_path and report_path.exists():
        raise ValueError('评分报告已存在，拒绝覆盖')
    studio = Studio()
    try:
        artifact_id = getattr(args, 'artifact', None)
        if not artifact_id:
            records = studio.review(run)['artifacts'].get(key, {}).get(args.phase, [])
            if not records:
                raise ValueError('请先导入本题本阶段成果')
            artifact_id = records[-1]['id']
        result = run_auto_grade(studio, run.name, key, args.phase, artifact_id)
        if report_path:
            report_path.parent.mkdir(parents=True, exist_ok=True)
            with report_path.open('x', encoding='utf-8') as report:
                json.dump(result, report, ensure_ascii=False, indent=2)
                report.write('\n')
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return result
    finally:
        studio.worker.shutdown()


def prepare_checks(args=None):
    """Explicit dependency preparation is the only network-capable action here."""
    runtime = m.ROOT/'evaluation-runtime'
    npm = shutil.which('npm')
    if not npm or not (runtime/'package-lock.json').is_file():
        raise ValueError('需要已安装npm及固定的evaluation-runtime/package-lock.json')
    subprocess.run([npm, 'ci', '--ignore-scripts', '--no-audit', '--no-fund'], cwd=runtime, check=True)
    result = {'version': VERSION, 'preparedAt': m.now(), 'packageLockSha256': m.sha(runtime/'package-lock.json'),
              'browser': '使用本机已安装的Chrome/Chromium，不自动下载浏览器'}
    m.atomic_json(m.ROOT/'.runtime/checks-preparation.json', result)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result
