"""待审计的候选；此代码有意留下实验问题，不能称作参考解法。"""
from research.bm25 import tokens


def retrieve(corpus, query, top_k=5, budget_chars=1200):
    words=set(tokens(query['query']))
    ranked=sorted(corpus, key=lambda d:(-len(words.intersection(tokens(d['text']))), -d['at']))
    result=[]; used=0
    for doc in ranked:
        if used+len(doc['text']) > budget_chars: continue
        used+=len(doc['text']); result.append(doc['id'])
        if len(result)>=top_k: break
    return result
