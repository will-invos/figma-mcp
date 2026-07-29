import React, { useState } from 'react'
import FieldGroup from '@/components/ui/FieldGroup'
import TextField from '@/components/ui/TextField'
import TextArea from '@/components/ui/TextArea'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

const DEMO_OPTIONS = [
  { label: '選項一', value: '1' },
  { label: '選項二', value: '2' },
  { label: '選項三', value: '3' },
]

/** Render 會塞進來的互動狀態；code 區塊用不到，留空即可（handler 不會被印出來）。 */
interface FieldState {
  checked?: boolean
  setChecked?: (v: boolean) => void
  checkedB?: boolean
  setCheckedB?: (v: boolean) => void
  radioValue?: string
  setRadioValue?: (v: string) => void
}

function fieldNode(values: Record<string, any>, state: FieldState = {}) {
  const fieldStatus = values.status === 'error' ? 'error' : undefined
  switch (values.field) {
    case 'textarea':
      return <TextArea placeholder="Placeholder" status={fieldStatus} />
    case 'checkbox':
      return (
        <div style={{ display: 'flex', gap: 24 }}>
          <Checkbox checked={!!state.checked} onChange={state.setChecked!} label="Option A" />
          <Checkbox checked={!!state.checkedB} onChange={state.setCheckedB!} label="Option B" />
        </div>
      )
    case 'radio':
      return (
        <div style={{ display: 'flex', gap: 24 }}>
          <Radio checked={state.radioValue === 'a'} onChange={() => state.setRadioValue?.('a')} name="fg-radio" value="a" status={fieldStatus}>Option A</Radio>
          <Radio checked={state.radioValue === 'b'} onChange={() => state.setRadioValue?.('b')} name="fg-radio" value="b" status={fieldStatus}>Option B</Radio>
        </div>
      )
    case 'select':
      return <Select placeholder="Please select..." options={DEMO_OPTIONS} status={fieldStatus} />
    case 'textfield':
    default:
      return <TextField placeholder="Placeholder" status={fieldStatus} />
  }
}

/** 控制項的值 → 實際傳給 FieldGroup 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>, state: FieldState = {}) {
  return {
    headline: values.headline,
    helpText: values.helpText ? values.helpTextBody : undefined,
    helpTextAlign: values.helpTextAlign,
    helpTextIcon: values.helpTextIcon,
    status: values.status,
    children: fieldNode(values, state),
  }
}

const FieldGroupRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  const [checkedB, setCheckedB] = useState(false)
  const [radioValue, setRadioValue] = useState('a')

  return (
    <FieldGroup
      {...resolveProps(values, { checked, setChecked, checkedB, setCheckedB, radioValue, setRadioValue })}
    />
  )
}

export const FieldGroupStory: StoryDef = {
  component: FieldGroup,
  name: 'FieldGroup',
  category: 'Forms',
  previewWidth: 360,
  props: {
    field:          { type: 'enum', options: ['textfield', 'textarea', 'checkbox', 'radio', 'select'], default: 'textfield' },
    headline:       { type: 'string', default: 'Headline' },
    helpText:       { type: 'boolean', default: true },
    helpTextBody:   { type: 'string', default: 'Help text', when: { helpText: true } },
    helpTextAlign:  { type: 'enum', options: ['left', 'right'], default: 'left', when: { helpText: true } },
    // 關掉後文字左緣會與輸入框左緣對齊；純說明性的註腳用（設計稿沒有 icon 時）
    helpTextIcon:   { type: 'boolean', default: true, when: { helpText: true } },
    status:         { type: 'enum', options: ['default', 'error'], default: 'default' },
  },
  Render: FieldGroupRender,
  codeProps: (values) => resolveProps(values),
}
