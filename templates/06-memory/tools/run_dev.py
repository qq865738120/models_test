"""公开开发集执行器，不包含管理员冻结查询。"""
import importlib
import json
import sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))

def main():
    module=importlib.import_module('research.'+(sys.argv[1] if len(sys.argv)>1 else 'bm25'))
    material=ROOT/'materials'
    if '--change' in sys.argv: material=material/'change'
    corpus=json.loads((material/'corpus.json').read_text())
    queries=json.loads((material/'dev.json').read_text())
    rows=[{**q,'retrievedIds':module.retrieve(corpus,q,top_k=5,budget_chars=1200)} for q in queries]
    path=ROOT/'output'/(module.__name__.split('.')[-1]+('-change' if '--change' in sys.argv else '')+'-raw.json')
    path.parent.mkdir(exist_ok=True)
    path.write_text(json.dumps({'config':{'topK':5,'budgetChars':1200,'seed':20261018},'rows':rows},ensure_ascii=False,indent=2))
    print(path.relative_to(ROOT))

if __name__=='__main__': main()
