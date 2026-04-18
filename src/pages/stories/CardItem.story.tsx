import CardItem from '@/components/ui/CardItem'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const CardItemStory: StoryDef = {
  component: CardItem,
  name: 'CardItem',
  category: 'Display',
  props: {
    title:   { type: 'string', default: '兌獎期限提醒' },
    divider: { type: 'boolean', default: true },
  },
  fixedProps: {
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=160&fit=crop',
    descriptions: [
      { text: '您有 1 張發票即將過期' },
      { text: '截止日 2026/05/15' },
    ],
    action: <Button size="small">查看</Button>,
  },
}
