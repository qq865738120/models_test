from fractions import Fraction as F
from itertools import product, combinations_with_replacement

def om(z,m,b=F(0),c=F(0)):
 x=1+z
 return ((m*x**3+1-m)/(1+b*z+c*z*z)**2-1)/(x**3-1)

def glitch(z,r,m,a):
 x=1+z; lam=1/r-m-a
 e=r*(m*x**3+a*x**4+lam)
 return (e-1)/(x**3-1),(r-1)*(m*x**3+a*x**4)+r*lam,lam

def qnoise(p,eta,h):
 x=p/(2*(1+eta));z=eta*p/(1+eta)
 return [(1-p,(0,0)),(z if h else x,(1,0)),(x,(1,1)),(x if h else z,(0,1))]

def post(p1,p2,e1,e2,code,tau):
 y=F(0); f=F(0)
 for (w1,(a,b)),(w2,(c,d)) in product(qnoise(p1,e1,code[0]=='H'),qnoise(p2,e2,code[1]=='H')):
  if {(0,0):3,(1,0):2,(0,1):1,(1,1):0}[(a^c,b^d)]>=tau:
   y+=w1*w2
   if a^d^(c&b): f+=w1*w2
 return y,f,f/y

def derivative(p1,p2,e1,e2,code,tau,i):
 y,f,l=post(p1,p2,e1,e2,code,tau)
 if i==1:
  y0,f0,_=post(F(0),p2,e1,e2,code,tau);y1,f1,_=post(F(1),p2,e1,e2,code,tau)
 else:
  y0,f0,_=post(p1,F(0),e1,e2,code,tau);y1,f1,_=post(p1,F(1),e1,e2,code,tau)
 return ((f1-f0)*y-f*(y1-y0))/y**2

def bank(r,t,two=False):
 e=F(1,(t+1)**2);f=F(1,t+1)
 n=r*(8*t*t+8*t-3)+4*t;k=2*r-4
 zero=(1-e)**r
 if two:
  double=F(r*(r-1),2)*e*e*(1-e)**(r-2)
  y=zero+double;bad=double*(2*f-f*f)
 else:
  one=r*e*(1-e)**(r-1)
  y=zero+one;bad=one*f
 return n,k,y,bad/y

b=F(1,10);m=(F(3,5)+2*b)/3; D=1+b;A=1+7*m;E=A/D**2;Ep=12*m/D**2-2*b*A/D**3
print('P01',m,(m-F(1,6))*8,om(1,m,b),(Ep*7-(E-1)*12)/49)
cand=[]
for n in range(1,10):
 for j in range(26):
  mm=F(1,8)+F(n,10)**3;b=F(j,100)
  if om(1,mm,b)==F(3203,11449) and om(2,mm,b)==F(10708,42237):cand.append((n,j,F(n,10)**4))
print('P02',cand)
cand=[]
for n in range(1,10):
 for j in range(26):
  mm=F(1,10)+F(n,10)**3;b=F(j,100)
  if mm<1 and 3*mm-2*b>0 and F(1,5)<=om(1,mm,b)<=F(1,4) and F(1,6)<=om(2,mm,b)<=F(1,5):cand.append((n,j,om(2,mm,b)))
print('P03',sorted(cand,key=lambda x:(-x[0],x[1]))[:8],len(cand))
a=F(1,100);o1=F(873,2800);o2=F(333,1040);g1=F(15,7);g2=F(40,13)
rr=(o2-o1)/(a*(g2-g1));mm=o1/rr-a*g1
print('P04',rr,mm,glitch(2,rr,mm,a),'u3',mm-F(1,5))
mm=F(1,2);aa=F(1,162);rr=1-(1-mm-aa)/(26*mm+80*aa)
print('P05',rr,1-1/rr,glitch(2,rr,mm,aa))
cand=[]
for n in range(1,10):
 for j in range(80,101):
  rr=F(j,100);mm=F(1,10)+F(n,10)**3;aa=F(1,200)
  oo,de,ll=glitch(2,rr,mm,aa)
  if ll>0 and de>=0 and F(1,4)<=oo<=F(1,3):cand.append((n,j,de,oo))
print('P06',sorted(cand,key=lambda x:(-x[0],x[1]))[:8],len(cand))
p1=F(1,5);p2=F(1,4)
for code in ['II','IH','HI','HH']:
 for tau in (1,2,3):
  y,f,l=post(p1,p2,3,2,code,tau)
  print('noise',code,tau,y,l,derivative(p1,p2,3,2,code,tau,1),derivative(p1,p2,3,2,code,tau,2))
b=F(1,7);m=(F(32,35)+2*b)/3;c=(6*m-12*b*m+6*b*b-F(394,245))/4
print('XP01',m,c,(m-F(1,5))/F(2,3)**3,om(1,m,b,c))
rr=F(19,20);o1=F(27949,50400);o2=F(52459,93600)
a=(o2-o1)/(rr*(g2-g1));m=o1/rr-a*g1
print('XP02',m,a,'u3',(m-F(1,8))/F(3,2),'lambda',1/rr-m-a)
p1=F(1,6);p2=F(1,3);y,f,l=post(p1,p2,4,3,'IH',1)
print('XP03',y,l,p1*derivative(p1,p2,4,3,'IH',1,1)+p2*derivative(p1,p2,4,3,'IH',1,2))
bks=[(r,t,*bank(r,t)) for r in (4,6,8,10,12) for t in (3,4,5,6,7)]
feasible=[x for x in bks if x[2]<=3500 and x[5]<=F(1,20)]
print('P10',sorted(feasible,key=lambda x:(-x[3]*x[4]/x[2],x[2],x[0],x[1]))[:4])
feasible=[x for x in bks if x[3]*x[4]>=12 and x[5]<=F(1,25)]
print('P11',sorted(feasible,key=lambda x:(x[2],x[0],x[1]))[:4])
feasible=[]
for A,B in combinations_with_replacement(bks,2):
 ra,ta,na,ka,ya,la=A;rb,tb,nb,kb,yb,lb=B
 n=na+nb;l=1-(1-la)*(1-lb);val=(ka+kb)*ya*yb
 if n<=6500 and l<=F(1,15):feasible.append((A,B,n,l,val))
print('P12',sorted(feasible,key=lambda x:(-x[4],x[2],x[0][0],x[0][1],x[1][0],x[1][1]))[:4])
feasible=[]
for r in (4,6,8,10,12):
 for t in (3,4,5,6,7):
  n,k,y,l=bank(r,t,True)
  if n<=3500 and l<=F(1,100):feasible.append((r,t,n,k,y,l))
print('XP04',sorted(feasible,key=lambda x:(-x[3]*x[4]/x[2],x[2],x[0],x[1]))[:4])
