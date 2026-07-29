import React, { useState, useRef, useCallback, useEffect, useImperativeHandle } from 'react'
import { useFieldGroupHelpId } from './FieldGroupContext'
import './TextArea.css'

interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'disabled' | 'value' | 'onChange' | 'wrap'
  > {
  label?: string
  placeholder?: string
  value?: string
  /** 只給值，不給 event —— 要拿原生 event 請用 onInput */
  onChange?: (value: string) => void
  /** inner-label：空且未對焦時 label 當佔位字，一對焦或有值就浮到上方 */
  variant?: 'default' | 'inner-label'
  status?: 'default' | 'error' | 'disabled'
  /**
   * 原生 textarea 的 wrap 屬性，收斂成兩種：
   * `soft`（預設）自動折行；`off` 不折行，過長的一行改為橫向捲動。
   * 顯示終端機指令、金鑰這類「一行就是一行」的內容用 off。
   */
  wrap?: 'soft' | 'off'
  className?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      variant = 'default',
      status = 'default',
      wrap = 'soft',
      rows = 1,
      className,
      // 內部要用 focus 狀態驅動 inner-label，不能讓使用端的 handler 蓋掉，改為串接
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const disabled = status === 'disabled'
    const helpId = useFieldGroupHelpId()
    const [focused, setFocused] = useState(false)
    const internalRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => internalRef.current!)

    const [hasValue, setHasValue] = useState(() => Boolean(value))
    const isInnerLabel = variant === 'inner-label'
    const showShrunkLabel = isInnerLabel && (focused || hasValue || Boolean(value))

    const autoGrow = useCallback(() => {
      const el = internalRef.current
      if (!el) return
      el.style.height = 'auto'
      /*
       * wrap="off" 時橫向捲軸會佔掉 border-box 的高度，而 scrollHeight 不含它 ——
       * 只設 scrollHeight 會把最後一行裁掉（傳統捲軸的桌機瀏覽器才看得到，
       * macOS 的覆蓋式捲軸差值為 0）。border 為 none，所以這個差值就是捲軸高度。
       */
      const scrollbarHeight = el.offsetHeight - el.clientHeight
      el.style.height = `${el.scrollHeight + scrollbarHeight}px`
    }, [])

    // wrap 改變會讓折行方式與捲軸的有無跟著變，高度要重算
    useEffect(() => { autoGrow() }, [value, wrap, autoGrow])

    const wrapperClasses = [
      'ui-textarea',
      isInnerLabel && 'ui-textarea--inner-label',
      wrap === 'off' && 'ui-textarea--nowrap',
      status === 'error' && 'ui-textarea--error',
      disabled && 'ui-textarea--disabled',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div
        className={wrapperClasses}
        onClick={() => internalRef.current?.focus()}
      >
        {isInnerLabel && (
          <label
            className={`${showShrunkLabel ? 'text-body-small' : 'text-body-large'} ui-textarea__label ${showShrunkLabel ? '' : 'ui-textarea__label--placeholder'}`}
          >
            {label}
          </label>
        )}
        <textarea
          ref={internalRef}
          className="text-body-large ui-textarea__input"
          placeholder={isInnerLabel && !showShrunkLabel ? undefined : placeholder}
          value={value}
          onChange={(e) => { setHasValue(e.target.value.length > 0); onChange?.(e.target.value); autoGrow() }}
          onFocus={(e) => { setFocused(true); onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); onBlur?.(e) }}
          disabled={disabled}
          wrap={wrap}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={helpId}
          rows={rows}
          {...rest}
        />
      </div>
    )
  }
)
TextArea.displayName = 'TextArea'
export default TextArea
export type { TextAreaProps }
