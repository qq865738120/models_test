import Phaser from 'phaser'
import {
  JUMP_BUFFER_SECONDS, JUMP_VELOCITY, INVULN_SECONDS, MOVE_SPEED,
  ROUND_SECONDS, START_LIVES, WORLD_W, WORLD_H, GROUND_Y, FONT, C,
  type GameState, type HudData,
} from './constants'
import { bus, EV } from './bus'
import { computeLayout, type Layout } from './layout'

interface GroundSpec { x: number; w: number }
interface PlatformSpec { x: number; y: number; w: number }
interface MovingSpec { x: number; y: number; w: number; axis: 'h' | 'v'; range: number; period: number; phase: number }
interface BotSpec { x: number; y: number; minX: number; maxX: number; speed: number }
interface ParcelSpec { x: number; y: number; id: number }

const GROUNDS: GroundSpec[] = [
  { x: 0, w: 560 },
  { x: 700, w: 540 },
  { x: 1380, w: 600 },
  { x: 2120, w: 620 },
  { x: 2880, w: 720 },
]
const PLATFORMS: PlatformSpec[] = [
  { x: 300, y: 480, w: 170 },
  { x: 780, y: 540, w: 200 },
  { x: 1040, y: 400, w: 140 },
  { x: 1500, y: 560, w: 200 },
  { x: 1760, y: 440, w: 180 },
  { x: 2000, y: 520, w: 160 },
  { x: 2220, y: 540, w: 160 },
  { x: 2660, y: 560, w: 120 },
  { x: 2820, y: 480, w: 180 },
  { x: 3060, y: 540, w: 160 },
  { x: 3280, y: 460, w: 150 },
]
const MOVING: MovingSpec[] = [
  { x: 1150, y: 500, w: 160, axis: 'h', range: 170, period: 5.4, phase: 0 },
  { x: 2520, y: 520, w: 150, axis: 'v', range: -160, period: 6.2, phase: 1.7 },
]
const PARCELS: ParcelSpec[] = [
  { x: 880, y: 540, id: 1 },
  { x: 1850, y: 440, id: 2 },
  { x: 2910, y: 480, id: 3 },
]
const BOTS: BotSpec[] = [
  { x: 900, y: GROUND_Y, minX: 745, maxX: 1210, speed: 72 },
  { x: 1090, y: 400, minX: 1048, maxX: 1172, speed: 44 },
  { x: 2340, y: GROUND_Y, minX: 2140, maxX: 2695, speed: 104 },
  { x: 3040, y: GROUND_Y, minX: 2905, maxX: 3418, speed: 86 },
]
const HAZARDS = [
  { x: 1010, y: GROUND_Y, w: 64 },
  { x: 2480, y: GROUND_Y, w: 80 },
]
const EXIT_X = 3480
const SPAWN = { x: 140, y: GROUND_Y }

interface Bot {
  sprite: Phaser.Physics.Arcade.Sprite
  minX: number
  maxX: number
  speed: number
  dir: number
  baseY: number
}
interface Parcel {
  container: Phaser.GameObjects.Container
  x: number
  y: number
  id: number
  taken: boolean
  bobSeed: number
}
interface MovingPlat {
  sprite: Phaser.GameObjects.TileSprite
  body: Phaser.Physics.Arcade.Body
  glow: Phaser.GameObjects.Image
  x0: number
  y0: number
  w: number
  axis: 'h' | 'v'
  range: number
  period: number
  phase: number
}

export default class GameScene extends Phaser.Scene {
  private layout!: Layout
  private camX = 0

  private player!: Phaser.Physics.Arcade.Sprite
  private shadow!: Phaser.GameObjects.Ellipse
  private bots: Bot[] = []
  private botBodies: Phaser.Physics.Arcade.Sprite[] = []
  private parcels: Parcel[] = []
  private hazardImages: Phaser.Physics.Arcade.Image[] = []
  private moving: MovingPlat[] = []
  private solids: Phaser.GameObjects.Rectangle[] = []
  private movingSprites: Phaser.GameObjects.TileSprite[] = []
  private exitZone!: Phaser.GameObjects.Container
  private exitDoor!: Phaser.GameObjects.Graphics
  private exitLock!: Phaser.GameObjects.Container
  private exitGlow!: Phaser.GameObjects.Image
  private exitSign!: Phaser.GameObjects.Text

  private keyLeft!: Phaser.Input.Keyboard.Key
  private keyRight!: Phaser.Input.Keyboard.Key
  private keyA!: Phaser.Input.Keyboard.Key
  private keyD!: Phaser.Input.Keyboard.Key
  private keyJump!: Phaser.Input.Keyboard.Key

  private touchLeft = false
  private touchRight = false
  private jumpBufferUntil = 0
  private jumpCount = 0
  private lastJumpX = 0
  private wasOnGround = true
  private walkDustAt = 0
  private lastHazardHint = -10

  private state: GameState = 'ready'
  private lives = START_LIVES
  private parcelCount = 0
  private playTime = 0
  private invulnUntil = 0
  private hurtUntil = 0
  private lastDamage: 'robot' | 'hazard' | 'fall' = 'robot'
  private finishReason = ''
  private elapsedAtFinish = 0
  private lastHudKey = ''
  private won = false
  private worldPaused = false
  private waveLayer?: Phaser.GameObjects.TileSprite
  private cloudDrift: Phaser.GameObjects.Image[] = []

  private dustEmitter!: Phaser.GameObjects.Particles.ParticleEmitter
  private sparkEmitter!: Phaser.GameObjects.Particles.ParticleEmitter
  private hitEmitter!: Phaser.GameObjects.Particles.ParticleEmitter
  private confettiEmitter!: Phaser.GameObjects.Particles.ParticleEmitter

  constructor() { super('game') }

