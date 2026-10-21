"""Public HTTP contract and unimplemented starter for the dispatch task.

This module installs preparation material only. It contains no reference
implementation of the candidate's order-query or assignment logic.
"""
import json
import shutil
from pathlib import Path

CONTRACT_VERSION = 'dispatch-http-v1'
START_TEXT = '''# 前后端分离起始工程

先阅读TASK.md、materials/API.md和materials/HARNESS.md。前端为React + TypeScript；后端必须用Node.js内置模块实现真实HTTP接口，业务数据仅在服务进程内存中，不使用数据库。依赖已经在准备阶段安装，测试时不执行npm install、不联网下载。

两个终端分别运行：
1. `PORT=4174 npm run api`：Node接口，127.0.0.1:4174。
2. `npm run dev`：前端开发页，http://127.0.0.1:5173/；Vite把/api和/health代理到4174。

server/index.mjs只有健康检查和501占位响应，必须自行实现所有业务。materials/orders.json是固定种子，仅后端读取，不能复制到前端或让浏览器直接加载。src/main.ts是空白界面，不是参考答案。

`npm run build`生成output/index.html以及output/server/。生产检查：一个终端运行`PORT=4174 node output/server/index.mjs`，另一个运行`npm run preview`。前端仍通过相对api/路径请求；preview使用相同代理。平台正式展示会分配独立本地端口并转发请求，不需要写死部署地址。

交付必须包括output/index.html、前端资源、output/server/index.mjs及output/server/data/orders.json。后端只能依赖Node内置模块；复制出的output目录无需npm install即可用`node server/index.mjs`启动接口。不要修改固定材料、打包/测量工具和依赖配置。
'''

