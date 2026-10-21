import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

const KEYS=new Set(['LEFT','RIGHT','A','D','SPACE','W','S','Q','E','P','R','ENTER'])
const close=(a,b,tolerance=.01)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=tolerance
const assert=(condition,message)=>{if(!condition)throw Error(message)}
const distance=(a,b)=>Math.hypot(a.x-b.x,(a.y||0)-(b.y||0),(a.z||0)-(b.z||0))
const unique=values=>new Set(values).size===values.length
const stopped=error=>/Target (page, context or browser has been closed|closed)|page (has )?crash|browser.*disconnect/i.test(String(error?.message||error))

export function validateReplay(value){
 assert(value&&value.version===1&&Array.isArray(value.actions)&&value.actions.length>0&&value.actions.length<=7200,'replay.json 必须包含 version:1 和 1–7200 段 actions')
 let total=0
 for(const action of value.actions){
  assert(action&&Object.keys(action).every(key=>['frames','keys'].includes(key)),'重放动作只允许 frames 与 keys')
  assert(Number.isInteger(action.frames)&&action.frames>=1&&action.frames<=600,'单段重放必须为 1–600 帧')
  assert(Array.isArray(action.keys)&&action.keys.length<=KEYS.size&&unique(action.keys)&&action.keys.every(key=>KEYS.has(key)),'重放只能使用公开规范中的大写普通按键')
  total+=action.frames
 }
 assert(total<=7200,'重放总时长不得超过 7200 帧')
 return value.actions
}

/** Runs in the candidate page; only the public adapter is allowed to mutate game state. */
async function browserProbe({taskId,op,fixture,frames,keys}){
 const api=window.__pelicanEval
 if(!api||api.version!=='pelican-checks-1'||api.taskId!==taskId||
    !['snapshot','reset','advance'].every(key=>typeof api[key]==='function'))throw Error('缺少或不符合公开规范的 window.__pelicanEval 接口')
 if(op==='reset')await api.reset(fixture)
 if(op==='advance')await api.advance(frames,keys)
 const s=JSON.parse(JSON.stringify(await api.snapshot()))
 const scene=api.scene,roles={},duplicates=[],engine={}
 if(taskId==='04-game2d'){
  const arcade=scene?.physics?.world,matter=scene?.matter?.world
  const matterBodies=matter?.getAllBodies?.()||matter?.localWorld?.bodies||[]
  engine.valid=!!(scene?.sys?.game?.scene?.scenes?.includes(scene)&&scene.sys.displayList&&
   (arcade||matter)&&typeof scene.children?.getAll==='function'&&typeof scene.sys.game.step==='function')
  const seen=new Set()
  const visit=o=>{
   if(!o||seen.has(o))return
   seen.add(o)
   const role=o.getData?.('evalRole')
   if(role){
    if(roles[role])duplicates.push(role)
    const bounds=o.getBounds?.(),body=o.body,isMatter=!!(matter&&matterBodies.includes(body?.parent||body))
    roles[role]={x:o.x,y:o.y,visible:o.visible!==false&&o.active!==false,active:o.active!==false,
     bounds:bounds?{x:bounds.x,y:bounds.y,width:bounds.width,height:bounds.height,bottom:bounds.bottom,centerX:bounds.centerX}:null,
     physics:!!(body&&body.enable!==false&&(arcade&&body.world===arcade||isMatter)),
     body:body?{x:body.x??body.bounds?.min?.x,y:body.y??body.bounds?.min?.y,width:body.width??(body.bounds?.max?.x-body.bounds?.min?.x),height:body.height??(body.bounds?.max?.y-body.bounds?.min?.y),vx:body.velocity?.x*(isMatter?60:1),vy:body.velocity?.y*(isMatter?60:1),
      gravityY:body.gravity?.y,worldGravityY:body.world?.gravity?.y,onGround:!!(body.blocked?.down||body.touching?.down)}:null}
   }
   if(Array.isArray(o.list))o.list.forEach(visit)
  }
  scene?.children?.getAll?.().forEach(visit)
  if(matter&&roles.player?.body){
   const player=roles.player.bounds
   roles.player.body.onGround=!!(player&&Math.abs(roles.player.body.vy)<3&&Object.entries(roles).some(([role,platform])=>{
    const p=platform.bounds
    return /^(platform:|moving-platform:)/.test(role)&&platform.physics&&p&&Math.abs(player.bottom-p.y)<4&&player.x+player.width>p.x&&player.x<p.x+p.width
   }))
  }
  engine.objectCount=seen.size
  engine.worldWidth=arcade?.bounds?.width??scene?.cameras?.main?._bounds?.width
  engine.worldHeight=arcade?.bounds?.height??scene?.cameras?.main?._bounds?.height
 }else{
  engine.valid=!!(scene?.isScene&&scene.type==='Scene'&&scene.position?.isVector3&&
   scene.matrixWorld?.isMatrix4&&typeof scene.traverse==='function'&&typeof scene.updateMatrixWorld==='function')
  if(engine.valid){
   scene.updateMatrixWorld(true)
   const objects=[],geometries=new Set(),textures=new Set()
   scene.traverse(o=>{objects.push(o);if(o.geometry)geometries.add(o.geometry);for(const material of [o.material].flat().filter(Boolean))for(const v of Object.values(material))if(v?.isTexture)textures.add(v)})
   const vehicle=objects.find(o=>o.userData?.evalRole==='vehicle')
   const bounds=(o,localRoot=null)=>{
    const result={min:{x:Infinity,y:Infinity,z:Infinity},max:{x:-Infinity,y:-Infinity,z:-Infinity}}
    let count=0
    o.traverse(child=>{
     if(!child.geometry)return
     child.geometry.computeBoundingBox?.()
     const box=child.geometry.boundingBox;if(!box)return
     for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
      const point=scene.position.clone().set(x,y,z).applyMatrix4(child.matrixWorld)
      if(localRoot)localRoot.worldToLocal(point)
      for(const axis of ['x','y','z']){result.min[axis]=Math.min(result.min[axis],point[axis]);result.max[axis]=Math.max(result.max[axis],point[axis])}
     }
     count++
    })
    return count?{...result,width:result.max.x-result.min.x,height:result.max.y-result.min.y,depth:result.max.z-result.min.z}:null
   }
   for(const o of objects){
    const role=o.userData?.evalRole;if(!role)continue
    if(roles[role])duplicates.push(role)
    const position=o.getWorldPosition(scene.position.clone()),local=vehicle?vehicle.worldToLocal(position.clone()):position
    const parents=[];for(let parent=o.parent;parent;parent=parent.parent)if(parent.userData?.evalRole)parents.push(parent.userData.evalRole)
    let axle=null
    if(role.startsWith('wheel-')&&vehicle){
     const box=bounds(o,o),axis=box?['width','height','depth'].reduce((a,b)=>box[a]<box[b]?a:b):'width'
     const vector=scene.position.clone().set(axis==='width'?1:0,axis==='height'?1:0,axis==='depth'?1:0)
     const relative=vehicle.getWorldQuaternion(vehicle.quaternion.clone()).invert().multiply(o.getWorldQuaternion(o.quaternion.clone()))
     vector.applyQuaternion(relative);axle={x:vector.x,y:vector.y,z:vector.z}
    }
    let physicsPosition=null
    try{const origin=o.body?.ammo?.getWorldTransform?.().getOrigin?.();if(origin)physicsPosition={x:origin.x(),y:origin.y(),z:origin.z()}}catch{}
    roles[role]={x:position.x,y:position.y,z:position.z,local:{x:local.x,y:local.y,z:local.z},
     rotation:{x:o.rotation.x,y:o.rotation.y,z:o.rotation.z},quaternion:o.quaternion.toArray(),
     parents,axle,visible:o.visible!==false,bounds:bounds(o),collider:o.userData?.evalColliderSize||null,
     physics:!!o.body,physicsPosition}
   }
   engine.objectCount=objects.length;engine.geometries=geometries.size;engine.textures=textures.size
   const camera=api.camera
   if(camera?.isCamera&&camera.projectionMatrix?.isMatrix4&&typeof camera.getWorldDirection==='function'){
    camera.updateMatrixWorld(true)
    const position=camera.getWorldPosition(scene.position.clone()),direction=camera.getWorldDirection(scene.position.clone())
    engine.camera={x:position.x,y:position.y,z:position.z,direction:{x:direction.x,y:direction.y,z:direction.z}}
   }
  }
 }
 const hud={}
 for(const id of taskId==='04-game2d'?['hud-lives','hud-collected','hud-time']:['hud-time','hud-delivered','hud-cargo']){
  const node=document.querySelector(`[data-testid="${id}"]`),rect=node?.getBoundingClientRect()
  hud[id]={text:node?.textContent?.trim()??null,visible:!!(rect?.width&&rect?.height&&getComputedStyle(node).visibility!=='hidden')}
 }
 return {s,roles,engine,duplicates,hud}
}

