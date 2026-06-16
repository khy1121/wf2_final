interface Option<T extends string> {
  value: T
  label: string
}

interface Props<T extends string> {
  value: T
  options: Option<T>[]
  onChange: (v: T) => void
  size?: 'sm' | 'md'
}

export default function SegmentToggle<T extends string>({ value, options, onChange, size = 'md' }: Props<T>) {
  return (
    <div className="inline-flex rounded-xl border border-ink-700 bg-ink-800/60 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`whitespace-nowrap rounded-lg font-semibold transition ${size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'} ${
            value === o.value ? 'bg-brand-500 text-white shadow' : 'text-ink-300 hover:text-ink-100'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