API_TEXT = '''# 派单HTTP接口契约 · dispatch-http-v1

这是必须实现的公开接口，不是已提供的业务服务。所有业务由参赛者在server/内编写；Node只使用内置模块。前端通过fetch请求，不得使用浏览器Mock、直接读种子、维护另一套订单或假成功提示代替HTTP。

## 进程、数据与响应

- 服务监听127.0.0.1，端口读取环境变量PORT（开发默认4174；评测会分配端口，不得硬编码生产端口）。GET /health返回200 `{"ok":true}`。
- 唯一初始数据为materials/orders.json的10,000条记录，按id升序。服务启动时读取种子并建立内存状态；查询、详情、统计及派单共享此状态。
- 同一进程中的所有浏览器和HTTP客户端共享数据；浏览器刷新不重置订单，服务进程重启才重新读取种子。不使用数据库、文件写回、localStorage、IndexedDB或外部服务持久化业务数据。
- 所有成功/错误响应均为JSON，Content-Type为application/json（可带charset=utf-8）。错误统一为`{"error":{"code":"INVALID_ARGUMENT","message":"可读说明"}}`；message非空，错误不能返回200。
- 错误码：400 INVALID_ARGUMENT（参数/JSON无效）、404 NOT_FOUND（不存在的资源）、409 CONFLICT（订单状态冲突）、405 METHOD_NOT_ALLOWED（已知路径方法不支持）、500 INTERNAL_ERROR（未预期内部异常）。错误不能暴露堆栈或使进程退出。
- 未定义路径404。跨来源访问由开发/展示代理处理；服务无需对外绑定网络，不需要登录、凭据、CORS白名单、数据库或完整静态文件服务器。

## GET /api/orders

查询参数：
- q：字符串，默认空；去除首尾空白后，对id、customer、address做忽略大小写的子串匹配；三字段任一命中即可。
- status：all/pending/assigned/delivered之一，默认all。
- page：十进制正整数，默认1；不接受小数、负数、0、指数形式、NaN或超过JavaScript安全整数范围的值。
- pageSize：十进制正整数1–100，默认20。
- 参数省略使用默认值；显式空status/page/pageSize非法。重复同名查询参数以及未知查询参数返回400，非法百分号编码不能导致进程崩溃并返回400。

先筛选，再按id升序分页。返回200 `{"items":[完整订单...],"total":匹配总数,"page":请求页,"pageSize":请求页大小}`。超出结果范围的合法页返回空items、真实total，保留请求页，不由接口偷偷改变页码。0条结果仍返回200。订单字段与种子保持一致，派单只改变status和courierId。

## GET /api/orders/:id

路径ID对应种子订单编号，返回200完整订单对象；不存在返回404 NOT_FOUND。详情必须反映当前内存状态。路径编码非法返回400。

## GET /api/couriers

返回200 `{"items":[{"id":"P01","name":"鹈鹕一号"},{"id":"P02","name":"鹈鹕二号"},{"id":"P03","name":"鹈鹕三号"}]}`。

## GET /api/stats

返回200 `{"all":10000,"pending":5000,"assigned":2500,"delivered":2500,"updatedAt":"ISO 8601时间"}`（示例为初始状态）。数量从当前内存计算，各项属于一次读取的同一状态，pending+assigned+delivered=all。updatedAt是该次统计成功读取的时间，不能硬编码。统计不随订单页搜索词变化。

## POST /api/assign

请求Content-Type为application/json；JSON对象`{"ids":["PD-00001"],"courierId":"P01"}`。

- ids必须为1–100个非空字符串组成的数组，不能重复；courierId只能为P01/P02/P03。缺字段、额外字段、错误类型、空/重复/过多ID、未知配送员、无效JSON或非JSON Content-Type均为400 INVALID_ARGUMENT。请求体最多64KiB，超过返回400。
- 完成形状校验后，任何ID不存在，整批404 NOT_FOUND；所有ID存在但有任何订单非pending，整批409 CONFLICT。
- 必须先验证整批再提交；成功时这批订单全部改为assigned及指定courierId，返回200 `{"items":[更新后的完整订单...]}`，顺序与请求ids一致。
- 任何失败不得修改任何订单。两个并发请求包含同一待派订单，只能一方成功，另一方409；不能双重派单、部分提交或覆盖成功方配送员。
- 不要求幂等键。已成功派出的订单再提交为409，前端应显示冲突并刷新真实状态；用户取消或客户端请求失败不能伪造业务成功。

## 前端请求与数据行为

使用相对地址，例如`fetch(new URL('api/orders', document.baseURI))`；详情、派单和统计同样使用api/前缀，不使用以/开头的固定站点根路径，不写死端口，也不读父窗口。代理会保留API方法、请求体与状态码。
五页共用同一服务。派单成功后刷新列表/详情/统计；刷新整个浏览器后仍能看到已派订单。页大小设置只在前端内存生效，恢复默认不能重置后端订单。
列表、详情、统计分别处理加载、错误、空结果与重试；只允许各自最新请求改变展示及加载/错误状态。可通过开发者工具请求拦截、离线切换或本地测试代理制造延迟、断连与错误；无需编写公开reset、故障注入或管理员业务接口。

## 视觉参考与性能

视觉、布局与交互要求以当前题目提示词为准。public/materials/reference.svg用于理解题目已明确的视觉要求，不在提示词之外额外规定导航、顶栏、间距、行高或组件结构；提示词未明确限定的设计由实现自行决定。
生产构建1440×900/DPR1，预热10秒，搜索30次、间隔500ms。tools/performance.js的input为绘制时机近似，应结合可见反馈；输入反馈P95≤100ms，不含HTTP等待。不一次渲染10,000条记录。
'''

