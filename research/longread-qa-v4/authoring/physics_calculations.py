"""Host-only reduced v4 physics builder and exact two-method verifier; 6+2 items. Never candidate material."""
from fractions import Fraction as F
from pathlib import Path
from itertools import product
import json, math, re
ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).parent
CORP=ROOT/'research/longread-20261018/papers'
texts={p.name[:3]:(p,p.read_text()) for p in CORP.glob('P*.txt')}
out={'version':'longread-qa-v4','questions':{'initial':[],'change':[]},'answers':{'initial':[],'change':[]}}
def fmt(x):return str(x) if not isinstance(x,F) or x.denominator!=1 else str(x.numerator)
def evidence(src,start,end):
 p,s=texts[src]; a=s.index(start); b=s.index(end,a)+len(end); q=s[a:b]
 page=re.findall(r'\[PDF page (\d+)\]',s[:a])[-1]
 return {'source':src,'path':str(p.relative_to(ROOT)),'locator':'PDF page '+page,'quote':q}
EV={
 'thermal':evidence('P13','For a thermally distributed sterile neutrino','(6)'),
 'suscept':evidence('P02','H2(z) =H 2\n0','where we have usedH 2'),
 'om':evidence('P04','Om(z)≡','whereE(z) :=H(z)/H 0'),
 'glitch':evidence('P05','Ωg ≡1− GN','whereρ nonDE contains matter, radiation, and neutri-'),
 'cd':evidence('P15','2.The Schr¨ odinger picture:','withIthe'),
 'score':evidence('P19','Definition 1(Noise sensitivity).','(6)'),
 'yield':evidence('P21','Given a confidence scores(x)','conditional LER is defined when the yield is non-zero.'),
 'footprint':evidence('P14','concatenate four distance-trotated','with nn connectivity, see Fig. 1.'),
 'chain':evidence('P23','Suppose level-1 to level-(i−1)','encoding rate converges to one in the large-rlimit.'),
 'seed':evidence('P23','Proposition 1.LetP prob,X','The same holds\nfor X checks for Z errors.')}
ID_MAP={'P02': 'P01', 'P03': 'P02', 'P04': 'P03', 'P05': 'P04', 'P08': 'P05', 'P12': 'P06', 'XP01': 'XP01', 'XP04': 'XP02'}
def add(id,q,parts,ans,ev,steps,deps,scope):
 id=ID_MAP[id]
 phase='change' if id.startswith('X') else 'initial'; i=int(id[-2:]); w=(17 if phase=='change' else [6,6,6,6,5,5][i-1])
 out['questions'][phase].append({'id':id,'domain':'physics','question':q+' 按所列字段顺序，以 ASCII 分号分隔，只填精确值。','answerType':'structured','answerParts':[{'name':n,'kind':k} for n,k in parts],'weight':w,'scoring':'exact'})
 out['answers'][phase].append({'id':id,'answer':';'.join(map(fmt,ans)),'evidence':[EV[x] for x in ev],'derivation':steps,'dependencies':[{'source':s,'contribution':c} for s,c in deps],'ablation':'；'.join('去掉'+src+'后不能确定'+con for src,con in deps)+'。题设没有提供上述原文关系，不能只靠其余独立输入唯一恢复。','claimScope':scope,'difficultyRationale':'必须先定位适用模型及归一化，再将前一步输出代入下一来源的定义，最后完成精确逆推、商法则或有限约束优化；没有选项识别线索。'})
# Cosmology: thermal effective mass -> matter -> squared susceptibility -> Om.
def sus(m,b,z):
 x=1+z; e=(m*x**3+1-m)/(1+b*z)**2
 ep=3*m*x*x/(1+b*z)**2-2*b*(m*x**3+1-m)/(1+b*z)**3
 om=(e-1)/(x**3-1)
 op=(ep*(x**3-1)-(e-1)*3*x*x)/(x**3-1)**2
 # independent polynomial quotient at rational h: recover derivative using symbolic numerator coefficients
 # independent expanded polynomial quotient using coefficient arithmetic
 nc=[F(0),3*m-2*b,3*m-b*b,m]
 dc=[F(0),F(3),3+6*b,1+6*b+3*b*b,2*b+3*b*b,b*b]
 val=lambda cs:sum(c*z**i for i,c in enumerate(cs))
 der=lambda cs:sum(i*c*z**(i-1) for i,c in enumerate(cs) if i)
 assert om==val(nc)/val(dc)
 assert op==(der(nc)*val(dc)-val(nc)*der(dc))/val(dc)**2
 return e,om,op
