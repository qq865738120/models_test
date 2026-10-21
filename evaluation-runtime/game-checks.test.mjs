import test from 'node:test'
import assert from 'node:assert/strict'
import {checkGame,checkGamePerformance,validateHUD,validateObservation,validateReplay} from './game-checks.mjs'

const twoD=()=>({
 s:{mode:'playing',remainingMs:120000,lives:3,player:{x:100,y:660,vx:0,vy:0,onGround:true},
  collected:[],invulnerableMs:0,moveSpeed:240,jumpSpeed:480},
 roles:{player:{x:100,y:660,visible:true,physics:true,
  bounds:{x:84,y:608,width:32,height:52,centerX:100,bottom:660},body:{vx:0,vy:0,onGround:true}},
  ...Object.fromEntries(['c1','c2','c3'].map(id=>[`package:${id}`,{visible:true,active:true,physics:true}]))},
 duplicates:[],engine:{valid:true,objectCount:15,worldWidth:2400,worldHeight:720},
})
const box=(x,z)=>({x,y:.6,z,visible:true,physics:true,
 bounds:{min:{x:x-.6,y:0,z:z-.6},max:{x:x+.6,y:1.2,z:z+.6},width:1.2,height:1.2,depth:1.2}})
const threeD=()=>({
 s:{mode:'playing',remainingMs:120000,vehicle:{x:0,y:1.1,z:7},delivered:[],
  boxes:['red','blue','yellow'].map((id,i)=>({id,x:(i-1)*5,y:.6,z:3,bottomY:0,speed:0}))},
 roles:{vehicle:{x:0,y:1.1,z:7,visible:true,bounds:{width:1.4,height:2.2,depth:2.6}},
  ...Object.fromEntries(['red','blue','yellow'].map((id,i)=>[`box:${id}`,box((i-1)*5,3)]))},
 duplicates:[],engine:{valid:true},
})

test('normal input replay accepts simultaneous standard keys and enforces its duration',()=>{
 assert.equal(validateReplay({version:1,actions:[{frames:1,keys:['ENTER']},{frames:30,keys:['RIGHT','SPACE']}]}).length,2)
 assert.throws(()=>validateReplay({version:1,actions:Array.from({length:13},()=>({frames:600,keys:[]}))}),/7200/)
})
test('replay refuses invalid frames, direct fixtures, invented inputs and duplicate keys',()=>{
 for(const action of [
  {frames:0,keys:[]},{frames:601,keys:[]},{frames:1.5,keys:[]},
  {frames:1,keys:['win']},{frames:1,keys:['right']},{frames:1,keys:['RIGHT','RIGHT']},
  {frames:1,keys:[],fixture:'won'},
 ])assert.throws(()=>validateReplay({version:1,actions:[action]}))
})
test('2D observation accepts consistent visible and physical state',()=>{
 assert.doesNotThrow(()=>validateObservation(twoD(),'04-game2d'))
})
test('2D observation refuses shadow position, phantom collection and an unregistered scene',()=>{
 const moved=twoD();moved.s.player.x=500
 assert.throws(()=>validateObservation(moved,'04-game2d'),/不一致/)
 const phantom=twoD();phantom.s.collected=['c1']
 assert.throws(()=>validateObservation(phantom,'04-game2d'),/活动可拾取/)
 const fake=twoD();fake.engine.valid=false
 assert.throws(()=>validateObservation(fake,'04-game2d'),/真实注册/)
})
test('3D observation compares reported boxes with real geometry and rigid-body positions',()=>{
 assert.doesNotThrow(()=>validateObservation(threeD(),'05-game3d'))
 const shadow=threeD();shadow.s.boxes[0].x=20
 assert.throws(()=>validateObservation(shadow,'05-game3d'),/真实对象位置/)
 const floating=threeD();floating.roles['box:red'].bounds.min.y=.6
 assert.throws(()=>validateObservation(floating,'05-game3d'),/箱底/)
 const detached=threeD();detached.roles['box:red'].physicsPosition={x:10,y:10,z:10}
 assert.throws(()=>validateObservation(detached,'05-game3d'),/物理刚体脱离/)
})
test('HUD accepts real rounded seconds and refuses stale or hidden displayed values',()=>{
 const o=twoD();o.s.remainingMs=118100
 o.hud={'hud-lives':{text:'3',visible:true},'hud-collected':{text:'0',visible:true},'hud-time':{text:'119',visible:true}}
 assert.doesNotThrow(()=>validateHUD(o,'04-game2d'))
 o.hud['hud-time'].text='118'
 assert.throws(()=>validateHUD(o,'04-game2d'),/hud-time/)
 o.hud['hud-time'].text='119';o.hud['hud-lives'].visible=false
 assert.throws(()=>validateHUD(o,'04-game2d'),/hud-lives/)
})

