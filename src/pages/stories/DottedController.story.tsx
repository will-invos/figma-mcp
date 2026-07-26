import DottedController from '@/components/ui/DottedController'
import type { StoryDef } from './types'
import { useState } from 'react'

const DottedControllerRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [active, setActive] = useState(0)
  const count = values.count
  const activeIndex = Math.min(active, Math.max(count - 1, 0))
  const dots = (
    <DottedController
      count={count}
      activeIndex={activeIndex}
      type={values.type}
      onChange={values.interactive ? setActive : undefined}
      aria-label="範例輪播"
    />
  )
  // overlap 是白色 / 半透明的點，要墊一層彩色底才看得出來
  if (values.type === 'overlap') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 24,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #3560ff, #8a5cf6)',
        }}
      >
        {dots}
      </div>
    )
  }
  return dots
}

export const DottedControllerStory: StoryDef = {
  component: DottedController,
  name: 'DottedController',
  category: 'Display',
  props: {
    count:       { type: 'number', default: 5, min: 1, max: 10, step: 1 },
    type:        { type: 'enum', options: ['default', 'overlap'], default: 'default' },
    interactive: { type: 'boolean', default: true },
  },
  Render: DottedControllerRender,
  codeProps: (values) => ({
    count: values.count,
    type: values.type,
    activeIndex: 0,
    'aria-label': '範例輪播',
  }),
}
