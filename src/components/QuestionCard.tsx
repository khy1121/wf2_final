import type { RuntimeQuestion, AnswerRecord } from '../types'
import { isShort } from '../data'
import ChoiceButton from './ChoiceButton'
import ShortAnswerInput from './ShortAnswerInput'
import SourceBadge from './SourceBadge'

interface Props {
  rq: RuntimeQuestion
  answered: AnswerRecord | null
  onAnswer: (rec: AnswerRecord) => void
}

export default function QuestionCard({ rq, answered, onAnswer }: Props) {
  const q = rq.ref
  const isAnswered = !!answered

  const handlePick = (i: number) => {
    if (isAnswered) return
    onAnswer({
      questionId: q.id,
      mode: 'mcq',
      picked: i,
      correct: i === rq.answerIndex,
    })
  }

  const handleShort = (typed: string, correct: boolean) => {
    onAnswer({ questionId: q.id, mode: 'short', typed, correct })
  }

  return (
    <div className="card animate-pop-in p-5">
      <div className="flex items-center justify-between gap-2">
        <SourceBadge q={q} />
        {q.spotlight && <span className="badge bg-amber-500/20 text-amber-200">🎯 시험강조</span>}
      </div>
      <h2 className="mt-3 whitespace-pre-line text-[17px] font-semibold leading-relaxed">{q.question}</h2>

      {q.image && (
        <a
          href={q.image}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block overflow-hidden rounded-xl border border-ink-700 bg-white"
          title="이미지를 새 탭에서 크게 보기"
        >
          <img src={q.image} alt="강의 자료 캡처" className="w-full" loading="lazy" />
        </a>
      )}

      <div className="mt-4">
        {rq.mode === 'mcq' ? (
          <div className="space-y-2.5">
            {rq.choices.map((c, i) => {
              let state: 'idle' | 'correct' | 'wrong' | 'muted' = 'idle'
              if (isAnswered) {
                if (i === rq.answerIndex) state = 'correct'
                else if (i === answered!.picked) state = 'wrong'
                else state = 'muted'
              }
              return (
                <ChoiceButton
                  key={i}
                  label={c}
                  index={i}
                  state={state}
                  disabled={isAnswered}
                  onClick={() => handlePick(i)}
                />
              )
            })}
          </div>
        ) : (
          isShort(q) && (
            <ShortAnswerInput
              q={q}
              answered={isAnswered}
              typed={answered?.typed}
              correct={answered?.correct}
              onSubmit={handleShort}
            />
          )
        )}
      </div>

      {isAnswered && (
        <div className="mt-4 animate-slide-up space-y-2">
          <div
            className={`text-sm font-bold ${answered!.correct ? 'text-emerald-400' : 'text-rose-400'}`}
          >
            {answered!.correct ? '정답입니다! 🎉' : '오답입니다 😢'}
          </div>
          {q.explanation && (
            <div className="rounded-xl border border-ink-700 bg-ink-800/40 px-4 py-3 text-sm leading-relaxed text-ink-300">
              <span className="font-semibold text-brand-300">해설 </span>
              {q.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
