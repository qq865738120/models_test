#!/usr/bin/env python3
"""Render the host's versioned standard without modifying the original HTML."""
import argparse
import html
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from evalkit.catalog import catalog, candidate_task, candidate_change, RUBRIC_VERSION
from evalkit.standard import read_standard
from evalkit.hybrid_revision import PROMPT_VERSION


def reference_html(task_id, dimension):
    if dimension.get('scoring') != 'manual':
        return ''
    key = dimension['id']
    visual = {
        '01-svg': ('svg-expression', {'expression', 'visual'}),
        '02-static': ('static-visual', {'impact', 'craft', 'integration'}),
        '03-dispatch': ('dispatch-visual', {'visual'}),
        '04-game2d': ('game2d-visual', {'visual'}),
        '05-game3d': ('game3d-visual', {'model', 'rendering', 'visual'}),
    }.get(task_id)
    if visual and key in visual[1]:
        return (f'<figure><figcaption>{html.escape(dimension["name"])} · 0 / 5 / 10分参考</figcaption>'
                f'<img loading="lazy" src="web/public/rubric-references/r7/{visual[0]}.png" '
                f'alt="{html.escape(dimension["name"])}由低至高三档示意">'
                '<div class="reference-labels"><span>0 · 严重不足</span><span>5 · 基础完成</span>'
                '<span>10 · 精细成熟</span></div>'
                '<small>AI生成的完成度示意，不是参赛作品；不要求复刻风格、配色或布局。动作与多视角仍需实际查看。</small></figure>')
    if key not in ('interaction', 'feel'):
        return ''
    labels = ['断裂 · 迟滞', '基本可用', '连贯 · 反馈清楚']
    cards = []
    for i, label in enumerate(labels):
        path = 'M15 50l20-15 18 30 20-30 22 15' if i == 0 else 'M15 50Q55 10 95 50'
        cards.append(f'<div><svg viewBox="0 0 110 80" role="img" aria-label="{label}">'
                     '<rect width="110" height="80" fill="#f5f3ec" rx="6"/>'
                     f'<path d="{path}" fill="none" stroke="#38746c" stroke-width="3"/>'
                     '<circle cx="15" cy="50" r="6" fill="#e99a57"/>'
                     '<circle cx="95" cy="50" r="6" fill="#38746c"/>'
                     f'</svg><b>{i*5} · {label}</b></div>')
    return '<figure><figcaption>实际操作参照</figcaption><div class="reference-labels">' + ''.join(cards) + '</div><small>图示只帮助理解连贯性；必须实际测试输入、反馈、取消和恢复，不能凭图判断手感。</small></figure>'


