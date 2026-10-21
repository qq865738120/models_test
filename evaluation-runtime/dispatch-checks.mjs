const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms))

export async function checkDispatch(page,{phase,origin,context,seed}){
  const checks=[]
  const map=group=>phase==='change'?({architecture:'regression',query:'regression',pages:'regression',assignment:'regression',async:'races'}[group]||group):group
  const add=(id,group,passed,message)=>checks.push({id,dimensionId:map(group),passed,message})
  const testcase=async(id,group,fn)=>{
    try{const result=await fn();add(id,group,result!==false,result===false?'实际行为与规范不符':'实际操作与HTTP数据核对通过')}
    catch(e){add(id,group,/Target.*closed|crash|disconnect/i.test(String(e.message))?null:false,String(e.message).split('\n')[0].slice(0,220))}
  }
  const by=id=>page.getByTestId(id)
  // A visible drawer/statistic may still be rendering an HTTP response. Poll the
  // required public result rather than treating its loading shell as the answer.
  const until=async(predicate,message,timeout=5000)=>{
    const end=Date.now()+timeout
    do{
      if(await predicate())return
      await pause(40)
    }while(Date.now()<end)
    throw Error(message)
  }
  const select=async(id,value)=>{
    const control=by(id)
    if(await control.evaluate(e=>e.tagName)==='SELECT')await control.selectOption(value)
    else{await control.click();await page.locator(`[role="option"][data-value="${value}"]`).click()}
  }
  const loaded=async()=>{
    await by('orders-table').waitFor({state:'visible',timeout:5000})
    await by('orders-loading').waitFor({state:'hidden',timeout:5000})
  }
  const requestAndLoad=async action=>{
    await Promise.all([
      page.waitForResponse(r=>new URL(r.url()).pathname==='/api/orders',{timeout:5000}),
      Promise.resolve().then(action),
    ])
    await loaded()
  }
  const search=async q=>{
    await by('order-search').fill(q)
    await Promise.all([
      page.waitForResponse(r=>r.url().includes('/api/orders?')&&new URL(r.url()).searchParams.get('q')===q,{timeout:5000}),
      by('search-submit').click(),
    ])
    await loaded()
  }
  const rows=()=>by('order-row').evaluateAll(es=>es.map(e=>e.getAttribute('data-order-id')))
  const calls=[]
  page.on('request',r=>{if(r.url().startsWith(origin+'/api/'))calls.push({method:r.method(),url:r.url(),body:r.postData()})})
  await testcase('http-from-browser','architecture',async()=>{
    await page.reload({waitUntil:'load'});await loaded()
    return calls.some(c=>c.url.includes('/api/orders'))&&JSON.stringify(await rows())===JSON.stringify(seed.slice(0,20).map(r=>r.id))
  })
  await testcase('browser-query-detail','query',async()=>{
    const expected=seed.find(r=>r.status==='pending')
    await search(expected.id)
    if(JSON.stringify(await rows())!==JSON.stringify([expected.id]))return false
    await by('order-row').getByTestId('order-detail').click()
    try{
      await by('detail-drawer').waitFor({state:'visible'})
      await until(async()=>{
        const text=await by('detail-drawer').innerText()
        return [expected.id,expected.customer,expected.address,expected.contents].every(s=>text.includes(s))
      },'详情未展示当前订单的完整字段')
    }finally{
      if(await by('detail-close').isVisible())await by('detail-close').click()
      await by('detail-drawer').waitFor({state:'hidden'})
    }
    return true
  })
  await testcase('query-filter-clear','query',async()=>{
    await requestAndLoad(()=>by('clear-filters').click())
    await requestAndLoad(()=>select('status-filter','pending'))
    const expected=seed.filter(r=>r.status==='pending')
    return JSON.stringify(await rows())===JSON.stringify(expected.slice(0,20).map(r=>r.id))&&Number(await by('total-count').innerText())===expected.length
  })
  await testcase('bulk-confirm-cancel','pages',async()=>{
    await by('order-select').first().check()
    await by('assign-open').click();await by('assign-dialog').waitFor({state:'visible'})
    if(await by('assign-confirm').isEnabled())return false
    await by('assign-cancel').click()
    return await by('order-select').first().isChecked()
  })
  let assignedId
  await testcase('real-ui-assignment','assignment',async()=>{
    assignedId=(await rows())[0]
    await by('assign-open').click();await select('courier-select','P02')
    const [r]=await Promise.all([
      page.waitForResponse(r=>r.url()===origin+'/api/assign'&&r.request().method()==='POST'),
      by('assign-confirm').click(),
    ])
    if(r.status()!==200)return false
    await by('assign-dialog').waitFor({state:'hidden'});await loaded()
    const data=await page.evaluate(async id=>(await fetch('api/orders/'+id)).json(),assignedId)
    return data.status==='assigned'&&data.courierId==='P02'
  })
  await testcase('shared-refresh-state','architecture',async()=>{
    if(!assignedId)return false
    const second=await context.newPage()
    try{
      await second.goto(origin+'/index.html',{waitUntil:'load'})
      const before=await second.evaluate(async id=>(await fetch('api/orders/'+id)).json(),assignedId)
      await page.reload({waitUntil:'load'});await loaded()
      const after=await page.evaluate(async id=>(await fetch('api/orders/'+id)).json(),assignedId)
      return before.status==='assigned'&&after.status==='assigned'&&before.courierId===after.courierId
    }finally{await second.close()}
  })
  await testcase('all-five-pages','pages',async()=>{
    for(const name of ['overview','couriers','reports','settings','orders']){
      await by('nav-'+name).click()
      if(name==='overview'||name==='reports'){
        await by('stats-all').waitFor({state:'visible'})
        const stats=await page.evaluate(async()=>(await fetch('api/stats')).json())
        await until(async()=>{
          for(const status of ['all','pending','assigned','delivered']){
            if(Number(await by('stats-'+status).innerText())!==stats[status])return false
          }
          return true
        },name+'统计未与后端数据一致')
      }
      if(name==='couriers')await until(async()=>await by('courier-assign').count()===3,'配送员页面未展示三名配送员')
      if(name==='settings'){
        await select('page-size','50');await by('settings-save').click()
      }
    }
    await loaded()
    return (await rows()).length===50&&Number(await by('page-number').innerText())===1
  })
  for(const oldFails of [false,true]){
    await testcase('stale-'+(oldFails?'failure':'success'),'async',async()=>{
      await by('nav-orders').click();await loaded()
      const oldQ='PD-0000',newQ='PD-0001'
      const pattern='**/api/orders?**'
      let intercepted
      const ready=new Promise(r=>intercepted=r)
      let routeError
      const handler=async route=>{
        const q=new URL(route.request().url()).searchParams.get('q')
        if(q!==oldQ)return route.continue()
        try{
          const response=await route.fetch()
          intercepted();await pause(700)
          if(oldFails)await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{code:'INTERNAL_ERROR',message:'主持人代理模拟旧请求失败'}})})
          else await route.fulfill({response})
        }catch(error){
          // Aborting an obsolete request is a valid race-handling strategy.
          if(!/abort|cancel/i.test(route.request().failure()?.errorText||''))routeError=error
        }
      }
      await page.route(pattern,handler)
      try{
        await by('order-search').fill(oldQ);await by('search-submit').click()
        await Promise.race([ready,pause(3000).then(()=>{throw Error('未观察到真实旧查询')})])
        await search(newQ);await pause(900)
        if(routeError)throw routeError
        const actual=await rows()
        return actual.length>0&&actual.every(id=>id.toLowerCase().includes(newQ.toLowerCase()))&&!await by('orders-error').isVisible()
      }finally{await page.unroute(pattern,handler)}
    })
  }
  await testcase('query-failure-retry','async',async()=>{
    const pattern='**/api/orders?**';let once=true
    const handler=async route=>{if(!once)return route.continue();once=false;return route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{code:'INTERNAL_ERROR',message:'临时失败，可重试'}})})}
    await page.route(pattern,handler)
    try{
      await by('order-search').fill('PD-');await by('search-submit').click()
      await by('orders-error').waitFor({state:'visible'})
      await by('orders-retry').click();await loaded()
      return !await by('orders-error').isVisible()&&(await rows()).length>0
    }finally{await page.unroute(pattern,handler)}
  })
  if(phase==='change'){
    await testcase('url-first-restore','url',async()=>{
      await page.goto(origin+'/index.html?q='+encodeURIComponent('客户000')+'&status=pending&page=2',{waitUntil:'load'});await loaded()
      return await by('order-search').inputValue()==='客户000'&&Number(await by('page-number').innerText())===2&&(await rows()).every(id=>seed.find(s=>s.id===id)?.status==='pending')
    })
    await testcase('url-submit-and-refresh','url',async()=>{
      await search('PD-0002')
      const url=new URL(page.url())
      if(url.searchParams.get('q')!=='PD-0002'||url.searchParams.get('page')!=='1')return false
      const before=await rows()
      await page.reload({waitUntil:'load'});await loaded()
      return JSON.stringify(await rows())===JSON.stringify(before)
    })
    await testcase('url-history','history',async()=>{
      await search('PD-0003');const a=await rows()
      await search('PD-0004');const b=await rows()
      await requestAndLoad(()=>page.goBack())
      if(JSON.stringify(await rows())!==JSON.stringify(a))return false
      await requestAndLoad(()=>page.goForward())
      return JSON.stringify(await rows())===JSON.stringify(b)
    })
    await testcase('url-invalid-boundaries','boundaries',async()=>{
      await page.goto(origin+'/index.html?status=bad&page=-3&q=%E0%A4%A',{waitUntil:'load'});await loaded()
      const u=new URL(page.url())
      return Number(await by('page-number').innerText())===1&&u.searchParams.get('status')!=='bad'
    })
    await testcase('url-outside-page','boundaries',async()=>{
      await page.goto(origin+'/index.html?status=pending&page=999999',{waitUntil:'load'});await loaded()
      const current=Number(await by('page-number').innerText()),u=new URL(page.url())
      return current>0&&current<999999&&Number(u.searchParams.get('page'))===current&&(await rows()).length>0
    })
  }
  return checks
}
