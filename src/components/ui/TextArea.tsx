import React, { useState, useRef, useCallback, useEffect, useImperativeHandle } from 'react'
import './TextArea.css'

interface TextAreaProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  /** inner-label：空且未對焦時 label 當佔位字，一對焦或有值就浮到上方 */
  variant?: 'default' | 'inner-label'
  status?: 'default' | 'error' | 'disabled'
  className?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, value, onChange, variant = 'default', status = 'default', className }, ref) => {
    const disabled = status === 'disabled'
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
      el.style.height = `${el.scrollHeight}px`
    }, [])

    useEffect(() => { autoGrow() }, [value, autoGrow])

    const wrapperClasses = [
      'ui-textarea',
      isInnerLabel && 'ui-textarea--inner-label',
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
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0) }}
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
