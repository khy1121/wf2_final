import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SegmentToggle from '../components/SegmentToggle'
import { CHAPTERS } from '../data/chapters'
import { countByChapter } from '../data'

export default function ChapterList() {
  const [mode, setMode] = useState<'mixed' | 'mcq'>('mixed')
  const query = mode === 'mcq' ? '?asMcq=1' : ''

  return (
    <div>
      <Header title="챕터별 시험문제" subtitle="PPT 강의자료 기반 · 7개 챕터" />

      <div className="card mb-4 flex items-center justify-between gap-3 p-3.5">
        <div className="min-w-0">
          <div className="text-sm font-semibold">주관식 풀이 방식</div>
          <div className="text-xs text-ink-500">단답 입력 또는 4지선다 변환</div>
        </div>
        <SegmentToggle
          value={mode}
          onChange={setMode}
          size="sm"
          options={[
            { value: 'mixed', label: '단답 입력' },
            { value: 'mcq', label: '객관식 변환' },
          ]}
        />
      </div>

      <div className="space-y-2.5">
        {CHAPTERS.map((ch) => {
          const c = countByChapter(ch.id)
          return (
            <Link
              key={ch.id}
              to={`/quiz/chapter/${ch.id}${query}`}
              className="card flex items-center gap-4 p-4 transition active:scale-[0.98] hover:border-brand-500/50"
            >
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${ch.accent} text-2xl shadow-lg`}
              >
                {ch.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="badge bg-ink-800 text-ink-300">{ch.no}</span>
                  <h3 className="truncate font-bold">{ch.title}</h3>
                </div>
                <p className="truncate text-sm text-ink-400">{ch.subtitle}</p>
                <p className="mt-0.5 text-xs text-ink-500">
                  객관식 {c.mcq} · 주관식 {c.short} · 총 {c.total}문제
                </p>
              </div>
              <span className="text-ink-600">›</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
