"""Independent score oracles and exhaustive answer-set checks."""
import copy
import itertools
import json
import unittest
from fractions import Fraction
from pathlib import Path

from evalkit import objective
from evalkit.studio import StudioError, score_values

ROOT = Path(__file__).resolve().parents[1]


def sample_key():
    def question(ident, weight, answer, multiple=False, tier=False):
        q = {'id': ident, 'question': 'test', 'weight': weight, 'answer': answer,
             'multiple': multiple, 'options': {c: c for c in 'ABCDEF'},
             'scoring': 'evidence-tier' if tier else 'exact'}
        if tier:
            # Two equally well-supported answers, two partial answers, two wrong answers.
            q['creditByAnswer'] = {'A': 0, 'B': 0.5, 'C': 1, 'D': 0, 'E': 1, 'F': 0.5}
        return q
    return {'version': 'longread-qa-v2', 'phases': {
        'initial': [question('S', 20, 'F'), question('M', 30, 'BDE', True),
                    question('T', 50, 'C', tier=True)],
        'change': [question('XT', 100, 'E', tier=True)]}}


class EvidenceTierTests(unittest.TestCase):
    def setUp(self):
        self.key = sample_key()

    def test_each_tier_and_alternative_full_answer_have_prespecified_scores(self):
        expected = {'A': (0, 0, 0), 'B': (25, 0, 1), 'C': (50, 1, 0),
                    'D': (0, 0, 0), 'E': (50, 1, 0), 'F': (25, 0, 1)}
        for letter, (score, full, partial) in expected.items():
            with self.subTest(letter=letter):
                result = objective.grade_submission(json.dumps({'T': letter}), self.key)
                self.assertEqual((result['total'], result['correct'], result['partial']),
                                 (score, full, partial))
                self.assertEqual(result['values']['T'], score / 50)
                self.assertEqual(result['items'][-1]['expected'], 'C / E')

    def test_tier_is_single_choice_not_additive_or_choose_all(self):
        for value in ('CE', 'BF', 'ABCDEF', 'BB', 'c,e', '', None, ['C'], True, 1):
            with self.subTest(value=value):
                report = objective.grade_submission(json.dumps({'T': value}), self.key)
                self.assertEqual(report['total'], 0)
        duplicate = objective.grade_submission('{"T":"C","T":"E"}', self.key)
        self.assertEqual(duplicate['total'], 0)
        self.assertTrue(any('重复题号' in error for error in duplicate['errors']))

    def test_combined_exact_and_partial_scores_and_stage_separation(self):
        report = objective.grade_submission('{"S":" f ","M":"e b d","T":" b "}', self.key)
        self.assertEqual(report['total'], 75)
        self.assertEqual(report['values'], {'S': 1, 'M': 1, 'T': 0.5})
        self.assertEqual((report['correct'], report['partial']), (2, 1))
        self.assertEqual(objective.grade_submission('{"XT":"f"}', self.key, 'change')['total'], 50)
        self.assertEqual(objective.grade_submission('{"XT":"e"}', self.key)['total'], 0)

    def test_invalid_credit_maps_and_modes_are_rejected(self):
        mutations = [
            {'creditByAnswer': None}, {'creditByAnswer': {'A': 1}},
            {'creditByAnswer': dict.fromkeys('ABCDEF', 0.5)},
            {'creditByAnswer': {**self.key['phases']['initial'][-1]['creditByAnswer'], 'A': True}},
            {'creditByAnswer': {**self.key['phases']['initial'][-1]['creditByAnswer'], 'A': -0.5}},
            {'creditByAnswer': {**self.key['phases']['initial'][-1]['creditByAnswer'], 'A': 1.5}},
            {'creditByAnswer': {**self.key['phases']['initial'][-1]['creditByAnswer'], 'A': float('nan')}},
            {'multiple': True}, {'answer': 'B'}, {'scoring': 'anything'},
            {'scoring': 'exact'},
        ]
        for mutation in mutations:
            with self.subTest(mutation=mutation):
                key = copy.deepcopy(self.key)
                key['phases']['initial'][-1].update(mutation)
                with self.assertRaises(ValueError):
                    objective.validate_key(key)

    def test_presentation_total_uses_weight_fraction_without_dividing_by_ten(self):
        dims = [{'id': 'S', 'weight': 20}, {'id': 'M', 'weight': 30}, {'id': 'T', 'weight': 50}]
        self.assertEqual(score_values(dims, {'S': 1, 'M': 1, 'T': 0.5}, 'objective')[1], 75)
        self.assertEqual(score_values(dims, {'S': 1, 'M': 1, 'T': None}, 'objective')[1], None)
        for invalid in (True, -1, 0.25, 2, 10, float('nan')):
            with self.assertRaises(StudioError):
                score_values(dims, {'S': 1, 'M': 1, 'T': invalid}, 'objective')
        with self.assertRaises(StudioError):
            score_values(dims, {'S': 1, 'M': 1, 'T': 0.5}, 'binary')

    def test_exhaustive_subsets_match_independent_membership_oracle(self):
        # All 63 nonempty subsets per question; expected values never use the scorer's normalizer.
        for phase, questions in self.key['phases'].items():
            for question in questions:
                for size in range(1, 7):
                    for chosen in itertools.combinations('ABCDEF', size):
                        token = ' \n'.join(reversed(chosen)).lower()
                        valid = question['multiple'] or len(chosen) == 1
                        if question['scoring'] == 'evidence-tier':
                            expected = question['creditByAnswer'].get(chosen[0], 0) if valid else 0
                        else:
                            expected = int(valid and frozenset(chosen) == frozenset(question['answer']))
                        report = objective.grade_submission(json.dumps({question['id']: token}), self.key, phase)
                        self.assertEqual(report['total'], question['weight'] * expected,
                                         (phase, question['id'], chosen))

    def test_obsolete_key_is_rejected_instead_of_implicitly_migrated(self):
        self.key['version'] = 'longread-qa-v1'
        with self.assertRaisesRegex(ValueError, '题库版本'):
            objective.grade_submission('{}', self.key)

    def test_host_metadata_cannot_override_public_weights_or_leak_into_public_questions(self):
        source = ROOT / 'research/longread-qa-v2'
        bank = objective.read_json(source / 'questions.json')
        original = objective.read_json(source / 'host/answer-key.json')
        for field, value in [('weight', 100), ('question', 'changed'), ('multiple', True),
                             ('options', {'A': 'wrong'}), ('domain', 'novel'), ('scoring', 'exact')]:
            answers = copy.deepcopy(original)
            answers['phases']['initial'][0][field] = value
            with self.assertRaisesRegex(ValueError, '不能覆盖'):
                objective.merge_answer_key(bank, answers)
        bank['phases']['initial'][0]['answer'] = 'B'
        with self.assertRaisesRegex(ValueError, '公开题目'):
            objective.merge_answer_key(bank, original)


