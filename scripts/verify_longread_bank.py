#!/usr/bin/env python3
"""Verify host evidence and exhaustively exercise the published answer contract."""
import argparse
import hashlib
import itertools
import json
from fractions import Fraction
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from evalkit import objective
from evalkit.objective_audit import audit_draft


def verify():
    bank = objective.question_bank()
    answers = objective.read_json(objective.SOURCE / 'host/answer-key.json')
    key = objective.merge_answer_key(bank, answers)
    report = audit_draft({'questions': bank['phases'], 'answers': answers['phases']}, ROOT)
    checks = 0
    structured_checks = 0
    for phase, questions in key['phases'].items():
        for q in questions:
            if q.get('answerType') == 'structured':
                original = q['answer'].split(';')
                variants = [(q['answer'], 1), (' \n'.join(q['answer'].lower()), 1),
                            ('', 0), (q['answer']+';0', 0), (None, 0)]
                for i, part in enumerate(q['answerParts']):
                    changed = original[:]
                    if part['kind'] == 'code':
                        changed[i] += 'Z'
                    else:
                        changed[i] = str(Fraction(changed[i]) + 1)
                    variants.append((';'.join(changed), 0))
                    if part['kind'] == 'rational':
                        equivalent = original[:]
                        value = Fraction(equivalent[i])
                        equivalent[i] = f'{value.numerator*7}/{value.denominator*7}'
                        variants.append((';'.join(equivalent), 1))
                if len(original) > 1:
                    variants.append((';'.join(original[:-1]), 0))
                for value, credit in variants:
                    result = objective.grade_submission(json.dumps({q['id']: value}), key, phase)
                    item = next(x for x in result['items'] if x['id'] == q['id'])
                    if item['credit'] != credit or result['total'] != credit * q['weight']:
                        report['errors'].append(f'{phase}/{q["id"]}/{value}: structured grading mismatch')
                    structured_checks += 1
                continue
            for size in range(1, 7):
                for subset in itertools.combinations('ABCDEF', size):
                    value = ''.join(subset)
                    if q['scoring'] == 'evidence-tier':
                        credit = q['creditByAnswer'].get(value, 0)
                    else:
                        credit = int(value == q['answer'])
                    if not q['multiple'] and len(value) != 1:
                        credit = 0
                    result = objective.grade_submission(json.dumps({q['id']: value}), key, phase)
                    item = next(x for x in result['items'] if x['id'] == q['id'])
                    if (item['credit'] != credit
                            or item['earned'] != credit * q['weight']
                            or result['total'] != credit * q['weight']):
                        report['errors'].append(f'{phase}/{q["id"]}/{value}: grading mismatch')
                    checks += 1
        result = objective.grade_submission(json.dumps({q['id']: q['answer'] for q in questions}), key, phase)
        if result['total'] != 100:
            report['errors'].append(phase + ': full-credit answers must total 100')
    report.update(
        version=bank['version'], exhaustiveSubsetsChecked=checks, structuredCasesChecked=structured_checks,
        questionsSha256=hashlib.sha256((objective.SOURCE / 'questions.json').read_bytes()).hexdigest(),
        hostAnswersSha256=hashlib.sha256((objective.SOURCE / 'host/answer-key.json').read_bytes()).hexdigest(),
        passed=not report['errors'],
        limitation='Mechanical quotation and scoring checks supplement independent human/model review; they do not prove preprint claims.')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    result = verify()
    if args.output:
        with args.output.open('x', encoding='utf-8') as stream:
            json.dump(result, stream, ensure_ascii=False, indent=2)
            stream.write('\n')
    print(json.dumps({k: result[k] for k in ('passed', 'version', 'quotesChecked',
                                           'exhaustiveSubsetsChecked', 'structuredCasesChecked', 'errors')},
                     ensure_ascii=False, indent=2))
    raise SystemExit(0 if result['passed'] else 1)
