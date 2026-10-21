# 前后端分离起始工程

先阅读TASK.md、materials/API.md和materials/HARNESS.md。前端为React + TypeScript；后端必须用Node.js内置模块实现真实HTTP接口，业务数据仅在服务进程内存中，不使用数据库。依赖已经在准备阶段安装，测试时不执行npm install、不联网下载。

两个终端分别运行：
1. `PORT=4174 npm run api`：Node接口，127.0.0.1:4174。
2. `npm run dev`：前端开发页，http://127.0.0.1:5173/；Vite把/api和/health代理到4174。

server/index.mjs只有健康检查和501占位响应，必须自行实现所有业务。materials/orders.json是固定种子，仅后端读取，不能复制到前端或让浏览器直接加载。src/main.ts是空白界面，不是参考答案。

`npm run build`生成output/index.html以及output/server/。生产检查：一个终端运行`PORT=4174 node output/server/index.mjs`，另一个运行`npm run preview`。前端仍通过相对api/路径请求；preview使用相同代理。平台正式展示会分配独立本地端口并转发请求，不需要写死部署地址。

交付必须包括output/index.html、前端资源、output/server/index.mjs及output/server/data/orders.json。后端只能依赖Node内置模块；复制出的output目录无需npm install即可用`node server/index.mjs`启动接口。不要修改固定材料、打包/测量工具和依赖配置。
