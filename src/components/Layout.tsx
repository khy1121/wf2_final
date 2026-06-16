import type { ReactNode } from 'react'

/**
 * 모바일(아이폰 15 Pro ~430px) 우선 + 데스크탑 가독성.
 * 본문은 중앙 정렬된 컬럼으로, 데스크탑에서도 한 손에 읽기 좋은 폭을 유지한다.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full w-full flex justify-center">
      <main className="w-full max-w-xl px-4 pb-28 pt-3 sm:px-6">{children}</main>
    </div>
  )
}
