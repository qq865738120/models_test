import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError, assignOrders } from './api'
import { useCouriersData, useOrdersData, useStatsData } from './hooks'
import { AssignModal, MobileNav, OrderDrawer, type NavItem } from './overlays'
import { CouriersPage } from './pages/CouriersPage'
import { OrdersPage } from './pages/OrdersPage'
import { OverviewPage } from './pages/OverviewPage'
import { ReportsPage } from './pages/ReportsPage'
import { SettingsPage } from './pages/SettingsPage'
import type { ApiFailure, Courier, OrdersQuery, PageKey, StatusFilter, ToastMessage } from './types'
import { Icon, Logo, Toast } from './ui'

const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: '总览', icon: 'grid' },
  { key: 'orders', label: '订单派送', icon: 'package' },
  { key: 'couriers', label: '配送员', icon: 'users' },
  { key: 'reports', label: '运行报表', icon: 'chart' },
  { key: 'settings', label: '设置', icon: 'settings' },
]

const PAGE_LABELS: Record<PageKey, string> = {
  overview: '总览',
  orders: '订单派送',
  couriers: '配送员',
  reports: '运行报表',
  settings: '设置',
}

export function App() {
  const [page, setPage] = useState<PageKey>('orders')
  const [query, setQuery] = useState<OrdersQuery>({ q: '', status: 'all', page: 1, pageSize: 20 })
  const [searchDraft, setSearchDraft] = useState('')
  const [selection, setSelection] = useState<string[]>([])
  const [detailId, setDetailId] = useState<string | null>(null)
  const [detailRefresh, setDetailRefresh] = useState(0)
  const [assignOpen, setAssignOpen] = useState(false)
  const [assignCourier, setAssignCourier] = useState<string | null>(null)
  const [assignSubmitting, setAssignSubmitting] = useState(false)
  const [assignError, setAssignError] = useState<ApiFailure | null>(null)
  const [presetCourierId, setPresetCourierId] = useState<string | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const orders = useOrdersData(query)
  const stats = useStatsData()
  const couriers = useCouriersData()

  const toastSequence = useRef(0)
  const showToast = useCallback((kind: ToastMessage['kind'], message: string) => {
    toastSequence.current += 1
    setToast({ id: toastSequence.current, kind, message })
  }, [])
  const dismissToast = useCallback((id: number) => {
    setToast((current) => (current?.id === id ? null : current))
  }, [])

  const overlayOpen = Boolean(detailId) || assignOpen || mobileNavOpen
  useEffect(() => {
    if (!overlayOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [overlayOpen])

  useEffect(() => {
    document.title = `${PAGE_LABELS[page]} · 一万只鹈鹕的派单后台`
  }, [page])

  const statsReloadRef = useRef(stats.reload)
  statsReloadRef.current = stats.reload
  useEffect(() => {
    if (page === 'reports') statsReloadRef.current()
  }, [page])

  const presetCourier = presetCourierId
    ? couriers.items.find((courier) => courier.id === presetCourierId) ?? null
    : null

  const navigate = useCallback(
    (next: PageKey) => {
      setPage(next)
      setSelection([])
      setDetailId(null)
      setMobileNavOpen(false)
      if (!assignSubmitting) {
        setAssignOpen(false)
        setAssignError(null)
      }
    },
    [assignSubmitting],
  )

  const closeAssign = useCallback(() => {
    if (assignSubmitting) return
    setAssignOpen(false)
    setAssignError(null)
  }, [assignSubmitting])

  const clearSelection = useCallback(() => setSelection([]), [])

  const toggleOrder = useCallback(
    (id: string) => {
      const order = orders.items.find((item) => item.id === id)
      if (!order || order.status !== 'pending') return
      setSelection((current) =>
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
      )
    },
    [orders.items],
  )

  const selectAll = useCallback(() => {
    const pendingIds = orders.items.filter((item) => item.status === 'pending').map((item) => item.id)
    setSelection((current) => {
      const allSelected = pendingIds.length > 0 && pendingIds.every((id) => current.includes(id))
      if (allSelected) return current.filter((id) => !pendingIds.includes(id))
      return [...new Set([...current, ...pendingIds])]
    })
  }, [orders.items])

  const submitSearch = useCallback(() => {
    const q = searchDraft.trim()
    setSearchDraft(q)
    setSelection([])
    setAssignOpen(false)
    setAssignError(null)
    if (q === query.q && query.page === 1) {
      orders.reload()
      return
    }
    setQuery((current) => ({ ...current, q, page: 1 }))
  }, [searchDraft, query.q, query.page, orders.reload])

  const clearSearch = useCallback(() => {
    setSearchDraft('')
    setSelection([])
    setAssignOpen(false)
    setAssignError(null)
    if (query.q === '' && query.page === 1) return
    setQuery((current) => ({ ...current, q: '', page: 1 }))
  }, [query.q, query.page])

  const changeStatus = useCallback(
    (status: StatusFilter) => {
      setSelection([])
      setAssignOpen(false)
      setAssignError(null)
      if (status === query.status && query.page === 1) {
        orders.reload()
        return
      }
      setQuery((current) => ({ ...current, status, page: 1 }))
    },
    [query.status, query.page, orders.reload],
  )

  const clearFilters = useCallback(() => {
    setSearchDraft('')
    setSelection([])
    setAssignOpen(false)
    setAssignError(null)
    if (query.q === '' && query.status === 'all' && query.page === 1) {
      orders.reload()
      return
    }
    setQuery((current) => ({ ...current, q: '', status: 'all', page: 1 }))
  }, [query.q, query.status, query.page, orders.reload])

  const changePage = useCallback(
    (nextPage: number) => {
      const totalPages = Math.max(1, Math.ceil(orders.total / orders.pageSize))
      if (nextPage < 1 || nextPage > totalPages || nextPage === query.page) return
      setSelection([])
      setAssignOpen(false)
      setAssignError(null)
      setQuery((current) => ({ ...current, page: nextPage }))
    },
    [orders.total, orders.pageSize, query.page],
  )

  const refreshStats = useCallback(() => {
    stats.reload()
  }, [stats.reload])

  const refreshAll = useCallback(() => {
    orders.reload()
    stats.reload()
  }, [orders.reload, stats.reload])

  const goToPending = useCallback(() => {
    const already = query.q === '' && query.status === 'pending' && query.page === 1
    setPage('orders')
    setSelection([])
    setDetailId(null)
    setMobileNavOpen(false)
    setAssignOpen(false)
    setAssignError(null)
    setSearchDraft('')
    setPresetCourierId(null)
    setQuery((current) => ({ ...current, q: '', status: 'pending', page: 1 }))
    if (already) orders.reload()
    stats.reload()
  }, [query.q, query.status, query.page, orders.reload, stats.reload])

  const dispatchForCourier = useCallback(
    (courier: Courier) => {
      const already = query.q === '' && query.status === 'pending' && query.page === 1
      setPage('orders')
      setSelection([])
      setDetailId(null)
      setMobileNavOpen(false)
      setAssignOpen(false)
      setAssignError(null)
      setPresetCourierId(courier.id)
      setAssignCourier(courier.id)
      setSearchDraft('')
      setQuery((current) => ({ ...current, q: '', status: 'pending', page: 1 }))
      if (already) orders.reload()
      showToast('info', `已进入待派单，配送员预选为 ${courier.name}。`)
    },
    [query.q, query.status, query.page, orders.reload, showToast],
  )

  const openAssign = useCallback(() => {
    if (selection.length === 0) return
    if (!assignCourier) {
      const preferred = presetCourierId ?? null
      if (preferred) setAssignCourier(preferred)
    }
    setAssignError(null)
    setAssignOpen(true)
  }, [selection.length, assignCourier, presetCourierId])

  const syncLatest = useCallback(() => {
    orders.reload()
    stats.reload()
    if (detailId) setDetailRefresh((value) => value + 1)
  }, [orders.reload, stats.reload, detailId])

  const confirmAssign = useCallback(async () => {
    if (!assignCourier || selection.length === 0 || assignSubmitting) return
    const ids = [...selection]
    const courier = couriers.items.find((item) => item.id === assignCourier)
    setAssignSubmitting(true)
    setAssignError(null)
    try {
      await assignOrders(ids, assignCourier)
      setAssignSubmitting(false)
      setAssignOpen(false)
      setSelection([])
      setPresetCourierId(null)
      setDetailRefresh((value) => value + 1)
      orders.reload()
      stats.reload()
      showToast(
        'success',
        `已将 ${ids.length} 个订单派给 ${courier?.name ?? assignCourier}，列表与统计已刷新。`,
      )
    } catch (error) {
      setAssignSubmitting(false)
      const failure: ApiFailure =
        error instanceof ApiError
          ? { message: error.message, code: error.code, status: error.status }
          : { message: error instanceof Error ? error.message : '派单失败，请重试。' }
      setAssignError(failure)
      if (failure.status === 409 || failure.status === 404) {
        orders.reload()
        stats.reload()
        if (detailId) setDetailRefresh((value) => value + 1)
      }
    }
  }, [
    assignCourier,
    selection,
    assignSubmitting,
    couriers.items,
    orders.reload,
    stats.reload,
    detailId,
    showToast,
  ])

  const savePageSize = useCallback(
    (pageSize: number) => {
      setQuery((current) => ({ ...current, pageSize, page: 1 }))
      setSelection([])
      setAssignOpen(false)
      setAssignError(null)
      setDetailId(null)
      setPage('orders')
      showToast('success', `设置已保存：每页 ${pageSize} 条。`)
    },
    [showToast],
  )

  const restoreDefault = useCallback(() => {
    setQuery((current) => ({ ...current, pageSize: 20, page: 1 }))
    setSelection([])
    showToast('info', '已恢复默认：每页 20 条。派单数据保持不变。')
  }, [showToast])

  return (
    <>
      <div className="app-shell" inert={overlayOpen || undefined}>
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        <aside className="sidebar">
          <div className="brand">
            <Logo />
            <div className="brand-text">
              <strong>鹈鹕配送</strong>
              <span>派单后台</span>
            </div>
          </div>
          <nav className="sidebar-nav" aria-label="主导航">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.key}
                className={`nav-item${page === item.key ? ' is-active' : ''}`}
                onClick={() => navigate(item.key)}
                aria-current={page === item.key ? 'page' : undefined}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="sidebar-status">
              <span className="pulse-dot" aria-hidden="true" />
              服务端内存数据
            </div>
            <p>派单状态由 Node 进程保存，刷新页面不会重置。</p>
          </div>
        </aside>

        <div className="workspace">
          <header className="topbar">
            <button
              type="button"
              className="icon-button menu-button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="打开导航"
              aria-expanded={mobileNavOpen}
            >
              <Icon name="menu" size={20} />
            </button>
            <div className="breadcrumb">
              <span>工作台</span>
              <Icon name="chevron-right" size={13} />
              <strong>{PAGE_LABELS[page]}</strong>
            </div>
            <div className="topbar-right">
              <span className="topbar-service">
                <span className="pulse-dot" aria-hidden="true" />
                Node 内存数据
              </span>
              <span className="topbar-divider" aria-hidden="true" />
              <div className="user-chip">
                <span className="avatar" aria-hidden="true">
                  管
                </span>
                <span className="user-name">评测管理员</span>
              </div>
            </div>
          </header>

          <main className="content" id="main-content" tabIndex={-1}>
            {page === 'orders' ? (
              <OrdersPage
                orders={orders}
                stats={stats}
                query={query}
                searchDraft={searchDraft}
                couriers={couriers.items}
                selection={selection}
                presetCourier={presetCourier}
                onSearchDraftChange={setSearchDraft}
                onSearch={submitSearch}
                onClearSearch={clearSearch}
                onStatusChange={changeStatus}
                onClearFilters={clearFilters}
                onPageChange={changePage}
                onOpenSettings={() => navigate('settings')}
                onToggleOrder={toggleOrder}
                onSelectAll={selectAll}
                onClearSelection={clearSelection}
                onOpenAssign={openAssign}
                onOpenDetail={setDetailId}
                onRetryOrders={orders.reload}
                onRetryStats={stats.reload}
                onRefreshAll={refreshAll}
                onClearPreset={() => setPresetCourierId(null)}
              />
            ) : null}

            {page === 'overview' ? (
              <OverviewPage
                stats={stats}
                onRefresh={refreshStats}
                onGoPending={goToPending}
                onGoReports={() => navigate('reports')}
              />
            ) : null}

            {page === 'couriers' ? (
              <CouriersPage
                couriers={couriers}
                onRetry={couriers.reload}
                onDispatch={dispatchForCourier}
              />
            ) : null}

            {page === 'reports' ? <ReportsPage stats={stats} onRefresh={refreshStats} /> : null}

            {page === 'settings' ? (
              <SettingsPage
                pageSize={query.pageSize}
                onSave={savePageSize}
                onRestoreDefault={restoreDefault}
              />
            ) : null}
          </main>
        </div>
      </div>

      {mobileNavOpen ? (
        <MobileNav
          items={NAV_ITEMS}
          current={page}
          onNavigate={navigate}
          onClose={() => setMobileNavOpen(false)}
        />
      ) : null}

      {detailId ? (
        <OrderDrawer
          key={detailId}
          orderId={detailId}
          refreshToken={detailRefresh}
          couriers={couriers.items}
          suspended={assignOpen}
          onClose={() => setDetailId(null)}
        />
      ) : null}

      {assignOpen ? (
        <AssignModal
          ids={selection}
          couriers={couriers.items}
          selectedCourier={assignCourier}
          submitting={assignSubmitting}
          error={assignError}
          couriersError={couriers.error}
          onSelectCourier={setAssignCourier}
          onRetryCouriers={couriers.reload}
          onSyncLatest={syncLatest}
          onConfirm={confirmAssign}
          onClose={closeAssign}
        />
      ) : null}

      {toast ? <Toast toast={toast} onDismiss={dismissToast} /> : null}
    </>
  )
}
