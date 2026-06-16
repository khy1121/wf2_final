import { useMemo, useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import type { AnswerRecord, ChapterId, WeekId } from '../types'
import { buildSession, type SessionKind } from '../lib/sessions'
import { saveResult } from '../lib/storage'
import Header from '../components/Header'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import ResultView from '../components/ResultView'

function resolveSpec(kind: string, param: string | undefined, asMcq: boolean): SessionKind | null {
  switch (kind) {
    case 'chapter':
      return param ? { kind: 'chapter', id: param as ChapterId, asMcq } : null
    case 'week':
      return param ? { kind: 'week', week: Number(param) as WeekId, asMcq } : null
    case 'all':
      return { kind: 'all', asMcq }
    case 'exam':
      return { kind: 'exam' }
    case 'spotlight':
      return { kind: 'spotlight' }
    case 'quick':
      return { kind: 'quick' }
    case 'short-all':
      return { kind: 'short-all', asMcq }
    case 'short-quick':
      return { kind: 'short-quick', asMcq }
    default:
      return null
  }
}

export default function Quiz() {
  const { kind = '', param } = useParams()
  const [sp] = useSearchParams()
  const navigate = useNavigate()
  const asMcq = sp.get('asMcq') === '1'
  const sessionKey = `${kind}:${param ?? ''}:${asMcq ? 'mcq' : 'mixed'}`

  // 세션은 한 번만 생성 (랜덤 고정)
  const session = useMemo(() => {
    const spec = resolveSpec(kind, param, asMcq)
    return spec ? buildSession(spec) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, param, asMcq])

  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({})
  const [finished, setFinished] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [idx, finished])

  if (!session) {
    return (
      <div>
        <Header title="잘못된 경로" />
        <p className="text-ink-400">존재하지 않는 퀴즈입니다.</p>
      </div>
    )
  }

  const { runtime, title, subtitle } = session
  if (runtime.length === 0) {
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="card p-6 text-center text-ink-400">아직 문제가 없습니다.</div>
      </div>
    )
  }

  const total = runtime.length
  const current = runtime[idx]
  const currentAnswer = answers[current.ref.id] ?? null
  const correctCount = Object.values(answers).filter((a) => a.correct).length

  const handleAnswer = (rec: AnswerRecord) => {
    setAnswers((prev) => ({ ...prev, [rec.questionId]: rec }))
  }

  const goNext = () => {
    if (idx + 1 >= total) {
      setFinished(true)
      if (!saved) {
        saveResult({ key: sessionKey, title, total, correct: correctCountAfter(), date: Date.now() })
        setSaved(true)
      }
    } else {
      setIdx((i) => i + 1)
    }
  }

  // 마지막 답변까지 반영된 정답 수 계산
  function correctCountAfter() {
    return Object.values(answers).filter((a) => a.correct).length
  }

  const restart = () => {
    setAnswers({})
    setIdx(0)
    setFinished(false)
    setSaved(false)
    // 같은 경로로 다시 들어가 새 랜덤 세션 생성
    navigate(0)
  }

  if (finished) {
    return (
      <ResultView
        title={title}
        runtime={runtime}
        answers={answers}
        onRestart={restart}
        onReview={(i) => {
          setFinished(false)
          setIdx(i)
        }}
      />
    )
  }

  return (
    <div>
      <Header title={title} subtitle={subtitle} />
      <ProgressBar current={idx + 1} total={total} correct={correctCount} />

      <QuestionCard rq={current} answered={currentAnswer} onAnswer={handleAnswer} />

      <div className="mt-5 flex gap-2">
        {idx > 0 && (
          <button onClick={() => setIdx((i) => i - 1)} className="btn-ghost px-5 py-3">
            이전
          </button>
        )}
        <button
          onClick={goNext}
          disabled={!currentAnswer}
          className="btn-primary flex-1 py-3 text-base"
        >
          {idx + 1 >= total ? '결과 보기' : '다음 문제'}
        </button>
      </div>

      {!currentAnswer && (
        <p className="mt-3 text-center text-xs text-ink-500">먼저 답을 선택/입력하면 다음으로 넘어갈 수 있어요</p>
      )}
    </div>
  )
}
