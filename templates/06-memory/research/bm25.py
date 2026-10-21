"""公开可复现基线；实现端可修改，但比较时必须保持预算公平。"""
import math
import re
from collections import Counter


def tokens(text):
    chunks = re.findall(r'[a-zA-Z0-9_-]+|[\u4e00-\u9fff]+', text.lower())
    return [token for part in chunks for token in ([part] if part.isascii() else [part[i:i+2] for i in range(max(1,len(part)-1))])]


def retrieve(corpus, query, top_k=5, budget_chars=1200):
    docs = [d for d in corpus if d['at'] <= query['at'] and d['entityId'] == query['entityId']]
    if not docs: return []
    counts = [Counter(tokens(d['text'])) for d in docs]
    lengths = [sum(c.values()) for c in counts]
    average = sum(lengths)/len(lengths) or 1
    terms = set(tokens(query['query']))
    scores=[]
    for index, count in enumerate(counts):
        score = 0.0
        for term in terms:
            df = sum(term in c for c in counts)
            idf = math.log(1 + (len(docs)-df+0.5)/(df+0.5))
            tf = count[term]
            score += idf * tf * 2.5/(tf+1.5*(0.25+0.75*lengths[index]/average))
        scores.append((score, docs[index]))
    ranked = sorted(scores, key=lambda pair:(-pair[0], pair[1]['id']))
    used=0; result=[]
    for score, doc in ranked:
        if score <= 0: continue
        if used + len(doc['text']) > budget_chars: continue
        used += len(doc['text']); result.append(doc['id'])
        if len(result)>=top_k: break
    return result
