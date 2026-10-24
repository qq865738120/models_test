(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const parts = {
    pouch: { number: '01', label: 'THE POUCH', title: '会伸展的喉囊', text: '捕食时，喉囊兜住猎物和水；随后排出水，再吞咽食物。它不是把一天的鱼长期存起来的“冰箱”。', myth: '喉囊 ≠ 长期储物袋' },
    wing: { number: '02', label: 'THE WINGS', title: '为滑翔展开的宽翼', text: '宽大的翅膀帮助鹈鹕滑翔。美洲白鹈鹕可成群飞行，并利用上升气流省力地掠过天空。', myth: '大型水鸟 ≠ 只能笨拙涉水' },
    feet: { number: '03', label: 'THE FEET', title: '适合游泳的蹼足', text: '趾间的蹼让双脚成为水中的推进工具。游泳、滑翔与长喙捕食，共同组成鹈鹕的水域适应能力。', myth: '大嘴之外，还有全身配合' }
  };

  function selectPart(name) {
    const data = parts[name];
    if (!data) return;
    $('#partNumber').textContent = data.number;
    $('#partLabel').textContent = data.label;
    $('#partTitle').textContent = data.title;
    $('#partText').textContent = data.text;
    $('#partMyth').textContent = data.myth;
    $$('[data-part]').forEach(button => {
      if (button.tagName === 'BUTTON') button.classList.toggle('active', button.dataset.part === name);
    });
    $$('.svg-part').forEach(part => part.classList.toggle('highlight', part.id === `part-${name}` || (name === 'pouch' && part.id === 'part-beak')));
    $('.anatomy-visual').classList.add('has-active');
  }
  $$('[data-part]').forEach(button => button.addEventListener('click', () => selectPart(button.dataset.part)));
  selectPart('pouch');

  const species = {
    brown: {
      index: '01', name: '褐鹈鹕', latin: 'Pelecanus occidentalis', summary: '海岸与河口边的俯冲猎手。',
      habitat: '常见于美洲沿岸和河口。', foraging: '能从空中俯冲入水捕食。',
      breeding: '可在地面或树上筑巢；双亲共同孵卵，并给雏鸟喂食。',
      caution: '俯冲是褐鹈鹕的捕食方式，不能推广为所有鹈鹕的统一动作。'
    },
    white: {
      index: '02', name: '美洲白鹈鹕', latin: 'Pelecanus erythrorhynchos', summary: '内陆湖泊上的协作捕鱼者。',
      habitat: '在北美内陆湖泊岛屿繁殖，活动于适宜的浅水水域。',
      foraging: '常在浅水水面捕食，也会群体协作，把鱼驱向浅水。',
      breeding: '在地面筑巢，常集群繁殖；繁殖群对人为干扰敏感。',
      caution: '除鱼以外，它也会取食蝾螈、蝌蚪和小龙虾等，食谱随环境与供应变化。'
    },
    australian: {
      index: '03', name: '澳大利亚鹈鹕', latin: 'Pelecanus conspicillatus', summary: '穿行于淡水、河口与海岸之间。',
      habitat: '分布包括澳大利亚、巴布亚新几内亚和印度尼西亚西部。',
      foraging: '活动于淡水、河口及海岸水域；本资料未给出其专属捕食动作。',
      breeding: '本资料仅提供其分布与栖息地信息，不据此推断具体巢址。',
      caution: '鹈鹕并非只生活在海里；这一物种的活动范围就同时包括淡水与海岸水域。'
    }
  };

  const speciesPanel = $('#speciesPanel');
  function selectSpecies(name, focus = false) {
    const data = species[name];
    if (!data) return;
    const selectedTab = $(`.species-tabs [data-species="${name}"]`);
    $$('.species-tabs [role="tab"]').forEach(tab => {
      const active = tab === selectedTab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    speciesPanel.classList.add('changing');
    window.setTimeout(() => {
      speciesPanel.className = `species-panel ${name}`;
      speciesPanel.setAttribute('aria-labelledby', selectedTab.id);
      for (const key of ['index', 'name', 'latin', 'summary', 'habitat', 'foraging', 'breeding', 'caution']) {
        const element = $(`#species${key[0].toUpperCase()}${key.slice(1)}`);
        if (element) element.textContent = data[key];
      }
      speciesPanel.classList.remove('changing');
      if (focus) selectedTab.focus();
    }, 140);
  }
  $$('.species-tabs [role="tab"]').forEach((tab, index, tabs) => {
    tab.addEventListener('click', () => selectSpecies(tab.dataset.species));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectSpecies(tabs[next].dataset.species, true);
      }
    });
  });

  const hunts = {
    scoop: { label: '水面舀取', text: '美洲白鹈鹕常在浅水水面捕食，用喙与喉囊舀取食物，而不是从空中扎入水中。' },
    team: { label: '协作围鱼', text: '美洲白鹈鹕会群体协作，把鱼驱向浅水，再找机会取食。群体觅食让“各自张嘴”变成有配合的围猎。' },
    dive: { label: '空中俯冲', text: '褐鹈鹕能从空中俯冲入水捕食。这是它的鲜明本领，但不能据此认为每一种鹈鹕都会这样捕鱼。' }
  };
  $$('.hunt-tabs button').forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.mode;
    $('#foragingScene').dataset.mode = mode;
    $('#sceneLabel').textContent = hunts[mode].label;
    $('#huntText').textContent = hunts[mode].text;
    $$('.hunt-tabs button').forEach(item => item.classList.toggle('active', item === button));
  }));

  const checks = $$('.checklist input');
  function updateChecklist() {
    const count = checks.filter(input => input.checked).length;
    $('#guideCount').textContent = `${count} / ${checks.length}`;
    $('#guideBar').style.width = `${count / checks.length * 100}%`;
    $('#guideComplete').textContent = count === checks.length ? '✓ 守则已记下。下一次水边相遇，请把不惊扰放在第一位。' : '';
  }
  checks.forEach(input => input.addEventListener('change', updateChecklist));

  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('a', mainNav).forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  function updateProgress() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    $('#scrollProgress').style.width = `${available > 0 ? window.scrollY / available * 100 : 0}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    $$('.reveal').forEach(element => observer.observe(element));
  } else {
    $$('.reveal').forEach(element => element.classList.add('visible'));
  }
})();
