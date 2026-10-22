import * as THREE from 'three'
import { CRATE_INFO, CrateColor } from './config'

let seed = 20261021
export function rand() {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

function canvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  return { c, g: c.getContext('2d')! }
}

function tex(c: HTMLCanvasElement, repeat?: [number, number]) {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(repeat[0], repeat[1])
  }
  return t
}

// ---------------------------------------------------------------- floor
function drawConcrete(g: CanvasRenderingContext2D, w: number, h: number) {
  g.fillStyle = '#78766d'
  g.fillRect(0, 0, w, h)
  for (let i = 0; i < 26000; i++) {
    const v = 92 + Math.floor(rand() * 60)
    g.fillStyle = `rgba(${v},${v - 2},${v - 8},${0.05 + rand() * 0.13})`
    const s = 1 + rand() * 3.2
    g.fillRect(rand() * w, rand() * h, s, s)
  }
  for (let i = 0; i < 26; i++) {
    const x = rand() * w, y = rand() * h, r = 25 + rand() * 130
    const gr = g.createRadialGradient(x, y, 0, x, y, r)
    const dark = rand() > 0.45
    gr.addColorStop(0, dark ? 'rgba(44,43,39,0.17)' : 'rgba(196,192,180,0.10)')
    gr.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = gr
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill()
  }
  // saw-cut expansion joints
  g.strokeStyle = 'rgba(38,37,34,0.42)'
  g.lineWidth = 2
  for (const p of [0.25, 0.5, 0.75]) {
    g.beginPath(); g.moveTo(p * w + 0.5, 0); g.lineTo(p * w + 0.5, h); g.stroke()
    g.beginPath(); g.moveTo(0, p * h + 0.5); g.lineTo(w, p * h + 0.5); g.stroke()
  }
  // hairline cracks
  g.strokeStyle = 'rgba(30,29,27,0.30)'
  for (let i = 0; i < 15; i++) {
    let x = rand() * w, y = rand() * h
    g.lineWidth = 0.6 + rand()
    g.beginPath(); g.moveTo(x, y)
    for (let j = 0; j < 9; j++) {
      x += (rand() - 0.5) * 70; y += (rand() - 0.5) * 70
      g.lineTo(x, y)
    }
    g.stroke()
  }
}

export function floorTexture() {
  const { c, g } = canvas(1024, 1024)
  drawConcrete(g, 1024, 1024)
  return tex(c, [7, 5.5])
}

export function floorBumpTexture() {
  const { c, g } = canvas(512, 512)
  g.fillStyle = '#808080'; g.fillRect(0, 0, 512, 512)
  for (let i = 0; i < 14000; i++) {
    const v = 105 + Math.floor(rand() * 60)
    g.fillStyle = `rgb(${v},${v},${v})`
    g.fillRect(rand() * 512, rand() * 512, 1 + rand() * 2, 1 + rand() * 2)
  }
  const t = tex(c, [7, 5.5])
  t.colorSpace = THREE.NoColorSpace
  return t
}

// ---------------------------------------------------------------- walls
export function wallTexture() {
  const { c, g } = canvas(512, 512)
  const grad = g.createLinearGradient(0, 0, 0, 512)
  grad.addColorStop(0, '#8d9492')
  grad.addColorStop(0.55, '#7e8584')
  grad.addColorStop(1, '#6b7271')
  g.fillStyle = grad; g.fillRect(0, 0, 512, 512)
  // vertical corrugation ribs
  for (let x = 0; x < 512; x += 32) {
    const lg = g.createLinearGradient(x, 0, x + 32, 0)
    lg.addColorStop(0, 'rgba(255,255,255,0.16)')
    lg.addColorStop(0.35, 'rgba(255,255,255,0.03)')
    lg.addColorStop(0.62, 'rgba(0,0,0,0.16)')
    lg.addColorStop(1, 'rgba(0,0,0,0.02)')
    g.fillStyle = lg; g.fillRect(x, 0, 32, 512)
  }
  // scuffs near the base
  for (let i = 0; i < 260; i++) {
    g.fillStyle = `rgba(${30 + rand() * 40},${29 + rand() * 40},${27 + rand() * 40},${rand() * 0.13})`
    g.fillRect(rand() * 512, 400 + rand() * 112, 3 + rand() * 30, 1 + rand() * 5)
  }
  return tex(c, [10, 1])
}

