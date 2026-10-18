import type {Task} from './types'
import {BicycleArt,ForkliftArt} from './SceneArt'
import {DispatchArt,PlatformArt,ResearchArt} from './FlatSceneArt'
export default function TaskArt({task}:{task:Task}){
 return <svg className={'task-art art-'+task.id} viewBox="0 0 360 340" fill="none" role="img" aria-label={task.title+'示意图'}>
  <circle cx="180" cy="164" r="133" fill="#f3ebdf"/>
  {task.id==='01-svg'?<BicycleArt/>:task.id==='02-dispatch'?<DispatchArt/>:task.id==='03-game2d'?<PlatformArt/>:task.id==='04-game3d'?<ForkliftArt/>:<ResearchArt/>}
 </svg>
}
