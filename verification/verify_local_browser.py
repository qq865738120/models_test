import subprocess,os,signal,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from evalkit.local_test_environment import LocalBrowser,permission_args
p=Path('verification/browser-fixture').resolve();logs=Path('verification').resolve()
b=LocalBrowser(p,logs)
try:
 b.start();print('Browser',b.endpoint,flush=True)
 argv=['codex','sandbox','-P','evaluation-local','-C',str(p),*permission_args(),'node',str(logs/'browser_probe.mjs'),b.endpoint]
 with (logs/'sandbox-browser-probe.log').open('w') as f:
  proc=subprocess.Popen(argv,stdout=f,stderr=f,start_new_session=True)
  try:code=proc.wait(timeout=20)
  except subprocess.TimeoutExpired:code=-1
  finally:
   try:os.killpg(proc.pid,signal.SIGTERM)
   except ProcessLookupError:pass
 print('exit',code,(logs/'sandbox-browser-probe.log').read_text(),flush=True)
finally:b.close()
