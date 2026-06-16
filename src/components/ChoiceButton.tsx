interface Props {
  label: string
  index: number
  state: 'idle' | 'correct' | 'wrong' | 'muted'
  disabled: boolean
  onClick: () => void
}

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export default function ChoiceButton({ label, index, state, disabled, onClick }: Props) {
  const cls =
    state === 'correct'
      ? 'choice choice-correct'
      : state === 'wrong'
        ? 'choice choice-wrong'
        : state === 'muted'
          ? 'choice choice-muted'
          : 'choice'
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      <span
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-bold ${
          state === 'correct'
            ? 'bg-emerald-500 text-white'
            : state === 'wrong'
              ? 'bg-rose-500 text-white'
              : 'bg-ink-700 text-ink-200'
        }`}
      >
        {state === 'correct' ? '✓' : state === 'wrong' ? '✕' : LETTERS[index]}
      </span>
      <span className="flex-1 text-[15px] leading-snug">{label}</span>
    </button>
  )
}
