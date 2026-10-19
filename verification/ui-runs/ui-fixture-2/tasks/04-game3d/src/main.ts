import { Project, Scene3D, PhysicsLoader } from 'enable3d'
class EmptyScene extends Scene3D {
  constructor() { super({ key: 'empty' }) }
  async create() {
    await this.warpSpeed('-ground')
    // 仅用于确认 Three.js + Ammo 能启动，尚无车辆或游戏实现。
    this.physics.add.ground({ width: 20, height: 20 })
    this.camera.position.set(8, 8, 8)
    this.camera.lookAt(0, 0, 0)
  }
}
PhysicsLoader('./vendor/ammo', () => new Project({ scenes: [EmptyScene], antialias: true, parent: 'app' }))
