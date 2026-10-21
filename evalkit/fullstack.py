"""Explicit, offline execution of archived Node APIs; import and preview never launch code."""
import contextlib
import hmac
import http.client
import json
import os
import re
import secrets
import shutil
import signal
import socket
import subprocess
import sys
import tempfile
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

from . import manager as m

DELIVERY = 'fullstack-node'
MAX_BODY = 65536
MAX_RESPONSE = 2 * 1024 * 1024
API_TIMEOUT = 5
TOKEN_HEADER = 'X-Pelican-Runtime'
BACKEND_FILES = ('server/index.mjs', 'server/data/orders.json')


def artifact_path(artifact_id, data=None):
    if not isinstance(artifact_id, str) or not re.fullmatch('[0-9a-f]{32}', artifact_id):
        raise ValueError('成果编号无效')
    return Path(data or m.ROOT/'data')/'artifacts'/artifact_id


def validate_artifact(artifact_id, data=None):
    base = artifact_path(artifact_id, data)
    if base.is_symlink() or any(p.is_symlink() for p in base.parents):
        raise ValueError('成果路径不能包含链接')
    manifest = m.load(base/'manifest.json')
    if manifest.get('delivery') != DELIVERY:
        raise ValueError('该成果不是 Node 前后端交付')
    if (base/'files').is_symlink():
        raise ValueError('成果文件目录不能是链接')
    actual = m.manifest(base/'files')
    if actual != manifest['files'] or any('link' in row for row in actual.values()):
        raise ValueError('归档成果完整性校验失败')
    for relative in ('index.html', *BACKEND_FILES):
        if relative not in actual:
            raise ValueError('缺少前后端交付文件：'+relative)
    return base, m.digest(actual)


def allowed_route(method, path):
    """No arbitrary targets, control endpoints, redirects, or request forwarding."""
    parsed = urlsplit(path)
    if parsed.scheme or parsed.netloc or parsed.fragment or len(path) > 8192:
        return False
    if method == 'POST':
        return parsed.path == '/api/assign' and not parsed.query
    if method != 'GET':
        return False
    if parsed.path in ('/health', '/api/orders', '/api/couriers', '/api/stats'):
        return True
    return bool(re.fullmatch(r'/api/orders/[A-Za-z0-9_-]{1,100}', parsed.path))


def http_request(port, method, path, body=None, token=None, timeout=API_TIMEOUT, content_type='application/json'):
    """Use a direct loopback socket; environment proxies and redirects are never used."""
    if isinstance(port, bool) or not isinstance(port, int) or not 1024 <= port <= 65535:
        raise ValueError('接口端口无效')
    connection = http.client.HTTPConnection('127.0.0.1', port, timeout=timeout)
    headers = {'Accept': 'application/json'}
    if body is not None:
        if len(body) > MAX_BODY:
            raise ValueError('请求体过大')
        headers['Content-Type'] = content_type
    if token:
        headers[TOKEN_HEADER] = token
    try:
        connection.request(method, path, body=body, headers=headers)
        response = connection.getresponse()
        data = response.read(MAX_RESPONSE+1)
        if len(data) > MAX_RESPONSE:
            raise ValueError('接口响应过大')
        if 300 <= response.status < 400:
            raise ValueError('接口不得重定向')
        if response.getheader('Content-Type','').split(';')[0].strip().lower()!='application/json':
            raise ValueError('接口必须返回application/json')
        # Return data only, never forward Set-Cookie, Location, authentication or hop headers.
        return response.status, data
    finally:
        connection.close()


def registry_path(artifact_id):
    artifact_path(artifact_id)
    directory = m.ROOT/'.runtime/artifact-backends'
    if directory.is_symlink() or any(p.is_symlink() for p in directory.parents):
        raise ValueError('接口登记目录不能包含链接')
    return directory/(artifact_id+'.json')


