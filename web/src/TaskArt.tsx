import type {Task} from './types'
import {BicycleArt,ForkliftArt} from './SceneArt'
import {DispatchArt,PlatformArt,ResearchArt} from './FlatSceneArt'
export default function TaskArt({task}:{task:Task}){
 return <svg className={'task-art art-'+task.id} viewBox="0 0 360 340" fill="none" role="img" aria-label={task.title+'示意图'}>
  <circle cx="180" cy="164" r="133" fill="#f3ebdf"/>
  {task.id==='01-svg'?<BicycleArt/>:task.id==='02-static'?<StaticPageArt/>:task.id==='03-dispatch'?<DispatchArt/>:task.id==='04-game2d'?<PlatformArt/>:task.id==='05-game3d'?<ForkliftArt/>:<ResearchArt/>}
 </svg>
}

function StaticPageArt(){return <g strokeLinecap="round" strokeLinejoin="round">
 <rect x="34" y="67" width="292" height="214" rx="15" fill="#fffdf9" stroke="#d7cdc0" strokeWidth="2"/>
 <path d="M35 101h290" stroke="#e4dbce" strokeWidth="2"/>
 <circle cx="53" cy="84" r="4" fill="#d49c72"/><circle cx="67" cy="84" r="4" fill="#d8cbbb"/><circle cx="81" cy="84" r="4" fill="#d8cbbb"/>
 <rect x="51" y="117" width="258" height="107" rx="8" fill="#6d9290"/>
 <path d="M67 143h67m-67 13h49m-49 32h53" stroke="#eff0db" strokeWidth="6"/>
 <circle cx="266" cy="140" r="15" fill="#ecc88b"/>
 <path d="M177 197c3-16 21-20 38-15 16 4 30-1 31-15l-3-16c-2-10 4-17 12-17 10 0 15 10 12 18l-4 13c-5 39-47 58-79 43Z" fill="#fffdf9"/>
 <path d="m263 147 36 8-37 9" fill="#dda36c"/>
 <path d="M266 152l29 4-28 5" fill="#f0c598"/>
 <circle cx="259" cy="143" r="2.5" fill="#3c5759"/>
 <path d="M191 191c14-7 30-3 36 5-14 8-28 6-36-5" fill="#c2d0cb"/>
 <path d="M66 244h61m-61 13h45m83-13h60m-60 13h42m41-13h36m-36 13h25" stroke="#d9c9b6" strokeWidth="5"/>
 <path d="m315 50 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" fill="#ca9063"/>
 </g>}