cintro='仅作合成的低红移背景计算：使用资料中热分布、较低温度的 sterile relic 定义，将其非相对论有效质量按 Ωs=ms,eff/(1 eV) 计入物质；其余物质 Ωb 固定，Ωm=Ωb+Ωs。忽略辐射，真实 Ωde=1−Ωm。采用时变 gravitational susceptibility 模型的归一化背景式，令 (1+S(z))/(1+S(0))=1+bz。使用资料定义的 Om(z)，所有密度均为该背景式的真密度。此合成记账不声称是原论文联合拟合。'
cdeps=[('P13','温度四次方与有效质量三次方的不同映射'),('P02','H² 中归一化 susceptibility 的平方而非一次方'),('P04','Om 的 H0 归一化与红移分母')]
# P01 inverse mass using derivative
m=F(4,15); b=F(1,10); ms=(m-F(1,6))/F(1,2)**3;e,o,op=sus(m,b,F(1))
# P02 finite inverse calibration
m=F(1,8)+F(3,5)**3;b=F(7,100); target1=sus(m,b,F(1))[1];target2=sus(m,b,F(2))[1]
sol=[]
for n,j in product(range(1,10),range(26)):
 mm=F(1,8)+F(n,10)**3;bb=F(j,100)
 if sus(mm,bb,F(1))[1]==target1 and sus(mm,bb,F(2))[1]==target2:sol.append((n,j))
assert sol==[(6,7)]
add('P02',cintro+f' 取 Ωb=1/8、ms=1 eV。实验仪的温度比仅可能为 n/10（整数1≤n≤9），b仅可能为 j/100（整数0≤j≤25）。两次测量给 Om(1)={target1}、Om(2)={target2}。同时满足二者时，求 n、j、ΔNeff；必须用同一组隐参数同时解释两红移。',[('n','integer'),('j','integer'),('DeltaNeff','rational')],[6,7,F(3,5)**4],['thermal','suscept','om'],f'枚举234组而非独立拟合两个点；每组 m=1/8+(n/10)³；两个 Om 联合筛选仅 {(6,7)}；ΔN=(3/5)^4={F(3,5)**4}。第二方法代入两个有理多项式并交叉相乘核验，两者同时为零。',cdeps,'离散合成参数反演，非真实观测约束。')
# P03 optimization thermal abundance, b permits bounded Om distortion
feas=[]
for n,j in product(range(1,10),range(26)):
 mm=F(1,10)+F(n,10)**3;bb=F(j,100)
 if mm>=1:continue
 o1=sus(mm,bb,F(1))[1];o2=sus(mm,bb,F(2))[1]
 if F(1,5)<=o1<=F(1,4) and F(1,6)<=o2<=F(1,5) and 3*mm-2*bb>0:
  feas.append((n,-j,mm,o1,o2))
