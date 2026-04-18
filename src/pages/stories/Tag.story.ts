import Tag from '@/components/ui/Tag'
import type { StoryDef } from './types'

export const TagStory: StoryDef = {
  component: Tag,
  name: 'Tag',
  category: 'Display',
  props: {
    children:  { type: 'string', default: 'Tag' },
    variant:   { type: 'enum', options: ['light', 'bold'], default: 'light' },
    colorType: { type: 'enum', options: ['neutral', 'primary', 'success', 'danger', 'warning', 'prize'], default: 'neutral' },
    size:      { type: 'enum', options: ['medium', 'small'], default: 'medium' },
  },
}
