import React from 'react';
import './CategoryTag.css';

/**
 * 發票分類與屬性標籤。分成兩群：
 * - 消費分類（shopping…other）：實色底 + 反白字，色票走 `--color-background-category-*`
 * - 發票屬性（donation / prize / manual / carrier / scanner）：各有專屬底色
 *
 * 文案與圖示由 category 決定，不開放覆寫 —— 全 App 的分類標籤必須一致。
 */
type CategoryTagCategory =
  | 'shopping'
  | 'food'
  | 'transportation'
  | 'entertainment'
  | 'life'
  | 'other'
  | 'donation'
  | 'prize'
  | 'manual'
  | 'carrier'
  | 'scanner';

interface CategoryTagProps {
  category: CategoryTagCategory;
  size?: 'medium' | 'small';
  /** 關閉圖示只留文字；預設顯示 */
  showIcon?: boolean;
  className?: string;
}

/** category → 固定的 zh-TW 文案與圖示（對齊 Figma「Category tag」） */
const CATEGORY_META: Record<CategoryTagCategory, { label: string; icon: string }> = {
  shopping: { label: '購物', icon: 'icon-shopping-cart-filled' },
  food: { label: '餐飲', icon: 'icon-tableware-filled' },
  transportation: { label: '交通', icon: 'icon-car-filled' },
  entertainment: { label: '娛樂', icon: 'icon-gamepad-filled' },
  life: { label: '居家', icon: 'icon-home-filled' },
  other: { label: '其他', icon: 'icon-document-filled' },
  donation: { label: '捐贈', icon: 'icon-donation-filled' },
  prize: { label: '中獎', icon: 'icon-coin-filled' },
  manual: { label: '手動', icon: 'icon-pencil-filled' },
  carrier: { label: '載具', icon: 'icon-barcode' },
  scanner: { label: '掃描', icon: 'icon-scanner-filled' },
};

const CategoryTag = React.forwardRef<HTMLSpanElement, CategoryTagProps>(
  ({ category, size = 'medium', showIcon = true, className }, ref) => {
    const { label, icon } = CATEGORY_META[category];

    const classes = [
      size === 'small' ? 'text-label-small' : 'text-label-medium',
      'ui-category-tag',
      `ui-category-tag--${size}`,
      `ui-category-tag--${category}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes}>
        {showIcon && (
          <span className="ui-category-tag__icon">
            <i className={icon} aria-hidden="true" />
          </span>
        )}
        {label}
      </span>
    );
  }
);

CategoryTag.displayName = 'CategoryTag';

export default CategoryTag;
export type { CategoryTagProps, CategoryTagCategory };
