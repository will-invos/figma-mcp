import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './index';
import type { ButtonStyleProps } from './Button';
import './Dialog.css';

/**
 * Dialog 動作就是一顆 Button，配色沿用 Button 的 Style × Type 限制。
 * 非 filled 的三種樣式在設計上只用 primary，故此處收斂得比 Button 更窄。
 */
type DialogAction = {
  label: string;
  onClick: () => void;
} & (
  | { variant?: 'filled'; colorType?: 'primary' | 'neutral' | 'danger' }
  | { variant: 'outline' | 'ghost' | 'text'; colorType?: 'primary' }
);

interface DialogProps {
  open: boolean;
  onClose: () => void;
  type?: 'default' | 'danger';
  /** horizontal 橫排；vertical 直排（上 filled、下 text）；1-button 只有一顆 */
  cta?: '2-buttons-horizontal' | '2-buttons-vertical' | '1-button';
  title: string;
  description?: string;
  actions: DialogAction[];
  image?: React.ReactNode;
  extraContent?: React.ReactNode;
  /** portal 目標，預設 document.body；想讓 dialog 跟著某個容器的主題與範圍走就傳它 */
  container?: Element;
}

function Dialog({
  open,
  onClose,
  type = 'default',
  cta = '2-buttons-horizontal',
  title,
  description,
  actions,
  image,
  extraContent,
  container,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // 開啟時把 focus 移進 dialog，關閉（或整個卸載）時還給原本的元素 ——
  // 否則鍵盤使用者關掉 dialog 後 focus 會掉回 <body>，得從頭 Tab 一次。
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector('button')?.focus();
    return () => {
      const target = restoreFocusRef.current;
      restoreFocusRef.current = null;
      // 觸發元素可能已隨關閉一起卸載，此時不搶 focus
      if (target?.isConnected) target.focus();
    };
  }, [open]);

  if (!open) return null;

  const isVertical = cta === '2-buttons-vertical';

  /**
   * 整組回傳而不是分別回傳 variant 與 colorType —— 拆成兩個值會讓型別失去兩者的搭配關係，
   * 就無法在編譯期擋掉 Figma 沒有的組合。
   */
  const resolveActionStyle = (action: DialogAction, i: number): ButtonStyleProps => {
    // 直排：下面那顆固定 text primary，不吃 action 自己的指定
    if (isVertical && i > 0) return { variant: 'text', colorType: 'primary' };

    // 非 filled 樣式在 dialog 只用 primary
    switch (action.variant) {
      case 'outline': return { variant: 'outline', colorType: 'primary' };
      case 'ghost': return { variant: 'ghost', colorType: 'primary' };
      case 'text': return { variant: 'text', colorType: 'primary' };
    }

    if (action.colorType) return { variant: 'filled', colorType: action.colorType };
    if (isVertical) return { variant: 'filled', colorType: 'primary' };

    // 未指定時：danger 版型第一顆 danger、default 版型最後一顆 primary，其餘一律 neutral
    return {
      variant: 'filled',
      colorType:
        type === 'danger'
          ? i === 0 ? 'danger' : 'neutral'
          : i === actions.length - 1 ? 'primary' : 'neutral',
    };
  };

  const renderActions = () => (
    <div className={isVertical ? 'ui-dialog__actions--vertical' : 'ui-dialog__actions'}>
      {actions.map((action, i) => (
        <Button
          key={i}
          {...resolveActionStyle(action, i)}
          size="large"
          onClick={action.onClick}
          text={action.label}
        />
      ))}
    </div>
  );

  return createPortal(
    <div className="ui-dialog-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="ui-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ui-dialog__body">
          {image && <div className="ui-dialog__image">{image}</div>}
          <div className="ui-dialog__content">
            <h2 id="ui-dialog-title" className="text-heading-large ui-dialog__title">{title}</h2>
            {description && <p className="text-body-large ui-dialog__description">{description}</p>}
          </div>
          {extraContent && <div className="ui-dialog__extra">{extraContent}</div>}
        </div>
        <div className="ui-dialog__footer">
          {renderActions()}
        </div>
      </div>
    </div>,
    container ?? document.body
  );
}

Dialog.displayName = 'Dialog';

export default Dialog;
export type { DialogProps, DialogAction };
