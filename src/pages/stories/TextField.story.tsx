import React, { useState, useEffect } from 'react'
import TextField from '@/components/ui/TextField'
import IconButton from '@/components/ui/IconButton'
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
      trailingIcon={
        trailingIcon ? (
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="xsmall"
            aria-label="Clear"
            icon={<i className="icon-cross" aria-hidden="true" />}
            onClick={() => setValue('')}
          />
        ) : undefined
      }
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
