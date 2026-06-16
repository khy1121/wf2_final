import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { WEEKS } from '../data/chapters'
import { countByWeek } from '../data'

export default function WeeklyList() {
  return (
    <div>
      <Header title="주차별 시험문제" subtitle="velog 정리 기반 · 9~14주차" />
      <div className="space-y-2.5">
        {WEEKS.map((w) => {
          const c = countByWeek(w.week)
          return (
            <Link
              key={w.week}
              to={`/quiz/week/${w.week}`}
              className="card flex items-center gap-4 p-4 transition active:scale-[0.98] hover:border-brand-500/50"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-sm font-extrabold text-white shadow-lg">
                {w.week}주
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-bold">{w.label}</h3>
                  {w.hasVelog && <span className="badge bg-teal-500/20 text-teal-200">velog</span>}
                </div>
                <p className="truncate text-sm text-ink-400">{w.note}</p>
                <p className="mt-0.5 text-xs text-ink-500">
                  객관식 {c.mcq} · 주관식 {c.short} · 총 {c.total}문제
                </p>
              </div>
              <span className="text-ink-600">›</span>
            </Link>
          )
        })}
      </div>
      <p className="mt-5 px-1 text-xs leading-relaxed text-ink-500">
        ※ 12주차(Spring Data JPA)와 14주차(Logging)는 velog 노트의 시험 강조 포인트를 반영했습니다.
      </p>
    </div>
  )
}
