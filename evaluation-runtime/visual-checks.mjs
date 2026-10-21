import fs from 'node:fs/promises'
import path from 'node:path'

export async function checkSvg(page,{phase}){
  const rows=[],add=(id,d,passed,message)=>rows.push({id,dimensionId:d,passed,message})
  const mapping=phase==='change'?{anatomy:'sync',pedals:'sync',timeline:'retiming',loop:'continuity'}:{anatomy:'anatomy',pedals:'pedals',timeline:'timeline',loop:'loop'}
  const ids=['pelican','bike','wheel-front','wheel-back','pedal-left','pedal-right','foot-left','foot-right','wing-left','wing-right','handlebar','seat','tray','pudding','head']
  const setup=await page.evaluate(ids=>{
    const svg=document.querySelector('svg[data-eval="scene"]')
    return {root:!!svg,viewBox:svg?.getAttribute('viewBox')?.trim().split(/[\s,]+/).map(Number),
      forbidden:!!document.querySelector('script,svg image,svg foreignObject'),
      missing:ids.filter(id=>document.querySelectorAll(`[data-eval="${id}"]`).length!==1)}
  },ids)
  add('svg-viewbox','delivery',JSON.stringify(setup.viewBox)==='[0,0,640,480]','根SVG viewBox为0 0 640 480')
  add('svg-technology','delivery',!setup.forbidden,'无JavaScript、位图或foreignObject代替SVG绘制')
  add('svg-identities',mapping.anatomy,setup.root&&setup.missing.length===0,setup.missing.length?'缺少或重复实际部件标识：'+setup.missing.join(','):'实际角色/车/踏板等部件均有唯一身份')
  if(!setup.root||setup.missing.length){
    for(const d of new Set(Object.values(mapping)))add('svg-unobservable-'+d,d,false,'缺少必需真实部件，无法核验其几何与动画')
    return rows
  }
  const sample=async t=>page.evaluate(({ids,t})=>{
    const svg=document.querySelector('svg[data-eval="scene"]')
    svg.pauseAnimations();svg.setCurrentTime(t)
    for(const animation of document.getAnimations()){animation.pause();animation.currentTime=t*1000}
    const root=svg.getBoundingClientRect(),scale=root.width/640
    const result={scale,root:{x:root.x,y:root.y,w:root.width,h:root.height}}
    for(const id of ids){
      const el=document.querySelector(`[data-eval="${id}"]`),r=el.getBoundingClientRect(),m=el.getCTM()
      result[id]={x:r.x,y:r.y,w:r.width,h:r.height,cx:r.x+r.width/2,cy:r.y+r.height/2,
        visible:r.width>0&&r.height>0&&(el.checkVisibility?el.checkVisibility({checkOpacity:true,checkVisibilityCSS:true}):getComputedStyle(el).visibility!=='hidden'),
        matrix:m?[m.a,m.b,m.c,m.d,m.e,m.f]:[]}
    }
    return result
  },{ids,t})
  const period=phase==='change'?8:6,rideEnd=period-4
  const times=[.01,.25,.5,.75,1,rideEnd+.5,rideEnd+1.5,rideEnd+3,.01+period,.01+2*period,period-.01]
  const frames=[]
  for(const t of times)frames.push(await sample(t))
  const first=frames[0],distance=(a,b)=>Math.hypot(a.cx-b.cx,a.cy-b.cy)/first.scale
  const intersects=(a,b,t=8)=>a.x<=b.x+b.w+t*first.scale&&a.x+a.w>=b.x-t*first.scale&&a.y<=b.y+b.h+t*first.scale&&a.y+a.h>=b.y-t*first.scale
  add('svg-visible-parts',mapping.anatomy,frames.every(f=>ids.every(k=>f[k].visible)),'采样帧实际图形可见，非透明标记或空组')
  add('svg-riding-contact',mapping.anatomy,frames.every(f=>intersects(f.pelican,f.seat)&&intersects(f['wing-left'],f.handlebar)&&intersects(f['wing-right'],f.handlebar)),'身体与座位、双翼与车把在关键帧保持接触')
  add('svg-feet-on-pedals',mapping.pedals,frames.every(f=>distance(f['foot-left'],f['pedal-left'])<=8&&distance(f['foot-right'],f['pedal-right'])<=8),'双足中心与对应踏板中心在各采样帧误差≤8单位')
  const motion=frames.slice(1,5).some(f=>distance(f['pedal-left'],first['pedal-left'])>2)
  const center=f=>({x:(f['pedal-left'].cx+f['pedal-right'].cx)/2-f.bike.cx,y:(f['pedal-left'].cy+f['pedal-right'].cy)/2-f.bike.cy})
  const c=center(first)
  add('svg-opposed-pedals',mapping.pedals,motion&&frames.slice(0,5).every(f=>Math.hypot(center(f).x-c.x,center(f).y-c.y)/first.scale<=3),'踏板真实运动，左右踏板的共同曲柄中心稳定')
  const relative=(f,a,b,axis='cy')=>(f[a][axis]-f[b][axis])/first.scale
  const bounce=Math.abs(frames[5].bike.cy-first.bike.cy)/first.scale>1
  const lift=relative(first,'pudding','tray')-relative(frames[6],'pudding','tray')>4
  const back=Math.abs(relative(frames[7],'pudding','tray')-relative(first,'pudding','tray'))<4
  const head=frames[7].head.matrix.some((v,i)=>Math.abs(v-first.head.matrix[i])>(i<4?.03:2))
  add('svg-bump-event',mapping.timeline,bounce,'指定颠簸段中车体发生可见竖直运动')
  add('svg-pudding-event',mapping.timeline,lift&&back,'指定腾空段布丁离盘，随后回到原托盘')
  add('svg-look-event',mapping.timeline,head,'指定回头段头部真实改变姿态')
  const invariant=f=>ids.every(k=>distance(f[k],first[k])<2&&Math.abs(f[k].w-first[k].w)/first.scale<2)
  add('svg-three-cycles',mapping.loop,invariant(frames[8])&&invariant(frames[9]),'同一相位跨三个周期无累计漂移')
  add('svg-loop-seam',mapping.loop,invariant(frames[10]),'循环首尾采样无明显位置或比例跳变')
  add('svg-bounds',mapping.loop,frames.every(f=>ids.every(k=>f[k].x>=f.root.x-2&&f[k].y>=f.root.y-2&&f[k].x+f[k].w<=f.root.x+f.root.w+2&&f[k].y+f[k].h<=f.root.y+f.root.h+2)),'全部实际部件在运动极值保持入画')
  return rows
}

