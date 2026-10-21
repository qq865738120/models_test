"""Real-browser checks against a host-only HTML fixture and real HTTP state."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

from evalkit.dispatch import seed_orders
from test_fullstack import ContractServer

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / 'evaluation-runtime'
CHROME = next((path for path in (
    os.environ.get('PELICAN_CHROME', ''),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
) if path and Path(path).is_file()), None)
READY = bool(shutil.which('node') and CHROME and (RUNTIME / 'node_modules/playwright-core').is_dir())


@unittest.skipUnless(READY, 'Prepared playwright-core and local Chrome are required; no download is attempted')
class DispatchBrowserTests(unittest.TestCase):
    def run_fixture(self, phase='initial', fault='none'):
        seed = seed_orders()
        server = ContractServer(seed).start()
        try:
            with tempfile.TemporaryDirectory(prefix='dispatch-browser-fixture-') as folder:
                root = Path(folder)
                output = root / 'output'
                output.mkdir()
                source = (ROOT / 'tests/fixtures/dispatch-ui.html').read_text()
                (output / 'index.html').write_text(source.replace('__TEST_FAULT__', fault))
                args = root / 'args.json'
                args.write_text(json.dumps({
                    'root': str(output), 'taskId': '03-dispatch', 'phase': phase,
                    'apiBase': server.base_url, 'seed': seed, 'browser': CHROME,
                }))
                result = subprocess.run(
                    ['node', str(RUNTIME / 'browser-checks.mjs'), str(args)],
                    cwd=ROOT, text=True, capture_output=True, timeout=75)
                self.assertEqual(result.returncode, 0, result.stderr)
                report = json.loads(result.stdout)
                self.assertTrue(report['checks'], result.stdout)
                return {row['id']: row for row in report['checks']}
        finally:
            server.close()

    def test_initial_http_workflow_accepts_delayed_but_correct_rendering(self):
        checks = self.run_fixture()
        self.assertTrue(all(row['passed'] is True for row in checks.values()), checks)
        self.assertTrue({'real-ui-assignment', 'shared-refresh-state', 'stale-success', 'stale-failure'} <= checks.keys())

    def test_change_url_and_business_workflow_all_pass(self):
        checks = self.run_fixture('change')
        self.assertTrue(all(row['passed'] is True for row in checks.values()), checks)
        self.assertTrue({'url-first-restore', 'url-history', 'url-invalid-boundaries', 'url-outside-page'} <= checks.keys())

    def test_older_success_or_failure_overwriting_new_query_is_rejected(self):
        checks = self.run_fixture(fault='stale')
        self.assertFalse(checks['stale-success']['passed'], checks)
        self.assertFalse(checks['stale-failure']['passed'], checks)
        self.assertTrue(checks['real-ui-assignment']['passed'], checks)

    def test_aborting_obsolete_requests_is_accepted(self):
        checks = self.run_fixture(fault='abort-stale')
        self.assertTrue(all(row['passed'] is True for row in checks.values()), checks)

    def test_frontend_only_fake_assignment_is_rejected(self):
        checks = self.run_fixture(fault='fake-assignment')
        self.assertFalse(checks['real-ui-assignment']['passed'], checks)
        self.assertFalse(checks['shared-refresh-state']['passed'], checks)
        self.assertTrue(checks['http-from-browser']['passed'], checks)


if __name__ == '__main__':
    unittest.main()
