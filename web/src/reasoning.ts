import type {Run,ReasoningOption} from './types'
export const reasoningLabel=(run:Pick<Run,'reasoningLevel'>,options:ReasoningOption[])=>run.reasoningLevel==='unsupported'?'不支持设置':run.reasoningLevel?(options.find(o=>o.id===run.reasoningLevel)?.label||run.reasoningLevel):'未记录思考强度'
// Equal spacing of ordinal positions, with half-way positions rounded upward.
export function normalizedLevels(count:number):number[]{
 if(!Number.isInteger(count)||count<2||count>100)throw new Error('需提供2至100个由低到高的实际档位')
 return Array.from({length:count},(_,i)=>1+Math.floor(4*i/(count-1)+.5))
}
