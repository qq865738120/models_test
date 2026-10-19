import test from 'node:test'
import assert from 'node:assert/strict'
import {harnessIdentity,modelGroupKey,harnessLabel} from '../src/harness.ts'
const run={id:'a',model:'M',harness:'codex',reasoningLevel:'3'}
test('same model and Harness aggregate independently of legacy versions',()=>{
 assert.equal(modelGroupKey(run),modelGroupKey({...run,id:'b'}))
 assert.equal(modelGroupKey({...run,harnessVersion:'1'}),modelGroupKey({...run,id:'b',harnessVersion:'2'}))
 for(const change of [{harness:'opencode'},{model:'N'}])assert.notEqual(modelGroupKey(run),modelGroupKey({...run,...change}))
})
test('unrecorded Harness never silently averages runs',()=>{
 assert.notEqual(modelGroupKey({...run,harness:null}),modelGroupKey({...run,harness:null,id:'b'}))
 assert.equal(harnessLabel({}),'未记录 Harness')
})
test('custom identities remain distinct and labels exclude legacy versions',()=>{
 assert.notEqual(harnessIdentity({harness:'other',harnessCustom:'A|B'}),harnessIdentity({harness:'other',harnessCustom:'A'}))
 assert.equal(harnessLabel({...run,harnessVersion:'old'},[{id:'codex',label:'Codex'}]),'Codex')
})
