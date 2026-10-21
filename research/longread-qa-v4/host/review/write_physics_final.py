import json
from pathlib import Path
root=Path('research/longread-20261018/papers')
refs={
'P02':('P02-2609.26517v2.txt','Eq. (30), extracted PDF p. 5','Equation (30) is the expansion history of the modified'),
'P04':('P04-2608.19883v2.txt','Eq. (4), extracted PDF p. 2','Om(z)≡ E(z)2 −1'),
'P05':('P05-2609.40176v1.txt','Eqs. (1)-(2), extracted PDF p. 1','ρDE = ΩgρnonDE +ρ Λ'),
'P13':('P13-2610.10585v1.txt','Eqs. (5)-(6), extracted PDF p. 3','ms,eff =m s(∆Neff)3/4'),
'P14':('P14-2610.21357v1.txt','Eq. (6), extracted PDF p. 3','N= 4(2t 2 −1) + 8t+ 1'),
'P15':('P15-2610.13589v1.txt','Sec. II, PDF p. 3','The HadamardHdeformation would'),
'P21':('P21-2610.00504v1.txt','Eqs. (1)-(2), extracted PDF p. 3','Yield(τ) =P(s(x)≥τ)'),
'P23':('P23-2610.04613v1.txt','Sec. IV A-B; Proposition 1, extracted PDF pp. 6-7','chain code encodesrk− |P seed,X| − |Pseed,Z|')
}
def evidence(ids):
 return [{'source':s,'path':str(root/refs[s][0]),'locator':refs[s][1],'quote':refs[s][2]} for s in ids]
def q(id,answer,sources,mechanism,derivation,warnings=[]):
 return {'id':id,'answer':answer,'sources':sources,'evidence':evidence(sources),'actuallyNecessarySources':sources,'mechanism':mechanism,'derivation':derivation,'issues':[],'warnings':warnings,'uniqueAnswer':True,'crossSourceNecessary':len(sources)>=2}
