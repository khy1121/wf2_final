import { useState } from 'react'
import type { ShortQuestion } from '../types'
import { isShortCorrect } from '../lib/quiz'

interface Props {
  q: ShortQuestion
  answered: boolean
  typed?: string
  correct?: boolean
  onSubmit: (typed: string, correct: boolean) => void
}

export default function ShortAnswerInput({ q, answered, typed, correct, onSubmit }: Props) {
  const [value, setValue] = useState('')

  const submit = (giveUp = false) => {
    if (answered) return
    const text = giveUp ? '' : value
    onSubmit(text, giveUp ? false : isShortCorrect(q, text))
  }

  if (answered) {
    return (
      <div className="space-y-3">
        <div
          className={`rounded-xl border px-4 py-3 ${
            correct ? 'border-emerald-500 bg-emerald-500/10' : 'border-rose-500 bg-rose-500/10'
          }`}
        >
          <div className="text-xs font-semibold text-ink-400">내 답안</div>
          <div className={`font-mono text-[15px] ${correct ? 'text-emerald-200' : 'text-rose-200 line-through'}`}>
            {typed?.trim() || '(미입력)'}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-600/40 bg-emerald-500/5 px-4 py-3">
          <div className="text-xs font-semibold text-emerald-400">정답</div>
          <div className="font-mono text-[15px] font-bold text-emerald-100">{q.answer}</div>
          {q.accepted.length > 0 && (
            <div className="mt-1 text-xs text-ink-400">인정: {[q.answer, ...q.accepted].join(' / ')}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && value.trim() && submit()}
        placeholder="정답을 입력하세요 (대소문자 무시)"
        className="w-full rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3 text-[16px] outline-none transition focus:border-brand-500"
      />
      <div className="flex gap-2">
        <button onClick={() => submit()} disabled={!value.trim()} className="btn-primary flex-1 py-3">
          제출
        </button>
        <button onClick={() => submit(true)} className="btn-ghost px-4 py-3">
          모르겠음
        </button>
      </div>
    </div>
  )
}
