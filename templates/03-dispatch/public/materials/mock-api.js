// 固定浏览器内Mock；每个页面实例拥有独立状态。
const clone = value => JSON.parse(JSON.stringify(value))
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
export async function createMockApi() {
  const response = await fetch(new URL('./orders.json', import.meta.url))
  if (!response.ok) throw Error('订单材料加载失败')
  return createMockApiFromData(await response.json())
}
export function createMockApiFromData(original) {
  let orders = clone(original)
  let settings = { delays: {}, failNextQuery: false, failNextAssign: false }
  return {
    control(next) {
      if (next.reset) { orders = clone(original); settings = { delays: {}, failNextQuery: false, failNextAssign: false } }
      for (const key of ['delays','failNextQuery','failNextAssign']) if (key in next) settings[key] = clone(next[key])
    },
    async query({ q = '', status = 'all', page = 1, pageSize = 20 } = {}) {
      if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100 || !['all','pending','assigned','delivered'].includes(status)) throw Error('查询参数不合法')
      q = q.trim().toLowerCase()
      const rows = orders.filter(x => (status === 'all' || x.status === status) && [x.id,x.customer,x.address].some(v=>v.toLowerCase().includes(q)))
      const result = clone({items:rows.slice((page-1)*pageSize,page*pageSize),total:rows.length,page,pageSize})
      const fail = settings.failNextQuery; settings.failNextQuery = false
      await wait(settings.delays[q] ?? 180)
      if (fail) throw Error('模拟查询失败')
      return result
    },
    async detail(id) {
      const row = orders.find(x=>x.id===id)
      if (!row) throw Error('订单不存在')
      return clone(row)
    },
    async assign({ids,courierId}) {
      if (!Array.isArray(ids) || !ids.length || ids.length>100 || !['P01','P02','P03'].includes(courierId)) throw Error('派单参数不合法')
      const rows = orders.filter(x=>ids.includes(x.id))
      if (rows.length!==new Set(ids).size || rows.some(x=>x.status!=='pending')) throw Error('只能派送待派单订单，整批未修改')
      const fail = settings.failNextAssign; settings.failNextAssign = false
      await wait(350)
      if (fail) throw Error('模拟派单失败，服务端未修改')
      if (rows.some(x=>x.status!=='pending')) throw Error('订单已被其他请求派出，整批未修改')
      rows.forEach(x=>{x.status='assigned';x.courierId=courierId})
      return clone({items:rows})
    }
  }
}
