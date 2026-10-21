#!/usr/bin/env python3
"""Build and independently recalculate the host-only v4 mathematics bank.

All equalities below concern explicitly defined algebraic comparisons.  They do
not assert that a solution of one of the PDEs solves any of the other PDEs.
"""
from __future__ import annotations

import json
import math
import re
import sys
from fractions import Fraction as F
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PAPERS = ROOT / "research/longread-20261018/papers"
OUT = Path(__file__).with_name("math.json")
FILES = {k: next(PAPERS.glob(k + "-*.txt")) for k in ("M02", "M06", "M07", "M08", "M10", "M13", "M15", "M16", "M17", "M18", "M19", "M20", "M22", "M23", "M24", "M25")}
TEXT = {k: p.read_text() for k, p in FILES.items()}


def q(x: F) -> str:
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


def ev(source: str, start: str, stop: str, locator: str) -> dict:
    s = TEXT[source]
    i = s.index(start)
    j = s.index(stop, i) + len(stop)
    quote = s[i:j]
    assert re.sub(r"\s+", " ", quote) in re.sub(r"\s+", " ", s)
    return {"source": source, "path": str(FILES[source].relative_to(ROOT)), "locator": locator, "quote": quote}


E08 = [
    ev("M08", "For an ideal polytropic gas, the pressure is given by", "whereR >0 is the gas constant.", "PDF p.1, (1.2)"),
    ev("M08", "The end states and the shock speed satisfy the Rankine–Hugoniot condition:", "(1.4)", "PDF p.3, (1.4)"),
    ev("M08", "Lemma 2.3.Let(v −, u−, θ−)", "σ=σ(ε).(2.6)", "PDF pp.6–7, Lemma 2.3, (2.5)–(2.6)"),
]
E10 = [
    ev("M10", "We adopt the polytropic pressure lawp(ρ) =bργ", "normalize the coefficientb= 1in the sequel.", "PDF p.1, pressure law"),
    ev("M10", "µ(ρ) =ρ, λ(ρ)≡0, γ∈(1,2]", "(1.3)", "PDF p.2, (1.3)"),
]
E02 = [
    ev("M02", "These solutions are\ncharacterized by the pressure pM and velocity u being constant", "constant velocity\nu.", "PDF p.1, entropy-wave definition"),
    ev("M02", "(2.4)p(ρ, ϑ) =", "P(Z) =Zfor allZ∈[0, Z ].", "PDF p.8, (2.4) and ideal branch"),
]
E15 = [
    ev("M15", "LetN(T, V) be the\nsize of the largest 1-spaced subset", "[T,2T] :|ζ( 1\n2 +it)|⩾V}.", "PDF p.2, definition of N(T,V)"),
    ev("M15", "Theorem 1.3(Large value estimate).", "V − 128\n17 .", "PDF p.2, Theorem 1.3"),
]
E22 = [
    ev("M22", "Theorem 1.Letp, qbe distinct odd primes,T >1andH=T δ", ". We have", "PDF p.2, Theorem 1 range"),
    ev("M22", "the integral\nin the dual moment is essentially supported on an interval of length T\nH .", "T\nH .", "PDF p.2, text after (1.6)"),
    ev("M22", "(1.7) H2\nmax{p, q} > T 1+ϵ", "main term to dominate the error term.", "PDF p.2, (1.7)"),
]
E24 = [
    ev("M24", "Let\nc(θ) =", "θ0 = 0.5501....", "PDF p.2, c(theta) and positivity threshold"),
    ev("M24", "Theorem 1.1.For every fixedθ0<θ<1", "≥c(θ)>0.", "PDF p.2, Theorem 1.1"),
]
E17 = [
    ev("M17", "Corollary 1.Suppose0< α <1/6.", "C α,h0,t0 >0.", "PDF p.1, Corollary 1"),
    ev("M17", "1/16 100 10 100 L0.1374", "1/16 100 10 100 L0.1374", "PDF p.2, Table 1"),
]
E06=[ev("M06","We prove that, for a suitable small external force", "multiple solutions inL2(R2).", "PDF p.1, abstract")]
E07=[ev("M07","Abstract.We prove uniqueness of solutions to the Navier-Stokes equations in the space", "p >2,", "PDF p.1, abstract")]
E13=[ev("M13","(5) W (x3) = 6 F x3(1 − x3)e(α)", "= F.", "PDF p.3, (5) and flux identity")]
E16=[ev("M16","Theorem 1.2.Letq≥8/3", "T N 12/5V −4", "PDF p.2, Theorem 1.2")]
E16Z=[ev("M16","Theorem 1.1.Letπbe a cuspidal automorphic representation", "T\n5\n2 (1−σ)+o(1).", "PDF p.2, Theorem 1.1")]
E19=[ev("M19","Remark.By replacingπwithπ[it]", "|L(σ+it, π)| ≥c 5 (Cπ(|t|+ 3)) −ε.", "PDF p.2, standard L-function height-dependent zero-free strip")]
E23=[ev("M23","Theorem 1.2.Letσbe a real number satisfying1/2⩽σ⩽1", "supp( bϕ)⊂(−α σ, ασ)", "PDF p.4, Theorem 1.2")]
E18=[ev("M18","Assuming the Generalized Riemann Hypothesis (GRH)", "m, kare odd integers\nsufficiently large.", "PDF p.1, abstract, first theorem range")]
E20=[ev("M20","Specifically, we show that an infinite family of\nSiegel zeros", "<0.4733 on RH.", "PDF p.1, abstract"),
     ev("M20","Definition 1(Siegel zero).", "withE⩾3.", "PDF pp.1–2, Definition 1"),
     ev("M20","Theorem 1.Assume RH and that there exists an exceptional sequence of Siegel", "µ <0.4733.", "PDF p.2, Theorem 1, uniform quality requirement")]
