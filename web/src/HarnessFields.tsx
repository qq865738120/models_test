import type {HarnessOption} from './types'
export type HarnessValue={harness:string;harnessCustom:string}
export const emptyHarness:HarnessValue={harness:'',harnessCustom:''}
export default function HarnessFields({value,onChange,options,editing=false}:{value:HarnessValue;onChange:(v:HarnessValue)=>void;options:HarnessOption[];editing?:boolean}){
 return <div className="harness-fields"><label>Harness<select aria-label={editing?'编辑 Harness':'Harness'} required={!editing} value={value.harness} onChange={e=>onChange({...value,harness:e.target.value,harnessCustom:''})}><option value="">{editing?'未记录':'请选择 Harness'}</option>{options.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</select></label>{value.harness==='other'&&<label>自定义 Harness 名称<input aria-label="自定义 Harness 名称" required maxLength={120} value={value.harnessCustom} onChange={e=>onChange({...value,harnessCustom:e.target.value})}/></label>}<small className="muted">记录实际使用的执行工具，用于区分测评条件。</small></div>
}
