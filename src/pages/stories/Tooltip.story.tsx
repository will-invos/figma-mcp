import Tooltip from '@/components/ui/Tooltip'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

const TooltipRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  return (
    <Tooltip
      content={values.content}
      placement={values.placement}
      align={values.align}
    >
      <Button size="small" variant="outline">Hover me</Button>
    </Tooltip>
  )
}

export const TooltipStory: StoryDef = {
  component: Tooltip,
  name: 'Tooltip',
  category: 'Feedback',
  props: {
    content:   { type: 'string', default: 'Tooltip text' },
    placement: { type: 'enum', options: ['top', 'bottom', 'left', 'right'], default: 'top' },
    align:     { type: 'enum', options: ['start', 'center', 'end'], default: 'center' },
  },
  Render: TooltipRender,
}
