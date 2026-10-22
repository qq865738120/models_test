import * as THREE from 'three'
import { CRATE_INFO, CrateColor, ROOM, ZONES, Zone } from './config'
import {
  MAT, bannerTexture, floorBumpTexture, floorTexture, hazardTexture, posterTexture,
  signTexture, stencilTexture, wallTexture, zoneSignTexture,
} from './textures'
import { addMesh, box, roundedBox } from './models'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export type StaticBox = {
  cx: number; cy: number; cz: number
  hx: number; hy: number; hz: number
  occlude?: boolean
}

export type Warehouse = {
  colliders: StaticBox[]
  zones: Zone[]
  zoneGroups: Record<string, THREE.Group>
  lightTargets: THREE.Object3D[]
}

function planeAt(parent: THREE.Object3D, w: number, d: number, x: number, z: number, mat: THREE.Material, y = 0.012) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat)
  m.rotation.x = -Math.PI / 2
  m.position.set(x, y, z)
  m.receiveShadow = true
  m.renderOrder = 1
  parent.add(m)
  return m
}

function paintMat(color: number, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color, roughness: 0.92, metalness: 0.02, transparent: opacity < 1, opacity,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  })
}

function zoneFloorTexture(color: CrateColor) {
  const info = CRATE_INFO[color]
  const c = document.createElement('canvas')
  c.width = 512; c.height = 512
  const g = c.getContext('2d')!
  g.clearRect(0, 0, 512, 512)
  g.fillStyle = info.hex
  g.globalAlpha = 0.55
  g.fillRect(0, 0, 512, 512)
  g.globalAlpha = 1
  g.strokeStyle = '#f4eddc'
  g.lineWidth = 12
  g.strokeRect(18, 18, 476, 476)
  g.lineWidth = 4
  g.strokeRect(44, 44, 424, 424)
  g.setLineDash([22, 14])
  g.strokeStyle = 'rgba(255,255,255,0.55)'
  g.strokeRect(76, 76, 360, 360)
  g.setLineDash([])
  g.fillStyle = '#fffdf6'
  g.textAlign = 'center'
  g.font = '800 116px "Helvetica Neue", Arial, sans-serif'
  g.fillText(info.label, 256, 236)
  g.font = '800 66px "PingFang SC", "Microsoft YaHei", sans-serif'
  g.fillText(info.zh + '交付区', 256, 320)
  g.font = '700 30px "Helvetica Neue", Arial, sans-serif'
  g.fillStyle = 'rgba(255,255,255,0.82)'
  g.fillText('DROP ZONE', 256, 372)
  // corner brackets
  g.strokeStyle = '#fffdf6'; g.lineWidth = 14
  for (const [x, y, sx, sy] of [[30, 30, 1, 1], [482, 30, -1, 1], [30, 482, 1, -1], [482, 482, -1, -1]]) {
    g.beginPath(); g.moveTo(x + sx * 62, y); g.lineTo(x, y); g.lineTo(x, y + sy * 62); g.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

function floorTextTexture(text: string, sub: string, color = '#e6c05a') {
  const c = document.createElement('canvas')
  c.width = 1024; c.height = 512
  const g = c.getContext('2d')!
  g.clearRect(0, 0, 1024, 512)
  g.fillStyle = color
  g.textAlign = 'center'
  g.font = '800 180px "PingFang SC", "Microsoft YaHei", sans-serif'
  g.globalAlpha = 0.85
  g.fillText(text, 512, 260)
  g.font = '700 58px "Helvetica Neue", Arial, sans-serif'
  g.fillText(sub, 512, 356)
  g.globalAlpha = 1
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

// ------------------------------------------------------------------ shelving
function buildRack(
  parent: THREE.Object3D, colliders: StaticBox[], cx: number, cz: number,
  bays: number, bayW: number, rotY: number, levels = [1.0, 2.35, 3.7, 4.9],
) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = rotY
  parent.add(g)
  const depth = 1.25
  const height = 5.35
  const width = bays * bayW
  // uprights
  for (let i = 0; i <= bays; i++) {
    const x = -width / 2 + i * bayW
    for (const z of [-depth / 2, depth / 2]) {
      box(g, 0.11, height, 0.11, x, height / 2, z, MAT.rackBlue)
      box(g, 0.05, 0.24, 0.3, x, 0.12, z, MAT.steelDark)
    }
    // side bracing
    for (let l = 0; l < 6; l++) {
      const y = 0.45 + l * 0.85
      const zA = -depth / 2, zB = depth / 2
      const dz = zB - zA
      const len = Math.sqrt(dz * dz + 0.55 * 0.55)
      const brace = box(g, 0.055, 0.055, len, x, y, 0, MAT.rackBlue, Math.atan2(0.55, dz), 0, 0)
      brace.castShadow = false
      box(g, 0.06, 0.05, depth * 0.92, x, y + 0.28, 0, MAT.rackBlue)
    }
  }
  // beams + decks
  for (const y of levels) {
    for (const z of [-depth / 2 + 0.02, depth / 2 - 0.02]) {
      box(g, width, 0.15, 0.08, 0, y, z, MAT.rackOrange)
      box(g, width, 0.03, 0.1, 0, y + 0.1, z, MAT.rackOrange)
    }
    for (let b = 0; b < bays; b++) {
      const x = -width / 2 + bayW / 2 + b * bayW
      box(g, bayW - 0.22, 0.055, depth - 0.16, x, y - 0.09, 0, MAT.deck)
      // pallets and wrapped stock, deterministic
      if ((b + Math.round(y * 3)) % 3 !== 1) {
        box(g, 0.86, 0.1, 0.86, x, y + 0.12, 0, MAT.woodDark)
        for (const zz of [-0.32, 0, 0.32]) box(g, 0.82, 0.05, 0.1, x, y + 0.2, zz, MAT.wood)
        const n = 1 + ((b + Math.round(y)) % 3)
        for (let k = 0; k < n; k++) {
          box(g, 0.72, 0.42, 0.72, x, y + 0.43 + k * 0.44, 0, k % 2 ? MAT.deck : MAT.rackBlue)
          box(g, 0.74, 0.02, 0.74, x, y + 0.64 + k * 0.44, 0, MAT.steelDark)
        }
      }
    }
  }
  // top sign
  colliders.push({
    cx: cx + Math.sin(rotY) * 0, cy: height / 2, cz,
    hx: (rotY === 0 ? width / 2 + 0.1 : depth / 2 + 0.1),
    hy: height / 2,
    hz: (rotY === 0 ? depth / 2 + 0.1 : width / 2 + 0.1),
    occlude: true,
  })
  return g
}

// ------------------------------------------------------------------ props
function palletStack(parent: THREE.Object3D, x: number, z: number, layers = 5, wrapped = false) {
  const g = new THREE.Group()
  g.position.set(x, 0, z)
  parent.add(g)
  for (let l = 0; l < layers; l++) {
    const y = 0.1 + l * 0.18
    box(g, 1.1, 0.05, 1.0, 0, y, 0, MAT.wood)
    for (const zz of [-0.38, 0, 0.38]) box(g, 1.06, 0.09, 0.1, 0, y - 0.06, zz, MAT.woodDark)
    for (const xx of [-0.46, 0, 0.46]) box(g, 0.1, 0.09, 0.95, xx, y - 0.06, 0, MAT.woodDark)
  }
  if (wrapped) {
    const wrap = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.15, 1.05), new THREE.MeshPhysicalMaterial({
      color: 0xcfd9d4, transparent: true, opacity: 0.42, roughness: 0.25, metalness: 0.05,
      clearcoat: 0.6, side: THREE.DoubleSide,
    }))
    wrap.position.y = 0.68
    wrap.castShadow = true; wrap.receiveShadow = true
    g.add(wrap)
    box(g, 0.9, 0.9, 0.9, 0, 0.68, 0, MAT.deck)
  }
  return g
}