best=max(feas);n,nj,mm,o1,o2=best;j=-nj
add('P03',cintro+' 取 Ωb=1/10、ms=1 eV，温度比=n/10（1≤n≤9的整数），b=j/100（0≤j≤25的整数）。要求 Ωm<1、[d(H²/H0²)/dz]0>0、1/5≤Om(1)≤1/4、1/6≤Om(2)≤1/5。最大化 sterile 有效质量；如并列，取最小 b。求 n、j、该方案 Om(2)。',[('n','integer'),('j','integer'),('Om(2)','rational')],[n,j,o2],['thermal','suscept','om'],f'共{len(feas)}可行格点。按 ms,eff=(n/10)^3 的严格单调性先最大 n，再最小 j。最优 n={n},j={j},m={mm},Om1={o1},Om2={o2}。逐点 Fraction 与 展开多项式 导数一致；反序排序再筛选给同一结果。',cdeps,'有限设计优化；闭区间边界按精确分数比较。')
# XP01 different susceptibility shape inverse two derivative coefficients
m=F(2,5);u=F(2,3);ms=(m-F(1,5))/u**3;b=F(1,7);c=F(2,35)
D1=3*m-2*b;D2=6*m-12*m*b+6*b*b-4*c
# supplied derivative pair fixes m then c, b fixed
E=(1+7*m)/(1+b+c)**2; O=(E-1)/7
add('XP01',cintro.replace('1+bz','1+bz+cz²')+f' 改为二次 susceptibility，Ωb=1/5，Ts/Tν=2/3，b=1/7。未知 ms 与 c；测得 E²′(0)={D1}、E²″(0)={D2}，E=H/H0。求 ms/eV、c、Om(1)。',[('ms/eV','rational'),('c','rational'),('Om(1)','rational')],[ms,c,O],['thermal','suscept','om'],f'E²′=3m-2b; E²″=6m-12mb+6b²-4c。先 m={m} 后 ms={ms}，再 c={c}，最终 Om1={O}。二阶展开与解析展开交叉验证。',cdeps,'新增二次形状参数仅为题设，不套用线性近似。')
# Cosmic glitch: use own locally-normalized density bookkeeping, radiation explicit.
gintro='采用资料中 cosmic glitch 的定义与有效暗能量重写，并使用另一资料的热 sterile 定义和 Om 诊断。以下均为合成平直背景：r=Gcosmo/GN>0；m、a、lambda 分别是以 3H0²/(8πGN) 为单位的今日非相对论物质、辐射、常数项密度。非暗能量密度为 m(1+z)³+a(1+z)⁴。今日 E(0)=1 决定 lambda。sterile 已非相对论，其物质贡献为 ms,eff/(1 eV)，其余物质 m_b 另给。取原资料 cosmic glitch 有效暗能量密度为本题 rhoDE，同样以该今日临界密度为单位；不要求 rhoDE 在所有红移为正。'
gdeps=[('P13','由热温度比推有效质量后进入非暗部门'),('P05','G 比值与 glitch 参数互为非线性倒数及有效密度重写'),('P04','从含辐射的 E² 归一化构造 Om，而非直接等同 m')]
def glitch(r,m,a,z):
 lam=1/r-m-a;g=1-1/r;x=1+z;nd=m*x**3+a*x**4;de=(g*nd+lam)/(1-g);E=nd+de
 assert E==r*(nd+lam)
 return (E-1)/(x**3-1),de,lam
