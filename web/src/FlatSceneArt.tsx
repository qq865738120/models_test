import {jumpPath,platformPose} from './artGeometry'

export function DispatchArt(){return <g><rect x="32" y="73" width="294" height="204" rx="15" fill="#fffdf9" stroke="#d7cdc0" strokeWidth="2"/><path d="M33 110h292" stroke="#e6dfd6" strokeWidth="2"/><circle cx="53" cy="92" r="4" fill="#d49c72"/><circle cx="67" cy="92" r="4" fill="#d8cbbb"/><circle cx="81" cy="92" r="4" fill="#d8cbbb"/><rect x="50" y="128" width="59" height="131" rx="5" fill="#f0ebe3"/><path d="M61 145h35m-35 19h27m-27 19h30" stroke="#b9aea1" strokeWidth="5" strokeLinecap="round"/><rect x="127" y="129" width="126" height="14" rx="5" fill="#e1d8cc"/><rect x="267" y="129" width="41" height="14" rx="5" fill="#ca9063"/>{[163,193,223].map((y,i)=><g key={y} className={i===1?'dispatch-row':undefined}><rect x="127" y={y} width="181" height="23" rx="4" fill={i===1?'#f8e9d9':'#f4f1eb'}/><rect x="138" y={y+7} width="9" height="9" rx="2" fill={i===1?'#cc8b55':'#cbc5bc'}/>{i===1&&<path className="dispatch-check" d={`m140 ${y+11} 2 2 4-5`} stroke="#fffdf9" strokeWidth="1.5" fill="none"/>}<path d={`M158 ${y+11}h57`} stroke="#c7beb3" strokeWidth="4" strokeLinecap="round"/><rect x="271" y={y+6} width="26" height="11" rx="5" fill={i===1?'#d4aa80':'#a8b8c5'}/></g>)}<g className="dispatch-badge"><circle cx="289" cy="70" r="34" fill="#6d849d"/><path className="dispatch-check" d="m274 70 10 10 20-23" stroke="#fffdf9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></g></g>}

export function ResearchArt(){return <g strokeLinecap="round" strokeLinejoin="round"><path d="M40 234q60-32 137 4 75-37 144-9v58q-65-25-144 7-73-31-137-6Z" fill="#b29ab7"/><path d="M48 217q61-28 129 10 72-38 137-13v65q-65-25-137 9-69-33-129-10Z" fill="#fffdf9" stroke="#d5c8c0" strokeWidth="2"/><path d="M177 229v58m-110-52q40-11 87 9m-87 7q40-11 87 9m46-15q45-21 91-14m-91 30q45-21 91-14" stroke="#dbd0c5" strokeWidth="3"/><g className="research-papers"><path className="research-link" d="M155 158q24 23 50 0" stroke="#b6a1b8" strokeWidth="2" strokeDasharray="4 7"/><g transform="rotate(-13 114 135)"><rect x="59" y="70" width="99" height="126" rx="8" fill="#fffdf9" stroke="#c5ccd4" strokeWidth="2"/><path d="M77 91h48m-48 14h62m-62 56h60m-60 13h36" stroke="#b6c3d0" strokeWidth="4"/><ellipse cx="109" cy="134" rx="25" ry="10" stroke="#c28b56" strokeWidth="2"/><ellipse cx="109" cy="134" rx="25" ry="10" transform="rotate(60 109 134)" stroke="#c28b56" strokeWidth="2"/><ellipse cx="109" cy="134" rx="25" ry="10" transform="rotate(-60 109 134)" stroke="#c28b56" strokeWidth="2"/></g><g transform="rotate(12 250 137)"><rect x="201" y="72" width="99" height="126" rx="8" fill="#fffdf9" stroke="#d7c9ba" strokeWidth="2"/><path d="M220 94h48m-48 14h60m-60 55h60m-60 13h36" stroke="#d4bca2" strokeWidth="4"/><text x="224" y="148" fill="#a395b1" fontSize="30" fontFamily="Georgia,serif">∫ x²</text></g><circle className="research-node" cx="179" cy="112" r="13" fill="#d6a773"/></g></g>}

const jumpFrames=Array.from({length:151},(_,i)=>{
 const p=platformPose(i/150)
 return `${i/150*100}%{transform:translate(${p.x}px,${p.y}px)}`
}).join('')
export function PlatformArt(){return <g strokeLinecap="round" strokeLinejoin="round">
 <style>{`@keyframes platformJump{${jumpFrames}}`}</style>
 <path d="M30 275h300" stroke="#c7bbae" strokeWidth="3"/>
 <path d={jumpPath} stroke="#c9b6a0" strokeWidth="2" strokeDasharray="5 8"/>
 <path d="M30 248h83v27H30zm112-56h76v20h-76zm109-53h80v20h-80z" fill="#a8b6c4"/>
 <path d="M30 248h83m29-56h76m33-53h80" stroke="#647e96" strokeWidth="7"/>
 <g className="platform-parcel"><rect x="155" y="135" width="33" height="33" rx="5" fill="#d99d5e"/><path d="M171 136v31m-15-22h31" stroke="#f8e4c5" strokeWidth="3"/></g>
 <rect x="281" y="70" width="35" height="64" rx="7" fill="#f7f4ed" stroke="#cabcab" strokeWidth="3"/><circle cx="305" cy="102" r="3" fill="#bd8a5a"/>
 <g className="platform-player"><g className="platform-facing">
  <path d="m-20-14 7-29 25 1 10 28Z" fill="#fffdf9"/>
  <ellipse cx="0" cy="-52" rx="15" ry="17" fill="#fffdf9"/>
  <path d="m11-57 29 10-30 7" fill="#da9752"/><circle cx="5" cy="-58" r="3" fill="#48515b"/>
  <path d="M-11-39q17-3 20 15-16 6-20-15" fill="#bcc6cf"/>
  <path d="m-10-14-7 12m27-12 5 12" stroke="#ce965e" strokeWidth="4"/>
 </g></g>
 <g className="platform-robot">
  <circle cx="223" cy="269.5" r="4" fill="#687686"/><circle cx="242" cy="269.5" r="4" fill="#687686"/>
  <rect x="214" y="243" width="36" height="24" rx="7" fill="#8b949e"/>
  <circle cx="224" cy="253" r="3" fill="#f1c382"/><circle cx="240" cy="253" r="3" fill="#f1c382"/>
 </g>
</g>}
