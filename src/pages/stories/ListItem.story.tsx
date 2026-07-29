import React, { useState } from 'react'
import ListItem from '@/components/ui/ListItem'
import IconButton from '@/components/ui/IconButton'
import type { StoryDef } from './types'

/**
 * 單純的 icon：24px 與 brand 色由 ListItem 供給，不用自己包 <span> 上色。
 * 包了 wrapper 反而拿不到 —— slot 只負責「直接放進來」的 icon。
 */
const iconNode = <i className="icon-check" aria-hidden="true" />

/**
 * 可點的 icon（IconButton）放進同一個 slot 時要保有自己的配色與尺寸。
 * 這個案例是回歸測試：ListItem 曾用後代選擇器把 slot 內任何 icon 塗成 brand 色、
 * 尺寸壓成 24px，蓋掉 IconButton 的 danger 配色。
 */
const iconButtonNode = (
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
  /*
   * 控制項的 trailingIcon 是個字串（要放哪一種 node），真正的 prop 收的是 node，
   * 所以先取出來、不要讓字串跟著 spread 進去 —— 否則 code 區塊會印出
   * trailingIcon="icon" 這種假的用法。同 Dialog story 的 extra / ChipBar 的 badge。
   */
  const { trailingIcon: trailingIconKind, ...rest } = values
  return {
    headline: values.headline,
    ...rest,
    trailingIcon:
      values.trailing === 'icon'
        ? trailingIconKind === 'icon-button' ? iconButtonNode : iconNode
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
    // 只有 rich 會渲染第二行；其餘 type 傳了也不會顯示，印在 code 區塊只會讓人以為有效
    description: { type: 'string', default: 'Description', when: { type: 'rich' } },
    trailing:    { type: 'enum', options: ['none', 'drill-in', 'text', 'text-button', 'cta', 'icon', 'switch', 'checkbox', 'spinner'], default: 'drill-in' },
    // 只有這三種 trailing 會用到文字（text 直接顯示、text-button / cta 當按鈕文字）
    trailingText:{ type: 'string', default: 'Text', when: (v) => ['text', 'text-button', 'cta'].includes(v.trailing) },
    // trailing="icon" 時要放哪一種：單純 icon，或一顆可點的 IconButton。
    // icon-button 同時是回歸測試 —— 它應顯示 danger 紅，不該被 slot 樣式塗成 brand 藍。
    trailingIcon:{ type: 'enum', options: ['icon', 'icon-button'], default: 'icon', when: { trailing: 'icon' } },
    disabled:    { type: 'boolean', default: false },
    showDivider: { type: 'boolean', default: true },
  },
  Render: ListItemRender,
  codeProps: resolveProps,
}
