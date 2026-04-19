import React from 'react'
import Tag from '@/components/ui/Tag'
import type { StoryDef } from './types'

const TagRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leadingIcon, trailingIcon, ...props } = values
  return React.createElement(Tag, {
    ...props,
    leadingIcon: leadingIcon ? React.createElement('i', { className: 'icon-info', 'aria-hidden': 'true' }) : undefined,
    trailingIcon: trailingIcon ? React.createElement('i', { className: 'icon-cross', 'aria-hidden': 'true' }) : undefined,
  })
}

export const TagStory: StoryDef = {
  component: Tag,
  name: 'Tag',
  category: 'Display',
  props: {
    children:     { type: 'string', default: 'Tag' },
    variant:      { type: 'enum', options: ['light', 'bold'], default: 'light' },
    colorType:    { type: 'enum', options: ['neutral', 'primary', 'success', 'danger', 'warning', 'prize'], default: 'neutral' },
    size:         { type: 'enum', options: ['medium', 'small'], default: 'medium' },
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
  },
  Render: TagRender,
}
