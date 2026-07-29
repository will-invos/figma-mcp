import React, { useState } from 'react'
import ListItem from '@/components/ui/ListItem'
import IconButton from '@/components/ui/IconButton'
import type { StoryDef } from './types'

/**
 * 裸 icon：24px 與 brand 色由 ListItem 供給，不用自己包 <span> 上色。
 * 包了 wrapper 反而拿不到 —— slot 只負責「直接放進來」的 icon。
 */
const bareIcon = <i className="icon-check" aria-hidden="true" />

/**
 * 合成元件放進同一個 slot 時要保有自己的配色與尺寸。
 * 這個案例是回歸測試：ListItem 曾用後代選擇器把 slot 內任何 icon 塗成 brand 色、
 * 尺寸壓成 24px，蓋掉 IconButton 的 danger 配色。
 */
const dangerIconButton = (
  <IconButton
    variant="ghost"
    colorType="danger"
    size="medium"
    aria-label="刪除"
    icon={<i className="icon-trash-can" aria-hidden="true" />}
  />
)

/** 控制項的值 → 實際傳給 ListItem 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  // trailingIconKind 只是 story 的控制項、不是 ListItem 的 prop，
  // 要從 spread 拿掉否則 code 區塊會印出一個不存在的 prop
  const { trailingIconKind, ...rest } = values
  return {
    headline: values.headline,
    ...rest,
    trailingIcon:
      values.trailing === 'icon'
        ? trailingIconKind === 'icon-button' ? dangerIconButton : bareIcon
        : undefined,
  }
}

const ListItemRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  return (
    <ListItem
      {...resolveProps(values)}
      trailingChecked={checked}
      onTrailingChange={setChecked}
      onClick={values.trailing === 'drill-in' ? () => {} : undefined}
    />
  )
}

export const ListItemStory: StoryDef = {
  component: ListItem,
  name: 'ListItem',
  category: 'Display',
  previewWidth: 360,
  props: {
    type:        { type: 'enum', options: ['default', 'rich', 'compact'], default: 'default' },
    headline:    { type: 'string', default: 'Headline' },
    description: { type: 'string', default: 'Description' },
    trailing:    { type: 'enum', options: ['none', 'drill-in', 'text', 'text-button', 'cta', 'icon', 'switch', 'checkbox', 'spinner'], default: 'drill-in' },
    trailingText:{ type: 'string', default: 'Text' },
    // icon-button 用來確認合成元件不會被 slot 的樣式蓋掉配色（應為 danger 紅，不是 brand 藍）
    trailingIconKind: { type: 'enum', options: ['bare', 'icon-button'], default: 'bare', when: { trailing: 'icon' } },
    disabled:    { type: 'boolean', default: false },
    showDivider: { type: 'boolean', default: true },
  },
  Render: ListItemRender,
  codeProps: resolveProps,
}
