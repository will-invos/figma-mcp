import React, { createContext, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Spinner from './Spinner';
import './Toast.css';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'rich' | 'loading';
  duration?: number;
}

interface ToastContextValue {
  show: (opts: Omit<ToastMessage, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const counterRef = useRef(0);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const show = (opts: Omit<ToastMessage, 'id'>): string => {
    counterRef.current += 1;
    const id = String(counterRef.current);
    const toast: ToastMessage = { ...opts, id };

    setToasts((prev) => [...prev, toast]);

    if (opts.type !== 'loading') {
      const duration = opts.duration ?? 3000;
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  };

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      {createPortal(
        <div className="ui-toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="ui-toast">
              {toast.type === 'loading' && (
                <Spinner size="small" color="white" />
              )}
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export { ToastProvider, useToast };
export type { ToastMessage, ToastContextValue };
