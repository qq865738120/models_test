import argparse
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import test_lifecycle as fixture
from evalkit import manager as m
from evalkit.automation_contract import DELIVERY_VERSION, VERSION, install
from evalkit.catalog import candidate_change, candidate_task
from evalkit.hybrid_revision import DISPATCH_CHANGE, DISPATCH_INITIAL, GAME2D_VISUAL
from evalkit.standard import read_standard
from evalkit.task_revision import CHANGE, INITIAL


ROOT = Path(__file__).resolve().parents[1]
DEVELOPMENT_TASKS = ('01-svg', '02-static', '03-dispatch', '04-game2d', '05-game3d')


class ProjectRulesTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.standard = read_standard(ROOT / 'llm-evaluation-standard.html')

    def generated_notes(self, root, key):
        project = root / key
        install(project, key)
        return (project / 'materials/EVAL.md').read_text(encoding='utf-8')

    def test_delivery_notes_keep_workbench_contract_without_creative_constraints(self):
        with tempfile.TemporaryDirectory() as directory:
            for key in DEVELOPMENT_TASKS:
                with self.subTest(task=key):
                    notes = self.generated_notes(Path(directory), key)
                    for required in (DELIVERY_VERSION, 'output/index.html', '本地相对路径',
                                     '不请求外网', 'iframe', '不提供同源身份', '父页面',
                                     'localStorage', 'IndexedDB', 'Service Worker'):
                        self.assertIn(required, notes)
                    for obsolete in ('__pelicanEval', 'data-testid', 'data-eval', 'evalRole',
                                     'replay.json', 'fixtures', 'hud-lives', 'hud-delivered',
                                     'hurt-with-parcel', 'moving-platform:m1'):
                        self.assertNotIn(obsolete, notes)
                    self.assertNotRegex(notes, r'\b(?:x|y|z|width|height|depth)\s*[:=]\s*-?\d')
                    self.assertNotRegex(notes, r'\d+(?:\.\d+)?\s*(?:px|像素|米|度|viewBox单位)')
                    self.assertIn('题目内容以当前阶段提示词为准', notes)

    def test_manual_tasks_need_only_actual_review(self):
        with tempfile.TemporaryDirectory() as directory:
            for key in ('01-svg', '02-static', '04-game2d', '05-game3d'):
                with self.subTest(task=key):
                    notes = self.generated_notes(Path(directory), key)
                    self.assertIn('人工检查', notes)
                    self.assertIn('工作台不需要额外的元素标识、游戏观测接口或测试驱动', notes)

    def test_dispatch_keeps_http_and_proxy_contract(self):
        with tempfile.TemporaryDirectory() as directory:
            notes = self.generated_notes(Path(directory), '03-dispatch')
        for required in ('真实HTTP接口', 'materials/API.md', 'materials/HARNESS.md',
                         '相对于当前HTML目录的api/', '独立回环端口', '实际业务逻辑和数据'):
            self.assertIn(required, notes)
        self.assertIn('前端临时状态', notes)
        self.assertIn('订单业务状态按materials/API.md保存在Node服务进程内存中', notes)
        self.assertIn('页面刷新不重置订单', notes)
        self.assertIn('不要求特定DOM标记', notes)

    def test_delivery_version_does_not_relabel_historical_checker_or_objective_task(self):
        self.assertEqual(VERSION, 'pelican-checks-1')
        self.assertNotEqual(DELIVERY_VERSION, VERSION)
        with tempfile.TemporaryDirectory() as directory:
            project = Path(directory) / '06-memory'
            install(project, '06-memory')
            self.assertFalse(project.exists())

    def test_initial_prompt_bodies_are_preserved_verbatim(self):
        for key in DEVELOPMENT_TASKS:
            with self.subTest(task=key):
                body = DISPATCH_INITIAL if key == '03-dispatch' else INITIAL[key]
                if key == '04-game2d':
                    body += '\n\n' + GAME2D_VISUAL
                prompt = candidate_task(key, self.standard)
                self.assertIn(body, prompt)
                self.assertEqual(prompt.count(body), 1)
                self.assertNotIn('必须遵守materials/EVAL.md的公开核验规范', prompt)
                self.assertNotIn('游戏观测与输入重放', prompt)

    def test_change_prompt_bodies_are_preserved_without_extra_test_protocol(self):
        for key in DEVELOPMENT_TASKS:
            with self.subTest(task=key):
                body = DISPATCH_CHANGE if key == '03-dispatch' else CHANGE[key]
                prompt = candidate_change(key, self.standard)
                self.assertIn(body, prompt)
                self.assertEqual(prompt.count(body), 1)
                self.assertNotIn('hurt-with-parcel', prompt)
                self.assertNotIn('replay.json', prompt)

    def test_common_rules_preserve_evaluation_boundary_and_real_delivery(self):
        rules = (ROOT / 'rules/COMMON_RULES.md').read_text(encoding='utf-8')
        for boundary in ('仅在本次单题项目根目录内', '不得读取父目录', '其他轮次成果',
                         '禁止外网搜索', '联网安装依赖', '所有题目禁止外网请求',
                         '共享可写状态', '实现真实可运行的功能', '不得伪造记录',
                         'output/index.html', 'output/answers.json'):
            self.assertIn(boundary, rules)
        self.assertIn('提示词未明确限定的设计由你决定', rules)
        self.assertNotIn('最小假设', rules)


