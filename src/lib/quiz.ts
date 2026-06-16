import type { Question, RuntimeQuestion, ShortQuestion } from '../types'
import { isMCQ } from '../data'

/** Fisher–Yates 셔플 (원본 불변) */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** 배열에서 n개 랜덤 추출 */
export function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, Math.min(n, arr.length))
}

/** 주관식을 4지선다 객관식으로 변환 */
export function shortToMCQ(q: ShortQuestion): RuntimeQuestion {
  const distractors = sample(q.distractors, 3)
  const options = shuffle([q.answer, ...distractors])
  // 보기가 4개가 안 되면 그대로(최소 2개)
  const answerIndex = options.indexOf(q.answer)
  return { ref: q, mode: 'mcq', choices: options, answerIndex }
}

/**
 * Question 배열을 풀이용 RuntimeQuestion 배열로 변환.
 * @param shortAsMCQ 주관식을 객관식(4지선다)으로 변환할지 여부
 */
export function toRuntime(questions: Question[], shortAsMCQ: boolean): RuntimeQuestion[] {
  return questions.map((q): RuntimeQuestion => {
    if (isMCQ(q)) {
      // 객관식: 보기 순서를 섞고 정답 인덱스 재계산
      const correct = q.choices[q.answer]
      const choices = shuffle(q.choices)
      return { ref: q, mode: 'mcq', choices, answerIndex: choices.indexOf(correct) }
    }
    // 주관식
    if (shortAsMCQ) return shortToMCQ(q)
    return { ref: q, mode: 'short', choices: [], answerIndex: -1 }
  })
}

/** 단답형 정답 비교 (대소문자/공백 무시) */
export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[.,;'"`]/g, '')
}

export function isShortCorrect(q: ShortQuestion, typed: string): boolean {
  const n = normalizeAnswer(typed)
  if (!n) return false
  const candidates = [q.answer, ...q.accepted].map(normalizeAnswer)
  return candidates.includes(n)
}
