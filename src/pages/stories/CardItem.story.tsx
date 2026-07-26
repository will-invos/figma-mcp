import React from 'react'
import CardItem from '@/components/ui/CardItem'
import type { StoryDef } from './types'

const sampleImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=320&fit=crop'

const defaultDescriptions = [
  { icon: <i className="icon-gift" aria-hidden="true" />, text: '您有 1 張發票即將過期' },
  { icon: <i className="icon-clock" aria-hidden="true" />, text: '截止日 2026/05/15' },
]

/** 控制項的值 → 實際傳給 CardItem 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  return {
    ...values,
    // medium 版面才吃 showThumbnail；large 一律有 hero 圖
    imageUrl: values.size === 'medium' && !values.showThumbnail ? undefined : sampleImage,
    descriptions: values.content === 'list-item' ? defaultDescriptions : undefined,
  }
}

const CardItemRender: React.FC<{ values: Record<string, any> }> = ({ values }) => (
  <CardItem {...resolveProps(values)} />
)

export const CardItemStory: StoryDef = {
  component: CardItem,
  name: 'CardItem',
  category: 'Display',
  previewWidth: 360,
  props: {
    size:          { type: 'enum', options: ['large', 'medium'], default: 'medium' },
    headline:      { type: 'string', default: '兌獎期限提醒' },
    content:       { type: 'enum', options: ['list-item', 'text'], default: 'list-item' },
    showThumbnail: { type: 'boolean', default: true, when: { size: 'medium' } },
    description:   { type: 'string', default: '卡片說明文字描述', when: { content: 'text' } },
    showButton:    { type: 'boolean', default: true },
    buttonText:    { type: 'string', default: '查看', when: { showButton: true } },
    divider:       { type: 'boolean', default: true, when: { size: 'medium' } },
  },
  Render: CardItemRender,
  codeProps: resolveProps,
}
