import React from 'react'
import Tag from '@/components/ui/Tag'
import type { StoryDef } from './types'

const infoIcon = React.createElement('i', { className: 'icon-info', 'aria-hidden': 'true' })
const crossIcon = React.createElement('i', { className: 'icon-cross', 'aria-hidden': 'true' })

/** 控制項的值 → 實際傳給 Tag 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  const { leadingIcon, trailingIcon, message, ...props } = values
  return {
    message,
    ...props,
    leadingIcon: leadingIcon ? infoIcon : undefined,
    trailingIcon: trailingIcon ? crossIcon : undefined,
  }
}

const TagRender: React.FC<{ values: Record<string, any> }> = ({ values }) =>
  React.createElement(Tag, resolveProps(values))

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
  codeProps: resolveProps,
}
