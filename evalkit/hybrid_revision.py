"""r11: focused SVG review; API and objective answer grading stay separate."""
import copy
from .task_revision import dim, change_dim, RUBRICS, CHANGES

PROMPT_VERSION = 'pelican-prompts-10'
RUBRIC_VERSION = 'pelican-rubric-14'

SVG_REVIEW_WEIGHTS = {'anatomy': 30, 'pedals': 30, 'expression': 40}
GAME2D_REVIEW_WEIGHTS = {
    'rubric': {'control': 10, 'platform': 10, 'damage': 10, 'goal': 20,
               'states': 10, 'visual': 25, 'feel': 15},
    'rubricChange': {'fragile': 25, 'speed': 20, 'damage': 10, 'states': 10,
                     'feedback': 10, 'visual': 20, 'feel': 5},
}
GAME3D_REVIEW_WEIGHTS = {
    'rubric': {'model': 25, 'rendering': 25, 'linkage': 10, 'driving': 5,
               'handling': 20, 'delivery_rule': 10, 'experience': 5},
    'rubricChange': {'dimensions': 20, 'alignment': 20, 'handling': 25,
                     'visual': 20, 'regression': 15},
}


def apply_svg_review(task):
    """Use the same three SVG dimensions in both phases without converting old scores."""
    result = copy.deepcopy(task)
    if result.get('id') != '01-svg':
        return result
    for field, period in (('rubric', 6), ('rubricChange', 8)):
        changed = field == 'rubricChange'
        result[field] = [
            dim('anatomy', '空间关系', SVG_REVIEW_WEIGHTS['anatomy'],
                '角色、车体、车座、车把、托盘及双脚与踏板的连接关系在全程保持可信。',
                [f'观察完整{period}秒动画的平稳、颠动与回头状态：身体坐在车座上，双翅能握住车把。',
                 '托盘连接后货架；腿、脚与各自踏板形成连续结构，不穿插、悬空或在颠动时脱离。'],
                '骑乘关系可辨，但部分连接、坐姿或前后层次不自然，动作中出现局部脱离。',
                '角色与车体缺少可信连接，无法形成骑车送布丁的空间关系。'),
            dim('pedals', '脚与踏板同步性', SVG_REVIEW_WEIGHTS['pedals'],
                '双脚持续跟随各自踏板，两踏板保持相反相位，踩踏与车轮、车体运动协调。',
                ['连续观察一圈的四个相位：双脚各贴合对应踏板，腿部随踩踏自然变化。',
                 ('延长后的0–4秒平稳段及颠动、回头段都保持同步，连续查看三个8秒周期。'
                  if changed else '在平稳、颠动与回头段均检查同步关系，连续查看三个6秒周期。')],
                '能看出踩踏，但一侧或部分相位脱脚，踩踏与其他运动偶尔不协调。',
                '双脚不随踏板运动，或缺少可辨认的踩踏动作。'),
            dim('expression', '构图与动画表现', SVG_REVIEW_WEIGHTS['expression'],
                f'构图、造型、色彩与动作节奏共同讲清送布丁的故事，{period}秒动画自然连贯。',
                ['角色、自行车与布丁主次清楚，关键动作不被背景遮挡，造型和配色统一。',
                 ('8秒变更表现为平稳0–4秒、颠动4–5秒、布丁弹落5–6秒、回头恢复6–8秒；'
                  '延长平稳段后仍有节奏，不把整个动画慢放。'
                  if changed else '6秒内平稳前进、颠动、布丁弹落、回头恢复依次清楚可辨，幅度与停顿有趣自然。'),
                 '布丁落回托盘，主体运动完整入画；重复播放时没有明显突跳或累计漂移。'],
                '故事基本可读，但构图平淡、动作僵硬，或叙事节奏与循环衔接存在明显不足。',
                '主体与事件难以辨认，动作表现或衔接无法讲清故事。'),
        ]
        for dimension in result[field]:
            dimension['scoring'] = 'manual'
    result['scoringMode'] = 'manual'
    result.pop('automationVersion', None)
    result['scoringGuidance'] = (
        '只评价空间关系30分、脚与踏板同步性30分、构图与动画表现40分；使用0–10分滑块。'
        '时间节奏、落点和循环衔接结合整体动画表现评价，不另设时间线、循环或交付评分项。'
        '初始检查6秒成果，追加检查8秒变更；未实际检查的维度保留未评分。')
    return result

