import contextlib
import argparse
import json
import os
from pathlib import Path
import selectors
import shutil
import subprocess
import tempfile
import unittest
from unittest.mock import patch
import urllib.error
import urllib.request

from evalkit import dispatch
from evalkit import manager as m
import test_lifecycle as fixture

ROOT = Path(__file__).resolve().parents[1]


@contextlib.contextmanager
def running_starter(entry, cwd):
    process = subprocess.Popen(
        ['node', str(entry)], cwd=cwd, env={**os.environ, 'PORT': '0'},
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    try:
        with selectors.DefaultSelector() as selector:
            selector.register(process.stdout, selectors.EVENT_READ)
            if not selector.select(5):
                raise AssertionError('Node starter did not report a listening port')
        line = process.stdout.readline().strip()
        if not line.startswith('DISPATCH_API http://127.0.0.1:'):
            raise AssertionError('Unexpected starter output: ' + line)
        yield line.split(' ', 1)[1]
    finally:
        if process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=3)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=3)
        process.stdout.close()
        process.stderr.close()


class DispatchContractTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.project = Path(self.temp.name) / 'project'
        self.project.mkdir()
        dispatch.install(self.project)

    def tearDown(self):
        self.temp.cleanup()

    def test_seed_is_deterministic_private_input_and_preserves_legacy_rows(self):
        rows = json.loads((self.project / 'materials/orders.json').read_text())
        self.assertEqual(rows, dispatch.seed_orders())
        self.assertEqual(len(rows), 10000)
        self.assertEqual(len({row['id'] for row in rows}), 10000)
        self.assertEqual([sum(row['status'] == status for row in rows)
                          for status in ('pending', 'assigned', 'delivered')], [5000, 2500, 2500])
        self.assertEqual(rows[0]['id'], 'PD-00001')
        self.assertEqual(rows[-1]['id'], 'PD-10000')
        for path in ('public/materials/orders.json', 'public/materials/mock-api.js',
                     'tools/mock-server.mjs'):
            self.assertFalse((self.project / path).exists())

    def test_migration_removes_old_mock_distribution(self):
        stale = ('public/materials/orders.json', 'public/materials/mock-api.js',
                 'tools/mock-server.mjs', 'output/materials/orders.json',
                 'output/materials/mock-api.js')
        for relative in stale:
            path = self.project / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text('legacy mock')
        dispatch.install(self.project)
        self.assertTrue(all(not (self.project / relative).exists() for relative in stale))
        self.assertTrue((ROOT / 'templates/03-dispatch/tools/mock-server.mjs').exists())
        self.assertTrue((ROOT / 'templates/03-dispatch/public/materials/mock-api.js').exists())

    def test_contract_and_package_agree_without_backend_dependencies(self):
        contract = json.loads((self.project / 'materials/contract.json').read_text())
        package = json.loads((self.project / 'package.json').read_text())
        lock = json.loads((self.project / 'package-lock.json').read_text())
        self.assertEqual(contract['version'], dispatch.CONTRACT_VERSION)
        self.assertEqual(contract['server'], 'output/server/index.mjs')
        self.assertEqual(package['scripts']['api'], 'node server/index.mjs')
        self.assertTrue(package['scripts']['build'].endswith('node tools/package-server.mjs'))
        self.assertNotIn('mock', package['scripts'])
        self.assertEqual(package['dependencies'], lock['packages']['']['dependencies'])
        self.assertEqual(package['devDependencies'], lock['packages']['']['devDependencies'])
        for endpoint in ('GET /health', 'GET /api/orders', 'GET /api/orders/:id',
                         'GET /api/couriers', 'GET /api/stats', 'POST /api/assign'):
            self.assertIn(endpoint, dispatch.API_TEXT)
        for error in ('INVALID_ARGUMENT', 'NOT_FOUND', 'CONFLICT', 'INTERNAL_ERROR'):
            self.assertIn(error, dispatch.API_TEXT)
        self.assertIn("new URL('api/orders', document.baseURI)", dispatch.API_TEXT)
        self.assertNotIn('URL查询状态', dispatch.API_TEXT + dispatch.HARNESS_TEXT)

    def test_public_documents_leave_frontend_design_to_the_prompt(self):
        api = (self.project / 'materials/API.md').read_text()
        harness = (self.project / 'materials/HARNESS.md').read_text()
        self.assertIn('以当前题目提示词为准', api)
        self.assertIn('实际操作评审', harness)
        self.assertIn('不要求特定DOM标记或浏览器自动检查接口', harness)
        for constraint in ('导航220px', '顶栏72px', '内边距32px', '行高56px',
                           'data-testid', 'nav-overview', 'order-search', '必需标记'):
            self.assertNotIn(constraint, api + harness)
        self.assertIn('输入反馈P95≤100ms', api)
        self.assertIn('PORT', harness)
        self.assertIn('output/server/data/orders.json', harness)
        self.assertIn('整批原子性', harness)

    @unittest.skipUnless(shutil.which('node'), 'Node is required')
    def test_starter_exposes_health_but_no_business_answer(self):
        with running_starter(self.project / 'server/index.mjs', self.project) as base:
            with urllib.request.urlopen(base + '/health', timeout=3) as response:
                self.assertEqual(response.status, 200)
                self.assertEqual(json.load(response), {'ok': True})
            for path in ('/api/orders', '/api/orders/PD-00001', '/api/couriers', '/api/stats'):
                with self.assertRaises(urllib.error.HTTPError) as caught:
                    urllib.request.urlopen(base + path, timeout=3)
                self.assertEqual(caught.exception.code, 501)
                self.assertEqual(json.load(caught.exception)['error']['code'], 'NOT_IMPLEMENTED')
                caught.exception.close()
            request = urllib.request.Request(
                base + '/api/assign', data=b'{"ids":["PD-00001"],"courierId":"P01"}',
                headers={'Content-Type': 'application/json'}, method='POST')
            with self.assertRaises(urllib.error.HTTPError) as caught:
                urllib.request.urlopen(request, timeout=3)
            self.assertEqual(caught.exception.code, 501)
            caught.exception.close()

    @unittest.skipUnless(shutil.which('node'), 'Node is required')
    def test_packaged_server_is_standalone_and_seed_is_not_in_frontend(self):
        subprocess.run(['node', 'tools/package-server.mjs'], cwd=self.project,
                       check=True, capture_output=True, text=True)
        packaged = self.project / 'output'
        self.assertEqual((packaged / 'server/data/orders.json').read_bytes(),
                         (self.project / 'materials/orders.json').read_bytes())
        isolated = Path(self.temp.name) / 'isolated'
        shutil.copytree(packaged, isolated)
        shutil.rmtree(self.project)
        with running_starter(isolated / 'server/index.mjs', isolated) as base:
            with urllib.request.urlopen(base + '/health', timeout=3) as response:
                self.assertEqual(json.load(response), {'ok': True})
        self.assertFalse((isolated / 'node_modules').exists())
        self.assertFalse((isolated / 'materials/orders.json').exists())

    @unittest.skipUnless(shutil.which('node'), 'Node is required')
    def test_packager_rejects_external_symlink_without_copying_it(self):
        outside = Path(self.temp.name) / 'outside-secret.txt'
        outside.write_text('not part of the task')
        (self.project / 'server/leak.txt').symlink_to(outside)
        result = subprocess.run(['node', 'tools/package-server.mjs'], cwd=self.project,
                                capture_output=True, text=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('符号链接', result.stderr)
        self.assertFalse((self.project / 'output/server/leak.txt').exists())


class DispatchRevisionTests(unittest.TestCase):
    setUp = fixture.LifecycleTests.setUp
    tearDown = fixture.LifecycleTests.tearDown
    init = fixture.LifecycleTests.init

    def test_six_task_bundle_revision_keeps_old_run_and_replaces_mock_starter(self):
        project = self.prepared / 'tasks/03-dispatch'
        legacy_version = 'pelican-v1.0-six-tasks-20261020'
        shutil.copy(project / 'materials/orders.json', project / 'public/materials/orders.json')
        shutil.copy(self.root / 'templates/03-dispatch/public/materials/mock-api.js',
                    project / 'public/materials/mock-api.js')
        shutil.copy(self.root / 'templates/03-dispatch/tools/mock-server.mjs',
                    project / 'tools/mock-server.mjs')
        package = m.load(project / 'package.json')
        package['scripts'].pop('api')
        package['scripts']['mock'] = 'node tools/mock-server.mjs'
        m.dump(project / 'package.json', package)
        shutil.rmtree(project / 'server')
        (project / 'tools/package-server.mjs').unlink()
        meta = m.load(self.prepared / 'bundle.json')
        meta.update(version=legacy_version)
        meta['files'] = m.manifest(self.prepared, skip=('bundle.json',))
        meta['bundleSha256'] = m.digest(meta['files'])
        m.dump(self.prepared / 'bundle.json', meta)
        with patch.object(m, 'VERSION', legacy_version):
            old = self.init('existing-six', task='all')
        original = m.manifest(old)
        with patch.object(m.subprocess, 'run', side_effect=AssertionError('revision must stay offline')):
            m.revise_prepared(argparse.Namespace())
        self.assertEqual(m.manifest(old), original)
        self.assertEqual(m.load(self.prepared / 'bundle.json')['version'], m.VERSION)
        self.assertFalse((project / 'public/materials/orders.json').exists())
        self.assertFalse((project / 'public/materials/mock-api.js').exists())
        self.assertFalse((project / 'tools/mock-server.mjs').exists())
        self.assertEqual(m.load(project / 'package.json')['scripts']['api'], 'node server/index.mjs')
        self.assertTrue((project / 'server/index.mjs').exists())
        self.assertTrue((project / 'materials/EVAL.md').exists())
        self.assertEqual(m.load(self.prepared / 'catalog.json')['03-dispatch']['initialMinutes'], 45)
        backup = next(self.root.glob('.prepared-backup-*'))
        self.assertEqual(m.load(backup / 'bundle.json'), meta)
        self.assertTrue((backup / 'tasks/03-dispatch/public/materials/mock-api.js').exists())


if __name__ == '__main__':
    unittest.main()
