import argparse
import contextlib
import copy
import io
import json
import tempfile
import unittest
from fractions import Fraction
from pathlib import Path
from unittest.mock import patch

from evalkit import manager as m
from evalkit import objective
from evalkit.catalog import CATALOG, RUBRIC_VERSION, candidate_task, catalog
from evalkit.standard import read_standard
import test_lifecycle as fixture


def correct_answers(key, phase='initial'):
    return {question['id']: question['answer'] for question in key['phases'][phase]}


def wrong_answer(question):
    if question.get('answerType')=='structured':
        parts=question['answer'].split(';')
        parts[0]=(parts[0]+'Z' if question['answerParts'][0]['kind']=='code'
                  else str(Fraction(parts[0])+1))
        return ';'.join(parts)
    return (next(letter for letter, credit in question['creditByAnswer'].items() if credit == 0)
            if question.get('scoring') == 'evidence-tier' else
            'A' if question['answer'] != 'A' else 'B')


class ObjectiveScoringTests(unittest.TestCase):
    def setUp(self):
        # Preserve the choice-contract regression suite against its frozen bank.
        for name,value in [('SOURCE',Path(__file__).resolve().parents[1]/'research/longread-qa-v3'),
                           ('VERSION','longread-qa-v3')]:
            context=patch.object(objective,name,value);context.start();self.addCleanup(context.stop)
        self.key = objective.answer_key()

    def grade(self, answers, phase='initial'):
        return objective.grade_submission(json.dumps(answers), self.key, phase)

    def test_bank_has_72_initial_24_change_and_100_points_per_phase(self):
        bank = objective.question_bank()
        ids = []
        for phase, count in [('initial', 72), ('change', 24)]:
            questions = bank['phases'][phase]
            self.assertEqual(len(questions), count)
            self.assertEqual(sum(question['weight'] for question in questions), 100)
            self.assertTrue(all(question['multiple'] for question in questions))
            for question in questions:
                ids.append(question['id'])
                self.assertNotIn('answer', question)
                self.assertNotIn('evidence', question)
                self.assertEqual(set(question['options']), set('ABCDEF'))
        self.assertEqual(len(ids), len(set(ids)))

    def test_catalog_exposes_automatic_exact_or_evidence_anchors_and_phase_weights(self):
        task = catalog()[-1]
        self.assertEqual(task['delivery'], 'answers-json')
        self.assertEqual(task['scoringMode'], 'objective')
        self.assertEqual(task['questionVersion'], objective.VERSION)
        for phase, field in [('initial', 'rubric'), ('change', 'rubricChange')]:
            self.assertEqual(
                [(item['id'], item['weight']) for item in task[field]],
                [(item['id'], item['weight']) for item in self.key['phases'][phase]])
            for item in task[field]:
                question = next(q for q in self.key['phases'][phase] if q['id'] == item['id'])
                self.assertEqual([anchor['score'] for anchor in item['anchors']],
                                 [0, 0.5, 1] if question['scoring'] == 'evidence-tier' else [0, 1])

    def test_all_correct_and_all_wrong_in_both_phases(self):
        for phase in objective.PHASES:
            with self.subTest(phase=phase):
                correct = self.grade(correct_answers(self.key, phase), phase)
                self.assertEqual(correct['total'], 100)
                self.assertEqual(correct['correct'], len(self.key['phases'][phase]))
                self.assertEqual(correct['errors'], [])
                self.assertEqual(set(correct['values'].values()), {1})
                wrong = self.grade({
                    question['id']: wrong_answer(question)
                    for question in self.key['phases'][phase]
                }, phase)
                self.assertEqual(wrong['total'], 0)
                self.assertEqual(wrong['correct'], 0)
                self.assertEqual(set(wrong['values'].values()), {0})

    def test_each_wrong_answer_loses_exactly_its_weight(self):
        for phase in objective.PHASES:
            for question in self.key['phases'][phase]:
                with self.subTest(phase=phase, question=question['id']):
                    answers = correct_answers(self.key, phase)
                    answers[question['id']] = wrong_answer(question)
                    report = self.grade(answers, phase)
                    self.assertEqual(report['total'], 100 - question['weight'])
                    self.assertEqual(report['values'][question['id']], 0)
                    self.assertTrue(all(item['earned'] in (0, item['weight'])
                                        for item in report['items']))

    def test_multiselect_missing_extra_and_repeated_letters_get_no_credit(self):
        question = next(q for q in self.key['phases']['initial']
                        if q['multiple'] and 1 < len(q['answer']) < len(q['options']))
        extra = next(letter for letter in 'ABCDEF' if letter not in question['answer'])
        for answer in (question['answer'][:-1],
                       question['answer'] + extra,
                       question['answer'] + question['answer'][0]):
            with self.subTest(answer=answer):
                answers = correct_answers(self.key)
                answers[question['id']] = answer
                report = self.grade(answers)
                self.assertEqual(report['total'], 100 - question['weight'])
                self.assertEqual(report['values'][question['id']], 0)

    def test_case_whitespace_order_and_utf8_bom_are_normalized(self):
        answers = {
            question['id']: ' \t' + ' \n'.join(reversed(question['answer'].lower())) + ' '
            for question in self.key['phases']['initial']
        }
        report = objective.grade_submission('\ufeff' + json.dumps(answers), self.key)
        self.assertEqual(report['total'], 100)
        self.assertEqual(report['errors'], [])

    def test_missing_answer_loses_only_that_question(self):
        answers = correct_answers(self.key)
        question = self.key['phases']['initial'][0]
        del answers[question['id']]
        report = self.grade(answers)
        self.assertEqual(report['total'], 100 - question['weight'])
        self.assertIn('漏答：' + question['id'], report['errors'])

    def test_duplicate_question_id_is_wrong_even_if_both_answers_are_correct(self):
        answers = correct_answers(self.key)
        question = self.key['phases']['initial'][0]
        pair = json.dumps(question['id']) + ':' + json.dumps(question['answer'])
        text = json.dumps(answers)[:-1] + ',' + pair + '}'
        report = objective.grade_submission(text, self.key)
        self.assertEqual(report['total'], 100 - question['weight'])
        self.assertEqual(report['values'][question['id']], 0)
        self.assertIn('重复题号，该题记0分：' + question['id'], report['errors'])

    def test_unknown_question_is_reported_without_affecting_known_answers(self):
        answers = correct_answers(self.key)
        answers['UNKNOWN'] = 'A'
        report = self.grade(answers)
        self.assertEqual(report['total'], 100)
        self.assertNotIn('UNKNOWN', report['values'])
        self.assertIn('额外题号不计分：UNKNOWN', report['errors'])

    def test_malformed_json_and_nonobject_documents_score_zero(self):
        for text in ('', '{', '{"x":"A",}', '```json\n{}\n```',
                     '[]', '"A"', '42', 'true', 'null',
                     '{"x":NaN}', '{"x":Infinity}', '{"P01":1e999}',
                     '{"P01":{"nested":-1e999}}'):
            with self.subTest(text=text):
                report = objective.grade_submission(text, self.key)
                self.assertEqual(report['total'], 0)
                self.assertEqual(report['correct'], 0)
                self.assertTrue(report['errors'][0].startswith('答案JSON无效'))

    def test_invalid_answer_types_and_options_are_wrong(self):
        question = self.key['phases']['initial'][0]
        for value in (0, 1, True, False, None, ['A'], {'answer': 'A'},
                      '', 'Z', 'AA', 'A,B'):
            with self.subTest(value=value):
                answers = correct_answers(self.key)
                answers[question['id']] = value
                report = self.grade(answers)
                self.assertEqual(report['total'], 100 - question['weight'])
                self.assertEqual(report['values'][question['id']], 0)
                self.assertIn('答案格式或选项无效：' + question['id'], report['errors'])

    def test_invalid_key_shapes_are_rejected(self):
        cases = [None, [], {}, {'version': objective.VERSION, 'phases': []}]
        for phase_value in (None, [], {}, [None]):
            key = copy.deepcopy(self.key)
            key['phases']['initial'] = phase_value
            cases.append(key)
        key = copy.deepcopy(self.key)
        key['version'] = 'different-version'
        cases.append(key)
        key = copy.deepcopy(self.key)
        del key['phases']['change']
        cases.append(key)
        for key in cases:
            with self.subTest(key=key):
                with self.assertRaises(ValueError):
                    objective.validate_key(key)

    def test_invalid_key_questions_weights_and_answers_are_rejected(self):
        changes = [
            {'id': ''}, {'id': 1},
            {'id': self.key['phases']['change'][0]['id']},
            {'weight': 0}, {'weight': -1}, {'weight': True},
            {'weight': '3'}, {'weight': float('nan')}, {'weight': float('inf')},
            {'weight': 101}, {'multiple': 1}, {'options': ['A', 'B', 'C', 'D']},
            {'options': {'A': 'one'}}, {'answer': ''}, {'answer': 'a'},
            {'answer': 'AA'}, {'answer': 'Z'}, {'answer': None},
            {'multiple': False, 'answer': 'AB'},
        ]
        for change in changes:
            with self.subTest(change=change):
                key = copy.deepcopy(self.key)
                key['phases']['initial'][0].update(change)
                with self.assertRaises(ValueError):
                    objective.grade_submission('{}', key)

    def test_unsupported_scoring_phase_is_rejected(self):
        with self.assertRaisesRegex(ValueError, '阶段'):
            objective.grade_submission('{}', self.key, 'future')

    def test_install_keeps_answer_key_and_future_questions_host_only(self):
        with tempfile.TemporaryDirectory() as folder:
            target = Path(folder)
            objective.install(target)
            project = target / 'tasks/06-memory'
            public = m.load(project / 'materials/questions.json')
            template = m.load(project / 'materials/answer-template.json')
            self.assertEqual(public['phase'], 'initial')
            self.assertEqual(public['questions'],
                             objective.question_bank()['phases']['initial'])
            self.assertEqual(template, {question['id']: ''
                                       for question in public['questions']})
            self.assertEqual(m.load(target / 'admin/06-memory/answer-key.json'),
                             self.key)
            public_text = '\n'.join(path.read_text() for path in project.rglob('*')
                                    if path.is_file())
            self.assertNotIn('"answer":', public_text)
            self.assertNotIn('"evidence":', public_text)
            self.assertFalse(any(path.name == 'answer-key.json'
                                 for path in project.rglob('*')))
            for question in self.key['phases']['change']:
                self.assertNotIn(question['id'], public_text)
                self.assertNotIn(question['question'], public_text)
                self.assertIn(question['id'],
                              (target / 'admin/06-memory/change.txt').read_text())