// ---------------------------------------------------------------- wood / crates
function drawGrain(g: CanvasRenderingContext2D, w: number, h: number) {
  g.fillStyle = '#b98c53'; g.fillRect(0, 0, w, h)
  for (let i = 0; i < 70; i++) {
    const y = rand() * h
    g.strokeStyle = `rgba(${80 + rand() * 50},${50 + rand() * 35},${20 + rand() * 25},${0.05 + rand() * 0.16})`
    g.lineWidth = 0.5 + rand() * 2.4
    g.beginPath()
    for (let x = 0; x <= w; x += 16) {
      const yy = y + Math.sin((x / w) * Math.PI * (2 + rand() * 4) + i) * (2 + rand() * 7)
      if (x === 0) g.moveTo(x, yy); else g.lineTo(x, yy)
    }
    g.stroke()
  }
  for (let i = 0; i < 40; i++) {
    const x = rand() * w, y = rand() * h
    g.strokeStyle = 'rgba(84,54,26,0.22)'; g.lineWidth = 1
    g.beginPath(); g.ellipse(x, y, 2 + rand() * 7, 1 + rand() * 2.5, 0, 0, Math.PI * 2); g.stroke()
  }
  // plank seams
  g.strokeStyle = 'rgba(64,42,20,0.35)'; g.lineWidth = 2
  for (let y = 0; y < h; y += h / 5) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke() }
}

export function woodTexture() {
  const { c, g } = canvas(512, 512)
  drawGrain(g, 512, 512)
  return tex(c)
}

export function crateSideTexture(color: CrateColor) {
  const info = CRATE_INFO[color]
  const { c, g } = canvas(512, 512)
  drawGrain(g, 512, 512)
  // painted colour field, slightly inset like a stencilled panel
  g.fillStyle = info.hex
  g.fillRect(34, 76, 444, 330)
  g.strokeStyle = 'rgba(255,255,255,0.82)'; g.lineWidth = 7
  g.strokeRect(48, 90, 416, 302)
  g.setLineDash([16, 10]); g.lineWidth = 2
  g.strokeStyle = 'rgba(255,255,255,0.45)'
  g.strokeRect(62, 104, 388, 274)
  g.setLineDash([])
  g.fillStyle = 'rgba(0,0,0,0.13)'
  for (let i = 0; i < 240; i++) g.fillRect(34 + rand() * 444, 76 + rand() * 330, 1 + rand() * 6, 1 + rand() * 2)
  g.textAlign = 'center'
  g.fillStyle = '#f7f3e6'
  g.font = '800 66px "Helvetica Neue", Arial, sans-serif'
  g.fillText(info.label, 256, 225)
  g.font = '700 43px "PingFang SC", "Microsoft YaHei", sans-serif'
  g.fillText(info.zh + '货箱', 256, 285)
  g.font = '600 25px "Helvetica Neue", Arial, sans-serif'
  g.fillText('PELICAN CARGO · ACADEMY', 256, 340)
  // corner brackets
  g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 5
  const b = 26, l = 54
  for (const [x, y, sx, sy] of [[b, b, 1, 1], [512 - b, b, -1, 1], [b, 512 - b, 1, -1], [512 - b, 512 - b, -1, -1]]) {
    g.beginPath(); g.moveTo(x + sx * l, y); g.lineTo(x, y); g.lineTo(x, y + sy * l); g.stroke()
  }
  g.textAlign = 'left'
  g.fillStyle = 'rgba(30,20,10,0.55)'
  g.font = '700 22px "Helvetica Neue", Arial, sans-serif'
  g.fillText('FL-ACADEMY / 03', 40, 470)
  g.textAlign = 'right'
  g.fillText('1.0 m³ · 240 kg', 472, 470)
  return tex(c)
}

export function crateTopTexture() {
  const { c, g } = canvas(512, 512)
  drawGrain(g, 512, 512)
  g.strokeStyle = 'rgba(50,34,16,0.5)'; g.lineWidth = 4
  g.strokeRect(12, 12, 488, 488)
  g.strokeStyle = 'rgba(50,34,16,0.28)'; g.lineWidth = 2
  for (let x = 0; x < 512; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke() }
  g.fillStyle = 'rgba(38,28,16,0.5)'
  g.font = '700 30px "Helvetica Neue", Arial, sans-serif'
  g.textAlign = 'center'
  g.fillText('PELICAN · FRAGILE', 256, 274)
  return tex(c)
}

