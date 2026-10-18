from pathlib import Path
p=Path(__file__).with_name('collect.py')
s=p.read_text();s=s[:s.index("novel=root/'novel'")]
s=s.replace("'2503.14738','2607.27411','2604.19393'","'2610.20720','2609.26517','2609.37437'").replace("'2504.07258','2504.20212','2509.03815'","'2610.21357','2610.13589','2610.02734'")
s=s.replace("'2603.03666','2601.00331','2606.15189','2606.07501','2605.29934','2608.17456','2609.14688','2606.29512','2610.18178','2610.10341','2606.14308','2608.01872','2604.25669'","'2610.11193','2610.14383','2609.08158','2609.01697','2610.11927','2608.17456','2609.14688','2610.16874','2610.18178','2610.10341','2609.17962','2608.29721','2608.29138'")
s=s.replace("'2607.14515'","'2609.16048'").replace("root/'selection.xml'","root/'selection-recent.xml'").replace(">='2025-01-01'",">='2026-08-01'")
s += "\nmanifest=json.loads((root/'manifest.json').read_text());manifest.update(papersComplete=True,complete=False,novel={'status':'awaiting-authorized-web-novel'},selectionPolicy={'publishedFrom':'2026-08-01','publishedThrough':'2026-10-18','physics':25,'mathematics':25,'fixedVersions':True});(root/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));print('PAPERS COMPLETE',len(records),'papers',sum(r['pages'] for r in records),'pages',flush=True)\n"
p.write_text(s)
