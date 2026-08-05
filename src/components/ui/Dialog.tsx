import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './index';
import type { ButtonStyleProps } from './Button';
import { useScrollLock } from './scrollLock';
import './Dialog.css';

/**
 * Dialog 動作就是一顆 Button，配色沿用 Button 的 Style × Type 限制。
 * 非 filled 的三種樣式在設計上只用 primary，故此處收斂得比 Button 更窄。
 */
type DialogAction = {
  label: string;
  onClick: () => void;
  /**
   * 顯示 spinner 並鎖住這顆按鈕（行為同 Button 的 loading）。
   * 只要有任一 action 在 loading，點 overlay 與按 Esc 都不會關閉 dialog ——
   * 否則使用者仍能在請求進行中把 dialog 關掉，剛填的內容一併消失。
   */
  loading?: boolean;
  disabled?: boolean;
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
  /**
   * portal 目標，預設 document.body。
   *
   * 兩個用途：讓 dialog 跟著某個容器的主題走；以及讓它落在使用端能一起停用的節點內 ——
   * 想「整頁不可操作」時對頁面根節點加 `inert`，預設 portal 到 body 的 dialog 會落在
   * 停用範圍外，變成可互動的圖層浮在阻擋層上。傳入 container 就不會有這個問題。
   * overlay 仍是 position: fixed，所以傳 container **不會改變視覺定位**。
   */
  container?: Element;
  /**
   * 停用整個 dialog 的互動（含 overlay 點擊關閉、Esc、Tab 聚焦），內容仍留在畫面上。
   * 不想改 portal 結構、又要在請求進行中鎖住畫面時用這個。
   */
  inert?: boolean;
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
  inert = false,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // 有 action 在進行中就不讓關 —— 關掉的話使用者剛填的內容會一起消失
  const busy = actions.some((action) => action.loading);
  // inert 只擋得住指標與焦點，document 上的 keydown 照樣會進來，所以要另外擋
  const locked = inert || busy;

  // 開啟期間鎖住背景頁面捲動 —— overlay 擋得住點擊，但擋不住捲動穿透
  useScrollLock(open);

  useEffect(() => {
    if (!open || locked) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, locked, onClose]);

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
          loading={action.loading}
          // 有一顆在 loading 時其餘按鈕一併鎖住，避免按下第二個請求
          disabled={action.disabled || (busy && !action.loading)}
          text={action.label}
        />
      ))}
    </div>
  );

  return createPortal(
    <div
      className="ui-dialog-overlay"
      inert={inert || undefined}
      onClick={locked ? undefined : onClose}
    >
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
