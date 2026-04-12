import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import './Dialog.css';

interface DialogAction {
  label: string;
  onClick: () => void;
  colorType?: 'primary' | 'danger' | 'neutral';
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  type?: 'default' | 'danger';
  title: string;
  description?: string;
  actions: DialogAction[];
}

function Dialog({ open, onClose, type = 'default', title, description, actions }: DialogProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="ui-dialog-overlay" onClick={onClose}>
      <div className="ui-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 className="ui-dialog__title">{title}</h2>
        {description && <p className="ui-dialog__description">{description}</p>}
        <div className="ui-dialog__actions">
          {actions.map((action, index) => {
            const isLast = index === actions.length - 1;
            const variant = isLast ? 'filled' : 'ghost';
            let resolvedColorType = action.colorType;
            if (isLast && !action.colorType && type === 'danger') {
              resolvedColorType = 'danger';
            }
            return (
              <Button
                key={index}
                ref={index === 0 ? firstButtonRef : undefined}
                variant={variant}
                colorType={resolvedColorType ?? 'primary'}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Dialog;
export type { DialogProps, DialogAction };
