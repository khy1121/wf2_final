import type { RuntimeQuestion, ChapterId, WeekId } from '../types'
import { ALL_QUESTIONS, MCQ_QUESTIONS, SHORT_QUESTIONS, SPOTLIGHT_QUESTIONS, byChapter, byWeek, isMCQ, isShort } from '../data'
import { chapterById, weekByNum } from '../data/chapters'
import { toRuntime, sample, shuffle } from './quiz'

export interface SessionConfig {
  title: string
  subtitle?: string
  /** 풀이용 문제 목록 */
  runtime: RuntimeQuestion[]
  /** 단답형 입력 모드 포함 여부 (결과/UX 표시에 사용) */
  hasShortInput: boolean
}

/** 랜덤 시험 문항 수 (40~50 사이) */
function examCount(): number {
  return 40 + Math.floor(Math.random() * 11) // 40~50
}

export type SessionKind =
  | { kind: 'chapter'; id: ChapterId; asMcq: boolean }
  | { kind: 'week'; week: WeekId; asMcq: boolean }
  | { kind: 'all'; asMcq: boolean }
  | { kind: 'exam' }
  | { kind: 'quick' }
  | { kind: 'short-all'; asMcq: boolean }
  | { kind: 'short-quick'; asMcq: boolean }
  | { kind: 'spotlight' }

export function buildSession(spec: SessionKind): SessionConfig {
  switch (spec.kind) {
    case 'chapter': {
      const meta = chapterById(spec.id)
      const qs = shuffle(byChapter(spec.id))
      return {
        title: `${meta.no} ${meta.title}`,
        subtitle: spec.asMcq ? '챕터별 문제 · 주관식은 4지선다로 변환' : '챕터별 문제 (객관식 + 주관식)',
        runtime: toRuntime(qs, spec.asMcq),
        hasShortInput: !spec.asMcq && qs.some(isShort),
      }
    }
    case 'week': {
      const meta = weekByNum(spec.week)
      const qs = shuffle(byWeek(spec.week))
      return {
        title: `${meta.label} 시험문제`,
        subtitle: meta.note,
        runtime: toRuntime(qs, spec.asMcq),
        hasShortInput: !spec.asMcq && qs.some(isShort),
      }
    }
    case 'all': {
      const qs = shuffle(ALL_QUESTIONS)
      return {
        title: '전체 풀기',
        subtitle: `총 ${qs.length}문제 (객관식 + 주관식)`,
        runtime: toRuntime(qs, spec.asMcq),
        hasShortInput: !spec.asMcq && qs.some(isShort),
      }
    }
    case 'exam': {
      // 실전대비: 전 범위 골고루 40~50문제 랜덤 (주관식 포함, 입력형 유지)
      const n = examCount()
      const picked = sample(ALL_QUESTIONS, n)
      return {
        title: '실전 대비 모의고사',
        subtitle: `전 범위 랜덤 ${picked.length}문제 (객관식 + 주관식 단답)`,
        runtime: toRuntime(picked, false),
        hasShortInput: picked.some(isShort),
      }
    }
    case 'quick': {
      // 빠른 풀기: 랜덤 20문제, 주관식도 객관식으로 변환해 빠르게
      const picked = sample(ALL_QUESTIONS, 20)
      return {
        title: '빠른 풀기',
        subtitle: '랜덤 20문제 · 모두 4지선다',
        runtime: toRuntime(picked, true),
        hasShortInput: false,
      }
    }
    case 'short-all': {
      const qs = shuffle(SHORT_QUESTIONS)
      return {
        title: spec.asMcq ? '주관식 → 객관식 모아풀기' : '주관식 모아풀기',
        subtitle: `단답형 전체 ${qs.length}문제${spec.asMcq ? ' · 4지선다 변환' : ' · 직접 입력'}`,
        runtime: toRuntime(qs, spec.asMcq),
        hasShortInput: !spec.asMcq,
      }
    }
    case 'spotlight': {
      // 시험 콕집어: velog "꼭 나옴/예상문제" 강조 + 이미지 문제 (입력형 유지)
      const qs = shuffle(SPOTLIGHT_QUESTIONS)
      return {
        title: '🎯 시험 콕집어 예상문제',
        subtitle: `velog 강조 포인트 ${qs.length}문제 · 강의 캡처 이미지 포함`,
        runtime: toRuntime(qs, false),
        hasShortInput: qs.some(isShort),
      }
    }
    case 'short-quick': {
      const picked = sample(SHORT_QUESTIONS, 30)
      return {
        title: spec.asMcq ? '주관식 → 객관식 빠른풀기' : '주관식 빠른풀기',
        subtitle: `단답형 랜덤 ${picked.length}문제${spec.asMcq ? ' · 4지선다 변환' : ' · 직접 입력'}`,
        runtime: toRuntime(picked, spec.asMcq),
        hasShortInput: !spec.asMcq,
      }
    }
  }
}

export { isMCQ, isShort, MCQ_QUESTIONS, SHORT_QUESTIONS }
