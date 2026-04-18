import Switch from '@/components/ui/Switch'
import type { StoryDef } from './types'

export const SwitchStory: StoryDef = {
  component: Switch,
  name: 'Switch',
  category: 'Forms',
  props: {
    checked:  { type: 'boolean', default: true },
    disabled: { type: 'boolean', default: false },
  },
}