export function validateObservation(o,taskId){
 assert(o?.engine?.valid,'未发现真实注册的 Phaser 物理场景或 THREE.Scene')
 assert(o.duplicates.length===0,`evalRole 不唯一：${o.duplicates.join(', ')}`)
 const s=o.s
 assert(['ready','playing','paused','won','lost'].includes(s.mode),'snapshot.mode 无效')
 assert(Number.isFinite(s.remainingMs)&&s.remainingMs>=0&&s.remainingMs<=120001,'倒计时不是有效的 0–120000 毫秒')
 if(taskId==='04-game2d'){
  const p=o.roles.player
  assert(p?.bounds&&(['won','lost'].includes(s.mode)||p.visible&&p.physics),'角色不是可见、启用的真实物理对象')
  assert(close(s.player?.x,p.bounds.centerX,6)&&close(s.player?.y,p.bounds.bottom,6),'snapshot 角色底部中心与实际画面对象不一致')
  assert(close(s.player?.vx,p.body.vx,3)&&close(s.player?.vy,p.body.vy,3),'snapshot 速度与物理 body 不一致')
  assert(Number.isInteger(s.lives)&&s.lives>=0&&s.lives<=3,'生命值无效')
  assert(Array.isArray(s.collected)&&unique(s.collected)&&s.collected.every(id=>['c1','c2','c3'].includes(id)),'快递集合无效或重复')
  for(const id of ['c1','c2','c3']){
   const parcel=o.roles[`package:${id}`]
   assert(parcel,`缺少真实快递对象 ${id}`)
   if(s.collected.includes(id))assert(!parcel.visible||!parcel.active||!parcel.physics,`${id} 声称已收集但仍是活动可拾取对象`)
  }
 }else{
  const vehicle=o.roles.vehicle
  assert(vehicle?.visible&&vehicle.bounds,'缺少可见车辆几何')
  assert(distance(s.vehicle||{},vehicle)<.08,'snapshot 车辆位置与真实 THREE 对象不一致')
  assert(Array.isArray(s.boxes)&&s.boxes.length===3&&unique(s.boxes.map(b=>b.id)),'箱子状态必须恰有三个唯一ID')
  for(const box of s.boxes){
   const rendered=o.roles[`box:${box.id}`]
   assert(rendered?.visible&&rendered.bounds,`缺少可见货箱 ${box.id}`)
   assert(distance(box,rendered)<.08,`${box.id} 状态与真实对象位置不一致`)
   assert(close(box.bottomY,rendered.bounds.min.y,.08),`${box.id} 箱底与真实几何不一致`)
   if(rendered.physicsPosition)assert(distance(rendered,rendered.physicsPosition)<.12,`${box.id} 可见模型与物理刚体脱离`)
  }
  assert(Array.isArray(s.delivered)&&unique(s.delivered)&&s.delivered.every(id=>['red','blue','yellow'].includes(id)),'交付集合无效或重复')
 }
 return o
}

function stableGame(a,b,taskId){
 assert(a.s.mode===b.s.mode&&close(a.s.remainingMs,b.s.remainingMs,1),'暂停/结算时模式或计时发生变化')
 const keys=taskId==='04-game2d'?['player','moving-platform:m1','robot:r1','robot:r2']:['vehicle','carriage','fork-left','fork-right','box:red','box:blue','box:yellow']
 for(const key of keys)assert(a.roles[key]&&b.roles[key]&&distance(a.roles[key],b.roles[key])<(taskId==='04-game2d'?.5:.005),`暂停/结算时 ${key} 仍在移动`)
 if(taskId==='04-game2d'){
  assert(a.s.lives===b.s.lives&&JSON.stringify(a.s.collected)===JSON.stringify(b.s.collected),'暂停/结算仍改变生命或快递')
  assert(close(a.s.invulnerableMs,b.s.invulnerableMs,1),'暂停仍消耗无敌时间')
 }else assert(JSON.stringify(a.s.delivered)===JSON.stringify(b.s.delivered),'暂停/结算仍新增交付')
}

