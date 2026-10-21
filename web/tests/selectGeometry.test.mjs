import test from 'node:test'
import assert from 'node:assert/strict'
import {placeSelect} from '../src/selectGeometry.ts'

const rect=(left,top,width,height)=>({left,top,width,height,right:left+width,bottom:top+height})
const withinViewport=(placement,viewport)=>{
 assert.ok(placement.left>=8,'leaves a left viewport margin')
 assert.ok(placement.left+placement.width<=viewport.width-8,'fits before the right margin')
 assert.ok(placement.top>=8,'leaves a top viewport margin')
 assert.ok(placement.top+placement.maxHeight<=viewport.height-8,'fits before the bottom margin')
}

test('footer selector opens upward and stays adjacent to its trigger',()=>{
 const anchor=rect(28,684,230,38),viewport={width:1200,height:740}
 const placed=placeSelect(anchor,viewport,220)
 assert.equal(placed.upward,true)
 assert.equal(placed.top+placed.maxHeight,anchor.top-6)
 assert.equal(placed.maxHeight,220)
 withinViewport(placed,viewport)
})

test('short version menu opens below when that side has enough space',()=>{
 const anchor=rect(884,180,208,42),viewport={width:1200,height:740}
 const placed=placeSelect(anchor,viewport,80)
 assert.equal(placed.upward,false)
 assert.equal(placed.top,anchor.bottom+6)
 assert.equal(placed.width,208)
 withinViewport(placed,viewport)
})

test('right edge and a narrow viewport constrain the menu instead of overflowing',()=>{
 for(const [anchor,viewport] of [
  [rect(1100,120,90,36),{width:1200,height:740}],
  [rect(140,120,130,36),{width:280,height:640}],
  [rect(12,120,110,36),{width:180,height:640}],
  [rect(-12,120,80,36),{width:360,height:640}],
 ]){
  const placed=placeSelect(anchor,viewport,180)
  withinViewport(placed,viewport)
  assert.ok(placed.width>=Math.min(200,viewport.width-16))
 }
})

test('scaled slide rectangles use their viewport size and position exactly once',()=>{
 // getBoundingClientRect() has already applied the 0.625 slide transform.
 const anchor=rect(510.5,192.25,210.625,26.25),viewport={width:900,height:600}
 const placed=placeSelect(anchor,viewport,154.5)
 assert.equal(placed.left,anchor.left)
 assert.equal(placed.top,anchor.bottom+6)
 assert.equal(placed.width,anchor.width)
 assert.equal(placed.maxHeight,154.5)
 withinViewport(placed,viewport)
})

test('long menus use the roomier side and expose only its available height',()=>{
 const viewport={width:700,height:400}
 const above=placeSelect(rect(40,250,220,40),viewport,1000)
 assert.equal(above.upward,true)
 assert.equal(above.top,8)
 assert.equal(above.maxHeight,236)
 withinViewport(above,viewport)
 const below=placeSelect(rect(40,40,220,40),viewport,1000)
 assert.equal(below.upward,false)
 assert.equal(below.top,86)
 assert.equal(below.maxHeight,306)
 withinViewport(below,viewport)
})

test('a partially clipped footer trigger still exposes a usable menu above it',()=>{
 const anchor=rect(30,370,240,60),viewport={width:700,height:400}
 const placed=placeSelect(anchor,viewport,320)
 assert.equal(placed.upward,true)
 assert.equal(placed.maxHeight,320)
 assert.equal(placed.top+placed.maxHeight,anchor.top-6)
 withinViewport(placed,viewport)
})
