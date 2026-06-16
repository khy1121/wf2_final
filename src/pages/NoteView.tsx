import { useParams, Link, useNavigate } from 'react-router-dom'
import type { WeekId } from '../types'
import Header from '../components/Header'
import Markdown from '../components/Markdown'
import { noteByWeek } from '../data/notes'
import { weekByNum } from '../data/chapters'

export default function NoteView() {
  const { week } = useParams()
  const navigate = useNavigate()
  const w = Number(week) as WeekId
  const note = noteByWeek(w)

  if (!note || !note.available) {
    return (
      <div>
        <Header title="수업 정리" />
        <div className="card mt-6 p-8 text-center text-ink-400">
          <div className="text-4xl">📝</div>
          <p className="mt-3 text-sm">해당 주차의 정리 노트가 아직 없어요.</p>
          <Link to="/notes" className="btn-ghost mt-4 px-4 py-2 text-sm">목록으로</Link>
        </div>
      </div>
    )
  }

  const meta = weekByNum(w)

  return (
    <div>
      <Header
        title={`${note.label} 정리`}
        subtitle={note.note}
        right={
          <button
            onClick={() => navigate(`/quiz/week/${w}`)}
            className="btn-primary shrink-0 px-3 py-1.5 text-xs"
          >
            문제풀기
          </button>
        }
      />

      <div className="card mb-4 flex flex-wrap items-center gap-1.5 p-3">
        <span className="badge bg-teal-500/20 text-teal-200">velog 정리</span>
        {meta.chapters.map((c) => (
          <span key={c} className="badge bg-ink-800 text-ink-300">
            {c}
          </span>
        ))}
        <span className="ml-auto text-xs text-ink-500">이미지 {note.imageCount}장</span>
      </div>

      <article className="card p-5">
        <Markdown>{note.markdown}</Markdown>
      </article>

      <div className="mt-5 flex gap-2">
        <Link to="/notes" className="btn-ghost flex-1 py-3 text-center">다른 주차 정리</Link>
        <Link to={`/quiz/week/${w}`} className="btn-primary flex-1 py-3 text-center">
          이 주차 문제 풀기
        </Link>
      </div>
    </div>
  )
}
