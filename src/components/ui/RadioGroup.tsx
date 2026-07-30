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
  /** 沒有外層 FieldGroup label 時，用它替整組命名 */
  'aria-label'?: string;
  className?: string;
}

/**
 * 一組互斥選項。單顆 `<Radio>` 只管自己，跨選項的互斥、版面與整組錯誤態由這裡負責。
 *
 * `two-columns` 依 Figma 是**橫向排列**（1│2 換行 3│4），不是先填滿左欄；
 * 由 CSS grid 自動配置，所以這裡三種版面都只要平鋪選項。
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
