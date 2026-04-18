import React, { useState, useRef, useCallback, useEffect, useImperativeHandle } from 'react'
import './TextArea.css'

interface TextAreaProps {
  /** Inner label (shown when variant is 'inner-label'). */
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  /** 'default' = no label, 'inner-label' = floating label above value. */
  variant?: 'default' | 'inner-label'
  status?: 'default' | 'error'
  disabled?: boolean
  className?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, value, onChange, variant = 'default', status = 'default', disabled = false, className }, ref) => {
    const [focused, setFocused] = useState(false)
    const internalRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => internalRef.current!)

    const hasValue = Boolean(value)
    const isInnerLabel = variant === 'inner-label'
    const showShrunkLabel = isInnerLabel && (focused || hasValue)

    const autoGrow = useCallback(() => {
      const el = internalRef.current
      if (!el) return
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }, [])

    useEffect(() => { autoGrow() }, [value, autoGrow])

    const wrapperClasses = [
      'ui-textarea',
      isInnerLabel && 'ui-textarea--inner-label',
      focused && 'ui-textarea--focused',
      status === 'error' && !focused && 'ui-textarea--error',
      disabled && 'ui-textarea--disabled',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div
        className={wrapperClasses}
        onClick={() => internalRef.current?.focus()}
      >
        {isInnerLabel && (
          <label className={`ui-textarea__label ${showShrunkLabel ? '' : 'ui-textarea__label--placeholder'}`}>
            {label}
          </label>
        )}
        <textarea
          ref={internalRef}
          className="ui-textarea__input"
          placeholder={isInnerLabel && !showShrunkLabel ? undefined : placeholder}
          value={value}
          onChange={(e) => { onChange?.(e.target.value); autoGrow() }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          rows={1}
        />
      </div>
    )
  }
)
TextArea.displayName = 'TextArea'
export default TextArea
export type { TextAreaProps }
