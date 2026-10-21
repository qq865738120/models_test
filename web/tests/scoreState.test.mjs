import test from 'node:test'
import assert from 'node:assert/strict'
import {isApiDimension,mergeScoreDraft,scoreTotal,scoreValueValid} from '../src/scoreState.ts'

const rubric=[
 {id:'api',scoring:'auto',weight:70},
 {id:'visual',scoring:'manual',weight:30},
]
const stored={values:{api:10,visual:5},notes:'已保存评语'}

test('formerly automated dimensions preserve manual draft changes',()=>{
 for(const taskId of ['01-svg','02-static','04-game2d','05-game3d']){
  const merged=mergeScoreDraft(rubric,stored,{values:{api:0,visual:8},dirty:true},taskId)
  assert.deepEqual(merged,{values:{api:0,visual:8},dirty:true})
  assert.equal(scoreTotal(rubric,merged.values,taskId),24)
 }
})

test('dispatch API grades replace stale drafts while manual edits are preserved',()=>{
 const archived={values:{api:1,visual:5}}
 const merged=mergeScoreDraft(rubric,archived,{values:{api:0,visual:8},dirty:true},'03-dispatch')
 assert.deepEqual(merged,{values:{api:1,visual:8},dirty:true})
 assert.equal(scoreTotal(rubric,merged.values,'03-dispatch'),94)
 assert.equal(isApiDimension('03-dispatch',rubric[0]),true)
 assert.equal(isApiDimension('03-dispatch',rubric[1]),false)
})

test('unrun dispatch API dimensions cannot inherit a former draft grade',()=>{
 const merged=mergeScoreDraft(rubric,{values:{api:null,visual:10}},{values:{api:1,visual:10},dirty:true},'03-dispatch')
 assert.equal(merged.values.api,null)
 assert.equal(scoreTotal(rubric,merged.values,'03-dispatch'),null)
})

test('dispatch API values use binary weighting and reject partial or ten-point values',()=>{
 assert.equal(scoreTotal(rubric,{api:1,visual:10},'03-dispatch'),100)
 assert.equal(scoreTotal(rubric,{api:0,visual:10},'03-dispatch'),30)
 for(const value of [.5,2,10,-1,Infinity,NaN]){
  assert.equal(scoreValueValid(rubric[0],value,'03-dispatch'),false)
  assert.equal(scoreTotal(rubric,{api:value,visual:10},'03-dispatch'),null)
 }
 assert.equal(scoreValueValid(rubric[1],.5,'03-dispatch'),true)
})

test('formerly unverified dimensions can be scored without running automation',()=>{
 const merged=mergeScoreDraft(rubric,{...stored,values:{api:null,visual:10}},{values:{api:10,visual:10},dirty:true})
 assert.equal(merged.values.api,10)
 assert.equal(scoreTotal(rubric,merged.values),100)
 assert.equal(scoreTotal(rubric,mergeScoreDraft(rubric,undefined).values),null)
})

test('existing archived scores are unchanged when opening the manual rubric',()=>{
 const original=structuredClone(stored)
 assert.deepEqual(mergeScoreDraft(rubric,stored),{values:{api:10,visual:5},dirty:false})
 assert.deepEqual(stored,original)
})

test('manual clearing applies to formerly automated dimensions',()=>{
 const merged=mergeScoreDraft(rubric,stored,{values:{api:null,visual:8},dirty:true})
 assert.deepEqual(merged.values,{api:null,visual:8})
 assert.equal(scoreTotal(rubric,merged.values),null)
})

test('manual clearing and historical dimensions without a scoring field stay editable',()=>{
 const historical=[{id:'visual',weight:100}]
 assert.deepEqual(mergeScoreDraft(historical,stored,{values:{visual:null},dirty:true}),
  {values:{visual:null},dirty:true})
 assert.equal(scoreTotal(historical,{visual:7.5}),75)
})

test('missing manual draft fields use saved values without retaining unknown dimensions',()=>{
 const merged=mergeScoreDraft(rubric,stored,{values:{removed:10},dirty:true})
 assert.deepEqual(merged.values,{api:10,visual:5})
})

test('static-page scoring uses only the three current dimensions and their full 100 percent weight',()=>{
 const current=[
  {id:'impact',weight:40},
  {id:'craft',weight:30},
  {id:'content',weight:30},
 ]
 const archived={values:{impact:10,craft:10,content:10,reading:0,delivery:0},total:80}
 const original=structuredClone(archived)
 const merged=mergeScoreDraft(current,archived,{values:{impact:5,reading:10,delivery:10},dirty:true})
 assert.deepEqual(merged.values,{impact:5,craft:10,content:10})
 assert.equal(scoreTotal(current,merged.values),80)
 assert.equal(scoreTotal(current,mergeScoreDraft(current,archived).values),100)
 assert.deepEqual(archived,original)
})

test('invalid values do not create a valid weighted score',()=>{
 for(const value of [-1,11,Infinity,NaN]){
  assert.equal(scoreTotal(rubric,{api:value,visual:10}),null)
 }
})
