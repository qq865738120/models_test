"""主持人题库与评分标准；现有轮次使用各自固定副本。"""
import copy
from .task_revision import INITIAL, CHANGE, apply_revision
from .hybrid_revision import (apply as apply_hybrid, PROMPT_VERSION, RUBRIC_VERSION,
                              DISPATCH_INITIAL, DISPATCH_CHANGE, GAME2D_VISUAL)

SUITE_ID = 'pelican-v1.0'
SUITE_NAME = '鹈鹕测评 v1.0'

# Directory IDs and displayed numbers use the same six-task order.
_BASE = [
    dict(id='01-svg', title='鹈鹕骑车送布丁', shortTitle='SVG 动画', category='编码',
         level='入门', minutes=10, changeMinutes=5, color='#e9a86b', icon='bike',
         description='一只鹈鹕、一辆自行车、一份摇摇欲坠的布丁。用六秒钟讲清楚故事，也让每个部件真正连在一起。'),
    dict(id='03-dispatch', title='一万只鹈鹕的派单后台', shortTitle='前端交互', category='前端开发',
         level='中级', minutes=25, changeMinutes=10, color='#78bbb4', icon='layout',
         description='把一万条订单做成美观、友好的业务产品。查找、选择、确认顺畅，跨页操作与请求失败中数据仍一致。'),
    dict(id='04-game2d', title='鹈鹕快递大作战', shortTitle='2D 游戏', category='游戏开发',
         level='进阶', minutes=45, changeMinutes=15, color='#a2b7df', icon='gamepad',
         description='穿越平台、避开机器人，把三份快递带到出口。控制、碰撞与一局规则都要经得起实玩。'),
    dict(id='05-game3d', title='鹈鹕叉车驾校', shortTitle='3D 建模与游戏', category='游戏开发',
         level='高级', minutes=60, changeMinutes=20, color='#b39cd8', icon='box',
         description='精雕叉车的机械结构和鹈鹕驾驶员，用材质、灯光与阴影打造高画质仓库，再真正完成三箱搬运。'),
    dict(id='06-memory', title='五十篇论文，一部长篇', shortTitle='长文本推理', category='研究',
         level='中级', minutes=120, changeMinutes=30, color='#b87c76', icon='brain',
         description='从长文本中精确检索、辨析条件并对应跨材料关系。只交答案，按标准答案自动评分。'),
]
CATALOG = apply_hybrid(apply_revision(_BASE))
for number, task in enumerate(CATALOG, 1):
    if task['number'] != f'{number:02}' or task['id'].split('-', 1)[0] != task['number']:
        raise ValueError('题目目录编号必须与题号一致且连续')

DELIVERY = '''
## HTML 交付约定
最终入口为 `output/index.html`，脚本、样式、图片、数据与运行资源都在 `output/` 内，使用相对路径。本地静态HTTP和iframe均可使用，不依赖外网、父页面、固定端口或额外后端。已有构建工程用 `npm run build` 生成入口。
展示iframe只允许脚本、不提供同源身份；状态使用内存，不能依赖localStorage、IndexedDB或Service Worker。资源与ES模块由预览服务支持跨来源读取。
交付前用本地静态服务检查实际成果。`output/DELIVERY.md`简要列出入口、启动方式、已检查与未检查项目和已知缺陷；不要求长报告，不能用占位页代替成果。
'''


def catalog():
    from .objective import task_spec
    return [task_spec(t) if t['id'] == '06-memory' else copy.deepcopy(t) for t in CATALOG]


def candidate_task(key, standard):
    task = next(t for t in CATALOG if t['id'] == key)
    if key == '06-memory':
        from .objective import render_prompt
        return f"# {task['title']}\n\n本阶段预算：{task['minutes']}分钟。\n\n" + render_prompt('initial')
    # Never index the five-task original standard by the six-task display number.
    body = DISPATCH_INITIAL if key == '03-dispatch' else INITIAL[key]
    if key == '04-game2d':
        body += '\n\n' + GAME2D_VISUAL
    delivery = ('''## 全栈交付约定
交付前端output/index.html和后端output/server/index.mjs，附带构建生成的固定种子与本地资源。后端仅使用Node内置模块，不要求数据库；按materials/HARNESS.md在独立回环端口运行。前端通过主持人预览代理调用同一成果的真实HTTP接口。iframe不提供同源身份，不能依赖浏览器持久存储。简要记录启动、已核验和未完成项目到output/DELIVERY.md。
''' if key == '03-dispatch' else DELIVERY)
    verification = '' if key == '02-static' else '\n\n工作台交付与预览方式见materials/EVAL.md。题目内容以本提示词为准，项目说明不另行增加设计限制。\n'
    return (f"# {task['title']}\n\n提示词版本：{PROMPT_VERSION}。本阶段预算：{task['minutes']}分钟。\n\n"
            + body + verification + delivery)


def candidate_change(key, standard):
    """Only the authorized stage is released; future prompts stay host-side."""
    if key == '06-memory':
        from .objective import render_prompt
        return render_prompt('change')
    body = DISPATCH_CHANGE if key == '03-dispatch' else CHANGE[key]
    if key == '04-game2d':
        body += '\n修改后仍须保持高质量场景、角色、HUD和动作反馈。新增快递状态清楚可辨，减速有明确提示但不造成输入迟滞；视觉完成度与手感分别评价。'
    return f'提示词版本：{PROMPT_VERSION}。\n\n{body}\n'
