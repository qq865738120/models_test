import http from 'node:http';
import fs from 'node:fs';
const endpoint=process.argv[2];
const server=http.createServer((req,res)=>{console.error('SERVER_REQUEST',req.url);res.setHeader('Content-Type','text/html');res.end('<!doctype html><title>Local self-test</title><button onclick="document.querySelector(\'output\').textContent=\'clicked\'">Test</button><output>ready</output><canvas id="gl"></canvas>')});
await new Promise((res,rej)=>{server.once('error',rej);server.listen(0,'127.0.0.1',res)});
console.error("HTTP server ready",server.address());
const version=await fetch(endpoint+'/json/version').then(r=>r.json());
console.error("CDP version ready");console.error('SELF_HTTP',(await fetch('http://127.0.0.1:'+server.address().port).then(r=>r.text())).slice(0,30));
const ws=new WebSocket(version.webSocketDebuggerUrl);await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej});
console.error("CDP socket ready");
let sequence=0;const pending=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}};
const call=(method,params={},sessionId)=>new Promise((resolve,reject)=>{console.error('CDP request',method);const id=++sequence;setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(new Error('CDP timeout '+method))}},5000).unref();pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}))});
try {
 console.error('create target');
 const target=await call('Target.createTarget',{url:'about:blank'});
 const {sessionId}=await call('Target.attachToTarget',{targetId:target.targetId,flatten:true});
 await call('Page.enable',{},sessionId);
 const nav=await call('Page.navigate',{url:'http://127.0.0.1:'+server.address().port},sessionId);
 let result;
 for(let i=0;i<50;i++){
  result=await call('Runtime.evaluate',{expression:'document.readyState',returnByValue:true},sessionId);
  if(result.result.value==='complete')break;
  await new Promise(r=>setTimeout(r,50));
 }
 const check=await call('Runtime.evaluate',{expression:`(async()=>{document.querySelector('button').click();const gl=document.querySelector('canvas').getContext('webgl2');let externalBlocked=false;try{await fetch('https://1.1.1.1/',{mode:'no-cors',signal:AbortSignal.timeout(1500)})}catch(e){externalBlocked=true}return {title:document.title,click:document.querySelector('output').textContent,webgl:!!gl,wasm:WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0])),externalBlocked}})()`,awaitPromise:true,returnByValue:true},sessionId);
 const screenshot=await call('Page.captureScreenshot',{format:'png'},sessionId);
 fs.writeFileSync('probe.png',Buffer.from(screenshot.data,'base64'));
 console.log(JSON.stringify({...check.result.value,screenshotBytes:Buffer.byteLength(screenshot.data,'base64'),navigateError:nav.errorText||null}));
 await call('Target.closeTarget',{targetId:target.targetId});
}finally{ws.close();server.close()}