export function validateHUD(o,taskId){
 const expected=taskId==='04-game2d'
  ?{'hud-lives':String(o.s.lives),'hud-collected':String(o.s.collected.length),'hud-time':String(Math.ceil(o.s.remainingMs/1000))}
  :{'hud-delivered':String(o.s.delivered.length),'hud-cargo':o.s.heldBox??'none','hud-time':String(Math.ceil(o.s.remainingMs/1000))}
 for(const [id,text] of Object.entries(expected))assert(o.hud?.[id]?.visible&&o.hud[id].text===text,`${id} 未可见显示真实状态：预期 ${text}，实际 ${o.hud?.[id]?.text??'缺失'}`)
}

/** page must already be loaded offline with ?eval=1; root is the archived output directory. */
export async function checkGame(page,{taskId,phase='initial',root}){
 assert(['04-game2d','05-game3d'].includes(taskId),'checkGame 仅接受两道游戏')
 const checks=[];let unavailable=null,driverTimedOut=false
 const change=phase==='change',is2d=taskId==='04-game2d'
 const map=is2d
  ?{engine:'delivery',control:change?'feedback':'control',platform:change?'feedback':'platform',damage:'damage',goal:change?'feedback':'goal',states:'states',accessibility:change?'feedback':'accessibility',fragile:'fragile',speed:'speed'}
  :{engine:change?'delivery':'runtime',dimensions:change?'dimensions':'linkage',linkage:change?'alignment':'linkage',driving:change?'handling':'driving',handling:'handling',goal:change?'handling':'delivery_rule',states:change?'regression':'experience',resources:change?'regression':'runtime'}
 const probe=async(op='observe',arg={})=>{
  if(driverTimedOut)throw Error('游戏测试驱动此前已超时，后续检查无法取得有效证据')
  let timer
  try{
   const observation=await Promise.race([
    page.evaluate(browserProbe,{taskId,op,...arg}),
    new Promise((_,reject)=>{timer=setTimeout(()=>{driverTimedOut=true;reject(Error('游戏测试驱动超过 8 秒未返回'))},8000)}),
   ])
   return validateObservation(observation,taskId)
  }finally{clearTimeout(timer)}
 }
 const reset=fixture=>probe('reset',{fixture})
 const step=(frames,keys=[])=>probe('advance',{frames,keys})
 const run=async(id,dimension,fn)=>{
  if(unavailable){checks.push({id:`game.${id}`,dimensionId:map[dimension],passed:null,message:unavailable});return}
  try{const message=await fn();checks.push({id:`game.${id}`,dimensionId:map[dimension],passed:true,message:message||'实际引擎、状态与输入检查通过'})}
  catch(error){
   if(stopped(error)||page.isClosed?.())unavailable='浏览器页面或执行上下文已关闭/崩溃，需恢复环境后重新核验'
   checks.push({id:`game.${id}`,dimensionId:map[dimension],passed:unavailable?null:false,message:unavailable||String(error?.message||error)})
  }
 }
 await run('engine','engine',async()=>{
  const o=await reset('default')
  assert(o.s.mode==='ready'&&close(o.s.remainingMs,120000,1),'default 未恢复开始界面和 120 秒')
  if(is2d){
   for(const role of ['moving-platform:m1','robot:r1','robot:r2','hazard:0','exit',...Array.from({length:6},(_,i)=>`platform:${i}`)])assert(o.roles[role],`缺少关卡真实对象 ${role}`)
   assert(close(o.engine.worldWidth,2400,1)&&close(o.engine.worldHeight,720,1),'物理世界边界改变')
  }else{
   for(const role of ['body','cab','driver','mast','carriage','fork-left','fork-right','wheel-fl','wheel-fr','wheel-rl','wheel-rr','zone:red','zone:blue','zone:yellow'])assert(o.roles[role]?.bounds,`缺少可见真实几何 ${role}`)
   assert(o.s.boxes.every(b=>o.roles[`box:${b.id}`].physics),'货箱未连接实际物理刚体')
  }
  return '公开测试接口连接真实引擎，snapshot 与可见对象/物理状态一致'
 })
 if(is2d){
  await run('movement','control',async()=>{
   const a=await reset('grounded'),b=await step(30,['RIGHT'])
   assert(b.s.player.x-a.s.player.x>60&&close(b.s.moveSpeed,240,1),'向右移动未达到规定基础速度')
   const c=await step(20,['LEFT'])
   assert(c.s.player.x<b.s.player.x-30,'向左输入未驱动真实角色')
   assert(close(a.s.jumpSpeed,480,1),'跳跃参数不是 480px/s')
   return '左右输入改变实际角色位置，基础速度/跳跃参数正确'
  })
  await run('jump','control',async()=>{
   await reset('grounded');const a=await step(1,['SPACE']);const b=await step(8)
   assert(a.s.player.vy<0&&b.s.player.y<a.s.player.y-15,'实体平台上无法起跳')
   const c=await step(1,['SPACE'])
   assert(c.s.player.vy>=b.s.player.vy-2,'空中再次按跳跃重新施加了向上速度')
   await reset('airborne');const d=await step(1,['SPACE'])
   assert(d.s.player.vy>=0,'未落地角色可以空中起跳')
   return '地面可跳跃，空中再次输入不会连跳'
  })
  await run('fixed-platforms','platform',async()=>{
   const o=await reset('grounded')
   const expected=[[0,660,960,60],[1160,660,1240,60],[320,560,240,24],[1160,580,180,24],[1660,480,200,24],[1990,560,190,24]]
   expected.forEach(([x,y,width,height],i)=>{
    const p=o.roles[`platform:${i}`],b=p?.bounds
    assert(p?.physics&&b&&close(b.x,x,3)&&close(b.y,y,3)&&close(b.width,width,3)&&close(b.height,height,3),`platform:${i} 布局或真实物理体不符`)
   })
   await step(1,['SPACE']);const landed=await step(90)
   assert(landed.s.player.onGround&&landed.roles.player.body.onGround,'跳起后未落回实体平台')
   return '固定平台尺寸/位置保持，实际物理跳跃后能落地'
  })
  await run('moving-platform','platform',async()=>{
   const a=await reset('moving-platform'),offset=a.s.player.x-a.roles['moving-platform:m1'].bounds.centerX
   let moved=false,firstX=a.roles['moving-platform:m1'].x,last=a
   for(let i=0;i<12;i++){
    last=await step(30);const platform=last.roles['moving-platform:m1']
    assert(platform.physics&&last.s.player.onGround,'移动平台不是可承载实体或角色脱落')
    assert(close(last.s.player.x-platform.bounds.centerX,offset,10),'角色未随移动平台同步移动')
    assert(close(last.s.player.y,platform.bounds.y,8),'角色穿入或悬浮于移动平台')
    moved||=Math.abs(platform.x-firstX)>60
   }
   assert(moved&&close(last.roles['moving-platform:m1'].x,firstX,15),'平台未完成规定 6 秒往返')
   const jumped=await step(1,['SPACE']);assert(jumped.s.player.vy<0,'无法从移动平台起跳')
   return '移动平台完整往返承载角色，随后可以起跳'
  })
  await run('damage-invulnerability','damage',async()=>{
   await reset('hazard');const hurt=await step(1)
   assert(hurt.s.lives===2&&hurt.s.invulnerableMs>740&&hurt.s.invulnerableMs<=801,'首次有效接触未扣一命并开始 0.8 秒无敌')
   const safe=await step(30)
   assert(safe.s.lives===2&&close(hurt.s.invulnerableMs-safe.s.invulnerableMs,500,35),'无敌期重复扣血或无敌时间未按物理帧消耗')
   return '真实危险区触发一次伤害；持续半秒内不重复扣血，无敌倒计时正确'
  })
  await run('robot-patrol-contact','damage',async()=>{
   const limits={r1:{min:610,max:890,speed:70},r2:{min:1880,max:2210,speed:90}}
   let previous=await reset('grounded')
   const travels={r1:0,r2:0},ranges={r1:[],r2:[]}
   for(let i=0;i<20;i++){
    const current=await step(30)
    for(const [id,limit] of Object.entries(limits)){
     const role=`robot:${id}`,robot=current.roles[role],x=robot?.bounds?.centerX
     assert(robot?.physics&&Number.isFinite(x),`${id} 未使用真实活动物理对象巡逻`)
     assert(x>=limit.min-3&&x<=limit.max+3,`${id} 越过规定巡逻端点`)
     const delta=Math.abs(x-previous.roles[role].bounds.centerX)
     assert(delta<=limit.speed*.5+3,`${id} 实际移动速度超过布局值`)
     travels[id]+=delta;ranges[id].push(x)
    }
    previous=current
   }
   for(const [id,limit] of Object.entries(limits)){
    assert(travels[id]>=limit.speed*10*.75&&Math.max(...ranges[id])-Math.min(...ranges[id])>=(limit.max-limit.min)*.8,`${id} 没有按规定速度和范围持续往返`)
   }
   let before=await reset('grounded'),hurt
   for(let i=0;i<300;i++){
    const current=await step(1,['RIGHT'])
    if(current.s.lives<before.s.lives){hurt=current;break}
    before=current
   }
   assert(hurt?.s.lives===2,'普通向右输入没有触发机器人接触伤害')
   const physicalBounds=role=>Number.isFinite(role.body?.width)?role.body:role.bounds
   const player=physicalBounds(before.roles.player),robot=physicalBounds(before.roles['robot:r1'])
   assert(player.x+player.width>=robot.x-8&&player.x<=robot.x+robot.width+8&&player.y+player.height>=robot.y-8&&player.y<=robot.y+robot.height+8,'首次伤害前没有实际机器人接触证据')
   assert(player.x+player.width<physicalBounds(before.roles['hazard:0']).x-2,'首次伤害同时接触危险区，无法确认机器人伤害')
   assert(hurt.s.invulnerableMs>740&&hurt.s.invulnerableMs<=801,'机器人伤害没有启动 0.8 秒无敌')
   return '两个真实机器人按布局速度和端点往返，普通输入接触 r1 扣一命并进入无敌'
  })
  await run('fall','damage',async()=>{
   await reset('fall');const o=await step(1)
   assert(o.s.lives===2&&close(o.s.player.x,100,5)&&o.s.player.y<=662,'完全越出下界后未扣一命回起点')
   const carried=await reset('fall-with-parcel');assert(carried.s.collected.includes('c1'),'fall-with-parcel 未经过生产拾取建立 c1 前置条件')
   const current=await step(1)
   assert(current.s.lives===2&&current.s.player.x<150&&current.s.collected.includes('c1')&&current.s.remainingMs<=carried.s.remainingMs&&carried.s.remainingMs-current.s.remainingMs<35,'携带普通快递掉落后，生命/起点/收集进度或剩余时间错误')
   return '完全掉落扣命复位，携带普通快递掉落保留 c1 及剩余时间'
  })
  await run('life-exhaustion','states',async()=>{
   await reset('hazard');let o=await step(1)
   for(let i=0;i<120&&o.s.mode==='playing';i++){
    const x=o.s.player.x
    o=await step(10,x<865?['RIGHT']:x>885?['LEFT']:[])
   }
   assert(o.s.lives===0&&o.s.mode==='lost','在危险区反复有效受伤耗尽生命后未失败')
   stableGame(o,await step(30,['RIGHT','SPACE']),taskId)
   return '正常输入返回危险区并耗尽生命后失败，结算停止操作'
  })
  await run('collect-exit','goal',async()=>{
   for(const id of ['c1','c2','c3']){
    await reset(`package:${id}`);const a=await step(1),b=await step(15)
    assert(a.s.collected.includes(id)&&b.s.collected.filter(item=>item===id).length===1,`${id} 未拾取或重复计数`)
   }
   await reset('exit');const o=await step(60)
   assert(o.s.mode!=='won'&&o.s.collected.length===0,'未集齐进入出口也获得胜利')
   return '三份快递各自真实拾取且不重复，空手进入出口不会胜利'
  })
  await run('keyboard-aliases','accessibility',async()=>{
   const start=await reset('grounded'),right=await step(10,['D'])
   assert(right.s.player.x>start.s.player.x+10,'D 未实现向右操作')
   const left=await step(10,['A']);assert(left.s.player.x<right.s.player.x-10,'A 未实现向左操作')
   return 'A/D 与方向键路径都能操作真实游戏角色'
  })
  await run('mobile-touch','accessibility',async()=>{
   const viewport=page.viewportSize();let session
   try{
    await page.setViewportSize({width:390,height:844})
    const start=await reset('grounded')
    const targets=await page.evaluate(()=>{
     const scene=window.__pelicanEval.scene,canvas=scene.sys.game.canvas,canvasRect=canvas.getBoundingClientRect()
     const getTarget=role=>{
      const dom=document.querySelector(`[data-testid="${role}"]`)
      if(dom){
       const r=dom.getBoundingClientRect(),style=getComputedStyle(dom)
       if(r.width>0&&r.height>0&&style.visibility!=='hidden'&&style.display!=='none')return {x:r.left+r.width/2,y:r.top+r.height/2}
      }
      const all=[];const visit=o=>{all.push(o);if(Array.isArray(o.list))o.list.forEach(visit)};scene.children.getAll().forEach(visit)
      const object=all.find(o=>o.getData?.('evalRole')===role&&o.visible!==false&&o.active!==false&&o.input?.enabled)
      if(!object)return null
      const bounds=object.getBounds(),camera=scene.cameras.main
      const x=(bounds.centerX-camera.scrollX*(object.scrollFactorX??1))*camera.zoom+camera.x
      const y=(bounds.centerY-camera.scrollY*(object.scrollFactorY??1))*camera.zoom+camera.y
      return {x:canvasRect.left+x*canvasRect.width/canvas.width,y:canvasRect.top+y*canvasRect.height/canvas.height}
     }
     return Object.fromEntries(['touch-left','touch-right','touch-jump'].map(role=>[role,getTarget(role)]))
    })
    for(const [role,target] of Object.entries(targets))assert(target&&target.x>=0&&target.x<=390&&target.y>=0&&target.y<=844,`${role} 在手机画面中不可操作`)
    session=await page.context().newCDPSession(page)
    const touch=(type,points)=>session.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(([id,target])=>({id,x:target.x,y:target.y,radiusX:4,radiusY:4,force:1}))})
    await touch('touchStart',[[1,targets['touch-right']]])
    const moving=await step(10)
    assert(moving.s.player.x>start.s.player.x+10,'手机右键没有移动真实角色')
    await touch('touchStart',[[1,targets['touch-right']],[2,targets['touch-jump']]])
    const jumping=await step(8)
    assert(jumping.s.player.x>moving.s.player.x+10&&jumping.s.player.y<moving.s.player.y-10,'右移与跳跃双触点无法同时生效')
    await touch('touchEnd',[])
    const released=await step(5)
    assert(Math.abs(released.s.player.vx)<2,'松开触控后横向输入粘住')
    await reset('grounded')
    await touch('touchStart',[[1,targets['touch-left']]])
    const left=await step(5);assert(left.s.player.vx<0,'手机左键无效')
    await touch('touchMove',[[1,{x:195,y:10}]])
    const outside=await step(5);assert(Math.abs(outside.s.player.vx)<2,'移出触控按钮后仍持续移动')
    await touch('touchEnd',[])
    return '390×844 中左右/跳跃可达，双触点移动跳跃生效，释放与移出均不粘键'
   }finally{
    if(session){await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}).catch(()=>{});await session.detach().catch(()=>{})}
    if(viewport)await page.setViewportSize(viewport)
   }
  })
  await run('hud','accessibility',async()=>{
   await reset('grounded');validateHUD(await step(60),taskId)
   await reset('package:c1');validateHUD(await step(1),taskId)
   await reset('hazard');validateHUD(await step(1),taskId)
   return '可见 HUD 的生命、收集数量与向上取整秒数随真实状态更新'
  })
  if(change){
   await run('fragile-return','fragile',async()=>{
    await reset('hurt-with-parcel');const o=await step(1)
    assert(o.s.lives===2&&o.s.collected.includes('c1')&&!o.s.collected.includes('c2'),'有效伤害后未仅丢失 c2 并保留 c1')
    const parcel=o.roles['package:c2']
    assert(parcel.visible&&close(parcel.bounds.centerX,1760,6)&&close(parcel.bounds.bottom,458,6),'易碎快递未回原始位置')
    const safe=await step(20)
    assert(safe.s.lives===2&&safe.s.collected.includes('c1')&&!safe.s.collected.includes('c2'),'无敌期再次改变生命或普通快递')
    return '有效伤害让 c2 回原位，c1 保留，无敌期无重复丢失'
   })
   await run('fragile-speed','speed',async()=>{
    const base=await reset('grounded')
    await reset('package:c2');const held=await step(1)
    assert(close(held.s.moveSpeed,base.s.moveSpeed*.75,1)&&close(held.s.jumpSpeed,base.s.jumpSpeed,1),'携带速度不是基础 75% 或跳跃参数改变')
    await reset('hurt-with-parcel');const lost=await step(1)
    assert(close(lost.s.moveSpeed,base.s.moveSpeed,1),'丢失后未恢复基础速度')
    await reset('package:c2');const again=await step(2)
    assert(close(again.s.moveSpeed,base.s.moveSpeed*.75,1),'再次拾取的速度错误')
    return '携带 75% 速度、丢失恢复基础速度，跳跃参数不变'
   })
   await run('fragile-fall','fragile',async()=>{
    await reset('package:c2');let o=await step(1)
    assert(o.s.collected.includes('c2'),'易碎快递未拾取')
    for(let i=0;i<60&&o.s.lives===3;i++)o=await step(10,['LEFT'])
    const parcel=o.roles['package:c2']
    assert(o.s.lives===2&&!o.s.collected.includes('c2')&&parcel.visible&&close(parcel.bounds.centerX,1760,6)&&close(parcel.bounds.bottom,458,6),'携带 c2 正常走出地图缺口后未扣命/归位')
    assert(close(o.s.moveSpeed,240,1),'携带掉落后速度没有恢复')
    return '携带 c2 通过普通左移走出缺口后归位，扣一命并恢复基础速度'
   })
  }
 }else{
  const vehicleWidth=change?1.68:1.4
  let raise='E',lower='Q'
  const liftKeys=async()=>{
   const start=await reset('driving'),e=await step(20,['E'])
   if(e.s.forkHeight>start.s.forkHeight+.05){raise='E';lower='Q';return}
   await reset('driving');const q=await step(20,['Q'])
   assert(q.s.forkHeight>start.s.forkHeight+.05,'Q/E 均未使货叉实际升起')
   raise='Q';lower='E'
  }
  await run('dimensions','dimensions',async()=>{
   const o=await reset('default'),v=o.s.vehicle,collider=o.roles.body.collider||o.roles.vehicle.collider
   assert(close(v.width,vehicleWidth,.005)&&close(v.length,2.6,.005)&&close(v.height,2.2,.005),'车辆宽/长/高参数不符合本阶段规定')
   assert(collider&&close(collider.width,vehicleWidth,.05),'主车体碰撞宽度与规定车宽不同')
   assert(o.roles.vehicle.bounds.width>=vehicleWidth*.85&&o.roles.vehicle.bounds.width<=vehicleWidth*1.3,'实际几何宽度与声明参数不相符')
   for(const box of o.s.boxes){const role=o.roles[`box:${box.id}`];assert(close(role.bounds.width,1.2,.05)&&close(role.bounds.height,1.2,.05)&&close(role.bounds.depth,1.2,.05),'货箱尺寸发生变化')}
   return `真实车体及碰撞宽度符合 ${vehicleWidth} 米，车长/高和货箱尺寸保持`
  })
  await run('linkage','linkage',async()=>{
   const a=await reset('driving'),b=await step(30,['W'])
   for(const role of ['cab','driver','mast','carriage','fork-left','fork-right','wheel-fl','wheel-fr','wheel-rl','wheel-rr'])assert(b.roles[role].parents.includes('vehicle'),`${role} 未连接车辆父子层级`)
   assert(distance(a.roles.vehicle,b.roles.vehicle)>.1,'车辆未向前行驶')
   assert(['wheel-fl','wheel-fr','wheel-rl','wheel-rr'].some(role=>JSON.stringify(a.roles[role].quaternion)!==JSON.stringify(b.roles[role].quaternion)),'前进时实际车轮未转动')
   const turned=await step(20,['W','A'])
   assert(Math.abs(turned.s.vehicle.yaw-b.s.vehicle.yaw)>.01,'转向输入未改变车体朝向')
   assert(['wheel-fl','wheel-fr','wheel-rl','wheel-rr'].some(role=>turned.roles[role].axle&&b.roles[role].axle&&distance(turned.roles[role].axle,b.roles[role].axle)>.03),'转向时轮轴方向没有相对车体偏转')
   const start=await reset('driving');let raised=await step(30,['E'])
   if(raised.s.forkHeight<=start.s.forkHeight+.05){raise='Q';lower='E';await reset('driving');raised=await step(30,['Q'])}
   assert(raised.s.forkHeight>start.s.forkHeight+.1&&raised.roles['fork-left'].y>start.roles['fork-left'].y+.08&&raised.roles['fork-right'].y>start.roles['fork-right'].y+.08,'升降状态与两根真实货叉运动不一致')
   assert(close(raised.roles.driver.local.x,start.roles.driver.local.x,.02)&&close(raised.roles.driver.local.z,start.roles.driver.local.z,.02),'驾驶员未随车保持相对位置')
   return '车轮滚动、转向偏转和双叉升降均反映到真实层级'
  })
  await run('driving-braking','driving',async()=>{
   const a=await reset('driving'),moving=await step(60,['W']),braked=await step(30,['SPACE'])
   assert(distance(a.roles.vehicle,moving.roles.vehicle)>.5,'W 未产生真实驾驶位移')
   assert(Math.abs(braked.s.vehicle.speed)<.15,'制动 0.5 秒后未停下')
   const reverse=await step(60,['S']);assert(distance(reverse.roles.vehicle,braked.roles.vehicle)>.3,'S 未产生倒车位移')
   await reset('wall');const wall=await step(120,['W'])
   assert(wall.roles.vehicle.bounds.max.z<=10.15,'车辆穿出仓库正 Z 边界墙')
   return '前进、倒退、制动有效，车体没有穿过边界墙'
  })
  await run('aligned-pickup-release','handling',async()=>{
   await liftKeys()
   const a=await reset('aligned');assert(a.s.heldBox==null,'aligned 前置条件已直接设为托起')
   const b=await step(45,[raise]);assert(b.s.heldBox==='red'&&b.roles['box:red'].bounds.min.y>a.roles['box:red'].bounds.min.y+.1,'正确对齐升叉未实际托起红箱')
   const moved=await step(25,['S'])
   assert(moved.s.heldBox==='red'&&distance(moved.roles['box:red'],b.roles['box:red'])>.05,'托起的货箱未随真实车辆运输')
   const released=await step(180,[lower])
   assert(released.s.heldBox==null&&released.roles['box:red'].bounds.min.y>=-.06&&released.roles['box:red'].bounds.min.y<=.12,'降叉未在地面释放，或箱子悬浮/穿地')
   return '对齐后托起、载箱运输、降叉接地释放均通过'
  })
  await run('misaligned-rejection','handling',async()=>{
   await liftKeys()
   await reset('misaligned');const o=await step(60,[raise])
   assert(o.s.heldBox==null,'横偏且未插入箱底仍可隔空托起')
   return '错误对齐不能拾取货箱'
  })
  await run('stable-delivery','goal',async()=>{
   const a=await reset('delivered-red');assert(!a.s.delivered.includes('red'),'fixture 直接提前记分')
   const early=await step(20);assert(!early.s.delivered.includes('red'),'不足 0.5 秒就计入交付')
   const delivered=await step(20);assert(delivered.s.delivered.filter(id=>id==='red').length===1,'同色落地稳定后未计一次交付')
   const repeated=await step(60);assert(repeated.s.delivered.filter(id=>id==='red').length===1,'同一货箱重复计分')
   return '同色落地稳定满 0.5 秒后计一次，继续停留不重复计分'
  })
  await run('invalid-deliveries','goal',async()=>{
   for(const fixture of ['wrong-zone','partial-zone']){
    await reset(fixture);const o=await step(90);assert(!o.s.delivered.includes('red'),`${fixture} 错误地计入交付`)
   }
   await reset('floating');let stable=0
   for(let i=0;i<45;i++){
    const o=await step(1),box=o.s.boxes.find(b=>b.id==='red')
    stable=box.bottomY<=.05&&Math.abs(box.speed)<=.1?stable+1:0
    // Physics may legitimately make the initially floating box fall to the floor.
    if(stable<29)assert(!o.s.delivered.includes('red'),'悬空或落地稳定不足 0.5 秒时计入交付')
   }
   return '错色、部分越界不计分；悬空必须真实落地稳定后才可能计分'
  })
  await run('paused-delivery-clock','states',async()=>{
   await reset('delivered-red');const early=await step(20);assert(!early.s.delivered.includes('red'),'稳定计时前置已提前交付')
   const paused=await step(1,['P']);assert(paused.s.mode==='paused','P 未暂停稳定计时场景')
   stableGame(paused,await step(600),taskId)
   const resumed=await step(1,['P']);assert(resumed.s.mode==='playing','无法恢复稳定交付场景')
   const stillEarly=await step(5);assert(!stillEarly.s.delivered.includes('red'),'暂停的十秒被计入交付稳定时长')
   const finished=await step(15);assert(finished.s.delivered.includes('red'),'恢复后稳定计时没有继续完成')
   return '暂停冻结 0.5 秒交付计时，恢复后从先前进度继续'
  })
  await run('inspection-camera','states',async()=>{
   await reset('driving');const paused=await step(1,['P'])
   assert(paused.s.mode==='paused'&&paused.engine.camera,'缺少实际 THREE.Camera 引用或无法暂停')
   const cameras=[]
   for(const side of ['front','side','rear','top']){
    await page.getByTestId(`inspect-${side}`).click({timeout:2000})
    const o=await step(30)
    assert(o.s.mode==='paused'&&o.s.cameraMode==='inspect'&&o.engine.camera,`${side} 未进入暂停中的实际检查镜头`)
    stableGame(paused,o,taskId)
    cameras.push(o.engine.camera)
   }
   for(let i=0;i<cameras.length;i++)for(let j=i+1;j<cameras.length;j++)assert(distance(cameras[i],cameras[j])>.1||distance(cameras[i].direction,cameras[j].direction)>.1,'四向检查的实际相机位置/方向重复')
   await page.getByTestId('inspect-exit').click({timeout:2000})
   const returned=await step(30)
   assert(returned.s.mode==='paused'&&returned.s.cameraMode==='follow','退出检查没有回到跟随镜头并保留暂停')
   stableGame(paused,returned,taskId)
   return '四个入口改变真实 THREE.Camera 位置/方向，检查及退出均保持暂停与世界状态'
  })
  await run('hud','states',async()=>{
   await reset('driving');validateHUD(await step(60),taskId)
   await liftKeys();await reset('aligned');validateHUD(await step(45,[raise]),taskId)
   await reset('delivered-red');validateHUD(await step(40),taskId)
   return '可见 HUD 的秒数、交付数量和当前货箱与实际搬运状态一致'
  })
  await run('resources-restarts','resources',async()=>{
   const records=[]
   for(let i=0;i<10;i++){
    await reset('default');const o=await step(1)
    assert(close(o.s.vehicle.width,vehicleWidth,.005),'连续重开使车辆宽度累乘')
    assert(o.s.boxes.length===3&&o.s.delivered.length===0&&o.s.heldBox==null,'重开没有恢复三箱与交付状态')
    assert(Number.isFinite(o.s.resources?.geometries)&&Number.isFinite(o.s.resources?.textures),'缺少 renderer.info.memory 资源记录')
    records.push([o.s.resources.geometries,o.s.resources.textures,o.engine.geometries,o.engine.textures,o.engine.objectCount])
   }
   for(let column=0;column<5;column++){const tail=records.slice(3).map(row=>row[column]);assert(tail.at(-1)<=Math.max(...tail.slice(0,2))+1,`连续重开资源持续增长：${JSON.stringify(records)}`)}
   return `10 次重开宽度/三箱稳定；[报告几何,报告纹理,场景几何,场景纹理,对象]：${JSON.stringify(records)}`
  })
 }
 await run('ready-pause','states',async()=>{
  const ready=await reset('default'),waited=await step(120)
  assert(waited.s.mode==='ready'&&close(ready.s.remainingMs,waited.s.remainingMs,1),'开始前计时已经推进')
  const started=await step(1,['ENTER']);assert(started.s.mode==='playing','Enter 无法从开始界面进入游戏')
  const playing=await step(30);assert(close(started.s.remainingMs-playing.s.remainingMs,500,35),'固定帧推进没有使用真实 1/60 秒计时')
  const paused=await step(1,['P']);assert(paused.s.mode==='paused','P 没有暂停')
  stableGame(paused,await step(600,is2d?['RIGHT','SPACE']:['W','E']),taskId)
  const resumed=await step(1,['P']);assert(resumed.s.mode==='playing','P 无法恢复游戏')
  return '开始前不计时，固定帧计时正确；暂停 10 秒冻结真实场景，P 可以恢复'
 })
 await run('timeout-terminal','states',async()=>{
  await reset('timeout');const lost=await step(10)
  assert(lost.s.mode==='lost'&&lost.s.remainingMs<=1,'时间归零没有失败')
  stableGame(lost,await step(30,is2d?['RIGHT','SPACE']:['W','E']),taskId)
  await step(1,['R']);const restarted=await step(1)
  assert(['ready','playing'].includes(restarted.s.mode)&&restarted.s.remainingMs>119900,'R 未恢复新一局')
  return '超时失败后停止操作，R 恢复一局初始时间'
 })
 if(is2d)await run('restart-repetition','states',async()=>{
  const counts=[]
  for(let i=0;i<10;i++){
   await step(1,['R']);const o=await step(1)
   assert(o.s.lives===3&&o.s.collected.length===0&&o.s.remainingMs>119900&&close(o.s.moveSpeed,240,1),'重复重开未恢复生命/快递/速度/时间')
   counts.push(o.engine.objectCount)
  }
  assert(counts.slice(3).every(value=>value===counts[3]),`重复重开对象数量累积：${counts.join(', ')}`)
  return `10 次重开初始状态正确，实际场景对象数：${counts.join(', ')}`
 })
 await run('normal-input-replay','goal',async()=>{
  let replay
  try{replay=JSON.parse(await readFile(join(root,'replay.json'),'utf8'))}catch(error){throw Error(`无法读取有效 replay.json：${error.message}`)}
  const actions=validateReplay(replay)
  await reset('default');let result
  for(const action of actions)result=await step(action.frames,action.keys)
  assert(result?.s.mode==='won','普通按键重放未通过真实规则完成整局')
  if(is2d){
   assert(result.s.collected.length===3&&result.s.lives>0,'声称胜利但未收齐快递或没有生命')
   const player=result.roles.player.bounds,exit=result.roles.exit.bounds
   assert(player&&exit&&player.x+player.width>=exit.x&&player.x<=exit.x+exit.width&&player.y+player.height>=exit.y&&player.y<=exit.y+exit.height,'声称胜利但真实角色不在出口')
  }else{
   assert(result.s.delivered.length===3,'声称胜利但没有交付三个箱子')
   for(const id of ['red','blue','yellow']){
    const box=result.roles[`box:${id}`].bounds,zone=result.roles[`zone:${id}`].bounds
    assert(box.min.x>=zone.min.x-.03&&box.max.x<=zone.max.x+.03&&box.min.z>=zone.min.z-.03&&box.max.z<=zone.max.z+.03&&Math.abs(box.min.y)<=.06,`声称胜利但真实 ${id} 箱未完整接地进入同色区`)
   }
  }
  stableGame(result,await step(30,is2d?['RIGHT','SPACE']:['W','E']),taskId)
  return `从 default 重放 ${actions.length} 段普通输入后真实通关，终局停止操作`
 })
 return checks
}

