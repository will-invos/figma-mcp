import ProgressGroup from '@/components/ui/ProgressGroup'
import type { StoryDef } from './types'

export const ProgressGroupStory: StoryDef = {
  component: ProgressGroup,
  name: 'ProgressGroup',
  category: 'Feedback',
  previewWidth: 360,
  props: {
    textPosition: { type: 'enum', options: ['top', 'aside'], default: 'top' },
    value:        { type: 'number', default: 50, min: 0, max: 100 },
    leadingText:  { type: 'string', default: '50%' },
    trailingText: { type: 'string', default: '100/200' },
  },
}
