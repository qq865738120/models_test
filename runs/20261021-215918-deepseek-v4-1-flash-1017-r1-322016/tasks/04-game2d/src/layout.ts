import { DESIGN_W, DESIGN_H } from './constants'

export interface Layout {
  w: number
  h: number
  portrait: boolean
  game: { x: number; y: number; w: number; h: number }
  zoom: number
  hudH: number
  controlsH: number
  safe: number
  compact: boolean
}

export function computeLayout(w: number, h: number): Layout {
  const portrait = h > w * 1.06
  if (portrait) {
    const hudH = Math.round(Math.max(88, Math.min(112, h * 0.115)))
    const controlsH = Math.round(Math.max(158, Math.min(214, h * 0.215)))
    const gh = Math.max(240, h - hudH - controlsH)
    return {
      w, h, portrait,
      game: { x: 0, y: hudH, w, h: gh },
      zoom: gh / DESIGN_H,
      hudH, controlsH,
      safe: Math.round(Math.max(10, Math.min(18, w * 0.04))),
      compact: true,
    }
  }
  const zoom = Math.min(w / DESIGN_W, h / DESIGN_H)
  const gw = DESIGN_W * zoom
  const gh = DESIGN_H * zoom
  return {
    w, h, portrait: false,
    game: { x: Math.round((w - gw) / 2), y: Math.round((h - gh) / 2), w: gw, h: gh },
    zoom,
    hudH: 0,
    controlsH: 0,
    safe: Math.round(Math.max(12, Math.min(28, w * 0.025))),
    compact: w < 760,
  }
}
