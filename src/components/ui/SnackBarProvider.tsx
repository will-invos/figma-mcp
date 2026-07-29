import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import SnackBar from './SnackBar'
import './SnackBar.css'

/** 與 Toast 一致 */
const DEFAULT_DURATION = 3000

interface SnackBarOptions {
  text: string
  /** 帶入對應的 leading icon；success / error 只有 icon 不同 */
  status?: 'success' | 'error'
  /** 覆寫 status 帶入的 leading icon */
  icon?: React.ReactNode
  /** none 只有文字；button 顯示動作文字；spinner 顯示載入中 */
  trailing?: 'none' | 'button' | 'spinner'
  buttonText?: string
  onButtonClick?: () => void
  /** 幾毫秒後自動關閉，預設 3000（與 Toast 相同） */
  duration?: number
}

interface SnackBarItem extends SnackBarOptions {
  id: string
}

interface SnackBarContextValue {
  /** 排進佇列；回傳的 id 可拿去 dismiss */
  show: (opts: SnackBarOptions) => string
  /** 關閉指定的一則；還在排隊中的也可以直接抽掉 */
  dismiss: (id: string) => void
}

const SnackBarContext = createContext<SnackBarContextValue | null>(null)

function useSnackBar(): SnackBarContextValue {
  const ctx = useContext(SnackBarContext)
  if (!ctx) {
    throw new Error('useSnackBar must be used within a SnackBarProvider')
  }
  return ctx
}

/**
 * 貼齊頁面底部的 snackbar 顯示機制。
 *
 * 一次只顯示一則，連續呼叫會**排隊**（不疊成兩條）—— 這是與 Toast 最大的差異，
 * Toast 是多則並存往下堆疊。因為顯示規則不同，兩者刻意不共用同一個 provider。
 *
 * 寬度對齊頁面欄寬（--ui-page-max-width），不是視窗 —— 桌機上頁面是固定欄寬置中，
 * 以視窗算寬會讓 snackbar 跑到頁面外面去。
 */
function SnackBarProvider({ children }: { children: React.ReactNode }) {
  // queue[0] 就是正在顯示的那一則
  const [queue, setQueue] = useState<SnackBarItem[]>([])
  const counterRef = useRef(0)

  const current = queue[0]

  const dismiss = useCallback((id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const show = useCallback((opts: SnackBarOptions): string => {
    counterRef.current += 1
    const id = String(counterRef.current)
    setQueue((prev) => [...prev, { ...opts, id }])
    return id
  }, [])

  // 計時器綁在「目前顯示的那一則」上，而不是 show 的時候就起算 ——
  // 否則排在後面的還沒出現就已經在倒數，一次呼叫多則時後面幾則會一閃而過。
  useEffect(() => {
    if (!current) return
    const timer = setTimeout(
      () => dismiss(current.id),
      current.duration ?? DEFAULT_DURATION
    )
    return () => clearTimeout(timer)
  }, [current, dismiss])

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss])

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {createPortal(
        /*
         * viewport 一直掛在 DOM 上並且是唯一的 live region —— live region 要先存在，
         * 之後塞進去的內容才會被朗讀；整塊連 role 一起插入的話朗讀不可靠。
         * 所以底下的 SnackBar 傳 role="none"，避免巢狀 live region 唸兩次。
         * pointer-events: none 讓沒有 snackbar 時不會擋住底層的點擊。
         */
        <div className="ui-snackbar-viewport" role="status" aria-live="polite">
          {current && (
            // key 讓相鄰兩則各自重新掛載，進場動畫才會重跑
            <SnackBar
              key={current.id}
              role="none"
              text={current.text}
              status={current.status}
              icon={current.icon}
              trailing={current.trailing}
              buttonText={current.buttonText}
              onButtonClick={() => {
                current.onButtonClick?.()
                dismiss(current.id)
              }}
            />
          )}
        </div>,
        document.body
      )}
    </SnackBarContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { SnackBarProvider, useSnackBar }
export type { SnackBarOptions, SnackBarItem, SnackBarContextValue }
