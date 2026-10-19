import {useEffect,useMemo,useRef,useState} from 'react'
import {ArrowDownToLine,ArrowRight,Clipboard,Expand,FileCode2,LockKeyhole,Monitor,RefreshCw,Save,Star,X} from 'lucide-react'
import DeckFrame from './DeckFrame'
import {changeBrief,promptPages} from './deck'
import {api,copyText} from './api'
import {Logo,date,num} from './shared'
import type {Artifact,Detail,Phase,Task} from './types'

type Draft={values:Record<string,number|null>;notes:string;dirty:boolean}
type Props={tasks:Task[];taskId:string;setTaskId:(id:string)=>void;detail:Detail|null;runId:string;phase:Phase;busy:boolean;perform:(fn:()=>Promise<unknown>)=>Promise<void>;onDetail:(d:Detail)=>void;refresh:()=>Promise<void>;notice:(s:string)=>void;fullscreen:boolean;toggleFullscreen:()=>void;keyboardBlocked:boolean;openAdmin:()=>void}

export default function Presentation(p:Props){
 const task=p.tasks.find(t=>t.id===p.taskId)||p.tasks[0]
 const current=p.detail?.tasks[task.id],text=current?.prompts[p.phase]||''
 const pages=useMemo(()=>promptPages(text,task.title),[text,task.title])
 const rubric=(p.detail?.rubric.find(t=>t.id===task.id)||task).rubric
 const context=p.runId+task.id+p.phase
 const [position,setPosition]=useState(0),[direction,setDirection]=useState(1)
 const [selected,setSelected]=useState<Record<string,string>>({}),[drafts,setDrafts]=useState<Record<string,Draft>>({})
 const items=current?.artifacts[p.phase]||[]
 const artifact=items.find(a=>a.id===selected[context])||items[items.length-1]
 const stored=artifact?p.detail?.review.scores[artifact.id]:undefined
 const draft=artifact?(drafts[artifact.id]||{values:stored?.values||{},notes:stored?.notes||'',dirty:false}):{values:{},notes:'',dirty:false}
 const promptCount=Math.max(1,pages.length),resultIndex=2+promptCount,scoreIndex=resultIndex+1
 const count=scoreIndex+(artifact?rubric.length+1:1)
 const index=Math.min(position,count-1)
 const sections=[{label:'题目',index:0},{label:'任务',index:1},{label:'提示词',index:2},{label:'作品',index:resultIndex},{label:'评分',index:scoreIndex}]
 useEffect(()=>{setPosition(0);setDirection(1)},[context])
 const jump=(next:number)=>{setDirection(next<index?-1:1);setPosition(Math.max(0,Math.min(count-1,next)))}
 const update=(patch:Partial<Draft>)=>{if(artifact)setDrafts(old=>({...old,[artifact.id]:{...draft,...patch,dirty:true}}))}
 const complete=rubric.every(d=>draft.values[d.id]!=null)
 const valid=rubric.every(d=>draft.values[d.id]==null||(Number.isFinite(draft.values[d.id])&&draft.values[d.id]!>=0&&draft.values[d.id]!<=10))
 const total=complete&&valid?rubric.reduce((sum,d)=>sum+draft.values[d.id]!*d.weight/10,0):null
 const save=()=>p.perform(async()=>{
  if(!p.detail||!artifact)return
  const result=await api<Detail>(`/runs/${p.runId}/tasks/${task.id}/scores`,'POST',{phase:p.phase,artifactId:artifact.id,revision:p.detail.review.revision,values:draft.values,notes:draft.notes})
  p.onDetail(result);setDrafts(old=>{if(old[artifact.id]!==draft)return old;const next={...old};delete next[artifact.id];return next});await p.refresh();p.notice(complete?'评分已保存':'评分草稿已保存')
 })
 const select=(id:string)=>setSelected(old=>({...old,[context]:id}))
 const importResult=()=>p.perform(async()=>{
  const result=await api<Detail>(`/runs/${p.runId}/tasks/${task.id}/artifacts`,'POST',{phase:p.phase})
  p.onDetail(result);select('');await p.refresh();p.notice('成果已导入，历史版本继续保留')
 })
 const unavailable=!p.detail||p.detail.run.legacy||!current
 const unavailableText=!p.detail?'请先在后台初始化模型项目。':p.detail.run.legacy?'旧版记录已保留，请新建 v1.0 轮次。':'本轮未初始化这道题，请新建包含此题的轮次。'
 const stageName=p.phase==='initial'?'初始交付':'追加交付'
 const caption=`${p.detail?.run.model||'尚未选择模型'} · ${stageName}`
 const label=(name:string)=><div className="slide-kicker"><span/>{task.number} / {name}</div>
 const versionSelect=artifact&&<select aria-label="成果版本" value={artifact.id} onChange={e=>select(e.target.value)}>{[...items].reverse().map((a,i)=><option key={a.id} value={a.id}>版本 {items.length-i} · {date(a.createdAt)}</option>)}</select>
 const dimension=index>=scoreIndex&&index<scoreIndex+rubric.length?rubric[index-scoreIndex]:null
 return <DeckFrame slideKey={context+'-'+index} index={index} count={count} direction={direction} onMove={d=>jump(index+d)} onEdge={end=>jump(end?count-1:0)} sections={sections} onJump={jump} fullscreen={p.fullscreen} toggleFullscreen={p.toggleFullscreen} keyboardBlocked={p.keyboardBlocked} footer={caption}
  left={<select className="task-select" aria-label="选择题目" value={task.id} onChange={e=>p.setTaskId(e.target.value)}>{p.tasks.map(t=><option key={t.id} value={t.id}>{t.number} · {t.shortTitle}</option>)}</select>}>
  {index===0&&<div className="intro-slide">{label(task.category)}<div className="intro-copy"><h1>{task.title}</h1><p>{task.description}</p><div className="intro-meta"><span>{p.phase==='initial'?task.minutes:task.changeMinutes} 分钟</span><i/><span>{task.level}</span><i/><span>HTML 作品</span></div></div><div className="intro-art" aria-hidden="true"><span className="art-disc"/><Logo large/><b>{task.number}</b></div><div className="intro-bottom"><div><small>考察能力</small><p>{task.capabilities.join('  /  ')}</p></div><button className="slide-link" onClick={()=>jump(1)}>查看任务 <ArrowRight size={21}/></button></div></div>}
  {index===1&&<div className="requirements-slide">{label('THE CHALLENGE')}<h2>这一次，要完成什么？</h2><ol className="requirement-lines">{(p.phase==='initial'?task.brief:current?.prompts.change?changeBrief[task.id]:['初始阶段冻结后，开放固定追加需求。']).map((line,i)=><li key={line}><span>{String(i+1).padStart(2,'0')}</span><p>{line}</p></li>)}</ol><div className="delivery-line"><FileCode2 size={22}/><span>最终交付 <strong>output/index.html</strong></span><small>含本地资源，可内嵌演示</small></div></div>}
  {index>=2&&index<resultIndex&&<div className="prompt-slide">{label('PROMPT')}<div className="slide-heading"><h2>{pages[index-2]?.label||'给模型的提示词'}</h2><button className="primary" disabled={!text} onClick={()=>p.perform(async()=>{await copyText(text);p.notice('完整提示词已复制，包含全部任务与规则')})}><Clipboard size={17}/>复制完整提示词</button></div>{pages[index-2]?<><pre className="prompt-page">{pages[index-2].text}</pre><div className="slide-note">长文本按页展示 · 复制时包含全部页面 · 不含主持人评分标准</div></>:<Empty icon="lock" title={unavailable?'准备一个独立工作区':'追加任务尚未开放'} text={unavailable?unavailableText:'先在主持人工具中冻结初始交付，再开放追加需求。'} action={unavailable?<button className="primary" onClick={p.openAdmin}>打开后台管理<ArrowRight size={16}/></button>:undefined}/>}</div>}
  {index===resultIndex&&<div className="result-slide">{label('SHOW THE WORK')}<div className="slide-heading"><h2>{task.shortTitle} · 作品展示</h2><div className="slide-actions">{versionSelect}<button className="secondary" disabled={p.busy||unavailable} onClick={importResult}><ArrowDownToLine size={17}/>{artifact?'导入新版本':'载入 HTML'}</button></div></div><ResultStage artifact={artifact} title={task.title} perform={p.perform}/>{artifact&&<div className={'slide-note '+(!artifact.integrityPassed?'error-text':'')}>{artifact.integrityPassed?'已保存独立成果副本':'材料完整性未通过，此成果不计入总榜'} · {artifact.fileCount} 个文件</div>}</div>}
  {index>=scoreIndex&&(!artifact?<div className="score-slide">{label('HOST EVALUATION')}<Empty icon="star" title="先看到作品，再给出分数。" text="载入本题 HTML 成果后，评分会关联到具体版本。" action={<button className="primary" onClick={()=>jump(resultIndex)}>去作品展示<ArrowRight size={17}/></button>}/></div>:dimension?<div className="score-slide">{label(`评分维度 ${index-scoreIndex+1} / ${rubric.length}`)}<div className="slide-heading"><h2>{dimension.name}</h2><span className="weight-label">权重 {dimension.weight}%</span></div><p className="dimension-description">{dimension.description}</p><div className="score-setting"><div className="score-number"><input aria-label={dimension.name+'评分'} type="number" min="0" max="10" step="0.5" placeholder="—" value={draft.values[dimension.id]??''} onChange={e=>update({values:{...draft.values,[dimension.id]:e.target.value===''?null:Number(e.target.value)}})}/><span>/ 10</span></div><div className="score-scale"><input aria-label={dimension.name+'滑块'} type="range" min="0" max="10" step="0.5" value={draft.values[dimension.id]??5} className={draft.values[dimension.id]==null?'unrated':''} onChange={e=>update({values:{...draft.values,[dimension.id]:Number(e.target.value)}})}/><div><span>0</span><span>5</span><span>10</span></div></div><button className="text-button" onClick={()=>update({values:{...draft.values,[dimension.id]:null}})}>清空</button></div><div className="score-anchors">{dimension.anchors.map(a=><button key={a.score} className={draft.values[dimension.id]===a.score?'selected':''} onClick={()=>update({values:{...draft.values,[dimension.id]:a.score}})}><strong>{a.score}<small>分</small></strong><span>{a.text}</span></button>)}</div><div className="score-save-row"><span>{draft.dirty?'尚有未保存的修改':stored?'已保存 · '+date(stored.savedAt):'空白表示未评分'} · 已评 {rubric.filter(d=>draft.values[d.id]!=null).length}/{rubric.length} 项</span><button className="secondary" disabled={p.busy||!draft.dirty||!valid} onClick={save}><Save size={17}/>{complete?'保存评分':'保存草稿'}</button><button className="slide-link" onClick={()=>jump(scoreIndex+rubric.length)}>查看汇总<ArrowRight size={18}/></button></div></div>:<div className="summary-slide">{label('WEIGHTED SCORE')}<div className="slide-heading"><h2>这一题，表现如何？</h2>{versionSelect}</div><div className="summary-grid"><div className="summary-score"><span>本题加权得分</span><strong>{num(total)}<small>/ 100</small></strong><p>Σ（维度分 × 权重 ÷ 10）<br/>未评分项保留为空。</p>{!artifact.integrityPassed&&<p className="error-text">材料完整性未通过，不计入总榜。</p>}</div><div className="summary-dimensions">{rubric.map((d,i)=><button key={d.id} onClick={()=>jump(scoreIndex+i)}><span>{d.name}</span><small>{d.weight}%</small><strong>{num(draft.values[d.id])}</strong><ArrowRight size={16}/></button>)}</div></div><div className="summary-bottom"><label>主持人评语<textarea maxLength={10000} value={draft.notes} placeholder="记录亮点、缺陷与证据…" onChange={e=>update({notes:e.target.value})}/></label><div><span>{draft.dirty?'有未保存的修改':stored?'评分已保存':'还没有保存评分'}</span><button className="primary" disabled={p.busy||!draft.dirty||!valid} onClick={save}><Save size={17}/>{complete?'保存评分':'保存草稿'}</button>{p.tasks.findIndex(t=>t.id===task.id)<p.tasks.length-1&&<button className="slide-link" onClick={()=>p.setTaskId(p.tasks[p.tasks.findIndex(t=>t.id===task.id)+1].id)}>下一题<ArrowRight size={17}/></button>}</div></div></div>)}
 </DeckFrame>
}

