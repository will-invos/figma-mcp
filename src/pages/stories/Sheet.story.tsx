import React from 'react'
import Sheet from '@/components/ui/Sheet'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import type { StoryDef } from './types'
import { useState } from 'react'

const SheetRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [checked, setChecked] = useState(false)

  const renderFooter = () => {
    if (!values.footer) return undefined
    switch (values.footerType) {
      case '1-button':
        return <Button onClick={() => setOpen(false)} text="Confirm" />
      case '2-buttons-horizontal':
        return (
          <div style={{ display: 'flex', gap: 16, width: '100%' }}>
            <Button variant="filled" colorType="neutral" style={{ flex: 1 }} onClick={() => setOpen(false)} text="Cancel" />
            <Button variant="filled" colorType="primary" style={{ flex: 1 }} onClick={() => setOpen(false)} text="Confirm" />
          </div>
        )
      case '2-buttons-vertical':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <Button onClick={() => setOpen(false)} text="Confirm" />
            <Button variant="text" onClick={() => setOpen(false)} text="Cancel" />
          </div>
        )
      case 'checkbox-button':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <Checkbox checked={checked} onChange={setChecked} label="I agree to the terms" />
            <Button onClick={() => setOpen(false)} text="Confirm" />
          </div>
        )
      default:
        return <Button onClick={() => setOpen(false)} text="Confirm" />
    }
  }

  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)} text="Open Sheet" />
      <div ref={setContainer} />
      {container && (
        <Sheet
          open={open}
          onClose={() => setOpen(false)}
          headline={values.headline}
          headlineSize={values.headlineSize}
          Handle={values.Handle}
          footer={renderFooter()}
          container={container}
        >
          <p style={{ padding: 'var(--space-400)' }}>Description</p>
        </Sheet>
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
}
