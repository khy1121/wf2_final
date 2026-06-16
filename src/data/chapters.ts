import type { ChapterMeta, ChapterId, WeekId } from '../types'

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'rest-overview',
    week: 9,
    no: 'Ch.7-1',
    title: 'REST API 개론',
    subtitle: 'REST 개념 · HTTP Method · URI 설계 · Stateless · Caching',
    emoji: '🌐',
    accent: 'from-sky-500 to-blue-600',
  },
  {
    id: 'spring-rest',
    week: 9,
    no: 'Ch.7-2',
    title: 'Spring REST 구현',
    subtitle: '@RestController · @PathVariable · ResponseEntity · Jackson',
    emoji: '🧩',
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'unit-test',
    week: 10,
    no: 'Ch.7-3',
    title: 'Spring 단위 테스트',
    subtitle: 'JUnit 5 · Mockito · MockMvc · JsonPath · GWT',
    emoji: '🧪',
    accent: 'from-violet-500 to-purple-600',
  },
  {
    id: 'boot-overview',
    week: 11,
    no: 'Ch.8',
    title: 'Spring Boot 개요',
    subtitle: 'Auto Config · Starter · 내장서버 · Actuator · Virtual Thread',
    emoji: '🚀',
    accent: 'from-amber-500 to-orange-600',
  },
  {
    id: 'data-jpa',
    week: 12,
    no: 'Ch.9',
    title: 'Spring Data JPA',
    subtitle: 'Repository 계층 · Query Method · @Query · Paging',
    emoji: '🗄️',
    accent: 'from-rose-500 to-pink-600',
  },
  {
    id: 'security',
    week: 13,
    no: 'Ch.10',
    title: 'Spring Security',
    subtitle: 'Session 인증 · FilterChain · RBAC · BCrypt · CSRF',
    emoji: '🔐',
    accent: 'from-indigo-500 to-blue-700',
  },
  {
    id: 'logging',
    week: 14,
    no: 'Ch.11',
    title: 'Logging',
    subtitle: 'SLF4J · Logback · 로그레벨 · Appender · MDC',
    emoji: '📜',
    accent: 'from-cyan-500 to-sky-600',
  },
]

export const chapterById = (id: ChapterId): ChapterMeta =>
  CHAPTERS.find((c) => c.id === id)!

export interface WeekMeta {
  week: WeekId
  label: string
  chapters: ChapterId[]
  hasVelog: boolean
  note: string
}

export const WEEKS: WeekMeta[] = [
  { week: 9, label: '9주차', chapters: ['rest-overview', 'spring-rest'], hasVelog: false, note: 'REST API 개론 · Spring REST 구현' },
  { week: 10, label: '10주차', chapters: ['unit-test'], hasVelog: false, note: 'Spring REST 단위 테스트' },
  { week: 11, label: '11주차', chapters: ['boot-overview'], hasVelog: false, note: 'Spring Boot 개요' },
  { week: 12, label: '12주차', chapters: ['data-jpa'], hasVelog: true, note: 'Spring Data JPA (velog 정리)' },
  { week: 13, label: '13주차', chapters: ['security'], hasVelog: false, note: 'Spring Boot Security' },
  { week: 14, label: '14주차', chapters: ['logging'], hasVelog: true, note: 'Logging - SLF4J/Logback (velog 정리)' },
]

export const weekByNum = (w: WeekId): WeekMeta => WEEKS.find((x) => x.week === w)!