def read_registration(artifact_id):
    path = registry_path(artifact_id)
    if path.is_symlink():
        raise ValueError('接口登记不能是链接')
    record = m.load(path)
    if (record.get('artifactId') != artifact_id or
            not re.fullmatch('[0-9a-f]{64}', record.get('token', '')) or
            not re.fullmatch('[0-9a-f]{64}', record.get('artifactSha256', ''))):
        raise ValueError('接口登记无效')
    return record


def runtime_status(artifact_id, data=None):
    result = {'artifactId': artifact_id, 'delivery': DELIVERY,
              'running': False, 'status': 'stopped', 'message': '接口未启动；请在评测管理终端执行启动命令。'}
    try:
        base = artifact_path(artifact_id, data)
        manifest = m.load(base/'manifest.json')
        if manifest.get('delivery') != DELIVERY:
            return {**result, 'delivery': manifest.get('delivery', 'html'),
                    'status': 'unavailable', 'message': '此成果无需 Node 接口。'}
        record = read_registration(artifact_id)
        if record['artifactSha256'] != m.digest(manifest['files']):
            raise ValueError('接口进程绑定的成果版本不同')
        status, body = http_request(record['port'], 'GET', '/__runtime_status',
                                    token=record['token'], timeout=1)
        state = json.loads(body)
        if (status != 200 or not isinstance(state,dict) or state.get('artifactId') != artifact_id or
                state.get('artifactSha256') != record['artifactSha256'] or not state.get('running')):
            raise ValueError('接口进程未就绪')
        return {**result, 'running': True, 'status': 'running',
                'message': '独立 Node 接口已连接；数据仅保存在本次进程内存中。'}
    except (OSError, ValueError, KeyError, TypeError, http.client.HTTPException):
        return result


def proxy_request(artifact_id, method, path, body=None, data=None):
    if not allowed_route(method, path):
        raise ValueError('此接口路径或方法不允许代理')
    if not runtime_status(artifact_id, data)['running']:
        return 503, json.dumps({'error': {'code': 'API_NOT_RUNNING',
            'message': '接口尚未启动，请按工作台说明启动该成果。'}}, ensure_ascii=False).encode()
    record = read_registration(artifact_id)
    return http_request(record['port'], method, path, body, token=record['token'])


def sandbox_policy(node, project, scratch, log, port):
    q = lambda value: json.dumps(str(value), ensure_ascii=False)
    # Darwin's loader needs ancestor-directory access. Node permissions independently
    # deny application fs operations outside project/scratch, including directory listings.
    ancestors = set(project.parents) | set(node.parents)
    return f'''(version 1)
(allow default)
(deny network*)
(deny file-read*)
(deny file-write*)
(deny process-fork)
(deny process-exec)
(allow process-exec (literal {q(node)}))
(allow file-read-metadata)
(allow file-read* (subpath "/System") (subpath "/usr/lib") (subpath "/usr/share")
 (literal "/dev/urandom") (literal "/dev/random") (literal "/dev/null")
 (literal {q(node)}) (subpath {q(project)}) (subpath {q(scratch)})
 {' '.join('(literal '+q(path)+')' for path in ancestors)})
(allow file-write* (literal "/dev/null") (literal {q(log)}) (subpath {q(scratch)}))
(allow network-bind (local ip "localhost:{port}"))
(allow network-inbound (local ip "localhost:{port}"))
'''


def require_runtime():
    if sys.platform != 'darwin' or not Path('/usr/bin/sandbox-exec').is_file():
        raise ValueError('当前仅支持经验证的 macOS sandbox-exec 运行模式；此系统不启动候选后端，不降级为宿主裸运行。')
    executable = shutil.which('node')
    if not executable:
        raise ValueError('启动后端需要 Node.js 24 或更新版本')
    node = Path(executable).resolve()
    result = subprocess.run([str(node), '--version'], capture_output=True, text=True, check=True)
    if not re.fullmatch(r'v(?:2[4-9]|[3-9]\d)\.\d+\.\d+\s*', result.stdout):
        raise ValueError('隔离运行需要支持稳定权限模型的 Node.js 24 或更新版本')
    return node


def free_port():
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        return sock.getsockname()[1]


