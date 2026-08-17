import React, { useState } from 'react'
import Checkbox from '@/components/ui/Checkbox'
import type { StoryDef } from './types'

const LINK_STYLE: React.CSSProperties = {
  color: 'var(--color-content-link-default)',
  textDecoration: 'underline',
}

// 第二顆示範 label 內含連結：<a> 屬於 interactive content，label 不會把點擊轉給
// checkbox，所以點連結是開連結、點其餘文字才切換勾選（見 docs/component-usage.md）。
const termsLabel = React.createElement(React.Fragment, null,
  '我已閱讀並同意',
  React.createElement('a', {
    // 示範用的外部連結，開新分頁才能實際驗證「點連結不影響勾選」
    href: 'https://www.google.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    style: LINK_STYLE,
  }, '服務條款'),
)

const CheckboxRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checkedA, setCheckedA] = useState(false)
  const [checkedB, setCheckedB] = useState(false)
  const { disabled, status, description } = values
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
    React.createElement(Checkbox, { checked: checkedA, onChange: setCheckedA, disabled, status, description, label: 'Option A' }),
    React.createElement(Checkbox, { checked: checkedB, onChange: setCheckedB, disabled, status, description, label: termsLabel }),
  )
}

export const CheckboxStory: StoryDef = {
  component: Checkbox,
  name: 'Checkbox',
  category: 'Forms',
  props: {
    description: { type: 'string', default: '' },
    status:      { type: 'enum', options: ['default', 'error'], default: 'default' },
    disabled:    { type: 'boolean', default: false },
  },
  Render: CheckboxRender,
  // 預覽會排兩顆示範互動，code 區塊只示範單一顆（label 是 Render 補上的，不是控制項）
  codeProps: (values) => ({ ...values, label: 'Option A' }),
}