r=F(9,10);m=F(1,5)+F(1,2)**3;a=F(1,100)
o1,de1,lam=glitch(r,m,a,F(1));o2,de2,_=glitch(r,m,a,F(2))
# infer r from difference Om then m from Om
rr=(o2-o1)/(a*(F(80,26)-F(15,7))); mm=o1/rr-a*F(15,7)
assert (rr,mm)==(r,m)
add('P04',gintro+f' 取 a=1/100、m_b=1/5、ms=1 eV。未知 r 与温度比 u=Ts/Tν。测得 Om(1)={o1}，Om(2)={o2}。求 r、ΔNeff、rhoDE(2)。',[('r','rational'),('DeltaNeff','rational'),('rhoDE(2)','rational')],[r,F(1,16),de2],['thermal','glitch','om'],f'归一化 lambda=1/r-m-a。Om(z)=r[m+a((1+z)^4-1)/((1+z)^3-1)]。先两点作差 r={rr}，回代 m={mm}，u³=m-1/5=1/8，所以 ΔN=u⁴=1/16。lambda={lam};rhoDE2={de2}。直接修改 Friedmann 与有效密度相加两法一致。',gdeps,'cosmic glitch 为独立背景模型，不与 susceptibility 混同。')
# P05 zero crossing of density engineered at z2, solve r then Om
m=F(1,4)+F(2)*F(1,2)**3;a=F(1,162);nd=m*27+a*81; r=(nd-1)/(nd-m-a);o,de,lam=glitch(r,m,a,F(2));assert de==0
add('P05',gintro+' 取 m_b=1/4、ms=2 eV、ΔNeff=1/16、a=1/162。调节 r，使 rhoDE 恰在 z=2 为零；r 不得等于零。求 r、Omega_g、Om(2)。',[('r','rational'),('Omega_g','rational'),('Om(2)','rational')],[r,1-1/r,o],['thermal','glitch','om'],f'u=1/2,ms,eff=1/4,m=1/2。z2非暗密度={nd}，用 lambda=1/r-m-a 代入 rhoDE=0，r=(nd-1)/(nd-m-a)={r}。g={1-1/r};Om2={o}。有效密度公式与 E²-nd 独立核验为零。',gdeps,'零点是有效暗能量密度零点，不称为 w=-1 crossing。')
# P06 optimization allowed t and r grid
feas=[]
for n,j in product(range(1,10),range(80,101)):
 rr=F(j,100);mm=F(1,10)+F(n,10)**3;aa=F(1,200)
 oo,dd,ll=glitch(rr,mm,aa,F(2))
 if ll>0 and dd>=0 and F(1,4)<=oo<=F(1,3):feas.append((n,-j,oo,dd))
n,nj,oo,dd=max(feas);j=-nj
r=F(19,20);m=F(1,8)+F(3,2)*F(2,3)**3;a=F(1,150);o1,d1,lam=glitch(r,m,a,F(1));o2,d2,_=glitch(r,m,a,F(2))
# QEC: exact code-capacity Pauli permutation, fixed decoder, postselection.
# Tuple is I,X,Y,Z; physically independent errors. Derivative computed both via
# differentiated product and likelihood score; accepted conditional LER via quotient.
paulis=[(0,0),(1,0),(1,1),(0,1)]
def probs(p,eta,cd):
 q=[1-p,p/(2*(1+eta)),p/(2*(1+eta)),p*eta/(1+eta)]
 if cd=='H':q[1],q[3]=q[3],q[1]
 return q

def qe(ps,etas,cds,tau):
 qs=[probs(p,e,c) for p,e,c in zip(ps,etas,cds)]
 Y=F(0);J=F(0);dY=[F(0)]*2;dJ=[F(0)]*2;dY2=[F(0)]*2;dJ2=[F(0)]*2
 for i,k in product(range(4),repeat=2):
  aa,bb=paulis[i];cc,dd=paulis[k];sy=(aa^cc,bb^dd);score={(0,0):3,(1,0):2,(0,1):1,(1,1):0}[sy]
  A=int(score>=tau);L=aa^dd^(cc&bb);pr=qs[0][i]*qs[1][k]
  Y+=A*pr;J+=A*L*pr
  for h,index in enumerate([i,k]):
   sf=-1/(1-ps[h]) if index==0 else 1/ps[h]
   dY[h]+=A*pr*sf;dJ[h]+=A*L*pr*sf
   # independent exact derivative using channel endpoints, multilinearity
   ends=[]
   for v in [F(0),F(1)]:
    pp=ps.copy();pp[h]=v;ppq=[probs(p,e,c) for p,e,c in zip(pp,etas,cds)]
    ends.append(ppq[0][i]*ppq[1][k])
   dY2[h]+=A*(ends[1]-ends[0]);dJ2[h]+=A*L*(ends[1]-ends[0])
 assert dY==dY2 and dJ==dJ2
 Q=J/Y;ds=[(dJ[h]*Y-J*dY[h])/Y**2 for h in range(2)]
 return Y,Q,ds,J
