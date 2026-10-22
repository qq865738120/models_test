import Phaser from 'phaser'
import type { HudData } from './constants'

export const bus = new Phaser.Events.EventEmitter()

export const EV = {
  hud: 'hud',
  start: 'start-run',
  restart: 'restart-run',
  pauseToggle: 'pause-toggle',
  ctrlLeft: 'ctrl-left',
  ctrlRight: 'ctrl-right',
  ctrlJump: 'ctrl-jump',
  ctrlJumpUp: 'ctrl-jump-up',
  ctrlClear: 'ctrl-clear',
  toast: 'toast',
  state: 'state-change',
} as const

export type HudListener = (d: HudData) => void
