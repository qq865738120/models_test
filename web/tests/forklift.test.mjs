import test from 'node:test'
import assert from 'node:assert/strict'
import {forkliftFaces,forkliftSurfaces,project,camera,dot} from '../src/forkliftGeometry.ts'
const vertices=part=>forkliftFaces.filter(f=>f.part===part).flatMap(f=>f.points)
const min=(part,axis)=>Math.min(...vertices(part).map(p=>p[axis]))
const max=(part,axis)=>Math.max(...vertices(part).map(p=>p[axis]))
test('四轮共同落地，驾驶员与顶棚保持净空，门架与车身相接',()=>{
 const tires=vertices('tire')
 for(const x of [-53,34])for(const sign of [-1,1]){
  const wheel=tires.filter(p=>Math.abs(p[0]-x)<=20.001&&p[1]*sign>31)
  assert.ok(wheel.length>0)
  assert.ok(Math.abs(Math.min(...wheel.map(p=>p[2])))<1e-6)
  assert.ok(wheel.every(p=>Math.abs(p[1])>=32-1e-6))
 }
 assert.ok(max('pelican-head',2)<min('canopy',2))
 assert.equal(min('mast-upright',0),max('chassis',0))
 assert.ok(min('mast-mount',0)<max('chassis',0))
 assert.ok(max('mast-mount',0)>=min('mast-upright',0))
})
test('双货叉通过货叉根部连接托架，托盘和货物接触且居中',()=>{
 assert.equal(max('fork-heel',0),min('fork-tine',0))
 assert.equal(max('carriage',0),min('fork-tine',0))
 assert.equal(max('fork-tine',2),min('pallet',2))
 assert.equal(max('pallet',2),min('load',2))
 for(const part of ['chassis','mast-upright','fork-tine','pallet','load'])assert.ok(Math.abs(min(part,1)+max(part,1))<1e-6)
})
// Independently ray-test original faces: the final painted surface at each
// sample must be the physically nearest surface, not merely a sorted label.
const triangles=faces=>faces.flatMap(f=>f.points.slice(1,-1).map((_,i)=>[f.points[0],f.points[i+1],f.points[i+2]].map(p=>[...project(p),dot(p,camera)])))
const depth=(t,x,y)=>{
 const [a,b,c]=t,den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1])
 if(Math.abs(den)<1e-8)return null
 const u=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/den
 const v=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/den,w=1-u-v
 return Math.min(u,v,w)>=-1e-8?u*a[2]+v*b[2]+w*c[2]:null
}
test('整车可见面与独立深度采样一致，无遮挡穿插或漏面',()=>{
 const original=triangles(forkliftFaces),painted=triangles(forkliftSurfaces);let covered=0
 for(let x=70.37;x<330;x+=4)for(let y=55.61;y<310;y+=4){
  let expected=-Infinity,actual=null
  for(const t of original){const d=depth(t,x,y);if(d!==null)expected=Math.max(expected,d)}
  for(const t of painted){const d=depth(t,x,y);if(d!==null)actual=d}
  if(expected===-Infinity){assert.equal(actual,null);continue}
  covered++;assert.ok(actual!==null&&Math.abs(actual-expected)<1e-4,`wrong occlusion at ${x}, ${y}: ${actual} vs ${expected}`)
 }
 assert.ok(covered>1000)
})