E18.append(ev("M18","actually, we need 1/2< θ <2/3", "the equation has a solution.", "PDF p.2, Theorem 1.1 and parameter range"))
E25=[ev("M25","We introduce a finite-truncation version of Robin’s inequality", "n >5040,", "PDF p.1, abstract, finite criterion"),
     ev("M25","We also prove that this inequality is equivalent to Robin’s inequality", "Riemann\nhypothesis.", "PDF p.1, abstract")]


def part(name: str, kind: str) -> dict:
    return {"name": name, "kind": kind}


initial: list[dict] = []
change: list[dict] = []
ans_initial: list[dict] = []
ans_change: list[dict] = []
KEEP_IDS = {"M02":"M01", "M03":"M02", "M06":"M03", "M07":"M04", "M08":"M05", "M09":"M06", "M11":"XM01", "XMNEW":"XM02"}


def add(id: str, question: str, parts: list[dict], answer: list[str], evidence: list[dict], derivation: str,
        dependencies: list[dict], ablation: str, claim_scope: str, difficulty: str) -> None:
    if id not in KEEP_IDS:
        return
    id = KEEP_IDS[id]
    which = "change" if id.startswith("XM") else "initial"
    weight = (17 if id == "XM01" else 16) if which == "change" else (6 if int(id[1:]) <= 3 else 5)
    (change if which == "change" else initial).append({"id": id, "domain": "math", "question": question,
        "answerType": "structured", "answerParts": parts, "weight": weight, "scoring": "exact"})
    (ans_change if which == "change" else ans_initial).append({"id": id, "answer": ";".join(answer),
        "evidence": evidence, "derivation": derivation, "dependencies": dependencies, "ablation": ablation,
        "claimScope": claim_scope, "difficultyRationale": difficulty})


FLUID_DEPS = [
    {"sourceIds": ["M08"], "contribution": "从完整气体的 Rankine–Hugoniot 三式及其消元式恢复压力跳跃，而非把压强误作等熵常量。"},
    {"sourceIds": ["M10"], "contribution": "恢复本论文的归一化 p=ρ^γ 和证明中 1<γ≤2 的范围。"},
    {"sourceIds": ["M02"], "contribution": "恢复分子压强的低 Z 理想支 p_M=ρθ 及熵波的常压约束，同时识别其 γ>2 与另一文不同。"},
]
FLUID_SCOPE = "仅按题面定义把三个不同 PDE 的状态量作代数映射；M08 的消元公式在满足其 RH 端态的代数层面使用，不声称给定有限跳跃落入未知 ε0 的存在性定理；M02 取 γ=3 的低 Z 分支，M10 取 γ=2。"


def shock_ratio(x: F) -> F:
    # M08 (2.5), gamma=2, v_-=1.
    return (1 - x / 2) / (1 + 3*x/2)


def fluid_forward(id: str, r: F) -> None:
    x = 2*(1-r*r)/(1+3*r*r)
    assert shock_ratio(x) == r*r and 0 < x < F(1,3)
    # p_- = 1, R = 1, v_- = 1, v_+ = 1+x.
    vplus = 1+x
    pplus = shock_ratio(x)
    rho = r  # M10 normalized p=rho^2, positive branch.
    theta = 1/rho  # M02 contact pressure equal to M08 upstream p_-=1.
    question = (f"做三个方程的端态代数转接，不把它们视为同一流体解。第一份完整气体行波资料取 γ=2、R=1、左态 v₋=1、p₋=1，令右态 v₊={q(vplus)}，并要求其端态满足该文的 Rankine–Hugoniot 关系和正速 3-激波的压强降方向。把由此得到的右态压强数值，作为第二份平面激波资料的归一化多方律在某个正密度 ρ* 处的压强；第二份资料取 γ=2。最后在第三份熵波资料中取 γ=3、分子压强的低 Z 理想支，使同一 ρ* 的温度 θ* 与第一份资料的左态压强构成常压状态；假定所有第三份资料所需的 Z 值均在理想支。按顺序给出第一份的右态压强、第二份的 ρ*、第三份的 θ*，均为最简有理数。")
    derivation = (f"M08 的 RH 消元给 p₊/p₋=[1−(γ−1)(v₊−v₋)/(2v₋)]/[1+(γ+1)(v₊−v₋)/(2v₋)]。"
      f"γ=2、v₋=p₋=1、Δv={q(x)}，所以 p₊={q(pplus)}，且压强下降。"
      f"M10 的归一化 p=ρ²，取正根得 ρ*={q(rho)}。"
      f"M02 的低 Z 支由 (2.4) 和 P(Z)=Z 化为 p_M=ρθ；常压目标为 p₋=1，故 θ*=1/ρ*={q(theta)}。"
      "这是数值映射，不将 γ=2 与 γ=3 的定理互相套用。")
    add(id, question, [part("行波右态压强","rational"),part("映射正密度","rational"),part("常压状态温度","rational")],
        [q(pplus),q(rho),q(theta)], E08+E10+E02, derivation, FLUID_DEPS,
        "删去 M08 则起始压强跳跃不确定；删去 M10 则不能把该压强转成唯一正密度；删去 M02 则不能由常压与理想支求温度。",
        FLUID_SCOPE, "必须先从完整气体的能量 RH 恢复非等熵压强，再跨归一化压强律取正根，最后在不同 γ 的接触波支计算温度；三个步骤有方向依赖。")


