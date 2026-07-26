import { Fragment, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { StoryDef } from './types'
import { isPropVisible } from './types'

/** 超過這個寬度就換行展開（以字元數估算，code block 是等寬字型）。 */
const MAX_LINE = 76
const IND = '  '

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/

function displayNameOf(type: unknown): string {
  if (type === Fragment) return ''
  if (typeof type === 'string') return type
  const c = type as { displayName?: string; name?: string } | null
  return c?.displayName || c?.name || 'Component'
}

/** 物件 / 陣列裡的字串用單引號（JS 慣例）；JSX 屬性用雙引號。 */
function jsString(value: string): string {
  return value.includes("'")
    ? `"${value.replace(/"/g, '\\"')}"`
    : `'${value.replace(/\\/g, '\\\\')}'`
}

function attrString(value: string): string {
  return `"${value.replace(/"/g, '&quot;')}"`
}

/** 把值印成 JS 運算式原始碼。回傳 null 表示無法序列化 → 略過。 */
export function printExpression(value: unknown, indent: string): string | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'string') return jsString(value)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  // 事件處理器在 snippet 裡沒有意義，用空 arrow 佔位（只出現在物件/陣列內，
  // 頂層屬性由 printAttribute 直接略過）。
  if (typeof value === 'function') return '() => {}'
  if (isValidElement(value)) return printElement(value, indent)
  if (Array.isArray(value)) return printArray(value, indent)
  if (typeof value === 'object') return printObject(value as Record<string, unknown>, indent)
  return null
}

function printArray(items: unknown[], indent: string): string {
  const parts = items
    .map((item) => printExpression(item, indent + IND))
    .filter((part): part is string => part !== null)
  if (parts.length === 0) return '[]'
  const inline = `[${parts.join(', ')}]`
  if (!inline.includes('\n') && indent.length + inline.length <= MAX_LINE) return inline
  return `[\n${parts.map((p) => indent + IND + p).join(',\n')},\n${indent}]`
}

function printObject(obj: Record<string, unknown>, indent: string): string {
  const parts: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const printed = printExpression(value, indent + IND)
    if (printed === null) continue
    parts.push(`${IDENTIFIER.test(key) ? key : jsString(key)}: ${printed}`)
  }
  if (parts.length === 0) return '{}'
  const inline = `{ ${parts.join(', ')} }`
  if (!inline.includes('\n') && indent.length + inline.length <= MAX_LINE) return inline
  return `{\n${parts.map((p) => indent + IND + p).join(',\n')},\n${indent}}`
}

/** 單一 JSX 屬性；`indent` 是這個屬性所在行的縮排。回傳 null 表示不該出現在 snippet 裡。 */
export function printAttribute(key: string, value: unknown, indent: string): string | null {
  if (key === 'key' || key === 'ref') return null
  if (value === undefined || value === null) return null
  if (typeof value === 'function') return null
  if (typeof value === 'string') return `${key}=${attrString(value)}`
  if (typeof value === 'boolean') return value ? key : `${key}={false}`
  // 陣列 / 物件的 `[` `{` 慣例上跟在 `prop={` 後面同一行；JSX 節點則把 {} 拉開，
  // 避免 `prop={<Foo` 這種讀不出層級的排版。
  const isElement = isValidElement(value)
  const expr = printExpression(value, isElement ? indent + IND : indent)
  if (expr === null) return null
  if (isElement && expr.includes('\n')) return `${key}={\n${indent + IND}${expr}\n${indent}}`
  return `${key}={${expr}}`
}

function printChildren(children: ReactNode, indent: string): string[] {
  const out: string[] = []
  const walk = (node: ReactNode) => {
    if (node === null || node === undefined || typeof node === 'boolean') return
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (typeof node === 'string') {
      const text = node.trim()
      if (text) out.push(text)
      return
    }
    if (typeof node === 'number') {
      out.push(String(node))
      return
    }
    if (isValidElement(node)) out.push(printElement(node, indent))
  }
  walk(children)
  return out
}

function printElement(element: ReactElement, indent: string): string {
  const { children, ...rest } = (element.props ?? {}) as Record<string, unknown>
  return printJsx(displayNameOf(element.type), rest, children as ReactNode, indent)
}

/** 組出一段 JSX。`name` 為空字串代表 Fragment（`<>…</>`）。 */
export function printJsx(
  name: string,
  props: Record<string, unknown>,
  children: ReactNode,
  indent: string
): string {
  const attrs: string[] = []
  for (const [key, value] of Object.entries(props)) {
    const attr = printAttribute(key, value, indent + IND)
    if (attr) attrs.push(attr)
  }
  const kids = printChildren(children, indent + IND)

  if (name === '') {
    // Fragment 沒有屬性可印；沒小孩就整段捨棄
    if (kids.length === 0) return ''
    return `<>\n${kids.map((k) => indent + IND + k).join('\n')}\n${indent}</>`
  }

  const openInline = attrs.length ? `<${name} ${attrs.join(' ')}` : `<${name}`
  const fitsInline =
    !openInline.includes('\n') && indent.length + openInline.length + 3 <= MAX_LINE

  const open = fitsInline
    ? openInline
    : `<${name}\n${attrs.map((a) => indent + IND + a).join('\n')}\n${indent}`

  if (kids.length === 0) return fitsInline ? `${open} />` : `${open}/>`

  // 單一短子節點（多半是文字）就整段收成一行
  if (fitsInline && kids.length === 1 && !kids[0].includes('\n')) {
    const oneLine = `${openInline}>${kids[0]}</${name}>`
    if (indent.length + oneLine.length <= MAX_LINE) return oneLine
  }

  return `${open}>\n${kids.map((k) => indent + IND + k).join('\n')}\n${indent}</${name}>`
}

/** 依目前控制項的值產生 story 的 code snippet。
 *
 *  props 取自 `codeProps`（若有）換算後的實際 props，否則直接用 `fixedProps` + 控制值。
 *  省略規則：被 `when` 藏起來的不印；設定型 prop（enum / boolean）仍是預設值就省略
 *  （與元件自身預設相同）；內容型 prop（string / number）與 node slot 一律印出來，
 *  否則複製的程式碼渲染不出東西（例如 `<Button />` 是空的）。 */
export function buildStorySnippet(story: StoryDef, values: Record<string, any>): string {
  if (story.codeSnippet) return story.codeSnippet(values)

  const propsForCode = story.codeProps
    ? { ...story.fixedProps, ...story.codeProps(values) }
    : { ...story.fixedProps, ...values }

  const c = story.component as unknown as { displayName?: string; name?: string }
  const componentName =
    (typeof story.component === 'string' ? story.component : c?.displayName || c?.name) ||
    story.name

  const { children, ...rest } = propsForCode
  const attrs: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(rest)) {
    // 頂層空字串＝控制項沒填，別印（巢狀元素的 alt="" 之類仍會保留）
    if (val === '') continue
    const def = story.props[key]
    if (def && !isPropVisible(def, values)) continue
    const isContent = def?.required || def?.type === 'string' || def?.type === 'number'
    if (def && !isContent && val === def.default) continue
    attrs[key] = val
  }

  return printJsx(componentName, attrs, children as ReactNode, '')
}
