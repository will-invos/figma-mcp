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
  /** '2-buttons' = row, '2-buttons-straight' = column (filled + text), '1-button' = single */
  cta?: '2-buttons' | '2-buttons-straight' | '1-button';
  title: string;
  description?: string;
  actions: DialogAction[];
  image?: React.ReactNode;
  extraContent?: React.ReactNode;
}

function Dialog({
  open,
  onClose,
  type = 'default',
  cta = '2-buttons',
  title,
  description,
  actions,
  image,
  extraContent,
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

  const isStraight = cta === '2-buttons-straight';

  const renderActions = () => {
    if (isStraight) {
      // Column layout: first = filled primary, second = text primary
      return (
        <div className="ui-dialog__actions--straight">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={i === 0 ? (action.variant ?? 'filled') : (action.variant ?? 'text')}
              colorType={action.colorType ?? 'primary'}
              size="large"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      );
    }

    // Row layout (default): buttons are flex-1 equal width
    return (
      <div className="ui-dialog__actions">
        {actions.map((action, i) => {
          // Default type: first = neutral, last = filled primary
          // Danger type: first = filled danger, last = neutral
          let variant = action.variant;
          let colorType = action.colorType;

          if (!variant && !colorType) {
            if (type === 'danger') {
              variant = i === 0 ? 'filled' : 'filled';
              colorType = i === 0 ? 'danger' : 'neutral';
            } else {
              // Default: last button is primary filled, others are neutral filled
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
            >
              {action.label}
            </Button>
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
            <h2 id="ui-dialog-title" className="ui-dialog__title">{title}</h2>
            {description && <p className="ui-dialog__description">{description}</p>}
          </div>
          {extraContent}
        </div>
        <div className="ui-dialog__footer">
          {renderActions()}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Dialog;
export type { DialogProps, DialogAction };
