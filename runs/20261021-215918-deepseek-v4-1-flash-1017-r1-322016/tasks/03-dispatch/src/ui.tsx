import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import type { OrderStatus, Priority, ToastMessage } from './types'
import { formatNumber, getPageNumbers, PRIORITY_META, STATUS_META } from './utils'

export type IconName =
  | 'grid'
  | 'package'
  | 'users'
  | 'chart'
  | 'settings'
  | 'search'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'arrow-right'
  | 'check'
  | 'refresh'
  | 'alert'
  | 'info'
  | 'menu'
  | 'truck'
  | 'clock'
  | 'server'
  | 'minus'
  | 'spark'

const iconPaths: Record<IconName, ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </>
  ),
  package: (
    <>
      <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2Z" />
      <path d="m3 8.2 9 5.2 9-5.2M12 21v-7.6" />
      <path d="m7.5 5.6 9 5.2" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-1.6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
      <circle cx="9" cy="7" r="3.2" />
      <path d="M22 20v-1.6a4 4 0 0 0-3-3.8M16.2 4.2a3.2 3.2 0 0 1 0 6.2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-6M22 20V7" />
    </>
  ),
  settings: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  'chevron-left': <path d="m14.5 6-6 6 6 6" />,
  'chevron-right': <path d="m9.5 6 6 6-6 6" />,
  'arrow-right': <path d="M4 12h15M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 1 0-.7 4.4" />
      <path d="M20 4v7h-7" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 22 20H2Z" />
      <path d="M12 9v5M12 17.2v.3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.8v.3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  truck: (
    <>
      <path d="M3 6h10v10H3zM13 10h4l4 3.5V16h-8" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />,
}

export function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  )
}

export function Logo({ size = 38 }: { size?: number }) {
  return (
    <span className="brand-logo" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 36 36" width={size} height={size}>
        <circle cx="14.4" cy="12.6" r="4.1" fill="#fff" />
        <path d="M17.2 10.8 30 14.4l-12.1 3.7c-1 .3-2-.4-2.1-1.4Z" fill="#fff" opacity=".96" />
        <path d="M17.2 17.6c1.7 3.3 5.6 4 8.3 1.4l-3.2 5.4c-2.5 1.2-5.5 0-6.7-2.5Z" fill="#fff" opacity=".62" />
        <path d="M7.6 27.8c2.6-3.9 6.7-5.3 10.6-3.7 2.7 1.1 5 .9 7.7-.7" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" opacity=".72" />
      </svg>
    </span>
  )
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {STATUS_META[status].label}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`priority-badge priority-${priority}`}>
      {priority === 'urgent' && <Icon name="alert" size={12} />}
      {PRIORITY_META[priority].label}
    </span>
  )
}

export function Spinner({ label = '加载中' }: { label?: string }) {
  return <span className="spinner" role="status" aria-label={label} />
}

export function Skeleton({ width = '100%', height = 14 }: { width?: number | string; height?: number | string }) {
  return <span className="skeleton" style={{ width, height }} aria-hidden="true" />
}

export function Checkbox({
  checked,
  indeterminate = false,
  disabled = false,
  onChange,
  label,
  disabledHint,
}: {
  checked: boolean
  indeterminate?: boolean
  disabled?: boolean
  onChange: () => void
  label: string
  disabledHint?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate, checked])
  return (
    <label className={`checkbox-hit${disabled ? ' is-disabled' : ''}`} title={disabled ? disabledHint : label}>
      <input
        ref={inputRef}
        type="checkbox"
        className="native-checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={label}
      />
      <span
        className={`checkbox-box${checked ? ' is-checked' : ''}${indeterminate ? ' is-indeterminate' : ''}`}
        aria-hidden="true"
      >
        {indeterminate ? <Icon name="minus" size={12} /> : checked ? <Icon name="check" size={12} /> : null}
      </span>
    </label>
  )
}

