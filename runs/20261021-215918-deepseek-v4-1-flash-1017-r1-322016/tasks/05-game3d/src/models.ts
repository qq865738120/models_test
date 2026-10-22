import * as THREE from 'three'
import { CRATE, CrateColor } from './config'
import { MAT, crateSideMaterial, crateTopMaterial, decalTexture, gaugeTexture, softShadowTexture } from './textures'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export type ForkliftModel = {
  root: THREE.Group
  lift: THREE.Group
  wheels: { steer: THREE.Group; spin: THREE.Group; radius: number; front: boolean }[]
  pelican: { root: THREE.Group; head: THREE.Group; neck: THREE.Mesh; torso: THREE.Object3D }
  beacon: THREE.Mesh
  shadow: THREE.Mesh
}

export function addMesh(
  parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material,
  x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, cast = true, receive = true,
) {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  m.rotation.set(rx, ry, rz)
  m.castShadow = cast
  m.receiveShadow = receive
  parent.add(m)
  return m
}

export function box(
  parent: THREE.Object3D, w: number, h: number, d: number, x: number, y: number, z: number,
  mat: THREE.Material, rx = 0, ry = 0, rz = 0, cast = true,
) {
  return addMesh(parent, new THREE.BoxGeometry(w, h, d), mat, x, y, z, rx, ry, rz, cast, true)
}

export function roundedBoxGeo(w: number, h: number, d: number, r = 0.05, bevel = 0.02, seg = 3) {
  const b = Math.min(bevel, w * 0.24, h * 0.24, d * 0.24)
  const rr = Math.max(0.002, Math.min(r, w / 2 - b - 0.001, h / 2 - b - 0.001))
  const s = new THREE.Shape()
  const hw = w / 2 - b, hh = h / 2 - b
  s.moveTo(-hw + rr, -hh)
  s.lineTo(hw - rr, -hh); s.quadraticCurveTo(hw, -hh, hw, -hh + rr)
  s.lineTo(hw, hh - rr); s.quadraticCurveTo(hw, hh, hw - rr, hh)
  s.lineTo(-hw + rr, hh); s.quadraticCurveTo(-hw, hh, -hw, hh - rr)
  s.lineTo(-hw, -hh + rr); s.quadraticCurveTo(-hw, -hh, -hw + rr, -hh)
  const g = new THREE.ExtrudeGeometry(s, {
    depth: Math.max(0.001, d - 2 * b), bevelEnabled: true, bevelThickness: b, bevelSize: b,
    bevelSegments: seg, curveSegments: seg + 2, steps: 1,
  })
  g.center()
  return g
}

export function roundedBox(
  parent: THREE.Object3D, w: number, h: number, d: number, x: number, y: number, z: number,
  mat: THREE.Material, r = 0.05, bevel = 0.02, rx = 0, ry = 0, rz = 0,
) {
  return addMesh(parent, roundedBoxGeo(w, h, d, r, bevel), mat, x, y, z, rx, ry, rz, true, true)
}

function cylBetween(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material, seg = 12) {
  const dir = new THREE.Vector3().subVectors(b, a)
  const len = dir.length()
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), mat)
  m.position.copy(a).addScaledVector(dir, 0.5)
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  m.castShadow = true; m.receiveShadow = true
  parent.add(m)
  return m
}

function tube(parent: THREE.Object3D, pts: THREE.Vector3[], r: number, mat: THREE.Material, seg = 24, radial = 10) {
  const curve = new THREE.CatmullRomCurve3(pts)
  const m = new THREE.Mesh(new THREE.TubeGeometry(curve, seg, r, radial, false), mat)
  m.castShadow = true; m.receiveShadow = true
  parent.add(m)
  return m
}

function placard(parent: THREE.Object3D, text: string, sub: string, w: number, h: number, x: number, y: number, z: number, ry: number) {
  const t = decalTexture(text, sub)
  const mat = new THREE.MeshStandardMaterial({ map: t, transparent: true, roughness: 0.5, metalness: 0.1, depthWrite: false })
  const p = addMesh(parent, new THREE.PlaneGeometry(w, h), mat, x, y, z, 0, ry, 0, false, false)
  return p
}

// Merge static children of a group by material to reduce draw calls.
// Excluded object subtrees (wheels, lift, animated driver parts) stay live.
export function mergeGroupStatic(group: THREE.Object3D, exclude: Set<THREE.Object3D> = new Set()) {
  group.updateMatrixWorld(true)
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert()
  const rel = new THREE.Matrix4()
  type Bucket = { mat: THREE.Material; cast: boolean; receive: boolean; order: number; geos: THREE.BufferGeometry[] }
  const buckets = new Map<string, Bucket>()
  const remove: THREE.Mesh[] = []
  const blocked = new Set<THREE.Object3D>()
  group.traverse((o) => {
    if (exclude.has(o)) blocked.add(o)
  })
  const isBlocked = (o: THREE.Object3D) => {
    let p: THREE.Object3D | null = o
    while (p) {
      if (exclude.has(p)) return true
      if (p === group) return false
      p = p.parent
    }
    return false
  }
  group.traverse((o) => {
    const m = o as THREE.Mesh
    if (!m.isMesh || Array.isArray(m.material) || (m as any).isInstancedMesh) return
    if (isBlocked(m)) return
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
      geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2))
    }
    if (!geo.attributes.normal) geo.computeVertexNormals()
    const flat = geo.index ? geo.toNonIndexed() : geo
    rel.multiplyMatrices(inv, m.matrixWorld)
    flat.applyMatrix4(rel)
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
    m.castShadow = b.cast; m.receiveShadow = b.receive; m.renderOrder = b.order
    group.add(m)
    for (const g of b.geos) g.dispose()
  }
  void blocked
}

