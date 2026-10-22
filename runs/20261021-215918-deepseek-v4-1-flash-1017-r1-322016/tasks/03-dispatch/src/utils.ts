import type { Courier, OrderStatus, Priority, StatusFilter } from './types'

export const STATUS_META: Record<OrderStatus, { label: string; short: string; color: string; soft: string }> = {
  pending: { label: '待派单', short: '待派', color: '#b87810', soft: '#fff4df' },
  assigned: { label: '配送中', short: '配送', color: '#1f5fd0', soft: '#eaf1fe' },
  delivered: { label: '已送达', short: '送达', color: '#1f7a52', soft: '#e8f6ee' },
}

export const STATUS_ORDER: OrderStatus[] = ['pending', 'assigned', 'delivered']

export const PRIORITY_META: Record<Priority, { label: string }> = {
  normal: { label: '普通' },
  urgent: { label: '加急' },
}

export const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待派单' },
  { value: 'assigned', label: '配送中' },
  { value: 'delivered', label: '已送达' },
]

const numberFormatter = new Intl.NumberFormat('zh-CN')

export function formatNumber(value: number) {
  return numberFormatter.format(value)
}

export function formatPercent(value: number, total: number) {
  if (!total) return '0%'
  const percent = (value / total) * 100
  return `${percent.toFixed(percent > 0 && percent < 1 ? 2 : 1)}%`
}

export function formatDateTime(iso: string, withSeconds = false) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const formatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...(withSeconds ? { second: '2-digit' as const } : {}),
    hour12: false,
    timeZone: 'Asia/Shanghai',
  })
  return formatter.format(date).replaceAll('/', '-')
}

export function courierName(courierId: string | null, couriers: Courier[]) {
  if (!courierId) return null
  return couriers.find((courier) => courier.id === courierId)?.name ?? courierId
}

export function getPageNumbers(current: number, totalPages: number): (number | 'ellipsis')[] {
  const pages = new Set<number>([1, totalPages, current - 1, current, current + 1])
  if (current <= 3) {
    pages.add(2)
    pages.add(3)
    pages.add(4)
  }
  if (current >= totalPages - 2) {
    pages.add(totalPages - 1)
    pages.add(totalPages - 2)
    pages.add(totalPages - 3)
  }
  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
  const result: (number | 'ellipsis')[] = []
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) result.push('ellipsis')
    result.push(page)
  })
  return result
}

export function pluralOrders(count: number) {
  return `${formatNumber(count)} 单`
}
