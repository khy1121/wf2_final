# Spring Boot 기말 퀴즈 🎯

velog 정리 노트와 PPT 강의자료를 기반으로 만든 **Spring Boot 기말고사 대비 퀴즈 사이트**입니다.
React + TypeScript + Tailwind(SCSS) + PWA로 제작했으며, 아이폰 15 Pro 등 모바일과 데스크탑 모두 가독성 좋게 동작합니다.

## ✨ 기능

### 시험 모드
- **🎯 시험 콕집어 예상문제** — velog 노트에서 *"시험에 무조건 나옴 / 예상 문제 / 반드시 외워라"* 로 강조된 부분만 모은 세트. **velog에 첨부된 강의 캡처 이미지를 그대로 가져와 이미지 문제로 출제** (로그레벨 표, 레벨 상속표, 출력 가능여부 표, Appender additivity 표, 쿼리 메서드 키워드 표 등)
- **실전 대비 모의고사** — 전 범위 골고루 랜덤 40~50문제 (객관식 + 주관식 단답)
- **빠른 풀기** — 랜덤 20문제, 주관식도 4지선다로 변환
- **전체 풀기** — 전 문항 순서대로

### 범위별 학습
- **주차별 시험문제** — velog 기반 9~14주차 (12주차 JPA · 14주차 Logging은 velog 시험 강조 포인트 반영)
- **챕터별 시험문제** — PPT 기반 7개 챕터

### 주관식 단답형 전용
- **주관식 모아풀기** — 단답형 전체를 한 번에
- **주관식 빠른풀기 30문제** — 랜덤 30문제
- **객관식 변환** — 주관식 문제를 정답 + 오답 보기로 섞어 4지선다로 풀이 가능
- 단답 채점: 대소문자/공백 무시, 한 글자라도 다르면 오답

### 그 외
- 객관식 4지선다 (보기 자동 셔플), 즉시 정·오답 + 해설 표시
- 결과 화면: 점수/등급/오답 다시보기
- 풀이 기록 저장 (localStorage)
- **PWA 설치 지원** (오프라인 캐시, 홈 화면 추가)

> 시험 강조 이미지는 `public/exam-images/` 에 로컬 저장되어 PWA 오프라인에서도 보입니다.
> (velog CDN에서 내려받아 번들에 포함 — 외부 네트워크 없이 동작)

## 📚 문제 범위 (총 204문항: 객관식 154 · 주관식 50 · 그중 시험강조 18)

| 챕터 | 주차 | 출처 |
|---|---|---|
| Ch.7-1 REST API 개론 | 9주차 | PPT |
| Ch.7-2 Spring REST 구현 | 9주차 | PPT |
| Ch.7-3 Spring 단위 테스트 | 10주차 | PPT |
| Ch.8 Spring Boot 개요 | 11주차 | PPT |
| Ch.9 Spring Data JPA | 12주차 | velog + PPT |
| Ch.10 Spring Security | 13주차 | PPT |
| Ch.11 Logging (SLF4J/Logback) | 14주차 | velog + PPT |

## 🚀 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

## 🛠 기술 스택
- **React 18 + TypeScript**
- **Vite 5**
- **Tailwind CSS 3** (+ SCSS 글로벌 스타일/컴포넌트 레이어)
- **react-router-dom 6** (페이지 단위 라우팅)
- **vite-plugin-pwa** (Service Worker · manifest · 설치형)

## 📁 구조
```
src/
├─ components/   # 재사용 컴포넌트 (Header, ModeCard, QuestionCard, ChoiceButton,
│                #   ShortAnswerInput, ProgressBar, ResultView, SegmentToggle ...)
├─ pages/        # Home, WeeklyList, ChapterList, ShortHub, Quiz, History
├─ data/         # 챕터 메타 + 챕터별 문제 은행(q-*.ts) + 집계(index.ts)
├─ lib/          # quiz(셔플·변환·채점), sessions(모드 빌더), storage(기록)
├─ styles/       # index.scss (Tailwind + 디자인 토큰)
└─ types.ts
```

## 📱 반응형 / PWA
- 모바일 우선 설계 + iOS 안전영역(노치/홈 인디케이터) 대응
- 데스크탑에서는 중앙 정렬 컬럼으로 읽기 좋은 폭 유지
- `manifest.webmanifest` + 아이콘(192/512/maskable/apple-touch) 포함 → 브라우저 "홈 화면에 추가"로 설치
