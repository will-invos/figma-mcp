import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const ButtonStory: StoryDef = {
  component: Button,
  name: 'Button',
  category: 'Forms',
  props: {
    children:  { type: 'string', default: 'Label' },
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost', 'text'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation', 'white', 'inverse', 'secondary'], default: 'primary' },
    size:      { type: 'enum', options: ['large', 'medium', 'small'], default: 'medium' },
    disabled:  { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
  },
}
