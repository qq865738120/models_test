import json,re,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
CORP=ROOT/'research/longread-20261018/papers'
E={}
def ev(key,src,quote,note='按冻结版本的作者主张和所列模型假设使用，不将预印本结论视为独立验证。',kind='reported'):
 p=next(CORP.glob(src+'-*.txt'));t=p.read_text(); pos=[i for i,c in enumerate(t) if not c.isspace() and c not in '-\x00']; compact=''.join(t[i] for i in pos); needle=''.join(quote.split()).replace('-','').replace('\x00',''); k=compact.find(needle)
 assert k>=0,(key,quote)
 a,b=pos[k],pos[k+len(needle)-1]+1;page=re.findall(r'\[PDF page (\d+)\]',t[:a])[-1]
 E[key]=dict(source=src,path=str(p.relative_to(ROOT)),locator='PDF page '+page+'; 文本引文起始位置 '+str(a),quote=t[a:b],note=note,claimType=kind)
def refs(keys):return [E[k] for k in keys.split()]
Q={'initial':[],'change':[]};A={'initial':[],'change':[]}
def add(id,q,items,derive,keys):
 phase='change' if id.startswith('X') else 'initial';n=int(id[-2:]);weight=(5 if n<=2 else 4) if phase=='change' else (2 if n<=10 else 1)
 # Deterministic permutation prevents a repeated answer-position template.
 shift=(n*5+(2 if phase=='change' else 0))%6;items=items[shift:]+items[:shift]
 options={};aud={};ans=[]
 for letter,(statement,correct,reason,ekeys) in zip('ABCDEF',items):
  options[letter]=statement
  if correct:ans.append(letter)
  aud[letter]={'correct':correct,'credit':int(correct),'reason':reason,'evidence':refs(ekeys),'claimType':'conditional-inference'}
 assert 1<len(ans)<6
 Q[phase].append(dict(id=id,domain='physics',question='【多选；须选全】仅按本地材料的定义、假设与报告判断。'+q,options=options,multiple=True,weight=weight,scoring='exact'))
 A[phase].append(dict(id=id,answer=ans,evidence=refs(keys),optionAudit=aud,derivation=derive,claimScope='冻结预印本中的条件性结果及题设受控推导；不外推为真实宇宙、硬件或所有模型的已证事实。'))
