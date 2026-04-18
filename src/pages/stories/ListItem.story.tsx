import ListItem from '@/components/ui/ListItem'
import type { StoryDef } from './types'
import { useState } from 'react'

const ListItemRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ width: 393, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
      <ListItem
        headline={values.headline}
        description={values.description}
        type={values.type}
        trailing={values.trailing}
        trailingText={values.trailingText}
        disabled={values.disabled}
        trailingChecked={checked}
        onTrailingChange={setChecked}
        onClick={values.trailing === 'drill-in' ? () => {} : undefined}
        showDivider={false}
      />
    </div>
  )
}

export const ListItemStory: StoryDef = {
  component: ListItem,
  name: 'ListItem',
  category: 'Display',
  props: {
    headline:    { type: 'string', default: 'Headline' },
    description: { type: 'string', default: '描述文字' },
    type:        { type: 'enum', options: ['default', 'has-description', 'compact'], default: 'default' },
    trailing:    { type: 'enum', options: ['none', 'drill-in', 'text', 'text-button', 'switch', 'checkbox', 'spinner'], default: 'drill-in' },
    trailingText:{ type: 'string', default: '詳情' },
    disabled:    { type: 'boolean', default: false },
  },
  Render: ListItemRender,
}
