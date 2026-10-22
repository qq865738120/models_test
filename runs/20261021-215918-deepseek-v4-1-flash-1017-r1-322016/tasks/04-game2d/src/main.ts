import Phaser from 'phaser'
import GameScene from './GameScene'
import UIScene from './UIScene'
import { GRAVITY } from './constants'

const useCanvas = typeof location !== 'undefined' && new URLSearchParams(location.search).get('renderer') === 'canvas'
const game = 
new Phaser.Game({
  type: useCanvas ? Phaser.CANVAS : Phaser.AUTO,
  parent: 'app',
  backgroundColor: '#0b1e2d',
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  render: { antialias: true, roundPixels: false, powerPreference: 'high-performance' },
  physics: { default: 'arcade', arcade: { gravity: { y: GRAVITY, x: 0 }, debug: false } },
  input: { activePointers: 3 },
  scene: [GameScene, UIScene],
})
;(window as unknown as Record<string, unknown>).__game = game