# Evidence is extracted verbatim, including whitespace, from the frozen source.
ev('rr','P01','for fixed standard cosmological parameters, each value of the nonlocal parameter determines a specific effective pair(w 0, wa), so that the model traces a restricted trajectory in the Chevallier–Polarski– Linder plane rather than spanning the full phenomenological parameter space.')
ev('rrfit','P01','We find that current datasets constrain the nonlocal parameter close to theΛCDM limit, with no statistically significant preference for nonlocal deviations.')
ev('sus','P02','to every general-relativistic dark energy model with equation of statew(z), there corresponds a modified TEGR cosmology withw=−1and a suitable susceptibilityS(z)that are indistinguishable at the level of the background expansion.')
ev('dip','P02','The recovered susceptibility displays a characteristic low-redshift dip with depthβ=−0.025±0.007 atz≃0.4, and its derivative changes sign at a redshift equal to the phantom-crossing epoch.')
ev('nods','P02','only the modified Cartesian flat model is consistent with a time-dependent susceptibility function, and in this model de Sitter spacetime is not a valid solution.')
ev('gb','P03','In the minimally coupled limit, the effective equation of state oscillates in the quintessence regime at low redshift,𝑧∼0, without crossing the phantom divide. The nonminimal coupling amplifies the oscillations and drives the effective equation of state across the phantom divide multiple times.')
ev('gbstable','P03','Although a sufficiently strong coupling can induce negative scalar and tensor sound speeds, rendering the perturbation modes unstable. We identify a region of parameter space in which the model undergoes multiple phantom crossings while remaining free of ghost and gradient instabilities and approaching a stable de Sitter attractor in the future.')
ev('slope','P04','slopem= 0.022±0.012, 1.8σremoved from constantΩ m. Akaike Information Criterion and Bayesian evidence confirm that constantΩ m and increasingΩ m(z) are statistically indistinguishable.')
ev('om','P04','For quintessence DE modelsX(z)>1, thusOm(z)>Ω m decreaseswith redshift, while for phantom DE modelsX(z)<1, thusOm(z)<Ω m increaseswith redshift.')
ev('omrange','P04','Om(z) is designed to work well in intermediate redshifts, 0.1≲z≲4−5, where DE is expected to be relevant and in general it loses sensitivity at lowerz.')
ev('gdef','P05','Ωg ≡1− GN Gcosmo ,(1)')
ev('grho','P05','ρDE = ΩgρnonDE +ρ Λ 1−Ω g ,(2)')
ev('gfit','P05','DESI DR2 giveG cosmo/GN = 0.9920±0.0025, a3.3σpreference for weaker cosmological gravity, robust to adding CMB lensing and supernovae.')
ev('bis','P06','The corresponding reductions are 15% and 10% for the combined LRG sample, and 6% and 4% when all tracers are combined.')
ev('bisprior','P06','Extending the analysis tow 0waCDM substantially broadens the cosmological posteriors, while the bispectrum produces only a mild change in the allowed dark-energy parameter region, which remains sensitive to the adopted prior ranges.')
ev('ltb','P07','The inclusion of the kinematic Sunyaev Zel’dovich (kSZ) effect rules out a large portion of the CP violation parameter space allowed by (1). However, the existence of a∼300 Mpc/hregion with∼10% matter density excess is still allowed by the current data, and therefore remains a viable alternative to DDE.')
ev('ltbsky','P07','For an observer located near the symmetry center, the sky can remain nearly isotropic, consistent with cosmic microwave background (CMB) observations, while light-cone observables may still differ from their counterparts in the ΛCDM model.')
ev('nogo','P08','Theorem 1 demonstrates that phantom crossing is incompatible with ghost-free stability in the slow-roll regime, as the former requires ξeff< 0 while the latter requires ξeff> 0')
ev('nogo_scope','P08','While our no-go theorems do not rule out the possibility of phantom crossing in general')
ev('svt','P09','the vector sector drives the dark-energy equation of state below−1 at earlier times, while a canonical scalar field subsequently drives it across−1 toward a present-day value above−1.')
ev('svtsupport','P09','Since the growth analysis also imposes additional perturbative support conditions, this increase cannot be attributed to the RSD likelihood alone.')
ev('svtprior','P09','The quantitative Bayes factor depends on the prior normalization assigned to the regular radiation-era branch and is larger in the RSD analysis under either convention.')
ev('sirens','P10','Union3 and DES-Dovekie are indistinguishable throughout, since with the absolute magnitude marginalised neither constrains H0.')
ev('sirens_mock','P10','We build mock catalogues of LISA bright sirens under three fiducial cosmologies drawn from datasets that participate in the currentH 0 discrepancy')
ev('sirens_precision','P10','catalogues built atH 0 from 35 to 115 km s −1 Mpc−1 are recovered with essentially the same fractional precision, so what rejects an implausible expansion history is the electromagnetic comparison, not the waveform.')
ev('bde','P11','The equation of state evolves tow 0 =−0.9262±0.0005 and never crosses the phantom divide.')
ev('bde_evidence','P11','lnB= +4.09, +4.12, and +4.83 against ΛCDM, wherew 0waCDM gives−2.11,−0.26, and−0.56.')
ev('bdm','P11','Given their relativistic nature at formation, BDM particles preferentially stream out of small-scale perturbations, leading to a suppression of power below a certain wavenumber.')
ev('bdm_scope','P11','the scales involved lie beyond the reach of the data used here and we make no claim about satellite abundances.')
ev('ft','P12','For the power-law model, the mild deviation from the ΛCDM model obtained from BAO+CMB disappears after the SNe Ia data are included. In contrast, the exponential model retains a preference for a nonzero deformation parameter in the full analysis')
ev('ftcriteria','P12','the parameter-level deviation found for the exponential model does not lead to a clear statistical preference over the ΛCDM model according to the information criteria, whereas the hyperbolic-tangent model shows a poorer statistical performance for the combined data.')
ev('sterile','P13','ms,eff =m s(∆Neff)3/4.(6)')
ev('sterile_temp','P13','(∆Neff)1/4')
ev('sterile_res','P13','Ωk ≃0.0045±0.0016, and yieldH 0 ≃70.9±0.7 km s −1 Mpc−1 andS 8 ≃0.785±0.015.')
ev('sterile_hdn','P13','Hubble Distance Network constraint,H 0 = 73.50±0.81 km s −1 Mpc−1.')
ev('sterile_prior','P13','A direct comparison with the induced prior onm s,eff shows that the posterior displacement toward larger effective sterile masses is not solely a consequence of transformed prior volume.')
ev('stitch','P14','concatenates four distance-trotated surface-code patches with the [[4,2,2]] outer code, encoding two logical qubits at code distance d= 2tin a physical footprint ofN <2(2t+1) 2 qubits on a square lattice with nearest-neighbor connectivity.')
ev('stitch_gadget','P14','The outer-code stabilizer generators XXXXand ZZZZ, each of physical weight 4t, are measuredin situvia verified Greenberger–Horne–Zeilinger (GHZ) ancillae distributed through narrow corridors between adjacent patches, without lattice surgery or long-range gates.')
ev('stitch_graph','P14','The outer-code gadgets introduce hyperedge fault mechanisms, but by design each decomposes into graphlike components, so the complete syndrome is decoded by a single minimum-weight-perfect-matching pass.')
ev('stitch_data','P14','[[4t 2,2,2t]]')
ev('surf','P14','N surf = 2d2 −1 physical qubits.')
ev('cd','P15','under circuit level noise the optimal CD depends strongly on both the noise model and decoder.')
ev('bxx','P15','It differs from XZZX on only a fractionO(d −1) of the qubits at code distanced, yet its relative advantage grows from≈5% atd= 3 to≈12% atd= 11.')
ev('smp','P16','SMP extracts this information directly from the measured syndrome with linear-complexity preprocessing while preserving the matching backend.')
ev('motif','P16','Observing such a motif provides evidence for the corresponding fault.')
ev('smpgain','P16','For color code memories, SMP combined with Chromobius reduces logical failure probabilities by up to 77.8%. For logical gate circuits, SMP reduces the failure probability of a six-CNOT circuit by 35.5% relative to logical observable matching')
ev('mwpf','P17','Minimum Weight Parity Factor (MWPF) decoder, which natively processes syndrome hypergraphs without artificial edge decomposition.')
ev('threshold','P17','(η= 100), the threshold of the rotated code degrades to ≈0.36%, while theXZZXcode drops to≈0.70%.')
ev('bias','P17','it exhibits a threshold minimum at moderate biases (η≈10) because transverse X and Y errors actively bridge the diagonal strings, breaking the code’s one-dimensional decoupling symmetry.')
ev('coherent','P18','When both single-qubit coherent noise and coherent crosstalk are present, we find a complexity-theoretic obstruction to efficient simulation: unless the polynomial hierarchy collapses, there is no efficient classical algorithm for sampling from the syndrome distribution, even up to a constant multiplicative error.')
ev('purezz','P18','We give a polynomial-time classical algorithm which samples from the syndrome distribution of a surface code state corrupted by coherent nearest-neighborZZ crosstalk.')
ev('twirl','P18','Pauli twirling makes stabilizer simulation efficient, but changes the noise model by discarding interference')
ev('capacity','P18','We consider the code-capacity setting: coherent crosstalk acts on a prepared code state, followed by noise-free syndrome extraction and recovery.')
ev('sens','P19','Sα =P(L= 1|E α = 1)−P(L= 1|E α = 0).(5)')
ev('risk','P19','Rα =λ αSα')
ev('linear','P19','A first-order expansion gives PL(λ;D)−P L(λ(−α);D)≈R α.(7)')
ev('chain','P19','Sc = ∂PL ∂pc = X α∈Nc Sα.(8)')
ev('target','P19','halving the noise strength on about 5%–7% of physical components selected by sensitivity reduces logical error rates by approximately 15%–25%, roughly twice the mean reduction from the same intervention on an equal number of randomly selected components.')
ev('modular','P20','it is pretrained in simulation and fine-tuned to hardware using a common pipeline, with only lightweight spatial aggregation adapted between experiments.')
ev('stability','P20','we continuously tune the effective measurement error rate using a variable pre-readout rotation and train a single decoder jointly across the resulting noise range.')
ev('post','P21','Retaining 90% of shots gives approximately 3700×and 740×reductions in logical error rates for [[72,12,6]] and [[144,12,12]] BB codes at realistic physical error rates.')
ev('postcost','P21','The trade-off between LER and yield is favourable whenever discarding a shot is cheap relative to incurring a logical fault')
ev('postinput','P21','graph neural networks that predict decoder failure without additional decoder executions, using only syndromes, and for high-rate quantum low-density parity-check (qLDPC) codes, existing belief-propagation posteriors.')
ev('module','P22','By wiring sparse, static boundary connections between Euclidean planar modules, we construct modular hyperbolic surface and color codes')
ev('module_rate','P22','encoding ratek/n= 1/16 and distanced≥22, exceeding both the rate and distance of the [[288,12,18]] two-gross bivariate bicycle code')
ev('extractor','P22','a modular extractor system that is ≈4.5×smaller than the code itself.')
ev('yoke','P23','a three-yoked surface code with a [[256,166,8]] outer code')
ev('yoke_planar','P23','Yoked surface codes improve the density by a factor of two or three by concatenating a high-density parity check code on top of the surface code while retaining planar nearest-neighbor connectivity.')
ev('yoke_interval','P23','lower-level checks are performed frequently while higher-level checks are performed less often')
ev('yoke_gain','P23','in the teraquop regime the three-yoked surface code is about 4 to 4.5×denser than the unyoked surface code.')
ev('3pp','P24','A projective Pauli measurement iscompatiblewith a 3PP state if the post-measurement state is a 3PP state for every outcome having nonzero probability.')
ev('3ppnoise','P24','if every idealX measurement is deterministic or anticommutes with a current Z-type stabilizer, then every measurement remains compatible under arbitrary inserted DCP faults, provided that outcome-dependent operations are restricted to DCP corrections.')
ev('ccz','P24','Its computational-basis support has six elements, whereas every affine subspace overF2 has cardinality a power of two. Thus its support is not affine, so|ψ+⟩is not a 3PP state and the measurement is incompatible.')
ev('rank','P24','DCP rank is no greater than stabilizer rank, although it can still grow exponentially.')
ev('ppsupport','P24','uniform-magnitude superposition over an affine subspace of computational-basis labels')
ev('lga','P25','We derive an exact codespace-preservation condition valid at arbitrary rotation angles, providing a common stabilizer-level description for CSS and non-CSS codes and for both Clifford and non-Clifford operations.')
ev('bound','P25','generator of weight at least⌈d/2⌉.')
ev('depth','P25','an LGA whose Pauli generators have pairwise-disjoint support has Pauli-rotation depth one. This quantity is distinct from the circuit depth obtained after compiling each multiqubit Pauli rotation into a hardware-native gate set.')
add('P01','某筛选器要求候选模型同时满足「存在稳定的有效 phantom 穿越」与「其所讨论的未来演化可趋于稳定 de Sitter」。另设对照组要求无穿越。以下筛选或排除记录哪些有材料依据？不能把不同引力作用量的条件相互移植。',[
('带高斯 Gauss–Bonnet 耦合的振荡标量，在作者找到的稳定参数区可进入候选组；将耦合关掉后不再满足候选组的穿越要求。',True,'非最小耦合的稳定区兼具多次穿越与未来 de Sitter；最小耦合极限仅在 quintessence 区振荡。','gb gbstable'),
('保持随时间变化的引力易感率，即使它能复现穿越背景，也不能凭该对应关系进入这个双条件候选组。',True,'背景对应支持有效穿越，但该易感率框架明确排除 de Sitter 解，违反第二条件。','sus nods gbstable'),
('统一束缚暗部门模型应列入无穿越对照组；其拟合改进不使它通过候选组的第一个条件。',True,'模型报告从不穿越；比较对象的稳定穿越来自另一个动力学框架。','bde gbstable'),
('慢滚尺度不变导数耦合模型只需把有效耦合改为负值，就能在保持无鬼条件时进入候选组。',False,'该文主张负有效耦合满足穿越要求，却与其正有效耦合无鬼要求冲突。','nogo gbstable'),
('将高斯 Gauss–Bonnet 耦合不断增大，可保证所有振荡穿越解继续通过稳定性筛选。',False,'作者明确给出强耦合可导致标量及张量声速平方负值的限制。','gbstable nogo'),
('有效易感率模型与稳定 Gauss–Bonnet 振荡模型既然都能穿越，就应具有相同的未来 de Sitter 可达性。',False,'前者排除 de Sitter，后者稳定区趋向 de Sitter；穿越不决定未来吸引子。','nods gbstable')],
'分别检查穿越、扰动稳定、未来吸引子三列，取交集；无穿越模型仅作对照，不能由数据拟合优劣改变动力学分类。','gb gbstable sus nods bde nogo')
add('P02','假设距离观测对三个候选给出相同的 H(z)：均匀动态暗能量、带随时间变化易感率且真实 w=−1 的模型、近中心观测的弱径向非均匀 Λ 模型。团队要设计下一轮识别实验。哪些方案及其预期解释成立？',[
('若进一步的观测只无误差地重复同一背景 H(z)，易感率模型的背景对应仍可保留；加入增长或扰动信息才是在检验对应之外的性质。',True,'易感率等价明确限于背景，结构增长是不同信息；SVT 示例确实用 RSD 检验增长。','sus svtsupport'),
('对径向非均匀分支加入 kSZ 上限能排除部分原距离允许区，故应把它列为与单纯提高背景距离精度不同的测试。',True,'ΛLTB 文中距离允许区域被 kSZ 大量削减，其机制并非重测同一 H(z)。','sus ltb'),
('若近中心天空近似各向同性，就应把径向非均匀分支的后验权重直接设为零。',False,'近中心观察者可以看到近各向同性天空，仍有径向非均匀与不同光锥距离。','ltbsky sus'),
('在易感率分支拟合得到有效 w 穿越后，真实流体 w 也必须从 −1 的一侧跨到另一侧。',False,'该对应正是用真实恒定 w=−1 复现有效动态暗能量。','sus ltb'),
('若新增 RSD 同时附带新的正则扰动支持限制，应另做固定支持的对照，才能分离似然和支持变化的贡献。',True,'SVT 分析明确警告支持同步改变，不能把穿越权重增加全算作 RSD 似然效应。','svtsupport sus'),
('由于现有 kSZ 已排除一大块参数区，材料中约 300 Mpc/h、约 10% 过密的剩余分支也已被排除。',False,'原文明确保留这个区域作为可行替代。','ltb ltbsky')],
'识别对象必须按观测映射区分：背景完全对应不因重复同类背景观测而破除；kSZ 和结构增长引入额外约束，而支持变化必须单独归因。','sus ltb ltbsky svtsupport')
add('P03','构建一个两级模型筛选：第一级允许动态暗能量；第二级要求使用模型实际可达参数空间与惩罚复杂度后的统计比较。哪些审计操作符合材料？',[
('对单非局域参数模型，固定标准宇宙学参数后只在它诱导的 CPL 轨迹上评分；不能直接采用整个二维 CPL 面的最佳拟合作为该模型最佳拟合。',True,'理论限制一维轨迹；广泛 CPL 拟合不等于该模型拟合。','rr rrfit'),
('对统一束缚暗部门与 CPL 的比较，可以出现 CPL 拟合更灵活而前者的 Bayes 因子更大；两者要在各自先验下比较证据。',True,'报告的前者 lnB 正、CPL lnB 负，与理论参数约束共同说明自由拟合与证据是不同层次。','bde_evidence rr'),
('指数 f(T) 的变形参数偏离零足以自动通过第二级，因为其信息准则已经明确优于 ΛCDM。',False,'原文恰好指出参数级偏离并未带来清楚的信息准则偏好。','ftcriteria rrfit'),
('所有报告动态暗能量的模型都必须有两个可独立采样的 CPL 参数。',False,'非局域模型在固定标准参数时为受限轨迹，统一束缚暗部门也不是自由二维 CPL。','rr bde_evidence'),
('把幂律 f(T) 的 BAO+CMB 参数偏离当成加入超新星后仍存在的证据，会使筛选记录失真。',True,'该偏离在加入超新星后消失，应保留数据组合标签。','ft rrfit'),
('因为单非局域参数模型没有显著偏离，其诱导的 CPL 轨迹可以删去，并给每个 CPL 点相同理论先验。',False,'拟合无显著偏离不解除理论动力学关系；扩大支持改变模型。','rr rrfit ftcriteria')],
'第一级只判断模型能否动态演化；第二级分别使用实际支持、数据组合、信息准则或证据，避免跨级替换。','rr rrfit bde_evidence ft ftcriteria')
add('P04','某器件在与文中相同的强 Z 偏置时空相关电路噪声、η=100、MWPF 解码设置下运行，物理错误率为 0.50%。团队另有一个 GHZ 走廊拼接方案，可使用它自己的图样可分解性质。下面哪些部署判断成立？“低于阈值”只按报告中心值作比较。',[
('0.50% 位于报告的 rotated 与 XZZX 两阈值之间，因此同一噪声和 MWPF 设置下，仅 XZZX 通过这项数值筛选。',True,'0.36<0.50<0.70；阈值比较不能更换噪声/解码设置。','threshold mwpf'),
('GHZ 拼接方案允许单次 matching 的理由是其特定超边可分解；这并不要求把 MWPF 对 XZZX 的阈值测量改成 matching 测量。',True,'两个方案的相关机制处理不同：设计可分解与原生超图解码。','stitch_graph mwpf'),
('若把上述 XZZX 的 MWPF 后端换成 PyMatching，仍可原样沿用 0.70% 阈值作为本文的已测结论。',False,'阈值属于 MWPF 设置，且独立变形研究强调最优选择依赖解码器。','threshold mwpf cd'),
('因为 0.50% 低于 0.70%，它同时低于 rotated 的相关噪声阈值。',False,'rotated 阈值约0.36%，所以0.50%高于它。','threshold stitch_graph'),
('在固定 η 的筛选之外，若要扫偏置比，不能以「偏置越强阈值必单调上升」代替重新评估，因为中等偏置可破坏对角链解耦。',True,'材料报告 η约10处阈值谷，且变形最优性依赖噪声模型。','bias cd'),
('拼接构造也产生超边，所以其已报告的单次 matching 解码必须逻辑上不可能。',False,'超边存在不等于无法设计成图样组件，原文明确报告这种分解。','stitch_graph mwpf')],
'Python核验 0.0036<0.005<0.007；再分别检查后端和超边结构，不能用其中一个条件代替其他条件。','threshold mwpf stitch_graph cd bias')
add('P05','为一批纠错任务分派精确经典模拟器：任务甲只有近邻相干 ZZ 串扰；乙同时有一般相干单比特 Z 与近邻 ZZ；丙为三阶相位多项式电路且理想 X 测量均确定或反对易于当前某个 Z 稳定子，反馈限于 DCP，噪声也为插入的 DCP 故障。哪些分派记录正确？',[
('甲可按表面码相干串扰的多项式采样算法处理；丙可按理想测量条件认证带噪分支兼容。',True,'两个算法分别具备题设条件，后者定理直接覆盖任意插入DCP故障。','purezz 3ppnoise'),
('乙的普遍高效采样主张不能由甲与相干单比特噪声各自可解相加得出；材料给出了以多项式层级不塌缩为条件的障碍。',True,'混合噪声存在复杂性障碍，三阶框架也要求每个测量兼容。','coherent 3pp'),
('对乙先做 Pauli twirling 再高效模拟，可作为保留原有全部相干干涉的精确算法。',False,'twirling丢失干涉，改变目标分布。','twirl coherent'),
('丙即使把反馈改成任意量子操作，仍自动被同一个 DCP 故障定理认证。',False,'定理将反馈限定为DCP corrections，不涵盖任意操作。','3ppnoise coherent'),
('甲的结论在所述 code-capacity 设置中成立；若把综合征提取也改为任意带噪电路，必须重新检查适用条件。',True,'相干文明确无噪综合征提取，另一个框架才有其特定带噪闭包条件。','capacity 3ppnoise'),
('只要中间态初始为三阶相位多项式态，任何后续 Pauli 测量都与它兼容。',False,'兼容要求每个非零概率分支留在态类中，CCZ态的X测量提供反例。','3pp ccz purezz')],
'按噪声类型、综合征提取方式、测量逐分支闭包和反馈操作四项匹配算法。两个各自易解子问题的合并并不保持易解。','purezz coherent twirl capacity 3pp 3ppnoise ccz')
add('P06','四 patch 拼接码取内层距离 t=5。有人提议在该码上用相同 syndrome 的一组 Pauli 旋转实现非平凡逻辑门，再用三阶相位多项式模拟器验证。仅使用文中的必要条件与闭包判据，哪些审核结论成立？',[
('该码距离为10；若所有旋转生成元的物理重量都至多4，则该等 syndrome 非平凡逻辑门提案违反重量必要条件。',True,'拼接距离2t=10，等syndrome非平凡门需某生成元重量至少ceil(10/2)=5。','stitch bound'),
('出现一个重量5的生成元只是通过重量下界；仍要检查码空间保持及测量兼容，才能完成提案验证。',True,'重量下界为必要条件，码空间保持与模拟测量闭包分别另有条件。','bound lga 3pp'),
('只要生成元支撑两两不交，其硬件原生门编译深度就一定为1。',False,'论文区分Pauli旋转深度与编译后的硬件深度。','depth stitch'),
('若操作保持码空间，就必然使每个非零测量分支都为三阶相位多项式态。',False,'码空间保持属于逻辑门框架，3PP兼容要求特定态类闭包，不能互相替代。','lga 3pp'),
('此 t 下数据位数为100，逻辑位数为2；这两个数不能当作含全部辅助位的总硬件数。',True,'[[4t²,2,2t]] 给数据位数，而N footprint另计辅助位。','stitch_data stitch'),
('既然外码两个校验的物理重量均为20，等 syndrome 非平凡逻辑门的下界也必须是20。',False,'外码校验重量4t=20与门生成元ceil(d/2)=5是不同对象。','stitch_gadget bound')],
'Python核验 d=2*5=10，ceil(d/2)=5，n=4*5²=100，外码校验重量4*5=20。分清码参数、校验重量、逻辑门必要下界以及模拟态类。','stitch stitch_data stitch_gadget bound depth lga 3pp')
add('P07','比较两种处理同一假想基线失败率 p 的策略。策略甲假定能复现 72 比特 BB 后选择的报告倍率：保留率0.90、保留 shot 失败率p/3700。策略乙假定能复现定向噪声干预报告范围上端的失败率降低且不丢 shot。每次原始尝试成本为1，每个被交付的失败 shot 额外损失 C。只比较每个交付 shot 的期望总成本，忽略策略自身额外计算和干预成本。哪些判断正确？',[
('甲成本为 1/0.90+Cp/3700；乙成本为1+0.75Cp。',True,'后选择按每个交付shot支付1/y尝试，条件失败率按报告倍率；干预保留全部shot。','post target postcost'),
('当 Cp=0.10 时乙更便宜；当 Cp=1 时甲更便宜。',True,'两策略成本差在Cp约0.1482处变号。','post target postcost'),
('甲优于乙的条件为 Cp>约0.1482。',True,'解1/0.9-1<Cp(0.75-1/3700)，阈值0.14820155。','post target postcost'),
('因为甲失败率更低，所以对于任意非负 C 它的交付成本都更低。',False,'C=0时甲成本1.111…而乙1；丢弃代价不能消失。','post postcost target'),
('甲每个交付 shot 的尝试成本是0.90，因此 Cp=0 时甲更省。',False,'0.90是产率，单位交付的尝试次数是其倒数。','post postcost'),
('要得到甲的交付失败率，应把p/3700再除以0.90一次。',False,'报告后选择LER已经是保留样本的条件失败率；不能二次条件化。','post target')],
'受控外推而非宣称两研究基线相同。Python核验阈值 (1/.9-1)/(.75-1/3700)=0.14820155；成本在Cp=.1分别1.111138、1.075；在Cp=1分别1.111381、1.75。','post postcost target')
add('P08','一个存储方案筛选器要求全部物理连接保持单一平面近邻；另外对代数外码的逻辑位/外码输入位比率设下限0.60。在筛选阶段必须分清外码输入位、物理位、走廊与工作区开销。哪些记录成立？',[
('[[256,166,8]] 三层 yoking 的外码率约0.6484，满足代数比率门槛，其方案保留平面近邻；但此数不是完整物理架构的k/N。',True,'166/256=.6484375；outer code率与内层及工作区物理开销不同。','yoke yoke_planar stitch'),
('四 patch 的 [[4,2,2]] 外码率为0.50，虽满足平面近邻约束，却未通过0.60外码率门槛。',True,'2/4=.5，拼接平面近邻性质不能替代率筛选。','stitch yoke'),
('静态稀疏边界连接的模块化双曲方案，因为每个模块平坦，就自动符合整个系统只有单一平面近邻的要求。',False,'该方案明确有非局域模块间边界连接，单模块平面不等于全系统平面近邻。','module yoke_planar'),
('若仅比较模块化投影码与 [[288,12,18]] 的数据编码率，1/16 比12/288高50%，且报告距离下界22高于18。',True,'12/288=1/24；(1/16)/(1/24)=1.5。此比较不解除平面连接筛选。','module_rate yoke_planar'),
('三层 yoking 外码距离8等同于最终全部物理电路的距离8，与内层距离和测量调度无关。',False,'其outer参数指外码；方案仍有内层与不同层级测量间隔。','yoke yoke_interval stitch'),
('既然外码率0.6484高于1/16，就可在不计辅助位、模块连线和工作区的情况下证明前者物理开销更小。',False,'比较口径一边为外码输入patch，一边为物理数据位，分母不同。','yoke module_rate stitch')],
'Python核验166/256=.6484375、2/4=.5、(1/16)/(12/288)=1.5。先做连接约束，再在相同分母口径下比较率。','stitch yoke yoke_planar yoke_interval module module_rate')
add('P09','做一项受控背景计算：取宇宙学/局域引力常数比为0.992（本题把该数当精确输入），令非暗能量密度比 R=ρnonDE/ρΛ=119+20(ms,eff/eV)。新增项仅来自热分布无菌中微子；其物理质量固定2 eV。按材料的有效暗能量密度公式，哪些记录正确？本题只判断该公式的代数符号，不把负密度自动解释为稳定解。',[
('当 ΔNeff=0.0625 时，ms,eff=0.25 eV，R=124，因而有效暗能量密度恰为零。',True,'热分布关系给2*(1/16)^(3/4)=.25；Ωg=-1/124，所以分子为1-R/124。','sterile gdef grho'),
('当 ΔNeff=0.01 时，有效暗能量密度为正，约为0.0299ρΛ。',True,'ms,eff约.0632456，R约120.2649；ρDE/ρΛ=(124-R)/125约.0298807。','sterile gdef grho'),
('当 ΔNeff=0.1296 时，温度比为0.6，有效暗能量密度为负，约为−0.0291ρΛ。',True,'温度比为四次根.6，有效质量2*.6³=.432，R=127.64，结果-.02912。','sterile sterile_temp gdef grho'),
('把 ΔNeff 从0.0625增加到0.1296，会在固定ρΛ时提高该有效暗能量密度。',False,'增加热遗迹质量密度，负Ωg系数反使有效暗能量密度降低。','sterile gdef grho'),
('因为 Gcosmo/GN<1，所以 Ωg=+0.008，R的增加必增大有效暗能量密度。',False,'定义含倒数GN/Gcosmo，Ωg=1-1/.992=-1/124而非+.008。','gdef grho sterile'),
('零点对应的热遗迹温度比为0.25，因此有效质量为2×0.25³ eV。',False,'ΔNeff=.0625的四次根是.5，.25是有效质量数值而非温度比。','sterile sterile_temp gdef grho')],
'Python用G=.992，Ω=1-1/G，m=2*Δ^.75，R=119+20*m逐项核算。三组(m,R,ρDE/ρΛ)为(.25,124,0)、(.0632455532,120.2649111,.0298807115)、(.432,127.64,-.02912)。','sterile sterile_temp gdef grho')
add('P10','一个分析管线同时跟踪全示踪物的冷暗物质密度—涨落振幅二维误差椭圆，以及独立的红移分箱 Ωm 线性斜率。前者采用加入双谱单极矩后的报告边际误差缩减，加入前相关系数为0、加入后假设为0.5；后者仍用报告的0.022±0.012，不假定两分析之间有信息传递。二维椭圆面积正比 σ1σ2√(1−ρ²)。哪些记录正确？',[
('前者面积新/旧约为0.7815，而不是仅由两个边际误差缩减得到的0.9024。',True,'全示踪物误差因子为.94和.96，乘sqrt(.75)得.7815；相关变化也影响面积。','bis slope'),
('独立斜率的中心/标准差约1.83；前一分析的椭圆缩小不自动把这个斜率变成3σ结果。',True,'0.022/.012=1.8333；题设没有将双谱信息传递到该斜率。','slope bis'),
('若改用合并 LRG 样本的报告缩减且保持相同相关系数变化，面积比约0.6625。',True,'.85*.90*sqrt(.75)=.66251，须切换正确样本标签。','bis slope'),
('全示踪物与合并 LRG 应使用同样的15%、10%缩减，因为合并更多样本不会改变报告口径。',False,'原文全示踪物为6%、4%，LRG合并才是15%、10%。','bis slope'),
('斜率中心为正已经使增加趋势在 AIC 与 Bayes 证据下明确胜过常数模型。',False,'原文报告两模型在AIC与证据下统计不可区分。','slope bisprior'),
('误差椭圆面积减小约21.85%意味着斜率误差也必须减少21.85%。',False,'不同参数、不同分析，且题设不给协方差信息传播，无法进行该替换。','bis slope')],
'Python核验 .94*.96*sqrt(.75)=.7815013244；.85*.9*sqrt(.75)=.6625094339；.022/.012=1.8333333。误差椭圆与另一数据分析的显著性分开。','bis slope bisprior')
add('P11','在忽略辐射、空间平坦的背景诊断中，设 Ωm=0.30，z=1，E²=Ωm(1+z)³+(1−Ωm)X，Om=(E²−1)/[(1+z)³−1]。X为暗能量密度相对今天的比率。再允许一个真实w=−1、随时间变易感率的对应模型逐点复现同一背景。哪些判断成立？',[
('若X=0.8，则E²=2.96、Om=0.28；对应易感率模型也给出同一Om，不能据此把真实流体w判为小于−1。',True,'代数给.28，背景对应保留E与Om，但真实w仍固定-1。','om sus'),
('若X=1.2，则E²=3.24、Om=0.32；同样的背景诊断可出现在真实w=−1的易感率模型中。',True,'3.24减1除7=.32，背景等价不要求相同流体解释。','om sus'),
('X=0.8所得Om低于Ωm，与材料对phantom暗能量的背景诊断方向一致。',True,'原文phantom对应X<1且Om<Ωm；这里只说方向一致，不证明真实流体性质。','om sus'),
('若测得Om=0.28，使用标准背景公式反推X应为1.2。',False,'反解X=[1+7*.28-2.4]/.7=.8。','om sus'),
('因为z=1不在Om诊断适用区间，以上比较都应被材料的低红移限制排除。',False,'原文建议约.1到4–5，z=1在内。','omrange sus'),
('易感率模型真实w恒为−1，必使Om在任意z都等于0.30，即使已要求它复现X=0.8的E²。',False,'这把标准GR常数暗能量结论错施于修改的引力与连续方程；背景对应允许动态有效w。','sus om')],
'Python核验E²=.3*8+.7*X，Om=(E²-1)/7；X=.8→(2.96,.28)，X=1.2→(3.24,.32)。同一背景函数进入诊断，但真实流体解释不同。','om omrange sus')
add('P12','服务端须保留既有 matching 后端，只允许增加一次随综合征规模线性增长的预处理；不得拒绝 shot，也不允许把后端改成原生超图求解器。目标是利用电路超边信息。哪些建议符合这个完整接口约束？',[
('用局部综合征 motif 调整匹配图边权的前端符合要求，但 motif 出现是故障证据而不是故障发生的逻辑等价证明。',True,'SMP明确线性预处理并保留matching，且措辞是evidence。','smp motif mwpf'),
('把 MWPF 当成新的后端可保留原生超边结构，但它违反本题不替换 matching 后端的接口要求。',True,'MWPF是原生超图解码路径，不等于轻量前端。','mwpf smp'),
('将图神经后选择输出用作拒绝门，虽然可降低保留样本的失败率，却违反本题不得拒绝 shot 的要求。',True,'后选择通过拒绝shot改善条件LER，接口与SMP保留所有shot不同。','post postinput smp'),
('既有后端使用匹配图，所以任何利用超边信息的前处理在逻辑上都不可能。',False,'SMP即通过局部证据重加权匹配图实现该功能。','smp mwpf'),
('可把SMP的线性复杂度直接改写为整个 matching 解码流水线总复杂度线性，因为预处理和后端是同一操作。',False,'原文线性复杂度限定预处理；保留matching后端说明仍有后端计算。','smp mwpf'),
('若局部 motif 符合，就必须在所有 shot 上以概率1锁定该超边故障，才能称为利用超边信息。',False,'材料只把motif当增加故障后验的证据，不是确定判定。','motif smp postinput')],
'对每项同时检查保留后端、线性额外步骤、不拒绝shot三个条件；再把概率证据和确定性故障判断区分。','smp motif mwpf post postinput')
add('P13','审查一份因果解释表：某增长分析在加入RSD时同时改变正则扰动支持；另一热遗迹分析检查了有效质量的诱导先验；第三个指数引力模型出现参数级非零偏离。以下对控制实验的安排哪些成立？',[
('对RSD的贡献应固定支持再比较有无RSD，否则后验穿越权重变化混合了似然与支持效应。',True,'作者明确说明增长分析增加支持约束；不能全部归因似然。','svtsupport sterile_prior'),
('热遗迹的诱导先验对照可反驳「位移全由变量变换先验体积造成」；但它不替另一个RSD分析完成固定支持对照。',True,'两研究所控制因素不同，一个结果不能填补另一研究的因果对照。','sterile_prior svtsupport'),
('指数引力模型的参数级偏离还需模型级比较；不能用热遗迹的先验对照替代它的信息准则评估。',True,'f(T)原文明确参数级偏离不等于模型偏好。','ftcriteria sterile_prior'),
('只要三个研究都报告非ΛCDM特征，就可以把三个σ值相加作为统一模型证据。',False,'对象与数据/支持不同，且参数级偏离与证据不是同一量。','svtsupport sterile_prior ftcriteria'),
('增长分析在两种先验规范下Bayes因子都大于1，说明先验规范对其数值完全没有影响。',False,'原文明确量化Bayes因子依赖正则支先验归一。','svtprior sterile_prior'),
('诱导先验检查证明热遗迹质量位移完全不受任何先验选择影响。',False,'原文只排除solely由变换先验体积造成，未给先验独立性。','sterile_prior svtprior')],
'对照变量必须与被解释效应对应：支持、诱导先验、模型复杂度分别是不同审计轴。保留作者主张的限定词not solely。','svtsupport svtprior sterile_prior ftcriteria')
add('P14','用两个报告数做一个纯诊断计算：H0=70.9±0.7与73.50±0.81，暂按独立高斯作差。另有亮标准汽笛预报会改变注入的fiducial，并报告近似恒定分数精度。哪些计算和解释成立？',[
('上述独立高斯差值的标准化距离约为2.43；它是本题诊断值，不能因真实拟合已包含后一个H0约束而宣称是独立数据张力测量。',True,'数字给2.6/sqrt(.7²+.81²)=2.42863，而原热遗迹拟合含HDN约束。','sterile_res sterile_hdn sirens_mock'),
('若汽笛在H0=40与80时都达到1%分数精度，绝对误差分别0.4与0.8；后者更大的绝对误差不表示分数信息更差。',True,'同分数精度性质支持这种受控演算，需区分绝对与相对误差。','sirens_precision sterile_res'),
('将汽笛预报中的fiducial改成70.9，是重新注入假设宇宙，而不是从真实LISA观测获得一个新H0实测点。',True,'材料明确使用mock catalogs，热遗迹70.9为另一组合后验。','sirens_mock sterile_res'),
('独立高斯差值的分母应取0.81−0.7，所以这两数相差约23.6σ。',False,'独立方差相加，不是标准差相减；正确约2.43。','sterile_res sterile_hdn'),
('因波形可在不同H0下恢复相似分数精度，它本身会以先验形式排除35至115范围内不合理的H0。',False,'原文说排除来自电磁比较，非波形自身先验。','sirens_precision sterile_hdn'),
('因70.9±0.7已来自含HDN的后验，该后验与HDN在现实中必然完全独立。',False,'同一测量已进入似然，独立性仅为本题算术假设，不是现实属性。','sterile_hdn sterile_res sirens_mock')],
'Python核验2.6/math.sqrt(.7**2+.81**2)=2.4286341175；.01*40=.4、.01*80=.8。显式把受控独立近似与真实共享输入区别。','sterile_res sterile_hdn sirens_mock sirens_precision')
add('P15','有提案要用小尺度结构联合识别两种暗物质机制：一种是凝聚时形成、初始相对论性的束缚暗物质；另一种是不同温度的热分布无菌中微子。现有拟合不含前者所讨论的卫星尺度数据。哪些预测管理记录正确？',[
('两机制都可能通过自由流动抑制小尺度结构，因此「观察到抑制」不足以只凭机制名称确定是哪一类；还应对质量、温度或形成条件作定量比较。',True,'BDM形成时自由流动，热遗迹有效质量与热丰度相联，宽泛抑制不是唯一签名。','bdm sterile'),
('固定热遗迹ms,eff时，若温度比从0.5升为0.8，物理质量应乘(0.5/0.8)³≈0.2441，而不能保持原值。',True,'ms,eff=ms*r³，固定有效质量要求ms反比r³；需与不同形成机制分开。','sterile sterile_temp bdm'),
('束缚暗物质拟合已验证卫星星系丰度问题解决，因此可把该结论当作联合识别的已观测标签。',False,'作者明确当前数据不触及这些尺度，不声称卫星丰度结果。','bdm_scope sterile_prior'),
('对热遗迹降低温度同时保持物理质量不变，会降低有效质量；对束缚暗物质则不能不加推导就套同一个热分布关系。',True,'热关系依赖特定分布，BDM是凝聚形成机制，材料未给其同一温度参数化。','sterile sterile_temp bdm'),
('两机制都有小尺度抑制，就可把热遗迹的ΔNeff直接重命名成束缚暗物质凝聚能标而保留后验。',False,'参数物理含义和量纲不同，且对应机制与分布不同。','sterile bdm bd m_scope'.replace('bd m_scope','bdm_scope')),
('因为当前束缚暗物质拟合不含卫星尺度，它就不允许提出任何未来小尺度检验。',False,'原文恰将小尺度抑制作为该机制预测/动机，限制的是当前验证范围。','bdm bdm_scope sterile')],
'Python核验(.5/.8)**3=.244140625。区分共同的自由流动效应、热分布的特定质量关系、当前数据范围和未来可检验预测。','bdm bdm_scope sterile sterile_temp sterile_prior')
add('P16','一套后选择器的保留率为0.90，条件失败率为基线p的1/740；另一个管线使用噪声敏感度定义 S=P(L=1|E=1)−P(L=1|E=0)。这里不把后选择与降低物理噪声混为一谈。哪些统计记录正确？',[
('每次原始尝试产生「保留且失败」的概率是0.90p/740。',True,'联合概率=保留率×保留条件失败率。','post sens'),
('原始失败中被拒绝的比例为1−0.90/740，约99.8784%。',True,'总失败概率p，保留失败概率.9p/740，差除p。','post sens'),
('若某独立噪声分量的两条件失败率为0.02与0.03，则S=−0.01；固定其他分量时，小幅降低其噪声概率会一阶提高总失败率。',True,'S为带符号导数，负S与负δλ乘积为正；后选择低条件LER不改变该定义。','sens linear post'),
('0.90/740是被拒绝shot占所有shot的比例。',False,'拒绝总比例是.10；.9/740是基线失败中保留的比例。','post sens'),
('后选择把失败率压低740倍，证明原始物理错误概率也同步降低740倍。',False,'后选择改变交付样本分布，不等同修改物理噪声；敏感度针对噪声参数。','post sens'),
('敏感度既然表示风险，就应先取绝对值再用于任何一阶变化公式。',False,'导数与一阶变化保留符号；绝对值会把负敏感度方向翻转。','sens linear post')],
'Python核验1-.9/740=.9987837838。联合/条件概率使用不同分母；敏感度方向由δP≈Sδλ判断。','post sens linear')
add('P17','某固定码与解码器下，三个独立噪声组件的(当前概率λ，带符号敏感度S)分别为a=(0.001,0.20)、b=(0.004,0.08)、c=(0.002,−0.03)。只够把一个组件噪声减半，成本相同，使用一阶近似。随后团队还打算改动局部Clifford形变并替换解码器。哪些决策正确？',[
('当前设置应优先减半b，因为预测失败率降低0.00016，超过a的0.00010。',True,'相同相对干预按λS排序，而非只按S；b风险.00032>a .00020。','risk linear cd'),
('若只按敏感度数值最大选a，会错过本题一阶收益最大项。',True,'S最大不代表给定相对降噪时λS最大；噪声概率不同。','sens risk cd'),
('减半c的一阶结果是失败率上升0.00003。',True,'δλ=-.001乘S=-.03得+.00003，负敏感度应保留符号。','sens linear cd'),
('改动形变或解码器后，原排序可以永久沿用，因为Clifford等价保证任何噪声和解码器下LER相同。',False,'形变研究明确最优CD强烈依赖噪声与解码器；导数是在原模型/解码器下定义。','cd sens'),
('以上减半收益都是严格有限变化恒等式，即使组件相关结构与其他参数同时改变也成立。',False,'材料一般关系为一阶近似，且题设固定其他条件。','linear cd'),
('若新解码器性能更好，则c的敏感度必从负变正，无需重新估计。',False,'整体LER优劣不确定每个局部导数符号，最优策略须依赖新设置。','sens cd')],
'Python核验减半收益 .5*λ*S：a=.0001，b=.00016，c=-.00003。固定当前设置选择b；形变或后端变化后重新估计。','sens risk linear cd')
add('P18','考虑 |ψ⟩=CCZ|+⟩⊗3，先测X₁，结果s=±1。另一方面，表面码存在纯近邻相干ZZ的高效采样算法，但混合单比特Z与ZZ的一般问题有复杂性障碍。以下对「有一个好分支就足够」的模拟认证意见哪些正确？',[
('s=+1的概率为3/4，其归一化态有6个等模非零计算基振幅；支撑大小已排除它属于3PP态。',True,'CCZ投影正支为|+>⊗(|00>+|01>+|10>)；6非2幂，非仿射支持。','ccz ppsupport'),
('s=−1的概率为1/4，支撑为2个基态；即使这个分支属于3PP，也不能使整个X₁测量兼容。',True,'兼容要求每个非零概率结果都在3PP类，正支已经失败。','3pp ccz'),
('若任务是无条件精确采样，直接扔掉s=+1分支会改变目标分布；这种筛掉难分支的做法应明确视为后选择。',True,'+分支概率非零且占3/4；后选择降低yield，不能冒充原分布模拟。','3pp ccz postcost'),
('正支虽有6个支撑点，但因为每个振幅等模，它仍必为3PP态。',False,'等模之外还要求支撑为仿射子空间；6非2幂。','ppsupport ccz'),
('纯ZZ串扰可解意味着把相干单比特Z项加进去也必可解，就像只要保留本例的负支便可认证全部测量一样。',False,'两种推理均忽略闭包；混合噪声有复杂性障碍，测量需逐分支兼容。','purezz coherent 3pp ccz'),
('若把正支丢弃，保留率应为3/4。',False,'只保留负支概率1/4，3/4是丢弃比例。','ccz postcost')],
'Python枚举8个幅值，施加(1±X1)/2，得到概率(.75,.25)与支撑(6,2)。3PP需要全部非零结果闭包；单个易解分支不认证全集。','3pp ccz ppsupport purezz coherent postcost')
add('P19','为两个逻辑位比较同距离存储预算。拼接方案取d=2t，使用报告的严格上界N<2(2t+1)²；基准为两个独立距离d的rotated patch，每个总位数2d²−1。另一模块化方案把一个extractor的大小估计为memory本体的1/4.5。所有数只用于本题理想化预算，不混入计算区。哪些结论成立？',[
('t=3时，拼接N<98而两个独立patch共142；因此上界已保证节省比例大于约30.99%。',True,'1-98/142=.309859；严格N<98使节省严格大于此值。','stitch surf extractor'),
('t=4时，拼接N<162而基准254，保证节省大于约36.22%。',True,'1-162/254=.3622047，比较同样两个逻辑位和同距离8。','stitch surf extractor'),
('一个extractor若为memory大小的1/4.5，则memory+extractor约为memory的1.2222倍。',True,'只计一套提取器时总比例1+1/4.5。与拼接N口径均需声明辅助资源。','extractor stitch'),
('N<98可直接写成拼接方案实测正好使用98个物理位。',False,'严格上界不是精确实现数，更不是实测数。','stitch surf'),
('两个独立distance-6 patch只需要71个位，因此t=3的拼接上界没有节省。',False,'71是单patch，两个为142；逻辑位数需相同。','surf stitch'),
('把大小为1/4.5的extractor加入memory后，其总开销为memory的4.5倍。',False,'较小因子需取倒数后相加，结果约1.2222。','extractor stitch')],
'Python核验 t=3:upper98,base142,saving>.3098591549；t=4:upper162,base254,saving>.3622047244；1+1/4.5=1.2222222。','stitch surf extractor')
add('P20','一个可扩展搜索计划将码距d增大：局部Clifford变形的候选与XZZX只在O(d⁻¹)比例的数据位上不同，数据位总量O(d²)；验证器对超出3PP闭包的状态使用DCP-rank展开。哪些资源推断正确？',[
('发生形变差异的数据位数可以是O(d)，并不必然趋于零。',True,'总量O(d²)乘比例O(d^-1)=O(d)；比例缩小不代表绝对数量消失。','bxx stitch_data'),
('材料中边界级小比例形变在d=3到11的相对优势增加，与「改动比例变小」并不矛盾。',True,'报告优势从约5%到12%，绝对差异可随d线性增长。','bxx stitch_data'),
('DCP-rank不大于stabilizer rank，仍不足以保证这个验证器在所有候选上多项式运行。',True,'rank可指数增长；只有兼容闭包等条件才给多项式保证。','rank 3pp bxx'),
('形变差异占比O(d⁻¹)意味着物理修改位数为O(1/d)，在大d必少于1。',False,'遗漏数据位总数O(d²)因子。','bxx stitch_data'),
('既然DCP态严格扩展稳定子态，任何DCP-rank展开都只需一个分量。',False,'扩展态类不覆盖全部状态，rank仍可指数。','rank bxx'),
('B-XZZX在指定噪声与解码器下的优势能直接给任意新后端的完整候选排序。',False,'最优变形依赖噪声和解码器，不能转移已测排序。','cd bxx rank')],
'使用增长阶乘法与rank上界的逻辑：相对少量不等于绝对常数；一个指数上界的改善不自动成为多项式。','bxx stitch_data rank 3pp cd')
add('P21','按材料中统一束缚暗部门与自由CPL的三个同数据比较，二者相对ΛCDM的lnB分别为(4.09,4.12,4.83)与(−2.11,−0.26,−0.56)。本题把摘要显示的两位小数数值直接作为计算输入，按同列ΛCDM参考分别作差，不采用正文另外报告的两模型直接比较值；两候选先验模型概率相同。另一个指数引力模型报告参数非零却没有清楚的信息准则优势。哪些审计结果正确？',[
('三列束缚暗部门相对自由CPL的ln证据比分别为6.20、4.38、5.39。',True,'共享同列参考ΛCDM，取差消去参考证据；不能把参数偏离当证据。','bde_evidence ftcriteria'),
('对应证据比分别约493、80、219，因此最大相对倍率在第一列，而不是lnB束缚暗部门最大的第三列。',True,'指数分别492.75、79.84、219.20；比较两模型需差，不只看一模型lnB。','bde_evidence ftcriteria'),
('第一列若只在这两个模型间归一，束缚暗部门后验模型概率约0.99797。',True,'相等先验下p=exp(6.2)/(1+exp(6.2))。','bde_evidence ftcriteria'),
('指数引力模型的变形参数非零可直接换算成lnB=4.83，与第三列合并。',False,'参数级偏离没有这项证据转换，且不是同模型同统计比较。','ftcriteria bde_evidence'),
('把三列6.20、4.38、5.39相加，必然得到三个独立实验的合并ln证据比。',False,'各列共享宇宙学数据且更换超新星组合，题设仅逐列比较，不授权似然独立乘积。','bde_evidence ftcriteria'),
('在相等模型先验下，ln证据比4.38意味着两模型后验概率比只有4.38。',False,'概率比为exp(4.38)约79.84，ln不能直接当倍率。','bde_evidence ftcriteria')],
'Python核验差[6.2,4.38,5.39]，exp约[492.749,79.838,219.203]；logistic(6.2)=.99797468。不跨数据组合相乘。','bde_evidence ftcriteria')
add('P22','现在把两种CPL背景用于机制筛选，均只考察连续区间0≤z≤2：背景甲(w0,wa)=(−0.8,−0.6)，背景乙=(−1.1,+0.4)，采用w(z)=w0+wa z/(1+z)。筛选目标是「早期低于−1、今天高于−1」；另一个易感率框架可为GR给定的w(z)构造相同背景。哪些判断正确？',[
('甲在z=0.5穿越且方向符合筛选目标；乙在z=1/3穿越但方向相反。',True,'解1+w0+wa*z/(1+z)=0：甲.5、乙1/3；端点符号给方向。','svt sus'),
('两者都在区间内穿越，但只有甲符合所述标量—矢量分工支持的方向。',True,'SVT叙述早期vector驱动phantom，后来scalar越过-1，方向与甲相同。','svt sus'),
('易感率框架的背景对应不因乙方向相反而自动失效；真实w可仍固定−1。',True,'对应声明针对每个GR w(z)，不是只针对某一种方向。','sus svt'),
('甲与乙同有一次穿越，所以两者均通过有方向的筛选器。',False,'是否穿越与方向不同，乙今天-1.1而早期升高。','svt sus'),
('甲在z=2的w为−1.2，乙为−0.8333，因此乙更符合早期phantom的要求。',False,'数值正确但分类相反，早期phantom需低于-1，甲符合。','svt sus'),
('只要易感率模型复现甲的背景，它的真实流体w就必随z取−0.8到−1.2。',False,'复现的是有效背景，真实流体w可恒定-1。','sus svt')],
'Python求z=-(1+w0)/(1+w0+wa)：甲.5，乙1/3；w(2)分别-1.2、-.833333。用端点确定方向，不能仅检查零点存在。','svt sus')
add('P23','同一评估计划需要区分三种“提高可靠性”的分母：硬件噪声干预后所有shot的失败率、后选择保留shot的失败率、改进matching前端后所有shot的失败率。只讨论文中所列设置，不把各项性能相乘。哪些记录在语义和数值上都成立？',[
('报告“最多降低77.8%”对应新/旧失败率0.222；报告六CNOT降低35.5%对应0.645，两者均不是后选择产率。',True,'SMP两项收益为失败概率相对降低，分别余22.2%、64.5%。','smpgain post'),
('保留90%的BB后选择结果中，3700或740倍指保留样本条件失败率倍率；要比较原始尝试吞吐还需乘产率。',True,'条件LER与原始尝试产率是不同维度，不能把3700当吞吐提升。','post smpgain'),
('定向降噪报告15%–25%失败率降低，并不要求丢掉15%–25%的shot。',True,'干预改变选中组件噪声而非数据拒绝，后选择才改变yield。','target post'),
('把SMP的77.8%降低解释为保留77.8%的shot，就能与90%yield直接平均得到整体保留率。',False,'77.8%为相对LER收益，90%为yield，量不同。','smpgain post'),
('将77.8%、35.5%、25%依次相乘可证明一套统一电路的总收益，因为三者都叫失败率改进。',False,'来自不同码/电路/干预比较，未报告联合流水线或独立效应。','smpgain target post'),
('对相同基线失败率，降低35.5%与降低到35.5%是同一数值变换。',False,'前者新率.645p，后者.355p，不相同。','smpgain post')],
'Python核验1-.778=.222、1-.355=.645。把失效率的变化、条件化和产率三种分母单独列出。','smpgain target post')
add('P24','一个固定器件上的在线流水线要应对跨实验噪声变化：可预训练和硬件微调神经解码器，可采用跨测量噪声范围联合训练，也可做局部Clifford形变搜索。哪些更新策略受到材料支持？',[
('保留可重用局部编码器并在硬件上微调、调整轻量空间聚合，与材料的跨实验移植路径相符；不能等同于完全零适配。',True,'神经解码器明确sim pretrain+hardware finetune与聚合适配，形变也依赖设置。','modular cd'),
('在所报告的稳定性实验中，可对预读出旋转扫描产生的测量误差范围训练一个联合解码器；这不是每个点都要独立重新校准的方案。',True,'原文明确一个decoder联合训练整个噪声范围。','stability modular cd'),
('若换了神经解码器，Clifford形变的搜索目标应使用新后端的失败率，而不把旧PyMatching下最优候选视为定义上最优。',True,'最优CD依赖decoder，神经后端改变目标函数。','cd modular'),
('同一个神经网络能覆盖一个测量噪声扫描，证明所有Clifford形变的排序在任意噪声下不变。',False,'一个有限实验的联合训练不消除形变的噪声/后端依赖。','stability cd'),
('模拟预训练之后仍需硬件微调，所以材料报告的跨器件移植没有使用共同训练管线。',False,'原文明示共同pipeline加微调，微调不否定共同管线。','modular cd'),
('轻量空间聚合被适配意味着无需读取新的综合征或硬件数据就自动完成适配。',False,'材料路径包含hardware finetuning，不是无数据适配。','modular stability cd')],
'把共享模型构件、适配步骤和目标函数区分。联合训练覆盖一个噪声范围不等于对任意硬件、形变和后端的无条件泛化。','modular stability cd')
add('XP01','考察一个独立Bernoulli故障分量E，概率λ。两条件失败率为P(L|E=1)=0.40、P(L|E=0)=0.02；后选择器在这两类中的保留率分别0.20、0.90，且给定E后保留事件与L独立。本题所有条件概率随λ不变。将噪声敏感度框架与后选择条件LER结合，判断哪些记录正确。',[
('λ=0.10时，原始LER=0.058，产率=0.83，交付LER约0.02916。',True,'原始混合.1*.4+.9*.02；保留失败.1*.2*.4+.9*.9*.02=.0242，再除.83。','sens post'),
('λ=0.10处，原始LER对λ的导数为0.38，交付LER对λ的导数约0.09929。',True,'交付LER是(.018+.062λ)/(.9-.7λ)，商导数=.0684/(.9-.7λ)²。','sens post'),
('将λ减到0.05，产率升至0.865，交付LER约0.02439；必须重新计算产率，不能固定为0.83。',True,'保留概率依赖E的权重，λ变化改变边际产率。','sens post'),
('交付LER对λ的导数等于原始敏感度0.38除以原始产率0.83。',False,'忽略保留失败分子不同且分母也依赖λ，正确约.09929。','sens post'),
('λ减半后的交付LER也严格减半，因为只降低一个噪声分量。',False,'存在E=0失败与条件化非线性，实际.02916→.02439。','sens linear post'),
('λ=0.10时，0.0242是每次原始尝试的保留且失败概率，0.02916则是每个交付shot的失败概率。',True,'联合与条件概率不同分母，.0242/.83约.02916。','sens post')],
'Python核验p=.02+.38λ，y=.9-.7λ，u=.018+.062λ，p_keep=u/y；λ=.1→(.058,.83,.0291566265)，λ=.05→(.039,.865,.0243930636)，导数.0684/.83²=.0992887212。','sens linear post')
add('XP02','对四patch拼接码准备一批等syndrome非平凡逻辑门候选。只进行两项认证：①生成元最大物理重量wmax不违反材料的必要下界；②3PP电路的理想X测量结构足以按文中定理认证任意插入DCP故障后的闭包，反馈也限于该定理允许的类。不把通过必要条件当作门构造成功。哪些候选同时通过这两项？',[
('t=2、wmax=2；每个理想X测量均反对易于当前某Z稳定子；反馈为DCP。',True,'距离4所需下界2满足，反对易分支与DCP反馈满足闭包定理。','stitch bound 3ppnoise'),
('t=3、wmax=2；每个理想X测量均确定；反馈为DCP。',False,'模拟条件虽足够，但距离6的重量下界3被违反。','stitch bound 3ppnoise'),
('t=4、wmax=4；每个理想X测量均确定；反馈可为任意非DCP操作。',False,'重量够，但定理限制反馈为DCP，不能认证任意反馈。','stitch bound 3ppnoise'),
('t=5、wmax=6；每个理想X测量均确定或反对易于当前某Z稳定子；反馈为DCP。',True,'距离10的下界5，6不违反；闭包条件均满足。','stitch bound 3ppnoise'),
('t=4、wmax=4；包含对CCZ|+⟩⊗3的X₁测量；仅因为负结果支属于3PP就认证该测量；反馈为DCP。',False,'正结果支有六点非仿射支持，测量不兼容。','stitch bound ccz 3pp'),
('t=3、wmax=3；每个理想X测量均反对易于当前某Z稳定子；要求把DCP反馈限制删去后仍由同一定理自动认证。',False,'删除反馈假设后不能继续引用原充分条件。','stitch bound 3ppnoise')],
'拼接d=2t使ceil(d/2)=t；逐条先检查wmax≥t，再检查所有测量与反馈条件，只有两候选满足。','stitch bound 3ppnoise ccz 3pp')
add('XP03','模拟一项受限动力学模型的证据审计。其背景轨迹由x∈[0,1]唯一参数化，观测坐标u=x²，玩具似然L=u。先验方案甲为x均匀；乙为u均匀（均沿同一轨迹）。随后正则物理支持缩成x∈[1/2,1]：方案丙仍按原x先验密度积分、区外似然置零；丁将剩余x支持重新归一。哪些结论正确？',[
('甲证据为1/3，乙为1/2；两者的物理轨迹相同仍不意味着先验测度相同。',True,'∫x²dx=1/3；∫udu=1/2，理论一维支持不确定其测度。','rr svtprior'),
('丙证据为7/24，丁为7/12；丁/丙=2来自支持归一，而不是加入新数据。',True,'积分[.5,1]x²=7/24；剩余长度.5，归一乘2。','rr svtprior svtsupport'),
('丁相对甲证据提高7/4，尽管它删除了低似然区；要把提高称为新增观测效果，还必须有额外数据对照。',True,'(7/12)/(1/3)=7/4，变化源于支持和归一。','svtprior svtsupport rr'),
('甲与乙只是在同一轨迹上换坐标，因此不管是否带Jacobian其证据都必须相等。',False,'均匀x与均匀u不是同一个先验的坐标表示；变换需Jacobian。','rr svtprior'),
('丙把区外似然设零而丁重新归一，所以丁还应再额外乘0.5作为有效样本比例。',False,'再乘.5会退回丙，重复抵消支持归一。','svtprior svtsupport'),
('如果把该一维轨迹置于二维CPL平面中，给整片平面均匀先验再任意选择最优点，便仍是原受限模型的同一证据。',False,'扩大支持与测度改变模型；实际动力学只达受限轨迹。','rr svtprior')],
'Python核验积分Zx=1/3、Zu=1/2、Zold_support=(1-.5³)/3=7/24、Zrenorm=7/12及比2、7/4。明确区分相同支持、不同测度和新似然。','rr svtprior svtsupport')
add('XP04','一个组件在三个电路位置重复出现，共享物理噪声率p=0.002；按原固定解码器估计三位置敏感度为0.10、−0.04、0.20。另一组件仅出现一次，噪声率0.004，敏感度0.15。预算足够对其中一个物理组件降噪25%，每个组件的成本相同；若随后更换形变和解码器，另行重估。哪些记录正确？',[
('重复组件的共享率敏感度为0.26，不能把三项先取绝对值再相加成0.34。',True,'共享参数的链式法则为带符号敏感度求和。','chain sens cd'),
('重复组件与单次组件的一阶收益分别0.00013、0.00015，故该预算下应选后者。',True,'.25*.002*.26=.00013；.25*.004*.15=.00015。','chain risk linear cd'),
('若按最大单位置敏感度0.20>0.15选重复组件，将与按每个物理组件收益最大化的决策不同。',True,'单位置最大值未考虑共享率求和及不同噪声率。','chain risk cd'),
('重复组件出现三次，所以还应在已求和的0.26之外再乘3得到共享率敏感度。',False,'位置已在求和中计入，再乘3重复计算。','chain risk cd'),
('把后端换成不同解码器后，0.26仍是由硬件几何唯一决定、无需重新估计的常数。',False,'敏感度含固定解码器的失败事件，且形变最优性依赖后端。','sens cd chain'),
('上述有限25%改动的收益被材料的一阶展开严格保证为无近似结果。',False,'文中一般关系明确一阶近似；共享组件可含多位置，有限变动有高阶项。','linear chain cd')],
'Python核验sum=.26；.25*.002*.26=.00013；.25*.004*.15=.00015。共享物理组件与独立电路位置是不同聚合层级。','chain sens risk linear cd')
add('XP05','设计一次观测分配：A路线只提高同一背景距离函数精度；B路线增加kSZ；C路线增加增长率资料并明确记录附带的物理支持切割。备选解释包括真实w固定−1的易感率对应、弱径向非均匀Λ，以及标量—矢量驱动的方向性穿越。哪些「若…则…」实验记录成立？',[
('若A路线发现所有背景函数仍相同，则仅靠该结果不能在易感率对应与原GR动态暗能量之间判别；B路线对径向非均匀却可提供独立于距离拟合的排除力。',True,'背景对应限定H(z)等，ΛLTB的kSZ确实削减距离允许空间。','sus ltb'),
('若C路线同时改变支持，则可以先在原支持下计算新似然贡献，再与重新归一支持的结果并列，区分信息与先验体积效应。',True,'SVT文明确增长分析支持条件同步变化和先验归一影响证据。','svtsupport svtprior sus'),
('若B路线仍留下约300 Mpc/h、约10%过密区，就与材料报告相容；不能将“排除大部分”改写成全排除。',True,'这是ΛLTB摘要明确的剩余区域。','ltb sus'),
('若A路线无限精确，就自动等价于测定所有扰动与kSZ，因为它们都来自宇宙学。',False,'背景与扰动物理不同，既有背景对应不涵盖这些观测。','sus ltb svtsupport'),
('若C路线后穿越后验权重提高，就必定说明向量部门单独受到新增数据更强偏好，而与标量、支持或联合参数相关无关。',False,'该机制是标量矢量共同演化，且支持同时改变，不能作此单因果归因。','svt svtsupport'),
('若在近中心位置看到各向同性天空，B路线就不再有必要，因为非均匀模型已被A路线排除。',False,'近中心可近各向同性而径向非均匀仍存，kSZ正用于额外区分。','ltbsky ltb sus')],
'三条路线按可识别对象分配：重复背景提高精度、kSZ约束径向运动、增长资料加支持审计。该题考察干预信息源与因果解释。','sus ltb ltbsky svt svtsupport svtprior')
add('XP06','将物理噪声率p固定在相关噪声研究的两个η=100报告阈值的几何平均值；同一MWPF设置。另一团队只知道SMP可用线性预处理保留matching后端，并报告不同电路的失败率收益。哪些跨团队移交记录正确？',[
('p约为0.5020%，位于两个阈值之间；以中心值比较，XZZX通过低于阈值筛选而rotated不通过。',True,'sqrt(.36*.70)=.501996%，在.36与.70之间。','threshold mwpf smp'),
('p相对XZZX阈值的比约0.7171，相对rotated阈值的比约1.3944。',True,'几何平均使比值互为倒数：sqrt(.36/.70)与sqrt(.70/.36)。','threshold smp'),
('如果改成SMP加matching，必须另测阈值；其他电路的35.5%失败率降低不能当作阈值提高35.5%。',True,'一个是失效率有限点收益，一个是随码距的阈值；后端也变了。','threshold mwpf smp smpgain'),
('SMP六CNOT的失效率降低35.5%，因此在本题中rotated阈值必变为0.36%/(1−35.5%)。',False,'错误率倍率不能换算阈值，且电路/后端不同。','threshold smpgain mwpf'),
('几何平均等于两个阈值的算术平均0.53%，所以两码离阈值的相对距离完全相等。',False,'几何均值约.502，算术均值.53；比值互逆而非差值相同。','threshold smp'),
('SMP保留matching后端意味着它与原生超图MWPF是同一个解码算法的别名。',False,'前者局部证据投影重加权，后者原生处理超图，架构不同。','smp mwpf')],
'Python核验sqrt(.36*.70)=.5019960159（%），除.70=.7171371656，除.36=1.3944333776；不同误差统计量不可作百分比互换。','threshold mwpf smp smpgain')
add('XP07','一个管线将物理错误模型替换成Pauli twirling版本以加速验证，并将测量后的坏shot拒绝；另一管线按3PP理想测量定理在DCP故障下保持精确条件态。最终报告必须同时给出目标分布、保留率与复杂性条件。哪些表述准确？',[
('twirling管线可高效模拟所替换的模型，但若原噪声含相干干涉，必须标注它模拟的分布已改变。',True,'相干文明确twirling丢弃干涉；后选择又进一步改变交付条件分布。','twirl post'),
('若丢弃非兼容测量结果，必须把保留率计入资源比较；不能以剩余易解分支的精确性宣称无条件原分布也被精确模拟。',True,'3PP要求每个非零结果闭包，后选择以yield换LER。','3pp ccz postcost'),
('满足理想测量结构及DCP反馈条件时，可用定理覆盖任意插入DCP故障，无需逐个枚举全部带噪分支再证明兼容。',True,'正是理想条件向带噪分支闭包的充分定理。','3ppnoise twirl'),
('一般混合相干Z与ZZ问题的采样障碍，意味着所有纯ZZ或所有3PP电路也必指数困难。',False,'材料分别给出纯ZZ算法和受限3PP多项式算法，复杂性障碍针对一般混合类。','coherent purezz 3ppnoise'),
('只要把所有操作称为噪声，任意非DCP相干旋转都自动属于DCP故障定理。',False,'命名不能解除DCP操作类限制。','3ppnoise coherent'),
('把保留shot的条件失败率直接当作原始尝试失败率，会漏掉保留率这一条件化因素。',True,'联合保留失败=yield×条件LER；两分母不可省略。','post postcost 3pp')],
'依次审计模型替换、条件化、算法态类三个操作；精确性须相对于明确目标分布，复杂性结论须保留其运算类与假设。','twirl post postcost 3pp ccz 3ppnoise coherent purezz')
add('XP08','以不同证据层次给候选分组：组甲要求稳定有效穿越并且未来趋向de Sitter；组乙只要求在给定背景下用真实w=−1复现有效动态暗能量；组丙要求在文中数据组合下模型级证据优于ΛCDM，不要求穿越。选择哪些跨组记录同时符合材料？',[
('稳定参数区的高斯Gauss–Bonnet振荡模型可列甲；真实恒定w的易感率对应可列乙，但不能仅据此把它列甲。',True,'前者兼有稳定穿越和deSitter，后者背景对应但排除deSitter。','gbstable sus nods'),
('统一束缚暗部门模型从不穿越，仍可据报告正lnB列丙；「无穿越」不是模型证据劣于ΛCDM的充分条件。',True,'其动态w不跨-1但lnB均正，组丙不要求穿越。','bde bde_evidence gbstable'),
('指数f(T)的参数非零偏离，足以凭该事实直接放入有明确模型级优越证据的丙组。',False,'原文不支持清晰的信息准则偏好，参数证据与模型级证据不同。','ftcriteria bde_evidence'),
('慢滚尺度不变导数耦合类中，取满足无鬼的正有效耦合就同时满足其穿越条件，可列甲。',False,'该文主张穿越需负有效耦合，与无鬼正值冲突。','nogo gbstable'),
('稳定Gauss–Bonnet模型属于甲，就证明易感率模型必须有同一未来吸引子，因为两者都有有效穿越。',False,'未来吸引子受作用量与模型条件约束；前者可趋deSitter，后者不允许。','gbstable nods'),
('把受限非局域模型的实际CPL轨迹换成完整二维CPL面，再借其最佳拟合给原模型列丙，会改变被评价的模型。',True,'原理论固定标准参数时只沿受限轨迹；且报告无显著非局域偏好。','rr rrfit bde_evidence')],
'使用独立分组轴：动力学/稳定性与吸引子、背景等价、统计模型比较。三个轴有交集但不能从一个轴自动推出另两个轴。','gbstable sus nods bde bde_evidence ftcriteria nogo rr rrfit')
ev('sirens_sep','P10','the two fiducials differ by only 0.24 km s −1 Mpc−1 inH 0.')
ev('poly3','P24','p(x) =d+ n∑ i=1 aixi + 2 ∑ 1≤i<j≤n bijxixj + 4 ∑ 1≤i<j<k≤n cijkxixjxk,(2.3) with d,ai ∈Z8, bij ∈Z4, and cijk ∈Z2, and where arithmetic is modulo8.')
# Replace the three earlier follow-up drafts whose central decisions overlapped initial questions.
for ident in ['XP05','XP07','XP08']:
 Q['change']=[q for q in Q['change'] if q['id']!=ident]
 A['change']=[a for a in A['change'] if a['id']!=ident]
