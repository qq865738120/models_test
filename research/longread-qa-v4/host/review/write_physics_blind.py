import json
from pathlib import Path
base=Path('research/longread-20261018/papers')
refs={
 'P02':('P02-2609.26517v2.txt','Eq. (30), PDF p. 6','H2(z) =H 2\n0\n1 +S(0)\n1 +S(z)\n2'),
 'P04':('P04-2608.19883v2.txt','Eq. (4), PDF p. 3','Om(z)≡ E(z)2 −1'),
 'P05':('P05-2609.40176v1.txt','Eqs. (1)-(2), PDF p. 3','Ωg ≡1− GN'),
 'P13':('P13-2610.10585v1.txt','Eqs. (5)-(6), PDF p. 5','ms,eff =m s(∆Neff)3/4'),
 'P14':('P14-2610.21357v1.txt','Eq. (6), PDF p. 4','N= 4(2t 2 −1) + 8t+ 1'),
 'P15':('P15-2610.13589v1.txt','Sec. II, PDF p. 3','The HadamardHdeformation would'),
 'P19':('P19-2610.03399v1.txt','Definition 1, PDF p. 4','Sα = ∂PL(λ;D)'),
 'P21':('P21-2610.00504v1.txt','Eqs. (1)-(2), PDF p. 5','Yield(τ) =P(s(x)≥τ)'),
 'P23':('P23-2610.04613v1.txt','Sec. IV A-B and Proposition 1, PDF pp. 6-7','chain code encodesrk− |P seed,X| − |Pseed,Z|')
}
def ev(ids):
 return [{'source':k,'path':str(base/refs[k][0]),'locator':refs[k][1],'quote':refs[k][2]} for k in ids]
def item(id,answer,source,need,mechanism,derivation,issues=None):
 return {'id':id,'answer':answer,'sources':source,'evidence':ev(source),'actuallyNecessarySources':need,'mechanism':mechanism,'derivation':derivation,'issues':issues or [],'uniqueAnswer':True,'crossSourceNecessary':len(need)>=2}
