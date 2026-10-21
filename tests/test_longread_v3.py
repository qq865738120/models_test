"""Release, stage-isolation and historical grading checks for the expanded question bank."""
import copy
import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from evalkit import objective
from evalkit.catalog import catalog
from evalkit.objective_audit import audit_draft
from evalkit.studio import display_rubric
from scripts.build_longread_release import verify_reviewed_bank
from scripts.run_memory_candidate import verify_completed_inputs

ROOT=Path(__file__).resolve().parents[1]

class ExpandedBankTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        for name,value in [('SOURCE',ROOT/'research/longread-qa-v3'),('VERSION','longread-qa-v3')]:
            context=patch.object(objective,name,value);context.start();cls.addClassCleanup(context.stop)
        cls.bank=objective.question_bank()
        cls.host=objective.read_json(objective.SOURCE/'host/answer-key.json')
        cls.key=objective.answer_key()

    def test_counts_domain_balance_difficulty_and_no_uniform_answer_length(self):
        self.assertEqual(self.bank['version'],'longread-qa-v3')
        self.assertEqual(catalog()[-1]['level'],'中级')
        for phase,count in [('initial',24),('change',8)]:
            questions=self.bank['phases'][phase]
            self.assertEqual(len(questions),count*3)
            self.assertEqual(sum(q['weight'] for q in questions),100)
            for domain,total in [('physics',34),('math',33),('novel',33)]:
                rows=[q for q in questions if q['domain']==domain]
                self.assertEqual(len(rows),count)
                self.assertEqual(sum(q['weight'] for q in rows),total)
                self.assertTrue(all(q['scoring']=='exact' for q in rows))
                if phase=='initial':self.assertGreaterEqual(sum(q['multiple'] for q in rows),18)
        self.assertGreaterEqual(len({len(q['answer']) for qs in self.key['phases'].values() for q in qs}),4)

    def test_all_evidence_quotes_and_independent_model_reviews_match_frozen_bytes(self):
        result=audit_draft({'questions':self.bank['phases'],'answers':self.host['phases']},ROOT)
        self.assertTrue(result['passed'],result['errors'])
        release=objective.validate_release()
        self.assertEqual(len(release['reviewedItems']),96)
        for row in release['reviewedItems']:
            self.assertNotEqual(row['authorModel'],row['reviewerModel'])
            self.assertTrue(row['independentAnswerAgrees'])
        self.assertEqual(len({(r['phase'],r['id']) for r in release['reviewedItems']}),96)
        self.assertEqual(len(release['additionalReviewedItems']),8)
        self.assertTrue(all(r['reviewerModel']=='gpt-6.1-sol' and r['independentAnswerAgrees']
                            for r in release['additionalReviewedItems']))
        mechanical=objective.read_json(objective.SOURCE/'host/mechanical-audit.json')
        self.assertTrue(mechanical['passed'])
        self.assertEqual(mechanical['exhaustiveSubsetsChecked'],6048)

    def test_public_options_cannot_name_target_source_ids(self):
        draft={'questions':copy.deepcopy(self.bank['phases']),'answers':self.host['phases']}
        draft['questions']['initial'][0]['options']['A'] += ' 见P01论文。'
        result=audit_draft(draft,ROOT)
        self.assertFalse(result['passed'])
        self.assertTrue(any('目标材料定位编号' in error for error in result['errors']))

    def test_install_keeps_answer_key_release_and_future_questions_host_only(self):
        with tempfile.TemporaryDirectory() as folder:
            target=Path(folder)
            objective.install(target)
            project=target/'tasks/06-memory'
            public=objective.read_json(project/'materials/questions.json')
            self.assertEqual(len(public['questions']),72)
            self.assertEqual(set(public),{'version','phase','questions'})
            self.assertTrue(all(not q['id'].startswith('X') for q in public['questions']))
            self.assertFalse(any(p.name in ('answer-key.json','release.json') for p in project.rglob('*')))
            private=target/'admin/06-memory'
            self.assertEqual(hashlib.sha256((private/'answer-key.json').read_bytes()).hexdigest(),
                             objective.read_json(private/'release.json')['mergedAnswerKeySha256'])

    def test_historical_v2_answers_use_their_original_pinned_key(self):
        old=ROOT/'research/longread-qa-v2'
        public=objective.read_json(old/'questions.json')
        host=objective.read_json(old/'host/answer-key.json')
        key=objective.merge_answer_key(public,host)
        result=objective.grade_submission(json.dumps({q['id']:q['answer'] for q in key['phases']['initial']}),key)
        self.assertEqual((result['version'],result['totalQuestions'],result['total']),('longread-qa-v2',36,100))
        historical={'id':'06-memory','level':'挑战','questionVersion':'longread-qa-v2','rubric':[], 'rubricChange':[]}
        before=copy.deepcopy(historical)
        displayed=display_rubric([historical])[0]
        self.assertEqual(displayed['level'],'中级')
        self.assertEqual(displayed['questionVersion'],'longread-qa-v2')
        self.assertEqual(historical,before)

    def test_release_rejects_changed_evidence_and_nonfrozen_status(self):
        original=objective.read_json
        def changed(path):
            result=original(path)
            if path.name=='release.json':
                result['status']='draft'
            return result
        with patch.object(objective,'read_json',side_effect=changed):
            with self.assertRaisesRegex(ValueError,'冻结'):
                objective.validate_release()
        def changed_hash(path):
            result=original(path)
            if path.name=='release.json':
                first=next(iter(result['sha256']))
                result['sha256'][first]='0'*64
            return result
        with patch.object(objective,'read_json',side_effect=changed_hash):
            with self.assertRaisesRegex(ValueError,'已变化'):
                objective.validate_release()
        def changed_source(path):
            result=original(path)
            if path.name=='mechanical-audit.json':
                first=next(iter(result['sourceSha256']))
                result['sourceSha256'][first]='0'*64
            return result
        with patch.object(objective,'read_json',side_effect=changed_source):
            with self.assertRaisesRegex(ValueError,'引文原始材料已变化'):
                objective.validate_release()

