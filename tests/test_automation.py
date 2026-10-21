import copy
import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from evalkit import automation as a, fullstack, manager as m
from evalkit.catalog import CATALOG
from evalkit.dispatch import seed_orders
from evalkit.studio import Studio, StudioError


class AutomationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name).resolve()
        self.patches = [patch.object(m, 'ROOT', self.root), patch.object(m, 'RUNS', self.root/'runs')]
        for p in self.patches:
            p.start()
        self.studio = Studio(self.root/'data')

    def tearDown(self):
        self.studio.worker.shutdown()
        for p in reversed(self.patches):
            p.stop()
        self.temp.cleanup()

    def imported(self, key='03-dispatch', phase='initial'):
        run = self.root/'runs/test-run'
        output = run/'tasks'/key/'output'
        m.write(output/'index.html', '<!doctype html><html><body>fixture</body></html>')
        task = copy.deepcopy(next(task for task in CATALOG if task['id'] == key))
        if key == '03-dispatch':
            m.write(output/'server/index.mjs', 'throw new Error("fixture must not run");')
            m.dump(output/'server/data/orders.json', seed_orders())
        m.dump(run/'control/baseline.json', {key: m.manifest(output.parent)})
        m.dump(run/'control/run.json', {'id': run.name, 'suiteId': m.SUITE_ID, 'model': 'fixture',
            'repeat': 1, 'createdAt': m.now(), 'rubricVersion': 'test-rubric',
            'tasks': {key: {'phase': phase}}})
        m.dump(run/'control/rubric.json', {'version': 'test-rubric', 'tasks': [task]})
        result = self.studio.import_artifact(run.name, key, phase)
        artifact = result['review']['artifacts'][key][phase][-1]
        return run, task, artifact

    def run_grade(self, artifact, key='03-dispatch', phase='initial'):
        return a.run_auto_grade(self.studio, 'test-run', key, phase, artifact['id'])

    def test_dimension_requires_all_checks_and_missing_observations_stay_pending(self):
        rubric = [{'id': name, 'scoring': 'auto'} for name in ('one', 'two', 'three', 'four')]
        rows = [a.check('first', 'one', True, 'yes'), a.check('second', 'one', False, 'no'),
                a.check('third', 'two', True, 'yes'), a.check('fourth', 'two', None, 'unknown'),
                a.check('fifth', 'four', True, 'yes'), a.check('sixth', 'four', True, 'yes')]
        checks, values = a.normalize_checks(rows, rubric)
        self.assertEqual(values, {'one': 0, 'two': None, 'three': None, 'four': 1})
        self.assertTrue(any(row['id'] == 'unobserved:three' for row in checks))
        checks, values = a.normalize_checks([a.check('environment', '*', None, 'unavailable')], rubric)
        self.assertEqual(len(checks), 4)
        self.assertTrue(all(v is None for v in values.values()))

    def test_invalid_reports_and_unknown_dimensions_cannot_award_points(self):
        rubric = [{'id': 'query', 'scoring': 'auto'}, {'id': 'visual', 'scoring': 'manual'}]
        for rows in (None, {}, [a.check('bad', 'other', True, 'unknown dimension')],
                     [a.check('bad', 'query', 1, 'not a boolean')], [{}]):
            with self.subTest(rows=rows):
                checks, values = a.normalize_checks(rows, rubric)
                self.assertEqual(values, {'query': None})
                self.assertTrue(all(row['dimensionId'] == 'query' for row in checks))

    def test_save_merges_concurrent_manual_edits_and_returns_weighted_api_report(self):
        run, task, artifact = self.imported()
        manual = {d['id']: None if d['scoring'] == 'auto' else 8 for d in task['rubric']}
        def observe(binding, output, directory, phase, initial_text):
            self.assertNotEqual(output, binding['base']/'files')
            self.assertEqual(m.manifest(output), binding['manifest']['files'])
            review = self.studio.review(run)
            self.studio.save_score(run.name, task['id'], phase, {
                'revision': review['revision'], 'artifactId': artifact['id'],
                'values': manual, 'notes': 'edited while checking'})
            return [a.check('query', 'query', True, 'yes'),
                    a.check('normal', 'assignment', True, 'yes'),
                    a.check('concurrent', 'assignment', False, 'conflict violated'),
                    a.check('validation', 'validation', True, 'yes')]
        with patch.object(a, 'observe', side_effect=observe):
            result = self.run_grade(artifact)
        review = self.studio.review(run)
        score = review['scores'][artifact['id']]
        expected = {**manual, 'query': 1, 'assignment': 0, 'validation': 1}
        self.assertEqual(score['values'], expected)
        self.assertEqual(score['total'], 68)
        self.assertEqual(score['notes'], 'edited while checking')
        self.assertEqual(len(review['scoreHistory']), 1)
        self.assertEqual(review['scoreHistory'][0]['values'], manual)
        self.assertEqual(score['automation']['sourceSha256'], artifact['sha256'])
        self.assertEqual(score['automation']['version'], 'pelican-api-checks-1')
        self.assertTrue(all(row['sourceSha256'] == artifact['sha256']
                            for row in score['automation']['checks']))
        self.assertEqual(result['runId'], run.name)
        self.assertEqual(result['artifactId'], artifact['id'])
        self.assertEqual(result['apiScore'], 20)
        self.assertEqual(result['apiMax'], 40)
        self.assertEqual(result['total'], 68)
        self.assertEqual(result['values'], {'query': 1, 'assignment': 0, 'validation': 1})
        self.assertEqual(result['checks'], score['automation']['checks'])
        self.assertFalse(list((self.root/'.runtime').iterdir()))

    def test_change_stage_scores_only_api_regression_and_preserves_manual_nulls(self):
        run, task, artifact = self.imported(phase='change')
        with patch.object(a, 'observe', return_value=[a.check('query', 'regression', True, 'yes'),
                                                     a.check('assign', 'regression', True, 'yes')]):
            result = self.run_grade(artifact, phase='change')
        score = self.studio.review(run)['scores'][artifact['id']]
        self.assertEqual(result['apiScore'], 10)
        self.assertEqual(result['apiMax'], 10)
        self.assertEqual(result['values'], {'regression': 1})
        self.assertEqual(score['values']['regression'], 1)
        self.assertTrue(all(score['values'][d['id']] is None
                            for d in task['rubricChange'] if d['scoring'] == 'manual'))
        self.assertIsNone(result['total'])

    def test_unavailable_checks_keep_api_and_overall_total_pending(self):
        run, task, artifact = self.imported()
        with patch.object(a, 'observe', return_value=[a.check('environment', '*', None, 'node unavailable')]):
            result = self.run_grade(artifact)
        score = self.studio.review(run)['scores'][artifact['id']]
        self.assertEqual(score['values'], {d['id']: None for d in task['rubric']})
        self.assertIsNone(score['total'])
        self.assertIsNone(result['apiScore'])
        self.assertEqual(result['apiMax'], 40)

    def test_wrong_association_old_version_and_changed_archive_never_execute(self):
        run, _, artifact = self.imported()
        with patch.object(a, 'observe') as observe:
            with self.assertRaises(StudioError):
                self.run_grade(artifact, phase='change')
            pinned = m.load(run/'control/rubric.json')
            pinned['tasks'][0]['automationVersion'] = 'unsupported-checks'
            m.dump(run/'control/rubric.json', pinned)
            with self.assertRaisesRegex(StudioError, '历史轮次'):
                self.run_grade(artifact)
            pinned['tasks'][0]['automationVersion'] = a.VERSION
            m.dump(run/'control/rubric.json', pinned)
            m.write(self.studio.artifacts/artifact['id']/'files/index.html', '<html>changed</html>')
            with self.assertRaisesRegex(StudioError, '完整性'):
                self.run_grade(artifact)
            observe.assert_not_called()

    def test_legacy_supported_contract_uses_current_api_rubric_without_rewriting_source(self):
        run, _, artifact = self.imported()
        pinned = m.load(run/'control/rubric.json')
        pinned['tasks'][0]['automationVersion'] = a.CONTRACT_VERSION
        for dimension in pinned['tasks'][0]['rubric']:
            dimension['scoring'] = 'auto'
        m.dump(run/'control/rubric.json', pinned)
        before = (run/'control/rubric.json').read_bytes()
        binding = a.bind_artifact(self.studio, run.name, '03-dispatch', 'initial', artifact['id'])
        self.assertEqual({d['id'] for d in binding['rubric'] if d['scoring'] == 'auto'},
                         {'query', 'assignment', 'validation'})
        self.assertEqual(sum(d['weight'] for d in binding['rubric']), 100)
        self.assertEqual((run/'control/rubric.json').read_bytes(), before)

    def test_manifest_association_mismatch_is_rejected_before_execution(self):
        _, _, artifact = self.imported()
        path = self.studio.artifacts/artifact['id']/'manifest.json'
        manifest = m.load(path)
        manifest['taskId'] = '01-svg'
        m.dump(path, manifest)
        with patch.object(a, 'observe') as observe, self.assertRaisesRegex(StudioError, '归档关联'):
            self.run_grade(artifact)
        observe.assert_not_called()

    def test_mutation_during_checks_rejects_score(self):
        run, _, artifact = self.imported()
        def mutate(*args):
            m.write(self.studio.artifacts/artifact['id']/'files/index.html', '<html>changed</html>')
            return [a.check('any', '*', True, 'pass')]
        with patch.object(a, 'observe', side_effect=mutate):
            with self.assertRaisesRegex(StudioError, '完整性'):
                self.run_grade(artifact)
        self.assertNotIn(artifact['id'], self.studio.review(run)['scores'])

    def test_mutation_of_disposable_copy_rejects_score(self):
        run, _, artifact = self.imported()
        original = m.manifest(self.studio.artifacts/artifact['id']/'files')
        def mutate(binding, output, *args):
            m.write(output/'server/index.mjs', 'changed')
            return [a.check('any', '*', True, 'pass')]
        with patch.object(a, 'observe', side_effect=mutate):
            with self.assertRaisesRegex(StudioError, '副本被修改'):
                self.run_grade(artifact)
        self.assertNotIn(artifact['id'], self.studio.review(run)['scores'])
        self.assertEqual(m.manifest(self.studio.artifacts/artifact['id']/'files'), original)

    def test_pinned_rubric_change_during_checks_rejects_score(self):
        run, _, artifact = self.imported()
        def mutate(*args):
            data = m.load(run/'control/rubric.json')
            data['tasks'][0]['rubric'][0]['weight'] = 30
            m.dump(run/'control/rubric.json', data)
            return [a.check('any', '*', True, 'pass')]
        with patch.object(a, 'observe', side_effect=mutate):
            with self.assertRaisesRegex(StudioError, '规范变化'):
                self.run_grade(artifact)
        self.assertNotIn(artifact['id'], self.studio.review(run)['scores'])

    def test_symlink_archive_root_is_rejected_before_reading(self):
        _, _, artifact = self.imported()
        base = self.studio.artifacts/artifact['id']
        (base/'files').rename(base/'old-files')
        (base/'files').symlink_to(base/'old-files', target_is_directory=True)
        with patch.object(a, 'observe') as observe:
            with self.assertRaisesRegex(StudioError, '链接'):
                self.run_grade(artifact)
            observe.assert_not_called()

    def test_seed_and_runtime_unavailable_are_separate_results(self):
        _, _, artifact = self.imported()
        binding = a.bind_artifact(self.studio, 'test-run', '03-dispatch', 'initial', artifact['id'])
        output = binding['base']/'files'
        with patch.object(fullstack, 'require_runtime', side_effect=ValueError('unsupported OS')):
            rows = a.observe(binding, output, self.root, 'initial')
            self.assertIsNone(rows[0]['passed'])
        m.dump(output/'server/data/orders.json', [])
        with patch.object(fullstack, 'BackendInstance') as backend:
            rows = a.observe(binding, output, self.root, 'initial')
            self.assertFalse(rows[0]['passed'])
            self.assertEqual(rows[0]['id'], 'fixed-seed')
            backend.assert_not_called()

    def test_fresh_node_runs_only_http_checks_without_browser(self):
        _, _, artifact = self.imported()
        binding = a.bind_artifact(self.studio, 'test-run', '03-dispatch', 'initial', artifact['id'])
        instance = MagicMock()
        instance.base_url = 'http://127.0.0.1:31234'
        events = []
        instance.start.side_effect = lambda: events.append('start')
        def grade(base, seed, restart):
            self.assertEqual(base, instance.base_url)
            self.assertEqual(seed, seed_orders())
            self.assertEqual(restart, instance.restart)
            events.append('http')
            return {'checks': [{'id': 'health', 'group': 'architecture', 'passed': True, 'message': 'ok'}]}
        with patch.object(fullstack, 'require_runtime'), patch.object(fullstack, 'BackendInstance', return_value=instance), \
             patch.object(fullstack, 'grade_api', side_effect=grade), patch.object(a, 'browser_checks') as browser:
            rows = a.observe(binding, binding['base']/'files', self.root, 'initial')
        self.assertEqual(events, ['start', 'http'])
        self.assertEqual(rows[0]['dimensionId'], 'query')
        instance.close.assert_called_once()
        instance.restart.assert_not_called()
        browser.assert_not_called()

    def test_candidate_start_failure_is_zero_but_harness_failure_is_pending(self):
        _, _, artifact = self.imported()
        binding = a.bind_artifact(self.studio, 'test-run', '03-dispatch', 'initial', artifact['id'])
        instance = MagicMock()
        instance.start.side_effect = ValueError('candidate failed')
        with patch.object(fullstack, 'require_runtime'), patch.object(fullstack, 'BackendInstance', return_value=instance):
            rows = a.observe(binding, binding['base']/'files', self.root, 'initial')
        self.assertFalse(rows[0]['passed'])
        instance.close.assert_called_once()
        instance.reset_mock()
        instance.start.side_effect = None
        with patch.object(fullstack, 'require_runtime'), patch.object(fullstack, 'BackendInstance', return_value=instance), \
             patch.object(fullstack, 'grade_api', side_effect=ValueError('harness unavailable')):
            rows = a.observe(binding, binding['base']/'files', self.root, 'initial')
        self.assertIsNone(rows[0]['passed'])
        instance.close.assert_called_once()

    def test_http_groups_only_score_api_dimensions_in_both_stages(self):
        groups = ['architecture', 'query', 'assignment', 'validation', 'consistency', 'runtime']
        report = {'checks': [{'id': group, 'group': group, 'passed': True, 'message': 'ok'} for group in groups]}
        self.assertEqual([row['dimensionId'] for row in a.http_dimensions(report, 'initial')],
                         ['query', 'query', 'assignment', 'validation', 'assignment'])
        self.assertEqual([row['dimensionId'] for row in a.http_dimensions(report, 'change')],
                         ['regression'] * 5)

    def test_retired_creative_entrypoints_never_execute_or_change_reviews(self):
        actual_observe = a.observe
        for key in ('01-svg', '02-static', '04-game2d', '05-game3d'):
            with self.subTest(task=key):
                run, task, artifact = self.imported(key)
                before = (run/'control/review.json').read_bytes()
                with patch.object(a, 'observe') as observe, patch.object(a, 'browser_checks') as browser, \
                     patch.object(fullstack, 'BackendInstance') as backend:
                    with self.assertRaisesRegex(StudioError, '已取消自动核验'):
                        self.run_grade(artifact, key)
                    with self.assertRaisesRegex(StudioError, '已取消自动核验'):
                        self.studio.auto_grade(run.name, key, {'artifactId': artifact['id']})
                    with self.assertRaisesRegex(ValueError, '仅支持第3题'):
                        actual_observe({'task': task}, run/'tasks'/key/'output', self.root, 'initial')
                    with self.assertRaisesRegex(ValueError, '已取消自动核验'):
                        a.auto_grade_cli(SimpleNamespace(run=str(run), task=key, phase='initial', artifact=None))
                    observe.assert_not_called()
                    browser.assert_not_called()
                    backend.assert_not_called()
                self.assertEqual(self.studio.jobs, {})
                self.assertEqual((run/'control/review.json').read_bytes(), before)

    def test_cli_defaults_to_latest_archived_artifact(self):
        run, _, first = self.imported()
        detail = self.studio.import_artifact(run.name, '03-dispatch', 'initial')
        latest = detail['review']['artifacts']['03-dispatch']['initial'][-1]
        report = {'runId': run.name, 'apiScore': 40, 'apiMax': 40}
        with patch.object(a, 'run_auto_grade', return_value=report) as grade, \
                contextlib.redirect_stdout(io.StringIO()):
            result = a.auto_grade_cli(SimpleNamespace(run=str(run), task='3', phase='initial', artifact=None))
        self.assertEqual(result, report)
        self.assertEqual(grade.call_args.args[1:], (run.name, '03-dispatch', 'initial', latest['id']))
        self.assertNotEqual(first['id'], latest['id'])

    def test_cli_writes_report_and_refuses_overwriting_before_grading(self):
        run, _, artifact = self.imported()
        destination = self.root/'reports/api-score.json'
        report = {'runId': run.name, 'artifactId': artifact['id'], 'version': a.VERSION,
                  'apiScore': 20, 'apiMax': 40, 'checks': [], 'total': None}
        args = SimpleNamespace(run=str(run), task='3', phase='initial', artifact=artifact['id'],
                               output=str(destination))
        with patch.object(a, 'run_auto_grade', return_value=report) as grade, \
                contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(a.auto_grade_cli(args), report)
        self.assertEqual(json.loads(destination.read_text()), report)
        self.assertEqual(grade.call_args.args[1:], (run.name, '03-dispatch', 'initial', artifact['id']))
        before = destination.read_bytes()
        with patch.object(a, 'run_auto_grade') as grade, self.assertRaisesRegex(ValueError, '拒绝覆盖'):
            a.auto_grade_cli(args)
        grade.assert_not_called()
        self.assertEqual(destination.read_bytes(), before)


if __name__ == '__main__':
    unittest.main()
