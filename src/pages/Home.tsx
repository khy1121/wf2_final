import { Link } from 'react-router-dom'
import ModeCard from '../components/ModeCard'
import { STATS } from '../data'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2.5 mt-7 px-1 text-sm font-bold uppercase tracking-wide text-ink-400">{children}</h2>
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="card relative mt-2 overflow-hidden p-6">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative">
          <div className="badge bg-brand-500/20 text-brand-200">Spring Boot · 기말고사 대비</div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight">
            스프링 부트 <br />
            <span className="bg-gradient-to-r from-brand-400 to-sky-400 bg-clip-text text-transparent">
              퀴즈로 끝내기
            </span>
          </h1>
          <p className="mt-2 text-sm text-ink-400">velog 정리 · PPT 강의자료 기반 객관식 + 주관식 단답형</p>

          <div className="mt-4 flex gap-2">
            <div className="flex-1 rounded-xl bg-ink-800/60 px-3 py-2 text-center">
              <div className="text-lg font-bold text-brand-300">{STATS.total}</div>
              <div className="text-[11px] text-ink-500">전체 문항</div>
            </div>
            <div className="flex-1 rounded-xl bg-ink-800/60 px-3 py-2 text-center">
              <div className="text-lg font-bold text-emerald-300">{STATS.mcq}</div>
              <div className="text-[11px] text-ink-500">객관식</div>
            </div>
            <div className="flex-1 rounded-xl bg-ink-800/60 px-3 py-2 text-center">
              <div className="text-lg font-bold text-fuchsia-300">{STATS.short}</div>
              <div className="text-[11px] text-ink-500">주관식</div>
            </div>
          </div>
        </div>
      </section>

      <SectionTitle>시험 모드</SectionTitle>
      <div className="space-y-2.5">
        <ModeCard
          to="/quiz/spotlight"
          emoji="🎯"
          title="시험 콕집어 예상문제"
          desc={`velog "꼭 나옴/예상문제" 강조 ${STATS.spotlight}문제 · 이미지 포함`}
          accent="from-red-500 to-rose-600"
          badge="필수"
        />
        <ModeCard
          to="/quiz/exam"
          emoji="📝"
          title="실전 대비 모의고사"
          desc="전 범위 골고루 랜덤 40~50문제 (객관식+주관식)"
          accent="from-rose-500 to-orange-500"
          badge="추천"
        />
        <ModeCard
          to="/quiz/quick"
          emoji="⚡"
          title="빠른 풀기"
          desc="랜덤 20문제 · 모두 4지선다로 가볍게"
          accent="from-amber-400 to-yellow-500"
        />
        <ModeCard
          to="/quiz/all"
          emoji="📚"
          title="전체 풀기"
          desc={`${STATS.total}문제 전부 순서대로`}
          accent="from-emerald-500 to-teal-600"
        />
      </div>

      <SectionTitle>범위별 학습</SectionTitle>
      <div className="space-y-2.5">
        <ModeCard
          to="/notes"
          emoji="📒"
          title="수업 정리 보기"
          desc="velog 정리 노트 · 이미지 포함 (12·14주차)"
          accent="from-teal-500 to-emerald-600"
        />
        <ModeCard
          to="/weekly"
          emoji="🗓️"
          title="주차별 시험문제"
          desc="velog 기반 · 9~14주차"
          accent="from-sky-500 to-blue-600"
        />
        <ModeCard
          to="/chapters"
          emoji="📖"
          title="챕터별 시험문제"
          desc="PPT 기반 · 7개 챕터"
          accent="from-violet-500 to-purple-600"
        />
      </div>

      <SectionTitle>주관식 단답형</SectionTitle>
      <div className="space-y-2.5">
        <ModeCard
          to="/short"
          emoji="✍️"
          title="주관식 전용 풀기"
          desc="모아풀기 · 빠른풀기 30 · 객관식 변환"
          accent="from-fuchsia-500 to-pink-600"
        />
      </div>

      <div className="mt-7 flex items-center justify-between px-1">
        <Link to="/history" className="text-sm font-semibold text-ink-400 hover:text-ink-200">
          📊 내 풀이 기록 보기 ›
        </Link>
        <span className="text-xs text-ink-600">PWA 설치 가능</span>
      </div>
    </div>
  )
}
