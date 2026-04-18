import type { PropDef } from './types'
import './Controls.css'

interface ControlsProps {
  propDefs: Record<string, PropDef>
  values: Record<string, any>
  onChange: (key: string, value: any) => void
  onReset: () => void
}

export default function Controls({ propDefs, values, onChange, onReset }: ControlsProps) {
  const entries = Object.entries(propDefs)

  return (
    <aside className="cs-controls">
      <h2 className="cs-controls__title">Controls</h2>

      {entries.map(([key, def]) => {
        switch (def.type) {
          case 'enum':
            return (
              <div key={key} className="cs-controls__field">
                <label className="cs-controls__label">{key}</label>
                <select
                  className="cs-controls__select"
                  value={values[key] ?? def.default}
                  onChange={(e) => onChange(key, e.target.value)}
                >
                  {def.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )

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
              <div key={key} className="cs-controls__field">
                <label className="cs-controls__label">{key}</label>
                <input
                  type="number"
                  className="cs-controls__input"
                  value={values[key] ?? def.default}
                  min={def.min}
                  max={def.max}
                  step={def.step}
                  onChange={(e) => onChange(key, Number(e.target.value))}
                />
              </div>
            )

          default:
            return null
        }
      })}

      <button type="button" className="cs-controls__reset" onClick={onReset}>
        Reset to defaults
      </button>
    </aside>
  )
}
