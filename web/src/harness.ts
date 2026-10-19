import type {Run} from './types'
export const harnessIdentity=(r:Run)=>JSON.stringify([r.harness||'',r.harness==='other'?r.harnessCustom||'':''])
export const harnessLabel=(r:Run,options:{id:string;label:string}[]=[])=>{
 const name=r.harness==='other'?r.harnessCustom:r.harness?(options.find(o=>o.id===r.harness)?.label||r.harness):'未记录 Harness'
 return name
}
export const modelGroupKey=(r:Run)=>JSON.stringify([r.model,harnessIdentity(r),r.reasoningLevel||'',r.harness&&r.reasoningLevel?'':r.id])