cos=['P02','P04','P13']
gl=['P05','P04','P13']
noi=['P15','P21','P19']
bank=['P14','P23','P21']
ci='P02 的 E²=[1+Ωm((1+z)^3−1)]/(1+bz+cz²)^2；P13 的 ΔNeff=u^4、ms,eff=ms u³；P04 的 Om=(E²−1)/((1+z)^3−1)。三式联立。'
gi='P05 的 Ωg=1−1/r、rhoDE=(Ωg nonDE+lambda)/(1−Ωg)；E²=r[m(1+z)^3+a(1+z)^4+lambda]，lambda=1/r−m−a；P13 给 m=m_b+ms u³；P04 给 Om。'
ni='P15 规定 H 将 X、Z 概率互换；P21 规定 score≥τ 接受以及 LER=P(fail∧accept)/P(accept)。题干给 syndrome 与 failure 真值表，逐个枚举 16 种 Pauli 对。'
bi='P14 给每块 B(t)=4(2t²−1)+8t+1=8t²+8t−3；P23 的 k=2 时独立 X/Z seed 各需 ceil(log2(3))=2，故 K=2r−4、检查控制器 4t，N=rB(t)+4t；P21 给接受率和条件失败率。'
repeat_c='与同族题共用同一个三式合成模板，主要变化是数值/离散约束；独立论文推理增量有限。'
repeat_g='与 P04–P06/XP02 共用同一个 glitch+sterile+Om 合成模板，主要替换输入或优化条件。'
repeat_n='P19 的 Definition 1 是未后选择的 P_L 对噪声强度的偏导；本题改用条件 LER 的商式导数，且题干已明确原始 p、固定量与接受率须随 p 变化。因此 P19 既非该商式的直接来源，也非实质必要的第三篇。'
repeat_b='与 P10–P12/XP04 共用同一 footprint、chain seed、flag 概率模板，主要改变优化目标或接受事件。'
initial=[
 item('P01','4/5;71/363;-76/3993',cos,cos,ci+' E²′(0)=3Ωm−2b=3/5，故 Ωm=4/15；ms=(4/15−1/6)/(1/2)^3=4/5。代 z=1 得 Om=71/363。用 Om′=[E²′D−(E²−1)D′]/D²，D=(1+z)^3−1，得 −76/3993。',[repeat_c]),
 item('P02','6;7;81/625',cos,cos,ci+' Ωm=1/8+(n/10)^3、b=j/100。穷举 n=1..9、j=0..25 共 234 组，同时匹配 Om(1)=3203/11449、Om(2)=10708/42237 的仅 (6,7)。ΔNeff=(6/10)^4=81/625。',[repeat_c]),
 item('P03','7;23;12983/69277',cos,cos,ci+' Ωm=1/10+(n/10)^3；E²′(0)=3Ωm−2b。精确枚举 234 组，9 组满足全部不等式；最大 n=7，符合者 j=23,24,25，最小 j=23。其 Om(2)=12983/69277。',[repeat_c]),
 item('P04','9/10;1/16;-13/50',gl,gl,gi+' Om(1)=r[m+15a/7]，Om(2)=r[m+40a/13]；两式相减给 r=9/10，回代 m=13/40。u³=m−1/5=1/8，故 u=1/2、ΔNeff=1/16。lambda=1397/1800；rhoDE(2)=(r−1)(27m+81a)+r lambda=−13/50。',[repeat_g]),
 item('P05','1053/1093;-40/1053;1/2',gl,gl,gi+' ΔNeff=1/16 使 u=1/2、m=1/4+2(1/2)^3=1/2。rhoDE(2)=1−m−a+(r−1)(26m+80a)=0 唯一给 r=1053/1093>0，Ωg=1−1/r=−40/1053。rhoDE(2)=0 时 E²(2)=27m+81a=14，Om(2)=(14−1)/26=1/2。',[repeat_g]),
 item('P06','6;93;1897/25000',gl,gl,gi+' 对 n=1..9、j=80..100 精确枚举 189 组，lambda=1/r−m−a；8 组符合三项约束，全部 n=6、j=93..100。最大 ms,eff=(6/10)^3，最小 j=93；rhoDE(2)=1897/25000。',[repeat_g]),
 item('P07','61/80;119/732;56525/66978',noi,['P15','P21'],ni+' η=3 时位置1 (I,X,Y,Z)=(4/5,1/40,1/40,3/20)，H 后 X/Z 互换；位置2 η=2 时 (3/4,1/24,1/24,1/6)。τ=2 保留 syndrome 00、10。枚举得 A=61/80，F=P(L=1∧accept)=119/960，LER=F/A=119/732。用 (F′A−FA′)/A² 对 p1 求导得 56525/66978。',[repeat_n]),
 item('P08','IH;3;33792/344569',noi,['P15','P21'],ni+' 枚举 4 种 I/H×3 个阈值，满足 yield≥3/5 的最小 LER 为 IH、τ=3：yield=587/960、LER=11/587。相同 τ=3 的 II、HI、HH LER 均不低于此；其余候选更高。对 p2 的条件商式求导为 33792/344569。',[repeat_n,'与 P07 共用同一个两位置真值表，仅改为穷举阈值。']),
 item('P09','HI;1;11305/133956',noi,['P15','P21'],ni+' τ=2 时四变形 yield 均≥3/5。预算一阶下降系数分别为 p1/2·∂LER/∂p1 或 p2·∂LER/∂p2。四变形最大系数取 HI 的位置1：(1/5)/2·56525/66978=11305/133956；其余最大值均较小。',[repeat_n,'与 P07 共用同一真值表，只换导数加权及优化目标。']),
 item('P10','8;4;1272;73383542784/8087158203125',bank,bank,bi+' e=1/(t+1)^2、f=1/(t+1)，yield=(1−e)^r+r e(1−e)^(r−1)，LER=[r e(1−e)^(r−1)f]/yield=r e f/(1+(r−1)e)。精确枚举 25 组并筛 N≤3500、LER≤1/20，最大 K·yield/N 在 (r,t)=(8,4)，K=12、N=1272、yield=146767085568/152587890625，故比值 73383542784/8087158203125。',[repeat_b]),
 item('P11','10;5;2390;1/27',bank,bank,bi+' 使用 P10 同一 yield、LER 式；25 组中满足 T=K·yield≥12、LER≤1/25 者按 N 排序，最小 (r,t)=(10,5)，K=16、N=2390、LER=1/27。',[repeat_b]),
 item('P12','10;5;12;6;6410',bank,bank,bi+' 对 25 种 bank 的无序有放回配对枚举 325 组。整体 yield=yA yB，整体 LER=1−(1−lA)(1−lB)，目标 (KA+KB)yA yB。在 N≤6500、LER≤1/15 者中最大为 A=(10,5)、B=(12,6)，N=2390+4020=6410，整体 LER=61/945，目标值 13107200000000000/384552482305383。',[repeat_b]),
]
change=[
 item('XP01','27/40;2/35;59/252',cos,cos,ci+' E²′(0)=3Ωm−2b=32/35 给 Ωm=2/5；E²″(0)=6Ωm−12bΩm+6b²−4c=394/245 给 c=2/35。ms=(2/5−1/5)/(2/3)^3=27/40。代 z=1 得 Om=59/252。',['二次 susceptibility 是题目自行指定的合成函数；论文只给背景关系。与 P01 是同公式增加二阶系数。']),
 item('XP02','1/150;16/81;16297/34200',gl,gl,gi+' Om(1)=r(m+15a/7)、Om(2)=r(m+40a/13)。相减得 a=1/150；回代 m=41/72，故 u³=(41/72−1/8)/(3/2)=8/27，u=2/3、ΔNeff=16/81。lambda=1/r−m−a=16297/34200。',[repeat_g]),
 item('XP03','265/288;81/1325;115176/1755625',noi,['P15','P21'],ni+' p1=1/6、p2=1/3、η=(4,3)、IH、τ=1 时接受 syndrome 00、10、01。枚举得 A=265/288、F=9/160、LER=81/1325。两 p 同乘 (1−ε) 时 −dLER/dε=p1∂LER/∂p1+p2∂LER/∂p2=115176/1755625。',[repeat_n]),
 item('XP04','6;4;958;9/985',bank,bank,bi+' 新规则接受 0 或 2 flag，yield=(1−e)^r+C(r,2)e²(1−e)^(r−2)；两 flag 任一触发失败概率 2f−f²，LER=C(r,2)e²(1−e)^(r−2)(2f−f²)/yield。精确枚举 25 组并筛 N≤3500、LER≤1/100，最大 K·yield/N 在 (6,4)，K=8、N=958、LER=9/985。',['0/2 flag 和独立触发完全由题目新造；论文只贡献基底资源式和条件概率定义。']),
]
data={'model':'gpt-6-sol','questionsSha256':'8f681fb9873d098880318a8e9943c1b562f24d790de199b3ee55c2d0736bc097','phases':{'initial':initial,'change':change}}
path=Path('research/longread-qa-v4/host/review/physics-blind.json')
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(path)
