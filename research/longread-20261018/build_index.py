"""Verify the frozen paper corpus and build its neutral, local reading index."""
import collections,hashlib,html,json
from pathlib import Path
root=Path(__file__).parent
m=json.loads((root/'manifest.json').read_text());papers=m['papers']
assert len(papers)==50 and len({r['arxiv'].split('v')[0] for r in papers})==50
assert {r['id'] for r in papers}=={f'{p}{n:02}' for p in ['P','M'] for n in range(1,26)}
for r in papers:
 assert '2026-08-01'<=r['published'][:10]<='2026-10-18'
 assert r['updated'][:10]<='2026-10-18'
 for name,field in [('pdf','pdfSha256'),('text','textSha256')]:
  p=root/r[name];assert p.resolve().is_relative_to(root.resolve())
  assert hashlib.sha256(p.read_bytes()).hexdigest()==r[field],r['id']
 assert (root/r['pdf']).read_bytes().startswith(b'%PDF-')
 text=(root/r['text']).read_bytes().decode('utf-8');assert text.count('[PDF page ')==r['pages']
 assert len(text)==r['characters']
counts=dict(collections.Counter(r['published'][:7] for r in papers))
stats={'papers':len(papers),'physics':25,'mathematics':25,'pages':sum(r['pages'] for r in papers),'textCharacters':sum(r['characters'] for r in papers),'publicationMonths':counts,'earliest':min(r['published'][:10] for r in papers),'latest':max(r['published'][:10] for r in papers)}
m.update(papersComplete=True,statistics=stats)
m['textExtraction']='pypdf 6.10.0; PDF page markers retained. Search text is not authoritative for mathematical notation.'
(root/'manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
labels={'physics-cosmology':'物理 · 暗能量与引力','physics-quantum':'物理 · 量子纠错','math-pde':'数学 · 流体方程与解的条件','math-zeta':'数学 · ζ函数与L函数'}
e=html.escape
body=''
md=['# 长文本评测论文材料','',f"50篇固定版本论文/预印本，首次发布于{stats['earliest']}至{stats['latest']}。25篇物理、25篇数学，共{stats['pages']:,}页、{stats['textCharacters']:,}个提取文本字符（非token数）。",'', '小说为用户提供的《三体Ⅲ：死神永生》，保留完整文本与58个标题分节。见[小说索引](novel/INDEX.md)。材料固定但尚未完成专家校准。','']
for group,label in labels.items():
 rows='';md+=['## '+label,'']
 for r in papers:
  author=', '.join(r['authors'][:3])+(' 等' if len(r['authors'])>3 else '')
  rows+=f'<tr><td><b>{r["id"]}</b></td><td><strong>{e(r["title"])}</strong><small>{e(author)}</small></td><td>{r["published"][:10]}<small>{r["arxiv"]}</small></td><td>{r["pages"]}</td><td><a href="{e(r["pdf"])}">PDF</a> · <a href="{e(r["text"])}">页码文本</a> · <a href="{e(r["source"])}">来源</a></td></tr>'
  md.append(f'- **{r["id"]}** {r["title"]} — {r["published"][:10]}，{r["arxiv"]}，{r["pages"]}页。[PDF]({r["pdf"]}) · [页码文本]({r["text"]}) · [arXiv]({r["source"]})')
 body+=f'<section><h2>{label}</h2><table><thead><tr><th>编号</th><th>论文</th><th>初次发布 / 版本</th><th>页数</th><th>全文</th></tr></thead><tbody>{rows}</tbody></table></section>'
 md.append('')
(root/'INDEX.md').write_text('\n'.join(md)+'\n')
(root/'index.html').write_text(f'''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>前沿论文材料 · 鹈鹕测评</title><style>body{{margin:0;background:#faf8f4;color:#30343a;font:16px/1.7 system-ui}}main{{max-width:1240px;margin:auto;padding:64px 32px}}header small{{color:#b47642;letter-spacing:3px}}h1{{font-size:48px;letter-spacing:-1px;margin:12px 0}}h2{{margin:48px 0 20px}}p{{color:#73777d}}.stats{{display:flex;gap:48px;margin:32px 0}}.stats strong{{font-size:40px}}.stats small,td small{{display:block;color:#8a8b90;font-size:13px}}table{{width:100%;border-collapse:collapse;background:#fffdfa}}td,th{{padding:18px 15px;text-align:left;border-bottom:1px solid #ece7df}}th{{color:#8a8b90;font-size:13px}}td:first-child{{color:#b47642}}td:last-child{{white-space:nowrap}}a{{color:#54718e;text-decoration:none}}a:hover{{text-decoration:underline}}@media(max-width:700px){{main{{padding:32px 16px}}h1{{font-size:32px}}table{{font-size:13px}}td,th{{padding:10px 6px}}td:last-child{{white-space:normal}}}}</style><main><header><small>鹈鹕测评 v1.0 · 长文本材料</small><h1>前沿论文，交叉阅读。</h1><p>固定截点 2026-10-18 · 物理与数学各25篇 · {stats['earliest']}—{stats['latest']}首次发布</p><div class="stats"><div><strong>50</strong><small>篇论文 / 预印本</small></div><div><strong>{stats['pages']:,}</strong><small>PDF页</small></div><div><strong>4</strong><small>研究专题</small></div></div><p>保留原始PDF、可检索页码文本与来源。公式以PDF为准；论文主张不等于经本项目独立验证的定理。<br>另含《三体Ⅲ：死神永生》全文与58个标题分节。<a href="novel/INDEX.md">小说索引</a> · <a href="manifest.json">查看版本与校验清单</a></p></header>{body}</main></html>''')
(root/'corpus.sha256').write_text('\n'.join(f'{r[field]}  {r[name]}' for r in papers for name,field in [('pdf','pdfSha256'),('text','textSha256')])+'\n')
print(json.dumps(stats,ensure_ascii=False,indent=2))