class ProjectMaterialTests(unittest.TestCase):
    setUp = fixture.LifecycleTests.setUp
    tearDown = fixture.LifecycleTests.tearDown
    init = fixture.LifecycleTests.init

    GAME_FILES = {'04-game2d': 'level.json', '05-game3d': 'warehouse.json'}
    LEGACY_VERSION = 'pelican-v1.0-longread-v4-20261021'

    def assert_resource_notes(self, tasks):
        for key, filename in self.GAME_FILES.items():
            with self.subTest(task=key):
                project = tasks / key
                notes = m.load(project / 'materials' / filename)
                self.assertEqual(notes['purpose'], 'resource-information')
                self.assertEqual(notes['requirements'], 'TASK.md')
                self.assertTrue(all(isinstance(value, str) for value in notes.values()))
                for old_field in ('width', 'height', 'spawn', 'exit', 'platforms', 'movingPlatforms',
                                  'packages', 'robots', 'hazards', 'physics', 'floor', 'vehicle',
                                  'racks', 'barriers', 'boxes', 'deliveryZones'):
                    self.assertNotIn(old_field, notes)
                self.assertEqual((project / 'materials' / filename).read_bytes(),
                                 (project / 'public/materials' / filename).read_bytes())
                contract = (project / 'materials/CONTRACT.md').read_text(encoding='utf-8')
                self.assertIn('资源说明', contract)
                self.assertIn('TASK.md', contract)
                self.assertIn('src/main.ts', contract)
                self.assertNotRegex(contract, r'\b(?:x|y|z)\s*[:=]\s*-?\d')
                self.assertNotRegex(contract, r'\d+(?:\.\d+)?\s*(?:px|像素|米|度|秒|帧)')
                for old_rule in ('24×20', '2400', 'gravity', 'moveSpeed', 'jumpSpeed',
                                 '对齐夹角', '水平伸入', 'P95', '理论最大', '必须阻挡'):
                    self.assertNotIn(old_rule, contract)
        assets_project = tasks / '04-game2d'
        assets = m.load(assets_project / 'materials/assets.json')
        self.assertNotIn('frameRate', assets)
        self.assertEqual(assets['root'], 'materials/sprites/')
        self.assertEqual((assets_project / 'materials/assets.json').read_bytes(),
                         (assets_project / 'public/materials/assets.json').read_bytes())

    def test_generated_games_provide_resources_without_fixed_map_or_physics(self):
        self.assert_resource_notes(self.prepared / 'tasks')

    def test_materials_stay_protected_while_candidate_config_is_editable(self):
        run = self.init('editable-config', task='all')
        for key, filename in self.GAME_FILES.items():
            with self.subTest(task=key):
                project = run / 'tasks' / key
                for relative in ('src/game-config.json', 'config/game.json', 'public/game.json'):
                    self.assertFalse(m.protected(relative))
                    m.dump(project / relative, {'layout': [{'x': 73, 'y': 91}], 'speed': 333})
                self.assertEqual(m.integrity(run, key), [])
                for relative in ('materials/CONTRACT.md', 'materials/' + filename,
                                 'public/materials/' + filename):
                    self.assertTrue(m.protected(relative))
                    target = project / relative
                    original = target.read_bytes()
                    target.write_text('changed', encoding='utf-8')
                    self.assertEqual(m.integrity(run, key), [{'path': relative, 'kind': 'modified'}])
                    target.write_bytes(original)
                self.assertEqual(m.integrity(run, key), [])

    def legacy_bundle(self):
        legacy_layouts = {
            '04-game2d': {'width': 2400, 'height': 720,
                          'platforms': [{'x': 320, 'y': 560, 'width': 240, 'height': 24}],
                          'physics': {'gravity': 900, 'moveSpeed': 240, 'jumpSpeed': 480}},
            '05-game3d': {'floor': {'width': 24, 'depth': 20},
                          'vehicle': {'start': {'x': 0, 'z': 7}, 'maxSpeed': 4},
                          'physics': {'gravity': -9.81, 'boxMass': 20}},
        }
        for key, filename in self.GAME_FILES.items():
            project = self.prepared / 'tasks' / key
            for area in ('materials', 'public/materials'):
                m.dump(project / area / filename, legacy_layouts[key])
            m.write(project / 'materials/CONTRACT.md', '旧固定布局：24×20，平台x=320，重力900。')
        meta = m.load(self.prepared / 'bundle.json')
        entries = m.manifest(self.prepared, skip=('bundle.json', 'approval.json'))
        meta.update(version=self.LEGACY_VERSION, files=entries, bundleSha256=m.digest(entries))
        m.dump(self.prepared / 'bundle.json', meta)
        return meta

    def test_offline_revision_removes_old_maps_and_preserves_history_and_backup(self):
        old_meta = self.legacy_bundle()
        with patch.object(m, 'VERSION', self.LEGACY_VERSION):
            old_run = self.init('legacy-layout', task='all')
        old_run_files = m.manifest(old_run)
        old_bundle_files = m.manifest(self.prepared)
        with patch.object(m.subprocess, 'run', side_effect=AssertionError('must stay offline')):
            m.revise_prepared(argparse.Namespace())
        self.assert_resource_notes(self.prepared / 'tasks')
        self.assertEqual(m.manifest(old_run), old_run_files)
        backups = list(self.root.glob('.prepared-backup-*'))
        self.assertEqual(len(backups), 1)
        self.assertEqual(m.manifest(backups[0]), old_bundle_files)
        new_meta = m.ensure_prepared()
        self.assertEqual(new_meta['previousBundleSha256'], old_meta['bundleSha256'])
        self.assertNotEqual(new_meta['bundleSha256'], old_meta['bundleSha256'])
        new_run = self.init('free-layout', task='all')
        self.assert_resource_notes(new_run / 'tasks')
        new_files = m.manifest(self.prepared)
        with self.assertRaisesRegex(ValueError, '拒绝重复'):
            m.revise_prepared(argparse.Namespace())
        self.assertEqual(m.manifest(self.prepared), new_files)

    def test_damaged_old_materials_are_rejected_without_migration(self):
        self.legacy_bundle()
        m.write(self.prepared / 'tasks/04-game2d/materials/level.json', '{}')
        damaged_files = m.manifest(self.prepared)
        with self.assertRaisesRegex(ValueError, '完整性'):
            m.revise_prepared(argparse.Namespace())
        self.assertEqual(m.manifest(self.prepared), damaged_files)
        self.assertFalse(list(self.root.glob('.prepared-backup-*')))
        self.assertFalse(list(self.root.glob('.prepare-*')))


if __name__ == '__main__':
    unittest.main()