DISPATCH_API_VERSION = 'pelican-api-checks-1'
DISPATCH_AUTO_DIMENSIONS = {
    'rubric': frozenset({'query', 'assignment', 'validation'}),
    'rubricChange': frozenset({'regression'}),
}

STATIC_REVIEW_WEIGHTS = {
    'rubric': {'impact': 40, 'craft': 30, 'content': 30},
    'rubricChange': {'kids': 43, 'integration': 43, 'preservation': 14},
}


def apply_static_review(task):
    """Project Q2 onto the current three-dimension review without mutating its source."""
    result = copy.deepcopy(task)
    if result.get('id') != '02-static':
        return result
    for field, weights in STATIC_REVIEW_WEIGHTS.items():
        existing = {d['id']: d for d in result.get(field, [])}
        defaults = RUBRICS['02-static'] if field == 'rubric' else CHANGES['02-static']
        anchors = {d['id']: d['anchors'] for d in defaults}
        result[field] = []
        for ident, weight in weights.items():
            if ident not in existing:
                raise ValueError(f'静态网页评分缺少维度：{ident}')
            dimension = existing[ident]
            dimension.update(weight=weight, scoring='manual')
            if not dimension.get('anchors'):
                dimension['anchors'] = copy.deepcopy(anchors[ident])
            result[field].append(dimension)
    result['scoringMode'] = 'manual'
    result.pop('automationVersion', None)
    return result


def apply_game2d_review(task):
    """Review gameplay, visuals and feel without separate input or delivery scores."""
    result = copy.deepcopy(task)
    if result.get('id') != '04-game2d':
        return result
    for field, weights in GAME2D_REVIEW_WEIGHTS.items():
        existing = {d['id']: d for d in result.get(field, [])}
        result[field] = []
        for ident, weight in weights.items():
            if ident not in existing:
                raise ValueError(f'2D游戏评分缺少维度：{ident}')
            dimension = existing[ident]
            dimension.update(weight=weight, scoring='manual')
            if field == 'rubric' and ident == 'control':
                dimension['checks'] = [
                    '控制与碰撞满足当前提示词，关卡可正常游玩；不以项目预设坐标或物理参数评分。'
                    if check == '速度/重力/跳跃参数遵守材料，未删改布局降低难度。' else check
                    for check in dimension.get('checks', [])]
            result[field].append(dimension)
    result['scoringMode'] = 'manual'
    result.pop('automationVersion', None)
    result['scoringGuidance'] = (
        '按玩法、规则、画面与手感实际试玩，使用0–10分滑块评分。'
        'HUD、键盘与触屏输入、引擎和本地交付仍须满足任务要求，不设置独立评分项。'
        '未实际检查的维度保留未评分；初始和追加分别按各自七项权重汇总。')
    return result


