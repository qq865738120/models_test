import {useEffect,useRef,useState} from 'react'
import {ArrowDownToLine,ArrowRight,Check,CheckCircle2,ChevronDown,Clipboard,Loader2,LockKeyhole,Play,Plus,Settings2,ShieldCheck,X} from 'lucide-react'
import {api,copyText,setToken} from './api'
import {Logo,date} from './shared'
import Presentation from './Presentation'
import Dashboard from './Dashboard'
import Admin from './Admin'
import type {Bootstrap,Detail,Job,Phase} from './types'

export default function App(){
 const [boot,setBoot]=useState<Bootstrap|null>(null),[error,setError]=useState(''),[toast,setToast]=useState('')
 const [view,setView]=useState<'studio'|'dashboard'|'admin'>('studio')
 const [runId,setRunId]=useState(new URLSearchParams(location.search).get('run')||localStorage.getItem('pelican-run')||'')
 const [detail,setDetail]=useState<Detail|null>(null),[taskId,setTaskId]=useState('01-svg'),[phase,setPhase]=useState<Phase>('initial')
 const [job,setJob]=useState<Job|null>(null),[busy,setBusy]=useState(false),[picker,setPicker]=useState(false),[tools,setTools]=useState(false),[fullscreen,setFullscreen]=useState(false)
 const root=useRef<HTMLDivElement>(null),runRef=useRef(runId);runRef.current=runId
 const notice=(text:string)=>setToast(text)
 const onDetail=(d:Detail)=>{if(d.run.id===runRef.current)setDetail(d)}
 async function refresh(nextRun?:string){
  const b=await api<Bootstrap>('/bootstrap');setToken(b.token);setBoot(b)
  if(nextRun){setRunId(nextRun);return}
  const current=runRef.current
  if(current&&b.runs.some(r=>r.id===current))onDetail(await api<Detail>('/runs/'+current))
 }
 useEffect(()=>{api<Bootstrap>('/bootstrap').then(b=>{setToken(b.token);setBoot(b);setRunId(b.runs.some(r=>r.id===runRef.current)?runRef.current:b.runs.find(r=>!r.legacy&&!r.archived)?.id||'')}).catch(e=>setError(e.message))},[])
 useEffect(()=>{
  if(!runId||!boot){setDetail(null);return}setDetail(null);let active=true
  api<Detail>('/runs/'+runId).then(d=>{if(active){setDetail(d);if(!d.tasks[taskId])setTaskId(Object.keys(d.tasks)[0]||'01-svg')}}).catch(e=>{if(active)setError(e.message)})
  localStorage.setItem('pelican-run',runId);const url=new URL(location.href);url.searchParams.set('run',runId);history.replaceState(null,'',url)
  return()=>{active=false}
 },[runId,!!boot])
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),4000);return()=>clearTimeout(t)},[toast])
 useEffect(()=>{
  if(!job||job.status==='done'||job.status==='failed')return
  let cancelled=false
  const timer=setTimeout(async()=>{try{const j=await api<Job>('/jobs/'+job.id);if(cancelled)return;setJob(j);if(j.status==='done'){await refresh(j.result?.runId);notice(j.result?.passed===false?'检查完成：发现材料改动，请查看记录':'操作已完成并保存到本地')}if(j.status==='failed')setError(j.error||'操作失败')}catch(e){if(!cancelled){setError((e as Error).message);setJob(null)}}},700)
  return()=>{cancelled=true;clearTimeout(timer)}
 },[job])
 useEffect(()=>{const changed=()=>setFullscreen(document.fullscreenElement===root.current);document.addEventListener('fullscreenchange',changed);return()=>document.removeEventListener('fullscreenchange',changed)},[])
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setPicker(false);setTools(false)}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[])
 async function perform(operation:()=>Promise<unknown>){setError('');setBusy(true);try{await operation()}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 const toggleFullscreen=()=>perform(async()=>{if(document.fullscreenElement===root.current)await document.exitFullscreen();else await root.current?.requestFullscreen()})
 const selectRun=(id:string)=>{setRunId(id);setPicker(false);setView('studio');setPhase('initial')}
 async function action(name:string){if(!detail)return;await perform(async()=>setJob(await api<Job>(`/runs/${runId}/tasks/${taskId}/action`,'POST',{action:name,phase})))}
 const current=detail?.tasks[taskId],task=(detail?.rubric||boot?.tasks)?.find(t=>t.id===taskId)
 const working=busy||!!(job&&['queued','running'].includes(job.status))
 const frozen=!!current?.state[phase==='initial'?'initialSnapshot':'changeSnapshot']
 if(!boot)return <div className="splash"><Logo large/><h1>鹈鹕测评 <span>v1.0</span></h1>{error?<><p className="error-text">{error}</p><button onClick={()=>location.reload()}>重新连接</button></>:<p><Loader2 className="spin" size={16}/>正在连接本地工作台</p>}</div>
 return <div ref={root} className={'app '+(fullscreen?'presentation-fullscreen':'')}>
  <header className="app-header"><button className="brand" onClick={()=>setView('studio')}><Logo/><span>鹈鹕测评 <b>v1.0</b></span></button><nav className="app-nav" aria-label="页面导航">{([['studio','演示测评'],['dashboard','成绩对比'],['admin','后台管理']] as const).map(([id,label])=><button key={id} className={view===id?'active':''} onClick={()=>setView(id)}>{label}</button>)}</nav><div className="header-actions">{view!=='admin'&&<select aria-label="交付阶段" value={phase} onChange={e=>setPhase(e.target.value as Phase)}><option value="initial">初始交付</option><option value="change">追加交付</option></select>}{view==='studio'&&<><button className="model-picker" title={detail?.run.model} onClick={()=>setPicker(true)}><span>{detail?.run.model||'选择测试模型'}</span><ChevronDown size={15}/></button><button className="icon-button" aria-label="主持人工具" title="主持人工具" onClick={()=>setTools(true)}><Settings2 size={18}/></button></>}</div></header>
  <main className="app-content">
   <div className="view-panel" hidden={view!=='studio'}><Presentation tasks={detail?.rubric||boot.tasks} taskId={taskId} setTaskId={setTaskId} detail={detail} runId={runId} phase={phase} busy={working} perform={perform} onDetail={onDetail} refresh={refresh} notice={notice} fullscreen={fullscreen} toggleFullscreen={toggleFullscreen} keyboardBlocked={view!=='studio'||picker||tools} openAdmin={()=>setView('admin')}/></div>
   <div className="view-panel" hidden={view!=='dashboard'}><Dashboard tasks={boot.tasks} runs={boot.runs} phase={phase} fullscreen={fullscreen} toggleFullscreen={toggleFullscreen} keyboardBlocked={view!=='dashboard'||picker||tools} onSelect={selectRun}/></div>
   <div className="admin-view" hidden={view!=='admin'}><div className="admin-container"><Admin boot={boot} busy={working} perform={perform} setJob={setJob} refresh={refresh} notice={notice} onSelect={selectRun}/><div className="admin-export"><a href="/api/export/csv">导出全部成绩 CSV</a><a href="/api/export/json">导出完整记录 JSON</a></div></div></div>
  </main>
  {picker&&<div className="modal-backdrop" onClick={()=>setPicker(false)}><section className="modal model-dialog" role="dialog" aria-modal="true" aria-label="选择测试模型" onClick={e=>e.stopPropagation()}><div className="panel-title"><div><span className="section-kicker">历史模型</span><h3>选择测试模型</h3></div><button className="icon-button" aria-label="关闭模型选择" onClick={()=>setPicker(false)}><X size={20}/></button></div><div className="model-list">{boot.runs.filter(r=>!r.legacy&&!r.archived).map(r=><button key={r.id} onClick={()=>selectRun(r.id)}><span>{r.model}<small>第 {r.repeat} 轮 · {date(r.createdAt)}</small></span>{r.id===runId&&<Check size={18}/>}</button>)}</div><button className="secondary full-width" onClick={()=>{setPicker(false);setView('admin')}}><Plus size={16}/>新建测评项目</button></section></div>}
  {tools&&<div className="modal-backdrop tools-backdrop" onClick={()=>setTools(false)}><aside className="host-drawer" role="dialog" aria-modal="true" aria-label="主持人工具" onClick={e=>e.stopPropagation()}><div className="panel-title"><div><span className="section-kicker">测评管理</span><h3>主持人工具</h3></div><button className="icon-button" aria-label="关闭主持人工具" onClick={()=>setTools(false)}><X size={20}/></button></div><p className="drawer-task">{task?.number} · {task?.title}</p><span className="status-pill">{phase==='initial'?'初始交付':'追加交付'} · {frozen?'已冻结':current?.state.startedAt?'进行中':'未开始计时'}</span>{current&&!detail?.run.legacy?<><label className="path-label">本题工作区<code>{current.path}</code></label><button className="secondary full-width" onClick={()=>perform(async()=>{await copyText(current.path);notice('项目目录已复制')})}><Clipboard size={16}/>复制工作区路径</button><div className="host-action-list"><button className="import-control" disabled={working} onClick={()=>perform(async()=>{const result=await api<Detail>(`/runs/${runId}/tasks/${taskId}/artifacts`,'POST',{phase});onDetail(result);await refresh();notice('作品已更新')})}><ArrowDownToLine size={18}/><span>导入作品<small>读取当前阶段的 HTML 交付</small></span></button><button disabled={working||!!current.state.startedAt||current.state.phase!==phase||frozen} onClick={()=>action('start')}><Play size={18}/><span>开始计时<small>按本题预设时长记录</small></span></button><button disabled={working} onClick={()=>action('check')}><ShieldCheck size={18}/><span>检查材料<small>核对受保护的测试文件</small></span></button><button disabled={working||frozen||current.state.phase!==phase} onClick={()=>action('snapshot')}><LockKeyhole size={18}/><span>冻结本阶段<small>保存项目快照，保留交付证据</small></span></button><button disabled={working||!current.state.initialSnapshot||!!current.state.changeReleasedAt} onClick={()=>action('release')}><ArrowRight size={18}/><span>开放追加任务<small>初始交付冻结后可操作</small></span></button></div></>:<p className="muted">请先初始化本题的 v1.0 测试项目。</p>}<button className="text-button" onClick={()=>{setTools(false);setView('admin')}}>进入后台管理<ArrowRight size={16}/></button></aside></div>}
  <div className="notifications">{error&&<div className="banner error" role="alert"><span>{error}</span><button aria-label="关闭错误提示" onClick={()=>setError('')}><X size={16}/></button></div>}{job&&['queued','running'].includes(job.status)&&<div className="banner pending"><Loader2 className="spin" size={18}/>{job.label}，请稍候…</div>}{toast&&<div className="toast" role="status"><CheckCircle2 size={18}/>{toast}</div>}</div>
 </div>
}