def fluid_reverse(id: str, contact_rho: F, contact_theta: F, r: F) -> None:
    p0=contact_rho*contact_theta
    x=2*(1-r*r)/(1+3*r*r)
    assert 0 < x < F(1,3)
    vplus=1+x
    pplus=p0*shock_ratio(x)
    # Pick input so pplus is a square; positive rational square root brute force.
    root = None
    for n in range(1,101):
        for d in range(1,101):
            if F(n,d)**2 == pplus:
                root=F(n,d);break
        if root is not None:break
    assert root is not None
    question=(f"作一个按顺序的三文代数归一化。熵波资料取 γ=3，且两个正状态落在其分子压强的低 Z 理想支；左状态密度为 {q(contact_rho)}、温度为 {q(contact_theta)}，把它的分子压强作为完整气体行波资料的左端压强。行波资料另取 γ=2、R=1、v₋=1、v₊={q(vplus)}，端态须满足其 Rankine–Hugoniot 关系，并取正速 3-激波方向。把算出的行波右端压强交给平面激波资料的归一化多方律，后者取 γ=2，求使其压强相同的正密度。依次答左端压强、行波右端压强、映射后的正密度；均用最简有理数。这里仅比较数值，不断言三种方程共享解。")
    derivation=(f"M02 在 γ=3 的低 Z 支有 p_M=ρθ，故左端 p₋={q(contact_rho)}×{q(contact_theta)}={q(p0)}。"
      f"M08 取 Δv={q(x)}，由能量、动量和质量 RH 的消元式得 p₊=p₋(1−Δv/2)/(1+3Δv/2)={q(pplus)}。"
      f"M10 在 γ=2 时 p=ρ²，正密度唯一为 {q(root)}。")
    deps=[FLUID_DEPS[2],FLUID_DEPS[0],FLUID_DEPS[1]]
    add(id,question,[part("接触分子压强","rational"),part("行波右端压强","rational"),part("平面律正密度","rational")],
        [q(p0),q(pplus),q(root)],E02+E08+E10,derivation,deps,
        "删去 M02 不能得到输入压强；删去 M08 不能由体积跳跃推出下游压强；删去 M10 不能从下游压强反求密度。",
        FLUID_SCOPE,"以一个模型的状态压强作为下一代数计算的输入，再经完整气体 RH 消元及另一归一化方程反求密度，三文的 γ 范围必须分开处理。")


def fluid_compare(id: str, r: F) -> None:
    x=2*(1-r*r)/(1+3*r*r); v=1+x; p=r*r
    assert 0 < x < F(1,3)
    theta_shock=v*p
    pbar=1/(v*v)
    theta_contact=v
    gap=p-pbar
    assert gap < 0 and theta_contact>theta_shock
    question=(f"对同一数值体积跳跃做三种独立读数。完整气体行波资料取 γ=2、R=1、v₋=1、p₋=1、v₊={q(v)}，只用其 Rankine–Hugoniot 端态关系求下游温度 θ_shock。平面激波资料另取其已归一化的 γ=2 多方律，把 ρ₊=1/v₊ 代入，求其压强 p_bar。熵波资料另取 γ=3 且处于分子压强低 Z 理想支，要求 ρ₊ 与左端目标压强 1 形成常压接触态，求温度 θ_contact。依次输出 θ_shock、p_bar、θ_contact 和比较码；比较码 A 表示 p_shock<p_bar 且 θ_shock<θ_contact，B 表示前者等号且后者等号，C 表示其余。所有量取精确最简分数。")
    derivation=(f"M08 的 RH 给 p_shock=(1−x/2)/(1+3x/2)={q(p)}，其中 x={q(x)}；其 p=Rθ/v，故 θ_shock=v₊p_shock={q(theta_shock)}。"
      f"M10 归一化 γ=2，ρ₊=1/v₊={q(1/v)}，所以 p_bar=ρ₊²={q(pbar)}。"
      f"M02 低 Z 支 p_M=ρθ，常压目标 1 令 θ_contact=1/ρ₊=v₊={q(theta_contact)}。"
      f"精确差 p_shock−p_bar={q(gap)}<0 且 θ_contact−θ_shock={q(theta_contact-theta_shock)}>0，故 A。")
    add(id,question,[part("完整气体下游温度","rational"),part("归一化平面律压强","rational"),part("接触温度","rational"),part("精确比较码","code")],
        [q(theta_shock),q(pbar),q(theta_contact),"A"],E08+E10+E02,derivation,FLUID_DEPS,
        "无 M08 不知下游非等熵压强与温度；无 M10 不知归一化比较压强；无 M02 不知常压接触温度与比较码。",
        FLUID_SCOPE,"相同体积数据在完整气体、等熵归一化律和分子接触支给不同精确值；需辨认完整气体的熵变，不能直接套用 ρ² 到其端态。")


