import sys,shutil,argparse,threading
from pathlib import Path
from http.server import ThreadingHTTPServer
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tests'))
from test_lifecycle import LifecycleTests,SOURCE
from evalkit import manager as m
from evalkit.catalog import candidate_task
from evalkit.standard import read_standard
from evalkit.studio import Studio,Handler,ArtifactHandler
import tempfile
tempfile.tempdir=str((SOURCE/'verification').resolve())
f=LifecycleTests(); f.setUp()
try:
    standard=read_standard(SOURCE/'llm-evaluation-standard.html')
    for key in ('02-dispatch','03-game2d','04-game3d'):
        m.write(f.prepared/'tasks'/key/'TASK.md',candidate_task(key,standard))
    meta=m.load(f.prepared/'bundle.json');meta['bundleSha256']=m.digest(m.manifest(f.prepared,skip=('bundle.json',)));m.dump(f.prepared/'bundle.json',meta)
    shutil.copytree(SOURCE/'web/dist',f.root/'web/dist')
    run=m.init_run(argparse.Namespace(model='UI 验证样例',repeat=1,task='all',run_id='ui-check',profile='local',harness='codex',harness_custom='',reasoning_level='3'))
    studio=Studio(f.root/'data');studio.preview_origin='http://127.0.0.1:8898'
    for key in ('02-dispatch','03-game2d','04-game3d'):
        m.write(run/'tasks'/key/'output/index.html','<!doctype html><title>UI fixture</title><p>界面验证占位样例，不是被测作品</p>')
        studio.import_artifact(run.name,key,'initial')
    admin=ThreadingHTTPServer(('127.0.0.1',8897),Handler);admin.studio=studio
    preview=ThreadingHTTPServer(('127.0.0.1',8898),ArtifactHandler);preview.studio=studio;preview.admin_origin='http://127.0.0.1:8897'
    threading.Thread(target=preview.serve_forever,daemon=True).start()
    print('UI fixture ready',file=sys.__stdout__,flush=True)
    admin.serve_forever()
finally:
    f.tearDown()
