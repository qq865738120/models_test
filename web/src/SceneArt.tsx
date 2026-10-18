import {forkliftSurfaces} from './forkliftGeometry'
import {useId} from 'react'
import {project} from './forkliftGeometry'
import {bike,bikeLeg} from './artGeometry'
// Near and far feet share one crank; both leg segments keep a fixed length.
const poses=Array.from({length:65},(_,i)=>({pct:i/64*100,near:bikeLeg(i/64*Math.PI*2),far:bikeLeg(i/64*Math.PI*2+Math.PI)}))
const pedalStyles=['near','far'].map(side=>{
 const values=poses.map(p=>({pct:p.pct,...p[side as 'near'|'far']}))
 return `@keyframes bike-leg-${side}{${values.map(p=>`${p.pct}%{d:path('${p.path}');}`).join('')}}
 @keyframes bike-foot-${side}{${values.map(p=>`${p.pct}%{transform:translate(${p.x}px,${p.y}px);}`).join('')}}`
}).join('\n')
export function BicycleArt(){
 const road=useId().replace(/:/g,'')+'road'
 return <g strokeLinecap="round" strokeLinejoin="round">
  <style>{pedalStyles}</style>
  <path d={`M32 ${bike.ground}H326`} stroke="#cdbda9" strokeWidth="3"/>
  <defs><clipPath id={road}><rect x="32" y="280" width="294" height="12"/></clipPath></defs>
  <g clipPath={`url(#${road})`}><g className="bike-road" stroke="#dfd3c4" strokeWidth="3">{Array.from({length:7},(_,i)=><path key={i} d={`M${i*71} 285h28`}/>)}</g></g>
  <g className="bike-ride">
   {[92,269].map(x=><g key={x} transform={`translate(${x} 228)`}>
    <circle r="44" stroke="#69727b" strokeWidth="7" fill="#fffdf9"/>
    <g className="bike-wheel" stroke="#b2bbc2" strokeWidth="2.5"><path d="M-40 0h80M0-40v80M-28-28l56 56m-56 0 56-56"/></g>
    <circle r="5" fill="#69727b"/>
   </g>)}
   <path className="bike-leg bike-leg-far" d={poses[0].far.path} stroke="#b89c7d" strokeWidth="7"/>
   <g className="bike-foot bike-foot-far"><path d="M-8 0H9" stroke="#b88751" strokeWidth="6"/></g>
   <path d="M92 228 143 155 180 220Z M92 228 153 167H244L269 228 M180 220 152 149 M244 167 231 126H210" stroke="#c88c57" strokeWidth="6"/>
   <path d="M127 148h44" stroke="#5f646c" strokeWidth="8"/>
   <path d="M42 176h74m-62 0 38 52m17-52-17 52" stroke="#8a929b" strokeWidth="4"/>
   <path d="M42 171h66" stroke="#9c8469" strokeWidth="5"/>
   <g className="bike-pudding"><path d="M49 168.5h51l-8-31.5H58Z" fill="#e8b66d"/><path d="M58 138h35" stroke="#c18448" strokeWidth="5"/><path d="M62 148v9" stroke="#f7d9a3" strokeWidth="3"/></g>
   <g transform="translate(180 220)"><g className="bike-crank"><path d="M-19 0h38" stroke="#69727b" strokeWidth="4"/></g><circle r="7" fill="#69727b"/></g>
   <path d="M143 150c-20-28-20-57-2-72 10-8 27-2 30 11l-9 29c17 8 21 26 5 34-8 4-17 3-24-2Z" fill="#fffdf9"/>
   <path d="m166 91 57 16-60 8-15-15" fill="#df9851"/><path d="m165 115 47-5c-6 15-27 20-43 11" fill="#c77939"/>
   <circle cx="158" cy="87" r="3.8" fill="#454a50"/>
   <path d="m152 127 35 16 36-15" stroke="#aab3be" strokeWidth="10"/><path d="m220 128 9-2" stroke="#df9851" strokeWidth="5"/>
   <path className="bike-leg bike-leg-near" d={poses[0].near.path} stroke="#a7afb8" strokeWidth="8"/>
   <g className="bike-foot bike-foot-near"><path d="M-6-3 9 0" stroke="#ce965e" strokeWidth="6"/><path d="M-9 3h20" stroke="#69727b" strokeWidth="3"/></g>
  </g>
  <path className="bike-wind" d="M42 98h36m-48 19h31" stroke="#d5c6b6" strokeWidth="3"/>
 </g>
}

// The complete forklift is depth-sorted in 3D before projecting to SVG.
export function ForkliftArt(){
 const clipId=useId().replace(/:/g,'')+'wheel'
 return <g strokeLinejoin="round">
  <path d="m49 260 179-88 108 59-178 89Z" fill="#e6ddd0"/>
  {forkliftSurfaces.map((face,i)=>{
   const points=face.screen.map(p=>p.map(n=>n.toFixed(3)).join(',')).join(' ')
   const wheel=face.wheel,anchor=wheel?project([wheel.x,wheel.y,20]):null
   return <g key={i}>
    <polygon data-part={face.part} points={points} fill={face.color} stroke={face.color} strokeWidth="0.15"/>
    {wheel&&anchor&&<>
     <defs><clipPath id={clipId+i}><polygon points={points}/></clipPath></defs>
     <g clipPath={`url(#${clipId+i})`}><g transform={`matrix(.9 -.42 0 -1 ${anchor[0]} ${anchor[1]})`}>
      <g className="forklift-wheel-turn" data-wheel={`${wheel.x},${wheel.y}`} fill="none" strokeLinecap="round" stroke={face.part==='tire'?'#788694':'#d5dde1'} strokeWidth={face.part==='tire'?1.3:2}>
       {[0,120,240].map(a=><path key={a} transform={`rotate(${a})`} d={face.part==='tire'?`M${wheel.radius} -2V2`:'M6.2 0H10.3'}/>)}
      </g>
     </g></g>
    </>}
   </g>
  })}
 </g>
}
