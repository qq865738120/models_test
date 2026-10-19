"""主持人题库与评分标准：不分发到参赛工作区。"""
import copy

SUITE_ID='pelican-v1.0'
SUITE_NAME='鹈鹕测评 v1.0'
RUBRIC_VERSION='pelican-rubric-4'

def d(key,name,weight,description,mid,full):
    return {'id':key,'name':name,'weight':weight,'description':description,'anchors':[
        {'score':0,'text':'未实现、无法使用，或没有可信证据。'},
        {'score':5,'text':mid},{'score':10,'text':full}]}

CATALOG=[
 {'id':'01-svg','number':'01','title':'鹈鹕骑车送布丁','shortTitle':'SVG 动画','category':'编码','level':'入门','minutes':10,'changeMinutes':5,'color':'#e9a86b','icon':'bike',
  'description':'一只鹈鹕、一辆自行车、一份摇摇欲坠的布丁。用六秒钟，讲清楚一个有趣的故事。',
  'capabilities':['SVG 编码能力','动画设计能力','平面空间理解能力'],
  'brief':['制作有完整骑乘关系的侧视 SVG 动画，内联在 HTML 中。','按固定时间线颠起布丁、回头查看，并连续循环。','双脚与踏板同步，布丁回到托盘，主体完整可见。'],
  'rubric':[
   d('structure','形体与空间关系',25,'检查角色、自行车和布丁的结构与连接。','主体可辨，握持或骑乘关系存在错误。','结构完整，握持、骑乘和脚踏关系准确。'),
   d('timing','动作与时间线',25,'核对四段事件的时长、先后和部件同步。','事件大致正确，时序或同步有明显偏差。','时间线准确，脚踏、颠动和回头协调。'),
   d('continuity','连续性与稳定性',20,'检查三个循环、运动极值和落点。','可以循环，仍有跳变、穿模或落点问题。','三次循环连续，无明显穿模、漂移和出画。'),
   d('evidence','验证与交付',10,'HTML、源码和关键时刻的验证记录。','可打开，但验证与说明不完整。','交付完整，关键时刻与限制有真实验证。'),
   d('expression','画面与表现力',20,'构图、辨识、动势和喜剧节奏。','画面可读，动作或节奏较生硬。','主体清楚，动作生动，喜剧节奏自然。')]},
 {'id':'02-dispatch','number':'02','title':'一万只鹈鹕的派单后台','shortTitle':'前端交互','category':'前端开发','level':'中级','minutes':25,'changeMinutes':10,'color':'#78bbb4','icon':'layout',
  'description':'从漂亮的首屏到可靠的每一次操作。让一万条订单在快速查询与故障中保持井然有序。',
  'capabilities':['界面设计能力','视觉审美能力','交互理解能力'],
  'brief':['使用 React 与 TypeScript，完成总览、订单派送、配送员、运行报表和设置五页。','统一美观布局，实现查询、筛选、分页、派单确认和详情抽屉。','浏览器内 Mock 保证归档的 HTML 也能独立演示交互。'],
  'rubric':[
   d('workflow','业务流程',30,'五页完整性、跨页联动、详情、选择与确认派单。','主流程可用，存在缺项或数据不一致。','全部操作准确，选择语义和数据状态一致。'),
   d('async','异步与失败处理',25,'乱序响应、回滚、重试和空态。','处理部分异常，仍有边界缺陷。','旧响应不会覆盖新查询，失败、重试和空结果正确。'),
   d('visual','视觉与布局',20,'五页与弹层的统一美感、参考布局、排版和状态层级。','主要布局接近，细节和层级有缺陷。','结构还原准确，排版与层级清楚。'),
   d('access','移动端与可操作性',15,'390px宽度、键盘路径和交互反馈。','基本可用，有溢出、焦点或反馈问题。','移动端不溢出，关键操作和键盘路径完整。'),
   d('quality','性能与验证',10,'真实性能记录和离线HTML。','可运行，但性能或验证证据不足。','交付可复现，性能符合要求并有充分原始记录。')]},
 {'id':'03-game2d','number':'03','title':'鹈鹕快递大作战','shortTitle':'2D 游戏','category':'游戏开发','level':'进阶','minutes':45,'changeMinutes':15,'color':'#a2b7df','icon':'gamepad',
  'description':'穿越办公室平台、躲开巡逻机器人，把三份快递安全送到出口。手感和规则，都要经得起实玩。',
  'capabilities':['游戏设计能力','游戏开发能力','游戏世界理解能力'],
  'brief':['用 Phaser 3 与统一素材制作可实际操作的横版游戏。','收集快递，处理生命、倒计时、暂停、失败与重开。','移动平台稳定承载，同时支持键盘和手机触屏。'],
  'rubric':[
   d('loop','完整游戏流程',30,'收集、出口、生命、计时和胜负。','主流程可玩，部分规则或状态有错误。','能实际通关，两类失败与所有状态转换正确。'),
   d('physics','控制与物理',25,'跳跃、碰撞、移动平台、无敌与掉落。','基本控制成立，平台或受伤机制有问题。','控制可靠，跳跃、平台、无敌与复位准确。'),
   d('stability','暂停与重开',20,'暂停冻结及连续十次重开。','基本有效，仍有状态或计时器残留。','暂停完整冻结，重开无状态或计时器累积。'),
   d('feel','操作与视觉反馈',15,'HUD、手感、反馈和触屏。','可操作，但手感、提示或移动端有缺陷。','反馈清楚，HUD可读，键盘和触屏体验完整。'),
   d('delivery','交付与实测证据',10,'离线HTML与真实操作记录。','可玩，但通关或边界证据不足。','HTML可玩，通关、失败和边界均有实际记录。')]},
 {'id':'04-game3d','number':'04','title':'鹈鹕叉车驾校','shortTitle':'3D 建模与游戏','category':'游戏开发','level':'高级','minutes':60,'changeMinutes':20,'color':'#b39cd8','icon':'box',
  'description':'从一组几何体开始，造出一辆真正能工作的叉车。建模、联动与搬运，在同一个仓库里接受检验。',
  'capabilities':['3D 建模能力','游戏开发能力','游戏世界理解能力'],
  'brief':['通过 Three.js 程序化创建叉车、鹈鹕驾驶员和仓库。','用 enable3d 完成驾驶、托举、搬运和颜色交付。','提供跟随镜头、模型检查、暂停、胜负与重开。'],
  'rubric':[
   d('model','建模结构',25,'指定部件、驾驶员、比例与层级。','模型可辨，但部件、比例或层级不完整。','全部部件可辨，层级合理，多视角结构完整。'),
   d('linkage','部件联动',20,'车轮、转向、货叉和驾驶员运动。','部分联动正确，仍有错位或不同步。','联动正确，模型参数与碰撞体协调。'),
   d('gameplay','驾驶与搬运',25,'实际拾放、碰撞、颜色交付与胜负。','可以搬运，碰撞或判定有明显缺陷。','三箱可真实交付，无隔空计分或重复交付。'),
   d('robustness','运行稳定性',20,'镜头、暂停、重开、性能与资源。','基本可用，仍有状态、遮挡或性能问题。','镜头可用，状态准确，性能与资源有合格记录。'),
   d('presentation','视觉与交付',10,'灯光、材质、引导和多视角证据。','可运行，视觉、引导或说明粗糙。','场景清楚，任务引导完整，HTML和证据齐全。')]},
 {'id':'05-memory','number':'05','title':'五十篇论文，一部长篇','shortTitle':'长文本推理','category':'研究','level':'挑战','minutes':120,'changeMinutes':30,'color':'#b87c76','icon':'brain',
  'description':'研读五十篇前沿论文与《三体Ⅲ：死神永生》，在长文本中梳理论证、关联线索、理解世界观。回答六个跨章节、跨文献的问题，用证据支撑每一步推理。',
  'capabilities':['长文本理解能力','跨文本逻辑推理能力','证据整合能力'],
  'brief':['阅读50篇近期物理、数学论文与《三体Ⅲ：死神永生》完整文本。','完成两道物理、两道数学、两道小说问题，重建跨材料推理链。','交付可内嵌的HTML报告，逐项定位原文证据并区分事实、假设与推断。'],
  'rubric':[
   d('physics','物理论证',25,'两道物理题：理论前提、数据重用、纠错指标与比较条件。','找到主要结论，但模型或指标比较仍有遗漏。','两题均完成跨论文论证，条件与分母准确，区分观测、模拟和理论。'),
   d('math','数学条件推理',25,'两道数学题：方程与解类、定理前提、依赖关系和有效性。','能区分部分结论，仍混淆解类、条件或常数。','准确对齐定理条件，指出无效推理步骤，依赖图与正文一致。'),
   d('novel','情节因果与世界规则',25,'两道小说题：跨时代因果、信息边界、纪年和规则例外。','主要剧情正确，但反事实、时间线或叙述层级不够准确。','贯通六部情节与结局，证据支持因果，保留原文不能确定的部分。'),
   d('reasoning','跨材料一致性',15,'六问中的逻辑衔接、反事实前提、适用范围与自我修正。','存在合理推理，但局部过度外推或自相矛盾。','结论与前提一致，不把条件性结论当普遍事实，能定位并修正论证断点。'),
   d('evidence','证据与报告',10,'PDF页码、定理/图表、小说节段以及可用HTML报告。','报告可读，部分证据难定位或只重复摘要。','六问结构清楚，关键论证均可回查正文，引用准确，HTML可独立使用。')]}

]

