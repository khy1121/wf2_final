import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SegmentToggle from '../components/SegmentToggle'
import { STATS } from '../data'

export default function ShortHub() {
  // 풀이 방식: 직접 입력(단답형) vs 객관식 변환
  const [mode, setMode] = useState<'short' | 'mcq'>('short')
  const q = mode === 'mcq' ? '?asMcq=1' : ''

  return (
    <div>
      <Header title="주관식 단답형" subtitle={`단답형 전체 ${STATS.short}문제`} />

      <div className="card mb-4 p-4">
        <div className="text-sm font-semibold">풀이 방식 선택</div>
        <p className="mb-3 text-xs text-ink-500">
          단답형을 직접 입력하거나, 4지선다 객관식으로 변환해서 풀 수 있어요.
        </p>
        <SegmentToggle
          value={mode}
          onChange={setMode}
          options={[
            { value: 'short', label: '✍️ 직접 입력' },
            { value: 'mcq', label: '🔘 객관식 변환' },
          ]}
        />
        <div className="mt-3 rounded-lg bg-ink-800/50 px-3 py-2 text-xs text-ink-400">
          {mode === 'short'
            ? '정답을 직접 타이핑합니다. 대소문자·공백은 무시되고, 한 글자라도 다르면 오답이에요.'
            : '정답 + 오답 보기를 섞어 4지선다로 출제합니다. 빠르게 점검하기 좋아요.'}
        </div>
      </div>

      <div className="space-y-2.5">
        <Link
          to={`/quiz/short-all${q}`}
          className="card flex items-center gap-4 p-4 transition active:scale-[0.98] hover:border-fuchsia-500/50"
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-2xl shadow-lg">
            📒
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold">주관식 모아풀기</h3>
            <p className="truncate text-sm text-ink-400">단답형 전체 {STATS.short}문제를 한 번에</p>
          </div>
          <span className="text-ink-600">›</span>
        </Link>

        <Link
          to={`/quiz/short-quick${q}`}
          className="card flex items-center gap-4 p-4 transition active:scale-[0.98] hover:border-fuchsia-500/50"
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-2xl shadow-lg">
            ⚡
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold">주관식 빠른풀기 30문제</h3>
            <p className="truncate text-sm text-ink-400">랜덤 30문제로 빠르게 점검</p>
          </div>
          <span className="text-ink-600">›</span>
        </Link>
      </div>

      <p className="mt-5 px-1 text-xs leading-relaxed text-ink-500">
        💡 시험 안내: 이번 시험은 단답형도 포함됩니다. 단답형은 대소문자는 무관하지만 스펠링/글자가 하나라도
        틀리면 오답으로 처리됩니다.
      </p>
    </div>
  )
}
