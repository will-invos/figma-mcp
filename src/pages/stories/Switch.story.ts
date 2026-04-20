import React, { useState } from 'react'
import Switch from '@/components/ui/Switch'
import type { StoryDef } from './types'

const SwitchRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  return React.createElement(Switch, {
    checked,
    onChange: setChecked,
    disabled: values.disabled,
  })
}

export const SwitchStory: StoryDef = {
  component: Switch,
  name: 'Switch',
  category: 'Forms',
  props: {
    disabled: { type: 'boolean', default: false },
  },
  Render: SwitchRender,
}