qintro='在一个合成的两位置 code-capacity 噪声实验中，固定代码和解码器，把每个 Pauli 写作 X^a Z^b（忽略相位）。位置1、2独立，各自 pI=1−p，且 pX=pY；偏置定义 η=pZ/(pX+pY)。仅可施加 I 或 H 的 Clifford deformation，按资料的 Schrödinger picture 处理；不得把它当作 circuit-level 等价性。变形后的误差位为(a,b)、(c,d)，记录 syndrome=(a xor c,b xor d)；已固定的 residual logical failure 位 L=a xor d xor (c AND b)。置信分数对 syndrome 00、10、01、11依次为3、2、1、0，按资料的阈值规则接受。本题直接求 post-selected LER 对原始 p1 或 p2 的数学偏导；求导时，阈值、偏置、变形和解码器均保持不变，必须包括接受概率的变化。'
qdeps=[('P15','仅 code-capacity 下 H 对 X/Z 概率的置换'),('P21','阈值包括等号、LER 条件化而非联合失败概率')]
ps=[F(1,5),F(1,4)];etas=[F(3),F(2)];Y,Q,ds,J=qe(ps,etas,'HI',2)
vals=[]
for cds in ['II','IH','HI','HH']:
 for tau in [1,2,3]:
  yy,qq,ss,jj=qe(ps,etas,cds,tau)
  if yy>=F(3,5):vals.append((qq,cds,tau,yy,ss))
# Public order is semantic: ASCII sorts H before I and is wrong here.
cd_order={'II':0,'IH':1,'HI':2,'HH':3}
choice_key=lambda row:(row[0],cd_order[row[1]],row[2])
bst=min(vals,key=choice_key);qq,cds,tau,yy,ss=bst
minimum_ler=min(row[0] for row in vals)
ties=[row for row in vals if row[0]==minimum_ler]
assert {(row[1],row[2]) for row in ties}=={('IH',3),('HI',3)}
assert bst[1:3]==('IH',3)
assert min(vals)[1:3]==('HI',3)  # Regression proves natural ordering differs.
# Independent stable scan in stated order, regardless of enumeration direction.
for candidates in [vals,list(reversed(vals)),sorted(vals,key=lambda row:row[1])]:
 winner=None
 for deformation in ['II','IH','HI','HH']:
  for threshold in [1,2,3]:
   for row in candidates:
    if row[1:3]==(deformation,threshold) and (winner is None or row[0]<winner[0]):winner=row
 assert winner==bst
add('P08',qintro+' 取(p1,p2)=(1/5,1/4)，(η1,η2)=(3,2)。任选两位置 I/H 变形及整数阈值 τ∈{1,2,3}，要求 yield≥3/5，最小化条件 LER。若并列，先按 II<IH<HI<HH 排列，再选最小 τ。求两字母变形代码、τ、条件 LER 对 p2 的导数。',[('deformation','code'),('tau','integer'),('derivative p2','rational')],[cds,tau,ss[1]],['cd','yield'],f'枚举12设计，{len(vals)}满足yield限制。最优{cds},tau={tau},Y={yy},Q={qq},Q2′={ss[1]}。每个设计以两种独立导数方法核验，IH/HI 在 τ=3 时精确并列；用显式 cd_order 排序选 IH，不能用 Python 字符串自然序。反向枚举及显式顺序扫描独立核验。',qdeps,'最优值是精确枚举结果；并不外推到 circuit-level 最佳变形。')
# intervention choose single component and deformation preserving baseline yield cutoff; maximize differential improvement per cost
vals=[]
for cds in ['II','IH','HI','HH']:
 yy,qq,ss,jj=qe(ps,etas,cds,2)
 if yy<F(3,5):continue
 for h,cost in enumerate([F(2),F(1)]):
  benefit=ps[h]*ss[h]/cost
  vals.append((-benefit,cds,h+1,qq,yy))
