"""Isolated UI fixture: artificial values are never added to production runs/data."""
import argparse
import sys
import threading
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from evalkit import manager as m
from evalkit.catalog import catalog
from evalkit.studio import Studio, Handler, ArtifactHandler, ThreadingHTTPServer

m.RUNS=m.ROOT/'verification/ui-runs'
studio=Studio(m.ROOT/'verification/ui-data',8798)
for index in range(2):
    key=f'ui-fixture-{index+1}'
    run=m.RUNS/key
    if run.exists(): continue
    m.init_run(argparse.Namespace(model=f'界面验收样例 {index+1}（非模型成绩）',repeat=1,task='all',profile='local',run_id=key))
    for offset,task in enumerate(catalog()):
        out=run/'tasks'/task['id']/'output'
        m.write(out/'index.html',f'''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{{margin:0;background:#e8eedf;font:18px system-ui;color:#243b25;display:grid;place-items:center;min-height:100vh}}main{{text-align:center}}small{{letter-spacing:3px}}h1{{font-size:42px}}button{{background:#2b4a2d;color:white;border:0;border-radius:12px;padding:14px 30px;font-size:16px;cursor:pointer}}p{{font-size:14px;color:#63745c}}</style><main><small>PELICAN / UI VERIFICATION</small><h1>{task['title']}</h1><p>界面验收示例 · 非参赛作品 · 分数仅用于验证图表</p><button id="play">点击测试交互：0</button><p id="module">正在加载本地脚本</p></main><script type="module" src="./app.js"></script></html>''')
        m.write(out/'app.js',"let n=0;document.getElementById('play').onclick=()=>document.getElementById('play').textContent='点击测试交互：'+(++n);document.getElementById('module').textContent='相对路径 ES module 已加载';")
        d=studio.import_artifact(key,task['id'],'initial')
        artifact=d['tasks'][task['id']]['artifacts']['initial'][-1]
        if not(index==0 and offset==0):
            values={dim['id']:min(10,6+index+(offset%2)) for dim in task['rubric']}
            studio.save_score(key,task['id'],'initial',{'artifactId':artifact['id'],'revision':d['review']['revision'],'values':values,'notes':'仅界面测试，不代表任何模型成绩。'})
admin=ThreadingHTTPServer(('127.0.0.1',8797),Handler);admin.studio=studio
preview=ThreadingHTTPServer(('127.0.0.1',8798),ArtifactHandler);preview.studio=studio;preview.admin_origin='http://127.0.0.1:8797'
threading.Thread(target=preview.serve_forever,daemon=True).start()
print('Isolated UI fixture: http://127.0.0.1:8797',flush=True)
try:admin.serve_forever()
except KeyboardInterrupt:pass
finally:preview.shutdown();preview.server_close();admin.server_close();studio.worker.shutdown()
