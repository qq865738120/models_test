import test from 'node:test'
import assert from 'node:assert/strict'
import {taskBrief} from '../src/deck.ts'

const revised={
 id:'03-dispatch',number:'03',title:'派单台',shortTitle:'前端交互',category:'状态管理',
 capabilities:['筛选与选择状态一致性','异常反馈'],brief:['完成订单筛选。'],
 briefChange:['用 URL 还原当前筛选状态。'],
}

test('change requirements are hidden until that phase has been released',()=>{
 assert.deepEqual(taskBrief(revised,'initial',false),revised.brief)
 assert.deepEqual(taskBrief(revised,'change',false),['追加任务尚未开放。'])
 assert.deepEqual(taskBrief(revised,'change',true),revised.briefChange)
})

test('revised answer tasks use their own change requirements',()=>{
 const task={...revised,id:'06-memory',number:'06',scoringMode:'binary',briefChange:['回答 C01–C10，仅提交答案。']}
 assert.deepEqual(taskBrief(task,'change',true),task.briefChange)
})

test('answer and unknown tasks without a change brief have usable requirements',()=>{
 const {briefChange,...task}=revised
 assert.deepEqual(taskBrief({...task,id:'06-memory',scoringMode:'binary'},'change',true),
  ['阅读追加阶段题目与对应材料。','只在 output/answers.json 中提交各题答案。'])
 assert.deepEqual(taskBrief({...task,id:'future-task'},'change',true),
  ['阅读追加阶段提示词，完成对应要求。'])
})
