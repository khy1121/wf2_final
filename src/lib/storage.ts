// 최근 풀이 기록 / 누적 통계 (localStorage)

export interface ResultRecord {
  key: string // 세션 종류 식별
  title: string
  total: number
  correct: number
  date: number
}

const RESULTS_KEY = 'spring-quiz:results'
const MAX_RECORDS = 30

export function loadResults(): ResultRecord[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ResultRecord[]
  } catch {
    return []
  }
}

export function saveResult(rec: ResultRecord): void {
  try {
    const list = [rec, ...loadResults()].slice(0, MAX_RECORDS)
    localStorage.setItem(RESULTS_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

export function clearResults(): void {
  try {
    localStorage.removeItem(RESULTS_KEY)
  } catch {
    /* ignore */
  }
}

export function bestScore(key: string): ResultRecord | null {
  const list = loadResults().filter((r) => r.key === key)
  if (!list.length) return null
  return list.reduce((best, r) =>
    r.correct / r.total > best.correct / best.total ? r : best,
  )
}
