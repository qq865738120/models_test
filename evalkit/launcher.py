"""Cross-platform startup: only the host workbench needs an npm install."""
import subprocess
import shutil

from . import manager as m
from .history import verify_history
from .studio import serve


def launch(args):
    if not 1024<=args.port<=65534: raise ValueError('端口需为1024到65534')
    verify_history(args,verbose=False)
    npm=shutil.which('npm')
    if not npm or not shutil.which('node'):
        raise ValueError('请先安装Node.js及npm，再运行 python3 bench.py launch --open')
    web=m.ROOT/'web'
    signature={'package':m.sha(web/'package.json'),'lock':m.sha(web/'package-lock.json'),
        'node':m.version('node'),'npm':m.version('npm')}
    stamp=m.ROOT/'.runtime/workbench-dependencies.json'
    try: installed=m.load(stamp)
    except (OSError,ValueError): installed=None
    if not (web/'node_modules').is_dir() or installed!=signature:
        print('安装工作台依赖（不安装题目依赖，也不下载评测材料）…',flush=True)
        subprocess.run([npm,'ci'],cwd=web,check=True)
        m.atomic_json(stamp,signature)
    subprocess.run([npm,'run','build'],cwd=web,check=True)
    serve(args)
