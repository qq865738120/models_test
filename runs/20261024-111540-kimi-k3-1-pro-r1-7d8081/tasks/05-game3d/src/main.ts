import './style.css'
import * as THREE from 'three'
import { Project, Scene3D, PhysicsLoader } from 'enable3d'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

type GameState = 'start' | 'playing' | 'paused' | 'won' | 'lost'
type CargoColor = 'amber' | 'teal' | 'coral'
type Obstacle = { minX: number; maxX: number; minZ: number; maxZ: number }
type Cargo = {
  id: number; color: CargoColor; name: string; root: any; body: any;
  start: THREE.Vector3; zone: THREE.Vector3; delivered: boolean; carried: boolean;
  stableTime: number; yaw: number; size: number; label: string
}

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T
const clamp = THREE.MathUtils.clamp
const lerp = THREE.MathUtils.lerp
const CARGO_COLORS = { amber: '#e9a84c', teal: '#42b7ad', coral: '#e77561' }
const CARGO_HEX = { amber: 0xe9a84c, teal: 0x42b7ad, coral: 0xe77561 }
const CAR_WIDTH = 1.64
const FORK_BASE = 0.18
const MAX_LIFT = 1.75
const tmpV = new THREE.Vector3()
const tmpV2 = new THREE.Vector3()
const tmpQ = new THREE.Quaternion()

function mat(color: number, roughness = .55, metalness = .05, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra })
}
function mesh(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], parent: THREE.Object3D, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geometry, material)
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m
}
function box(parent: THREE.Object3D, size: [number, number, number], material: THREE.Material, pos: [number, number, number], radius = 0) {
  const g = radius > 0 ? new RoundedBoxGeometry(size[0], size[1], size[2], 3, radius) : new THREE.BoxGeometry(...size)
  return mesh(g, material, parent, ...pos)
}
function cyl(parent: THREE.Object3D, rt: number, rb: number, h: number, material: THREE.Material, pos: [number, number, number], segments = 20) {
  return mesh(new THREE.CylinderGeometry(rt, rb, h, segments), material, parent, ...pos)
}
function sphere(parent: THREE.Object3D, radius: number, material: THREE.Material, pos: [number, number, number], scale: [number, number, number] = [1, 1, 1]) {
  const s = mesh(new THREE.SphereGeometry(radius, 24, 16), material, parent, ...pos); s.scale.set(...scale); return s
}
function tube(parent: THREE.Object3D, points: THREE.Vector3[], radius: number, material: THREE.Material, segments = 32) {
  return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 8, false), material, parent)
}
function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas'); c.width = width; c.height = height
  draw(c.getContext('2d')!)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t
}
function textPlane(parent: THREE.Object3D, text: string, sub: string, color: string, width: number, height: number, pos: [number, number, number], rotation: [number, number, number] = [0, 0, 0]) {
  const t = canvasTexture(512, 256, ctx => {
    ctx.clearRect(0, 0, 512, 256); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = color; ctx.font = '900 94px sans-serif'; ctx.fillText(text, 256, sub ? 102 : 130)
    if (sub) { ctx.font = '600 28px sans-serif'; ctx.letterSpacing = '4px'; ctx.fillText(sub, 256, 190) }
  })
  const p = mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide }), parent, ...pos)
  p.rotation.set(...rotation); p.castShadow = false; return p
}
function noiseTexture(base: string, speck: string, lines = false) {
  const t = canvasTexture(512, 512, ctx => {
    ctx.fillStyle = base; ctx.fillRect(0, 0, 512, 512)
    let seed = 9173; const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
    for (let i = 0; i < 13000; i++) { const a = rnd() * .15; ctx.fillStyle = speck.replace('A', String(a)); ctx.fillRect(rnd() * 512, rnd() * 512, rnd() * 2 + .3, rnd() * 2 + .3) }
    if (lines) { ctx.strokeStyle = 'rgba(40,48,48,.13)'; ctx.lineWidth = 2; for (let i = 0; i < 512; i += 128) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke() } }
  })
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t
}
function angleDelta(a: number, b: number) { return Math.atan2(Math.sin(a - b), Math.cos(a - b)) }

class DrivingScene extends Scene3D {
  state: GameState = 'start'
  keys = new Set<string>()
  obstacles: Obstacle[] = []
  occluders: THREE.Object3D[] = []
  cargos: Cargo[] = []
  car = new THREE.Group()
  carriage = new THREE.Group()
  wheels: { pivot: THREE.Group; spinner: THREE.Group; radius: number; steer: boolean }[] = []
  piston!: THREE.Mesh
  chainLeft!: THREE.Mesh
  chainRight!: THREE.Mesh
  position = new THREE.Vector3(0, 0, 5)
  yaw = Math.PI
  speed = 0
  steering = 0
  lift = 0
  carried: Cargo | null = null
  timeLeft = 120
  delivered = 0
  cameraMode = 0
  inspectView: string | null = null
  camTarget = new THREE.Vector3()
  toastTimer = 0
  badgeTimer = 0
  elapsed = 0
  lastHudSecond = -1
  ready = false
  startCamera = new THREE.Vector3(10, 6.2, 11)

  constructor() { super({ key: 'pelican-academy' }) }

  async create() {
    await this.warpSpeed()
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.08
    this.scene.background = new THREE.Color(0x9aaba9)
    this.scene.fog = new THREE.Fog(0x9aaba9, 24, 55)
    const camera = this.camera as THREE.PerspectiveCamera
    camera.fov = 48; camera.near = .08; camera.far = 90; camera.updateProjectionMatrix()
    this.createLights()
    this.createWarehouse()
    this.createForklift()
    this.createCargo()
    this.bindUI()
    this.resetGame(false)
    this.camera.position.copy(this.startCamera); this.camera.lookAt(1.2, 1.1, .3)
    this.ready = true
    ;(window as any).__pelican = { scene: this, renderer: this.renderer }
  }

  createLights() {
    const hemi = new THREE.HemisphereLight(0xd9eff2, 0x596153, 2.0); this.scene.add(hemi)
    const sun = new THREE.DirectionalLight(0xffe6bc, 4.0); sun.position.set(-9, 15, 8); sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -18; sun.shadow.camera.right = 18; sun.shadow.camera.top = 16; sun.shadow.camera.bottom = -16
    sun.shadow.camera.near = 2; sun.shadow.camera.far = 42; sun.shadow.bias = -.00018; sun.shadow.normalBias = .035; this.scene.add(sun)
    const fill = new THREE.DirectionalLight(0xb7d8e2, 1.15); fill.position.set(10, 7, -6); this.scene.add(fill)
    const warm = new THREE.PointLight(0xffcf82, 28, 14, 2); warm.position.set(0, 5.4, 1); this.scene.add(warm)
  }

