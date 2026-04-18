import TagBar from '@/components/ui/TagBar'
import type { StoryDef } from './types'
import { useState } from 'react'

const TagBarRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [active, setActive] = useState('all')
  return (
    <TagBar
      activeKey={active}
      onChange={setActive}
      scrollable={values.scrollable}
      items={[
        { key: 'all', label: '全部' },
        { key: 'unused', label: '未對獎' },
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
    scrollable: { type: 'boolean', default: true },
  },
  Render: TagBarRender,
}