def apply_game3d_review(task):
    """Keep gameplay delivery scoring while removing standalone runtime evaluation."""
    result = copy.deepcopy(task)
    if result.get('id') != '05-game3d':
        return result
    for field, weights in GAME3D_REVIEW_WEIGHTS.items():
        existing = {d['id']: d for d in result.get(field, [])}
        result[field] = []
        for ident, weight in weights.items():
            if ident not in existing:
                raise ValueError(f'3D游戏评分缺少维度：{ident}')
            dimension = existing[ident]
            dimension.update(weight=weight, scoring='manual')
            if field == 'rubric' and ident == 'driving':
                replacements = {
                    'W/S、A/D、空格在给定参数下生效，车体不能穿越墙或路障。':
                        '按提示词完成前后驾驶、转向、升降和制动，响应清楚。',
                    '箱子落地不穿地，仓库通道仍可通行，未改变地图/箱尺寸。':
                        '车体、箱子与地面、墙和障碍合理碰撞；不以项目预设位置或控制参数评分。',
                }
                dimension['checks'] = [replacements.get(check, check)
                                       for check in dimension.get('checks', [])]
            if field == 'rubric' and ident == 'handling':
                dimension['checks'] = [
                    '按题目提示词的托举条件对齐后升叉；不对齐应失败，一次最多一箱。'
                    if check == '按契约角度/横向/高度/伸入条件对齐后升叉；不对齐应失败，一次最多一箱。' else check
                    for check in dimension.get('checks', [])]
            if field == 'rubricChange' and ident == 'regression':
                dimension.update(
                    name='重开、镜头与状态回归',
                    description='修改宽度后重开、暂停、检查及跟随镜头保持正确，不累乘尺寸或改变世界状态。',
                    checks=['连续10次重开，车宽保持1.68米，世界及一局状态恢复正确。',
                            '暂停、四向检查与跟随镜头仍可用；检查后返回保持暂停和原世界状态。'],
                    anchors=[{'score':0,'text':'重开累乘宽度，或镜头与状态控制阻断玩法。'},
                             {'score':5,'text':'新尺寸保持，但重开、镜头或暂停恢复有局部问题。'},
                             {'score':10,'text':'重开、镜头和状态恢复均正确，新尺寸不随操作累乘。'}])
            result[field].append(dimension)
    result['scoringMode'] = 'manual'
    result.pop('automationVersion', None)
    result['scoringGuidance'] = (
        '实际检查多视角模型、画面和驾驶搬运，使用0–10分滑块评分。'
        '本地物理、性能、资源与作品交付仍须满足任务要求，不设置独立评分项；'
        '同色货箱交付是游戏规则，继续按业务交付维度评价。'
        '未实际检查的维度保留未评分，初始和追加分别按各自权重汇总。')
    return result


def apply_dispatch_review(task):
    """Keep only pure HTTP API dimensions automatic; review front-end behavior manually."""
    result = copy.deepcopy(task)
    if result.get('id') != '03-dispatch':
        return result
    for field, automatic in DISPATCH_AUTO_DIMENSIONS.items():
        removed = 'runtime' if field == 'rubric' else 'delivery'
        result[field] = [d for d in result.get(field, []) if d['id'] != removed]
        for dimension in result.get(field, []):
            if field == 'rubric' and dimension['id'] == 'async':
                dimension['weight'] = 10
            if field == 'rubricChange' and dimension['id'] == 'races':
                dimension['weight'] = 15
            if dimension['id'] in automatic:
                dimension['scoring'] = 'auto'
                dimension['anchors'] = [
                    {'score': 0, 'text': '接口检查存在失败，该维度不得分。'},
                    {'score': 1, 'text': '该维度全部接口检查通过，取得完整权重。'},
                ]
            else:
                dimension['scoring'] = 'manual'
            if field == 'rubricChange' and dimension['id'] == 'regression':
                dimension['name'] = '服务端接口回归'
                dimension['description'] = '接口查询、校验、原子派单与并发冲突保持原契约。'
                dimension['checks'] = ['直接请求归档Node服务，核对查询、输入校验、整批原子派单与并发冲突。']
            if field == 'rubricChange' and dimension['id'] == 'history':
                check = '实际刷新前端页面，确认已派订单仍来自同一Node服务且未被重置。'
                if check not in dimension['checks']:
                    dimension['checks'].append(check)
    result.update(scoringMode='hybrid', automationVersion=DISPATCH_API_VERSION,
                  apiScoringVersion=DISPATCH_API_VERSION)
    result['scoringGuidance'] = (
        '纯HTTP接口维度由脚本自动判为0或1：全部检查通过取得该维度完整权重，存在失败则不得分。'
        '工具或服务环境不可用保留未核验，不默认为失败；接口分不可手工修改。'
        '前端功能、视觉和交互由主持人实际操作，使用0–10分滑块评分，步长0.5分。'
        '未评分保持空值，全部维度完成后按各自权重汇总；初始和追加分别留档。')
    return result


