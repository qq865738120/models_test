import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchCouriers, fetchOrders, fetchStats } from './api'
import type { Courier, Order, OrdersQuery, Stats } from './types'

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

function messageOf(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback
}

export interface OrdersState {
  items: Order[]
  total: number
  page: number
  pageSize: number
  loading: boolean
  error: string | null
  loaded: boolean
  viewKey: string
}

export function useOrdersData(query: OrdersQuery) {
  const [nonce, setNonce] = useState(0)
  const [state, setState] = useState<OrdersState>({
    items: [],
    total: 0,
    page: query.page,
    pageSize: query.pageSize,
    loading: true,
    error: null,
    loaded: false,
    viewKey: '',
  })
  const sequence = useRef(0)

  useEffect(() => {
    const requestId = sequence.current + 1
    sequence.current = requestId
    const controller = new AbortController()
    const viewKey = `${query.q}|${query.status}|${query.page}|${query.pageSize}`
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
      page: query.page,
      pageSize: query.pageSize,
      viewKey,
      items: previous.viewKey === viewKey ? previous.items : [],
      total: previous.viewKey === viewKey ? previous.total : 0,
    }))
    fetchOrders(query, controller.signal)
      .then((data) => {
        if (sequence.current !== requestId) return
        setState({
          items: data.items,
          total: data.total,
          page: data.page,
          pageSize: data.pageSize,
          loading: false,
          error: null,
          loaded: true,
          viewKey,
        })
      })
      .catch((error: unknown) => {
        if (sequence.current !== requestId || isAbortError(error)) return
        setState((previous) => ({
          ...previous,
          loading: false,
          error: messageOf(error, '订单加载失败，请重试。'),
        }))
      })
    return () => controller.abort()
  }, [query.q, query.status, query.page, query.pageSize, nonce])

  const reload = useCallback(() => setNonce((value) => value + 1), [])
  return { ...state, reload }
}

export interface StatsState {
  data: Stats | null
  loading: boolean
  error: string | null
}

export function useStatsData() {
  const [nonce, setNonce] = useState(0)
  const [state, setState] = useState<StatsState>({ data: null, loading: true, error: null })
  const sequence = useRef(0)

  useEffect(() => {
    const requestId = sequence.current + 1
    sequence.current = requestId
    const controller = new AbortController()
    setState((previous) => ({ ...previous, loading: true, error: null }))
    fetchStats(controller.signal)
      .then((data) => {
        if (sequence.current !== requestId) return
        setState({ data, loading: false, error: null })
      })
      .catch((error: unknown) => {
        if (sequence.current !== requestId || isAbortError(error)) return
        setState((previous) => ({
          ...previous,
          loading: false,
          error: messageOf(error, '统计数据加载失败，请重试。'),
        }))
      })
    return () => controller.abort()
  }, [nonce])

  const reload = useCallback(() => setNonce((value) => value + 1), [])
  return { ...state, reload }
}

export interface CouriersState {
  items: Courier[]
  loading: boolean
  error: string | null
}

export function useCouriersData() {
  const [nonce, setNonce] = useState(0)
  const [state, setState] = useState<CouriersState>({ items: [], loading: true, error: null })
  const sequence = useRef(0)

  useEffect(() => {
    const requestId = sequence.current + 1
    sequence.current = requestId
    const controller = new AbortController()
    setState((previous) => ({ ...previous, loading: true, error: null }))
    fetchCouriers(controller.signal)
      .then((data) => {
        if (sequence.current !== requestId) return
        setState({ items: data.items, loading: false, error: null })
      })
      .catch((error: unknown) => {
        if (sequence.current !== requestId || isAbortError(error)) return
        setState((previous) => ({
          ...previous,
          loading: false,
          error: messageOf(error, '配送员列表加载失败，请重试。'),
        }))
      })
    return () => controller.abort()
  }, [nonce])

  const reload = useCallback(() => setNonce((value) => value + 1), [])
  return { ...state, reload }
}
