import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import Spinner from './Spinner'
import './Toast.css'

interface ToastAction {
  label: string
  onClick: () => void
}

interface ToastMessage {
  id: string
  /** Text shown below icon (Rich variant). */
  message?: string
  /** 'rich' (default) shows icon + text + optional button; 'loading' shows just a spinner. */
  type?: 'rich' | 'loading'
  /** Optional icon shown above the text (Rich only). Defaults to a Spinner if omitted. */
  icon?: React.ReactNode
  /** Optional action button shown below the text (Rich only). */
  action?: ToastAction
  /** Auto-dismiss after this many ms. Loading toasts never auto-dismiss. */
  duration?: number
}

interface ToastContextValue {
  show: (opts: Omit<ToastMessage, 'id'>) => string
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

  // Clear all timers on unmount
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

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="ui-toast-container">
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
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export { ToastProvider, useToast }
export type { ToastMessage, ToastContextValue, ToastAction }
