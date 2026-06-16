// 공통 타입 정의

export type ChapterId =
  | 'rest-overview'
  | 'spring-rest'
  | 'unit-test'
  | 'boot-overview'
  | 'data-jpa'
  | 'security'
  | 'logging'

export type WeekId = 9 | 10 | 11 | 12 | 13 | 14

export type QuestionSource = 'velog' | 'ppt'

interface QuestionBase {
  id: string
  chapter: ChapterId
  week: WeekId
  source: QuestionSource
  question: string
  explanation?: string
  /** 문제에 함께 표시할 이미지 경로 (예: /exam-images/log-levels.png) */
  image?: string
  /** velog의 "시험에 꼭 나옴 / 예상문제" 강조 표시에서 뽑은 문제 */
  spotlight?: boolean
}

/** 객관식 (4지선다) */
export interface MCQuestion extends QuestionBase {
  type: 'mcq'
  choices: string[] // 항상 4개
  answer: number // 정답 인덱스 (0~3)
}

/** 주관식 단답형 */
export interface ShortQuestion extends QuestionBase {
  type: 'short'
  answer: string // 대표 정답
  accepted: string[] // 정답으로 인정되는 표기들 (소문자/공백 무시 비교)
  distractors: string[] // 객관식 변환용 오답 보기 (3개 이상)
}

export type Question = MCQuestion | ShortQuestion

/** 풀이 중 사용하는 정규화된 문제 (주관식을 객관식으로 변환했을 때 포함) */
export interface RuntimeQuestion {
  ref: Question
  /** 'mcq' = 4지선다로 풀기, 'short' = 단답 입력으로 풀기 */
  mode: 'mcq' | 'short'
  /** mode가 mcq일 때 화면에 보여줄 4개 보기 */
  choices: string[]
  /** mcq일 때 정답 인덱스 */
  answerIndex: number
}

export interface AnswerRecord {
  questionId: string
  mode: 'mcq' | 'short'
  correct: boolean
  /** 사용자가 고른 보기 인덱스 (mcq) */
  picked?: number
  /** 사용자가 입력한 텍스트 (short) */
  typed?: string
}

export interface ChapterMeta {
  id: ChapterId
  week: WeekId
  no: string // 챕터 번호 표기 (예: "Ch.9")
  title: string
  subtitle: string
  emoji: string
  accent: string // tailwind gradient classes
}
