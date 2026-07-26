import ChipBar from '@/components/ui/ChipBar'
import type { StoryDef } from './types'
import { useState } from 'react'

/** 控制項的值 → 實際傳給 ChipBar 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  const badgeOnSecond: 'dot' | number | undefined =
    values.badge === 'dot' ? 'dot' : values.badge === 'number' ? 1 : undefined
  return {
    activeKey: 'all',
    scrollable: values.scrollable,
    items: [
      { key: 'all', label: '全部' },
      { key: 'unused', label: '未對獎', badge: badgeOnSecond },
      { key: 'won', label: '中獎' },
      { key: 'cashed', label: '已兌領' },
    ],
  }
}

const ChipBarRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [active, setActive] = useState('all')
  return <ChipBar {...resolveProps(values)} activeKey={active} onChange={setActive} />
}

export const ChipBarStory: StoryDef = {
  component: ChipBar,
  name: 'ChipBar',
  category: 'Display',
  props: {
    badge:      { type: 'enum', options: ['none', 'dot', 'number'], default: 'none' },
    scrollable: { type: 'boolean', default: true },
  },
  Render: ChipBarRender,
  codeProps: resolveProps,
}
