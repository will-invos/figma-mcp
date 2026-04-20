import React from 'react'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

const ButtonRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leadingIcon, trailingIcon, ...props } = values
  return React.createElement(Button, {
    ...props,
    leadingIcon: leadingIcon ? React.createElement('i', { className: 'icon-plus', 'aria-hidden': 'true' }) : undefined,
    trailingIcon: trailingIcon ? React.createElement('i', { className: 'icon-chevron-right', 'aria-hidden': 'true' }) : undefined,
  })
}

export const ButtonStory: StoryDef = {
  component: Button,
  name: 'Button',
  category: 'Forms',
  props: {
    Style:   { type: 'enum', options: ['filled', 'outline', 'ghost', 'text'], default: 'filled' },
    Color: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation', 'white', 'inverse', 'secondary'], default: 'primary',
      optionsByDep: { variant: {
        filled:  ['primary', 'neutral', 'danger', 'prize', 'donation', 'white'],
        outline: ['primary'],
        ghost:   ['primary', 'inverse'],
        text:    ['primary', 'inverse', 'secondary'],
      }},
    },
    size:         { type: 'enum', options: ['large', 'medium', 'small'], default: 'medium' },
    label:  { type: 'string', default: 'Button' },
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
    disabled:     { type: 'boolean', default: false },
    loading:      { type: 'boolean', default: false },
  },
  Render: ButtonRender,
}