export function hazardTexture() {
  const { c, g } = canvas(256, 64)
  g.fillStyle = '#d7a92b'; g.fillRect(0, 0, 256, 64)
  g.fillStyle = '#232629'
  for (let x = -64; x < 256; x += 64) {
    g.beginPath(); g.moveTo(x, 64); g.lineTo(x + 32, 64); g.lineTo(x + 96, 0); g.lineTo(x + 64, 0); g.fill()
  }
  return tex(c, [1, 1])
}

// ---------------------------------------------------------------- signage
export type SignSpec = {
  title: string; sub?: string; zh?: string; bg: string; fg: string; accent?: string
}

export function signTexture(spec: SignSpec, w = 1024, h = 512) {
  const { c, g } = canvas(w, h)
  g.fillStyle = spec.bg; g.fillRect(0, 0, w, h)
  g.strokeStyle = spec.accent ?? spec.fg; g.lineWidth = 14
  g.strokeRect(22, 22, w - 44, h - 44)
  g.strokeStyle = 'rgba(255,255,255,0.16)'; g.lineWidth = 3
  g.strokeRect(44, 44, w - 88, h - 88)
  g.textAlign = 'center'
  g.fillStyle = spec.fg
  g.font = '800 104px "Helvetica Neue", Arial, sans-serif'
  g.fillText(spec.title, w / 2, 196)
  if (spec.zh) {
    g.font = '700 70px "PingFang SC", "Microsoft YaHei", sans-serif'
    g.fillText(spec.zh, w / 2, 292)
  }
  if (spec.sub) {
    g.font = '600 34px "Helvetica Neue", Arial, sans-serif'
    g.fillStyle = 'rgba(255,255,255,0.78)'
    g.fillText(spec.sub, w / 2, 370)
  }
  // arrow strip
  g.fillStyle = spec.accent ?? spec.fg
  g.beginPath(); g.moveTo(w / 2 - 60, h - 82); g.lineTo(w / 2, h - 118); g.lineTo(w / 2 + 60, h - 82)
  g.lineTo(w / 2 + 32, h - 82); g.lineTo(w / 2 + 32, h - 54); g.lineTo(w / 2 - 32, h - 54); g.lineTo(w / 2 - 32, h - 82); g.fill()
  return tex(c)
}

export function bannerTexture() {
  const { c, g } = canvas(2048, 512)
  g.fillStyle = '#12211f'; g.fillRect(0, 0, 2048, 512)
  const grad = g.createLinearGradient(0, 0, 2048, 512)
  grad.addColorStop(0, 'rgba(46,139,126,0.55)')
  grad.addColorStop(0.6, 'rgba(12,32,30,0)')
  grad.addColorStop(1, 'rgba(199,148,55,0.32)')
  g.fillStyle = grad; g.fillRect(0, 0, 2048, 512)
  g.strokeStyle = 'rgba(240,206,136,0.7)'; g.lineWidth = 6
  g.strokeRect(34, 34, 1980, 444)
  g.textAlign = 'left'
  g.fillStyle = '#f0d9a4'
  g.font = '800 142px "Helvetica Neue", Arial, sans-serif'
  g.fillText('PELICAN', 110, 210)
  g.fillStyle = '#eef4ef'
  g.font = '800 92px "Helvetica Neue", Arial, sans-serif'
  g.fillText('FORKLIFT ACADEMY', 110, 320)
  g.fillStyle = '#8fd3c6'
  g.font = '700 64px "PingFang SC", "Microsoft YaHei", sans-serif'
  g.fillText('鹈 鹕 叉 车 驾 校', 112, 418)
  // pelican mark
  g.strokeStyle = '#f0d9a4'; g.lineWidth = 10
  g.beginPath(); g.arc(1740, 200, 92, 0.4, Math.PI * 1.72); g.stroke()
  g.beginPath(); g.moveTo(1770, 186); g.quadraticCurveTo(1890, 196, 1930, 238); g.quadraticCurveTo(1840, 252, 1796, 224); g.stroke()
  g.fillStyle = '#2e8b7e'
  g.beginPath(); g.arc(1712, 196, 15, 0, 7); g.fill()
  g.fillStyle = 'rgba(240,217,164,0.9)'
  g.font = '700 34px "Helvetica Neue", Arial, sans-serif'
  g.fillText('BAY 03 · TRAINING GROUND', 1420, 428)
  return tex(c)
}

