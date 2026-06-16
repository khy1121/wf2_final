import type { Question } from '../types'

/**
 * 🎯 시험 콕집어 — velog 노트에서 "시험에 무조건 나옴 / 예상 문제 / 반드시 외워라"로
 * 강조된 부분만 따로 모은 세트. 강의 캡처 이미지를 함께 보여주는 이미지 문제 포함.
 */
export const spotlight: Question[] = [
  // ===== 이미지 문제 (velog 강조 캡처) =====
  {
    id: 'sp-img-1', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-levels.png',
    question: '[로그 레벨 표 · 반드시 외워라] 위 표에서 Spring Boot의 기본값(★)으로 표시된 레벨은?',
    choices: ['TRACE', 'DEBUG', 'INFO', 'WARN'],
    answer: 2,
    explanation: 'INFO가 "정상 동작 정보 ★ 기본값" — Spring Boot 기본 레벨이자 운영 환경의 일반적 기본값.',
  },
  {
    id: 'sp-img-2', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-levels.png',
    question: '[로그 레벨 표] 표에서 "운영 환경에서 활성화 금지 / 개발 중에만 사용"으로 설명된 가장 낮은 레벨은?',
    choices: ['TRACE', 'INFO', 'WARN', 'ERROR'],
    answer: 0,
    explanation: 'TRACE(가장 세밀한 추적)는 운영 환경에서 활성화 금지. DEBUG도 운영에선 OFF.',
  },
  {
    id: 'sp-img-3', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-output-table.png',
    question: '[출력 가능 여부 표 · 시험 예상] Logger 유효 레벨(q)=INFO 일 때, 다음 중 출력되지 않는(NO) 로그 요청은?',
    choices: [
      'logger.debug("hi")',
      'logger.info("hi")',
      'logger.warn("hi")',
      'logger.error("hi")',
    ],
    answer: 0,
    explanation: '표에서 p=DEBUG, q=INFO 칸은 NO. 요청 레벨 < 유효 레벨이면 출력 안 됨 (DEBUG < INFO).',
  },
  {
    id: 'sp-img-4', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-output-table.png',
    question: '[출력 가능 여부 표] 이 표가 나타내는 로그 출력 핵심 규칙은? (p=요청 레벨, q=유효 레벨)',
    choices: [
      'p < q 이면 출력',
      'p >= q 이면 출력 (YES)',
      '항상 출력',
      'q = OFF 이면 무조건 출력',
    ],
    answer: 1,
    explanation: '로그 요청 레벨(p) >= Logger 유효 레벨(q) → YES(출력). q=OFF면 모두 NO.',
  },
  {
    id: 'sp-img-5', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-hierarchy.png',
    question: '[레벨 상속 · 무조건 시험에 나옴] 표에서 X는 INFO, X.Y는 레벨 지정이 없을 때 X.Y의 "유효 레벨"은?',
    choices: ['DEBUG', 'INFO (상속)', 'ERROR', '없음(출력 안 됨)'],
    answer: 1,
    explanation: 'X.Y는 지정 레벨이 없으므로 가장 가까운 조상 X의 INFO를 상속 → 유효 레벨 INFO.',
  },
  {
    id: 'sp-img-6', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-hierarchy.png',
    question: '[레벨 상속] "유효 레벨(effective level)"의 정의로 옳은 것은?',
    choices: [
      '항상 root의 레벨',
      '자신에게 지정된 레벨이 있으면 그 레벨, 없으면 가장 가까운 조상의 레벨',
      '항상 가장 낮은 TRACE',
      '자식 로거의 레벨',
    ],
    answer: 1,
    explanation: '유효 레벨 = 지정 레벨이 있으면 그 값, 없으면 가장 가까운 조상의 레벨. root는 항상 레벨을 가진다.',
  },
  {
    id: 'sp-img-7', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-additivity.png',
    question: '[Appender Additivity 표 · 시험에 나옴] additivity=true인 x.y.z(자신 Appender A-xyz1)의 실제 출력 목적지는?',
    choices: [
      'A-xyz1만',
      'A1, A-x1, A-x2, A-xyz1 (자신 + 상위 x + root 모두)',
      'A1만',
      '출력되지 않음',
    ],
    answer: 1,
    explanation: 'additivity=true면 자신 + 상위(조상) 로거의 Appender에도 전달 → A1(root)+A-x1,A-x2(x)+A-xyz1(자신).',
  },
  {
    id: 'sp-img-8', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    image: '/exam-images/log-additivity.png',
    question: '[Appender Additivity 표] additivity=false인 security(Appender A-sec)의 실제 출력 목적지는?',
    choices: [
      'A1, A-sec',
      'A-sec만 (부모 Appender로 전달 안 됨)',
      'A1만',
      '모든 Appender',
    ],
    answer: 1,
    explanation: 'additivity=false면 부모 Appender로 전달되지 않아 자신의 A-sec에만 출력 → 중복 로그 방지.',
  },
  {
    id: 'sp-img-9', type: 'mcq', chapter: 'data-jpa', week: 12, source: 'velog', spotlight: true,
    image: '/exam-images/jpa-query-keywords.png',
    question: '[쿼리 메서드 키워드 표 · 예상문제] 표에서 findByFirstnameStartingWith 가 생성하는 JPQL like 조건은?',
    choices: [
      "like '%?1'  (?1로 끝)",
      "like '?1%'  (?1로 시작)",
      "like '%?1%'  (?1 포함)",
      '= ?1  (정확히 일치)',
    ],
    answer: 1,
    explanation: "StartingWith → like '?1%' (예: 한성*). EndingWith는 '%?1', Containing은 '%?1%'.",
  },
  {
    id: 'sp-img-10', type: 'mcq', chapter: 'data-jpa', week: 12, source: 'velog', spotlight: true,
    image: '/exam-images/jpa-query-keywords.png',
    question: '[쿼리 메서드 키워드 표] findByAgeOrderByLastnameDesc 가 생성하는 조건으로 옳은 것은?',
    choices: [
      'where x.age=?1 order by x.lastname desc',
      'where x.age > ?1',
      'where x.lastname <> ?1',
      'where x.age in ?1',
    ],
    answer: 0,
    explanation: 'OrderBy + 필드 + Desc → order by x.lastname desc 가 붙는다.',
  },
  {
    id: 'sp-img-11', type: 'short', chapter: 'data-jpa', week: 12, source: 'velog', spotlight: true,
    image: '/exam-images/jpa-query-usage.png',
    question: '[예상 시험 문제 · 작명] "제목(title) 또는 내용(content)에 특정 단어가 포함된 글 목록"을 조회하는 쿼리 메서드를 작명하시오.',
    answer: 'findByTitleContainingOrContentContaining',
    accepted: ['findbytitlecontainingorcontentcontaining'],
    distractors: [
      'findByTitleOrContentContaining',
      'findByTitleContainingAndContentContaining',
      'findByTitleAndContent',
    ],
    explanation: 'title 또는 content 각각 Containing → findByTitleContainingOrContentContaining. (한 글자라도 틀리면 오답, 대소문자 무시)',
  },

  // ===== 시험 강조 문구 모음 (텍스트) =====
  {
    id: 'sp-t1', type: 'short', chapter: 'data-jpa', week: 12, source: 'velog', spotlight: true,
    question: '[예상 시험 문제] "나이(age)가 특정 값보다 큰 회원"을 조회하는 쿼리 메서드를 작명하시오. (단일 조건)',
    answer: 'findByAgeGreaterThan',
    accepted: ['findbyagegreaterthan', 'getbyagegreaterthan'],
    distractors: ['findByAgeGreaterThanEqual', 'findByAgeLessThan', 'findByAgeAfter'],
    explanation: 'GreaterThan → where x.age > ?1. 이상이면 GreaterThanEqual(>=).',
  },
  {
    id: 'sp-t2', type: 'short', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    question: '[반드시 외워라] 로그 레벨을 낮은 것부터 높은 순서로 쓰시오. (예: A < B < C < D < E)',
    answer: 'TRACE < DEBUG < INFO < WARN < ERROR',
    accepted: [
      'trace<debug<info<warn<error',
      'trace debug info warn error',
      'trace,debug,info,warn,error',
    ],
    distractors: [
      'ERROR < WARN < INFO < DEBUG < TRACE',
      'DEBUG < TRACE < INFO < WARN < ERROR',
      'INFO < DEBUG < TRACE < WARN < ERROR',
    ],
    explanation: '가장 낮은 게 TRACE, 가장 높은 게 ERROR.',
  },
  {
    id: 'sp-t3', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    question: '[강조] velog 정리 기준, Spring Boot에서 사용하는 로깅 조합은?',
    choices: [
      'SLF4J(API) + Logback',
      'Log4J(API) + SLF4J',
      'java.util.logging 단독',
      'Log4Shell + Log4J',
    ],
    answer: 0,
    explanation: 'Spring Boot에서는 SLF4J(인터페이스/API)와 Logback(구현)을 사용한다.',
  },
  {
    id: 'sp-t4', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    question: '[강조 · 어펜더 표] "그냥 사용하면 파일이 계속 누적되므로, 최대 보관 일수/날짜별 파일 전환에 사용"하는 Appender는?',
    choices: ['ConsoleAppender', 'FileAppender', 'RollingFileAppender', 'SMTPAppender'],
    answer: 2,
    explanation: 'RollingFileAppender(TimeBasedRollingPolicy)로 0시 0분에 날짜가 바뀌면 새 파일 생성, maxHistory로 보관일수 관리.',
  },
  {
    id: 'sp-t5', type: 'mcq', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    question: '[실전 예제 강조] 콘솔/데일리파일 두 Appender 사용 시 additivity="false"로 설정하는 이유는?',
    choices: [
      '로그를 완전히 끄기 위해',
      '콘솔에 로그가 두 번 찍히는 중복 출력을 방지하기 위해',
      '파일 크기를 늘리기 위해',
      '레벨을 ERROR로 고정하기 위해',
    ],
    answer: 1,
    explanation: 'additivity=false면 상위(root) Appender로 전달되지 않아 콘솔 중복 출력을 막는다.',
  },
  {
    id: 'sp-t6', type: 'mcq', chapter: 'data-jpa', week: 12, source: 'velog', spotlight: true,
    question: '[강조] velog 결론 — 무엇만 하면 Spring이 알아서 DAO를 다 만들어 주는가?',
    choices: [
      'Repository 인터페이스 선언 + (필요 시) 쿼리 메서드 / @Query',
      'EntityManager로 CRUD를 직접 구현',
      'JDBC 커넥션을 직접 관리',
      'SQL 매퍼 XML을 모두 작성',
    ],
    answer: 0,
    explanation: 'Repository 계층(3,4)과 쿼리 메서드/@Query(6)만 선언하면 Spring이 DAO 구현체를 자동 생성한다.',
  },
  {
    id: 'sp-t7', type: 'short', chapter: 'logging', week: 14, source: 'velog', spotlight: true,
    question: '[강조] root logger에 일반적으로 지정하는 기본 레벨은? (영문)',
    answer: 'INFO', accepted: ['info'],
    distractors: ['DEBUG', 'TRACE', 'WARN'],
    explanation: 'root에는 일반적으로 INFO 레벨을 지정한다.',
  },
]