// ------------------------------------------------------------------ wheels
function wheelGeometry(radius: number, width: number) {
  const pts: THREE.Vector2[] = []
  const hw = width / 2
  pts.push(new THREE.Vector2(0.52 * radius, -hw * 0.86))
  pts.push(new THREE.Vector2(0.78 * radius, -hw))
  pts.push(new THREE.Vector2(0.92 * radius, -hw * 0.92))
  pts.push(new THREE.Vector2(0.99 * radius, -hw * 0.58))
  pts.push(new THREE.Vector2(radius, 0))
  pts.push(new THREE.Vector2(0.99 * radius, hw * 0.58))
  pts.push(new THREE.Vector2(0.92 * radius, hw * 0.92))
  pts.push(new THREE.Vector2(0.78 * radius, hw))
  pts.push(new THREE.Vector2(0.52 * radius, hw * 0.86))
  const g = new THREE.LatheGeometry(pts, 28)
  g.rotateZ(Math.PI / 2)
  return g
}

function makeWheel(radius: number, width: number) {
  const steer = new THREE.Group()
  const spin = new THREE.Group()
  steer.add(spin)
  const tire = new THREE.Mesh(wheelGeometry(radius, width), MAT.rubber)
  tire.castShadow = true; tire.receiveShadow = true
  spin.add(tire)

  // tread blocks
  const block = new THREE.BoxGeometry(width * 1.005, radius * 0.075, radius * 0.19)
  const inst = new THREE.InstancedMesh(block, MAT.rubber, 20)
  const dummy = new THREE.Object3D()
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2
    dummy.position.set(0, Math.cos(a) * radius * 0.985, Math.sin(a) * radius * 0.985)
    dummy.rotation.set(a, 0, 0)
    dummy.updateMatrix(); inst.setMatrixAt(i, dummy.matrix)
  }
  inst.castShadow = true
  spin.add(inst)

  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.56, radius * 0.56, width * 0.68, 22), MAT.steelDark)
  rim.rotation.z = Math.PI / 2; rim.castShadow = true
  spin.add(rim)
  for (const s of [-1, 1]) {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.52, radius * 0.52, 0.025, 22), MAT.steel)
    disc.rotation.z = Math.PI / 2
    disc.position.x = s * width * 0.35
    disc.castShadow = true
    spin.add(disc)
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.17, radius * 0.2, 0.05, 14), MAT.chrome)
    hub.rotation.z = Math.PI / 2; hub.position.x = s * width * 0.37
    hub.castShadow = true
    spin.add(hub)
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2
      const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.03, 6), MAT.steelDark)
      nut.rotation.z = Math.PI / 2
      nut.position.set(s * width * 0.38, Math.cos(a) * radius * 0.33, Math.sin(a) * radius * 0.33)
      spin.add(nut)
    }
  }
  // coloured sidewall ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.64, 0.008, 6, 32), MAT.paint)
  ring.rotation.y = Math.PI / 2; ring.position.x = width * 0.355
  spin.add(ring)
  mergeGroupStatic(spin)
  return { steer, spin, radius }
}

// ------------------------------------------------------------------ pelican
function featherGeo(len: number, wid: number) {
  const s = new THREE.Shape()
  s.moveTo(0, 0)
  s.bezierCurveTo(wid * 0.5, len * 0.1, wid * 0.62, len * 0.55, 0, len)
  s.bezierCurveTo(-wid * 0.62, len * 0.55, -wid * 0.5, len * 0.1, 0, 0)
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.012, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.006, bevelSegments: 2, curveSegments: 8 })
  g.center()
  return g
}

