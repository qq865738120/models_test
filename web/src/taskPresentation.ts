import type {Task} from './types'
const descriptions:Record<string,{category:string;capabilities:string[]}>= {
 '01-svg':{category:'编码',capabilities:['SVG 编码能力','动画设计能力','平面空间理解能力']},
 '02-dispatch':{category:'前端开发',capabilities:['界面设计能力','视觉审美能力','交互理解能力']},
 '03-game2d':{category:'游戏开发',capabilities:['游戏设计能力','游戏开发能力','游戏世界理解能力']},
 '04-game3d':{category:'游戏开发',capabilities:['3D 建模能力','游戏开发能力','游戏世界理解能力']}
}
export const presentTask=(task:Task):Task=>{
 if(task.id==='05-memory'){
  // Historical memory experiments keep their original task and scoring semantics.
  const legacy=task.title==='NPC 真的记住你了吗'
  return {...task,category:'研究',
   title:legacy?'长期记忆的证据审查':'论文研究与上下文理解',
   description:legacy?'从对话记录到实验结论，检验记忆如何更新、证据是否可靠。':
    '研读五十篇前沿论文与《三体Ⅲ：死神永生》，在长文本中梳理论证、关联线索、理解世界观。回答六个跨章节、跨文献的问题，用证据支撑每一步推理。',
   capabilities:legacy?['实验设计能力','证据分析能力','逻辑推理能力']:['长文本理解能力','跨文本逻辑推理能力','证据整合能力']}
 }
 return {...task,...(descriptions[task.id]||{category:'研究'})}
}
export const levelClass=(level:string)=>({'入门':'intro','中级':'medium','进阶':'advanced','高级':'expert','挑战':'challenge'}[level]||'medium')
