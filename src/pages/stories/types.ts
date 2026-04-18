import type React from 'react'

export type PropDef =
  | { type: 'enum'; options: string[]; default: string }
  | { type: 'boolean'; default: boolean }
  | { type: 'string'; default: string }
  | { type: 'number'; default: number; min?: number; max?: number; step?: number }

export interface StoryDef {
  component: React.ComponentType<any>
  name: string
  category: string
  props: Record<string, PropDef>
  fixedProps?: Record<string, any>
  /** Optional fixed width (px) for the preview container */
  previewWidth?: number
  /** Custom render component for stories needing extra state or wrappers (e.g. Dialog, Toast).
   *  Receives current controlled prop values. Omit for default: <Component {...fixedProps} {...values} /> */
  Render?: React.ComponentType<{ values: Record<string, any> }>
}

export interface StoryCategory {
  name: string
  stories: StoryDef[]
}
