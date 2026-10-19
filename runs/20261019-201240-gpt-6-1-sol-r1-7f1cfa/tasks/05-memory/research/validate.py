# -*- coding: utf-8 -*-
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote, quote
from urllib.request import Request, urlopen
import hashlib, json, re, subprocess, xml.etree.ElementTree as ET
OUT=Path('output');manifest=json.loads(Path('materials/manifest.json').read_text())
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.cites=[];self.articles=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='article':self.articles.append(a.get('id'))
  for attr in ('src','href'):
   if attr in a:self.refs.append(a[attr])
  if a.get('data-source'):self.cites.append(a)
html=OUT.joinpath('index.html').read_text();parser=Parser();parser.feed(html)
assert len(parser.ids)==len(set(parser.ids)), 'duplicate IDs'
assert parser.articles==['q1','q2','q3','q4','q5','q6']
for ref in parser.refs:
 u=urlsplit(ref);assert not u.scheme and not u.netloc,ref
 if not u.path:assert unquote(u.fragment) in parser.ids,ref;continue
 f=OUT/unquote(u.path);assert f.resolve().is_relative_to(OUT.resolve()) and f.is_file(),ref
sources=json.loads(OUT.joinpath('source-data.js').read_text()[len('window.SOURCES='):-1])
for a in parser.cites:
 s=sources[a['data-source']];assert a['data-page'] in s['pages'],a
 if a.get('data-range'):
  ends=list(map(int,a['data-range'].split('–')))
  for k in range(ends[0],ends[-1]+1):assert f'{k:04}' in s['pages'],(a,k)
required=set('P01 P02 P03 P04 P05 P08 P14 P15 P16 P17 P18 P21 M01 M02 M03 M04 M06 M07 M09 M14 M15 M16 M17 M18 M19 M20 M24'.split())
bodycites=json.loads(OUT.joinpath('citations.json').read_text());assert required<={x[0] for x in bodycites}
hashcount=0;copied=0
for p in manifest['papers']:
 for field,hashfield in [('pdf','pdfSha256'),('text','textSha256')]:
  original=Path('materials')/p[field];digest=hashlib.sha256(original.read_bytes()).hexdigest();assert digest==p[hashfield],str(original);hashcount+=1
  if p['id'] in required:
   f=OUT/'sources'/original.name;assert hashlib.sha256(f.read_bytes()).hexdigest()==digest;copied+=1
for sec in manifest['novel']['sections']:
 f=Path('materials/novel')/sec['file'];assert hashlib.sha256(f.read_bytes()).hexdigest()==sec['sha256'];hashcount+=1
 assert (OUT/'sources'/f.name).read_bytes()==f.read_bytes();copied+=1
svgcount=0
for svg in re.findall(r'<svg\b.*?</svg>',html,re.S):ET.fromstring(svg);svgcount+=1
assert svgcount==3
snapshots=json.loads(OUT.joinpath('snapshots.js').read_text()[len('window.SNAPSHOTS='):-1]);assert len(snapshots)==30
for name in snapshots:assert (OUT/'assets'/(name+'.png')).read_bytes().startswith(b'\x89PNG\r\n\x1a\n')
for name in ['app.js','styles.css','index.html']:
 s=(OUT/name).read_text();assert not re.search(r'https?://|localhost|127\.0\.0\.1|localStorage|sessionStorage|indexedDB|serviceWorker|window\.parent|window\.top',s,re.I),name
subprocess.run(['node','--check','output/app.js'],check=True)
httpcount=0
for f in sorted(OUT.rglob('*')):
 if not f.is_file() or f.name=='validation.json':continue
 relative=str(f.relative_to(OUT));url='http://127.0.0.1:8765/output/'+quote(relative)
 with urlopen(Request(url,method='HEAD'),timeout=10) as r:assert r.status==200,(relative,r.status)
 httpcount+=1
for file in ['index.html','styles.css','app.js','source-data.js','snapshots.js','assets/M24-p2.png']:
 with urlopen('http://127.0.0.1:8765/output/'+quote(file),timeout=10) as r:assert r.read()==(OUT/file).read_bytes()
result={'status':'passed','html_chapters':6,'body_citations':len(bodycites),'all_source_buttons_checked':len(parser.cites),'core_papers_cited':len(required),'pdf_page_images':len(snapshots),'inline_svg_valid_xml':svgcount,'original_material_hashes_verified':hashcount,'copied_source_files_verified':copied,'http_HEAD_200_resources':httpcount,'http_GET_byte_matches':6,'javascript_syntax':'node --check passed','browser_checks_observed':['chapter navigation and section anchors','full-report search and result navigation','PDF page image and source next page','novel exact range with adjacent context','postselection calculator normal and boundary inputs','M24 formula slider default and endpoints','actual sandbox=allow-scripts iframe without allow-same-origin','390px iframe responsive layout','sandbox calculator live input','standalone and sandbox browser error logs empty'],'not_run':['cosmological likelihood fits','quantum simulation or hardware experiments','formal certification of all mathematical proofs','print/PDF export'],'known_limits':['wide evidence tables and network graphs use horizontal scroll on narrow viewports','raw PDF/text links opening a new tab may be blocked by a host sandbox; inline source text and supplied page images remain available']}
(OUT/'validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps(result,ensure_ascii=False,indent=2))
