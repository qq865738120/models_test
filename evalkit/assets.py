"""固定种子生成公开材料与管理员保留材料，不包含五题参考答案。"""
import json
import math
import shutil
from pathlib import Path

TASKS = {
    '01-svg': ('鹈鹕骑车送布丁', 10, 5),
    '02-dispatch': ('一万只鹈鹕的派单后台', 25, 10),
    '03-game2d': ('鹈鹕快递大作战', 45, 15),
    '04-game3d': ('鹈鹕叉车驾校', 60, 20),
    '05-memory': ('五十篇论文，一部长篇', 120, 30),
}
VERSION = 'pelican-v1.0-longread-20261018'
SEED = 20261018


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(value, encoding='utf-8')


def dump(path, value):
    write(path, json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def svg(width, height, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">{body}</svg>\n'


def package(path, dependencies, extra=None):
    data = {
        'name': 'llm-bench-' + path.name, 'version': '1.0.0', 'private': True,
        'type': 'module',
        'scripts': {'dev': 'vite', 'build': 'tsc --noEmit && vite build', 'preview': 'vite preview'},
        'dependencies': dependencies,
        'devDependencies': {'typescript': '5.7.3', 'vite': '6.4.4'},
    }
    if extra:
        data['scripts'].update(extra)
    dump(path / 'package.json', data)


def generate(root, target, longread=False):
    tasks = target / 'tasks'
    for key in TASKS:
        project = tasks / key
        project.mkdir(parents=True)
        (project / 'output').mkdir()
        write(project / 'output/.keep', '')
        if key in ('02-dispatch', '03-game2d', '04-game3d'):
            shutil.copytree(root / 'templates/web', project, dirs_exist_ok=True)
            shutil.copytree(root / 'templates' / key, project, dirs_exist_ok=True)
            shutil.copy(root / 'templates/common/performance.js', project / 'performance.js')
            # 公开采样器固定在 tools，不能由模型修改来改变测量口径。
            (project / 'tools').mkdir(exist_ok=True)
            (project / 'performance.js').rename(project / 'tools/performance.js')
        write(project / '.gitignore', 'node_modules/\ndist/\n__pycache__/\n.runtime/\n')
    one = tasks / '01-svg'
    shutil.copytree(root / 'templates/01-svg', one, dirs_exist_ok=True)
    (one / 'solution').mkdir()
    write(one / 'solution/.keep', '')
    write(one / 'materials/README.md', '最终交付 output/index.html，在HTML中内联动画SVG；可额外保留solution/animation.svg源码供 tools/svg-viewer.html 做SMIL/CSS时间采样。没有参考成图或答案。运行 python3 -m http.server 5173 --bind 127.0.0.1 后检查页面；动画SVG中不可使用JavaScript。\n')
    two = tasks / '02-dispatch'
    package(two, {'react': '19.0.0', 'react-dom': '19.0.0', '@types/react': '19.0.8', '@types/react-dom': '19.0.3'}, {'mock': 'node tools/mock-server.mjs'})
    orders = []
    for i in range(1, 10001):
        status = ['pending', 'pending', 'assigned', 'delivered'][i % 4]
        orders.append({'id': f'PD-{i:05}', 'customer': f'客户{i:05}',
            'address': f'{["创意园", "科技园", "大学城", "滨江园"][i%4]}{i%30+1}栋{i%20+1}层',
            'status': status, 'courierId': f'P0{i%3+1}' if status != 'pending' else None,
            'priority': ['normal', 'urgent'][int(i % 7 == 0)], 'createdAt': f'2026-10-18T{8+i%10:02}:{i%60:02}:00+08:00',
            'contents': ['布丁', '开发板', '文档', '咖啡'][i%4], 'note': '轻拿轻放' if i%7==0 else ''})
    dump(two / 'materials/orders.json', orders)
    dump(two / 'public/materials/orders.json', orders)
    write(two / 'materials/API.md', '''# 固定接口契约
启动 npm run mock，监听 http://127.0.0.1:4174；另一个终端 npm run dev。
- GET /api/orders?q=&status=all&page=1&pageSize=20 → {items,total,page,pageSize}。status: all/pending/assigned/delivered；page≥1，pageSize 1–100。q 对 id/customer/address 忽略大小写匹配。默认180ms延迟。
- GET /api/orders/:id → 完整订单；不存在404。
- POST /api/assign：JSON {ids:[订单ID],courierId:"P01"}；P01/P02/P03 分别为鹈鹕一号/二号/三号。一次最多100单，只允许pending；整批原子处理。成功200 {items}；冲突409；模拟失败503且数据不变。
- POST /__control 为公开故障注入，仅供本地验证：{reset:true} 重置；{delays:{"a":900,"b":100}} 按 q 强制延迟；{failNextQuery:true} 或 {failNextAssign:true} 使下一请求失败。请求时捕获延迟和列表。
状态仅存于内存，重启服务复位。不得编辑Mock、订单数据或接口契约。实现端可使用公开控制接口自测，不得在正常业务代码中重置或绕过失败。
参考图 public/materials/reference.svg 是1440×900原创静态构图；只规定布局与层级，不要求动态数据与图中每个字逐项相同。系统字体使用sans-serif，无外链字体。
桌面：左侧导航220px、顶栏72px、内容内边距32px；表格行高56px。手机可重排布局，关键操作可达、整页不横向溢出。
性能：生产构建，1440×900/DPR1，预热10秒，搜索30次（间隔500ms）；tools/performance.js 的 input 采样仅为绘制时机近似，须结合录屏确认真实反馈，P95≤100ms不含API等待。禁止全量10000条DOM。
''')
    write(two / 'materials/API.md', '''# 浏览器内 Mock API
从 public/materials/mock-api.js 导入createMockApi，调用 await createMockApi() 得到独立API实例。生产页面用相对URL引入 materials/mock-api.js；数据从同目录orders.json加载。无需后端，不依赖固定端口。
- await api.query({q:'',status:'all',page:1,pageSize:20}) → {items,total,page,pageSize}。status取all/pending/assigned/delivered；默认180ms延迟；q对id/customer/address忽略大小写匹配。
- await api.detail(id) → 完整订单，不存在抛出Error。
- await api.assign({ids:[订单ID],courierId:'P01'}) → {items}。P01/P02/P03分别为鹈鹕一/二/三号；每批最多100单，仅pending可派，整批原子处理。错误抛出Error且数据不变。
- api.control({reset:true})重置；{delays:{a:900,b:100}}按搜索词强制延迟；{failNextQuery:true}或{failNextAssign:true}让下一请求失败。控制接口只用于自测，不得在业务流程绕过错误。
参考图public/materials/reference.svg为1440×900；左侧导航220px、顶栏72px、内容内边距32px、表格行高56px；使用系统sans-serif字体。手机可重排，关键操作可达且整页不横向溢出。
生产构建1440×900/DPR1，预热10秒、搜索30次、间隔500ms。tools/performance.js input近似测量绘制时机，结合可见反馈记录；P95≤100ms，不含API等待。不一次渲染10000条记录。
''')
    reference(two)
    three = tasks / '03-game2d'
    package(three, {'phaser': '3.90.0'})
    dump(three / 'materials/level.json', {
        'version': VERSION, 'width': 2400, 'height': 720,
        'spawn': {'x': 100, 'y': 610}, 'exit': {'x': 2290, 'y': 590, 'width': 60, 'height': 70},
        'platforms': [{'x':0,'y':660,'width':960,'height':60}, {'x':1160,'y':660,'width':1240,'height':60},
            {'x':320,'y':560,'width':240,'height':24}, {'x':1160,'y':580,'width':180,'height':24},
            {'x':1660,'y':480,'width':200,'height':24}, {'x':1990,'y':560,'width':190,'height':24}],
        'movingPlatforms': [{'id':'m1','x':1320,'y':490,'width':180,'height':24,'toX':1590,'toY':490,'durationMs':3000,'yoyo':True}],
        'packages': [{'id':'c1','x':440,'y':538}, {'id':'c2','x':1760,'y':458}, {'id':'c3','x':2080,'y':538}],
        'robots': [{'id':'r1','x':720,'y':630,'minX':610,'maxX':890,'speed':70},
            {'id':'r2','x':1930,'y':630,'minX':1880,'maxX':2210,'speed':90}],
        'hazards': [{'x':840,'y':640,'width':70,'height':20}],
        'physics': {'gravity':900,'moveSpeed':240,'jumpSpeed':480,'playerBodyWidth':32,'playerBodyHeight':52,
            'lives':3,'invulnerabilityMs':800,'durationSeconds':120},
        'fragilePackageId': 'c2'})
    write(three / 'materials/CONTRACT.md', '''# 2D素材与物理契约
读取 materials/level.json 或同字节的 public/materials/level.json。平台和危险区坐标为左上角；角色、机器人、快递坐标为底部中心。移动平台位置是初始左上角，沿两端线性往返，不暂停时反复运动。
碰撞：固定平台与移动平台均为实体碰撞；机器人、危险区是接触受伤；快递为重叠收集；出口需三份快递齐全。掉出地图指角色完全离开世界下边界。跳跃仅站在实体平台上允许。机器人不阻挡角色但造成接触伤害。
素材均为本项目原创SVG，Phaser可使用load.svg加载。pelican-idle、walk-0..3、jump、hurt、robot、platform、parcel、hazard和UI。walk帧每秒8帧；其他动作可使用色彩/缩放等附加反馈。不提供玩法实现。
本关卡为试运行版：跳跃理论最大高度128px、同高最大水平距离256px，台阶高80–100px。布局仍须主持人真实通关预跑确认后才可列为正式基准，不能以理论计算代替通关证据。
''')
    game_sprites(three)
    four = tasks / '04-game3d'
    package(four, {'enable3d':'0.26.1', 'three':'0.171.0', '@types/three':'0.171.0'})
    dump(four / 'materials/warehouse.json', {
        'version': VERSION, 'units': 'meters', 'floor': {'width':24,'depth':20},
        'vehicle': {'width':1.4,'length':2.6,'height':2.2,'start':{'x':0,'z':7,'yaw':math.pi},
            'maxSpeed':4,'acceleration':3,'turnSpeed':1.3,'brakeDeceleration':8,'forkMin':0.12,'forkMax':2,'forkLiftSpeed':0.7},
        'physics': {'gravity':-9.81, 'boxMass':20, 'vehicleMass':350},
        'racks': [{'x':-8,'z':0,'width':2,'depth':10,'height':3}, {'x':8,'z':0,'width':2,'depth':10,'height':3}],
        'barriers': [{'x':-3,'z':0,'width':1,'depth':3,'height':0.6}],
        'boxes': [{'id':c,'color':v,'x':x,'y':0.6,'z':3,'width':1.2,'height':1.2,'depth':1.2}
            for c,v,x in [('red','#ec615c',-5),('blue','#4e8fe4',0),('yellow','#e6b744',5)]],
        'deliveryZones': [{'boxId':c,'x':x,'z':-6,'width':3,'depth':3} for c,x in [('red',-5),('blue',0),('yellow',5)]]})
    write(four / 'materials/CONTRACT.md', '''# 3D控制、拾放与验收契约
单位为米，Y向上，layout物体坐标为中心。车宽原始值1.4，追加增加20%是1.68，不能重复累乘。仓库24×20；边界墙必须阻挡车体。箱子尺寸1.2不随车宽改变。
指定enable3d 0.26.1，其three-wrapper依赖Three.js 0.171.0；物理资源 vendor/ammo/ 只从本地加载。无需精确车辆动力学，但车体及箱子必须与静态场景合理碰撞。
可使用拾取吸附：货叉在箱底，车头与箱子朝向夹角≤15°、叉中心横向偏差≤0.25米、叉与箱底高度差≤0.15米、货叉水平伸入箱底≥0.3米时，升叉可托起一箱；不能按按钮隔空拾取。降叉使箱底接近地面（≤0.1米）后释放。
交付：释放后箱子水平投影完全进入同色区域、箱底距地≤0.05米且水平速度≤0.1米/秒连续0.5秒计一次；错误颜色或仅驾驶经过均不计分。实现可进行合理容差处理并记录。
车、驾驶员、叉车部件、仓库均须自行程序化建模，不提供模型或贴图。标准地图通道至少3米，理论容纳1.68米加宽车；正式基准前仍须主持人真实搬运预跑。
性能：1280×720、DPR1、预热10秒+采样60秒，tools/performance.js frames；按实际生产构建采样P95≤33.3ms。resources(renderer)连续十次重开后检查稳定增长趋势，保留原始值。硬件与浏览器必须在同榜中一致。
''')
    five = tasks / '05-memory'
    if longread:
        from .longread import install
        install(root, target)
    else:
        shutil.copytree(root / 'templates/05-memory', five, dirs_exist_ok=True)
        memory(five, target / 'admin')
    # 游戏布局与浏览器资源同一份字节，避免多份手写契约漂移。
    for project, name in [(three, 'level.json'), (four, 'warehouse.json')]:
        (project / 'public/materials').mkdir(parents=True, exist_ok=True)
        shutil.copy(project / 'materials' / name, project / 'public/materials' / name)
    dump(target / 'catalog.json', {key: {'title':v[0],'initialMinutes':v[1], 'changeMinutes':v[2]} for key,v in TASKS.items()})


def reference(project):
    body = '<rect width="1440" height="900" fill="#f4f6fa"/><rect width="220" height="900" fill="#152238"/>'
    body += '<g font-family="sans-serif"><text x="28" y="48" font-size="22" fill="white">鹈鹕配送</text>'
    for i,label in enumerate(['总览', '订单派送', '配送员', '运行报表', '设置']):
        y = 105 + i*56
        if i == 1: body += f'<rect x="16" y="{y-28}" width="188" height="44" rx="8" fill="#286fea"/>'
        body += f'<text x="42" y="{y}" font-size="16" fill="#e1e9f6">{label}</text>'
    body += '<rect x="220" width="1220" height="72" fill="white"/><text x="252" y="44" font-size="15" fill="#66748c">工作台 / 订单派送</text><text x="1280" y="44" font-size="15" fill="#304058">评测管理员</text>'
    body += '<text x="252" y="124" font-size="28" fill="#17283f">订单派送</text><text x="252" y="155" font-size="14" fill="#68758a">安排每一份快递，查看实时派送状态</text>'
    for i,(label,value) in enumerate([('全部订单','10,000'),('待派单','5,000'),('配送中','2,500'),('已送达','2,500')]):
        x=252+i*291
        body+=f'<rect x="{x}" y="181" width="267" height="108" rx="10" fill="white"/><text x="{x+20}" y="214" font-size="14" fill="#68758a">{label}</text><text x="{x+20}" y="262" font-size="32" fill="#17283f">{value}</text>'
    body += '<rect x="252" y="313" width="1156" height="555" rx="10" fill="white"/><rect x="276" y="337" width="330" height="40" rx="6" fill="#f6f8fb" stroke="#d8deea"/><text x="291" y="362" font-size="14" fill="#8792a4">搜索订单、客户或地址</text><rect x="625" y="337" width="150" height="40" rx="6" fill="white" stroke="#d8deea"/><text x="643" y="362" font-size="14" fill="#304058">全部状态 ▾</text><rect x="1240" y="337" width="142" height="40" rx="6" fill="#286fea"/><text x="1261" y="362" font-size="14" fill="white">批量派单</text><rect x="276" y="401" width="1108" height="44" fill="#f7f9fc"/>'
    for x,label in [(294,'□'),(330,'订单编号'),(488,'客户'),(638,'配送地址'),(946,'状态'),(1120,'配送员'),(1300,'操作')]:
        body += f'<text x="{x}" y="429" font-size="14" fill="#68758a">{label}</text>'
    for i in range(6):
        y=477+i*56
        for x,label in [(294,'□'),(330,f'PD-{i+1:05}'),(488,f'客户{i+1:05}'),(638,f'科技园{i+2}栋{i+2}层'),(946,['待派单','配送中','已送达'][i%3]),(1120,'—' if i%3==0 else '鹈鹕一号'),(1300,'详情')]:
            body+=f'<text x="{x}" y="{y}" font-size="14" fill="{["#d99724","#286fea","#25855b"][i%3] if x==946 else "#304058"}">{label}</text>'
        body+=f'<path d="M276 {y+23}H1384" stroke="#eef1f6"/>'
    body += '<text x="276" y="835" font-size="14" fill="#68758a">共10,000条，每页20条</text><text x="1150" y="835" font-size="14" fill="#286fea">‹　1　2　3　…　500　›</text></g>'
    write(project / 'public/materials/reference.svg', svg(1440,900,body))
    write(project / 'public/materials/icon-search.svg', svg(24,24,'<circle cx="10" cy="10" r="6" fill="none" stroke="#66748c" stroke-width="2"/><path d="M15 15l6 6" stroke="#66748c" stroke-width="2"/>'))


def game_sprites(project):
    base = project / 'public/materials/sprites'
    for name,phase in [('idle',0),('walk-0',0),('walk-1',1),('walk-2',2),('walk-3',3),('jump',4),('hurt',5)]:
        offset = [-3,0,3,0,4,0][phase]
        body=f'<ellipse cx="28" cy="37" rx="19" ry="20" fill="{ "#ffd4ce" if phase==5 else "#fff9ed"}" stroke="#23364c" stroke-width="2"/><ellipse cx="23" cy="38" rx="11" ry="13" fill="#c8dce7"/><circle cx="34" cy="17" r="13" fill="#fff9ed" stroke="#23364c" stroke-width="2"/><path d="M42 16h21L44 28z" fill="#edb443"/><path d="M42 22q6 14 14 0" fill="#f4ce74"/><circle cx="37" cy="14" r="2.5" fill="#182e43"/><path d="M{21+offset} 53v6l-9 3h19l-3-4M{34-offset} 54v5l-6 3h18l-9-4" fill="#e9a846" stroke="#9b6737"/>'
        write(base / f'pelican-{name}.svg', svg(64,64,body))
    drawings={
        'robot':(48,48,'<rect x="6" y="8" width="36" height="30" rx="7" fill="#9bafc5" stroke="#283d56" stroke-width="3"/><rect x="11" y="15" width="26" height="12" rx="3" fill="#23364c"/><circle cx="18" cy="21" r="3" fill="#ec615c"/><circle cx="31" cy="21" r="3" fill="#ec615c"/><circle cx="12" cy="41" r="6" fill="#23364c"/><circle cx="36" cy="41" r="6" fill="#23364c"/>'),
        'parcel':(32,32,'<rect x="2" y="2" width="28" height="28" rx="3" fill="#cf9b5f" stroke="#784f2a" stroke-width="2"/><path d="M14 2h4v28h-4z" fill="#fae0a0"/><path d="M7 12h5M22 21h5" stroke="#784f2a" stroke-width="2"/>'),
        'platform':(128,24,'<rect width="128" height="24" rx="3" fill="#587d96"/><path d="M0 4h128" stroke="#87b4cf" stroke-width="6"/>'),
        'hazard':(80,24,'<path d="M0 24L10 2l10 22L30 2l10 22L50 2l10 22L70 2l10 22z" fill="#de5a5a" stroke="#8d3535"/>'),
        'heart':(24,24,'<path d="M12 21L3 12C-3 3 7-2 12 6C17-2 27 3 21 12z" fill="#ef6473"/>'),
        'pause':(24,24,'<rect x="5" y="3" width="5" height="18" fill="#ffffff"/><rect x="14" y="3" width="5" height="18" fill="#ffffff"/>')}
    for name,(w,h,body) in drawings.items(): write(base/f'{name}.svg',svg(w,h,body))
    dump(project / 'materials/assets.json', {'license':'本评测项目原创；所有模型使用相同字节','frames':[f'pelican-walk-{i}.svg' for i in range(4)],'frameRate':8,'root':'/materials/sprites/'})


def memory(project, admin):
    corpus=[]; queries=[]
    for i in range(80):
        entity = f'npc-{i:03}'
        group = ['update','association','entity','abstain'][i%4]
        # 开发与评测分组不重叠，但覆盖相同类型。
        name = f'阿林{i//2:02}'
        first={'id':f'm-{i:03}-a','entityId':entity,'npcName':name,'at':10,'text':f'{name}（{entity}）说：我现在喜欢辣味布丁，暂住东仓库。'}
        second={'id':f'm-{i:03}-b','entityId':entity,'npcName':name,'at':30,'text':f'{name}（{entity}）说：我改成只吃原味布丁，之前的辣味偏好不再有效。'}
        future={'id':f'm-{i:03}-future','entityId':entity,'npcName':name,'at':90,'text':f'{name}（{entity}）说：我又改为喜欢草莓布丁，现在住西仓库。'}
        corpus += [first,second,future]
        if group=='association':
            corpus.append({'id':f'm-{i:03}-c','entityId':entity,'npcName':name,'at':35,'text':f'{name}（{entity}）说：我明天送餐仍送到东仓库；布丁按我最新的口味。'})
            q=f'{entity}此刻应收到哪种口味布丁、送到哪处仓库？'; valid=[second['id'],f'm-{i:03}-c']; stale=[first['id']]
        elif group=='abstain':
            q=f'{entity}的生日是几月几日？'; valid=[]; stale=[]
        else:
            q=f'{entity}在提问时刻喜欢哪种口味的布丁？'; valid=[second['id']]; stale=[first['id']]
        queries.append({'id':f'q-{i:03}','entityId':entity,'group':entity,'category':group,'at':50,'query':q,'validEvidenceIds':valid,'staleEvidenceIds':stale})
    dump(project / 'materials/corpus.json', corpus)
    dump(project / 'materials/dev.json', queries[:20])
    dump(admin / '05-memory/holdout.json', queries[20:])
    new_corpus=[]; new_queries=[]
    for i in range(24):
        entity=f'new-{i:02}'; ids=[]
        for j,flavor in enumerate(['辣味','原味','咖啡','抹茶']):
            mid=f'n-{i:02}-{j}'
            new_corpus.append({'id':mid,'entityId':entity,'npcName':'小林' if i%2==0 else '阿林','at':10+20*j,'text':f'（{entity}）我现在只喜欢{flavor}布丁。旧偏好不再有效。'})
            ids.append(mid)
        new_queries.append({'id':f'newq-{i:02}','entityId':entity,'group':entity,'at':55,'category':'update','query':f'{entity}此时喜欢什么布丁？','validEvidenceIds':[ids[2]],'staleEvidenceIds':ids[:2]})
    dump(admin/'05-memory/change-corpus.json',new_corpus)
    dump(admin/'05-memory/change-dev.json',new_queries)
    dump(project / 'materials/demo-log.json', {'notice':'主持人编写的故障演示日志，故意含污染，不是真实模型成绩',
        'query':queries[0], 'config':{'cutoff':None,'topK':5,'budgetChars':1200},
        'candidateRetrieved':['m-000-future','m-000-b','m-000-a'],
        'leakedAnswerIncludedInIndex':True,'reportedRecall':1.0})
    write(project / 'materials/EXPERIMENT.md', '''# 原创NPC小规模研究任务
本项目借鉴LongMemEval，未复现官方全量数据或完整论文。论文快照 materials/longmemeval.pdf；阅读摘要、任务分类、评测设计与信息更新相关部分。不依赖外网或大模型调用。
开发20查询和管理员保留60查询；按entity分组且两者不重叠。corpus包含未来信息，必须按每个query.at截断。字符单位时间相对且仅用于本任务；不得跨entity混检后当作正确证据。同名人物必须用entityId区分。
research/bm25.py是可运行的中文双字切分BM25；research/candidate.py为待审计候选。两者需同一语料、时间规则、topK=5、最多1200字符上下文。demo-log.json是刻意污染的演示，不是可以当作真实证据的成绩。
约定检索接口 retrieve(corpus, query, top_k=5, budget_chars=1200) -> 文档ID列表。可改research/，材料和公开工具不可改。输出每个查询的retrievedIds、配置、原始指标和运行记录。
有效证据Recall@5：非空答案查询的有效证据命中数/该查询有效证据数，再按查询均值。过期证据比例：category=update或entity查询，取回staleEvidenceIds的数量/全部取回数量，无取回时该查询比例0。无答案错误提供证据比例：validEvidenceIds为空的查询中，取回非空证据的查询比例。报告分母和样本数。
固定seed=20261018，按entity group做2000次配对bootstrap，报告候选减基线的95%百分位区间。使用公开工具复算开发结果，做至少一个消融；不以开发数据分数推断正式冻结集分数。
管理员评测集与第二阶段数据不在本次工作区，不能主动寻找。第二阶段由主持人释放 materials/change/。output/DELIVERY.md应说明如何保持方法和参数不变运行新语料。
''')
