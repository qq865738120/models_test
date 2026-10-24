import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const processes = []
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
function launch(command, args, options = {}) {
  const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'], ...options })
  processes.push(child)
  return child
}
async function waitFor(url) {
  for (let i = 0; i < 100; i++) {
    try { const response = await fetch(url); if (response.ok) return } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error(`等待服务超时：${url}`)
}
async function stop(child) {
  if (!child || child.exitCode !== null) return
  const exited = new Promise((resolve) => child.once('exit', resolve))
  child.kill('SIGTERM')
  await exited
}
async function screenshot(name, width, height) {
  const shot = fileURLToPath(new URL(`./${name}.png`, import.meta.url))
  const profile = fileURLToPath(new URL(`../.runtime/chrome-${name}`, import.meta.url))
  const browser = launch(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-background-networking', '--disable-component-update', '--no-first-run', '--disable-extensions', '--hide-scrollbars', `--user-data-dir=${profile}`, `--window-size=${width},${height}`, '--virtual-time-budget=4000', `--screenshot=${shot}`, 'http://127.0.0.1:5189/'])
  const code = await new Promise((resolve) => browser.once('exit', resolve))
  if (code !== 0) throw new Error(`${name} 截图失败`)
  console.log(`✓ ${name} ${width}×${height}`)
}
try {
  await mkdir(new URL('./', import.meta.url), { recursive: true })
  const api = launch(process.execPath, ['server/index.mjs'], { cwd: new URL('../output/', import.meta.url), env: { ...process.env, PORT: '4174' } })
  const vite = launch('npm', ['run', 'dev', '--', '--port', '5189'], { cwd: root })
  await waitFor('http://127.0.0.1:4174/health')
  await waitFor('http://127.0.0.1:5189/')
  await screenshot('desktop', 1440, 900)
  await screenshot('mobile', 390, 844)
} finally {
  for (const child of processes.reverse()) await stop(child)
}
