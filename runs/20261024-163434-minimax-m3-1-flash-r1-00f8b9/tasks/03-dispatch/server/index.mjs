import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// 只提供路径定位，不读取订单或实现业务；请按 materials/API.md 完成接口。
export function resolveSeedPath() {
  const packaged = new URL('./data/orders.json', import.meta.url)
  return fileURLToPath(existsSync(packaged) ? packaged : new URL('../materials/orders.json', import.meta.url))
}

function json(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  response.end(JSON.stringify(value))
}

const server = createServer((request, response) => {
  let pathname
  try {
    pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname
  } catch {
    json(response, 400, { error: { code: 'INVALID_ARGUMENT', message: '无效请求地址' } })
    return
  }
  if (request.method === 'GET' && pathname === '/health') {
    json(response, 200, { ok: true })
    return
  }
  // TODO: 在这里自行实现全部 HTTP 业务、校验、内存状态与错误处理。
  json(response, 501, { error: { code: 'NOT_IMPLEMENTED', message: '起始工程尚未实现业务接口，请阅读 materials/API.md' } })
})

const port = Number(process.env.PORT ?? '4174')
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT 必须为 0–65535 的整数')
server.listen(port, '127.0.0.1', () => {
  const address = server.address()
  console.log(`DISPATCH_API http://127.0.0.1:${address.port}`)
})
process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))
