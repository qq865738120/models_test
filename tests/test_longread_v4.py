"""The new reasoning bank has separate evidence, blind reviews, and exact answer fields."""
import copy
import hashlib
import json
from pathlib import Path
import tempfile
import unittest

from evalkit import objective
from evalkit.objective_audit import audit_draft
from scripts.build_longread_release import verify_reviewed_bank

ROOT=Path(__file__).resolve().parents[1]


class ShortReasoningBankTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source=ROOT/'research/longread-qa-v4'
        cls.bank=objective.read_json(cls.source/'questions.json')
        cls.host=objective.read_json(cls.source/'host/answer-key.json')
        cls.key=objective.merge_answer_key(cls.bank,cls.host)

    def test_quality_contract_counts_balance_and_no_choices(self):
        self.assertEqual(self.bank['version'],'longread-qa-v4')
        for phase,count in [('initial',6),('change',2)]:
            self.assertEqual(len(self.bank['phases'][phase]),count*3)
            for domain,points in [('physics',34),('math',33),('novel',33)]:
                rows=[q for q in self.bank['phases'][phase] if q['domain']==domain]
                self.assertEqual(len(rows),count)
                self.assertEqual(sum(q['weight'] for q in rows),points)
                for q in rows:
                    self.assertEqual(q['answerType'],'structured')
                    self.assertNotIn('options',q)
                    self.assertEqual(set(q),objective.STRUCTURED_FIELDS|{'domain'})

    def test_evidence_and_distinct_model_review_are_frozen(self):
        report=audit_draft({'questions':self.bank['phases'],'answers':self.host['phases']},ROOT)
        self.assertTrue(report['passed'],report['errors'])
        release=objective.validate_release(self.source)
        self.assertEqual(len(release['reviewedItems']),24)
        self.assertEqual(release['answerContract'],'exact-structured-v1')
        for row in release['reviewedItems']:
            self.assertNotEqual(row['authorModel'],row['reviewerModel'])
            self.assertTrue(row['uniqueAnswer'] and row['crossSourceNecessary'] and row['independentAnswerAgrees'])
        mechanical=objective.read_json(self.source/'host/mechanical-audit.json')
        self.assertTrue(mechanical['passed'])
        self.assertGreaterEqual(mechanical['structuredCasesChecked'],24*6)

    def test_stage_install_has_only_public_initial_fields_and_empty_template(self):
        with tempfile.TemporaryDirectory() as directory:
            target=Path(directory)
            objective.install(target)
            project=target/'tasks/06-memory'
            public=objective.read_json(project/'materials/questions.json')
            self.assertEqual(len(public['questions']),18)
            self.assertTrue(all(not q['id'].startswith('X') for q in public['questions']))
            self.assertEqual(set(objective.read_json(project/'materials/answer-template.json').values()),{''})
            for path in project.rglob('*'):
                self.assertNotIn(path.name,('answer-key.json','release.json','mechanical-audit.json'))
            private=target/'admin/06-memory'
            self.assertEqual(hashlib.sha256((private/'answer-key.json').read_bytes()).hexdigest(),
                             objective.read_json(private/'release.json')['mergedAnswerKeySha256'])

    def test_answer_field_order_cannot_change_after_review(self):
        q=self.bank['phases']['initial'][0]
        bank={'version':self.bank['version'],'phases':{'initial':[copy.deepcopy(q)],'change':[]}}
        public={'version':bank['version'],'domain':q['domain'],'phases':copy.deepcopy(bank['phases'])}
        bank['phases']['initial'][0]['answerParts'][0]['name']+=' changed'
        with self.assertRaises(ValueError):verify_reviewed_bank(bank,q['domain'],public)

    def test_old_v3_answers_still_grade_against_their_own_key(self):
        source=ROOT/'research/longread-qa-v3'
        key=objective.merge_answer_key(objective.read_json(source/'questions.json'),
                                      objective.read_json(source/'host/answer-key.json'))
        result=objective.grade_submission(json.dumps({q['id']:q['answer'] for q in key['phases']['initial']}),key)
        self.assertEqual((result['version'],result['totalQuestions'],result['total']),('longread-qa-v3',72,100))


if __name__=='__main__':unittest.main()
