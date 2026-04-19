import Avatar from '@/components/ui/Avatar'
import type { StoryDef } from './types'

export const AvatarStory: StoryDef = {
  component: Avatar,
  name: 'Avatar',
  category: 'Display',
  props: {
    name:  { type: 'string', default: 'Will Huang' },
    size:  { type: 'enum', options: ['small', 'medium', 'large', 'xlarge'], default: 'medium' },
    shape: { type: 'enum', options: ['circle', 'square'], default: 'circle' },
  },
}