def stationary_norm(id: str, outer: int, inner: int=0) -> None:
    # Poiseuille W=6z(1-z)e; area multiplier of annulus = outer²-inner².
    area=outer*outer-inner*inner
    slab=F(6,5)*area  # integral / (pi R²), F=1; int z²(1-z)² dz=1/30.
    middle=F(9,4)*area  # L²(R²)-norm² / (pi R²) at z=1/2.
    geom=f"{inner}R<|x'|<{outer}R" if inner else f"|x'|<{outer}R"
    question=("有一篇板层定常流论文给出水平无限的 Poiseuille 背景；取通量参数 F=1、任意单位水平方向 e，仅对其显式背景做函数空间审计，不把截断场当成任何 PDE 的解。"
      f"令 W_R 为该背景在 {geom}、0<x₃<1 内的截断，外部补零；另令 w_R 为其 x₃=1/2 水平截面，在同一水平区域外补零。"
      "另一篇全平面定常论文的解类为 L²(R²)，第三篇三维演化论文的解类含 L^{3,∞}(R³)。"
      "给这两个截断场同时乘以 R^{−β}，选择使平面 L² 范数和三维弱 L³ 范数在 R→∞ 时都一致有界的最小 β。"
      "按顺序输出 ∥W_R∥²_{L²(R³)}/(πR²)、∥w_R∥²_{L²(R²)}/(πR²)、最小 β，以及在该 β 下两范数极限状态的二字码；每位 N 表示有限非零，Z 表示趋零，I 表示发散，顺序为平面 L² 后三维弱 L³。所有数值取最简分数。")
    deriv=(f"板层公式 W=6x₃(1−x₃)e。水平区域面积={area}πR²，且 ∫₀¹x²(1−x)²dx=1/30，故 36×1/30×{area}={q(slab)}。"
      f"中面值 W(1/2)=3e/2，截面平方归一化为 (9/4)×{area}={q(middle)}。"
      "对幅值阈值 τ，三维截断的分布函数等于水平面积乘一个只依 τ 而不依 R 的正垂直厚度；弱 L³ 准范数 sup_τ τ·measure{|W_R|>τ}^{1/3} 因而按 R^{2/3} 增长。"
      "平面 L² 范数按 R 增长，所以两个范数共同有界的最小 β=max(1,2/3)=1；此时平面 L² 范数保有有限非零常数，弱 L³ 范数按 R^{-1/3} 趋零，码为 NZ。")
    add(id,question,[part("体积平方范数系数","rational"),part("中面平方范数系数","rational"),part("共同归一化指数","rational"),part("两种极限状态","code")],
      [q(slab),q(middle),"1","NZ"],E13+E06+E07,deriv,
      [{"sourceIds":["M13"],"contribution":"给出有非零横向无限背景的精确抛物型剖面和流量归一化。"},
       {"sourceIds":["M06"],"contribution":"确认待比较的全平面定常解类是 L²(R²)。"},
       {"sourceIds":["M07"],"contribution":"确认三维演化唯一性类别涉及 L^{3,∞}(R³)，从而需要分布函数而非 L² 积分。"}],
      "无板层剖面无法积分或得到分布函数；无全平面论文不知第一种空间门槛；无 Lorentz 论文不知第二种空间门槛与要优化的弱范数。",
      "只比较显式函数的积分和解类，不转移三篇论文的唯一性定理；F=1 仅作为剖面的数值归一化。",
      "需从非紧水平背景重建截断面积、垂直 beta 积分、水平截面以及弱 Lorentz 分布函数的不同 R 缩放。")


# Non-repeated fluid mechanisms: pressure transfer, reverse normalization,
# thermodynamic versus barotropic discrepancy, and functional-space scaling.
fluid_forward("M01",F(9,10))
fluid_reverse("M02",F(2),F(2),F(3,4))
fluid_compare("M03",F(7,8))
stationary_norm("M04",1)
fluid_forward("M05",F(5,6))
fluid_compare("XM01",F(11,12))
stationary_norm("XM02",2,1)


def conditional_arithmetic(id: str, residue: int) -> None:
    assert residue in (1,3)
    deficit=2 if residue==1 else 1
    question=("比较两个明确分开的假设世界，并计算一个严格整数端点。令 k 为足够大的奇整数，"
      f"k≡{residue} (mod 4)，令 m 为严格小于 k(k+1)/2 的最大奇整数，且假定 m 也在相关定理的“充分大”范围内。"
      "世界甲假定该文有限截断除数和准则对全部 n>5040 成立，同时存在 Siegel 零例外序列 (β_j,χ_j,q_j,E_j)，其中 q_j→∞ 且 E=inf_j E_j 达到小间距定理所要求的充分大门槛；"
      "世界乙以相关 Dirichlet L 函数的 GRH 替换该 Siegel 零序列，保留有限准则。"
      "另取充分大的奇 N 和 1/2<θ<2/3；k 还须充分大到使上述 m>16k log k+4k+2。两世界仅按所给论文主张作条件推演。依次输出 k(k+1)/2−m、世界甲能否援引 ζ 归一化零点间距的 0.4733 结论、世界甲能否援引短区间素数幂表示定理、世界乙能否援引该素数幂表示定理；后三项用 Y/N。须严格核对量词和门槛。")
    deriv=(f"设 k=4r+{residue}。k(k+1)/2 的奇偶性是 {'奇' if residue==1 else '偶'}，故严格小于该数的最大奇 m 与其差 {deficit}。"
      "M25 的对所有 n>5040 的有限准则等价 RH；因此两个世界均有 RH。"
      "M20 Theorem 1 在 RH 加上例外序列且 E=inf_j E_j 充分大时给 μ<0.4733；甲逐项满足，所以第二字段 Y。"
      "Siegel 零是二次 Dirichlet L 函数的实零 1−1/(E log q)，q→∞、E≥3 时最终 >1/2，故甲不能同时满足相关 Dirichlet GRH，不能援引 M18 的 GRH 定理。"
      "乙给出所需 GRH；题设 m,k,N 足够大、1/2<θ<2/3，且 m>16k log k+4k+2，故可援引正文的表示定理。摘要中的 m<k(k+1)/2 是本题 m 的构造边界，不替代正文下界。")
    add(id,question,[part("严格奇整数端点差","integer"),part("甲的间距推论","code"),part("甲的表示定理适用性","code"),part("乙的表示定理适用性","code")],
      [str(deficit),"Y","N","Y"],E25+E20+E18,deriv,
      [{"sourceIds":["M25"],"contribution":"把全称有限除数和准则转成 RH，注意单个 n 的已证类不够。"},
       {"sourceIds":["M20"],"contribution":"RH 与趋于无穷的 Siegel 零序列联合给规范化间距严格上界，并给 Siegel 零定义。"},
       {"sourceIds":["M18"],"contribution":"素数幂表示首定理的 GRH、奇整数、充分大和严格 m 阈值条件。"}],
      "无有限准则等价结果不能由甲、乙共同假设得到 RH；无小间距论文不能得甲的间距码；无 Waring–Goldbach 论文不能判两世界表示定理的 GRH 和严格 m 范围。",
      "只在各自世界的明示假设下判断可援引性，不宣称 RH、GRH 或 Siegel 零序列实际成立；固定 k 的“充分大”未给阈值，故题目把它作为假设。",
      "有全称量词到 RH 的转换、例外零与 Dirichlet GRH 的冲突、严格整数奇偶端点以及两种条件定理的不同前提。")


