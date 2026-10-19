import sys,re,pathlib
for spec in sys.argv[1:]:
 id,ran=spec.split(':'); path=next(pathlib.Path('materials/papers').glob(id+'-*.txt')); text=path.read_text(); pages=re.split(r'\[PDF page (\d+)\]',text)
 nums=set()
 for r in ran.split(','):
  a,*b=r.split('-');nums.update(range(int(a),int(b[0] if b else a)+1))
 for i in range(1,len(pages),2):
  if int(pages[i]) in nums:print('\n===='+id+' PDF '+pages[i]+'====\n'+pages[i+1])