export function StatePanel({
  tone = 'neutral',
  icon = 'package',
  title,
  description,
  children,
}: {
  tone?: 'neutral' | 'error'
  icon?: IconName
  title: string
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className={`state-panel state-${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <span className="state-icon">
        <Icon name={icon} size={22} />
      </span>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {children ? <div className="state-actions">{children}</div> : null}
    </div>
  )
}

export function InlineNotice({
  tone = 'error',
  children,
  action,
}: {
  tone?: 'error' | 'info' | 'success'
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className={`inline-notice notice-${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <Icon name={tone === 'success' ? 'check' : tone === 'info' ? 'info' : 'alert'} size={16} />
      <div className="notice-text">{children}</div>
      {action ? <div className="notice-action">{action}</div> : null}
    </div>
  )
}

export function Pagination({
  page,
  pageSize,
  total,
  loading,
  onPageChange,
  onOpenSettings,
}: {
  page: number
  pageSize: number
  total: number
  loading: boolean
  onPageChange: (page: number) => void
  onOpenSettings: () => void
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const pages = getPageNumbers(page, totalPages)
  return (
    <div className="pagination">
      <div className="pagination-meta">
        <span>
          共 <strong>{formatNumber(total)}</strong> 条
        </span>
        <span className="pagination-divider" aria-hidden="true" />
        <span>
          每页{' '}
          <button type="button" className="link-button" onClick={onOpenSettings}>
            {pageSize} 条
          </button>
        </span>
        <span className="pagination-divider" aria-hidden="true" />
        <span>
          第 <strong>{formatNumber(page)}</strong> / {formatNumber(totalPages)} 页
        </span>
        {loading ? <span className="pagination-loading">同步中…</span> : null}
      </div>
      <nav className="pagination-pages" aria-label="订单分页">
        <button
          type="button"
          className="page-button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="上一页"
        >
          <Icon name="chevron-left" size={16} />
        </button>
        {pages.map((entry, index) =>
          entry === 'ellipsis' ? (
            <span className="page-ellipsis" key={`ellipsis-${index}`} aria-hidden="true">
              …
            </span>
          ) : (
            <button
              type="button"
              key={entry}
              className={`page-button${entry === page ? ' is-active' : ''}`}
              onClick={() => onPageChange(entry)}
              aria-label={`第 ${entry} 页`}
              aria-current={entry === page ? 'page' : undefined}
            >
              {formatNumber(entry)}
            </button>
          ),
        )}
        <button
          type="button"
          className="page-button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="下一页"
        >
          <Icon name="chevron-right" size={16} />
        </button>
      </nav>
    </div>
  )
}

export function Toast({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), 4600)
    return () => window.clearTimeout(timer)
  }, [toast.id, onDismiss])
  return (
    <div className={`toast toast-${toast.kind}`} role="status" aria-live="polite">
      <span className="toast-icon">
        <Icon name={toast.kind === 'success' ? 'check' : toast.kind === 'error' ? 'alert' : 'info'} size={17} />
      </span>
      <p>{toast.message}</p>
      <button type="button" className="toast-close" aria-label="关闭提示" onClick={() => onDismiss(toast.id)}>
        <Icon name="close" size={15} />
      </button>
    </div>
  )
}

function getFocusable(container: HTMLElement | null) {
  if (!container) return []
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null)
}

export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onEscape?: () => void,
) {
  const escapeRef = useRef(onEscape)
  escapeRef.current = onEscape
  useEffect(() => {
    if (!active) return
    const container = containerRef.current
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const timer = window.setTimeout(() => {
      const list = getFocusable(container)
      ;(list[0] ?? container)?.focus()
    }, 0)
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        escapeRef.current?.()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = getFocusable(container)
      if (focusable.length === 0) {
        event.preventDefault()
        container?.focus()
        return
      }
      const index = focusable.indexOf(document.activeElement as HTMLElement)
      if (event.shiftKey) {
        if (index <= 0) {
          event.preventDefault()
          focusable[focusable.length - 1].focus()
        }
      } else if (index === -1 || index === focusable.length - 1) {
        event.preventDefault()
        focusable[0].focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown, true)
      // 等待 inert 与浮层移除后再归还焦点；若仍有其他对话框，则交给它的焦点圈管理。
      window.setTimeout(() => {
        if (document.querySelector('[aria-modal="true"]')) return
        let target: HTMLElement | null =
          previous && previous.isConnected && previous !== document.body ? previous : null
        const disabled =
          target instanceof HTMLButtonElement || target instanceof HTMLInputElement || target instanceof HTMLSelectElement
            ? target.disabled
            : false
        if (!target || disabled) {
          target =
            document.querySelector<HTMLElement>('.content .search-field input') ??
            document.querySelector<HTMLElement>('.content button:not([disabled])')
        }
        if (!target) {
          const heading = document.querySelector<HTMLElement>('.page-header h1')
          if (heading) {
            heading.tabIndex = -1
            target = heading
          }
        }
        target?.focus({ preventScroll: true })
      }, 0)
    }
  }, [active, containerRef])
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle: string
  actions?: ReactNode
}) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  )
}

export function StatCard({
  label,
  value,
  caption,
  icon,
  active = false,
  loading = false,
  onClick,
}: {
  label: string
  value: string
  caption?: string
  icon: IconName
  active?: boolean
  loading?: boolean
  onClick?: () => void
}) {
  const content = (
    <>
      <span className="stat-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon">
          <Icon name={icon} size={16} />
        </span>
      </span>
      <span className="stat-bottom">
        <span className={`stat-value${loading ? ' is-placeholder' : ''}`}>
          {loading ? <Skeleton width={72} height={26} /> : value}
        </span>
        {caption ? <span className="stat-caption">{caption}</span> : null}
      </span>
    </>
  )
  if (onClick) {
    return (
      <button
        type="button"
        className={`stat-card is-clickable${active ? ' is-active' : ''}`}
        onClick={onClick}
        aria-pressed={active}
      >
        {content}
      </button>
    )
  }
  return <div className="stat-card">{content}</div>
}