class RealObjectiveBankOracleTests(unittest.TestCase):
    """Check every real v2 answer set against the separately authored option audits."""

    @classmethod
    def setUpClass(cls):
        source = ROOT / 'research/longread-qa-v2'
        cls.public = json.loads((source / 'questions.json').read_text())
        cls.host = json.loads((source / 'host/answer-key.json').read_text())
        cls.key = objective.merge_answer_key(cls.public, cls.host)
        cls.audits = {
            phase: {row['id']: row for row in rows}
            for phase, rows in cls.host['phases'].items()
        }

    def oracle(self, question, selected, phase):
        # Deliberately do not call normalize_answer or read key.answer/creditByAnswer.
        # The authored per-option evidence audit is a second representation of the key.
        if not question['multiple'] and len(selected) != 1:
            return Fraction(0)
        audit = self.audits[phase][question['id']]['optionAudit']
        if question['scoring'] == 'evidence-tier':
            return Fraction(str(audit[selected[0]]['credit']))
        supported = {letter for letter, row in audit.items() if row['correct']}
        return Fraction(int(set(selected) == supported))

    def complete_answers(self, phase, wanted_credit):
        result = {}
        for question in self.public['phases'][phase]:
            audit = self.audits[phase][question['id']]['optionAudit']
            if wanted_credit == 1 and question['scoring'] == 'exact':
                selected = ''.join(letter for letter, row in audit.items() if row['correct'])
            else:
                selected = next(
                    letter for letter in question['options']
                    if self.oracle(question, [letter], phase) == wanted_credit)
            result[question['id']] = selected
        return result

    def test_all_3024_real_nonempty_subsets_match_independent_oracle(self):
        checked, seen = 0, set()
        for phase, questions in self.public['phases'].items():
            for question in questions:
                for size in range(1, 7):
                    for chosen in itertools.combinations('ABCDEF', size):
                        with self.subTest(phase=phase, question=question['id'], chosen=chosen):
                            expected = self.oracle(question, chosen, phase)
                            weight = Fraction(str(question['weight']))
                            seen.add(expected)
                            # Cover both literal sets and order/case/whitespace normalization.
                            for token in (''.join(chosen), ' \t\n'.join(reversed(chosen)).lower()):
                                report = objective.grade_submission(
                                    json.dumps({question['id']: token}), self.key, phase)
                                item = next(row for row in report['items']
                                            if row['id'] == question['id'])
                                self.assertEqual(item['credit'], expected)
                                self.assertEqual(item['weight'], weight)
                                self.assertEqual(item['earned'], weight * expected)
                                self.assertEqual(report['total'], weight * expected)
                                self.assertEqual(report['values'][question['id']], expected)
                                self.assertEqual(report['correct'], int(expected == 1))
                                self.assertEqual(report['partial'], int(expected == Fraction(1, 2)))
                            checked += 1
        self.assertEqual(checked, 48 * 63)
        self.assertEqual(seen, {Fraction(0), Fraction(1, 2), Fraction(1)})

    def test_real_phase_all_correct_all_wrong_and_mixed_weighted_totals(self):
        for phase, questions in self.public['phases'].items():
            with self.subTest(phase=phase):
                self.assertEqual(sum(Fraction(str(q['weight'])) for q in questions), 100)
                full = self.complete_answers(phase, 1)
                empty = self.complete_answers(phase, 0)
                for answers, score in ((full, 100), (empty, 0)):
                    report = objective.grade_submission(json.dumps(answers), self.key, phase)
                    self.assertEqual(report['total'], score)
                    self.assertEqual(report['errors'], [])
                    self.assertEqual(report['partial'], 0)
                mixed, expected, full_count, partial_count = {}, Fraction(0), 0, 0
                for index, q in enumerate(questions):
                    if q['scoring'] == 'evidence-tier':
                        letter = next(c for c in q['options']
                                      if self.oracle(q, [c], phase) == Fraction(1, 2))
                        credit = Fraction(1, 2)
                    else:
                        letter = full[q['id']] if index % 2 else empty[q['id']]
                        credit = self.oracle(q, list(letter), phase)
                    mixed[q['id']] = letter
                    expected += Fraction(str(q['weight'])) * credit
                    full_count += credit == 1
                    partial_count += credit == Fraction(1, 2)
                report = objective.grade_submission(json.dumps(mixed), self.key, phase)
                self.assertEqual(report['total'], expected)
                self.assertEqual(report['correct'], full_count)
                self.assertEqual(report['partial'], partial_count)
                self.assertGreater(partial_count, 0)

    def test_repeated_letters_and_json_keys_never_earn_partial_credit(self):
        for phase, questions in self.public['phases'].items():
            full = self.complete_answers(phase, 1)
            for q in questions:
                with self.subTest(phase=phase, question=q['id']):
                    correct = full[q['id']]
                    for invalid in (correct + correct[0], correct + correct[0].lower()):
                        answers = dict(full, **{q['id']: invalid})
                        report = objective.grade_submission(json.dumps(answers), self.key, phase)
                        self.assertEqual(report['total'], 100 - q['weight'])
                        self.assertEqual(report['values'][q['id']], 0)
                        self.assertEqual(report['partial'], 0)
                    # Neither first-wins nor last-wins may turn a duplicate JSON key into credit.
                    for second in (correct, 'Z'):
                        text = (json.dumps(full)[:-1] + ',' + json.dumps(q['id'])
                                + ':' + json.dumps(second) + '}')
                        report = objective.grade_submission(text, self.key, phase)
                        self.assertEqual(report['total'], 100 - q['weight'])
                        self.assertEqual(report['values'][q['id']], 0)
                        self.assertIn('重复题号，该题记0分：' + q['id'], report['errors'])

    def test_real_tier_maps_and_exact_keys_agree_with_separate_option_audits(self):
        for phase, questions in self.public['phases'].items():
            for q in questions:
                with self.subTest(phase=phase, question=q['id']):
                    row = self.audits[phase][q['id']]
                    if q['scoring'] == 'evidence-tier':
                        credits = {letter: self.oracle(q, [letter], phase)
                                   for letter in q['options']}
                        self.assertEqual(row['creditByAnswer'], credits)
                        self.assertEqual(credits[row['answer']], 1)
                        self.assertIn(Fraction(1, 2), credits.values())
                    else:
                        supported = ''.join(c for c in q['options']
                                            if row['optionAudit'][c]['correct'])
                        self.assertEqual(row['answer'], supported)
                        self.assertEqual(len(supported) > 1, q['multiple'])
