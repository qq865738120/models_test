import { useCallback, useEffect, useRef, useState } from 'react'
export type OrderStatus = 'pending' | 'assigned' | 'delivered'
export type Filter = 'all' | OrderStatus
export interface Order { id: string; customer: string; address: string; status: OrderStatus; courierId: string | null; priority: string; createdAt: string; contents: string; note: string }
export interface Courier { id: string; name: string }
export interface Stats { all: number; pending: number; assigned: number; delivered: number; updatedAt: string }
export interface OrderList { items: Order[]; total: number; page: number; pageSize: number }
export class ApiError extends Error { constructor(message: string, public status = 0) { super(message) } }
export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response
  try { response = await fetch(new URL(path, document.baseURI), { cache: 'no-store', ...options }) }
  catch (error) { if (error instanceof DOMException && error.name === 'AbortError') throw error; throw new ApiError('无法连接服务，请检查连接后重试。') }
  let data
  try { data = await response.json() } catch { throw new ApiError('服务返回异常，请稍后重试。', response.status) }
  if (!response.ok) throw new ApiError(data?.error?.message || '请求失败，请稍后重试。', response.status)
  return data as T
}
export function useResource<T>(path: string | null) {
  const [revision, setRevision] = useState(0)
  const key = `${path}|${revision}`
  const latest = useRef(key)
  latest.current = key
  const sequence = useRef(0)
  const [state, setState] = useState<{ key: string; data?: T; loading: boolean; error?: string }>({ key: '', loading: true })
  useEffect(() => {
    const current = ++sequence.current
    const abort = new AbortController()
    if (!path) { setState({ key, loading: false }); return () => abort.abort() }
    setState({ key, loading: true })
    request<T>(path, { signal: abort.signal }).then(data => {
      if (current === sequence.current && latest.current === key && !abort.signal.aborted) setState({ key, data, loading: false })
    }).catch(error => {
      if (current === sequence.current && latest.current === key && !abort.signal.aborted) setState({ key, error: error.message, loading: false })
    })
    return () => { abort.abort(); sequence.current++ }
  }, [key, path])
  const reload = useCallback(() => setRevision(value => value + 1), [])
  return { ...(state.key === key ? state : { loading: !!path, data: undefined, error: undefined }), reload }
}
