import type { StatsState } from '../hooks'
import type { Stats } from '../types'
import { Icon, InlineNotice, PageHeader, Skeleton, Spinner, StatCard, StatePanel } from '../ui'
import { formatDateTime, formatNumber, formatPercent, STATUS_META, STATUS_ORDER } from '../utils'

interface OverviewPageProps {
  stats: StatsState
  onRefresh: () => void
  onGoPending: () => void
  onGoReports: () => void
}

function DistributionChart({ stats }: { stats: Stats }) {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  let offset = 0
  const segments = STATUS_ORDER.map((status) => {
    const value = stats[status]
    const length = stats.all > 0 ? (value / stats.all) * circumference : 0
    const segment = { status, value, length, offset }
    offset += length
    return segment
  })

  return (
    <div className="distribution-layout">
      <div className="donut-wrap">
        <svg
          viewBox="0 0 180 180"
          className="donut"
          role="img"
          aria-label={segments
            .map((segment) => `${STATUS_META[segment.status].label} ${formatNumber(segment.value)} 单`)
            .join('，')}
        >
          <circle cx="90" cy="90" r={radius} fill="none" stroke="#eef2f7" strokeWidth="22" />
          {segments.map((segment) =>
            segment.length > 0 ? (
              <circle
                key={segment.status}
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={STATUS_META[segment.status].color}
                strokeWidth="22"
                strokeDasharray={`${Math.max(segment.length - 3, 0)} ${circumference}`}
                strokeDashoffset={-segment.offset}
                transform="rotate(-90 90 90)"
              />
            ) : null,
          )}
        </svg>
        <div className="donut-center">
          <strong>{formatNumber(stats.all)}</strong>
          <span>全部订单</span>
        </div>
      </div>
      <ul className="distribution-legend">
        {STATUS_ORDER.map((status) => (
          <li key={status}>
            <span className="legend-dot" style={{ background: STATUS_META[status].color }} aria-hidden="true" />
            <span className="legend-label">{STATUS_META[status].label}</span>
            <strong className="legend-value">{formatNumber(stats[status])}</strong>
            <span className="legend-percent">{formatPercent(stats[status], stats.all)}</span>
          </li>
        ))}
        <li className="legend-total">
          <span className="legend-dot is-total" aria-hidden="true" />
          <span className="legend-label">合计</span>
          <strong className="legend-value">{formatNumber(stats.all)}</strong>
          <span className="legend-percent">100%</span>
        </li>
      </ul>
    </div>
  )
}

export function OverviewPage({ stats, onRefresh, onGoPending, onGoReports }: OverviewPageProps) {
  const loading = stats.loading && !stats.data
  const data = stats.data

  return (
    <>
      <PageHeader
        title="运营总览"
        subtitle="一屏掌握全部订单的派送进度与状态分布"
        actions={
          <button type="button" className="btn btn-secondary" onClick={onRefresh} disabled={stats.loading}>
            {stats.loading ? <Spinner label="正在刷新统计" /> : <Icon name="refresh" size={16} />}
            刷新统计
          </button>
        }
      />

      {stats.error ? (
        <InlineNotice
          tone="error"
          action={
            <button type="button" className="link-button" onClick={onRefresh}>
              重试
            </button>
          }
        >
          统计数据未能更新：{stats.error}
          {data ? ' 当前展示上次成功获取的数据。' : ''}
        </InlineNotice>
      ) : null}

      {!data && stats.error ? (
        <StatePanel
          tone="error"
          icon="alert"
          title="统计数据加载失败"
          description="统计接口暂时不可用，页面不会用 0 或旧时间冒充结果。请重试。"
        >
          <button type="button" className="btn btn-primary" onClick={onRefresh}>
            <Icon name="refresh" size={16} />
            重新加载
          </button>
        </StatePanel>
      ) : (
        <>
          <div className="stat-grid" aria-label="订单统计概览">
            <StatCard
              label="全部订单"
              value={data ? formatNumber(data.all) : '—'}
              caption="当前服务端内存快照"
              icon="package"
              loading={loading}
            />
            <StatCard
              label="待派单"
              value={data ? formatNumber(data.pending) : '—'}
              caption="点击查看待派单订单"
              icon="clock"
              loading={loading}
              onClick={onGoPending}
            />
            <StatCard
              label="配送中"
              value={data ? formatNumber(data.assigned) : '—'}
              caption="已派出，正在配送"
              icon="truck"
              loading={loading}
            />
            <StatCard
              label="已送达"
              value={data ? formatNumber(data.delivered) : '—'}
              caption="已完成签收"
              icon="check"
              loading={loading}
            />
          </div>

          <div className="overview-columns">
            <section className="card distribution-card">
              <header className="card-header">
                <div>
                  <h2>状态分布</h2>
                  <p>三项数量来自同一次 GET /api/stats 快照</p>
                </div>
                <span className="chip-neutral">分母 · 全部订单</span>
              </header>
              {data ? (
                <DistributionChart stats={data} />
              ) : (
                <div className="distribution-skeleton">
                  <Skeleton width={164} height={164} />
                  <div className="skeleton-lines">
                    <Skeleton width="78%" height={16} />
                    <Skeleton width="64%" height={16} />
                    <Skeleton width="72%" height={16} />
                    <Skeleton width="58%" height={16} />
                  </div>
                </div>
              )}
            </section>

            <aside className="card snapshot-card">
              <header className="card-header">
                <div>
                  <h2>数据快照</h2>
                  <p>统计由派单服务实时计算</p>
                </div>
                <span className="chip-neutral">Node 内存</span>
              </header>
              <dl className="snapshot-list">
                <div>
                  <dt>快照时间</dt>
                  <dd>{data ? formatDateTime(data.updatedAt, true) : loading ? '加载中…' : '—'}</dd>
                </div>
                <div>
                  <dt>订单总量</dt>
                  <dd>{data ? `${formatNumber(data.all)} 单` : '—'}</dd>
                </div>
                <div>
                  <dt>待派单占比</dt>
                  <dd>{data ? formatPercent(data.pending, data.all) : '—'}</dd>
                </div>
                <div>
                  <dt>派送完成率</dt>
                  <dd>{data ? formatPercent(data.delivered, data.all) : '—'}</dd>
                </div>
              </dl>
              <div className="snapshot-actions">
                <button type="button" className="btn btn-primary" onClick={onGoPending}>
                  <Icon name="clock" size={16} />
                  处理待派单
                </button>
                <button type="button" className="btn btn-secondary" onClick={onGoReports}>
                  查看运行报表
                  <Icon name="arrow-right" size={15} />
                </button>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  )
}
