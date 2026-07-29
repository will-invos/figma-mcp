import React, { useState } from 'react'
import RadioGroup from '@/components/ui/RadioGroup'
import type { StoryDef } from './types'

const OPTIONS = [
  { value: 'a', label: '選項一' },
  { value: 'b', label: '選項二' },
  { value: 'c', label: '選項三' },
  { value: 'd', label: '選項四' },
]

/** 選取狀態要能實際切換才看得出互斥行為，所以自訂 Render 而非走預設渲染 */
const RadioGroupRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [selected, setSelected] = useState('a')
  return React.createElement(RadioGroup, {
    options: OPTIONS,
    value: selected,
    onChange: setSelected,
    layout: values.layout,
    disabled: values.disabled,
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
    disabled: { type: 'boolean', default: false },
  },
  Render: RadioGroupRender,
  codeProps: (values) => ({ ...values, options: OPTIONS, value: 'a' }),
}
