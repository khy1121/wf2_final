import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  subtitle?: string
  /** 뒤로가기 버튼 표시 (없으면 홈 링크) */
  back?: boolean
  right?: React.ReactNode
}

export default function Header({ title, subtitle, back = true, right }: Props) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 -mx-4 mb-4 bg-ink-950/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
      <div className="flex items-center gap-3">
        {back && (
          <button
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
            className="btn-ghost h-9 w-9 shrink-0 !rounded-full !p-0 text-lg"
          >
            ‹
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold leading-tight">{title}</h1>
          {subtitle && <p className="truncate text-xs text-ink-400">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  )
}
