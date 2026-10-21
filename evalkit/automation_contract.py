"""Current workbench delivery notes; historical checker identity stays stable."""
from pathlib import Path

# Archived checker reports still refer to this version.
VERSION = 'pelican-checks-1'
DELIVERY_VERSION = 'pelican-delivery-2'

COMMON = f"""# 工作台对接说明 · {DELIVERY_VERSION}

题目内容以当前阶段提示词为准；本文件仅说明工作台如何打开和核对交付，不增加画面、布局、关卡、对象坐标、玩法或实现结构要求。

最终入口为output/index.html，脚本、样式、图片、数据与运行资源一并放在output/内，使用本地相对路径，不请求外网。作品应能通过本地静态HTTP打开，并在工作台iframe中使用。

展示iframe允许脚本，但不提供同源身份。作品不能依赖父页面、固定部署端口、localStorage、IndexedDB或Service Worker；前端临时状态可保存在当前页面内存中。预览服务支持本地资源与ES模块的跨来源读取。

主持人核对实际可见、可操作的成果。交付说明如实记录启动方式、已检查和未检查项目及已知问题，不自行宣称评分或核验通过。
"""

MANUAL = """
## 人工检查

本题由主持人打开作品实际观看或操作，再按题目要求评分。画面、控件与游戏内部结构由实现者安排；工作台不需要额外的元素标识、游戏观测接口或测试驱动。题目提示词明确要求的交付和验证记录仍按提示词完成。
"""

DISPATCH = """
## 前后端对接

真实HTTP接口按materials/API.md实现；启动、打包与预览代理按materials/HARNESS.md接入。前端通过相对于当前HTML目录的api/地址请求本成果的Node服务，由工作台转发至该成果的独立回环端口。

订单业务状态按materials/API.md保存在Node服务进程内存中，同一服务的页面与HTTP客户端共享；页面刷新不重置订单。
接口使用同一套实际业务逻辑和数据；主持人操作前端并核对HTTP响应。题目所引用的控件标识约定不要求特定DOM标记，只需让实际可见控件正常操作；页面布局与组件结构按题目要求自行实现。
"""


def install(project, key):
    if key == '06-memory':
        return
    content = COMMON + {
        '01-svg': MANUAL,
        '02-static': MANUAL,
        '03-dispatch': DISPATCH,
        '04-game2d': MANUAL,
        '05-game3d': MANUAL,
    }[key]
    dest = Path(project) / 'materials/EVAL.md'
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding='utf-8')
