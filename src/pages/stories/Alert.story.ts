import Alert from '@/components/ui/Alert'
import type { StoryDef } from './types'

export const AlertStory: StoryDef = {
  component: Alert,
  name: 'Alert',
  category: 'Feedback',
  previewWidth: 360,
  props: {
    variant:      { type: 'enum', options: ['default', 'full-width'], default: 'default' },
    colorType:    { type: 'enum', options: ['primary', 'neutral', 'success', 'warning', 'danger', 'prize'], default: 'primary' },
    message:      { type: 'string', default: 'Message' },
    leadingIcon:  { type: 'boolean', default: true },
    trailingIcon: { type: 'boolean', default: true },
  },
}