DISPATCH_INITIAL = """使用所附React + TypeScript前端与Node.js后端起始工程，制作《一万只鹈鹕的派单后台》。这是一道前后端分离项目题：前端通过真实HTTP接口查询和派单，Node.js进程内存是唯一订单数据源，不要求数据库。完成有成熟产品质感的五个页面，视觉美观、交互友好。

## 统一接口与数据规范
先阅读materials/API.md、HARNESS.md、EVAL.md和参考图。必须实现规定的GET /health、/api/orders、/api/orders/:id、/api/couriers、/api/stats与POST /api/assign。路径、方法、字段、错误结构和状态码按契约，不能另起一套不兼容接口。
仅使用已提供依赖和Node内置模块。服务入口server/index.mjs，绑定127.0.0.1并读取PORT；固定10,000条种子位于materials/orders.json，不修改种子，不把种子复制到浏览器或用Mock代替后端。前端以相对api/...地址fetch。模型自行实现查询、分页、内存状态、校验和派单业务；起始501仅是空骨架。
后端独立校验类型、范围、空批次、重复ID、配送员、订单存在性与pending状态。非法参数400、未知订单404、状态冲突409，错误统一为{error:{code,message}}；不得返回200伪装失败。一次最多100单，整批校验后原子提交；包含一条无效订单也不能部分修改。两个请求同时派同一订单，只能一个成功，另一个冲突；没有被成功派出的其他订单保持原状。
同一服务供多个页面共享数据。页面刷新保留已派订单；只有Node服务重启才恢复固定种子。设置仅保存在页面会话内，页面刷新恢复默认20条。无需登录、权限管理或数据库。

## 五页业务
默认进入订单派送。五页共享导航、标题、内容区与统一样式。参考图定义深色侧栏、浅底、白卡、蓝色主操作与信息层级；1440×900下侧栏220px、顶栏72px、内容内边距32px、行高56px，窄屏可重排。
订单页：搜索编号/客户/地址，筛选四状态，默认每页20条，仅渲染当前页。总数、页码和总页数真实，边界翻页禁用。提交搜索或改变状态回第一页并清选择，翻页也清选择。只选择当前页pending订单，全选不包含其他状态。表格包含选择、编号、客户、地址、状态、配送员和详情。
批量派单：确认弹窗展示数量并选择三名配送员；未选人不可确认，空批次不可打开，提交期间不能重复提交。取消保留选择；失败保留可重试上下文；成功关闭弹窗、清选择，重新读取列表、详情和统计。不能只修改前端状态冒充服务端提交。
详情：右侧抽屉展示真实编号、客户、地址、状态、配送员、优先级、创建时间、contents与note，无值有明确占位；独立加载、关闭和失败重试。
总览：四张真实统计卡及状态分布图，点击待派单进入pending第一页并清选择。统计使用GET /api/stats的同一状态快照，不用多次查询拼出可能不一致的计数。
配送员：通过/api/couriers取得三名固定配送员；“为TA派单”进入pending第一页并预选此人，仍需选订单确认，不虚构运力或绩效。
报表：真实状态数量、比例、快照时间，支持刷新；分母是全部订单，不随搜索变化。派单后再展示前刷新统计；加载不能假装0，失败不伪造更新时间。
设置：20/50/100条每页，保存后回订单第一页并清选择，未保存不生效；恢复默认只恢复20条，不撤销派单。普通菜单切换保留已提交查询/状态/页码，清选择并关弹层。五页不能用同一表格换标题代替。

## 视觉与交互
五页、抽屉、弹窗与所有状态精修为同一款成熟商业产品：字体层级、字号行高、8px间距节奏、留白、圆角、图标、按钮与反馈一致。统计数字、标签、表格与长地址稳定对齐，主操作突出。色彩、阴影和轻量过渡服务任务，不用装饰掩盖缺失内容。
首次使用无需猜测：条件可清除、选择数量明确、禁用原因可理解，确认说明给谁派多少。取消/关闭不丢合理上下文；输入、悬停、焦点、禁用、加载、提交、成功和错误可区分。等待不跳版，空态可恢复、错误可就近重试，不使用alert。强动效尊重减少动态偏好。
390×844下导航、筛选、分页、派单、详情和设置可用；表格可内部横滚，整页不溢出。键盘可完成主要流程；焦点进入/返回、Esc关闭和背景防误操作有效，触控目标约40px。

## 实际请求与验证
先发慢A、后发快B时，A的成功或失败不得覆盖B的列表、加载或错误状态。公开验收会通过请求代理延迟/失败响应，不要求你开发作弊控制接口。
使用EVAL.md规定的实际控件标识，走通查询→选择→确认/取消→失败重试→详情→统计；验证多个页面共享订单、刷新保留、服务重启复位。生产前端不渲染全量10,000条DOM；按采样器验证输入反馈P95≤100ms（不含接口等待）。
`npm run build`打包前端及server目录，交付output/index.html、output/server/index.mjs及固定种子。生产预览由主持人启动该份归档自己的Node服务，再代理相对API地址；不能依赖开发服务器或其他模型的后端。简要说明实际验证和未完成项目。
"""