add('XP05','做一个一维、独立高斯的受控预报，保留电磁背景误差底限：取电磁σEM为热遗迹非平直动态暗能量拟合报告的H0误差，汽笛σGW(N)=10/√N km s⁻¹ Mpc⁻¹。定义D(N)=|ΔH0|/√[σEM²+σGW(N)²]。先取汽笛研究中Planck与Union3两个fiducial的H0间距；再取热遗迹报告中心与其HDN输入中心的差。这里独立性只是本题预算假设，不宣称原数据独立。哪些记录正确？',[
('对于第一种小间距，N→∞时D上限约0.343，因此本预算下再加汽笛也不能达到1σ。',True,'间距.24与误差底限.7给极限.24/.7=.342857。','sirens_precision sterile_res sirens_sep'),
('对于第二种间距，D的渐近上限约3.714。',True,'差值73.5-70.9=2.6，除底限.7=3.7142857。','sterile_res sterile_hdn sirens_sep'),
('第二种间距达到D≥3需要整数N至少383。',True,'2.6²/9-.7²=.2611111；N≥100/.2611111=382.9787。','sterile_res sterile_hdn sirens_precision'),
('把N从100增加到400会把整个D精确提高一倍，因为GW误差减半。',False,'总方差还有.7²底限，D倍率sqrt(1.49/.74)约1.419而非2。','sterile_res sirens_precision'),
('原热遗迹后验曾使用HDN输入，所以本题的独立高斯计算不能未经检验转写为真实的独立观测显著性。',True,'共享输入使现实独立性不成立；题目明确只是受控预算。','sterile_res sterile_hdn sirens_mock'),
('第一种间距无法达1σ，是因为模拟波形会先验禁止其中一个fiducial，令样本数无效。',False,'材料明确波形没有这种fiducial先验，预算障碍来自比较误差底限和小间距。','sirens_precision sirens_sep sterile_res')],
'Python核验sigmaEM=.7，delta_small=.24，delta_large=2.6；极限.342857和3.714286；ceil(100/(2.6²/9-.49))=383；D(400)/D(100)=sqrt(1.49/.74)≈1.4190。','sirens_sep sirens_precision sirens_mock sterile_res sterile_hdn')
add('XP07','用完整计算基支持的相位态|ψq⟩=2^(−n/2)Σx exp(iπq(x)/4)|x⟩验证逻辑旋转方案，相位一律mod 8。先检查它是否满足材料的三阶相位多项式加权系数形式；再检查一个距离8码的等syndrome非平凡门是否被生成元最大重量wmax的必要下界排除。只要求这两项筛查，不宣称门已构成。哪些候选同时通过？',[
('q=x₁+2x₁x₂+4x₁x₂x₃，wmax=4。',True,'线性系数任意、二次偶数、三次4倍数，且ceil(8/2)=4。','poly3 bound'),
('q=x₁x₂，wmax=4。',False,'唯一布尔多线性表示的二次系数1非偶数，不符3PP加权形式。','poly3 bound'),
('q=2x₁x₂x₃，wmax=5。',False,'三次系数2非4倍数，重量通过不补救相位态条件。','poly3 bound'),
('q=7x₁+6x₁x₂+4x₁x₂x₃，wmax=3。',False,'相位式满足3PP，但等syndrome距离8非平凡门需某生成元重量≥4。','poly3 bound'),
('q=7x₁+6x₁x₂+4x₁x₂x₃，wmax=5。',True,'三类系数合法且5≥4，通过两项必要筛查。','poly3 bound'),
('q=4x₁x₂x₃x₄，wmax=4。',False,'完整支持下非零四次布尔多线性项不能写为所列至三次的加权形式。','poly3 bound')],
'Python枚举全部0/1输入，用Möbius差分恢复模8布尔多线性系数：二次项须被2整除，三次须被4整除，四次及以上须为0。另检查wmax≥ceil(8/2)=4。','poly3 bound ppsupport')
add('XP08','估算热遗迹对背景引力源的一个代理量 F=(Gcosmo/GN)ms,eff（以eV计）。引力比采用其CMB+BAO报告值与误差；本题另设ms=1.00±0.10 eV、ΔNeff=0.16±0.02，ms与ΔNeff相关系数ρ=+0.5，引力比与它们独立。使用一阶高斯误差传播，随后把ρ改成−0.5而不改边际误差。哪些结果正确？',[
('中心F约0.25096 eV；ρ=+0.5时σF约0.04212 eV。',True,'F=.992*.16^.75；相对方差为(.0025/.992)²+.1²+(.75*.02/.16)²+2*.5*.1*(.75*.02/.16)。','gfit sterile'),
('把ρ改成−0.5后，中心F不变，一阶σF约0.02436 eV。',True,'中心不含协方差；交叉项从+.009375变成-.009375，误差降低。','gfit sterile'),
('在ρ=+0.5时，直接把ms、ΔNeff与引力比的相对误差平方相加会低估σF。',True,'遗漏正协方差项；且ΔNeff对F的对数导数为3/4。','sterile gfit'),
('ΔNeff对F的一阶相对误差贡献是(1/4)σΔ/Δ，因为温度取四次根。',False,'F使用有效质量，其热丰度指数3/4；1/4只适用于温度比。','sterile sterile_temp gfit'),
('引力比小于1应先取倒数再乘有效质量，所以中心F约0.25502 eV。',False,'题设代理量直接用Gcosmo/GN，倒数属于另一个量。','gfit gdef sterile'),
('相关系数改号会把ΔNeff的中心值从0.16改成−0.16。',False,'协方差符号不是参数中心符号，题设边际中心固定。','gfit sterile')],
'Python核验F=.992*.16**.75=.2509583551；v±=(.0025/.992)²+.1²+(.75*.02/.16)²±.009375，σ±=F*sqrt(v±)，约.04212与.02436。','gfit gdef sterile sterile_temp')
ev('window','P06','Due to the linear property of the window matrices, for both the power spectrum and bispectrum, as described in Section 2.4, the same weighted average is performed on')
ev('dl','P10','dL(z) = (1 +z)c Z z 0 dz′ H(z ′) ,(2.2)')
Q['change']=[q for q in Q['change'] if q['id']!='XP06'];A['change']=[a for a in A['change'] if a['id']!='XP06']
add('XP06','检查一个压缩管线里“先平均还是先变换”的顺序。窗口演示取W₁=[[1,0],[0,2]]、W₂=[[2,1],[0,1]]、权重1/4与3/4，共用理论向量b=(2,3)。距离演示则在同一z、保持无量纲E(z)=H(z)/H0完全相同下，对H0=60与80的两套luminosity distance以相同权重平均。哪些操作记录正确？',[
('先平均窗口再作用于b，所得向量为(5.75,3.75)，与分别作用后加权平均相同。',True,'窗口线性允许同一b提出加权和；矩阵计算给此向量。','window dl'),
('先平均距离再求等效H0，得到约73.846，而非H0加权算术平均75。',True,'固定E时dL∝1/H0，等效H0=1/(.25/60+.75/80)=960/13。','window dl'),
('窗口步骤能交换运算顺序，不意味着把参数拟合或倒数变换也与平均交换；两个演示中的区别来自线性与非线性。',True,'窗口线性不推广到H0的倒数映射。','window dl'),
('距离演示的等效H0必为75，因为窗口研究已证明一切加权宇宙学观测都可先平均参数。',False,'窗口结论只针对线性算子，距离对H0非线性。','window dl'),
('如果两窗口使用不同理论向量，仍能无条件提出同一个b，并沿用本题结果。',False,'共用理论向量是本题运算交换条件，不同向量不能如此因式分解。','window dl'),
('窗口加权结果的第二分量为6，因为W₁的第二行系数2必须对两个区域同时使用。',False,'第二分量=.25*6+.75*3=3.75，区域窗口权重不能混用。','window dl')],
'Python矩阵核验Wbar=[[1.75,.75],[0,1.25]]，Wbar*b=(5.75,3.75)；固定E的距离常数因子相同，Heff=1/(.25/60+.75/80)=73.84615385，Hmean=75。','window dl')
# Semantic revisions diversify the exact-answer cardinalities.
def edit(ident,needle,statement,correct,reason):
 phase='change' if ident.startswith('X') else 'initial';q=next(x for x in Q[phase] if x['id']==ident);a=next(x for x in A[phase] if x['id']==ident)
 ls=[k for k,v in q['options'].items() if needle in v];assert len(ls)==1,(ident,needle);k=ls[0]
 q['options'][k]=statement;a['optionAudit'][k].update(correct=correct,credit=int(correct),reason=reason)
 a['answer']=[k for k in 'ABCDEF' if a['optionAudit'][k]['correct']]
