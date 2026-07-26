import PageStatus from '@/components/ui/PageStatus'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

/** 控制項的值 → 實際傳給 PageStatus 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  return {
    status: values.status,
    image: values.image,
    action: values.action ? <Button variant="outline" text="重試" /> : undefined,
  }
}

const PageStatusRender: React.FC<{ values: Record<string, any> }> = ({ values }) => (
  <PageStatus {...resolveProps(values)} />
)

export const PageStatusStory: StoryDef = {
  component: PageStatus,
  name: 'PageStatus',
  category: 'Feedback',
  previewWidth: 393,
  props: {
    status: {
      type: 'enum',
      options: ['disconnected', 'system-error', 'no-results', 'empty', 'not-exist'],
      default: 'disconnected',
      required: true,
    },
    image: { type: 'boolean', default: true },
    action: { type: 'boolean', default: false },
  },
  Render: PageStatusRender,
  codeProps: resolveProps,
}
