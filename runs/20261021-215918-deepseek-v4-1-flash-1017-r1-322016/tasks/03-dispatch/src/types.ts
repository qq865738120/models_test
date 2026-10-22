export type OrderStatus = 'pending' | 'assigned' | 'delivered'
export type StatusFilter = 'all' | OrderStatus
export type Priority = 'normal' | 'urgent'

export interface Order {
  id: string
  customer: string
  address: string
  status: OrderStatus
  courierId: string | null
  priority: Priority
  createdAt: string
  contents: string
  note: string
}

export interface OrdersResponse {
  items: Order[]
  total: number
  page: number
  pageSize: number
}

export interface Stats {
  all: number
  pending: number
  assigned: number
  delivered: number
  updatedAt: string
}

export interface Courier {
  id: string
  name: string
}

export interface CouriersResponse {
  items: Courier[]
}

export interface AssignResponse {
  items: Order[]
}

export interface OrdersQuery {
  q: string
  status: StatusFilter
  page: number
  pageSize: number
}

export type PageKey = 'overview' | 'orders' | 'couriers' | 'reports' | 'settings'

export interface ToastMessage {
  id: number
  kind: 'success' | 'error' | 'info'
  message: string
}

export interface ApiFailure {
  message: string
  code?: string
  status?: number
}
