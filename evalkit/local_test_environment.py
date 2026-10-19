"""Host-managed, loopback-only self-test browser for local Codex evaluations."""
import json
import os
import signal
import subprocess
import time
import tempfile
import uuid
import urllib.request
from pathlib import Path

CHROME = Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')

def permission_args():
    # With network_proxy active, unmatched domains are denied. Seatbelt blocks
    # direct remote sockets, including applications that ignore proxy variables.
    settings = {
        'default_permissions': 'evaluation-local',
        'permissions.evaluation-local.network.enabled': 'true',
        'permissions.evaluation-local.network.allow_local_binding': 'true',
        'permissions.evaluation-local.network.allow_upstream_proxy': 'false',
        'permissions.evaluation-local.network.domains': '{localhost="allow", "127.0.0.1"="allow", "::1"="allow"}',
        'permissions.evaluation-local.filesystem': '{"/"="read", ":workspace_roots"="write", ":tmp"="write"}',
        'features.network_proxy': 'true',
    }
    return [arg for key, value in settings.items() for arg in ('-c', key+'='+value)]

def browser_policy(project, runtime):
    project, runtime = Path(project).resolve(), Path(runtime).resolve()
    if runtime == project or project not in runtime.parents:
        raise ValueError('Browser runtime must be inside the task workspace')
    system_tmp = Path(tempfile.gettempdir()).resolve()
    q = lambda p: json.dumps(str(p), ensure_ascii=False)
    return f'''(version 1)
(allow default)
(deny network*)
(allow network-inbound (local ip "localhost:*"))
(allow network-outbound (remote ip "localhost:*"))
(allow network-bind (local ip "localhost:*"))
(allow network-bind (local unix-socket (subpath {q(runtime)})) (local unix-socket (subpath {q(system_tmp)})))
(allow network-outbound (remote unix-socket (subpath {q(runtime)})) (remote unix-socket (subpath {q(system_tmp)})))
(allow network-inbound (local unix-socket (subpath {q(runtime)})) (local unix-socket (subpath {q(system_tmp)})))
(deny file-read* (subpath {q(Path.home())}))
(allow file-read* (subpath {q(project)}))
(allow file-read-metadata)
(deny file-write*)
(allow file-write* (subpath {q(runtime)}) (subpath {q(system_tmp)}) (literal "/dev/null"))
'''

class LocalBrowser:
    def __init__(self, project, host_logs):
        self.project = Path(project).resolve()
        self.host_logs = Path(host_logs)
        self.runtime = self.project/'.runtime'/('host-browser-'+uuid.uuid4().hex[:10])
        self.process = None
        self.log = None

    def start(self):
        self.runtime.mkdir(parents=True, exist_ok=False)
        temp = self.runtime/'tmp'; temp.mkdir()
        profile = self.host_logs/(self.runtime.name+'.sb')
        profile.write_text(browser_policy(self.project, self.runtime))
        self.log = (self.host_logs/(self.runtime.name+'.log')).open('x')
        args = ['/usr/bin/sandbox-exec', '-f', str(profile), str(CHROME),
                '--headless=new', '--no-sandbox', '--disable-gpu',
                '--disable-background-networking', '--disable-component-update',
                '--disable-sync', '--no-first-run', '--no-default-browser-check',
                '--disable-crash-reporter', '--disable-breakpad',
                '--password-store=basic', '--use-mock-keychain', '--no-proxy-server',
                '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
                '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0',
                '--user-data-dir='+str(self.runtime/'profile'), 'about:blank']
        self.process = subprocess.Popen(args, stdout=self.log, stderr=self.log,
            cwd=self.project, env={**os.environ, 'TMPDIR':str(temp)+'/'}, start_new_session=True)
        try:
            port_file = self.runtime/'profile/DevToolsActivePort'
            for _ in range(100):
                if self.process.poll() is not None: raise RuntimeError('Local browser exited; see host browser log')
                if port_file.exists():
                    port = int(port_file.read_text().splitlines()[0])
                    self.endpoint = 'http://127.0.0.1:'+str(port)
                    opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
                    with opener.open(self.endpoint+'/json/version',timeout=2) as response:
                        self.version=json.load(response)
                    return self
                time.sleep(.1)
            raise RuntimeError('Local browser did not expose a CDP endpoint')
        except BaseException:
            self.close(); raise

    def close(self):
        if self.process:
            try:os.killpg(self.process.pid,signal.SIGTERM)
            except ProcessLookupError:pass
            try:self.process.wait(timeout=3)
            except subprocess.TimeoutExpired:
                os.killpg(self.process.pid,signal.SIGKILL);self.process.wait()
        if self.log:self.log.close()
