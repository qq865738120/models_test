export const DESIGN_W = 1280
export const DESIGN_H = 720
export const WORLD_W = 3600
export const WORLD_H = 720
export const GROUND_Y = 620

export const GRAVITY = 900
export const MOVE_SPEED = 250
export const JUMP_VELOCITY = -560

export const ROUND_SECONDS = 120
export const START_LIVES = 3
export const INVULN_SECONDS = 0.8
export const JUMP_BUFFER_SECONDS = 0.13

export type GameState = 'ready' | 'playing' | 'paused' | 'won' | 'lost'

export interface HudData {
  state: GameState
  lives: number
  parcels: number
  timeLeft: number
  reason: string
  wonBy: string
  elapsed: number
}

export const FONT = "'Trebuchet MS', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif"

export const C = {
  ink: '#102b3c',
  cream: '#fff8e9',
  gold: '#ffcf63',
  orange: '#ff8a3d',
  coral: '#ef6473',
  teal: '#39b7ac',
  sky: '#8fd3e8',
  deep: '#123247',
  panel: 0x123247,
  panelLight: 0x1c4a63,
  creamHex: 0xfff8e9,
  goldHex: 0xffcf63,
  orangeHex: 0xff8a3d,
  coralHex: 0xef6473,
  tealHex: 0x39b7ac,
}
