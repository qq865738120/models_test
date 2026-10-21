import math
from pathlib import Path
N=48
pts=[(320+23*math.cos(i*2*math.pi/N),337+23*math.sin(i*2*math.pi/N)) for i in range(N+1)]
far=[(640-x,674-y) for x,y in pts]
def num(n):return f'{n:.3f}'
def foot(points,near):
    vals=';'.join(f'{num(x)} {num(y)}' for x,y in points)
    fill='#f6aa3a' if near else '#d68b30'
    return f'''<g id="{'near' if near else 'far'}-pedal-foot"><animateTransform attributeName="transform" type="translate" values="{vals}" dur="1.5s" repeatCount="indefinite"/>
    <path d="M-11 0H14" stroke="#233e42" stroke-width="5" stroke-linecap="round"/>
    <path transform="translate(0 -9)" d="M-9-5 Q-3-8 1-2 L14 3 L10 7 L4 4 L1 7 L-4 4 L-9 7 L-12 3 Z" fill="{fill}" stroke="#69472a" stroke-width="1.7" stroke-linejoin="round"/>
    <path transform="translate(0 -9)" d="M-5-1L4 4 M-1-1L10 5" fill="none" stroke="#b77126" stroke-width="1.2"/></g>'''
def leg(points,near):
    hip=(296,272) if near else (304,271)
    ds=[]
    for x,y in points:
        ds.append(f'M{hip[0]} {hip[1]} Q{num(x-24)} {num((y+hip[1])/2-2)} {num(x-7)} {num(y-13)}')
    return f'<path d="{ds[0]}" fill="none" stroke="{("#e6a139" if near else "#b98234")}" stroke-width="9" stroke-linecap="round"><animate attributeName="d" values="{";".join(ds)}" dur="1.5s" repeatCount="indefinite"/></path>'
cranks=';'.join(f'M{num(x)} {num(y)}L{num(fx)} {num(fy)}' for (x,y),(fx,fy) in zip(pts,far))
def wheel(x):
    spokes=''.join(f'<path d="M0 0L{num(53*math.cos(t*math.pi/6))} {num(53*math.sin(t*math.pi/6))}"/>' for t in range(12))
    return f'''<g transform="translate({x} 356)"><circle r="61" fill="#fff9e9" stroke="#25464b" stroke-width="9"/><circle r="54" fill="#d9efdd" stroke="#fffaf0" stroke-width="3"/><g stroke="#80aca5" stroke-width="1.5">{spokes}<path d="M0-54A54 54 0 0 1 33-43" fill="none" stroke="#fff9e9" stroke-width="5"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.5s" repeatCount="indefinite"/></g><circle r="6" fill="#f4b746" stroke="#25464b" stroke-width="2"/></g>'''
