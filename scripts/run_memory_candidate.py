#!/usr/bin/env python3
"""Run one fresh, pinned Q6 initial test; logs and answers remain separate."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from evalkit import manager as m

CODEX = Path('/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex')


def config_args(project):
    """Only task files and system runtimes are readable by candidate commands."""
    permissions = {
        ':minimal': 'read', '/Library/Developer': 'read',
        str(Path.home()): 'deny', str(project): 'write',
    }
    for path in project.iterdir():
        if path.name not in ('output', 'research', '.runtime', 'solution', 'src', 'dist'):
            permissions[str(path)] = 'read'
    table = '{' + ', '.join(json.dumps(k, ensure_ascii=False) + '=' + json.dumps(v)
                            for k, v in permissions.items()) + '}'
    settings = {
        'default_permissions': '"longread"', 'permissions.longread.filesystem': table,
        'permissions.longread.network.enabled': 'false', 'approval_policy': '"never"',
        'model_reasoning_effort': '"ultra"', 'web_search': '"disabled"',
        'project_doc_max_bytes': '0', 'project_root_markers': '["TASK.md"]',
        'memories.use_memories': 'false', 'memories.generate_memories': 'false',
        'shell_environment_policy.inherit': '"core"',
    }
    for feature in ('apps', 'plugins', 'memories', 'multi_agent', 'hooks', 'browser_use',
                    'computer_use', 'image_generation', 'skill_search', 'shell_snapshot'):
        settings['features.' + feature] = 'false'
    settings['features.skip_host_skill_discovery'] = 'true'
    return [arg for key, value in settings.items() for arg in ('-c', key + '=' + value)]


def preflight(project, host, config):
    """Exercise the actual sandbox before sending any questions to a model."""
    probe = project / '.runtime/retest-preflight'
    probe.mkdir(parents=True, exist_ok=False)
    (probe / 'public.txt').write_text('preflight-public\n')
    private = host / 'private-probe.txt'
    private.write_text('preflight-host-only\n')
    script = '''
import json, pathlib, socket
root=pathlib.Path.cwd(); result={}
cases=[
 ("public",root/".runtime/retest-preflight/public.txt","read"),
 ("private",pathlib.Path(PRIVATE_PATH),"read"),
 ("parent",root.parent/"06-memory"/"../../../control/private/06-memory/answer-key.json","read"),
 ("protected",root/"TASK.md","write"),
 ("output",root/".runtime/retest-preflight/writable.txt","write"),
]
for name,path,action in cases:
 try:
  if action=="write":
   # Opening r+ checks write access without changing a protected file.
   if name=="protected":
    with path.open("r+"): pass
   else:path.write_text("probe")
  else:path.read_bytes()
  result[name]="allowed"
 except PermissionError:result[name]="denied"
 except OSError as exc:result[name]=type(exc).__name__
try:
 with socket.create_connection(("1.1.1.1",443),timeout=2):pass
 result["network"]="allowed"
except PermissionError:result["network"]="denied"
except OSError as exc:result["network"]=type(exc).__name__+":"+str(exc.errno)
for port in (8787,8788):
 try:
  with socket.create_connection(("127.0.0.1",port),timeout=2):pass
  result["localhost-"+str(port)]="allowed"
 except PermissionError:result["localhost-"+str(port)]="denied"
 except OSError as exc:result["localhost-"+str(port)]=type(exc).__name__+":"+str(exc.errno)
print(json.dumps(result))
'''.replace('PRIVATE_PATH', repr(str(private)))
    # Test the real host key path, rather than relying on a relative traversal.
    script = script.replace('root.parent/"06-memory"/"../../../control/private/06-memory/answer-key.json"',
                            'pathlib.Path(' + repr(str(project.parents[1] / 'control/private/06-memory/answer-key.json')) + ')')
    result = subprocess.run([str(CODEX), 'sandbox', '-P', 'longread', '-C', str(project),
                             *config, sys.executable, '-c', script],
                            capture_output=True, text=True, timeout=30)
    if result.returncode:
        raise RuntimeError('Sandbox preflight failed: ' + result.stderr[-2000:])
    observed = json.loads(result.stdout)
    expected = {'public': 'allowed', 'private': 'denied', 'parent': 'denied',
                'protected': 'denied', 'output': 'allowed', 'network': 'denied',
                'localhost-8787': 'denied', 'localhost-8788': 'denied'}
    m.dump(host / 'sandbox-preflight.json', {'expected': expected, 'observed': observed,
                                            'passed': observed == expected})
    if observed != expected:
        raise RuntimeError('Sandbox behavior does not match the recorded policy')
    renderer = project / 'tools/pdf-page'
    paper = sorted((project / 'materials/papers').glob('*.pdf'))[0]
    png = probe / 'pdf-page.png'
    rendering = subprocess.run(
        [str(CODEX), 'sandbox', '-P', 'longread', '-C', str(project), *config,
         str(renderer), str(paper), '1', str(png)],
        capture_output=True, text=True, timeout=30)
    passed = (rendering.returncode == 0 and png.is_file()
              and png.read_bytes().startswith(b'\x89PNG\r\n\x1a\n'))
    m.dump(host / 'pdf-preflight.json', {
        'passed': passed, 'exitCode': rendering.returncode,
        'rendererSha256': m.sha(renderer),
        'sample': str(paper.relative_to(project)),
        'stderr': rendering.stderr[-2000:],
        'outputSha256': m.sha(png) if png.is_file() else None})
    if not passed:
        raise RuntimeError('PDF rendering failed inside the candidate sandbox')
    png.unlink()


def verify_completed_inputs(record, run, key, release_path, prompt_path):
    """A successful candidate process is not a valid run if its frozen inputs changed."""
    issues = []
    def digest(path):
        try:
            return m.sha(path) if path.is_file() else None
        except OSError as exc:
            issues.append('Cannot read frozen input: ' + str(exc))
            return None
    try:
        issues.extend(m.integrity(run, '06-memory'))
    except (ValueError, OSError) as exc:
        # An invalid output tree must still produce a final, auditable record.
        issues.append('Integrity scan failed: ' + str(exc))
    record.update(answerKeySha256After=digest(key),
                  promptSha256After=digest(prompt_path),
                  releaseSha256After=digest(release_path))
    for before, after, message in (
            ('answerKeySha256Before', 'answerKeySha256After', 'Pinned answer key changed during execution'),
            ('promptSha256', 'promptSha256After', 'Pinned prompt changed during execution'),
            ('releaseSha256', 'releaseSha256After', 'Pinned release changed during execution')):
        if record.get(before) != record[after]:
            issues.append(message)
    record['integrityIssues'] = issues
    if issues:
        record['processStatus'] = record['status']
        record['status'] = 'invalid-inputs'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run', required=True)
    args = parser.parse_args()
    run = m.get_run(args.run)
    metadata = m.load(run / 'control/run.json')
    if set(metadata['tasks']) != {'06-memory'}:
        raise ValueError('Use an independently initialized Q6-only run')
    state = metadata['tasks']['06-memory']
    if state['initialSnapshot'] or state['startedAt'] or state['phase'] != 'initial':
        raise ValueError('The run must be fresh and unstarted')
    project = run / 'tasks/06-memory'
    if m.integrity(run, '06-memory') or (project / 'output/answers.json').exists():
        raise ValueError('Candidate workspace must be unchanged and have no submitted answers')
    task = m.pinned_task(run, '06-memory')
    key = run / 'control/private/06-memory/answer-key.json'
    if m.sha(key) != task['answerKeySha256']:
        raise ValueError('Pinned answer key integrity failed')
    release_path = run / 'control/private/06-memory/release.json'
    if task.get('questionVersion') in ('longread-qa-v3', 'longread-qa-v4'):
        release = m.load(release_path)
        if (release.get('version') != task['questionVersion']
                or release.get('status') != 'frozen-before-candidate'
                or release.get('mergedAnswerKeySha256') != m.sha(key)):
            raise ValueError('The Q6 question bank must be reviewed and frozen before the run')
    host = run / 'control/retest'
    host.mkdir(exist_ok=False)
    config = config_args(project)
    preflight(project, host, config)
    prompt_path = run / 'control/prompts/06-memory-initial.txt'
    prompt = prompt_path.read_bytes()
    argv = [str(CODEX), 'exec', '--ignore-user-config', '--ignore-rules',
            '--skip-git-repo-check', '--ephemeral', '-C', str(project),
            '-m', 'gpt-6.1-sol', *config, '--json', '--color', 'never',
            '-o', str(host / 'final.txt'), '-']
    started = time.monotonic()
    record = {'model': 'gpt-6.1-sol', 'reasoningEffort': 'ultra', 'harness': 'Codex CLI',
              'freshSession': True, 'userMessages': 1, 'additionalMessagesSent': 0,
              'promptSha256': hashlib.sha256(prompt).hexdigest(),
              'answerKeySha256Before': m.sha(key), 'argv': argv,
              'questionVersion': task.get('questionVersion'),
              'releaseSha256': m.sha(release_path) if release_path.exists() else None,
              'startedAt': m.now(), 'status': 'running',
              'isolation': 'macOS sandbox command reads/writes/network tested; no claim of a separate OS user or VM'}
    m.dump(host / 'execution.json', record)
    metadata['environment'].update(agentClient='Codex CLI', reasoning='ultra')
    metadata['enforcement'] = 'macOS-command-sandbox-verified; client-context constrained by configuration'
    m.atomic_json(run / 'control/run.json', metadata)
    m.mark_start(argparse.Namespace(run=str(run), task='6'))
    with (host / 'events.jsonl').open('xb') as stdout, (host / 'stderr.log').open('xb') as stderr:
        process = subprocess.Popen(argv, cwd=project, stdin=subprocess.PIPE,
                                   stdout=stdout, stderr=stderr, start_new_session=True)
        try:
            process.communicate(prompt, timeout=task['minutes'] * 60)
            record.update(status='completed' if process.returncode == 0 else 'failed',
                          exitCode=process.returncode)
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGTERM)
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGKILL)
                process.wait()
            record.update(status='timed-out', exitCode=process.returncode)
        finally:
            record.update(completedAt=m.now(), durationSeconds=round(time.monotonic() - started, 3))
            verify_completed_inputs(record, run, key, release_path, prompt_path)
            m.atomic_json(host / 'execution.json', record)
    print(json.dumps({k: record[k] for k in ('status', 'durationSeconds', 'exitCode')}, ensure_ascii=False))
    if record['status'] != 'completed':
        raise SystemExit(1)


if __name__ == '__main__':
    main()
