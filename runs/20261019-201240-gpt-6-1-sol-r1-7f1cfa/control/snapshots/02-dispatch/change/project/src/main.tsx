import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

type Status = 'all'|'pending'|'assigned'|'delivered'
type Page = 'overview'|'orders'|'couriers'|'reports'|'settings'
type Order = {id:string;customer:string;address:string;status:Exclude<Status,'all'>;courierId:string|null;priority:string;createdAt:string;contents:string;note:string}
type Api = { query:(p:{q?:string;status?:Status;page?:number;pageSize?:number})=>Promise<{items:Order[];total:number;page:number;pageSize:number}>;detail:(id:string)=>Promise<Order>;assign:(p:{ids:string[];courierId:string})=>Promise<{items:Order[]}>;control:(p:unknown)=>void }
type Stats = {all:number;pending:number;assigned:number;delivered:number;at:string}
type QueryState = {q:string;status:Status;page:number}
function readUrlQuery():QueryState {
 const params=new URLSearchParams(location.search)
 const status=params.get('status')||'all', rawPage=params.get('page')||'1'
 const candidate=/^\d+$/.test(rawPage)?Number(rawPage):NaN
 return {q:params.get('q')||'',status:(['all','pending','assigned','delivered'] as string[]).includes(status)?status as Status:'all',page:Number.isSafeInteger(candidate)&&candidate>0?candidate:1}
}
function writeUrlQuery(query:QueryState,mode:'push'|'replace') {
 const url=new URL(location.href)
 if(query.q)url.searchParams.set('q',query.q);else url.searchParams.delete('q')
 if(query.status!=='all')url.searchParams.set('status',query.status);else url.searchParams.delete('status')
 if(query.page!==1)url.searchParams.set('page',String(query.page));else url.searchParams.delete('page')
 if(url.href===location.href)return
 try {history[mode==='push'?'pushState':'replaceState'](null,'',url.pathname+url.search+url.hash)}
 catch { /* opaque sandbox iframe may reject History URL writes; business state remains usable. */ }
}
const labels = {all:'全部订单',pending:'待派单',assigned:'配送中',delivered:'已送达'}
const couriers = [{id:'P01',name:'鹈鹕一号'},{id:'P02',name:'鹈鹕二号'},{id:'P03',name:'鹈鹕三号'}]
const navs:{id:Page;label:string;icon:string;description:string}[] = [
  {id:'overview',label:'总览',icon:'overview',description:'从一份清晰的快照，掌握每一单的去向'},
  {id:'orders',label:'订单派送',icon:'orders',description:'安排每一份快递，查看实时派送状态'},
  {id:'couriers',label:'配送员',icon:'couriers',description:'选择派单对象，让每一份订单有所归属'},
  {id:'reports',label:'运行报表',icon:'reports',description:'用真实的订单状态，查看本次会话的运行情况'},
  {id:'settings',label:'设置',icon:'settings',description:'调整工作台，让日常派单更顺手'}
]
const fmt=(n:number)=>n.toLocaleString('zh-CN')
const courierName=(id:string|null)=>couriers.find(c=>c.id===id)?.name||'未分配'
const errorText=(e:unknown)=>e instanceof Error?e.message:'请求未完成，请重试'
// 一个浏览器页面只创建一次；业务页面始终使用这一个实例。
let sharedApi:Promise<Api>|undefined
function getApi():Promise<Api>{
 if(!sharedApi) sharedApi=import(/* @vite-ignore */ new URL('materials/mock-api.js',document.baseURI).href).then(m=>m.createMockApi()).catch(e=>{sharedApi=undefined;throw e})
 return sharedApi
}
if(new URLSearchParams(location.search).has('selftest')) (window as any).__dispatchApiReady=getApi()

