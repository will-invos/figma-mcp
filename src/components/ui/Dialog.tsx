import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './index';
import './Dialog.css';

interface DialogAction {
  label: string;
  onClick: () => void;
  variant?: 'filled' | 'outline' | 'ghost' | 'text';
  colorType?: 'primary' | 'danger' | 'neutral';
}

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

  useEffect(() => {
    if (open && dialogRef.current) {
      const firstBtn = dialogRef.current.querySelector('button');
      firstBtn?.focus();
    }
  }, [open]);

  if (!open) return null;

  const isVertical = cta === '2-buttons-vertical';

  const renderActions = () => {
    if (isVertical) {
      // 直排：上面 filled primary/danger，下面固定 text primary
      return (
        <div className="ui-dialog__actions--vertical">
          {actions.map((action, i) => {
            const isTop = i === 0;
            return (
              <Button
                key={i}
                variant={isTop ? (action.variant ?? 'filled') : 'text'}
                colorType={isTop ? (action.colorType ?? 'primary') : 'primary'}
                size="large"
                onClick={action.onClick}
                text={action.label}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="ui-dialog__actions">
        {actions.map((action, i) => {
          // default：最後一顆是 primary，其餘 neutral
          // danger：第一顆是 danger，其餘 neutral
          let variant = action.variant;
          let colorType = action.colorType;

          if (!variant && !colorType) {
            if (type === 'danger') {
              variant = i === 0 ? 'filled' : 'filled';
              colorType = i === 0 ? 'danger' : 'neutral';
            } else {
              const isLast = i === actions.length - 1;
              variant = 'filled';
              colorType = isLast ? 'primary' : 'neutral';
            }
          }

          return (
            <Button
              key={i}
              variant={variant ?? 'filled'}
              colorType={colorType ?? 'primary'}
              size="large"
              onClick={action.onClick}
              text={action.label}
            />
          );
        })}
      </div>
    );
  };

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
