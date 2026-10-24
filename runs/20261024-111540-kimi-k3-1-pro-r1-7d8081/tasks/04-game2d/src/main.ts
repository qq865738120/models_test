import Phaser from 'phaser'

type Mode = 'title' | 'running' | 'paused' | 'won' | 'lost'
type Player = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
type Platform = Phaser.Types.Physics.Arcade.ImageWithDynamicBody

type PlatformSpec = { x: number; y: number; w: number; h?: number }
type MovingSpec = PlatformSpec & { range: number; speed: number }
type MovingState = { sprite: Platform; startX: number; range: number; speed: number; dir: number; lastX: number }

const WORLD_W = 3600
const WORLD_H = 900
const GRAVITY = 900
const MOVE_SPEED = 260
const JUMP_SPEED = 520
const START = { x: 120, y: 760 }
const COLORS = { ink: '#17324a', cream: '#fffaf0', orange: '#f5a524', coral: '#ef6a5b', teal: '#1c9a96', sky: '#bfe9ed' }

class SoundBank {
  private ctx?: AudioContext
  unlock() {
    if (!this.ctx) this.ctx = new AudioContext()
    if (this.ctx.state === 'suspended') void this.ctx.resume()
  }
  play(kind: 'jump' | 'collect' | 'hurt' | 'win' | 'land') {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const notes = kind === 'collect' ? [660, 880] : kind === 'win' ? [523, 659, 784, 1047] : [kind === 'jump' ? 330 : kind === 'hurt' ? 130 : 190]
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()
      osc.type = kind === 'hurt' ? 'sawtooth' : 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.09)
      if (kind === 'jump') osc.frequency.exponentialRampToValueAtTime(500, now + 0.12)
      gain.gain.setValueAtTime(0.0001, now + i * 0.09)
      gain.gain.exponentialRampToValueAtTime(kind === 'land' ? 0.025 : 0.07, now + i * 0.09 + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.15)
      osc.connect(gain).connect(this.ctx!.destination)
      osc.start(now + i * 0.09)
      osc.stop(now + i * 0.09 + 0.17)
    })
  }
}

class PelicanScene extends Phaser.Scene {
  private mode: Mode = 'title'
  private autoStart = false
  private player!: Player
  private platforms!: Phaser.Physics.Arcade.StaticGroup
  private movingPlatforms!: Phaser.Physics.Arcade.Group
  private robots: Player[] = []
  private robotRanges: { left: number; right: number }[] = []
  private movers: MovingState[] = []
  private parcels: Phaser.Types.Physics.Arcade.ImageWithStaticBody[] = []
  private collected = 0
  private lives = 3
  private timeLeft = 120
  private invulnerable = 0
  private hurtTimer = 0
  private toastCooldown = 0
  private wasGrounded = false
  private jumpBuffer = 0
  private touch = { left: false, right: false }
  private touchJumpQueued = false
  private keys!: { left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key; a: Phaser.Input.Keyboard.Key; d: Phaser.Input.Keyboard.Key; jump: Phaser.Input.Keyboard.Key; pause: Phaser.Input.Keyboard.Key }
  private hudRoot?: Phaser.GameObjects.Container
  private overlayRoot?: Phaser.GameObjects.Container
  private touchRoot?: Phaser.GameObjects.Container
  private lifeIcons: Phaser.GameObjects.Image[] = []
  private hudParcel?: Phaser.GameObjects.Text
  private hudTime?: Phaser.GameObjects.Text
  private exitLabel?: Phaser.GameObjects.Text
  private sky?: Phaser.GameObjects.TileSprite
  private sea?: Phaser.GameObjects.TileSprite
  private toast?: Phaser.GameObjects.Container
  private sfx = new SoundBank()
  private endReason = ''

  constructor() { super('pelican') }

  init(data: { autoStart?: boolean }) { this.autoStart = !!data.autoStart }

  preload() {
    const sprites = ['pelican-idle', 'pelican-jump', 'pelican-hurt', 'pelican-walk-0', 'pelican-walk-1', 'pelican-walk-2', 'pelican-walk-3', 'platform', 'hazard', 'robot', 'parcel', 'heart', 'pause']
    sprites.forEach(name => this.load.svg(name, `materials/sprites/${name}.svg`))
  }

