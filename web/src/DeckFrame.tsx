import {useEffect,useRef,useState,type ReactNode} from 'react'
import {ChevronLeft,ChevronRight,Expand,Minimize2} from 'lucide-react'

type Props={children:ReactNode;slideKey:string;index:number;count:number;direction:number;onMove:(delta:number)=>void;onEdge:(end:boolean)=>void;sections:{label:string;index:number}[];onJump:(index:number)=>void;left?:ReactNode;footer:string;fullscreen:boolean;toggleFullscreen:()=>void;keyboardBlocked?:boolean}

export default function DeckFrame(p:Props){
 const space=useRef<HTMLDivElement>(null),[scale,setScale]=useState(.7)
 useEffect(()=>{
  const node=space.current;if(!node)return
  const observer=new ResizeObserver(()=>setScale(Math.max(.1,Math.min((node.clientWidth-32)/1280,(node.clientHeight-24)/720))))
  observer.observe(node);return()=>observer.disconnect()
 },[])
 useEffect(()=>{
  function key(e:KeyboardEvent){
   if(document.fullscreenElement?.classList.contains('result-stage'))return
   if(p.keyboardBlocked||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.repeat)return
   if((e.target as HTMLElement)?.closest('.core-prompt'))return
   if((e.target as HTMLElement)?.closest('input,textarea,select,[contenteditable="true"],[role="dialog"]'))return
   if(e.key===' '&&(e.target as HTMLElement)?.closest('button,a'))return
   if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();p.onMove(1)}
   else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();p.onMove(-1)}
   else if(e.key==='Home'){e.preventDefault();p.onEdge(false)}
   else if(e.key==='End'){e.preventDefault();p.onEdge(true)}
  }
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)
 },[p.onMove,p.onEdge,p.keyboardBlocked])
 const active=p.sections.filter(s=>s.index<=p.index).at(-1)?.index??0
 return <div className="deck-layout"><div className="stage-space" ref={space}>
  <div className="canvas-viewport" style={{width:1280*scale,height:720*scale}}>
   <div className="deck-canvas" style={{transform:`scale(${scale})`}}>
    <article key={p.slideKey} className={'slide-page '+(p.direction<0?'turn-back':'turn-forward')} aria-roledescription="幻灯片" aria-label={`第${p.index+1}页，共${p.count}页`}>
     {p.children}
     <div className="slide-footer"><span>鹈鹕测评 <b>v1.0</b></span><small>{String(p.index+1).padStart(2,'0')}</small></div>
    </article>
   </div>
  </div>
 </div>
 <div className="deck-controls"><div className="deck-left">{p.left}</div>
  <nav className="chapter-nav" aria-label="章节导航">{p.sections.map(s=><button key={s.label} className={active===s.index?'active':''} onClick={()=>p.onJump(s.index)}>{s.label}</button>)}</nav>
  <select className="chapter-select" aria-label="跳转章节" value={active} onChange={e=>p.onJump(Number(e.target.value))}>{p.sections.map(s=><option key={s.label} value={s.index}>{s.label}</option>)}</select>
  <div className="page-controls"><span className="page-count" aria-live="polite">{String(p.index+1).padStart(2,'0')} <i>/ {String(p.count).padStart(2,'0')}</i></span><button title="上一页 · ←" aria-label="上一页" disabled={p.index===0} onClick={()=>p.onMove(-1)}><ChevronLeft size={19}/></button><button title="下一页 · →" aria-label="下一页" disabled={p.index===p.count-1} onClick={()=>p.onMove(1)}><ChevronRight size={19}/></button><button title={p.fullscreen?'退出全屏演示':'全屏演示'} aria-label={p.fullscreen?'退出全屏演示':'全屏演示'} onClick={p.toggleFullscreen}>{p.fullscreen?<Minimize2 size={17}/>:<Expand size={17}/>}</button></div>
 </div></div>
}
