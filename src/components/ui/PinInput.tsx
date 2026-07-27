import React, { useEffect, useId, useRef } from 'react'
import { useFieldGroupHelpId } from './FieldGroupContext'
import './PinInput.css'

interface PinInputProps {
  /** 驗證碼位數 */
  length?: number
  /** 受控值。長度可小於 length，表示尚未填滿 */
  value: string
  onChange: (value: string) => void
  /** 全部填滿時觸發 */
  onComplete?: (value: string) => void
  status?: 'default' | 'error' | 'disabled'
  autoFocus?: boolean
  /** 空格時顯示的佔位字（如 "0"）。不傳就完全空白 */
  placeholder?: string
  /** 提供時，會加在第一格 input 上，方便 form library 抓 */
  name?: string
  'aria-label'?: string
}

const PinInput = React.forwardRef<HTMLInputElement, PinInputProps>(
  (
    {
      length = 4,
      value,
      onChange,
      onComplete,
      status = 'default',
      autoFocus = false,
      placeholder,
      name,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const groupId = useId()
    const helpId = useFieldGroupHelpId()
    const isDisabled = status === 'disabled'
    const isError = status === 'error'

    const sanitized = (value || '').replace(/\D/g, '').slice(0, length)

    useEffect(() => {
      if (autoFocus) inputRefs.current[0]?.focus()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const focusCell = (i: number) => {
      const el = inputRefs.current[i]
      if (!el) return
      el.focus()
      el.select()
    }

    const commitValue = (newVal: string) => {
      const trimmed = newVal.slice(0, length)
      onChange(trimmed)
      if (trimmed.length === length && onComplete) onComplete(trimmed)
    }

    const handleChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, '')
      if (!raw) return

      // 判斷是「整串填入」還是「單格覆寫」：
      // - 自動填入整組驗證碼時，會一次進來且 raw.length === length
      // - 快速貼上會超過 2 字
      // - 在已有字的格子上重打，會收到 2 字（舊 + 新），取最後一個
      const isBulk = raw.length === length || raw.length > 2
      const next = isBulk
        ? (sanitized.slice(0, i) + raw).slice(0, length)
        : i < sanitized.length
          ? sanitized.slice(0, i) + raw.slice(-1) + sanitized.slice(i + 1)
          : (sanitized + raw.slice(-1)).slice(0, length)

      commitValue(next)
      const focusIdx = Math.min(next.length, length - 1)
      requestAnimationFrame(() => focusCell(focusIdx))
    }

    const handleKeyDown = (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (i < sanitized.length) {
          // 有字的格子：從這裡往後全部清掉，強制由左而右輸入、不留空格
          e.preventDefault()
          commitValue(sanitized.slice(0, i))
        } else if (i > 0) {
          // 空格子：退一格並清掉前一個
          e.preventDefault()
          commitValue(sanitized.slice(0, i - 1))
          requestAnimationFrame(() => focusCell(i - 1))
        }
      } else if (e.key === 'ArrowLeft' && i > 0) {
        e.preventDefault()
        focusCell(i - 1)
      } else if (e.key === 'ArrowRight' && i < length - 1) {
        e.preventDefault()
        focusCell(i + 1)
      }
    }

    const handlePaste = (i: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
      if (!pasted) return
      const next = (sanitized.slice(0, i) + pasted).slice(0, length)
      commitValue(next)
      const focusIdx = Math.min(next.length, length - 1)
      requestAnimationFrame(() => focusCell(focusIdx))
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select()
    }

    return (
      <div
        className="ui-pin-input"
        role="group"
        aria-label={ariaLabel || `${length}-digit code`}
        aria-describedby={helpId}
      >
        {Array.from({ length }, (_, i) => {
          const cellClass = [
            'ui-pin-input__cell',
            'text-heading-large',
            isError && 'ui-pin-input__cell--error',
            isDisabled && 'ui-pin-input__cell--disabled',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el
                if (i === 0) {
                  if (typeof ref === 'function') ref(el)
                  else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
                }
              }}
              id={`${groupId}-${i}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              className={cellClass}
              value={sanitized[i] ?? ''}
              placeholder={placeholder}
              onChange={handleChange(i)}
              onKeyDown={handleKeyDown(i)}
              onPaste={handlePaste(i)}
              onFocus={handleFocus}
              disabled={isDisabled}
              aria-invalid={isError || undefined}
              aria-label={`Digit ${i + 1} of ${length}`}
              name={name && i === 0 ? name : undefined}
            />
          )
        })}
      </div>
    )
  }
)

PinInput.displayName = 'PinInput'

export default PinInput
export type { PinInputProps }
