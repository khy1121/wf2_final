import { type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const EXAM_RE = /시험|나옴|외워|예상|무조건/

/**
 * velog는 한글에 붙은 __강조__ 표기를 많이 쓰는데, GFM은 언더스코어 강조의
 * intraword(단어 중간) 적용을 막기 때문에 한글 옆에서는 굵게 표시되지 않는다.
 * 코드펜스를 보호하면서 __강조__ → **강조** 로 보정한다.
 */
function preprocess(md: string): string {
  const parts = md.split(/(```[\s\S]*?```)/g)
  return parts
    .map((seg, i) => (i % 2 === 1 ? seg : seg.replace(/__([^_\n]+?)__/g, '**$1**')))
    .join('')
}

function textOf(children: ReactNode): string {
  if (children == null) return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(textOf).join('')
  // React element
  const el = children as { props?: { children?: ReactNode } }
  if (el.props?.children) return textOf(el.props.children)
  return ''
}

/** 시험 강조 콜아웃 */
function ExamCallout({ children }: { children: ReactNode }) {
  return (
    <div className="my-3 flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-3">
      <span className="mt-0.5 shrink-0 text-base">🎯</span>
      <div className="text-[15px] font-semibold leading-relaxed text-amber-100">{children}</div>
    </div>
  )
}

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) =>
            EXAM_RE.test(textOf(children)) ? (
              <ExamCallout>{children}</ExamCallout>
            ) : (
              <h2 className="mt-6 mb-2 border-l-4 border-brand-500 pl-3 text-xl font-extrabold leading-snug text-white">
                {children}
              </h2>
            ),
          h2: ({ children }) =>
            EXAM_RE.test(textOf(children)) ? (
              <ExamCallout>{children}</ExamCallout>
            ) : (
              <h3 className="mt-5 mb-2 text-lg font-bold leading-snug text-ink-50">{children}</h3>
            ),
          h3: ({ children }) =>
            EXAM_RE.test(textOf(children)) ? (
              <ExamCallout>{children}</ExamCallout>
            ) : (
              <h4 className="mt-4 mb-1.5 text-base font-semibold text-brand-200">{children}</h4>
            ),
          p: ({ children }) => (
            <p className="my-2.5 text-[15px] leading-relaxed text-ink-200">{children}</p>
          ),
          ul: ({ children }) => <ul className="my-2.5 list-disc space-y-1.5 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="my-2.5 list-decimal space-y-1.5 pl-5">{children}</ol>,
          li: ({ children }) => <li className="text-[15px] leading-relaxed text-ink-200">{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="text-brand-200">{children}</em>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noreferrer" className="text-brand-300 underline underline-offset-2">
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <a href={typeof src === 'string' ? src : undefined} target="_blank" rel="noreferrer" className="my-3 block overflow-hidden rounded-xl border border-ink-700 bg-white">
              <img src={typeof src === 'string' ? src : undefined} alt={alt || '강의 자료'} loading="lazy" className="w-full" />
            </a>
          ),
          code: ({ children, className }) => {
            const text = textOf(children)
            const isBlock = text.includes('\n') || (className || '').includes('language-')
            if (isBlock) {
              return <code className="font-mono text-[13px] leading-relaxed text-emerald-200">{children}</code>
            }
            return (
              <code className="mx-0.5 rounded-md bg-ink-800 px-1.5 py-0.5 font-mono text-[13px] text-brand-200">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto rounded-xl border border-ink-700 bg-ink-950 p-3.5">{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-4 border-ink-600 pl-3 text-ink-400">{children}</blockquote>
          ),
          hr: () => <hr className="my-5 border-ink-800" />,
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border border-ink-700 bg-ink-800 px-2 py-1.5 text-left">{children}</th>,
          td: ({ children }) => <td className="border border-ink-700 px-2 py-1.5">{children}</td>,
        }}
      >
        {preprocess(children)}
      </ReactMarkdown>
    </div>
  )
}
