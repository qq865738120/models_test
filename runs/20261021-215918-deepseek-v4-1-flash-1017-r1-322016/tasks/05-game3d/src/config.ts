// Metric layout for the Pelican Forklift Academy. 1 unit = 1 meter, Y is up.
export const ROOM = {
  minX: -15, maxX: 15,
  minZ: -12, maxZ: 12,
  wallH: 7.6,
  wallT: 0.5,
}

export const CRATE = {
  w: 1.1,
  d: 1.0,
  h: 1.0,
  halfH: 0.5,
  bodyBottom: 0.12, // pallet skids lift the crate body, forks slide underneath
}

export type CrateColor = 'red' | 'yellow' | 'blue'

export const CRATE_INFO: Record<CrateColor, { label: string; zh: string; hex: string; dark: string }> = {
  red: { label: 'RED', zh: '红色', hex: '#c9463c', dark: '#7d231e' },
  yellow: { label: 'YELLOW', zh: '黄色', hex: '#dea62b', dark: '#8f6412' },
  blue: { label: 'BLUE', zh: '蓝色', hex: '#3b6ea8', dark: '#1f4066' },
}

// Forklift starts facing -Z (yaw = PI local-forward is +Z).
export const SPAWN = { x: -9.4, z: 4.6, yaw: Math.PI }
export const WHEELBASE = 1.65
export const CRATE_SPAWNS: { color: CrateColor; x: number; z: number }[] = [
  { color: 'red', x: -11.8, z: -1.2 },
  { color: 'yellow', x: -9.4, z: -1.2 },
  { color: 'blue', x: -7.0, z: -1.2 },
]
export const ZONES: { color: CrateColor; x: number; z: number; w: number; d: number }[] = [
  { color: 'red', x: 10.4, z: -4.6, w: 2.9, d: 2.9 },
  { color: 'yellow', x: 10.4, z: 0.4, w: 2.9, d: 2.9 },
  { color: 'blue', x: 10.4, z: 5.4, w: 2.9, d: 2.9 },
]

export const GAME_TIME = 120
export const LIFT_MAX = 1.75
export const LIFT_SPEED = 0.95
export const FORK_TOP_REST = 0.10
export const ATTACH_TOL = { lateral: 0.25, height: 0.15, angleDeg: 15, insertion: 0.3 }
export const RELEASE_LIFT = 0.05
export const DELIVERY = { stableSeconds: 0.5, maxBottom: 0.06, maxSpeed: 0.1 }

export type Zone = { color: CrateColor; x: number; z: number; w: number; d: number }