export function posterTexture(kind: number) {
  const { c, g } = canvas(512, 720)
  if (kind === 0) {
    g.fillStyle = '#e9e2cf'; g.fillRect(0, 0, 512, 720)
    g.fillStyle = '#d9a52c'; g.fillRect(0, 0, 512, 128)
    g.fillStyle = '#1d2a2b'; g.font = '800 64px "Helvetica Neue", Arial, sans-serif'
    g.fillText('SAFETY', 40, 88)
    g.fillStyle = '#263231'; g.font = '800 52px "PingFang SC", sans-serif'
    g.fillText('安全第一', 40, 230)
    g.strokeStyle = '#263231'; g.lineWidth = 8
    g.beginPath(); g.arc(256, 470, 150, 0, Math.PI * 2); g.stroke()
    g.strokeStyle = '#c9463c'; g.lineWidth = 22
    g.beginPath(); g.arc(256, 470, 118, -0.7, Math.PI * 0.9); g.stroke()
    g.fillStyle = '#263231'; g.font = '700 32px "Helvetica Neue", Arial, sans-serif'
    g.textAlign = 'center'; g.fillText('WEAR · BELT · SLOW', 256, 670)
  } else if (kind === 1) {
    g.fillStyle = '#203230'; g.fillRect(0, 0, 512, 720)
    g.fillStyle = '#e8d8ae'; g.font = '800 46px "PingFang SC", sans-serif'; g.fillText('叉车通道', 40, 96)
    g.fillStyle = '#8fd3c6'; g.font = '700 30px "Helvetica Neue", Arial, sans-serif'
    g.fillText('FORKLIFT LANE', 40, 142)
    g.strokeStyle = '#d7a92b'; g.lineWidth = 10; g.setLineDash([28, 18])
    g.beginPath(); g.moveTo(256, 650); g.lineTo(256, 220); g.stroke()
    g.setLineDash([])
    g.fillStyle = '#d7a92b'
    g.beginPath(); g.moveTo(256, 176); g.lineTo(316, 268); g.lineTo(196, 268); g.fill()
    g.strokeStyle = '#e8d8ae'; g.lineWidth = 5
    g.strokeRect(40, 56, 432, 600)
  } else {
    g.fillStyle = '#efe7d6'; g.fillRect(0, 0, 512, 720)
    g.fillStyle = '#c9463c'; g.fillRect(0, 0, 512, 150)
    g.fillStyle = '#fff6e8'; g.font = '800 58px "Helvetica Neue", Arial, sans-serif'
    g.textAlign = 'center'; g.fillText('CHECK', 256, 92); g.fillText('THE FORKS', 256, 140)
    g.fillStyle = '#26302f'; g.font = '700 30px "PingFang SC", sans-serif'
    g.fillText('每 次 起 步 前 检 查 门 架', 256, 250)
    g.strokeStyle = '#26302f'; g.lineWidth = 7
    g.beginPath(); g.moveTo(130, 430); g.lineTo(130, 300); g.lineTo(382, 300); g.stroke()
    g.beginPath(); g.moveTo(150, 590); g.lineTo(150, 452); g.lineTo(362, 452); g.stroke()
    g.lineWidth = 13
    g.beginPath(); g.moveTo(150, 590); g.lineTo(150, 690); g.stroke()
    g.beginPath(); g.moveTo(362, 590); g.lineTo(362, 690); g.stroke()
    g.fillStyle = '#d9a52c'; g.font = '800 34px "PingFang SC", sans-serif'
    g.fillText('门架 · 货叉 · 载荷', 256, 670)
  }
  return tex(c)
}

