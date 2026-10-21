"""Run the host checker against known-good and deliberately broken local pages."""
import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / 'evaluation-runtime'
CHROME = Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')


@unittest.skipUnless(shutil.which('node') and CHROME.exists() and
                     (RUNTIME/'node_modules/playwright-core').exists(),
                     'Browser acceptance runtime must be explicitly prepared')
class BrowserChecksTests(unittest.TestCase):
    def run_page(self, html, task='02-static', phase='initial', **extra):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root/'index.html').write_text(html)
            args = root/'args.json'
            args.write_text(json.dumps({'root':str(root), 'taskId':task,
                                        'phase':phase, **extra}))
            result = subprocess.run(['node',str(RUNTIME/'browser-checks.mjs'),str(args)],
                                    capture_output=True,text=True,timeout=45)
            self.assertEqual(result.returncode,0,result.stderr)
            return json.loads(result.stdout)['checks']

    def static(self):
        topics = ['appearance','habitat','feeding','behavior','breeding','species','conservation']
        text = '这是一段用于检查正文保留和布局的主持人测试文字，不是科普事实材料。'
        return ('<!doctype html><html><meta charset="utf-8"><style>'
                '*{box-sizing:border-box}body{margin:0}main{max-width:900px;padding:24px}'
                'p{font-size:16px;overflow-wrap:anywhere}</style><body><main>'
                + ''.join(f'<section id="{t}" data-topic="{t}"><p>{text}</p></section>' for t in topics)
                + '</main></body></html>'), text

    def test_valid_static_page_passes_mechanical_checks(self):
        source,_ = self.static()
        checks = self.run_page(source)
        self.assertTrue(checks)
        self.assertTrue(all(c['passed'] is True for c in checks), checks)

    def test_real_overflow_broken_navigation_and_missing_resource_fail(self):
        source,_ = self.static()
        source = source.replace('<main>', '<main style="width:1800px;max-width:none">'
                                '<a href="#absent">不存在的目标</a><img src="missing.png">')
        checks = {c['id']:c for c in self.run_page(source)}
        self.assertFalse(checks['static-layout-390']['passed'])
        self.assertFalse(checks['static-navigation-390']['passed'])
        self.assertFalse(checks['static-images-390']['passed'])
        self.assertFalse(checks['offline-resources']['passed'])
        self.assertNotIn('browser-environment',checks)

    def test_change_checks_real_entry_word_limit_and_original_text(self):
        source,text = self.static()
        source = source.replace('</main>',
            '<a data-testid="kids-link" href="#kids">儿童入口</a>'
            '<section id="kids" data-testid="kids-card"><h2>儿童区</h2>'
            '<p data-testid="kids-copy">长喙与喉囊帮助捕食。它们在水域食物网中扮演角色。</p></section></main>')
        checks = self.run_page(source,phase='change',initialText=text)
        self.assertTrue(all(c['passed'] is True for c in checks),checks)
        checks = {c['id']:c for c in self.run_page(source,phase='change',
                                                  initialText='这段足够长的初始文字被整个删除，应该被保留检查发现。')}
        self.assertFalse(checks['static-preserved']['passed'])

    def test_missing_initial_archive_is_pending_and_svg_placeholders_fail(self):
        source,_ = self.static()
        checks = {c['id']:c for c in self.run_page(source,phase='change')}
        self.assertIsNone(checks['static-preserved']['passed'])
        checks = self.run_page('<!doctype html><html><body><svg viewBox="0 0 640 480"></svg></body></html>',
                               task='01-svg')
        self.assertTrue(any(c['dimensionId']=='pedals' and c['passed'] is False for c in checks))
        self.assertFalse(any(c['passed'] is None for c in checks))

    def test_external_resource_is_blocked(self):
        source,_ = self.static()
        source = source.replace('</main>', '<img src="https://example.invalid/never-download.png"></main>')
        checks = {c['id']:c for c in self.run_page(source)}
        self.assertFalse(checks['offline-resources']['passed'])
        self.assertIn('example.invalid',checks['offline-resources']['message'])

    def test_real_smil_motion_passes_and_detached_feet_fail(self):
        # Deliberately plain geometry tests the observer, not artistic quality.
        source = '''<!doctype html><html><body><svg data-eval="scene" viewBox="0 0 640 480" width="640" height="480">
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -6;0 0;0 0"
keyTimes="0;0.333333;0.416667;0.5;1" dur="6s" repeatCount="indefinite"/>
<g data-eval="bike" stroke="teal" fill="none">
<circle data-eval="wheel-front" cx="230" cy="350" r="40"/><circle data-eval="wheel-back" cx="410" cy="350" r="40"/>
<path d="M230 350L320 270L410 350ZM320 270L320 310"/>
<rect data-eval="seat" x="305" y="262" width="30" height="5"/>
<rect data-eval="handlebar" x="356" y="237" width="20" height="5"/>
<rect data-eval="tray" x="405" y="275" width="30" height="5"/></g>
<ellipse data-eval="pelican" cx="320" cy="240" rx="25" ry="25" fill="white" stroke="black"/>
<path data-eval="wing-left" d="M330 239L365 240" stroke="black"/>
<path data-eval="wing-right" d="M330 243L365 240" stroke="black"/>
<g data-eval="head"><animateTransform attributeName="transform" type="rotate" values="0 320 210;0 320 210;20 320 210;0 320 210" keyTimes="0;0.666667;0.833333;1" dur="6s" repeatCount="indefinite"/><circle cx="320" cy="210" r="15"/></g>
<g><animateTransform attributeName="transform" type="rotate" from="0 320 310" to="360 320 310" dur="1s" repeatCount="indefinite"/>
<circle data-eval="pedal-left" cx="335" cy="310" r="5"/><circle data-eval="pedal-right" cx="305" cy="310" r="5"/>
<circle data-eval="foot-left" cx="335" cy="310" r="4"/><circle data-eval="foot-right" cx="305" cy="310" r="4"/></g>
<g data-eval="pudding"><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -30;0 0;0 0" keyTimes="0;0.5;0.583333;0.666667;1" dur="6s" repeatCount="indefinite"/><circle cx="420" cy="263" r="12"/></g>
</g></svg></body></html>'''
        checks = self.run_page(source,task='01-svg')
        self.assertTrue(all(c['passed'] is True for c in checks),checks)
        broken = source.replace('data-eval="foot-left" cx="335"', 'data-eval="foot-left" cx="355"')
        checks = {c['id']:c for c in self.run_page(broken,task='01-svg')}
        self.assertFalse(checks['svg-feet-on-pedals']['passed'])

    def test_game_touch_capability_exists_before_application_initializes(self):
        source = '''<!doctype html><html><body><p>触控环境检查</p><script>
if (!navigator.maxTouchPoints || !matchMedia('(pointer:coarse)').matches)
  throw new Error('游戏初始化时没有触屏能力，后续只改窗口尺寸并不足够');
</script></body></html>'''
        checks = {c['id']:c for c in self.run_page(source,task='04-game2d')}
        self.assertTrue(checks['runtime-errors']['passed'],checks)
        self.assertFalse(any(c['passed'] is None for c in checks.values()),checks)


if __name__ == '__main__':
    unittest.main()