/** Use a separate normal (no eval=1) Chromium page; this never advances simulated frames. */
export async function checkGamePerformance(page,{taskId='05-game3d',phase='initial'}={}){
 assert(taskId==='05-game3d','真实帧时间检查仅用于 3D 游戏')
 const dimensionId=phase==='change'?'regression':'runtime',id='game.frame-time'
 try{
  const environment=await page.evaluate(()=>{
   const probe=document.createElement('canvas'),probeContext=probe.getContext('webgl2')||probe.getContext('webgl'),supported=!!probeContext
   probeContext?.getExtension('WEBGL_lose_context')?.loseContext()
   const canvases=[...document.querySelectorAll('canvas')].sort((a,b)=>b.getBoundingClientRect().width*b.getBoundingClientRect().height-a.getBoundingClientRect().width*a.getBoundingClientRect().height)
   const canvas=canvases[0],context=canvas&&(canvas.getContext('webgl2')||canvas.getContext('webgl'))
   const extension=context?.getExtension('WEBGL_debug_renderer_info')
   const renderer=context?.getParameter(extension?.UNMASKED_RENDERER_WEBGL??context.RENDERER)||''
   const rect=canvas?.getBoundingClientRect()
   return {supported,hasGameContext:!!context,renderer,dpr:devicePixelRatio,width:innerWidth,height:innerHeight,
    evalEnabled:new URL(location.href).searchParams.get('eval')==='1',hidden:document.hidden,
    canvas:canvas?{width:canvas.width,height:canvas.height,visibleWidth:rect.width,visibleHeight:rect.height}:null}
  })
  const pending=message=>[{id,dimensionId,passed:null,message}]
  if(environment.evalEnabled)return pending('性能页仍带 eval=1，须在独立正常页面以真实 rAF 核验')
  if(environment.dpr!==1||environment.width!==1280||environment.height!==720)return pending('性能环境须为 1280×720、DPR1；本次未按固定条件采样')
  if(!environment.supported)return pending('当前浏览器没有可用 WebGL 环境，无法给出可比较的 GPU 帧时间')
  if(environment.hidden)return pending('性能页面处于后台/隐藏，rAF 可能被浏览器限速，请在可见前台页面重测')
  assert(environment.hasGameContext&&environment.canvas?.visibleWidth>0&&environment.canvas?.visibleHeight>0,'作品没有可见可运行的 WebGL 画布')
  if(/swiftshader|llvmpipe|softpipe|software|microsoft basic render/i.test(environment.renderer))return pending(`当前为软件渲染（${environment.renderer}），不据此扣性能分；需同榜硬件 GPU 环境重测`)
  assert(environment.canvas.width>=environment.canvas.visibleWidth*.98&&environment.canvas.height>=environment.canvas.visibleHeight*.98,'作品通过降低 WebGL 绘制缓冲分辨率代替指定 DPR1 渲染')
  await page.keyboard.press('Enter')
  const result=await page.evaluate(()=>new Promise(resolve=>{
   const warmup=10000,duration=60000,start=performance.now(),samples=[]
   let previous=null,finished=false,request=0
   const finish=result=>{if(finished)return;finished=true;cancelAnimationFrame(request);clearTimeout(timeout);resolve(result)}
   const timeout=setTimeout(()=>finish({pending:true,message:'正常页面 rAF 采样超过 90 秒未完成，可能被后台节流或GPU/上下文阻塞'}),90000)
   const tick=time=>{
    if(document.hidden){finish({pending:true,message:'采样中页面进入后台，真实 rAF 数据不可比较'});return}
    const elapsed=time-start
    if(elapsed>=warmup){
     if(previous!==null)samples.push(time-previous)
     previous=time
    }
    if(elapsed>=warmup+duration){
     const sorted=[...samples].sort((a,b)=>a-b),p95=sorted[Math.max(0,Math.ceil(sorted.length*.95)-1)]
     const modeText=document.querySelector('[data-testid="hud-time"]')?.textContent?.trim()
     finish({pending:false,p95,samples:samples.length,elapsedMs:elapsed,hudTime:modeText})
    }else request=requestAnimationFrame(tick)
   }
   request=requestAnimationFrame(tick)
  }))
  if(result.pending)return pending(result.message)
  assert(Number.isFinite(result.p95)&&result.samples>0,'未取得有效真实 rAF 样本')
  assert(result.hudTime!==undefined&&/^\d+$/.test(result.hudTime)&&Number(result.hudTime)<115,'正常页面未通过 Enter 开局或 HUD 倒计时未实际推进')
  return [{id,dimensionId,passed:result.p95<=33.3,message:`真实 rAF：预热10秒、采样60秒，${result.samples}个间隔，P95=${result.p95.toFixed(2)}ms（阈值33.3ms）；1280×720/DPR1，GPU：${environment.renderer}`}]
 }catch(error){
  return [{id,dimensionId,passed:stopped(error)||page.isClosed?.()?null:false,message:stopped(error)||page.isClosed?.()?'性能采样时浏览器页面/上下文关闭，需恢复环境后重测':String(error?.message||error)}]
 }
}
