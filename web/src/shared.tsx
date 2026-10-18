export const date=(s:string)=>new Intl.DateTimeFormat('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(s))
export const num=(v:number|null|undefined)=>v==null?'—':v.toFixed(1)
export function Logo({large=false}:{large?:boolean}){
 return <svg className={large?'pelican large':'pelican'} viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M18 54c-4-15 0-32 12-37 8-3 16 1 17 9l-5 17c9 7 12 19 1 24-10 5-21 0-25-13Z" fill="currentColor"/><path d="m43 27 29 10-30 5-11-10Z" fill="#ed9856"/><path d="m43 42 22-4c-2 10-11 15-20 9" fill="#d67336"/><circle cx="39" cy="25" r="2.3" fill="#313438"/><path d="M20 43c8-3 13 2 14 12-7 2-12-3-14-12Z" fill="#bbc1ca"/><path d="m27 66-4 7m15-6 4 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
}
