"""公开指标复算；不执行候选代码，不改变分母。"""
import json
import random
import sys
from pathlib import Path


def per_query(row):
    got=set(row['retrievedIds'][:5]); valid=set(row['validEvidenceIds'])
    recall=len(got & valid)/len(valid) if valid else None
    stale=len(got & set(row['staleEvidenceIds']))/len(got) if got and row['category'] in ('update','entity') else (0.0 if row['category'] in ('update','entity') else None)
    abstain=float(bool(got)) if not valid else None
    return recall,stale,abstain


def summary(rows):
    columns=list(zip(*(per_query(r) for r in rows))) if rows else [[],[],[]]
    return {name:{'value':sum(v)/len(v) if v else None,'n':len(v)}
        for name,column in zip(['recallAt5','staleFraction','abstainError'],columns)
        for v in [[x for x in column if x is not None]]}


def paired_interval(a,b,seed=20261018,repeats=2000):
    by_id={r['id']:r for r in b}
    if len(by_id)!=len(b) or {r['id'] for r in a}!=set(by_id): raise ValueError('配对查询ID不一致或重复')
    grouped={}
    for row in a:
        other=by_id[row['id']]
        if row['group']!=other['group']: raise ValueError('配对分组不一致')
        if row['validEvidenceIds']:
            grouped.setdefault(row['group'],[]).append(per_query(other)[0]-per_query(row)[0])
    groups=list(grouped)
    if not groups: return {'difference':None,'ci95':None,'groups':0,'queries':0}
    rng=random.Random(seed); samples=[]
    for _ in range(repeats):
        differences=[v for key in rng.choices(groups,k=len(groups)) for v in grouped[key]]
        samples.append(sum(differences)/len(differences))
    samples.sort(); differences=[v for vals in grouped.values() for v in vals]
    return {'difference':sum(differences)/len(differences),'ci95':[samples[int(repeats*.025)],samples[min(repeats-1,int(repeats*.975))]],'groups':len(groups),'queries':len(differences),'seed':seed,'repeats':repeats}


if __name__=='__main__':
    rows=[json.loads(Path(p).read_text())['rows'] for p in sys.argv[1:]]
    result={'metrics':[summary(r) for r in rows]}
    if len(rows)==2: result['candidateMinusBaseline']=paired_interval(*rows)
    print(json.dumps(result,ensure_ascii=False,indent=2))
