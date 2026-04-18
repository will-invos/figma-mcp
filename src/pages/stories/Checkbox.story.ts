import Checkbox from '@/components/ui/Checkbox'
import type { StoryDef } from './types'

export const CheckboxStory: StoryDef = {
  component: Checkbox,
  name: 'Checkbox',
  category: 'Forms',
  props: {
    children: { type: 'string', default: '同意條款' },
    checked:  { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    status:   { type: 'enum', options: ['default', 'error'], default: 'default' },
  },
}
