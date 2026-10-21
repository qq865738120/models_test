import Select from './Select'
import {useEffect,useMemo,useRef,useState,type ReactNode} from 'react'
import {ArrowRight,CheckCircle2,Clipboard,Expand,Loader2,LockKeyhole,Monitor,Play,RefreshCw,Save,Star,X} from 'lucide-react'
import DeckFrame from './DeckFrame'
import ScoreSummary from './ScoreSummary'
import SlideHeader from './SlideHeader'
import {presentationDeck,presentationPageIndex,finalPresentationScore} from './presentationMode'
import TaskArt from './TaskArt'
import VisualReference from './VisualReference'
import {getVisualReference} from './visualReferences'
import {levelClass} from './taskPresentation'
import {taskBrief,corePrompt} from './deck'
import {api,copyText} from './api'
import {date,num} from './shared'
import {isApiDimension,mergeScoreDraft,scoreTotal,scoreValueValid,type ScoreDraft} from './scoreState'
import type {Artifact,BackendStatus,Detail,Dimension,Job,Phase,Score,Task} from './types'

type Props={presentationMode:boolean;selectedArtifactId?:string;artifactRefresh:number;tasks:Task[];taskId:string;setTaskId:(id:string)=>void;detail:Detail|null;runId:string;phase:Phase;busy:boolean;perform:(fn:()=>Promise<unknown>)=>Promise<void>;onDetail:(d:Detail)=>void;refresh:()=>Promise<void>;notice:(s:string)=>void;setJob:(job:Job)=>void;fullscreen:boolean;toggleFullscreen:()=>void;keyboardBlocked:boolean;openAdmin:()=>void}

