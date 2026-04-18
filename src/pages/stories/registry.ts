import type { StoryCategory, StoryDef } from './types'

// Chrome
import { NavigationBarStory } from './NavigationBar.story'
import { TabBarStory } from './TabBar.story'
import { DividerStory } from './Divider.story'

// Forms
import { ButtonStory } from './Button.story'
import { IconButtonStory } from './IconButton.story'
import { TextFieldStory } from './TextField.story'
import { TextAreaStory } from './TextArea.story'
import { SelectStory } from './Select.story'
import { CheckboxStory } from './Checkbox.story'
import { RadioStory } from './Radio.story'
import { SwitchStory } from './Switch.story'
import { SliderStory } from './Slider.story'
import { SearchFieldStory } from './SearchField.story'

// Pickers
import { DatePickerStory } from './DatePicker.story'
import { MonthPickerStory } from './MonthPicker.story'

// Display
import { TagStory } from './Tag.story'
import { TagBarStory } from './TagBar.story'
import { BadgeStory } from './Badge.story'
import { AvatarStory } from './Avatar.story'
import { ListItemStory } from './ListItem.story'
import { ListHeaderStory } from './ListHeader.story'
import { ListFooterStory } from './ListFooter.story'
import { CardItemStory } from './CardItem.story'
import { CardBannerStory } from './CardBanner.story'

// Feedback
import { AlertStory } from './Alert.story'
import { SpinnerStory } from './Spinner.story'
import { ProgressBarStory } from './ProgressBar.story'
import { CircularProgressStory } from './CircularProgress.story'
import { ProgressGroupStory } from './ProgressGroup.story'
import { ToastStory } from './Toast.story'
import { SnackBarStory } from './SnackBar.story'
import { TooltipStory } from './Tooltip.story'

// Overlay
import { DialogStory } from './Dialog.story'
import { BottomSheetStory } from './BottomSheet.story'
import { SheetHeaderStory } from './SheetHeader.story'

export const categories: StoryCategory[] = [
  {
    name: 'Chrome',
    stories: [NavigationBarStory, TabBarStory, DividerStory],
  },
  {
    name: 'Forms',
    stories: [ButtonStory, IconButtonStory, TextFieldStory, TextAreaStory, SelectStory, CheckboxStory, RadioStory, SwitchStory, SliderStory, SearchFieldStory],
  },
  {
    name: 'Pickers',
    stories: [DatePickerStory, MonthPickerStory],
  },
  {
    name: 'Display',
    stories: [TagStory, TagBarStory, BadgeStory, AvatarStory, ListItemStory, ListHeaderStory, ListFooterStory, CardItemStory, CardBannerStory],
  },
  {
    name: 'Feedback',
    stories: [AlertStory, SpinnerStory, ProgressBarStory, CircularProgressStory, ProgressGroupStory, ToastStory, SnackBarStory, TooltipStory],
  },
  {
    name: 'Overlay',
    stories: [DialogStory, BottomSheetStory, SheetHeaderStory],
  },
]

export const storyMap: Record<string, StoryDef> = Object.fromEntries(
  categories.flatMap((cat) => cat.stories.map((s) => [s.name, s]))
)

export const defaultStoryName: string = categories[0].stories[0].name