function createPelican(): { root: THREE.Group; head: THREE.Group; neck: THREE.Mesh; torso: THREE.Object3D } {
  const root = new THREE.Group()
  const white = MAT.feather, shade = MAT.featherShade, tip = MAT.featherTip

  const torso = new THREE.Group()
  root.add(torso)
  const body = addMesh(torso, new THREE.SphereGeometry(0.5, 28, 22), white, 0, 1.30, -0.28)
  body.scale.set(0.78, 0.96, 0.68)
  // chest / belly feather tiers
  for (let i = 0; i < 3; i++) {
    const t = addMesh(torso, new THREE.SphereGeometry(0.5, 22, 16), i === 1 ? shade : white, 0, 1.16 - i * 0.075, -0.27 + i * 0.015)
    t.scale.set(0.68 - i * 0.02, 0.36, 0.6)
  }
  // high-vis harness: a band plus reflective stripes worn over the feathers
  const vest = addMesh(torso, new THREE.CylinderGeometry(0.405, 0.43, 0.3, 26, 1, true), new THREE.MeshStandardMaterial({ color: 0xd9822c, roughness: 0.66, metalness: 0.03, side: THREE.DoubleSide }), 0, 1.27, -0.27)
  vest.scale.set(1.0, 1, 0.82)
  for (const yy of [1.36, 1.2]) {
    const stripe = addMesh(torso, new THREE.TorusGeometry(0.42, 0.017, 6, 30), new THREE.MeshStandardMaterial({ color: 0xd7ddd6, roughness: 0.35, metalness: 0.25 }), 0, yy, -0.27, Math.PI / 2, 0, 0, false, false)
    stripe.scale.set(1, 0.82, 1)
  }
  // small crew badge
  addMesh(torso, new THREE.CircleGeometry(0.055, 16), new THREE.MeshStandardMaterial({ color: 0x203033, roughness: 0.5 }), 0, 1.25, 0.085, 0, 0, 0, false, false).scale.set(1, 1.25, 1)
  // tail feathers
  for (let i = 0; i < 3; i++) {
    const f = addMesh(torso, featherGeo(0.5, 0.2), shade, -0.13 + i * 0.13, 1.16, -0.62, Math.PI * 0.72, 0, (i - 1) * 0.16)
    f.scale.setScalar(0.9)
  }

  // neck (S curve), parented to torso
  const neckCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.56, -0.23),
    new THREE.Vector3(0.005, 1.72, -0.18),
    new THREE.Vector3(0.005, 1.90, -0.05),
    new THREE.Vector3(0.01, 2.02, 0.15),
    new THREE.Vector3(0.005, 2.02, 0.28),
  ])
  const neck = new THREE.Mesh(new THREE.TubeGeometry(neckCurve, 32, 0.095, 12, false), white)
  neck.castShadow = true; neck.receiveShadow = true
  neck.scale.set(1, 1, 1)
  torso.add(neck)
  // neck feather ruff
  const ruff = addMesh(torso, new THREE.SphereGeometry(0.5, 16, 12), shade, 0, 1.55, -0.21)
  ruff.scale.set(0.3, 0.22, 0.28)

  const head = new THREE.Group()
  head.position.set(0, 2.03, 0.30)
  torso.add(head)
  const skull = addMesh(head, new THREE.SphereGeometry(0.5, 24, 18), white, 0, 0, 0)
  skull.scale.set(0.32, 0.3, 0.36)
  // eyes: set high and back so the long bill reads clearly
  const irisMat = new THREE.MeshStandardMaterial({ color: 0xd8a24b, roughness: 0.42, metalness: 0.05 })
  for (const s of [-1, 1]) {
    const patch = addMesh(head, new THREE.SphereGeometry(0.078, 14, 12), MAT.featherShade, s * 0.145, 0.055, 0.055)
    patch.scale.set(0.72, 1.05, 1.1)
    const e = addMesh(head, new THREE.SphereGeometry(0.058, 16, 12), MAT.eye, s * 0.155, 0.06, 0.075)
    e.scale.set(1, 1.08, 0.72)
    addMesh(head, new THREE.SphereGeometry(0.035, 14, 10), irisMat, s * 0.181, 0.06, 0.099).scale.set(1, 1, 0.7)
    addMesh(head, new THREE.SphereGeometry(0.021, 12, 10), MAT.pupil, s * 0.192, 0.061, 0.112)
    addMesh(head, new THREE.SphereGeometry(0.007, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }), s * 0.2, 0.074, 0.122, 0, 0, 0, false, false)
  }
  // nape crest feathers
  for (let i = 0; i < 3; i++) {
    const f = addMesh(head, featherGeo(0.26, 0.1), i === 1 ? shade : white, -0.06 + i * 0.06, 0.03, -0.14, -Math.PI * 0.72, 0, (i - 1) * 0.2)
    f.scale.set(0.8, 0.9, 0.7)
  }
  // long upper mandible with a hooked tip
  const upper = new THREE.Group()
  upper.position.set(0, 0.015, 0.15)
  head.add(upper)
  const upperGeo = new THREE.CylinderGeometry(0.012, 0.062, 0.7, 14, 1, false)
  upperGeo.rotateX(Math.PI / 2)
  const ub = addMesh(upper, upperGeo, MAT.beak, 0, 0.012, 0.36)
  ub.scale.set(1, 0.6, 1)
  const hook = addMesh(upper, new THREE.ConeGeometry(0.02, 0.075, 10), MAT.beak, 0, -0.028, 0.705, Math.PI * 0.7, 0, 0)
  // culmen ridge and nostrils
  box(upper, 0.012, 0.016, 0.55, 0, 0.045, 0.3, new THREE.MeshStandardMaterial({ color: 0xc57e2a, roughness: 0.5 }))
  addMesh(head, new THREE.SphereGeometry(0.012, 8, 6), MAT.graphite, 0.052, 0.0, 0.245, 0, 0, 0, false, false)
  addMesh(head, new THREE.SphereGeometry(0.012, 8, 6), MAT.graphite, -0.052, 0.0, 0.245, 0, 0, 0, false, false)
  // lower mandible + distinct throat pouch hanging beneath it
  const lowerGeo = new THREE.CylinderGeometry(0.008, 0.042, 0.58, 10)
  lowerGeo.rotateX(Math.PI / 2)
  addMesh(head, lowerGeo, MAT.beak, 0, -0.045, 0.44).scale.y = 0.5
  const pouch = addMesh(head, new THREE.SphereGeometry(0.5, 24, 18), MAT.pouch, 0, -0.19, 0.29)
  pouch.scale.set(0.2, 0.34, 0.47)
  pouch.rotation.x = 0.22
  const pouchUnder = addMesh(head, new THREE.SphereGeometry(0.5, 20, 14), MAT.pouch, 0, -0.28, 0.23)
  pouchUnder.scale.set(0.15, 0.2, 0.33)
  // pouch crease
  addMesh(head, new THREE.TorusGeometry(0.15, 0.007, 5, 20, Math.PI), new THREE.MeshStandardMaterial({ color: 0xb46424, roughness: 0.7 }), 0, -0.11, 0.43, Math.PI / 2, 0, 0, false, false)
  void hook

  // safety helmet
  const helmet = new THREE.Group()
  helmet.position.set(0, 0.13, -0.025); helmet.rotation.x = -0.1
  head.add(helmet)
  const shell = addMesh(helmet, new THREE.SphereGeometry(0.25, 26, 16, 0, Math.PI * 2, 0, Math.PI * 0.56), MAT.safetyYellow, 0, 0, 0)
  shell.scale.set(1.02, 0.9, 1.12)
  addMesh(helmet, new THREE.CylinderGeometry(0.255, 0.265, 0.024, 26), MAT.safetyYellow, 0, 0.0, 0.0)
  addMesh(helmet, new THREE.TorusGeometry(0.215, 0.011, 6, 26), MAT.graphite, 0, 0.006, 0, Math.PI / 2, 0, 0, false, false)
  // raised crown rib
  box(helmet, 0.035, 0.02, 0.34, 0, 0.205, -0.02, new THREE.MeshStandardMaterial({ color: 0xf0cf72, roughness: 0.5 }), 0, 0, 0, false)
  const brim = addMesh(helmet, new THREE.CylinderGeometry(0.13, 0.17, 0.02, 20), MAT.safetyYellow, 0, 0.002, 0.215, 0.08, 0, 0)
  brim.scale.set(1.28, 1, 1)
  addMesh(helmet, new THREE.CircleGeometry(0.042, 18), MAT.paintDark, 0, 0.19, 0.17, -0.45, 0, 0, false, false)
  addMesh(helmet, new THREE.CircleGeometry(0.028, 16), MAT.safetyYellow, 0, 0.193, 0.175, -0.45, 0, 0, false, false)

  // wings reaching to the wheel
  for (const s of [-1, 1]) {
    const wing = new THREE.Group()
    torso.add(wing)
    const shoulder = addMesh(wing, new THREE.SphereGeometry(0.5, 16, 12), white, s * 0.29, 1.38, -0.22)
    shoulder.scale.set(0.23, 0.4, 0.32)
    tube(wing, [
      new THREE.Vector3(s * 0.3, 1.4, -0.22),
      new THREE.Vector3(s * 0.34, 1.3, -0.02),
      new THREE.Vector3(s * 0.26, 1.31, 0.15),
      new THREE.Vector3(s * 0.18, 1.34, 0.24),
    ], 0.075, white, 18, 10)
    for (let i = 0; i < 3; i++) {
      const f = addMesh(wing, featherGeo(0.38, 0.17), i === 2 ? tip : shade, s * (0.31 - i * 0.025), 1.26 - i * 0.02, -0.08 + i * 0.03, Math.PI * 0.5, s * 0.25, s * (0.35 + i * 0.16))
      f.scale.set(1, 1, 0.7)
    }
    // primary feathers at the wingtip, resting on the wheel rim
    for (let i = 0; i < 3; i++) {
      const f = addMesh(wing, featherGeo(0.24, 0.1), i === 1 ? tip : shade, s * (0.2 + i * 0.012), 1.335 - i * 0.004, 0.27 + i * 0.02, Math.PI * 0.46, s * 0.35, s * 0.5)
      f.scale.set(0.8, 0.85, 0.7)
    }
  }

  // legs + webbed feet planted on the cab floor
  for (const s of [-1, 1]) {
    cylBetween(torso, new THREE.Vector3(s * 0.13, 1.02, -0.25), new THREE.Vector3(s * 0.15, 0.66, 0.16), 0.038, MAT.leg, 10)
    cylBetween(torso, new THREE.Vector3(s * 0.14, 0.7, -0.1), new THREE.Vector3(s * 0.15, 0.63, 0.16), 0.032, MAT.leg, 8)
    const foot = new THREE.Group()
    foot.position.set(s * 0.15, 0.605, 0.24)
    torso.add(foot)
    const webShape = new THREE.Shape()
    webShape.moveTo(0, 0)
    webShape.quadraticCurveTo(0.1, 0.06, 0.18, 0.03)
    webShape.quadraticCurveTo(0.11, -0.02, 0.15, -0.1)
    webShape.quadraticCurveTo(0.03, -0.08, 0, 0)
    const web = new THREE.Mesh(new THREE.ExtrudeGeometry(webShape, { depth: 0.022, bevelEnabled: false, curveSegments: 8 }), MAT.leg)
    web.rotation.x = -Math.PI / 2; web.rotation.z = s > 0 ? 0 : Math.PI
    web.position.z = 0.03
    web.castShadow = true; web.receiveShadow = true
    foot.add(web)
    addMesh(foot, new THREE.BoxGeometry(0.14, 0.018, 0.16), MAT.leg, 0.02, 0.01, 0.01, 0, 0, 0, true, true)
  }
  mergeGroupStatic(head)
  mergeGroupStatic(torso, new Set<THREE.Object3D>([head, neck]))
  // sit the bird properly into the operator station
  root.scale.setScalar(0.8)
  root.position.set(0, 0.145, 0.02)
  return { root, head, neck, torso }
}

