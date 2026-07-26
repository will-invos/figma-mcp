import { useEffect, useState } from 'react'
import { isPropVisible, getEnumOptions, type PropDef } from './types'
import './Controls.css'

interface ControlsProps {
  propDefs: Record<string, PropDef>
  values: Record<string, any>
  onChange: (key: string, value: any) => void
  onReset: () => void
  open: boolean
  onToggle: () => void
}

/**
 * 數字欄位要自己留一份字串暫存。直接用 <input type="number"> 的話，React 比對
 * DOM value 與 prop value 時是寬鬆數值比較（"01" == 1），輸入後就不會再改寫 DOM，
 * 導致前面多打的 0 一直留在畫面上。
 */
function NumberField({
  name, def, value, onCommit,
}: {
  name: string
  def: Extract<PropDef, { type: 'number' }>
  value: number
  onCommit: (n: number) => void
}) {
  const [raw, setRaw] = useState<string>(() => String(value))

  // 只在外部 value 真的變了才同步（切換 story、重設、連動控制項）。
  // 不能把 raw 放進依賴：使用者把欄位清空成 "" 時，effect 會立刻把舊數字填回去。
  useEffect(() => {
    setRaw(String(value))
  }, [value])

  return (
    <div className="cs-controls__field">
      <label className="cs-controls__label">{name}</label>
      <input
        type="text"
        inputMode="numeric"
        className="cs-controls__input"
        value={raw}
        onChange={(e) => {
          const next = e.target.value.replace(/[^\d-]/g, '')
          setRaw(next)
          if (next === '' || next === '-') return
          const n = Number(next)
          if (!Number.isNaN(n)) onCommit(n)
        }}
        onBlur={() => {
          if (raw === '' || Number.isNaN(Number(raw))) setRaw(String(value))
          else setRaw(String(Number(raw)))
        }}
        aria-valuemin={def.min}
        aria-valuemax={def.max}
      />
    </div>
  )
}

export default function Controls({ propDefs, values, onChange, onReset, open, onToggle }: ControlsProps) {
  const entries = Object.entries(propDefs)
  const className = ['cs-controls', open && 'cs-controls--open'].filter(Boolean).join(' ')

  return (
    <aside className={className}>
      <button
        type="button"
        className="cs-controls__toggle"
        onClick={onToggle}
        aria-label={open ? 'Close controls' : 'Open controls'}
        aria-expanded={open}
      >
        <i className={open ? 'icon-cross' : 'icon-cog-6-tooth'} aria-hidden="true" />
      </button>
      <div className="cs-controls__content">
      <h2 className="cs-controls__title">Controls</h2>

      {entries.map(([key, def]) => {
        if (!isPropVisible(def, values)) return null
        switch (def.type) {
          case 'enum': {
            const visibleOptions = getEnumOptions(def, values)
            return (
              <div key={key} className="cs-controls__field">
                <label className="cs-controls__label">{key}</label>
                <select
                  className="cs-controls__select"
                  value={values[key] ?? def.default}
                  onChange={(e) => onChange(key, e.target.value)}
                >
                  {visibleOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )
          }

          case 'boolean':
            return (
              <div key={key} className="cs-controls__checkbox-row">
                <input
                  type="checkbox"
                  className="cs-controls__checkbox"
                  id={`ctrl-${key}`}
                  checked={values[key] ?? def.default}
                  onChange={(e) => onChange(key, e.target.checked)}
                />
                <label className="cs-controls__checkbox-label" htmlFor={`ctrl-${key}`}>{key}</label>
              </div>
            )

          case 'string':
            return (
              <div key={key} className="cs-controls__field">
                <label className="cs-controls__label">{key}</label>
                <input
                  type="text"
                  className="cs-controls__input"
                  value={values[key] ?? def.default}
                  onChange={(e) => onChange(key, e.target.value)}
                />
              </div>
            )

          case 'number':
            return (
              <NumberField
                key={key}
                name={key}
                def={def}
                value={values[key] ?? def.default}
                onCommit={(n) => onChange(key, n)}
              />
            )

          default:
            return null
        }
      })}

      <button type="button" className="cs-controls__reset" onClick={onReset}>
        Reset to defaults
      </button>
      </div>
    </aside>
  )
}