function Empty({title,text,icon,action}:{title:string;text:string;icon:'lock'|'star'|'monitor';action?:React.ReactNode}){
 const Icon=icon==='lock'?LockKeyhole:icon==='star'?Star:Monitor
 return <div className="slide-empty"><Icon size={44} strokeWidth={1.2}/><h3>{title}</h3><p>{text}</p>{action}</div>
}

function ResultStage({artifact,title,perform}:{artifact?:Artifact;title:string;perform:Props['perform']}){
 const [reload,setReload]=useState(0),[full,setFull]=useState(false),container=useRef<HTMLDivElement>(null)
 useEffect(()=>{const change=()=>setFull(document.fullscreenElement===container.current);document.addEventListener('fullscreenchange',change);return()=>document.removeEventListener('fullscreenchange',change)},[])
 const fullscreen=()=>perform(async()=>{if(document.fullscreenElement===container.current)await document.exitFullscreen();else await container.current?.requestFullscreen()})
 return <div className={'result-stage '+(full?'result-full':'')} ref={container}>
  {artifact?<><iframe key={artifact.id+reload} src={artifact.url} title={title+' HTML成果'} sandbox="allow-scripts" allow="fullscreen" allowFullScreen/><div className="result-floating"><button aria-label="重新加载成果" onClick={()=>setReload(n=>n+1)}><RefreshCw size={18}/></button><button aria-label={full?'退出作品全屏':'全屏展示成果'} onClick={fullscreen}>{full?<X size={20}/>:<Expand size={18}/>}</button></div></>:<Empty icon="monitor" title="下一幕，交给模型的作品。" text="模型完成 output/index.html 后，点击右上角「载入 HTML」。"/>}
 </div>
}
