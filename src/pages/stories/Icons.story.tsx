import React from 'react'
import type { StoryDef } from './types'
import './Icons.story.css'

const ICONS = [
  'alarm-clock', 'alert', 'alert-circle', 'alert-circle-filled', 'alert-filled',
  'apple-watch', 'arrow-down', 'arrow-down-left', 'arrow-down-right', 'arrow-left',
  'arrow-reverse-horizontal', 'arrow-reverse-vertical', 'arrow-right', 'arrow-up',
  'arrow-up-left', 'arrow-up-right', 'at-mark', 'backpack', 'badge-check',
  'badge-percentage', 'ban', 'barcode', 'barcode-book', 'barcode-book-filled',
  'barcode-scanner', 'bell', 'bell-circle', 'bell-filled', 'bell-off', 'bill',
  'birthday-cake', 'book', 'book-open', 'bookmark', 'box-stack', 'briefcase',
  'brush', 'bug', 'building-library', 'building-office', 'bus', 'bus-filled',
  'calendar', 'calendar-box', 'calendar-check', 'calendar-cross', 'calendar-grids',
  'calendar-plus', 'camera', 'camera-filled', 'camera-focus', 'camera-off', 'car',
  'car-filled', 'chart-bar', 'chart-donut', 'chart-line', 'chart-pie', 'check',
  'check-bold', 'check-circle', 'check-circle-filled', 'chevron-down', 'chevron-left',
  'chevron-right', 'chevron-up', 'circle', 'clipboard', 'clock', 'clock-off',
  'cloud-arrow-down', 'cloud-arrow-up', 'cloud-off', 'coding', 'cog-6-tooth', 'coin',
  'coin-arrow-left', 'coin-arrow-right', 'coin-filled', 'coin-ib-mono', 'coin-in-mono',
  'compass', 'contact', 'container-arrow-down', 'container-arrow-left',
  'container-arrow-right', 'credit-card', 'cross', 'cross-circle', 'cross-circle-filled',
  'crown', 'crown-filled', 'currency-mark', 'customer-service', 'dialog-circle',
  'dialog-square', 'diamond', 'document', 'document-arrow-down', 'document-arrow-up',
  'document-chart-bar', 'document-envelope', 'document-filled', 'document-text',
  'donation', 'donation-filled', 'dots-arrow-right', 'emotion-bad', 'emotion-bad-filled',
  'emotion-good', 'emotion-good-filled', 'emotion-mild', 'emotion-mild-filled', 'eye',
  'eye-off', 'face-id', 'faq', 'faq-filled', 'film', 'filter', 'finger-print', 'flag',
  'flag-mountain', 'flag-mountain-filled', 'flash', 'flashes', 'folder',
  'folder-arrow-down', 'folder-cross', 'folder-plus', 'folderbox', 'folderbox-arrow-down',
  'folderbox-cross', 'gamepad', 'gamepad-filled', 'gender', 'gender-female', 'gender-male',
  'gift', 'gift-filled', 'hand-up', 'heart', 'heart-filled', 'hexagon-circle', 'home',
  'home-filled', 'home-user', 'home-user-filled', 'info', 'info-filled', 'invoice',
  'invoice-filled', 'invoice-money', 'invoice-money-filled', 'invoice-text', 'invos-heart',
  'keyboard', 'list', 'list-check', 'list-pen', 'list-plus', 'list-point', 'lock',
  'lock-off', 'logo-invos', 'loud-speaker', 'loud-speaker-filled', 'magnifier', 'mail',
  'map', 'map-pin', 'member-card', 'microphone', 'microphone-off', 'minus',
  'minus-circle', 'minus-circle-filled', 'mobile', 'mobile-add', 'mobile-barcode', 'moon',
  'music', 'paper-clock', 'paperclip', 'pencil', 'pencil-filled', 'phone', 'phone-ring',
  'photo', 'piggy-bank', 'piggy-bank-filled', 'pin', 'plus', 'plus-circle',
  'plus-circle-filled', 'point', 'point-filled', 'qrcode', 'qrcode-scanner', 'refresh',
  'robot', 'rocket', 'scanner', 'scanner-filled', 'share-android', 'share-ios',
  'shield-check', 'shield-cross', 'shopping-bag', 'shopping-bag-filled', 'shopping-cart',
  'shopping-cart-filled', 'sound', 'square-arrow-out', 'square-flash', 'square-splitted',
  'square-splitted-filled', 'square-stack', 'square-triangle', 'star', 'star-filled',
  'start', 'store', 'store-filled', 'sun', 'switch', 'tableware', 'tableware-filled',
  'tag', 'tag-cross', 'target', 'three-dots', 'three-line', 'thumb-down',
  'thumb-down-filled', 'thumb-up', 'thumb-up-filled', 'thunder', 'thunder-filled',
  'thunder-filled-off', 'ticket', 'translation', 'trash-can', 'trophy', 'user',
  'user-box', 'user-cog', 'user-group', 'video', 'volume-off', 'volume-on',
  'volumn-filled-off', 'volumn-filled-on', 'wallet', 'wallet-ios',
]

const SIZE_CLASS: Record<string, string> = {
  '12': 'icon-size-xs',
  '14': 'icon-size-sm',
  '16': '',
  '20': 'icon-size-lg',
  '24': 'icon-size-xl',
  '32': 'icon-size-2xl',
  '40': 'icon-size-3xl',
}

const IconsRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const sizeClass = SIZE_CLASS[values.size as string] ?? ''

  return (
    <div className="icons-story">
      <div className="icons-story__grid">
        {ICONS.map((name) => (
          <div key={name} className="icons-story__item">
            <i className={`icon-${name}${sizeClass ? ` ${sizeClass}` : ''}`} aria-hidden="true" />
            <span className="icons-story__name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const IconsStory: StoryDef = {
  component: 'div' as any,
  name: 'Icons',
  category: 'Display',
  props: {
    size: { type: 'enum', options: ['12', '14', '16', '20', '24', '32', '40'], default: '24' },
  },
  Render: IconsRender,
  // 這頁是 icon 一覽，沒有「根元件」可印；改示範 icon font 的用法
  codeSnippet: (values) => {
    const sizeClass = SIZE_CLASS[values.size as string] ?? ''
    return `<i className="icon-plus${sizeClass ? ` ${sizeClass}` : ''}" aria-hidden="true" />`
  },
}
