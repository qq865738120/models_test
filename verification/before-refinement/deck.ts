export type PromptPage={label:string;text:string}

// A fixed 1280×720 slide has room for 11 lines at 28px leading.
// Preserve every character; only visual line breaks and page boundaries are added.
export function paginate(text:string,width=49,linesPerPage=11):string[]{
 if(!text)return []
 const lines:string[]=[]
 for(const paragraph of text.replace(/\r\n/g,'\n').split('\n')){
  let line='',used=0
  for(const character of paragraph){
   const size=character==='\t'?2:character.codePointAt(0)!>255?1:.6
   if(used+size>width&&line){lines.push(line);line='';used=0}
   line+=character;used+=size
  }
  lines.push(line)
 }
 const pages=[]
 for(let i=0;i<lines.length;i+=linesPerPage)pages.push(lines.slice(i,i+linesPerPage).join('\n'))
 return pages
}

export function promptPages(text:string,title:string):PromptPage[]{
 const rule=text.indexOf('# 统一任务规则'),start=text.indexOf('# '+title)
 const sections=rule>=0&&start>rule
  ?[{label:'任务正文',text:text.slice(start)},{label:'公共规则',text:text.slice(0,start)}]
  :[{label:'追加提示词',text}]
 return sections.flatMap(section=>paginate(section.text).map((page,index,all)=>({label:`${section.label} · ${index+1} / ${all.length}`,text:page})))
}

export const changeBrief:Record<string,string[]>={
 '01-svg':['将循环改为8秒，只延长平稳骑行时间。','保留颠动、布丁弹落和回头查看的时长与同步。'],
 '02-dispatch':['将搜索词、状态和页码同步到URL。','刷新与浏览器前进后退恢复列表，保留原有选择清空规则。'],
 '03-game2d':['加入易碎快递，携带时降低移动速度。','受伤后快递回到原位，原有游戏状态仍须正确。'],
 '04-game3d':['叉车加宽20%，同步更新轮距、货叉间距、驾驶室和碰撞体。','在原有仓库中完成搬运与交付。'],
 '05-memory':['面对重名NPC和多次偏好变更，保持方法与参数不变先测泛化。','报告相对原场景的变化，再提出最小实验区分实体混淆与时间更新失败。']
}