edit('P24','同一个神经网络能覆盖','同一个神经网络覆盖了报告中的测量噪声扫描，仍应针对新噪声与后端验证Clifford形变排序。',True,'联合训练的有限实验范围不解除最优CD的噪声/后端依赖。')
edit('P24','模拟预训练之后仍需','模拟预训练后进行硬件微调，与多个实验使用共同训练管线相容。',True,'原文明示共同pipeline含pretrain和finetune，并非互斥做法。')
edit('P12','若局部 motif 符合','局部motif符合只提供相关故障的概率证据，不能据此在每个shot上将故障概率锁定为1。',True,'原文用provides evidence而非确定等价，匹配重加权利用这类证据。')
edit('P15','因为当前束缚暗物质拟合不含','束缚暗物质当前拟合不含卫星尺度，但材料仍允许把小尺度抑制作为未来检验预测。',True,'原文明确动机和预测，限制的是现有数据可验证范围。')
edit('P17','当前设置应优先减半b','当前设置应优先减半a，因为其敏感度0.20大于b的0.08，足以保证它的相对降噪收益最大。',False,'相同相对降噪按λS排序，b的一阶收益.00016超过a的.00010。')
edit('P18','s=+1的概率为3/4','s=+1的概率为1/4，其归一化态有6个等模非零计算基振幅。',False,'六点支持正确，但正支概率为3/4而非1/4；整项为假。')
edit('P19','t=3时，拼接N<98','t=3时，拼接N<98而两个独立patch共142；因此这个上界本身保证节省比例大于40%。',False,'由上界直接保证的仅为1-98/142约30.99%，不能从此界推出>40%。')
edit('P20','材料中边界级小比例形变','材料中形变相对优势随d=3增至11而从约12%降到约5%，与改动比例缩小同向。',False,'原报告为约5%升至12%，选项倒置端点；占比不控制优势方向。')
# Remove source-derived facts from stems; retain genuinely hypothetical scene inputs.
replacements={
'P07':('策略甲假定能复现 72 比特 BB 后选择的报告倍率：保留率0.90、保留 shot 失败率p/3700。','策略甲假定能复现72比特BB码在10%拒绝设置下的后选择报告倍率。'),
'P10':('后者仍用报告的0.022±0.012','后者仍用报告的DR1/DR2合并线性斜率'),
'P11':('E²=Ωm(1+z)³+(1−Ωm)X，Om=(E²−1)/[(1+z)³−1]。','按材料中的E、Om与X定义计算。'),
'P14':('用两个报告数做一个纯诊断计算：H0=70.9±0.7与73.50±0.81','用热遗迹非平直动态暗能量模型摘要中的H0后验，与该研究采用的HDN中心及误差做一个纯诊断计算'),
'P16':('一套后选择器的保留率为0.90，条件失败率为基线p的1/740；','采用144比特BB码10%拒绝设置下的报告后选择器，把未后选择的失败率记为p；'),
'P19':('拼接方案取d=2t，使用报告的严格上界N<2(2t+1)²；基准为两个独立距离d的rotated patch，每个总位数2d²−1。另一模块化方案把一个extractor的大小估计为memory本体的1/4.5。','拼接方案取内层距离t，采用文中最终码距及严格物理位数上界；基准为两个独立的同样最终距离rotated patch，计入各自数据与辅助位。另一模块化方案按材料所报比例为memory加一套extractor。'),
'P20':('局部Clifford变形的候选与XZZX只在O(d⁻¹)比例的数据位上不同，数据位总量O(d²)；','局部Clifford变形候选采用B-XZZX相对XZZX的报告差异比例，并结合rotated patch数据位数随码距的标度；'),
'P21':('按材料中统一束缚暗部门与自由CPL的三个同数据比较，二者相对ΛCDM的lnB分别为(4.09,4.12,4.83)与(−2.11,−0.26,−0.56)。','采用统一束缚暗部门研究摘要按顺序列出的三套超新星组合下，该模型与自由CPL各自相对ΛCDM的lnB。')}
for ident,(old,new) in replacements.items():
 q=next(q for q in Q['initial'] if q['id']==ident);assert old in q['question'],ident;q['question']=q['question'].replace(old,new)
