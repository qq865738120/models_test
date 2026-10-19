import React from 'react'
import { createRoot } from 'react-dom/client'
// 起始项目仅检查运行环境，不提供派单业务实现。
createRoot(document.getElementById('app')!).render(
  React.createElement('main', { style: { padding: 32, fontFamily: 'sans-serif' } },
    React.createElement('h1', null, '派单后台：空白起始工程'),
    React.createElement('p', null, '请读取 TASK.md、materials/ 和 public/materials/。Mock 服务另行启动。'))
)
