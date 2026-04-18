import CircularProgress from '@/components/ui/CircularProgress'
import type { StoryDef } from './types'

export const CircularProgressStory: StoryDef = {
  component: CircularProgress,
  name: 'CircularProgress',
  category: 'Feedback',
  props: {
    value:         { type: 'number', default: 50, min: 0, max: 100 },
    indeterminate: { type: 'boolean', default: false },
    size:          { type: 'enum', options: ['small', 'medium', 'large'], default: 'medium' },
    colorType:     { type: 'enum', options: ['primary', 'success', 'warning', 'danger', 'prize'], default: 'primary' },
    showLabel:     { type: 'boolean', default: false },
  },
}
