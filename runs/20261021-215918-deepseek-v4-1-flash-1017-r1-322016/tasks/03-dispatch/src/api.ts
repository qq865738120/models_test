import type {
  AssignResponse,
  CouriersResponse,
  Order,
  OrdersQuery,
  OrdersResponse,
  Stats,
} from './types'

export class ApiError extends Error {
  status: number
  code?: string

  constructor(status: number, code: string | undefined, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

function endpoint(path: string) {
  return new URL(path, document.baseURI)
}

function isAbort(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

async function readJson<T>(response: Response): Promise<T> {
  let payload: unknown = null
  try {
    payload = await response.json()
  } catch {
    if (!response.ok) throw new ApiError(response.status, 'INVALID_RESPONSE', `请求失败（HTTP ${response.status}）`)
  }
  if (!response.ok) {
    const body = payload as { error?: { code?: string; message?: string } } | null
    throw new ApiError(
      response.status,
      body?.error?.code,
      body?.error?.message || `请求失败（HTTP ${response.status}）`,
    )
  }
  return payload as T
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(endpoint(path), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
      cache: 'no-store',
    })
  } catch (error) {
    if (isAbort(error)) throw error
    throw new ApiError(0, 'NETWORK_ERROR', '无法连接派单服务，请确认 Node 服务正在运行后重试。')
  }
  return readJson<T>(response)
}

export function fetchOrders(query: OrdersQuery, signal?: AbortSignal) {
  const search = new URLSearchParams()
  if (query.q) search.set('q', query.q)
  search.set('status', query.status)
  search.set('page', String(query.page))
  search.set('pageSize', String(query.pageSize))
  return get<OrdersResponse>(`api/orders?${search.toString()}`, signal)
}

export function fetchOrder(id: string, signal?: AbortSignal) {
  return get<Order>(`api/orders/${encodeURIComponent(id)}`, signal)
}

export function fetchCouriers(signal?: AbortSignal) {
  return get<CouriersResponse>('api/couriers', signal)
}

export function fetchStats(signal?: AbortSignal) {
  return get<Stats>('api/stats', signal)
}

export async function assignOrders(ids: string[], courierId: string, signal?: AbortSignal): Promise<AssignResponse> {
  let response: Response
  try {
    response = await fetch(endpoint('api/assign'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ids, courierId }),
      signal,
      cache: 'no-store',
    })
  } catch (error) {
    if (isAbort(error)) throw error
    throw new ApiError(0, 'NETWORK_ERROR', '派单请求未能送达服务，请检查连接后重试。')
  }
  return readJson<AssignResponse>(response)
}
