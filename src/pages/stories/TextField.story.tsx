import React from 'react'
import TextField from '@/components/ui/TextField'
import type { StoryDef } from './types'

const TextFieldRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leadingIcon, trailingIcon, ...rest } = values
  return (
    <TextField
      {...rest}
      leadingIcon={leadingIcon ? <i className="icon-search" aria-hidden="true" /> : undefined}
      trailingIcon={trailingIcon ? <i className="icon-cross" aria-hidden="true" /> : undefined}
    />
  )
}

export const TextFieldStory: StoryDef = {
  component: TextField,
  name: 'TextField',
  category: 'Forms',
  previewWidth: 360,
  props: {
    variant:      { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:        { type: 'string', default: 'Label' },
    placeholder:  { type: 'string', default: 'Placeholder' },
    value:        { type: 'string', default: '' },
    status:       { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
  },
  Render: TextFieldRender,
}
