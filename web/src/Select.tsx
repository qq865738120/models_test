import {useEffect,useId,useLayoutEffect,useRef,useState,type KeyboardEvent} from 'react'
import {createPortal} from 'react-dom'
import {Check,ChevronDown} from 'lucide-react'
import {placeSelect} from './selectGeometry'

export type SelectOption={value:string|number;label:string;group?:string;disabled?:boolean}
type Props={
 value:string|number
 onChange:(value:string)=>void
 options:SelectOption[]
 'aria-label':string
 className?:string
 disabled?:boolean
 required?:boolean
 name?:string
}

/** A select-only combobox. Focus stays on the trigger while its listbox is open. */
export default function Select(p:Props){
 const trigger=useRef<HTMLButtonElement>(null),popup=useRef<HTMLDivElement>(null)
 const [open,setOpen]=useState(false),[active,setActive]=useState(-1)
 const [placement,setPlacement]=useState<ReturnType<typeof placeSelect>&{fontSize:number}>()
 const search=useRef({text:'',at:0})
 const listId=useId()
 const selected=p.options.findIndex(o=>String(o.value)===String(p.value))
 const enabled=p.options.map((o,i)=>o.disabled?-1:i).filter(i=>i>=0)
 const activeIndex=enabled.includes(active)?active:enabled.includes(selected)?selected:enabled[0]
 const optionsKey=JSON.stringify(p.options)
 const close=(restore=false)=>{setOpen(false);search.current.text='';if(restore)trigger.current?.focus()}
 const expand=(last=false)=>{
  if(p.disabled||!enabled.length)return
  setActive(enabled.includes(selected)?selected:last?enabled.at(-1)!:enabled[0])
  setOpen(true)
 }
 const choose=(index:number)=>{
  const option=p.options[index]
  if(!option||option.disabled)return
  close(true)
  if(String(option.value)!==String(p.value))p.onChange(String(option.value))
 }

 useLayoutEffect(()=>{
  if(!open)return
  const node=trigger.current
  if(!node)return
  let frame=0
  // Follow layout and slide animation without using a transformed containing block.
  const position=()=>{
   const rect=node.getBoundingClientRect()
   const width=document.documentElement.clientWidth,height=window.innerHeight
   if(p.disabled||!node.getClientRects().length||!rect.width||!rect.height||
      rect.bottom<=0||rect.top>=height||rect.right<=0||rect.left>=width){
    setOpen(false);return
   }
   const scale=rect.height/(node.offsetHeight||rect.height)
   const fontSize=Math.max(12,parseFloat(getComputedStyle(node).fontSize)*scale)
   const groups=p.options.filter((o,i)=>o.group&&o.group!==p.options[i-1]?.group).length
   const desiredHeight=Math.min(320,p.options.length*Math.max(34,fontSize*1.5+14)+groups*28+12)
   const next={...placeSelect(rect,{width,height},desiredHeight),fontSize}
   setPlacement(old=>old&&Object.keys(next).every(key=>old[key as keyof typeof old]===next[key as keyof typeof next])?old:next)
   frame=requestAnimationFrame(position)
  }
  position()
  return()=>cancelAnimationFrame(frame)
 },[open,p.disabled,optionsKey])

 useEffect(()=>{
  if(!open)return
  const outside=(event:PointerEvent)=>{
   if(!trigger.current?.contains(event.target as Node)&&!popup.current?.contains(event.target as Node))close()
  }
  const dismiss=()=>close()
  const scrolled=(event:Event)=>{
   const target=event.target
   if(target===document||(target instanceof Element&&target.contains(trigger.current)))close()
  }
  document.addEventListener('pointerdown',outside,true)
  document.addEventListener('scroll',scrolled,true)
  document.addEventListener('fullscreenchange',dismiss)
  window.addEventListener('blur',dismiss)
  return()=>{
   document.removeEventListener('pointerdown',outside,true)
   document.removeEventListener('scroll',scrolled,true)
   document.removeEventListener('fullscreenchange',dismiss)
   window.removeEventListener('blur',dismiss)
  }
 },[open])

 useLayoutEffect(()=>{
  if(!open||!popup.current)return
  const option=popup.current.querySelector<HTMLElement>(`[data-option-index="${activeIndex}"]`)
  if(!option)return
  const top=option.offsetTop,bottom=top+option.offsetHeight
  if(top<popup.current.scrollTop)popup.current.scrollTop=top
  else if(bottom>popup.current.scrollTop+popup.current.clientHeight)popup.current.scrollTop=bottom-popup.current.clientHeight
 },[open,activeIndex,placement?.maxHeight,optionsKey])

 function keyDown(event:KeyboardEvent<HTMLButtonElement>){
  if(event.ctrlKey||event.metaKey||event.altKey)return
  const key=event.key
  if(Date.now()-search.current.at>=600)search.current.text=''
  if(key==='Tab'){close();return}
  if(key==='Escape'&&open){event.preventDefault();event.stopPropagation();close(true);return}
  const navigation=['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End','PageDown','PageUp']
  if(navigation.includes(key)){
   event.preventDefault();event.stopPropagation()
   if(!enabled.length)return
   if(!open){expand(key==='ArrowUp'||key==='End');if(key==='Home')setActive(enabled[0]);if(key==='End')setActive(enabled.at(-1)!);return}
   const index=enabled.indexOf(activeIndex)
   const delta=key==='PageDown'?5:key==='PageUp'?-5:key==='ArrowDown'||key==='ArrowRight'?1:-1
   const next=key==='Home'?0:key==='End'?enabled.length-1:Math.max(0,Math.min(enabled.length-1,index+delta))
   setActive(enabled[next]);return
  }
  if(key==='Enter'||key===' '&&!search.current.text){
   event.preventDefault();event.stopPropagation()
   if(open)choose(activeIndex);else expand()
   return
  }
  if(key.length===1&&!event.nativeEvent.isComposing){
   event.preventDefault();event.stopPropagation()
   const time=Date.now()
   const text=(time-search.current.at<600?search.current.text:'')+key.toLocaleLowerCase()
   search.current={text,at:time}
   const query=[...text].every(c=>c===text[0])?text[0]:text
   const start=enabled.indexOf(open?activeIndex:selected)
   const ordered=[...enabled.slice(start+1),...enabled.slice(0,start+1)]
   const match=ordered.find(i=>p.options[i].label.toLocaleLowerCase().startsWith(query))
   if(match!==undefined){setActive(match);setOpen(true)}
  }
 }

 return <>
  <button ref={trigger} type="button" role="combobox" aria-label={p['aria-label']}
   aria-haspopup="listbox" aria-expanded={open} aria-controls={open?listId:undefined}
   aria-activedescendant={open&&activeIndex!==undefined?`${listId}-${activeIndex}`:undefined}
   aria-required={p.required||undefined} disabled={p.disabled||!enabled.length}
   className={'ui-select '+(p.className||'')+(open?' is-open':'')}
   onClick={()=>open?close():expand()} onKeyDown={keyDown}
   onBlur={event=>{if(!popup.current?.contains(event.relatedTarget as Node))close()}}>
   <span className="ui-select-value">{p.options[selected]?.label||'请选择'}</span>
   <ChevronDown size={15} className="ui-select-chevron" aria-hidden="true"/>
  </button>
  {(p.required||p.name)&&<select className="ui-select-form" aria-hidden="true" tabIndex={-1}
   name={p.name} value={p.value} required={p.required} disabled={p.disabled}
   onChange={event=>p.onChange(event.target.value)}
   onInvalid={event=>{event.preventDefault();trigger.current?.focus();expand()}}>
   {p.options.map(o=><option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
  </select>}
  {open&&placement&&createPortal(
   <div ref={popup} id={listId} role="listbox" aria-label={p['aria-label']} data-select-popup
    className="ui-select-popup" style={{left:placement.left,top:placement.top,width:placement.width,maxHeight:placement.maxHeight,fontSize:placement.fontSize}}
    onClick={event=>event.stopPropagation()} onPointerDown={event=>event.preventDefault()}>
    {p.options.map((option,index)=><div key={option.value} role="presentation">
     {option.group&&option.group!==p.options[index-1]?.group&&<div className="ui-select-group" role="presentation">{option.group}</div>}
     <div id={`${listId}-${index}`} role="option" aria-selected={index===selected}
      aria-disabled={option.disabled||undefined} aria-label={option.group?`${option.group} · ${option.label}`:undefined}
      data-option-index={index}
      className={'ui-select-option'+(index===activeIndex?' is-active':'')+(index===selected?' is-selected':'')}
      onPointerMove={()=>{if(!option.disabled)setActive(index)}} onClick={()=>choose(index)}>
      <span>{option.label}</span><Check size={15} aria-hidden="true" style={{visibility:index===selected?'visible':'hidden'}}/>
     </div>
    </div>)}
   </div>,trigger.current?.closest('[role="dialog"]')||document.fullscreenElement||document.body)}
 </>
}