function drum(parent: THREE.Object3D, x: number, z: number, color: number) {
  const g = new THREE.Group()
  g.position.set(x, 0, z)
  parent.add(g)
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.9, 20), new THREE.MeshStandardMaterial({ color, metalness: 0.55, roughness: 0.42 }))
  body.position.y = 0.45; body.castShadow = true; body.receiveShadow = true
  g.add(body)
  for (const y of [0.18, 0.45, 0.72]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.295, 0.018, 6, 24), MAT.steelDark)
    ring.rotation.x = Math.PI / 2; ring.position.y = y
    g.add(ring)
  }
  addMesh(g, new THREE.CylinderGeometry(0.3, 0.3, 0.03, 20), MAT.steelDark, 0, 0.9, 0)
  return g
}

function cone(parent: THREE.Object3D, x: number, z: number) {
  const g = new THREE.Group()
  g.position.set(x, 0, z)
  parent.add(g)
  box(g, 0.42, 0.04, 0.42, 0, 0.02, 0, new THREE.MeshStandardMaterial({ color: 0x2f3436, roughness: 0.8 }))
  const coneGeo = new THREE.ConeGeometry(0.15, 0.55, 14, 1, true)
  const cm = new THREE.Mesh(coneGeo, new THREE.MeshStandardMaterial({ color: 0xd6632f, roughness: 0.7, side: THREE.DoubleSide }))
  cm.position.y = 0.3; cm.castShadow = true
  g.add(cm)
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.12, 0.1, 14, 1, true), new THREE.MeshStandardMaterial({ color: 0xf1ebdc, roughness: 0.6, side: THREE.DoubleSide }))
  band.position.y = 0.33
  g.add(band)
  return g
}

