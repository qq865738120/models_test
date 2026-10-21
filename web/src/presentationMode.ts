import type {Dimension,Score} from './types'
import {scoreTotal} from './scoreState'

export const PRESENTATION_MODE_KEY='pelican-presentation-mode'

export function readPresentationMode():boolean {
 try{return globalThis.localStorage?.getItem(PRESENTATION_MODE_KEY)==='true'}catch{return false}
}

export function savePresentationMode(enabled:boolean):void {
 try{globalThis.localStorage?.setItem(PRESENTATION_MODE_KEY,String(enabled))}catch{/* The switch remains usable when storage is unavailable. */}
}

export type PresentationPage={id:string;kind:'intro'|'requirements'|'prompt'|'result'|'dimension'|'score';dimensionIndex?:number}

/** Visible pages are the single source for chapter links, keyboard movement and page count. */
export function presentationDeck(mode:boolean,hasArtifact:boolean,binary:boolean,rubric:Pick<Dimension,'id'>[]){
 const pages:PresentationPage[]=[{id:'intro',kind:'intro'},{id:'requirements',kind:'requirements'}]
 if(!mode)pages.push({id:'prompt',kind:'prompt'})
 pages.push({id:'result',kind:'result'})
 if(!mode&&hasArtifact&&!binary)rubric.forEach((d,i)=>pages.push({id:'dimension:'+d.id,kind:'dimension',dimensionIndex:i}))
 pages.push({id:'score',kind:'score'})
 const resultIndex=pages.findIndex(p=>p.kind==='result')
 const scoreIndex=pages.findIndex(p=>p.kind==='dimension'||p.kind==='score')
 const sections=[{label:'题目',index:0},{label:'任务',index:1},
  ...(!mode?[{label:'提示词',index:2}]:[]),
  {label:binary?'答案':'作品',index:resultIndex},{label:'评分',index:scoreIndex}]
 return {pages,sections,resultIndex,scoreIndex}
}

export function presentationPageIndex(pageId:string,pages:PresentationPage[]):number {
 const exact=pages.findIndex(p=>p.id===pageId)
 if(exact>=0)return exact
 const fallback=pageId.startsWith('dimension:')?'score':pageId==='prompt'?'result':'intro'
 return Math.max(0,pages.findIndex(p=>p.id===fallback))
}

/** Present saved results only. An unfinished grade stays empty; zero is a real result. */
export function finalPresentationScore(taskId:string,rubric:Dimension[],score:Score|undefined,binary:boolean):number|null {
 if(!score)return null
 if(binary)return typeof score.total==='number'&&Number.isFinite(score.total)&&score.total>=0&&score.total<=100?score.total:null
 return scoreTotal(rubric,score.values,taskId)
}