  create() {
    this.mode = 'title'
    this.collected = 0
    this.lives = 3
    this.timeLeft = 120
    this.invulnerable = 0
    this.hurtTimer = 0
    this.robots = []
    this.robotRanges = []
    this.movers = []
    this.parcels = []
    this.touch = { left: false, right: false }
    this.touchJumpQueued = false
    this.makeTextures()
    this.makeBackdrop()
    this.makeLevel()
    this.makeAnimations()
    this.makePlayer()
    this.makeInput()
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H)
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09, 0, 80)
    this.cameras.main.setRoundPixels(true)
    this.buildHUD()
    this.buildTouchControls()
    this.showTitle()
    this.scale.on(Phaser.Scale.Events.RESIZE, this.onResize, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.scale.off(Phaser.Scale.Events.RESIZE, this.onResize, this))
    this.physics.world.pause()
    if (this.autoStart) this.startGame()
  }

  private makeTextures() {
    const sky = this.add.graphics()
    for (let y = 0; y < 720; y++) {
      const t = y / 720
      const c = Phaser.Display.Color.Interpolate.ColorWithColor(
        new Phaser.Display.Color(126, 205, 224), new Phaser.Display.Color(244, 244, 211), 100, Math.floor(t * 100))
      sky.fillStyle(Phaser.Display.Color.GetColor(c.r, c.g, c.b), 1).fillRect(0, y, 32, 1)
    }
    sky.generateTexture('sky-gradient', 32, 720).destroy()

    const cloud = this.add.graphics()
    cloud.fillStyle(0xffffff, 0.8)
    cloud.fillEllipse(62, 38, 100, 32).fillEllipse(118, 35, 86, 40).fillEllipse(92, 24, 72, 42).fillRect(45, 36, 110, 28)
    cloud.generateTexture('cloud', 180, 80).destroy()

    const particle = this.add.graphics().fillStyle(0xffffff).fillCircle(4, 4, 4)
    particle.generateTexture('particle', 8, 8).destroy()

    const shadow = this.add.graphics().fillStyle(0x17324a, 0.18).fillEllipse(40, 8, 80, 16)
    shadow.generateTexture('soft-shadow', 80, 16).destroy()
  }

  private makeBackdrop() {
    const w = this.scale.width
    const h = this.scale.height
    this.sky = this.add.tileSprite(0, 0, w, h, 'sky-gradient').setOrigin(0).setScrollFactor(0).setDepth(-100)
    this.add.circle(w - 110, 110, 54, 0xffe6a2, 0.75).setScrollFactor(0).setDepth(-95)
    for (let i = 0; i < 14; i++) {
      this.add.image(100 + i * 330, 100 + (i % 4) * 64, 'cloud')
        .setScale(0.7 + (i % 3) * 0.25).setAlpha(0.48 + (i % 2) * 0.16).setScrollFactor(0.18).setDepth(-90)
    }
    this.sea = this.add.tileSprite(0, h * 0.64, w, h * 0.36, 'sky-gradient').setOrigin(0).setScrollFactor(0).setDepth(-85)
    this.sea.setTint(0x66c5c7)

    const islands = this.add.graphics().setScrollFactor(0.35).setDepth(-80)
    islands.fillStyle(0x86b9ae, 0.65)
    for (let x = -100; x < WORLD_W; x += 460) {
      islands.fillTriangle(x, 670, x + 230, 410 - (x % 3) * 20, x + 520, 670)
      islands.fillStyle(0x6fa9a4, 0.5).fillTriangle(x + 170, 670, x + 390, 500, x + 650, 670)
      islands.fillStyle(0x86b9ae, 0.65)
    }
    const harbor = this.add.graphics().setScrollFactor(0.62).setDepth(-70)
    harbor.fillStyle(0xf8e3b4, 0.85)
    for (let x = 160; x < WORLD_W; x += 540) {
      harbor.fillRect(x, 590, 150, 110).fillTriangle(x - 15, 590, x + 75, 535, x + 165, 590)
      harbor.fillStyle(0xd78565, 0.8).fillRect(x + 24, 625, 34, 75).fillRect(x + 92, 615, 34, 30)
      harbor.fillStyle(0xf8e3b4, 0.85)
      harbor.fillCircle(x + 320, 675, 58).fillRect(x + 275, 675, 90, 35)
    }
    const birds = this.add.graphics().setScrollFactor(0.45).setDepth(-60)
    birds.lineStyle(3, 0x39677c, 0.32)
    for (let x = 300; x < WORLD_W; x += 690) {
      birds.beginPath().arc(x, 245, 16, Math.PI, Math.PI * 1.85).strokePath()
      birds.beginPath().arc(x + 31, 245, 16, Math.PI * 1.15, Math.PI * 2).strokePath()
    }
  }

  private makeLevel() {
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H)
    this.platforms = this.physics.add.staticGroup()
    this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true })

    const grounds: PlatformSpec[] = [
      { x: 0, y: 760, w: 700, h: 140 }, { x: 760, y: 760, w: 540, h: 140 },
      { x: 1400, y: 760, w: 580, h: 140 }, { x: 2130, y: 760, w: 620, h: 140 },
      { x: 2880, y: 760, w: 720, h: 140 },
    ]
    const ledges: PlatformSpec[] = [
      { x: 840, y: 682, w: 150 }, { x: 1060, y: 606, w: 230 },
      { x: 1460, y: 666, w: 150 }, { x: 1880, y: 600, w: 110 },
      { x: 2250, y: 674, w: 160 }, { x: 2440, y: 586, w: 240 },
      { x: 2740, y: 670, w: 120 }, { x: 3050, y: 632, w: 170 },
    ]
    ;[...grounds, ...ledges].forEach(spec => this.addPlatform(spec))
    this.addMovingPlatform({ x: 1650, y: 622, w: 180, range: 170, speed: 72 })
    this.addMovingPlatform({ x: 2790, y: 570, w: 130, range: 85, speed: 58 })

    const deco = this.add.graphics().setDepth(-2)
    grounds.forEach(g => {
      deco.fillStyle(0x214f5d, 0.16).fillEllipse(g.x + g.w / 2, g.y + 16, g.w * 0.94, 30)
      deco.fillStyle(0xf7d488, 1).fillRect(g.x, g.y + 24, g.w, 10)
      deco.fillStyle(0xd9a760, 1).fillRect(g.x, g.y + 34, g.w, g.h! - 34)
      for (let x = g.x + 30; x < g.x + g.w; x += 72) {
        deco.fillStyle(0xc18d54, 0.45).fillCircle(x, g.y + 66 + (x % 3) * 12, 5)
        deco.lineStyle(2, 0xffe7aa, 0.55).lineBetween(x + 16, g.y + 50, x + 40, g.y + 44)
      }
    })
    ledges.forEach(p => {
      deco.fillStyle(0x214f5d, 0.16).fillEllipse(p.x + p.w / 2, p.y + 28, p.w * 0.85, 18)
    })

    this.addHazard(570, 736, 100)
    this.addHazard(1280, 736, 80)
    this.addHazard(1970, 736, 80)
    this.addHazard(2640, 736, 100)
    this.addHazard(3180, 736, 80)

    this.addRobot(980, 760, 820, 1240)
    this.addRobot(2290, 760, 2180, 2560)
    this.addRobot(3010, 760, 2930, 3140)

    this.addParcel(1175, 606)
    this.addParcel(1740, 622)
    this.addParcel(2560, 586)
    this.makeExit()
    this.addWorldDetails()
  }

  private addPlatform(spec: PlatformSpec) {
    const p = this.platforms.create(spec.x, spec.y, 'platform') as Phaser.Physics.Arcade.Image
    p.setOrigin(0, 0).setDisplaySize(spec.w, spec.h ? 24 : 28).refreshBody()
    p.setDepth(4)
    const lip = this.add.rectangle(spec.x + spec.w / 2, spec.y + 2, spec.w, 5, 0xb9ecdf).setDepth(5)
    lip.setStrokeStyle(1, 0xffffff, 0.4)
  }

  private addMovingPlatform(spec: MovingSpec) {
    const p = this.movingPlatforms.create(spec.x, spec.y, 'platform') as Platform
    p.setOrigin(0, 0).setDisplaySize(spec.w, 30)
    p.body.setAllowGravity(false).setImmovable(true)
    p.setDepth(6).setTint(0xffe2a1)
    p.body.setVelocityX(spec.speed)
    this.movers.push({ sprite: p, startX: spec.x, range: spec.range, speed: spec.speed, dir: 1, lastX: spec.x })
    const marker = this.add.text(spec.x + spec.w / 2, spec.y - 26, '↔  空中摆渡', { fontFamily: 'sans-serif', fontSize: '14px', color: COLORS.ink, backgroundColor: '#fff6d9', padding: { x: 8, y: 4 } }).setOrigin(0.5).setDepth(5)
    this.tweens.add({ targets: marker, y: marker.y - 4, duration: 900, yoyo: true, repeat: -1 })
  }

  private addHazard(x: number, y: number, w: number) {
    const h = this.physics.add.staticImage(x + w / 2, y + 12, 'hazard').setDisplaySize(w, 24)
    h.refreshBody().setDepth(7)
    // Player overlaps are registered once, after the player is created.
    h.setData('hazard', true)
  }

  private addRobot(x: number, bottom: number, left: number, right: number) {
    const r = this.physics.add.sprite(x, bottom - 24, 'robot') as Player
    r.setDepth(8)
    r.body.setSize(38, 40).setOffset(5, 5)
    r.body.setAllowGravity(true)
    r.setVelocityX(72)
    this.robots.push(r)
    this.robotRanges.push({ left, right })
  }

  private addParcel(x: number, bottom: number) {
    const shadow = this.add.image(x, bottom + 5, 'soft-shadow').setScale(0.55).setDepth(5)
    const p = this.physics.add.staticImage(x, bottom - 22, 'parcel').setDisplaySize(44, 44)
    p.refreshBody().setDepth(9)
    p.setData('collected', false)
    p.setData('shadow', shadow)
    this.parcels.push(p)
    this.tweens.add({ targets: p, y: p.y - 8, duration: 780, yoyo: true, repeat: -1, ease: 'Sine.InOut' })
    this.add.text(x, bottom - 67, '快递', { fontFamily: 'sans-serif', fontSize: '14px', fontStyle: 'bold', color: '#755026', backgroundColor: '#fff1bc', padding: { x: 6, y: 3 } }).setOrigin(0.5).setDepth(8)
  }

  private makeExit() {
    const x = 3420, y = 760
    const glow = this.add.graphics().setDepth(2)
    glow.fillStyle(0xffe6a1, 0.22).fillCircle(x, y - 76, 96)
    const g = this.add.graphics().setDepth(6)
    g.fillStyle(0x17324a).fillRoundedRect(x - 56, y - 142, 112, 142, 16)
    g.fillStyle(0xfff5d8).fillRoundedRect(x - 46, y - 132, 92, 132, 10)
    g.fillStyle(0x1c9a96).fillRoundedRect(x - 34, y - 105, 68, 105, 8)
    g.fillStyle(0xffd465).fillCircle(x + 17, y - 53, 5)
    g.lineStyle(4, 0x17324a).strokeRoundedRect(x - 56, y - 142, 112, 142, 16)
    this.exitLabel = this.add.text(x, y - 168, '集齐 3 份后投递', { fontFamily: 'sans-serif', fontSize: '18px', fontStyle: 'bold', color: COLORS.ink, backgroundColor: '#fff7dc', padding: { x: 12, y: 7 } }).setOrigin(0.5).setDepth(8)
    const zone = this.add.zone(x, y - 70, 90, 140)
    this.physics.add.existing(zone, true)
    zone.setData('exit', true)
  }

  private addWorldDetails() {
    const g = this.add.graphics().setDepth(3)
    const crates = [{ x: 320, y: 760 }, { x: 1510, y: 760 }, { x: 2200, y: 760 }, { x: 3310, y: 760 }]
    crates.forEach((c, i) => {
      g.fillStyle(0x8f633e).fillRoundedRect(c.x, c.y - 38, 38, 38, 4)
      g.fillStyle(0xd6a366).fillRoundedRect(c.x + 4, c.y - 34, 30, 30, 2)
      g.lineStyle(3, 0x8f633e).lineBetween(c.x + 6, c.y - 32, c.x + 32, c.y - 6)
      this.add.text(c.x + 19, c.y - 55, `${i + 1}号仓`, { fontFamily: 'sans-serif', fontSize: '12px', color: COLORS.ink }).setOrigin(0.5).setDepth(5)
    })
    const sign = this.add.graphics().setDepth(5)
    sign.fillStyle(0x815636).fillRect(174, 666, 8, 94)
    sign.fillStyle(0xfff3cb).fillRoundedRect(98, 640, 160, 48, 10).lineStyle(3, 0x17324a).strokeRoundedRect(98, 640, 160, 48, 10)
    this.add.text(178, 664, '晴空海岸  →', { fontFamily: 'sans-serif', fontSize: '20px', fontStyle: 'bold', color: COLORS.ink }).setOrigin(0.5).setDepth(6)
  }

  private makeAnimations() {
    this.anims.create({ key: 'walk', frames: [0, 1, 2, 3].map(n => ({ key: `pelican-walk-${n}` })), frameRate: 8, repeat: -1 })
  }

  private makePlayer() {
    this.player = this.physics.add.sprite(START.x, START.y - 32, 'pelican-idle') as Player
    this.player.setDepth(12)
    this.player.body.setSize(34, 52).setOffset(15, 9)
    this.player.setMaxVelocity(MOVE_SPEED, 760)
    this.player.setDragX(0)
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.player, this.movingPlatforms)
    this.physics.add.collider(this.robots, this.platforms)
    this.children.list.filter(o => o.getData('hazard')).forEach(h => this.physics.add.overlap(this.player, h, () => this.hurt('撞上危险区')))
    this.robots.forEach(r => this.physics.add.overlap(this.player, r, () => this.hurt('被巡逻机器人撞到了')))
    this.parcels.forEach(p => this.physics.add.overlap(this.player, p, () => this.collectParcel(p)))
    const exit = this.children.list.find(o => o.getData('exit'))
    if (exit) this.physics.add.overlap(this.player, exit, () => this.tryExit())
  }

  private makeInput() {
    const k = this.input.keyboard!
    this.keys = {
      left: k.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT), right: k.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      a: k.addKey(Phaser.Input.Keyboard.KeyCodes.A), d: k.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      jump: k.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), pause: k.addKey(Phaser.Input.Keyboard.KeyCodes.P),
    }
    k.addCapture([Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.SPACE])
    this.game.events.on(Phaser.Core.Events.BLUR, this.clearTouch, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.game.events.off(Phaser.Core.Events.BLUR, this.clearTouch, this))
  }

  private startGame() {
    this.sfx.unlock()
    this.mode = 'running'
    this.overlayRoot?.destroy(true)
    this.overlayRoot = undefined
    this.physics.world.resume()
    this.tweens.resumeAll()
    this.buildTouchControls()
    this.showToast('出发！收集 3 份快递，再送到右侧邮局', '#fff4c9')
  }

  private restart() { this.scene.restart({ autoStart: true }) }

  private togglePause() {
    if (this.mode === 'running') {
      this.mode = 'paused'
      this.clearTouch()
      this.physics.world.pause()
      this.tweens.pauseAll()
      this.showPause()
    } else if (this.mode === 'paused') {
      this.mode = 'running'
      this.overlayRoot?.destroy(true)
      this.overlayRoot = undefined
      this.physics.world.resume()
      this.tweens.resumeAll()
      this.buildTouchControls()
    }
  }

  private grounded() { return this.player.body.blocked.down || this.player.body.touching.down }

  update(_time: number, delta: number) {
    if (Phaser.Input.Keyboard.JustDown(this.keys.pause) && (this.mode === 'running' || this.mode === 'paused')) this.togglePause()
    if (this.mode !== 'running') return
    const dt = Math.min(delta, 40) / 1000
    this.timeLeft = Math.max(0, this.timeLeft - dt)
    this.invulnerable = Math.max(0, this.invulnerable - dt)
    this.hurtTimer = Math.max(0, this.hurtTimer - dt)
    this.toastCooldown = Math.max(0, this.toastCooldown - dt)
    if (this.timeLeft <= 0) { this.finish(false, '时间到了，快递还没有全部送达。') ; return }

    this.movers.forEach(m => {
      const x = m.sprite.x
      if ((m.dir > 0 && x >= m.startX + m.range) || (m.dir < 0 && x <= m.startX)) m.dir *= -1
      m.sprite.body.setVelocityX(m.dir * m.speed)
      if (this.player.body.touching.down && m.sprite.body.touching.up) this.player.x += m.sprite.x - m.lastX
      m.lastX = m.sprite.x
    })
    this.robots.forEach((r, i) => {
      const range = this.robotRanges[i]
      if (r.x <= range.left) r.setVelocityX(72)
      else if (r.x >= range.right) r.setVelocityX(-72)
      r.setFlipX(r.body.velocity.x < 0)
    })

    const grounded = this.grounded()
    if (grounded && !this.wasGrounded && Math.abs(this.player.body.velocity.y) < 100) {
      this.player.setScale(1.12, 0.86)
      this.tweens.add({ targets: this.player, scaleX: 1, scaleY: 1, duration: 150, ease: 'Back.Out' })
      this.sfx.play('land')
    }
    this.wasGrounded = grounded
    const left = this.keys.left.isDown || this.keys.a.isDown || this.touch.left
    const right = this.keys.right.isDown || this.keys.d.isDown || this.touch.right
    const direction = (right ? 1 : 0) - (left ? 1 : 0)
    this.player.setVelocityX(direction * MOVE_SPEED)
    if (direction) this.player.setFlipX(direction < 0)
    if (Phaser.Input.Keyboard.JustDown(this.keys.jump) || this.touchJumpQueued) this.jumpBuffer = 0.12
    else this.jumpBuffer = Math.max(0, this.jumpBuffer - dt)
    this.touchJumpQueued = false
    if (this.jumpBuffer > 0 && grounded) {
      this.player.setVelocityY(-JUMP_SPEED)
      this.jumpBuffer = 0
      this.wasGrounded = false
      this.player.setScale(0.9, 1.12)
      this.tweens.add({ targets: this.player, scaleX: 1, scaleY: 1, duration: 170 })
      this.sfx.play('jump')
    }
    this.player.x = Phaser.Math.Clamp(this.player.x, 24, WORLD_W - 24)
    if (this.hurtTimer > 0) this.player.anims.stop()
    else if (!grounded) this.player.anims.stop()
    else if (direction) this.player.anims.play('walk', true)
    else this.player.anims.stop()
    if (this.hurtTimer <= 0) {
      const texture = !grounded ? 'pelican-jump' : direction ? this.player.texture.key : 'pelican-idle'
      if (!direction || !grounded) this.player.setTexture(texture)
    }
    this.player.setAlpha(this.invulnerable > 0 && Math.floor(this.invulnerable * 16) % 2 === 0 ? 0.35 : 1)
    if (this.player.y - 34 > WORLD_H) this.fell()
    this.updateHUD()
  }

  private collectParcel(p: Phaser.Types.Physics.Arcade.ImageWithStaticBody) {
    if (this.mode !== 'running' || p.getData('collected')) return
    p.setData('collected', true)
    this.collected++
    ;(p.getData('shadow') as Phaser.GameObjects.Image)?.destroy()
    const x = p.x, y = p.y
    p.destroy()
    this.sfx.play('collect')
    this.burst(x, y, 0xffd465, 12)
    this.cameras.main.flash(90, 255, 233, 158, false)
    this.showToast(this.collected === 3 ? '快递集齐！前往最右侧邮局 →' : `已收好 ${this.collected} / 3 份快递`, '#fff0ae')
    if (this.exitLabel) this.exitLabel.setText(this.collected === 3 ? '可以投递！' : '集齐 3 份后投递')
    this.updateHUD()
  }

  private hurt(reason: string) {
    if (this.mode !== 'running' || this.invulnerable > 0) return
    this.lives--
    this.invulnerable = 0.8
    this.hurtTimer = 0.28
    this.endReason = reason
    this.player.setTexture('pelican-hurt').setVelocityY(-310)
    this.player.setVelocityX(this.player.flipX ? 190 : -190)
    this.sfx.play('hurt')
    this.cameras.main.shake(130, 0.008)
    this.burst(this.player.x, this.player.y, 0xef6a5b, 8)
    this.showToast(`小心！还剩 ${Math.max(0, this.lives)} 点生命 · 0.8 秒无敌`, '#ffd9d2')
    if (this.lives <= 0) this.finish(false, `${reason}，生命已耗尽。`)
    this.updateHUD()
  }

  private fell() {
    if (this.mode !== 'running') return
    this.lives--
    this.sfx.play('hurt')
    this.cameras.main.shake(180, 0.008)
    if (this.lives <= 0) { this.finish(false, '跌出了海岸航线，生命已耗尽。'); return }
    this.player.setPosition(START.x, START.y - 32).setVelocity(0, 0).setTexture('pelican-idle')
    this.invulnerable = 0.8
    this.cameras.main.centerOn(START.x, START.y - 180)
    this.showToast(`掉落！保留 ${this.collected} 份快递与剩余时间`, '#ffd9d2')
    this.updateHUD()
  }

  private tryExit() {
    if (this.mode !== 'running') return
    if (this.collected === 3) {
      this.finish(true, `三份快递全部送达！剩余 ${Math.ceil(this.timeLeft)} 秒，生命 ${this.lives} / 3。`)
    } else if (this.toastCooldown <= 0) {
      this.toastCooldown = 1.2
      this.showToast(`邮局暂不签收：还差 ${3 - this.collected} 份快递`, '#fff0ae')
    }
  }

  private finish(won: boolean, reason: string) {
    if (this.mode !== 'running') return
    this.mode = won ? 'won' : 'lost'
    this.endReason = reason
    this.clearTouch()
    this.player.setVelocity(0, 0)
    this.physics.world.pause()
    this.tweens.pauseAll()
    if (won) { this.sfx.play('win'); this.burst(this.player.x, this.player.y - 50, 0xffd465, 28) }
    this.showEnd(won)
  }

  private burst(x: number, y: number, color: number, count: number) {
    for (let i = 0; i < count; i++) {
      const p = this.add.image(x, y, 'particle').setTint(color).setDepth(20).setScale(0.7 + Math.random())
      const angle = Math.PI * 2 * i / count
      this.tweens.add({ targets: p, x: x + Math.cos(angle) * (45 + Math.random() * 55), y: y + Math.sin(angle) * (35 + Math.random() * 50) + 35, alpha: 0, scale: 0.1, duration: 430 + Math.random() * 220, onComplete: () => p.destroy() })
    }
  }

  private buildHUD() {
    this.hudRoot?.destroy(true)
    this.lifeIcons = []
    const w = this.scale.width
    const compact = w < 650
    const root = this.add.container(0, 0).setScrollFactor(0).setDepth(1000)
    this.hudRoot = root
    const bg = this.add.graphics()
    bg.fillStyle(0x17324a, 0.93).fillRoundedRect(14, 14, compact ? w - 28 : 520, compact ? 58 : 62, 18)
    bg.lineStyle(2, 0xffffff, 0.15).strokeRoundedRect(14, 14, compact ? w - 28 : 520, compact ? 58 : 62, 18)
    root.add(bg)
    root.add(this.add.text(30, compact ? 27 : 29, 'PELICAN POST', { fontFamily: 'sans-serif', fontSize: compact ? '12px' : '14px', fontStyle: 'bold', color: '#9be4d7' }))
    for (let i = 0; i < 3; i++) {
      const heart = this.add.image((compact ? 32 : 36) + i * 28, compact ? 54 : 57, 'heart').setDisplaySize(22, 22).setOrigin(0.5)
      this.lifeIcons.push(heart)
      root.add(heart)
    }
    this.hudParcel = this.add.text(compact ? 135 : 145, compact ? 44 : 45, '▣  0 / 3', { fontFamily: 'sans-serif', fontSize: compact ? '17px' : '20px', fontStyle: 'bold', color: '#ffe5a1' }).setOrigin(0, 0.5)
    this.hudTime = this.add.text(compact ? w - 78 : 280, compact ? 44 : 45, '02:00', { fontFamily: 'monospace', fontSize: compact ? '21px' : '25px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(compact ? 1 : 0, 0.5)
    root.add([this.hudParcel, this.hudTime])
    const pause = this.add.container(compact ? w - 42 : 380, compact ? 44 : 45)
    const pauseBg = this.add.circle(0, 0, 19, 0xffffff, 0.12)
    const icon = this.add.image(0, 0, 'pause').setDisplaySize(22, 22)
    const zone = this.add.zone(0, 0, 46, 46).setInteractive(new Phaser.Geom.Rectangle(-23, -23, 46, 46), Phaser.Geom.Rectangle.Contains)
    zone.input!.cursor = 'pointer'
    zone.setScrollFactor(0)
    zone.on('pointerdown', () => { if (this.mode === 'running') this.togglePause() })
    pause.add([pauseBg, icon, zone])
    root.add(pause)
    if (!compact) root.add(this.add.text(w / 2, 34, '← → / A D 移动    SPACE 跳跃    P 暂停', { fontFamily: 'sans-serif', fontSize: '16px', color: COLORS.ink, backgroundColor: '#ffffffaa', padding: { x: 16, y: 9 } }).setOrigin(0.5, 0))
    this.updateHUD()
  }

  private updateHUD() {
    this.lifeIcons.forEach((h, i) => h.setAlpha(i < this.lives ? 1 : 0.2))
    this.hudParcel?.setText(`▣  ${this.collected} / 3`)
    const seconds = Math.ceil(this.timeLeft)
    this.hudTime?.setText(`${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`)
    this.hudTime?.setColor(seconds <= 15 ? '#ff9b8e' : '#ffffff')
  }

  private buildTouchControls() {
    this.touchRoot?.destroy(true)
    this.touchRoot = undefined
    if (this.scale.width >= 760 || this.mode !== 'running') return
    const w = this.scale.width, h = this.scale.height
    const root = this.add.container(0, 0).setScrollFactor(0).setDepth(1100)
    this.touchRoot = root
    const make = (x: number, label: string, key: 'left' | 'right' | 'jump') => {
      const c = this.add.container(x, h - 72)
      const circle = this.add.circle(0, 0, key === 'jump' ? 46 : 42, key === 'jump' ? 0xf5a524 : 0x17324a, 0.86)
      circle.setStrokeStyle(3, 0xffffff, 0.6)
      const text = this.add.text(0, 0, label, { fontFamily: 'sans-serif', fontSize: key === 'jump' ? '18px' : '34px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5)
      const zone = this.add.zone(0, 0, 104, 104).setInteractive(new Phaser.Geom.Rectangle(-52, -52, 104, 104), Phaser.Geom.Rectangle.Contains).setScrollFactor(0)
      zone.on('pointerdown', () => {
        circle.setFillStyle(key === 'jump' ? 0xffc34d : 0x1c9a96, 0.95)
        if (key === 'jump') this.touchJumpQueued = true
        else this.touch[key] = true
      })
      const release = () => {
        circle.setFillStyle(key === 'jump' ? 0xf5a524 : 0x17324a, 0.86)
        if (key !== 'jump') this.touch[key] = false
      }
      zone.on('pointerup', release).on('pointerout', release).on('pointerupoutside', release)
      c.add([circle, text, zone])
      root.add(c)
    }
    make(62, '‹', 'left')
    make(166, '›', 'right')
    make(w - 66, '跳跃', 'jump')
  }

  private clearTouch() {
    this.touch.left = false
    this.touch.right = false
    this.touchJumpQueued = false
  }

  private overlayBase(alpha = 0.56) {
    this.overlayRoot?.destroy(true)
    const w = this.scale.width, h = this.scale.height
    const root = this.add.container(0, 0).setScrollFactor(0).setDepth(1500)
    this.overlayRoot = root
    root.add(this.add.rectangle(w / 2, h / 2, w, h, 0x102d40, alpha))
    return root
  }

  private addButton(root: Phaser.GameObjects.Container, x: number, y: number, width: number, label: string, action: () => void, primary = true) {
    const c = this.add.container(x, y)
    const g = this.add.graphics()
    g.fillStyle(primary ? 0xf5a524 : 0xffffff, primary ? 1 : 0.12).fillRoundedRect(-width / 2, -25, width, 50, 15)
    g.lineStyle(2, primary ? 0xffd977 : 0xffffff, primary ? 1 : 0.35).strokeRoundedRect(-width / 2, -25, width, 50, 15)
    const text = this.add.text(0, 0, label, { fontFamily: 'sans-serif', fontSize: '19px', fontStyle: 'bold', color: primary ? COLORS.ink : '#ffffff' }).setOrigin(0.5)
    const zone = this.add.zone(0, 0, width + 12, 62).setInteractive(new Phaser.Geom.Rectangle(-(width + 12) / 2, -31, width + 12, 62), Phaser.Geom.Rectangle.Contains)
    zone.input!.cursor = 'pointer'
    zone.setScrollFactor(0)
    zone.on('pointerdown', () => { this.sfx.unlock(); action() })
    zone.on('pointerover', () => c.setScale(1.035)).on('pointerout', () => c.setScale(1))
    c.add([g, text, zone])
    root.add(c)
  }

  private showTitle() {
    const w = this.scale.width, h = this.scale.height, compact = w < 650
    const root = this.overlayBase(0.28)
    const panelW = Math.min(w - 32, compact ? 410 : 920)
    const panelH = compact ? Math.min(610, h - 130) : 590
    const cy = h / 2 - (compact ? 12 : 8)
    const g = this.add.graphics()
    g.fillStyle(0x17324a, 0.95).fillRoundedRect(w / 2 - panelW / 2, cy - panelH / 2, panelW, panelH, 30)
    g.lineStyle(3, 0xffffff, 0.16).strokeRoundedRect(w / 2 - panelW / 2, cy - panelH / 2, panelW, panelH, 30)
    g.fillStyle(0xf5a524).fillRoundedRect(w / 2 - panelW / 2, cy - panelH / 2, 10, panelH, 5)
    root.add(g)
    const top = cy - panelH / 2
    root.add(this.add.text(w / 2, top + 45, '晴空海岸 · 特快航线 07', { fontFamily: 'sans-serif', fontSize: compact ? '14px' : '17px', fontStyle: 'bold', color: '#9be4d7' }).setOrigin(0.5))
    root.add(this.add.text(w / 2, top + (compact ? 105 : 112), '鹈鹕快递大作战', { fontFamily: 'sans-serif', fontSize: compact ? '37px' : '58px', fontStyle: 'bold', color: '#fffaf0', stroke: '#17324a', strokeThickness: 2 }).setOrigin(0.5))
    root.add(this.add.text(w / 2, top + (compact ? 150 : 163), '穿过海风与巡游机器人，把每一份期待准时送达。', { fontFamily: 'sans-serif', fontSize: compact ? '14px' : '18px', color: '#cfe4e8', align: 'center', wordWrap: { width: panelW - 55 } }).setOrigin(0.5))
    const mascot = this.add.image(w / 2, top + (compact ? 225 : 256), 'pelican-idle').setScale(compact ? 1.25 : 1.65)
    root.add(mascot)
    this.tweens.add({ targets: mascot, y: mascot.y - 7, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.InOut' })
    root.add(this.add.text(w / 2, top + (compact ? 292 : 334), '收集 3 份快递  →  抵达最右侧邮局', { fontFamily: 'sans-serif', fontSize: compact ? '18px' : '23px', fontStyle: 'bold', color: '#ffe38a' }).setOrigin(0.5))
    root.add(this.add.text(w / 2, top + (compact ? 334 : 382), compact ? '方向按钮移动 · 跳跃键起跳\n120 秒 · 3 点生命 · 不可空中连跳' : '← → / A D 移动     SPACE 跳跃     P 暂停\n120 秒 · 3 点生命 · 受伤后 0.8 秒无敌', { fontFamily: 'sans-serif', fontSize: compact ? '15px' : '17px', color: '#d8e8eb', align: 'center', lineSpacing: 9 }).setOrigin(0.5))
    this.addButton(root, w / 2, top + (compact ? 407 : 466), compact ? 230 : 270, '接单出发  →', () => this.startGame())
    root.add(this.add.text(w / 2, top + (compact ? 458 : 522), '小提示：移动平台会载你往返，不必抢跳。', { fontFamily: 'sans-serif', fontSize: compact ? '13px' : '15px', color: '#92b7c2' }).setOrigin(0.5))
  }

  private showPause() {
    const w = this.scale.width, h = this.scale.height
    const root = this.overlayBase(0.68)
    root.add(this.add.text(w / 2, h / 2 - 120, '航线暂停', { fontFamily: 'sans-serif', fontSize: '46px', fontStyle: 'bold', color: '#fffaf0' }).setOrigin(0.5))
    root.add(this.add.text(w / 2, h / 2 - 60, '倒计时、巡逻与平台都已冻结', { fontFamily: 'sans-serif', fontSize: '18px', color: '#bcd9df' }).setOrigin(0.5))
    this.addButton(root, w / 2, h / 2 + 20, 250, '继续配送', () => this.togglePause())
    this.addButton(root, w / 2, h / 2 + 88, 250, '重新开始', () => this.restart(), false)
    this.buildTouchControls()
  }

  private showEnd(won: boolean) {
    const w = this.scale.width, h = this.scale.height, compact = w < 650
    const root = this.overlayBase(0.68)
    root.add(this.add.text(w / 2, h / 2 - 150, won ? '准时签收！' : '本次配送中止', { fontFamily: 'sans-serif', fontSize: compact ? '42px' : '54px', fontStyle: 'bold', color: won ? '#ffe08a' : '#ffb0a3' }).setOrigin(0.5))
    root.add(this.add.text(w / 2, h / 2 - 78, won ? '✓  今日特快已完成' : '再整理一下翅膀，下一班马上出发', { fontFamily: 'sans-serif', fontSize: '19px', color: '#a9ded4' }).setOrigin(0.5))
    root.add(this.add.text(w / 2, h / 2 - 15, this.endReason, { fontFamily: 'sans-serif', fontSize: compact ? '16px' : '19px', color: '#ffffff', align: 'center', wordWrap: { width: Math.min(560, w - 45) } }).setOrigin(0.5))
    root.add(this.add.text(w / 2, h / 2 + 48, `快递 ${this.collected} / 3     生命 ${this.lives} / 3     剩余 ${Math.ceil(this.timeLeft)} 秒`, { fontFamily: 'sans-serif', fontSize: compact ? '16px' : '20px', fontStyle: 'bold', color: '#ffe5a1' }).setOrigin(0.5))
    this.addButton(root, w / 2, h / 2 + 125, 260, '再送一班  →', () => this.restart())
    this.buildTouchControls()
  }

  private showToast(message: string, color: string) {
    this.toast?.destroy(true)
    const w = this.scale.width
    const root = this.add.container(w / 2, this.scale.width < 650 ? 94 : 105).setScrollFactor(0).setDepth(1300)
    const text = this.add.text(0, 0, message, { fontFamily: 'sans-serif', fontSize: this.scale.width < 650 ? '14px' : '17px', fontStyle: 'bold', color: COLORS.ink, backgroundColor: color, padding: { x: 16, y: 10 }, align: 'center', wordWrap: { width: w - 36 } }).setOrigin(0.5)
    root.add(text)
    root.setAlpha(0).setY(root.y - 8)
    this.tweens.add({ targets: root, alpha: 1, y: root.y + 8, duration: 150, hold: 1900, yoyo: true, onComplete: () => { if (root.active) root.destroy(true) } })
    this.toast = root
  }

  private onResize(gameSize: Phaser.Structs.Size) {
    const w = gameSize.width, h = gameSize.height
    this.sky?.setSize(w, h)
    this.sea?.setPosition(0, h * 0.64).setSize(w, h * 0.36)
    this.buildHUD()
    this.buildTouchControls()
    if (this.mode === 'title') this.showTitle()
    else if (this.mode === 'paused') this.showPause()
    else if (this.mode === 'won') this.showEnd(true)
    else if (this.mode === 'lost') this.showEnd(false)
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#bfe9ed',
  physics: { default: 'arcade', arcade: { gravity: { y: GRAVITY, x: 0 }, debug: false, fps: 60 } },
  scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { activePointers: 3 },
  render: { antialias: true, pixelArt: false, roundPixels: false },
  scene: [PelicanScene],
})
