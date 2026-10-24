# 交付说明

## 入口与启动

- 入口：`output/index.html`
- 本地资源：`output/styles.css`、`output/script.js`，均使用相对路径；无构建步骤、后端或外网依赖。
- 在项目根目录运行：`python3 -m http.server 5173 --bind 127.0.0.1 --directory output`
- 浏览器打开：`http://127.0.0.1:5173/`

## 已检查

- 使用本地静态 HTTP 服务与本机 Chrome 实际加载页面，检查了 1440 × 1000 桌面视口和 390 × 844 移动视口及主要章节布局。
- 实际点击验证：三种物种档案切换、身体部位解说、三种捕食方式、观鸟守则进度、来源展开与移动导航展开。
- `script.js` 通过 Node 语法检查；HTML 无重复 ID；引用的本地资源均存在；未发现外部资源 URL。
- 页面状态仅保存在内存，未使用 localStorage、IndexedDB 或 Service Worker。验证后临时服务器已停止。

## 未检查与已知限制

- 未在 Safari、Firefox 及真实触屏设备上测试，也未进行完整屏幕阅读器测试。
- 插画为原创风格化结构/行为示意，不用于精确比例或物种形态鉴定；未提供音频。
