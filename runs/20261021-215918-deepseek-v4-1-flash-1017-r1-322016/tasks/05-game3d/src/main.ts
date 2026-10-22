import * as THREE from 'three'
import { PhysicsLoader } from 'enable3d'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import {
  ATTACH_TOL, CRATE, CRATE_INFO, CRATE_SPAWNS, DELIVERY, FORK_TOP_REST, GAME_TIME,
  LIFT_MAX, LIFT_SPEED, RELEASE_LIFT, ROOM, SPAWN, WHEELBASE, ZONES, CrateColor, Zone,
} from './config'
import { buildWarehouse, StaticBox, Warehouse } from './world'
import { createCrate, createForklift, ForkliftModel } from './models'
import './style.css'

type Mode = 'ready' | 'playing' | 'paused' | 'won' | 'lost'
type InspectView = 'front' | 'side' | 'rear' | 'iso' | null

type CrateEntity = {
  color: CrateColor
  group: THREE.Group
  body: any
  inWorld: boolean
  carried: boolean
  delivered: boolean
  stable: number
  warnAt: number
  ring: THREE.Mesh
  mat: THREE.MeshBasicMaterial
}

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T
const fmtTime = (t: number) => {
  const safe = Math.max(0, t)
  const m = Math.floor(safe / 60)
  const s = safe - m * 60
  return `${String(m).padStart(2, '0')}:${s.toFixed(1).padStart(4, '0')}`
}

class Game {
  renderer!: THREE.WebGLRenderer
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(48, 1, 0.08, 90)
  pmrem?: THREE.PMREMGenerator
  world!: Warehouse
  truck!: ForkliftModel
  crates: CrateEntity[] = []
  A: any
  physics: any
  truckBody: any
  mode: Mode = 'ready'
  inspect: InspectView = null
  camMode: 'follow' | 'near' = 'follow'
  timeLeft = GAME_TIME
  elapsed = 0
  score = 0
  clock = new THREE.Clock()
  pos = { x: SPAWN.x, z: SPAWN.z, yaw: SPAWN.yaw }
  speed = 0
  steer = 0
  lift = 0
  carrying: CrateEntity | null = null
  carrySide = 0
  carryForward = 1.7
  carryYawOffset = 0
  keys = new Set<string>()
  staticColliders: StaticBox[] = []
  vehicleColliders: StaticBox[] = []
  camPos = new THREE.Vector3()
  camTarget = new THREE.Vector3()
  camInit = false
  zoom = 7.6
  toastTimer = 0
  readyT = 0
  lastHud = 0

  constructor() {
    this.setupRenderer()
    this.setupScene()
    this.setupUI()
  }

  setupRenderer() {
    const app = $('app')
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', stencil: false })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.13
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.domElement.id = 'scene-canvas'
    app.prepend(this.renderer.domElement)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    window.addEventListener('resize', () => this.onResize())
  }

