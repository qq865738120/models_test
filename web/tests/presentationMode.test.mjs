import test from 'node:test'
import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import {buildSync} from 'esbuild'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

const require=createRequire(import.meta.url)
const compiled=buildSync({
 stdin:{contents:"export * from './src/presentationMode.ts'; export {default as ScoreSummary} from './src/ScoreSummary.tsx'; export {default as DeckFrame} from './src/DeckFrame.tsx'; export {default as SlideHeader} from './src/SlideHeader.tsx';",resolveDir:fileURLToPath(new URL('..',import.meta.url)),loader:'ts'},
 bundle:true,platform:'node',format:'cjs',packages:'external',jsx:'automatic',write:false,
})
const compiledModule={exports:{}}
new Function('require','module','exports',compiled.outputFiles[0].text)(require,compiledModule,compiledModule.exports)
const {presentationDeck,presentationPageIndex,finalPresentationScore,readPresentationMode,savePresentationMode,PRESENTATION_MODE_KEY,ScoreSummary,DeckFrame,SlideHeader}=compiledModule.exports
const rubric=[{id:'visual',name:'视觉',weight:60,scoring:'manual',anchors:[]},{id:'interaction',name:'交互',weight:40,scoring:'manual',anchors:[]}]

test('lecture navigation has exactly four reachable pages, without prompts or score editors',()=>{
 for(const artifact of [false,true])for(const binary of [false,true]){
  const deck=presentationDeck(true,artifact,binary,rubric)
  assert.deepEqual(deck.pages.map(p=>p.id),['intro','requirements','result','score'])
  assert.deepEqual(deck.sections.map(s=>s.index),[0,1,2,3])
  assert.equal(deck.sections.some(s=>s.label==='提示词'),false)
  assert.equal(deck.sections.at(-1).index,deck.pages.length-1)
  // Keyboard next/previous and Home/End all use these visible indices.
  assert.equal(deck.pages[deck.resultIndex+1].id,'score')
  assert.equal(deck.pages[deck.pages.length-1].kind,'score')
 }
})

test('switching from a prompt or dimension lands on the corresponding audience page',()=>{
 const lecture=presentationDeck(true,true,false,rubric)
 assert.equal(lecture.pages[presentationPageIndex('prompt',lecture.pages)].id,'result')
 assert.equal(lecture.pages[presentationPageIndex('dimension:interaction',lecture.pages)].id,'score')
 const editor=presentationDeck(false,true,false,rubric)
 assert.equal(editor.pages[presentationPageIndex('dimension:interaction',editor.pages)].id,'dimension:interaction')
 assert.equal(editor.pages[presentationPageIndex('score',editor.pages)].kind,'score')
 assert.equal(editor.pages[presentationPageIndex('removed-page',editor.pages)].id,'intro')
})

test('ordinary mode retains every manual/API dimension and the answer review page',()=>{
 const editor=presentationDeck(false,true,false,rubric)
 assert.deepEqual(editor.pages.map(p=>p.id),['intro','requirements','prompt','result','dimension:visual','dimension:interaction','score'])
 assert.equal(editor.sections.at(-1).index,4)
 const objective=presentationDeck(false,true,true,rubric)
 assert.deepEqual(objective.pages.map(p=>p.id),['intro','requirements','prompt','result','score'])
 assert.equal(presentationDeck(false,false,false,rubric).pages.length,5)
})

test('audience result requires saved, complete scores and keeps real zero results',()=>{
 assert.equal(finalPresentationScore('01-svg',rubric,undefined,false),null)
 assert.equal(finalPresentationScore('01-svg',rubric,{values:{visual:10,interaction:null},total:100},false),null)
 assert.equal(finalPresentationScore('01-svg',rubric,{values:{visual:0,interaction:0},total:0},false),0)
 assert.equal(finalPresentationScore('01-svg',rubric,{values:{visual:8,interaction:5},total:68},false),68)
 for(const value of [undefined,null,NaN,Infinity,-1,101])assert.equal(finalPresentationScore('06-memory',[],{total:value,values:{}},true),null)
 assert.equal(finalPresentationScore('06-memory',[],{total:87.5,values:{}},true),87.5)
 assert.equal(finalPresentationScore('06-memory',[],{total:0,values:{}},true),0)
})

