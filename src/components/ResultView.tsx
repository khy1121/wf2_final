import { Link } from 'react-router-dom'
import type { RuntimeQuestion, AnswerRecord } from '../types'
import Header from './Header'
import SourceBadge from './SourceBadge'

interface Props {
  title: string
  runtime: RuntimeQuestion[]
  answers: Record<string, AnswerRecord>
  onRestart: () => void
  onReview: (index: number) => void
}

function grade(pct: number) {
  if (pct >= 90) return { emoji: '🏆', msg: '완벽해요! 시험 준비 끝!', color: 'text-amber-300' }
  if (pct >= 75) return { emoji: '🎯', msg: '좋아요! 조금만 더!', color: 'text-emerald-300' }
  if (pct >= 50) return { emoji: '📚', msg: '복습이 필요해요', color: 'text-sky-300' }
  return { emoji: '🔥', msg: '오답 위주로 다시 풀어보세요', color: 'text-rose-300' }
}

export default function ResultView({ title, runtime, answers, onRestart, onReview }: Props) {
  const total = runtime.length
  const correct = Object.values(answers).filter((a) => a.correct).length
  const pct = Math.round((correct / total) * 100)
  const g = grade(pct)
  const wrong = runtime
    .map((rq, i) => ({ rq, i, rec: answers[rq.ref.id] }))
    .filter((x) => !x.rec || !x.rec.correct)

  return (
    <div>
      <Header title="결과" subtitle={title} back={false} right={
        <Link to="/" className="btn-ghost px-3 py-1.5 text-sm">홈</Link>
      } />

      <div className="card animate-pop-in p-6 text-center">
        <div className="text-5xl">{g.emoji}</div>
        <div className="mt-3 text-4xl font-extrabold">
          <span className="bg-gradient-to-r from-brand-400 to-sky-400 bg-clip-text text-transparent">{pct}점</span>
        </div>
        <p className={`mt-1 font-semibold ${g.color}`}>{g.msg}</p>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div>
            <div className="text-2xl font-bold text-emerald-400">{correct}</div>
            <div className="text-ink-500">정답</div>
          </div>
          <div className="h-8 w-px bg-ink-700" />
          <div>
            <div className="text-2xl font-bold text-rose-400">{total - correct}</div>
            <div className="text-ink-500">오답</div>
          </div>
          <div className="h-8 w-px bg-ink-700" />
          <div>
            <div className="text-2xl font-bold text-ink-200">{total}</div>
            <div className="text-ink-500">전체</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={onRestart} className="btn-primary flex-1 py-3">다시 풀기 🔄</button>
        <Link to="/" className="btn-ghost px-5 py-3">메뉴</Link>
      </div>

      {wrong.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 px-1 text-sm font-bold text-ink-300">틀린 문제 ({wrong.length})</h3>
          <div className="space-y-2">
            {wrong.map(({ rq, i, rec }) => (
              <button
                key={rq.ref.id}
                onClick={() => onReview(i)}
                className="card w-full p-3.5 text-left transition hover:border-rose-500/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <SourceBadge q={rq.ref} />
                  <span className="badge bg-rose-500/20 text-rose-300">{rec ? '오답' : '미응답'}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-ink-200">{rq.ref.question}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
