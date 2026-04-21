import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import type { StoryDef } from './types'

const FILL_ITEMS = [
  { key: 'tab1', label: 'Tab' },
  { key: 'tab2', label: 'Tab' },
  { key: 'tab3', label: 'Tab' },
  { key: 'tab4', label: 'Tab' },
]

const COMPACT_ITEMS = [
  { key: 'tab1', label: 'Tab' },
  { key: 'tab2', label: 'Tab' },
  { key: 'tab3', label: 'Tab' },
  { key: 'tab4', label: 'Tab' },
  { key: 'tab5', label: 'Tab' },
  { key: 'tab6', label: 'Tab' },
  { key: 'tab7', label: 'Tab' },
]

const TabsRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const baseItems = values.type === 'compact' ? COMPACT_ITEMS : FILL_ITEMS
  const [active, setActive] = useState(baseItems[0].key)

  const items = baseItems.map((it, i) => ({
    ...it,
    badge: i === 1 && values.badge === 'dot' ? 'dot' as const
         : i === 1 && values.badge === 'number' ? 1
         : undefined,
  }))

  return (
    <Tabs
      type={values.type}
      items={items}
      activeKey={active}
      onChange={setActive}
    />
  )
}

export const TabsStory: StoryDef = {
  component: Tabs,
  name: 'Tabs',
  category: 'Chrome',
  previewWidth: 393,
  props: {
    type:  { type: 'enum', options: ['fill', 'compact'], default: 'fill' },
    badge: { type: 'enum', options: ['none', 'dot', 'number'], default: 'none' },
  },
  Render: TabsRender,
}
