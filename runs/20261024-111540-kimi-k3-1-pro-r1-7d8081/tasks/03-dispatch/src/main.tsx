import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type Status = 'pending' | 'assigned' | 'delivered'
type FilterStatus = Status | 'all'
type Page = 'overview' | 'orders' | 'couriers' | 'reports' | 'settings'
type Order = { id: string; customer: string; address: string; status: Status; courierId: string | null; priority: string; createdAt: string; contents: string; note: string }
type Courier = { id: string; name: string }
type Stats = { all: number; pending: number; assigned: number; delivered: number; updatedAt: string }
type ListResult = { items: Order[]; total: number; page: number; pageSize: number }
type ApiErrorShape = { error?: { code?: string; message?: string } }

const STATUS: Record<Status, string> = { pending: '待派单', assigned: '配送中', delivered: '已送达' }
const PAGE_META: Record<Page, { title: string; eyebrow: string; description: string }> = {
  overview: { title: '运营总览', eyebrow: '工作台', description: '掌握今日履约动态，让每一份包裹准时抵达' },
  orders: { title: '订单派送', eyebrow: '订单管理', description: '安排每一份快递，查看实时派送状态' },
  couriers: { title: '配送团队', eyebrow: '运力管理', description: '选择配送伙伴，快速开始下一单派送' },
  reports: { title: '运行报表', eyebrow: '数据洞察', description: '基于同一状态快照，了解整体订单结构' },
  settings: { title: '偏好设置', eyebrow: '系统设置', description: '调整订单列表的浏览方式，设置仅在本次会话生效' },
}
const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'overview', label: '总览', icon: 'grid' },
  { id: 'orders', label: '订单派送', icon: 'package' },
  { id: 'couriers', label: '配送员', icon: 'users' },
  { id: 'reports', label: '运行报表', icon: 'chart' },
  { id: 'settings', label: '设置', icon: 'settings' },
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    package: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.38.25.61.63.69 1.04H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    arrow: <path d="m9 18 6-6-6-6"/>, down: <path d="m6 9 6 6 6-6"/>, left: <path d="m15 18-6-6 6-6"/>, right: <path d="m9 18 6-6-6-6"/>,
    close: <path d="M18 6 6 18M6 6l12 12"/>, check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    truck: <><path d="M10 17h4V5H2v12h3M14 9h4l4 4v4h-3M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    boxcheck: <><path d="M21 8v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8M1 3h22v5H1zM10 12h4"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
    refresh: <><path d="M20 11a8 8 0 1 0-2 5.5M20 4v7h-7"/></>,
    empty: <><path d="M4 7 12 3l8 4-8 4-8-4Z"/><path d="m4 7 8 4 8-4M4 7v10l8 4 8-4V7"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    note: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>,
    bird: <><path d="M4 15c5 1 10-1 12-6l4 2-3 2c0 5-4 8-9 6-3-1-4-2-4-4Z"/><path d="M10 12C8 7 10 4 14 4c3 0 4 2 3 5M8 19l-1 2M12 19l1 2"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.info}</svg>
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(new URL(path, document.baseURI), options)
  const data = await response.json().catch(() => ({})) as T & ApiErrorShape
  if (!response.ok) throw new Error(data.error?.message || `请求失败（${response.status}）`)
  return data
}
const number = (value: number) => value.toLocaleString('zh-CN')
const percent = (value: number, all: number) => all ? `${(value / all * 100).toFixed(1)}%` : '0.0%'
const timeText = (iso: string) => new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso))
const fullTime = (iso: string) => new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date(iso))

