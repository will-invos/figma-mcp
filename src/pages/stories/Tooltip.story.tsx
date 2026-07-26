import Tooltip from '@/components/ui/Tooltip'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

/** 控制項的值 → 實際傳給 Tooltip 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  return {
    content: values.content,
    placement: values.placement,
    align: values.align,
    children: <Button size="small" variant="outline" text="Hover me" />,
  }
}

const TooltipRender: React.FC<{ values: Record<string, any> }> = ({ values }) => (
  <Tooltip {...resolveProps(values)} />
)

export const TooltipStory: StoryDef = {
  component: Tooltip,
  name: 'Tooltip',
  category: 'Feedback',
  props: {
    placement: { type: 'enum', options: ['top', 'bottom', 'left', 'right'], default: 'top' },
    align:     { type: 'enum', options: ['start', 'center', 'end'], default: 'center' },
    content:   { type: 'string', default: 'Tooltip text' },
  },
  Render: TooltipRender,
  codeProps: resolveProps,
}
