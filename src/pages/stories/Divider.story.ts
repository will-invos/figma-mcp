import Divider from '@/components/ui/Divider'
import type { StoryDef } from './types'

export const DividerStory: StoryDef = {
  component: Divider,
  name: 'Divider',
  category: 'Chrome',
  previewWidth: 360,
  props: {
    orientation: { type: 'enum', options: ['horizontal', 'vertical'], default: 'horizontal' },
  },
}
