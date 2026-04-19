import React from 'react'
import TextField from '@/components/ui/TextField'
import { SearchIconBig, CloseIcon, InfoIcon } from './icons'
import type { StoryDef } from './types'

const TextFieldRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leadingIcon, trailingIcon, ...rest } = values
  return (
    <TextField
      {...rest}
      leadingIcon={leadingIcon ? <SearchIconBig /> : undefined}
      trailingIcon={trailingIcon ? <CloseIcon /> : undefined}
      helpIcon={<InfoIcon />}
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
    label:        { type: 'string', default: 'Email' },
    placeholder:  { type: 'string', default: 'name@example.com' },
    value:        { type: 'string', default: '' },
    status:       { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
    helpText:     { type: 'string', default: '' },
  },
  Render: TextFieldRender,
}
