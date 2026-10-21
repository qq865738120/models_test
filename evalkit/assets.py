"""固定种子生成公开材料与管理员保留材料，不包含参赛题参考答案。"""
import json
import shutil
from pathlib import Path

from .catalog import CATALOG

# The catalog owns task order, IDs and budgets for UI and initialization alike.
TASKS = {task['id']: (task['title'], task['minutes'], task['changeMinutes'])
         for task in CATALOG}
VERSION = 'pelican-v1.0-project-rules-v2-20261021'
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


def install_game_materials(project, key):
    """Install deterministic resource notes without prescribing a game design."""
    project = Path(project)
    if key == '04-game2d':
        name = 'level.json'
        notice = '保留此文件名供已有题目引用；本文件不预设关卡布局或游戏参数，具体内容以当前 TASK.md 为准。'
        contract = '''# 2D本地工程与资源说明

题目内容以当前 TASK.md 为准。本文件仅说明现有工程与资源位置。
起始工程已提供本地 Phaser 依赖；游戏实现从 src/main.ts 开始，可在工程内自行组织源码。
materials/level.json 是资源说明，public/materials/level.json 为同字节副本，不是固定关卡配置。
materials/assets.json 列出本项目原创 SVG 素材；素材位于 public/materials/sprites/，浏览器相对路径为 materials/sprites/。可使用 Phaser 的 load.svg 加载。
'''
    elif key == '05-game3d':
        name = 'warehouse.json'
        notice = '保留此文件名供已有题目引用；本文件不预设仓库布局、模型尺寸或控制参数，具体内容以当前 TASK.md 为准。'
        contract = '''# 3D本地工程与资源说明

题目内容以当前 TASK.md 为准。本文件仅说明现有工程与资源位置。
起始工程已提供本地 Three.js、enable3d 及其 Ammo 物理运行资源；游戏实现从 src/main.ts 开始，可在工程内自行组织源码。
Ammo 资源位于 public/vendor/ammo/，构建后位于 output/vendor/ammo/，浏览器相对路径为 vendor/ammo/。
materials/warehouse.json 是资源说明，public/materials/warehouse.json 为同字节副本，不是固定仓库配置。
'''
    else:
        raise ValueError(f'不支持的游戏题目：{key}')
    dump(project / 'materials' / name, {
        'version': VERSION, 'purpose': 'resource-information',
        'requirements': 'TASK.md', 'notice': notice,
    })
    write(project / 'materials/CONTRACT.md', contract)
    public_materials = project / 'public/materials'
    public_materials.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(project / 'materials' / name, public_materials / name)
    if key == '04-game2d':
        game_sprites(project)
        shutil.copyfile(project / 'materials/assets.json', public_materials / 'assets.json')


def generate(root, target, longread=False):
    tasks = target / 'tasks'
    for key in TASKS:
        project = tasks / key
        project.mkdir(parents=True)
        (project / 'output').mkdir()
        write(project / 'output/.keep', '')
        if key in ('03-dispatch', '04-game2d', '05-game3d'):
            shutil.copytree(root / 'templates/web', project, dirs_exist_ok=True)
            shutil.copytree(root / 'templates' / key, project, dirs_exist_ok=True,
                            ignore=shutil.ignore_patterns('mock-api.js', 'mock-server.mjs') if key == '03-dispatch' else None)
            shutil.copy(root / 'templates/common/performance.js', project / 'performance.js')
            # 公开采样器固定在 tools，不能由模型修改来改变测量口径。
            (project / 'tools').mkdir(exist_ok=True)
            (project / 'performance.js').rename(project / 'tools/performance.js')
        elif key == '02-static':
            shutil.copytree(root / 'templates/02-static', project, dirs_exist_ok=True)
        write(project / '.gitignore', 'node_modules/\ndist/\n__pycache__/\n.runtime/\n')
    one = tasks / '01-svg'
    shutil.copytree(root / 'templates/01-svg', one, dirs_exist_ok=True)
    (one / 'solution').mkdir()
    write(one / 'solution/.keep', '')
    write(one / 'materials/README.md', '最终交付 output/index.html，在HTML中内联动画SVG；可额外保留solution/animation.svg源码供 tools/svg-viewer.html 做SMIL/CSS时间采样。没有参考成图或答案。运行 python3 -m http.server 5173 --bind 127.0.0.1 后检查页面；动画SVG中不可使用JavaScript。\n')
    two = tasks / '03-dispatch'
    from .dispatch import install as install_dispatch
    install_dispatch(two, root / 'templates')
    reference(two)
    three = tasks / '04-game2d'
    package(three, {'phaser': '3.90.0'})
    install_game_materials(three, '04-game2d')
    four = tasks / '05-game3d'
    package(four, {'enable3d':'0.26.1', 'three':'0.171.0', '@types/three':'0.171.0'})
    install_game_materials(four, '05-game3d')
    five = tasks / '06-memory'
    if longread:
        from .longread import install
        install(root, target)
    else:
        shutil.copytree(root / 'templates/06-memory', five, dirs_exist_ok=True)
        memory(five, target / 'admin')
    from .automation_contract import install as install_automation_contract
    for key in TASKS:
        if key != '06-memory':
            install_automation_contract(tasks / key, key)
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
    dump(project / 'materials/assets.json', {'license':'本评测项目原创；所有模型使用相同字节','frames':[f'pelican-walk-{i}.svg' for i in range(4)],'root':'materials/sprites/'})


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
    dump(admin / '06-memory/holdout.json', queries[20:])
    new_corpus=[]; new_queries=[]
    for i in range(24):
        entity=f'new-{i:02}'; ids=[]
        for j,flavor in enumerate(['辣味','原味','咖啡','抹茶']):
            mid=f'n-{i:02}-{j}'
            new_corpus.append({'id':mid,'entityId':entity,'npcName':'小林' if i%2==0 else '阿林','at':10+20*j,'text':f'（{entity}）我现在只喜欢{flavor}布丁。旧偏好不再有效。'})
            ids.append(mid)
        new_queries.append({'id':f'newq-{i:02}','entityId':entity,'group':entity,'at':55,'category':'update','query':f'{entity}此时喜欢什么布丁？','validEvidenceIds':[ids[2]],'staleEvidenceIds':ids[:2]})
    dump(admin/'06-memory/change-corpus.json',new_corpus)
    dump(admin/'06-memory/change-dev.json',new_queries)
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