class ObjectiveRunTests(unittest.TestCase):
    tearDown = fixture.LifecycleTests.tearDown
    init = fixture.LifecycleTests.init

    def setUp(self):
        fixture.LifecycleTests.setUp(self)
        objective.install(self.prepared)
        project = self.prepared / 'tasks/06-memory'
        standard = read_standard(self.root / 'llm-evaluation-standard.html')
        m.write(project / 'TASK.md', candidate_task('06-memory', standard))
        m.write(project / 'materials/START.md', m.start_instructions('06-memory'))
        for name in m.RULE_NAMES[:3]:
            m.write(project / name, (self.root / 'rules/COMMON_RULES.md').read_text())
        m.dump(self.prepared / 'rubric.json',
               {'version': RUBRIC_VERSION, 'tasks': catalog()})
        meta = m.load(self.prepared / 'bundle.json')
        meta['files'] = m.manifest(self.prepared, skip=('bundle.json',))
        meta['bundleSha256'] = m.digest(meta['files'])
        m.dump(self.prepared / 'bundle.json', meta)

    def grade(self, run, phase='initial', answers=None, output=None):
        stream = io.StringIO()
        with contextlib.redirect_stdout(stream):
            objective.grade_run(argparse.Namespace(
                run=str(run), phase=phase, answers=answers, output=output))
        return json.loads(stream.getvalue())

    def submit(self, run, phase='initial'):
        key = m.load(run / 'control/private/06-memory/answer-key.json')
        path = run / 'tasks/06-memory/output/answers.json'
        m.dump(path, correct_answers(key, phase))
        return path

    def freeze(self, run, phase='initial'):
        m.snapshot(argparse.Namespace(
            run=str(run), task='6', phase=phase, allow_invalid=False))

    def test_initial_prompt_and_run_expose_only_initial_answer_contract(self):
        run = self.init(task='6')
        task = run / 'tasks/06-memory'
        prompt = (run / 'control/prompts/06-memory-initial.txt').read_text()
        self.assertIn('output/answers.json', prompt)
        self.assertNotIn('最终交付 output/index.html', prompt)
        self.assertFalse((task / 'materials/CHANGE.md').exists())
        self.assertFalse((task / 'materials/answer-key.json').exists())
        self.assertTrue((run / 'control/private/06-memory/answer-key.json').is_file())
        for question in objective.question_bank()['phases']['change']:
            self.assertNotIn(question['id'], prompt)
            self.assertNotIn(question['question'], prompt)

    def test_scorer_locates_long_reading_by_id_without_relying_on_display_number(self):
        run=self.init(task='6')
        self.submit(run)
        self.assertEqual(self.grade(run)['total'],100)
        pinned=m.load(run/'control/rubric.json')
        pinned['tasks']=[task for task in pinned['tasks'] if task['id']!='02-static']
        for number,task in enumerate(pinned['tasks'],1): task['number']=f'{number:02d}'
        m.dump(run/'control/rubric.json',pinned)
        self.assertEqual(m.get_task(run,'5')[0],'06-memory')
        self.assertEqual(self.grade(run)['total'],100)

    def test_grade_uses_pinned_key_when_current_source_bank_changes(self):
        run = self.init(task='6')
        self.submit(run)
        original_key = m.load(run / 'control/private/06-memory/answer-key.json')
        changed_source = self.root / 'changed-question-source'
        bank = objective.question_bank()
        answers = {
            'version': objective.VERSION,
            'phases': {
                phase: [{'id': question['id'],
                         'answer': question['answer'] if question['scoring'] == 'evidence-tier' else wrong_answer(question),
                         **({'creditByAnswer':question['creditByAnswer']} if question['scoring'] == 'evidence-tier' else {}),
                         'evidence': 'changed source, must not affect an existing run'}
                        for question in original_key['phases'][phase]]
                for phase in objective.PHASES
            }
        }
        m.dump(changed_source / 'questions.json', bank)
        m.dump(changed_source / 'host/answer-key.json', answers)
        with patch.object(objective, 'SOURCE', changed_source):
            self.assertNotEqual(objective.answer_key(), original_key)
            report = self.grade(run)
        self.assertEqual(report['total'], 100)
        self.assertEqual(report['keySha256'],
                         m.sha(run / 'control/private/06-memory/answer-key.json'))
        self.assertEqual(m.load(run / 'control/private/06-memory/answer-key.json'),
                         original_key)

    def test_grade_after_freeze_uses_snapshot_even_if_workspace_answers_change(self):
        run = self.init(task='6')
        answer_path = self.submit(run)
        self.freeze(run)
        m.write(answer_path, '{}')
        report = self.grade(run)
        self.assertEqual(report['total'], 100)
        self.assertIn('/control/snapshots/06-memory/initial/project/',
                      report['source'])
        self.assertFalse(report['externalAnswers'])

    def test_change_cannot_be_graded_until_release_and_has_separate_answers(self):
        run = self.init(task='6')
        self.submit(run)
        with self.assertRaisesRegex(ValueError, '尚未开放'):
            self.grade(run, phase='change')
        self.freeze(run)
        m.release_change(run, '06-memory', run / 'tasks/06-memory')
        self.submit(run, 'change')
        change = self.grade(run, phase='change')
        initial = self.grade(run)
        self.assertEqual(change['total'], 100)
        self.assertEqual(change['totalQuestions'], 6)
        self.assertEqual(initial['total'], 100)
        self.assertEqual(initial['totalQuestions'], 18)
        self.assertFalse((run / 'tasks/06-memory/materials/change').exists())
        self.assertEqual(m.integrity(run, '06-memory'), [])

    def test_pinned_key_tampering_is_rejected(self):
        run = self.init(task='6')
        self.submit(run)
        path = run / 'control/private/06-memory/answer-key.json'
        key = m.load(path)
        key['phases']['initial'][0]['answer'] = wrong_answer(key['phases']['initial'][0])
        m.dump(path, key)
        with self.assertRaisesRegex(ValueError, '标准答案完整性'):
            self.grade(run)

    def test_frozen_snapshot_tampering_is_rejected(self):
        run = self.init(task='6')
        self.submit(run)
        self.freeze(run)
        path = run / 'control/snapshots/06-memory/initial/project/output/answers.json'
        path.chmod(0o644)
        m.write(path, '{}')
        with self.assertRaisesRegex(ValueError, '快照已变化'):
            self.grade(run)

    def test_explicit_answers_symlink_is_rejected(self):
        run = self.init(task='6')
        path = self.submit(run)
        link = self.root / 'linked-answers.json'
        link.symlink_to(path)
        with self.assertRaisesRegex(ValueError, '符号链接'):
            self.grade(run, answers=str(link))

    def test_cli_writes_json_report_and_refuses_overwrite(self):
        run = self.init(task='6')
        answer_path = self.submit(run)
        report_path = self.root / 'grade.json'
        argv = ['grade', '--run', str(run), '--output', str(report_path)]
        self.assertEqual(m.main(argv), 0)
        report = m.load(report_path)
        self.assertEqual(report['total'], 100)
        self.assertEqual(report['answerSha256'], m.sha(answer_path))
        saved = report_path.read_bytes()
        with contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(m.main(argv), 1)
        self.assertEqual(report_path.read_bytes(), saved)
        with self.assertRaises(FileExistsError):
            self.grade(run, output=str(answer_path))
        self.assertEqual(self.grade(run)['total'], 100)

    def test_legacy_subjective_and_unversioned_runs_reject_objective_grading(self):
        run = self.init(task='6')
        self.submit(run)
        rubric_path = run / 'control/rubric.json'
        m.dump(rubric_path, {'version': 'legacy-subjective',
                            'tasks': copy.deepcopy(CATALOG)})
        with self.assertRaisesRegex(ValueError, '旧版题目'):
            self.grade(run)
        rubric_path.unlink()
        with self.assertRaisesRegex(ValueError, '旧版题目'):
            self.grade(run)


if __name__ == '__main__':
    unittest.main()
