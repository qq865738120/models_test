import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

const port = 4191
const base = `http://127.0.0.1:${port}`
let child
async function start() {
  child = spawn(process.execPath, ['server/index.mjs'], { cwd: new URL('../output/', import.meta.url), env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'] })
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`${base}/health`); if (r.ok) return } catch {}
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  throw new Error('服务启动超时')
}
async function stop() {
  if (!child || child.exitCode !== null) return
  const exited = new Promise((resolve) => child.once('exit', resolve))
  child.kill('SIGTERM')
  await exited
}
async function request(path, options) {
  const response = await fetch(base + path, options)
  return { status: response.status, body: await response.json(), type: response.headers.get('content-type') }
}
const post = (body) => request('/api/assign', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
let passed = 0
function ok(name) { passed++; console.log(`✓ ${name}`) }
try {
  await start()
  let r = await request('/health'); assert.deepEqual(r.body, { ok: true }); ok('健康检查')
  r = await request('/api/orders?status=pending&page=2&pageSize=20'); assert.equal(r.status, 200); assert.equal(r.body.total, 5000); assert.equal(r.body.items.length, 20); assert.equal(r.body.page, 2); assert.equal(r.body.items[0].id, 'PD-00041'); ok('状态筛选与真实分页')
  r = await request('/api/orders?q=%20pd-00001%20&pageSize=100'); assert.equal(r.body.total, 1); assert.equal(r.body.items[0].customer, '客户00001'); ok('忽略大小写及首尾空白的搜索')
  r = await request('/api/orders?q=no-such-order&page=99'); assert.equal(r.body.total, 0); assert.deepEqual(r.body.items, []); assert.equal(r.body.page, 99); ok('空结果与超范围合法页')
  for (const path of ['/api/orders?page=0', '/api/orders?page=1.5', '/api/orders?pageSize=101', '/api/orders?status=', '/api/orders?status=other', '/api/orders?page=1&page=2', '/api/orders?unknown=1']) { r = await request(path); assert.equal(r.status, 400, path); assert.equal(r.body.error.code, 'INVALID_ARGUMENT') } ok('查询参数与重复参数校验')
  r = await request('/api/orders/PD-NONE'); assert.equal(r.status, 404); assert.equal(r.body.error.code, 'NOT_FOUND')
  r = await request('/api/couriers', { method: 'POST' }); assert.equal(r.status, 405); assert.equal(r.body.error.code, 'METHOD_NOT_ALLOWED'); ok('详情 404 与方法 405')
  r = await request('/api/couriers'); assert.deepEqual(r.body.items.map((x) => x.id), ['P01', 'P02', 'P03'])
  r = await request('/api/stats'); assert.equal(r.body.all, 10000); assert.equal(r.body.pending + r.body.assigned + r.body.delivered, 10000); assert.ok(!Number.isNaN(Date.parse(r.body.updatedAt))); ok('配送员与同快照统计')
  for (const body of [{ ids: [], courierId: 'P01' }, { ids: ['PD-00001', 'PD-00001'], courierId: 'P01' }, { ids: ['PD-00001'], courierId: 'BAD' }, { ids: ['PD-00001'], courierId: 'P01', extra: 1 }, { ids: 'PD-00001', courierId: 'P01' }]) { r = await post(body); assert.equal(r.status, 400) }
  r = await request('/api/assign', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: '{}' }); assert.equal(r.status, 400); ok('派单形状、配送员、重复 ID 与 Content-Type 校验')
  r = await post({ ids: ['PD-00001', 'PD-NONE'], courierId: 'P01' }); assert.equal(r.status, 404)
  let d = await request('/api/orders/PD-00001'); assert.equal(d.body.status, 'pending'); ok('未知订单导致整批原子失败')
  r = await post({ ids: ['PD-00001', 'PD-00002'], courierId: 'P01' }); assert.equal(r.status, 409)
  d = await request('/api/orders/PD-00001'); assert.equal(d.body.status, 'pending'); ok('状态冲突导致整批原子失败')
  r = await post({ ids: ['PD-00001', 'PD-00004'], courierId: 'P02' }); assert.equal(r.status, 200); assert.deepEqual(r.body.items.map((x) => [x.id, x.status, x.courierId]), [['PD-00001','assigned','P02'],['PD-00004','assigned','P02']]); ok('成功批量派单并按请求顺序返回')
  const [a, b] = await Promise.all([post({ ids: ['PD-00008'], courierId: 'P01' }), post({ ids: ['PD-00008'], courierId: 'P03' })]); assert.deepEqual([a.status,b.status].sort(), [200,409]); d = await request('/api/orders/PD-00008'); assert.equal(d.body.status, 'assigned'); ok('并发同一订单仅一个请求成功')
  r = await request('/api/stats'); assert.equal(r.body.pending, 4997); assert.equal(r.body.assigned, 2503); ok('派单后统计同步')
  await stop(); await start(); d = await request('/api/orders/PD-00001'); assert.equal(d.body.status, 'pending'); assert.equal(d.body.courierId, null); ok('服务重启恢复固定种子')
  console.log(`\n${passed} 组接口验证全部通过。`)
} finally { await stop() }
