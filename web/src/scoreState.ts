import type {Dimension,Score} from './types'

export type ScoreDraft={values:Record<string,number|null>;dirty:boolean}

export function isApiDimension(taskId:string|undefined,dimension:Dimension):boolean {
 return taskId==='03-dispatch'&&dimension.scoring==='auto'
}

/** Only the dispatch API results are locked; all other draft changes remain editable. */
export function mergeScoreDraft(rubric:Dimension[],stored:Score|undefined,draft?:ScoreDraft,taskId?:string):ScoreDraft {
 const values=Object.fromEntries(rubric.map(d=>[
  d.id,isApiDimension(taskId,d)?stored?.values[d.id]??null:
   draft&&Object.hasOwn(draft.values,d.id)?draft.values[d.id]:stored?.values[d.id]??null,
 ]))
 return {values,dirty:draft?.dirty??false}
}

export function scoreValueValid(dimension:Dimension,value:number|null|undefined,taskId?:string):boolean {
 return value==null||(isApiDimension(taskId,dimension)?value===0||value===1:
  Number.isFinite(value)&&value>=0&&value<=10)
}

export function scoreTotal(rubric:Dimension[],values:ScoreDraft['values'],taskId?:string):number|null {
 if(rubric.some(d=>values[d.id]==null||!scoreValueValid(d,values[d.id],taskId)))return null
 return rubric.reduce((sum,d)=>sum+values[d.id]!*d.weight/(isApiDimension(taskId,d)?1:10),0)
}
