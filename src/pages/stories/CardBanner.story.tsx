import CardBanner from '@/components/ui/CardBanner'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const CardBannerStory: StoryDef = {
  component: CardBanner,
  name: 'CardBanner',
  category: 'Display',
  previewWidth: 360,
  props: {
    title:       { type: 'string', default: '限時好禮' },
    aspectRatio: { type: 'string', default: '3 / 1' },
  },
  fixedProps: {
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=720&h=240&fit=crop',
    descriptions: [
      { text: '登錄發票即抽好禮' },
      { text: '活動至 2026/06/30' },
    ],
    action: <Button size="small">參加</Button>,
  },
}
