# 鹈鹕：不止一张大嘴

提示词版本：pelican-prompts-10。本阶段预算：20分钟。

做一个全面、准确介绍鹈鹕这种动物的酷炫网页。页面要美观，有强烈的视觉冲击力，让人眼前一亮。从空白画布独立创作，视觉方向、配色、字体、布局、内容组织、图形、动画与交互都由你决定。

使用纯前端HTML、CSS及可选的JavaScript，交付output/index.html及本地资源，不依赖外网或后端。materials/PELICAN.md仅供核对事实，内容可自由重组和表达；让访客能实际浏览完整介绍。
## HTML 交付约定
最终入口为 `output/index.html`，脚本、样式、图片、数据与运行资源都在 `output/` 内，使用相对路径。本地静态HTTP和iframe均可使用，不依赖外网、父页面、固定端口或额外后端。已有构建工程用 `npm run build` 生成入口。
展示iframe只允许脚本、不提供同源身份；状态使用内存，不能依赖localStorage、IndexedDB或Service Worker。资源与ES模块由预览服务支持跨来源读取。
交付前用本地静态服务检查实际成果。`output/DELIVERY.md`简要列出入口、启动方式、已检查与未检查项目和已知缺陷；不要求长报告，不能用占位页代替成果。

