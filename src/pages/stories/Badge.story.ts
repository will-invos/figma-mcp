import Badge from '@/components/ui/Badge'
import type { StoryDef } from './types'

export const BadgeStory: StoryDef = {
  component: Badge,
  name: 'Badge',
  category: 'Display',
  props: {
    variant:    { type: 'enum', options: ['dot', 'number'], default: 'dot' },
    size:       { type: 'enum', options: ['small', 'medium', 'large'], default: 'small',
      optionsByDep: { variant: { dot: ['small', 'medium', 'large'], number: ['medium', 'large'] } },
    },
    count:      { type: 'number', default: 1, min: 0, max: 999, when: { variant: 'number' } },
    border:     { type: 'boolean', default: true },
  },
}
