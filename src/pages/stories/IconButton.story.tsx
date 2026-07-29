import IconButton from '@/components/ui/IconButton'
import type { StoryDef } from './types'

export const IconButtonStory: StoryDef = {
  component: IconButton,
  name: 'IconButton',
  category: 'Forms',
  props: {
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation', 'fixed-white'], default: 'primary',
      optionsByDep: { variant: {
        filled:  ['primary', 'neutral', 'danger', 'prize', 'donation'],
        outline: ['primary'],
        ghost:   ['primary', 'neutral', 'danger', 'fixed-white'],
      }},
    },
    size:      { type: 'enum', options: ['large', 'medium', 'small', 'xsmall'], default: 'medium' },
    badge:     { type: 'boolean', default: false },
    disabled:  { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
  },
  fixedProps: {
    'aria-label': 'action',
    icon: <i className="icon-plus" aria-hidden="true" />,
  },
}