from .prompt_revision import INITIAL, CHANGE, PROMPT_VERSION, enrich_rubrics

enrich_rubrics(CATALOG)

DELIVERY='''
## HTML 交付约定
最终入口必须为 `output/index.html`。图片、脚本、样式、数据与物理运行资源全部存于 `output/` 内并使用相对路径引用。页面应能通过普通本地静态HTTP服务打开，也能在iframe中运行；不依赖外网、宿主父页面、固定端口、外部API或额外后端进程。允许使用多个本地资源文件。
React/Phaser/Three.js项目执行 `npm run build` 生成该入口，已有构建配置使用相对资源路径。研究题制作含方法、图表、原始结果链接与结论的HTML报告；SVG题在HTML中内联动画，SVG内部仍不得使用JavaScript。
展示环境使用仅允许脚本的沙箱iframe，不提供同源身份。页面状态使用内存，不能依赖localStorage、IndexedDB或Service Worker；本地资源与ES模块由预览服务提供跨来源读取支持。
交付前用本地静态服务检查实际功能。另写 `output/DELIVERY.md`，说明成果路径、启动方式、已运行检查、未运行检查和已知缺陷。不要以占位页或原始起始页代替成果。
'''

def catalog(): return copy.deepcopy(CATALOG)

def candidate_task(key, standard):
    task=next(t for t in CATALOG if t['id']==key)
    if key=='05-memory':
        from pathlib import Path
        from .longread import CORPUS
        prompt=(Path(__file__).resolve().parents[1]/'research'/CORPUS/'TASK-CORE.md').read_text(encoding='utf-8')
    else: prompt=INITIAL.get(key, standard.prompts['task'+str(int(task['number']))][0])
    if key=='01-svg': prompt=prompt.replace('输出单文件SVG，','在HTML中内联一个SVG，').replace('提交SVG及简短时序说明','提交HTML、SVG源码及简短时序说明')
    return f"# {task['title']}\n\n提示词版本：{PROMPT_VERSION}。本阶段预算：{task['minutes']}分钟。\n\n{prompt}\n{DELIVERY}"


def candidate_change(key, standard):
    """Return only the authorized change-stage prompt; retain it in admin until release."""
    task = next(t for t in CATALOG if t['id'] == key)
    if key == '05-memory':
        from .longread import CHANGE as longread_change
        prompt = longread_change
    else:
        prompt = CHANGE.get(key, standard.prompts['task' + str(int(task['number']))][1])
    return f"提示词版本：{PROMPT_VERSION}。\n\n{prompt}\n"