def render():
    tasks = catalog()
    original = read_standard(ROOT / 'llm-evaluation-standard.html')
    esc = html.escape
    parts = ['''<!doctype html><html lang="zh-CN"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>鹈鹕测评 · 六题标准 r15</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f3f1ec;color:#30383d;font:16px/1.8 system-ui,-apple-system,"PingFang SC",sans-serif}
main{max-width:1160px;margin:0 auto;padding:48px 28px}h1{font-size:40px;line-height:1.25}h2{font-size:28px}h3{font-size:21px}
header,section{background:#fffdf8;padding:32px;border-radius:14px;margin-bottom:24px}h1,h2,h3,p{margin-top:0}
nav{display:flex;flex-wrap:wrap;gap:12px}a{color:#975128}small,.note{color:#6c7379}
table{width:100%;border-collapse:collapse}th,td{padding:12px;text-align:left;border-bottom:1px solid #e3ded4;vertical-align:top}th{background:#f5f0e7}
pre{white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.85 system-ui;background:#f6f3ed;padding:20px;border-radius:8px}
details{margin:20px 0}summary{cursor:pointer;color:#975128;font-weight:600}article{padding:18px 0;border-top:1px solid #e3ded4}
.weight{float:right;font-size:18px;color:#975128}li{margin-bottom:6px}.table-wrap{overflow-x:auto}
figure{margin:22px 0;padding:16px;background:#f5f3ed;border-radius:12px}figure img{width:100%;height:auto;display:block;margin:12px 0}figcaption{font-weight:700}.reference-labels{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;margin:8px 0}.reference-labels svg{max-height:150px;width:100%;display:block}figure small{display:block;margin-top:10px}
@media(max-width:700px){main{padding:20px 12px}header,section{padding:20px}h1{font-size:29px}.weight{float:none;display:block}th,td{padding:8px}}
@media print{body{background:white}main{padding:0}header,section{padding:12px;break-inside:auto}details{display:block}pre{font-size:11px}nav{display:none}}
</style><main><header><p class="note">主持人版本 · 含追加要求，请勿分发到初始测试工作区</p>
<h1>鹈鹕测评<br>六道题，各有重点。</h1>''',
             f'<p>评分版本 <b>{RUBRIC_VERSION}</b> · 创作题提示词 <b>{PROMPT_VERSION}</b> · 长文本题 <b>longread-qa-v4</b></p>',
             '<p>六题的显示编号、任务ID与工作区目录一致：01-svg、02-static、03-dispatch、04-game2d、05-game3d、06-memory。按目录名排序即为题目顺序。原始及r6—r13标准、已有运行与成果保留不改写。共同规则明确允许自行编写图形、动画和3D模型；静态页从空白画布自由创作，事实资料不规定页面结构。</p>',
             '<p>每阶段独立满分100。第1、2、4、5题全部由主持人实际核验，使用0–10分滑块评分，步长0.5分。第3题纯HTTP接口由脚本整维度判定0或1，其余功能、视觉与交互仍人工评分。未核验项保持空值。第六题按冻结答案逐题判对错，每题全部答案字段正确才取得权重。完整新版轮次按六题等权平均；不同材料或标准版本分榜。</p><nav>']
    parts += [f'<a href="#{t["id"]}">{t["number"]} {esc(t["shortTitle"])}</a>' for t in tasks]
    parts.append('</nav></header><section><h2>本版的调整依据</h2><p>本版保留题目正文，精简项目附加规则：不再提供固定平台坐标、仓库布局或额外物理参数，不再要求DOM标签、游戏观测接口、测试场景和按键重放。工作台仅保留离线入口、相对资源、iframe兼容与派单HTTP对接；玩法和具体内容以当前阶段提示词为准。旧标准、运行和快照保持原样。</p><h3>沿用的评分结构</h3><p>SVG初始与追加都只评价空间关系、脚与踏板同步性、构图与动画表现；叙事节奏和循环衔接结合整体表现评价，不另设时间线、循环或交付分。2D删除独立的HUD/键盘触屏输入与引擎交付评分；3D删除独立的本地物理、性能和资源评分，货箱业务交付仍计分。静态页沿用视觉与内容三项；派单沿用纯HTTP接口脚本与人工评分。删除独立分项不取消基本任务要求。既有轮次和分数保留，主持人重新保存时记录当前评分版本；旧追加分数不会自动映射到新维度。</p><p>SVG两阶段权重均为30/30/40，追加核对8秒变更。静态页初始40/30/30，追加43/43/14。派单初始纯接口40分，全部检查通过才取得对应维度权重，其余功能、视觉与交互60分由人工评价。2D初始画面25分、手感15分，追加画面20分；3D初始精细建模25分、画面25分，追加视觉20分。视觉相关项用统一三档图示，详细文字折叠。第六题标为中级，改为18道初始题和6道追加题，以跨论文联立约束、精确计算和跨章节信息推理为重点。短答案不提供可凭措辞猜测的选项，题干与字段名不提供目标论文编号。答案按字段顺序填写数值或代码，每题全部字段正确才得分，等值有理数自动规范化。出题模型与盲审模型分别核对原文、唯一性和材料依赖，另做题干暗示审查；冻结后单独重测，不根据模型得分修改答案。第2题初始创作移除固定主题容器、字数与布局等约束，从空白HTML自由创作，保留视觉冲击、全面准确与本地交付目标。</p><p class="note">人工核验须实际操作并对照锚点；截图、源码或辅助工具输出不能替代真实体验。当前仍为试运行材料，预算及性能阈值需在固定设备预跑；标准重写不等于完成基准校准。</p></section>')
    for task in tasks:
        parts += [f'<section id="{task["id"]}"><p class="note">{task["number"]} / {esc(task["shortTitle"])}</p>',
                  f'<h2>{esc(task["title"])}</h2><p>{esc(task["description"])}</p>',
                  f'<p>考察：{esc(" / ".join(task["capabilities"]))}<br>难度 {esc(task["level"])} · 初始 {task["minutes"]} 分钟 · 追加 {task["changeMinutes"]} 分钟</p>']
        for phase, field, name in [('initial', 'rubric', '初始'), ('change', 'rubricChange', '追加')]:
            prompt = candidate_task(task['id'], original) if phase == 'initial' else candidate_change(task['id'], original)
            parts.append(f'<details><summary>{name}提示词 · 点击展开</summary><pre>{esc(prompt)}</pre></details>')
            dims = task[field]
            parts.append(f'<h3>{name}评分 · {len(dims)}项 · 100分</h3><div class="table-wrap"><table><thead><tr><th>项目</th><th>权重</th><th>考察重点</th></tr></thead><tbody>')
            parts += [f'<tr><td>{esc(d["name"])} · {"自动" if d.get("scoring")=="auto" or task.get("scoringMode")=="objective" else "人工"}</td><td>{d["weight"]}</td><td>{esc(d["description"])}</td></tr>' for d in dims]
            parts.append('</tbody></table></div>')
            parts.extend(reference_html(task['id'], d) for d in dims)
            if task.get('scoringMode') != 'objective':
                parts.append('<details><summary>核验步骤与判分锚点</summary>')
                for d in dims:
                    parts.append(f'<article><h3>{esc(d["name"])} <span class="weight">{d["weight"]}分</span></h3><ol>')
                    parts += [f'<li>{esc(c)}</li>' for c in d['checks']]
                    parts.append('</ol>')
                    parts += [f'<p><b>{a["score"]}/{1 if d.get("scoring")=="auto" else 10}：</b>{esc(a["text"])}</p>' for a in d['anchors']]
                    parts.append('</article>')
                parts.append('</details>')
        parts.append(f'<p class="note">{esc(task["scoringGuidance"])}</p></section>')
    parts.append('<section><h2>材料与实现</h2><p>科普事实：<a href="templates/02-static/materials/PELICAN.md">鹈鹕资料卡与来源</a>。参考图使用内置image_gen统一生成，<a href="web/public/rubric-references/r7/prompts.md">提示词与生成说明</a>保留在主持人目录，不分发给被测模型。工作台交付说明由<code>evalkit/automation_contract.py</code>生成；第3题纯HTTP接口脚本独立评分，其余作品维度由主持人评价。</p><p><a href="llm-evaluation-standard.html">原始五题标准</a> · <a href="llm-evaluation-standard-r6.html">保留的r6</a> · <a href="llm-evaluation-standard-r7.html">保留的r7</a> · <a href="llm-evaluation-standard-r8.html">保留的r8</a> · <a href="llm-evaluation-standard-r9.html">保留的r9</a> · <a href="llm-evaluation-standard-r10.html">保留的r10</a> · <a href="llm-evaluation-standard-r11.html">保留的r11</a> · <a href="README.md">运行与评分说明</a></p></section></main></html>')
    return '\n'.join(parts) + '\n'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'llm-evaluation-standard-r15.html')
    args = parser.parse_args()
    if args.output.resolve() == (ROOT / 'llm-evaluation-standard.html').resolve():
        parser.error('不得覆盖原始标准')
    # Rendered versions are immutable; select a new filename to publish a revision.
    with args.output.open('x', encoding='utf-8') as dest:
        dest.write(render())
    print(args.output)
