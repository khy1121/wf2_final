import type { Question, MCQuestion, ShortQuestion, ChapterId, WeekId } from '../types'
import { restOverview } from './q-rest-overview'
import { springRest } from './q-spring-rest'
import { unitTest } from './q-unit-test'
import { bootOverview } from './q-boot-overview'
import { dataJpa } from './q-data-jpa'
import { security } from './q-security'
import { logging } from './q-logging'
import { spotlight } from './q-spotlight'

export const ALL_QUESTIONS: Question[] = [
  ...restOverview,
  ...springRest,
  ...unitTest,
  ...bootOverview,
  ...dataJpa,
  ...security,
  ...logging,
  ...spotlight,
]

export const isMCQ = (q: Question): q is MCQuestion => q.type === 'mcq'
export const isShort = (q: Question): q is ShortQuestion => q.type === 'short'

export const MCQ_QUESTIONS = ALL_QUESTIONS.filter(isMCQ)
export const SHORT_QUESTIONS = ALL_QUESTIONS.filter(isShort)
export const SPOTLIGHT_QUESTIONS = ALL_QUESTIONS.filter((q) => q.spotlight)

export const byChapter = (id: ChapterId): Question[] =>
  ALL_QUESTIONS.filter((q) => q.chapter === id)

export const byWeek = (w: WeekId): Question[] =>
  ALL_QUESTIONS.filter((q) => q.week === w)

export const countByChapter = (id: ChapterId) => {
  const list = byChapter(id)
  return { total: list.length, mcq: list.filter(isMCQ).length, short: list.filter(isShort).length }
}

export const countByWeek = (w: WeekId) => {
  const list = byWeek(w)
  return { total: list.length, mcq: list.filter(isMCQ).length, short: list.filter(isShort).length }
}

export const STATS = {
  total: ALL_QUESTIONS.length,
  mcq: MCQ_QUESTIONS.length,
  short: SHORT_QUESTIONS.length,
  spotlight: SPOTLIGHT_QUESTIONS.length,
}
