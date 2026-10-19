import Phaser from 'phaser'
class EmptyScene extends Phaser.Scene {
  constructor() { super('empty') }
  create() {
    this.add.text(40, 40, 'Phaser 3 空白起始场景\n请读取 TASK.md 和 materials/。', { fontSize: '24px', color: '#ffffff' })
  }
}
new Phaser.Game({ type: Phaser.AUTO, parent: 'app', width: 1280, height: 720,
  backgroundColor: '#14243a', physics: { default: 'arcade', arcade: { gravity: { y: 900, x: 0 }, debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }, scene: [EmptyScene] })