conditional_arithmetic("M06",1)
conditional_arithmetic("XM04",3)


NT_DEPS_A=[
    {"sourceIds":["M22"],"contribution":"H=T^δ 的对偶长度 T/H，且主项占优需 H²/max(p,q)>T^(1+ε)。"},
    {"sourceIds":["M15"],"contribution":"1-separated zeta 大值计数的 V 适用闭区间及指数 24/17−(128/17)v。"},
    {"sourceIds":["M24"],"contribution":"短区间简单临界零点的 c(δ) 下界、正性阈值与严格递增性。"},
]
NT_SCOPE="合成参数预算：三文分别用于自己的 zeta 大值集、锐截断短区间零点比例和高斯互易公式；共享 T,δ,V 只表示数值设计。互易公式的 (1.7) 仅按文中所述作形式指数筛选，不断言实际积分主项必占优或无抵消。忽略 T^ε/o(1) 时只报告主幂。"


def c_theta(t: F) -> float:
    x=float(t)/math.sqrt(2)
    return 2-float(t)/2-(1/math.sqrt(2))/math.tan(x)


def nt_opt(id: str, b: F, benchmark: F, a: F, options: list[tuple[str,F]]) -> None:
    assert c_theta(benchmark)>0
    good=[]
    steps=[]
    for code,d in options:
        v=b*(1-d)
        c_ok=d>=benchmark  # c strictly increasing on (0,1)
        range_ok=F(7,60)<=v<=F(5,38)
        twist_ok=2*d-a>1
        total=F(1,2)<d<1 and c_ok and range_ok and twist_ok
        steps.append(f"{code}:δ={q(d)},v={q(v)}, c门槛={c_ok}, 大值区间={range_ok}, 主项条件={twist_ok}, 可行={total}")
        if total:good.append((code,d,v))
    assert good
    code,d,v=min(good,key=lambda z:z[1])
    exponent=F(24,17)-F(128,17)*v
    labels="、".join(f"{k}:δ={q(t)}" for k,t in options)
    question=(f"作三篇 zeta 资料的合成参数预算。高斯加权短扭曲二次矩取宽度 H=T^δ，两个不同奇素数扭曲参数均与 T^{q(a)} 同阶；仅检查该文 (1.7) 所述 H²/max(p,q)>T^(1+ε) 的形式指数条件，不断言实际积分主项必支配。将其对偶有效尺度 D=T/H 定义为大值阈值 V=D^{q(b)}，要求另一文的 1-分离大值定理适用。还要求第三文在独立指定的锐截断零点窗口 (T,T+T^δ] 上给出的简单临界零点比例显式保证函数 c(δ) 至少为 c({q(benchmark)})。候选表为 {labels}。只在所有形式条件成立的候选中，使大值计数上界的 T 主幂最小。依次输出最佳候选码、该上界主幂、对偶尺度的 T 幂；指数均写精确分数。")
    deriv=("M22 的对偶长度 D=T/H=T^(1−δ)，且 max(p,q)≈T^a，主项条件变为 2δ−a>1。"
      f"阈值 V=D^{q(b)}=T^[{q(b)}(1−δ)]；M15 的有效范围为 7/60≤v≤5/38，计数主幂 E=24/17−128v/17。"
      f"M24 的 c 严格递增，要求 c(δ)≥c({q(benchmark)}) 即 δ≥{q(benchmark)}。"
      + "；".join(steps)+"。"
      f"在可行者中 E 随 δ 严格增加，最小 δ 是 {code} 的 {q(d)}；v={q(v)}，E={q(exponent)}，对偶幂 1−δ={q(1-d)}。")
    add(id,question,[part("最佳候选码","code"),part("大值计数上界主幂","rational"),part("对偶长度主幂","rational")],
        [code,q(exponent),q(1-d)],E22+E15+E24,deriv,NT_DEPS_A,
        "无 M22 不能从 H 得到 D 或 twist 的严格条件；无 M15 不能判定 V 范围和目标指数；无 M24 不能筛除低于 c 基准的 δ。",
        NT_SCOPE,"需恢复对偶尺度、主项严格范围、大值阈值闭区间及零点比例保证函数的单调性，然后做离散精确优化；题面未提供这些公式。")


nt_opt("M07",F(1,2),F(3,4),F(2,5),[("A",F(11,16)),("B",F(3,4)),("C",F(19,25)),("D",F(4,5))])
nt_opt("M10",F(3,5),F(79,100),F(1,2),[("A",F(3,4)),("B",F(79,100)),("C",F(4,5)),("D",F(81,100))])