function StatusBadge({ status }: { status: Status }) {
  return <span className={`status-badge ${status}`}><i />{STATUS[status]}</span>
}
function Spinner() { return <span className="spinner" aria-hidden="true" /> }
function ErrorState({ message, retry, compact = false }: { message: string; retry: () => void; compact?: boolean }) {
  return <div className={`error-state ${compact ? 'compact' : ''}`} role="alert"><span className="error-icon"><Icon name="info" /></span><div><strong>数据加载失败</strong><p>{message}</p></div><button className="button secondary" onClick={retry}><Icon name="refresh" size={16} />重试</button></div>
}
function EmptyState({ clear }: { clear: () => void }) {
  return <div className="empty-state"><span><Icon name="empty" size={30} /></span><h3>没有找到匹配的订单</h3><p>试试其他关键词，或清除当前筛选条件。</p><button className="button secondary" onClick={clear}>清除筛选</button></div>
}
function SkeletonRows({ count = 7 }: { count?: number }) {
  return <div className="skeleton-list" aria-label="正在加载订单">{Array.from({ length: count }, (_, i) => <div className="skeleton-row" key={i}><i/><i/><i/><i/><i/></div>)}</div>
}
function StatCards({ stats, loading, error, onPending, onRefresh }: { stats: Stats | null; loading: boolean; error: string; onPending?: () => void; onRefresh?: () => void }) {
  const items = [
    { key: 'all', label: '全部订单', icon: 'package', className: 'blue' },
    { key: 'pending', label: '待派单', icon: 'clock', className: 'amber' },
    { key: 'assigned', label: '配送中', icon: 'truck', className: 'violet' },
    { key: 'delivered', label: '已送达', icon: 'boxcheck', className: 'green' },
  ] as const
  return <div className="stat-wrap"><div className="stat-grid">{items.map((item) => {
    const content = <><span className={`stat-icon ${item.className}`}><Icon name={item.icon} size={22}/></span><div className="stat-copy"><span>{item.label}</span><strong>{loading && !stats ? <i className="number-skeleton"/> : stats ? number(stats[item.key]) : '—'}</strong></div>{item.key === 'pending' && onPending && <span className="stat-link">去处理 <Icon name="arrow" size={14}/></span>}</>
    return item.key === 'pending' && onPending ? <button className="stat-card actionable" key={item.key} onClick={onPending}>{content}</button> : <div className="stat-card" key={item.key}>{content}</div>
  })}</div>{error && <div className="inline-error">统计暂不可用：{error}{onRefresh && <button onClick={onRefresh}>重新加载</button>}</div>}</div>
}

function useDialogFocus(onClose: () => void, canClose = true) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const node = ref.current
    const focusables = () => Array.from(node?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]') ?? [])
    focusables()[0]?.focus()
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && canClose) { event.preventDefault(); closeRef.current() }
      if (event.key === 'Tab') {
        const list = focusables()
        if (!list.length) return
        const first = list[0], last = list[list.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handler)
    return () => { document.removeEventListener('keydown', handler); previous?.focus() }
  }, [canClose])
  return ref
}

function AssignModal({ count, couriers, initialCourier, onCancel, onConfirm, submitting, error }: { count: number; couriers: Courier[]; initialCourier: string; onCancel: () => void; onConfirm: (id: string) => void; submitting: boolean; error: string }) {
  const [courier, setCourier] = useState(initialCourier)
  const ref = useDialogFocus(onCancel, !submitting)
  return <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget && !submitting) onCancel() }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="assign-title" ref={ref}>
    <div className="modal-head"><span className="modal-symbol"><Icon name="truck" size={25}/></span><button className="icon-button" onClick={onCancel} disabled={submitting} aria-label="关闭派单窗口"><Icon name="close"/></button></div>
    <h2 id="assign-title">确认批量派单</h2><p className="modal-intro">将已选的 <strong>{count}</strong> 笔待派订单交给配送员。提交后订单将进入配送中。</p>
    <label className="field-label" htmlFor="courier-select">选择配送员 <span>必选</span></label>
    <div className="select-wrap"><Icon name="users" size={18}/><select id="courier-select" value={courier} onChange={(e) => setCourier(e.target.value)} disabled={submitting}><option value="">请选择本次配送员</option>{couriers.map((c) => <option value={c.id} key={c.id}>{c.name} · {c.id}</option>)}</select><Icon name="down" size={16}/></div>
    <div className="assign-note"><Icon name="info" size={17}/><span>请确认订单与配送员，单次最多可派送 100 笔订单。</span></div>
    {error && <div className="form-error" role="alert"><Icon name="info" size={17}/>{error}</div>}
    <div className="modal-actions"><button className="button secondary" onClick={onCancel} disabled={submitting}>取消</button><button className="button primary" onClick={() => onConfirm(courier)} disabled={!courier || submitting}>{submitting ? <><Spinner/>正在提交…</> : <><Icon name="check" size={18}/>确认派单</>}</button></div>
  </div></div>
}