export function gaugeTexture() {
  const { c, g } = canvas(1024, 512)
  g.fillStyle = '#151b1c'; g.fillRect(0, 0, 1024, 512)
  g.strokeStyle = '#303b3c'; g.lineWidth = 10; g.strokeRect(8, 8, 1008, 496)
  g.textAlign = 'center'
  const dial = (cx: number, label: string) => {
    g.strokeStyle = '#5b6b69'; g.lineWidth = 5
    g.beginPath(); g.arc(cx, 260, 160, Math.PI * 0.75, Math.PI * 2.25); g.stroke()
    for (let i = 0; i <= 20; i++) {
      const a = Math.PI * 0.75 + (Math.PI * 1.5 * i) / 20
      const r1 = 160, r2 = i % 4 === 0 ? 132 : 144
      g.strokeStyle = i > 15 ? '#c9463c' : '#aab7b3'
      g.lineWidth = i % 4 === 0 ? 5 : 2
      g.beginPath(); g.moveTo(cx + Math.cos(a) * r1, 260 + Math.sin(a) * r1)
      g.lineTo(cx + Math.cos(a) * r2, 260 + Math.sin(a) * r2); g.stroke()
    }
    const na = Math.PI * 0.75 + Math.PI * 1.5 * (label === 'HOURS' ? 0.58 : 0.3)
    g.strokeStyle = '#e8b45b'; g.lineWidth = 6
    g.beginPath(); g.moveTo(cx, 260); g.lineTo(cx + Math.cos(na) * 118, 260 + Math.sin(na) * 118); g.stroke()
    g.fillStyle = '#0c1011'; g.beginPath(); g.arc(cx, 260, 18, 0, 7); g.fill()
    g.strokeStyle = '#e8b45b'; g.lineWidth = 3; g.beginPath(); g.arc(cx, 260, 18, 0, 7); g.stroke()
    g.fillStyle = '#9fb0ac'; g.font = '600 30px "Helvetica Neue", Arial, sans-serif'
    g.fillText(label, cx, 450)
  }
  dial(280, 'HOURS'); dial(744, 'FUEL')
  g.fillStyle = '#e8d8ae'; g.font = '700 28px "Helvetica Neue", Arial, sans-serif'
  g.fillText('PELICAN · FL-03', 512, 60)
  return tex(c)
}

export function decalTexture(text: string, sub: string) {
  const { c, g } = canvas(512, 256)
  g.clearRect(0, 0, 512, 256)
  g.fillStyle = '#f0d9a4'
  g.font = '800 76px "Helvetica Neue", Arial, sans-serif'
  g.textAlign = 'center'; g.fillText(text, 256, 120)
  g.fillStyle = '#d7e4df'; g.font = '700 28px "Helvetica Neue", Arial, sans-serif'
  g.fillText(sub, 256, 174)
  return tex(c)
}

export function stencilTexture(text: string, sub = '') {
  const { c, g } = canvas(1024, 512)
  g.clearRect(0, 0, 1024, 512)
  g.fillStyle = '#e9d9a9'
  g.textAlign = 'center'
  g.font = '800 190px "PingFang SC", "Microsoft YaHei", sans-serif'
  g.fillText(text, 512, 280)
  if (sub) { g.font = '700 64px "Helvetica Neue", Arial, sans-serif'; g.fillText(sub, 512, 400) }
  return tex(c)
}

