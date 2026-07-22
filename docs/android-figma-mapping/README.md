# Figma Component Search Index

Quick reference to find Compose components for your Figma designs.

## How to Use This Index

1. **Search by Component Name**: Find the Compose component name in the table below
2. **Find by Category**: Browse by component type (Buttons, Layout, etc.)
3. **Get Details**: Click the reference link for specifications and usage
4. **See Examples**: Check if there are detailed examples available

## Quick Search Table

| Figma Component | Compose Component | Category | Reference | Example |
|-----------------|-------------------|----------|-----------|---------|
| Primary Button | ButtonCompose | Buttons | [buttons.md](references/buttons.md) | - |
| Text Button | TextButtonCompose | Buttons | [buttons.md](references/buttons.md) | - |
| Icon Button | IconButtonCompose | Buttons | [buttons.md](references/buttons.md) | - |
| FAB / Floating Action Button | FABCompose | Buttons | [buttons.md](references/buttons.md) | [fab-usage.md](examples/fab-usage.md) |
| Text Field | CustomTextFieldCompose | Text Fields | [text-fields.md](references/text-fields.md) | - |
| Clickable Text | ClickableText | Text Fields | [text-fields.md](references/text-fields.md) | - |
| Hyperlink Text | HyperlinkText | Text Fields | [text-fields.md](references/text-fields.md) | - |
| Fixed Size Text | FixSizeText | Text Fields | [text-fields.md](references/text-fields.md) | - |
| Checkbox | InvosCheckBox | Selection | [selection.md](references/selection.md) | - |
| Radio Button | InvosRadioButton | Selection | [selection.md](references/selection.md) | - |
| Switch | InvosSwitch | Selection | [selection.md](references/selection.md) | - |
| Bottom Sheet Selector | SimpleTextSelector | Selection | [selection.md](references/selection.md) | [bottom-sheet-selector.md](examples/bottom-sheet-selector.md) |
| Bottom Sheet | BottomSheet components | Layout | [containers-layout.md](references/containers-layout.md) | - |
| App Bar | App Bar components | Layout | [containers-layout.md](references/containers-layout.md) | [app-bar-usage.md](examples/app-bar-usage.md) |
| Navigation Bar (Back) | TopBackAppBar | Layout | [containers-layout.md](references/containers-layout.md) | [app-bar-usage.md](examples/app-bar-usage.md) |
| Navigation Bar (Close) | TopCloseAppBar | Layout | [containers-layout.md](references/containers-layout.md) | [app-bar-usage.md](examples/app-bar-usage.md) |
| Custom App Bar | AppBar | Layout | [containers-layout.md](references/containers-layout.md) | [app-bar-usage.md](examples/app-bar-usage.md) |
| Collapsing App Bar | CollapsingToolbarScrollConnection | Layout | [containers-layout.md](references/containers-layout.md) | - |
| Tab Layout | Tab components | Layout | [containers-layout.md](references/containers-layout.md) | - |
| Loading Indicator | Loading components | Feedback | [feedback-notifications.md](references/feedback-notifications.md) | - |
| Dialog | Dialog components | Feedback | [feedback-notifications.md](references/feedback-notifications.md) | - |
| Empty State | EmptyView components | Feedback | [feedback-notifications.md](references/feedback-notifications.md) | - |
| Notification Dot | NewNotifyDot | Feedback | [feedback-notifications.md](references/feedback-notifications.md) | - |
| Tooltip | ToolTipCompose | Feedback | [feedback-notifications.md](references/feedback-notifications.md) | - |
| Number Keypad | NumberKeypad | Input | [input.md](references/input.md) | - |
| Date Picker | Date components | Input | [input.md](references/input.md) | - |
| Basic Tag | TagCompose | Other | [misc.md](references/misc.md) | [tag-usage.md](examples/tag-usage.md) |
| Category Tag | CategoryTagCompose | Other | [misc.md](references/misc.md) | [tag-usage.md](examples/tag-usage.md) |
| Category Badge | CategoryBadge | Other | [misc.md](references/misc.md) | - |
| Banner | Banner components | Other | [misc.md](references/misc.md) | - |
| Web View | WebView components | Other | [misc.md](references/misc.md) | - |
| Search Bar | Search components | Other | [misc.md](references/misc.md) | - |
| Scan Code | ScanCode components | Other | [misc.md](references/misc.md) | - |

