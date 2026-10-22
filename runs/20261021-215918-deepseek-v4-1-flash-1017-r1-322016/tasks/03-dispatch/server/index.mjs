import { createServer } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// 固定种子只由服务端读取；进程内存是唯一业务数据源。
export function resolveSeedPath() {
  const packaged = new URL('./data/orders.json', import.meta.url)
  return fileURLToPath(existsSync(packaged) ? packaged : new URL('../materials/orders.json', import.meta.url))
}

const COURIERS = Object.freeze([
  Object.freeze({ id: 'P01', name: '鹈鹕一号' }),
  Object.freeze({ id: 'P02', name: '鹈鹕二号' }),
  Object.freeze({ id: 'P03', name: '鹈鹕三号' }),
])
const COURIER_IDS = new Set(COURIERS.map((courier) => courier.id))
const STATUSES = new Set(['pending', 'assigned', 'delivered'])
const STATUS_FILTERS = new Set(['all', ...STATUSES])
const MAX_BODY_BYTES = 64 * 1024

const seed = JSON.parse(readFileSync(resolveSeedPath(), 'utf8'))
if (!Array.isArray(seed)) throw new Error('订单种子必须为数组')
const orders = seed.map((order) => ({ ...order }))
const orderById = new Map(orders.map((order) => [order.id, order]))

function sendJson(response, status, value, extraHeaders = {}) {
  if (response.writableEnded || response.destroyed) return
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  })
  response.end(JSON.stringify(value))
}

function sendError(response, status, code, message, extraHeaders = {}) {
  sendJson(response, status, { error: { code, message } }, extraHeaders)
}

function invalid(response, message) {
  sendError(response, 400, 'INVALID_ARGUMENT', message)
}

function methodNotAllowed(response, allow) {
  sendError(response, 405, 'METHOD_NOT_ALLOWED', `该路径不支持 ${allow} 以外的方法`, { Allow: allow })
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parsePositiveInt(raw, min, max) {
  if (typeof raw !== 'string' || !/^\d+$/.test(raw)) return null
  const value = Number(raw)
  if (!Number.isSafeInteger(value) || value < min || value > max) return null
  return value
}

function decodeQueryPart(raw) {
  return decodeURIComponent(raw.replaceAll('+', ' '))
}

function parseOrdersQuery(rawQuery) {
  const result = { q: '', status: 'all', page: 1, pageSize: 20 }
  if (!rawQuery) return { ok: true, value: result }
  const seen = new Set()
  for (const pair of rawQuery.split('&')) {
    if (pair === '') return { ok: false, message: '查询参数不能为空' }
    const equals = pair.indexOf('=')
    const rawKey = equals === -1 ? pair : pair.slice(0, equals)
    const rawValue = equals === -1 ? '' : pair.slice(equals + 1)
    let key
    let value
    try {
      key = decodeQueryPart(rawKey)
      value = decodeQueryPart(rawValue)
    } catch {
      return { ok: false, message: '查询参数百分号编码无效' }
    }
    if (seen.has(key)) return { ok: false, message: `查询参数 ${key} 重复` }
    seen.add(key)
    if (!['q', 'status', 'page', 'pageSize'].includes(key)) {
      return { ok: false, message: `未知查询参数 ${key}` }
    }
    if (key === 'q') {
      result.q = value
      continue
    }
    if (value === '') return { ok: false, message: `查询参数 ${key} 不能为空` }
    if (key === 'status') {
      if (!STATUS_FILTERS.has(value)) return { ok: false, message: 'status 只能为 all、pending、assigned 或 delivered' }
      result.status = value
      continue
    }
    if (key === 'page') {
      const page = parsePositiveInt(value, 1, Number.MAX_SAFE_INTEGER)
      if (page === null) return { ok: false, message: 'page 必须为不大于安全整数范围的正整数' }
      result.page = page
      continue
    }
    const pageSize = parsePositiveInt(value, 1, 100)
    if (pageSize === null) return { ok: false, message: 'pageSize 必须为 1–100 的整数' }
    result.pageSize = pageSize
  }
  return { ok: true, value: result }
}

function computeStats() {
  let pending = 0
  let assigned = 0
  let delivered = 0
  for (const order of orders) {
    if (order.status === 'pending') pending += 1
    else if (order.status === 'assigned') assigned += 1
    else if (order.status === 'delivered') delivered += 1
  }
  return { all: orders.length, pending, assigned, delivered, updatedAt: new Date().toISOString() }
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0
    let tooLarge = false
    const chunks = []
    request.on('data', (chunk) => {
      const remaining = MAX_BODY_BYTES - size
      size += chunk.length
      if (remaining > 0) chunks.push(chunk.subarray(0, remaining))
      if (size > MAX_BODY_BYTES) tooLarge = true
    })
    request.on('end', () => {
      if (tooLarge) resolve({ ok: false, tooLarge: true, text: '' })
      else resolve({ ok: true, tooLarge: false, text: Buffer.concat(chunks).toString('utf8') })
    })
    request.on('error', reject)
  })
}

