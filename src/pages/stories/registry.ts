import type { StoryCategory, StoryDef } from './types'

// Chrome
import { NavigationBarStory } from './NavigationBar.story.tsx'
import { TabBarStory } from './TabBar.story.tsx'
import { DividerStory } from './Divider.story'

// Forms
import { ButtonStory } from './Button.story'
import { IconButtonStory } from './IconButton.story.tsx'
import { TextFieldStory } from './TextField.story.tsx'
import { TextAreaStory } from './TextArea.story'
import { SelectStory } from './Select.story.tsx'
import { CheckboxStory } from './Checkbox.story'
import { RadioStory } from './Radio.story'
import { SwitchStory } from './Switch.story'
import { SliderStory } from './Slider.story.tsx'
import { SearchFieldStory } from './SearchField.story.tsx'
import { FieldGroupStory } from './FieldGroup.story.tsx'

// Display
import { TagStory } from './Tag.story'
import { TagBarStory } from './TagBar.story.tsx'
import { BadgeStory } from './Badge.story'
import { AvatarStory } from './Avatar.story'
import { ListItemStory } from './ListItem.story.tsx'
import { ListHeaderStory } from './ListHeader.story.tsx'
import { ListFooterStory } from './ListFooter.story'
import { CardItemStory } from './CardItem.story.tsx'
import { IconsStory } from './Icons.story.tsx'

// Feedback
import { AlertStory } from './Alert.story'
import { SpinnerStory } from './Spinner.story'
import { ProgressBarStory } from './ProgressBar.story'
import { ProgressGroupStory } from './ProgressGroup.story'
import { ToastStory } from './Toast.story.tsx'
import { SnackBarStory } from './SnackBar.story.tsx'
import { TooltipStory } from './Tooltip.story.tsx'

// Overlay
import { DialogStory } from './Dialog.story.tsx'
import { BottomSheetStory } from './BottomSheet.story.tsx'

export const categories: StoryCategory[] = [
  {
    name: 'Chrome',
    stories: [NavigationBarStory, TabBarStory, DividerStory],
  },
  {
    name: 'Forms',
    stories: [ButtonStory, IconButtonStory, TextFieldStory, TextAreaStory, SelectStory, CheckboxStory, RadioStory, SwitchStory, SliderStory, SearchFieldStory, FieldGroupStory],
  },
  {
    name: 'Display',
    stories: [TagStory, TagBarStory, BadgeStory, AvatarStory, ListItemStory, ListHeaderStory, ListFooterStory, CardItemStory, IconsStory],
  },
  {
    name: 'Feedback',
    stories: [AlertStory, SpinnerStory, ProgressBarStory, ProgressGroupStory, ToastStory, SnackBarStory, TooltipStory],
  },
  {
    name: 'Overlay',
    stories: [DialogStory, BottomSheetStory],
  },
]

export const storyMap: Record<string, StoryDef> = Object.fromEntries(
  categories.flatMap((cat) => cat.stories.map((s) => [s.name, s]))
)

export const defaultStoryName: string = categories[0].stories[0].name
