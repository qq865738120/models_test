'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
// The page stores only ephemeral UI state; it works inside an opaque-origin iframe.
const menu = $('.menu-toggle');
menu.addEventListener('click', () => {
 const expanded = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(expanded));
 menu.setAttribute('aria-label', expanded ? '收起章节导航' : '展开章节导航');
 menu.textContent = expanded ? '×' : '☰';
 $('.nav').classList.toggle('open', expanded);
});
$$('.nav a').forEach(link => link.addEventListener('click', () => { $('.nav').classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '展开章节导航'); menu.textContent='☰'; }));
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}), {threshold:.12});
$$('.reveal').forEach(el => revealObserver.observe(el));
function updateProgress(){ const height = document.documentElement.scrollHeight-innerHeight; $('.progress').style.width = `${height > 0 ? scrollY/height*100 : 0}%`; }
addEventListener('scroll', updateProgress, {passive:true});addEventListener('resize', updateProgress);updateProgress();
function showPart(part){
 $$('.anatomy-choice').forEach(el=>{const active=el.dataset.section===part;el.classList.toggle('active',active);$('.anatomy-toggle',el).setAttribute('aria-expanded',String(active));$('.sign',el).textContent=active?'−':'+';});
 $$('.hotspot').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.part===part)));
}
$$('[data-part]').forEach(el=>el.addEventListener('click',()=>showPart(el.dataset.part)));
const species = [
 {id:'brown',name:'褐鹈鹕',latin:'Pelecanus occidentalis',tag:'海岸与河口 · 空中的捕鱼者',description:'从空中发现目标，再俯冲入水。褐鹈鹕常见于美洲沿岸和河口，这种引人注目的捕食方式，是它的一大特点，却不是所有鹈鹕的共同习惯。',range:'美洲沿岸与河口水域',nest:'可在地面或树上筑巢；双亲共同孵卵、喂食雏鸟。',note:'它曾受到农药污染影响，保护措施促进了恢复；这不代表所有鹈鹕种群都已没有风险。'},
 {id:'white',name:'美洲白鹈鹕',latin:'Pelecanus erythrorhynchos',tag:'内陆湖泊 · 水面的协作者',description:'在浅水水面舀取食物，有时与同伴合作，把鱼驱向浅水。这种鹈鹕在北美内陆湖泊的岛屿繁殖，也常成群飞行，利用上升气流滑翔。',range:'北美内陆湖泊等水域；在湖泊岛屿繁殖。',nest:'在地面筑巢；繁殖群对人为干扰敏感。',note:'鱼是主要食物，也吃蝾螈、蝌蚪和小龙虾等；食谱受当地环境与食物供应影响。'},
 {id:'australian',name:'澳大利亚鹈鹕',latin:'Pelecanus conspicillatus',tag:'淡水到海岸 · 多种水域的访客',description:'名字里有澳大利亚，分布却不止于此。它们也分布于巴布亚新几内亚和印度尼西亚西部，在淡水、河口及海岸水域活动，展现鹈鹕家族对多样水域的利用。',range:'澳大利亚、巴布亚新几内亚、印度尼西亚西部。',nest:'淡水、河口及海岸水域。',note:'湖泊与海岸都可能是它的生活场景。认识鹈鹕，不能只把目光停留在海边。'}
];
let speciesIndex=0;
function showSpecies(index,focus=false){
 speciesIndex=(index+species.length)%species.length;const data=species[speciesIndex];
 $$('.species-tab').forEach((tab,i)=>{const active=i===speciesIndex;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
 $('#species-panel').setAttribute('aria-labelledby',`tab-${data.id}`);
 $('.species-portrait').dataset.species=data.id;
 $('#species-meta-label').textContent=data.id==='australian'?'活动水域':'如何养育下一代';
 const mapping={name:'name',latin:'latin',tag:'tag',description:'description',range:'range',nest:'nest',note:'note'};
 Object.entries(mapping).forEach(([id,key])=>$('#species-'+id).textContent=data[key]);
 $('.portrait-mark').textContent=String(speciesIndex+1).padStart(2,'0');
 $('.species-count').textContent=String(speciesIndex+1).padStart(2,'0')+' / 03';
}
$$('.species-tab').forEach((tab,i)=>{tab.addEventListener('click',()=>showSpecies(i));tab.addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?2:speciesIndex+(event.key==='ArrowRight'?1:-1);showSpecies(next,true);}});});
$('#species-prev').addEventListener('click',()=>showSpecies(speciesIndex-1));$('#species-next').addEventListener('click',()=>showSpecies(speciesIndex+1));
let feedingMode='surface', feedingStep=0, playTimer=null;
const modes={surface:{explanation:'美洲白鹈鹕常在浅水水面捕食，也会协作把鱼驱向浅水。一起围鱼，是它们水边生活的一部分。',titles:['舀取','排水','吞咽'],descriptions:['喉囊兜住猎物与水。','先让多余的水排出。','再把猎物吞下。']},dive:{explanation:'褐鹈鹕能从空中俯冲入水捕鱼，再排水、吞咽。注意：不能把这种方式，当成所有鹈鹕的统一动作。',titles:['发现目标','俯冲捕获','排水吞咽'],descriptions:['从空中寻找水中的鱼。','俯冲入水，喉囊兜住猎物。','排出水后，把食物吞下。']}};
function showFeedingStep(step){feedingStep=step;$('.water-scene').className=`water-scene mode-${feedingMode} stage-${step}`;$$('[data-step]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.step)===step)));$('#scene-status').textContent=`0${step+1} / ${modes[feedingMode].titles[step]} · ${playTimer?'自动播放中':'点击步骤查看'}`;}
function stopPlayback(){if(playTimer){clearInterval(playTimer);playTimer=null;}$('.play').textContent='▶';$('.play').setAttribute('aria-label','自动播放捕食过程');$('.play').setAttribute('aria-pressed','false');showFeedingStep(feedingStep);}
$$('[data-mode]').forEach(button=>button.addEventListener('click',()=>{stopPlayback();feedingMode=button.dataset.mode;$$('[data-mode]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));$('#feeding-explainer').textContent=modes[feedingMode].explanation;modes[feedingMode].titles.forEach((title,i)=>{$('#step-title-'+i).textContent=title;$('#step-copy-'+i).textContent=modes[feedingMode].descriptions[i];});showFeedingStep(0);}));
$$('[data-step]').forEach(button=>button.addEventListener('click',()=>{stopPlayback();showFeedingStep(Number(button.dataset.step));}));
$('.play').addEventListener('click',()=>{if(playTimer){stopPlayback();return;}playTimer=setInterval(()=>showFeedingStep((feedingStep+1)%3),2300);$('.play').textContent='Ⅱ';$('.play').setAttribute('aria-label','暂停捕食过程');$('.play').setAttribute('aria-pressed','true');showFeedingStep(feedingStep);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlayback();});
const feedingObserver=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&playTimer)stopPlayback();},{threshold:0});feedingObserver.observe($('.water-scene'));
const questions=[{question:'鹈鹕的喉囊，是储存一天食物的“冰箱”吗？',answers:['是，它会囤着慢慢吃','不是，它主要帮助捕食'],correct:1,explanation:'喉囊用来兜住猎物和水，排水后吞咽。它不是长期存鱼的“冰箱”。'},{question:'所有鹈鹕都会从空中俯冲入水捕鱼吗？',answers:['会，这是共同的本领','不会，物种之间有差异'],correct:1,explanation:'褐鹈鹕能俯冲捕鱼；美洲白鹈鹕常在水面舀取食物，也会协作围鱼。'},{question:'看到繁殖中的鹈鹕，怎样观察更合适？',answers:['保持距离，安静远观','靠近巢穴，拍完就走'],correct:0,explanation:'与巢区保持距离，不惊扰和追逐鸟群。美洲白鹈鹕繁殖群对人为干扰敏感。'}];
let questionIndex=0;
function showQuestion(){const q=questions[questionIndex];$('.quiz-count').textContent=`QUESTION 0${questionIndex+1} / 03`;$('#quiz-question').textContent=q.question;$$('[data-answer]').forEach((b,i)=>{b.textContent=q.answers[i];b.classList.remove('selected');b.removeAttribute('aria-pressed');});$('.quiz-feedback').textContent='选一个答案，看看你是否读懂了它们的生活。';$('.quiz-next').hidden=true;}
$$('[data-answer]').forEach(button=>button.addEventListener('click',()=>{const q=questions[questionIndex],answer=Number(button.dataset.answer);$$('[data-answer]').forEach(el=>{el.classList.toggle('selected',el===button);el.setAttribute('aria-pressed',String(el===button));});$('.quiz-feedback').textContent=(answer===q.correct?'答对了。':'再认识它多一点：')+q.explanation;$('.quiz-next').hidden=false;$('.quiz-next').textContent=questionIndex===2?'再看一次 ↻':'下一题 →';}));
$('.quiz-next').addEventListener('click',()=>{questionIndex=(questionIndex+1)%questions.length;showQuestion();$('[data-answer]').focus();});