class BackendInstance:
    """One independent, disposable Node process. Never invoked by import or static preview."""
    def __init__(self, server_source, runtime_root=None, expected_manifest=None):
        self.source = Path(server_source)
        self.root_parent = Path(runtime_root or m.ROOT/'.runtime')
        self.process = None
        self.log = None
        self.directory = None
        self.output_thread = None
        self.expected_manifest = expected_manifest

    @property
    def base_url(self):
        return f'http://127.0.0.1:{self.port}'

    def start(self):
        node = require_runtime()
        if self.source.is_symlink() or any(p.is_symlink() for p in self.source.parents):
            raise ValueError('后端源码不能是链接')
        source_manifest = m.manifest(self.source)
        if self.expected_manifest is not None and source_manifest != self.expected_manifest:
            raise ValueError('后端源码与已校验的成果版本不同')
        if any('link' in row for row in source_manifest.values()):
            raise ValueError('后端交付不能包含链接')
        self.root_parent.mkdir(parents=True, exist_ok=True)
        if self.root_parent.is_symlink() or any(p.is_symlink() for p in self.root_parent.parents):
            raise ValueError('临时运行目录不能是链接')
        self.directory = Path(tempfile.mkdtemp(prefix='node-api-', dir=self.root_parent)).resolve()
        project = self.directory/'project'
        scratch = self.directory/'scratch'; scratch.mkdir()
        shutil.copytree(self.source, project/'server', symlinks=True)
        if m.manifest(project/'server') != source_manifest:
            self.close()
            raise ValueError('创建运行副本时后端文件变化')
        self.port = free_port()
        log_path = self.directory/'process.log'
        profile = self.directory/'sandbox.sb'
        profile.write_text(sandbox_policy(node, project, scratch, log_path, self.port))
        self.log = log_path.open('xb')
        command = ['/usr/bin/sandbox-exec', '-f', str(profile), str(node),
                   '--permission', '--max-old-space-size=256',
                   '--allow-fs-read='+str(project),
                   str(project/'server/index.mjs')]
        try:
            self.process = subprocess.Popen(command, cwd=project, stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE, stderr=subprocess.STDOUT, start_new_session=True,
                env={'PATH': os.defpath, 'HOME': str(scratch), 'TMPDIR': str(scratch),
                     'PORT': str(self.port), 'HOST': '127.0.0.1', 'NODE_ENV': 'production'})
            process=self.process
            def capture():
                remaining=1024*1024
                while True:
                    chunk=process.stdout.read(4096)
                    if not chunk: break
                    self.log.write(chunk[:remaining]); self.log.flush()
                    remaining-=min(remaining,len(chunk))
                    if not remaining:
                        with contextlib.suppress(ProcessLookupError):
                            os.killpg(process.pid,signal.SIGTERM)
                        break
            self.output_thread=threading.Thread(target=capture,daemon=True)
            self.output_thread.start()
            deadline = time.monotonic()+8
            while time.monotonic() < deadline:
                if self.process.poll() is not None:
                    raise ValueError('后端启动失败：'+log_path.read_text(errors='replace')[-2000:])
                try:
                    status, response = http_request(self.port, 'GET', '/health', timeout=.3)
                    payload=json.loads(response)
                    if status == 200 and isinstance(payload,dict) and payload.get('ok') is True:
                        return self
                except (OSError, ValueError, http.client.HTTPException):
                    pass
                time.sleep(.05)
            raise ValueError('后端8秒内未通过 GET /health 健康检查')
        except BaseException:
            self.close()
            raise

    def restart(self):
        self.close()
        return self.start()

    def close(self):
        process=self.process
        if self.process:
            with contextlib.suppress(ProcessLookupError):
                os.killpg(self.process.pid, signal.SIGTERM)
            try:
                self.process.wait(timeout=2)
            except subprocess.TimeoutExpired:
                with contextlib.suppress(ProcessLookupError):
                    os.killpg(self.process.pid, signal.SIGKILL)
                self.process.wait(timeout=2)
            self.process = None
        if self.output_thread:
            self.output_thread.join(timeout=2)
            self.output_thread=None
        if process and process.stdout:
            process.stdout.close()
        if self.log:
            self.log.close()
            self.log = None
        if self.directory:
            shutil.rmtree(self.directory, ignore_errors=True)
            self.directory = None

    def __enter__(self):
        return self.start()

    def __exit__(self, *args):
        self.close()