DISPATCH_CHANGE = """在现有真实Node.js接口项目上增加URL查询状态：把已提交的关键词q、状态status、页码page写入浏览器URL。首次打开、复制链接、页面刷新、前进与后退均恢复控件及真实请求结果。使用正确的URL编码；非法status回all，非正整数page回1，畸形编码不崩溃；超出有效页范围回到有效页并同步URL。
提交新搜索或状态回第一页并清选择，翻页清选择；浏览器导航也清选择、关闭弹层。不要把每次键入都写成无意义的历史项，不制造popstate循环；慢旧请求的成功或错误不能覆盖新URL的状态。
页面刷新不得重置Node中的已派订单。直接向API提交非法参数仍由后端返回400，不能因为前端URL回退就省略服务端校验。原五页、原子派单/冲突、统计、设置、手机和键盘操作全部保持；修改后的视觉与交互仍按成品要求评价。
继续使用原API/EVAL规范，构建并交付前后端完整成果。"""

GAME2D_VISUAL = """## 更高的视觉完成度与操作手感
目标是一款精致、明快、动作反馈明确的2D小游戏。不能只把角色和平台摆在纯色背景上。围绕“鹈鹕快递”统一设计场景与HUD：前中后景有空间层次，背景可用适量视差；平台、危险、快递与出口有清楚轮廓和对比，灯光/投影、环境小细节及界面排版协调。提供的角色/关卡素材仍须使用，允许用程序绘制背景、装饰、光影与本地特效来精修，但不更改碰撞地图或固定物理参数。
角色行走、起跳、落地、受伤、拾取和胜利要有对应反馈；可用短促的落地压缩、弹性、粒子和镜头反馈增强力度，但不遮挡危险或误导碰撞位置。完整关卡各处、开始/暂停/结算页都保持设计完成度；不只精修首屏。
手感以即时、稳定、可预期为目标：按下即响应，松开/切出触控按钮不粘键，连续移动和跳跃流畅，镜头平滑且不甩动，关键动作看得清。可做不改变跳跃物理的落地输入缓冲；不能增加空中连跳或改变速度/重力来取巧。手机双指可同时移动与跳跃，按钮不遮挡路径。
视觉效果、手感、物理、规则与输入契约均由主持人实际操作核验。精细特效不能牺牲可读性或让实际操作延迟。"""


