import test from 'node:test'
import assert from 'node:assert/strict'
import {bike,bikeLeg,platforms,platformPose} from '../src/artGeometry.ts'
import {forkliftSurfaces,project} from '../src/forkliftGeometry.ts'
const near=(a,b,epsilon=1e-6)=>assert.ok(Math.abs(a-b)<epsilon,`${a} != ${b}`)
test('自行车整圈踩踏：双腿长度固定、脚与相反踏板连接、轮胎接地',()=>{
 for(let i=0;i<=720;i++){
  const a=i/720*Math.PI*2,n=bikeLeg(a),f=bikeLeg(a+Math.PI)
  for(const p of [n,f]){
   near(Math.hypot(p.knee[0]-bike.hip[0],p.knee[1]-bike.hip[1]),bike.legLength)
   near(Math.hypot(p.x-p.knee[0],p.y-p.knee[1]),bike.legLength)
   near(Math.hypot(p.x-bike.crank[0],p.y-bike.crank[1]),bike.crankRadius)
  }
  near(n.x+f.x,2*bike.crank[0]);near(n.y+f.y,2*bike.crank[1])
 }
 near(bike.axleY+bike.wheelRadius,bike.ground)
 const p=bikeLeg(0),q=bikeLeg(Math.PI*2);near(p.x,q.x);near(p.y,q.y)
})
test('跳跃与落地：轨迹无越界，停留时双脚落在平台上，循环连续',()=>{
 for(let i=0;i<=600;i++){
  const p=platformPose(i/600)
  assert.ok(p.x>=platforms.start[0]-1e-6&&p.x<=platforms.end[0]+1e-6)
  assert.ok(p.y-69>=0&&p.y<=platforms.start[1]+1e-6)
  if(i>0){const prev=platformPose((i-1)/600);assert.ok(Math.hypot(p.x-prev.x,p.y-prev.y)<3)}
 }
 for(const t of [0,.1,.85,1]){const p=platformPose(t);near(p.y,248-3.5);assert.ok(p.x-17>=30&&p.x+15<=113)}
 for(const t of [.4,.5,.56]){const p=platformPose(t);near(p.y,192-3.5);assert.ok(p.x-17>=142&&p.x+15<=218)}
 assert.deepEqual(platformPose(0),platformPose(1))
})
test('快递淡出发生在角色接触快递期间，重新出现时角色已返回起点',()=>{
 const [x,y,w,h]=platforms.parcel
 for(const t of [.34,.36,.38]){
  const p=platformPose(t)
  // Body occupies x ± 20 and feet-relative y [-43,-13].
  assert.ok(p.x+20>=x&&p.x-20<=x+w&&p.y-13>=y&&p.y-43<=y+h)
 }
 near(platformPose(.9).x,platforms.start[0])
})
test('叉车转动标记保持在轮面内，轮轴和投影不随转角漂移',()=>{
 const faces=forkliftSurfaces.filter(f=>f.wheel)
 assert.ok(faces.length>0)
 for(const f of faces){
  const w=f.wheel,anchor=project([w.x,w.y,20])
  assert.ok(f.points.every(p=>Math.abs(p[1]-w.y)<1e-6))
  for(let i=0;i<36;i++){
   const a=i/36*2*Math.PI,u=w.radius*Math.cos(a),v=w.radius*Math.sin(a)
   const actual=project([w.x+u,w.y,20+v])
   near(actual[0],anchor[0]+.9*u);near(actual[1],anchor[1]-.42*u-v)
   assert.ok(Math.hypot(u,v)<= (f.part==='tire'?20:12)+1e-6)
  }
 }
})
