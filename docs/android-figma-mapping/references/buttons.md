# Buttons

Button components for user interactions and actions.

## Component Mapping

| Figma Component | Compose Component | File Path |
|-----------------|-------------------|-----------|
| Button / Primary Button | ButtonCompose with ButtonType.Primary | `ui/composeview/widgets/ButtonCompose.kt` |
| Text Button style="Text" | TextButtonCompose | `ui/composeview/widgets/TextButtonCompose.kt` |
| Text Button style="Outline" | ButtonCompose with ButtonType.Outline | `ui/composeview/widgets/ButtonCompose.kt` |
| Text Button other styles | ButtonCompose with appropriate ButtonType | `ui/composeview/widgets/ButtonCompose.kt` |
| Icon Button | IconButtonCompose | `ui/composeview/widgets/IconButtonCompose.kt` |
| FAB (Floating Action Button) | FABCompose | `ui/composeview/widgets/FABCompose.kt` |

## Important: Figma Text Button Mapping Rule

**CRITICAL**: When implementing Figma "Text Button" components, the correct Compose component depends on the **style** property in Figma:

- **Text Button style = "Text"** → Use `TextButtonCompose`
  - Pure text button with brand color text
  - No background, no border
  - Example: Cancel, Skip, Learn More buttons

- **Text Button style = anything else** (e.g., "Outline", "Primary", "Small") → Use `ButtonCompose`
  - Use appropriate `buttonType` based on the Figma style
  - Use appropriate `buttonStyle` based on the Figma size
  - Example: "設定" (Settings) buttons typically use `ButtonType.Outline` + `ButtonStyle.Small`

### Quick Decision Guide

```kotlin
// ✅ Correct - Figma Text Button style="Text"
TextButtonCompose(
    text = "取消",
    onClick = { /* Handle click */ }
)

// ✅ Correct - Figma Text Button style="Outline/Small"
ButtonCompose(
    text = "設定",
    onClick = { /* Handle click */ },
    buttonType = ButtonType.Outline,  // Based on Figma style
    buttonStyle = ButtonStyle.Small   // Based on Figma size (30dp height)
)

// ❌ Wrong - Using TextButtonCompose for non-Text style
TextButtonCompose(
    text = "設定",  // Should use ButtonCompose for Outline style
    onClick = { /* Handle click */ }
)
```

### Figma Style to Compose Mapping

| Figma Text Button Style | Compose Component | ButtonType | ButtonStyle |
|-------------------------|-------------------|------------|-------------|
| Text | TextButtonCompose | N/A | TextButtonStyle.* |
| Outline/Small | ButtonCompose | ButtonType.Outline | ButtonStyle.Small |
| Outline/Medium | ButtonCompose | ButtonType.Outline | ButtonStyle.Medium |
| Outline/Large | ButtonCompose | ButtonType.Outline | ButtonStyle.Large |
| Primary/Small | ButtonCompose | ButtonType.Primary | ButtonStyle.Small |
| Primary/Medium | ButtonCompose | ButtonType.Primary | ButtonStyle.Medium |
| Primary/Large | ButtonCompose | ButtonType.Primary | ButtonStyle.Large |

## ButtonCompose

Versatile button component that supports multiple visual styles through `ButtonType`.

### ButtonType Options

- **Primary**: Filled button with brand background (most common for main actions)
- **Outline**: Bordered button with transparent background (for Figma "Text Button with border")
- **Neutral**: Gray filled button
- **Prize**: Yellow filled button
- **Danger**: Red filled button
- **Donation**: Pink filled button
- **Ghost**: Transparent button with no border
- **White**: White filled button

### ButtonStyle Options

Controls the button size:
- **Large**: 48dp height (default)
- **Medium**: 38dp height
- **Small**: 30dp height

### Basic Usage

```kotlin
// Primary filled button
ButtonCompose(
    text = "Submit",
    onClick = { /* Handle click */ }
)

// Outlined button (for Figma Text Button with border)
ButtonCompose(
    text = "設定",
    onClick = { /* Handle click */ },
    buttonType = ButtonType.Outline,
    buttonStyle = ButtonStyle.Small
)
```

### Common Parameters
- `text: String` - Button text content
- `onClick: () -> Unit` - Click handler
- `buttonType: ButtonType` - Visual style (default: Primary)
- `buttonStyle: ButtonStyle` - Size variant (default: Large)
- `enabled: Boolean` - Enable/disable state (default: true)
- `modifier: Modifier` - Compose modifier
- `leadingIcon: Int?` - Optional leading icon drawable
- `trailingIcon: Int?` - Optional trailing icon drawable
- `isLoading: Boolean` - Show loading indicator (default: false)

## TextButtonCompose

Text-only button for secondary actions **WITHOUT border**.

**When to use**: Only when Figma shows a text button without any border or background.

### Basic Usage

```kotlin
TextButtonCompose(
    text = "Cancel",
    onClick = { /* Handle click */ }
)
```

### TextButtonStyle Options

Controls the button size:
- **Large**: 20dp icon, LabelLarge text
- **Medium**: 16dp icon, LabelMedium text
- **Small**: 14dp icon, LabelSmall text

