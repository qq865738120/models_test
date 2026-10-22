import type { CouriersState } from '../hooks'
import type { Courier } from '../types'
import { Icon, PageHeader, Skeleton, StatePanel } from '../ui'

interface CouriersPageProps {
  couriers: CouriersState
  onRetry: () => void
  onDispatch: (courier: Courier) => void
}

export function CouriersPage({ couriers, onRetry, onDispatch }: CouriersPageProps) {
  const loading = couriers.loading && couriers.items.length === 0

  return (
    <>
      <PageHeader
        title="配送员"
        subtitle="当前固定三名配送员，选择一位并挑选待派单订单"
        actions={
          <button type="button" className="btn btn-secondary" onClick={onRetry} disabled={couriers.loading}>
            <Icon name="refresh" size={16} />
            刷新名单
          </button>
        }
      />

      {couriers.error ? (
        <StatePanel
          tone="error"
          icon="alert"
          title="配送员名单加载失败"
          description={couriers.error}
        >
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            <Icon name="refresh" size={16} />
            重新加载
          </button>
        </StatePanel>
      ) : null}

      {!couriers.error && (loading || couriers.items.length > 0) ? (
        <div className="courier-grid">
          {loading
            ? Array.from({ length: 3 }, (_, index) => (
                <div className="card courier-card" key={`courier-skeleton-${index}`}>
                  <div className="courier-top">
                    <Skeleton width={52} height={52} />
                    <Skeleton width={72} height={22} />
                  </div>
                  <Skeleton width="52%" height={22} />
                  <Skeleton width="38%" height={14} />
                  <div className="courier-divider" />
                  <Skeleton width="100%" height={40} />
                </div>
              ))
            : couriers.items.map((courier, index) => (
                <article className="card courier-card" key={courier.id}>
                  <div className="courier-top">
                    <span className={`courier-avatar tone-${index % 3}`} aria-hidden="true">
                      鹈
                    </span>
                    <span className="chip-neutral">固定配送员</span>
                  </div>
                  <h2>{courier.name}</h2>
                  <p className="courier-meta">
                    配送员编号 <span className="mono">{courier.id}</span>
                  </p>
                  <div className="courier-divider" />
                  <button
                    type="button"
                    className="btn btn-secondary courier-action"
                    onClick={() => onDispatch(courier)}
                  >
                    为TA派单
                    <Icon name="arrow-right" size={16} />
                  </button>
                </article>
              ))}
        </div>
      ) : null}

      <section className="info-panel">
        <span className="info-panel-icon">
          <Icon name="info" size={18} />
        </span>
        <div>
          <h3>派单方式</h3>
          <p>
            选择配送员后会进入待派单第一页。仍需勾选订单并点击「批量派单」确认，配送员会在确认弹窗中预先选中。
            一次最多可派 100 单，整批校验通过后才会原子提交。
          </p>
        </div>
      </section>
    </>
  )
}
