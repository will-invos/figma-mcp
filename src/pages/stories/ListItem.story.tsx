import React, { useState } from 'react'
import ListItem from '@/components/ui/ListItem'
import type { StoryDef } from './types'

const checkIcon = (
  <span style={{ color: 'var(--color-content-brand-default)' }}>
    <i className="icon-check" aria-hidden="true" />
  </span>
)

/** 控制項的值 → 實際傳給 ListItem 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  return {
    headline: values.headline,
    ...values,
    trailingIcon: values.trailing === 'icon' ? checkIcon : undefined,
  }
}

const ListItemRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  return (
    <ListItem
      {...resolveProps(values)}
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
  codeProps: resolveProps,
}
