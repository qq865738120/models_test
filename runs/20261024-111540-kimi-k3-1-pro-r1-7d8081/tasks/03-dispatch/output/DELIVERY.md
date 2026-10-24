# 一万只鹈鹕的派单后台 · 交付说明

## 启动与入口

- 前端归档：`output/index.html`，脚本与样式均位于 `output/assets/`，使用本地相对路径。
- 后端入口：`output/server/index.mjs`，固定种子位于 `output/server/data/orders.json`。
- 在 `output/` 目录执行：`PORT=4174 node server/index.mjs`。
- 服务仅监听 `127.0.0.1`，端口由 `PORT` 决定。生产预览由工作台启动此后端并转发前端相对 `api/` 请求。
- 开发模式：项目根目录分别执行 `npm run api` 与 `npm run dev`；构建执行 `npm run build`。

## 已实现

- 总览、订单派送、配送员、运行报表、设置五个独立页面，共享同一 Node 进程内存状态。
- 完整实现 `/health`、`/api/orders`、`/api/orders/:id`、`/api/couriers`、`/api/stats` 与 `POST /api/assign`。
- 搜索、状态筛选、真实分页、当前页待派订单选择、批量确认、详情抽屉、失败重试、统计快照和会话内页容量设置。
- 后端参数与请求体验证、统一错误结构、整批原子提交、并发冲突保护；服务重启恢复固定种子。
- 列表、详情、统计请求只接受各自最新响应；弹层支持 Esc、焦点进入/返回与背景关闭，移动端表格内部横向滚动。

## 实际验证

- `npm run build`：TypeScript 类型检查、Vite 生产构建及服务/种子打包成功。
- `node research/api-test.mjs`：14 组真实 HTTP 检查通过，覆盖健康检查、搜索筛选、分页、参数错误、404/405、统计、派单校验、未知订单与状态冲突原子失败、成功批量派单、并发仅一方成功、统计同步和重启复位。
- `node research/browser-test.mjs`：7 组真实 Chrome 交互检查通过，覆盖当前页 20 条 DOM、选择并确认派单、详情、派单后报表、50 条设置、配送员预选与取消保留选择。
- 已在 1440×900 和 390×844 视口截图检查；移动视口 `document.documentElement.scrollWidth` 为 390px，无整页横向溢出。
- 自测脚本启动的服务和浏览器均已关闭。

## 未专项验证

- 未运行 `tools/performance.js` 的输入反馈 P95 采样。
- 未通过请求代理额外注入延迟/失败来专项复现慢 A、快 B 乱序；实现使用请求序号与中止控制避免旧请求覆盖新状态。
