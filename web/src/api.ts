let token=''
export function setToken(value:string){token=value}
export async function api<T>(path:string,method='GET',data?:unknown):Promise<T>{
 const response=await fetch('/api'+path,{method,headers:{'Content-Type':'application/json','X-Pelican-Token':token},body:data===undefined?undefined:JSON.stringify(data)})
 const result=await response.json()
 if(!response.ok) throw Error(result.error||'操作未完成，请重试')
 return result
}
export async function copyText(value:string){
 if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);return}
 const box=document.createElement('textarea');box.value=value;document.body.append(box);box.select();const ok=document.execCommand('copy');box.remove();if(!ok)throw Error('无法自动复制，请手动选择文本复制')
}
