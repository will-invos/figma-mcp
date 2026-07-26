import React, { useState } from 'react'
import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

const options = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]

const userIcon = <i className="icon-user" aria-hidden="true" />

/** 控制項的值 → 實際傳給 Select 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  const { leadingIcon, ...rest } = values
  return {
    ...rest,
    options,
    leadingIcon: leadingIcon ? userIcon : undefined,
  }
}

const SelectRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [value, setValue] = useState('')

  return (
    <Select
      {...resolveProps(values)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
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
  codeProps: resolveProps,
}
