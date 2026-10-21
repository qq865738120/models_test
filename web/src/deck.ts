import type {Phase,Task} from './types'

export function corePrompt(text:string,title:string):string {
 if(!text)return ''
 const start=text.indexOf('# '+title)
 let core=start>=0?text.slice(start):text
 core=core.split('## HTML 交付约定')[0]
 core=core.replace(/^# [^\n]+\n*/,'').replace(/^本阶段预算：[^\n]+\n*/,'')
 core=core.replace(/^初始阶段已冻结。[^\n]+\n*/,'')
 core=core.replace(/^提示词版本：[^\n]+\n*/,'')
 return core.trim()
}

export function taskBrief(task:Task,phase:Phase,changeReleased:boolean):string[] {
 if(phase==='initial')return task.brief
 if(!changeReleased)return ['追加任务尚未开放。']
 if(task.briefChange!==undefined)return task.briefChange
 if(task.scoringMode==='binary'||task.scoringMode==='objective')return ['阅读追加阶段题目与对应材料。','只在 output/answers.json 中提交各题答案。']
 return ['阅读追加阶段提示词，完成对应要求。']
}