def nt_fourier(id: str, options: list[tuple[str,F,F,F,F]]) -> None:
    # Each row: delta, twist exponent a, threshold coefficient b, weight line sigma.
    good=[];steps=[]
    for code,d,a,b,sigma in options:
        v=b*(1-d)
        alpha=sigma/(2*sigma+1)
        ok22=F(1,2)<d<1 and 2*d-a>1
        ok15=F(7,60)<=v<=F(5,38)
        ok23=F(1,2)<=sigma<=1 and 2*v<alpha
        yes=ok22 and ok15 and ok23
        steps.append(f"{code}:v={q(v)}, 2v={q(2*v)}, α_σ={q(alpha)}, 主项={ok22}, 大值范围={ok15}, Fourier严格支集={ok23}")
        if yes:good.append((code,d,a,b,sigma,v,alpha))
    assert good
    best=min(good,key=lambda z:(z[4],z[1])); assert sum((x[4],x[1])==(best[4],best[1]) for x in good)==1
    code,d,a,b,sigma,v,alpha=best
    E=F(24,17)-F(128,17)*v
    labels="、".join(f"{c}:(δ,a,b,σ)=({q(d0)},{q(a0)},{q(b0)},{q(s0)})" for c,d0,a0,b0,s0 in options)
    question=("设计三篇论文共用的一组无量纲预算，但只分别使用各文定理：高斯加权短扭曲矩宽度 H=T^δ，扭曲素数大小与 T^a 同阶，仅核该文 (1.7) 的形式指数条件 H²/max(p,q)>T^(1+ε)，不推断实际积分的主项必支配；对偶有效尺度 D=T/H 指定 1-分离 ζ 大值阈值 V=D^b。"
      "测试函数的 Fourier 支集取闭区间 [−2v,2v]，其中 v 是 V 对 T 的幂指数；特殊值加权零点密度取固定横线 σ，要求完整闭支集严格落在该定理许可的开区间内。"
      f"候选 {labels}。在三文条件都成立的候选中，先使 σ 最小，再使 δ 最小。输出候选码、许可支集半宽与实际支集半宽之差、该候选的 ζ 大值计数主幂；均用精确分数。")
    deriv=("M22 给 D=T^(1−δ) 与严格 2δ−a>1；因此 M15 阈值指数 v=b(1−δ)，须在 [7/60,5/38]，上界指数 E=24/17−128v/17。"
      "M23 给 α_σ=σ/(2σ+1)，闭支集 [-2v,2v] 包含在开区间 (-α_σ,α_σ) 的充要条件是 2v<α_σ。"
      +"；".join(steps)+"。"
      f"可行者按 (σ,δ) 字典序最小是 {code}，余量 α_σ−2v={q(alpha-2*v)}，E={q(E)}。")
    add(id,question,[part("最优方案码","code"),part("严格支集余量","rational"),part("大值计数指数","rational")],
      [code,q(alpha-2*v),q(E)],E22+E15+E23,deriv,
      [{"sourceIds":["M22"],"contribution":"对偶尺度 D=T/H 和主项严格指数条件。"},
       {"sourceIds":["M15"],"contribution":"1-分离大值阈值适用带与其上界幂。"},
       {"sourceIds":["M23"],"contribution":"加权密度的横线依赖 Fourier 开支集半宽 α_σ。"}],
      "无互易论文则 D 与 twist 筛选未知；无大值论文则阈值范围和目标指数未知；无加权密度论文则 σ 的严格支集条件与最优方案未知。",
      "只作同一预算参数下三个独立定理的合法性审计，不将大值计数代入加权密度的证明。",
      "必须处理三个不同形状的边界：主项严格号、大值闭阈值带与 Fourier 开支集；优化是两级字典序。")


nt_fourier("M08",[("A",F(3,4),F(2,5),F(1,2),F(1,2)),("B",F(19,25),F(2,5),F(1,2),F(3,5)),("C",F(4,5),F(1,2),F(3,5),F(2,3)),("D",F(3,4),F(1,2),F(1,2),F(3,4))])
nt_fourier("XM03",[("A",F(3,4),F(1,3),F(1,2),F(1,2)),("B",F(19,25),F(1,3),F(1,2),F(5,8)),("C",F(4,5),F(1,2),F(3,5),F(3,4)),("D",F(23,30),F(2,5),F(1,2),F(2,3))])


def nt_poly(id: str, options: list[tuple[str,F,F,F]]) -> None:
    # N=U=T^(1-delta), same numerical threshold V=T^v for two separate large-value problems.
    good=[];steps=[]
    for code,d,a,v in options:
        n=1-d
        ok22=F(1,2)<d<1 and 2*d-a>1
        ok15=F(7,60)<=v<=F(5,38)
        e15=F(24,17)-F(128,17)*v
        terms=[2*n-2*v,F(18,5)*n-4*v,1+F(12,5)*n-4*v]
        e16=max(terms)
        budget=max(e15,e16)
        steps.append(f"{code}:n={q(n)},v={q(v)}, 主项={ok22}, ζ范围={ok15}, Dirichlet三项={','.join(map(q,terms))}, 联合预算={q(budget)}")
        if ok22 and ok15:good.append((code,d,a,v,e15,e16,budget,terms))
    assert good
    best=min(good,key=lambda z:z[6]); assert sum(z[6]==best[6] for z in good)==1
    code,d,a,v,e15,e16,budget,terms=best
    labels="、".join(f"{c}:(δ,a,v)=({q(d0)},{q(a0)},{q(v0)})" for c,d0,a0,v0 in options)
    question=("比较两项独立的大值实验的最坏 T 主幂。高斯加权短扭曲二次矩宽度 H=T^δ、两个不同奇素数大小与 T^a 同阶；仅要求该文 (1.7) 的形式指数预算 H²/max(p,q)>T^(1+ε)，不声称实际积分主项必占优。用其对偶有效尺度 D=T/H 作为一项 Dirichlet 多项式的长度 N，观测高度仍为 T。"
      "该多项式系数满足对应论文 q=8/3 的矩假设，采样点 1-分离，数值阈值 V=T^v；另一项 ζ 临界线大值实验取相同数值阈值与 1-分离采样。"
      "把各定理上界中所有 T 主幂项的最大值作为该实验预算，两实验预算再取最大；忽略 o(1) 与 ε。"
      f"候选 {labels}。输出联合预算最小的候选码、该预算指数、使其达到该指数的 Dirichlet 多项式项序号（按论文三项书写顺序 1/2/3；若非此类项主导则填 0）。")
    leading=terms.index(max(terms))+1 if e16>=e15 else 0
    deriv=("M22 给 N=D=T^(1−δ)，并要求 2δ−a>1。M15 的 ζ 大值定理要求 7/60≤v≤5/38，其幂为 24/17−128v/17。"
      "M16 在 q=8/3 下三项 N²V^-2、N^(18/5)V^-4、T N^(12/5)V^-4，代入 N=T^n,V=T^v 得 2n−2v、18n/5−4v、1+12n/5−4v。"
      +"；".join(steps)+"。"
      f"最小预算在 {code}，值 {q(budget)}；多项式主导项编号 {leading}。")
    add(id,question,[part("最小预算方案码","code"),part("最坏主幂","rational"),part("主导多项式项号","integer")],
      [code,q(budget),str(leading)],E22+E15+E16,deriv,
      [{"sourceIds":["M22"],"contribution":"把原区间长转为多项式长 D 并筛选主项条件。"},
       {"sourceIds":["M15"],"contribution":"提供 ζ 实验的阈值带与计数指数。"},
       {"sourceIds":["M16"],"contribution":"提供系数 q=8/3 时三个竞争的大值上界项。"}],
      "无 M22 不知多项式长度；无 M15 不知 ζ 预算及其有效区间；无 M16 不知三个相互竞争的多项式幂与联合最大值。",
      "两个大值实验各按自己的对象与假设独立计数，联合预算仅是题目定义的资源上界。",
      "必须拆出 Dirichlet 上界三项的分段包络，再与 ζ 改进大值幂相交，最后离散优化。")