// ------------------------------------------------------------------ main build
export function buildWarehouse(scene: THREE.Scene): Warehouse {
  const colliders: StaticBox[] = []
  const zoneGroups: Record<string, THREE.Group> = {}
  const lightTargets: THREE.Object3D[] = []
  const root = new THREE.Group()
  scene.add(root)

  // floor
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTexture(), bumpMap: floorBumpTexture(), bumpScale: 0.025,
    color: 0xf2efe6, roughness: 0.86, metalness: 0.03,
  })
  const floor = addMesh(root, new THREE.PlaneGeometry(ROOM.maxX - ROOM.minX, ROOM.maxZ - ROOM.minZ), floorMat, 0, 0, 0, -Math.PI / 2, 0, 0, false, true)
  floor.name = 'warehouse-floor'

  // walls
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTexture(), color: 0xdfe4de, roughness: 0.72, metalness: 0.18 })
  const wallH = ROOM.wallH
  const walls: [number, number, number, number, number, number][] = [
    [0, wallH / 2, ROOM.minZ - 0.25, 30.5, wallH, 0.5],
    [0, wallH / 2, ROOM.maxZ + 0.25, 30.5, wallH, 0.5],
    [ROOM.minX - 0.25, wallH / 2, 0, 0.5, wallH, 24.5],
    [ROOM.maxX + 0.25, wallH / 2, 0, 0.5, wallH, 24.5],
  ]
  for (const [x, y, z, w, h, d] of walls) {
    const m = addMesh(root, new THREE.BoxGeometry(w, h, d), wallMat, x, y, z, 0, 0, 0, false, true)
    m.material = wallMat
  }
  // wall base wainscot + safety stripe
  for (const side of [-1, 1]) {
    box(root, 30, 1.15, 0.06, 0, 0.58, side < 0 ? ROOM.minZ + 0.03 : ROOM.maxZ - 0.03, MAT.steelDark, 0, 0, 0, false)
    box(root, 30, 0.09, 0.07, 0, 1.2, side < 0 ? ROOM.minZ + 0.04 : ROOM.maxZ - 0.04, MAT.safetyYellow, 0, 0, 0, false)
    box(root, 0.06, 1.15, 24, side < 0 ? ROOM.minX + 0.03 : ROOM.maxX - 0.03, 0.58, 0, MAT.steelDark, 0, 0, 0, false)
    box(root, 0.07, 0.09, 24, side < 0 ? ROOM.minX + 0.04 : ROOM.maxX - 0.04, 1.2, 0, MAT.safetyYellow, 0, 0, 0, false)
  }
  // structural columns along the walls
  for (const x of [-10.5, -3.5, 3.5, 10.5]) {
    for (const z of [ROOM.minZ + 0.28, ROOM.maxZ - 0.28]) {
      box(root, 0.42, wallH, 0.42, x, wallH / 2, z, MAT.steelDark, 0, 0, 0, false)
      box(root, 0.52, 0.16, 0.52, x, 0.08, z, MAT.steelDark, 0, 0, 0, false)
    }
  }
  for (const z of [-7.5, 0, 7.5]) {
    for (const x of [ROOM.minX + 0.28, ROOM.maxX - 0.28]) {
      box(root, 0.42, wallH, 0.42, x, wallH / 2, z, MAT.steelDark, 0, 0, 0, false)
    }
  }

  // windows high on the west wall (cool daylight source)
  for (let i = 0; i < 4; i++) {
    const z = -7.5 + i * 5
    box(root, 0.12, 1.5, 3.0, ROOM.minX + 0.08, 5.9, z, MAT.graphite, 0, 0, 0, false)
    const win = addMesh(root, new THREE.PlaneGeometry(2.7, 1.25),
      new THREE.MeshBasicMaterial({ color: 0xbfe2e6 }), ROOM.minX + 0.15, 5.9, z, 0, Math.PI / 2, 0, false, false)
    win.renderOrder = 0
    for (let k = -1; k <= 1; k++) box(root, 0.16, 1.4, 0.06, ROOM.minX + 0.18, 5.9, z + k * 0.9, MAT.graphite, 0, 0, 0, false)
    box(root, 0.18, 0.07, 2.9, ROOM.minX + 0.18, 5.9, z, MAT.graphite, 0, 0, 0, false)
  }

  // roll-up door on the south wall
  const door = new THREE.Group()
  door.position.set(-4.5, 0, ROOM.maxZ - 0.06)
  root.add(door)
  box(door, 5.4, 0.35, 0.35, 0, 5.0, -0.05, MAT.steelDark, 0, 0, 0, false)
  box(door, 0.35, 5.0, 0.35, -2.7, 2.5, -0.05, MAT.steelDark, 0, 0, 0, false)
  box(door, 0.35, 5.0, 0.35, 2.7, 2.5, -0.05, MAT.steelDark, 0, 0, 0, false)
  for (let i = 0; i < 12; i++) {
    box(door, 5.2, 0.34, 0.08, 0, 0.28 + i * 0.37, -0.08, i % 3 === 0 ? MAT.steel : MAT.graphite, 0, 0, 0, false)
  }
  box(door, 4.6, 0.35, 0.1, 0, 4.7, -0.1, MAT.safetyYellow, 0, 0, 0, false)
  const exitMat = new THREE.MeshStandardMaterial({ map: signTexture({ title: 'EXIT', zh: '安全出口', sub: 'KEEP CLEAR', bg: '#1c5d38', fg: '#f4f0dd', accent: '#9fe6b2' }, 512, 256), roughness: 0.5 })
  addMesh(door, new THREE.PlaneGeometry(1.3, 0.65), exitMat, 0, 5.1, 0.16, 0, 0, 0, false, false)

  // banner on the south wall
  const bannerMat = new THREE.MeshStandardMaterial({ map: bannerTexture(), roughness: 0.6, metalness: 0.1, emissive: 0x1a2a26, emissiveIntensity: 0.2 })
  box(root, 6.8, 1.85, 0.12, 5.3, 5.55, ROOM.maxZ - 0.15, MAT.graphite, 0, 0, 0, false)
  addMesh(root, new THREE.PlaneGeometry(6.55, 1.62), bannerMat, 5.3, 5.55, ROOM.maxZ - 0.205, 0, Math.PI, 0, false, false)

  // posters
  const posters = [posterTexture(0), posterTexture(1), posterTexture(2)]
  const posterPos: [number, number, number, number][] = [
    [-14.93, 3.4, 8.4, Math.PI / 2],
    [-14.93, 3.4, -2.4, Math.PI / 2],
    [14.93, 4.3, -8.8, -Math.PI / 2],
  ]
  posterPos.forEach(([x, y, z, ry], i) => {
    box(root, 0.06, 1.66, 1.18, x - Math.sin(ry) * 0.03, y, z, MAT.graphite, 0, 0, 0, false)
    const pMat = new THREE.MeshStandardMaterial({ map: posters[i], roughness: 0.65 })
    addMesh(root, new THREE.PlaneGeometry(1.08, 1.52), pMat, x + Math.sin(ry) * 0.02, y, z, 0, ry, 0, false, false)
  })

  // fire extinguisher cabinet
  box(root, 0.6, 0.9, 0.32, 14.4, 1.45, 9.7, new THREE.MeshStandardMaterial({ color: 0xbb362c, metalness: 0.3, roughness: 0.5 }), 0, -Math.PI / 2, 0, false)
  addMesh(root, new THREE.PlaneGeometry(0.48, 0.3), new THREE.MeshBasicMaterial({ color: 0xe9e2cd }), 14.22, 1.62, 9.7, 0, -Math.PI / 2, 0, false, false)

  // hanging clock
  const clock = new THREE.Group()
  clock.position.set(5.0, 4.35, ROOM.minZ + 0.16)
  root.add(clock)
  addMesh(clock, new THREE.CylinderGeometry(0.42, 0.42, 0.08, 28), MAT.graphite, 0, 0, 0, Math.PI / 2, 0, 0, false)
  addMesh(clock, new THREE.CircleGeometry(0.37, 28), new THREE.MeshStandardMaterial({ color: 0xece4d2, roughness: 0.6 }), 0, 0, 0.05, 0, 0, 0, false, false)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    box(clock, 0.02, i % 3 === 0 ? 0.11 : 0.06, 0.015, Math.sin(a) * 0.29, Math.cos(a) * 0.29, 0.06, MAT.graphite, 0, 0, -a, false)
  }
  box(clock, 0.018, 0.19, 0.02, 0.05, 0.09, 0.07, MAT.graphite, 0, 0, -0.6, false)
  box(clock, 0.014, 0.26, 0.02, 0.03, 0.11, 0.07, MAT.graphite, 0, 0, 0.5, false)

  // ---- shelving along the back wall and west wall
  buildRack(root, colliders, -6.1, -11.2, 4, 3.7, 0)
  buildRack(root, colliders, -14.1, -5.6, 2, 3.4, Math.PI / 2)
  // rack end signs
  const rackSign = new THREE.MeshStandardMaterial({ map: signTexture({ title: 'A-01', zh: '原料区', sub: 'STORAGE · KEEP CLEAR', bg: '#24333a', fg: '#e7dcc3', accent: '#7fb1c0' }, 512, 320), roughness: 0.6 })
  addMesh(root, new THREE.PlaneGeometry(1.5, 0.94), rackSign, -2.2, 5.15, -10.53, 0, 0, 0, false, false)
  addMesh(root, new THREE.PlaneGeometry(1.5, 0.94), rackSign, -13.45, 5.15, -9.4, 0, Math.PI / 2, 0, false, false)

  // ---- delivery zones
  const zoneMatCache: Record<string, THREE.MeshStandardMaterial> = {}
  for (const zone of ZONES) {
    const info = CRATE_INFO[zone.color]
    const g = new THREE.Group()
    g.position.set(zone.x, 0, zone.z)
    root.add(g)
    zoneGroups[zone.color] = g
    const floorMat = new THREE.MeshStandardMaterial({
      map: zoneFloorTexture(zone.color), transparent: true, roughness: 0.86, metalness: 0.02,
      polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3,
    })
    planeAt(g, zone.w, zone.d, 0, 0, floorMat, 0.018)
    const edge = new THREE.MeshStandardMaterial({ color: info.hex, roughness: 0.65, metalness: 0.1 })
    // raised painted border
    for (const s of [-1, 1]) {
      box(g, zone.w + 0.16, 0.025, 0.09, 0, 0.012, s * (zone.d / 2 + 0.06), edge, 0, 0, 0, false)
      box(g, 0.09, 0.025, zone.d + 0.16, s * (zone.w / 2 + 0.06), 0.012, 0, edge, 0, 0, 0, false)
    }
    // hazard corner blocks
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const hz = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), MAT.hazard)
      hz.rotation.x = -Math.PI / 2
      hz.position.set(sx * (zone.w / 2 + 0.36), 0.01, sz * (zone.d / 2 + 0.36))
      g.add(hz)
    }
    // signboard on the east wall
    const signMat = new THREE.MeshStandardMaterial({ map: zoneSignTexture(zone.color), roughness: 0.45, metalness: 0.1, emissive: new THREE.Color(info.hex), emissiveIntensity: 0.12 })
    box(root, 0.1, 1.5, 2.2, ROOM.maxX - 0.06, 3.1, zone.z, MAT.graphite, 0, 0, 0, false)
    addMesh(root, new THREE.PlaneGeometry(2.1, 1.4), signMat, ROOM.maxX - 0.12, 3.1, zone.z, 0, -Math.PI / 2, 0, false, false)
    box(root, 0.1, 0.1, 2.0, ROOM.maxX - 0.15, 3.86, zone.z, new THREE.MeshBasicMaterial({ color: info.hex }), 0, 0, 0, false)
    // floor glow ring
    const ring = new THREE.Mesh(new THREE.RingGeometry(zone.w / 2 - 0.16, zone.w / 2 - 0.06, 40),
      new THREE.MeshBasicMaterial({ color: info.hex, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }))
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.03
    g.add(ring)
    zoneMatCache[zone.color] = edge
  }
  void zoneMatCache

  // ---- floor markings
  const yellow = paintMat(0xdcae32, 0.85)
  const white = paintMat(0xdcd6c4, 0.7)
  // delivery approach lane
  for (const x of [7.05, 7.55]) planeAt(root, 0.09, 18.5, x, -1.4, yellow, 0.014)
  for (let i = 0; i < 17; i++) planeAt(root, 0.32, 0.09, 7.3, -10 + i * 1.08, white, 0.014)
  // staging bay outlines
  for (let i = 0; i < 3; i++) {
    const x = -11.8 + i * 2.4
    planeAt(root, 2.1, 0.07, x, 0.16, yellow, 0.014)
    planeAt(root, 2.1, 0.07, x, -2.55, yellow, 0.014)
    planeAt(root, 0.07, 2.78, x - 1.05, -1.2, yellow, 0.014)
    planeAt(root, 0.07, 2.78, x + 1.05, -1.2, yellow, 0.014)
  }
  // keep clear chevrons near the zones
  for (const zone of ZONES) {
    for (let i = 0; i < 4; i++) {
      const chev = paintMat(0xcfb550, 0.55)
      const m = planeAt(root, 0.28, 1.2, zone.x - 2.35 + i * 0.38, zone.z, chev, 0.013)
      m.rotation.z = 0.5
    }
  }
  // large floor stencils
  const laneTex = floorTextTexture('叉车通道', 'FORKLIFT LANE', '#dcb84e')
  const laneMat = new THREE.MeshBasicMaterial({ map: laneTex, transparent: true, depthWrite: false, opacity: 0.8 })
  const lane = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.8), laneMat)
  lane.rotation.x = -Math.PI / 2; lane.rotation.z = Math.PI / 2
  lane.position.set(-4.2, 0.016, 4.9)
  root.add(lane)
  const keepOut = floorTextTexture('禁停', 'KEEP CLEAR', '#d9c37a')
  const keepMat = new THREE.MeshBasicMaterial({ map: keepOut, transparent: true, depthWrite: false, opacity: 0.65 })
  const keep = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), keepMat)
  keep.rotation.x = -Math.PI / 2
  keep.position.set(13.0, 0.016, -2.2)
  root.add(keep)
  // forklift icon stencil near spawn
  const iconCanvas = document.createElement('canvas')
  iconCanvas.width = 512; iconCanvas.height = 512
  const ig = iconCanvas.getContext('2d')!
  ig.strokeStyle = 'rgba(225,190,85,0.9)'; ig.lineWidth = 16; ig.lineCap = 'round'
  ig.strokeRect(150, 270, 150, 110)
  ig.beginPath(); ig.arc(190, 405, 30, 0, 7); ig.stroke()
  ig.beginPath(); ig.arc(275, 405, 30, 0, 7); ig.stroke()
  ig.beginPath(); ig.moveTo(300, 285); ig.lineTo(300, 130); ig.lineTo(360, 130); ig.stroke()
  ig.beginPath(); ig.moveTo(300, 150); ig.lineTo(390, 150); ig.stroke()
  ig.beginPath(); ig.moveTo(340, 155); ig.lineTo(340, 230); ig.lineTo(300, 230); ig.stroke()
  ig.font = '700 38px "Helvetica Neue", Arial, sans-serif'
  ig.fillStyle = 'rgba(225,190,85,0.85)'; ig.textAlign = 'center'
  ig.fillText('FL-03', 256, 480)
  const iconTex = new THREE.CanvasTexture(iconCanvas)
  iconTex.colorSpace = THREE.SRGBColorSpace
  const icon = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), new THREE.MeshBasicMaterial({ map: iconTex, transparent: true, depthWrite: false, opacity: 0.8 }))
  icon.rotation.x = -Math.PI / 2
  icon.position.set(-9.4, 0.016, 6.3)
  root.add(icon)

  // ---- props
  palletStack(root, 13.4, 9.9, 5, true)
  palletStack(root, 12.3, 10.9, 3, false)
  colliders.push({ cx: 13.2, cy: 0.8, cz: 10.2, hx: 1.15, hy: 1.1, hz: 1.15, occlude: true })
  const drums: [number, number, number][] = [[-13.4, 10.3, 0x2f6b64], [-12.75, 10.8, 0xb0552f], [-13.95, 10.95, 0x3b5972]]
  for (const [x, z, col] of drums) drum(root, x, z, col)
  colliders.push({ cx: -13.35, cy: 0.5, cz: 10.7, hx: 1.05, hy: 0.5, hz: 0.7 })
  colliders.push({ cx: 14.4, cy: 0.9, cz: 9.7, hx: 0.3, hy: 0.9, hz: 0.35 })
  cone(root, -3.3, -9.6)
  cone(root, -2.6, -9.0)
  cone(root, 7.9, -8.4)
  // pallet by the shelf
  palletStack(root, 2.0, -9.7, 2, false)
  colliders.push({ cx: 2.0, cy: 0.4, cz: -9.7, hx: 0.6, hy: 0.4, hz: 0.55 })

  // ---- ceiling and lights
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x2a3335, roughness: 0.9, metalness: 0.15 })
  addMesh(root, new THREE.PlaneGeometry(30.4, 24.4), roofMat, 0, 7.55, 0, Math.PI / 2, 0, 0, false, false)
  for (let z = -10; z <= 10; z += 4) {
    box(root, 30, 0.26, 0.2, 0, 7.2, z, MAT.steelDark, 0, 0, 0, false)
    for (let x = -12; x <= 12; x += 6) {
      const brace = box(root, 0.12, 0.12, 2.6, x, 7.05, z, MAT.steelDark, 0.55, 0, 0, false)
      void brace
    }
  }
  for (const x of [-9, -3, 3, 9]) {
    for (const z of [-6, 3]) {
      cylBetweenLight(root, x, 6.8, z)
    }
  }
  function cylBetweenLight(parent: THREE.Object3D, x: number, y: number, z: number) {
    const g = new THREE.Group()
    g.position.set(x, y, z)
    parent.add(g)
    cylBetweenDown(g, 1.0, MAT.steelDark)
    box(g, 0.34, 0.12, 2.6, 0, -1.02, 0, MAT.graphite, 0, 0, 0, false)
    const panel = addMesh(g, new THREE.PlaneGeometry(0.26, 2.4), new THREE.MeshBasicMaterial({ color: 0xfff2cf }), 0, -1.085, 0, Math.PI / 2, 0, 0, false, false)
    void panel
  }
  function cylBetweenDown(parent: THREE.Object3D, len: number, mat: THREE.Material) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, len, 6), mat)
    m.position.y = len / 2
    parent.add(m)
  }

  const warmA = new THREE.PointLight(0xffdfae, 58, 18, 2)
  warmA.position.set(-6.5, 5.6, -2.5)
  scene.add(warmA)
  const warmB = new THREE.PointLight(0xffd7a0, 48, 16, 2)
  warmB.position.set(7.5, 5.4, 4.0)
  scene.add(warmB)

  // ---- light rig
  const hemi = new THREE.HemisphereLight(0xd8ebe7, 0x35302a, 0.78)
  scene.add(hemi)
  const key = new THREE.DirectionalLight(0xfff2dd, 3.35)
  key.position.set(-9, 13.5, 8.5)
  key.target.position.set(1, 0, -1)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.camera.left = -19
  key.shadow.camera.right = 19
  key.shadow.camera.top = 17
  key.shadow.camera.bottom = -17
  key.shadow.camera.near = 1
  key.shadow.camera.far = 42
  key.shadow.bias = -0.0004
  key.shadow.normalBias = 0.035
  key.shadow.radius = 2
  scene.add(key); scene.add(key.target)

  const fill = new THREE.DirectionalLight(0xa9d0da, 1.05)
  fill.position.set(14, 7, -12)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(0xffd5a0, 0.62)
  rim.position.set(2, 5, 12)
  scene.add(rim)

  scene.background = new THREE.Color(0x0d1415)
  scene.fog = new THREE.FogExp2(0x101a1a, 0.0055)

  mergeStatic(root)
  return { colliders, zones: ZONES, zoneGroups, lightTargets }
}

