import test from 'node:test'
import assert from 'node:assert/strict'
import {corePrompt} from '../src/deck.ts'
test('展示核心正文，剔除公共规则、标题、预算与HTML交付约定',()=>{
 const full='开场\n# 公共规则\n不读取项目外文件\n# 鹈鹕任务\n\n本阶段预算：10分钟。\n\n请制作动画。\n第二段\n## HTML 交付约定\n固定入口'
 assert.equal(corePrompt(full,'鹈鹕任务'),'请制作动画。\n第二段')
 assert.ok(full.includes('不读取项目外文件'))
})
test('长正文保持全部字符，不分页或截断',()=>{
 const body='跨论文比较条件与证据。'.repeat(5000)
 assert.equal(corePrompt('# 长文本\n\n'+body+'\n## HTML 交付约定\n入口','长文本'),body)
})
test('追加阶段移除主持流程前缀，保留全部任务要求',()=>{
 assert.equal(corePrompt('初始阶段已冻结。现在开始固定追加阶段，预算30分钟。继续遵守COMMON_RULES.md。\n\n核对论证。','长文本'),'核对论证。')
 assert.equal(corePrompt('','长文本'),'')
})