function Icon({name,size=20}:{name:string;size?:number}) {
 const paths:Record<string,React.ReactNode>={
 overview:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
 orders:<><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9M7 5.8l9 5"/></>,
 couriers:<><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 5"/></>,
 reports:<><path d="M4 3v18h17M9 16v-5M14 16V7M19 16V4"/></>,
 settings:<><path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h6l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/></>,
 search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
 arrow:<path d="M4 12h16m-6-6 6 6-6 6"/>,
 clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
 check:<path d="m5 12 4 4L19 6"/>,
 close:<path d="m6 6 12 12M6 18 18 6"/>,
 menu:<path d="M4 6h16M4 12h16M4 18h16"/>,
 refresh:<><path d="M20 8a8 8 0 1 0 0 8M20 3v5h-5"/></>,
 info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
 bird:<><path d="M5 13c0-6 5-8 8-5 1-4 5-5 7-2l-4 3c2 6-1 11-6 11-5 0-7-4-7-7h10c-1 4-5 4-8 0Z"/><path d="m16 8 6 1-6 2M8 20l-1 2M12 20l1 2"/></>
 }
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]||paths.orders}</svg>
}
function Badge({status}:{status:Order['status']}) {return <span className={'badge '+status}><i/>{labels[status]}</span>}
function Spinner(){return <span className="spinner" aria-hidden="true"/>}
function ErrorBox({message,retry}:{message:string;retry:()=>void}){return <div className="error-box" role="alert"><Icon name="info"/><div><strong>读取失败</strong><p>{message}</p></div><button onClick={retry}>重试</button></div>}
function Layer({title,kind='modal',busy=false,onClose,children}:{title:string;kind?:'modal'|'drawer';busy?:boolean;onClose:()=>void;children:React.ReactNode}){
 const ref=useRef<HTMLDivElement>(null); const close=useRef(onClose);close.current=onClose
 useEffect(()=>{
  const previous=document.activeElement as HTMLElement|null; const old=document.body.style.overflow;document.body.style.overflow='hidden'
  const surface=document.getElementById('surface'); if(surface) surface.inert=true
  const controls=()=>Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled),select:not(:disabled),input:not(:disabled),[tabindex="0"]')||[])
  controls()[0]?.focus()
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!busy){e.preventDefault();close.current()} if(e.key==='Tab'){const list=controls();const first=list[0],last=list[list.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}}
  document.addEventListener('keydown',key)
  return()=>{document.removeEventListener('keydown',key);document.body.style.overflow=old;if(surface)surface.inert=false;if(previous?.isConnected)previous.focus()}
 },[busy])
 return <div className={'overlay '+kind} onMouseDown={e=>{if(e.target===e.currentTarget&&!busy)onClose()}}><div className="layer" ref={ref} role="dialog" aria-modal="true" aria-labelledby="layer-title"><header><div><span className="eyebrow">{kind==='drawer'?'ORDER DETAILS':'DISPATCH ORDER'}</span><h2 id="layer-title">{title}</h2></div><button className="icon-button" aria-label="关闭" disabled={busy} onClick={onClose}><Icon name="close"/></button></header>{children}</div></div>
}
function App(){
 const [page,setPage]=useState<Page>('orders'),[menu,setMenu]=useState(false)
 const [api,setApi]=useState<Api|null>(null),[initError,setInitError]=useState(''),[initTick,setInitTick]=useState(0)
 const [query,setQuery]=useState<QueryState>(readUrlQuery),[pageSize,setPageSize]=useState(20)
 const {q,status,page:pageNo}=query
 const queryRef=useRef(query);queryRef.current=query
 const [draftSize,setDraftSize]=useState(20),[selected,setSelected]=useState<string[]>([]),[courier,setCourier]=useState('')
 const [rows,setRows]=useState<Order[]>([]),[total,setTotal]=useState(0),[listLoading,setListLoading]=useState(true),[listError,setListError]=useState(''),[listTick,setListTick]=useState(0)
 const listSeq=useRef(0),statSeq=useRef(0),detailSeq=useRef(0)
 const [stats,setStats]=useState<Stats|null>(null),[statsLoading,setStatsLoading]=useState(true),[statsError,setStatsError]=useState(''),[statsTick,setStatsTick]=useState(0)
 const [detailId,setDetailId]=useState<string|null>(null),[detail,setDetail]=useState<Order|null>(null),[detailError,setDetailError]=useState(''),[detailLoading,setDetailLoading]=useState(false),[detailTick,setDetailTick]=useState(0)
 const [confirm,setConfirm]=useState(false),[assigning,setAssigning]=useState(false),[assignError,setAssignError]=useState(''),[toast,setToast]=useState('')
 const submitLock=useRef(false)
 const commitQuery=useCallback((next:QueryState,mode:'push'|'replace'|'restore'='push')=>{
  // Invalidate in the event handler, before an older promise can commit during a render gap.
  listSeq.current++;queryRef.current=next;setQuery(next)
  setSelected([]);setListLoading(true);setListError('')
  if(mode!=='restore')writeUrlQuery(next,mode)
 },[])
 useEffect(()=>{
  const restore=()=>{commitQuery(readUrlQuery(),'restore');setPage('orders');setMenu(false);setDetailId(null);setConfirm(false);setAssignError('');setToast('')}
  window.addEventListener('popstate',restore)
  return()=>window.removeEventListener('popstate',restore)
 },[commitQuery])
 useEffect(()=>{let live=true;setInitError('');getApi().then(a=>{if(live)setApi(a)}).catch(e=>{if(live)setInitError(errorText(e))});return()=>{live=false}},[initTick])
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),6000);return()=>clearTimeout(timer)},[toast])
 useEffect(()=>{
  if(!api)return
  const seq=++listSeq.current;setListLoading(true);setListError('')
  api.query({q,status,page:pageNo,pageSize}).then(result=>{if(seq!==listSeq.current)return;const max=Math.max(1,Math.ceil(result.total/pageSize));if(pageNo>max){commitQuery({...queryRef.current,page:max},'replace');return}setRows(result.items);setTotal(result.total);setListLoading(false)}).catch(e=>{if(seq===listSeq.current){setListError(errorText(e));setListLoading(false)}})
  return()=>{if(seq===listSeq.current)listSeq.current++}
 },[api,query,pageSize,listTick,commitQuery])
 const refreshStats=useCallback(()=>setStatsTick(t=>t+1),[])
 useEffect(()=>{
  if(!api)return
  const seq=++statSeq.current;setStatsLoading(true);setStatsError('')
  Promise.all((['all','pending','assigned','delivered'] as Status[]).map(s=>api.query({status:s,page:1,pageSize:1}))).then(results=>{if(seq!==statSeq.current)return;setStats({all:results[0].total,pending:results[1].total,assigned:results[2].total,delivered:results[3].total,at:new Date().toLocaleString('zh-CN',{hour12:false})});setStatsLoading(false)}).catch(e=>{if(seq===statSeq.current){setStatsError(errorText(e));setStatsLoading(false)}})
  return()=>{if(seq===statSeq.current)statSeq.current++}
 },[api,statsTick])
 useEffect(()=>{
  const seq=++detailSeq.current;if(!detailId||!api){setDetail(null);return}
  setDetailLoading(true);setDetailError('');setDetail(null)
  api.detail(detailId).then(d=>{if(seq===detailSeq.current){setDetail(d);setDetailLoading(false)}}).catch(e=>{if(seq===detailSeq.current){setDetailError(errorText(e));setDetailLoading(false)}})
  return()=>{if(seq===detailSeq.current)detailSeq.current++}
 },[detailId,api,detailTick])
 const navigate=(next:Page)=>{setPage(next);setMenu(false);setSelected([]);setDetailId(null);setConfirm(false);setAssignError('');setToast('');if(next==='settings')setDraftSize(pageSize)}
 const goDispatch=(preselect='')=>{navigate('orders');commitQuery({q:'',status:'pending',page:1});setCourier(preselect)}
 const changeQuery=(value:string)=>commitQuery({...queryRef.current,q:value,page:1})
 const changeStatus=(value:Status)=>commitQuery({...queryRef.current,status:value,page:1})
 const turnPage=(n:number)=>commitQuery({...queryRef.current,page:n})
 const toggle=(id:string)=>setSelected(ids=>ids.includes(id)?ids.filter(x=>x!==id):[...ids,id])
 const pending=rows.filter(r=>r.status==='pending'),allSelected=pending.length>0&&pending.every(r=>selected.includes(r.id))
 const saveSize=(n:number)=>{setPageSize(n);setDraftSize(n);commitQuery({...queryRef.current,page:1});setToast(n===20?'已恢复默认：每页 20 条，订单数据保留':'设置已保存：每页 '+n+' 条')}
 const assign=async()=>{
  if(!api||!courier||!selected.length||submitLock.current)return
  submitLock.current=true;setAssigning(true);setAssignError('')
  const count=selected.length
  try{await api.assign({ids:selected,courierId:courier});setConfirm(false);setSelected([]);setListTick(t=>t+1);if(detailId)setDetailTick(t=>t+1);setStats(null);refreshStats();setToast(`派单成功，${count} 笔订单已分配给${courierName(courier)}`)}catch(e){setAssignError(errorText(e))}finally{submitLock.current=false;setAssigning(false)}
 }
 const meta=navs.find(n=>n.id===page)!,pages=Math.max(1,Math.ceil(total/pageSize))
 const Cards=()=> <><div className="stats-grid" aria-busy={statsLoading}>{(['all','pending','assigned','delivered'] as Status[]).map((key,i)=><button className={'stat-card stat-'+key} key={key} onClick={key==='pending'?()=>goDispatch():undefined} disabled={key!=='pending'} aria-label={key==='pending'?'查看待派单订单':labels[key]}><div><span className="stat-label">{labels[key]}</span><strong data-stat={key}>{stats?fmt(stats[key]):'—'}</strong><small>{statsLoading?'正在读取统计…':statsError?'统计读取未完成':i===0?'本次会话全部订单':key==='pending'?'等待安排配送':key==='assigned'?'正在配送途中':'订单已完成'}</small></div><span className={'stat-icon tone-'+key}><Icon name={['orders','clock','arrow','check'][i]}/></span>{key==='pending'&&<span className="card-arrow">↗</span>}</button>)}</div>{statsError&&<ErrorBox message={'统计：'+statsError+(stats?'；下方保留上次成功快照。':'')} retry={refreshStats}/>}</>
 const Distribution=()=> <section className="panel distribution"><div className="section-title"><div><h2>订单状态分布</h2><p>本次页面会话的当前状态快照</p></div><span className="snapshot"><Icon name="clock" size={16}/>{statsLoading?'读取中…':stats?'最近读取 '+stats.at:'尚未读取成功'}</span></div>{stats?<div className="chart-layout"><div className="donut" role="img" aria-label={`待派单${stats.pending}，配送中${stats.assigned}，已送达${stats.delivered}`} style={{background:stats.all?`conic-gradient(#e5a23b 0 ${stats.pending/stats.all*100}%, #3679ed ${stats.pending/stats.all*100}% ${(stats.pending+stats.assigned)/stats.all*100}%, #3ba68a ${(stats.pending+stats.assigned)/stats.all*100}% 100%)`:'#e5eaf1'}}><div><span>全部订单</span><strong>{fmt(stats.all)}</strong><small>当前状态</small></div></div><div className="chart-legend"><div className="legend-head"><span>订单状态</span><span>数量 / 占比</span></div>{(['pending','assigned','delivered'] as const).map(s=><div className="legend-row" key={s}><div className="legend-label"><i className={'dot '+s}/><strong>{labels[s]}</strong></div><div className="legend-values"><strong>{fmt(stats[s])}</strong><span>{stats.all?(stats[s]/stats.all*100).toFixed(1):'0.0'}%</span></div><div className="bar-track"><i className={s} style={{width:(stats.all?stats[s]/stats.all*100:0)+'%'}}/></div></div>)}</div></div>:<div className="chart-empty">{statsLoading?<><Spinner/>正在读取订单状态…</>:'暂无成功读取的统计快照，请重试。'}</div>}</section>
 return <><div id="surface"><aside className={menu?'sidebar open':'sidebar'}><a className="brand" href="#" onClick={e=>{e.preventDefault();navigate('overview')}}><span className="brand-symbol"><Icon name="bird" size={28}/></span><span>鹈鹕配送<small>PELICAN DISPATCH</small></span></a><span className="nav-caption">工作空间</span><nav aria-label="主导航">{navs.map(n=><button key={n.id} className={page===n.id?'nav-item active':'nav-item'} aria-current={page===n.id?'page':undefined} onClick={()=>navigate(n.id)}><Icon name={n.icon}/><span>{n.label}</span>{page===n.id&&<span className="nav-dot"/>}</button>)}</nav><div className="sidebar-bottom"><span className="session-dot"/><div>本次页面会话<small>数据仅保存在当前内存</small></div></div></aside>{menu&&<div className="nav-backdrop" onClick={()=>setMenu(false)}/>}
 <div className="main-shell"><header className="topbar"><div className="breadcrumb"><button className="icon-button menu-toggle" aria-label={menu?'关闭导航菜单':'打开导航菜单'} aria-expanded={menu} onClick={()=>setMenu(m=>!m)}><Icon name="menu"/></button><span>工作台</span><b>/</b><strong>{meta.label}</strong></div><div className="top-user"><span className="workspace-tag">派送管理工作台</span><span className="avatar">管</span><span>评测管理员</span></div></header>
 <main><div className="page-heading"><div><span className="eyebrow">{page==='orders'?'ORDER DISPATCH':page==='overview'?'WORKSPACE OVERVIEW':page==='couriers'?'COURIER DIRECTORY':page==='reports'?'OPERATIONS REPORT':'WORKSPACE SETTINGS'}</span><h1>{meta.label}</h1><p>{meta.description}</p></div>{page==='reports'?<button className="secondary" disabled={statsLoading} onClick={refreshStats}><Icon name="refresh" size={17}/>{statsLoading?'读取中…':'刷新统计'}</button>:page==='overview'?<button className="primary" onClick={()=>goDispatch()}>去派单<Icon name="arrow" size={17}/></button>:page==='orders'?<span className="page-note"><span className="session-dot"/>浏览器内存会话</span>:null}</div>
 {initError?<ErrorBox message={initError} retry={()=>setInitTick(t=>t+1)}/>:<>
 {(page==='orders'||page==='overview'||page==='reports')&&<Cards/>}
 {page==='orders'&&<section className="panel orders-panel"><div className="toolbar"><div className="filters"><div className="search-field"><Icon name="search" size={18}/><input id="order-search" type="search" value={q} onChange={e=>changeQuery(e.target.value)} placeholder="搜索订单、客户或地址" aria-label="搜索订单、客户或地址"/>{q&&<button className="clear-search" aria-label="清空搜索" onClick={()=>changeQuery('')}>×</button>}</div><select value={status} aria-label="订单状态" onChange={e=>changeStatus(e.target.value as Status)}><option value="all">全部状态</option><option value="pending">待派单</option><option value="assigned">配送中</option><option value="delivered">已送达</option></select></div><button className="primary" disabled={!selected.length||listLoading||!!listError} onClick={()=>{setAssignError('');setConfirm(true)}}><Icon name="arrow" size={17}/>批量派单{selected.length>0&&<span className="button-count">{selected.length}</span>}</button></div>
 <div className="selection-strip"><span>订单列表 <b>{listLoading?'…':listError?'—':fmt(total)}</b></span><span>已选 <strong>{selected.length}</strong> 单 <span className="strip-divider">|</span> 仅待派单订单可选择</span>{selected.length>0&&<button className="text-button" onClick={()=>setSelected([])}>清空选择</button>}<span className="query-feedback" role="status" aria-live="polite">{listLoading?<><Spinner/>正在查询{q?`“${q}”`:''}…</>:listError?'查询未完成':'每页 '+pageSize+' 条'}</span></div>
 {listError?<div className="table-state"><ErrorBox message={listError} retry={()=>setListTick(t=>t+1)}/></div>:<div className="table-scroll"><table aria-label="订单列表" aria-busy={listLoading}><colgroup><col style={{width:48}}/><col style={{width:152}}/><col style={{width:130}}/><col/><col style={{width:124}}/><col style={{width:130}}/><col style={{width:80}}/></colgroup><thead><tr><th><label className="check-hit"><input type="checkbox" aria-label="选择本页全部待派单订单" checked={allSelected} ref={el=>{if(el)el.indeterminate=selected.length>0&&!allSelected}} disabled={listLoading||!pending.length} onChange={()=>setSelected(allSelected?[]:pending.map(r=>r.id))}/></label></th><th>订单编号</th><th>客户</th><th>配送地址</th><th>状态</th><th>配送员</th><th>操作</th></tr></thead><tbody>{listLoading?<tr><td colSpan={7}><div className="table-loading"><Spinner/><span>正在读取订单，请稍候</span></div></td></tr>:rows.length?rows.map(r=><tr key={r.id} className={selected.includes(r.id)?'selected':''}><td><label className="check-hit"><input type="checkbox" aria-label={'选择订单 '+r.id} checked={selected.includes(r.id)} disabled={r.status!=='pending'} onChange={()=>toggle(r.id)}/></label></td><td className="order-id">{r.id}</td><td>{r.customer}</td><td><span className="address" title={r.address}>{r.address}</span></td><td><Badge status={r.status}/></td><td className={r.courierId?'':'muted'}>{courierName(r.courierId)}</td><td><button className="text-button detail-button" aria-label={'查看详情 '+r.id} onClick={()=>setDetailId(r.id)}>详情</button></td></tr>):<tr><td colSpan={7}><div className="empty-state"><span className="empty-icon"><Icon name="search" size={30}/></span><h3>没有找到匹配的订单</h3><p>试试其他关键词，或调整订单状态。</p><button onClick={()=>{changeQuery('');changeStatus('all')}}>清空筛选</button></div></td></tr>}</tbody></table></div>}
 <footer className="pagination"><span>{listLoading?'正在查询订单…':listError?'请重试后查看分页':`共 ${fmt(total)} 条，${total?((pageNo-1)*pageSize+1):0}–${Math.min(pageNo*pageSize,total)} 条`}</span><div><button aria-label="首页" disabled={pageNo<=1||listLoading||!!listError} onClick={()=>turnPage(1)}>«</button><button aria-label="上一页" disabled={pageNo<=1||listLoading||!!listError} onClick={()=>turnPage(pageNo-1)}>‹</button><span className="page-position"><b>{pageNo}</b><span>/</span>{pages} 页</span><button aria-label="下一页" disabled={pageNo>=pages||listLoading||!!listError} onClick={()=>turnPage(pageNo+1)}>›</button><button aria-label="末页" disabled={pageNo>=pages||listLoading||!!listError} onClick={()=>turnPage(pages)}>»</button></div></footer></section>}
 {page==='overview'&&<><Distribution/><section className="panel next-step"><span className="large-icon"><Icon name="orders" size={26}/></span><div><h2>下一份快递，等你安排</h2><p>在待派单列表中选择订单，一次分配给同一位配送员。</p></div><button className="secondary" onClick={()=>goDispatch()}>查看待派单<Icon name="arrow" size={17}/></button></section></>}
 {page==='reports'&&<><Distribution/><div className="info-note"><Icon name="info" size={19}/><p>此报表反映本次页面会话的当前状态快照。派单成功后统计同步更新；整页刷新将恢复初始订单。统计不受订单搜索条件影响。</p></div></>}
 {page==='couriers'&&<><div className="section-title directory-title"><h2>配送员目录</h2><span className="subtle-label">3 位派单对象</span></div><div className="courier-grid">{couriers.map((c,i)=><section className="panel courier-card" key={c.id}><div className="courier-card-top"><span className="courier-avatar"><Icon name="bird" size={38}/></span><span className="courier-code">{c.id}</span></div><h2>{c.name}</h2><p>派单对象 · {String(i+1).padStart(2,'0')}</p><div className="courier-desc">为这位配送员选择待派单订单，确认后开始配送。</div><button className="primary" onClick={()=>goDispatch(c.id)}>为TA派单<Icon name="arrow" size={17}/></button></section>)}</div><div className="info-note"><Icon name="info" size={19}/><p>点击“为TA派单”会打开待派单列表并预选配送员。选择订单后仍需在派单窗口中确认。</p></div></>}
 {page==='settings'&&<div className="settings-layout"><section className="panel settings-card"><div className="section-title"><div><h2>订单显示设置</h2><p>选择适合你的列表密度</p></div><span className="setting-icon"><Icon name="settings" size={24}/></span></div><label htmlFor="page-size" className="field-label">订单每页条数</label><select id="page-size" value={draftSize} onChange={e=>setDraftSize(Number(e.target.value))}><option value={20}>20 条 / 页</option><option value={50}>50 条 / 页</option><option value={100}>100 条 / 页</option></select><p className="field-hint">保存后返回第一页，并清空已选订单。</p><div className="effective-setting"><span>当前生效</span><strong data-effective-size>{pageSize} 条 / 页</strong><span>{draftSize!==pageSize?'有未保存的更改':'设置已生效'}</span></div><div className="settings-actions"><button className="primary" onClick={()=>saveSize(draftSize)}>保存设置</button><button onClick={()=>saveSize(20)}>恢复默认</button></div></section><section className="panel guide-card"><span className="eyebrow">GOOD TO KNOW</span><h2>关于本次会话</h2><div className="guide-item"><Icon name="orders"/><div><h3>订单保存在内存中</h3><p>页面间切换会保留派单结果和已保存设置。</p></div></div><div className="guide-item"><Icon name="refresh"/><div><h3>刷新将重新开始</h3><p>刷新整个应用会恢复初始订单和默认的每页 20 条。</p></div></div><div className="guide-item"><Icon name="check"/><div><h3>恢复默认只调整页数</h3><p>已经成功派出的订单不会撤销。</p></div></div><button className="text-button" onClick={()=>navigate('orders')}>返回订单派送<Icon name="arrow" size={17}/></button></section></div>}
 </>}
 <div className="page-footer"><span>鹈鹕配送 · 把每一单安排妥当</span><span>本地会话 / MEMORY SESSION</span></div></main></div></div>
 {toast&&<div className="toast" role="status"><Icon name="check"/>{toast}<button aria-label="关闭提示" onClick={()=>setToast('')}>×</button></div>}
 {detailId&&<Layer title="订单详情" kind="drawer" onClose={()=>setDetailId(null)}><div className="drawer-body">{detailLoading?<div className="layer-loading"><Spinner/>正在读取订单详情…</div>:detailError?<ErrorBox message={detailError} retry={()=>setDetailTick(t=>t+1)}/>:detail&&<><div className="detail-hero"><span className="large-icon"><Icon name="orders" size={28}/></span><div><span className="subtle-label">订单编号</span><h3>{detail.id}</h3></div><Badge status={detail.status}/></div><h3 className="detail-section-title">配送信息</h3><dl><div><dt>客户</dt><dd>{detail.customer}</dd></div><div><dt>配送地址</dt><dd className="full-address">{detail.address}</dd></div><div><dt>配送员</dt><dd>{courierName(detail.courierId)}</dd></div><div><dt>优先级</dt><dd><span className={detail.priority==='urgent'?'priority urgent':'priority'}>{detail.priority==='urgent'?'优先配送':'普通'}</span></dd></div><div><dt>创建时间</dt><dd>{new Date(detail.createdAt).toLocaleString('zh-CN',{hour12:false})}</dd></div></dl><h3 className="detail-section-title">订单物品</h3><div className="detail-content">{detail.contents}</div><h3 className="detail-section-title">备注</h3><div className={'detail-content '+(!detail.note?'muted':'')}>{detail.note||'暂无备注'}</div></>}</div><footer className="layer-footer"><button onClick={()=>setDetailId(null)}>关闭详情</button></footer></Layer>}
 {confirm&&<Layer title="确认批量派单" busy={assigning} onClose={()=>setConfirm(false)}><div className="modal-body"><div className="dispatch-summary"><span className="large-icon"><Icon name="orders" size={28}/></span><div><strong>即将派送 <b>{selected.length}</b> 笔订单</strong><p>所选订单将统一分配给同一位配送员</p></div></div><label className="field-label" htmlFor="courier-select">选择配送员 <span className="required">*</span></label><select id="courier-select" value={courier} disabled={assigning} onChange={e=>setCourier(e.target.value)}><option value="">请选择配送员</option>{couriers.map(c=><option value={c.id} key={c.id}>{c.name} · {c.id}</option>)}</select><p className="field-hint">确认后，订单状态将由“待派单”更新为“配送中”。</p>{assignError&&<div className="assign-error" role="alert"><Icon name="info" size={18}/><span>{assignError}。本批次未修改，可再次确认重试。</span></div>}</div><footer className="layer-footer"><button disabled={assigning} onClick={()=>setConfirm(false)}>取消</button><button className="primary" disabled={!courier||!selected.length||assigning} onClick={assign}>{assigning?<><Spinner/>正在派单…</>:'确认派单'}</button></footer></Layer>}
 </>
}
createRoot(document.getElementById('app')!).render(<App/> )