# Verify numeric derivations used above independently of formatted option text.
checks={
 'P07_break_even':(1/.9-1)/(.75-1/3700),
 'P10_area_all':.94*.96*math.sqrt(.75),'P10_area_lrg':.85*.90*math.sqrt(.75),
 'P14_gaussian':2.6/math.sqrt(.7**2+.81**2),
 'P21_ratios':[math.exp(x) for x in [6.2,4.38,5.39]],
 'XP01_derivative':.0684/.83**2,
 'XP05_min_N':math.ceil(100/(2.6**2/9-.7**2)),
 'XP08_center':.992*.16**.75,
 'XP08_sigmas':[.992*.16**.75*math.sqrt((.0025/.992)**2+.1**2+(.75*.02/.16)**2+2*r*.1*(.75*.02/.16)) for r in [.5,-.5]]}
assert abs(checks['P07_break_even']-.1482)<.0001
assert checks['XP05_min_N']==383
# Enumerate the CCZ measurement, and independently test weighted polynomial coefficients.
a=[(-1 if (i&1 and i&2 and i&4) else 1)/math.sqrt(8) for i in range(8)]
ccz=[]
for sign in [1,-1]:
 out=[(a[i]+sign*a[i^1])/2 for i in range(8)]
 ccz.append([sum(v*v for v in out),sum(abs(v)>1e-12 for v in out)])
