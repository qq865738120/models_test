#!/usr/bin/env python3
"""Assemble and freeze independently reviewed short-answer questions, before testing."""
import argparse
import datetime
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from evalkit import objective
from evalkit.objective_audit import audit_draft
from scripts.build_longread_release import verify_reviewed_bank

BASE = ROOT / 'research/longread-qa-v4'
AUTHORS = {'physics':'gpt-6-astra', 'math':'gpt-6-sol', 'novel':'gpt-6-astra'}


def read(path): return json.loads(path.read_text())
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def write_new(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('x') as stream:
        json.dump(value, stream, ensure_ascii=False, indent=2)
        stream.write('\n')


def export(domain):
    draft = read(BASE / 'authoring' / (domain+'.json'))
    assert draft['version'] == 'longread-qa-v4'
    for phase,count in [('initial',6),('change',2)]:
        assert len(draft['questions'][phase]) == count
        assert all(q['domain']==domain and q['answerType']=='structured' for q in draft['questions'][phase])
    public = {'version':draft['version'], 'domain':domain, 'phases':draft['questions']}
    path = BASE / 'review-input' / (domain+'.json')
    if path.exists():
        assert read(path)==public, 'Review input changed; archive previous input and reviews explicitly first.'
    else:
        write_new(path, public)
    print(domain, sha(path))
    return draft


def assemble():
    bank = {'version':'longread-qa-v4','phases':{'initial':[],'change':[]}}
    host = {'version':bank['version'],'phases':{'initial':[],'change':[]}}
    for domain in AUTHORS:
        draft=export(domain)
        for phase in bank['phases']:
            bank['phases'][phase] += draft['questions'][phase]
            host['phases'][phase] += draft['answers'][phase]
    objective.merge_answer_key(bank,host)
    audit=audit_draft({'questions':bank['phases'],'answers':host['phases']},ROOT)
    assert audit['passed'],audit['errors']
    write_new(BASE/'questions.json',bank)
    write_new(BASE/'host/answer-key.json',host)
    write_new(BASE/'host/assembly-audit.json',audit)
    print('Assembled 18 initial + 6 change short-answer questions.')


def freeze():
    bank=read(BASE/'questions.json')
    host=read(BASE/'host/answer-key.json')
    key=objective.merge_answer_key(bank,host)
    rows=[]
    files=[BASE/'questions.json',BASE/'host/answer-key.json',BASE/'host/mechanical-audit.json']
    for domain,author in AUTHORS.items():
        public=BASE/'review-input'/f'{domain}.json'
        verify_reviewed_bank(bank,domain,read(public))
        path=BASE/'host/review'/f'{domain}-blind.json'
        review=read(path)
        assert review['model']!=author
        assert review['questionsSha256']==sha(public)
        for phase in bank['phases']:
            questions=[q for q in key['phases'][phase] if q['domain']==domain]
            responses=review['phases'][phase]
            mapping={r['id']:r for r in responses}
            assert len(mapping)==len(responses) and set(mapping)=={q['id'] for q in questions}
            for q in questions:
                r=mapping[q['id']]
                assert not r.get('issues'),(q['id'],r.get('issues'))
                assert r.get('uniqueAnswer') is True and r.get('crossSourceNecessary') is True,q['id']
                assert len(set(r['actuallyNecessarySources'])) >= 2,q['id']
                assert set(r['actuallyNecessarySources']) <= set(r['sources']),q['id']
                assert r.get('mechanism'),q['id']
                assert r.get('derivation'),q['id']
                assert objective.normalize_answer(r['answer'],q)==q['answer'],(q['id'],r['answer'],q['answer'])
                rows.append({'id':q['id'],'phase':phase,'authorModel':author,
                             'reviewerModel':review['model'],'independentAnswerAgrees':True,
                             'uniqueAnswer':True,'crossSourceNecessary':True})
        files += [public,path]
    audit=read(BASE/'host/mechanical-audit.json')
    assert audit['passed'] and audit['structuredCasesChecked']>=24*6
    assert audit['questionsSha256']==sha(BASE/'questions.json')
    assert audit['hostAnswersSha256']==sha(BASE/'host/answer-key.json')
    # The third model's cue review is question-only and is not used as a correctness oracle.
    cue_path=BASE/'host/review/question-only.json'
    cue=read(cue_path)
    assert cue['model']=='gpt-6.1-sol' and cue['questionsSha256']==sha(BASE/'questions.json')
    assert cue['corpusAccessed'] is False and not cue.get('blockingIssues')
    files.append(cue_path)
    release={'version':bank['version'],'difficulty':'中级','initialQuestions':18,'changeQuestions':6,
             'frozenAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
             'status':'frozen-before-candidate','answerContract':'exact-structured-v1',
             'models':sorted(set(AUTHORS.values())|{cue['model']}),'reviewedItems':rows,
             'sha256':{str(p.relative_to(ROOT)):sha(p) for p in files},
             'mergedAnswerKeySha256':hashlib.sha256((json.dumps(key,ensure_ascii=False,indent=2)+'\n').encode()).hexdigest(),
             'limitations':['Source-dependent answers do not establish the scientific truth of every preprint.',
                           'Question-only cue review is not a calibrated measure of difficulty.',
                           'No desired candidate score is imposed; no answer changes after candidate execution.']}
    write_new(BASE/'host/release.json',release)
    print('Frozen:',release['frozenAt'],release['mergedAnswerKeySha256'])


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action',choices=['physics','math','novel','assemble','freeze'])
    action=parser.parse_args().action
    if action=='assemble': assemble()
    elif action=='freeze': freeze()
    else: export(action)
