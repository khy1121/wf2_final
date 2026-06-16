import type { WeekId } from '../types'
import { WEEKS } from './chapters'
import w9 from '../../velog/week9.md?raw'
import w10 from '../../velog/week10.md?raw'
import w11 from '../../velog/week11.md?raw'
import w12 from '../../velog/week12.md?raw'
import w13 from '../../velog/week13.md?raw'
import w14 from '../../velog/week14.md?raw'

const RAW: Record<WeekId, string> = { 9: w9, 10: w10, 11: w11, 12: w12, 13: w13, 14: w14 }

export interface Note {
  week: WeekId
  label: string
  note: string
  markdown: string
  available: boolean
  headingCount: number
  imageCount: number
}

function count(md: string, re: RegExp): number {
  return (md.match(re) || []).length
}

export const NOTES: Note[] = WEEKS.map((w) => {
  const md = (RAW[w.week] || '').trim()
  return {
    week: w.week,
    label: w.label,
    note: w.note,
    markdown: md,
    available: md.length > 0,
    headingCount: count(md, /^#{1,3}\s/gm),
    imageCount: count(md, /!\[[^\]]*\]\(/g),
  }
})

export const noteByWeek = (w: WeekId): Note | undefined => NOTES.find((n) => n.week === w)