nb,cds,h,qq,yy=min(vals)
ps2=[F(1,6),F(1,3)];etas2=[F(4),F(3)];Y,Q,ds,J=qe(ps2,etas2,'IH',1)
# uniform multiplicative intervention derivative sum
B=sum(p*s for p,s in zip(ps2,ds))
# Architecture chain + stitched footprint + conditional yield.
aintro='设计合成的 stitched-block memory bank：每个底层块由四个距离t的 rotated patches 按资料的 stitched 结构构成，总 footprint 必须包含 corridor 和测量 ancilla。把 r 个底层块的两个逻辑比特全部用于一次 chain-code 拼接。对底层 [[4,2,2]] outer code，分别选能区分全部单逻辑位及两逻辑位错误的最小独立 X/Z seed；按资料 chain 规则取允许的偶数r。此次只做资源与后选择记账，不宣称额外门操作已实现：chain 检查控制器另需每个独立 chain generator 恰 t 个物理 qubit。每个块独立出现可见 flag 的概率 e=1/(t+1)²；接受置信分数为负 flag 数，阈值−1。已接受时若无 flag 则永不失败；恰一个 flag 时以 f=1/(t+1) 的条件概率失败。一个 accepted shot 保留全部 K 个 chain 逻辑比特。定义有效产出 T=K·yield；失败率用资料的 conditional LER。r∈{4,6,8,10,12}、t∈{3,4,5,6,7}。'
adeps=[('P14','由 inner t 到完整 footprint 8t²+8t−3，且每块编码两个逻辑比特'),('P23','seed 最小大小及偶数 r chain 编码数，决定 K 和附加检查控制器'),('P21','由置信阈值计算保留率与条件逻辑失败，再计算产出')]
def arch(r,t):
 N=r*(8*t*t+8*t-3)+4*t;K=2*r-4;e=F(1,(t+1)**2);f=F(1,t+1)
 p0=(1-e)**r;p1=r*e*(1-e)**(r-1);Y=p0+p1;Q=p1*f/Y;T=K*Y
 # independent bitmask summation of flag configurations
 sy=sj=F(0)
 for mask in range(1<<r):
  h=bin(mask).count("1");pp=e**h*(1-e)**(r-h)
  if h<=1:sy+=pp;sj+=pp*f if h else 0
 assert sy==Y and sj/sy==Q
 return N,K,Y,Q,T
rows=[(r,t,*arch(r,t)) for r,t in product([4,6,8,10,12],[3,4,5,6,7])]
# P10 density objective
fs=[x for x in rows if x[2]<=3500 and x[5]<=F(1,20)]
bst=min(fs,key=lambda x:(-x[6]/x[2],x[2],x[0],x[1]));r,t,N,K,Y,Q,T=bst
# P11 minimum footprint throughput
fs=[x for x in rows if x[6]>=12 and x[5]<=F(1,25)]
bst=min(fs,key=lambda x:(x[2],x[0],x[1]));r,t,N,K,Y,Q,T=bst
# P12 two banks require both accepted; product yield, joint failure and simultaneous capacity
pairs=[]
for idx,x in enumerate(rows):
 for y in rows[idx:]:
  r,t,N,K,Y,Q,T=x;rr,tt,NN,KK,YY,QQ,TT=y
  nt=N+NN;yy=Y*YY;qq=1-(1-Q)*(1-QQ);tr=(K+KK)*yy
  if nt<=6500 and qq<=F(1,15):pairs.append((tr,nt,r,t,rr,tt,qq,yy))
bst=min(pairs,key=lambda x:(-x[0],x[1],x[2:6]));tr,nt,r,t,rr,tt,qq,yy=bst
add('P12',aintro+' 现在并行两个独立 bank；只有两者都接受才保留整次 shot，只要任一 bank 失败即整体失败。两 bank 的(r,t)按字典序从小到大记为A、B。总N≤6500、整体 conditional LER≤1/15。最大化(KA+KB)·整体yield；并列先最小总N，再按(rA,tA,rB,tB)字典序。求rA、tA、rB、tB、总N。',[('rA','integer'),('tA','integer'),('rB','integer'),('tB','integer'),('total N','integer')],[r,t,rr,tt,nt],['footprint','chain','seed','yield'],f'每bank由前述编码结构求K,N,Y,Q。独立性给YAB=YA YB及QAB=1−(1−QA)(1−QB)。枚举325无序对，{len(pairs)}可行。最优{(r,t,rr,tt)},N={nt},T={tr},Y={yy},Q={qq}。块级flag全枚举验证单bank，乘法及失败事件互斥分解验证联合。',adeps,'联合接受与联合失败规则由题设明确，不能把两个yield相加。')
# XP04 alternate acceptance rule exactly even flags <=2, same code params
ar=[]
for r,t,N,K,Y,Q,T in rows:
 e=F(1,(t+1)**2);f=F(1,t+1);p0=(1-e)**r;p2=math.comb(r,2)*e*e*(1-e)**(r-2);y=p0+p2;q=p2*(1-(1-f)**2)/y
 if N<=3500 and q<=F(1,100):ar.append((K*y/N,r,t,N,q,y))
