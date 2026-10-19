import test from 'node:test'
import assert from 'node:assert/strict'
import {normalizedLevels,reasoningLabel} from '../src/reasoning.ts'
import {modelGroupKey} from '../src/harness.ts'
test('ordinal normalization preserves endpoints with consistent half-up rounding',()=>{
 assert.deepEqual(normalizedLevels(2),[1,5]);assert.deepEqual(normalizedLevels(3),[1,3,5]);assert.deepEqual(normalizedLevels(4),[1,2,4,5]);assert.deepEqual(normalizedLevels(5),[1,2,3,4,5]);assert.deepEqual(normalizedLevels(6),[1,2,3,3,4,5])
 for(const n of [0,1,1.5,NaN,101])assert.throws(()=>normalizedLevels(n))
})
test('different normalized levels never average, missing values stay separate',()=>{
 const r={id:'a',model:'M',harness:'codex',reasoningLevel:'3'}
 assert.equal(modelGroupKey(r),modelGroupKey({...r,id:'b'}))
 for(const reasoningLevel of ['1','2','4','5','unsupported',null])assert.notEqual(modelGroupKey(r),modelGroupKey({...r,reasoningLevel}))
 assert.notEqual(modelGroupKey({...r,reasoningLevel:null}),modelGroupKey({...r,reasoningLevel:null,id:'b'}))
 assert.equal(reasoningLabel({reasoningLevel:'unsupported'},[]),'不支持设置')
 assert.equal(reasoningLabel({},[]),'未记录思考强度')
})
