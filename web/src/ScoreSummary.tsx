import type {ReactNode} from 'react'
import {ArrowRight} from 'lucide-react'
import {num} from './shared'
import {isApiDimension} from './scoreState'
import type {Dimension} from './types'

type Props={title:ReactNode;taskId:string;rubric:Dimension[];values:Record<string,number|null>;total:number|null;eligible:boolean;binary?:boolean;onDimension?:(index:number)=>void;footer?:ReactNode}

/** The same overview serves the scoring editor and the read-only presentation. */
export default function ScoreSummary(p:Props){
 const valueText=(d:Dimension)=>{
  const value=p.values[d.id]
  if(p.binary)return value==null?'未评分':value===1?'正确':value===0?'错误':'部分得分'
  if(isApiDimension(p.taskId,d))return value===1?'通过':value===0?'未通过':'未评分'
  return num(value)
 }
 return <div className="summary-slide">
  {p.title}
  <div className="summary-grid">
   <div className="summary-score" aria-label="总分">
    <strong>{num(p.total)}<small>/ 100</small></strong>
    {p.total==null&&<p>待评分</p>}
    {!p.eligible&&<p className="error-text">材料完整性未通过，不计入总榜。</p>}
   </div>
   <div className={'summary-dimensions'+(p.rubric.length>5?' summary-dimensions-dense':'')} tabIndex={0} aria-label="各维度评分汇总">
    {p.rubric.map((d,i)=>{
     const content=<><span>{d.name}</span><small>{d.weight}%</small><strong>{valueText(d)}</strong>{p.onDimension&&<ArrowRight size={16}/>}</>
     return p.onDimension?<button key={d.id} onClick={()=>p.onDimension!(i)}>{content}</button>:<div className="summary-row" key={d.id}>{content}</div>
    })}
   </div>
  </div>
  {p.footer}
 </div>
}