test('audience result respects dispatch binary weights and incomplete API checks',()=>{
 const mixed=[{id:'query',weight:40,scoring:'auto'},{id:'visual',weight:60,scoring:'manual'}]
 assert.equal(finalPresentationScore('03-dispatch',mixed,{values:{query:1,visual:5}},false),70)
 assert.equal(finalPresentationScore('03-dispatch',mixed,{values:{query:null,visual:10}},false),null)
 assert.equal(finalPresentationScore('03-dispatch',mixed,{values:{query:10,visual:10}},false),null)
})

test('lecture preference survives reload and unavailable storage does not break the switch',()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'localStorage')
 try{
  const values=new Map()
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)}})
  assert.equal(readPresentationMode(),false)
  savePresentationMode(true)
  assert.equal(values.get(PRESENTATION_MODE_KEY),'true')
  assert.equal(readPresentationMode(),true)
  savePresentationMode(false)
  assert.equal(readPresentationMode(),false)
  Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw Error('storage disabled')}})
  assert.equal(readPresentationMode(),false)
  assert.doesNotThrow(()=>savePresentationMode(true))
 }finally{
  if(descriptor)Object.defineProperty(globalThis,'localStorage',descriptor)
  else delete globalThis.localStorage
 }
})

test('presentation reuses the summary without formulas, editors or answer-key details',()=>{
 const props={title:React.createElement(SlideHeader,{number:'01',title:'SVG 动画 · 评分汇总'}),taskId:'01-svg',rubric,values:{visual:8,interaction:5},total:68,eligible:true}
 const html=renderToStaticMarkup(React.createElement(ScoreSummary,props))
 assert.match(html,/68/)
 assert.match(html,/视觉/)
 assert.match(html,/交互/)
 assert.match(html,/60%/)
 for(const forbidden of ['<input','<button','<table','<details','标准答案','分档依据','运行接口评分','保存草稿','本题加权得分','Σ','权重 ÷ 10'])assert.equal(html.includes(forbidden),false,forbidden)
 const editor=renderToStaticMarkup(React.createElement(ScoreSummary,{...props,onDimension(){}}))
 assert.equal((editor.match(/<button/g)||[]).length,2)
 assert.equal(editor.includes('本题加权得分'),false)
 const pending=renderToStaticMarkup(React.createElement(ScoreSummary,{...props,total:null,values:{}}))
 assert.match(pending,/待评分/)
 const zero=renderToStaticMarkup(React.createElement(ScoreSummary,{...props,total:0,values:{visual:0,interaction:0}}))
 assert.match(zero,/>0(?:\.0)?<small>/)
 assert.equal(zero.includes('待评分'),false)
 const objective=renderToStaticMarkup(React.createElement(ScoreSummary,{...props,binary:true,values:{visual:1,interaction:0},total:60}))
 assert.match(objective,/正确/)
 assert.match(objective,/错误/)
})

test('shared slide frame has no inner footer and preserves bottom navigation and page count',()=>{
 const html=renderToStaticMarkup(React.createElement(DeckFrame,{slideKey:'test',index:3,count:4,direction:1,onMove(){},onEdge(){},sections:[{label:'题目',index:0},{label:'评分',index:3}],onJump(){},fullscreen:false,toggleFullscreen(){},children:React.createElement(SlideHeader,{number:'01',title:'SVG动画 · 作品展示'})}))
 assert.equal(html.includes('slide-footer'),false)
 assert.equal(html.includes('鹈鹕测评'),false)
 assert.match(html,/aria-label="章节导航"/)
 assert.match(html,/aria-label="上一页"/)
 assert.match(html,/aria-label="下一页"/)
 assert.match(html,/第4页，共4页/)
 assert.equal((html.match(/<h2/g)||[]).length,1)
})
