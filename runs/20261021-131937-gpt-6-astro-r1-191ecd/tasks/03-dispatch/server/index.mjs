import { createServer } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export function resolveSeedPath() {
  const packaged = new URL('./data/orders.json', import.meta.url)
  return fileURLToPath(existsSync(packaged) ? packaged : new URL('../materials/orders.json', import.meta.url))
}

// The process is the single source of truth. No writes are made to the seed.
const orders = JSON.parse(readFileSync(resolveSeedPath(), 'utf8')).sort((a, b) => a.id.localeCompare(b.id))
const byId = new Map(orders.map(order => [order.id, order]))
const couriers = [{ id: 'P01', name: '鹈鹕一号' }, { id: 'P02', name: '鹈鹕二号' }, { id: 'P03', name: '鹈鹕三号' }]
const courierIds = new Set(couriers.map(courier => courier.id))
const statuses = new Set(['all', 'pending', 'assigned', 'delivered'])
const codes = { 400: 'INVALID_ARGUMENT', 404: 'NOT_FOUND', 405: 'METHOD_NOT_ALLOWED', 409: 'CONFLICT', 500: 'INTERNAL_ERROR' }
class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status }
}
function json(response, status, value) {
  if (response.destroyed || response.writableEnded) return
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  response.end(JSON.stringify(value))
}
function fail(status, message) { throw new HttpError(status, message) }
function integer(value, fallback, max = Number.MAX_SAFE_INTEGER) {
  if (value === null) return fallback
  if (!/^[0-9]+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1 || Number(value) > max) {
    fail(400, `分页参数必须为 1–${max} 范围内的十进制整数`)
  }
  return Number(value)
}
async function body(request) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? '')) fail(400, '请求必须使用 application/json')
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    // Continue draining an oversized body so the connection can still receive its JSON error.
    if (size <= 65536) chunks.push(chunk)
  }
  if (size > 65536) fail(400, '请求体不能超过 64 KiB')
  try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks))) }
  catch { fail(400, '请求体不是有效的 JSON') }
}
function list(params) {
  const names = new Set(['q', 'status', 'page', 'pageSize'])
  for (const key of params.keys()) {
    if (!names.has(key) || params.getAll(key).length !== 1) fail(400, '查询包含未知或重复参数')
  }
  const q = (params.get('q') ?? '').trim().toLocaleLowerCase()
  const status = params.get('status') ?? 'all'
  if (!statuses.has(status)) fail(400, '状态必须为 all、pending、assigned 或 delivered')
  const page = integer(params.get('page'), 1)
  const pageSize = integer(params.get('pageSize'), 20, 100)
  const matches = orders.filter(order => (status === 'all' || order.status === status) && (!q || [order.id, order.customer, order.address].some(value => value.toLocaleLowerCase().includes(q))))
  const start = (page - 1) * pageSize
  return { items: matches.slice(start, start + pageSize), total: matches.length, page, pageSize }
}
function stats() {
  const value = { all: orders.length, pending: 0, assigned: 0, delivered: 0 }
  for (const order of orders) value[order.status]++
  return { ...value, updatedAt: new Date().toISOString() }
}
function assign(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length !== 2 || !Object.hasOwn(value, 'ids') || !Object.hasOwn(value, 'courierId')) fail(400, '请求必须且只能包含 ids 和 courierId')
  const { ids, courierId } = value
  if (!Array.isArray(ids) || ids.length < 1 || ids.length > 100 || ids.some(id => typeof id !== 'string' || !id.trim()) || new Set(ids).size !== ids.length) fail(400, '请选择 1–100 个不重复的有效订单编号')
  if (typeof courierId !== 'string' || !courierIds.has(courierId)) fail(400, '请选择有效配送员')
  const selected = ids.map(id => byId.get(id))
  if (selected.some(order => !order)) fail(404, '部分订单不存在，整批派单未执行')
  if (selected.some(order => order.status !== 'pending')) fail(409, '部分订单已被派送，整批派单未执行。请刷新订单后重新选择')
  // Validation and commit are synchronous, with no await between them; concurrent requests cannot interleave.
  for (const order of selected) { order.status = 'assigned'; order.courierId = courierId }
  return { items: selected }
}

const server = createServer(async (request, response) => {
  try {
    const raw = request.url ?? '/'
    try { decodeURIComponent(raw) } catch { fail(400, '请求地址包含无效编码') }
    let url
    try { url = new URL(raw, 'http://127.0.0.1') } catch { fail(400, '请求地址无效') }
    const pathname = decodeURIComponent(url.pathname)
    const detail = pathname.match(/^\/api\/orders\/([^/]+)$/)
    const known = ['/health', '/api/orders', '/api/couriers', '/api/stats', '/api/assign'].includes(pathname) || detail
    if (!known) fail(404, '请求的资源不存在')
    const method = pathname === '/api/assign' ? 'POST' : 'GET'
    if (request.method !== method) { response.setHeader('Allow', method); fail(405, '该资源不支持此请求方法') }
    if (pathname === '/health') return json(response, 200, { ok: true })
    if (pathname === '/api/orders') return json(response, 200, list(url.searchParams))
    if (pathname === '/api/couriers') return json(response, 200, { items: couriers })
    if (pathname === '/api/stats') return json(response, 200, stats())
    if (detail) {
      const order = byId.get(detail[1])
      if (!order) fail(404, '此订单不存在')
      return json(response, 200, order)
    }
    if (pathname === '/api/assign') return json(response, 200, assign(await body(request)))
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500
    json(response, status, { error: { code: codes[status], message: status === 500 ? '服务暂时无法处理请求，请重试' : error.message } })
  }
})
server.requestTimeout = 30000
const port = Number(process.env.PORT ?? '4174')
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT 必须为 0–65535 的整数')
server.listen(port, '127.0.0.1', () => console.log(`DISPATCH_API http://127.0.0.1:${server.address().port}`))
process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))
