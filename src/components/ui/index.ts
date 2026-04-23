// Design tokens (colors, spacing, radius, typography, shadows, icons).
// Imported here so consumers only need `import '@invos/ios-ui-kit/styles.css'`
// to get both tokens + component styles in one go.
import './tokens/index.css';

// === Existing components ===
export { default as Spinner } from './Spinner';
export type { SpinnerProps } from './Spinner';

export { default as Button } from './Button';
export type { ButtonProps } from './Button';

export { default as IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';

export { default as TextField } from './TextField';
export type { TextFieldProps } from './TextField';

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

export { default as Alert } from './Alert';
export type { AlertProps } from './Alert';

export { default as ListItem } from './ListItem';
export type { ListItemProps } from './ListItem';

export { default as Dialog } from './Dialog';
export type { DialogProps, DialogAction } from './Dialog';


export { ToastProvider, useToast } from './Toast';
export type { ToastMessage } from './Toast';

// === New components mirroring iOS UI Kit 2025 ===

// iOS chrome
export { default as NavigationBar } from './NavigationBar';
export type { NavigationBarProps } from './NavigationBar';

export { default as TabBar } from './TabBar';
export type { TabBarProps, TabItem } from './TabBar';

export { default as Tabs } from './Tabs';
export type { TabsProps, TabsItem } from './Tabs';

export { default as Divider } from './Divider';
export type { DividerProps } from './Divider';

// Form helpers
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

// Containers
export { default as SheetHeader } from './SheetHeader';
export type { SheetHeaderProps } from './SheetHeader';

export { default as Sheet } from './Sheet';
export type { SheetProps } from './Sheet';

export { default as CardItem } from './CardItem';
export type { CardItemProps, CardItemDescRow } from './CardItem';

// List
export { default as ListHeader } from './ListHeader';
export type { ListHeaderProps } from './ListHeader';

export { default as ListFooter } from './ListFooter';
export type { ListFooterProps } from './ListFooter';

// Display
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

// Tag variants
export { default as TagBar } from './TagBar';
export type { TagBarProps, TagBarItem } from './TagBar';
