import React, { useState } from 'react'
import RadioGroup from '@/components/ui/RadioGroup'
import type { StoryDef } from './types'

const OPTIONS = [
  { value: 'a', label: '選項一' },
  { value: 'b', label: '選項二' },
  { value: 'c', label: '選項三' },
  { value: 'd', label: '選項四' },
]

const RadioGroupRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [selected, setSelected] = useState('a')
  const { layout, status, disabled, withDescription } = values
  const options = withDescription
    ? OPTIONS.map((o, i) => (i === 0 ? { ...o, description: '這個選項有補充說明' } : o))
    : OPTIONS
  return React.createElement(RadioGroup, {
    options,
    value: selected,
    onChange: setSelected,
    layout,
    status,
    disabled,
    'aria-label': '示範選項',
  })
}

export const RadioGroupStory: StoryDef = {
  component: RadioGroup,
  name: 'RadioGroup',
  category: 'Forms',
  previewWidth: 360,
  props: {
    layout: { type: 'enum', options: ['column', 'two-columns', 'side-by-side'], default: 'column' },
    status: { type: 'enum', options: ['default', 'error'], default: 'default' },
    disabled: { type: 'boolean', default: false },
    withDescription: { type: 'boolean', default: false },
  },
  Render: RadioGroupRender,
  codeProps: (values) => {
    const { withDescription, ...rest } = values
    return { ...rest, options: OPTIONS, value: 'a' }
  },
}
