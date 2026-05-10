import type { StoryDef } from './types'
import Button from '@/components/ui/Button'
import { useInAppNotification } from '@/components/ui'

const SAMPLE_HEADLINES: Record<string, string> = {
  default: '+100 金！完成問卷領咖啡',
  completion: '11-12 月有新發票進來囉！',
  danger: '載具驗證碼錯誤，無法同步發票！',
  announcement: '請更新發票存摺 APP 版本！',
  reward: '完成任務 登錄領 100 金',
}

const SAMPLE_DESCRIPTIONS: Record<string, string> = {
  default: '30 秒填問卷，立即領 100 金，再免費請你喝全家咖啡',
  completion: '您有 3 張新發票，立即前往確認',
  danger: '立即重新驗證載具',
  announcement: '我們預計 11 月進行 APP 強制更新，您可以優先更新至最新版本',
  reward: '獲得 100 金幣，立即前往查看！',
}

const SAMPLE_IMAGE_SRC = 'https://picsum.photos/id/237/80/80'

const InAppNotificationRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { show } = useInAppNotification()

  const variant = values.variant as
    | 'default'
    | 'completion'
    | 'danger'
    | 'announcement'
    | 'reward'
  const trailing = values.trailing as 'none' | 'button' | 'icon'

  const handleShow = () => {
    show({
      variant,
      headline: SAMPLE_HEADLINES[variant],
      description: values.description ? SAMPLE_DESCRIPTIONS[variant] : undefined,
      image: values.useImage ? <img src={SAMPLE_IMAGE_SRC} alt="" /> : undefined,
      trailing,
      button:
        trailing === 'button'
          ? { label: '前往', onClick: () => console.log('button click') }
          : undefined,
      iconButton:
        trailing === 'icon'
          ? { ariaLabel: '前往', onClick: () => console.log('icon click') }
          : undefined,
      onPress: values.pressable ? () => console.log('card press') : undefined,
    })
  }

  return (
    <Button size="small" variant="outline" onClick={handleShow} text="Show notification" />
  )
}

export const InAppNotificationStory: StoryDef = {
  component: Button,
  name: 'InAppNotification',
  category: 'Feedback',
  props: {
    variant: {
      type: 'enum',
      options: ['default', 'completion', 'danger', 'announcement', 'reward'],
      default: 'default',
    },
    trailing: {
      type: 'enum',
      options: ['none', 'button', 'icon'],
      default: 'none',
    },
    description: { type: 'boolean', default: true },
    useImage: { type: 'boolean', default: false },
    pressable: { type: 'boolean', default: false },
  },
  Render: InAppNotificationRender,
}
