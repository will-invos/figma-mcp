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

/** 控制項的值 → 實際傳給 Tabs 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  const baseItems = values.type === 'compact' ? COMPACT_ITEMS : FILL_ITEMS
  return {
    type: values.type,
    items: baseItems.map((it, i) => ({
      ...it,
      badge: i === 1 && values.badge === 'dot' ? 'dot' as const
           : i === 1 && values.badge === 'number' ? 1
           : undefined,
    })),
    activeKey: baseItems[0].key,
  }
}

const TabsRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const resolved = resolveProps(values)
  const [active, setActive] = useState(resolved.activeKey)

  return <Tabs {...resolved} activeKey={active} onChange={setActive} />
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
  codeProps: resolveProps,
}
