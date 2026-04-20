import React, { useState, useEffect } from 'react'
import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

const options = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]

const SelectRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { value: controlValue, leadingIcon, ...rest } = values
  const [internalValue, setInternalValue] = useState(controlValue ?? '')

  // Sync when Controls panel changes value
  useEffect(() => { setInternalValue(controlValue ?? '') }, [controlValue])

  return (
    <Select
      {...rest}
      options={options}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
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
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
    leadingIcon: { type: 'boolean', default: false },
    value:       { type: 'enum', options: ['', 'design', 'engineering', 'product'], default: '' },
  },
  Render: SelectRender,
}
