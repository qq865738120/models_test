import React from 'react'
import { createRoot } from 'react-dom/client'
// 起始项目仅检查运行环境，不提供派单业务实现。
createRoot(document.getElementById('app')!).render(
  React.createElement('main', { style: { padding: 32, fontFamily: 'sans-serif' } },
    React.createElement('h1', null, '派单后台：空白起始工程'),
    React.createElement('p', null, '请阅读 TASK.md、materials/API.md 和 materials/HARNESS.md。自行实现 Node.js HTTP 服务与 React 界面，接口骨架需另行启动。'))
)
