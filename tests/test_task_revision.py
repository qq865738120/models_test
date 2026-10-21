import unittest
from pathlib import Path

from evalkit.catalog import catalog, candidate_task, candidate_change, RUBRIC_VERSION
from evalkit.standard import read_standard
from evalkit.task_revision import INITIAL
from evalkit.objective import question_bank
from evalkit.hybrid_revision import (apply_static_review, apply_dispatch_review, DISPATCH_AUTO_DIMENSIONS,
                                    apply_svg_review, apply_game2d_review, apply_game3d_review)
from evalkit.task_revision import RUBRICS, CHANGES

ROOT = Path(__file__).resolve().parents[1]


class TaskRevisionTests(unittest.TestCase):
    def test_display_order_and_independent_phase_weights(self):
        tasks = catalog()
        self.assertEqual(RUBRIC_VERSION, 'pelican-rubric-14')
        self.assertEqual([t['id'] for t in tasks],
                         ['01-svg', '02-static', '03-dispatch', '04-game2d', '05-game3d', '06-memory'])
        self.assertEqual([t['number'] for t in tasks], ['01', '02', '03', '04', '05', '06'])
        for task in tasks:
            with self.subTest(task=task['id']):
                self.assertTrue(task['briefChange'])
                for phase in ('rubric', 'rubricChange'):
                    dims = task[phase]
                    self.assertEqual(sum(d['weight'] for d in dims), 100)
                    self.assertEqual(len({d['id'] for d in dims}), len(dims))
                    self.assertTrue(all(d['checks'] and d['description'] for d in dims))
                self.assertNotEqual(task['rubric'], task['rubricChange'])

    def test_creative_tasks_use_manual_review_with_public_function_contracts(self):
        standard = read_standard(ROOT / 'llm-evaluation-standard.html')
        for task in catalog()[:5]:
            if task['id'] == '03-dispatch':
                continue
            with self.subTest(task=task['id']):
                self.assertEqual(task['scoringMode'], 'manual')
                self.assertNotIn('automationVersion', task)
                for phase in ('rubric', 'rubricChange'):
                    for dimension in task[phase]:
                        self.assertEqual(dimension['scoring'], 'manual')
                        self.assertEqual([a['score'] for a in dimension['anchors']], [0, 5, 10])
                prompt = candidate_task(task['id'], standard)
                if task['id']=='02-static':
                    self.assertNotIn('materials/EVAL.md', prompt)
                else:
                    self.assertIn('materials/EVAL.md', prompt)
                self.assertNotIn('自动验收', prompt)
                self.assertNotIn('自动脚本核验', prompt)
                self.assertNotIn('自动验收', candidate_change(task['id'], standard))

    def test_dispatch_automates_only_http_api_dimensions(self):
        task = next(t for t in catalog() if t['id'] == '03-dispatch')
        self.assertEqual(task['scoringMode'], 'hybrid')
        for field, ids in DISPATCH_AUTO_DIMENSIONS.items():
            automatic = [d for d in task[field] if d['scoring'] == 'auto']
            self.assertEqual({d['id'] for d in automatic}, ids)
            self.assertEqual(sum(d['weight'] for d in automatic),40 if field=='rubric' else 10)
            self.assertTrue(all([a['score'] for a in d['anchors']]==[0,1] for d in automatic))
        initial = {d['id']:d['weight'] for d in task['rubric']}
        change = {d['id']:d['weight'] for d in task['rubricChange']}
        self.assertNotIn('runtime',initial)
        self.assertNotIn('delivery',change)
        self.assertEqual(initial['async'],10)
        self.assertEqual(change['races'],15)
        self.assertEqual(apply_dispatch_review(task),task)

    def test_visual_task_is_simple_and_only_visual_and_content_are_scored(self):
        task = catalog()[1]
        dims = {d['id']: d for d in task['rubric']}
        self.assertEqual({key:d['weight'] for key,d in dims.items()},
                         {'impact':40,'craft':30,'content':30})
        self.assertEqual({d['id']:d['weight'] for d in task['rubricChange']},
                         {'kids':43,'integration':43,'preservation':14})
        self.assertLess(len(INITIAL['02-static']), 400)
        for word in ('全面', '准确', '视觉冲击力', '纯前端', '空白画布'):
            self.assertIn(word, INITIAL['02-static'])
        self.assertNotIn('30秒认识', INITIAL['02-static'])

    def test_static_review_projection_keeps_source_unchanged(self):
        import copy
        source = {'id':'02-static','scoringMode':'hybrid',
                  'rubric':copy.deepcopy(RUBRICS['02-static']),
                  'rubricChange':copy.deepcopy(CHANGES['02-static'])}
        before = copy.deepcopy(source)
        projected = apply_static_review(source)
        self.assertEqual(source, before)
        self.assertEqual([d['id'] for d in projected['rubric']], ['impact','craft','content'])
        self.assertEqual([d['id'] for d in projected['rubricChange']], ['kids','integration','preservation'])
        self.assertEqual(apply_static_review(projected), projected)
        for field in ('rubric','rubricChange'):
            self.assertEqual(sum(d['weight'] for d in projected[field]),100)

    def test_svg_review_has_only_three_dimensions_in_both_phases(self):
        import copy
        source={'id':'01-svg','scoringMode':'hybrid','automationVersion':'old-checks',
                'rubric':copy.deepcopy(RUBRICS['01-svg']),
                'rubricChange':copy.deepcopy(CHANGES['01-svg'])}
        before=copy.deepcopy(source)
        projected=apply_svg_review(source)
        self.assertEqual(source,before)
        self.assertEqual(apply_svg_review(projected),projected)
        current=catalog()[0]
        for field in ('rubric','rubricChange'):
            self.assertEqual(projected[field],current[field])
            self.assertEqual({d['id']:d['weight'] for d in projected[field]},
                             {'anatomy':30,'pedals':30,'expression':40})
            self.assertEqual([d['name'] for d in projected[field]],
                             ['空间关系','脚与踏板同步性','构图与动画表现'])
        self.assertIn('8秒',str(projected['rubricChange']))
        self.assertIn('0–4秒',str(projected['rubricChange']))
        self.assertNotIn('retiming',{d['id'] for d in projected['rubricChange']})
        self.assertNotIn('automationVersion',projected)

    def test_game2d_review_removes_standalone_input_and_delivery_dimensions(self):
        import copy
        current=next(t for t in catalog() if t['id']=='04-game2d')
        source=copy.deepcopy(current)
        source['rubric'] += [{'id':'accessibility','weight':10},{'id':'delivery','weight':5}]
        source['rubricChange'].append({'id':'delivery','weight':5})
        before=copy.deepcopy(source)
        projected=apply_game2d_review(source)
        self.assertEqual(source,before)
        self.assertEqual(apply_game2d_review(projected),projected)
        self.assertEqual({d['id']:d['weight'] for d in projected['rubric']},
                         {'control':10,'platform':10,'damage':10,'goal':20,'states':10,'visual':25,'feel':15})
        self.assertEqual({d['id']:d['weight'] for d in projected['rubricChange']},
                         {'fragile':25,'speed':20,'damage':10,'states':10,'feedback':10,'visual':20,'feel':5})
        for field in ('rubric','rubricChange'):
            self.assertEqual(current[field],projected[field])
            self.assertEqual(sum(d['weight'] for d in projected[field]),100)

    def test_game3d_review_removes_runtime_but_keeps_gameplay_delivery(self):
        import copy
        source={'id':'05-game3d','rubric':copy.deepcopy(RUBRICS['05-game3d']),
                'rubricChange':copy.deepcopy(CHANGES['05-game3d'])}
        before=copy.deepcopy(source)
        projected=apply_game3d_review(source)
        self.assertEqual(source,before)
        self.assertEqual(apply_game3d_review(projected),projected)
        self.assertEqual({d['id']:d['weight'] for d in projected['rubric']},
                         {'model':25,'rendering':25,'linkage':10,'driving':5,'handling':20,
                          'delivery_rule':10,'experience':5})
        self.assertEqual({d['id']:d['weight'] for d in projected['rubricChange']},
                         {'dimensions':20,'alignment':20,'handling':25,'visual':20,'regression':15})
        regression=next(d for d in projected['rubricChange'] if d['id']=='regression')
        for text in (regression['name'],regression['description'],str(regression['checks']),str(regression['anchors'])):
            self.assertNotIn('性能',text)
            self.assertNotIn('资源',text)
        current=next(t for t in catalog() if t['id']=='05-game3d')
        for field in ('rubric','rubricChange'):
            self.assertEqual(current[field],projected[field])
            self.assertEqual(sum(d['weight'] for d in projected[field]),100)

    def test_all_public_prompts_exist_without_number_based_fallback(self):
        standard = read_standard(ROOT / 'llm-evaluation-standard.html')
        self.assertNotIn('task6', standard.prompts)  # Original five-task source stays intact.
        for task in catalog():
            prompt = candidate_task(task['id'], standard)
            self.assertIn(task['title'], prompt)
            self.assertTrue(candidate_change(task['id'], standard))
            for hidden in ('rubricChange', 'answer-key.json', 'host/answer'):
                self.assertNotIn(hidden, prompt)
        self.assertNotIn('1.68', candidate_task('05-game3d', standard))
        self.assertNotIn('易碎', candidate_task('04-game2d', standard))
        self.assertNotIn('status、页码page', candidate_task('03-dispatch', standard))

    def test_longread_preserves_answer_only_exact_and_frozen_tier_contract(self):
        task = catalog()[-1]
        self.assertEqual(task['number'], '06')
        self.assertEqual(task['delivery'], 'answers-json')
        self.assertEqual(task['scoringMode'], 'objective')
        self.assertEqual(len(task['rubric']), 18)
        self.assertEqual(len(task['rubricChange']), 6)
        public = question_bank()['phases']
        for phase, field in (('initial', 'rubric'), ('change', 'rubricChange')):
            kinds = {q['id']: q['scoring'] for q in public[phase]}
            for dimension in task[field]:
                self.assertEqual([a['score'] for a in dimension['anchors']],
                                 [0, 0.5, 1] if kinds[dimension['id']] == 'evidence-tier'
                                 else [0, 1])
        self.assertNotIn('报告', task['description'])
        # API callers must not mutate the catalog used by later runs.
        task['rubric'][0]['weight'] = 999
        self.assertEqual(sum(d['weight'] for d in catalog()[-1]['rubric']), 100)

    def test_3d_quality_has_distinct_model_and_rendering_scores(self):
        task = next(t for t in catalog() if t['id'] == '05-game3d')
        dims = {d['id']: d for d in task['rubric']}
        self.assertEqual(dims['model']['weight'], 25)
        self.assertEqual(dims['rendering']['weight'], 25)
        self.assertIn('粗糙基础几何体拼装', dims['model']['anchors'][1]['text'])
        for requirement in ('轮毂', '仪表', '液压', '羽片', '粗糙度', '阴影', '抗锯齿'):
            self.assertIn(requirement, INITIAL['05-game3d'])
        changes = {d['id']: d for d in task['rubricChange']}
        self.assertEqual(changes['visual']['weight'], 20)
        self.assertIn('不能用“原来就简单”', changes['visual']['checks'][1])

    def test_dispatch_visual_and_interaction_are_independent_dimensions(self):
        task = next(t for t in catalog() if t['id'] == '03-dispatch')
        dims = {d['id']: d for d in task['rubric']}
        self.assertEqual(dims['visual']['weight'], 15)
        self.assertEqual(dims['interaction']['weight'], 15)
        for requirement in ('成熟商业产品', '可清除条件', '焦点', '不使用alert', '390×844'):
            self.assertIn(requirement, INITIAL['03-dispatch'])
        change = {d['id']: d['weight'] for d in task['rubricChange']}
        self.assertEqual((change['visual'], change['interaction']), (15, 15))

    def test_new_task_materials_are_facts_not_a_finished_page(self):
        root = ROOT / 'templates/02-static'
        source = (root / 'output/index.html').read_text()
        self.assertIn('<body></body>', source)
        self.assertNotIn('<style', source)
        self.assertNotIn('<main', source)
        facts = (root / 'materials/PELICAN.md').read_text()
        self.assertIn('allaboutbirds.org', facts)
        self.assertIn('australian.museum', facts)
        self.assertNotIn('30秒认识', facts)
        self.assertFalse((root / 'package.json').exists())


if __name__ == '__main__':
    unittest.main()