assert abs(ccz[0][0]-.75)<1e-12 and ccz[0][1]==6
assert abs(ccz[1][0]-.25)<1e-12 and ccz[1][1]==2
checks['P18_CCZ']=ccz
funcs=[lambda x:x[0]+2*x[0]*x[1]+4*x[0]*x[1]*x[2],lambda x:x[0]*x[1],lambda x:2*x[0]*x[1]*x[2],lambda x:7*x[0]+6*x[0]*x[1]+4*x[0]*x[1]*x[2],lambda x:7*x[0]+6*x[0]*x[1]+4*x[0]*x[1]*x[2],lambda x:4*x[0]*x[1]*x[2]*x[3]]
valid=[]
for f in funcs:
 coef=[f([(m>>j)&1 for j in range(4)])%8 for m in range(16)]
 for j in range(4):
  for m in range(16):
   if m&(1<<j):coef[m]=(coef[m]-coef[m^(1<<j)])%8
 valid.append(all(c%({0:1,1:1,2:2,3:4}.get(bin(m).count('1'),8))==0 for m,c in enumerate(coef)))
assert valid==[True,False,False,True,True,False]
checks['XP07_polynomial_valid']=valid
for phase in Q:
 Q[phase].sort(key=lambda x:x['id']);A[phase].sort(key=lambda x:x['id'])
 assert all(1<len(a['answer'])<6 for a in A[phase])
assert len(Q['initial'])==24 and len(Q['change'])==8
assert sum(q['weight'] for q in Q['initial'])==34 and sum(q['weight'] for q in Q['change'])==34
assert sum(len(a['answer'])!=3 for aa in A.values() for a in aa)>=10
out=Path(__file__).with_name('physics.json');out.write_text(json.dumps({'questions':Q,'answers':A},ensure_ascii=False,indent=2)+'\n')
Path(__file__).with_name('physics-numeric-checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'written':str(out),'counts':{p:len(q) for p,q in Q.items()},'answerCounts':{str(k):sum(len(a['answer'])==k for aa in A.values() for a in aa) for k in range(2,6)},'numeric':checks},ensure_ascii=False))