// ------------------------------------------------------------------ forklift
export function createForklift(): ForkliftModel {
  const root = new THREE.Group()
  root.name = 'forklift'
  const P = MAT.paint, PD = MAT.paintDark, C = MAT.cream, G = MAT.graphite

  // ---- chassis / body mass
  roundedBox(root, 1.3, 0.38, 2.15, 0, 0.55, -0.02, P, 0.09, 0.035)
  roundedBox(root, 1.14, 0.5, 0.55, 0, 0.72, 1.0, P, 0.07, 0.03)
  roundedBox(root, 1.24, 0.6, 0.62, 0, 0.82, -0.62, P, 0.08, 0.03, 0.05)
  // sloped cowl below the mast window
  const cowl = roundedBox(root, 1.08, 0.34, 0.5, 0, 0.98, 0.82, PD, 0.06, 0.025, -0.13)
  void cowl
  // counterweight with ribs
  roundedBox(root, 1.27, 0.95, 0.62, 0, 0.8, -1.15, MAT.castIron, 0.09, 0.035)
  for (let i = -2; i <= 2; i++) {
    box(root, 0.12, 0.68, 0.04, i * 0.22, 0.79, -1.47, MAT.graphite)
  }
  box(root, 1.05, 0.12, 0.1, 0, 0.3, -1.47, MAT.steelDark)
  addMesh(root, new THREE.CylinderGeometry(0.055, 0.055, 0.16, 12), MAT.chrome, 0, 0.43, -1.5, Math.PI / 2, 0, 0)
  // hazard band along the counterweight base + academy number
  const hazMat = new THREE.MeshStandardMaterial({ map: (MAT.hazard as THREE.MeshStandardMaterial).map, roughness: 0.62, metalness: 0.08 })
  box(root, 1.24, 0.13, 0.02, 0, 0.31, -1.472, hazMat, 0, 0, 0, false)
  placard(root, '03', 'ACADEMY', 0.3, 0.15, -0.38, 0.62, -1.492, Math.PI)
  for (const s of [-1, 1]) {
    for (let i = 0; i < 4; i++) box(root, 0.02, 0.22, 0.012, s * 0.5, 0.78, -1.476, MAT.steelDark, 0, 0, 0, false)
    box(root, 0.02, 0.03, 0.26, s * 0.655, 0.45, -1.24, MAT.steelDark, 0, 0, 0, false)
    addMesh(root, new THREE.CylinderGeometry(0.075, 0.075, 0.035, 14), MAT.steelDark, s * 0.62, 0.62, -0.9, 0, 0, Math.PI / 2)
  }
  // rear vent panel and plate
  box(root, 0.72, 0.32, 0.035, 0, 0.98, -1.47, MAT.graphite)
  for (let i = 0; i < 6; i++) box(root, 0.62, 0.022, 0.012, 0, 0.87 + i * 0.045, -1.492, MAT.steelDark)
  placard(root, 'PELICAN', 'FL-ACADEMY 03', 0.52, 0.26, 0, 0.62, -1.49, Math.PI)

  // side panels + seams
  for (const s of [-1, 1]) {
    box(root, 0.02, 0.26, 1.2, s * 0.645, 0.62, 0.12, PD)
    box(root, 0.02, 0.02, 1.18, s * 0.655, 0.73, 0.1, MAT.steelDark)
    // step
    box(root, 0.3, 0.06, 0.5, s * 0.7, 0.32, -0.24, MAT.steelDark)
    for (let i = 0; i < 4; i++) box(root, 0.26, 0.012, 0.03, s * 0.7, 0.355, -0.4 + i * 0.1, MAT.steel)
    // hand rail
    cylBetween(root, new THREE.Vector3(s * 0.68, 0.82, -0.68), new THREE.Vector3(s * 0.68, 1.38, -0.72), 0.022, MAT.chrome, 8)
    // decal
    placard(root, 'PELICAN', 'FORKLIFT ACADEMY', 0.44, 0.22, s * 0.657, 0.93, -0.35, s > 0 ? Math.PI / 2 : -Math.PI / 2)
  }

  // fenders over the front wheels
  for (const s of [-1, 1]) {
    const archMat = new THREE.MeshStandardMaterial({ color: 0x174f49, metalness: 0.5, roughness: 0.4, side: THREE.DoubleSide })
    const arch = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.34, 20, 1, true, 0, Math.PI), archMat)
    arch.rotation.z = Math.PI / 2
    arch.rotation.y = 0
    arch.position.set(s * 0.74, 0.42, 0.7)
    arch.castShadow = true; arch.receiveShadow = true
    root.add(arch)
    // mud flap
    box(root, 0.32, 0.22, 0.03, s * 0.74, 0.28, 0.24, MAT.rubberTrim)
  }

  // bumpers, lights and grille
  box(root, 1.2, 0.14, 0.16, 0, 0.33, 1.24, MAT.steelDark)
  for (const s of [-1, 1]) {
    addMesh(root, new THREE.CylinderGeometry(0.115, 0.13, 0.12, 16), MAT.graphite, s * 0.41, 0.82, 1.24, Math.PI / 2, 0, 0)
    addMesh(root, new THREE.CylinderGeometry(0.095, 0.095, 0.03, 16), MAT.chrome, s * 0.41, 0.82, 1.31, Math.PI / 2, 0, 0)
    addMesh(root, new THREE.CircleGeometry(0.082, 16), MAT.headlight, s * 0.41, 0.82, 1.328, 0, 0, 0, false, false)
    box(root, 0.1, 0.2, 0.12, s * 0.44, 1.15, 1.22, MAT.graphite)
    addMesh(root, new THREE.CircleGeometry(0.04, 12), MAT.beacon, s * 0.44, 1.19, 1.286, 0, 0, 0, false, false)
    // grille slots beside the lights
    for (let i = 0; i < 3; i++) box(root, 0.15, 0.035, 0.02, s * 0.16, 0.92 + i * 0.06, 1.283, MAT.graphite)
  }
  // rear lights
  for (const s of [-1, 1]) {
    box(root, 0.12, 0.16, 0.04, s * 0.5, 1.02, -1.47, MAT.taillight)
  }
  // exhaust
  cylBetween(root, new THREE.Vector3(0.48, 0.55, -1.32), new THREE.Vector3(0.48, 1.5, -1.32), 0.035, MAT.graphite, 10)
  addMesh(root, new THREE.CylinderGeometry(0.055, 0.045, 0.05, 10), MAT.steelDark, 0.48, 1.52, -1.32)
  // tiny antenna
  cylBetween(root, new THREE.Vector3(-0.5, 1.4, -1.32), new THREE.Vector3(-0.5, 2.0, -1.38), 0.006, MAT.chrome, 5)

  // ---- deck, seat, controls
  const deckY = 0.59
  roundedBox(root, 1.08, 0.07, 1.2, 0, deckY, 0.16, MAT.steelDark, 0.02, 0.01)
  for (let i = 0; i < 4; i++) box(root, 0.9, 0.012, 0.03, 0, deckY + 0.045, -0.05 + i * 0.14, MAT.steel)
  // seat
  const seat = new THREE.Group()
  root.add(seat)
  roundedBox(seat, 0.64, 0.14, 0.56, 0, 0.96, -0.14, MAT.seat, 0.05, 0.02)
  roundedBox(seat, 0.64, 0.08, 0.54, 0, 1.055, -0.14, MAT.seat, 0.04, 0.015)
  roundedBox(seat, 0.64, 0.7, 0.14, 0, 1.28, -0.43, MAT.seat, 0.06, 0.025, -0.1)
  roundedBox(seat, 0.4, 0.18, 0.13, 0, 1.66, -0.47, MAT.seat, 0.05, 0.02, -0.1)
  for (const s of [-1, 1]) {
    roundedBox(seat, 0.12, 0.36, 0.5, s * 0.38, 1.06, -0.13, MAT.seat, 0.04, 0.015)
    box(seat, 0.42, 0.01, 0.06, s * 0.1, 1.065, 0.06, MAT.seatStitch)
    box(seat, 0.42, 0.01, 0.06, s * 0.1, 1.065, -0.32, MAT.seatStitch)
  }
  for (let i = 0; i < 3; i++) box(seat, 0.36, 0.008, 0.018, 0, 1.16 + i * 0.11, -0.498, MAT.seatStitch)
  box(root, 0.22, 0.1, 0.3, 0.48, 1.04, -0.1, MAT.graphite)
  // pedals
  for (const s of [-1, 1]) {
    box(root, 0.16, 0.025, 0.24, s * 0.16, deckY + 0.085, 0.48, MAT.graphite, -0.25, 0, 0)
    box(root, 0.14, 0.012, 0.2, s * 0.16, deckY + 0.1, 0.46, MAT.steelDark, -0.25, 0, 0)
  }
  // steering column + wheel
  const columnA = new THREE.Vector3(0, 1.03, 0.5)
  const columnB = new THREE.Vector3(0, 1.26, 0.27)
  cylBetween(root, columnA, columnB, 0.055, MAT.graphite, 14)
  cylBetween(root, new THREE.Vector3(-0.12, 1.05, 0.47), new THREE.Vector3(-0.12, 1.22, 0.36), 0.025, MAT.chrome, 8)
  const wheelHub = new THREE.Group()
  wheelHub.position.set(0, 1.33, 0.22)
  wheelHub.rotation.x = -0.9
  root.add(wheelHub)
  const wheelRim = addMesh(wheelHub, new THREE.TorusGeometry(0.185, 0.024, 10, 30), MAT.graphite, 0, 0, 0)
  wheelRim.castShadow = true
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + Math.PI / 2
    box(wheelHub, 0.03, 0.02, 0.34, Math.cos(a) * 0.085, Math.sin(a) * 0.085, 0, MAT.steelDark, 0, 0, -a + Math.PI / 2, false)
  }
  addMesh(wheelHub, new THREE.CylinderGeometry(0.06, 0.06, 0.06, 16), MAT.steelDark, 0, 0, 0, Math.PI / 2, 0, 0)
  addMesh(wheelHub, new THREE.CylinderGeometry(0.04, 0.04, 0.075, 12), MAT.cream, 0, 0, 0.01, Math.PI / 2, 0, 0)
  addMesh(wheelHub, new THREE.SphereGeometry(0.035, 12, 10), MAT.beak, 0.15, -0.1, 0.015)
  // dashboard
  const dash = new THREE.Group()
  dash.position.set(0, 1.2, 0.72); dash.rotation.x = -0.34
  root.add(dash)
  roundedBox(dash, 0.76, 0.34, 0.12, 0, 0, 0, MAT.graphite, 0.04, 0.02)
  const gaugeMat = new THREE.MeshStandardMaterial({ map: gaugeTexture(), roughness: 0.45, metalness: 0.15 })
  addMesh(dash, new THREE.PlaneGeometry(0.5, 0.25), gaugeMat, 0, 0.03, -0.062, 0, Math.PI, 0, false, false)
  for (const s of [-1, 1]) {
    const lampMat = s > 0 ? MAT.taillight : MAT.headlight
    addMesh(dash, new THREE.CircleGeometry(0.018, 10), lampMat, s * 0.28, 0.1, -0.063, 0, Math.PI, 0, false, false)
  }
  // hydraulic levers
  for (let i = 0; i < 3; i++) {
    const x = 0.26 + i * 0.085
    cylBetween(root, new THREE.Vector3(x, 1.0, 0.42), new THREE.Vector3(x + 0.02, 1.32 + i * 0.03, 0.34), 0.012, MAT.chrome, 6)
    addMesh(root, new THREE.SphereGeometry(0.032, 10, 8), i === 0 ? MAT.beak : MAT.graphite, x + 0.02, 1.33 + i * 0.03, 0.34)
  }
  // overhead guard
  for (const s of [-1, 1]) for (const t of [-1, 1]) {
    roundedBox(root, 0.1, 1.3, 0.1, s * 0.63, 1.78, t * 0.66, PD, 0.03, 0.012)
  }
  roundedBox(root, 1.5, 0.13, 1.7, 0, 2.43, -0.06, P, 0.12, 0.03)
  for (let i = 0; i < 4; i++) box(root, 1.2, 0.016, 0.07, 0, 2.365, -0.5 + i * 0.28, MAT.steelDark)
  for (let i = 0; i < 5; i++) box(root, 1.28, 0.018, 0.05, 0, 2.5, -0.72 + i * 0.33, PD)
  box(root, 1.3, 0.03, 0.07, 0, 2.505, 0.74, MAT.chrome, 0, 0, 0, false)
  placard(root, 'PELICAN', 'FL-03 · ACADEMY', 0.32, 0.16, 0, 2.547, -0.5, Math.PI)
  roundedBox(root, 1.36, 0.04, 1.5, 0, 2.345, -0.06, C, 0.08, 0.015)
  // beacon
  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.085, 0.14, 14), MAT.beacon)
  beacon.position.set(0.48, 2.56, -0.35)
  beacon.castShadow = true
  root.add(beacon)
  addMesh(root, new THREE.CylinderGeometry(0.09, 0.1, 0.035, 14), MAT.graphite, 0.48, 2.49, -0.35)
  const beaconGlow = new THREE.PointLight(0xffab2e, 0.5, 3, 2)
  beaconGlow.position.set(0.48, 2.6, -0.35)
  root.add(beaconGlow)
  // work lights under the roof
  for (const s of [-1, 1]) {
    box(root, 0.18, 0.12, 0.13, s * 0.4, 2.33, 0.71, MAT.graphite)
    addMesh(root, new THREE.CircleGeometry(0.06, 12), MAT.headlight, s * 0.4, 2.33, 0.78, 0, 0, 0, false, false)
  }
  // front glass
  const glass = addMesh(root, new THREE.PlaneGeometry(1.14, 1.05), MAT.glass, 0, 1.8, 0.705, 0, 0, 0, false, false)
  glass.renderOrder = 3
  // little mirrors
  for (const s of [-1, 1]) {
    cylBetween(root, new THREE.Vector3(s * 0.63, 2.02, 0.64), new THREE.Vector3(s * 0.82, 2.06, 0.55), 0.012, MAT.graphite, 6)
    roundedBox(root, 0.02, 0.17, 0.12, s * 0.83, 2.08, 0.53, MAT.steelDark, 0.01, 0.005)
    addMesh(root, new THREE.PlaneGeometry(0.1, 0.15), new THREE.MeshStandardMaterial({ color: 0x9fb4b4, metalness: 0.9, roughness: 0.08 }), s * 0.843, 2.08, 0.53, 0, s * Math.PI / 2, 0, false, false)
  }
  // warning placard in the cab
  placard(root, 'FASTEN', 'SEAT BELT', 0.26, 0.13, 0.63, 1.5, -0.55, Math.PI / 2)

  // ---- mast and forks
  const mast = new THREE.Group()
  mast.position.set(0, 0, 0)
  root.add(mast)
  for (const s of [-1, 1]) {
    box(mast, 0.11, 2.82, 0.18, s * 0.53, 1.53, 1.06, MAT.steelDark)
    box(mast, 0.035, 2.7, 0.21, s * 0.46, 1.5, 1.06, MAT.steel)
    box(mast, 0.09, 2.6, 0.12, s * 0.36, 1.48, 1.12, MAT.steelDark)
    // chrome rail faces
    box(mast, 0.02, 2.55, 0.03, s * 0.585, 1.5, 1.06, MAT.steel)
    for (let i = 0; i < 5; i++) box(mast, 0.14, 0.045, 0.2, s * 0.53, 0.35 + i * 0.58, 1.06, MAT.steel)
  }
  for (const y of [0.2, 1.45, 2.8]) box(mast, 1.16, 0.11, 0.15, 0, y, 1.06, MAT.steelDark)
  box(mast, 0.86, 0.1, 0.13, 0, 2.9, 1.06, MAT.steelDark)
  // cross brace top with pulley
  addMesh(mast, new THREE.CylinderGeometry(0.06, 0.06, 0.9, 12), MAT.steelDark, 0, 2.95, 1.1, 0, 0, Math.PI / 2)
  // hydraulic cylinders
  for (const s of [-1, 1]) {
    addMesh(mast, new THREE.CylinderGeometry(0.065, 0.075, 1.55, 12), MAT.graphite, s * 0.23, 0.92, 1.16)
    addMesh(mast, new THREE.CylinderGeometry(0.032, 0.032, 1.3, 10), MAT.chrome, s * 0.23, 2.3, 1.16)
    addMesh(mast, new THREE.CylinderGeometry(0.05, 0.05, 0.09, 10), MAT.steelDark, s * 0.23, 1.7, 1.16)
    // lift chain
    for (let i = 0; i < 14; i++) box(mast, 0.028, 0.045, 0.02, s * 0.3, 2.78 - i * 0.18, 1.2, MAT.steelDark, 0, 0, 0, false)
    cylBetween(mast, new THREE.Vector3(s * 0.06, 0.36, 1.02), new THREE.Vector3(s * 0.5, 1.75, 1.02), 0.02, MAT.rubber, 7)
  }
  // tilt cylinders from cowl to mast
  for (const s of [-1, 1]) {
    cylBetween(root, new THREE.Vector3(s * 0.42, 0.72, 0.92), new THREE.Vector3(s * 0.42, 1.1, 1.16), 0.045, MAT.graphite, 10)
    addMesh(root, new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8), MAT.chrome, s * 0.42, 1.55, 1.17, 0.25, 0, 0)
  }
  // carriage + forks (lift group moves vertically)
  const lift = new THREE.Group()
  lift.position.set(0, 0, 0)
  root.add(lift)
  roundedBox(lift, 1.24, 0.5, 0.09, 0, 0.37, 1.27, MAT.steelDark, 0.03, 0.012)
  box(lift, 1.3, 0.06, 0.12, 0, 0.13, 1.27, MAT.steel)
  // load backrest grid
  for (let i = -2; i <= 2; i++) box(lift, 0.055, 0.66, 0.05, i * 0.27, 0.92, 1.3, MAT.steelDark)
  for (const y of [0.66, 0.92, 1.18]) box(lift, 1.22, 0.05, 0.05, 0, y, 1.3, MAT.steel)
  // rollers
  for (const s of [-1, 1]) for (const y of [0.18, 0.56]) {
    addMesh(lift, new THREE.CylinderGeometry(0.055, 0.055, 0.08, 12), MAT.chrome, s * 0.58, y, 1.2, 0, 0, Math.PI / 2)
  }
  // two forks with a real extruded profile
  const forkShape = new THREE.Shape()
  forkShape.moveTo(0, 0)
  forkShape.lineTo(1.03, 0)
  forkShape.lineTo(1.06, 0.02)
  forkShape.lineTo(1.06, 0.055)
  forkShape.lineTo(1.03, 0.078)
  forkShape.lineTo(0.25, 0.078)
  forkShape.lineTo(0.22, 0.58)
  forkShape.lineTo(0.06, 0.58)
  forkShape.lineTo(0.05, 0.078)
  forkShape.lineTo(0, 0.078)
  forkShape.closePath()
  const forkGeo = new THREE.ExtrudeGeometry(forkShape, { depth: 0.16, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 2, steps: 1 })
  forkGeo.rotateY(-Math.PI / 2)
  forkGeo.translate(0.08, 0.022, 1.3)
  for (const s of [-1, 1]) {
    const f = new THREE.Mesh(forkGeo, MAT.steelDark)
    f.position.x = s * 0.32
    f.castShadow = true; f.receiveShadow = true
    lift.add(f)
    // bolts at the fork root
    for (let i = 0; i < 2; i++) {
      addMesh(lift, new THREE.CylinderGeometry(0.025, 0.025, 0.02, 8), MAT.chrome, s * 0.32, 0.46 + i * 0.09, 1.385, Math.PI / 2, 0, 0)
    }
    // heel wear pad
    box(lift, 0.165, 0.014, 0.3, s * 0.32, 0.105, 1.5, MAT.chrome, 0, 0, 0, false)
  }
  // fork heels / heel plate
  box(lift, 0.86, 0.08, 0.1, 0, 0.11, 1.34, MAT.steelDark)
  // decals on the mast
  placard(mast, 'PELICAN', 'MAX 1800 kg', 0.34, 0.17, 0, 2.55, 1.17, 0)

  // wheels: front drive wheels, rear steer wheels
  const wheels: ForkliftModel['wheels'] = []
  for (const s of [-1, 1]) {
    const w = makeWheel(0.34, 0.28)
    w.steer.position.set(s * 0.79, 0.34, 0.68)
    root.add(w.steer)
    wheels.push({ ...w, front: true })
    const r = makeWheel(0.27, 0.22)
    r.steer.position.set(s * 0.55, 0.27, -0.8)
    root.add(r.steer)
    wheels.push({ ...r, front: false })
    // rear axle / steering knuckle details
    cylBetween(root, new THREE.Vector3(s * 0.46, 0.3, -0.8), new THREE.Vector3(s * 0.66, 0.3, -0.8), 0.055, MAT.castIron, 10)
  }
  // axle housings
  addMesh(root, new THREE.CylinderGeometry(0.075, 0.075, 1.5, 12), MAT.castIron, 0, 0.34, 0.68, 0, 0, Math.PI / 2)
  addMesh(root, new THREE.CylinderGeometry(0.06, 0.06, 1.1, 12), MAT.castIron, 0, 0.28, -0.8, 0, 0, Math.PI / 2)

  // pelican driver
  const pel = createPelican()
  root.add(pel.root)

  // contact shadow (helps even in bright zones)
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 3.2),
    new THREE.MeshBasicMaterial({ map: softShadowTexture(), transparent: true, depthWrite: false, opacity: 0.55 }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.set(0, 0.008, 0.2)
  shadow.renderOrder = 1
  root.add(shadow)

  mergeGroupStatic(lift)
  const live = new Set<THREE.Object3D>([lift, pel.root, beacon, shadow, ...wheels.map((w) => w.steer)])
  mergeGroupStatic(root, live)

  return { root, lift, wheels, pelican: pel, beacon, shadow }
}

