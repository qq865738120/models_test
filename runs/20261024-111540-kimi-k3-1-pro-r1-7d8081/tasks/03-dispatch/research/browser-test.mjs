import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const children = []
function launch(command, args, options = {}) { const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'], ...options }); children.push(child); return child }
async function stop(child) { if (!child || child.exitCode !== null) return; const done = new Promise((r) => child.once('exit', r)); child.kill('SIGTERM'); await done }
async function waitFetch(url) { for (let i = 0; i < 100; i++) { try { const r = await fetch(url); if (r.ok) return await r.json().catch(() => null) } catch {}; await new Promise((r) => setTimeout(r, 100)) } throw new Error(`等待超时 ${url}`) }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let socket, serial = 0
const pending = new Map()
function cdp(method, params = {}) { return new Promise((resolve, reject) => { const id = ++serial; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })) }) }
async function evaluate(expression) { const result = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.text); return result.result.value }
async function waitJs(expression) { for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await sleep(100) } throw new Error(`页面等待超时：${expression}`) }
async function clickText(selector, text) { const clicked = await evaluate(`(()=>{const el=[...document.querySelectorAll(${JSON.stringify(selector)})].find(x=>x.textContent.includes(${JSON.stringify(text)}));if(!el)return false;el.click();return true})()`); assert.ok(clicked, `找不到控件 ${text}`) }
async function shot(name) { const result = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); await writeFile(new URL(`./${name}.png`, import.meta.url), Buffer.from(result.data, 'base64')) }
try {
  launch(process.execPath, ['server/index.mjs'], { cwd: new URL('../output/', import.meta.url), env: { ...process.env, PORT: '4174' } })
  launch(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5189', '--strictPort'], { cwd: root })
  await waitFetch('http://127.0.0.1:4174/health'); await waitFetch('http://127.0.0.1:5189/')
  launch('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-background-networking', '--no-first-run', `--user-data-dir=${fileURLToPath(new URL('../.runtime/chrome-cdp', import.meta.url))}`, '--remote-debugging-port=9229', '--window-size=1440,900', 'about:blank'])
  const targets = await waitFetch('http://127.0.0.1:9229/json/list')
  socket = new WebSocket(targets.find((x) => x.type === 'page').webSocketDebuggerUrl)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  socket.onmessage = (event) => { const message = JSON.parse(event.data); if (message.id && pending.has(message.id)) { const item = pending.get(message.id); pending.delete(message.id); message.error ? item.reject(message.error) : item.resolve(message.result) } }
  await cdp('Page.enable'); await cdp('Runtime.enable')
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await cdp('Page.navigate', { url: 'http://127.0.0.1:5189/' })
  await waitJs(`document.querySelectorAll('tbody tr').length===20 && document.body.innerText.includes('10,000')`)
  assert.equal(await evaluate(`document.querySelectorAll('tbody tr').length`), 20); console.log('✓ 首屏仅渲染当前 20 条订单')
  await shot('desktop')
  await evaluate(`document.querySelector('tbody input[type=checkbox]:not([disabled])').click()`)
  await clickText('button', '批量派单')
  await waitJs(`document.querySelector('[role=dialog]')?.innerText.includes('1')`)
  assert.ok(await evaluate(`document.querySelector('[role=dialog]').innerText.includes('确认批量派单')`))
  await evaluate(`(()=>{const s=document.querySelector('#courier-select');const set=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;set.call(s,'P01');s.dispatchEvent(new Event('change',{bubbles:true}))})()`)
  await clickText('[role=dialog] button', '确认派单')
  await waitJs(`document.querySelector('.toast')?.innerText.includes('已将 1 笔订单')`)
  await waitJs(`document.querySelector('tbody')?.innerText.includes('鹈鹕一号')`)
  console.log('✓ 真实选择、确认派单、列表刷新与成功反馈')
  await clickText('button', 'PD-00001')
  await waitJs(`document.querySelector('.drawer')?.innerText.includes('包裹与备注')`)
  assert.ok(await evaluate(`document.querySelector('.drawer').innerText.includes('开发板')`))
  await clickText('.drawer button', '关闭详情')
  console.log('✓ 详情抽屉读取完整订单并可关闭')
  await clickText('.sidebar nav button', '运行报表')
  await waitJs(`document.querySelector('.report-main')?.innerText.includes('4,999')`)
  assert.ok(await evaluate(`document.querySelector('.snapshot-card').innerText.includes('快照时间')`))
  console.log('✓ 报表展示派单后的同快照统计与时间')
  await clickText('.sidebar nav button', '设置')
  await evaluate(`(()=>{const s=document.querySelector('#page-size');const set=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;set.call(s,'50');s.dispatchEvent(new Event('change',{bubbles:true}))})()`)
  await clickText('button', '保存并查看订单')
  await waitJs(`document.querySelectorAll('tbody tr').length===50`)
  console.log('✓ 设置保存后返回第一页并应用 50 条')
  await clickText('.sidebar nav button', '配送员')
  await waitJs(`document.querySelectorAll('.courier-card').length===3`)
  await clickText('.courier-card button', '为 TA 派单')
  await waitJs(`document.querySelectorAll('tbody tr').length===50 && document.querySelector('.status-tabs .active')?.innerText==='待派单'`)
  await evaluate(`document.querySelector('tbody input[type=checkbox]:not([disabled])').click()`)
  await clickText('button', '批量派单')
  assert.equal(await evaluate(`document.querySelector('#courier-select').value`), 'P01')
  await clickText('[role=dialog] button', '取消')
  assert.ok(await evaluate(`document.querySelector('.selection-bar').innerText.includes('1')`))
  console.log('✓ 配送员预选、待派第一页与取消保留选择')
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  await cdp('Page.navigate', { url: 'http://127.0.0.1:5189/' })
  await waitJs(`document.querySelectorAll('tbody tr').length===20 && document.body.innerText.includes('10,000')`)
  const dimensions = await evaluate(`({inner:innerWidth,scroll:document.documentElement.scrollWidth,table:document.querySelector('.table-scroll').clientWidth})`)
  assert.ok(dimensions.scroll <= dimensions.inner, JSON.stringify(dimensions)); await shot('mobile')
  console.log(`✓ 390×844 移动视口无整页横向溢出（${dimensions.scroll}px）`)
  console.log('\n7 组浏览器真实交互验证全部通过。')
} finally { if (socket) socket.close(); for (const child of children.reverse()) await stop(child) }
