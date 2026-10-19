# 浏览器内 Mock API
从 public/materials/mock-api.js 导入createMockApi，调用 await createMockApi() 得到独立API实例。生产页面用相对URL引入 materials/mock-api.js；数据从同目录orders.json加载。无需后端，不依赖固定端口。
- await api.query({q:'',status:'all',page:1,pageSize:20}) → {items,total,page,pageSize}。status取all/pending/assigned/delivered；默认180ms延迟；q对id/customer/address忽略大小写匹配。
- await api.detail(id) → 完整订单，不存在抛出Error。
- await api.assign({ids:[订单ID],courierId:'P01'}) → {items}。P01/P02/P03分别为鹈鹕一/二/三号；每批最多100单，仅pending可派，整批原子处理。错误抛出Error且数据不变。
- api.control({reset:true})重置；{delays:{a:900,b:100}}按搜索词强制延迟；{failNextQuery:true}或{failNextAssign:true}让下一请求失败。控制接口只用于自测，不得在业务流程绕过错误。
参考图public/materials/reference.svg为1440×900；左侧导航220px、顶栏72px、内容内边距32px、表格行高56px；使用系统sans-serif字体。手机可重排，关键操作可达且整页不横向溢出。
生产构建1440×900/DPR1，预热10秒、搜索30次、间隔500ms。tools/performance.js input近似测量绘制时机，结合可见反馈记录；P95≤100ms，不含API等待。不一次渲染10000条记录。