// ------------------------------------------------------------------ crates
export function createCrate(color: CrateColor): THREE.Group {
  const g = new THREE.Group()
  g.name = `crate-${color}`
  const side = crateSideMaterial(color)
  const top = crateTopMaterial()
  const mats = [side, side, top, top, side, side]
  const bodyH = CRATE.h - CRATE.bodyBottom
  const body = new THREE.Mesh(new THREE.BoxGeometry(CRATE.w, bodyH, CRATE.d), mats)
  body.position.y = CRATE.halfH - bodyH / 2
  body.castShadow = true; body.receiveShadow = true
  g.add(body)

  // outer frame
  const fw = 0.055
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    box(g, fw, bodyH + 0.02, fw, sx * (CRATE.w / 2 - fw / 2), body.position.y, sz * (CRATE.d / 2 - fw / 2), MAT.crateFrame)
  }
  for (const y of [-0.36, 0.46]) {
    for (const sx of [-1, 1]) box(g, fw, 0.055, CRATE.d, sx * (CRATE.w / 2 - fw / 2), y, 0, MAT.crateFrame)
    for (const sz of [-1, 1]) box(g, CRATE.w, 0.055, fw, 0, y, sz * (CRATE.d / 2 - fw / 2), MAT.crateFrame)
  }
  // metal corner caps
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
    box(g, 0.085, 0.11, 0.02, sx * (CRATE.w / 2 - 0.03), sy * 0.47, sz * (CRATE.d / 2 + 0.005), MAT.crateMetal)
    box(g, 0.02, 0.11, 0.085, sx * (CRATE.w / 2 + 0.005), sy * 0.47, sz * (CRATE.d / 2 - 0.03), MAT.crateMetal)
  }
  // handles
  for (const sx of [-1, 1]) {
    box(g, 0.02, 0.16, 0.26, sx * (CRATE.w / 2 + 0.012), 0.02, 0.1, MAT.graphite, 0, 0, 0, false)
    box(g, 0.018, 0.045, 0.2, sx * (CRATE.w / 2 + 0.027), 0.1, 0.1, MAT.steelDark, 0, 0, 0, false)
  }
  // pallet skids (fork pockets between them)
  for (const x of [0, -0.45, 0.45]) {
    box(g, 0.12, 0.12, CRATE.d, x, -0.44, 0, MAT.woodDark)
  }
  box(g, CRATE.w - 0.04, 0.05, CRATE.d - 0.06, 0, -0.34, 0, MAT.woodDark)
  // top lid rails
  for (const sz of [-1, 1]) box(g, CRATE.w, 0.035, 0.06, 0, 0.49, sz * 0.44, MAT.crateFrame)
  for (const sx of [-1, 1]) box(g, 0.06, 0.035, CRATE.d, sx * 0.5, 0.49, 0, MAT.crateFrame)
  mergeGroupStatic(g)
  return g
}
