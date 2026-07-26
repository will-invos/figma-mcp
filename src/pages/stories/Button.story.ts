import React from 'react'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

const plusIcon = React.createElement('i', { className: 'icon-plus', 'aria-hidden': 'true' })
const chevronRightIcon = React.createElement('i', { className: 'icon-chevron-right', 'aria-hidden': 'true' })

/** 控制項的值 → 實際傳給 Button 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  const { leadingIcon, trailingIcon, ...props } = values
  return {
    ...props,
    leadingIcon: leadingIcon ? plusIcon : undefined,
    trailingIcon: trailingIcon ? chevronRightIcon : undefined,
  }
}

const ButtonRender: React.FC<{ values: Record<string, any> }> = ({ values }) =>
  React.createElement(Button, resolveProps(values))

export const ButtonStory: StoryDef = {
  component: Button,
  name: 'Button',
  category: 'Forms',
  props: {
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost', 'text'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation', 'white', 'inverse', 'secondary'], default: 'primary',
      optionsByDep: { variant: {
        filled:  ['primary', 'neutral', 'danger', 'prize', 'donation', 'white'],
        outline: ['primary'],
        ghost:   ['primary', 'inverse'],
        text:    ['primary', 'inverse', 'secondary'],
      }},
    },
    size:         { type: 'enum', options: ['large', 'medium', 'small'], default: 'medium' },
    text:         { type: 'string', default: 'Button' },
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
    disabled:     { type: 'boolean', default: false },
    loading:      { type: 'boolean', default: false },
  },
  Render: ButtonRender,
  codeProps: resolveProps,
}
