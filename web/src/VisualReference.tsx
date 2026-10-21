import { useId } from 'react'
import type { Phase } from './types'
import { getVisualReference, type ReferenceLevel } from './visualReferences'
import './visual-reference.css'

type Props = {
  taskId: string
  dimensionId: string
  value?: number | null
  onSelect?: (value: number) => void
  phase?: Phase
}

function FlowDiagram({ level, markerId }: { level: ReferenceLevel; markerId: string }) {
  const high = level === 10
  const low = level === 0
  const centers = [58, 180, 302]
  return <svg viewBox="0 0 360 280" aria-hidden="true">
    <defs><marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill={low ? '#b96552' : '#38746c'} /></marker></defs>
    <rect width="360" height="280" fill="#f5f3ec" />
    <path d={low ? 'M95 132L112 109L126 154L140 132 M218 132L234 151L251 116L266 132' : 'M95 132H140 M218 132H266'} fill="none" stroke={low ? '#b96552' : '#38746c'} strokeWidth="3" strokeDasharray={low ? '5 4' : undefined} markerEnd={`url(#${markerId})`} />
    {centers.map((cx, index) => <g key={cx}>
      <rect x={cx - 38} y="78" width="76" height="108" rx={high ? 12 : 4} fill="#fffefa" stroke={low && index === 2 ? '#bc6b59' : '#b6c8be'} strokeWidth={high ? 2 : 1.5} />
      <rect x={cx - 26} y="90" width="52" height="8" rx="4" fill="#dbe5dd" />
      <text x={cx} y="213" textAnchor="middle" fontSize="14" fontFamily="sans-serif" fill="#38504a">{['选择', '确认', '结果'][index]}</text>
      {index === 0 && <><rect x={cx - 24} y="115" width="10" height="10" rx="2" fill="#e89a57" /><path d={`M${cx - 9} 120h32 M${cx - 24} 143h47 M${cx - 24} 160h38`} stroke="#a2b3ab" strokeWidth="4" strokeLinecap="round" /></>}
      {index === 1 && <><circle cx={cx} cy="122" r="11" fill="#e1ebe3" /><rect x={cx - 24} y="149" width="48" height="20" rx="5" fill={high ? '#38746c' : '#e89a57'} /><path d={`M${cx - 12} 159h24`} stroke="#fffefa" strokeWidth="3" strokeLinecap="round" /></>}
      {index === 2 && (low ? <path d={`M${cx - 10} 124l20 20m0-20l-20 20`} stroke="#bc6b59" strokeWidth="5" strokeLinecap="round" /> : <><circle cx={cx} cy="134" r="18" fill={high ? '#d9eade' : '#ece7d7'} /><path d={`M${cx - 9} 134l6 6l12-13`} stroke={high ? '#38746c' : '#b89660'} fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></>)}
    </g>)}
    {high && <><path d="M300 224V239H180V224" fill="none" stroke="#dd9255" strokeWidth="2.5" markerEnd={`url(#${markerId})`} /><rect x="142" y="72" width="76" height="120" rx="15" fill="none" stroke="#e5a76e" strokeWidth="2" strokeDasharray="4 4" /></>}
    {!high && !low && <g fill="#c5c8b9"><circle cx="166" cy="239" r="3" /><circle cx="180" cy="239" r="3" /><circle cx="194" cy="239" r="3" /></g>}
  </svg>
}

function Bird({ x, y, subdued = false }: { x: number; y: number; subdued?: boolean }) {
  return <g transform={`translate(${x} ${y})`} opacity={subdued ? 0.28 : 1}>
    <ellipse cx="0" cy="0" rx="13" ry="17" fill="#fffdf6" stroke="#38665e" strokeWidth="2" />
    <path d="M-9-2q16-4 14 11q-9 5-14-11" fill="#c9dcd0" />
    <circle cx="7" cy="-18" r="10" fill="#fffdf6" stroke="#38665e" strokeWidth="2" />
    <path d="M14-21h23L15-10Z" fill="#e99a57" />
    <circle cx="10" cy="-21" r="1.8" fill="#244e49" />
    <path d="M-5 16v6h-7M6 16v6h8" stroke="#c9854d" strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
}

