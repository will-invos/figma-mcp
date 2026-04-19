import React, { useState } from 'react'
import Slider from '@/components/ui/Slider'
import type { StoryDef } from './types'

const SliderRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { disabled } = values
  const [value, setValue] = useState(40)

  return (
    <Slider
      value={value}
      onChange={setValue}
      disabled={disabled}
    />
  )
}

export const SliderStory: StoryDef = {
  component: Slider,
  name: 'Slider',
  category: 'Forms',
  previewWidth: 360,
  props: {
    disabled: { type: 'boolean', default: false },
  },
  Render: SliderRender,
}
