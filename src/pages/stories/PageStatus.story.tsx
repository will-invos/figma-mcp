import PageStatus from '@/components/ui/PageStatus'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

const PageStatusRender: React.FC<{ values: Record<string, any> }> = ({ values }) => (
  <PageStatus
    status={values.status}
    image={values.image}
    action={values.action ? <Button variant="outline" text="重試" /> : undefined}
  />
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
    },
    image: { type: 'boolean', default: true },
    action: { type: 'boolean', default: false },
  },
  Render: PageStatusRender,
}
