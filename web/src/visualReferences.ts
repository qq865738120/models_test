export type ReferenceLevel = 0 | 5 | 10
export type VisualReferenceFigure = {
  id: string
  title: string
  kind: 'image' | 'interaction' | 'feel'
  image?: string
  imageAlt?: string
  labels: readonly [string, string, string]
  note: string
}

const base = '/rubric-references/r7/'

export const visualReferenceFigures: Record<string, VisualReferenceFigure> = {
  svg: {
    id: 'svg-expression', title: '构图与动作表达', kind: 'image',
    image: `${base}svg-expression.png`, imageAlt: '同一只鹈鹕骑车送布丁，从粗糙造型到精致表达的三档示意',
    labels: ['粗糙 · 主次混乱', '清楚 · 表达平直', '精致 · 生动有趣'],
    note: '构图示意；节奏与衔接仍需播放观察。',
  },
  static: {
    id: 'static-visual', title: '科普网页视觉', kind: 'image',
    image: `${base}static-visual.png`, imageAlt: '同一鹈鹕科普网页，从失衡排版到成熟视觉设计的三档示意',
    labels: ['失衡 · 拼贴粗糙', '清楚 · 常规布局', '惊艳 · 统一精修'],
    note: '比较视觉完成度，不要求复刻配色、风格或布局。',
  },
  dispatch: {
    id: 'dispatch-visual', title: '业务产品视觉', kind: 'image',
    image: `${base}dispatch-visual.png`, imageAlt: '同一派单后台，从粗糙默认控件到成熟产品界面的三档示意',
    labels: ['拥挤 · 控件拼凑', '清楚 · 基础产品', '成熟 · 细节精修'],
    note: '检查五页及弹层，图中业务字段不是题目要求。',
  },
  game2d: {
    id: 'game2d-visual', title: '2D 场景与界面视觉', kind: 'image',
    image: `${base}game2d-visual.png`, imageAlt: '同一鹈鹕平台游戏场景，从辨识困难到层次清晰、细节精致的三档示意',
    labels: ['混杂 · 辨识困难', '清楚 · 表现基础', '精致 · 层次鲜明'],
    note: '看辨识、统一与完成度，不按像素或写实风格评分。',
  },
  model3d: {
    id: 'game3d-model', title: '3D 模型精细程度', kind: 'image',
    image: `${base}game3d-visual.png`, imageAlt: '同一鹈鹕叉车，从粗糙方块拼装到精细机械结构和角色造型的三档示意',
    labels: ['方块拼装 · 粗糙', '结构齐全 · 基础', '机械与角色 · 精细'],
    note: '重点看实际几何、比例、连接与多视角细节。',
  },
  rendering3d: {
    id: 'game3d-rendering', title: '3D 材质、灯光与画面', kind: 'image',
    image: `${base}game3d-visual.png`, imageAlt: '同一鹈鹕叉车场景，从平板照明到成熟材质与灯光的三档示意',
    labels: ['平板 · 材质单一', '清楚 · 光照基础', '精修 · 质感与空间'],
    note: '比较材质、光照和画面；不以面数或特效数量评分。',
  },
  interaction: {
    id: 'dispatch-interaction', title: '派单流程与反馈', kind: 'interaction',
    labels: ['断裂 · 反馈缺失', '可用 · 恢复生硬', '连贯 · 清楚可恢复'],
    note: '流程示意；须实际操作确认、取消、失败重试与键盘路径。',
  },
  feel: {
    id: 'game2d-feel', title: '输入、动作与反馈', kind: 'feel',
    labels: ['迟滞 · 动作脱节', '可玩 · 反馈基础', '跟手 · 反馈连贯'],
    note: '动作示意，不能证明手感；须用键盘和触屏实际试玩。',
  },
}

const mapping: Record<string, Record<string, keyof typeof visualReferenceFigures>> = {
  '01-svg': { expression: 'svg', visual: 'svg' },
  '02-static': { impact: 'static', craft: 'static', integration: 'static', visual: 'static' },
  '03-dispatch': { visual: 'dispatch', interaction: 'interaction' },
  '04-game2d': { visual: 'game2d', feel: 'feel' },
  '05-game3d': { model: 'model3d', rendering: 'rendering3d', visual: 'rendering3d' },
}

export function getVisualReference(taskId: string, dimensionId: string): VisualReferenceFigure | null {
  const id = mapping[taskId]?.[dimensionId]
  return id ? visualReferenceFigures[id] : null
}