// A small Page-shaped transport fixture intentionally implements horizontal
// movement only. It is not a playable candidate or a benchmark solution.
function movementPage(){
 let state=twoD()
 return {
  isClosed:()=>false,
  async evaluate(_fn,{op,fixture,frames=0,keys=[]}={}){
   if(op==='reset'){state=twoD();state.s.mode=fixture==='default'?'ready':'playing'}
   if(op==='advance'&&state.s.mode==='playing'){
    const direction=keys.some(k=>['RIGHT','D'].includes(k))?1:keys.some(k=>['LEFT','A'].includes(k))?-1:0
    state.s.player.x+=direction*4*frames
    state.s.player.vx=direction*240
    state.s.remainingMs=Math.max(0,state.s.remainingMs-frames*1000/60)
    Object.assign(state.roles.player,{x:state.s.player.x})
    Object.assign(state.roles.player.bounds,{x:state.s.player.x-16,centerX:state.s.player.x})
    state.roles.player.body.vx=state.s.player.vx
   }
   return structuredClone(state)
  },
 }
}
test('runner records actual positive movement evidence and independently fails absent jumping',async()=>{
 const results=await checkGame(movementPage(),{taskId:'04-game2d',root:'/nonexistent-game-fixture'})
 assert.equal(results.find(c=>c.id==='game.movement').passed,true)
 assert.equal(results.find(c=>c.id==='game.keyboard-aliases').passed,true)
 assert.equal(results.find(c=>c.id==='game.jump').passed,false)
 assert.equal(results.find(c=>c.id==='game.normal-input-replay').passed,false)
 assert(results.every(c=>['delivery','control','platform','damage','goal','states','accessibility'].includes(c.dimensionId)))
})
test('absent public game interface is candidate failure, not environment pending',async()=>{
 const page={isClosed:()=>false,async evaluate(){throw Error('缺少 window.__pelicanEval')}}
 for(const taskId of ['04-game2d','05-game3d']){
  const results=await checkGame(page,{taskId,root:'/nonexistent-game-fixture'})
  assert(results.length>10)
  assert(results.every(c=>c.passed===false))
 }
})
test('closed browser records pending checks without pretending candidate failure',async()=>{
 const page={isClosed:()=>true,async evaluate(){throw Error('Target page, context or browser has been closed')}}
 const results=await checkGame(page,{taskId:'05-game3d',phase:'change',root:'/nonexistent-game-fixture'})
 assert(results.every(c=>c.passed===null))
 assert(results.every(c=>['delivery','dimensions','alignment','handling','regression'].includes(c.dimensionId)))
})
test('candidate navigation destroying its own context does not count as an environment pass',async()=>{
 const page={isClosed:()=>false,async evaluate(){throw Error('Execution context was destroyed, most likely because of a navigation')}}
 const results=await checkGame(page,{taskId:'05-game3d',root:'/nonexistent-game-fixture'})
 assert(results.every(c=>c.passed===false))
})

function performancePage(renderer='Apple GPU',p95=16.8){
 let calls=0
 return {isClosed:()=>false,keyboard:{async press(key){assert.equal(key,'Enter')}},
  async evaluate(){
   calls++
   if(calls===1)return {supported:true,hasGameContext:true,renderer,dpr:1,width:1280,height:720,evalEnabled:false,hidden:false,
    canvas:{width:1280,height:720,visibleWidth:1280,visibleHeight:720}}
   return {pending:false,p95,samples:3600,elapsedMs:70000,hudTime:'50'}
  },
 }
}
test('hardware performance evidence passes or fails by measured frame interval',async()=>{
 assert.equal((await checkGamePerformance(performancePage()))[0].passed,true)
 const slow=await checkGamePerformance(performancePage('Apple GPU',45),{phase:'change'})
 assert.equal(slow[0].passed,false)
 assert.equal(slow[0].dimensionId,'regression')
})
test('software renderer is explicitly pending rather than scoring the candidate zero',async()=>{
 const result=await checkGamePerformance(performancePage('ANGLE Vulkan SwiftShader'))
 assert.equal(result[0].passed,null)
 assert.match(result[0].message,/软件渲染/)
})