  setupScene() {
    this.pmrem = new THREE.PMREMGenerator(this.renderer)
    const env = this.pmrem.fromScene(new RoomEnvironment(), 0.06).texture
    this.scene.environment = env
    this.scene.environmentIntensity = 0.5
    this.world = buildWarehouse(this.scene)
    this.staticColliders = [
      ...this.world.colliders,
      { cx: (ROOM.minX + ROOM.maxX) / 2, cy: 4, cz: ROOM.minZ - 0.6, hx: 16, hy: 4, hz: 0.7, occlude: true },
      { cx: (ROOM.minX + ROOM.maxX) / 2, cy: 4, cz: ROOM.maxZ + 0.6, hx: 16, hy: 4, hz: 0.7, occlude: true },
      { cx: ROOM.minX - 0.6, cy: 4, cz: (ROOM.minZ + ROOM.maxZ) / 2, hx: 0.7, hy: 4, hz: 13, occlude: true },
      { cx: ROOM.maxX + 0.6, cy: 4, cz: (ROOM.minZ + ROOM.maxZ) / 2, hx: 0.7, hy: 4, hz: 13, occlude: true },
    ]
    this.vehicleColliders = this.staticColliders

    this.truck = createForklift()
    this.scene.add(this.truck.root)
    this.placeTruck(SPAWN.x, SPAWN.z, SPAWN.yaw)

    for (const spawn of CRATE_SPAWNS) {
      const group = createCrate(spawn.color)
      group.position.set(spawn.x, CRATE.halfH, spawn.z)
      this.scene.add(group)
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(CRATE_INFO[spawn.color].hex), transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthWrite: false })
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.78, 0.9, 40), mat)
      ring.rotation.x = -Math.PI / 2
      ring.position.set(spawn.x, 0.045, spawn.z)
      ring.visible = false
      ring.renderOrder = 2
      this.scene.add(ring)
      this.crates.push({
        color: spawn.color, group, body: null, inWorld: false, carried: false, delivered: false,
        stable: 0, warnAt: 0, ring, mat,
      })
    }
  }

  // ------------------------------------------------------------ physics
  initPhysics() {
    const A = (window as any).Ammo
    this.A = A
    const config = new A.btDefaultCollisionConfiguration()
    const dispatcher = new A.btCollisionDispatcher(config)
    const broadphase = new A.btDbvtBroadphase()
    const solver = new A.btSequentialImpulseConstraintSolver()
    const world = new A.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, config)
    world.setGravity(new A.btVector3(0, -9.82, 0))
    this.physics = world

    this.addStatic(0, -0.5, 0, 18, 0.5, 15)
    this.addStatic(0, 4, ROOM.minZ - 0.55, 17, 4.5, 0.6)
    this.addStatic(0, 4, ROOM.maxZ + 0.55, 17, 4.5, 0.6)
    this.addStatic(ROOM.minX - 0.55, 4, 0, 0.6, 4.5, 14)
    this.addStatic(ROOM.maxX + 0.55, 4, 0, 0.6, 4.5, 14)
    for (const c of this.world.colliders) this.addStatic(c.cx, c.cy, c.cz, c.hx, c.hy, c.hz)

    for (const c of this.crates) this.createCrateBody(c)

    // player kinematic body (body only, forks excluded so they can slide under crates)
    const shape = new A.btBoxShape(new A.btVector3(0.84, 0.82, 0.98))
    shape.setMargin(0.02)
    const tr = new A.btTransform()
    tr.setIdentity()
    tr.setOrigin(new A.btVector3(SPAWN.x, 0.82, SPAWN.z))
    const ms = new A.btDefaultMotionState(tr)
    const inertia = new A.btVector3(0, 0, 0)
    const info = new A.btRigidBodyConstructionInfo(0, ms, shape, inertia)
    const body = new A.btRigidBody(info)
    body.setCollisionFlags(2)
    body.setFriction(0.8)
    body.setActivationState(4)
    this.physics.addRigidBody(body)
    this.truckBody = body
    this.syncTruckBody()
  }

  addStatic(cx: number, cy: number, cz: number, hx: number, hy: number, hz: number) {
    const A = this.A
    const shape = new A.btBoxShape(new A.btVector3(hx, hy, hz))
    const tr = new A.btTransform(); tr.setIdentity(); tr.setOrigin(new A.btVector3(cx, cy, cz))
    const ms = new A.btDefaultMotionState(tr)
    const inertia = new A.btVector3(0, 0, 0)
    const info = new A.btRigidBodyConstructionInfo(0, ms, shape, inertia)
    const body = new A.btRigidBody(info)
    body.setFriction(0.85)
    this.physics.addRigidBody(body)
    return body
  }

  createCrateBody(c: CrateEntity) {
    const A = this.A
    const shape = new A.btBoxShape(new A.btVector3(CRATE.w / 2, CRATE.halfH, CRATE.d / 2))
    shape.setMargin(0.012)
    const tr = new A.btTransform(); tr.setIdentity()
    tr.setOrigin(new A.btVector3(c.group.position.x, c.group.position.y, c.group.position.z))
    const ms = new A.btDefaultMotionState(tr)
    const inertia = new A.btVector3(0, 0, 0)
    shape.calculateLocalInertia(42, inertia)
    const info = new A.btRigidBodyConstructionInfo(42, ms, shape, inertia)
    const body = new A.btRigidBody(info)
    body.setFriction(0.72)
    body.setRestitution(0.02)
    body.setDamping(0.3, 0.85)
    body.setAngularFactor(new A.btVector3(0, 0, 0))
    body.setSleepingThresholds(0.12, 0.12)
    c.body = body
    this.physics.addRigidBody(body)
    c.inWorld = true
  }

  syncTruckBody() {
    if (!this.truckBody || !this.A) return
    const A = this.A
    const tr = new A.btTransform(); tr.setIdentity()
    tr.setOrigin(new A.btVector3(this.pos.x, 0.82, this.pos.z))
    tr.setRotation(new A.btQuaternion(0, Math.sin(this.pos.yaw / 2), 0, Math.cos(this.pos.yaw / 2)))
    this.truckBody.setWorldTransform(tr)
    this.truckBody.getMotionState().setWorldTransform(tr)
  }

  // ------------------------------------------------------------ UI
  setupUI() {
    $('app').insertAdjacentHTML('beforeend', `
      <div id="vignette"></div>
      <div id="hud" class="hidden">
        <div class="panel hud-left">
          <div class="brand"><span class="brand-mark"></span><span>PELICAN <em>FORKLIFT ACADEMY</em></span></div>
          <div class="timer-row"><span class="timer-label">剩余时间</span><span id="timer" class="timer">02:00.0</span></div>
          <div class="timebar"><i id="timebar-fill"></i></div>
          <div class="delivery-row">
            <span class="delivery-label">已交付</span>
            <span id="score" class="score">0 / 3</span>
            <div class="chips" id="chips"></div>
          </div>
        </div>
        <div class="objective panel">
          <span class="obj-kicker">当前任务</span>
          <span id="objective-text">将三个货箱送入同色交付区</span>
        </div>
        <div class="hud-right">
          <button id="pause-btn" class="icon-btn" title="暂停 (P)"><span class="pause-icon"></span><span>暂停</span></button>
          <div class="cam-badge panel"><span id="cam-label">跟随视角</span><span class="keycap">C</span></div>
        </div>
        <div class="hud-bottom-left panel">
          <div class="controls-grid">
            <span><b>W</b><b>S</b> 前进 / 后退</span>
            <span><b>A</b><b>D</b> 转向</span>
            <span><b>Q</b><b>E</b> 升叉 / 降叉释放</span>
            <span><b>空格</b> 制动</span>
            <span><b>P</b> 暂停</span>
            <span><b>C</b> 视角</span>
          </div>
        </div>
        <div class="hud-bottom-right panel">
          <div class="load-row"><span class="load-key">货叉</span><span id="fork-height">0.10 m</span></div>
          <div class="fork-gauge"><i id="fork-fill"></i><span class="gauge-max">1.8</span><span class="gauge-min">0</span></div>
          <div class="carry-row"><span class="dot" id="carry-dot"></span><span class="load-key">载荷</span><span id="carry-text">空载</span></div>
          <div id="align-pill" class="align-pill">对准货箱箱底</div>
        </div>
        <div id="toast" class="toast"></div>
      </div>

      <div id="start-overlay" class="overlay">
        <div class="hero">
          <div class="overline">PELICAN · FORKLIFT ACADEMY · BAY 03</div>
          <h1>鹈鹕<span>叉车</span>驾校</h1>
          <p class="lede">三位菜鸟鹈鹕的毕业考核。驾驶 FL-03 叉车，在 120 秒内把三只同色货箱准确送进对应交付区。</p>
          <div class="feature-row">
            <div><i class="sw" style="background:#c9463c"></i>红色货箱</div>
            <div><i class="sw" style="background:#dea62b"></i>黄色货箱</div>
            <div><i class="sw" style="background:#3b6ea8"></i>蓝色货箱</div>
          </div>
          <div class="start-controls">
            <span><b>W</b><b>S</b> 行驶</span>
            <span><b>A</b><b>D</b> 转向</span>
            <span><b>Q</b><b>E</b> 升降货叉</span>
            <span><b>空格</b> 制动</span>
            <span><b>P</b> 暂停 / 检查模型</span>
          </div>
          <div class="start-actions">
            <button id="start-btn" class="primary-btn"><span>开始训练</span><kbd>ENTER</kbd></button>
            <span class="local-note">本地运行 · Three.js + Ammo · 无需联网</span>
          </div>
        </div>
        <div class="start-side">
          <div class="stat-card"><span class="stat-num">03</span><span class="stat-lab">CARGO<br>CRATES</span></div>
          <div class="stat-card"><span class="stat-num">120</span><span class="stat-lab">SECONDS<br>LIMIT</span></div>
          <div class="stat-card"><span class="stat-num">FL-03</span><span class="stat-lab">TRAINING<br>FORKLIFT</span></div>
        </div>
      </div>

      <div id="pause-overlay" class="overlay side-overlay hidden">
        <div class="pause-card panel">
          <div class="overline">SYSTEM PAUSED</div>
          <h2>已暂停</h2>
          <p class="muted">物理、计时与交付稳定计时均已冻结。可选择视角检查 FL-03 与鹈鹕学员。</p>
          <div class="inspect-label">模型检查 <span>· 保持暂停</span></div>
          <div class="inspect-grid">
            <button class="view-btn" data-view="front">前视</button>
            <button class="view-btn" data-view="side">侧视</button>
            <button class="view-btn" data-view="rear">后视</button>
            <button class="view-btn" data-view="iso">斜上方</button>
          </div>
          <button id="exit-inspect" class="ghost-btn wide">退出检查 / 跟随视角</button>
          <div class="pause-actions">
            <button id="resume-btn" class="primary-btn"><span>恢复训练</span><kbd>P</kbd></button>
            <button id="restart-pause-btn" class="ghost-btn">重新开始</button>
          </div>
          <div class="freeze-note"><span class="freeze-dot"></span> 世界状态未改变<span class="pause-clock">剩余 <b id="pause-timer">02:00.0</b></span></div>
        </div>
        <div class="inspect-caption" id="inspect-caption"></div>
      </div>

      <div id="end-overlay" class="overlay hidden">
        <div class="end-card panel">
          <div id="end-kicker" class="overline">TRAINING COMPLETE</div>
          <h2 id="end-title">全部交付！</h2>
          <p id="end-sub" class="muted">三只货箱均已归位。</p>
          <div class="end-stats">
            <div><span>交付</span><b id="end-score">3 / 3</b></div>
            <div><span>用时</span><b id="end-time">01:12.4</b></div>
            <div><span>剩余</span><b id="end-left">00:47.6</b></div>
          </div>
          <div id="end-stamps" class="end-stamps"></div>
          <button id="restart-end-btn" class="primary-btn"><span>重新挑战</span><kbd>R</kbd></button>
          <p class="tiny">R 重开 · 失败与胜利都会重置车辆、三箱、计时与分数</p>
        </div>
      </div>
      <div id="loading" class="loading">正在装配叉车与鹈鹕…</div>
    `)

    const chips = $('chips')
    for (const z of ZONES) {
      const chip = document.createElement('span')
      chip.className = 'chip'
      chip.dataset.color = z.color
      chip.style.setProperty('--chip', CRATE_INFO[z.color].hex)
      chip.innerHTML = `<i></i>${CRATE_INFO[z.color].zh}`
      chips.appendChild(chip)
    }

    $('start-btn').addEventListener('click', () => this.startGame())
    $('pause-btn').addEventListener('click', () => this.togglePause())
    $('resume-btn').addEventListener('click', () => this.togglePause())
    $('restart-pause-btn').addEventListener('click', () => this.restart())
    $('restart-end-btn').addEventListener('click', () => this.restart())
    $('exit-inspect').addEventListener('click', () => this.setInspect(null))
    for (const btn of Array.from(document.querySelectorAll<HTMLButtonElement>('.view-btn'))) {
      btn.addEventListener('click', () => this.setInspect(btn.dataset.view as InspectView))
    }

    window.addEventListener('keydown', (e) => this.onKeyDown(e))
    window.addEventListener('keyup', (e) => this.onKeyUp(e))
    window.addEventListener('blur', () => this.keys.clear())
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.mode === 'playing') this.togglePause()
    })
    window.addEventListener('wheel', (e) => {
      if (this.mode !== 'playing') return
      this.zoom = THREE.MathUtils.clamp(this.zoom + Math.sign(e.deltaY) * 0.5, 5.2, 11)
    }, { passive: true })
    $('loading').classList.add('hidden')
  }

  onKeyDown(e: KeyboardEvent) {
    const k = e.key.toLowerCase()
    if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) e.preventDefault()
    if (e.repeat) {
      if (['w', 's', 'a', 'd', 'q', 'e'].includes(k)) this.keys.add(k)
      return
    }
    if (k === 'enter' && this.mode === 'ready') { this.startGame(); return }
    if (k === 'p') {
      if (this.mode === 'playing' || this.mode === 'paused') this.togglePause()
      return
    }
    if (k === 'c') { this.cycleCamera(); return }
    if (k === 'r' && (this.mode === 'paused' || this.mode === 'won' || this.mode === 'lost')) { this.restart(); return }
    if (this.mode !== 'playing') return
    if (k === ' ') { e.preventDefault(); this.keys.add(' '); return }
    if (['w', 's', 'a', 'd', 'q', 'e'].includes(k)) this.keys.add(k)
  }

  onKeyUp(e: KeyboardEvent) {
    const k = e.key.toLowerCase()
    this.keys.delete(k)
    if (k === ' ') this.keys.delete(' ')
  }

  startGame() {
    this.hideOverlays()
    this.restartState()
    this.mode = 'playing'
    $('hud').classList.remove('hidden')
    this.showToast('训练开始 · 120 秒', 'good')
    this.updateHud(true)
  }

  restart() {
    if (!this.physics) return
    this.hideOverlays()
    this.restartState()
    this.mode = 'playing'
    $('hud').classList.remove('hidden')
    this.showToast('已重置车辆、货箱、计时与分数', 'good')
    this.updateHud(true)
  }

  restartState() {
    this.pos = { x: SPAWN.x, z: SPAWN.z, yaw: SPAWN.yaw }
    this.speed = 0; this.steer = 0; this.lift = 0
    this.carrying = null
    this.timeLeft = GAME_TIME
    this.elapsed = 0
    this.score = 0
    this.inspect = null
    this.camMode = 'follow'
    this.camInit = false
    this.zoom = 7.6
    this.truck.lift.position.y = 0
    this.placeTruck(SPAWN.x, SPAWN.z, SPAWN.yaw)
    this.syncTruckBody()
    for (let i = 0; i < this.crates.length; i++) {
      const c = this.crates[i]
      const sp = CRATE_SPAWNS[i]
      c.delivered = false; c.carried = false; c.stable = 0; c.warnAt = 0
      c.ring.visible = false
      c.group.visible = true
      c.group.position.set(sp.x, CRATE.halfH, sp.z)
      c.group.rotation.set(0, 0, 0)
      if (!c.inWorld) { this.physics.addRigidBody(c.body); c.inWorld = true }
      this.resetBody(c, sp.x, CRATE.halfH, sp.z, 0)
    }
    for (const b of Array.from(document.querySelectorAll('.view-btn'))) b.classList.remove('active')
    $('inspect-caption').textContent = ''
    this.keys.clear()
    this.updateHud(true)
  }

  resetBody(c: CrateEntity, x: number, y: number, z: number, yaw: number) {
    const A = this.A
    const tr = new A.btTransform(); tr.setIdentity()
    tr.setOrigin(new A.btVector3(x, y, z))
    tr.setRotation(new A.btQuaternion(0, Math.sin(yaw / 2), 0, Math.cos(yaw / 2)))
    c.body.setWorldTransform(tr)
    c.body.getMotionState().setWorldTransform(tr)
    c.body.setLinearVelocity(new A.btVector3(0, 0, 0))
    c.body.setAngularVelocity(new A.btVector3(0, 0, 0))
    c.body.activate()
  }

  hideOverlays() {
    $('start-overlay').classList.add('hidden')
    $('pause-overlay').classList.add('hidden')
    $('end-overlay').classList.add('hidden')
    $('inspect-caption').textContent = ''
  }

  togglePause() {
    if (this.mode === 'playing') {
      this.mode = 'paused'
      this.keys.clear()
      this.inspect = null
      $('hud').classList.add('hidden')
      $('pause-overlay').classList.remove('hidden')
      $('pause-timer').textContent = fmtTime(this.timeLeft)
      $('inspect-caption').textContent = '物理与计时已冻结 · 选择前 / 侧 / 后 / 斜上方检查模型'
      this.setInspect(null)
    } else if (this.mode === 'paused') {
      this.mode = 'playing'
      this.inspect = null
      $('pause-overlay').classList.add('hidden')
      $('hud').classList.remove('hidden')
    }
  }

  setInspect(v: InspectView) {
    if (this.mode !== 'paused') return
    this.inspect = v
    for (const b of Array.from(document.querySelectorAll<HTMLButtonElement>('.view-btn'))) {
      b.classList.toggle('active', b.dataset.view === v)
    }
    const names: Record<string, string> = { front: '前视检查', side: '侧视检查', rear: '后视检查', iso: '斜上方检查' }
    $('inspect-caption').textContent = v ? `模型检查 · ${names[v]} · 暂停中` : '模型检查已退出 · 保持暂停'
    $('exit-inspect').classList.toggle('active', !v)
  }

  cycleCamera() {
    this.camMode = this.camMode === 'follow' ? 'near' : 'follow'
    const label = this.camMode === 'follow' ? '跟随视角' : '近景视角'
    $('cam-label').textContent = label
    this.showToast(label, 'info')
  }

  placeTruck(x: number, z: number, yaw: number) {
    this.pos.x = x; this.pos.z = z; this.pos.yaw = yaw
    this.truck.root.position.set(x, 0, z)
    this.truck.root.rotation.y = yaw
  }

  // ------------------------------------------------------------ loop
  start() {
    this.camera.position.set(SPAWN.x + 2, 5, SPAWN.z + 8.5)
    this.camPos.copy(this.camera.position)
    this.camTarget.set(SPAWN.x, 1.2, SPAWN.z)
    this.renderer.setAnimationLoop(() => this.tick())
  }

  tick() {
    const dt = Math.min(this.clock.getDelta(), 0.05)
    this.readyT += dt
    if (this.mode === 'playing') {
      this.timeLeft = Math.max(0, this.timeLeft - dt)
      this.elapsed += dt
      this.fixedStep(dt)
      if (this.timeLeft <= 0 && this.mode === 'playing') this.endGame(false)
    }
    this.animateVisuals(dt)
    this.updateCamera(dt)
    this.renderer.render(this.scene, this.camera)
    this.lastHud += dt
    if (this.lastHud > 0.08 && this.mode !== 'paused') { this.updateHud(false); this.lastHud = 0 }
    if (this.toastTimer > 0) {
      this.toastTimer -= dt
      if (this.toastTimer <= 0) $('toast').classList.remove('show')
    }
  }

  fixedStep(dt: number) {
    const steps = Math.min(3, Math.max(1, Math.ceil(dt / (1 / 60))))
    const h = dt / steps
    for (let i = 0; i < steps; i++) {
      this.updateVehicle(h)
      this.physics.stepSimulation(h, 2, 1 / 120)
    }
    this.syncCrates()
    this.updateDelivery(dt)
  }

  updateVehicle(dt: number) {
    const K = this.keys
    const fwd = K.has('w') ? 1 : 0
    const back = K.has('s') ? 1 : 0
    const left = K.has('a') ? 1 : 0
    const right = K.has('d') ? 1 : 0
    const brake = K.has(' ')
    const up = K.has('q')
    const down = K.has('e')
    const throttle = fwd - back

    let target = 0
    if (throttle > 0) target = 4.3
    else if (throttle < 0) target = -2.5
    if (brake) target = 0
    const accel = throttle !== 0 && !brake ? 4.6 : 7.8
    const diff = target - this.speed
    this.speed += Math.sign(diff) * Math.min(Math.abs(diff), accel * dt)
    if (brake && Math.abs(this.speed) < 0.05) this.speed = 0
    if (throttle === 0 && !brake) this.speed *= Math.pow(0.12, dt)

    const steerTarget = (left - right) * (0.62 - Math.min(Math.abs(this.speed), 4) * 0.045)
    this.steer += (steerTarget - this.steer) * Math.min(1, dt * 7.5)
    if (Math.abs(this.speed) > 0.02) {
      this.pos.yaw += (this.speed / WHEELBASE) * Math.tan(this.steer) * dt
    }

    this.pos.x += Math.sin(this.pos.yaw) * this.speed * dt
    this.pos.z += Math.cos(this.pos.yaw) * this.speed * dt
    this.resolveVehicleCollisions()

    this.truck.root.position.set(this.pos.x, 0, this.pos.z)
    this.truck.root.rotation.y = this.pos.yaw
    this.syncTruckBody()

    for (const w of this.truck.wheels) {
      w.spin.rotation.x -= (this.speed * dt) / w.radius
      w.steer.rotation.y = w.front ? 0 : this.steer
    }

    let liftMove = 0
    if (up) liftMove = 1
    else if (down) liftMove = -1
    if (liftMove !== 0) this.lift = THREE.MathUtils.clamp(this.lift + liftMove * LIFT_SPEED * dt, 0, LIFT_MAX)
    this.truck.lift.position.y = this.lift

    if (!this.carrying) {
      const cand = this.pickCandidate()
      if (cand && up) this.attach(cand)
    } else {
      const c = this.carrying
      const y = Math.max(this.lift + 0.48, 0.5)
      const wx = this.pos.x + Math.cos(this.pos.yaw) * this.carrySide + Math.sin(this.pos.yaw) * this.carryForward
      const wz = this.pos.z - Math.sin(this.pos.yaw) * this.carrySide + Math.cos(this.pos.yaw) * this.carryForward
      c.group.position.set(wx, y, wz)
      c.group.rotation.set(0, this.pos.yaw + this.carryYawOffset, 0)
      if (this.lift <= RELEASE_LIFT) this.release()
    }
  }

  resolveVehicleCollisions() {
    const circles: { z: number; r: number }[] = [
      { z: -1.05, r: 0.78 },
      { z: -0.1, r: 0.86 },
      { z: 0.85, r: 0.8 },
      { z: 1.3, r: 0.5 },
    ]
    if (this.carrying) circles.push({ z: 2.0, r: 0.82 })
    let hit = false
    for (let iter = 0; iter < 2; iter++) {
      for (const circle of circles) {
        const wx = this.pos.x + Math.sin(this.pos.yaw) * circle.z
        const wz = this.pos.z + Math.cos(this.pos.yaw) * circle.z
        for (const b of this.vehicleColliders) {
          const nx = Math.max(b.cx - b.hx, Math.min(wx, b.cx + b.hx))
          const nz = Math.max(b.cz - b.hz, Math.min(wz, b.cz + b.hz))
          const ddx = wx - nx
          const ddz = wz - nz
          const d2 = ddx * ddx + ddz * ddz
          if (d2 >= circle.r * circle.r) continue
          hit = true
          if (d2 < 1e-7) {
            const toLeft = wx - (b.cx - b.hx), toRight = (b.cx + b.hx) - wx
            const toBack = wz - (b.cz - b.hz), toFront = (b.cz + b.hz) - wz
            const m = Math.min(toLeft, toRight, toBack, toFront)
            if (m === toLeft) this.pos.x -= m + circle.r
            else if (m === toRight) this.pos.x += m + circle.r
            else if (m === toBack) this.pos.z -= m + circle.r
            else this.pos.z += m + circle.r
          } else {
            const d = Math.sqrt(d2)
            const push = circle.r - d
            this.pos.x += (ddx / d) * push
            this.pos.z += (ddz / d) * push
          }
        }
      }
    }
    if (hit) this.speed *= 0.72
    this.pos.x = THREE.MathUtils.clamp(this.pos.x, ROOM.minX + 1.0, ROOM.maxX - 1.0)
    this.pos.z = THREE.MathUtils.clamp(this.pos.z, ROOM.minZ + 1.0, ROOM.maxZ - 1.0)
  }

  pickCandidate(): CrateEntity | null {
    const forkTop = this.lift + FORK_TOP_REST
    let best: { c: CrateEntity; score: number } | null = null
    for (const c of this.crates) {
      if (c.carried || c.delivered) continue
      const dx = c.group.position.x - this.pos.x
      const dz = c.group.position.z - this.pos.z
      const localX = Math.cos(this.pos.yaw) * dx - Math.sin(this.pos.yaw) * dz
      const localZ = Math.sin(this.pos.yaw) * dx + Math.cos(this.pos.yaw) * dz
      if (localZ < 1.0 || localZ > 2.9) continue
      if (Math.abs(localX) > ATTACH_TOL.lateral) continue
      let diff = c.group.rotation.y - this.pos.yaw
      const mod = Math.PI / 2
      diff = ((diff + mod / 2) % mod + mod) % mod - mod / 2
      const angleDeg = Math.abs((diff * 180) / Math.PI)
      if (angleDeg > ATTACH_TOL.angleDeg) continue
      const bottom = c.group.position.y - CRATE.halfH
      if (Math.abs(forkTop - bottom) > ATTACH_TOL.height) continue
      const forkTip = 2.36
      const insertion = forkTip - (localZ - CRATE.d / 2)
      if (insertion < ATTACH_TOL.insertion) continue
      const score = Math.abs(localX) + Math.abs(diff)
      if (!best || score < best.score) best = { c, score }
    }
    return best ? best.c : null
  }

  attach(c: CrateEntity) {
    if (this.carrying) return
    const dx = c.group.position.x - this.pos.x
    const dz = c.group.position.z - this.pos.z
    const localX = Math.cos(this.pos.yaw) * dx - Math.sin(this.pos.yaw) * dz
    const localZ = Math.sin(this.pos.yaw) * dx + Math.cos(this.pos.yaw) * dz
    this.carrying = c
    c.carried = true
    c.stable = 0
    this.carrySide = THREE.MathUtils.clamp(localX, -0.18, 0.18)
    this.carryForward = THREE.MathUtils.clamp(localZ, 1.55, 1.9)
    let diff = c.group.rotation.y - this.pos.yaw
    const mod = Math.PI / 2
    diff = ((diff + mod / 2) % mod + mod) % mod - mod / 2
    this.carryYawOffset = diff
    if (c.inWorld) { this.physics.removeRigidBody(c.body); c.inWorld = false }
    this.showToast(`${CRATE_INFO[c.color].zh}货箱已托起 · 运往同色交付区`, 'good')
  }

  release() {
    const c = this.carrying
    if (!c) return
    this.carrying = null
    c.carried = false
    const y = Math.max(c.group.position.y, CRATE.halfH + 0.005)
    const snapYaw = Math.round(c.group.rotation.y / (Math.PI / 2)) * (Math.PI / 2)
    c.group.rotation.set(0, snapYaw, 0)
    if (!c.inWorld) { this.physics.addRigidBody(c.body); c.inWorld = true }
    this.resetBody(c, c.group.position.x, y, c.group.position.z, snapYaw)
    this.showToast(`${CRATE_INFO[c.color].zh}货箱已释放`, 'info')
  }

  syncCrates() {
    const A = this.A
    for (const c of this.crates) {
      if (c.carried || c.delivered || !c.inWorld) continue
      const tr = c.body.getWorldTransform()
      const o = tr.getOrigin()
      const q = tr.getRotation()
      let x = o.x(), y = o.y(), z = o.z()
      if (y < CRATE.halfH) {
        y = CRATE.halfH
        const t2 = new A.btTransform(); t2.setIdentity()
        t2.setOrigin(new A.btVector3(x, y, z))
        t2.setRotation(q)
        c.body.setWorldTransform(t2)
        c.body.setLinearVelocity(new A.btVector3(0, 0, 0))
        c.body.getMotionState().setWorldTransform(t2)
      }
      x = THREE.MathUtils.clamp(x, ROOM.minX + 1, ROOM.maxX - 1)
      z = THREE.MathUtils.clamp(z, ROOM.minZ + 1, ROOM.maxZ - 1)
      const yaw = Math.atan2(2 * (q.w() * q.y() + q.x() * q.z()), 1 - 2 * (q.y() * q.y() + q.z() * q.z()))
      c.group.position.set(x, y, z)
      c.group.rotation.set(0, yaw, 0)
      c.ring.position.set(x, 0.045, z)
    }
  }

  crateSpeed(c: CrateEntity) {
    if (!c.inWorld) return 0
    const v = c.body.getLinearVelocity()
    return Math.hypot(v.x(), v.z())
  }

  zoneOf(c: CrateEntity): Zone | null {
    const hw = CRATE.w / 2 + 0.005, hd = CRATE.d / 2 + 0.005
    const yaw = c.group.rotation.y
    for (const z of ZONES) {
      let inside = true
      for (const [lx, lz] of [[-hw, -hd], [hw, -hd], [-hw, hd], [hw, hd]]) {
        const wx = c.group.position.x + lx * Math.cos(yaw) + lz * Math.sin(yaw)
        const wz = c.group.position.z - lx * Math.sin(yaw) + lz * Math.cos(yaw)
        if (Math.abs(wx - z.x) > z.w / 2 || Math.abs(wz - z.z) > z.d / 2) { inside = false; break }
      }
      if (inside) return z
    }
    return null
  }

  updateDelivery(dt: number) {
    for (const c of this.crates) {
      if (c.carried || c.delivered) continue
      const bottom = c.group.position.y - CRATE.halfH
      const speed = this.crateSpeed(c)
      const zone = this.zoneOf(c)
      const grounded = bottom <= DELIVERY.maxBottom
      const slow = speed <= DELIVERY.maxSpeed
      const match = zone && zone.color === c.color
      if (match && grounded && slow) {
        c.stable += dt
        c.mat.opacity = 0.75 + Math.min(0.25, (c.stable / DELIVERY.stableSeconds) * 0.25)
        if (c.stable >= DELIVERY.stableSeconds) this.deliver(c, zone!)
      } else {
        c.stable = 0
        if (zone && !match && grounded && slow && this.elapsed - c.warnAt > 2.5) {
          c.warnAt = this.elapsed
          this.showToast(`颜色不匹配：${CRATE_INFO[c.color].zh}货箱应放入${CRATE_INFO[c.color].zh}交付区`, 'bad')
        }
      }
    }
  }

  deliver(c: CrateEntity, zone: Zone) {
    c.delivered = true
    c.stable = 0
    if (c.inWorld) { this.physics.removeRigidBody(c.body); c.inWorld = false }
    c.ring.visible = true
    c.mat.opacity = 1
    c.ring.position.set(c.group.position.x, 0.045, c.group.position.z)
    this.score++
    this.showToast(`${CRATE_INFO[c.color].zh}货箱交付成功 · ${this.score} / 3`, 'good')
    void zone
    const chip = document.querySelector<HTMLElement>(`.chip[data-color="${c.color}"]`)
    if (chip) chip.classList.add('done')
    this.updateHud(true)
    if (this.score >= 3) this.endGame(true)
  }

  endGame(won: boolean) {
    if (this.mode === 'won' || this.mode === 'lost') return
    this.mode = won ? 'won' : 'lost'
    this.keys.clear()
    this.inspect = null
    $('hud').classList.add('hidden')
    $('pause-overlay').classList.add('hidden')
    $('end-overlay').classList.remove('hidden')
    $('end-kicker').textContent = won ? 'TRAINING COMPLETE · ALL CARGO DELIVERED' : 'TIME UP · TRAINING INCOMPLETE'
    $('end-title').textContent = won ? '全部交付！' : '训练超时'
    $('end-sub').textContent = won
      ? '三只货箱全部进入同色交付区，鹈鹕学员顺利毕业。'
      : `时间用尽，本次仅交付 ${this.score} / 3 只货箱。调整对位与路线再试一次。`
    $('end-score').textContent = `${this.score} / 3`
    $('end-time').textContent = fmtTime(this.elapsed)
    $('end-left').textContent = fmtTime(this.timeLeft)
    const stamps = $('end-stamps')
    stamps.innerHTML = ''
    for (const z of ZONES) {
      const c = this.crates.find((x) => x.color === z.color)
      const el = document.createElement('div')
      el.className = `stamp ${c?.delivered ? 'ok' : 'no'}`
      el.innerHTML = `<i style="background:${CRATE_INFO[z.color].hex}"></i>${CRATE_INFO[z.color].zh}${c?.delivered ? '已交付' : '未交付'}`
      stamps.appendChild(el)
    }
  }

  // ------------------------------------------------------------ visuals
  animateVisuals(dt: number) {
    const t = this.readyT
    const bmat = this.truck.beacon.material as THREE.MeshStandardMaterial
    bmat.emissiveIntensity = 1.7 + Math.sin(t * 5.5) * 0.9
    this.truck.beacon.rotation.y += dt * 3.2
    const pel = this.truck.pelican
    pel.head.rotation.x = Math.sin(t * 1.7) * 0.025
    pel.head.rotation.z = Math.sin(t * 0.9) * 0.03 - this.steer * 0.07
    pel.torso.rotation.z = Math.sin(t * 1.4) * 0.012 - this.steer * 0.035
    pel.torso.rotation.x = Math.sin(t * 1.1) * 0.012 + Math.min(0.06, Math.abs(this.speed) * 0.008)
    for (const c of this.crates) {
      if (c.ring.visible) {
        c.ring.scale.setScalar(1 + Math.sin(t * 2.4) * 0.03)
        c.mat.opacity = 0.55 + Math.sin(t * 2.4) * 0.15
      }
    }
  }

  // ------------------------------------------------------------ camera
  updateCamera(dt: number) {
    const truckPos = new THREE.Vector3(this.pos.x, 0, this.pos.z)
    const desired = new THREE.Vector3()
    const look = new THREE.Vector3()

    if (this.mode === 'ready' || this.mode === 'won' || this.mode === 'lost') {
      const angle = this.readyT * 0.14 + 2.15
      const radius = this.mode === 'ready' ? 8.6 : 9.4
      desired.set(truckPos.x + Math.cos(angle) * radius, 3.5 + Math.sin(this.readyT * 0.2) * 0.5, truckPos.z + Math.sin(angle) * radius)
      look.set(truckPos.x, 1.35, truckPos.z + 0.2)
    } else if (this.mode === 'paused' && this.inspect) {
      const dist = this.inspect === 'iso' ? 8.2 : 9.2
      const yaw = this.pos.yaw
      const f = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw))
      const r = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw))
      if (this.inspect === 'front') desired.copy(truckPos).addScaledVector(f, dist).add(new THREE.Vector3(0, 2.35, 0))
      else if (this.inspect === 'rear') desired.copy(truckPos).addScaledVector(f, -dist).add(new THREE.Vector3(0, 2.5, 0))
      else if (this.inspect === 'side') desired.copy(truckPos).addScaledVector(r, dist).add(new THREE.Vector3(0, 2.3, 0))
      else desired.copy(truckPos).addScaledVector(f, dist * 0.72).addScaledVector(r, dist * 0.66).add(new THREE.Vector3(0, 3.8, 0))
      look.set(truckPos.x, 1.2, truckPos.z)
      const viewDir = new THREE.Vector3().subVectors(look, desired).setY(0).normalize()
      const pan = new THREE.Vector3(-viewDir.z, 0, viewDir.x).multiplyScalar(-1.25)
      desired.add(pan); look.add(pan)
    } else if (this.camMode === 'near') {
      const f = new THREE.Vector3(Math.sin(this.pos.yaw), 0, Math.cos(this.pos.yaw))
      const r = new THREE.Vector3(Math.cos(this.pos.yaw), 0, -Math.sin(this.pos.yaw))
      const liftAdj = this.carrying ? 0.4 : 0
      desired.copy(truckPos).addScaledVector(f, -4.6).addScaledVector(r, 1.75).add(new THREE.Vector3(0, 3.4 + liftAdj, 0))
      look.copy(truckPos).addScaledVector(f, 1.45).add(new THREE.Vector3(0, 0.95 + liftAdj * 0.6, 0))
    } else {
      const f = new THREE.Vector3(Math.sin(this.pos.yaw), 0, Math.cos(this.pos.yaw))
      const r = new THREE.Vector3(Math.cos(this.pos.yaw), 0, -Math.sin(this.pos.yaw))
      const carryLift = this.carrying ? 0.65 : 0
      desired.copy(truckPos).addScaledVector(f, -this.zoom).addScaledVector(r, 2.55).add(new THREE.Vector3(0, 5.0 + carryLift, 0))
      look.copy(truckPos).addScaledVector(f, 1.9).add(new THREE.Vector3(0, 0.7 + carryLift * 0.7, 0))
    }

    desired.x = THREE.MathUtils.clamp(desired.x, ROOM.minX + 0.8, ROOM.maxX - 0.8)
    desired.z = THREE.MathUtils.clamp(desired.z, ROOM.minZ + 0.8, ROOM.maxZ - 0.8)
    desired.y = THREE.MathUtils.clamp(desired.y, 1.35, ROOM.wallH - 0.7)
    if (this.mode === 'playing' || this.mode === 'ready') desired.copy(this.avoidCamera(look, desired))
    if (!this.camInit) {
      this.camPos.copy(desired); this.camTarget.copy(look); this.camInit = true
    } else {
      const k = 1 - Math.exp(-dt * (this.mode === 'playing' ? 5.2 : 3.4))
      this.camPos.lerp(desired, k)
      this.camTarget.lerp(look, 1 - Math.exp(-dt * 6))
    }
    this.camera.position.copy(this.camPos)
    this.camera.lookAt(this.camTarget)
  }

  avoidCamera(from: THREE.Vector3, to: THREE.Vector3) {
    const dir = new THREE.Vector3().subVectors(to, from)
    const len = dir.length()
    if (len < 0.001) return to
    dir.divideScalar(len)
    let best = 1
    for (const b of this.staticColliders) {
      if (!b.occlude) continue
      const t = this.segmentBox(from, dir, len, b)
      if (t !== null && t < best) best = t
    }
    if (best < 1) return from.clone().addScaledVector(dir, Math.max(0.9, best * len - 0.5))
    return to
  }

  segmentBox(origin: THREE.Vector3, dir: THREE.Vector3, len: number, b: StaticBox) {
    const min = new THREE.Vector3(b.cx - b.hx, b.cy - b.hy, b.cz - b.hz)
    const max = new THREE.Vector3(b.cx + b.hx, b.cy + b.hy, b.cz + b.hz)
    let tmin = 0, tmax = len
    for (const axis of ['x', 'y', 'z'] as const) {
      const o = origin[axis], d = dir[axis]
      const mn = min[axis], mx = max[axis]
      if (Math.abs(d) < 1e-8) {
        if (o < mn || o > mx) return null
      } else {
        let t1 = (mn - o) / d, t2 = (mx - o) / d
        if (t1 > t2) [t1, t2] = [t2, t1]
        tmin = Math.max(tmin, t1); tmax = Math.min(tmax, t2)
        if (tmin > tmax) return null
      }
    }
    return tmin > 0.05 ? tmin : null
  }

  // ------------------------------------------------------------ HUD
  updateHud(force: boolean) {
    $('timer').textContent = fmtTime(this.timeLeft)
    const frac = this.timeLeft / GAME_TIME
    const bar = $('timebar-fill')
    bar.style.transform = `scaleX(${Math.max(0, frac)})`
    bar.style.background = frac < 0.25 ? 'linear-gradient(90deg,#c9463c,#e08a45)' : frac < 0.5 ? 'linear-gradient(90deg,#d3a33a,#e3c46b)' : 'linear-gradient(90deg,#2f8f83,#7fcbb8)'
    $('score').textContent = `${this.score} / 3`
    $('fork-height').textContent = `${(this.lift + FORK_TOP_REST).toFixed(2)} m`
    $('fork-fill').style.transform = `scaleY(${Math.max(0.02, (this.lift + FORK_TOP_REST) / (LIFT_MAX + FORK_TOP_REST))})`
    const carryText = $('carry-text')
    const dot = $('carry-dot')
    if (this.carrying) {
      carryText.textContent = `${CRATE_INFO[this.carrying.color].zh}货箱`
      dot.style.background = CRATE_INFO[this.carrying.color].hex
      dot.classList.add('loaded')
    } else {
      carryText.textContent = '空载'
      dot.style.background = '#4a5759'
      dot.classList.remove('loaded')
    }
    const pill = $('align-pill')
    if (this.carrying) {
      pill.textContent = '按 E 降叉释放 · 需完全进入同色区'
      pill.className = 'align-pill carry'
    } else {
      const cand = this.pickCandidate()
      if (cand) {
        pill.textContent = '已对准箱底 · 按 Q 升叉托起'
        pill.className = 'align-pill ready'
      } else {
        const near = this.crates.find((c) => !c.delivered && Math.hypot(c.group.position.x - this.pos.x, c.group.position.z - this.pos.z) < 4)
        pill.textContent = near ? `对准${CRATE_INFO[near.color].zh}货箱 · 低位插入箱底` : '对准货箱箱底'
        pill.className = 'align-pill'
      }
    }
    for (const z of ZONES) {
      const c = this.crates.find((x) => x.color === z.color)
      const chip = document.querySelector<HTMLElement>(`.chip[data-color="${z.color}"]`)
      if (chip) chip.classList.toggle('done', !!c?.delivered)
    }
    if (force) {
      $('objective-text').textContent = this.score >= 3 ? '全部交付完成' : '将三个货箱送入同色交付区'
      $('cam-label').textContent = this.camMode === 'follow' ? '跟随视角' : '近景视角'
    }
  }

  showToast(text: string, kind: 'good' | 'bad' | 'info' = 'info') {
    const el = $('toast')
    el.textContent = text
    el.className = `toast show ${kind}`
    this.toastTimer = 2.4
  }

  onResize() {
    const w = window.innerWidth, h = window.innerHeight
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  }

  snapshot() {
    return {
      mode: this.mode,
      timeLeft: +this.timeLeft.toFixed(3),
      elapsed: +this.elapsed.toFixed(3),
      score: this.score,
      lift: +this.lift.toFixed(3),
      speed: +this.speed.toFixed(3),
      yaw: +this.pos.yaw.toFixed(3),
      x: +this.pos.x.toFixed(3),
      z: +this.pos.z.toFixed(3),
      carrying: this.carrying?.color ?? null,
      canPick: this.pickCandidate()?.color ?? null,
      camera: this.camMode,
      inspect: this.inspect,
      crates: this.crates.map((c) => ({
        color: c.color,
        x: +c.group.position.x.toFixed(3),
        y: +c.group.position.y.toFixed(3),
        z: +c.group.position.z.toFixed(3),
        delivered: c.delivered,
        carried: c.carried,
        yaw: +c.group.rotation.y.toFixed(3),
        stable: +c.stable.toFixed(2),
        zone: this.zoneOf(c)?.color ?? null,
      })),
      render: { geometries: this.renderer.info.memory.geometries, textures: this.renderer.info.memory.textures, calls: this.renderer.info.render.calls, tris: this.renderer.info.render.triangles, programs: this.renderer.info.programs?.length ?? null },
    }
  }

  debugTeleport(x: number, z: number, yaw: number) {
    if (this.mode !== 'playing') return
    this.placeTruck(x, z, yaw)
    this.syncTruckBody()
    this.speed = 0
  }

  debugSetLift(v: number) {
    this.lift = THREE.MathUtils.clamp(v, 0, LIFT_MAX)
    this.truck.lift.position.y = this.lift
    if (this.carrying) {
      const c = this.carrying
      const y = Math.max(this.lift + 0.48, 0.5)
      const wx = this.pos.x + Math.cos(this.pos.yaw) * this.carrySide + Math.sin(this.pos.yaw) * this.carryForward
      const wz = this.pos.z - Math.sin(this.pos.yaw) * this.carrySide + Math.cos(this.pos.yaw) * this.carryForward
      c.group.position.set(wx, y, wz)
    }
  }

  debugPlaceCrate(color: CrateColor, x: number, z: number, y = CRATE.halfH) {
    const c = this.crates.find((x) => x.color === color)
    if (!c || c.carried || c.delivered) return
    if (!c.inWorld) { this.physics.addRigidBody(c.body); c.inWorld = true }
    this.resetBody(c, x, y, z, 0)
    c.group.position.set(x, y, z)
    c.group.rotation.set(0, 0, 0)
  }
}

const boot = () => {
  try {
    const game = new Game()
    game.initPhysics()
    game.start()
    ;(window as any).__pelican = game
  } catch (err) {
    console.error(err)
    const app = document.getElementById('app')
    if (app) app.insertAdjacentHTML('beforeend', `<div class="loading" style="color:#e9b7a4;z-index:99">初始化失败：${String(err)}</div>`)
  }
}

PhysicsLoader('./vendor/ammo', boot)