// Merge every static mesh by material/flags into a handful of draw calls.
function mergeStatic(root: THREE.Group) {
  root.updateMatrixWorld(true)
  type Bucket = { mat: THREE.Material; cast: boolean; receive: boolean; order: number; geos: THREE.BufferGeometry[] }
  const buckets = new Map<string, Bucket>()
  const remove: THREE.Mesh[] = []
  root.traverse((o) => {
    const m = o as THREE.Mesh
    if (!m.isMesh || Array.isArray(m.material) || (m as any).isInstancedMesh) return
    const mat = m.material as THREE.Material
    if (!mat) return
    const key = `${mat.uuid}|${m.castShadow}|${m.receiveShadow}|${m.renderOrder}`
    let b = buckets.get(key)
    if (!b) { b = { mat, cast: m.castShadow, receive: m.receiveShadow, order: m.renderOrder, geos: [] }; buckets.set(key, b) }
    const geo = m.geometry.clone()
    for (const name of Object.keys(geo.attributes)) {
      if (!['position', 'normal', 'uv'].includes(name)) geo.deleteAttribute(name)
    }
    if (!geo.attributes.uv) {
      const count = geo.attributes.position.count
      geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2))
    }
    if (!geo.attributes.normal) geo.computeVertexNormals()
    const flat = geo.index ? geo.toNonIndexed() : geo
    flat.applyMatrix4(m.matrixWorld)
    b.geos.push(flat)
    remove.push(m)
  })
  for (const m of remove) {
    m.removeFromParent()
    m.geometry.dispose()
  }
  for (const b of buckets.values()) {
    if (!b.geos.length) continue
    const merged = mergeGeometries(b.geos, false)
    if (!merged) continue
    const m = new THREE.Mesh(merged, b.mat)
    m.castShadow = b.cast
    m.receiveShadow = b.receive
    m.renderOrder = b.order
    root.add(m)
    for (const g of b.geos) g.dispose()
  }
}

export { hazardTexture }
