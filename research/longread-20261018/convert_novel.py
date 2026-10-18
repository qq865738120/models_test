"""Convert only the user-provided EPUB, preserving spine order and paragraph anchors."""
import hashlib,json,re,shutil,posixpath
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as E
source=Path('/Users/zhengwenjun/Downloads/三体3：死神永生 (刘慈欣) (z-library.sk, 1lib.sk, z-lib.sk).epub')
root=Path(__file__).parent;dest=root/'novel';dest.mkdir(exist_ok=True)
source_hash=hashlib.sha256(source.read_bytes()).hexdigest()
shutil.copyfile(source,dest/'source.epub')
sections=[];paragraphs=[];current=None;spine_records=[];images=[]
def normalized(s):return re.sub(r'\s+',' ',s).strip()
def render(el):
 result=el.text or ''
 for child in el:
  if child.tag.split('}')[-1]=='img':
   alt=child.get('alt','')
   result+=('〔原书注：'+alt+'〕') if alt and alt!='qiu' else ''
  else:result+=render(child)
  result+=child.tail or ''
 return result
with ZipFile(source) as z:
 c=E.fromstring(z.read('META-INF/container.xml'));opf=c.find('.//{*}rootfile').get('full-path');package=E.fromstring(z.read(opf));folder=posixpath.dirname(opf)
 items={x.get('id'):x.get('href') for x in package.find('{*}manifest')}
 for item in package.find('{*}spine'):
  path=posixpath.normpath(posixpath.join(folder,items[item.get('idref')]))
  body=E.fromstring(z.read(path)).find('{*}body');blocks=[]
  for el in body.iter():
   tag=el.tag.split('}')[-1]
   if tag in ('h1','h2','h3','p'):
    text=normalized(render(el))
    if not text:continue
    blocks.append(normalized(''.join(el.itertext())))
    if tag.startswith('h') or current is None:
     current={'id':f'N{len(sections)+1:03}','title':text if tag.startswith('h') else '卷首资料','paragraphs':[],'sources':[]};sections.append(current)
     if tag.startswith('h'):continue
    paragraph={'id':f'{current["id"]}-P{len(current["paragraphs"])+1:04}','text':text,'source':path}
    current['paragraphs'].append(paragraph);paragraphs.append(paragraph)
    if path not in current['sources']:current['sources'].append(path)
   if tag=='img':images.append({'source':path,'image':el.get('src'),'alt':el.get('alt','')})
  # Preserve every non-whitespace character in the body, except image-only cover.
  body_text=re.sub(r'\s+','',''.join(body.itertext()));block_text=re.sub(r'\s+','',''.join(blocks))
  assert body_text==block_text,('unhandled text',path)
  spine_records.append({'entry':path,'blocks':len(blocks),'characters':len(body_text)})
alltext=[]
for section in sections:
 text=f'[{section["id"]}] {section["title"]}\n\n'+'\n\n'.join(f'[{p["id"]}] {p["text"]}' for p in section['paragraphs'])+'\n'
 name=section['id']+'.txt';(dest/name).write_text(text);section['file']=name;section['sha256']=hashlib.sha256((dest/name).read_bytes()).hexdigest();alltext.append(text)
full='\n'.join(alltext);(dest/'novel.txt').write_text(full)
index=[{'id':s['id'],'title':s['title'],'file':s['file'],'paragraphCount':len(s['paragraphs']),'sources':s['sources'],'sha256':s['sha256']} for s in sections]
meta={'title':'三体Ⅲ：死神永生','author':'刘慈欣','sourceKind':'user-provided EPUB','sourceFile':'source.epub','sourceSha256':source_hash,'status':'converted','publicationNote':'用户指定作品；非新发表小说，不宣称排除训练数据重合。','usage':'用户提供文件，仅用于此本地评测；不发布小说全文到外部站点。','spine':spine_records,'sections':index,'paragraphs':len(paragraphs),'characters':sum(len(p['text']) for p in paragraphs),'fullText':'novel.txt','fullTextSha256':hashlib.sha256((dest/'novel.txt').read_bytes()).hexdigest(),'images':images,'conversion':'EPUB spine order; all body text checked for loss; section and paragraph anchors added; no summarization.'}
(dest/'manifest.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
(dest/'INDEX.md').write_text('# 三体Ⅲ：死神永生\n\n本地提供的EPUB转换；全文未缩写。引用采用Nxxx-Pxxxx节段编号。正文中的纪年与排序保留原书结构。\n\n'+ '\n'.join(f'- [{s["id"]} · {s["title"]}]({s["file"]})（{s["paragraphCount"]}段）' for s in index)+'\n')
m=json.loads((root/'manifest.json').read_text());m['novel']={k:v for k,v in meta.items() if k not in ('spine','images')};m['complete']=True;(root/'manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:meta[k] for k in ('title','paragraphs','characters','images')},ensure_ascii=False));print('sections',len(sections),'spine entries',len(spine_records))
for s in index:print(s['id'],s['title'],s['paragraphCount'])
