#!/usr/bin/env python3
"""Host-only assembly and release; candidate outputs never influence this process."""
import argparse, copy, datetime, hashlib, json, random, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from evalkit.objective_audit import audit_draft
from evalkit import objective
BASE=ROOT/'research/longread-qa-v3'

def read(p): return json.loads(p.read_text())
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def write_new(p,value):
 p.parent.mkdir(parents=True,exist_ok=True)
 with p.open('x') as f: json.dump(value,f,ensure_ascii=False,indent=2);f.write('\n')

def verify_reviewed_bank(bank,domain,public):
 if bank['version']!=public['version'] or public.get('domain')!=domain:
  raise ValueError('发布题库与盲审题面版本不一致：'+domain)
 for phase in ('initial','change'):
  rows=[q for q in bank['phases'][phase] if q['domain']==domain]
  if rows!=public['phases'][phase]:
   raise ValueError('发布题面与盲审题面不同：'+domain+'/'+phase)

def prepare_domain(domain):
 d=copy.deepcopy(read(BASE/'authoring'/f'{domain}.json'))
 for phase,count in (('initial',24),('change',8)):
  assert len(d['questions'][phase])==count,(domain,phase)
  answers={a['id']:a for a in d['answers'][phase]}
  for q in d['questions'][phase]:
   a=answers[q['id']]
   order=list('ABCDEF')
   random.Random('pelican-v3-20261021:'+q['id']).shuffle(order)
   mapping=dict(zip('ABCDEF',order))
   q['options']={new:q['options'][old] for new,old in mapping.items()}
   a['answer']=''.join(new for new,old in mapping.items() if old in a['answer'])
   a['optionAudit']={new:a['optionAudit'][old] for new,old in mapping.items()}
 return d

def export_domain(domain):
 d=prepare_domain(domain)
 public={'version':'longread-qa-v3','domain':domain,'phases':d['questions']}
 path=BASE/'review-input'/f'{domain}.json'
 if path.exists():
  assert read(path)==public, 'Published blind-review input changed: '+domain
 else: write_new(path,public)
 return d

def assemble():
 bank={'version':'longread-qa-v3','phases':{'initial':[],'change':[]}}
 key={'version':bank['version'],'phases':{'initial':[],'change':[]}}
 for domain in ('physics','math','novel'):
  d=export_domain(domain)
  for phase in ('initial','change'):
   bank['phases'][phase]+=d['questions'][phase]
   key['phases'][phase]+=d['answers'][phase]
 objective.merge_answer_key(bank,key)
 report=audit_draft({'questions':bank['phases'],'answers':key['phases']},ROOT)
 assert report['passed'],report['errors']
 for phase in bank['phases']:
  assert all(q['scoring']=='exact' for q in bank['phases'][phase])
 for domain in ('physics','math','novel'):
  assert sum(q['multiple'] for q in bank['phases']['initial'] if q['domain']==domain)>=18
 write_new(BASE/'questions.json',bank)
 write_new(BASE/'host/answer-key.json',key)
 write_new(BASE/'host/assembly-audit.json',report)
 print('Assembled 72 initial + 24 change; quotes:',report['quotesChecked'])

def freeze():
 bank=read(BASE/'questions.json');host=read(BASE/'host/answer-key.json')
 key=objective.merge_answer_key(bank,host)
 authors={'physics':'gpt-6-astra','math':'gpt-6-sol','novel':'gpt-6-astra'}
 reviews=[];rows=[]
 for domain in authors:
  path=BASE/'host/review'/f'{domain}-blind.json';review=read(path)
  public=BASE/'review-input'/f'{domain}.json'
  verify_reviewed_bank(bank,domain,read(public))
  assert review['model']!=authors[domain]
  assert review['questionsSha256']==digest(public)
  for phase in bank['phases']:
   qs=[q for q in bank['phases'][phase] if q['domain']==domain]
   rs={r['id']:r for r in review['phases'][phase]}
   assert len(rs)==len(review['phases'][phase]) and set(rs)=={q['id'] for q in qs}
   answers={r['id']:r for r in host['phases'][phase]}
   for q in qs:
    r=rs[q['id']];a=answers[q['id']]
    assert not r.get('issues'),(domain,q['id'],r.get('issues'))
    assert r['answer']==a['answer'],(q['id'],r['answer'],a['answer'])
    assert set(r['optionVerdicts'])==set('ABCDEF'),q['id']
    assert all(isinstance(v,bool) for v in r['optionVerdicts'].values())
    assert ''.join(c for c in 'ABCDEF' if r['optionVerdicts'][c])==a['answer']
    assert len(set(r['sources']))>=2
    rows.append({'id':q['id'],'phase':phase,'authorModel':authors[domain],
                 'reviewerModel':review['model'],'independentAnswerAgrees':True})
  reviews.append(path)
 extra_path=BASE/'host/review/math-additional.json';extra=read(extra_path)
 assert extra['questionsSha256']==digest(BASE/'review-input/math.json')
 assert extra['model']=='gpt-6.1-sol'
 expected_extra={'M13','M14','M19','M21','M22','M24','XM06','XM07'}
 extra_rows=[]
 for phase in bank['phases']:
  answers={r['id']:r for r in host['phases'][phase]}
  for r in extra['phases'][phase]:
   assert r['id'] in expected_extra and not r.get('issues'),r
   assert set(r['optionVerdicts'])==set('ABCDEF')
   assert all(isinstance(v,bool) for v in r['optionVerdicts'].values())
   assert r['answer']==''.join(c for c in 'ABCDEF' if r['optionVerdicts'][c])==answers[r['id']]['answer']
   assert len(set(r['sources']))>=2
   extra_rows.append({'id':r['id'],'phase':phase,'reviewerModel':extra['model'],'independentAnswerAgrees':True})
 assert len(extra_rows)==len(expected_extra) and {r['id'] for r in extra_rows}==expected_extra
 reviews.append(extra_path)
 mechanical=read(BASE/'host/mechanical-audit.json')
 assert mechanical['passed'] and mechanical['exhaustiveSubsetsChecked']==96*63
 assert mechanical['questionsSha256']==digest(BASE/'questions.json')
 assert mechanical['hostAnswersSha256']==digest(BASE/'host/answer-key.json')
 files=[BASE/'questions.json',BASE/'host/answer-key.json',BASE/'host/mechanical-audit.json',*reviews]
 release={'version':bank['version'],'difficulty':'中级','initialQuestions':72,'changeQuestions':24,
          'frozenAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'frozen-before-candidate',
          'models':sorted(set(authors.values())|{extra['model']}),'reviewedItems':rows,
          'additionalReviewedItems':extra_rows,
          'sha256':{str(p.relative_to(ROOT)):digest(p) for p in files},
          'mergedAnswerKeySha256':hashlib.sha256((json.dumps(key,ensure_ascii=False,indent=2)+'\n').encode()).hexdigest(),
          'limitations':['Model agreement and quotation checks do not prove all source claims.',
                         'Difficulty label is a requested presentation label, not empirical population calibration.',
                         'No target candidate score is imposed; answers are frozen before the candidate run.']}
 write_new(BASE/'host/release.json',release)
 print('Frozen release:',release['frozenAt'],release['mergedAnswerKeySha256'])

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('action',choices=['assemble','freeze','physics','math','novel']);args=p.parse_args()
 (assemble() if args.action=='assemble' else freeze() if args.action=='freeze' else export_domain(args.action))
