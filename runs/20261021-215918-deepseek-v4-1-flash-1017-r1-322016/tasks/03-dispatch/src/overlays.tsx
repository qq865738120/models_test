import { useEffect, useRef, useState } from 'react'
import { fetchOrder } from './api'
import type { ApiFailure, Courier, Order, PageKey } from './types'
import {
  Icon,
  InlineNotice,
  PriorityBadge,
  Skeleton,
  Spinner,
  StatePanel,
  StatusBadge,
  useFocusTrap,
  type IconName,
} from './ui'
import { courierName, formatDateTime, formatNumber } from './utils'

interface DrawerState {
  data: Order | null
  loading: boolean
  error: string | null
}

export function OrderDrawer({
  orderId,
  refreshToken,
  couriers,
  suspended,
  onClose,
}: {
  orderId: string
  refreshToken: number
  couriers: Courier[]
  suspended: boolean
  onClose: () => void
}) {
  const panelRef = useRef<HTMLElement>(null)
  const [nonce, setNonce] = useState(0)
  const [state, setState] = useState<DrawerState>({ data: null, loading: true, error: null })
  const sequence = useRef(0)

  useEffect(() => {
    const requestId = sequence.current + 1
    sequence.current = requestId
    const controller = new AbortController()
    setState((previous) => ({ ...previous, loading: true, error: null }))
    fetchOrder(orderId, controller.signal)
      .then((data) => {
        if (sequence.current !== requestId) return
        setState({ data, loading: false, error: null })
      })
      .catch((error: unknown) => {
        if (sequence.current !== requestId) return
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState((previous) => ({
          ...previous,
          loading: false,
          error: error instanceof Error ? error.message : '详情加载失败，请重试。',
        }))
      })
    return () => controller.abort()
  }, [orderId, refreshToken, nonce])

  useFocusTrap(!suspended, panelRef, onClose)

  const detail = state.data
  const courier = detail ? courierName(detail.courierId, couriers) : null

  return (
    <div
      className="drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <header className="drawer-header">
          <div className="drawer-heading">
            <p className="eyebrow">订单详情</p>
            <h2 id="drawer-title" className="mono">
              {orderId}
            </h2>
            {state.loading && detail ? <Spinner label="正在刷新详情" /> : null}
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭订单详情">
            <Icon name="close" size={19} />
          </button>
        </header>

        <div className="drawer-body">
          {state.loading && !detail ? (
            <div className="drawer-skeleton" aria-label="正在加载订单详情">
              <div className="drawer-badges">
                <Skeleton width={72} height={24} />
                <Skeleton width={56} height={24} />
              </div>
              <Skeleton width="46%" height={16} />
              <Skeleton width="68%" height={26} />
              <div className="detail-grid">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={`detail-skeleton-${index}`} className={index < 2 ? 'full' : undefined}>
                    <Skeleton width={54} height={12} />
                    <Skeleton width={index < 2 ? '72%' : '48%'} height={16} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {state.error && !detail ? (
            <StatePanel tone="error" icon="alert" title="订单详情加载失败" description={state.error}>
              <button type="button" className="btn btn-primary" onClick={() => setNonce((value) => value + 1)}>
                <Icon name="refresh" size={16} />
                重试
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                关闭
              </button>
            </StatePanel>
          ) : null}

          {detail ? (
            <>
              {state.error ? (
                <InlineNotice
                  tone="error"
                  action={
                    <button type="button" className="link-button" onClick={() => setNonce((value) => value + 1)}>
                      重试
                    </button>
                  }
                >
                  详情刷新失败：{state.error} 当前展示上次成功数据。
                </InlineNotice>
              ) : null}
              <section className="drawer-summary">
                <div className="drawer-badges">
                  <StatusBadge status={detail.status} />
                  <PriorityBadge priority={detail.priority} />
                </div>
                <span className="field-label">客户</span>
                <h3>{detail.customer}</h3>
              </section>

              <dl className="detail-grid">
                <div className="full">
                  <dt>订单编号</dt>
                  <dd className="mono">{detail.id}</dd>
                </div>
                <div className="full">
                  <dt>收货地址</dt>
                  <dd>{detail.address}</dd>
                </div>
                <div>
                  <dt>配送员</dt>
                  <dd>
                    {courier ? (
                      <span className="detail-courier">
                        {courier}
                        <span className="mono muted">{detail.courierId}</span>
                      </span>
                    ) : (
                      <span className="placeholder">未分配</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>优先级</dt>
                  <dd>
                    <PriorityBadge priority={detail.priority} />
                  </dd>
                </div>
                <div>
                  <dt>当前状态</dt>
                  <dd>
                    <StatusBadge status={detail.status} />
                  </dd>
                </div>
                <div>
                  <dt>创建时间</dt>
                  <dd>{formatDateTime(detail.createdAt)}</dd>
                </div>
                <div className="full">
                  <dt>物品内容（contents）</dt>
                  <dd>{detail.contents || <span className="placeholder">未填写</span>}</dd>
                </div>
                <div className="full">
                  <dt>备注（note）</dt>
                  <dd className={detail.note ? 'detail-note' : 'placeholder'}>{detail.note || '暂无备注'}</dd>
                </div>
              </dl>
            </>
          ) : null}
        </div>

        <footer className="drawer-footer">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setNonce((value) => value + 1)}
            disabled={state.loading}
          >
            {state.loading ? <Spinner label="正在刷新详情" /> : <Icon name="refresh" size={16} />}
            刷新详情
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            关闭
          </button>
        </footer>
      </aside>
    </div>
  )
}

export function AssignModal({
  ids,
  couriers,
  selectedCourier,
  submitting,
  error,
  couriersError,
  onSelectCourier,
  onRetryCouriers,
  onSyncLatest,
  onConfirm,
  onClose,
}: {
  ids: string[]
  couriers: Courier[]
  selectedCourier: string | null
  submitting: boolean
  error: ApiFailure | null
  couriersError: string | null
  onSelectCourier: (courierId: string) => void
  onRetryCouriers: () => void
  onSyncLatest: () => void
  onConfirm: () => void
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  useFocusTrap(true, panelRef, () => {
    if (!submitting) onClose()
  })
  const selectedName = courierName(selectedCourier, couriers)
  const count = ids.length

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose()
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-title"
        aria-describedby="assign-description"
        ref={panelRef}
        tabIndex={-1}
      >
        <header className="modal-header">
          <div>
            <p className="eyebrow">批量派单</p>
            <h2 id="assign-title">确认派单</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="关闭派单弹窗"
            disabled={submitting}
          >
            <Icon name="close" size={19} />
          </button>
        </header>

        <div className="modal-body">
          <div className="assign-summary" id="assign-description">
            <div className="assign-summary-main">
              <span>
                将 <strong>{formatNumber(count)}</strong> 个待派单订单派给
              </span>
              <strong className={selectedName ? 'assign-target' : 'assign-target is-empty'}>
                {selectedName ?? '尚未选择配送员'}
              </strong>
            </div>
            <div className="assign-ids">
              {ids.slice(0, 6).map((id) => (
                <span className="id-chip mono" key={id}>
                  {id}
                </span>
              ))}
              {count > 6 ? <span className="id-chip is-more">等 {formatNumber(count)} 单</span> : null}
            </div>
          </div>

          {error ? (
            <InlineNotice
              tone="error"
              action={
                <button type="button" className="link-button" onClick={onSyncLatest} disabled={submitting}>
                  同步最新状态
                </button>
              }
            >
              {error.message}
              {error.status === 409 ? ' 列表与统计已刷新，请核对后重试。' : ''}
            </InlineNotice>
          ) : null}

          {couriersError ? (
            <InlineNotice
              tone="error"
              action={
                <button type="button" className="link-button" onClick={onRetryCouriers}>
                  重试
                </button>
              }
            >
              配送员名单加载失败：{couriersError}
            </InlineNotice>
          ) : null}

          <fieldset className="courier-fieldset" disabled={submitting}>
            <legend>选择配送员</legend>
            <div className="courier-options">
              {couriers.map((courier, index) => {
                const checked = selectedCourier === courier.id
                return (
                  <label className={`courier-option${checked ? ' is-selected' : ''}`} key={courier.id}>
                    <input
                      type="radio"
                      name="assignCourier"
                      value={courier.id}
                      checked={checked}
                      onChange={() => onSelectCourier(courier.id)}
                    />
                    <span className="radio-dot" aria-hidden="true" />
                    <span className={`courier-avatar small tone-${index % 3}`} aria-hidden="true">
                      鹈
                    </span>
                    <span className="courier-option-text">
                      <strong>{courier.name}</strong>
                      <span className="mono">{courier.id}</span>
                    </span>
                    <span className="option-check" aria-hidden="true">
                      {checked ? <Icon name="check" size={14} /> : null}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          {!selectedCourier && couriers.length > 0 ? (
            <p className="modal-hint">请选择一名配送员后才能确认派单。</p>
          ) : null}
          {submitting ? <p className="modal-hint is-busy">正在整批提交，请稍候…</p> : null}
        </div>

        <footer className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
            取消
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onConfirm}
            disabled={!selectedCourier || submitting || couriers.length === 0}
          >
            {submitting ? <Spinner label="正在派单" /> : <Icon name="truck" size={16} />}
            {submitting ? '正在派单…' : `确认派单（${formatNumber(count)} 单）`}
          </button>
        </footer>
      </div>
    </div>
  )
}

export interface NavItem {
  key: PageKey
  label: string
  icon: IconName
}

export function MobileNav({
  items,
  current,
  onNavigate,
  onClose,
}: {
  items: NavItem[]
  current: PageKey
  onNavigate: (page: PageKey) => void
  onClose: () => void
}) {
  const panelRef = useRef<HTMLElement>(null)
  useFocusTrap(true, panelRef, onClose)
  return (
    <div
      className="mobile-nav-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <aside className="mobile-nav" role="dialog" aria-modal="true" aria-label="主导航" ref={panelRef} tabIndex={-1}>
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">导航</span>
          <button type="button" className="icon-button on-dark" onClick={onClose} aria-label="关闭导航">
            <Icon name="close" size={19} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {items.map((item) => (
            <button
              type="button"
              key={item.key}
              className={`nav-item${current === item.key ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.key)}
              aria-current={current === item.key ? 'page' : undefined}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mobile-nav-footer">
          <Icon name="server" size={16} />
          <span>订单保存在 Node 服务内存</span>
        </div>
      </aside>
    </div>
  )
}