html='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>鹈鹕骑车送布丁 · Pudding Post</title><style>
*{box-sizing:border-box}body{margin:0;background:#f8f5eb;color:#24474b;font-family:Arial,"PingFang SC","Microsoft YaHei",sans-serif}main{max-width:1000px;margin:auto;padding:26px 32px 22px}.masthead{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #cbd5c9;padding-bottom:16px;font-size:11px;letter-spacing:2px}.brand{font-weight:900;display:flex;align-items:center;gap:9px}.brand i{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#e97850;color:#fff;font-style:normal;font-size:15px}.edition{color:#71857e}.title{display:flex;align-items:flex-end;justify-content:space-between;margin:24px 0 18px}h1{margin:0;font-size:32px;letter-spacing:1px;font-weight:800}.subtitle{font-size:12px;color:#75847a;margin:9px 0 0}.tag{font-size:11px;letter-spacing:1px;border:1px solid #c3cec3;padding:7px 11px;border-radius:20px;white-space:nowrap}.stage{max-width:800px;margin:auto;border:1px solid #c2d4c5;border-radius:22px;overflow:hidden;background:#ccebdc;box-shadow:0 12px 28px #345c4810}.stage svg{display:block;width:100%;height:auto}.timeline{max-width:800px;margin:18px auto 0;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.step{position:relative;border-top:3px solid #dbe0d2;padding-top:10px;font-size:12px;color:#6b7b72}.step:before{content:"";position:absolute;left:0;right:0;top:-3px;height:3px;background:#ea825b;opacity:0;animation:phase 6s linear infinite}.step:nth-child(1):before{animation-name:p1}.step:nth-child(2):before{animation-name:p2}.step:nth-child(3):before{animation-name:p3}.step:nth-child(4):before{animation-name:p4}.step strong{display:block;color:#36544c;margin-top:4px;font-size:13px}.step span{font-size:10px;letter-spacing:1px}@keyframes p1{0%,33.32%{opacity:1}33.33%,100%{opacity:0}}@keyframes p2{0%,33.32%,50%,100%{opacity:0}33.33%,49.99%{opacity:1}}@keyframes p3{0%,49.99%,66.67%,100%{opacity:0}50%,66.66%{opacity:1}}@keyframes p4{0%,66.66%,100%{opacity:0}66.67%,99.99%{opacity:1}}footer{max-width:800px;margin:18px auto 0;display:flex;justify-content:space-between;font-size:10px;letter-spacing:1.2px;color:#87958a}@media(max-width:600px){main{padding:18px 16px}.edition{letter-spacing:1px;font-size:9px}h1{font-size:24px}.title{margin-top:22px}.tag{display:none}.timeline{gap:9px}.step strong{font-size:11px}.stage{border-radius:15px}footer{font-size:9px;letter-spacing:.4px}}
@media(min-width:700px) and (max-height:800px){main{padding-top:16px;padding-bottom:14px}.masthead{padding-bottom:10px}.title{margin:14px 0 12px}h1{font-size:28px}.subtitle{margin-top:6px}.stage,.timeline,footer{max-width:min(800px,calc((100svh - 245px)*4/3))}.timeline{margin-top:12px}footer{margin-top:12px}}</style></head><body><main><header class="masthead"><div class="brand"><i>P</i>PUDDING POST / 鹈鹕速递</div><div class="edition">海岸线配送日记 · NO. 001</div></header><div class="title"><div><h1>鹈鹕骑车送布丁</h1><p class="subtitle">路有一点颠，甜蜜准时到。</p></div><span class="tag">6 秒循环 · 一路保鲜</span></div><div class="stage">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-labelledby="scene-title scene-desc"><title id="scene-title">鹈鹕骑车送布丁</title><desc id="scene-desc">白色鹈鹕扶着车把骑车。每六秒平稳骑行两秒，驶过减速带一秒，后架上的布丁腾空并落回一秒，然后回头查看并恢复。双脚始终踩在相反相位的踏板上。</desc>
<defs><pattern id="road" width="160" height="52" patternUnits="userSpaceOnUse"><path d="M18 20h46 M105 4h14" stroke="#fff8dc" stroke-width="3" stroke-linecap="round"/><circle cx="88" cy="39" r="1.5" fill="#cab994"/></pattern><pattern id="tiles" width="80" height="18" patternUnits="userSpaceOnUse"><path d="M0 428h80M40 420v8" fill="none" stroke="#b8c6a3" stroke-width="1"/></pattern></defs>
<rect width="640" height="480" fill="#d2eddd"/><circle cx="530" cy="93" r="43" fill="#ffe295"/><circle cx="530" cy="93" r="53" fill="none" stroke="#f4eab5" stroke-width="1"/>
<g fill="#f6fcdf" opacity=".9"><path d="M35 106c4-14 21-15 28-4 12-7 28 2 28 12H26c-1-6 3-9 9-8Z"/><path d="M447 67c6-12 23-10 28 1 10-6 22 0 23 10h-60c0-6 4-11 9-11Z"/></g>
<g font-family="Arial,sans-serif" fill="#4e8275"><text x="33" y="40" font-size="10" font-weight="bold" letter-spacing="2.5">THE COASTAL EXPRESS</text><path d="M33 50h36" stroke="#4e8275" stroke-width="2"/></g>
<g transform="translate(34 165)"><path d="M0 96V35L34 12l34 23v61" fill="#a4ccae"/><path d="M11 42h44v54H11z" fill="#b6d7b8"/><path d="M20 53h12v18H20zM40 53h9v18h-9z" fill="#d7e9cb"/><path d="M-7 35L34 6l42 29" fill="none" stroke="#86b8a3" stroke-width="5" stroke-linejoin="round"/></g>
<path d="M0 274Q87 228 156 257T320 265T479 248T640 258V336H0Z" fill="#acd3bb"/><path d="M0 300Q103 279 180 298T363 301T529 284T640 295V365H0Z" fill="#c1dcb7"/>
<path d="M0 352Q120 323 218 345T413 339T640 342V420H0Z" fill="#dce4bd"/>
<g fill="none" stroke="#9fbd94" stroke-width="2" stroke-linecap="round"><path d="M53 376l-5-12m5 12 5-17m-5 17 12-7M552 380l-6-13m6 13 5-18m-5 18 12-9M99 331l-5-9m5 9 6-11"/></g>
<g transform="translate(526 246)"><path d="M0 91V0" stroke="#85a798" stroke-width="5"/><path d="M-23 0H25L37 14 25 28H-23Z" fill="#fff8df" stroke="#85a798" stroke-width="2"/><text x="2" y="18" text-anchor="middle" font-size="9" font-weight="bold" fill="#668d7c">海岸路</text></g>
<rect y="420" width="640" height="60" fill="#e2cfaa"/><rect y="420" width="640" height="10" fill="#c6d1ac"/><path d="M0 420H640" stroke="#aabb94" stroke-width="2"/>
<g><rect x="0" y="430" width="960" height="50" fill="url(#road)"/><animateTransform attributeName="transform" type="translate" from="0 0" to="-160 0" dur="1.5s" repeatCount="indefinite"/></g>
<g id="speed-bump"><path d="M-39 420Q-28 405 0 405T39 420Z" fill="#e8a050" stroke="#bd8440" stroke-width="2"/><path d="M-22 409l10 10M-3 405l12 14M17 408l10 11" stroke="#fff0b6" stroke-width="6"/><animateTransform attributeName="transform" type="translate" from="1120 0" to="-800 0" dur="6s" repeatCount="indefinite"/></g>
<ellipse cx="322" cy="422" rx="184" ry="8" fill="#526c4e" opacity=".12"/>
<g id="rider-and-bicycle"><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -10;0 0;0 0;0 -10;0 -2;0 0;0 0" keyTimes="0;.333333;.35;.375;.43;.46;.485;.5;1" dur="6s" repeatCount="indefinite"/>
'''
html+=wheel(199)+wheel(444)
html+='''<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M145 331A63 63 0 0 1 251 319M390 321A64 64 0 0 1 493 319" stroke="#fdf7db" stroke-width="8"/><path d="M145 331A63 63 0 0 1 251 319M390 321A64 64 0 0 1 493 319" stroke="#e67a56" stroke-width="4"/>
<path d="M165 282L199 356M244 282L199 356M159 282H258" stroke="#55716b" stroke-width="4"/>
<path d="M169 276H249" stroke="#25464b" stroke-width="5"/></g>
<g id="tray"><path d="M157 268H243l-7 9h-71Z" fill="#fff3cd" stroke="#365a58" stroke-width="2.5"/><path d="M163 268H238" stroke="#fffdf1" stroke-width="3"/></g>
<g id="pudding"><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -65;0 0;0 0" keyTimes="0;.5;.575;.65;1" calcMode="spline" keySplines="0 0 1 1;.2 .65 .4 1;.6 0 .8 .35;0 0 1 1" dur="6s" repeatCount="indefinite"/>
<ellipse cx="200" cy="264" rx="27" ry="3" fill="#c8a773" opacity=".35"/><path d="M182 235Q200 229 218 235L226 260Q224 267 200 267T174 260Z" fill="#ffd45d" stroke="#a56531" stroke-width="2"/><path d="M182 235L178 250Q184 252 187 241L190 239Q195 247 199 240Q206 247 211 238L222 249 218 235Z" fill="#c7763b"/><ellipse cx="200" cy="235" rx="18" ry="5" fill="#a8532f"/><ellipse cx="195" cy="233" rx="8" ry="1.5" fill="#e8a263"/><path d="M181 255l2-8M187 259l1-10" stroke="#fff0a1" stroke-width="3" stroke-linecap="round"/>
</g>
<g opacity="0" fill="none" stroke="#d28a42" stroke-width="2.5" stroke-linecap="round"><path d="M183 257v-11M200 251v-15M218 255v-10"/><animate attributeName="opacity" values="0;0;.7;0;0" keyTimes="0;.51;.56;.63;1" dur="6s" repeatCount="indefinite"/></g>
'''
html+=leg(far,False)
html+='''<g stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M199 356L320 337 283 287 199 356M283 287L407 283 320 337M407 283L444 356" stroke="#284c4d" stroke-width="10"/><path d="M199 356L320 337 283 287 199 356M283 287L407 283 320 337M407 283L444 356" stroke="#e87c56" stroke-width="6"/><path d="M407 283L398 249Q397 241 408 241h24" stroke="#395d59" stroke-width="6"/><path d="M415 241h19" stroke="#253e42" stroke-width="8"/><path d="M404 253Q437 259 429 300" stroke="#567972" stroke-width="1.5"/><path d="M283 287l-5-17" stroke="#3d625b" stroke-width="5"/></g>
<path d="M263 274Q284 269 303 275L308 282Q284 289 264 282Z" fill="#29494a"/><path d="M271 276l28 2" stroke="#74918a" stroke-width="2" stroke-linecap="round"/>
<path d="M320 324L199 347a9 9 0 0 0 0 18L320 350a13 13 0 0 0 0-26Z" fill="#c9dbb8" stroke="#53756b" stroke-width="2"/><circle cx="320" cy="337" r="15" fill="#fff4d4" stroke="#345750" stroke-width="3"/>
'''
html+=f'<path d="{cranks.split(";")[0]}" stroke="#29494a" stroke-width="5" stroke-linecap="round"><animate attributeName="d" values="{cranks}" dur="1.5s" repeatCount="indefinite"/></path><circle cx="320" cy="337" r="5" fill="#e7ac45" stroke="#29494a" stroke-width="2"/>'
html+=foot(far,False)
html+='''<path d="M293 219Q322 207 348 227L412 235Q421 237 417 244L404 245 341 247 300 240Z" fill="#d5e1d8" stroke="#365953" stroke-width="2.5"/>
<g id="pelican-body"><path d="M258 241L232 221Q228 235 238 251L226 247Q232 261 254 267Z" fill="#fffdf1" stroke="#365953" stroke-width="2.5"/>
<path d="M251 239Q256 213 295 212Q317 211 329 215L337 174Q340 147 360 147L371 169Q359 185 360 214Q366 253 341 271Q322 285 288 283Q258 280 248 261Q243 250 251 239Z" fill="#fffef5" stroke="#365953" stroke-width="2.8"/>
<path d="M260 264Q290 282 324 270" fill="none" stroke="#dbe6d9" stroke-width="8" stroke-linecap="round"/>
<path d="M281 229Q299 224 318 239Q353 258 413 242Q423 241 422 249Q417 254 408 252Q349 277 303 256Q285 250 281 229Z" fill="#fffef5" stroke="#365953" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M295 240Q310 253 335 256M303 236Q319 248 337 250" fill="none" stroke="#c5d7ca" stroke-width="2.2" stroke-linecap="round"/>
<path d="M413 241l-1 8M417 242l-1 7" stroke="#708a7c" stroke-width="1.4"/>
</g>
'''
html+=leg(pts,True)+foot(pts,True)
html+='''<g transform="translate(357 164)"><g id="head-angle"><animateTransform attributeName="transform" type="rotate" values="0;0;-23;-23;0;0" keyTimes="0;.666667;.725;.89;.96;1" dur="6s" repeatCount="indefinite"/>
<g id="pelican-head"><animateTransform attributeName="transform" type="scale" values="1 1;1 1;-1 1;-1 1;1 1;1 1" keyTimes="0;.666667;.725;.89;.96;1" dur="6s" repeatCount="indefinite"/>
<path d="M-18 9Q-27-8-16-24Q-4-38 15-27Q31-19 25-1L17 17Q-1 25-18 9Z" fill="#fffef5" stroke="#365953" stroke-width="2.6"/>
<path d="M-12-27l-9-9 15 5-3-10 12 12" fill="#fffef5" stroke="#365953" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 0L126 17Q97 31 66 43Q36 57 21 29L10 11Z" fill="#edac48" stroke="#77592e" stroke-width="2.3"/>
<path d="M26 14Q41 42 69 35" fill="none" stroke="#ffd57c" stroke-width="6" stroke-linecap="round"/>
<path d="M17-3Q43-7 127 14Q136 17 126 20L19 11Z" fill="#ffc95d" stroke="#77592e" stroke-width="2.3" stroke-linejoin="round"/>
<path d="M27 9l97 8" stroke="#c58132" stroke-width="1.5"/>
<ellipse cx="12" cy="-15" rx="4.8" ry="6.3" fill="#29494a"/><circle cx="13.3" cy="-17" r="1.6" fill="white"/><path d="M6-26q7-5 13 0" fill="none" stroke="#29494a" stroke-width="2.3" stroke-linecap="round"/><ellipse cx="4" cy="-3" rx="6" ry="3.5" fill="#edab8f"/>
</g></g></g>
</g>
<g id="bump-caption" opacity="0"><rect x="405" y="83" width="74" height="32" rx="16" fill="#fff7db" stroke="#d7ac60"/><text x="442" y="105" text-anchor="middle" font-size="16" font-weight="bold" fill="#b17838">咯噔！</text><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.333333;.35;.475;.5;1" dur="6s" repeatCount="indefinite"/></g>
<g id="pudding-caption" transform="translate(-43 -37)" opacity="0"><path d="M122 146h104a14 14 0 0 1 14 14v15a14 14 0 0 1-14 14h-18l-10 11-3-11h-73a14 14 0 0 1-14-14v-15a14 14 0 0 1 14-14" fill="#fff8e6" stroke="#e0b766" stroke-width="1.5"/><text x="174" y="173" text-anchor="middle" font-size="16" font-weight="bold" fill="#a9743c">布丁起飞！</text><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.5;.53;.62;.666667;1" dur="6s" repeatCount="indefinite"/></g>
<g id="head-caption" opacity="0"><path d="M310 84h100a14 14 0 0 1 14 14v13a14 14 0 0 1-14 14h-39l-13 12-1-12h-47a14 14 0 0 1-14-14V98a14 14 0 0 1 14-14" fill="#fff8e6" stroke="#8eb5a0" stroke-width="1.5"/><text x="360" y="111" text-anchor="middle" font-size="16" font-weight="bold" fill="#527869">还在吧？</text><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.7;.74;.88;.94;1" dur="6s" repeatCount="indefinite"/></g>
<g transform="translate(33 70)"><rect width="107" height="29" rx="14.5" fill="#f9fbdf" stroke="#a9c6a6"/><circle cx="15" cy="14.5" r="3" fill="#e88859"/><text x="27" y="18" font-size="10" fill="#527b65" letter-spacing="1">急件 · 请勿摇晃</text></g>
</svg></div><div class="timeline" aria-label="六秒配送时间线"><div class="step"><span>00—02 SEC</span><strong>① 稳稳出发</strong></div><div class="step"><span>02—03 SEC</span><strong>② 小小颠簸</strong></div><div class="step"><span>03—04 SEC</span><strong>③ 布丁起飞</strong></div><div class="step"><span>04—06 SEC</span><strong>④ 回头确认</strong></div></div><footer><span>一只鹈鹕，一份布丁，一路小心。</span><span>MADE OF SVG · ∞ LOOP</span></footer></main></body></html>'''
Path('output/index.html').write_text(html)
print('Built',len(html),'bytes')
