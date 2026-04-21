import React, { useState } from 'react'
import Radio from '@/components/ui/Radio'
import type { StoryDef } from './types'

const RadioRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [selected, setSelected] = useState('a')
  const { disabled, status, description } = values
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
    React.createElement(Radio, { checked: selected === 'a', onChange: () => setSelected('a'), disabled, status, description, name: 'radio-demo', value: 'a' }, 'Option A'),
    React.createElement(Radio, { checked: selected === 'b', onChange: () => setSelected('b'), disabled, status, description, name: 'radio-demo', value: 'b' }, 'Option B'),
  )
}

export const RadioStory: StoryDef = {
  component: Radio,
  name: 'Radio',
  category: 'Forms',
  props: {
    description: { type: 'string', default: '' },
    status:      { type: 'enum', options: ['default', 'error'], default: 'default' },
    disabled:    { type: 'boolean', default: false },
  },
  Render: RadioRender,
}
