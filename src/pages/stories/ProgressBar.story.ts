import ProgressBar from '@/components/ui/ProgressBar'
import type { StoryDef } from './types'

export const ProgressBarStory: StoryDef = {
  component: ProgressBar,
  name: 'ProgressBar',
  category: 'Feedback',
  props: {
    value:         { type: 'number', default: 50, min: 0, max: 100 },
    label:         { type: 'string', default: '50%' },
    indeterminate: { type: 'boolean', default: false },
    colorType:     { type: 'enum', options: ['primary', 'success', 'warning', 'danger', 'prize'], default: 'primary' },
    size:          { type: 'enum', options: ['small', 'medium'], default: 'medium' },
  },
}
