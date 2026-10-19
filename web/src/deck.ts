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

export const changeBrief:Record<string,string[]>={
 '01-svg':['将循环改为8秒，只延长平稳骑行时间。','保留颠动、布丁弹落和回头查看的时长与同步。'],
 '02-dispatch':['将搜索词、状态和页码同步到URL。','刷新与浏览器前进后退恢复列表，保留原有选择清空规则。'],
 '03-game2d':['加入易碎快递，携带时降低移动速度。','受伤后快递回到原位，原有游戏状态仍须正确。'],
 '04-game3d':['叉车加宽20%，同步更新轮距、货叉间距、驾驶室和碰撞体。','在原有仓库中完成搬运与交付。'],
 '05-memory':['面对重名NPC和多次偏好变更，保持方法与参数不变先测泛化。','报告相对原场景的变化，再提出最小实验区分实体混淆与时间更新失败。']
}