function DetailDrawer({ id, order, loading, error, onClose, onRetry, courierName }: { id: string; order: Order | null; loading: boolean; error: string; onClose: () => void; onRetry: () => void; courierName: (id: string | null) => string }) {
  const ref = useDialogFocus(onClose)
  return <div className="drawer-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}><aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="detail-title" ref={ref}>
    <div className="drawer-head"><div><span>订单详情</span><h2 id="detail-title">{id}</h2></div><button className="icon-button" aria-label="关闭订单详情" onClick={onClose}><Icon name="close"/></button></div>
    {loading ? <div className="detail-loading"><Spinner/><p>正在读取订单详情…</p></div> : error ? <ErrorState message={error} retry={onRetry}/> : order && <div className="drawer-body">
      <div className="detail-hero"><span className="package-art"><Icon name="package" size={30}/></span><div><StatusBadge status={order.status}/><p>{order.contents || '无物品信息'}</p></div></div>
      <section className="detail-section"><h3>收件信息</h3><dl><div><dt>客户姓名</dt><dd>{order.customer}</dd></div><div className="wide"><dt>配送地址</dt><dd>{order.address}</dd></div></dl></section>
      <section className="detail-section"><h3>配送信息</h3><dl><div><dt>配送员</dt><dd>{courierName(order.courierId)}</dd></div><div><dt>优先级</dt><dd><span className={`priority ${order.priority}`}>{order.priority === 'urgent' ? '紧急优先' : order.priority === 'high' ? '高优先级' : order.priority === 'low' ? '低优先级' : '普通'}</span></dd></div><div className="wide"><dt>创建时间</dt><dd>{fullTime(order.createdAt)}</dd></div></dl></section>
      <section className="detail-section"><h3>包裹与备注</h3><div className="detail-block"><span><Icon name="package" size={17}/>物品内容</span><p>{order.contents || '暂无物品信息'}</p></div><div className="detail-block"><span><Icon name="note" size={17}/>订单备注</span><p>{order.note || '暂无备注'}</p></div></section>
    </div>}
    <div className="drawer-foot"><button className="button secondary full" onClick={onClose}>关闭详情</button></div>
  </aside></div>
}

function Distribution({ stats }: { stats: Stats }) {
  const p = stats.pending / stats.all * 100, a = stats.assigned / stats.all * 100
  const style = { background: `conic-gradient(#f5a524 0 ${p}%, #7467f0 ${p}% ${p + a}%, #25b888 ${p + a}% 100%)` }
  return <div className="distribution"><div className="donut" style={style}><div><strong>{number(stats.all)}</strong><span>订单总量</span></div></div><div className="legend">{([['pending', '待派单', stats.pending], ['assigned', '配送中', stats.assigned], ['delivered', '已送达', stats.delivered]] as const).map(([key, label, value]) => <div key={key}><i className={key}/><span>{label}</span><strong>{number(value)}</strong><small>{percent(value, stats.all)}</small></div>)}</div></div>
}

