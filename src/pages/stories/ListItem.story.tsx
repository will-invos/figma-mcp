import React, { useState } from 'react'
import ListItem from '@/components/ui/ListItem'
import { CheckIcon } from './icons'
import type { StoryDef } from './types'

const ListItemRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  return (
    <ListItem
      headline={values.headline}
      {...values}
      trailingIcon={values.trailing === 'icon' ? <span style={{ color: 'var(--color-content-brand-default)' }}><CheckIcon /></span> : undefined}
      trailingChecked={checked}
      onTrailingChange={setChecked}
      onClick={values.trailing === 'drill-in' ? () => {} : undefined}
    />
  )
}

export const ListItemStory: StoryDef = {
  component: ListItem,
  name: 'ListItem',
  category: 'Display',
  previewWidth: 360,
  props: {
    type:        { type: 'enum', options: ['default', 'rich', 'compact'], default: 'default' },
    headline:    { type: 'string', default: 'Headline' },
    description: { type: 'string', default: 'Description' },
    trailing:    { type: 'enum', options: ['none', 'drill-in', 'text', 'text-button', 'cta', 'icon', 'switch', 'checkbox', 'spinner'], default: 'drill-in' },
    trailingText:{ type: 'string', default: 'Text' },
    disabled:    { type: 'boolean', default: false },
    showDivider: { type: 'boolean', default: true },
  },
  Render: ListItemRender,
}
