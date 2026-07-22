import type { StoryCategory, StoryDef } from './types'

// Chrome
import { NavigationBarStory } from './NavigationBar.story.tsx'
import { TabBarStory } from './TabBar.story.tsx'
import { PageNavigationStory } from './PageNavigation.story.tsx'
import { TabsStory } from './Tabs.story.tsx'
import { DividerStory } from './Divider.story'

// Forms
import { ButtonStory } from './Button.story'
import { IconButtonStory } from './IconButton.story.tsx'
import { FabStory } from './Fab.story.tsx'
import { TextFieldStory } from './TextField.story.tsx'
import { PinInputStory } from './PinInput.story.tsx'
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
import { ChipBarStory } from './ChipBar.story.tsx'
import { BadgeStory } from './Badge.story'
import { AvatarStory } from './Avatar.story'
import { ListItemStory } from './ListItem.story.tsx'
import { ListHeaderStory } from './ListHeader.story.tsx'
import { ListFooterStory } from './ListFooter.story'
import { CardItemStory } from './CardItem.story.tsx'
import { DottedControllerStory } from './DottedController.story.tsx'
import { IconsStory } from './Icons.story.tsx'

// Feedback
import { BannerStory } from './Banner.story'
import { PageStatusStory } from './PageStatus.story.tsx'
import { SpinnerStory } from './Spinner.story'
import { ProgressBarStory } from './ProgressBar.story'
import { ProgressGroupStory } from './ProgressGroup.story'
import { ToastStory } from './Toast.story.tsx'
import { SnackBarStory } from './SnackBar.story.tsx'
import { TooltipStory } from './Tooltip.story.tsx'
import { InAppNotificationStory } from './InAppNotification.story.tsx'

// Overlay
import { DialogStory } from './Dialog.story.tsx'
import { SheetStory } from './Sheet.story.tsx'

export const categories: StoryCategory[] = [
  {
    name: 'Chrome',
    stories: [NavigationBarStory, TabBarStory, PageNavigationStory, TabsStory, DividerStory],
  },
  {
    name: 'Forms',
    stories: [ButtonStory, IconButtonStory, FabStory, TextFieldStory, TextAreaStory, PinInputStory, SelectStory, CheckboxStory, RadioStory, SwitchStory, SliderStory, SearchFieldStory, FieldGroupStory],
  },
  {
    name: 'Display',
    stories: [TagStory, ChipBarStory, BadgeStory, AvatarStory, ListItemStory, ListHeaderStory, ListFooterStory, CardItemStory, DottedControllerStory, IconsStory],
  },
  {
    name: 'Feedback',
    stories: [BannerStory, SpinnerStory, ProgressBarStory, ProgressGroupStory, ToastStory, SnackBarStory, InAppNotificationStory, TooltipStory, PageStatusStory],
  },
  {
    name: 'Overlay',
    stories: [DialogStory, SheetStory],
  },
]

export const storyMap: Record<string, StoryDef> = Object.fromEntries(
  categories.flatMap((cat) => cat.stories.map((s) => [s.name, s]))
)

export const defaultStoryName: string = categories[0].stories[0].name
