import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { NOTES } from '../data/notes'

export default function NotesList() {
  return (
    <div>
      <Header title="수업 정리" subtitle="velog 정리 노트 모아보기" />

      <div className="space-y-2.5">
        {NOTES.map((n) =>
          n.available ? (
            <Link
              key={n.week}
              to={`/notes/${n.week}`}
              className="card flex items-center gap-4 p-4 transition active:scale-[0.98] hover:border-brand-500/50"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-sm font-extrabold text-white shadow-lg">
                {n.week}주
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-bold">{n.label} 정리</h3>
                  <span className="badge bg-teal-500/20 text-teal-200">velog</span>
                </div>
                <p className="truncate text-sm text-ink-400">{n.note}</p>
                <p className="mt-0.5 text-xs text-ink-500">
                  소제목 {n.headingCount} · 이미지 {n.imageCount}장
                </p>
              </div>
              <span className="text-ink-600">›</span>
            </Link>
          ) : (
            <div key={n.week} className="card flex items-center gap-4 p-4 opacity-55">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink-800 text-sm font-extrabold text-ink-400">
                {n.week}주
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-ink-300">{n.label} 정리</h3>
                <p className="truncate text-sm text-ink-500">{n.note}</p>
              </div>
              <span className="badge bg-ink-800 text-ink-500">준비 중</span>
            </div>
          ),
        )}
      </div>

      <p className="mt-5 px-1 text-xs leading-relaxed text-ink-500">
        ※ 9~14주차 수업 정리를 모아봤어요. 🎯 표시는 시험 강조 포인트입니다. 이미지는 탭하면 크게 보입니다.
        (12·14주차는 velog 원본 정리, 9·10·11·13주차는 강의자료 기반 정리)
      </p>
    </div>
  )
}
