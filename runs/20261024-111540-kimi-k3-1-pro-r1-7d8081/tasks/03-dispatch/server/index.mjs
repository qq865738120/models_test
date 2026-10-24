import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export function resolveSeedPath() {
  const packaged = new URL('./data/orders.json', import.meta.url)
  return fileURLToPath(existsSync(packaged) ? packaged : new URL('../materials/orders.json', import.meta.url))
}

const seed = JSON.parse(await readFile(resolveSeedPath(), 'utf8'))
if (!Array.isArray(seed)) throw new Error('订单种子格式无效')
const orders = seed.map((order) => ({ ...order }))
const byId = new Map(orders.map((order) => [order.id, order]))
const couriers = [
  { id: 'P01', name: '鹈鹕一号' },
  { id: 'P02', name: '鹈鹕二号' },
  { id: 'P03', name: '鹈鹕三号' },
]

function json(response, status, value) {
  if (response.writableEnded) return
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  response.end(JSON.stringify(value))
}
function fail(response, status, code, message) {
  json(response, status, { error: { code, message } })
}
function validEncoding(value) {
  try {
    if (/%(?![0-9a-fA-F]{2})/.test(value)) return false
    decodeURIComponent(value)
    return true
  } catch {
    return false
  }
}
function positiveInteger(value, max = Number.MAX_SAFE_INTEGER) {
  return /^(?:0|[1-9]\d*)$/.test(value) && Number(value) >= 1 && Number(value) <= max && Number.isSafeInteger(Number(value))
}
async function readBody(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > 65536) throw new Error('BODY_TOO_LARGE')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