export async function checkStatic(page,{phase,initialText}){
  const rows=[],add=(id,d,passed,message)=>rows.push({id,dimensionId:d,passed,message})
  const d=phase==='change'?'navigation':'reading'
  for(const size of [{width:1440,height:900},{width:390,height:844}]){
    await page.setViewportSize(size)
    const result=await page.evaluate(()=>{
      const main=document.querySelector('main')
      const anchors=[...document.querySelectorAll('a[href^="#"]')]
      return {main:!!main&&main.getBoundingClientRect().height>0,
        overflow:document.documentElement.scrollWidth>innerWidth+2,
        images:[...document.images].every(i=>i.hasAttribute('alt')&&i.complete&&i.naturalWidth>0),
        targets:anchors.every(a=>{try{return a.hash.length>1&&!!document.getElementById(decodeURIComponent(a.hash.slice(1)))}catch{return false}}),
        emptyButtons:[...document.querySelectorAll('button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')&&!b.getAttribute('aria-labelledby')).length,
        tinyText:[...document.querySelectorAll('main p')].filter(e=>e.textContent.trim()&&parseFloat(getComputedStyle(e).fontSize)<12).length}
    })
    add('static-layout-'+size.width,d,result.main&&!result.overflow&&result.tinyText===0,`${size.width}px下主内容存在、无整页横向溢出、正文不小于12px`)
    add('static-images-'+size.width,d,result.images,'图片加载且提供alt')
    add('static-navigation-'+size.width,d,result.targets&&result.emptyButtons===0,'页内锚点有目标、可点击按钮有名称')
  }
  const topics=await page.locator('[data-topic]').evaluateAll(es=>Object.fromEntries(es.map(e=>[e.getAttribute('data-topic'),e.textContent.trim().length])))
  const complete=['appearance','habitat','feeding','behavior','breeding','species','conservation'].every(k=>topics[k]>=20)
  // Presence is a mechanical layout criterion, not a claim that zoology is correct.
  add('static-topic-sections',d,complete,'七个知识主题均有可定位正文；事实与表达质量由人工另评')
  if(phase==='change'){
    const card=page.getByTestId('kids-card'),link=page.getByTestId('kids-link'),copy=page.getByTestId('kids-copy')
    add('kids-structure','navigation',await card.count()===1&&await link.count()===1&&await copy.count()===1,'儿童区、正文与页内入口唯一可定位')
    if(await link.count()===1){
      try{await link.click();add('kids-link-works','navigation',await card.isVisible(),'页内入口到达实际儿童区')}catch{add('kids-link-works','navigation',false,'儿童区入口不可操作')}
    }
    const text=(await page.locator('main').innerText().catch(()=>'' )).replace(/\s+/g,'')
    const previous=typeof initialText==='string'?initialText.replace(/\s+/g,''):''
    const fragments=previous.split(/[。！？.!?]/).filter(s=>s.length>=12)
    add('static-preserved','preservation',fragments.length?fragments.every(s=>text.includes(s)):null,
      fragments.length?'初始已归档正文的实质句子仍保留':'未导入初始HTML正文，内容保留检查待核验')
    if(await copy.count()===1){
      const n=(await copy.innerText()).replace(/\s+/g,'').length
      add('kids-word-limit','navigation',n>0&&n<=180,`儿童正文${n}字，按公开口径不超过180字`)
    }
  }
  return rows
}
