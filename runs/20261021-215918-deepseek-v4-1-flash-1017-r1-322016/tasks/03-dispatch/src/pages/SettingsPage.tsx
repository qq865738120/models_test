import { useEffect, useState } from 'react'
import { Icon, PageHeader } from '../ui'

const PAGE_SIZE_OPTIONS = [
  { value: 20, label: '每页 20 条', description: '默认密度，浏览与派单都更轻松' },
  { value: 50, label: '每页 50 条', description: '中等密度，一次查看更多订单' },
  { value: 100, label: '每页 100 条', description: '高密度，适合集中核对与批量选择' },
]

interface SettingsPageProps {
  pageSize: number
  onSave: (pageSize: number) => void
  onRestoreDefault: () => void
}

export function SettingsPage({ pageSize, onSave, onRestoreDefault }: SettingsPageProps) {
  const [draft, setDraft] = useState(pageSize)
  useEffect(() => {
    setDraft(pageSize)
  }, [pageSize])
  const dirty = draft !== pageSize

  return (
    <>
      <PageHeader title="设置" subtitle="调整列表显示偏好，仅保存在当前页面会话" />

      <div className="settings-grid">
        <section className="card settings-card">
          <header className="card-header">
            <div>
              <h2>列表显示</h2>
              <p>选择订单列表每页展示的订单数量</p>
            </div>
            {dirty ? <span className="chip-pending">未保存</span> : <span className="chip-neutral">已生效</span>}
          </header>

          <div className="page-size-options" role="radiogroup" aria-label="每页显示订单数量">
            {PAGE_SIZE_OPTIONS.map((option) => {
              const checked = draft === option.value
              return (
                <label className={`page-size-option${checked ? ' is-checked' : ''}`} key={option.value}>
                  <input
                    type="radio"
                    name="pageSize"
                    value={option.value}
                    checked={checked}
                    onChange={() => setDraft(option.value)}
                  />
                  <span className="radio-dot" aria-hidden="true" />
                  <span className="option-text">
                    <strong>{option.label}</strong>
                    <span>{option.description}</span>
                  </span>
                  {option.value === 20 ? <span className="chip-neutral">默认</span> : null}
                </label>
              )
            })}
          </div>

          <div className="settings-actions">
            <p className="settings-hint">保存后会回到订单第一页并清空当前选择。</p>
            <div className="settings-buttons">
              <button type="button" className="btn btn-secondary" onClick={onRestoreDefault}>
                恢复默认
              </button>
              <button type="button" className="btn btn-primary" onClick={() => onSave(draft)}>
                保存设置
              </button>
            </div>
          </div>
        </section>

        <aside className="settings-side">
          <section className="card settings-info-card">
            <header className="card-header">
              <div>
                <h2>当前状态</h2>
                <p>本页偏好与服务端订单数据相互独立</p>
              </div>
            </header>
            <dl className="snapshot-list">
              <div>
                <dt>当前每页条数</dt>
                <dd>{pageSize} 条</dd>
              </div>
              <div>
                <dt>默认每页条数</dt>
                <dd>20 条</dd>
              </div>
              <div>
                <dt>生效范围</dt>
                <dd>当前页面会话</dd>
              </div>
              <div>
                <dt>订单数据</dt>
                <dd>保存在 Node 服务内存</dd>
              </div>
            </dl>
            <div className="snapshot-note">
              <Icon name="info" size={15} />
              <p>刷新页面会恢复默认 20 条/页；已派出的订单不会因刷新或恢复默认而撤销。</p>
            </div>
          </section>

          <section className="card settings-tip-card">
            <span className="settings-tip-icon">
              <Icon name="truck" size={18} />
            </span>
            <div>
              <h3>派单数据不受设置影响</h3>
              <p>恢复默认只改变每页显示数量。订单状态、配送员与统计都由 Node 服务进程保存。</p>
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