### Common Parameters
- `text: String` - Button text content
- `onClick: () -> Unit` - Click handler
- `textButtonStyle: TextButtonStyle` - Size variant (default: Large)
- `enabled: Boolean` - Enable/disable state (default: true)
- `modifier: Modifier` - Compose modifier
- `leadingIcon: Int?` - Optional leading icon drawable
- `trailingIcon: Int?` - Optional trailing icon drawable
- `isLoading: Boolean` - Show loading indicator (default: false)

### Example with Icon

```kotlin
TextButtonCompose(
    text = "了解更多",
    onClick = { /* Handle click */ },
    trailingIcon = R.drawable.icon_chevron_right,
    textButtonStyle = TextButtonStyle.Medium
)
```

## IconButtonCompose

Button with icon for compact actions.

### Basic Usage

```kotlin
IconButtonCompose(
    icon = R.drawable.icon_edit,
    onClick = { /* Handle click */ },
    contentDescription = "Edit"
)
```

### Common Parameters
- `icon: Int` - Drawable resource ID for the icon
- `onClick: () -> Unit` - Click handler
- `contentDescription: String` - Accessibility description
- `enabled: Boolean` - Enable/disable state (default: true)
- `modifier: Modifier` - Compose modifier

## FABCompose

Floating Action Button for prominent primary actions.

### Basic Usage

```kotlin
FABCompose(
    icon = R.drawable.icon_plus_filled,
    onClick = { /* Handle click */ }
)
```

### Common Parameters
- `icon: Int` - Drawable resource ID (28dp icon)
- `onClick: () -> Unit` - Click handler
- `enabled: Boolean` - Enable/disable state (default: true)
- `isLoading: Boolean` - Show loading animation (default: false)
- `modifier: Modifier` - Compose modifier

### States
1. **Default**: Normal interactive state
2. **Pressed**: Active press state
3. **Disabled**: 40% opacity, not clickable
4. **Loading**: Shows loading animation, not clickable

### Design Specifications
- **Size**: 64dp × 64dp
- **Corner Radius**: 16dp
- **Icon Size**: 28dp
- **Elevation**: 8dp shadow
- **Colors**:
  - Background: `colorBackgroundBrandDefault` (default), `colorBackgroundBrandHover` (hover), `colorBackgroundBrandActive` (pressed)
  - Icon: `colorContentFixedWhite`

### Detailed Example

See [FAB Usage Examples](../examples/fab-usage.md) for complete implementation patterns including:
- Disabled state handling
- Loading state with async operations
- Integration with Scaffold
- State management with ViewModel

## Usage in Scaffold

```kotlin
@Composable
fun MyScreen() {
    Scaffold(
        floatingActionButton = {
            FABCompose(
                icon = R.drawable.icon_plus_filled,
                onClick = { /* Add new item */ }
            )
        }
    ) { paddingValues ->
        // Screen content
    }
}
```

## Design System Integration

### Colors
All button components automatically use design system colors:
- Primary buttons use Brand colors (`colorBackgroundBrand*`)
- Text buttons use Content colors (`colorContent*`)
- Icon buttons use Content colors for icons

### Text Styles
- Button text typically uses `LabelMedium` or `LabelLarge`
- Refer to [Text Styles Reference](text-styles.md) for complete mapping

## Best Practices

1. **Use appropriate button types**:
   - Primary action (filled) → `ButtonCompose` with `ButtonType.Primary`
   - Secondary action with border → `ButtonCompose` with `ButtonType.Outline`
   - Secondary action without border → `TextButtonCompose`
   - Compact action → `IconButtonCompose`
   - Main floating action → `FABCompose`

2. **Match Figma design correctly**:
   - Check the "style" property in Figma
   - Style = "Text" → `TextButtonCompose`
   - Style = anything else (Outline, Primary, etc.) → `ButtonCompose` with appropriate `buttonType`

3. **Provide clear labels**: Always use descriptive text for accessibility

4. **Handle states properly**: Disable buttons during async operations or use loading state

5. **Follow spacing guidelines**: Maintain consistent padding and spacing between buttons

## Common Usage Examples

### Setting Button in List Item (Small Outline Button)

```kotlin
// Common pattern for settings/configuration buttons
ButtonCompose(
    text = "設定",
    onClick = { /* Open settings */ },
    buttonType = ButtonType.Outline,
    buttonStyle = ButtonStyle.Small  // 30dp height
)
```

### Cancel/Secondary Action (Text Button)

```kotlin
// Common pattern for cancel/dismiss actions
TextButtonCompose(
    text = "取消",
    onClick = { /* Cancel action */ },
    textButtonStyle = TextButtonStyle.Medium
)
```

### Primary CTA Button

```kotlin
// Common pattern for main call-to-action
ButtonCompose(
    text = "確認送出",
    onClick = { /* Submit form */ },
    buttonType = ButtonType.Primary,
    buttonStyle = ButtonStyle.Large
)
```

## Related Components

- [Icon Resources](https://developer.android.com/guide/topics/resources/drawable-resource) - For icon drawable resources
- [Material Design Buttons](https://m3.material.io/components/buttons/overview) - Design guidelines

## See Also

- [FAB Usage Examples](../examples/fab-usage.md) - Detailed FAB implementation patterns
- [Color Reference](colors.md) - Design system color mapping
- [Text Styles Reference](text-styles.md) - Typography mapping
