import TagBar from '@/components/ui/TagBar'
import type { StoryDef } from './types'
import { useState } from 'react'

const TagBarRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [active, setActive] = useState('all')
  const badgeOnSecond: 'dot' | number | undefined =
    values.badge === 'dot' ? 'dot' : values.badge === 'number' ? 1 : undefined
  return (
    <TagBar
      activeKey={active}
      onChange={setActive}
      scrollable={values.scrollable}
      items={[
        { key: 'all', label: '全部' },
        { key: 'unused', label: '未對獎', badge: badgeOnSecond },
        { key: 'won', label: '中獎' },
        { key: 'cashed', label: '已兌領' },
      ]}
    />
  )
}

export const TagBarStory: StoryDef = {
  component: TagBar,
  name: 'TagBar',
  category: 'Display',
  props: {
    badge:      { type: 'enum', options: ['none', 'dot', 'number'], default: 'none' },
    scrollable: { type: 'boolean', default: true },
  },
  Render: TagBarRender,
}
