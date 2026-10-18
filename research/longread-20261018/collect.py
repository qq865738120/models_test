import urllib.request,urllib.parse,xml.etree.ElementTree as E,json,time,re,hashlib
from pathlib import Path
from pypdf import PdfReader
root=Path(__file__).parent
sets={
'physics-cosmology':['2610.20720','2609.26517','2609.37437','2608.19883','2609.40176','2610.01836','2610.05729','2610.14354','2609.31113','2609.35317','2610.20716','2610.20002','2610.10585'],
'physics-quantum':['2610.21357','2610.13589','2610.02734','2610.06059','2609.40279','2610.03399','2610.03869','2610.00504','2610.03682','2610.04613','2610.06811','2610.17612'],
'math-pde':['2610.11193','2610.14383','2609.08158','2609.01697','2610.11927','2608.17456','2609.14688','2610.16874','2610.18178','2610.10341','2609.17962','2608.29721','2608.29138'],
'math-zeta':['2609.02882','2610.01035','2609.27715','2609.22624','2609.16048','2608.12257','2608.07399','2608.31060','2608.14852','2610.05227','2609.07918','2609.26787']}
ns={'a':'http://www.w3.org/2005/Atom','x':'http://arxiv.org/schemas/atom'}
def get(url):
 for attempt in range(3):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'PelicanBenchmark/1.0 (local research corpus)'}),timeout=90) as r:return r.read()
  except Exception:
   if attempt==2:raise
   time.sleep(5*(attempt+1))
ids=[i for group in sets.values() for i in group]
meta_path=root/'selection-recent.xml'
if not meta_path.exists():meta_path.write_bytes(get('https://export.arxiv.org/api/query?'+urllib.parse.urlencode({'id_list':','.join(ids),'max_results':50})))
metas={}
for el in E.fromstring(meta_path.read_bytes()).findall('a:entry',ns):
 f=lambda key:' '.join(el.findtext('a:'+key,default='',namespaces=ns).split())
 ver=f('id').split('/abs/')[-1];base=ver.split('v')[0]
 metas[base]={'arxiv':ver,'title':f('title'),'published':f('published'),'updated':f('updated'),'abstract':f('summary'),'authors':[a.findtext('a:name',namespaces=ns) for a in el.findall('a:author',ns)],'categories':[a.attrib['term'] for a in el.findall('a:category',ns)],'journalRef':el.findtext('x:journal_ref',default='',namespaces=ns),'doi':el.findtext('x:doi',default='',namespaces=ns),'source':'https://arxiv.org/abs/'+ver,'pdfUrl':'https://arxiv.org/pdf/'+ver}
assert len(metas)==50,(len(metas),set(ids)-set(metas))
(root/'papers').mkdir(exist_ok=True)
records=[]
for group,keys in sets.items():
 for key in keys:
  r=dict(metas[key],group=group,id=('P' if group.startswith('physics') else 'M')+str(sum(1 for x in records if x['group'].startswith(group.split('-')[0]))+1).zfill(2))
  assert r['published'][:10]>='2026-08-01' and r['updated'][:10]<='2026-10-18'
  name=r['id']+'-'+r['arxiv'];pdf=root/'papers'/(name+'.pdf');txt=pdf.with_suffix('.txt')
  if not pdf.exists():
   data=get(r['pdfUrl']);assert data.startswith(b'%PDF-'),r['id'];pdf.write_bytes(data);time.sleep(3)
  reader=PdfReader(pdf);pages=[]
  for i,page in enumerate(reader.pages):pages.append(f'\n[PDF page {i+1}]\n'+(page.extract_text() or ''))
  text='\n'.join(pages);assert len(text)>1000,(r['id'],len(text))
  txt.write_text(text,encoding='utf-8')
  r.update(pdf=pdf.relative_to(root).as_posix(),text=txt.relative_to(root).as_posix(),pages=len(pages),characters=len(text),pdfSha256=hashlib.sha256(pdf.read_bytes()).hexdigest(),textSha256=hashlib.sha256(txt.read_bytes()).hexdigest())
  records.append(r);(root/'manifest.json').write_text(json.dumps({'version':'longread-20261018','cutoff':'2026-10-18','papers':records},ensure_ascii=False,indent=2))
  print(r['id'],r['arxiv'],r['pages'],r['title'],flush=True)

manifest=json.loads((root/'manifest.json').read_text());manifest.update(papersComplete=True,complete=False,novel={'status':'awaiting-authorized-web-novel'},selectionPolicy={'publishedFrom':'2026-08-01','publishedThrough':'2026-10-18','physics':25,'mathematics':25,'fixedVersions':True});(root/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));print('PAPERS COMPLETE',len(records),'papers',sum(r['pages'] for r in records),'pages',flush=True)