## Browse by Category

### Buttons (4 components)
Common interactive button components for user actions.
- [View All Buttons →](references/buttons.md)
- **Key Components**: ButtonCompose, TextButtonCompose, FABCompose

### Text Fields (4 components)
Text input and display components.
- [View All Text Fields →](references/text-fields.md)
- **Key Components**: CustomTextFieldCompose, ClickableText

### Selection Components (4 components)
Components for user selections and choices.
- [View All Selection Components →](references/selection.md)
- **Key Components**: InvosCheckBox, InvosRadioButton, InvosSwitch, SimpleTextSelector

### Containers & Layout (7 components)
Layout structure and navigation components.
- [View All Layout Components →](references/containers-layout.md)
- **Key Components**: TopBackAppBar, TopCloseAppBar, BottomSheet, Tabs

### Feedback & Notifications (5 components)
Components for user feedback and notifications.
- [View All Feedback Components →](references/feedback-notifications.md)
- **Key Components**: Loading, Dialog, EmptyView, ToolTipCompose

### Input Components (2 components)
Specialized input components.
- [View All Input Components →](references/input.md)
- **Key Components**: NumberKeypad, Date Pickers

### Other Components (6 components)
Miscellaneous UI components.
- [View All Other Components →](references/misc.md)
- **Key Components**: TagCompose, CategoryTagCompose, Banner, Search

## Design System Resources

### Colors
Map Figma color styles to Android color resources.
- [View Color Mapping Guide →](references/colors.md)
- Colors defined in: `app/src/main/res/values/colors.xml`

### Text Styles
Map Figma text properties to Compose TextStyle definitions.
- [View Text Style Mapping →](references/text-styles.md)
- TextStyles defined in: `ui/composeview/theme/TextStyle.kt`

## Detailed Examples

For components with complex usage patterns:

| Component | Example Guide | Use Case |
|-----------|---------------|----------|
| FABCompose | [fab-usage.md](examples/fab-usage.md) | Floating Action Button with states (default, pressed, disabled, loading) |
| TagCompose & CategoryTagCompose | [tag-usage.md](examples/tag-usage.md) | Basic tags vs category tags, color types, invoice tags |
| SimpleTextSelector | [bottom-sheet-selector.md](examples/bottom-sheet-selector.md) | Bottom sheet menu selector with ViewModel integration |
| TopBackAppBar & TopCloseAppBar | [app-bar-usage.md](examples/app-bar-usage.md) | Navigation bars with back/close buttons, custom app bars |

## Common Workflows

### 1. Implementing a Button from Figma
```
Figma Design → Identify button type → Check buttons.md → Use ButtonCompose/TextButtonCompose/FABCompose
```

### 2. Implementing Text Styles
```
Figma Text Properties → Note fontSize + fontWeight → Check text-styles.md mapping table → Apply TextStyle
```

### 3. Implementing App Bars
```
Figma Navigation Bar → Check icon type (back/close) → Check app-bar-usage.md → Use TopBackAppBar/TopCloseAppBar
```

### 4. Implementing Tags
```
Figma Tag → Check purpose (general/category/invoice) → Check tag-usage.md → Use TagCompose or CategoryTagCompose
```

## File Paths

All custom Compose components are located in:
```
core/designsystem/src/main/java/tw/com/quickscanner/invoice/ui/composeview/
```

Subdirectories:
- `widgets/` - Buttons, Tags, Badges, Switches, etc.
- `text/` - Text components
- `appbar/` - App Bar components
- `bottomsheet/` - Bottom Sheet components
- `dialog/` - Dialog components
- `selector/` - Selector components
- `loading/` - Loading components
- `emptyview/` - Empty state components
- `banner/` - Banner components
- `tab/` - Tab components
- `date/` - Date picker components
- `webview/` - Web view components
- `search/` - Search components
- `scancode/` - Scan code components
- `theme/` - Theme, Colors, TextStyles

## Need Help?

- Review [SKILL.md](SKILL.md) for usage workflow and quick examples
- Check component references for detailed specifications
- See examples folder for complex usage patterns
- Refer to [Compose Best Practices](../../../docs/01-compose-best-practices.md)
