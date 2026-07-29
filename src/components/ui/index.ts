// 在這裡 import token，使用端只要 `import '@invos/design-system/styles.css'`
// 就能一次拿到 token + 元件樣式。
import './tokens/index.css';
// 跨元件無障礙基礎（focus 環、reduced-motion）。必須排在元件樣式之前，
// 元件才能用 !important 覆寫自己的降級動效。
import './a11y.css';

export { default as Spinner } from './Spinner';
export type { SpinnerProps } from './Spinner';

export { default as Button } from './Button';
export type { ButtonProps, ButtonStyleProps } from './Button';

export { default as IconButton } from './IconButton';
export type { IconButtonProps, IconButtonStyleProps } from './IconButton';

export { default as Fab } from './Fab';
export type { FabProps } from './Fab';

export { default as DottedController } from './DottedController';
export type { DottedControllerProps } from './DottedController';

export { default as TextField } from './TextField';
export type { TextFieldProps } from './TextField';

export { default as PinInput } from './PinInput';
export type { PinInputProps } from './PinInput';

export { default as Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { default as Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { default as Radio } from './Radio';
export type { RadioProps } from './Radio';

export { default as Switch } from './Switch';
export type { SwitchProps } from './Switch';

export { default as Tag } from './Tag';
export type { TagProps } from './Tag';

export { default as Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { default as Banner } from './Banner';
export type { BannerProps } from './Banner';

/** @deprecated 已更名為 `Banner`（對齊 Figma「Basic banner」），請改用 `Banner`。 */
export { default as Alert } from './Banner';
/** @deprecated 請改用 `BannerProps`。 */
export type { BannerProps as AlertProps } from './Banner';

export { default as PageStatus } from './PageStatus';
export type { PageStatusProps, PageStatusType } from './PageStatus';

export { default as ListItem } from './ListItem';
export type { ListItemProps } from './ListItem';

export { default as Dialog } from './Dialog';
export type { DialogProps, DialogAction } from './Dialog';


export { ToastProvider, useToast } from './Toast';
export type { ToastMessage } from './Toast';

export { InAppNotificationProvider, useInAppNotification } from './InAppNotification';
export type {
  InAppNotificationOptions,
  InAppNotificationVariant,
  InAppNotificationTrailing,
  InAppNotificationButton,
  InAppNotificationIconButton,
  InAppNotificationContextValue,
} from './InAppNotification';

// 頁面框架
export { default as NavigationBar } from './NavigationBar';
export type { NavigationBarProps } from './NavigationBar';

export { default as TabBar } from './TabBar';
export type { TabBarProps, TabItem } from './TabBar';

export { default as PageNavigation } from './PageNavigation';
export type { PageNavigationProps } from './PageNavigation';

export { default as Tabs } from './Tabs';
export type { TabsProps, TabsItem } from './Tabs';

export { default as Divider } from './Divider';
export type { DividerProps } from './Divider';

// 表單
export { default as FieldGroup } from './FieldGroup';
export type { FieldGroupProps } from './FieldGroup';

export { default as FieldGroupHeader } from './FieldGroupHeader';
export type { FieldGroupHeaderProps } from './FieldGroupHeader';

export { default as FieldGroupHelpText } from './FieldGroupHelpText';
export type { FieldGroupHelpTextProps } from './FieldGroupHelpText';

export { default as Slider } from './Slider';
export type { SliderProps } from './Slider';

export { default as TextArea } from './TextArea';
export type { TextAreaProps } from './TextArea';

export { default as SearchField } from './SearchField';
export type { SearchFieldProps } from './SearchField';

// 容器
export { default as SheetHeader } from './SheetHeader';
export type { SheetHeaderProps } from './SheetHeader';

export { default as Sheet } from './Sheet';
export type { SheetProps } from './Sheet';

export { default as CardItem } from './CardItem';
export type { CardItemProps, CardItemDescRow } from './CardItem';

// 列表
export { default as ListHeader } from './ListHeader';
export type { ListHeaderProps } from './ListHeader';

export { default as ListFooter } from './ListFooter';
export type { ListFooterProps } from './ListFooter';

// 顯示
export { default as Avatar } from './Avatar';
export type { AvatarProps } from './Avatar';

export { default as Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { default as SnackBar } from './SnackBar';
export type { SnackBarProps } from './SnackBar';

export { default as ProgressBar } from './ProgressBar';
export type { ProgressBarProps } from './ProgressBar';


export { default as ProgressGroup } from './ProgressGroup';
export type { ProgressGroupProps } from './ProgressGroup';

export { default as ChipBar } from './ChipBar';
export type { ChipBarProps, ChipBarItem } from './ChipBar';

/** @deprecated 已更名為 `ChipBar`（對齊 Figma「Chip bar」），請改用 `ChipBar`。 */
export { default as TagBar } from './ChipBar';
/** @deprecated 請改用 `ChipBarProps` / `ChipBarItem`。 */
export type { ChipBarProps as TagBarProps, ChipBarItem as TagBarItem } from './ChipBar';
