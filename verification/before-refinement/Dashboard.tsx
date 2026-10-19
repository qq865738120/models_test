import {useMemo,useState} from 'react'
import {ArrowDownToLine,BarChart3} from 'lucide-react'
import {Bar,BarChart,CartesianGrid,Cell,Legend,PolarAngleAxis,PolarGrid,PolarRadiusAxis,Radar,RadarChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts'
import DeckFrame from './DeckFrame'
import {date,num} from './shared'
import type {Phase,Run,Task} from './types'

const COLORS=['#d87d42','#586f9b','#a89bc7','#c7a967','#778b9d','#b88e97']
const tooltip={background:'#fff',border:'1px solid #e3e0dc',borderRadius:10,color:'#30343b',fontSize:17}
const short=(s:string)=>s.length>20?s.slice(0,19)+'…':s
type Props={tasks:Task[];runs:Run[];phase:Phase;fullscreen:boolean;toggleFullscreen:()=>void;keyboardBlocked:boolean;onSelect:(id:string)=>void}

export default function Dashboard(p:Props){
 const [position,setPosition]=useState(0),[direction,setDirection]=useState(1),[version,setVersion]=useState('')
 const versions=[...new Set(p.runs.filter(r=>!r.legacy&&!r.archived).map(r=>r.bundleSha256+'|'+r.rubricVersion))]
 const selectedVersion=versions.includes(version)?version:versions[0]
 const filtered=p.runs.filter(r=>!r.legacy&&!r.archived&&(r.bundleSha256+'|'+r.rubricVersion)===selectedVersion)
 const completeRuns=filtered.filter(r=>p.tasks.every(t=>r.taskScores[t.id]?.[p.phase]?.score!=null&&r.taskScores[t.id]?.[p.phase]?.eligible))
 const groups=useMemo(()=>{
  const map=new Map<string,Run[]>()
  completeRuns.forEach(r=>map.set(r.model,[...(map.get(r.model)||[]),r]))
  return [...map].map(([model,rs])=>{const scores=p.tasks.map(t=>rs.reduce((s,r)=>s+r.taskScores[t.id][p.phase].score!,0)/rs.length);return {model,count:rs.length,scores,total:scores.reduce((a,b)=>a+b,0)/p.tasks.length,runId:rs[0].id}}).sort((a,b)=>b.total-a.total)
 },[p.runs,p.phase,selectedVersion,p.tasks])
 const plotted=groups.slice(0,6)
 const data=p.tasks.map((t,i)=>({task:t.shortTitle,...Object.fromEntries(plotted.map((g,j)=>['m'+j,g.scores[i]]))}))
 const scorePages=Math.max(1,Math.ceil(groups.length/7)),historyPages=Math.max(1,Math.ceil(filtered.length/7))
 const historyStart=3+scorePages,count=historyStart+historyPages,index=Math.min(position,count-1)
 const jump=(i:number)=>{setDirection(i<index?-1:1);setPosition(Math.max(0,Math.min(count-1,i)))}
 const sections=[{label:'综合得分',index:0},{label:'能力轮廓',index:1},{label:'逐题比较',index:2},{label:'成绩总表',index:3},{label:'轮次记录',index:historyStart}]
 const title=index===0?'把能力，放在一起看。':index===1?'五道题，五种能力。':index===2?'总分背后的差异。':index<historyStart?'模型成绩总表':'每一轮，都有记录。'
 return <DeckFrame slideKey={'dashboard-'+index+'-'+p.phase+'-'+selectedVersion} index={index} count={count} direction={direction} onMove={d=>jump(index+d)} onEdge={end=>jump(end?count-1:0)} sections={sections} onJump={jump} footer={`${p.phase==='initial'?'初始交付':'追加交付'} · 相同材料与标准 · 完整轮次均值`} fullscreen={p.fullscreen} toggleFullscreen={p.toggleFullscreen} keyboardBlocked={p.keyboardBlocked}
  left={<select aria-label="对比材料版本" value={selectedVersion||''} onChange={e=>{setVersion(e.target.value);jump(0)}}>{versions.length?versions.map(v=><option key={v} value={v}>材料 {v.slice(0,8)}</option>):<option value="">暂无测评记录</option>}</select>}>
  <div className="chart-slide"><div className="slide-kicker"><span/>PELICAN / MODEL COMPARISON</div><div className="slide-heading"><h2>{title}</h2><a className="secondary" href="/api/export/csv"><ArrowDownToLine size={17}/>导出 CSV</a></div><p className="chart-subtitle">{groups.length} 个完整模型 · {completeRuns.length} 轮测评{index<3?' · 展示前 6 名':''}{index>=3?` · 第 ${index<historyStart?index-2:index-historyStart+1} / ${index<historyStart?scorePages:historyPages} 页`:''}</p>
  {index<3&&(plotted.length?<div className="presentation-chart">
   {index===0&&<ResponsiveContainer width="100%" height="100%"><BarChart data={plotted} layout="vertical" margin={{left:5,right:65,bottom:10,top:15}}><CartesianGrid stroke="#e9e6e2" horizontal={false}/><XAxis type="number" domain={[0,100]} tick={{fill:'#8b8c91',fontSize:16}} axisLine={false} tickLine={false}/><YAxis type="category" dataKey="model" width={280} tickFormatter={(s:string)=>s.length>16?s.slice(0,15)+"…":s} tick={{fill:'#454951',fontSize:17}} axisLine={false} tickLine={false}/><Tooltip contentStyle={tooltip} formatter={(v:number)=>[num(v),'综合得分']}/><Bar isAnimationActive={false} dataKey="total" barSize={30} radius={[0,5,5,0]} label={{position:'right',fill:'#53545a',fontSize:18,formatter:(v:number)=>num(v)}}>{plotted.map((g,i)=><Cell key={g.model} fill={COLORS[i]}/>)}</Bar></BarChart></ResponsiveContainer>}
   {index===1&&<ResponsiveContainer width="100%" height="100%"><RadarChart data={data} outerRadius="73%"><PolarGrid stroke="#dedbd6"/><PolarAngleAxis dataKey="task" tick={{fill:'#66676c',fontSize:18}}/><PolarRadiusAxis domain={[0,100]} tick={false} axisLine={false}/>{plotted.map((g,i)=><Radar isAnimationActive={false} key={g.model} name={g.model} dataKey={'m'+i} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={.06} strokeWidth={2.5}/>)}<Tooltip contentStyle={tooltip} formatter={(v:number)=>num(v)}/><Legend formatter={(v:string)=>short(v)} wrapperStyle={{fontSize:14,paddingTop:12}}/></RadarChart></ResponsiveContainer>}
   {index===2&&<ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{left:0,right:20,bottom:10,top:15}}><CartesianGrid stroke="#e9e6e2" vertical={false}/><XAxis dataKey="task" tick={{fill:'#66676c',fontSize:16}} axisLine={false} tickLine={false}/><YAxis domain={[0,100]} tick={{fill:'#8b8c91',fontSize:16}} axisLine={false} tickLine={false}/><Tooltip contentStyle={tooltip} formatter={(v:number)=>num(v)}/><Legend formatter={(v:string)=>short(v)} wrapperStyle={{fontSize:14,paddingTop:16}}/>{plotted.map((g,i)=><Bar isAnimationActive={false} key={g.model} name={g.model} dataKey={'m'+i} fill={COLORS[i]} radius={[4,4,0,0]} maxBarSize={34}/>)}</BarChart></ResponsiveContainer>}
  </div>:<div className="slide-empty"><BarChart3 size={44} strokeWidth={1.2}/><h3>等待第一份完整成绩。</h3><p>完成一个模型的五题评分后，图表会在这里呈现。</p></div>)}
  {index>=3&&<div className="presentation-table"><table><thead><tr><th>模型 / {index<historyStart?'轮数':'时间'}</th>{p.tasks.map(t=><th key={t.id}>{t.shortTitle}</th>)}<th>{index<historyStart?'综合得分':'状态'}</th></tr></thead><tbody>{index<historyStart?groups.slice((index-3)*7,(index-2)*7).map((g,i)=><tr key={g.model}><td><button className="table-model" title={g.model} onClick={()=>p.onSelect(g.runId)}><span>{String((index-3)*7+i+1).padStart(2,'0')}</span><strong>{short(g.model)}</strong></button><small>{g.count} 轮均值</small></td>{g.scores.map((v,i)=><td key={i}>{num(v)}</td>)}<td className="table-total">{num(g.total)}</td></tr>):filtered.slice((index-historyStart)*7,(index-historyStart+1)*7).map(r=><tr key={r.id}><td><button className="table-model" title={r.model} onClick={()=>p.onSelect(r.id)}><strong>{short(r.model)}</strong></button><small>第{r.repeat}轮 · {date(r.createdAt)}</small></td>{p.tasks.map(t=><td key={t.id}>{num(r.taskScores[t.id]?.[p.phase]?.score)}</td>)}<td><span className="status-pill">{completeRuns.includes(r)?'完整':'进行中'}</span></td></tr>)}</tbody></table>{!(index<historyStart?groups.length:filtered.length)&&<div className="table-empty">暂无记录。未完成评分不会被记为零分。</div>}</div>}
  </div>
 </DeckFrame>
}
