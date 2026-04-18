import Badge from '@/components/ui/Badge'
import type { StoryDef } from './types'

export const BadgeStory: StoryDef = {
  component: Badge,
  name: 'Badge',
  category: 'Display',
  props: {
    variant: { type: 'enum', options: ['dot', 'number'], default: 'dot' },
    size:    { type: 'enum', options: ['small', 'medium', 'large'], default: 'medium' },
    count:   { type: 'number', default: 3, min: 0, max: 999 },
  },
}
