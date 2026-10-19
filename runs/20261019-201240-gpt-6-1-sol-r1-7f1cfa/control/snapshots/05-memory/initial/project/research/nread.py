import pathlib,re,sys
for spec in sys.argv[1:]:
 id,ran=spec.split(':');p=pathlib.Path('materials/novel')/(id+'.txt'); nums=set()
 for r in ran.split(','):
  a,*b=r.split('-');nums.update(range(int(a),int(b[0] if b else a)+1))
 for line in p.read_text().splitlines():
  m=re.match(r'\[N\d+-P(\d+)\]',line)
  if m and int(m[1]) in nums:print(line+'\n')
