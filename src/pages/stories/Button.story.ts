import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const ButtonStory: StoryDef = {
  component: Button,
  name: 'Button',
  category: 'Forms',
  props: {
    children:  { type: 'string', default: 'Button' },
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost', 'text'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation', 'white', 'inverse', 'secondary'], default: 'primary',
      optionsByDep: { variant: {
        filled:  ['primary', 'neutral', 'danger', 'prize', 'donation', 'white'],
        outline: ['primary'],
        ghost:   ['primary', 'inverse'],
        text:    ['primary', 'inverse', 'secondary'],
      }},
    },
    size:      { type: 'enum', options: ['large', 'medium', 'small'], default: 'medium' },
    disabled:  { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
  },
}