const server = createServer(async (request, response) => {
  try {
    const rawUrl = request.url ?? '/'
    if (!validEncoding(rawUrl)) {
      fail(response, 400, 'INVALID_ARGUMENT', '请求地址包含无效编码')
      return
    }
    const url = new URL(rawUrl, 'http://127.0.0.1')
    const { pathname, searchParams } = url
    const method = request.method ?? 'GET'

    if (pathname === '/health') {
      if (method !== 'GET') return fail(response, 405, 'METHOD_NOT_ALLOWED', '该资源仅支持 GET')
      return json(response, 200, { ok: true })
    }
    if (pathname === '/api/couriers') {
      if (method !== 'GET') return fail(response, 405, 'METHOD_NOT_ALLOWED', '该资源仅支持 GET')
      if ([...searchParams.keys()].length) return fail(response, 400, 'INVALID_ARGUMENT', '不支持查询参数')
      return json(response, 200, { items: couriers })
    }
    if (pathname === '/api/stats') {
      if (method !== 'GET') return fail(response, 405, 'METHOD_NOT_ALLOWED', '该资源仅支持 GET')
      if ([...searchParams.keys()].length) return fail(response, 400, 'INVALID_ARGUMENT', '不支持查询参数')
      let pending = 0, assigned = 0, delivered = 0
      for (const order of orders) {
        if (order.status === 'pending') pending++
        else if (order.status === 'assigned') assigned++
        else if (order.status === 'delivered') delivered++
      }
      return json(response, 200, { all: orders.length, pending, assigned, delivered, updatedAt: new Date().toISOString() })
    }
    if (pathname === '/api/orders') {
      if (method !== 'GET') return fail(response, 405, 'METHOD_NOT_ALLOWED', '该资源仅支持 GET')
      const allowed = new Set(['q', 'status', 'page', 'pageSize'])
      for (const key of searchParams.keys()) {
        if (!allowed.has(key)) return fail(response, 400, 'INVALID_ARGUMENT', `未知查询参数：${key}`)
      }
      for (const key of allowed) {
        if (searchParams.getAll(key).length > 1) return fail(response, 400, 'INVALID_ARGUMENT', `查询参数不可重复：${key}`)
      }
      const q = (searchParams.get('q') ?? '').trim()
      const status = searchParams.get('status') ?? 'all'
      const pageText = searchParams.get('page') ?? '1'
      const sizeText = searchParams.get('pageSize') ?? '20'
      if (!['all', 'pending', 'assigned', 'delivered'].includes(status)) return fail(response, 400, 'INVALID_ARGUMENT', '订单状态无效')
      if (!positiveInteger(pageText)) return fail(response, 400, 'INVALID_ARGUMENT', 'page 必须为十进制正整数')
      if (!positiveInteger(sizeText, 100)) return fail(response, 400, 'INVALID_ARGUMENT', 'pageSize 必须为 1–100 的十进制正整数')
      const page = Number(pageText), pageSize = Number(sizeText), needle = q.toLocaleLowerCase()
      const filtered = orders.filter((order) => (status === 'all' || order.status === status) && (!needle || [order.id, order.customer, order.address].some((value) => String(value).toLocaleLowerCase().includes(needle))))
      const start = (page - 1) * pageSize
      const items = start >= filtered.length ? [] : filtered.slice(start, start + pageSize)
      return json(response, 200, { items, total: filtered.length, page, pageSize })
    }
    if (pathname.startsWith('/api/orders/')) {
      if (method !== 'GET') return fail(response, 405, 'METHOD_NOT_ALLOWED', '该资源仅支持 GET')
      if ([...searchParams.keys()].length) return fail(response, 400, 'INVALID_ARGUMENT', '不支持查询参数')
      const encodedId = pathname.slice('/api/orders/'.length)
      if (!encodedId || encodedId.includes('/')) return fail(response, 404, 'NOT_FOUND', '未找到该资源')
      const id = decodeURIComponent(encodedId)
      const order = byId.get(id)
      if (!order) return fail(response, 404, 'NOT_FOUND', '未找到该订单')
      return json(response, 200, order)
    }
    if (pathname === '/api/assign') {
      if (method !== 'POST') return fail(response, 405, 'METHOD_NOT_ALLOWED', '该资源仅支持 POST')
      if ([...searchParams.keys()].length) return fail(response, 400, 'INVALID_ARGUMENT', '不支持查询参数')
      const contentType = String(request.headers['content-type'] ?? '').split(';')[0].trim().toLowerCase()
      if (contentType !== 'application/json') return fail(response, 400, 'INVALID_ARGUMENT', '请求必须使用 application/json')
      let payload
      try {
        payload = JSON.parse(await readBody(request))
      } catch (error) {
        return fail(response, 400, 'INVALID_ARGUMENT', error?.message === 'BODY_TOO_LARGE' ? '请求体不能超过 64 KiB' : '请求体不是有效 JSON')
      }
      if (!payload || Array.isArray(payload) || typeof payload !== 'object') return fail(response, 400, 'INVALID_ARGUMENT', '请求体必须为 JSON 对象')
      const keys = Object.keys(payload)
      if (keys.length !== 2 || !keys.includes('ids') || !keys.includes('courierId')) return fail(response, 400, 'INVALID_ARGUMENT', '请求只能包含 ids 和 courierId')
      const { ids, courierId } = payload
      if (!Array.isArray(ids) || ids.length < 1 || ids.length > 100 || ids.some((id) => typeof id !== 'string' || !id.trim()) || new Set(ids).size !== ids.length) return fail(response, 400, 'INVALID_ARGUMENT', 'ids 必须为 1–100 个不重复的非空字符串')
      if (!couriers.some((courier) => courier.id === courierId)) return fail(response, 400, 'INVALID_ARGUMENT', '配送员无效')
      const selected = []
      for (const id of ids) {
        const order = byId.get(id)
        if (!order) return fail(response, 404, 'NOT_FOUND', `未找到订单：${id}`)
        selected.push(order)
      }
      if (selected.some((order) => order.status !== 'pending')) return fail(response, 409, 'CONFLICT', '部分订单已被处理，请刷新后重试')
      for (const order of selected) {
        order.status = 'assigned'
        order.courierId = courierId
      }
      return json(response, 200, { items: selected })
    }
    return fail(response, 404, 'NOT_FOUND', '未找到该资源')
  } catch {
    return fail(response, 500, 'INTERNAL_ERROR', '服务暂时不可用，请稍后重试')
  }
})

const port = Number(process.env.PORT ?? '4174')
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT 必须为 0–65535 的整数')
server.listen(port, '127.0.0.1', () => {
  const address = server.address()
  console.log(`DISPATCH_API http://127.0.0.1:${address.port}`)
})
process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))
