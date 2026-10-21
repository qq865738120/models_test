// Host-owned checks. Never distributed to candidates; requests stay on loopback.
import fs from 'node:fs/promises'
import {existsSync} from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import {chromium} from 'playwright-core'
import {checkGame,checkGamePerformance} from './game-checks.mjs'
import {checkDispatch} from './dispatch-checks.mjs'
import {checkSvg,checkStatic} from './visual-checks.mjs'

const args=JSON.parse(await fs.readFile(process.argv[2],'utf8'))
const checks=[]
const add=(id,dimensionId,passed,message)=>checks.push({id,dimensionId,passed,message})
const root=await fs.realpath(args.root)
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.wasm':'application/wasm','.woff2':'font/woff2'}
const server=http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,'http://127.0.0.1')
    if(u.pathname.startsWith('/api/')||u.pathname==='/health'){
      if(!args.apiBase){res.writeHead(503,{'Content-Type':'application/json'});return res.end(JSON.stringify({error:{code:'API_NOT_RUNNING',message:'独立测试接口未启动'}}))}
      const target=new URL(args.apiBase)
      if(target.hostname!=='127.0.0.1'||target.protocol!=='http:')throw Error('非本地接口')
      if(!['GET','POST'].includes(req.method))throw Error('不允许的方法')
      let size=0;const chunks=[]
      for await(const part of req){size+=part.length;if(size>65536)throw Error('请求体过大');chunks.push(part)}
      const proxy=http.request({hostname:'127.0.0.1',port:target.port,path:u.pathname+u.search,method:req.method,headers:{'Content-Type':'application/json'},timeout:5000},up=>{
        let n=0;res.writeHead(up.statusCode>=300&&up.statusCode<400?502:up.statusCode,{'Content-Type':'application/json','Cache-Control':'no-store'})
        up.on('data',b=>{n+=b.length;if(n>2*1024*1024){up.destroy();res.destroy()}else res.write(b)});up.on('end',()=>res.end())
      })
      proxy.on('timeout',()=>proxy.destroy());proxy.on('error',()=>{if(!res.headersSent)res.writeHead(502);res.end()})
      return proxy.end(Buffer.concat(chunks))
    }
    if(req.method!=='GET')throw Error('只读静态资源')
    const relative=decodeURIComponent(u.pathname).replace(/^\/+/,'')||'index.html'
    if(relative.split('/').some(s=>s==='..'||s.startsWith('.'))||relative==='server'||relative.startsWith('server/'))throw Error('拒绝访问')
    const filename=await fs.realpath(path.join(root,relative))
    if(!filename.startsWith(root+path.sep))throw Error('路径越界')
    const data=await fs.readFile(filename)
    res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store',
      'Content-Security-Policy':"default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'"})
    res.end(data)
  }catch{res.writeHead(404);res.end('Not found')}
})
await new Promise(r=>server.listen(0,'127.0.0.1',r))
const origin=`http://127.0.0.1:${server.address().port}`
let browser
try{
  const executable=args.browser||process.env.PELICAN_CHROME||[
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/chromium','/usr/bin/chromium-browser','/usr/bin/google-chrome'
  ].find(p=>existsSync(p))
  if(!executable)throw Error('未找到Chromium/Chrome。设置PELICAN_CHROME为已安装浏览器路径；不会自动联网下载。')
  browser=await chromium.launch({executablePath:executable,headless:true,args:[
    '--disable-background-networking','--disable-component-update','--disable-domain-reliability',
    '--disable-sync','--no-first-run','--disable-default-apps','--disable-extensions',
    '--force-webrtc-ip-handling-policy=disable_non_proxied_udp'
  ]})
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,
    hasTouch:args.taskId==='04-game2d',serviceWorkers:'block'})
  const blocked=[],errors=[],failed=[]
  await context.exposeBinding('__pelicanPolicyViolation',(_,uri)=>{blocked.push(String(uri).slice(0,300))})
  await context.addInitScript(()=>{
    document.addEventListener('securitypolicyviolation',e=>{
      window.__pelicanPolicyViolation(e.blockedURI).catch(()=>{})
    })
  })
  await context.route('**/*',async route=>{
    const u=new URL(route.request().url())
    if(u.origin===origin||['data:','blob:','about:'].includes(u.protocol))return route.continue()
    blocked.push(u.origin);return route.abort('blockedbyclient')
  })
  if(context.routeWebSocket)await context.routeWebSocket(/.*/,ws=>ws.close())
  const page=await context.newPage()
  page.setDefaultTimeout(2500)
  page.on('pageerror',e=>errors.push(String(e.message).slice(0,180)))
  page.on('response',r=>{if(r.status()>=400&&!r.url().includes('/api/'))failed.push(new URL(r.url()).pathname)})
  await page.goto(origin+'/index.html'+(args.taskId.includes('game')?'?eval=1':''),{waitUntil:'load',timeout:12000})
  const delivery=args.taskId==='03-dispatch'?(args.phase==='change'?'delivery':'runtime'):args.taskId==='05-game3d'?(args.phase==='change'?'delivery':'runtime'):'delivery'
  add('local-entry',delivery,await page.locator('body').isVisible(),'本地HTML实际加载并显示')
  if(args.taskId==='01-svg')checks.push(...await checkSvg(page,args))
  if(args.taskId==='02-static')checks.push(...await checkStatic(page,args))
  if(args.taskId==='03-dispatch')checks.push(...await checkDispatch(page,{...args,origin,context}))
  if(args.taskId.includes('game'))checks.push(...await checkGame(page,args))
  if(args.taskId==='05-game3d'){
    const performancePage=await context.newPage()
    try{
      await performancePage.setViewportSize({width:1280,height:720})
      await performancePage.goto(origin+'/index.html',{waitUntil:'load',timeout:12000})
      await performancePage.bringToFront()
      checks.push(...await checkGamePerformance(performancePage,args))
    }finally{await performancePage.close()}
  }
  add('offline-resources',delivery,blocked.length===0&&failed.length===0,
    blocked.length||failed.length?`被阻止的外部来源${[...new Set(blocked)].join(',')}；资源失败${[...new Set(failed)].join(',')}`:'全部资源来自当前归档，无外网请求或缺失')
  add('runtime-errors',delivery,errors.length===0,errors.length?errors.join('；'):'浏览器无未处理脚本错误')
}catch(e){
  // A launch/tool failure must not be confused with a failed functional assertion.
  checks.push({id:'browser-environment',dimensionId:'*',passed:null,message:String(e.message).slice(0,400)})
}finally{
  if(browser)await browser.close()
  await new Promise(r=>server.close(r))
}
process.stdout.write(JSON.stringify({checks}))

