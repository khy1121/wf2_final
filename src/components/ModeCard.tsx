import { Link } from 'react-router-dom'

interface Props {
  to: string
  emoji: string
  title: string
  desc: string
  accent?: string // tailwind gradient classes
  badge?: string
}

export default function ModeCard({ to, emoji, title, desc, accent = 'from-brand-500 to-brand-700', badge }: Props) {
  return (
    <Link
      to={to}
      className="card group relative flex items-center gap-4 overflow-hidden p-4 transition active:scale-[0.98] hover:border-brand-500/50"
    >
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${accent} text-2xl shadow-lg`}
      >
        {emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-bold">{title}</h3>
          {badge && <span className="badge bg-brand-500/20 text-brand-200">{badge}</span>}
        </div>
        <p className="truncate text-sm text-ink-400">{desc}</p>
      </div>
      <span className="text-ink-600 transition group-hover:translate-x-0.5 group-hover:text-ink-300">›</span>
    </Link>
  )
}
