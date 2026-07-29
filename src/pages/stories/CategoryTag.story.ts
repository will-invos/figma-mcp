import React from 'react'
import CategoryTag from '@/components/ui/CategoryTag'
import type { CategoryTagCategory } from '@/components/ui/CategoryTag'
import type { StoryDef } from './types'

const CONSUMPTION: CategoryTagCategory[] = ['shopping', 'food', 'transportation', 'entertainment', 'life', 'other']
const INVOICE: CategoryTagCategory[] = ['donation', 'prize', 'manual', 'carrier', 'scanner']

const row = (items: CategoryTagCategory[], values: Record<string, any>) =>
  React.createElement(
    'div',
    { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
    ...items.map((category) =>
      React.createElement(CategoryTag, { key: category, category, size: values.size, showIcon: values.showIcon })
    )
  )

/** 預覽把 11 種一次排出來 —— 分類標籤的重點是彼此的色彩區辨度，單看一顆看不出來 */
const CategoryTagRender: React.FC<{ values: Record<string, any> }> = ({ values }) =>
  React.createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
    row(CONSUMPTION, values),
    row(INVOICE, values),
  )

export const CategoryTagStory: StoryDef = {
  component: CategoryTag,
  name: 'CategoryTag',
  category: 'Display',
  props: {
    category: {
      type: 'enum',
      options: [...CONSUMPTION, ...INVOICE],
      default: 'shopping',
    },
    size: { type: 'enum', options: ['medium', 'small'], default: 'medium' },
    showIcon: { type: 'boolean', default: true },
  },
  Render: CategoryTagRender,
  // 預覽排全部 11 種，code 區塊只示範單一顆
  codeProps: (values) => values,
}
