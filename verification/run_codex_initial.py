"""Host-only supervisor: fresh per-task Codex sessions, timed initial submissions."""
import argparse,json,os,signal,subprocess,sys,traceback
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from evalkit import manager as m
from evalkit.studio import Studio
run=m.get_run(sys.argv[1])
logdir=run/'control/execution'
logdir.mkdir(exist_ok=False)
status={'model':'gpt-6.1-sol','reasoningEffort':'high','reasoningLevel':'3','phase':'initial','startedAt':m.now(),'status':'running','tasks':{}}
config={
 'model_reasoning_effort':'high','approval_policy':'never','sandbox_workspace_write.network_access':False,
 'project_doc_max_bytes':0,'project_root_markers':['AGENTS.md'],'web_search':'disabled',
 'memories.use_memories':False,'memories.generate_memories':False,'shell_environment_policy.inherit':'core',
 'features.skip_host_skill_discovery':True,
}
for feature in ['apps','plugins','remote_plugin','memories','multi_agent','multi_agent_v2','computer_use','browser_use','browser_use_external','in_app_browser','image_generation','hooks','shell_snapshot','skill_search','skill_mcp_dependency_install']:
 config['features.'+feature]=False
base=['codex','--no-daemon','exec','--ignore-user-config','--skip-git-repo-check','--model','gpt-6.1-sol','--sandbox','workspace-write','--json']
for k,v in config.items():base+=['-c',k+'='+json.dumps(v)]
m.dump(logdir/'configuration.json',{'argvPrefix':base,'nativeEfforts':['low','medium','high','xhigh','max','ultra'],'normalization':'1+floor(4*2/(6-1)+0.5)=3','isolation':'rules-only; workspace-write terminal sandbox with network_access=false; not full read isolation','publicInstructions':'Only pinned initial prompt is passed. Automatic ancestor/user AGENTS loading disabled; per-task rules are included in the pinned prompt.','scope':'One initial pass per task. No automatic scoring or release of change prompts.'})
meta=m.load(run/'control/run.json')
meta['notes']='Codex 内置 CLI；gpt-6.1-sol；原生 high（高），六档等距归一化为3。每题全新会话、串行初始阶段；禁止额外智能体/搜索/连接器/记忆。终端 workspace-write 且禁网，整体仍按规则约束记录。'
m.atomic_json(run/'control/run.json',meta)
def save():m.atomic_json(logdir/'status.json',status)
proc=None
try:
 save()
 for key in meta['tasks']:
  project=run/'tasks'/key
  entry={'status':'running','startedAt':m.now()};status['tasks'][key]=entry;status['currentTask']=key;save()
  m.mark_start(argparse.Namespace(run=str(run),task=key))
  prompt=(run/'control/prompts'/f'{key}-initial.txt').read_text()
  argv=base+['-C',str(project),'-']
  with (logdir/f'{key}.jsonl').open('x') as out,(logdir/f'{key}.stderr.log').open('x') as err:
   proc=subprocess.Popen(argv,stdin=subprocess.PIPE,stdout=out,stderr=err,cwd=project,start_new_session=True,text=True)
   entry['pid']=proc.pid;save()
   try:
    proc.communicate(prompt,timeout=m.pinned_task(run,key)['minutes']*60)
    entry['exitCode']=proc.returncode;entry['status']='submitted' if proc.returncode==0 else 'execution_failed'
   except subprocess.TimeoutExpired:
    entry['status']='timed_out'
    os.killpg(proc.pid,signal.SIGTERM)
    try:proc.wait(timeout=5)
    except subprocess.TimeoutExpired:os.killpg(proc.pid,signal.SIGKILL);proc.wait()
   finally:
    try:os.killpg(proc.pid,signal.SIGTERM)
    except ProcessLookupError:pass
  for line in (logdir/f'{key}.jsonl').read_text().splitlines():
   try:e=json.loads(line)
   except ValueError:continue
   if e.get('type')=='thread.started':entry['threadId']=e.get('thread_id')
   if e.get('type')=='turn.completed':entry['usage']=e.get('usage')
  entry['finishedAt']=m.now();save()
  if entry['status']=='execution_failed':
   status['status']='blocked_execution';save();break
  try:
   m.check(argparse.Namespace(run=str(run),task=key))
   m.snapshot(argparse.Namespace(run=str(run),task=key,phase='initial',allow_invalid=False))
   entry['snapshot']='initial'
   if (project/'output/index.html').is_file():
    studio=Studio(m.ROOT/'data');studio.preview_origin='http://127.0.0.1:8788'
    try:studio.import_artifact(run.name,key,'initial');entry['imported']=True
    finally:studio.worker.shutdown()
  except (Exception,SystemExit) as exc:
   entry['validationError']=str(exc)
  save()
 else:status['status']='initial_pass_complete';status.pop('currentTask',None);save()
except BaseException as exc:
 if proc and proc.poll() is None:
  try:os.killpg(proc.pid,signal.SIGTERM)
  except ProcessLookupError:pass
 status['status']='supervisor_stopped';status['error']=str(exc);save();raise
print(json.dumps(status,ensure_ascii=False),flush=True)
