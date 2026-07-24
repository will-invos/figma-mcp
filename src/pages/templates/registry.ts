import type { ComponentType } from 'react'
import BlankTemplate from './BlankTemplate'
import ListTemplate from './ListTemplate'
import FormTemplate from './FormTemplate'
import DetailTemplate from './DetailTemplate'

export interface TemplateDef {
  /** hash 路由用的 slug：#/templates/<slug> */
  slug: string
  /** 顯示名稱 */
  name: string
  /** 一句話說明用途 */
  description: string
  /** 對應的原始碼檔名（方便複製） */
  file: string
  Component: ComponentType<{ onBack?: () => void }>
}

export const templates: TemplateDef[] = [
  {
    slug: 'blank',
    name: '基本空白頁',
    description: 'NavigationBar + 內容區 + TabBar 的最小骨架，所有頁面的起手式。',
    file: 'BlankTemplate.tsx',
    Component: BlankTemplate,
  },
  {
    slug: 'list',
    name: '列表頁',
    description: 'large 標題 + 分組 ListItem 清單 + TabBar，適合設定 / 選單。',
    file: 'ListTemplate.tsx',
    Component: ListTemplate,
  },
  {
    slug: 'form',
    name: '表單頁',
    description: 'FieldGroup 欄位 + 底部送出鈕，適合新增 / 編輯資料。',
    file: 'FormTemplate.tsx',
    Component: FormTemplate,
  },
  {
    slug: 'detail',
    name: '詳情 / 內容頁',
    description: 'PageNavigation + 可捲動明細，適合單筆資料細節。',
    file: 'DetailTemplate.tsx',
    Component: DetailTemplate,
  },
]

export const templateMap: Record<string, TemplateDef> = Object.fromEntries(
  templates.map((t) => [t.slug, t])
)
