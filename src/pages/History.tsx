import { useState } from 'react'
import Header from '../components/Header'
import { loadResults, clearResults, type ResultRecord } from '../lib/storage'

function fmtDate(ts: number) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function History() {
  const [records, setRecords] = useState<ResultRecord[]>(() => loadResults())

  const clear = () => {
    if (confirm('모든 풀이 기록을 삭제할까요?')) {
      clearResults()
      setRecords([])
    }
  }

  return (
    <div>
      <Header
        title="내 풀이 기록"
        subtitle={`최근 ${records.length}회`}
        right={
          records.length > 0 ? (
            <button onClick={clear} className="btn-ghost px-3 py-1.5 text-xs">
              비우기
            </button>
          ) : undefined
        }
      />

      {records.length === 0 ? (
        <div className="card mt-6 p-8 text-center text-ink-400">
          <div className="text-4xl">📭</div>
          <p className="mt-3 text-sm">아직 풀이 기록이 없어요.</p>
          <p className="text-xs text-ink-500">퀴즈를 풀면 여기에 점수가 기록됩니다.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {records.map((r, i) => {
            const pct = Math.round((r.correct / r.total) * 100)
            return (
              <div key={i} className="card flex items-center gap-4 p-4">
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${
                    pct >= 75 ? 'bg-emerald-500/20 text-emerald-300' : pct >= 50 ? 'bg-sky-500/20 text-sky-300' : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {pct}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">{r.title}</h3>
                  <p className="text-xs text-ink-500">
                    {r.correct}/{r.total} 정답 · {fmtDate(r.date)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
