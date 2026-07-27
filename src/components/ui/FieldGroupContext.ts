import { createContext, useContext } from 'react'

/**
 * FieldGroup 把自己 helpText 的 id 傳下來，讓底下的輸入元件自動接上
 * aria-describedby —— 輔助科技才會把說明 / 錯誤訊息唸給使用者。
 */
const FieldGroupContext = createContext<{ helpId?: string }>({})

/** 輸入元件用：拿到所在 FieldGroup 的 helpText id（不在 FieldGroup 內則為 undefined） */
export function useFieldGroupHelpId(): string | undefined {
  return useContext(FieldGroupContext).helpId
}

export default FieldGroupContext
