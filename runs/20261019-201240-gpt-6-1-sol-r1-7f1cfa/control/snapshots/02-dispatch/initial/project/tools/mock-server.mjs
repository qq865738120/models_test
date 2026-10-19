import http from 'node:http'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
const dataURL = new URL('../materials/orders.json', import.meta.url)
let orders = JSON.parse(fs.readFileSync(dataURL, 'utf8'))
let control = { delays: {}, failNextQuery: false, failNextAssign: false }
const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' })
  res.end(JSON.stringify(body))
}
const body = async req => {
  let text = ''
  for await (const part of req) {
    text += part
    if (text.length > 65536) throw new Error('请求体过大')
  }
  return JSON.parse(text || '{}')
}
export const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1')
    if (req.method === 'OPTIONS') return send(res, 204, null)
    if (req.method === 'POST' && url.pathname === '/__control') {
      const next = await body(req)
      if (next.reset) {
        orders = JSON.parse(fs.readFileSync(dataURL, 'utf8'))
        control = { delays: {}, failNextQuery: false, failNextAssign: false }
      }
      for (const key of ['delays', 'failNextQuery', 'failNextAssign']) {
        if (key in next) control[key] = next[key]
      }
      return send(res, 200, { ok: true })
    }
    if (req.method === 'GET' && url.pathname === '/api/orders') {
      const q = (url.searchParams.get('q') || '').trim().toLowerCase()
      const status = url.searchParams.get('status') || 'all'
      const page = Number(url.searchParams.get('page') || 1)
      const pageSize = Number(url.searchParams.get('pageSize') || 20)
      if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100 || !['all','pending','assigned','delivered'].includes(status))
        return send(res, 400, { error: '参数不合法' })
      const fail = control.failNextQuery
      control.failNextQuery = false
      // 请求到达时即捕获数据，便于复现旧请求晚返回。
      const rows = orders.filter(x => (status === 'all' || x.status === status) &&
        [x.id, x.customer, x.address].some(v => v.toLowerCase().includes(q)))
      const result = { items: rows.slice((page - 1)*pageSize, page*pageSize), total: rows.length, page, pageSize }
      await new Promise(resolve => setTimeout(resolve, control.delays[q] ?? 180))
      return send(res, fail ? 503 : 200, fail ? { error: '模拟查询失败' } : result)
    }
    if (req.method === 'GET' && url.pathname.startsWith('/api/orders/')) {
      const row = orders.find(x => x.id === decodeURIComponent(url.pathname.slice(12)))
      return send(res, row ? 200 : 404, row || { error: '订单不存在' })
    }
    if (req.method === 'POST' && url.pathname === '/api/assign') {
      const { ids, courierId } = await body(req)
      if (!Array.isArray(ids) || !ids.length || ids.length > 100 || ids.some(id => typeof id !== 'string') || !['P01','P02','P03'].includes(courierId))
        return send(res, 400, { error: '需要有效 ids 和 courierId' })
      const selected = orders.filter(x => ids.includes(x.id))
      if (selected.length !== new Set(ids).size || selected.some(x => x.status !== 'pending'))
        return send(res, 409, { error: '只能派送存在且待派单的订单；整批未修改' })
      const fail = control.failNextAssign
      control.failNextAssign = false
      await new Promise(resolve => setTimeout(resolve, 350))
      if (fail) return send(res, 503, { error: '模拟派单失败；服务端未修改' })
      // 等待后复查，避免并发请求覆盖已被其他请求派出的订单。
      if (selected.some(x => x.status !== 'pending')) return send(res, 409, { error: '订单状态已变；整批未修改' })
      selected.forEach(x => { x.status = 'assigned'; x.courierId = courierId })
      return send(res, 200, { items: selected })
    }
    if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true, count: orders.length })
    send(res, 404, { error: '接口不存在' })
  } catch (err) { send(res, 400, { error: String(err.message) }) }
})
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  server.listen(Number(process.env.MOCK_PORT || 4174), '127.0.0.1', () => console.log('Mock: http://127.0.0.1:' + server.address().port))
}
