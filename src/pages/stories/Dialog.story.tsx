import React, { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import TextArea from '@/components/ui/TextArea'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import Switch from '@/components/ui/Switch'
import type { StoryDef } from './types'

const demoImage = (
  <img
    src="https://picsum.photos/id/237/200/300"
    alt=""
    style={{
      width: '100%',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      borderRadius: 'var(--radius-200)',
      display: 'block',
    }}
  />
)

/** Render 會塞進來的互動狀態；code 區塊留空即可（handler 不會被印出來）。 */
interface ExtraState {
  text?: string
  setText?: (v: string) => void
  selected?: string
  setSelected?: (v: string) => void
  checked?: boolean
  setChecked?: (v: boolean) => void
}

function extraNode(kind: string, state: ExtraState = {}) {
  switch (kind) {
    case 'textfield':
      return (
        <TextField
          placeholder="Placeholder"
          value={state.text ?? ''}
          onChange={(e) => state.setText?.(e.target.value)}
        />
      )
    case 'textarea':
      return (
        <TextArea
          placeholder="Please enter…"
          value={state.text ?? ''}
          onChange={state.setText!}
        />
      )
    case 'select':
      return (
        <Select
          value={state.selected ?? ''}
          onChange={(e) => state.setSelected?.(e.target.value)}
          placeholder="Please select"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ]}
        />
      )
    case 'checkbox':
      return <Checkbox checked={!!state.checked} onChange={state.setChecked!} label="I agree to the terms" />
    case 'switch':
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span>Enable notifications</span>
          <Switch checked={!!state.checked} onChange={state.setChecked!} />
        </div>
      )
    default:
      return undefined
  }
}

const ExtraContent: React.FC<{ kind: string }> = ({ kind }) => {
  const [text, setText] = useState('')
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)
  return <>{extraNode(kind, { text, setText, selected, setSelected, checked, setChecked })}</>
}

/** 控制項的值 → 實際傳給 Dialog 的 props（Render 與 code 區塊共用）。
 *  `close` 由 Render 傳入；code 區塊給空 handler，序列化時只會印成 `() => {}`。
 *  `interactive` 為 true 時 extraContent 用有狀態的 <ExtraContent>，code 區塊則直接印出欄位本身。 */
function resolveProps(values: Record<string, any>, close: () => void = () => {}, interactive = false) {
  // loading 期間：這顆顯示 spinner，另一顆自動 disabled，點 overlay 與 Esc 也不會關閉
  const loading = values.loading || undefined
  const primary = values.type === 'danger'
    ? { label: 'Delete', onClick: close, colorType: 'danger' as const, loading }
    : { label: 'Confirm', onClick: close, colorType: 'primary' as const, loading }
  const secondary = { label: 'Cancel', onClick: close, colorType: 'neutral' as const }

  let actions
  if (values.cta === '1-button') {
    actions = [primary]
  } else if (values.cta === '2-buttons-vertical') {
    // 直排：上 primary filled、下 secondary text
    actions = [primary, secondary]
  } else if (values.type === 'danger') {
    // 橫排 danger：primary 在左
    actions = [primary, secondary]
  } else {
    // 橫排 default：primary 在右
    actions = [secondary, primary]
  }

  return {
    type: values.type,
    cta: values.cta,
    title: values.title,
    description: values.description,
    image: values.image ? demoImage : undefined,
    extraContent: values.extra === 'none'
      ? undefined
      : interactive ? <ExtraContent kind={values.extra} /> : extraNode(values.extra),
    actions,
  }
}

const DialogRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const close = () => setOpen(false)

  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)} text="Open Dialog" />
      <div ref={setContainer} />
      {container && (
        <Dialog
          {...resolveProps(values, close, true)}
          open={open}
          onClose={close}
          container={container}
        />
      )}
    </>
  )
}

export const DialogStory: StoryDef = {
  component: Dialog,
  name: 'Dialog',
  category: 'Overlay',
  props: {
    type:        { type: 'enum', options: ['default', 'danger'], default: 'default' },
    title:       { type: 'string', default: 'Are you sure?' },
    description: { type: 'string', default: 'Are you sure you want to perform this action? This action cannot be undone.' },
    cta:         { type: 'enum', options: ['2-buttons-horizontal', '2-buttons-vertical', '1-button'], default: '2-buttons-horizontal' },
    image:       { type: 'boolean', default: false },
    extra:       { type: 'enum', options: ['none', 'textfield', 'textarea', 'select', 'checkbox', 'switch'], default: 'none' },
    // 請求進行中：主要動作顯示 spinner，其餘按鈕與 overlay / Esc 關閉一併鎖住
    loading:     { type: 'boolean', default: false },
  },
  Render: DialogRender,
  codeProps: (values) => ({ open: true, ...resolveProps(values) }),
}
