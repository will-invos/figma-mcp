import React, { useId } from 'react';
import Radio from './Radio';
import './RadioGroup.css';

interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioGroupOption[];
  /** 目前選取的 value；不傳即為未選 */
  value?: string;
  onChange?: (value: string) => void;
  /** 版面（對齊 Figma「Radio group」的三種 Type） */
  layout?: 'column' | 'two-columns' | 'side-by-side';
  /** 錯誤態掛在整組上，組內每一顆都會轉紅 —— 與 FieldGroup 的 status 同一層級 */
  status?: 'default' | 'error';
  disabled?: boolean;
  /** 同組 radio 的 name；未傳自動產生 */
  name?: string;
  /** 沒有外層 FieldGroupHeader 時，用它替整組命名 */
  'aria-label'?: string;
  className?: string;
}

/**
 * 一組互斥選項。單顆 `<Radio>` 只管自己，跨選項的互斥、版面與整組錯誤態由這裡負責。
 *
 * `two-columns` 會把選項左右均分成兩欄、**先填滿左欄再填右欄**（與 Figma 一致），
 * 不是左右交錯。
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      layout = 'column',
      status = 'default',
      disabled = false,
      name,
      className,
      ...rest
    },
    ref
  ) => {
    const autoName = useId();
    const groupName = name ?? autoName;

    const classes = [
      'ui-radio-group',
      `ui-radio-group--${layout}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderOption = (option: RadioGroupOption) => (
      <Radio
        key={option.value}
        name={groupName}
        value={option.value}
        checked={value === option.value}
        disabled={disabled || option.disabled}
        status={status}
        description={option.description}
        onChange={(checked) => checked && onChange?.(option.value)}
      >
        {option.label}
      </Radio>
    );

    // 兩欄：先填滿左欄再填右欄，奇數個時左欄多一個
    if (layout === 'two-columns') {
      const split = Math.ceil(options.length / 2);
      return (
        <div ref={ref} className={classes} role="radiogroup" {...rest}>
          <div className="ui-radio-group__column">{options.slice(0, split).map(renderOption)}</div>
          <div className="ui-radio-group__column">{options.slice(split).map(renderOption)}</div>
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} role="radiogroup" {...rest}>
        {options.map(renderOption)}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
export type { RadioGroupProps, RadioGroupOption };
