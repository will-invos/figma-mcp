import Radio from '@/components/ui/Radio'
import type { StoryDef } from './types'

export const RadioStory: StoryDef = {
  component: Radio,
  name: 'Radio',
  category: 'Forms',
  props: {
    children: { type: 'string', default: '選項 A' },
    checked:  { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    status:   { type: 'enum', options: ['default', 'error'], default: 'default' },
  },
}