export default function Presentation(p:Props){
 const task=p.tasks.find(t=>t.id===p.taskId)||p.tasks[0]
 const current=p.detail?.tasks[task.id],text=current?.prompts[p.phase]||''
 const core=useMemo(()=>corePrompt(text,task.title),[text,task.title])
 const taskRubric=p.detail?.rubric.find(t=>t.id===task.id)||task
 const binary=taskRubric.scoringMode==='binary'||taskRubric.scoringMode==='objective'
 const rubric=p.phase==='change'?(taskRubric.rubricChange||taskRubric.rubric):taskRubric.rubric
 const apiScoring=rubric.some(d=>isApiDimension(task.id,d))
 const context=p.runId+task.id+p.phase
 const [pageId,setPageId]=useState('intro'),[direction,setDirection]=useState(1)
 const [drafts,setDrafts]=useState<Record<string,ScoreDraft>>({})
 const items=current?.artifacts[p.phase]||[]
 const artifact=items.find(a=>a.id===p.selectedArtifactId)||items[items.length-1]
 const stored=artifact?p.detail?.review.scores[artifact.id]:undefined
 const savedDraft=artifact?drafts[artifact.id]:undefined
 const draft=mergeScoreDraft(rubric,stored,savedDraft,task.id)
 const {pages,sections,resultIndex,scoreIndex}=presentationDeck(p.presentationMode,!!artifact,binary,rubric)
 const count=pages.length,index=presentationPageIndex(pageId,pages),page=pages[index]
 useEffect(()=>{setPageId(items.length?'result':'intro');setDirection(1)},[context,p.detail?.run.id])
 const jump=(next:number)=>{setDirection(next<index?-1:1);setPageId(pages[Math.max(0,Math.min(count-1,next))].id)}
 const update=(patch:Partial<ScoreDraft>)=>{if(artifact)setDrafts(old=>({...old,[artifact.id]:{...draft,...patch,dirty:true}}))}
 const complete=rubric.every(d=>draft.values[d.id]!=null)
 const valid=rubric.every(d=>scoreValueValid(d,draft.values[d.id],task.id))
 const total=scoreTotal(rubric,draft.values,task.id)
 const save=()=>p.perform(async()=>{
  if(!p.detail||!artifact)return
  const result=await api<Detail>(`/runs/${p.runId}/tasks/${task.id}/scores`,'POST',{phase:p.phase,artifactId:artifact.id,revision:p.detail.review.revision,values:draft.values,notes:stored?.notes??''})
  p.onDetail(result);setDrafts(old=>{if(old[artifact.id]!==savedDraft)return old;const next={...old};delete next[artifact.id];return next});await p.refresh();p.notice(complete?'评分已保存':'评分草稿已保存')
 })
 const gradeApi=()=>p.perform(async()=>{
  if(!artifact||!apiScoring)return
  const job=await api<Job>(`/runs/${p.runId}/tasks/${task.id}/auto-grade`,'POST',{phase:p.phase,artifactId:artifact.id})
  p.setJob(job)
  if(job.status==='done'){await p.refresh();p.notice('接口评分已保存')}
  if(job.status==='failed')throw Error(job.error||'接口评分未完成')
 })
 const apiButton=apiScoring&&artifact?<button className="secondary" disabled={p.busy} onClick={gradeApi}><Play size={16}/>运行接口评分</button>:null
 const unavailable=!p.detail||p.detail.run.legacy||!current
 const unavailableText=!p.detail?'请先在后台初始化模型项目。':p.detail.run.legacy?'旧版记录已保留，请新建 v1.0 轮次。':'本轮未初始化这道题，请新建包含此题的轮次。'
 const label=(title:string,actions?:ReactNode)=><SlideHeader number={task.number} title={title} actions={actions}/>
 const dimension=page.kind==='dimension'?rubric[page.dimensionIndex!]:null
 return <DeckFrame slideKey={context+'-'+page.id+'-'+p.presentationMode} index={index} count={count} direction={direction} onMove={d=>jump(index+d)} onEdge={end=>jump(end?count-1:0)} sections={sections} onJump={jump} fullscreen={p.fullscreen} toggleFullscreen={p.toggleFullscreen} keyboardBlocked={p.keyboardBlocked}
  left={<Select className="task-select" aria-label="选择题目" value={task.id} onChange={p.setTaskId} options={p.tasks.map(t=>({value:t.id,label:`${t.number} · ${t.shortTitle}`}))}/>}>
  {index===0&&<div className="intro-slide">{label(task.title)}<div className="intro-copy"><p>{task.description}</p><div className="intro-meta"><span className={"difficulty difficulty-"+levelClass(task.level)}><b/>{task.level}</span><i/><span>{task.category}</span></div></div><div className="intro-art" aria-hidden="true"><TaskArt task={task}/><b>{task.number}</b></div><div className="intro-bottom"><div><small>考察能力</small><p>{task.capabilities.join('  /  ')}</p></div><button className="slide-link" onClick={()=>jump(1)}>查看任务 <ArrowRight size={21}/></button></div></div>}
  {index===1&&<div className="requirements-slide">{label(task.shortTitle+' · 任务要求')}<ol className="requirement-lines" tabIndex={0} aria-label="任务要求">{taskBrief(task,p.phase,!!current?.prompts.change).map((line,i)=><li key={line}><span>{String(i+1).padStart(2,'0')}</span><p>{line}</p></li>)}</ol></div>}
  {page.kind==='prompt'&&<div className="prompt-slide">{label(task.shortTitle+' · 提示词',<button className="primary" disabled={!text} onClick={()=>p.perform(async()=>{await copyText(text);p.notice('完整提示词已复制，包含全部任务与规则')})}><Clipboard size={17}/>复制完整提示词</button>)}{core?<div className="core-prompt" tabIndex={0} aria-label="核心提示词">{core.split(/\n{2,}/).map((part,i)=>part.startsWith("## ")||part.startsWith("### ")?<section key={i}><h3>{part.split("\n")[0].replace(/^#{2,3} /,'')}</h3>{part.includes("\n")&&<p>{part.slice(part.indexOf("\n")+1)}</p>}</section>:<p key={i}>{part}</p>)}</div>:<Empty icon="lock" title={unavailable?'准备一个独立工作区':'追加任务尚未开放'} text={unavailable?unavailableText:'先在主持人工具中冻结初始交付，再开放追加需求。'} action={unavailable?<button className="primary" onClick={p.openAdmin}>打开后台管理<ArrowRight size={16}/></button>:undefined}/>}</div>}
  {page.kind==='result'&&<div className="result-slide">{label(task.shortTitle+' · '+(binary?'答案展示':'作品展示'))}<ResultStage artifact={artifact} binary={binary} title={task.title} perform={p.perform} refreshKey={p.artifactRefresh}/></div>}
  {p.presentationMode&&page.kind==='score'&&<ScoreSummary title={label(task.shortTitle+' · 评分汇总')} taskId={task.id} rubric={rubric} values={stored?.values||{}} total={artifact?finalPresentationScore(task.id,rubric,stored,binary):null} eligible={!artifact||artifact.integrityPassed} binary={binary}/>}
  {!p.presentationMode&&(page.kind==='dimension'||page.kind==='score')&&(!artifact?<div className="score-slide">{label(binary?'自动评分':apiScoring?'接口与人工评分':'人工评分')}<Empty icon="star" title={binary?'自动评分':apiScoring?'接口与人工评分':'人工评分'} text={binary?'导入答案后自动判分':'暂无作品'} action={<button className="primary" onClick={()=>jump(resultIndex)}>{binary?'去答案展示':'去作品展示'}<ArrowRight size={17}/></button>}/></div>:binary?<BinaryScore artifact={artifact} score={stored} rubric={rubric} label={label}/>:dimension?isApiDimension(task.id,dimension)?<ApiDimensionScore dimension={dimension} value={draft.values[dimension.id]} stored={stored} index={index-scoreIndex} count={rubric.length} label={label} runButton={apiButton} jumpSummary={()=>jump(scoreIndex+rubric.length)}/>:<DimensionScore taskId={task.id} phase={p.phase} dimension={dimension} index={index-scoreIndex} rubric={rubric} draft={draft} stored={stored} guidance={taskRubric.scoringGuidance} label={label} update={update} busy={p.busy} valid={valid} complete={complete} save={save} jumpSummary={()=>jump(scoreIndex+rubric.length)}/>:<ScoreSummary title={label(task.shortTitle+' · 评分汇总',apiButton)} taskId={task.id} rubric={rubric} values={draft.values} total={total} eligible={artifact.integrityPassed} onDimension={i=>jump(scoreIndex+i)} footer={p.tasks.findIndex(t=>t.id===task.id)<p.tasks.length-1?<div className="summary-bottom"><div><button className="slide-link" onClick={()=>p.setTaskId(p.tasks[p.tasks.findIndex(t=>t.id===task.id)+1].id)}>下一题<ArrowRight size={17}/></button></div></div>:undefined}/>)}
 </DeckFrame>
}

function ApiDimensionScore(p:{
 dimension:Dimension;value:number|null;stored?:Score;index:number;count:number;
 label:(name:string,actions?:ReactNode)=>ReactNode;runButton:ReactNode;jumpSummary:()=>void;
}){
 const checks=p.stored?.automationStale?[]:p.stored?.automation?.checks.filter(check=>check.dimensionId===p.dimension.id)||[]
 const value=p.value,scored=value===0||value===1
 return <div className="score-slide detailed-score api-score-slide">
  {p.label(p.dimension.name,<span className="weight-label">{p.index+1} / {p.count} · 接口评分 · {p.dimension.weight}%</span>)}
  <p className="dimension-description">{p.dimension.description}</p>
  <div className="api-score-overview">
   <strong>{scored?num(value*p.dimension.weight):'—'}<small>/ {p.dimension.weight}</small></strong>
   <div><b>{p.value===1?'通过':p.value===0?'未通过':p.stored?.automationStale?'接口规则已更新，请运行接口评分':'尚未运行接口评分'}</b><p>本项检查全部通过获得全部权重；存在失败则不得分。</p></div>
   {p.runButton}
  </div>
  <div className="rubric-scroll api-checks" tabIndex={0} aria-label="接口评分明细">
   {checks.length?<table><thead><tr><th>判定</th><th>接口检查结果</th></tr></thead><tbody>{checks.map(check=><tr key={check.id}><td className={check.passed==null?'':check.passed?'answer-correct':'answer-wrong'}>{check.passed==null?'未完成':check.passed?'通过':'失败'}</td><td>{check.message}</td></tr>)}</tbody></table>:<p>运行接口评分后，这里显示当前归档版本的检查结果。</p>}
  </div>
  <div className="score-save-row"><span>{p.stored?.automation&&!p.stored.automationStale?'结果已保存 · '+date(p.stored.automation.checkedAt):'接口评分由脚本保存'}</span><button className="slide-link" onClick={p.jumpSummary}>查看汇总<ArrowRight size={18}/></button></div>
 </div>
}

function DimensionScore(p:{
 taskId?:string;phase?:Phase;
 dimension:Dimension;index:number;rubric:Dimension[];draft:ScoreDraft;stored?:Score;guidance?:string;
 label:(name:string,actions?:ReactNode)=>ReactNode;update:(patch:Partial<ScoreDraft>)=>void;busy:boolean;valid:boolean;
 complete:boolean;save:()=>Promise<void>;jumpSummary:()=>void;
}){
 const d=p.dimension,value=p.draft.values[d.id]
 const hasReference=!!getVisualReference(p.taskId||'',d.id)
 const criteria=d.checks&&<details className={'rubric-checks'+(hasReference?' visual-rubric-checks':'')}><summary>{hasReference?'判分说明':'查看人工核验步骤与判分依据'}</summary><div className={hasReference?'visual-criteria-panel rubric-scroll':undefined} tabIndex={hasReference?0:undefined}>{hasReference&&<h3>{d.name} · 判分说明</h3>}<ol>{d.checks.map((check,i)=><li key={i}>{check}</li>)}</ol>{hasReference&&d.anchors.map(a=><p key={a.score}><b>{a.score}分：</b>{a.text}</p>)}<p>{p.guidance||'逐项操作归档成果，未检查的项目保留未评分。'}</p></div></details>
 return <div className={'score-slide detailed-score'+(hasReference?' visual-score':'')}>
  {p.label(d.name,<span className="weight-label">{p.index+1} / {p.rubric.length} · 人工评审 · {d.weight}%</span>)}
  <p className="dimension-description" title={hasReference?d.description:undefined}>{d.description}</p>
  <div className="score-setting">
   <div className="score-number"><output aria-label={d.name+'当前评分'}>{num(value)}</output><span>/ 10</span></div>
   <div className="score-scale"><input aria-label={d.name+'滑块'} aria-valuetext={value==null?'未评分':`${value}分`} type="range" min="0" max="10" step="0.5" value={value??5} className={value==null?'unrated':''} onPointerUp={e=>{if(value==null)p.update({values:{...p.draft.values,[d.id]:Number(e.currentTarget.value)}})}} onKeyDown={e=>{if(value==null&&(e.key==='Enter'||e.key===' ')){e.preventDefault();p.update({values:{...p.draft.values,[d.id]:Number(e.currentTarget.value)}})}}} onChange={e=>p.update({values:{...p.draft.values,[d.id]:Number(e.target.value)}})}/><div><span>0</span><span>5</span><span>10</span></div></div>
   <button className="text-button" onClick={()=>p.update({values:{...p.draft.values,[d.id]:null}})}>清空</button>
  </div>
  <div className="rubric-scroll" tabIndex={0} aria-label="评分细则">
   {hasReference?<VisualReference taskId={p.taskId!} dimensionId={d.id} phase={p.phase} value={value}/>:<div className="score-anchors">{d.anchors.map(anchor=><div key={anchor.score} className={value===anchor.score?'selected':''}><strong>{anchor.score}<small>分</small></strong><span>{anchor.text}</span></div>)}</div>}
   {!hasReference&&criteria}
  </div>
  <div className="score-save-row"><span>{p.draft.dirty?'尚有未保存的人工评分':p.stored?'已保存 · '+date(p.stored.savedAt):'空白表示未评分'} · 已评 {p.rubric.filter(d=>p.draft.values[d.id]!=null).length}/{p.rubric.length} 项</span>{hasReference&&criteria}<button className="secondary" disabled={p.busy||!p.draft.dirty||!p.valid} onClick={p.save}><Save size={17}/>{p.complete?'保存评分':'保存草稿'}</button><button className="slide-link" onClick={p.jumpSummary}>查看汇总<ArrowRight size={18}/></button></div>
 </div>
}

function BinaryScore({artifact,score,rubric,label}:{artifact:Artifact;score?:Score;rubric:Dimension[];label:(title:string,actions?:ReactNode)=>ReactNode}){
 const result=score?.autoGrade
 const tiered=result?.items.some(item=>item.scoring==='evidence-tier')??false
 const answer=(value:unknown)=>value==null||value===''?'未作答':typeof value==='string'?value:JSON.stringify(value)
 return <div className="binary-score-slide">
  {label('长文本推理 · 答案核对结果')}
  <div className="binary-score-overview"><strong>{num(score?.total)}<small>/ 100</small></strong><p>{tiered?'满分':'正确'} {result?.correct??0} / {result?.totalQuestions??rubric.length} 题{tiered&&<> · 部分得分 {result?.partial??0} 题</>}<br/>{tiered?'对错题全对得分；证据分档题按冻结档位获得 0、50% 或 100% 权重。':'答对获得该项全部权重，答错得 0 分。'}得分与当前归档版本绑定。</p></div>
  {!artifact.integrityPassed&&<p className="error-text">材料完整性未通过，此成果不计入总榜。</p>}
  <div className="rubric-scroll binary-results" tabIndex={0} aria-label="自动评分明细">
   <table><thead><tr><th>题目</th><th>提交答案</th><th>标准答案</th><th>判定</th><th>得分 / 权重</th></tr></thead><tbody>
    {rubric.map(d=>{const item=result?.items.find(i=>i.id===d.id);return <tr key={d.id}><td>{d.name}{item?.creditByAnswer&&<details className="answer-evidence"><summary>查看分档依据</summary>{Object.entries(item.creditByAnswer).map(([letter,credit])=><p key={letter}><b>{letter} · {credit*100}% 权重：</b>{item.rationaleByAnswer?.[letter]||'依据保存在本轮标准答案中。'}</p>)}</details>}</td><td>{answer(item?.answer)}</td><td>{answer(item?.expected)}</td><td className={item?.correct?'answer-correct':item?.credit?'answer-partial':'answer-wrong'}>{item?(item.correct?'正确':item.credit?'部分得分':'错误'):'未评分'}</td><td>{num(item?.earned)} / {d.weight}</td></tr>})}
   </tbody></table>
   {!!result?.errors.length&&<div className="binary-errors"><h3>答案格式提示</h3><ul>{result.errors.map((message,i)=><li key={i}>{message}</li>)}</ul></div>}
  </div>
 </div>
}

function Empty({title,text,icon,action}:{title:string;text:string;icon:'lock'|'star'|'monitor';action?:React.ReactNode}){
 const Icon=icon==='lock'?LockKeyhole:icon==='star'?Star:Monitor
 return <div className="slide-empty"><Icon size={44} strokeWidth={1.2}/><h3>{title}</h3><p>{text}</p>{action}</div>
}

function ResultStage({artifact,title,perform,binary,refreshKey}:{artifact?:Artifact;title:string;perform:Props['perform'];binary:boolean;refreshKey:number}){
 const [reload,setReload]=useState(0),[full,setFull]=useState(false),container=useRef<HTMLDivElement>(null)
 useEffect(()=>{const change=()=>setFull(document.fullscreenElement===container.current);document.addEventListener('fullscreenchange',change);return()=>document.removeEventListener('fullscreenchange',change)},[])
 const fullscreen=()=>perform(async()=>{if(document.fullscreenElement===container.current)await document.exitFullscreen();else await container.current?.requestFullscreen()})
 return <>
 <div className={'result-stage '+(full?'result-full':'')} ref={container}>
  {artifact?<><iframe key={artifact.id+reload+refreshKey} src={artifact.url} title={title+(binary?' 已归档答案':' HTML成果')} sandbox="allow-scripts" allow="fullscreen" allowFullScreen/><div className="result-floating"><button aria-label="重新加载成果" onClick={()=>setReload(n=>n+1)}><RefreshCw size={18}/></button><button aria-label={full?'退出作品全屏':'全屏展示成果'} onClick={fullscreen}>{full?<X size={20}/>:<Expand size={18}/>}</button></div></>:<Empty icon="monitor" title={binary?'本阶段暂无答案':'本阶段暂无作品'} text={binary?'在主持人工具中导入 output/answers.json，即可查看答案并自动评分。':'主持人导入作品后，可在这里查看并操作。可切换题目或交付阶段查看其他历史作品。'}/>}
 </div>
 </>
}

export function BackendPanel({artifact,perform,notice,onConnected}:{artifact:Artifact;perform:Props['perform'];notice:Props['notice'];onConnected:()=>void}){
 const [status,setStatus]=useState<BackendStatus|null>(null),[error,setError]=useState(''),[loading,setLoading]=useState(true),[attempt,setAttempt]=useState(0)
 const connection=useRef<{artifactId:string;running:boolean|null}>({artifactId:'',running:null}),connected=useRef(onConnected);connected.current=onConnected
 const command=`python3 bench.py preview-api --artifact ${artifact.id}`
 useEffect(()=>{
  let active=true;setLoading(true);setError('')
  if(connection.current.artifactId!==artifact.id){setStatus(null);connection.current={artifactId:artifact.id,running:null}}
  api<BackendStatus>(`/artifacts/${artifact.id}/backend-status`).then(next=>{
   if(!active)return
   setStatus(next)
   if(next.running&&connection.current.running===false)connected.current()
   connection.current={artifactId:artifact.id,running:next.running}
  }).catch(e=>{if(active){setError((e as Error).message);setStatus(null);connection.current={artifactId:artifact.id,running:false}}}).finally(()=>{if(active)setLoading(false)})
  return()=>{active=false}
 },[artifact.id,attempt])
 return <div className="backend-panel">
  <div className="backend-status-row">
   <strong className={status?.running?'is-connected':''}>{loading?<Loader2 className="spin" size={16}/>:status?.running?<CheckCircle2 size={16}/>:<Monitor size={16}/>} {loading?'正在读取接口状态':error?'接口状态读取失败':status?.running?'接口已连接':'接口未启动'}</strong>
   <button className="text-button" disabled={loading} onClick={()=>setAttempt(n=>n+1)}><RefreshCw size={15}/>刷新状态</button>
   <button className="secondary" onClick={()=>perform(async()=>{await copyText(command);notice('启动命令已复制，请在评测管理项目根目录的终端执行')})}><Clipboard size={15}/>复制启动命令</button>
  </div>
  <p>{error||status?.message||'读取当前成果的接口连接状态。'} 后端需在终端单独启动；每份成果使用独立内存，停止并重启后数据复位。</p>
  <code>{command}</code>
 </div>
}