  preload() {
    const base = 'materials/sprites/'
    const images = [
      'pelican-idle', 'pelican-jump', 'pelican-hurt', 'pelican-walk-0', 'pelican-walk-1',
      'pelican-walk-2', 'pelican-walk-3', 'robot', 'parcel', 'platform', 'hazard', 'heart', 'pause',
    ]
    images.forEach((k) => this.load.image(k, base + k + '.svg'))
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.warn('[pelican] asset failed', file.key)
    })
  }

  create() {
    this.makeArtTextures()
    this.makeEmitterTextures()
    this.makeAnimations()
    this.buildBackground()
    this.buildLevel()
    this.buildPlayer()
    this.buildBots()
    this.buildParcels()
    this.buildExit()
    this.buildColliders()
    this.buildEffects()
    this.bindInput()
    this.bindBus()
    this.bindResize()
    this.applyLayout()
    this.resetRun('ready', true)
    this.scene.launch('ui')
    this.time.delayedCall(60, () => this.emitHud(true))
    ;(window as unknown as Record<string, unknown>).__pelican = {
      snapshot: () => this.snapshot(),
      level: () => ({ exitX: EXIT_X, parcels: PARCELS.map((p) => ({ ...p })) }),
    }
  }

  // ---------------------------------------------------------------- art
  private makeArtTextures() {
    this.makeSkyTexture()
    this.makeCloudTexture()
    this.makeSunTexture()
    this.makeHillTexture()
    this.makeSeaTexture()
    this.makeWaveTexture()
    this.makeGroundTexture()
    this.makeBushTexture()
    this.makeCrateTexture()
    this.makeCraneTexture()
    this.makeBoatTexture()
    this.makeGlowTexture()
  }

  private canvasTexture(key: string, w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
    if (this.textures.exists(key)) return
    const tex = this.textures.createCanvas(key, w, h)
    if (!tex) return
    const ctx = tex.getContext()
    draw(ctx)
    tex.refresh()
  }

  private makeSkyTexture() {
    this.canvasTexture('skyTex', 512, 720, (ctx) => {
      const g = ctx.createLinearGradient(0, 0, 0, 720)
      g.addColorStop(0, '#4fa9cf')
      g.addColorStop(0.34, '#8fd3e8')
      g.addColorStop(0.62, '#c9ebee')
      g.addColorStop(0.82, '#ffeacb')
      g.addColorStop(1, '#ffd9ae')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 512, 720)
      const rg = ctx.createRadialGradient(390, 170, 10, 390, 170, 300)
      rg.addColorStop(0, 'rgba(255,248,214,0.95)')
      rg.addColorStop(0.35, 'rgba(255,238,190,0.35)')
      rg.addColorStop(1, 'rgba(255,238,190,0)')
      ctx.fillStyle = rg
      ctx.fillRect(0, 0, 512, 720)
      ctx.globalAlpha = 0.08
      ctx.fillStyle = '#ffffff'
      for (let i = 0; i < 30; i++) {
        const x = (i * 97 + 31) % 512
        const y = (i * 53 + 70) % 420
        ctx.fillRect(x, y, 2 + (i % 3), 2)
      }
      ctx.globalAlpha = 1
    })
  }

  private makeCloudTexture() {
    this.canvasTexture('cloudTex', 320, 150, (ctx) => {
      const puffs: Array<[number, number, number, number]> = [
        [84, 96, 54, 34], [140, 78, 66, 44], [204, 96, 52, 32], [248, 108, 34, 24], [46, 110, 36, 24],
      ]
      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      puffs.forEach(([x, y, rx, ry]) => {
        ctx.beginPath()
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.fillStyle = 'rgba(219,242,247,0.9)'
      ctx.beginPath()
      ctx.ellipse(150, 116, 96, 20, 0, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  private makeSunTexture() {
    this.canvasTexture('sunTex', 320, 320, (ctx) => {
      const g = ctx.createRadialGradient(160, 160, 8, 160, 160, 158)
      g.addColorStop(0, 'rgba(255,252,226,1)')
      g.addColorStop(0.22, 'rgba(255,240,174,0.95)')
      g.addColorStop(0.45, 'rgba(255,214,120,0.38)')
      g.addColorStop(1, 'rgba(255,208,110,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 320, 320)
    })
  }

  private makeHillTexture() {
    this.canvasTexture('farHillTex', 1600, 360, (ctx) => {
      ctx.fillStyle = 'rgba(102,173,184,0.55)'
      ctx.beginPath()
      ctx.moveTo(0, 360)
      ctx.lineTo(0, 240)
      const points = [[160, 190], [340, 250], [520, 160], [760, 250], [980, 150], [1220, 230], [1420, 180], [1600, 250]]
      points.forEach(([x, y]) => { ctx.quadraticCurveTo(x - 60, y - 30, x, y) })
      ctx.lineTo(1600, 360)
      ctx.closePath()
      ctx.fill()
    })
    this.canvasTexture('nearHillTex', 1600, 380, (ctx) => {
      const g = ctx.createLinearGradient(0, 120, 0, 380)
      g.addColorStop(0, 'rgba(47,119,133,0.88)')
      g.addColorStop(1, 'rgba(24,78,94,0.95)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.moveTo(0, 380)
      ctx.lineTo(0, 280)
      const points = [[220, 230], [480, 300], [720, 210], [980, 290], [1240, 240], [1460, 300], [1600, 270]]
      points.forEach(([x, y]) => { ctx.quadraticCurveTo(x - 90, y - 40, x, y) })
      ctx.lineTo(1600, 380)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgba(255,230,180,0.18)'
      for (let i = 0; i < 14; i++) {
        const x = 80 + i * 108
        ctx.fillRect(x, 300 + (i % 4) * 8, 5, 5)
      }
    })
  }

  private makeSeaTexture() {
    this.canvasTexture('seaTex', 512, 260, (ctx) => {
      const g = ctx.createLinearGradient(0, 0, 0, 260)
      g.addColorStop(0, '#4eaebb')
      g.addColorStop(0.35, '#2f8fa1')
      g.addColorStop(1, '#145266')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 512, 260)
      ctx.strokeStyle = 'rgba(210,245,245,0.28)'
      ctx.lineWidth = 2
      for (let i = 0; i < 16; i++) {
        const y = 26 + i * 15
        ctx.beginPath()
        for (let x = 0; x <= 512; x += 32) {
          ctx.lineTo(x, y + Math.sin((x + i * 30) * 0.05) * 3)
        }
        ctx.stroke()
      }
    })
  }

  private makeWaveTexture() {
    this.canvasTexture('waveTex', 256, 48, (ctx) => {
      ctx.strokeStyle = 'rgba(228,255,250,0.7)'
      ctx.lineWidth = 3
      for (let k = 0; k < 3; k++) {
        ctx.beginPath()
        for (let x = 0; x <= 256; x += 8) {
          ctx.lineTo(x, 12 + k * 12 + Math.sin((x + k * 20) * 0.09) * 4)
        }
        ctx.stroke()
      }
    })
  }

  private makeGroundTexture() {
    this.canvasTexture('groundTex', 128, 128, (ctx) => {
      const g = ctx.createLinearGradient(0, 0, 0, 128)
      g.addColorStop(0, '#385d70')
      g.addColorStop(0.3, '#2b4d61')
      g.addColorStop(1, '#172f40')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 128, 128)
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      for (let i = 0; i < 26; i++) {
        const x = (i * 37 + 11) % 128
        const y = (i * 61 + 19) % 128
        ctx.beginPath()
        ctx.arc(x, y, 1 + (i % 3), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = 'rgba(9,26,39,0.35)'
      for (let i = 0; i < 7; i++) {
        const x = (i * 53 + 7) % 128
        const y = (i * 29 + 64) % 128
        ctx.beginPath()
        ctx.ellipse(x, y, 8 + (i % 3) * 3, 4, 0.4, 0, Math.PI * 2)
        ctx.fill()
      }
    })
  }

  private makeBushTexture() {
    this.canvasTexture('bushTex', 120, 70, (ctx) => {
      const blobs: Array<[number, number, number]> = [[34, 48, 26], [62, 36, 30], [92, 50, 22]]
      blobs.forEach(([x, y, r]) => {
        const g = ctx.createRadialGradient(x - 6, y - 8, 4, x, y, r)
        g.addColorStop(0, '#63c68b')
        g.addColorStop(1, '#2c8a67')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ;[[48, 30], [78, 42], [34, 52]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
      })
    })
  }

  private makeCrateTexture() {
    this.canvasTexture('crateTex', 64, 64, (ctx) => {
      ctx.fillStyle = '#b98247'
      ctx.fillRect(2, 6, 60, 56)
      ctx.strokeStyle = '#744a26'
      ctx.lineWidth = 4
      ctx.strokeRect(4, 8, 56, 52)
      ctx.beginPath(); ctx.moveTo(6, 10); ctx.lineTo(58, 58); ctx.moveTo(58, 10); ctx.lineTo(6, 58); ctx.stroke()
      ctx.fillStyle = 'rgba(255,232,180,0.5)'
      ctx.fillRect(10, 12, 44, 5)
    })
  }

  private makeCraneTexture() {
    this.canvasTexture('craneTex', 360, 220, (ctx) => {
      ctx.strokeStyle = 'rgba(19,56,72,0.9)'
      ctx.fillStyle = 'rgba(19,56,72,0.9)'
      ctx.lineWidth = 8
      ctx.beginPath(); ctx.moveTo(70, 220); ctx.lineTo(70, 62); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(70, 70); ctx.lineTo(250, 70); ctx.lineTo(250, 40); ctx.stroke()
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(70, 70); ctx.lineTo(30, 220); ctx.moveTo(70, 70); ctx.lineTo(110, 220); ctx.stroke()
      ctx.fillRect(232, 70, 4, 52)
      ctx.fillRect(220, 118, 30, 22)
      ctx.fillRect(60, 120, 60, 44)
    })
  }

  private makeBoatTexture() {
    this.canvasTexture('boatTex', 120, 90, (ctx) => {
      ctx.fillStyle = '#8b4a32'
      ctx.beginPath(); ctx.moveTo(10, 68); ctx.lineTo(104, 68); ctx.lineTo(88, 84); ctx.lineTo(24, 84); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#f4ead3'
      ctx.beginPath(); ctx.moveTo(56, 8); ctx.lineTo(94, 64); ctx.lineTo(56, 64); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#d7c8aa'
      ctx.beginPath(); ctx.moveTo(52, 18); ctx.lineTo(24, 64); ctx.lineTo(52, 64); ctx.closePath(); ctx.fill()
    })
  }

  private makeGlowTexture() {
    this.canvasTexture('glowTex', 160, 160, (ctx) => {
      const g = ctx.createRadialGradient(80, 80, 2, 80, 80, 78)
      g.addColorStop(0, 'rgba(255,246,200,1)')
      g.addColorStop(0.3, 'rgba(255,216,112,0.6)')
      g.addColorStop(1, 'rgba(255,200,80,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 160, 160)
    })
  }

  private makeEmitterTextures() {
    this.canvasTexture('sparkTex', 16, 16, (ctx) => {
      ctx.fillStyle = '#fff3c4'
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2
        const r = i % 2 === 0 ? 7 : 2.6
        ctx.lineTo(8 + Math.cos(a) * r, 8 + Math.sin(a) * r)
      }
      ctx.closePath(); ctx.fill()
    })
    this.canvasTexture('dustTex', 20, 20, (ctx) => {
      const g = ctx.createRadialGradient(10, 10, 1, 10, 10, 9)
      g.addColorStop(0, 'rgba(255,238,205,0.95)')
      g.addColorStop(1, 'rgba(255,238,205,0)')
      ctx.fillStyle = g; ctx.fillRect(0, 0, 20, 20)
    })
    this.canvasTexture('confettiTex', 12, 12, (ctx) => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(2, 3, 8, 6)
    })
  }

  private makeAnimations() {
    if (!this.anims.exists('pelican-walk')) {
      this.anims.create({
        key: 'pelican-walk',
        frames: [0, 1, 2, 3].map((i) => ({ key: 'pelican-walk-' + i })),
        frameRate: 8,
        repeat: -1,
      })
    }
    if (!this.anims.exists('pelican-idle')) {
      this.anims.create({ key: 'pelican-idle', frames: [{ key: 'pelican-idle' }], frameRate: 1, repeat: -1 })
    }
  }

  // ---------------------------------------------------------------- scenery
  private buildBackground() {
    this.add.image(-420, -180, 'skyTex').setOrigin(0, 0).setDisplaySize(4700, 910).setScrollFactor(0.02).setDepth(-100)
    this.add.image(860, 120, 'sunTex').setScrollFactor(0.04).setDepth(-99).setScale(0.95).setAlpha(0.95)
    const farHills = this.add.image(-900, 250, 'farHillTex').setOrigin(0, 0).setScrollFactor(0.2).setDepth(-80)
    farHills.setDisplaySize(5400, 420)
    const nearHills = this.add.image(-1100, 320, 'nearHillTex').setOrigin(0, 0).setScrollFactor(0.32).setDepth(-70)
    nearHills.setDisplaySize(5600, 460)

    const cloudData = [
      [-120, 96, 0.62, 0.16], [270, 180, 0.9, 0.24], [700, 84, 0.5, 0.13], [1080, 200, 1.05, 0.28],
      [1480, 120, 0.7, 0.2], [1890, 210, 0.86, 0.24], [2280, 100, 0.56, 0.15], [2620, 190, 1.0, 0.26],
      [3020, 110, 0.65, 0.18], [3390, 200, 0.82, 0.24], [3800, 130, 0.6, 0.16],
    ]
    cloudData.forEach(([x, y, s, f], i) => {
      const img = this.add.image(x, y, 'cloudTex').setScrollFactor(f).setDepth(-90).setScale(s).setAlpha(0.72 + (i % 3) * 0.07)
      this.cloudDrift.push(img)
    })
    for (let i = 0; i < 5; i++) {
      const x = 420 + i * 620
      const cr = this.add.image(x, 300 + (i % 2) * 24, 'craneTex').setOrigin(0.5, 1).setScrollFactor(0.48).setDepth(-52).setAlpha(0.55)
      cr.setDisplaySize(300, 184)
    }

    this.add.tileSprite(-400, 468, 4500, 252, 'seaTex').setOrigin(0, 0).setScrollFactor(0.4).setDepth(-58)
    this.waveLayer = this.add.tileSprite(-400, 520, 4500, 90, 'waveTex').setOrigin(0, 0).setScrollFactor(0.46).setDepth(-56).setAlpha(0.5)
    ;[[220, 560, 0.45], [1280, 545, 0.4], [2380, 566, 0.47], [3180, 552, 0.42]].forEach(([x, y, a], i) => {
      this.add.image(x, y, 'boatTex').setScrollFactor(0.43).setDepth(-54).setScale(0.62 + (i % 2) * 0.12).setAlpha(a as number)
    })

    // distant docks and bunting hint at a harbour
    const g = this.add.graphics().setDepth(-48).setScrollFactor(0.52)
    g.fillStyle(0x124152, 0.5)
    g.fillRect(0, 584, 4200, 26)
    for (let i = 0; i < 26; i++) {
      g.fillRect(i * 168 + 24, 566, 7, 60)
    }
  }

  private buildLevel() {
    // Ground masses
    GROUNDS.forEach((gd) => {
      const body = this.add.rectangle(gd.x + gd.w / 2, GROUND_Y + 70, gd.w, 140, 0x000000, 0)
      this.physics.add.existing(body, true)
      body.setVisible(false)
      this.solids.push(body)
      const fill = this.add.tileSprite(gd.x + 2, GROUND_Y + 8, gd.w - 4, 132, 'groundTex').setOrigin(0, 0).setDepth(-5)
      fill.setTileScale(1, 1)
      this.add.tileSprite(gd.x, GROUND_Y, gd.w, 26, 'platform').setOrigin(0, 0).setDepth(1)
      const edge = this.add.graphics().setDepth(2)
      edge.fillStyle(0xffe0a1, 0.32)
      edge.fillRect(gd.x, GROUND_Y, gd.w, 3)
      edge.fillStyle(0x0b2331, 0.55)
      edge.fillRect(gd.x + 4, GROUND_Y + 26, gd.w - 8, 5)
      edge.lineStyle(2, 0x8ac6d8, 0.28)
      edge.strokeRect(gd.x + 2, GROUND_Y + 2, gd.w - 4, 130)
      edge.lineStyle(1, 0x76a9bd, 0.14)
      for (let x = gd.x + 40; x < gd.x + gd.w - 30; x += 120) {
        edge.beginPath()
        edge.moveTo(x, GROUND_Y + 42)
        edge.lineTo(x + 22, GROUND_Y + 70)
        edge.lineTo(x + 6, GROUND_Y + 100)
        edge.strokePath()
      }
      // little grass tufts & stones on the lip
      for (let x = gd.x + 34; x < gd.x + gd.w - 24; x += 96) {
        const tuft = this.add.graphics().setDepth(3)
        tuft.fillStyle(0x5fcf95, 0.85)
        tuft.fillTriangle(x, GROUND_Y, x - 5, GROUND_Y - 10, x + 2, GROUND_Y - 1)
        tuft.fillTriangle(x + 5, GROUND_Y, x + 4, GROUND_Y - 13, x + 10, GROUND_Y - 1)
        tuft.fillTriangle(x + 10, GROUND_Y, x + 15, GROUND_Y - 8, x + 17, GROUND_Y)
      }
      for (let x = gd.x + 70; x < gd.x + gd.w - 40; x += 210) {
        this.add.image(x, GROUND_Y + 4, 'bushTex').setOrigin(0.5, 1).setDepth(3).setScale(0.55 + (x % 3) * 0.05)
      }
    })

    // Floating platforms
    PLATFORMS.forEach((p) => {
      const body = this.add.rectangle(p.x + p.w / 2, p.y + 12, p.w, 24, 0x000000, 0)
      this.physics.add.existing(body, true)
      body.setVisible(false)
      this.solids.push(body)
      const trim = this.add.tileSprite(p.x, p.y, p.w, 24, 'platform').setOrigin(0, 0).setDepth(1)
      trim.setTileScale(1, 1)
      const g = this.add.graphics().setDepth(2)
      g.fillStyle(0xffe0a1, 0.4)
      g.fillRect(p.x, p.y, p.w, 3)
      g.fillStyle(0x183a4d, 0.8)
      g.fillRect(p.x, p.y + 22, p.w, 6)
      g.fillStyle(0x2a5266, 1)
      g.fillRect(p.x + 14, p.y + 24, 8, 12)
      g.fillRect(p.x + p.w - 22, p.y + 24, 8, 12)
      g.lineStyle(2.5, 0x0a2130, 0.7)
      g.strokeRect(p.x + 1, p.y + 1, p.w - 2, 22)
      g.lineStyle(1, 0xbfe8ee, 0.35)
      g.strokeRect(p.x + 3, p.y + 3, p.w - 6, 18)
      g.fillStyle(0xffcf63, 0.9)
      ;[p.x + 12, p.x + p.w - 12].forEach((bx) => {
        g.fillCircle(bx, p.y + 12, 2.4)
      })
      this.add.image(p.x + p.w * 0.5, p.y + 8, 'glowTex').setDepth(0).setScale(0.32).setAlpha(0.12)
    })

    // Moving platforms
    MOVING.forEach((m) => {
      const sprite = this.add.tileSprite(m.x, m.y, m.w, 24, 'platform').setOrigin(0, 0).setDepth(1)
      this.physics.add.existing(sprite)
      const body = sprite.body as Phaser.Physics.Arcade.Body
      body.setAllowGravity(false)
      body.setImmovable(true)
      body.setSize(m.w, 24)
      const glow = this.add.image(m.x + m.w / 2, m.y + 32, 'glowTex').setDepth(0).setScale(0.9, 0.32).setAlpha(0.55)
      const g = this.add.graphics().setDepth(2)
      g.fillStyle(0x13374a, 0.9)
      g.fillRect(m.x, m.y + 22, m.w, 8)
      g.fillStyle(0xffcf63, 0.9)
      g.fillRect(m.x + 8, m.y + 24, m.w - 16, 2)
      g.fillStyle(0x5fe0cf, 0.9)
      g.fillTriangle(m.x + m.w / 2 - 8, m.y + 30, m.x + m.w / 2 + 8, m.y + 30, m.x + m.w / 2, m.y + 38)
      const bolts = this.add.graphics().setDepth(2)
      bolts.fillStyle(0xfff0bd, 0.95)
      for (let bx = m.x + 12; bx < m.x + m.w; bx += 34) bolts.fillCircle(bx, m.y + 12, 2)
      this.moving.push({ sprite, body, glow, x0: m.x, y0: m.y, w: m.w, axis: m.axis, range: m.range, period: m.period, phase: m.phase })
      this.movingSprites.push(sprite)
    })

    // Hazards
    HAZARDS.forEach((hz) => {
      const hw = hz.w
      const img = this.physics.add.staticImage(hz.x, hz.y, 'hazard').setOrigin(0.5, 1).setDepth(4)
      img.setDisplaySize(hw, 27)
      img.refreshBody()
      const body = img.body as Phaser.Physics.Arcade.StaticBody
      body.setSize(hw - 16, 16)
      body.position.set(hz.x - (hw - 16) / 2, hz.y - 20)
      const g = this.add.graphics().setDepth(3)
      g.fillStyle(0x8d2f3a, 0.32)
      g.fillEllipse(hz.x, hz.y - 2, hw + 22, 14)
      g.fillStyle(0xffd0d0, 0.4)
      g.fillEllipse(hz.x, hz.y - 20, hw - 18, 8)
      this.add.image(hz.x, hz.y - 22, 'glowTex').setDepth(3).setScale(0.7, 0.3).setAlpha(0.32).setTint(0xff6a6a)
      this.hazardImages.push(img)
    })

    // decorative crates / lamps (do not read as obstacles: kept behind and off the lane)
    ;[300, 1460, 2610, 3360].forEach((x) => {
      this.add.image(x, GROUND_Y, 'crateTex').setOrigin(0.5, 1).setScale(0.68).setDepth(3).setAlpha(0.95)
      this.add.image(x + 26, GROUND_Y, 'crateTex').setOrigin(0.5, 1).setScale(0.48).setDepth(3).setAlpha(0.9)
    })
    const lampG = this.add.graphics().setDepth(3)
    ;[560, 1880, 3230].forEach((x) => {
      lampG.fillStyle(0x16394c, 1).fillRect(x, GROUND_Y - 118, 6, 118)
      lampG.fillStyle(0xffe6a8, 1).fillCircle(x + 3, GROUND_Y - 122, 10)
      lampG.fillStyle(0x2b5b6f, 1).fillRect(x - 8, GROUND_Y - 112, 22, 5)
    })
    ;[560, 1880, 3230].forEach((x) => {
      this.add.image(x + 3, GROUND_Y - 122, 'glowTex').setDepth(2).setScale(0.9).setAlpha(0.55)
    })
  }

  private buildPlayer() {
    this.player = this.physics.add.sprite(SPAWN.x, SPAWN.y, 'pelican-idle').setOrigin(0.5, 1).setDepth(10)
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setSize(34, 50)
    body.setOffset(15, 14)
    this.player.setMaxVelocity(500, 1250)
    this.player.setCollideWorldBounds(false)
    this.shadow = this.add.ellipse(SPAWN.x, SPAWN.y - 3, 48, 12, 0x0b2433, 0.32).setDepth(8)
  }

  private buildBots() {
    BOTS.forEach((b) => {
      const y = b.y
      const sprite = this.physics.add.sprite(b.x, y, 'robot').setOrigin(0.5, 1).setDepth(9)
      const body = sprite.body as Phaser.Physics.Arcade.Body
      body.setSize(32, 38)
      body.setOffset(8, 10)
      sprite.setBounce(0)
      this.bots.push({ sprite, minX: b.minX, maxX: b.maxX, speed: b.speed, dir: 1, baseY: y })
      this.botBodies.push(sprite)
      const glow = this.add.image(0, 0, 'glowTex').setTint(0xff7a6a).setScale(0.3).setAlpha(0.28).setDepth(7)
      sprite.setData('glow', glow)
    })
  }

  private buildParcels() {
    PARCELS.forEach((p) => {
      const container = this.add.container(p.x, p.y).setDepth(7)
      const glow = this.add.image(0, -26, 'glowTex').setScale(0.85).setAlpha(0.5)
      const ring = this.add.ellipse(0, -4, 58, 18, 0xffcf63, 0.22)
      const img = this.add.image(0, 0, 'parcel').setOrigin(0.5, 1).setScale(1.15)
      const tag = this.add.text(0, -66, '', { fontFamily: FONT, fontSize: '16px', color: '#fff3c4', fontStyle: 'bold' })
        .setOrigin(0.5)
      container.add([glow, ring, img, tag])
      this.tweens.add({ targets: glow, alpha: { from: 0.35, to: 0.7 }, scale: { from: 0.75, to: 0.95 }, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' })
      this.tweens.add({ targets: ring, scaleX: { from: 0.8, to: 1.15 }, alpha: { from: 0.35, to: 0.1 }, duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.inOut' })
      this.parcels.push({ container, x: p.x, y: p.y, id: p.id, taken: false, bobSeed: p.id * 1.7 })
    })
  }

  private buildExit() {
    this.exitZone = this.add.container(EXIT_X, GROUND_Y).setDepth(6)
    const glow = this.add.image(0, -74, 'glowTex').setScale(1.5, 2.1).setAlpha(0.5).setTint(0xffd37a)
    this.exitGlow = glow
    const g = this.add.graphics()
    g.fillStyle(0x17384b, 1)
    g.fillRoundedRect(-58, -150, 116, 150, 8)
    g.fillStyle(0x2c5d72, 1)
    g.fillRoundedRect(-50, -142, 100, 142, 6)
    g.fillStyle(0x0f2b3c, 1)
    g.fillRoundedRect(-36, -118, 72, 118, 5)
    g.fillStyle(0x2a9c95, 1)
    g.fillRect(-34, -116, 68, 8)
    g.fillStyle(0xffcf63, 1)
    g.fillRect(-64, -160, 128, 14)
    g.fillStyle(0xef6473, 1)
    for (let i = 0; i < 8; i++) g.fillRect(-58 + i * 16, -146, 8, 14)
    g.lineStyle(3, 0xffe6ad, 0.55)
    g.strokeRoundedRect(-50, -142, 100, 142, 6)
    g.fillStyle(0x0e2637, 0.75)
    g.fillEllipse(0, -1, 100, 16)
    this.exitDoor = g
    const sign = this.add.text(0, -176, '快递站', {
      fontFamily: FONT, fontSize: '20px', color: '#102b3c', fontStyle: 'bold',
      backgroundColor: '#ffcf63', padding: { x: 10, y: 4 },
    }).setOrigin(0.5)
    this.exitSign = sign
    const lockBg = this.add.graphics()
    lockBg.fillStyle(0x102b3c, 0.85).fillCircle(0, -80, 22)
    const lockIcon = this.add.text(0, -80, '🔒', { fontSize: '20px' }).setOrigin(0.5)
    const lockText = this.add.text(0, -44, '0/3', { fontFamily: FONT, fontSize: '15px', color: '#ffd9a0', fontStyle: 'bold' }).setOrigin(0.5)
    this.exitLock = this.add.container(0, 0, [lockBg, lockIcon, lockText])
    this.exitZone.add([glow, g, sign, this.exitLock])
    this.tweens.add({ targets: glow, alpha: { from: 0.28, to: 0.62 }, scaleX: { from: 1.35, to: 1.6 }, duration: 1600, yoyo: true, repeat: -1 })
    this.tweens.add({ targets: this.exitLock, y: { from: 0, to: -5 }, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.inOut' })
  }

  private buildColliders() {
    this.physics.add.collider(this.player, this.solids)
    this.physics.add.collider(this.player, this.movingSprites)
    this.physics.add.collider(this.botBodies, this.solids)
    this.physics.add.collider(this.botBodies, this.movingSprites)
    this.physics.add.overlap(this.player, this.botBodies, () => this.hurt('robot'))
    this.physics.add.overlap(this.player, this.hazardImages, () => this.hurt('hazard'))
  }

  private buildEffects() {
    this.dustEmitter = this.add.particles(0, 0, 'dustTex', {
      lifespan: { min: 260, max: 520 }, speed: { min: 18, max: 70 }, angle: { min: 190, max: 350 },
      scale: { start: 1.1, end: 0 }, alpha: { start: 0.55, end: 0 }, gravityY: -20, emitting: false,
    }).setDepth(19)
    this.sparkEmitter = this.add.particles(0, 0, 'sparkTex', {
      lifespan: { min: 380, max: 760 }, speed: { min: 90, max: 250 }, angle: { min: 0, max: 360 },
      scale: { start: 0.9, end: 0 }, alpha: { start: 1, end: 0 }, gravityY: 260,
      tint: [0xffe08a, 0xffcf63, 0x8ff0d9, 0xffffff], emitting: false,
    }).setDepth(20)
    this.hitEmitter = this.add.particles(0, 0, 'sparkTex', {
      lifespan: { min: 260, max: 560 }, speed: { min: 80, max: 230 }, angle: { min: 0, max: 360 },
      scale: { start: 0.8, end: 0 }, alpha: { start: 0.95, end: 0 }, gravityY: 420,
      tint: [0xff6a6a, 0xffd0a0], emitting: false,
    }).setDepth(20)
    this.confettiEmitter = this.add.particles(0, 0, 'confettiTex', {
      lifespan: { min: 900, max: 1800 }, speed: { min: 120, max: 380 }, angle: { min: 200, max: 340 },
      scale: { start: 1.2, end: 0.4 }, alpha: { start: 1, end: 0 }, gravityY: 520,
      rotate: { min: 0, max: 360 }, tint: [0xffcf63, 0xff8a3d, 0x39b7ac, 0xef6473, 0xffffff], emitting: false,
    }).setDepth(21)
  }

  // ---------------------------------------------------------------- input / bus
  private bindInput() {
    const kb = this.input.keyboard!
    kb.addCapture([Phaser.Input.Keyboard.KeyCodes.SPACE, Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.UP, Phaser.Input.Keyboard.KeyCodes.DOWN])
    this.keyLeft = kb.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyRight = kb.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.keyA = kb.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyD = kb.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keyJump = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  private bindBus() {
    const onStart = () => this.startRun()
    const onRestart = () => this.restartRun()
    const onPause = () => this.togglePause()
    const onLeft = (down: boolean) => { this.touchLeft = down; if (down) this.touchRight = false }
    const onRight = (down: boolean) => { this.touchRight = down; if (down) this.touchLeft = false }
    const onJump = (down: boolean) => { if (down) this.queueJump() }
    const onClear = () => { this.touchLeft = false; this.touchRight = false }
    bus.on(EV.start, onStart)
    bus.on(EV.restart, onRestart)
    bus.on(EV.pauseToggle, onPause)
    bus.on(EV.ctrlLeft, onLeft)
    bus.on(EV.ctrlRight, onRight)
    bus.on(EV.ctrlJump, onJump)
    bus.on(EV.ctrlClear, onClear)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      bus.off(EV.start, onStart)
      bus.off(EV.restart, onRestart)
      bus.off(EV.pauseToggle, onPause)
      bus.off(EV.ctrlLeft, onLeft)
      bus.off(EV.ctrlRight, onRight)
      bus.off(EV.ctrlJump, onJump)
      bus.off(EV.ctrlClear, onClear)
    })
  }

  private queueJump() {
    if (this.state !== 'playing') return
    this.jumpBufferUntil = this.playTime + JUMP_BUFFER_SECONDS
  }

  private bindResize() {
    this.scale.on(Phaser.Scale.Events.RESIZE, this.onResize, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off(Phaser.Scale.Events.RESIZE, this.onResize, this)
    })
  }

  private onResize = () => {
    this.applyLayout()
  }

  private applyLayout() {
    this.layout = computeLayout(this.scale.width, this.scale.height)
    const cam = this.cameras.main
    cam.setViewport(this.layout.game.x, this.layout.game.y, this.layout.game.w, this.layout.game.h)
    cam.setZoom(this.layout.zoom)
    cam.setBounds(0, 0, WORLD_W, WORLD_H)
    cam.setRoundPixels(false)
    cam.setBackgroundColor('#6fc1dd')
    const viewW = this.layout.game.w / this.layout.zoom
    cam.scrollY = 0
    this.camX = Phaser.Math.Clamp(this.camX, 0, Math.max(0, WORLD_W - viewW))
    cam.scrollX = this.camX
  }

  // ---------------------------------------------------------------- run flow
  private resetRun(state: GameState, snapCamera = false) {
    this.physics.world.resume()
    this.worldPaused = false
    this.state = state
    this.lives = START_LIVES
    this.parcelCount = 0
    this.playTime = 0
    this.invulnUntil = 0
    this.hurtUntil = 0
    this.finishReason = ''
    this.elapsedAtFinish = 0
    this.won = false
    this.jumpBufferUntil = 0
    this.touchLeft = false
    this.touchRight = false
    this.wasOnGround = true
    this.lastHudKey = ''
    this.player.clearTint()
    this.player.setAlpha(1).setVisible(true)
    this.player.setAngle(0)
    const pb = this.player.body as Phaser.Physics.Arcade.Body
    pb.reset(SPAWN.x, SPAWN.y)
    this.player.setVelocity(0, 0)
    this.player.anims.play('pelican-idle', true)
    this.shadow.setPosition(SPAWN.x, SPAWN.y - 3)
    this.bots.forEach((b) => {
      b.sprite.body!.reset(b.sprite.x, b.baseY)
      b.sprite.setVelocity(0, 0)
      b.sprite.setAlpha(1)
      b.sprite.setVisible(true)
      b.dir = 1
    })
    this.parcels.forEach((p) => {
      p.taken = false
      p.container.setVisible(true).setAlpha(1).setScale(1)
      p.container.y = p.y
    })
    this.moving.forEach((m) => {
      m.body.reset(m.x0, m.y0)
      m.phase = MOVING.find((s) => s.x === m.x0)?.phase ?? 0
    })
    this.exitLock.setVisible(true)
    this.exitGlow.setAlpha(0.5)
    this.exitSign.setText('快递站')
    this.updateExitLockedVisual()
    if (snapCamera || true) {
      const viewW = this.layout.game.w / this.layout.zoom
      this.camX = Phaser.Math.Clamp(SPAWN.x - viewW * 0.42, 0, Math.max(0, WORLD_W - viewW))
      this.cameras.main.scrollX = this.camX
    }
    this.cameras.main.stopFollow()
    this.cameras.main.fadeIn(260, 14, 38, 55)
    this.emitHud(true)
  }

  private startRun() {
    if (this.state === 'playing') return
    this.resetRun('playing')
    bus.emit(EV.toast, '出发！收集 3 件快递')
  }

  private restartRun() {
    if (this.scene.isPaused()) this.scene.resume()
    this.physics.world.resume()
    this.resetRun('playing')
    this.cameras.main.flash(180, 255, 241, 200)
    bus.emit(EV.toast, '重新出发 · 3 件快递等你送达')
  }

  private togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused'
      this.touchLeft = false
      this.touchRight = false
      bus.emit(EV.ctrlClear)
      this.player.setVelocityX(0)
      this.emitHud(true)
      this.scene.pause()
    } else if (this.state === 'paused') {
      this.scene.resume()
      this.state = 'playing'
      this.touchLeft = false
      this.touchRight = false
      this.jumpBufferUntil = 0
      bus.emit(EV.ctrlClear)
      this.emitHud(true)
    }
  }

  private winRun() {
    if (this.state !== 'playing') return
    this.state = 'won'
    this.won = true
    this.elapsedAtFinish = this.playTime
    this.finishReason = '3 件快递全部送达，成功抵达出口！'
    this.player.setVelocity(0, 0)
    this.physics.world.pause()
    this.worldPaused = true
    this.cameras.main.flash(420, 255, 247, 210)
    this.cameras.main.shake(220, 0.0035)
    this.confettiEmitter.explode(90, this.player.x, this.player.y - 60)
    this.sparkEmitter.explode(40, this.player.x, this.player.y - 50)
    bus.emit(EV.toast, '送达成功！')
    this.emitHud(true)
  }

  private loseRun(reason: string) {
    if (this.state !== 'playing') return
    this.state = 'lost'
    this.elapsedAtFinish = this.playTime
    this.finishReason = reason
    this.player.setVelocity(0, 0)
    this.physics.world.pause()
    this.worldPaused = true
    this.cameras.main.shake(300, 0.006)
    this.emitHud(true)
  }

  private respawn() {
    const pb = this.player.body as Phaser.Physics.Arcade.Body
    pb.reset(SPAWN.x, SPAWN.y)
    this.player.setVelocity(0, 0)
    this.player.setAlpha(1)
    this.shadow.setPosition(SPAWN.x, SPAWN.y - 3)
    const viewW = this.layout.game.w / this.layout.zoom
    this.camX = Phaser.Math.Clamp(SPAWN.x - viewW * 0.42, 0, Math.max(0, WORLD_W - viewW))
    this.cameras.main.scrollX = this.camX
    this.cameras.main.flash(220, 40, 20, 30)
  }

  // ---------------------------------------------------------------- damage / pickups
  private hurt(cause: 'robot' | 'hazard') {
    if (this.state !== 'playing' || this.worldPaused) return
    if (this.playTime < this.invulnUntil) return
    this.lastDamage = cause
    this.lives -= 1
    this.hurtUntil = this.playTime + 0.42
    this.invulnUntil = this.playTime + INVULN_SECONDS
    this.player.setTintFill(0xffffff)
    this.time.delayedCall(90, () => { if (this.state !== 'playing') return; this.player.clearTint() })
    this.hitEmitter.explode(16, this.player.x, this.player.y - 30)
    this.cameras.main.shake(140, 0.005)
    this.player.setVelocityY(-230)
    const away = this.player.x < (cause === 'robot' ? this.nearestBotX() : this.player.x) ? -1 : 1
    this.player.setVelocityX(away * 180)
    if (cause === 'hazard') this.player.setVelocityY(-300)
    this.updateHurtAlpha()
    if (this.lives <= 0) {
      this.loseRun(cause === 'robot' ? '生命耗尽 · 被巡逻机器人连续撞倒' : '生命耗尽 · 被危险尖刺击倒')
    } else {
      bus.emit(EV.toast, cause === 'robot' ? '被机器人撞到！-1 生命' : '碰到危险区！-1 生命')
    }
    this.emitHud(true)
  }

  private nearestBotX() {
    let best = this.player.x
    let dist = Infinity
    this.bots.forEach((b) => {
      const d = Math.abs(b.sprite.x - this.player.x)
      if (d < dist) { dist = d; best = b.sprite.x }
    })
    return best
  }

  private fallOut() {
    if (this.state !== 'playing') return
    this.lastDamage = 'fall'
    this.lives -= 1
    this.hitEmitter.explode(18, this.player.x, WORLD_H - 20)
    this.cameras.main.shake(220, 0.006)
    if (this.lives <= 0) {
      this.player.setVisible(false)
      this.loseRun('生命耗尽 · 跌入深渊')
    } else {
      this.respawn()
      this.invulnUntil = this.playTime + INVULN_SECONDS
      bus.emit(EV.toast, '掉入深渊！-1 生命，快递进度保留')
    }
    this.emitHud(true)
  }

  private collectParcel(p: Parcel) {
    p.taken = true
    this.parcelCount += 1
    this.sparkEmitter.explode(24, p.x, p.y - 26)
    this.tweens.add({
      targets: p.container,
      y: p.y - 44,
      alpha: 0,
      scaleX: 1.4,
      scaleY: 1.4,
      duration: 240,
      ease: 'Quad.out',
      onComplete: () => p.container.setVisible(false),
    })
    this.cameras.main.flash(90, 255, 236, 170, false)
    const left = 3 - this.parcelCount
    bus.emit(EV.toast, left > 0 ? `快递 ${this.parcelCount}/3 · 还差 ${left} 件` : '集齐 3 件！前往终点快递站')
    this.updateExitLockedVisual()
    this.emitHud(true)
  }

  private updateExitLockedVisual() {
    const ready = this.parcelCount >= 3
    this.exitLock.setVisible(!ready)
    const lockText = this.exitLock.list[2] as Phaser.GameObjects.Text
    lockText.setText(`${this.parcelCount}/3`)
    this.exitSign.setText(ready ? '出口 · 已开放' : '快递站')
    this.exitGlow.setTint(ready ? 0x9cffd8 : 0xffd37a)
    this.exitGlow.setAlpha(ready ? 0.72 : 0.45)
  }

  // ---------------------------------------------------------------- update
  update(_time: number, deltaMs: number) {
    const dt = Math.min(deltaMs, 50) / 1000
    if (this.state === 'playing') {
      this.playTime += Math.min(deltaMs, 250) / 1000
      this.updatePlayer(dt)
      this.updateBots(dt)
      this.updateParcels()
      this.updateExit()
      this.updateHazardHint()
      if (this.state === 'playing' && this.playTime >= ROUND_SECONDS) {
        this.loseRun('时间耗尽 · 120 秒内未能送达')
      }
    }
    this.updateMovingPlatforms(dt)
    this.updateAmbient(dt)
    this.updateCamera(dt)
    this.updatePlayerVisuals()
    this.emitHud()
  }

  private updatePlayer(dt: number) {
    const p = this.player
    const body = p.body as Phaser.Physics.Arcade.Body
    const leftDown = this.keyLeft.isDown || this.keyA.isDown || this.touchLeft
    const rightDown = this.keyRight.isDown || this.keyD.isDown || this.touchRight
    let vx = 0
    if (leftDown && !rightDown) vx = -MOVE_SPEED
    if (rightDown && !leftDown) vx = MOVE_SPEED
    p.setVelocityX(vx)
    if (vx !== 0) p.setFlipX(vx < 0)

    if (Phaser.Input.Keyboard.JustDown(this.keyJump)) this.queueJump()
    const onGround = body.blocked.down || body.touching.down
    if (this.jumpBufferUntil > this.playTime && onGround) {
      this.jumpBufferUntil = 0
      this.jumpCount += 1
      this.lastJumpX = Math.round(p.x)
      p.setVelocityY(JUMP_VELOCITY)
      this.dustEmitter.explode(8, p.x, p.y - 2)
      this.cameras.main.shake(60, 0.0016)
    }
    if (!onGround && this.wasOnGround && body.velocity.y < -80) {
      this.dustEmitter.explode(5, p.x, p.y - 2)
    }
    if (onGround && !this.wasOnGround && body.velocity.y >= 0) {
      this.dustEmitter.explode(9, p.x, p.y - 2)
      this.cameras.main.shake(70, 0.002)
      if (body.velocity.y > 420) this.sparkEmitter.explode(4, p.x, p.y - 4)
    }
    if (onGround && Math.abs(vx) > 20 && this.playTime - this.walkDustAt > 0.22) {
      this.walkDustAt = this.playTime
      this.dustEmitter.explode(2, p.x - (p.flipX ? -10 : 10), p.y - 2)
    }
    this.wasOnGround = onGround
    if (p.x < 20) { p.x = 20; body.position.x = 20 - body.halfWidth }
    if (p.x > WORLD_W - 20) { p.x = WORLD_W - 20; body.position.x = WORLD_W - 20 - body.halfWidth }
    if (body.top > WORLD_H) this.fallOut()
    if (p.y > WORLD_H + 80) this.fallOut()
    this.updateShadow()
  }

  private updateShadow() {
    const p = this.player
    this.shadow.setPosition(p.x, p.y - 3)
    const body = p.body as Phaser.Physics.Arcade.Body
    const airborne = !(body.blocked.down || body.touching.down)
    this.shadow.setAlpha(airborne ? 0.16 : 0.32)
    this.shadow.setScale(airborne ? 0.8 : 1, airborne ? 0.8 : 1)
  }

  private updateBots(dt: number) {
    this.bots.forEach((b) => {
      const s = b.sprite
      const body = s.body as Phaser.Physics.Arcade.Body
      if (body.blocked.left) b.dir = 1
      if (body.blocked.right) b.dir = -1
      if (s.x <= b.minX) b.dir = 1
      if (s.x >= b.maxX) b.dir = -1
      s.setVelocityX(b.dir * b.speed)
      s.setFlipX(b.dir < 0)
      s.setVelocityY(body.velocity.y)
      const glow = s.getData('glow') as Phaser.GameObjects.Image | undefined
      if (glow) glow.setPosition(s.x, s.y - 22).setAlpha(0.22 + Math.sin(this.playTime * 6 + s.x) * 0.08)
    })
  }

  private updateMovingPlatforms(dt: number) {
    const active = this.state === 'playing' && !this.worldPaused
    this.moving.forEach((m) => {
      const body = m.body
      let nx = m.x0
      let ny = m.y0
      if (active || this.state === 'ready') {
        m.phase += dt * (Math.PI * 2) / m.period
        const k = (1 - Math.cos(m.phase)) / 2
        if (m.axis === 'h') nx = m.x0 + m.range * k
        else ny = m.y0 + m.range * k
      } else {
        nx = m.sprite.x
        ny = m.sprite.y
      }
      if (!active && this.state !== 'ready') {
        // frozen in pause / result screens
      }
      const dx = nx - m.sprite.x
      const dy = ny - m.sprite.y
      const pb = this.player.body as Phaser.Physics.Arcade.Body
      const riding = Math.abs(pb.bottom - body.top) <= 8 &&
        pb.right > body.left + 2 && pb.left < body.right - 2 &&
        pb.velocity.y >= -40
      if (active && riding && (dx !== 0 || dy !== 0)) {
        this.player.x += dx
        this.player.y += dy
        pb.position.x += dx
        pb.position.y += dy
        pb.updateCenter()
        this.shadow.setPosition(this.player.x, this.player.y - 3)
      }
      if (active) {
        m.body.reset(nx, ny)
      }
      m.glow.setPosition(m.sprite.x + m.w / 2, m.sprite.y + 34)
    })
  }

  private updateParcels() {
    this.parcels.forEach((p) => {
      if (p.taken) return
      p.container.y = p.y + Math.sin(this.playTime * 3 + p.bobSeed) * 5
      const img = p.container.list[2] as Phaser.GameObjects.Image
      img.setAngle(Math.sin(this.playTime * 2 + p.bobSeed) * 4)
      const b = this.player.body as Phaser.Physics.Arcade.Body
      const pickup = new Phaser.Geom.Rectangle(p.x - 28, p.y - 64, 56, 64)
      if (Phaser.Geom.Intersects.RectangleToRectangle(pickup, new Phaser.Geom.Rectangle(b.left, b.top, b.width, b.height))) {
        this.collectParcel(p)
      }
    })
  }

  private updateExit() {
    const b = this.player.body as Phaser.Physics.Arcade.Body
    const inExit = b.right > EXIT_X - 46 && b.left < EXIT_X + 46 && b.bottom > GROUND_Y - 140
    if (!inExit) return
    if (this.parcelCount >= 3) this.winRun()
  }

  private updateHazardHint() {
    if (this.parcelCount >= 3) return
    const b = this.player.body as Phaser.Physics.Arcade.Body
    const inExit = b.right > EXIT_X - 46 && b.left < EXIT_X + 46 && b.bottom > GROUND_Y - 140
    if (inExit && this.playTime - this.lastHazardHint > 2.2) {
      this.lastHazardHint = this.playTime
      bus.emit(EV.toast, `出口未开放：还需要 ${3 - this.parcelCount} 件快递`)
      this.exitLock.setScale(1.25)
      this.tweens.add({ targets: this.exitLock, scale: 1, duration: 220, ease: 'Back.out' })
    }
  }

  private updateCamera(dt: number) {
    const viewW = this.layout.game.w / this.layout.zoom
    const maxScroll = Math.max(0, WORLD_W - viewW)
    const vel = this.player.body ? (this.player.body as Phaser.Physics.Arcade.Body).velocity.x : 0
    const target = Phaser.Math.Clamp(this.player.x - viewW / 2 + Phaser.Math.Clamp(vel * 0.16, -46, 46), 0, maxScroll)
    if (this.state === 'won' || this.state === 'lost') {
      this.camX = Phaser.Math.Linear(this.camX, target, 1 - Math.exp(-2.5 * dt))
    } else {
      this.camX = Phaser.Math.Linear(this.camX, target, 1 - Math.exp(-7 * dt))
    }
    this.cameras.main.scrollX = this.camX
    this.cameras.main.scrollY = 0
  }

  private updateAmbient(dt: number) {
    if (this.waveLayer) this.waveLayer.tilePositionX += dt * 14
    this.cloudDrift.forEach((c, i) => {
      c.x += dt * (3 + (i % 4)) * (i % 2 === 0 ? 1 : -1) * 0.6
      if (c.x > 4000) c.x = -300
      if (c.x < -350) c.x = 3950
    })
    this.parcels.forEach((p) => {
      if (p.taken) return
      p.container.x = p.x
    })
    this.exitZone.setPosition(EXIT_X, GROUND_Y)
    this.exitGlow.setScale(1.5 + Math.sin(this.playTime * 2) * 0.06, 2.1)
  }

  private updatePlayerVisuals() {
    const p = this.player
    const body = p.body as Phaser.Physics.Arcade.Body
    if (this.state !== 'playing') {
      if (this.state === 'ready') {
        if (p.anims.getName() !== 'pelican-idle') p.anims.play('pelican-idle', true)
      }
      return
    }
    const onGround = body.blocked.down || body.touching.down
    if (this.playTime < this.hurtUntil) {
      if (p.anims.getName() !== 'pelican-hurt') p.anims.play('pelican-hurt', true)
    } else if (!onGround) {
      if (p.anims.getName() !== 'pelican-jump') p.anims.play('pelican-jump', true)
    } else if (Math.abs(body.velocity.x) > 20) {
      if (p.anims.getName() !== 'pelican-walk') p.anims.play('pelican-walk', true)
    } else if (p.anims.getName() !== 'pelican-idle') {
      p.anims.play('pelican-idle', true)
    }
    this.updateHurtAlpha()
  }

  private updateHurtAlpha() {
    if (this.state !== 'playing') { this.player.setAlpha(1); return }
    if (this.playTime < this.invulnUntil) {
      const phase = Math.floor(this.playTime * 12) % 2
      this.player.setAlpha(phase === 0 ? 0.4 : 1)
    } else {
      this.player.setAlpha(1)
    }
  }

  private emitHud(force = false) {
    const timeLeft = Math.max(0, ROUND_SECONDS - this.playTime)
    const d: HudData = {
      state: this.state,
      lives: Math.max(0, this.lives),
      parcels: this.parcelCount,
      timeLeft,
      reason: this.finishReason,
      wonBy: this.state === 'won' ? `剩余 ${Math.ceil(timeLeft)} 秒 · 生命 ${this.lives}` : '',
      elapsed: this.elapsedAtFinish,
    }
    const key = `${d.state}|${d.lives}|${d.parcels}|${Math.ceil(d.timeLeft)}|${d.reason}`
    if (force || key !== this.lastHudKey) {
      this.lastHudKey = key
      bus.emit(EV.hud, d)
    }
  }

  private snapshot() {
    const b = this.player.body as Phaser.Physics.Arcade.Body
    return {
      state: this.state,
      lives: this.lives,
      parcels: this.parcelCount,
      timeLeft: Math.max(0, ROUND_SECONDS - this.playTime),
      x: Math.round(this.player.x),
      y: Math.round(this.player.y),
      vx: Math.round(b.velocity.x),
      vy: Math.round(b.velocity.y),
      onGround: b.blocked.down || b.touching.down,
      invuln: Math.max(0, this.invulnUntil - this.playTime),
      camX: Math.round(this.camX),
      reason: this.finishReason,
      pausedScene: this.scene.isPaused(),
      jumpDown: this.keyJump.isDown,
      jumpBuffer: Math.max(0, this.jumpBufferUntil - this.playTime),
      jumps: this.jumpCount,
      lastJumpX: this.lastJumpX,
    }
  }
}
