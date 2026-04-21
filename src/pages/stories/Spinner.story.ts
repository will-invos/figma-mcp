import Spinner from '@/components/ui/Spinner'
import type { StoryDef } from './types'

export const SpinnerStory: StoryDef = {
  component: Spinner,
  name: 'Spinner',
  category: 'Feedback',
  props: {
    color: { type: 'enum', options: ['primary', 'neutral', 'inverse', 'fixed-bold'], default: 'primary' },
    size:  { type: 'enum', options: ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'], default: 'medium' },
  },
}
