interface Props {
  current: number // 1-based
  total: number
  correct: number
}

export default function ProgressBar({ current, total, correct }: Props) {
  const pct = Math.round(((current - 1) / total) * 100)
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-ink-400">
        <span>
          <b className="text-ink-100">{current}</b> / {total}
        </span>
        <span className="text-emerald-400">정답 {correct}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
