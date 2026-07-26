import React from 'react'
import Sheet from '@/components/ui/Sheet'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import type { StoryDef } from './types'
import { useState } from 'react'

interface SheetState {
  close?: () => void
  checked?: boolean
  setChecked?: (v: boolean) => void
}

function footerNode(values: Record<string, any>, state: SheetState) {
  if (!values.footer) return undefined
  const close = state.close ?? (() => {})
  switch (values.footerType) {
    case '2-buttons-horizontal':
      return (
        <div style={{ display: 'flex', gap: 16, width: '100%' }}>
          <Button variant="filled" colorType="neutral" style={{ flex: 1 }} onClick={close} text="Cancel" />
          <Button variant="filled" colorType="primary" style={{ flex: 1 }} onClick={close} text="Confirm" />
        </div>
      )
    case '2-buttons-vertical':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
          <Button onClick={close} text="Confirm" />
          <Button variant="text" onClick={close} text="Cancel" />
        </div>
      )
    case 'checkbox-button':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Checkbox checked={!!state.checked} onChange={state.setChecked!} label="I agree to the terms" />
          <Button onClick={close} text="Confirm" />
        </div>
      )
    case '1-button':
    default:
      return <Button onClick={close} text="Confirm" />
  }
}

/** 控制項的值 → 實際傳給 Sheet 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>, state: SheetState = {}) {
  return {
    headline: values.headline,
    headlineSize: values.headlineSize,
    Handle: values.Handle,
    footer: footerNode(values, state),
    children: <p style={{ padding: 'var(--space-400)' }}>Description</p>,
  }
}

const SheetRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [checked, setChecked] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)} text="Open Sheet" />
      <div ref={setContainer} />
      {container && (
        <Sheet
          {...resolveProps(values, { close, checked, setChecked })}
          open={open}
          onClose={close}
          container={container}
        />
      )}
    </>
  )
}

export const SheetStory: StoryDef = {
  component: Sheet,
  name: 'Sheet',
  category: 'Overlay',
  props: {
    headlineSize: { type: 'enum', options: ['regular', 'large'], default: 'large' },
    headline:     { type: 'string', default: 'Headline' },
    Handle:       { type: 'boolean', default: false },
    footer:       { type: 'boolean', default: true },
    footerType:   { type: 'enum', options: ['1-button', '2-buttons-horizontal', '2-buttons-vertical', 'checkbox-button'], default: '1-button', when: { footer: true } },
  },
  Render: SheetRender,
  codeProps: (values) => ({ open: true, ...resolveProps(values) }),
}
