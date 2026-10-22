import Phaser from 'phaser'
import { C, FONT, ROUND_SECONDS, START_LIVES, type GameState, type HudData } from './constants'
import { bus, EV } from './bus'
import { computeLayout, type Layout } from './layout'

interface HoldButton {
  pointerId: number
  event: string
  press: (pointerId: number) => void
  release: (pointerId?: number) => void
}

export default class UIScene extends Phaser.Scene {
  private layout!: Layout
  private hudRoot?: Phaser.GameObjects.Container
  private touchRoot?: Phaser.GameObjects.Container
  private overlayRoot?: Phaser.GameObjects.Container
  private toastRoot?: Phaser.GameObjects.Container
  private hearts: Phaser.GameObjects.Image[] = []
  private parcelText?: Phaser.GameObjects.Text
  private timeText?: Phaser.GameObjects.Text
  private stateText?: Phaser.GameObjects.Text
  private timePill?: Phaser.GameObjects.Graphics
  private pips: Phaser.GameObjects.Arc[] = []
  private holdButtons: HoldButton[] = []
  private last?: HudData
  private state: GameState = 'ready'
  private overlayFor: GameState | '' = ''
  private toastTween?: Phaser.Tweens.Tween
  private keyboardBound = false

  constructor() { super('ui') }

