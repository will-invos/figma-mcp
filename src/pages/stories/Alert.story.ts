import Alert from '@/components/ui/Alert'
import type { StoryDef } from './types'

export const AlertStory: StoryDef = {
  component: Alert,
  name: 'Alert',
  category: 'Feedback',
  props: {
    children:  { type: 'string', default: 'This is an alert message' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'success', 'warning', 'danger', 'prize'], default: 'neutral' },
    variant:   { type: 'enum', options: ['default', 'full-width'], default: 'default' },
  },
}
