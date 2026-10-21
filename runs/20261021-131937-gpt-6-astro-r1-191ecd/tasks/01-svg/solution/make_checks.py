from pathlib import Path
import re
s=Path('output/index.html').read_text();svg=re.search(r'<svg\b.*?</svg>',s,re.S).group()
Path('solution/animation.svg').write_text(svg)
checks='''<!doctype html><html><meta charset="utf-8"><title>本地动画核对</title><style>body{font:14px system-ui;margin:14px;background:#faf7ee;color:#25464b}button{padding:8px 16px;margin:4px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.card{border:1px solid #adc9b7;border-radius:12px;overflow:hidden}.label{padding:5px 12px;background:#e5ead7}svg{display:block;width:100%;height:auto}pre{white-space:pre-wrap;font-size:11px}</style><button onclick="show('phases')">踏板四相位</button><button onclick="show('events')">事件边界</button><button onclick="show('loops')">三个周期对照</button><button onclick="play()">连续播放18秒</button><span id="status"></span><div class="grid" id="grid"></div><pre id="report"></pre><template id="art">'''+svg+'''</template><script>
const sets={phases:[0,.375,.75,1.125,3.45,4.8],events:[1.999,2,2.1,2.76,2.999,3,3.45,3.9,4,4.35,5.76,5.999],loops:[0,6,12,18,5.999,6.001]};
function show(mode){grid.innerHTML='';for(const t of sets[mode]){let card=document.createElement('div');card.className='card';card.innerHTML='<div class="label">t = '+t+' 秒</div>'+art.innerHTML;grid.append(card);let s=card.querySelector('svg');s.pauseAnimations();s.setCurrentTime(t)}document.getElementById('status').textContent=mode;requestAnimationFrame(report)}
function report(){let result=[];for(let c of grid.children){let s=c.querySelector('svg'),b=s.querySelector('#rider-and-bicycle').getBBox(),n=s.querySelector('#near-pedal-foot').transform.animVal.getItem(0).matrix,f=s.querySelector('#far-pedal-foot').transform.animVal.getItem(0).matrix;result.push({time:s.getCurrentTime(),bounds:[b.x,b.y,b.width,b.height].map(v=>+v.toFixed(2)),pedalPhaseMidpoint:[(n.e+f.e)/2,(n.f+f.f)/2].map(v=>+v.toFixed(3)),near:[n.e,n.f],far:[f.e,f.f]})}document.getElementById('report').textContent=JSON.stringify(result,null,2)}
function play(){grid.innerHTML='<div class="card" style="max-width:640px;grid-column:1/-1">'+art.innerHTML+'</div>';let s=grid.querySelector('svg');s.setCurrentTime(0);document.getElementById('status').textContent='正在连续播放 0–18 秒';setTimeout(()=>{s.pauseAnimations();document.getElementById('status').textContent='已连续播放至 '+s.getCurrentTime().toFixed(2)+' 秒'},18000)}
show('phases');
</script></html>'''
Path('.runtime/check.html').write_text(checks)
print('Created local browser checks')
