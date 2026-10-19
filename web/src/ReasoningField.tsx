import type {ReasoningOption} from './types'
import {normalizedLevels} from './reasoning'
export default function ReasoningField({value,onChange,options,editing=false}:{value:string;onChange:(value:string)=>void;options:ReasoningOption[];editing?:boolean}){
 return <div className="reasoning-field"><label>思考强度<select aria-label={editing?'编辑思考强度':'思考强度'} value={value} onChange={e=>onChange(e.target.value)}><option value="">未记录</option><optgroup label="统一五档">{options.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</optgroup><option value="unsupported">不支持设置</option></select></label><small>按模型自身可调范围从低到高归一化：2个原生档位→{normalizedLevels(2).join('/')}档；3个→{normalizedLevels(3).join('/')}档；4个→{normalizedLevels(4).join('/')}档；5个→1/2/3/4/5档。同档不代表相同算力；需在客户端设置对应原生档位。</small><details><summary>更多档位与默认设置如何记录</summary><small>原生有 n 个有序档位时，第 i 个（从0计）映射为 1 + 四舍五入(4×i÷(n−1))，超过5个会合并相邻档位。仅有一个固定档位或无法调节时选“不支持设置”。使用默认或自适应但无法确定相对位置时，保留“未记录”；不要猜成中档。此处记录比较条件，不自动修改客户端。</small></details></div>
}