function FeelDiagram({ level, markerId }: { level: ReferenceLevel; markerId: string }) {
  const high = level === 10
  const low = level === 0
  return <svg viewBox="0 0 360 280" aria-hidden="true">
    <defs><marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill={low ? '#b96552' : '#38746c'} /></marker></defs>
    <rect width="360" height="280" fill="#f5f3ec" />
    <path d="M20 212H340" stroke="#b9ccc1" strokeWidth="3" />
    <rect x="22" y="186" width="92" height="13" rx="4" fill="#557e75" />
    <rect x="246" y="158" width="92" height="13" rx="4" fill="#557e75" />
    <path d={low ? 'M68 142L102 119L118 139L151 80L181 113L200 74L232 126L280 114' : 'M68 142Q176 8 280 114'} fill="none" stroke={low ? '#b96552' : '#38746c'} strokeWidth={high ? 3.5 : 2.5} strokeDasharray={low ? '7 5' : high ? undefined : '6 6'} markerEnd={`url(#${markerId})`} />
    <Bird x={62} y={162} subdued />
    <Bird x={high ? 178 : 171} y={low ? 119 : 83} />
    <Bird x={280} y={134} subdued={!high} />
    {high && <><ellipse cx="280" cy="160" rx="23" ry="5" fill="#e7a368" opacity=".4" /><path d="M249 143l-7-5M306 143l7-5M277 104v-7" stroke="#d9985c" strokeWidth="2.5" strokeLinecap="round" /></>}
    {low && <path d="M99 54l12 12m0-12L99 66" stroke="#b96552" strokeWidth="3" />}
    <rect x="24" y="230" width="70" height="29" rx="7" fill="#fffefa" stroke="#a9c0b4" />
    <path d="M47 244h24m-5-5l5 5l-5 5" fill="none" stroke="#38746c" strokeWidth="2" />
    <text x="176" y="249" textAnchor="middle" fill="#38504a" fontSize="14" fontFamily="sans-serif">{low ? '输入与动作脱节' : high ? '起跳—落地—反馈' : '基本动作成立'}</text>
  </svg>
}

export default function VisualReference({ taskId, dimensionId, value, onSelect, phase = 'initial' }: Props) {
  const figure = getVisualReference(taskId, dimensionId)
  const instanceId = useId().replaceAll(':', '')
  if (!figure) return null
  const levels: ReferenceLevel[] = [0, 5, 10]
  return <section className="visual-reference" aria-label={`${figure.title}评分参考`}>
    <div className="vr-heading">
      <span>{figure.title}</span>
      <small>{phase === 'change' ? '变更后画面 · 同一尺度' : figure.kind === 'image' ? '视觉示意' : '操作示意'}</small>
    </div>
    <div className="vr-grid">
      {levels.map((level, index) => {
        const content = <>
          <span className="vr-picture">
            {figure.kind === 'image' ? <img src={figure.image} alt="" loading="lazy" draggable={false} style={{ left: `${index * -100}%` }} />
              : figure.kind === 'interaction' ? <FlowDiagram level={level} markerId={`${instanceId}-${index}`} />
                : <FeelDiagram level={level} markerId={`${instanceId}-${index}`} />}
          </span>
          <span className="vr-card-caption"><strong>{level}<small>分</small></strong><span>{figure.labels[index]}</span></span>
        </>
        return onSelect ? <button key={level} type="button" className={`vr-card${value === level ? ' is-selected' : ''}`} aria-label={`选择${level}分：${figure.labels[index]}`} aria-pressed={value === level} onClick={() => onSelect(level)}>{content}</button>
          : <div key={level} className="vr-card" role="img" aria-label={`${level}分参考：${figure.labels[index]}`}>{content}</div>
      })}
    </div>
    <p className="vr-note">{figure.note}</p>
  </section>
}