async function handleAssign(request, response) {
  const contentType = String(request.headers['content-type'] ?? '').split(';')[0].trim().toLowerCase()
  if (contentType !== 'application/json') {
    invalid(response, 'Content-Type 必须为 application/json')
    return
  }
  const body = await readRequestBody(request)
  if (!body.ok) {
    invalid(response, `请求体不能超过 ${MAX_BODY_BYTES / 1024} KiB`)
    return
  }
  let payload
  try {
    payload = JSON.parse(body.text)
  } catch {
    invalid(response, '请求体不是合法 JSON')
    return
  }
  if (!isPlainObject(payload)) {
    invalid(response, '请求体必须为 JSON 对象')
    return
  }
  const keys = Object.keys(payload)
  if (keys.some((key) => key !== 'ids' && key !== 'courierId') || !keys.includes('ids') || !keys.includes('courierId')) {
    invalid(response, '请求体只能包含 ids 与 courierId 两个字段')
    return
  }
  const { ids, courierId } = payload
  if (!Array.isArray(ids) || ids.length < 1 || ids.length > 100) {
    invalid(response, 'ids 必须为 1–100 个订单编号组成的数组')
    return
  }
  if (ids.some((id) => typeof id !== 'string' || id.length === 0 || id.trim().length === 0)) {
    invalid(response, 'ids 中每个订单编号都必须为非空字符串')
    return
  }
  if (new Set(ids).size !== ids.length) {
    invalid(response, 'ids 不能包含重复的订单编号')
    return
  }
  if (typeof courierId !== 'string' || !COURIER_IDS.has(courierId)) {
    invalid(response, 'courierId 只能为 P01、P02 或 P03')
    return
  }

  // 先完成整批校验，再同步提交；事件循环内原子执行，失败不修改任何订单。
  for (const id of ids) {
    if (!orderById.has(id)) {
      sendError(response, 404, 'NOT_FOUND', `订单 ${id} 不存在`)
      return
    }
  }
  for (const id of ids) {
    if (orderById.get(id).status !== 'pending') {
      sendError(response, 409, 'CONFLICT', `订单 ${id} 当前不是待派单状态，请刷新后重试`)
      return
    }
  }
  const items = ids.map((id) => {
    const order = orderById.get(id)
    order.status = 'assigned'
    order.courierId = courierId
    return order
  })
  sendJson(response, 200, { items })
}

async function route(request, response) {
  let url
  try {
    url = new URL(request.url ?? '/', 'http://127.0.0.1')
  } catch {
    invalid(response, '无效请求地址')
    return
  }
  let pathname
  try {
    pathname = decodeURIComponent(url.pathname)
  } catch {
    invalid(response, '路径百分号编码无效')
    return
  }
  const method = request.method ?? 'GET'
  const rawQuery = url.search.startsWith('?') ? url.search.slice(1) : ''

  if (pathname === '/health') {
    if (method !== 'GET') return methodNotAllowed(response, 'GET')
    sendJson(response, 200, { ok: true })
    return
  }
  if (pathname === '/api/orders') {
    if (method !== 'GET') return methodNotAllowed(response, 'GET')
    const parsed = parseOrdersQuery(rawQuery)
    if (!parsed.ok) {
      invalid(response, parsed.message)
      return
    }
    const { q, status, page, pageSize } = parsed.value
    const needle = q.trim().toLowerCase()
    const matched = needle
      ? orders.filter((order) =>
          order.id.toLowerCase().includes(needle) ||
          order.customer.toLowerCase().includes(needle) ||
          order.address.toLowerCase().includes(needle),
        )
      : orders
    const filtered = status === 'all' ? matched : matched.filter((order) => order.status === status)
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)
    sendJson(response, 200, { items, total: filtered.length, page, pageSize })
    return
  }
  if (pathname.startsWith('/api/orders/')) {
    if (method !== 'GET') return methodNotAllowed(response, 'GET')
    const id = pathname.slice('/api/orders/'.length)
    if (!id || id.includes('/')) {
      sendError(response, 404, 'NOT_FOUND', '订单不存在')
      return
    }
    const order = orderById.get(id)
    if (!order) {
      sendError(response, 404, 'NOT_FOUND', `订单 ${id} 不存在`)
      return
    }
    sendJson(response, 200, order)
    return
  }
  if (pathname === '/api/couriers') {
    if (method !== 'GET') return methodNotAllowed(response, 'GET')
    sendJson(response, 200, { items: COURIERS })
    return
  }
  if (pathname === '/api/stats') {
    if (method !== 'GET') return methodNotAllowed(response, 'GET')
    sendJson(response, 200, computeStats())
    return
  }
  if (pathname === '/api/assign') {
    if (method !== 'POST') return methodNotAllowed(response, 'POST')
    await handleAssign(request, response)
    return
  }
  sendError(response, 404, 'NOT_FOUND', '接口路径不存在')
}

const server = createServer((request, response) => {
  route(request, response).catch(() => {
    if (!response.writableEnded) {
      sendError(response, 500, 'INTERNAL_ERROR', '服务处理请求时发生内部错误')
    }
  })
})

const port = Number(process.env.PORT ?? '4174')
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT 必须为 0–65535 的整数')
server.listen(port, '127.0.0.1', () => {
  const address = server.address()
  console.log(`DISPATCH_API http://127.0.0.1:${address.port}`)
})
process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))