class FrozenInputContractTests(unittest.TestCase):
    def test_freeze_rejects_a_question_changed_after_blind_review(self):
        q={'id':'M01','domain':'math','question':'Original','options':{'A':'First','B':'Second'}}
        bank={'version':'v3','phases':{'initial':[q],'change':[]}}
        public={'version':'v3','domain':'math','phases':copy.deepcopy(bank['phases'])}
        verify_reviewed_bank(bank,'math',public)
        for target in ('question','option','weight'):
            changed=copy.deepcopy(bank)
            row=changed['phases']['initial'][0]
            if target=='option':row['options']['A']='Changed'
            else:row[target]='Changed'
            with self.subTest(target=target), self.assertRaisesRegex(ValueError,'发布题面与盲审题面不同'):
                verify_reviewed_bank(changed,'math',public)

    def test_successful_process_requires_unchanged_frozen_inputs(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder)
            paths=[root/'key.json',root/'release.json',root/'prompt.txt']
            for path in paths:path.write_text('original')
            digest=hashlib.sha256(b'original').hexdigest()
            baseline={'status':'completed','answerKeySha256Before':digest,
                      'releaseSha256':digest,'promptSha256':digest}
            with patch('scripts.run_memory_candidate.m.integrity',return_value=[]):
                record=copy.deepcopy(baseline)
                verify_completed_inputs(record,root,*paths)
                self.assertEqual(record['status'],'completed')
                for path in paths:
                    path.write_text('changed')
                    record=copy.deepcopy(baseline)
                    verify_completed_inputs(record,root,*paths)
                    self.assertEqual(record['status'],'invalid-inputs')
                    self.assertTrue(record['integrityIssues'])
                    path.write_text('original')
            with patch('scripts.run_memory_candidate.m.integrity',return_value=['Protected material changed']):
                record=copy.deepcopy(baseline)
                verify_completed_inputs(record,root,*paths)
                self.assertEqual(record['status'],'invalid-inputs')
            for error in (ValueError('External symlink in output'), PermissionError('Unreadable output')):
                with self.subTest(error=str(error)), patch(
                        'scripts.run_memory_candidate.m.integrity', side_effect=error):
                    record=copy.deepcopy(baseline)
                    verify_completed_inputs(record,root,*paths)
                    self.assertEqual(record['status'],'invalid-inputs')
                    self.assertEqual(record['processStatus'],'completed')
                    self.assertIn(str(error),' '.join(record['integrityIssues']))

if __name__=='__main__':unittest.main()