cos=['P02','P04','P13']
gl=['P05','P04','P13']
noi=['P15','P21']
bank=['P14','P23','P21']
cosmech='P02 supplies the squared inverse susceptibility factor in normalized E²; P13 supplies ΔNeff=u⁴ and ms,eff=ms u³; P04 supplies Om=(E²−1)/[(1+z)³−1]. The synthetic density conversion and b(z) are explicitly stipulated by the question.'
glmech='P05 supplies Ωg=1−1/r and the effective rhoDE rewrite; P13 supplies the thermal sterile mass-temperature relation; P04 supplies the Om diagnostic. The question fixes the shared GN-normalized densities.'
noimech='P15 supplies Schrödinger-picture H: swap pX and pZ while retaining pY; P21 supplies acceptance at score≥τ and conditional LER. The syndrome, residual failure function, grid, and derivative are defined in the question.'
bankmech='P14 supplies the stitched four-patch footprint B(t)=8t²+8t−3 including corridor and ancilla. P23 supplies two independent X and two Z seeds for k=2 and the even-r chain rule, giving K=2r−4 and four generators. P21 supplies acceptance and conditional LER. The flag law and controller cost are synthetic question data.'
data={'model':'gpt-6-sol','questionsSha256':'b5f11b8815342d28d8019ac10d6e493804fc6746d590f5db64001eab3f1a15f3','phases':{
'initial':[
 q('P01','6;7;81/625',cos,cosmech,'Set Ωm=1/8+(n/10)³ and E²=[1+Ωm((1+z)³−1)]/(1+jz/100)². Exact enumeration of all 9×26=234 ordered (n,j) pairs yields exactly one simultaneous match to Om(1)=3203/11449 and Om(2)=10708/42237: (6,7). Therefore ΔNeff=(6/10)⁴=81/625.',['The low-redshift matter conversion is a declared synthetic normalization, not a joint fit claimed by any source.']),
 q('P02','7;23;12983/69277',cos,cosmech,'Use Ωm=1/10+(n/10)³ and E²′(0)=3Ωm−2j/100. Enumerate all 234 (n,j) pairs; exactly nine meet Ωm<1, E²′(0)>0 and both closed Om intervals. Maximal n is 7. At n=7, j=23,24,25 all qualify; minimum b selects j=23. Then Om(2)=12983/69277.',['Uses the same three-source background mechanism as P01, with constrained optimization replacing inverse observations.']),
 q('P03','9/10;1/16;-13/50',gl,glmech,'Normalization gives lambda=1/r−m−a and Om(1)=r(m+15a/7), Om(2)=r(m+40a/13). With a=1/100, subtract the observed equations to obtain r=9/10, then m=13/40. Since m=1/5+u³, u³=1/8, so u=1/2 and ΔNeff=1/16. The unique lambda is 1397/1800, and rhoDE(2)=(r−1)(27m+81a)+r lambda=−13/50.',['Negative rhoDE at z=2 is explicitly allowed; the question uses a synthetic flat background.']),
 q('P04','1053/1093;-40/1053;1/2',gl,glmech,'ΔNeff=1/16 implies u=1/2, hence m=1/4+2u³=1/2. At z=2, rhoDE=1−m−a+(r−1)(26m+80a). Setting it to zero with a=1/162 gives the sole linear root r=1053/1093>0. Ωg=1−1/r=−40/1053. At the rhoDE zero E²=27m+81a=14, so Om(2)=(14−1)/26=1/2.',['Shares P03 source mechanism but tests the effective-density zero and GN normalization explicitly.']),
 q('P05','IH;3;33792/344569',noi,noimech,'For each of four II/IH/HI/HH deformations and τ=1,2,3, form pX=pY=p/[2(1+η)], pZ=ηp/(1+η), apply H swap, and enumerate 16 Pauli pairs. Among candidates with yield≥3/5, the minimum conditional LER 11/587 occurs for both IH and HI at τ=3, each with yield=587/960. The stated order II<IH<HI<HH selects IH. With A=P(accept), F=P(L=1 and accept), differentiate F/A with respect to original p2 at fixed η,τ,H and decoder: (F₂A−FA₂)/A²=33792/344569.',['The derivative is a mathematical operation specified by the question; a third noise-sensitivity paper is not needed. The residual failure and syndrome rules are synthetic.']),
 q('P06','10;5;12;6;6410',bank,bankmech,'Each bank has N=r(8t²+8t−3)+4t, K=2r−4, e=(t+1)⁻², f=(t+1)⁻¹, y=(1−e)^r+r e(1−e)^(r−1), and l=r e f/[1+(r−1)e]. Enumerate 25 banks and their 325 unordered pairs (including identical pairs). For a pair, yAB=yA yB, lAB=1−(1−lA)(1−lB), N=N_A+N_B, objective=(K_A+K_B)yAB. Exactly 122 pairs satisfy N≤6500 and lAB≤1/15. The unique maximum objective 13107200000000000/384552482305383 occurs at lex-ordered A=(10,5), B=(12,6); N=2390+4020=6410 and lAB=61/945. The runner-up objective is 2180800000000000/64336683773061, strictly smaller.',['Controller cost and independent visible flag law are deliberately synthetic; the paper footprint is not a demonstrated combined chain-check implementation.'])
],
'change':[
 q('XP01','27/40;2/35;59/252',cos,cosmech,'Write E²=[1+Ωm((1+z)³−1)]/(1+bz+cz²)². The measured first derivative gives 3Ωm−2b=32/35; with b=1/7 this yields Ωm=2/5. The second gives 6Ωm−12bΩm+6b²−4c=394/245, yielding c=2/35. Since Ωb=1/5 and u=2/3, ms/eV=(Ωm−Ωb)/u³=27/40. Substitution at z=1 gives Om(1)=59/252. Both derivative equations are linear in the unknowns in sequence and determine one physical solution.',['The quadratic susceptibility is stipulated by the question rather than asserted as the paper fit; this is an added second-derivative step on the initial cosmology mechanism.']),
 q('XP02','6;4;958;9/985',bank,bankmech,'Retain N=r(8t²+8t−3)+4t, K=2r−4. Under the replacement rule, e=(t+1)⁻² and f=(t+1)⁻¹, y=(1−e)^r+C(r,2)e²(1−e)^(r−2), l=C(r,2)e²(1−e)^(r−2)(2f−f²)/y. Exact enumeration of 25 (r,t) pairs leaves 11 with N≤3500 and l≤1/100. The unique maximum K y/N is 784318464/116943359375 at (6,4), where N=958 and l=9/985. Runner-up K y/N is 335232/62890625, strictly less.',['The 0-or-2 flag acceptance event and independent failure triggers are synthetic conditions; they are not empirical claims from the cited papers.'])
]}}
for phase,qs in data['phases'].items():
 for x in qs:
  for ev in x['evidence']:
   if ev['quote'] not in Path(ev['path']).read_text(errors='replace'):
    raise ValueError((phase,x['id'],ev['source'],'quote mismatch'))
p=Path('research/longread-qa-v4/host/review/physics-blind.json')
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(p)
