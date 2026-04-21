import Avatar from '@/components/ui/Avatar'
import type { StoryDef } from './types'

export const AvatarStory: StoryDef = {
  component: Avatar,
  name: 'Avatar',
  category: 'Display',
  props: {
    size:  { type: 'enum', options: ['small', 'medium', 'large', 'xlarge'], default: 'medium' },
    name:  { type: 'string', default: 'Adam Lin' },
  },
}
