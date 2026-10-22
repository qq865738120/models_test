import type { StatsState } from '../hooks'
import { Icon, InlineNotice, PageHeader, Skeleton, Spinner, StatePanel } from '../ui'
import { formatDateTime, formatNumber, formatPercent, STATUS_META, STATUS_ORDER } from '../utils'

interface ReportsPageProps {
  stats: StatsState
  onRefresh: () => void
}

export function ReportsPage({ stats, onRefresh }: ReportsPageProps) {
  const data = stats.data
  const initialLoading = stats.loading && !data
  const initialError = Boolean(stats.error) && !data

  return (
    <>
      <PageHeader
        title="运行报表"
        subtitle="核对全部订单的状态构成与真实数据快照"
        actions={
          <button type="button" className="btn btn-secondary" onClick={onRefresh} disabled={stats.loading}>
            {stats.loading ? <Spinner label="正在刷新统计" /> : <Icon name="refresh" size={16} />}
            {stats.loading ? '刷新中…' : '刷新统计'}
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
          统计刷新失败：{stats.error}
          {data ? ' 当前展示上次成功快照，时间不会被替换。' : ''}
        </InlineNotice>
      ) : null}

      {initialError ? (
        <StatePanel
          tone="error"
          icon="alert"
          title="报表数据暂不可用"
          description="未能读取 GET /api/stats。页面不会展示 0 或伪造的快照时间，请重试。"
        >
          <button type="button" className="btn btn-primary" onClick={onRefresh}>
            <Icon name="refresh" size={16} />
            重新加载
          </button>
        </StatePanel>
      ) : (
        <div className="reports-grid">
          <section className="card report-card">
            <header className="card-header">
              <div>
                <h2>状态构成</h2>
                <p>状态数量与比例来自同一次统计快照</p>
              </div>
              <span className="chip-neutral">分母 · 全部订单</span>
            </header>

            {initialLoading ? (
              <div className="report-rows">
                {Array.from({ length: 3 }, (_, index) => (
                  <div className="report-row" key={`report-skeleton-${index}`}>
                    <div className="report-row-top">
                      <Skeleton width={86} height={16} />
                      <Skeleton width={120} height={16} />
                    </div>
                    <Skeleton width="100%" height={8} />
                  </div>
                ))}
              </div>
            ) : data ? (
              <>
                <div className="report-rows">
                  {STATUS_ORDER.map((status) => (
                    <div className="report-row" key={status}>
                      <div className="report-row-top">
                        <span className="report-label">
                          <span
                            className="legend-dot"
                            style={{ background: STATUS_META[status].color }}
                            aria-hidden="true"
                          />
                          {STATUS_META[status].label}
                        </span>
                        <span className="report-numbers">
                          <strong>{formatNumber(data[status])}</strong> 单
                          <span className="report-percent">{formatPercent(data[status], data.all)}</span>
                        </span>
                      </div>
                      <div
                        className="report-track"
                        role="img"
                        aria-label={`${STATUS_META[status].label} ${formatNumber(data[status])} 单，占 ${formatPercent(data[status], data.all)}`}
                      >
                        <span
                          className="report-fill"
                          style={{
                            width: `${data.all > 0 ? (data[status] / data.all) * 100 : 0}%`,
                            background: STATUS_META[status].color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <footer className="report-total">
                  <span>全部订单</span>
                  <strong>{formatNumber(data.all)} 单</strong>
                  <span className="report-total-percent">100%</span>
                </footer>
              </>
            ) : null}
          </section>

          <aside className="card snapshot-card">
            <header className="card-header">
              <div>
                <h2>快照信息</h2>
                <p>每次读取都是独立的同一状态快照</p>
              </div>
              <span className="chip-neutral">实时</span>
            </header>
            <dl className="snapshot-list">
              <div>
                <dt>{stats.error ? '上次成功快照' : '快照时间'}</dt>
                <dd className="mono">{data ? formatDateTime(data.updatedAt, true) : initialLoading ? '加载中…' : '—'}</dd>
              </div>
              <div>
                <dt>统计范围</dt>
                <dd>全部 {data ? formatNumber(data.all) : '—'} 单</dd>
              </div>
              <div>
                <dt>数据来源</dt>
                <dd>Node 服务进程内存</dd>
              </div>
              <div>
                <dt>刷新方式</dt>
                <dd>{initialLoading ? '正在读取…' : stats.loading ? '正在刷新…' : '单次 GET /api/stats'}</dd>
              </div>
            </dl>
            <div className="snapshot-note">
              <Icon name="info" size={15} />
              <p>刷新只重新读取统计，不会修改任何订单。派单成功后，统计会在下次展示前重新读取。</p>
            </div>
            <button type="button" className="btn btn-primary btn-block" onClick={onRefresh} disabled={stats.loading}>
              <Icon name="refresh" size={16} />
              刷新报表
            </button>
          </aside>
        </div>
      )}
    </>
  )
}
