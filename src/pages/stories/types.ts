import type React from 'react'

export type WhenCondition = Record<string, string | number | boolean>

/** 顯示條件：給物件代表所有欄位都要相等，或給函式自行判斷 */
export type WhenClause = WhenCondition | ((values: Record<string, any>) => boolean)

type PropDefBase = {
  when?: WhenClause
  /** 元件必填的 prop：即使值還是預設值，code 區塊也一定要印出來
   *  （enum / boolean 預設值平常會被省略，因為那與元件自身預設相同）。 */
  required?: boolean
}

export type PropDef =
  | (PropDefBase & { type: 'enum'; options: string[]; default: string;
      /** 依另一個 prop 的值過濾可選項，
       *  例如 `{ variant: { filled: ['primary','neutral'], ghost: ['primary'] } }` */
      optionsByDep?: Record<string, Record<string, string[]>> })
  | (PropDefBase & { type: 'boolean'; default: boolean })
  | (PropDefBase & { type: 'string'; default: string })
  | (PropDefBase & { type: 'number'; default: number; min?: number; max?: number; step?: number })

export function isPropVisible(def: PropDef, values: Record<string, any>): boolean {
  if (!def.when) return true
  if (typeof def.when === 'function') return def.when(values)
  return Object.entries(def.when).every(([key, required]) => values[key] === required)
}

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
  /** 預覽容器的固定寬度（px） */
  previewWidth?: number
  /** 隱藏 Code 區塊——用於不會被程式碼直接引用的 story（如頁面範本）。 */
  hideCode?: boolean
  /** 需要額外狀態或外層包裝的 story 用（例如 Dialog、Toast）。
   *  不傳的話預設就是 <Component {...fixedProps} {...values} />。 */
  Render?: React.ComponentType<{ values: Record<string, any> }>
  /** Code 區塊專用：把控制項的值換算成「實際傳給元件的 props」。
   *  只要 `Render` 會把控制值轉成 React node / 陣列 slot（leading、trailing、items…），
   *  就必須提供，否則 code 區塊只會印出控制項的原始字串，或整個漏掉那個 slot。
   *  回傳物件裡的 `children` 會被印成元件的子節點。 */
  codeProps?: (values: Record<string, any>) => Record<string, any>
  /** Code 區塊專用逃生門：直接回傳整段程式碼字串。
   *  給不是「渲染一個元件」的 API 用（例如 `useToast().show({...})`）。 */
  codeSnippet?: (values: Record<string, any>) => string
}

export interface StoryCategory {
  name: string
  stories: StoryDef[]
}

/** 側邊欄頂層可收合區塊，內含若干 category。 */
export interface StorySection {
  name: string
  categories: StoryCategory[]
}
