import React, { useState, useEffect } from 'react'
import TextField from '@/components/ui/TextField'
import type { StoryDef } from './types'

const TextFieldRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leadingIcon, trailingIcon, value: controlValue, ...rest } = values
  const [value, setValue] = useState(controlValue ?? '')

  // Sync when Controls panel changes value
  useEffect(() => { setValue(controlValue ?? '') }, [controlValue])

  return (
    <TextField
      {...rest}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leadingIcon={leadingIcon ? <i className="icon-user" aria-hidden="true" /> : undefined}
      trailingIcon={trailingIcon ? <i className="icon-eye-off" aria-hidden="true" /> : undefined}
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
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
    status:       { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
  Render: TextFieldRender,
}