nt_poly("M09",[("A",F(3,4),F(2,5),F(1,8)),("B",F(19,25),F(2,5),F(3,25)),("C",F(4,5),F(1,2),F(3,25)),("D",F(5,8),F(1,5),F(1,8))])


NT_DEPS_B=[
    {"sourceIds":["M22"],"contribution":"互易公式主项条件把 twist 指数 a 与短区间长度指数 δ 耦合为 a<2δ−1。"},
    {"sourceIds":["M17"],"contribution":"显式中央带比例需要 t^(2/3)>h>100，t>10^100，且 α=1/16 时表中保守保证为 0.1374。"},
    {"sourceIds":["M24"],"contribution":"简单临界零点比例 c(δ)>0 仅在 δ>θ0≈0.5501 可由 Theorem 1.1 认证。"},
]


def nt_window(id: str, options: list[tuple[str,F,F]]) -> None:
    # T-window (T,T+H] has center t=T+H/2, halfwidth h=H/2.
    good=[];steps=[]
    for code,d,a in options:
        # At delta=2/3, factor 1/2 makes h<t^(2/3), so inclusive.
        fiori=d<=F(2,3)
        wang=c_theta(d)>0
        tang=F(1,2)<d<1 and a<2*d-1
        yes=fiori and wang and tang
        steps.append(f"{code}:δ={q(d)},a={q(a)}, Fiori半宽={fiori}, Wang正界={wang}, Tang主项={tang}, 合格={yes}")
        if yes:good.append((code,d,a))
    assert good
    best=max(good,key=lambda z:z[2]); assert sum(z[2]==best[2] for z in good)==1
    labels="、".join(f"{code}:(δ,a)=({q(d)},{q(a)})" for code,d,a in options)
    question=("令 T 足够大，同时超过显式中央带结论中的数值高度门槛。一篇短扭曲二次矩使用全实轴高斯权，其宽度参数 H=T^δ；令其中两个不同奇素数参数都与 T^a 同阶，只检查该文 (1.7) 所述 H²/max(p,q)>T^(1+ε) 的形式指数条件，不断言实际积分主项必占优。"
       "另人工定义锐截断零点窗口 I=(T,T+H]，其中心 t=T+H/2、半宽 h=H/2。这只是共用数值 H，不把高斯积分改写为锐截断积分。要求另一篇短区间零点论文能在 [t−h,t+h] 给 α=1/16 的表列中央带正比例，并要求第三篇在 I 给简单临界零点的显式正比例。"
       f"候选为 {labels}。按顺序输出所有合格候选码按字母顺序连写、合格者中最大的 a、实现该 a 的 δ。指数用精确分数；只问各文条件在这组独立指定的参数下是否分别成立。")
    deriv=("M22 的主项条件 H²/max(p,q)>T^(1+ε) 在固定指数下等价于 a<2δ−1，严格号不能变等号。"
      "M17 取 t=T+H/2、h=H/2，h>100 与 t>10^100 最终成立；h<t^(2/3) 对固定 δ<2/3 成立，δ=2/3 因 1/2 因子仍成立，δ>2/3 失败。"
      "M17 表格 α=1/16,h0=100,t0=10^100 给 0.1374；M24 正的 c(δ) 需 δ>θ0≈0.5501。"
      +"；".join(steps)+"。"
      f"可行码为 {''.join(x[0] for x in good)}，其中最大 a={q(best[2])}，对应 δ={q(best[1])}。")
    add(id,question,[part("全部合格码","code"),part("最大扭曲指数","rational"),part("对应区间指数","rational")],
      ["".join(x[0] for x in good),q(best[2]),q(best[1])],E22+E17+E24,deriv,NT_DEPS_B,
      "无 M22 不能筛主项条件；无 M17 不能判半宽上限与表列显式比例；无 M24 不能筛掉简单临界零点保证函数非正的 δ。",
      "高斯权仅用于互易公式的形式指数预算，锐截断 I 单独用于两篇零点论文；不推断三个比例的交集人数或实际积分主项占优。",
      "需将同一窗口从起点长度参数改写为中心半宽，注意 δ=2/3 边界的常数因子，再解严格指数不等式与短区间简单零点阈值。")


nt_window("M11",[("A",F(1,2),F(1,20)),("B",F(9,16),F(1,10)),("C",F(5,8),F(1,5)),("D",F(2,3),F(1,3)),("E",F(11,16),F(1,4))])
nt_window("M12",[("A",F(11,20),F(1,20)),("B",F(3,5),F(1,6)),("C",F(5,8),F(1,4)),("D",F(13,20),F(7,25)),("E",F(3,4),F(2,5))])


