import type { Question } from '../types'
import { chapterById } from '../data/chapters'

export default function SourceBadge({ q }: { q: Question }) {
  const ch = chapterById(q.chapter)
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className={`badge bg-gradient-to-br ${ch.accent} text-white/95`}>
        {ch.emoji} {ch.no}
      </span>
      <span className="badge bg-ink-800 text-ink-300">{q.week}주차</span>
      {q.source === 'velog' ? (
        <span className="badge bg-teal-500/20 text-teal-200">velog</span>
      ) : (
        <span className="badge bg-amber-500/20 text-amber-200">PPT</span>
      )}
      {q.type === 'short' && <span className="badge bg-fuchsia-500/20 text-fuchsia-200">주관식</span>}
    </div>
  )
}
