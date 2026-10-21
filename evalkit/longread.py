"""Frozen local long-reading corpus. Host references never enter candidate workspaces."""
import hashlib,json,shutil,subprocess,sys
from pathlib import Path

CORPUS='longread-20261018'
TITLE='五十篇论文，一部长篇'
CHANGE='''请审计你刚才六问中的论证，不增加外部资料：
从物理、数学、小说回答中各选一个最依赖特定前提的结论，分别写出原前提、取消该前提后仍成立的部分、不能再推出的部分，以及最小补证方案。每例回到至少两处原始材料定位证据。
在HTML中新增“前提敏感性复核”一节，并保留原答案；若发现原答案错误，标明修正及其影响，不悄悄改写原结论。'''

def load(path):return json.loads(path.read_text(encoding='utf-8'))
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()

def prepare_pdf_renderer(root, project):
    """Prepare a local CoreGraphics renderer before any candidate session starts."""
    if sys.platform != 'darwin':
        return
    tools = project / 'tools'
    tools.mkdir(exist_ok=True)
    source = tools / 'pdf-page.swift'
    shutil.copyfile(root/'templates/06-memory/tools/pdf-page.swift', source)
    subprocess.run(['/usr/bin/xcrun', 'swiftc', str(source), '-o', str(tools/'pdf-page')],
                   check=True, timeout=120, capture_output=True, text=True)
    (project/'materials/TOOLS.md').write_text(
        '# 本地PDF核对工具\n\n'
        '`tools/pdf-page materials/papers/文件.pdf 页码 .runtime/page.png`\n\n'
        '页码从1开始；先创建.runtime目录，输出路径须不存在。'
        '工具在准备阶段编译，依赖macOS系统CoreGraphics；无需联网或安装库。'
        '可用图像查看工具检查输出PNG中的公式。TXT仅用于检索。\n', encoding='utf-8')

def validate(root):
    source=root/'research'/CORPUS
    meta=load(source/'manifest.json')
    if not meta.get('complete') or not meta.get('papersComplete'):raise ValueError('长文本材料尚未完整准备')
    papers=meta['papers']
    if len(papers)!=50 or {r['id'] for r in papers}!={f'{c}{n:02}' for c in ['P','M'] for n in range(1,26)}:raise ValueError('需要25篇物理和25篇数学论文')
    if len({r['arxiv'].split('v')[0] for r in papers})!=50:raise ValueError('论文编号重复')
    for r in papers:
        if not ('2026-08-01'<=r['published'][:10]<='2026-10-18' and r['updated'][:10]<='2026-10-18'):raise ValueError('论文不在固定时间范围')
        for key,hash_key in [('pdf','pdfSha256'),('text','textSha256')]:
            path=source/r[key]
            if not path.resolve().is_relative_to(source.resolve()) or digest(path)!=r[hash_key]:raise ValueError('论文文件或校验值异常：'+r['id'])
    novel=load(source/'novel/manifest.json')
    if novel['status']!='converted' or len(novel['spine'])!=20 or len(novel['sections'])!=58:raise ValueError('小说目录不完整')
    for key,hash_key in [('sourceFile','sourceSha256'),('fullText','fullTextSha256')]:
        if digest(source/'novel'/novel[key])!=novel[hash_key]:raise ValueError('小说全文校验失败')
    for section in novel['sections']:
        if digest(source/'novel'/section['file'])!=section['sha256']:raise ValueError('小说分节校验失败')
    for name in ['TASK-CORE.md','host/REFERENCE.md','host/RUBRIC.json']:
        if not (source/name).is_file():raise ValueError('未完成材料：'+name)
    return source,meta

def install(root,target):
    source,meta=validate(root)
    dest=target/'tasks/06-memory/materials';dest.mkdir(parents=True,exist_ok=True)
    for r in meta['papers']:
        for key in ('pdf','text'):
            path=Path(r[key]);(dest/path.parent).mkdir(parents=True,exist_ok=True);shutil.copyfile(source/path,dest/path)
    shutil.copytree(source/'novel',dest/'novel')
    for name in ('manifest.json','corpus.sha256','INDEX.md','index.html'):
        shutil.copyfile(source/name,dest/name)
    private=target/'admin/06-memory';private.mkdir(parents=True,exist_ok=True)
    from .objective import install as install_objective
    install_objective(target)
    (target/'tasks/06-memory/research').mkdir(exist_ok=True)
    (dest/'README.md').write_text('50篇论文/预印本与用户提供的《三体Ⅲ：死神永生》全文。先查INDEX.md及novel/INDEX.md；PDF与TXT内容均在本题目录。小说引用Nxxx-Pxxxx；论文引用材料编号及PDF页码。PDF为公式的权威版本。不得将小说设定与现实研究结论混为一谈。\n',encoding='utf-8')