HARNESS_TEXT = '''# 开发与验收接口规范 · dispatch-http-v1

## 必须稳定的程序接口

固定入口为output/index.html和output/server/index.mjs。评测器从output作为工作目录执行`node server/index.mjs`，通过PORT传入独立回环端口；GET /health用来确认进程可访问。服务不能依赖外部工作目录、npm安装、项目外文件或数据库。

前端和Node分别运行。评测展示按当前运行/成果版本转发相对api/及health请求到对应Node进程，前端仍以`new URL('api/orders', document.baseURI)`一类地址访问。不要为评测器制造假数据、测试专属成功分支或向父页面通信。

tools/package-server.mjs只负责把server/原样打包到output/server/，并复制固定种子到output/server/data/orders.json，不实现任何业务。提供resolveSeedPath()仅用于找到开发/交付种子；你需要自己读取JSON、建立内存状态、实现路由与业务逻辑。

## 自动验收的公开范围

HTTP可以直接核验：接口与返回结构、筛选分页详情、三个配送员、统计数值、参数校验、整批原子性、并发冲突、跨客户端共享状态及重启复位。任何HTTP客户端都必须得到相同业务结果，不能针对评测请求返回预设答案。

前端功能、视觉和交互由主持人依据当前题目提示词实际操作评审。控件结构、标签名称、语义标记、组件库和视觉布局由实现自行决定；工作台对接不要求特定DOM标记或浏览器自动检查接口。界面应让评审者能够理解并完成题目要求的操作，不能用隐藏节点或静态文字代替真实功能。

## 本地自测

启动服务后可以用curl访问/health与各API，使用两个独立HTTP客户端检查共享状态和并发派单；重启进程检查复位。用浏览器完成查询、选中、取消/确认、详情、统计及设置联动。断开后端或拦截请求检查前端错误/重试和乱序响应，测试完恢复正常环境。
只执行本地回环请求，不接外网服务。固定材料与工具不能修改；实现及output/DELIVERY.md应如实记录已测、未测和缺陷。
'''


def seed_orders():
    """Deterministic public input; never a candidate-side mutable data source."""
    rows = []
    for i in range(1, 10001):
        status = ['pending', 'pending', 'assigned', 'delivered'][i % 4]
        rows.append({
            'id': f'PD-{i:05}', 'customer': f'客户{i:05}',
            'address': f'{["创意园", "科技园", "大学城", "滨江园"][i % 4]}{i % 30 + 1}栋{i % 20 + 1}层',
            'status': status, 'courierId': f'P0{i % 3 + 1}' if status != 'pending' else None,
            'priority': ['normal', 'urgent'][int(i % 7 == 0)],
            'createdAt': f'2026-10-18T{8 + i % 10:02}:{i % 60:02}:00+08:00',
            'contents': ['布丁', '开发板', '文档', '咖啡'][i % 4],
            'note': '轻拿轻放' if i % 7 == 0 else '',
        })
    return rows


def install(project, template_root=None):
    """Install the HTTP starter into a new preparation staging project."""
    project = Path(project)
    template = (Path(template_root) if template_root else Path(__file__).resolve().parents[1] / 'templates') / '03-dispatch'
    for relative in ('src', 'server'):
        shutil.copytree(template / relative, project / relative, dirs_exist_ok=True)
    (project / 'tools').mkdir(parents=True, exist_ok=True)
    shutil.copyfile(template / 'tools/package-server.mjs', project / 'tools/package-server.mjs')
    for name in ('package.json', 'vite.config.ts', 'package-lock.json'):
        # Small lifecycle fixtures may deliberately omit npm lockfiles.
        if (template / name).exists():
            shutil.copyfile(template / name, project / name)
    for relative in (
        'public/materials/mock-api.js', 'public/materials/orders.json',
        'tools/mock-server.mjs', 'output/materials/mock-api.js', 'output/materials/orders.json',
    ):
        (project / relative).unlink(missing_ok=True)
    material = project / 'materials'
    material.mkdir(parents=True, exist_ok=True)
    for name, text in {'API.md': API_TEXT, 'HARNESS.md': HARNESS_TEXT, 'START.md': START_TEXT}.items():
        (material / name).write_text(text, encoding='utf-8')
    (material / 'orders.json').write_text(
        json.dumps(seed_orders(), ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (material / 'contract.json').write_text(json.dumps({
        'version': CONTRACT_VERSION, 'delivery': 'node-http',
        'frontend': 'output/index.html', 'server': 'output/server/index.mjs',
        'productionSeed': 'output/server/data/orders.json',
        'host': '127.0.0.1', 'portEnvironment': 'PORT', 'developmentPort': 4174,
        'health': '/health', 'apiPrefix': '/api', 'state': 'process-memory',
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
