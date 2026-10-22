import type { FormEvent } from 'react'
import type { OrdersState, StatsState } from '../hooks'
import type { Courier, OrdersQuery, StatusFilter } from '../types'
import {
  Checkbox,
  Icon,
  InlineNotice,
  PageHeader,
  Pagination,
  Skeleton,
  Spinner,
  StatCard,
  StatePanel,
  StatusBadge,
} from '../ui'
import { courierName, formatNumber, STATUS_FILTERS, STATUS_META } from '../utils'

interface OrdersPageProps {
  orders: OrdersState
  stats: StatsState
  query: OrdersQuery
  searchDraft: string
  couriers: Courier[]
  selection: string[]
  presetCourier: Courier | null
  onSearchDraftChange: (value: string) => void
  onSearch: () => void
  onClearSearch: () => void
  onStatusChange: (status: StatusFilter) => void
  onClearFilters: () => void
  onPageChange: (page: number) => void
  onOpenSettings: () => void
  onToggleOrder: (id: string) => void
  onSelectAll: () => void
  onClearSelection: () => void
  onOpenAssign: () => void
  onOpenDetail: (id: string) => void
  onRetryOrders: () => void
  onRetryStats: () => void
  onRefreshAll: () => void
  onClearPreset: () => void
}

export function OrdersPage(props: OrdersPageProps) {
  const {
    orders,
    stats,
    query,
    searchDraft,
    couriers,
    selection,
    presetCourier,
    onSearchDraftChange,
    onSearch,
    onClearSearch,
    onStatusChange,
    onClearFilters,
    onPageChange,
    onOpenSettings,
    onToggleOrder,
    onSelectAll,
    onClearSelection,
    onOpenAssign,
    onOpenDetail,
    onRetryOrders,
    onRetryStats,
    onRefreshAll,
    onClearPreset,
  } = props

  const selected = new Set(selection)
  const pendingOnPage = orders.items.filter((order) => order.status === 'pending').map((order) => order.id)
  const selectedOnPage = pendingOnPage.filter((id) => selected.has(id))
  const allSelected = pendingOnPage.length > 0 && selectedOnPage.length === pendingOnPage.length
  const someSelected = selectedOnPage.length > 0 && !allSelected
  const totalPages = Math.max(1, Math.ceil(orders.total / orders.pageSize))
  const beyondRange = orders.loaded && orders.total > 0 && orders.page > totalPages
  const filtersActive = Boolean(query.q) || query.status !== 'all'
  const statsLoading = stats.loading && !stats.data
  const statsUnavailable = !stats.data && !statsLoading
  const showSkeleton = orders.loading && orders.items.length === 0
  const showErrorState = Boolean(orders.error) && orders.items.length === 0

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch()
  }

  const cards = [
    {
      key: 'all' as const,
      label: '全部订单',
      value: stats.data ? formatNumber(stats.data.all) : statsUnavailable ? '—' : '',
      caption: '全部状态的订单',
      icon: 'package' as const,
    },
    {
      key: 'pending' as const,
      label: '待派单',
      value: stats.data ? formatNumber(stats.data.pending) : statsUnavailable ? '—' : '',
      caption: '等待配送员接单',
      icon: 'clock' as const,
    },
    {
      key: 'assigned' as const,
      label: '配送中',
      value: stats.data ? formatNumber(stats.data.assigned) : statsUnavailable ? '—' : '',
      caption: '已派出，正在配送',
      icon: 'truck' as const,
    },
    {
      key: 'delivered' as const,
      label: '已送达',
      value: stats.data ? formatNumber(stats.data.delivered) : statsUnavailable ? '—' : '',
      caption: '已完成签收',
      icon: 'check' as const,
    },
  ]

  return (
    <>
      <PageHeader
        title="订单派送"
        subtitle="安排每一份快递，查看实时派送状态"
        actions={
          <button type="button" className="btn btn-secondary" onClick={onRefreshAll} disabled={orders.loading}>
            {orders.loading ? <Spinner label="正在刷新" /> : <Icon name="refresh" size={16} />}
            刷新数据
          </button>
        }
      />

      <div className="stat-grid" aria-label="订单统计概览">
        {cards.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={card.value || '—'}
            caption={card.caption}
            icon={card.icon}
            loading={statsLoading}
            active={query.status === card.key}
            onClick={() => onStatusChange(card.key)}
          />
        ))}
      </div>

      {stats.error ? (
        <InlineNotice
          tone="error"
          action={
            <button type="button" className="link-button" onClick={onRetryStats}>
              重试
            </button>
          }
        >
          统计未能更新：{stats.error}
          {stats.data ? ' 当前展示上次成功获取的数据。' : ''}
        </InlineNotice>
      ) : null}

      <section className="card orders-card" aria-busy={orders.loading}>
        {orders.loading && orders.items.length > 0 ? <div className="loading-bar" aria-hidden="true" /> : null}
        <div className="orders-toolbar">
          <form className="search-form" role="search" onSubmit={handleSearchSubmit}>
            <div className="search-field">
              <Icon name="search" size={17} />
              <input
                type="search"
                value={searchDraft}
                onChange={(event) => onSearchDraftChange(event.target.value)}
                placeholder="搜索订单编号、客户或地址"
                aria-label="搜索订单编号、客户或地址"
                autoComplete="off"
                spellCheck={false}
              />
              {searchDraft ? (
                <button
                  type="button"
                  className="input-clear"
                  onClick={onClearSearch}
                  aria-label="清除搜索输入"
                >
                  <Icon name="close" size={14} />
                </button>
              ) : null}
            </div>
            <button type="submit" className="btn btn-secondary search-submit" aria-label="提交搜索">
              搜索
            </button>
          </form>

          <div className="status-tabs" role="group" aria-label="按订单状态筛选">
            {STATUS_FILTERS.map((filter) => (
              <button
                type="button"
                key={filter.value}
                className={`status-tab${query.status === filter.value ? ' is-active' : ''}`}
                aria-pressed={query.status === filter.value}
                onClick={() => onStatusChange(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="toolbar-spacer" />
          <span className="toolbar-hint">
            {selection.length > 0 ? `已选 ${formatNumber(selection.length)} 单` : '勾选本页待派单后批量派单'}
          </span>
          <button
            type="button"
            className="btn btn-primary"
            disabled={selection.length === 0}
            onClick={onOpenAssign}
            title={selection.length === 0 ? '请先勾选本页待派单订单' : '为已选订单选择配送员'}
          >
            <Icon name="truck" size={17} />
            批量派单{selection.length > 0 ? `（${formatNumber(selection.length)}）` : ''}
          </button>
        </div>

        {presetCourier ? (
          <div className="subbar">
            <InlineNotice
              tone="info"
              action={
                <button type="button" className="link-button" onClick={onClearPreset}>
                  知道了
                </button>
              }
            >
              已预选配送员 <strong>{presetCourier.name}</strong>（{presetCourier.id}）。勾选待派单订单后点击「批量派单」即可确认。
            </InlineNotice>
          </div>
        ) : null}

        {filtersActive ? (
          <div className="active-filters">
            <span className="active-filters-label">当前筛选</span>
            {query.q ? (
              <button type="button" className="filter-chip" onClick={onClearSearch} aria-label={`清除搜索条件 ${query.q}`}>
                搜索：{query.q}
                <Icon name="close" size={12} />
              </button>
            ) : null}
            {query.status !== 'all' ? (
              <button
                type="button"
                className="filter-chip"
                onClick={() => onStatusChange('all')}
                aria-label="清除状态筛选"
              >
                状态：{STATUS_META[query.status].label}
                <Icon name="close" size={12} />
              </button>
            ) : null}
            <button type="button" className="link-button" onClick={onClearFilters}>
              清除全部
            </button>
          </div>
        ) : null}

        {selection.length > 0 ? (
          <div className="selection-bar">
            <span className="selection-main">
              <span className="selection-check" aria-hidden="true">
                <Icon name="check" size={13} />
              </span>
              已选择 <strong>{formatNumber(selection.length)}</strong> 个待派单订单
            </span>
            <span className="selection-ids">
              仅当前页 · {selection.slice(0, 3).join('、')}
              {selection.length > 3 ? ` 等 ${selection.length} 单` : ''}
            </span>
            <button type="button" className="link-button" onClick={onClearSelection}>
              清除选择
            </button>
          </div>
        ) : null}

        {orders.error && orders.items.length > 0 ? (
          <div className="subbar">
            <InlineNotice
              tone="error"
              action={
                <button type="button" className="link-button" onClick={onRetryOrders}>
                  重试
                </button>
              }
            >
              列表刷新失败：{orders.error} 当前展示上次成功获取的数据。
            </InlineNotice>
          </div>
        ) : null}

        <div className="table-scroll" role="region" aria-label="订单列表" tabIndex={0}>
          <table className="orders-table">
            <colgroup>
              <col className="col-check" />
              <col className="col-id" />
              <col className="col-customer" />
              <col className="col-address" />
              <col className="col-status" />
              <col className="col-courier" />
              <col className="col-action" />
            </colgroup>
            <thead>
              <tr>
                <th className="cell-check" scope="col">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    disabled={pendingOnPage.length === 0}
                    onChange={onSelectAll}
                    label="全选本页待派单订单"
                    disabledHint="本页没有可选择的待派单订单"
                  />
                </th>
                <th scope="col">编号</th>
                <th scope="col">客户</th>
                <th scope="col">地址</th>
                <th scope="col">状态</th>
                <th scope="col">配送员</th>
                <th scope="col" className="cell-action">
                  详情
                </th>
              </tr>
            </thead>
            <tbody>
              {showSkeleton
                ? Array.from({ length: 8 }, (_, index) => (
                    <tr key={`skeleton-${index}`} className="skeleton-row">
                      <td className="cell-check">
                        <Skeleton width={18} height={18} />
                      </td>
                      <td>
                        <Skeleton width={78} height={13} />
                      </td>
                      <td>
                        <Skeleton width={72} height={13} />
                      </td>
                      <td>
                        <Skeleton width={`${48 + ((index * 7) % 30)}%`} height={13} />
                      </td>
                      <td>
                        <Skeleton width={64} height={22} />
                      </td>
                      <td>
                        <Skeleton width={70} height={13} />
                      </td>
                      <td className="cell-action">
                        <Skeleton width={42} height={13} />
                      </td>
                    </tr>
                  ))
                : null}

              {!showSkeleton && showErrorState ? (
                <tr>
                  <td colSpan={7} className="state-cell">
                    <StatePanel
                      tone="error"
                      icon="alert"
                      title="订单加载失败"
                      description={orders.error}
                    >
                      <button type="button" className="btn btn-primary" onClick={onRetryOrders}>
                        <Icon name="refresh" size={16} />
                        重新加载
                      </button>
                      {filtersActive ? (
                        <button type="button" className="btn btn-secondary" onClick={onClearFilters}>
                          清除筛选
                        </button>
                      ) : null}
                    </StatePanel>
                  </td>
                </tr>
              ) : null}

              {!showSkeleton && !showErrorState && orders.items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="state-cell">
                    <StatePanel
                      icon={beyondRange ? 'package' : 'search'}
                      title={
                        beyondRange
                          ? '这一页已经超出结果范围'
                          : filtersActive
                            ? '没有符合条件的订单'
                            : '暂无订单数据'
                      }
                      description={
                        beyondRange
                          ? `当前结果共 ${formatNumber(totalPages)} 页，页码仍保留在你请求的位置。`
                          : filtersActive
                            ? '换一个关键词，或清除筛选条件后再试。'
                            : '服务暂未返回订单，稍后再试一次。'
                      }
                    >
                      {beyondRange ? (
                        <button type="button" className="btn btn-primary" onClick={() => onPageChange(1)}>
                          回到第一页
                        </button>
                      ) : null}
                      {filtersActive ? (
                        <button type="button" className="btn btn-primary" onClick={onClearFilters}>
                          清除筛选
                        </button>
                      ) : null}
                      <button type="button" className="btn btn-secondary" onClick={onRetryOrders}>
                        <Icon name="refresh" size={16} />
                        重新加载
                      </button>
                    </StatePanel>
                  </td>
                </tr>
              ) : null}

              {!showSkeleton && !showErrorState
                ? orders.items.map((order) => {
                    const courier = courierName(order.courierId, couriers)
                    const isSelected = selected.has(order.id)
                    return (
                      <tr key={order.id} className={isSelected ? 'is-selected' : undefined}>
                        <td className="cell-check">
                          <Checkbox
                            checked={isSelected}
                            disabled={order.status !== 'pending'}
                            onChange={() => onToggleOrder(order.id)}
                            label={`选择订单 ${order.id}`}
                            disabledHint="仅待派单订单可勾选"
                          />
                        </td>
                        <td>
                          <span className="order-id">{order.id}</span>
                        </td>
                        <td>
                          <span className="order-customer">{order.customer}</span>
                        </td>
                        <td>
                          <span className="order-address" title={order.address}>
                            {order.address}
                          </span>
                        </td>
                        <td>
                          <StatusBadge status={order.status} />
                        </td>
                        <td>
                          {courier ? (
                            <span className="courier-name">{courier}</span>
                          ) : (
                            <span className="cell-muted">未分配</span>
                          )}
                        </td>
                        <td className="cell-action">
                          <button
                            type="button"
                            className="detail-button"
                            onClick={() => onOpenDetail(order.id)}
                            aria-label={`查看订单 ${order.id} 详情`}
                          >
                            详情
                            <Icon name="chevron-right" size={14} />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
        </div>

        {!orders.loaded && orders.loading ? (
          <div className="pagination pagination-placeholder" aria-hidden="true">
            <Skeleton width={220} height={14} />
            <Skeleton width={180} height={30} />
          </div>
        ) : null}
        {orders.loaded || orders.items.length > 0 ? (
          <Pagination
            page={orders.page}
            pageSize={orders.pageSize}
            total={orders.total}
            loading={orders.loading}
            onPageChange={onPageChange}
            onOpenSettings={onOpenSettings}
          />
        ) : null}
      </section>
    </>
  )
}
