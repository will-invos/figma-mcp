import React from 'react'
import Tag from '@/components/ui/Tag'
import type { StoryDef } from './types'

const TagRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leadingIcon, trailingIcon, message, ...props } = values
  return React.createElement(Tag, {
    message,
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
    variant:      { type: 'enum', options: ['light', 'bold'], default: 'light' },
    colorType:    { type: 'enum', options: ['neutral', 'primary', 'success', 'danger', 'warning', 'prize'], default: 'neutral' },
    size:         { type: 'enum', options: ['medium', 'small'], default: 'medium' },
    message:      { type: 'string', default: 'Tag' },
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
  },
  Render: TagRender,
}