function App() {
  const [page, setPage] = useState<Page>('orders')
  const [orders, setOrders] = useState<ListResult | null>(null)
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [listVersion, setListVersion] = useState(0)
  const [queryDraft, setQueryDraft] = useState('')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<FilterStatus>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [stats, setStats] = useState<Stats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState('')
  const [statsVersion, setStatsVersion] = useState(0)
  const [couriers, setCouriers] = useState<Courier[]>([])
  const [courierError, setCourierError] = useState('')
  const [courierVersion, setCourierVersion] = useState(0)
  const [assignOpen, setAssignOpen] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const [assignError, setAssignError] = useState('')
  const [preferredCourier, setPreferredCourier] = useState('')
  const [detailId, setDetailId] = useState('')
  const [detail, setDetail] = useState<Order | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [detailVersion, setDetailVersion] = useState(0)
  const [toast, setToast] = useState('')
  const [draftSize, setDraftSize] = useState(20)
  const listRequest = useRef(0), statsRequest = useRef(0), detailRequest = useRef(0)

  useEffect(() => {
    const id = ++listRequest.current
    const controller = new AbortController()
    setListLoading(true); setListError('')
    const params = new URLSearchParams({ q: query, status, page: String(currentPage), pageSize: String(pageSize) })
    api<ListResult>(`api/orders?${params}`, { signal: controller.signal }).then((data) => {
      if (id === listRequest.current) setOrders(data)
    }).catch((error) => {
      if (id === listRequest.current && error.name !== 'AbortError') setListError(error.message || '订单列表加载失败')
    }).finally(() => {
      if (id === listRequest.current) setListLoading(false)
    })
    return () => controller.abort()
  }, [query, status, currentPage, pageSize, listVersion])

  useEffect(() => {
    const id = ++statsRequest.current
    const controller = new AbortController()
    setStatsLoading(true); setStatsError('')
    api<Stats>('api/stats', { signal: controller.signal }).then((data) => { if (id === statsRequest.current) setStats(data) }).catch((error) => {
      if (id === statsRequest.current && error.name !== 'AbortError') setStatsError(error.message || '统计加载失败')
    }).finally(() => { if (id === statsRequest.current) setStatsLoading(false) })
    return () => controller.abort()
  }, [statsVersion])

  useEffect(() => {
    let active = true
    setCourierError('')
    api<{ items: Courier[] }>('api/couriers').then((data) => { if (active) setCouriers(data.items) }).catch((error) => { if (active) setCourierError(error.message || '配送员加载失败') })
    return () => { active = false }
  }, [courierVersion])

  useEffect(() => {
    if (!detailId) return
    const id = ++detailRequest.current
    const controller = new AbortController()
    setDetailLoading(true); setDetailError(''); setDetail(null)
    api<Order>(`api/orders/${encodeURIComponent(detailId)}`, { signal: controller.signal }).then((data) => { if (id === detailRequest.current) setDetail(data) }).catch((error) => {
      if (id === detailRequest.current && error.name !== 'AbortError') setDetailError(error.message || '详情加载失败')
    }).finally(() => { if (id === detailRequest.current) setDetailLoading(false) })
    return () => controller.abort()
  }, [detailId, detailVersion])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const navigate = (next: Page) => { setPage(next); setSelected(new Set()); setAssignOpen(false); setAssignError(''); setDetailId(''); if (next === 'settings') setDraftSize(pageSize) }
  const goPending = (courier = '') => { setPage('orders'); setQuery(''); setQueryDraft(''); setStatus('pending'); setCurrentPage(1); setSelected(new Set()); setPreferredCourier(courier); setAssignOpen(false); setDetailId('') }
  const submitSearch = (event: React.FormEvent) => { event.preventDefault(); setQuery(queryDraft.trim()); setCurrentPage(1); setSelected(new Set()) }
  const changeStatus = (next: FilterStatus) => { setStatus(next); setCurrentPage(1); setSelected(new Set()) }
  const changePage = (next: number) => { setCurrentPage(next); setSelected(new Set()) }
  const clearFilters = () => { setQuery(''); setQueryDraft(''); setStatus('all'); setCurrentPage(1); setSelected(new Set()) }
  const courierName = useCallback((id: string | null) => id ? couriers.find((c) => c.id === id)?.name ?? id : '待分配', [couriers])
  const openDetail = (id: string) => { setDetailId(id); setDetailVersion((v) => v + 1) }
  const closeDetail = () => { setDetailId(''); setDetail(null); setDetailError('') }
  const currentItems = orders?.items ?? []
  const pendingItems = currentItems.filter((item) => item.status === 'pending')
  const allPendingSelected = pendingItems.length > 0 && pendingItems.every((item) => selected.has(item.id))
  const toggleAll = () => setSelected(allPendingSelected ? new Set() : new Set(pendingItems.map((item) => item.id)))
  const toggleOne = (id: string) => setSelected((old) => { const next = new Set(old); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const openAssign = () => { if (!selected.size) return; setAssignError(''); setAssignOpen(true) }
  const confirmAssign = async (courierId: string) => {
    if (!courierId || assigning || !selected.size) return
    const ids = [...selected]
    setAssigning(true); setAssignError('')
    try {
      await api('api/assign', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids, courierId }) })
      setAssignOpen(false); setSelected(new Set()); setToast(`已将 ${ids.length} 笔订单派给${courierName(courierId)}`)
      setListVersion((v) => v + 1); setStatsVersion((v) => v + 1)
      if (detailId && ids.includes(detailId)) setDetailVersion((v) => v + 1)
    } catch (error) {
      setAssignError(error instanceof Error ? error.message : '派单失败，请重试')
    } finally { setAssigning(false) }
  }
  const refreshAll = () => { setListVersion((v) => v + 1); setStatsVersion((v) => v + 1) }

  const totalPages = orders ? Math.max(1, Math.ceil(orders.total / pageSize)) : 1
  const pageButtons = () => {
    const candidates = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])
    const values = [...candidates].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b)
    const result: (number | string)[] = []
    values.forEach((value, index) => { if (index && value - values[index - 1] > 1) result.push(`gap-${value}`); result.push(value) })
    return result
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Icon name="bird" size={29}/></span><div><strong>一万只鹈鹕</strong><small>PELICAN DISPATCH</small></div></div>
      <nav aria-label="主导航">{navItems.map((item) => <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)} aria-current={page === item.id ? 'page' : undefined}><Icon name={item.icon}/><span>{item.label}</span>{page === item.id && <i/>}</button>)}</nav>
      <div className="sidebar-foot"><div className="service-dot"><i/><span>调度服务运行中</span></div><p>让每一单，都有着落。</p></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="breadcrumb"><span>工作台</span><Icon name="arrow" size={13}/><strong>{PAGE_META[page].title}</strong></div><div className="topbar-right"><span className="live-pill"><i/>实时数据</span><span className="divider"/><div className="avatar">运</div><span className="admin-name">运营管理员</span></div></header>
      <main className="content">
        <div className="page-heading"><div><span className="eyebrow">{PAGE_META[page].eyebrow}</span><h1>{PAGE_META[page].title}</h1><p>{PAGE_META[page].description}</p></div>{page === 'reports' && <button className="button secondary" onClick={() => setStatsVersion((v) => v + 1)} disabled={statsLoading}><Icon name="refresh" size={17}/>{statsLoading ? '刷新中…' : '刷新数据'}</button>}</div>

        {(page === 'orders' || page === 'overview') && <StatCards stats={stats} loading={statsLoading} error={statsError} onPending={() => goPending()} onRefresh={() => setStatsVersion((v) => v + 1)}/>}

        {page === 'overview' && <div className="overview-grid">
          <section className="card distribution-card"><div className="card-title"><div><h2>订单状态分布</h2><p>所有订单的实时履约构成</p></div><button className="text-button" onClick={() => navigate('reports')}>查看报表 <Icon name="arrow" size={15}/></button></div>{stats ? <Distribution stats={stats}/> : <div className="panel-placeholder">{statsLoading ? <><Spinner/>正在汇总订单数据…</> : '暂无统计数据'}</div>}</section>
          <section className="card action-card"><span className="action-art"><Icon name="bird" size={38}/></span><span className="eyebrow">快速开始</span><h2>下一批订单，准备出发</h2><p>从待派订单中选择需要配送的包裹，交给合适的配送伙伴。</p><button className="button primary" onClick={() => goPending()}>处理待派订单 <Icon name="arrow" size={17}/></button><div className="action-meta"><Icon name="info" size={16}/>单次最多可批量派送 100 笔</div></section>
          <section className="card workflow-card"><div className="card-title"><div><h2>标准派送流程</h2><p>三步完成订单交接</p></div></div><div className="workflow">{[{ n: '01', t: '筛选订单', d: '搜索或切换至待派单' }, { n: '02', t: '选择包裹', d: '勾选当前页待派订单' }, { n: '03', t: '确认派送', d: '指定配送员并提交' }].map((step) => <div key={step.n}><span>{step.n}</span><div><strong>{step.t}</strong><p>{step.d}</p></div><Icon name="check" size={17}/></div>)}</div></section>
        </div>}

        {page === 'orders' && <section className="card orders-card">
          <div className="order-toolbar"><form className="search-box" onSubmit={submitSearch}><Icon name="search" size={19}/><input aria-label="搜索订单" placeholder="搜索订单编号、客户或地址" value={queryDraft} onChange={(e) => setQueryDraft(e.target.value)}/>{queryDraft && <button type="button" className="clear-input" aria-label="清空搜索" onClick={() => setQueryDraft('')}><Icon name="close" size={15}/></button>}<button className="search-submit" type="submit">搜索</button></form><button className="button primary assign-button" disabled={!selected.size || selected.size > 100} onClick={openAssign} title={selected.size > 100 ? '单次最多派 100 笔，请减少选择' : !selected.size ? '请先选择待派订单' : ''}><Icon name="truck" size={18}/>批量派单{selected.size > 0 && <span>{selected.size}</span>}</button></div>
          <div className="filter-row"><div className="status-tabs" aria-label="订单状态筛选">{(['all', 'pending', 'assigned', 'delivered'] as FilterStatus[]).map((key) => <button key={key} className={status === key ? 'active' : ''} onClick={() => changeStatus(key)}>{key === 'all' ? '全部订单' : STATUS[key]}</button>)}</div><div className="result-meta">{query && <span className="query-chip">“{query}”<button onClick={() => { setQuery(''); setQueryDraft(''); setCurrentPage(1); setSelected(new Set()) }} aria-label="移除搜索条件"><Icon name="close" size={12}/></button></span>}<span>共 <strong>{orders ? number(orders.total) : '—'}</strong> 笔</span><button className="icon-button refresh-list" onClick={refreshAll} aria-label="刷新订单列表" title="刷新列表"><Icon name="refresh" size={17}/></button></div></div>
          {selected.size > 0 && <div className="selection-bar"><span><Icon name="check" size={16}/>已选择 <strong>{selected.size}</strong> 笔待派订单</span><button onClick={() => setSelected(new Set())}>取消选择</button></div>}
          <div className="table-area">
            {listError ? <ErrorState message={listError} retry={() => setListVersion((v) => v + 1)}/> : listLoading && !orders ? <SkeletonRows/> : !listLoading && currentItems.length === 0 ? <EmptyState clear={clearFilters}/> : <>
              {listLoading && <div className="loading-cover"><Spinner/>正在更新列表…</div>}
              <div className="table-scroll"><table><thead><tr><th className="check-cell"><input type="checkbox" aria-label="选择当前页全部待派订单" checked={allPendingSelected} disabled={!pendingItems.length} onChange={toggleAll}/></th><th>订单编号</th><th>客户</th><th>配送地址</th><th>状态</th><th>配送员</th><th className="action-cell">操作</th></tr></thead><tbody>{currentItems.map((order) => <tr key={order.id} className={selected.has(order.id) ? 'selected-row' : ''}><td className="check-cell"><input type="checkbox" aria-label={`选择订单 ${order.id}`} disabled={order.status !== 'pending'} checked={selected.has(order.id)} onChange={() => toggleOne(order.id)}/></td><td><button className="order-id" onClick={() => openDetail(order.id)}>{order.id}</button></td><td><span className="customer"><i>{order.customer.slice(-2, -1) || '客'}</i>{order.customer}</span></td><td><span className="address" title={order.address}>{order.address}</span></td><td><StatusBadge status={order.status}/></td><td><span className={order.courierId ? 'courier-name' : 'unassigned'}>{courierName(order.courierId)}</span></td><td className="action-cell"><button className="detail-button" onClick={() => openDetail(order.id)}>详情 <Icon name="arrow" size={14}/></button></td></tr>)}</tbody></table></div>
            </>}
          </div>
          <div className="pagination"><span>第 {currentPage} / {number(totalPages)} 页 · 每页 {pageSize} 条</span><div><button className="page-arrow" disabled={currentPage <= 1 || listLoading} onClick={() => changePage(currentPage - 1)} aria-label="上一页"><Icon name="left" size={17}/></button>{pageButtons().map((item) => typeof item === 'number' ? <button key={item} className={item === currentPage ? 'current' : ''} disabled={listLoading} onClick={() => changePage(item)} aria-label={`第 ${item} 页`} aria-current={item === currentPage ? 'page' : undefined}>{item}</button> : <span className="page-gap" key={item}>…</span>)}<button className="page-arrow" disabled={currentPage >= totalPages || listLoading} onClick={() => changePage(currentPage + 1)} aria-label="下一页"><Icon name="right" size={17}/></button></div></div>
        </section>}

        {page === 'couriers' && <>{courierError ? <ErrorState message={courierError} retry={() => setCourierVersion((v) => v + 1)}/> : couriers.length === 0 ? <div className="courier-grid">{[1,2,3].map((n) => <div className="card courier-card loading-card" key={n}><SkeletonRows count={2}/></div>)}</div> : <div className="courier-grid">{couriers.map((courier, index) => <article className={`card courier-card courier-${index + 1}`} key={courier.id}><div className="courier-cover"><span className="courier-pattern">PELICAN · EXPRESS</span><div className="courier-avatar"><Icon name="bird" size={49}/></div><span className="online-badge"><i/>可接单</span></div><div className="courier-info"><span className="courier-number">{courier.id}</span><h2>{courier.name}</h2><p>城市即时配送伙伴</p><div className="courier-tags"><span>订单配送</span><span>即时响应</span></div><button className="button primary full" onClick={() => goPending(courier.id)}>为 TA 派单 <Icon name="arrow" size={17}/></button></div></article>)}</div>}<div className="courier-tip"><Icon name="info" size={18}/><span>选择“为 TA 派单”后，系统会为你预选配送员；仍需勾选订单并确认，订单才会正式提交。</span></div></>}

        {page === 'reports' && statsError && stats && <div className="inline-error">刷新失败，当前仍展示上次成功快照：{statsError}<button onClick={() => setStatsVersion((v) => v + 1)}>重新加载</button></div>}
        {page === 'reports' && <>{statsError && !stats ? <ErrorState message={statsError} retry={() => setStatsVersion((v) => v + 1)}/> : !stats ? <div className="card report-loading"><Spinner/>{statsLoading ? '正在生成统计快照…' : '暂无统计数据'}</div> : <div className="reports-layout"><section className="card report-main"><div className="card-title"><div><h2>订单状态构成</h2><p>统计分母为全部 {number(stats.all)} 笔订单，不受订单搜索影响</p></div><span className={`snapshot ${statsLoading ? 'loading' : ''}`}><i/>{statsLoading ? '正在刷新' : '快照已更新'}</span></div><Distribution stats={stats}/><div className="report-bars">{([['pending', '待派单', stats.pending, '等待分配配送员'], ['assigned', '配送中', stats.assigned, '配送员正在履约'], ['delivered', '已送达', stats.delivered, '订单已完成配送']] as const).map(([key, label, value, desc]) => <div className="report-row" key={key}><div><strong>{label}</strong><span>{desc}</span></div><div className="bar-track"><i className={key} style={{ width: percent(value, stats.all) }}/></div><strong>{number(value)}</strong><span>{percent(value, stats.all)}</span></div>)}</div></section><aside className="card snapshot-card"><span className="snapshot-icon"><Icon name="calendar" size={24}/></span><h2>统计快照</h2><p>此页面展示同一时刻读取的订单状态总量。</p><dl><div><dt>全部订单</dt><dd>{number(stats.all)}</dd></div><div><dt>状态合计</dt><dd>{number(stats.pending + stats.assigned + stats.delivered)}</dd></div><div><dt>快照时间</dt><dd>{fullTime(stats.updatedAt)}</dd></div></dl><div className="snapshot-note"><Icon name="check" size={16}/>状态数量已核对一致</div></aside></div>}</>}

        {page === 'settings' && <div className="settings-layout"><section className="card settings-card"><div className="settings-section"><span className="settings-icon"><Icon name="package" size={22}/></span><div><h2>订单列表</h2><p>设置每一页显示的订单数量。保存后将返回订单第一页，并清空当前选择。</p></div></div><div className="setting-control"><div><label htmlFor="page-size">每页显示条数</label><p>较大的页容量适合宽屏浏览，移动端建议选择 20 条。</p></div><div className="select-wrap small"><select id="page-size" value={draftSize} onChange={(e) => setDraftSize(Number(e.target.value))}><option value={20}>20 条 / 页</option><option value={50}>50 条 / 页</option><option value={100}>100 条 / 页</option></select><Icon name="down" size={16}/></div></div><div className="settings-actions"><button className="button secondary" onClick={() => setDraftSize(20)} disabled={draftSize === 20}>恢复默认</button><button className="button primary" onClick={() => { setPageSize(draftSize); setCurrentPage(1); setSelected(new Set()); setPage('orders'); setToast(`已保存：每页显示 ${draftSize} 条订单`) }}><Icon name="check" size={17}/>保存并查看订单</button></div></section><aside className="card settings-note"><Icon name="info" size={22}/><h3>关于这些设置</h3><p>显示偏好仅保存在当前页面会话中，刷新浏览器后会恢复为每页 20 条。</p><p>恢复默认只会调整每页条数，不会撤销已经提交的派单。</p></aside></div>}
      </main>
    </div>
    {assignOpen && <AssignModal count={selected.size} couriers={couriers} initialCourier={preferredCourier} submitting={assigning} error={assignError} onCancel={() => { if (!assigning) { setAssignOpen(false); setAssignError('') } }} onConfirm={confirmAssign}/>}
    {detailId && <DetailDrawer id={detailId} order={detail} loading={detailLoading} error={detailError} onClose={closeDetail} onRetry={() => setDetailVersion((v) => v + 1)} courierName={courierName}/>}
    {toast && <div className="toast" role="status"><span><Icon name="check" size={17}/></span>{toast}<button onClick={() => setToast('')} aria-label="关闭提示"><Icon name="close" size={15}/></button></div>}
  </div>
}

createRoot(document.getElementById('app')!).render(<App/>)
