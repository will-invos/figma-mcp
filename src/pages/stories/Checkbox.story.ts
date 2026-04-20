import React, { useState } from 'react'
import Checkbox from '@/components/ui/Checkbox'
import type { StoryDef } from './types'

const CheckboxRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checkedA, setCheckedA] = useState(false)
  const [checkedB, setCheckedB] = useState(false)
  const { disabled, status, description } = values
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
    React.createElement(Checkbox, { checked: checkedA, onChange: setCheckedA, disabled, status, description }, 'Option A'),
    React.createElement(Checkbox, { checked: checkedB, onChange: setCheckedB, disabled, status, description }, 'Option B'),
  )
}

export const CheckboxStory: StoryDef = {
  component: Checkbox,
  name: 'Checkbox',
  category: 'Forms',
  props: {
    description: { type: 'string', default: '' },
    disabled:    { type: 'boolean', default: false },
    status:      { type: 'enum', options: ['default', 'error'], default: 'default' },
  },
  Render: CheckboxRender,
}
