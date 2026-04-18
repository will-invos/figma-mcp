import Slider from '@/components/ui/Slider'
import type { StoryDef } from './types'

export const SliderStory: StoryDef = {
  component: Slider,
  name: 'Slider',
  category: 'Forms',
  props: {
    value:    { type: 'number', default: 40, min: 0, max: 100, step: 1 },
    disabled: { type: 'boolean', default: false },
  },
}
