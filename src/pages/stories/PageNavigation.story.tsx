import PageNavigation from '@/components/ui/PageNavigation'
import type { StoryDef } from './types'
import { useState } from 'react'

// 發票期數：民國年、雙月一期（1-2 / 3-4 / … / 11-12 月），月份 1〜9 不補 0。
// 用一個絕對期數計數器表示：period = 民國年 * 6 + 期序（0=1-2 月）。
const LATEST = 115 * 6 + 3 // 115 年 7-8 月（最新一期）
const EARLIEST = LATEST - 12 // 往前可查兩年

function formatPeriod(period: number): string {
  const year = Math.floor(period / 6)
  const idx = period % 6
  const start = idx * 2 + 1
  const end = idx * 2 + 2
  return `${year} 年 ${start}-${end} 月`
}

const PageNavigationRender: React.FC<{ values: Record<string, any> }> = () => {
  const [period, setPeriod] = useState(LATEST)
  return (
    <PageNavigation
      label={formatPeriod(period)}
      prevAriaLabel="上一期"
      nextAriaLabel="下一期"
      onPrev={period > EARLIEST ? () => setPeriod((p) => p - 1) : undefined}
      onNext={period < LATEST ? () => setPeriod((p) => p + 1) : undefined}
    />
  )
}

export const PageNavigationStory: StoryDef = {
  component: PageNavigation,
  name: 'PageNavigation',
  category: 'Chrome',
  previewWidth: 360,
  props: {},
  Render: PageNavigationRender,
  codeProps: () => ({
    label: formatPeriod(LATEST),
    prevAriaLabel: '上一期',
    nextAriaLabel: '下一期',
  }),
}
