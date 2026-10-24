from pathlib import Path
import json, re
root = Path(__file__).resolve().parents[1]
js_path = max((root / 'output/assets').glob('index-*.js'), key=lambda p: p.stat().st_mtime)
js = js_path.read_text()
marker = re.search(r"this\.load\.svg\((\w+),`materials/sprites/\$\{\1\}\.svg`\)", js)
if not marker:
    raise RuntimeError('SVG loader not found')
var = marker.group(1)
js = js[:marker.start()] + f"this.load.svg({var},window.__svg[{var}])" + js[marker.end():]
games = list(re.finditer(r"new \w+\.Game\(", js))
if not games:
    raise RuntimeError('Game constructor not found')
game = games[-1]
pos = game.start()
js = js[:pos] + 'window.__game=' + js[pos:]
assets = {}
for path in (root / 'public/materials/sprites').glob('*.svg'):
    assets[path.stem] = 'data:image/svg+xml;base64,' + __import__('base64').b64encode(path.read_bytes()).decode()
html = '''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body,#app{margin:0;width:100%;height:100%;overflow:hidden;background:#17324a}canvas{display:block}</style></head><body><div id="app"></div><script>window.__svg=''' + json.dumps(assets) + ''';
try {''' + js + '''} catch (error) { document.body.innerHTML='<pre style="color:white">'+error.stack+'</pre>'; console.error(error); }</script></body></html>'''
(root / '.runtime/test.html').write_text(html)
print(root / '.runtime/test.html')
