import TextField from '@/components/ui/TextField'
import { InfoIcon } from './icons'
import type { StoryDef } from './types'

export const TextFieldStory: StoryDef = {
  component: TextField,
  name: 'TextField',
  category: 'Forms',
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: 'Email' },
    placeholder: { type: 'string', default: 'name@example.com' },
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
    helpText:    { type: 'string', default: '' },
  },
  fixedProps: {
    helpIcon: <InfoIcon />,
  },
}
