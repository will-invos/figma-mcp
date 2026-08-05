import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import Spinner from './Spinner'
import { useScrollLock } from './scrollLock'
import './Toast.css'

interface ToastAction {
  label: string
  onClick: () => void
}

interface ToastMessage {
  id: string
  message?: string
  /** rich 顯示 icon + 文字 + 選用按鈕；loading 只有 spinner */
  type?: 'rich' | 'loading'
  /** rich 專用；不傳會用 Spinner 當預設 */
  icon?: React.ReactNode
  /** rich 專用 */
  action?: ToastAction
  /** 幾毫秒後自動關閉；loading 永不自動關閉 */
  duration?: number
  /**
   * 顯示期間擋住底層的點擊、拖曳與捲動，預設開啟（rich / loading 皆同）。
   * Toast 的語意就是「正在處理，先別動」，希望使用者停在當前頁面 ——
   * 純告知結果請改用 SnackBar。顯式傳 false 可放行底層操作。
   */
  blocking?: boolean
}

/** blocking 沒指定時的預設：一律擋 */
function resolveBlocking(toast: ToastMessage): boolean {
  return toast.blocking ?? true
}

interface ToastContextValue {
  show: (opts: Omit<ToastMessage, 'id'>) => string
  /** 把 patch 併進既有 toast 並重新計時；id 已消失就什麼都不做 */
  update: (id: string, patch: Partial<Omit<ToastMessage, 'id'>>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const counterRef = useRef(0)
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  useEffect(() => {
    const timers = timersRef.current
    return () => { timers.forEach((t) => clearTimeout(t)); timers.clear() }
  }, [])

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer) { clearTimeout(timer); timersRef.current.delete(id) }
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((opts: Omit<ToastMessage, 'id'>): string => {
    counterRef.current += 1
    const id = String(counterRef.current)
    const toast: ToastMessage = { type: 'rich', ...opts, id }

    setToasts((prev) => [...prev, toast])

    if (toast.type !== 'loading') {
      const duration = toast.duration ?? 3000
      const timer = setTimeout(() => { timersRef.current.delete(id); dismiss(id) }, duration)
      timersRef.current.set(id, timer)
    }

    return id
  }, [dismiss])

  const update = useCallback(
    (id: string, patch: Partial<Omit<ToastMessage, 'id'>>) => {
      let captured: ToastMessage | null = null
      setToasts((prev) => {
        const idx = prev.findIndex((t) => t.id === id)
        if (idx === -1) return prev
        const merged: ToastMessage = { ...prev[idx], ...patch, id }
        captured = merged
        const next = [...prev]
        next[idx] = merged
        return next
      })

      if (!captured) return

      // type / duration 可能被改掉，計時器要重新起算
      const existing = timersRef.current.get(id)
      if (existing) { clearTimeout(existing); timersRef.current.delete(id) }
      const merged: ToastMessage = captured
      if (merged.type !== 'loading') {
        const duration = merged.duration ?? 3000
        const timer = setTimeout(() => { timersRef.current.delete(id); dismiss(id) }, duration)
        timersRef.current.set(id, timer)
      }
    },
    [dismiss]
  )

  const value = useMemo(() => ({ show, update, dismiss }), [show, update, dismiss])

  // blocking toast 顯示期間鎖住背景頁面捲動 —— scrim 的 touch-action 擋得住觸控拖曳，
  // 但擋不住鍵盤 / 滾輪捲動
  useScrollLock(toasts.some(resolveBlocking))

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <>
          {/* 多個 toast 疊放時取聯集：只要有一個要擋，就出一層 scrim（不是每個 toast 各一層）。
              scrim 排在 container 前面，兩者同 z-index，所以 toast 一定畫在 scrim 之上。 */}
          {toasts.some(resolveBlocking) && (
            <div className="ui-toast-scrim" aria-hidden="true" />
          )}
          <div className="ui-toast-container" role="status" aria-live="polite">
            {toasts.map((toast) => (
              <div key={toast.id} className={`ui-toast ui-toast--${toast.type ?? 'rich'}`}>
                {toast.type === 'loading' ? (
                  <Spinner size="xxlarge" color="inverse" />
                ) : (
                  <>
                    <div className="ui-toast__body">
                      <span className="ui-toast__icon">
                        {toast.icon ?? <Spinner size="xxlarge" color="inverse" />}
                      </span>
                      {toast.message && (
                        <p className="text-body-large ui-toast__text">{toast.message}</p>
                      )}
                    </div>
                    {toast.action && (
                      <Button
                        variant="text"
                        colorType="inverse"
                        size="large"
                        className="ui-toast__action"
                        onClick={() => {
                          toast.action!.onClick()
                          dismiss(toast.id)
                        }}
                        text={toast.action.label}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { ToastProvider, useToast }
export type { ToastMessage, ToastContextValue, ToastAction }
