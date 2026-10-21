import copy
import json
import unittest
from pathlib import Path

from evalkit.short_answer import normalize, validate_format
from evalkit import objective
from evalkit.objective_audit import audit_draft


class ShortAnswerContractTests(unittest.TestCase):
    def setUp(self):
        self.parts = [dict(name='数值', kind='rational'), dict(name='数量', kind='integer'),
                      dict(name='事件顺序', kind='code')]

    def test_equivalent_exact_numbers_case_and_whitespace(self):
        for text in ('1/2;3;ACDB', '0.5;03;acdb', ' 2 / 4 ; +3 ; A C D B '):
            self.assertEqual(normalize(text, self.parts), '1/2;3;ACDB')

    def test_order_and_every_component_matter(self):
        self.assertNotEqual(normalize('1/2;3;ADCB', self.parts), '1/2;3;ACDB')
        self.assertNotEqual(normalize('1/2;4;ACDB', self.parts), '1/2;3;ACDB')
        self.assertEqual(normalize('2/3;3;ACDB', self.parts), '2/3;3;ACDB')

    def test_invalid_shapes_and_ambiguous_numbers_are_rejected(self):
        for value in (None, 1, True, ['1/2','3','ACDB'], {}, '', '1/2;3', '1/2;3;ACDB;0',
                      '1/0;3;ACDB', 'NaN;3;ACDB', 'Infinity;3;ACDB', '1e-3;3;ACDB',
                      '1/2;3.0;ACDB', '1/2;3;A,C,D,B', '1/2;3;答案',
                      '1/2；3；ACDB', '1'*1000+';3;ACDB'):
            with self.subTest(value=str(value)[:50]):
                self.assertIsNone(normalize(value, self.parts))

    def test_no_tolerance_rounding_or_expression_execution(self):
        self.assertEqual(normalize('0.3333333333', [dict(name='值',kind='rational')]),
                         '3333333333/10000000000')
        for value in ('1+1', '__import__("os")', '(2/3)', 'sqrt(2)'):
            self.assertIsNone(normalize(value, [dict(name='值',kind='rational')]))

    def test_format_is_public_schema_only(self):
        validate_format(self.parts)
        for value in (None, [], ['integer'], [dict(name='',kind='integer')],
                      [dict(name='x',kind='float')], [dict(name='x',kind='integer',answer=5)]):
            with self.assertRaises(ValueError): validate_format(value)
        value=copy.deepcopy(self.parts);value[1]['name']=value[0]['name']
        with self.assertRaises(ValueError): validate_format(value)


class StructuredScoringTests(unittest.TestCase):
    def setUp(self):
        self.key = {'version':'longread-qa-v4', 'phases':{phase:[{
            'id': prefix+'01', 'domain':'math', 'question':'计算并排列。',
            'answerType':'structured', 'answerParts':[dict(name='值',kind='rational'),dict(name='顺序',kind='code')],
            'scoring':'exact', 'weight':100, 'answer':'2/3;BDAC', 'evidence':['fixture']
        }] for phase,prefix in [('initial','M'),('change','XM')]}}

    def test_all_fields_must_match_and_equivalent_fractions_are_accepted(self):
        for answer,total in [('4/6;bdac',100),('2/3;BDCA',0),('2/3',0),('0.666666667;BDAC',0)]:
            report=objective.grade_submission(json.dumps({'M01':answer}),self.key)
            self.assertEqual(report['total'],total)
            self.assertEqual(report['correct'],int(total==100))

    def test_duplicate_keys_and_nonstring_answers_cannot_get_credit(self):
        for text in ('{"M01":"2/3;BDAC","M01":"2/3;BDAC"}', '{"M01":["2/3","BDAC"]}'):
            self.assertEqual(objective.grade_submission(text,self.key)['total'],0)

    def test_public_format_cannot_be_replaced_by_host_answer(self):
        bank=copy.deepcopy(self.key)
        answers={'version':bank['version'],'phases':{}}
        for phase,rows in bank['phases'].items():
            answers['phases'][phase]=[{'id':q['id'],'answer':q.pop('answer'),'evidence':q.pop('evidence')} for q in rows]
        objective.merge_answer_key(bank,answers)
        answers['phases']['initial'][0]['answerParts']=[]
        with self.assertRaisesRegex(ValueError,'覆盖'):
            objective.merge_answer_key(bank,answers)

    def test_choices_and_noncanonical_reference_answers_are_rejected(self):
        for change in ({'multiple':True},{'options':{'A':'yes'}},{'scoring':'evidence-tier'},
                       {'answer':'4/6;BDAC'},{'answerParts':[dict(name='x',kind=[])]}):
            key=copy.deepcopy(self.key);key['phases']['initial'][0].update(change)
            with self.assertRaises(ValueError):objective.validate_key(key)


class PublicFieldCueTests(unittest.TestCase):
    def test_source_ids_cannot_hide_in_answer_field_labels(self):
        root=Path(__file__).resolve().parents[1]
        source=root/'research/longread-qa-v3'
        bank=json.loads((source/'questions.json').read_text())
        host=json.loads((source/'host/answer-key.json').read_text())
        q=bank['phases']['initial'][0]
        q.pop('options');q.pop('multiple')
        q.update(answerType='structured',answerParts=[dict(name='P03论文结果',kind='code')])
        host['phases']['initial'][0].update(derivation='steps',dependencies=['source'],
            ablation='missing data',claimScope='reported',difficultyRationale='chain')
        result=audit_draft({'questions':bank['phases'],'answers':host['phases']},root)
        self.assertTrue(any('目标材料定位编号' in e for e in result['errors']))


if __name__ == '__main__': unittest.main()