// ---------------------------------------------------------------- materials
const std = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p)
const phys = (p: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(p)

const crateSideTex: Record<string, THREE.Texture> = {}
const topTex = crateTopTexture()
export function crateSideMaterial(color: CrateColor) {
  if (!crateSideTex[color]) crateSideTex[color] = crateSideTexture(color)
  return std({ map: crateSideTex[color], roughness: 0.72, metalness: 0.05 })
}
export function crateTopMaterial() {
  return std({ map: topTex, roughness: 0.78 })
}

export const MAT = {
  paint: phys({ color: 0x236f66, metalness: 0.55, roughness: 0.28, clearcoat: 0.7, clearcoatRoughness: 0.22 }),
  paintDark: phys({ color: 0x174f49, metalness: 0.5, roughness: 0.38, clearcoat: 0.4 }),
  cream: std({ color: 0xd9cba9, metalness: 0.25, roughness: 0.48 }),
  graphite: std({ color: 0x24292a, metalness: 0.55, roughness: 0.55 }),
  castIron: std({ color: 0x3b4142, metalness: 0.7, roughness: 0.62 }),
  steel: std({ color: 0x9aa3a4, metalness: 0.92, roughness: 0.34 }),
  steelDark: std({ color: 0x5d6667, metalness: 0.85, roughness: 0.45 }),
  chrome: std({ color: 0xdde3e2, metalness: 1, roughness: 0.1 }),
  rubber: std({ color: 0x111516, metalness: 0.02, roughness: 0.93 }),
  rubberTrim: std({ color: 0x1b2021, metalness: 0.05, roughness: 0.78 }),
  seat: std({ color: 0x1d2223, metalness: 0.05, roughness: 0.66 }),
  seatStitch: std({ color: 0x6e4f34, metalness: 0.05, roughness: 0.7 }),
  glass: phys({ color: 0xa8d6d0, metalness: 0, roughness: 0.06, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }),
  feather: std({ color: 0xf4f0e5, metalness: 0, roughness: 0.86 }),
  featherShade: std({ color: 0xd9d5c8, metalness: 0, roughness: 0.9 }),
  featherTip: std({ color: 0xb7b9b2, metalness: 0, roughness: 0.92 }),
  beak: std({ color: 0xe89732, metalness: 0.08, roughness: 0.48 }),
  pouch: std({ color: 0xd97f2d, metalness: 0.02, roughness: 0.62 }),
  leg: std({ color: 0xe2953f, metalness: 0.02, roughness: 0.7 }),
  eye: std({ color: 0xf6f3e8, metalness: 0, roughness: 0.25 }),
  pupil: std({ color: 0x101416, metalness: 0, roughness: 0.2 }),
  wood: std({ color: 0xb98c53, metalness: 0, roughness: 0.78 }),
  woodDark: std({ color: 0x7c5a31, metalness: 0, roughness: 0.82 }),
  crateFrame: std({ color: 0x9b713f, metalness: 0.03, roughness: 0.75 }),
  crateMetal: std({ color: 0x6d7373, metalness: 0.8, roughness: 0.48 }),
  headlight: std({ color: 0xfff4d6, emissive: 0xffd88a, emissiveIntensity: 1.5, roughness: 0.2, metalness: 0.2 }),
  taillight: std({ color: 0x8e1f16, emissive: 0x9e2216, emissiveIntensity: 0.9, roughness: 0.35 }),
  beacon: std({ color: 0xffc247, emissive: 0xffa820, emissiveIntensity: 2.2, roughness: 0.25, transparent: true, opacity: 0.9 }),
  hazard: std({ map: hazardTexture(), roughness: 0.6, metalness: 0.1 }),
  rackBlue: std({ color: 0x33566a, metalness: 0.55, roughness: 0.5 }),
  rackOrange: std({ color: 0xa9682d, metalness: 0.45, roughness: 0.55 }),
  deck: std({ color: 0x8b7b5e, metalness: 0.15, roughness: 0.8 }),
  safetyYellow: std({ color: 0xe0b02c, metalness: 0.15, roughness: 0.6 }),
}

export function zoneSignTexture(color: CrateColor) {
  const info = CRATE_INFO[color]
  const { c, g } = canvas(768, 512)
  g.fillStyle = '#12191a'; g.fillRect(0, 0, 768, 512)
  g.fillStyle = info.hex; g.fillRect(0, 0, 768, 118)
  g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 10; g.strokeRect(14, 14, 740, 484)
  g.textAlign = 'center'
  g.fillStyle = '#ffffff'; g.font = '800 70px "PingFang SC", "Microsoft YaHei", sans-serif'
  g.fillText(info.zh + '交付区', 384, 86)
  g.fillStyle = '#f5efdf'; g.font = '800 92px "Helvetica Neue", Arial, sans-serif'
  g.fillText(info.label, 384, 250)
  g.fillStyle = info.hex; g.fillRect(130, 292, 508, 76)
  g.fillStyle = '#101718'; g.font = '800 52px "PingFang SC", sans-serif'
  g.fillText('仅限同色货箱', 384, 348)
  g.fillStyle = '#b9c6c1'; g.font = '600 30px "Helvetica Neue", Arial, sans-serif'
  g.fillText('DROP ZONE · KEEP CLEAR', 384, 430)
  for (let i = 0; i < 8; i++) {
    g.fillStyle = i % 2 === 0 ? info.hex : '#202829'
    g.fillRect(60 + i * 82, 462, 82, 30)
  }
  return tex(c)
}

export function softShadowTexture() {
  const { c, g } = canvas(256, 256)
  const gr = g.createRadialGradient(128, 128, 4, 128, 128, 124)
  gr.addColorStop(0, 'rgba(0,0,0,0.45)')
  gr.addColorStop(0.55, 'rgba(0,0,0,0.18)')
  gr.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = gr; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill()
  const t = tex(c)
  return t
}
