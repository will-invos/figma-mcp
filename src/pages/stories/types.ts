import type React from 'react'

export type WhenCondition = Record<string, string | number | boolean>

/** Visibility condition: an equality map (all must match) or a predicate over current values. */
export type WhenClause = WhenCondition | ((values: Record<string, any>) => boolean)

type PropDefBase = { when?: WhenClause }

export type PropDef =
  | (PropDefBase & { type: 'enum'; options: string[]; default: string;
      /** Filter visible options based on another prop's value.
       *  e.g. `{ variant: { filled: ['primary','neutral'], ghost: ['primary'] } }` */
      optionsByDep?: Record<string, Record<string, string[]>> })
  | (PropDefBase & { type: 'boolean'; default: boolean })
  | (PropDefBase & { type: 'string'; default: string })
  | (PropDefBase & { type: 'number'; default: number; min?: number; max?: number; step?: number })

/** Returns true if the prop should be visible given the current values. */
export function isPropVisible(def: PropDef, values: Record<string, any>): boolean {
  if (!def.when) return true
  if (typeof def.when === 'function') return def.when(values)
  return Object.entries(def.when).every(([key, required]) => values[key] === required)
}

/** For enum props with optionsByDep, returns the filtered options; otherwise all options. */
export function getEnumOptions(def: PropDef & { type: 'enum' }, values: Record<string, any>): string[] {
  if (!def.optionsByDep) return def.options
  for (const [depKey, mapping] of Object.entries(def.optionsByDep)) {
    const depVal = String(values[depKey] ?? '')
    if (mapping[depVal]) return mapping[depVal]
  }
  return def.options
}

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
