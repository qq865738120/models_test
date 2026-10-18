import urllib.request,urllib.parse,xml.etree.ElementTree as E,json,time
from pathlib import Path
root=Path(__file__).parent
queries={
 'physics-cosmology':'(ti:DESI OR abs:DESI) AND (ti:"dark energy" OR ti:cosmological OR ti:gravity)',
 'physics-quantum':'(ti:"quantum error correction" OR ti:"logical qubit" OR ti:"surface code")',
 'math-pde':'cat:math.AP AND (ti:uniqueness OR ti:nonuniqueness OR ti:non-uniqueness) AND (abs:"Navier-Stokes" OR abs:Euler)',
 'math-zeta':'cat:math.NT AND (ti:"zero density" OR ti:"zero-density" OR ti:"zero-free" OR ti:"Riemann zeta" OR ti:"Riemann hypothesis")'
}
ns={'a':'http://www.w3.org/2005/Atom','x':'http://arxiv.org/schemas/atom'}
all=[]
for group,q in queries.items():
 query=q+' AND submittedDate:[202501010000 TO 202610182359]'
 url='https://export.arxiv.org/api/query?'+urllib.parse.urlencode({'search_query':query,'max_results':30,'sortBy':'submittedDate','sortOrder':'descending'})
 xml=urllib.request.urlopen(url,timeout=60).read();(root/(group+'.xml')).write_bytes(xml)
 for el in E.fromstring(xml).findall('a:entry',ns):
  get=lambda key: ' '.join((el.findtext('a:'+key,default='',namespaces=ns)).split())
  id=get('id').split('/abs/')[-1]
  all.append({'group':group,'arxiv':id,'title':get('title'),'published':get('published'),'updated':get('updated'),'summary':get('summary'),'authors':[a.findtext('a:name',namespaces=ns) for a in el.findall('a:author',ns)],'categories':[a.attrib['term'] for a in el.findall('a:category',ns)],'url':'https://arxiv.org/abs/'+id,'pdf':'https://arxiv.org/pdf/'+id})
 print(group,len([r for r in all if r['group']==group]),flush=True)
 time.sleep(3)
(root/'candidates.json').write_text(json.dumps(all,ensure_ascii=False,indent=2))
for r in all:print(r['group'],r['arxiv'],r['title'])
