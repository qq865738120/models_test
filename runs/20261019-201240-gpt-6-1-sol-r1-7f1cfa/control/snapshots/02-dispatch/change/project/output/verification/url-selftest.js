(async()=>{
const records=[],pause=ms=>new Promise(r=>setTimeout(r,ms)),$=s=>document.querySelector(s);
const wait=async(fn)=>{await pause(30);const start=performance.now();while(!fn()){if(performance.now()-start>5000)throw Error('等待超时');await pause(20)}};
const loaded=()=>!!$('tbody .order-id')&&!$('.table-loading')&&!$('.error-box');
const input=v=>{const el=$('#order-search');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}))};
const state=()=>({url:location.href,q:$('#order-search').value,status:$('[aria-label="订单状态"]').value,page:$('.page-position b').textContent,first:$('tbody .order-id')?.textContent,allAddresses:Array.from(document.querySelectorAll('tbody .address')).map(x=>x.textContent),selected:document.querySelectorAll('tbody input:checked').length,error:$('.error-box')?.textContent||null});
const assert=(v,m)=>{if(!v)throw Error(m)};
const test=async(name,expected,run)=>{try{await run();records.push({name,expected,actual:state(),pass:true})}catch(e){records.push({name,expected,actual:e.message,state:state(),pass:false})}};
await wait(()=>window.__dispatchApiReady);const api=await window.__dispatchApiReady;
await wait(()=>loaded()&&$('[data-stat="all"]')?.textContent==='10,000');
await test('历史导航期间慢成功不覆盖新URL','先发科技园900ms；前进恢复大学城100ms；等待旧响应后仍大学城',async()=>{
 api.control({delays:{'科技园':900,'大学城':100}});input('科技园');await pause(40);input('大学城');await wait(loaded);
 history.back();await pause(50);history.forward();await wait(loaded);await pause(1000);
 assert(new URLSearchParams(location.search).get('q')==='大学城','URL错误');assert(state().allAddresses.every(a=>a.includes('大学城')),'旧成功覆盖URL条件');assert(!$('.error-box'),'意外错误');
});
await test('历史导航期间慢失败不覆盖新URL','后退触发科技园慢失败，再前进大学城快成功；过期失败不覆盖新列表',async()=>{
 api.control({failNextQuery:true});history.back();await pause(50);history.forward();await wait(loaded);await pause(1000);
 assert(new URLSearchParams(location.search).get('q')==='大学城','URL错误');assert(state().allAddresses.every(a=>a.includes('大学城')),'结果错误');assert(!$('.error-box'),'旧失败覆盖URL条件');
});
api.control({delays:{},failNextQuery:false,failNextAssign:false});
const data={at:new Date().toISOString(),environment:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio,userAgent:navigator.userAgent,topLevel:window===window.top},records};
const pre=document.createElement('pre');pre.id='url-test-report';pre.style='position:fixed;inset:0;z-index:999;background:white;overflow:auto;padding:24px';pre.textContent=JSON.stringify(data,null,2);document.body.append(pre);
})().catch(e=>{let p=document.createElement('pre');p.id='url-test-report';p.textContent=JSON.stringify({fatal:e.stack});document.body.append(p)})