bst=min(ar,key=lambda x:(-x[0],x[3],x[1],x[2]));density,r,t,N,Q,Y=bst
add('XP04',aintro+' 本题替换后选择规则：置信分数为1当且仅当 flag 数是0或2，否则为0，阈值1。无flag永不失败；恰2个flag时，各flag独立以f触发失败，至少一个触发即失败。其余结构不变。要求N≤3500、conditional LER≤1/100，最大化K·yield/N；并列先最小N，再最小r、t。求r、t、N、conditional LER。',[('r','integer'),('t','integer'),('N','integer'),('conditional LER','rational')],[r,t,N,Q],['footprint','chain','seed','yield'],f'Y=(1−e)^r+C(r,2)e²(1−e)^(r−2)；J=C(r,2)e²(1−e)^(r−2)[1−(1−f)²]，Q=J/Y。{len(ar)}可行设计，最优r={r},t={t},N={N},Q={Q},Y={Y},density={density}。二项式概率与独立两flag触发事件展开核验。',adeps,'替代规则完全由题设定义；其余资料结构不变。')
# Additional independent inversions and changed-event checks.
# XP01: truncated series multiplication rather than derivative formula.
mm=F(2,5);bb=F(1,7);cc=F(2,35)
series=[F(1),-2*bb,3*bb*bb-2*cc]
assert 2*(series[2]+3*mm*series[1]+3*mm)==F(394,245)  # E² second derivative
# XP02 recover radiation from Om differences, then sterile temperature cube.
rr=F(19,20);mm=F(1,8)+F(3,2)*F(2,3)**3;aa=F(1,150)
x1=glitch(rr,mm,aa,F(1))[0];x2=glitch(rr,mm,aa,F(2))[0]
assert (x2-x1)/(rr*(F(80,26)-F(15,7)))==aa
# Change architecture: literal threshold event over every bit string.
for rr,tt,NN,KK,YY,QQ,TT in rows:
 ee=F(1,(tt+1)**2);ff=F(1,tt+1);sy=sj=F(0)
 for mask in range(1<<rr):
  h=bin(mask).count('1');pr=ee**h*(1-ee)**(rr-h)
  if h in (0,2):sy+=pr;sj+=pr*(1-(1-ff)**h)
 p2=math.comb(rr,2)*ee**2*(1-ee)**(rr-2)
 assert sy==(1-ee)**rr+p2 and sj==p2*(2*ff-ff*ff)
# Evidence is checked literally, and all IDs/cardinality/weights are checked.
for phase in ['initial','change']:
 out['questions'][phase].sort(key=lambda x:x['id']);out['answers'][phase].sort(key=lambda x:x['id'])
 for ans in out['answers'][phase]:
  for e in ans['evidence']:
   assert e['quote'] in texts[e['source']][1]
assert len(out['questions']['initial'])==6 and len(out['questions']['change'])==2
assert sum(q['weight'] for q in out['questions']['initial'])==34
assert sum(q['weight'] for q in out['questions']['change'])==34
if __name__=='__main__':
 dest=HERE/'physics.json'
 if '--check' in __import__('sys').argv:
  assert json.loads(dest.read_text())==out
  print('PASS: 8 answers, literal evidence, exact arithmetic and independent probability/derivative checks')
 else:
  dest.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
  print(dest)
  for phase in out['answers']:
   for a in out['answers'][phase]:print(a['id'],a['answer'])