  create() {
    this.layout = computeLayout(this.scale.width, this.scale.height)
    this.input.addPointer(3)
    this.buildHud()
    this.buildTouchControls()
    this.bindBus()
    this.bindKeys()
    this.scale.on(Phaser.Scale.Events.RESIZE, this.onResize, this)
    ;(window as unknown as Record<string, unknown>).__uiTouch = () => ({
      holds: this.holdButtons.map((b) => ({ ev: b.event, pid: b.pointerId })),
      pointers: this.input.manager.pointers.map((p) => ({ id: p.id, identifier: p.identifier, active: p.active, down: p.isDown, x: Math.round(p.x), y: Math.round(p.y) })),
    })
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      bus.off(EV.hud, this.onHud, this)
      bus.off(EV.toast, this.onToast, this)
      this.scale.off(Phaser.Scale.Events.RESIZE, this.onResize, this)
    })
  }

  private bindBus() {
    bus.on(EV.hud, this.onHud, this)
    bus.on(EV.toast, this.onToast, this)
  }

  private bindKeys() {
    if (this.keyboardBound) return
    this.keyboardBound = true
    this.input.on('pointerup', this.onGlobalPointerUp, this)
    window.addEventListener('keydown', this.onDomKey)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener('keydown', this.onDomKey)
      this.input.off('pointerup', this.onGlobalPointerUp, this)
    })
  }

  private onDomKey = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase()
    if (k === 'p' || k === 'escape') {
      if (e.repeat) return
      e.preventDefault()
      this.togglePauseFromKey()
      return
    }
    if (k === 'enter' || k === ' ') {
      if (this.state === 'ready' || this.state === 'won' || this.state === 'lost') {
        e.preventDefault()
        this.confirmFromKey()
      }
      return
    }
    if (k === 'r' && (this.state === 'paused' || this.state === 'won' || this.state === 'lost')) {
      e.preventDefault()
      bus.emit(EV.restart)
    }
  }

  private togglePauseFromKey() {
    if (this.state === 'playing' || this.state === 'paused') bus.emit(EV.pauseToggle)
  }

  private confirmFromKey() {
    if (this.state === 'ready') bus.emit(EV.start)
    else if (this.state === 'won' || this.state === 'lost') bus.emit(EV.restart)
  }

  private onResize = () => {
    this.layout = computeLayout(this.scale.width, this.scale.height)
    const cam = this.cameras.main
    cam.setViewport(0, 0, this.layout.w, this.layout.h)
    cam.setScroll(0, 0)
    cam.setZoom(1)
    this.releaseAll()
    this.buildHud()
    this.buildTouchControls()
    if (this.last) {
      this.refreshHud(this.last)
      this.buildOverlay(this.last)
    }
  }

  private onHud(d: HudData) {
    const prevState = this.last?.state
    this.last = d
    this.state = d.state
    this.refreshHud(d)
    if (d.state !== prevState || this.overlayFor !== d.state) {
      this.buildOverlay(d)
      this.releaseAll()
    }
  }

  private onToast(message: string) {
    if (this.toastRoot) {
      this.toastRoot.destroy()
      this.toastRoot = undefined
    }
    if (this.toastTween) { this.toastTween.stop(); this.toastTween = undefined }
    const { w, game } = this.layout
    const y = this.layout.portrait ? game.y + 28 : this.hudHeight() + 38
    const root = this.add.container(w / 2, y).setDepth(300)
    const text = this.add.text(0, 0, message, {
      fontFamily: FONT, fontSize: this.layout.portrait ? '14px' : '17px', color: '#fff3cf', fontStyle: 'bold',
    }).setOrigin(0.5)
    const tw = text.width + 34
    const bg = this.add.graphics()
    bg.fillStyle(0x0a1c29, 0.9).fillRoundedRect(-tw / 2, -17, tw, 34, 17)
    bg.lineStyle(1.5, 0xffcf63, 0.55).strokeRoundedRect(-tw / 2, -17, tw, 34, 17)
    root.add([bg, text])
    this.toastRoot = root
    this.toastTween = this.tweens.add({
      targets: root,
      alpha: { from: 0, to: 1 },
      y: y - 7,
      duration: 180,
      ease: 'Quad.out',
      onComplete: () => {
        this.time.delayedCall(1650, () => {
          if (!this.toastRoot) return
          this.tweens.add({
            targets: this.toastRoot, alpha: 0, y: y - 20, duration: 260,
            onComplete: () => { this.toastRoot?.destroy(); this.toastRoot = undefined },
          })
        })
      },
    })
  }

  // ------------------------------------------------------------------ HUD
  private hudHeight() {
    return this.layout.portrait ? this.layout.hudH : 84
  }

  private buildHud() {
    if (this.hudRoot) { this.hudRoot.destroy(); this.hudRoot = undefined }
    this.hearts = []
    this.pips = []
    const { w, h } = this.layout
    const portrait = this.layout.portrait
    const root = this.add.container(0, 0).setDepth(100)
    this.hudRoot = root
    const g = this.add.graphics()
    if (portrait) {
      g.fillStyle(0x0a1d2b, 0.97).fillRect(0, 0, w, this.layout.hudH)
      g.fillStyle(0x0e2838, 1).fillRect(0, 0, w, this.layout.hudH - 4)
      g.fillStyle(0xffcf63, 0.22).fillRect(0, this.layout.hudH - 4, w, 2)
      g.fillStyle(0x39b7ac, 0.18).fillRect(0, this.layout.hudH - 2, w, 1)
      for (let i = 0; i < 5; i++) {
        g.fillStyle(0x1d4a5e, 0.35).fillCircle(w - 40 - i * 26, this.layout.hudH - 14, 3)
      }
    } else {
      g.fillStyle(0x071c2b, 0.72).fillRect(0, 0, w, 84)
      g.fillStyle(0x0b2637, 0.5).fillRect(0, 84, w, 8)
      g.fillStyle(0xffcf63, 0.2).fillRect(0, 84, w, 1)
    }
    root.add(g)
    const safe = this.layout.safe

    if (portrait) {
      const cy = this.layout.hudH * 0.35
      const hs = 22
      for (let i = 0; i < START_LIVES; i++) {
        const heart = this.add.image(safe + 12 + i * (hs + 3), cy, 'heart').setDisplaySize(hs, hs)
        root.add(heart)
        this.hearts.push(heart)
      }
      const parcel = this.add.image(w - safe - 92, cy, 'parcel').setDisplaySize(20, 20)
      root.add(parcel)
      this.parcelText = this.add.text(w - safe - 78, cy, '0/3', {
        fontFamily: FONT, fontSize: '17px', color: C.cream, fontStyle: 'bold',
      }).setOrigin(0, 0.5)
      root.add(this.parcelText)

      const pill = this.add.graphics()
      pill.fillStyle(0x061622, 0.75).fillRoundedRect(w / 2 - 46, cy - 16, 92, 32, 16)
      pill.lineStyle(1, 0x5ec4d8, 0.28).strokeRoundedRect(w / 2 - 46, cy - 16, 92, 32, 16)
      root.add(pill)
      this.timeText = this.add.text(w / 2, cy, '02:00', {
        fontFamily: FONT, fontSize: '22px', color: C.cream, fontStyle: 'bold',
      }).setOrigin(0.5)
      root.add(this.timeText)

      const pauseBtn = this.makePauseButton(w - safe - 18, cy)
      root.add(pauseBtn)

      const status = this.add.text(w / 2, this.layout.hudH - 20, '收集 3 件快递 → 送达终点快递站', {
        fontFamily: FONT, fontSize: '11.5px', color: '#a9c9d6',
      }).setOrigin(0.5)
      this.stateText = status
      root.add(status)

    } else {
      const cy = 34
      const hs = 26
      for (let i = 0; i < START_LIVES; i++) {
        const heart = this.add.image(30 + i * (hs + 6), cy, 'heart').setDisplaySize(hs, hs)
        root.add(heart)
        this.hearts.push(heart)
      }
      root.add(this.add.text(30, 56, '生命', { fontFamily: FONT, fontSize: '11px', color: '#8fb4c5' }))
      const parcel = this.add.image(184, cy, 'parcel').setDisplaySize(26, 26)
      root.add(parcel)
      this.parcelText = this.add.text(202, cy, '0 / 3', {
        fontFamily: FONT, fontSize: '21px', color: C.cream, fontStyle: 'bold',
      }).setOrigin(0, 0.5)
      root.add(this.parcelText)
      root.add(this.add.text(184, 56, '快递', { fontFamily: FONT, fontSize: '11px', color: '#8fb4c5' }))
      for (let i = 0; i < 3; i++) {
        const pip = this.add.circle(302 + i * 13, cy, 3.5, 0x395b6e)
        root.add(pip)
        this.pips.push(pip)
      }

      const pill = this.add.graphics()
      pill.fillStyle(0x061622, 0.8).fillRoundedRect(w / 2 - 86, 12, 172, 50, 15)
      pill.lineStyle(1.5, 0x5ec4d8, 0.26).strokeRoundedRect(w / 2 - 86, 12, 172, 50, 15)
      root.add(pill)
      this.timePill = pill
      root.add(this.add.text(w / 2, 22, '剩余时间', { fontFamily: FONT, fontSize: '10px', color: '#8fb4c5' }).setOrigin(0.5))
      this.timeText = this.add.text(w / 2, 44, '02:00', {
        fontFamily: FONT, fontSize: '25px', color: C.cream, fontStyle: 'bold',
      }).setOrigin(0.5)
      root.add(this.timeText)

      this.stateText = this.add.text(w / 2 + 200, 52, '出口未开放 · 还差 3 件', {
        fontFamily: FONT, fontSize: '13px', color: '#a9c9d6',
      }).setOrigin(0.5)
      root.add(this.stateText)
      const pauseBtn = this.makePauseButton(w - 46, 38)
      root.add(pauseBtn)

      const hint = this.add.text(28, h - 22, '← → / A D 移动    空格 跳跃    P 暂停', {
        fontFamily: FONT, fontSize: '12px', color: '#b7d3de',
        backgroundColor: 'rgba(7,24,36,0.55)', padding: { x: 10, y: 5 },
      }).setOrigin(0, 1)
      root.add(hint)
    }
  }

  private makePauseButton(x: number, y: number) {
    const c = this.add.container(x, y)
    const r = this.layout.portrait ? 17 : 20
    const g = this.add.graphics()
    g.fillStyle(0x0d2636, 0.9).fillCircle(0, 0, r)
    g.lineStyle(1.5, 0xffcf63, 0.55).strokeCircle(0, 0, r)
    const icon = this.add.image(0, 0, 'pause').setDisplaySize(r * 0.8, r * 0.8)
    const zone = this.add.zone(0, 0, r * 2.4, r * 2.4).setOrigin(0.5).setInteractive({ useHandCursor: true })
    c.add([g, icon, zone])
    zone.on('pointerover', () => c.setScale(1.08))
    zone.on('pointerout', () => c.setScale(1))
    zone.on('pointerup', () => {
      c.setScale(1)
      bus.emit(EV.pauseToggle)
    })
    return c
  }

  private refreshHud(d: HudData) {
    const visible = d.state !== 'ready'
    this.hudRoot?.setVisible(visible)
    this.touchRoot?.setVisible(d.state === 'playing' && this.touchEnabled())
    this.hearts.forEach((heart, i) => {
      const alive = i < d.lives
      heart.setAlpha(alive ? 1 : 0.18)
      heart.setTint(alive ? 0xffffff : 0x6f8794)
    })
    this.parcelText?.setText(`${d.parcels} / 3`)
    this.parcelText?.setColor(d.parcels >= 3 ? C.gold : C.cream)
    this.pips.forEach((pip, i) => pip.setFillStyle(i < d.parcels ? 0xffcf63 : 0x395b6e))
    const t = Math.max(0, Math.ceil(d.timeLeft))
    const mm = Math.floor(t / 60)
    const ss = t % 60
    const label = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
    if (this.timeText) {
      this.timeText.setText(label)
      const urgent = d.state === 'playing' && d.timeLeft <= 20
      this.timeText.setColor(urgent ? '#ff8a92' : C.cream)
      this.timeText.setScale(urgent ? 1 + Math.sin(this.time.now / 140) * 0.035 : 1)
    }
    if (this.stateText) {
      if (this.layout.portrait) {
        this.stateText.setText(d.parcels >= 3 ? '出口已开放！把快递送进终点' : `收集 3 件快递 → 送达终点 · 还差 ${3 - d.parcels} 件`)
        this.stateText.setColor(d.parcels >= 3 ? '#ffe19b' : '#a9c9d6')
      } else {
        this.stateText.setText(d.parcels >= 3 ? '出口已开放 · 冲向终点！' : `出口未开放 · 还差 ${3 - d.parcels} 件`)
        this.stateText.setColor(d.parcels >= 3 ? '#ffe19b' : '#a9c9d6')
      }
    }
  }

  // ------------------------------------------------------------- touch pad
  private touchEnabled() {
    return this.layout.portrait || this.game.device.input.touch || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
  }

  private buildTouchControls() {
    if (this.touchRoot) { this.touchRoot.destroy(); this.touchRoot = undefined }
    this.holdButtons = []
    if (!this.touchEnabled()) return
    const { w, h, portrait, safe } = this.layout
    const root = this.add.container(0, 0).setDepth(90)
    this.touchRoot = root
    if (portrait) {
      const top = this.layout.game.y + this.layout.game.h
      const g = this.add.graphics()
      g.fillStyle(0x081b28, 0.98).fillRect(0, top, w, h - top)
      g.fillStyle(0x0d2a3a, 1).fillRect(0, top, w, 2)
      g.fillStyle(0xffcf63, 0.15).fillRect(0, top + 2, w, 1)
      g.lineStyle(1, 0x2f5f73, 0.4)
      for (let i = 0; i < 4; i++) g.strokeCircle(w - 30 - i * 22, top + 18, 4)
      root.add(g)
      const hint = this.add.text(w / 2, top + 17, '双指可同时按住移动与跳跃', {
        fontFamily: FONT, fontSize: '11px', color: '#82a9bb',
      }).setOrigin(0.5)
      root.add(hint)
      const r = Math.max(34, Math.min(46, w * 0.115))
      const cy = top + (h - top) * 0.5 + 2
      const leftX = safe + r + 4
      const rightX = leftX + r * 2 + 14
      this.addHoldPad(root, leftX, cy, r, 'left', EV.ctrlLeft)
      this.addHoldPad(root, rightX, cy, r, 'right', EV.ctrlRight)
      this.addJumpPad(root, w - safe - r - 12, cy, r * 1.16)
    } else {
      const r = 34
      const cy = h - r - safe - 4
      this.addHoldPad(root, safe + r, cy, r, 'left', EV.ctrlLeft, true)
      this.addHoldPad(root, safe + r * 3 + 12, cy, r, 'right', EV.ctrlRight, true)
      this.addJumpPad(root, w - safe - r - 4, cy, r * 1.12, true)
    }
  }

  private addHoldPad(root: Phaser.GameObjects.Container, x: number, y: number, r: number, dir: 'left' | 'right', event: string, ghost = false) {
    const c = this.add.container(x, y)
    const g = this.add.graphics()
    const draw = (pressed: boolean) => {
      g.clear()
      g.fillStyle(pressed ? 0x2a7f8f : 0x0b2536, ghost ? 0.45 : 0.92).fillCircle(0, 0, r)
      g.lineStyle(2.5, pressed ? 0xffdf9a : 0x5aa4b8, ghost ? 0.5 : 0.95).strokeCircle(0, 0, r)
      g.fillStyle(pressed ? 0xfff4d2 : 0xd8eef3, 0.96)
      const d = r * 0.4
      if (dir === 'left') g.fillTriangle(6, -d, 6, d, -d - 2, 0)
      else g.fillTriangle(-6, -d, -6, d, d + 2, 0)
    }
    draw(false)
    const label = this.add.text(0, r + 11, dir === 'left' ? '左移' : '右移', {
      fontFamily: FONT, fontSize: `${Math.round(r * 0.3)}px`, color: '#8fb9c8',
    }).setOrigin(0.5)
    const zone = this.add.zone(0, 0, r * 2.3, r * 2.3).setOrigin(0.5).setInteractive({ useHandCursor: true })
    c.add([g, zone, label])
    root.add(c)
    const hold: HoldButton = {
      pointerId: -1, event,
      press: (pid: number) => {
        if (hold.pointerId !== -1) return
        hold.pointerId = pid
        draw(true)
        c.setScale(0.94)
        bus.emit(event, true)
      },
      release: (pid?: number) => {
        if (hold.pointerId === -1) return
        if (pid !== undefined && pid !== hold.pointerId) return
        hold.pointerId = -1
        draw(false)
        c.setScale(1)
        bus.emit(event, false)
      },
    }
    this.wireHold(hold, zone)
  }

  private addJumpPad(root: Phaser.GameObjects.Container, x: number, y: number, r: number, ghost = false) {
    const c = this.add.container(x, y)
    const g = this.add.graphics()
    const draw = (pressed: boolean) => {
      g.clear()
      g.fillStyle(0x0b2536, ghost ? 0.45 : 0.95).fillCircle(0, 0, r)
      g.fillStyle(pressed ? 0xffbd74 : 0xff8a3d, 1).fillCircle(0, 0, r * 0.84)
      g.fillStyle(pressed ? 0xfff4d2 : 0xffe6bf, 1)
      g.fillTriangle(0, -r * 0.4, -r * 0.36, r * 0.08, r * 0.36, r * 0.08)
      g.fillRoundedRect(-r * 0.3, r * 0.14, r * 0.6, r * 0.16, 3)
      g.lineStyle(2.5, 0xffd89a, ghost ? 0.55 : 1).strokeCircle(0, 0, r)
    }
    draw(false)
    const label = this.add.text(0, r * 1.28, '跳跃', { fontFamily: FONT, fontSize: `${Math.round(r * 0.32)}px`, color: '#ffd9a0', fontStyle: 'bold' }).setOrigin(0.5)
    const zone = this.add.zone(0, 0, r * 2.3, r * 2.3).setOrigin(0.5).setInteractive({ useHandCursor: true })
    c.add([g, zone, label])
    root.add(c)
    const hold: HoldButton = {
      pointerId: -1, event: EV.ctrlJump,
      press: (pid: number) => {
        if (hold.pointerId !== -1) return
        hold.pointerId = pid
        draw(true)
        c.setScale(0.94)
        bus.emit(EV.ctrlJump, true)
      },
      release: (pid?: number) => {
        if (hold.pointerId === -1) return
        if (pid !== undefined && pid !== hold.pointerId) return
        hold.pointerId = -1
        draw(false)
        c.setScale(1)
        bus.emit(EV.ctrlJump, false)
        bus.emit(EV.ctrlJumpUp, false)
      },
    }
    this.wireHold(hold, zone)
  }

  private wireHold(hold: HoldButton, zone: Phaser.GameObjects.Zone) {
    zone.on('pointerdown', (p: Phaser.Input.Pointer) => hold.press(p.id))
    zone.on('pointerup', (p: Phaser.Input.Pointer) => hold.release(p.id))
    zone.on('pointerupoutside', (p: Phaser.Input.Pointer) => hold.release(p.id))
    zone.on('pointerout', (p: Phaser.Input.Pointer) => hold.release(p.id))
    this.holdButtons.push(hold)
  }

  private onGlobalPointerUp = (pointer: Phaser.Input.Pointer) => {
    this.holdButtons.forEach((h) => h.release(pointer.id))
  }

  private releaseAll() {
    this.holdButtons.forEach((h) => h.release())
    bus.emit(EV.ctrlClear)
  }

  // ------------------------------------------------------------- overlay
  private buildOverlay(d: HudData) {
    if (this.overlayRoot) { this.overlayRoot.destroy(); this.overlayRoot = undefined }
    this.overlayFor = d.state
    if (d.state === 'playing') return
    const { w, h, game, portrait } = this.layout
    const root = this.add.container(0, 0).setDepth(60)
    this.overlayRoot = root
    const dim = this.add.rectangle(w / 2, h / 2, w, h, 0x041019, 0.66)
    root.add(dim)
    const glow = this.add.image(w / 2, game.y + game.h * 0.5, 'glowTex').setScale(9, 5).setAlpha(0.1).setTint(0xffcf63)
    root.add(glow)

    const cw = Math.min(portrait ? w - 24 : 780, w - 24)
    const ch = Math.min(d.state === 'ready' ? (portrait ? 504 : 566) : (portrait ? 452 : 472), game.h - 16)
    const cx = w / 2
    const cy = game.y + game.h / 2
    const card = this.add.container(cx, cy)
    root.add(card)

    const shadow = this.add.graphics()
    shadow.fillStyle(0x031019, 0.5).fillRoundedRect(-cw / 2 + 10, -ch / 2 + 12, cw, ch, 26)
    card.add(shadow)
    const bg = this.add.graphics()
    bg.fillStyle(0xfff7e8, 1).fillRoundedRect(-cw / 2, -ch / 2, cw, ch, 26)
    bg.fillStyle(0xffcf63, 1).fillRoundedRect(-cw / 2, -ch / 2, cw, 14, { tl: 26, tr: 26, bl: 0, br: 0 })
    bg.fillStyle(0xff8a3d, 1).fillRoundedRect(-cw / 2 + 14, -ch / 2 + 14, cw - 28, 5, 3)
    bg.lineStyle(4, 0x143246, 1).strokeRoundedRect(-cw / 2, -ch / 2, cw, ch, 26)
    bg.lineStyle(1.5, 0xffffff, 0.65).strokeRoundedRect(-cw / 2 + 9, -ch / 2 + 9, cw - 18, ch - 18, 20)
    card.add(bg)
    // postage stamp corner
    const sx = cw / 2 - 44
    const sy = -ch / 2 + 52
    const stamp = this.add.graphics()
    stamp.fillStyle(0xfff2d4, 1).fillCircle(sx, sy, 23)
    stamp.lineStyle(2, 0xb9531d, 0.5).strokeCircle(sx, sy, 23)
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      stamp.fillStyle(0xb9531d, 0.5).fillCircle(sx + Math.cos(a) * 19, sy + Math.sin(a) * 19, 1.4)
    }
    const stampImg = this.add.image(sx, sy, 'parcel').setDisplaySize(30, 30).setAngle(-8)
    card.add([stamp, stampImg])

    if (d.state === 'ready') this.buildStartContent(card, cw, ch, portrait)
    else if (d.state === 'paused') this.buildPauseContent(card, cw, ch, portrait, d)
    else this.buildResultContent(card, cw, ch, portrait, d)
  }

  private buildStartContent(card: Phaser.GameObjects.Container, cw: number, ch: number, portrait: boolean) {
    const top = -ch / 2
    const compact = ch < 470 || cw < 430
    const titleSize = compact ? 27 : 40
    const y0 = top + (compact ? 24 : 30)
    card.add(this.add.text(0, y0, 'PELICAN  EXPRESS  ·  第 01 单', {
      fontFamily: FONT, fontSize: compact ? '9.5px' : '12px', color: '#b26b35', fontStyle: 'bold',
    }).setOrigin(0.5))
    const title = this.add.text(0, top + (compact ? 52 : 66), '鹈鹕快递大作战', {
      fontFamily: FONT, fontSize: `${titleSize}px`, color: '#142f42', fontStyle: 'bold',
      stroke: '#ffd98c', strokeThickness: 2,
    }).setOrigin(0.5)
    title.setShadow(0, 3, 'rgba(20,47,66,0.18)', 0)
    card.add(title)
    card.add(this.add.text(0, top + (compact ? 84 : 104), '穿过程序港的屋顶与吊桥，把 3 件快递送进终点', {
      fontFamily: FONT, fontSize: compact ? '11px' : '15px', color: '#456575',
    }).setOrigin(0.5))

    const heroTop = top + (compact ? 108 : 128)
    const half = Math.min(cw * 0.37, 245)
    const hero = this.add.container(0, heroTop)
    const hg = this.add.graphics()
    hg.lineStyle(3, 0xe6cfa8, 0.85)
    hg.beginPath()
    hg.moveTo(-half + 40, 48)
    hg.lineTo(half - 54, 48)
    hg.strokePath()
    for (let i = 0; i < 10; i++) {
      hg.fillStyle(0xd9b989, 0.8).fillCircle(-half + 52 + i * ((half * 2 - 118) / 9), 48, 2)
    }
    hero.add(hg)
    const peli = this.add.image(-half + 4, 70, 'pelican-idle').setOrigin(0.5, 1).setScale(compact ? 0.98 : 1.45)
    hero.add(peli)
    this.tweens.add({ targets: peli, y: 62, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.inOut' })
    for (let i = 0; i < 3; i++) {
      const px = -half + 80 + i * (compact ? 37 : 44)
      const parcel = this.add.image(px, 46, 'parcel').setOrigin(0.5, 1).setScale(compact ? 0.7 : 0.85)
      hero.add(parcel)
      this.tweens.add({ targets: parcel, y: 40, duration: 900 + i * 130, yoyo: true, repeat: -1, ease: 'Sine.inOut' })
    }
    const exit = this.add.container(half - 12, 50)
    const eg = this.add.graphics()
    eg.fillStyle(0x2c5d72, 1).fillRoundedRect(-24, -46, 48, 46, { tl: 8, tr: 8, bl: 2, br: 2 })
    eg.fillStyle(0x0f2b3c, 1).fillRoundedRect(-14, -33, 28, 33, 3)
    eg.fillStyle(0xffcf63, 1).fillRect(-28, -54, 56, 8)
    eg.fillStyle(0xef6473, 1)
    for (let i = 0; i < 4; i++) eg.fillRect(-23 + i * 13, -46, 7, 6)
    eg.lineStyle(2, 0xffe6ad, 0.6).strokeRoundedRect(-24, -46, 48, 46, 8)
    exit.add(eg)
    exit.add(this.add.text(0, 12, '终点', { fontFamily: FONT, fontSize: '10px', color: '#143246', fontStyle: 'bold' }).setOrigin(0.5))
    hero.add(exit)
    this.tweens.add({ targets: exit, y: 44, duration: 1400, yoyo: true, repeat: -1, ease: 'Sine.inOut' })
    card.add(hero)

    const descY = top + (compact ? 194 : 224)
    card.add(this.add.text(0, descY, '跳跃穿过平台，避开尖刺和巡逻机器人\n集齐 3 件快递后，出口才会开放', {
      fontFamily: FONT, fontSize: compact ? '12px' : '15px', color: '#2d4b5c', align: 'center', lineSpacing: 5,
    }).setOrigin(0.5, 0))

    const statsY = descY + (compact ? 48 : 58)
    const stats: Array<[string, string]> = [['时间', '120 秒'], ['生命', '3 点'], ['快递', '3 件']]
    const chipW = compact ? 74 : 106
    const gap = compact ? 8 : 12
    const totalW = chipW * 3 + gap * 2
    stats.forEach((st, i) => {
      const x = -totalW / 2 + chipW / 2 + i * (chipW + gap)
      const chip = this.add.graphics()
      chip.fillStyle(0xf5e6cb, 1).fillRoundedRect(x - chipW / 2, statsY, chipW, compact ? 27 : 34, 14)
      chip.lineStyle(1.5, 0xd8bd91, 1).strokeRoundedRect(x - chipW / 2, statsY, chipW, compact ? 27 : 34, 14)
      card.add(chip)
      card.add(this.add.text(x, statsY + (compact ? 13.5 : 17), `${st[1]}  ${st[0]}`, {
        fontFamily: FONT, fontSize: compact ? '10.5px' : '13px', color: '#5f4430', fontStyle: 'bold',
      }).setOrigin(0.5))
    })

    const controlsY = statsY + (compact ? 48 : 54)
    card.add(this.add.text(0, controlsY, '← → / A D 移动   空格 跳跃   P 暂停', {
      fontFamily: FONT, fontSize: compact ? '10.5px' : '13px', color: '#7b5a3c',
    }).setOrigin(0.5))
    card.add(this.add.text(0, controlsY + (compact ? 22 : 26), '手机：使用底部按钮，双指可同时移动与跳跃', {
      fontFamily: FONT, fontSize: compact ? '9.5px' : '12px', color: '#9a8370',
    }).setOrigin(0.5))

    const btnY = ch / 2 - (compact ? 72 : 78)
    this.addButton(card, 0, btnY, Math.min(compact ? 260 : 300, cw - 80), compact ? 48 : 54, '开始配送  ▶', 'primary', () => bus.emit(EV.start))
    card.add(this.add.text(0, ch / 2 - 22, '收集 3 件 → 送达终点    ·    Enter / 空格 开始', {
      fontFamily: FONT, fontSize: compact ? '9.5px' : '12px', color: '#8b7763',
    }).setOrigin(0.5))
  }

  private buildPauseContent(card: Phaser.GameObjects.Container, cw: number, ch: number, portrait: boolean, d: HudData) {
    const top = -ch / 2
    const compact = cw < 420
    card.add(this.add.text(0, top + 32, '配送暂停', {
      fontFamily: FONT, fontSize: compact ? '11px' : '12px', color: '#b26b35', fontStyle: 'bold',
    }).setOrigin(0.5))
    card.add(this.add.text(0, top + 72, '暂停中', {
      fontFamily: FONT, fontSize: compact ? '36px' : '44px', color: '#142f42', fontStyle: 'bold',
    }).setOrigin(0.5))
    card.add(this.add.text(0, top + 108, '计时、机器人、移动平台与无敌时间都已冻结', {
      fontFamily: FONT, fontSize: compact ? '12px' : '14px', color: '#5b7785',
    }).setOrigin(0.5))
    const mm = Math.floor(Math.ceil(d.timeLeft) / 60)
    const ss = Math.ceil(d.timeLeft) % 60
    const rows: Array<[string, string]> = [
      ['剩余时间', `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`],
      ['已收快递', `${d.parcels} / 3`],
      ['剩余生命', `${d.lives} / 3`],
    ]
    const rowW = Math.min(400, cw - 70)
    const rowX = -rowW / 2
    let y = top + 154
    rows.forEach((r, i) => {
      const g = this.add.graphics()
      g.fillStyle(i % 2 === 0 ? 0xf3e4ca : 0xf8eddb, 1).fillRoundedRect(rowX, y, rowW, 42, 8)
      card.add(g)
      card.add(this.add.text(rowX + 16, y + 21, r[0], {
        fontFamily: FONT, fontSize: '13px', color: '#6d5a45',
      }).setOrigin(0, 0.5))
      card.add(this.add.text(rowX + rowW - 16, y + 21, r[1], {
        fontFamily: FONT, fontSize: '17px', color: '#143246', fontStyle: 'bold',
      }).setOrigin(1, 0.5))
      y += 48
    })
    const btnY = ch / 2 - 82
    const bw = Math.min(180, (cw - 76) / 2)
    this.addButton(card, -bw / 2 - 8, btnY, bw, 48, '继续配送', 'primary', () => {
      if (this.last?.state === 'paused') bus.emit(EV.pauseToggle)
    })
    this.addButton(card, bw / 2 + 8, btnY, bw, 48, '重新开始', 'ghost', () => bus.emit(EV.restart))
    card.add(this.add.text(0, ch / 2 - 24, 'P / ESC 继续    ·    重新开始会重置本单进度', {
      fontFamily: FONT, fontSize: '11px', color: '#8b7763',
    }).setOrigin(0.5))
  }

  private buildResultContent(card: Phaser.GameObjects.Container, cw: number, ch: number, portrait: boolean, d: HudData) {
    const top = -ch / 2
    const compact = cw < 420
    const won = d.state === 'won'
    card.add(this.add.text(0, top + 30, won ? 'DELIVERED  ·  本单完成' : 'DELIVERY  FAILED  ·  本单失败', {
      fontFamily: FONT, fontSize: compact ? '10px' : '12px', color: won ? '#a96524' : '#a04d4d', fontStyle: 'bold',
    }).setOrigin(0.5))
    card.add(this.add.text(0, top + 74, won ? '送达成功！' : '配送失败', {
      fontFamily: FONT, fontSize: compact ? '38px' : '48px', color: won ? '#143246' : '#7f2f35', fontStyle: 'bold',
    }).setOrigin(0.5))
    if (won) {
      for (let i = 0; i < 3; i++) {
        const px = -50 + i * 50
        const parcel = this.add.image(px, top + 128, 'parcel').setDisplaySize(30, 30)
        card.add(parcel)
        const check = this.add.graphics()
        check.fillStyle(0x39b7ac, 1).fillCircle(px + 13, top + 114, 8)
        check.lineStyle(2, 0xffffff, 1)
        check.beginPath(); check.moveTo(px + 9, top + 114); check.lineTo(px + 12, top + 118); check.lineTo(px + 18, top + 110); check.strokePath()
        card.add(check)
      }
    }
    const reasonY = won ? top + 150 : top + 120
    const reason = this.add.text(0, reasonY, d.reason || (won ? '成功送达全部快递。' : '本单未能完成。'), {
      fontFamily: FONT, fontSize: compact ? '13px' : '15px', color: '#3c5a6a', align: 'center', lineSpacing: 5,
      wordWrap: { width: cw - 80, useAdvancedWrap: true },
    }).setOrigin(0.5, 0)
    card.add(reason)

    const statsY = won ? top + 214 : top + 186
    const t = won ? d.elapsed : ROUND_SECONDS - d.timeLeft
    const mm = Math.floor(t / 60)
    const ss = Math.floor(t % 60)
    const rows: Array<[string, string]> = won
      ? [['剩余生命', `${d.lives} / 3`], ['送达快递', '3 / 3'], ['通关用时', `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`]]
      : [['坚持时间', `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`], ['送达快递', `${d.parcels} / 3`], ['剩余生命', `${d.lives} / 3`]]
    const rowW = Math.min(420, cw - 60)
    const rowX = -rowW / 2
    rows.forEach((r, i) => {
      const x = rowX + (rowW / 3) * i
      const g = this.add.graphics()
      g.fillStyle(0xf3e4ca, 1).fillRoundedRect(x + 3, statsY, rowW / 3 - 6, 54, 8)
      card.add(g)
      card.add(this.add.text(x + rowW / 6, statsY + 18, r[0], {
        fontFamily: FONT, fontSize: compact ? '10px' : '11px', color: '#7c6650',
      }).setOrigin(0.5))
      card.add(this.add.text(x + rowW / 6, statsY + 38, r[1], {
        fontFamily: FONT, fontSize: compact ? '15px' : '17px', color: '#143246', fontStyle: 'bold',
      }).setOrigin(0.5))
    })
    if (!won) {
      const tip = this.add.text(0, statsY + 70, '提示：先集齐 3 件快递，再进入终点快递站；\n注意巡逻机器人和地面尖刺。', {
        fontFamily: FONT, fontSize: compact ? '11px' : '12px', color: '#8a7058', align: 'center', lineSpacing: 4,
      }).setOrigin(0.5, 0)
      card.add(tip)
    }
    const btnY = ch / 2 - 66
    this.addButton(card, 0, btnY, Math.min(280, cw - 100), 52, won ? '再来一单' : '再试一次', 'primary', () => bus.emit(EV.restart))
    card.add(this.add.text(0, ch / 2 - 20, 'Enter / 空格 立即重试    ·    重新开始会重置本单进度', {
      fontFamily: FONT, fontSize: compact ? '10px' : '11px', color: '#8b7763',
    }).setOrigin(0.5))
  }

  private addButton(
    card: Phaser.GameObjects.Container, x: number, y: number, w: number, h: number,
    label: string, kind: 'primary' | 'ghost', onClick: () => void,
  ) {
    const c = this.add.container(x, y)
    const g = this.add.graphics()
    if (kind === 'primary') {
      g.fillStyle(0x0f2b3c, 0.28).fillRoundedRect(-w / 2 + 2, -h / 2 + 5, w, h, 16)
      g.fillStyle(0xff8a3d, 1).fillRoundedRect(-w / 2, -h / 2, w, h, 16)
      g.fillStyle(0xffab5f, 1).fillRoundedRect(-w / 2 + 3, -h / 2 + 3, w - 6, h * 0.52, { tl: 13, tr: 13, bl: 6, br: 6 })
      g.lineStyle(2, 0xb9531d, 0.8).strokeRoundedRect(-w / 2, -h / 2, w, h, 16)
    } else {
      g.fillStyle(0xf3e4ca, 1).fillRoundedRect(-w / 2, -h / 2, w, h, 16)
      g.lineStyle(2, 0xbda37b, 1).strokeRoundedRect(-w / 2, -h / 2, w, h, 16)
    }
    const t = this.add.text(0, 0, label, {
      fontFamily: FONT, fontSize: '17px', color: kind === 'primary' ? '#fff8e9' : '#5a4532', fontStyle: 'bold',
    }).setOrigin(0.5)
    if (kind === 'primary') t.setShadow(0, 2, 'rgba(120,49,10,0.4)', 0)
    const zone = this.add.zone(0, 0, w, h).setOrigin(0.5).setInteractive({ useHandCursor: true })
    c.add([g, t, zone])
    card.add(c)
    zone.on('pointerover', () => c.setScale(1.035))
    zone.on('pointerout', () => c.setScale(1))
    zone.on('pointerdown', () => c.setScale(0.965))
    zone.on('pointerup', () => {
      c.setScale(1)
      onClick()
    })
    zone.on('pointerupoutside', () => c.setScale(1))
    return c
  }
}