  addStaticBox(x: number, y: number, z: number, w: number, h: number, d: number, visual = false, material?: THREE.Material) {
    const m: any = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material || mat(0x777777))
    m.position.set(x, y, z); m.visible = visual; m.castShadow = visual; m.receiveShadow = visual; this.add.existing(m)
    this.physics.add.existing(m, { mass: 0, shape: 'box', width: w, height: h, depth: d })
    this.obstacles.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 })
    if (visual) this.occluders.push(m)
    return m
  }

  createWarehouse() {
    const floorTex = noiseTexture('#8f9994', 'rgba(30,40,38,A)', true); floorTex.repeat.set(7, 6)
    const floorMat = mat(0xb4b9ae, .91, .02, { map: floorTex })
    const floor = mesh(new THREE.PlaneGeometry(26, 22), floorMat, this.scene, 0, 0, 0); floor.rotation.x = -Math.PI / 2; floor.castShadow = false
    const floorBody: any = new THREE.Mesh(new THREE.BoxGeometry(26, .3, 22), floorMat); floorBody.position.y = -.16; floorBody.visible = false
    this.add.existing(floorBody); this.physics.add.existing(floorBody, { mass: 0, shape: 'box', width: 26, height: .3, depth: 22 })

    const wallMat = mat(0xaeb6ae, .86, .03, { map: noiseTexture('#a5aea7', 'rgba(40,50,48,A)') })
    const lowerWall = mat(0x546a6b, .72, .12)
    this.addStaticBox(-13.1, 3, 0, .3, 6, 22, true, wallMat)
    this.addStaticBox(13.1, 3, 0, .3, 6, 22, true, wallMat)
    this.addStaticBox(0, 3, -11.1, 26, 6, .3, true, wallMat)
    this.addStaticBox(0, .35, 11.1, 26, .7, .25, true, lowerWall)
    box(this.scene, [25.8, 1.05, .08], lowerWall, [0, .54, -10.92])
    box(this.scene, [.08, 1.05, 21.7], lowerWall, [-12.92, .54, 0])
    box(this.scene, [.08, 1.05, 21.7], lowerWall, [12.92, .54, 0])

    const beamMat = mat(0x344a50, .48, .65)
    const yellow = mat(0xe9aa43, .48, .3)
    for (const x of [-12.6, 12.6]) for (const z of [-9, -3, 3, 9]) {
      box(this.scene, [.24, 6.2, .24], beamMat, [x, 3.05, z])
      box(this.scene, [.38, .18, .38], yellow, [x, .1, z])
    }
    for (const z of [-9, -3, 3, 9]) box(this.scene, [25.4, .2, .22], beamMat, [0, 5.85, z])
    for (const x of [-6, 0, 6]) {
      const sky = box(this.scene, [4.4, .04, 4.8], mat(0xc7e0dd, .35, .1, { emissive: 0xb9d6d2, emissiveIntensity: .45 }), [x, 5.92, -5.8]); sky.castShadow = false
    }
    const lampMat = mat(0xf2e5c8, .25, .25, { emissive: 0xffd99c, emissiveIntensity: 2.4 })
    for (const x of [-7, 0, 7]) for (const z of [-6, 3]) {
      cyl(this.scene, .025, .025, .7, beamMat, [x, 5.35, z], 8)
      const shade = cyl(this.scene, .13, .42, .25, beamMat, [x, 4.94, z], 24)
      const light = cyl(this.scene, .34, .34, .035, lampMat, [x, 4.8, z], 24); light.castShadow = false
    }

    // 高窗与仓库标识
    const glass = mat(0x8fb7bb, .25, .15, { emissive: 0x7caeb3, emissiveIntensity: .42 })
    for (const x of [-9, -5.4, -1.8, 1.8, 5.4, 9]) {
      box(this.scene, [2.5, 1.35, .04], glass, [x, 4.25, -10.91])
      box(this.scene, [2.65, .08, .09], beamMat, [x, 3.55, -10.84])
    }
    textPlane(this.scene, '07', 'PELICAN LOGISTICS', '#e8ece4', 4.5, 2.25, [0, 2.55, -10.9])
    textPlane(this.scene, '安 全 第 一', 'SAFETY FIRST', '#f0b24e', 3.4, 1.5, [-8.6, 2.4, -10.9])

    this.createRack(-10.25, -5.7, 0)
    this.createRack(-10.25, 2.3, 0)
    this.createRack(10.25, -5.7, Math.PI)
    this.createRack(10.25, 2.3, Math.PI)

    const lineMat = new THREE.MeshBasicMaterial({ color: 0xe7c156, transparent: true, opacity: .82, side: THREE.DoubleSide })
    const whiteLine = new THREE.MeshBasicMaterial({ color: 0xe1e2d4, transparent: true, opacity: .55, side: THREE.DoubleSide })
    const floorLine = (x: number, z: number, w: number, d: number, material: THREE.Material = lineMat) => {
      const p = mesh(new THREE.PlaneGeometry(w, d), material, this.scene, x, .012, z); p.rotation.x = -Math.PI / 2; p.castShadow = false
    }
    floorLine(-8.55, 0, .07, 20); floorLine(8.55, 0, .07, 20)
    for (let z = -9; z < 10; z += 2) floorLine(0, z, .075, 1.05, whiteLine)
    for (const x of [-6, 0, 6]) {
      floorLine(x, 6.7, 2.7, .08); floorLine(x - 1.35, 5.9, .08, 1.6); floorLine(x + 1.35, 5.9, .08, 1.6)
    }
    textPlane(this.scene, '慢', 'SLOW  ·  5 km/h', '#e4d060', 2.7, 1.35, [0, .018, 3.2], [-Math.PI / 2, 0, 0])
    textPlane(this.scene, '装 载 区', 'LOADING AREA', '#e9e7d9', 4.2, 1.4, [0, .018, 8.4], [-Math.PI / 2, 0, 0])

    const zoneData: [CargoColor, number][] = [['amber', -6], ['teal', 0], ['coral', 6]]
    for (const [color, x] of zoneData) {
      const zoneMat = new THREE.MeshBasicMaterial({ color: CARGO_HEX[color], transparent: true, opacity: .2, side: THREE.DoubleSide, depthWrite: false })
      floorLine(x, -7.7, 2.25, 2.25, zoneMat)
      const border = mat(CARGO_HEX[color], .65, .05, { emissive: CARGO_HEX[color], emissiveIntensity: .15 })
      floorLine(x, -8.825, 2.3, .075, border); floorLine(x, -6.575, 2.3, .075, border)
      floorLine(x - 1.125, -7.7, .075, 2.3, border); floorLine(x + 1.125, -7.7, .075, 2.3, border)
      const label = color === 'amber' ? 'A · 琥珀' : color === 'teal' ? 'B · 青瓷' : 'C · 珊瑚'
      textPlane(this.scene, label, 'DELIVERY ZONE', CARGO_COLORS[color], 2.05, 1.02, [x, .025, -7.7], [-Math.PI / 2, 0, 0])
      const back = box(this.scene, [2.25, .55, .08], mat(0x263b40, .7, .2), [x, .42, -9.15])
      textPlane(this.scene, label, '对应颜色交付', CARGO_COLORS[color], 2.0, .8, [x, .55, -9.095])
    }
    // 防撞柱，均位于通道之外
    for (const x of [-8.8, 8.8]) for (const z of [-9.6, 9.2]) {
      cyl(this.scene, .1, .12, .8, yellow, [x, .4, z], 16)
      cyl(this.scene, .105, .105, .18, beamMat, [x, .45, z], 16)
    }
  }

  createRack(x: number, z: number, yaw: number) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = yaw; this.scene.add(g)
    const upright = mat(0x315963, .45, .62); const beam = mat(0xd88b36, .48, .48); const shelf = mat(0x6e7b78, .68, .4)
    for (const px of [-.85, .85]) for (const pz of [-2, 2]) {
      box(g, [.13, 4.35, .13], upright, [px, 2.17, pz])
      box(g, [.32, .08, .32], upright, [px, .04, pz])
      for (let y = .45; y < 4.1; y += .34) box(g, [.145, .035, .015], mat(0x1d353c, .6, .5), [px, y, pz + .073])
    }
    for (const y of [.55, 1.85, 3.15]) {
      box(g, [1.85, .13, 4.15], shelf, [0, y, 0])
      for (const px of [-.9, .9]) box(g, [.13, .24, 4.25], beam, [px, y - .08, 0])
      for (const pz of [-2.02, 2.02]) box(g, [1.85, .24, .12], beam, [0, y - .08, pz])
      for (let i = 0; i < 2; i++) {
        const cargo = new THREE.Group(); cargo.position.set(0, y + .47, -1.05 + i * 2.1); g.add(cargo)
        box(cargo, [1.35, .72, 1.35], mat(i ? 0x9b7955 : 0xb28a5c, .84, .01), [0, 0, 0], .025)
        for (const sx of [-.58, .58]) box(cargo, [.07, .76, 1.39], mat(0x725c43, .8), [sx, 0, 0])
        box(cargo, [1.38, .07, .12], mat(0xd2c0a0, .75), [0, .12, .68])
      }
    }
    // 交叉支撑
    for (const side of [-1, 1]) {
      const brace = box(g, [.045, 4.65, .045], upright, [side * .91, 2.15, 0]); brace.rotation.x = .72
    }
    this.obstacles.push({ minX: x - 1.2, maxX: x + 1.2, minZ: z - 2.35, maxZ: z + 2.35 })
    this.addStaticBox(x, 2, z, 2.05, 4, 4.4, false)
  }

  createForklift() {
    const paint = mat(0xe5a33b, .32, .42)
    const paintLight = mat(0xf2bc53, .3, .35)
    const dark = mat(0x203138, .38, .72)
    const steel = mat(0x839396, .27, .88)
    const steelDark = mat(0x3d5055, .32, .8)
    const rubber = mat(0x171c1d, .88, .02)
    const rubberSide = mat(0x242a2a, .78, .03)
    const seatMat = mat(0x243a3c, .82, .03)
    const red = mat(0xa83d2f, .28, .25, { emissive: 0xd43c27, emissiveIntensity: .45 })
    const lamp = mat(0xf6e4b7, .2, .25, { emissive: 0xffd68a, emissiveIntensity: 1.4 })
    this.car.name = 'Pelican forklift'; this.scene.add(this.car)

    // 底层车架与弧形配重
    box(this.car, [1.48, .22, 2.3], dark, [0, .43, -.25], .07)
    box(this.car, [1.5, .58, 1.82], paint, [0, .76, -.45], .16)
    box(this.car, [1.55, .85, .72], paint, [0, .85, -1.18], .25)
    box(this.car, [1.35, .17, .48], paintLight, [0, 1.27, -1.18], .07)
    box(this.car, [1.35, .16, .83], dark, [0, .52, .69], .04)
    box(this.car, [1.7, .14, .24], steelDark, [0, .37, -1.57], .04)
    // 后侧散热格栅与黑色保险杠
    box(this.car, [1.08, .43, .025], dark, [0, .91, -1.552], .04)
    for (let i = 0; i < 8; i++) box(this.car, [.92, .022, .035], steelDark, [0, .75 + i * .045, -1.575])
    for (const x of [-.59, .59]) {
      box(this.car, [.24, .18, .05], red, [x, 1.05, -1.54], .035)
      box(this.car, [.22, .1, .08], dark, [x, .52, -1.63], .025)
    }
    // 分件侧板、通风口、螺钉与踏板
    for (const side of [-1, 1]) {
      box(this.car, [.035, .43, .95], paintLight, [side * .763, .85, -.38], .025)
      for (let i = 0; i < 6; i++) {
        const vent = box(this.car, [.045, .025, .47], dark, [side * .79, .76 + i * .047, -.57]); vent.rotation.x = -.14
      }
      for (const z of [-.83, .05]) for (const y of [.69, 1.01]) {
        const bolt = cyl(this.car, .026, .026, .022, steel, [side * .8, y, z], 12); bolt.rotation.z = Math.PI / 2
      }
      box(this.car, [.32, .08, .65], steelDark, [side * .79, .57, .25], .025)
      for (let i = 0; i < 4; i++) box(this.car, [.33, .016, .035], steel, [side * .79, .616, .03 + i * .13])
      // 扶手
      tube(this.car, [new THREE.Vector3(side * .67, 1.03, -.85), new THREE.Vector3(side * .72, 1.48, -.85), new THREE.Vector3(side * .72, 1.55, -.55)], .026, steelDark, 12)
    }
    textPlane(this.car, 'PELICAN', 'ELECTRIC  ·  2.5T', '#23373c', 1.0, .4, [.79, 1.1, -.34], [0, Math.PI / 2, 0])
    textPlane(this.car, '07', 'ACADEMY', '#24383c', .62, .42, [0, 1.05, -1.593], [0, Math.PI, 0])

    // 四轮：厚轮胎、侧壁、轮毂、螺栓与独立胎面
    const wheelData = [[-.8, .77, .43, false], [.8, .77, .43, false], [-.77, -.93, .36, true], [.77, -.93, .36, true]] as const
    for (const [x, z, r, steer] of wheelData) {
      const pivot = new THREE.Group(); pivot.position.set(x, r + .05, z); this.car.add(pivot)
      const spinner = new THREE.Group(); pivot.add(spinner)
      const tire = cyl(spinner, r, r, .29, rubber, [0, 0, 0], 32); tire.rotation.z = Math.PI / 2
      for (const side of [-1, 1]) {
        const sideRing = mesh(new THREE.TorusGeometry(r * .72, r * .17, 10, 32), rubberSide, spinner, side * .152, 0, 0); sideRing.rotation.y = Math.PI / 2
        const hub = cyl(spinner, r * .43, r * .43, .035, steelDark, [side * .175, 0, 0], 24); hub.rotation.z = Math.PI / 2
        const cap = cyl(spinner, r * .18, r * .18, .055, steel, [side * .2, 0, 0], 20); cap.rotation.z = Math.PI / 2
        for (let i = 0; i < 5; i++) {
          const a = i / 5 * Math.PI * 2
          const lug = cyl(spinner, .022, .022, .042, steel, [side * .204, Math.sin(a) * r * .29, Math.cos(a) * r * .29], 8); lug.rotation.z = Math.PI / 2
        }
      }
      for (let i = 0; i < 20; i++) {
        const a = i / 20 * Math.PI * 2
        const tread = box(spinner, [.3, .055, .115], rubberSide, [0, Math.sin(a) * (r + .006), Math.cos(a) * (r + .006)], .012)
        tread.rotation.x = -a; tread.rotation.y = i % 2 ? .09 : -.09
      }
      this.wheels.push({ pivot, spinner, radius: r, steer })
    }
    // 前后车桥
    for (const z of [-.93, .77]) { const axle = cyl(this.car, .09, .09, 1.48, steelDark, [0, .43, z], 16); axle.rotation.z = Math.PI / 2 }

    // 驾驶室顶架、立柱与护顶
    for (const x of [-.64, .64]) for (const z of [-.95, .52]) {
      const post = box(this.car, [.075, 1.65, .075], dark, [x, 1.75, z], .018); post.rotation.x = z > 0 ? -.08 : .04
    }
    box(this.car, [1.48, .12, 1.75], dark, [0, 2.61, -.22], .06)
    box(this.car, [1.28, .045, 1.5], paint, [0, 2.69, -.22], .035)
    for (let i = 0; i < 6; i++) box(this.car, [.06, .04, 1.45], steelDark, [-.53 + i * .212, 2.73, -.22])
    for (const x of [-.52, .52]) {
      box(this.car, [.29, .13, .17], dark, [x, 2.52, .68], .035)
      box(this.car, [.21, .075, .025], lamp, [x, 2.52, .778], .02)
    }
    // 座椅、扶手、方向柱和仪表
    box(this.car, [.72, .16, .67], dark, [0, 1.03, -.49], .06)
    box(this.car, [.66, .16, .6], seatMat, [0, 1.15, -.48], .075)
    const seatBack = box(this.car, [.66, .69, .16], seatMat, [0, 1.48, -.81], .075); seatBack.rotation.x = -.13
    box(this.car, [.5, .07, .04], mat(0x3d5556, .8), [0, 1.56, -.71], .02)
    for (const x of [-.42, .42]) { box(this.car, [.07, .32, .07], dark, [x, 1.3, -.49]); box(this.car, [.12, .08, .5], seatMat, [x, 1.48, -.43], .035) }
    const column = cyl(this.car, .045, .055, .62, steelDark, [0, 1.36, .27], 16); column.rotation.x = -.42
    const steering = mesh(new THREE.TorusGeometry(.25, .026, 10, 32), dark, this.car, 0, 1.65, .4); steering.rotation.x = -1.03
    for (let i = 0; i < 3; i++) { const spoke = box(this.car, [.025, .21, .025], dark, [0, 1.65, .4]); spoke.rotation.x = -1.03; spoke.rotation.z = i * Math.PI * 2 / 3 }
    const dash = box(this.car, [1.05, .34, .24], dark, [0, 1.29, .62], .04); dash.rotation.x = -.18
    const gaugeTex = canvasTexture(512, 180, ctx => {
      ctx.fillStyle = '#17272a'; ctx.fillRect(0, 0, 512, 180)
      for (const x of [115, 275]) { ctx.strokeStyle = '#a7d6c6'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, 88, 58, Math.PI * .75, Math.PI * 2.25); ctx.stroke(); ctx.strokeStyle = '#f0b34d'; ctx.beginPath(); ctx.moveTo(x, 88); ctx.lineTo(x + 32, 47); ctx.stroke() }
      ctx.fillStyle = '#76d6a4'; ctx.fillRect(390, 57, 80, 57); ctx.fillStyle = '#16372c'; ctx.font = 'bold 28px monospace'; ctx.fillText('100%', 394, 94)
    })
    const gauges = mesh(new THREE.PlaneGeometry(.82, .29), new THREE.MeshBasicMaterial({ map: gaugeTex }), this.car, 0, 1.39, .496); gauges.rotation.x = -.18
    for (const x of [-.32, .32]) { const lever = cyl(this.car, .018, .018, .35, steel, [x, 1.34, .36], 10); lever.rotation.x = -.35; sphere(this.car, .045, dark, [x, 1.51, .42]) }

    this.createPelican()

    // 门架：外导轨、内滑轨、横梁、液压缸、链条与托架
    const mast = new THREE.Group(); mast.position.z = 1.0; this.car.add(mast)
    for (const x of [-.56, .56]) {
      box(mast, [.17, 2.6, .2], dark, [x, 1.48, 0], .025)
      box(mast, [.055, 2.43, .215], steel, [x + (x < 0 ? .1 : -.1), 1.48, .015])
      box(mast, [.23, .16, .3], steelDark, [x, .25, 0])
    }
    for (const y of [.28, 1.1, 2.72]) box(mast, [1.3, .13, .18], dark, [0, y, 0])
    cyl(mast, .105, .105, 1.22, steelDark, [0, .87, -.08], 20)
    this.piston = cyl(mast, .055, .055, 1.35, steel, [0, 1.78, -.08], 16)
    const chainMat = mat(0x273438, .32, .85)
    this.chainLeft = box(mast, [.035, 2.05, .045], chainMat, [-.28, 1.55, .13])
    this.chainRight = box(mast, [.035, 2.05, .045], chainMat, [.28, 1.55, .13])
    for (const x of [-.28, .28]) {
      const pulley = cyl(mast, .12, .12, .07, steelDark, [x, 2.5, .12], 20); pulley.rotation.z = Math.PI / 2
    }
    this.carriage.position.set(0, FORK_BASE, 1.12); this.car.add(this.carriage)
    box(this.carriage, [1.22, .52, .13], steelDark, [0, .38, 0])
    for (const y of [.15, .6]) box(this.carriage, [1.36, .1, .17], dark, [0, y, .05])
    for (const x of [-.43, .43]) {
      box(this.carriage, [.18, .65, .15], steel, [x, .28, .13], .018)
      box(this.carriage, [.17, .13, 1.48], steel, [x, .035, .84], .018)
      const tip = box(this.carriage, [.165, .09, .28], steel, [x, .02, 1.68], .025); tip.rotation.x = -.09
      for (const y of [.15, .48]) { const rivet = cyl(this.carriage, .026, .026, .025, dark, [x, y, .215], 10); rivet.rotation.x = Math.PI / 2 }
    }
    // 门架前倾机械连杆
    for (const x of [-.63, .63]) tube(this.car, [new THREE.Vector3(x, .45, .48), new THREE.Vector3(x, .58, .82), new THREE.Vector3(x, .7, 1.02)], .045, steelDark, 10)
  }

  createPelican() {
    const bird = new THREE.Group(); bird.position.set(0, 0, -.38); this.car.add(bird)
    const feather = mat(0xf1eee0, .91, .0)
    const featherShade = mat(0xcbd5cd, .92, .0)
    const featherLight = mat(0xfffbec, .88, .0)
    const beak = mat(0xeaa44d, .58, .02)
    const pouch = mat(0xe9bd76, .74, .0)
    const feet = mat(0xd88a3e, .67, .0)
    const eye = mat(0x142326, .28, .05)
    // 坐姿体块与尾部
    sphere(bird, .42, feather, [0, 1.58, -.12], [.82, 1.12, .85])
    sphere(bird, .27, featherShade, [0, 1.42, -.4], [.9, .55, 1.15])
    for (const x of [-.14, 0, .14]) { const tail = sphere(bird, .13, featherShade, [x, 1.39, -.64], [.58, .35, 1.6]); tail.rotation.x = -.35 }
    // 弯曲颈部
    tube(bird, [new THREE.Vector3(0, 1.68, -.04), new THREE.Vector3(0, 1.9, -.17), new THREE.Vector3(0, 2.08, -.06), new THREE.Vector3(0, 2.16, .1)], .155, featherLight, 28)
    sphere(bird, .225, featherLight, [0, 2.18, .12], [1, .9, 1.06])
    // 眼眉、眼睛与高光
    for (const side of [-1, 1]) {
      sphere(bird, .052, eye, [side * .176, 2.235, .235], [1, 1, .7])
      sphere(bird, .014, featherLight, [side * .191, 2.254, .269])
      const brow = sphere(bird, .09, featherShade, [side * .15, 2.29, .19], [1, .25, .65]); brow.rotation.z = side * -.18
    }
    // 上喙为渐细实体，下喙与喉囊分开建模
    const verts = new Float32Array([
      -.18, .06, 0,  .18, .06, 0,  -.15, -.07, 0,  .15, -.07, 0,
      -.045, .015, .93,  .045, .015, .93,  -.035, -.025, .93,  .035, -.025, .93
    ])
    const idx = [0,1,4,1,5,4, 2,6,3,3,6,7, 0,4,2,2,4,6, 1,3,5,3,7,5, 4,5,6,5,7,6, 0,2,1,1,2,3]
    const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(verts, 3)); bg.setIndex(idx); bg.computeVertexNormals()
    mesh(bg, beak, bird, 0, 2.18, .29)
    const lower = sphere(bird, .18, pouch, [0, 2.075, .58], [.72, .52, 2.6]); lower.rotation.x = -.09
    sphere(bird, .16, pouch, [0, 2.03, .31], [.9, .8, 1.2])
    // 翅膀与分层飞羽
    for (const side of [-1, 1]) {
      const wing = sphere(bird, .31, featherShade, [side * .32, 1.62, -.07], [.52, 1.08, .72]); wing.rotation.z = side * -.28
      for (let i = 0; i < 5; i++) {
        const f = mesh(new THREE.CapsuleGeometry(.055, .3, 5, 10), i % 2 ? feather : featherLight, bird, side * (.36 + i * .013), 1.52 - i * .055, -.02 - i * .06)
        f.rotation.x = -.3; f.rotation.z = side * -.18; f.scale.set(1, 1, .55)
      }
      // 橙色脚与三趾，落在操作踏板附近
      tube(bird, [new THREE.Vector3(side * .18, 1.35, -.04), new THREE.Vector3(side * .2, 1.17, .18), new THREE.Vector3(side * .2, 1.03, .35)], .035, feet, 10)
      for (let t = -1; t <= 1; t++) tube(bird, [new THREE.Vector3(side * .2, 1.04, .34), new THREE.Vector3(side * .2 + t * .05, 1.02, .48), new THREE.Vector3(side * .2 + t * .07, 1.01, .58)], .018, feet, 8)
    }
  }

  createCargo() {
    const data: [CargoColor, string, string, number, number, number][] = [
      ['amber', '琥珀箱', 'A-01', -5, 2.3, -6],
      ['teal', '青瓷箱', 'B-02', 0, -.8, 0],
      ['coral', '珊瑚箱', 'C-03', 5, 2.3, 6]
    ]
    data.forEach(([color, name, label, x, z, zoneX], id) => {
      const root: any = new THREE.Group(); root.name = label; root.position.set(x, .66, z); root.rotation.y = Math.PI; this.add.existing(root)
      const wood = mat(0xa88355, .79, .01, { map: noiseTexture('#a17e53', 'rgba(55,35,20,A)') })
      const woodLight = mat(0xc09b6a, .74, .02)
      const edge = mat(0x5f5140, .7, .08)
      const accent = mat(CARGO_HEX[color], .5, .18)
      box(root, [1.12, 1.12, 1.12], wood, [0, 0, 0], .035)
      // 木板接缝与护角
      for (const y of [-.37, 0, .37]) {
        box(root, [1.15, .018, 1.155], edge, [0, y, 0])
      }
      for (const xEdge of [-.55, .55]) for (const zEdge of [-.55, .55]) {
        box(root, [.095, 1.2, .095], woodLight, [xEdge, 0, zEdge], .012)
        for (const y of [-.46, .46]) sphere(root, .025, edge, [xEdge, y, zEdge + Math.sign(zEdge) * .05])
      }
      for (const y of [-.53, .53]) {
        box(root, [1.2, .085, .1], woodLight, [0, y, .55], .01); box(root, [1.2, .085, .1], woodLight, [0, y, -.55], .01)
        box(root, [.1, .085, 1.2], woodLight, [.55, y, 0], .01); box(root, [.1, .085, 1.2], woodLight, [-.55, y, 0], .01)
      }
      // 色带、打包带和可识别的货物标签
      box(root, [.74, .54, .025], accent, [0, .02, .576], .025)
      box(root, [.74, .54, .025], accent, [0, .02, -.576], .025)
      for (const sx of [-.32, .32]) {
        box(root, [.055, 1.17, 1.17], mat(0x37484a, .5, .5), [sx, 0, 0])
      }
      textPlane(root, label, name + '  ·  12 kg', '#fff8e9', .62, .34, [0, .04, .592])
      textPlane(root, label, 'PELICAN LOGISTICS', '#fff8e9', .62, .34, [0, .04, -.592], [0, Math.PI, 0])
      textPlane(root, '↑ ↑', 'KEEP DRY', '#433a2d', .46, .28, [.566, .05, 0], [0, Math.PI / 2, 0])
      // 底部叉取入口与木垫块
      for (const sx of [-.38, .38]) box(root, [.2, .12, 1.14], edge, [sx, -.54, 0], .01)
      this.physics.add.existing(root, { mass: 12, shape: 'box', width: 1.2, height: 1.2, depth: 1.2, autoCenter: false })
      root.body.setFriction(.72); root.body.setRestitution(.02); root.body.setDamping(.72, .82); root.body.setAngularFactor(0, 1, 0)
      this.cargos.push({ id, color, name, root, body: root.body, start: new THREE.Vector3(x, .66, z), zone: new THREE.Vector3(zoneX, 0, -7.7), delivered: false, carried: false, stableTime: 0, yaw: Math.PI, size: 1.2, label })
    })
  }

  bindUI() {
    $('startBtn').onclick = () => this.resetGame(true)
    $('pauseBtn').onclick = () => this.pause()
    $('resumeBtn').onclick = () => this.resume()
    $('restartBtn').onclick = () => this.resetGame(true)
    $('restartPauseBtn').onclick = () => this.resetGame(true)
    document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(btn => btn.onclick = () => {
      if (this.state !== 'paused') return
      this.inspectView = btn.dataset.view!
      document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('active', b === btn))
      this.updateCamera(1)
    })
    window.addEventListener('keydown', e => {
      const key = e.code
      if (['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE','Space','KeyP','KeyC'].includes(key)) e.preventDefault()
      if (key === 'KeyP' && !e.repeat) { this.state === 'playing' ? this.pause() : this.state === 'paused' && this.resume(); return }
      if (key === 'KeyC' && !e.repeat && this.state === 'playing') { this.cameraMode = (this.cameraMode + 1) % 2; this.showToast(this.cameraMode ? '高位跟随视角' : '第三人称跟随视角') }
      this.keys.add(key)
    })
    window.addEventListener('keyup', e => this.keys.delete(e.code))
    window.addEventListener('blur', () => { this.keys.clear(); if (this.state === 'playing') this.pause() })
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.state === 'playing') this.pause() })
  }

  resetGame(play: boolean) {
    this.state = play ? 'playing' : 'start'
    this.keys.clear(); this.position.set(play ? 0 : 2.4, 0, play ? 6 : 3.4); this.yaw = play ? Math.PI : -.42; this.speed = 0; this.steering = 0
    this.lift = -.145; this.carried = null; this.timeLeft = 120; this.delivered = 0; this.cameraMode = 0; this.inspectView = null
    this.car.position.copy(this.position); this.car.rotation.set(0, this.yaw, 0); this.carriage.position.y = FORK_BASE + this.lift
    this.physics.setGravity(0, -9.81, 0)
    for (const c of this.cargos) {
      c.delivered = false; c.carried = false; c.stableTime = 0; c.yaw = Math.PI
      c.body.setCollisionFlags(0); this.teleportCargo(c,c.start,c.yaw)
      c.body.setVelocity(0, 0, 0); c.body.setAngularVelocity(0, 0, 0); c.body.setDamping(.72, .82); c.body.needUpdate = true
    }
    $('startScreen').classList.toggle('hidden', play); $('pauseScreen').classList.add('hidden'); $('endScreen').classList.add('hidden')
    for (const id of ['hud','taskPanel','controls','hint']) $(id).classList.toggle('hidden', !play)
    document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'))
    this.updateCargoUI(); this.updateHUD()
    if (play) { this.showToast('实训开始 · 先将货叉插入箱底，再按 E 升叉'); this.updateCamera(1) }
  }

  pause() {
    if (this.state !== 'playing') return
    this.state = 'paused'; this.keys.clear(); this.inspectView = null; this.physics.setGravity(0, 0, 0)
    ;(this as any).pauseSnapshot = this.cargos.map(c => ({ c, p: c.root.position.clone(), r: c.root.rotation.clone() }))
    for (const c of this.cargos) { c.body.setVelocity(0,0,0); c.body.setAngularVelocity(0,0,0) }
    $('pauseScreen').classList.remove('hidden'); $('hint').classList.add('hidden')
  }

  resume() {
    if (this.state !== 'paused') return
    this.state = 'playing'; this.inspectView = null; this.physics.setGravity(0, -9.81, 0)
    $('pauseScreen').classList.add('hidden'); $('hint').classList.remove('hidden')
    document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'))
  }

  finish(won: boolean) {
    if (this.state !== 'playing') return
    this.state = won ? 'won' : 'lost'; this.keys.clear(); this.speed = 0
    $('endScreen').classList.remove('hidden'); $('hint').classList.add('hidden')
    $('endIcon').textContent = won ? '✓' : '×'; $('endTitle').textContent = won ? '实训通过！' : '时间到'
    $('endEyebrow').textContent = won ? 'CERTIFICATION COMPLETE' : 'TRAINING TIME EXPIRED'
    $('endText').textContent = won ? '三只货箱都已安全抵达，鹈鹕驾驶员顺利毕业。' : '别灰心，调整路线，再稳稳地试一次。'
    $('endDelivered').textContent = `${this.delivered} / 3`; $('endTime').textContent = this.formatTime(this.timeLeft)
  }

  formatTime(t: number) { const s = Math.max(0, Math.ceil(t)); return `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}` }

  update(_time: number, delta: number) {
    if (!this.ready) return
    const dt = Math.min(delta / 1000, .05); this.elapsed += dt
    if (this.state === 'playing') this.updateGame(dt)
    else if (this.state === 'paused') {
      const snapshots = (this as any).pauseSnapshot || []
      for (const s of snapshots) { this.teleportCargo(s.c,s.p,s.c.yaw); s.c.body.setVelocity(0,0,0) }
    }
    if (this.toastTimer > 0) { this.toastTimer -= dt; if (this.toastTimer <= 0) $('toast').classList.remove('show') }
    if (this.badgeTimer > 0) { this.badgeTimer -= dt; if (this.badgeTimer <= 0) $('badge').classList.remove('show') }
    this.updateCamera(dt)
    this.updateHUD()
  }

  updateGame(dt: number) {
    this.timeLeft -= dt
    if (this.timeLeft <= 0) { this.timeLeft = 0; this.finish(false); return }
    const forwardInput = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0)
    const steerInput = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0)
    const maxSpeed = forwardInput < 0 ? 2.25 : 4.15
    if (forwardInput) this.speed += forwardInput * (this.speed * forwardInput < 0 ? 5.5 : 2.8) * dt
    else this.speed = THREE.MathUtils.damp(this.speed, 0, 2.1, dt)
    if (this.keys.has('Space')) this.speed = THREE.MathUtils.damp(this.speed, 0, 9.5, dt)
    this.speed = clamp(this.speed, -2.25, maxSpeed)
    if (Math.abs(this.speed) < .008) this.speed = 0
    this.steering = THREE.MathUtils.damp(this.steering, steerInput * .52, 7.5, dt)
    const nextYaw = this.yaw + (this.speed / 1.55) * Math.tan(this.steering) * dt
    const forward = new THREE.Vector3(Math.sin(nextYaw), 0, Math.cos(nextYaw))
    const nextPos = this.position.clone().addScaledVector(forward, this.speed * dt)
    const nextCollision = this.carCollides(nextPos,nextYaw)
    if (!nextCollision || (nextCollision && this.carCollides(this.position,this.yaw) && this.isEscapeMove(nextPos))) { this.position.copy(nextPos); this.yaw = nextYaw }
    else { this.speed *= -.06; this.showCollisionCooldown() }
    this.car.position.copy(this.position); this.car.rotation.y = this.yaw
    for (const w of this.wheels) {
      w.spinner.rotation.x += this.speed * dt / w.radius
      if (w.steer) w.pivot.rotation.y = -this.steering
    }

    const liftInput = (this.keys.has('KeyE') ? 1 : 0) - (this.keys.has('KeyQ') ? 1 : 0)
    if (liftInput) this.lift = clamp(this.lift + liftInput * .82 * dt, -.2, 1.6)
    this.carriage.position.y = FORK_BASE + this.lift
    this.piston.scale.y = 1 + Math.max(0, this.lift) * .42; this.piston.position.y = 1.78 + Math.max(0, this.lift) * .25
    this.chainLeft.scale.y = this.chainRight.scale.y = 1 + Math.max(0, this.lift) * .18
    if (liftInput > 0 && !this.carried) this.tryPickup()
    if (this.carried) this.updateCarried()
    if (liftInput < 0 && this.carried) {
      const bottom = FORK_BASE + this.lift + .1 + .015
      if (bottom <= .1) this.releaseCargo()
    }
    this.updateDelivery(dt)
  }

  isEscapeMove(nextPos: THREE.Vector3) {
    let nearby = false, currentMin = Infinity, nextMin = Infinity
    for (const c of this.cargos) {
      if (c.carried) continue
      const current = Math.hypot(c.root.position.x-this.position.x,c.root.position.z-this.position.z)
      const next = Math.hypot(c.root.position.x-nextPos.x,c.root.position.z-nextPos.z)
      if (current < 2.6) { nearby = true; currentMin = Math.min(currentMin,current); nextMin = Math.min(nextMin,next) }
    }
    return nearby && nextMin >= currentMin - .0001
  }

  carCollides(pos: THREE.Vector3, yaw: number) {
    const c = Math.cos(yaw), s = Math.sin(yaw)
    const corners: THREE.Vector2[] = []
    for (const x of [-CAR_WIDTH/2, CAR_WIDTH/2]) for (const z of [-1.55, 1.15]) {
      const cz = z - .05; corners.push(new THREE.Vector2(pos.x + c*x + s*cz, pos.z - s*x + c*cz))
    }
    const hits = (o: Obstacle) => {
      // OBB / AABB 分离轴检测
      const axes = [new THREE.Vector2(c,-s), new THREE.Vector2(s,c), new THREE.Vector2(1,0), new THREE.Vector2(0,1)]
      const oc = [new THREE.Vector2(o.minX,o.minZ),new THREE.Vector2(o.maxX,o.minZ),new THREE.Vector2(o.maxX,o.maxZ),new THREE.Vector2(o.minX,o.maxZ)]
      for (const a of axes) {
        const cp = corners.map(p => p.dot(a)), op = oc.map(p => p.dot(a))
        if (Math.max(...cp) < Math.min(...op) || Math.max(...op) < Math.min(...cp)) return false
      }
      return true
    }
    for (const o of this.obstacles) if (hits(o)) return true
    for (const cargo of this.cargos) {
      if (cargo.carried) continue
      const ext = .61
      if (hits({ minX:cargo.root.position.x-ext,maxX:cargo.root.position.x+ext,minZ:cargo.root.position.z-ext,maxZ:cargo.root.position.z+ext })) return true
    }
    if (this.carried) {
      const f = new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw)); const p = pos.clone().addScaledVector(f,(this as any).carryZ || 1.8)
      const ex = .85
      const box = {minX:p.x-ex,maxX:p.x+ex,minZ:p.z-ex,maxZ:p.z+ex}
      for (const o of this.obstacles) if (!(box.maxX<o.minX||box.minX>o.maxX||box.maxZ<o.minZ||box.minZ>o.maxZ)) return true
    }
    return false
  }

  showCollisionCooldown() {
    if (this.elapsed - ((this as any).lastCollision || 0) > 1.2) { (this as any).lastCollision = this.elapsed; this.showToast('已碰撞 · 请倒车调整位置') }
  }

  cargoMetrics(c: Cargo) {
    const dx = c.root.position.x - this.position.x, dz = c.root.position.z - this.position.z
    const co = Math.cos(this.yaw), si = Math.sin(this.yaw)
    const lateral = co * dx - si * dz, longitudinal = si * dx + co * dz
    const bottom = c.root.position.y - .6, fork = FORK_BASE + this.lift + .1
    const angle = Math.abs(angleDelta(c.yaw, this.yaw))
    const insertion = 2.94 - (longitudinal - .6)
    return { lateral, longitudinal, bottom, fork, angle, insertion, distance: Math.hypot(dx,dz) }
  }

  tryPickup() {
    if (this.carried) return
    let best: Cargo | null = null; let bestD = Infinity
    for (const c of this.cargos) {
      if (c.delivered) continue
      const m = this.cargoMetrics(c)
      if (m.angle <= THREE.MathUtils.degToRad(15) && Math.abs(m.lateral) <= .25 && Math.abs(m.fork-m.bottom) <= .15 && m.insertion >= .3 && m.longitudinal > .7 && m.distance < bestD) { best = c; bestD = m.distance }
    }
    if (best) {
      const m = this.cargoMetrics(best); this.carried = best; best.carried = true; best.stableTime = 0
      ;(this as any).carryZ = clamp(m.longitudinal, 1.35, 2.35); (this as any).carryX = m.lateral
      best.body.setCollisionFlags(2); best.body.setVelocity(0,0,0); best.body.setAngularVelocity(0,0,0); best.body.needUpdate = true
      this.showToast(`${best.name}已托稳 · 送往${best.color === 'amber' ? '琥珀色' : best.color === 'teal' ? '青瓷色' : '珊瑚色'}区域`)
      this.updateCargoUI()
    }
  }

  teleportCargo(c: Cargo, p: THREE.Vector3, yaw: number) {
    const t = this.physics.worldTransform
    t.getOrigin().setValue(p.x,p.y,p.z)
    tmpQ.setFromAxisAngle(new THREE.Vector3(0,1,0),yaw)
    t.getRotation().setValue(tmpQ.x,tmpQ.y,tmpQ.z,tmpQ.w)
    c.body.ammo.getMotionState().setWorldTransform(t)
    c.body.ammo.setWorldTransform(t)
    c.body.ammo.activate(true)
    c.root.position.copy(p); c.root.rotation.set(0,yaw,0)
  }

  updateCarried() {
    const c = this.carried!; const f = new THREE.Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw)); const r = new THREE.Vector3(Math.cos(this.yaw),0,-Math.sin(this.yaw))
    const p = this.position.clone().addScaledVector(f,(this as any).carryZ).addScaledVector(r,(this as any).carryX)
    const bottom = FORK_BASE + this.lift + .1 + .015; p.y = bottom + .6
    c.yaw = this.yaw; c.body.setVelocity(0,0,0); c.body.setAngularVelocity(0,0,0); c.body.needUpdate = true
    this.teleportCargo(c,p,c.yaw)
  }

  releaseCargo() {
    const c = this.carried; if (!c) return
    const p = c.root.position.clone(); c.carried = false; c.body.setCollisionFlags(0); this.teleportCargo(c,p,c.yaw)
    c.body.setVelocity(0,0,0); c.body.setAngularVelocity(0,0,0); this.carried = null
    this.showToast('货箱已落地 · 停稳 0.5 秒完成交付')
  }

  updateDelivery(dt: number) {
    for (const c of this.cargos) {
      if (c.delivered || c.carried) continue
      const p = c.root.position; const ex = .6 * (Math.abs(Math.cos(c.yaw)) + Math.abs(Math.sin(c.yaw)))
      const inside = Math.abs(p.x-c.zone.x)+ex <= 1.125 && Math.abs(p.z-c.zone.z)+ex <= 1.125
      const v = c.body.velocity; const settled = Math.hypot(v.x,v.z) <= .1
      const grounded = p.y-.6 <= .065 && p.y-.6 >= -.08
      if (inside && grounded && settled) c.stableTime += dt
      else c.stableTime = 0
      if (c.stableTime >= .5) this.completeDelivery(c)
    }
  }

  completeDelivery(c: Cargo) {
    c.delivered = true; c.stableTime = 0; c.body.setVelocity(0,0,0); c.body.setAngularVelocity(0,0,0); c.body.setCollisionFlags(1)
    this.delivered++; this.updateCargoUI()
    $('badge').querySelector('small')!.textContent = `${c.name} · ${this.delivered} / 3`; $('badge').classList.add('show'); this.badgeTimer = 2.2
    if (this.delivered === 3) this.finish(true)
    else this.showToast(`交付成功 · 还剩 ${3-this.delivered} 只货箱`)
  }

  updateCamera(dt: number) {
    if (this.state === 'start') {
      const a = .52 + Math.sin(this.elapsed * .13) * .055
      const desired = new THREE.Vector3(Math.sin(a)*12.8, 5.8, Math.cos(a)*12.8)
      this.camera.position.lerp(desired, Math.min(1,dt*2)); this.camera.lookAt(1.1,1.15,3.1); return
    }
    const f = new THREE.Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw))
    const r = new THREE.Vector3(Math.cos(this.yaw),0,-Math.sin(this.yaw))
    const target = this.position.clone().add(new THREE.Vector3(0,1.25,0))
    let desired: THREE.Vector3
    if (this.state === 'paused' && this.inspectView) {
      if (this.inspectView === 'front') desired = target.clone().addScaledVector(f,5.3).add(new THREE.Vector3(0,1.1,0))
      else if (this.inspectView === 'rear') desired = target.clone().addScaledVector(f,-5.3).add(new THREE.Vector3(0,1.2,0))
      else if (this.inspectView === 'side') desired = target.clone().addScaledVector(r,5.4).add(new THREE.Vector3(0,1.15,0))
      else desired = target.clone().addScaledVector(f,3.5).addScaledVector(r,3.5).add(new THREE.Vector3(0,4.3,0))
      target.addScaledVector(f,.25)
    } else {
      target.addScaledVector(f, this.carried ? .85 : .55)
      desired = target.clone().addScaledVector(f,this.cameraMode ? -4.4 : -6.7).add(new THREE.Vector3(0,this.cameraMode ? 7.3 : 4.25,0))
      desired.x = clamp(desired.x,-12.55,12.55); desired.z = clamp(desired.z,-10.55,10.55)
      // 墙体与货架遮挡时缩短吊臂，保持车与货叉可见
      const dir = desired.clone().sub(target); const length = dir.length(); dir.normalize()
      const ray = new THREE.Raycaster(target,dir,.15,length)
      const hit = ray.intersectObjects(this.occluders,false)[0]
      if (hit) desired = target.clone().addScaledVector(dir,Math.max(1.4,hit.distance-.3))
    }
    const alpha = this.inspectView ? 1 : 1-Math.exp(-dt*5.5)
    this.camera.position.lerp(desired,alpha)
    this.camTarget.lerp(target,this.inspectView ? 1 : 1-Math.exp(-dt*8))
    this.camera.lookAt(this.camTarget)
  }

  updateCargoUI() {
    $('delivered').textContent = String(this.delivered)
    $('cargoList').innerHTML = this.cargos.map(c => `<div class="cargo-item ${c.delivered?'done':''} ${c.carried?'active':''}" style="--c:${CARGO_COLORS[c.color]}"><i class="color"></i><div><b>${c.name}</b><small>${c.label} · ${c.delivered?'已交付':c.carried?'运输中':'待配送'}</small></div><span class="check">${c.delivered?'✓':c.carried?'↑':'○'}</span></div>`).join('')
  }

  updateHUD() {
    $('time').textContent = this.formatTime(this.timeLeft)
    $('time').style.color = this.timeLeft < 20 ? '#ff8d75' : ''
    $('speed').textContent = Math.abs(this.speed).toFixed(1)
    const fork = FORK_BASE + this.lift + .1
    $('forkHeight').textContent = `${Math.max(0,fork).toFixed(2)} m`
    $('forkFill').style.width = `${clamp((this.lift+.2)/1.8*100,0,100)}%`
    if (this.state !== 'playing') return
    let text = '', kind = ''
    if (this.carried) {
      const c = this.carried; const d = Math.hypot(c.root.position.x-c.zone.x,c.root.position.z-c.zone.z)
      text = d < 2.4 ? '已进入交付区附近 · 对准颜色，按 Q 完全降叉' : `运输${c.name} · 前往${c.color==='amber'?'琥珀色 A':c.color==='teal'?'青瓷色 B':'珊瑚色 C'}区`
      kind = d < 2.4 ? 'good' : ''
    } else {
      let nearest: Cargo | null = null, dist = Infinity
      for (const c of this.cargos) if (!c.delivered) { const d = this.cargoMetrics(c).distance; if (d<dist) {nearest=c;dist=d} }
      if (nearest) {
        const m = this.cargoMetrics(nearest)
        if (dist > 4) text = `接近${nearest.name} · 从货箱正前方插入双叉`
        else if (m.angle > THREE.MathUtils.degToRad(15)) text = `调整方向 · 车头需与货箱同向（≤15°）`
        else if (Math.abs(m.lateral) > .25) text = `横向未对齐 · 偏差需 ≤0.25 m`
        else if (m.insertion < .3 || m.longitudinal < .7) text = '缓慢前进 · 货叉需伸入箱底至少 0.30 m'
        else if (Math.abs(m.fork-m.bottom) > .15) text = `调整货叉高度 · 按 ${m.fork>m.bottom?'Q 降叉':'E 升叉'} 对齐箱底`
        else { text = `对齐完成 · 按住 E 托起${nearest.name}`; kind='good' }
      } else text = '全部货物已交付'
    }
    if ($('hintText').textContent !== text) $('hintText').textContent = text
    $('hint').className = `hint ${kind}`
  }

  showToast(text: string) { $('toast').textContent = text; $('toast').classList.add('show'); this.toastTimer = 2.5 }
}

PhysicsLoader('./vendor/ammo', () => new Project({ scenes: [DrivingScene], antialias: true, parent: 'app', gravity: { x: 0, y: -9.81, z: 0 } }))