def density_free_region(id: str) -> None:
    # ε=1/4 in the zero-free theorem; c is its (ineffective) positive constant.
    options=[("A",F(3,5),F(1,10),F(1,4)),
             ("B",F(5,8),F(1,5),F(1,5)),
             ("C",F(2,3),F(1,4),F(1,3)),
             ("D",F(3,4),F(2,5),F(1,5)),
             ("E",F(4,5),F(3,5),F(1,3))]
    good=[];steps=[]
    for code,d,a,b in options:
        tang=2*d-a>1
        free=b>=F(1,4)  # c Q^{-b} <= c Q^{-1/4} for Q>=1.
        E=F(5,8)*(1-d)
        steps.append(f"{code}:2δ−a={q(2*d-a)}, b={q(b)}, 无零带认证={free}, 固定线密度幂={q(E)}")
        if tang and free:good.append((code,d,a,b,E))
    assert [x[0] for x in good]==["A","C"]
    best=min(good,key=lambda x:x[4])
    labels="、".join(f"{c}:(δ,a,b)=({q(d)},{q(a)},{q(b)})" for c,d,a,b in options)
    question=("在三个不同结论之间做参数交集审计。高斯加权互易公式取 H=T^δ，两个不同奇素数扭曲参数与 T^a 同阶；只检查其 (1.7) 的形式指数条件 H²/max(p,q)>T^(1+ε)，不推断积分主项。定义对偶尺度 U=T/H。"
      "另取固定的、有理数域上的 GL₂(A_Q) 酉尖点表示 π、其解析导子 C_π，并对标准 L 函数使用一篇论文 ε=1/4 的高度依赖无零带，记该定理给出的常数为 c>0。"
      "候选的移动横线为 σ_b(U)=1−c[C_π(U+3)]^(−b)。要求该无零带定理能认证高度 |Im s|≤U 中所有位于 σ_b(U) 右侧的零点均不存在；只按论文给的带宽认证，带外不作猜测。"
      "对仍可行的候选，再用另一篇 GL₂ 零密度定理在固定横线 σ=3/4、同一高度 U，计算把上界改写成 T 主幂后的指数；取此指数最小者。"
      f"候选 {labels}。依次输出全部可行码按字母顺序连写、最优码、该最优者固定横线零密度的 T 主幂。指数用精确分数，忽略 o(1)。")
    deriv=("互易公式的对偶尺度 U=T^(1−δ)，(1.7) 的形式条件为 2δ−a>1。"
      "无零带定理在任意 |t|≤U 给至少 c[C_π(U+3)]^(−1/4) 的带宽；固定 π 且 U→∞ 时，σ_b(U) 落在该认证带内当且仅当 b≥1/4。"
      "零密度定理在 σ=3/4 给 N_π(3/4,U)≪U^[(5/2)(1/4)+o(1)]=T^[(5/8)(1−δ)+o(1)]。"
      +"；".join(steps)+"。"
      f"可行 A、C，后者 δ={q(best[1])} 较大，密度指数={q(best[4])}。")
    add(id,question,[part("全部可行码","code"),part("最优码","code"),part("固定线零密度主幂","rational")],
        ["".join(z[0] for z in good),best[0],q(best[4])],E22+E19+E16Z,deriv,
        [{"sourceIds":["M22"],"contribution":"高斯宽度到对偶高度 U 的转换与 (1.7) 的严格指数预算。"},
         {"sourceIds":["M19"],"contribution":"固定 π 的高度依赖无零带宽度，决定移动横线 b 是否被认证。"},
         {"sourceIds":["M16"],"contribution":"固定横线 3/4 的 GL₂ 零密度指数 5(1−δ)/8，作为优化目标。"}],
        "删去互易文，U 的 T 幂和第一筛选未知；删去无零带文，B/D 等候选不能排除；删去零密度文，无法计算和优化最终主幂。",
        "仅比较同一固定 π 的两个不同零点陈述，移动线无零带不代替固定线零密度；高斯公式只提供形式参数预算，未声称实际主项占优。",
        "三种尺度依次转换：高斯对偶高度、随高度缩小的带宽与固定横线零密度；两个严格边界筛选不同候选。")


density_free_region("XMNEW")


def validate(data: dict) -> None:
    assert len(data["questions"]["initial"]) == 6 and len(data["questions"]["change"]) == 2
    assert sum(q["weight"] for q in data["questions"]["initial"]) == 33
    assert sum(q["weight"] for q in data["questions"]["change"]) == 33
    for group in ("initial","change"):
        qs=data["questions"][group]; aa=data["answers"][group]
        assert [q["id"] for q in qs]==[a["id"] for a in aa]
        for qq,answer in zip(qs,aa):
            assert len(answer["answer"].split(";"))==len(qq["answerParts"])
            assert len(set(e["source"] for e in answer["evidence"]))>=2
            for e in answer["evidence"]:
                source=TEXT[e["source"]]
                assert re.sub(r"\s+"," ",e["quote"]) in re.sub(r"\s+"," ",source)
            assert answer["derivation"] and answer["ablation"] and answer["claimScope"]


if __name__ == "__main__":
    initial.sort(key=lambda x:x["id"])
    change.sort(key=lambda x:x["id"])
    ans_initial.sort(key=lambda x:x["id"])
    ans_change.sort(key=lambda x:x["id"])
    data={"version":"longread-qa-v4","questions":{"initial":initial,"change":change},
          "answers":{"initial":ans_initial,"change":ans_change}}
    for rows in data["questions"].values():
        for item in rows:
            item["question"] = item["question"].replace(" (1.7)", "")
    validate(data)
    if "--build" in sys.argv:
        OUT.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n")
        print(OUT)
    else:
        saved=json.loads(OUT.read_text())
        assert saved==data, "math.json differs from exact recalculation"
        print("math bank verified: 6 initial, 2 change, weights 33+33; exact answers and verbatim TXT quotations")
