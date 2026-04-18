import IconButton from '@/components/ui/IconButton'
import { PlusIcon } from './icons'
import type { StoryDef } from './types'

export const IconButtonStory: StoryDef = {
  component: IconButton,
  name: 'IconButton',
  category: 'Forms',
  props: {
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation'], default: 'primary' },
    size:      { type: 'enum', options: ['large', 'medium', 'small', 'xsmall'], default: 'medium' },
    disabled:  { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
  },
  fixedProps: {
    'aria-label': 'action',
    children: <PlusIcon />,
  },
}
