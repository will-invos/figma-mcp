import ProgressBar from '@/components/ui/ProgressBar'
import type { StoryDef } from './types'

export const ProgressBarStory: StoryDef = {
  component: ProgressBar,
  name: 'ProgressBar',
  category: 'Feedback',
  previewWidth: 360,
  props: {
    value:         { type: 'number', default: 50, min: 0, max: 100 },
    indeterminate: { type: 'boolean', default: false },
  },
}
