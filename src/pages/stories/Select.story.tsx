import React, { useState } from 'react'
import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

const options = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]

const SelectRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leadingIcon, ...rest } = values
  const [value, setValue] = useState('')

  return (
    <Select
      {...rest}
      options={options}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leadingIcon={leadingIcon ? <i className="icon-user" aria-hidden="true" /> : undefined}
    />
  )
}

export const SelectStory: StoryDef = {
  component: Select,
  name: 'Select',
  category: 'Forms',
  previewWidth: 360,
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: 'Label' },
    placeholder: { type: 'string', default: 'Please select...' },
    leadingIcon: { type: 'boolean', default: false },
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
  Render: SelectRender,
}