def apply(tasks):
    result = copy.deepcopy(tasks)
    for task in result:
        key = task['id']
        if key == '06-memory':
            continue
        if key == '02-static':
            task.update(apply_static_review(task))
        if key == '03-dispatch':
            old = {d['id']: d for d in task['rubric']}
            task.update(minutes=45, changeMinutes=15, delivery='fullstack-node',
                        shortTitle='全栈派单', category='全栈开发',
                        description='用React与真实Node.js接口完成美观、友好的派单产品。订单在服务端内存中共享，校验、并发和错误处理都要可靠。',
                        capabilities=['前后端接口与一致性', '并发、校验与恢复', '产品视觉与交互体验'])
            task['brief'] = ['实现统一Node.js HTTP接口，10,000条订单只在服务端内存中维护。',
                             '完成五页、真实派单与原子并发处理，刷新保留、服务重启复位。',
                             '纯HTTP接口40分由脚本判定；其余功能、视觉与交互由主持人实际核验。']
            task['briefChange'] = ['增加URL查询状态与浏览器前进后退恢复。',
                                   '真实后端订单在刷新后保持，非法接口请求仍由后端拒绝。',
                                   '原业务、视觉与操作体验保持，提交完整前后端成果。']
            task['rubric'] = [
                dim('architecture','真实HTTP与前后端分离',10,'前端通过真实HTTP读写独立Node服务，服务端内存是唯一订单源。',
                    ['检查Node健康接口、前端网络请求、跨页面读取一致性与浏览器刷新保留。',
                     '前端不能直接读取种子或导入Mock；结束服务后不得仍完成真实派单。'],
                    '有HTTP接口，但部分业务仍由浏览器Mock或本地数组替代。','没有独立Node HTTP服务。'),
                dim('query','查询、分页与详情接口',10,'真实筛选、分页、详情及配送员响应符合统一API契约。',
                    ['对照固定种子验证三个搜索字段、状态组合、边界页及完整详情。'],
                    '普通查询可用，但筛选、分页或详情有错误。','接口不可用或静态伪造。'),
                dim('assignment','原子派单与并发冲突',20,'整批成功或整批失败，并发派相同订单仅一个成功。',
                    ['真实POST后重新GET核对列表、详情和统计；检查混合无效批次。',
                     '同时发送两个相交批次，核对成功/409及未被成功批次选中的订单不变。'],
                    '正常派单成功，但批次原子性或并发复查有缺陷。','没有真实更新或出现广泛数据损坏。'),
                dim('validation','服务端校验与错误契约',10,'类型、范围、重复/未知ID及状态错误由服务端正确拒绝。',
                    ['绕过页面直接请求空/重复/超量ID、错误配送员、非法JSON和参数。',
                     '核对400/404/409和统一error.code/message；失败不改任何订单。'],
                    '有部分校验，但可以绕过或错误码不一致。','只靠前端校验。'),
                dim('pages','五页与共享数据一致性',10,'页面、统计、详情和设置对同一服务状态保持一致。',
                    ['用真实控件操作五页与批量派单，核对同一服务另一个页面、刷新、统计快照。'],
                    '主要页面可用，但跨页或统计存在不一致。','页面大多静态或未接真实数据。'),
                dim('async','前端竞态与失败恢复',5,'延迟或失败的旧请求不覆盖新状态，失败后可以恢复。',
                    ['代理延迟旧查询并让新查询先完成；分别检查旧成功和旧失败。'],
                    '常规请求可用，竞态或失败恢复不完整。','旧请求覆盖当前状态或失败后不能恢复。'),
                old['visual'], old['interaction'],
                dim('runtime','构建、启动与本地交付',5,'前后端归档完整，用固定命令和回环端口启动，无外网依赖。',
                    ['独立归档启动Node服务和页面；结束/重新启动后按固定种子恢复。'],
                    '开发可用，但归档资源、端口或启动方式不完整。','归档无法启动。'),
            ]
            task['rubricChange'] = [
                change_dim('url','URL写入与首次恢复',20,['q/status/page正确编码，首次与刷新恢复控件和真实请求。'],'部分条件可恢复。','未同步URL。'),
                change_dim('history','前进后退恢复',15,['前进/后退恢复对应查询，不制造循环和多余历史项。'],'部分恢复。','浏览器导航失效。'),
                change_dim('boundaries','参数边界与选择清理',10,['非法URL回退、超范围页校正，导航清选择/弹层；API非法参数仍400。'],'部分边界错误。','边界导致错误或崩溃。'),
                change_dim('races','真实请求竞态',10,['旧请求成功/失败不得覆盖新URL对应的列表、加载和错误。'],'个别竞态失败。','请求乱序破坏结果。'),
                change_dim('regression','服务端与原业务回归',10,['接口查询/校验/原子派单仍正确，刷新保留服务端订单。'],'有局部退化。','核心后端退化。'),
                copy.deepcopy(old['visual']), copy.deepcopy(old['interaction']),
                change_dim('delivery','前后端交付',5,['归档前端和Node服务都可独立启动，固定种子不变。'],'交付不完整。','无法启动。'),
            ]
        if key == '04-game2d':
            by_id = {d['id']: d for d in task['rubric']}
            for ident, weight in {'control': 10, 'platform': 10, 'damage': 10,
                                  'goal': 15, 'states': 10, 'delivery': 5}.items():
                by_id[ident]['weight'] = weight
            task['rubric'] = [by_id[k] for k in ('control','platform','damage','goal','states')]
            task['rubric'] += [
                dim('accessibility','HUD与键盘、触屏输入',10,'真实HUD与引擎状态一致，两种输入可靠且不粘键。',
                    ['核对生命、快递、时间与状态；键盘/触屏移动跳跃共用生产控制逻辑。',
                     '手机双指组合与松开、移出按钮后归零，不遮挡主要操作。'],
                    '主要输入可用，但HUD或触屏释放有问题。','输入或HUD无法支持实际游玩。'),
                dim('visual','场景、角色与界面视觉',20,'前中后景、角色、动作特效与HUD形成精致统一的游戏画面。',
                    ['按三档参考图检查全关卡的层次、造型、配色与界面完成度。',
                     '画面丰富且平台、危险、快递和出口一眼可辨；各状态页同样完成。'],
                    '功能元素清楚，但背景单薄、视觉粗糙或界面风格不统一。','画面混乱、关键对象难辨或大量未完成。'),
                dim('feel','操作手感与动作反馈',10,'移动跳跃即时稳定，镜头和动作反馈让操作清楚、有力度且不拖沓。',
                    ['亲自用键盘与手机连续移动跳跃；观察起跳、落地、收集、受伤的反馈。',
                     '参考图只示意反馈节奏，必须实际试玩，不凭截图推断手感。'],
                    '可以操作，但动作僵硬、反馈弱或镜头不够顺畅。','操作迟滞、失控或反馈严重干扰操作。'),
                by_id['delivery'],
            ]
            for d in task['rubricChange']:
                d['weight'] = {'fragile':25,'speed':20,'damage':10,'states':10,'feedback':10,'delivery':5}[d['id']]
            task['rubricChange'] += [
                {**copy.deepcopy(task['rubric'][-3]), 'weight':15},
                {**copy.deepcopy(task['rubric'][-2]), 'weight':5},
            ]
            task['capabilities'] = ['精致2D画面与操作手感','平台碰撞与一局规则','键盘和触屏体验']
            task['description'] = '用有层次的画面和利落的动作反馈，带鹈鹕穿越平台送快递。好看、好操作，也要真正通关。'
        for phase in ('rubric', 'rubricChange'):
            for d in task[phase]:
                d['scoring'] = 'manual'
        task.update(scoringMode='manual', promptVersion=PROMPT_VERSION)
        task.pop('automationVersion', None)
        task['scoringGuidance'] = (
            '各维度均由主持人按公开要求实际核验，使用0–10分滑块评分，步长0.5分。'
            '功能、接口、规则与性能须实际操作或测量；视觉、表达和手感结合图例与真实体验评价。'
            '未核验或未评分保持空值，不默认为0；所有维度完成后按权重计算总分。'
            '一项缺陷按直接检查点归类；初始和追加分别留档，新版本不重算旧轮次。')
        if key == '03-dispatch':
            task.update(apply_dispatch_review(task))
        if key == '01-svg':
            task.update(apply_svg_review(task))
        if key == '04-game2d':
            task.update(apply_game2d_review(task))
        if key == '05-game3d':
            task.update(apply_game3d_review(task))
    return result
