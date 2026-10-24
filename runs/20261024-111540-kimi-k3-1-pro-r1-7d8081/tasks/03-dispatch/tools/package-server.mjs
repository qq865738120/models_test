import { cp, copyFile, lstat, mkdir, readdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const source = path.join(root, 'server')
const output = path.join(root, 'output')
const destination = path.join(output, 'server')
const seed = path.join(root, 'materials', 'orders.json')

async function rejectLinks(filename) {
  const info = await lstat(filename)
  if (info.isSymbolicLink()) throw new Error(`不能打包符号链接：${filename}`)
  if (info.isDirectory()) {
    for (const entry of await readdir(filename)) await rejectLinks(path.join(filename, entry))
  } else if (!info.isFile()) {
    throw new Error(`只能打包普通文件：${filename}`)
  }
}

await rejectLinks(source)
if ((await lstat(path.join(root, 'materials'))).isSymbolicLink()) throw new Error('materials 不能是符号链接')
await rejectLinks(seed)
await mkdir(output, { recursive: true })
if ((await lstat(output)).isSymbolicLink()) throw new Error('output 不能是符号链接')
await rm(destination, { recursive: true, force: true })
await cp(source, destination, { recursive: true, dereference: false })
await mkdir(path.join(destination, 'data'), { recursive: true })
await copyFile(seed, path.join(destination, 'data', 'orders.json'))
console.log('Node 服务与固定种子已打包到 output/server/；请按 API 契约实际验证。')
