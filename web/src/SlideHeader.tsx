import type {ReactNode} from 'react'

export default function SlideHeader({number,label,title,actions}:{number?:string;label?:string;title:string;actions?:ReactNode}){
 return <header className="slide-heading compact-slide-heading">
  <div className="slide-heading-title">
   {(number||label)&&<span className="slide-heading-prefix">{number||label}<i>/</i></span>}
   <h2>{title}</h2>
  </div>
  {actions&&<div className="slide-actions">{actions}</div>}
 </header>
}