class BridgeHandler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        self.dispatch()

    def do_POST(self):
        self.dispatch()

    def dispatch(self):
        runtime = self.server.runtime
        try:
            self.connection.settimeout(API_TIMEOUT)
            if not hmac.compare_digest(self.headers.get(TOKEN_HEADER, ''), self.server.token):
                self.send_error(403)
                return
            if self.path == '/__runtime_status' and self.command == 'GET':
                status = 200
                data = json.dumps({'artifactId': self.server.artifact_id,
                    'artifactSha256': self.server.artifact_sha,
                    'running': runtime.process is not None and runtime.process.poll() is None}).encode()
            else:
                if not allowed_route(self.command, self.path):
                    self.send_error(404); return
                if self.headers.get('Transfer-Encoding'):
                    self.send_error(400); return
                length = int(self.headers.get('Content-Length', '0'))
                if not 0 <= length <= MAX_BODY:
                    self.send_error(413); return
                body = self.rfile.read(length) if self.command == 'POST' else None
                status, data = http_request(runtime.port, self.command, self.path, body)
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers(); self.wfile.write(data)
        except (OSError, ValueError, http.client.HTTPException):
            self.send_error(502)


@contextlib.contextmanager
def handle_termination():
    if threading.current_thread() is not threading.main_thread():
        yield
        return
    def terminate(*_):
        raise KeyboardInterrupt()
    previous=signal.signal(signal.SIGTERM,terminate)
    try:
        yield
    finally:
        signal.signal(signal.SIGTERM,previous)


def preview_api(args):
    artifact_id = args.artifact
    base, checksum = validate_artifact(artifact_id)
    if runtime_status(artifact_id)['running']:
        raise ValueError('该成果已有运行中的接口，请先停止原启动命令')
    registration = registry_path(artifact_id)
    registration.parent.mkdir(parents=True, exist_ok=True,mode=0o700)
    registration.parent.chmod(0o700)
    token = secrets.token_hex(32)
    manifest=m.load(base/'manifest.json')
    if m.digest(manifest['files'])!=checksum:
        raise ValueError('启动期间归档清单发生变化')
    server_manifest={key.removeprefix('server/'):value for key,value in manifest['files'].items() if key.startswith('server/')}
    with handle_termination(),BackendInstance(base/'files/server',expected_manifest=server_manifest) as runtime:
        bridge = ThreadingHTTPServer(('127.0.0.1', 0), BridgeHandler)
        bridge.runtime = runtime; bridge.token = token
        bridge.artifact_id = artifact_id; bridge.artifact_sha = checksum
        thread = threading.Thread(target=bridge.serve_forever, daemon=True)
        thread.start()
        try:
            m.atomic_json(registration, {'artifactId': artifact_id, 'artifactSha256': checksum,
                'pid': os.getpid(), 'childPid': runtime.process.pid, 'token': token,
                'port': bridge.server_port, 'startedAt': m.now(),
                'isolation': 'macos-seatbelt-network-and-files; node-permission; no-child-processes'})
            registration.chmod(0o600)
            print('接口已启动并绑定成果 '+artifact_id+'。返回工作台刷新接口状态；Ctrl+C 停止并清空内存数据。', flush=True)
            while runtime.process.poll() is None:
                time.sleep(.2)
            raise ValueError('后端进程已退出')
        except KeyboardInterrupt:
            pass
        finally:
            with contextlib.suppress(OSError, ValueError, KeyError):
                if read_registration(artifact_id)['token'] == token:
                    registration.unlink()
            bridge.shutdown(); bridge.server_close()


from .http_checks import grade_api
