# Text Fields

Text input and display components for user input and interactive text.

## Component Mapping

| Figma Component | Compose Component | File Path |
|-----------------|-------------------|-----------|
| Text Field | CustomTextFieldCompose | `ui/composeview/text/CustomTextFieldCompose.kt` |
| Clickable Text | ClickableText | `ui/composeview/text/ClickableText.kt` |
| Hyperlink Text | HyperlinkText | `ui/composeview/text/HyperlinkText.kt` |
| Fixed Size Text | FixSizeText | `ui/composeview/text/FixSizeText.kt` |

## CustomTextFieldCompose

Standard text input field with label and validation support.

### Basic Usage

```kotlin
var text by remember { mutableStateOf("") }

CustomTextFieldCompose(
    value = text,
    onValueChange = { text = it },
    label = "Enter text"
)
```

### Common Parameters
- `value: String` - Current text value
- `onValueChange: (String) -> Unit` - Callback when text changes
- `label: String` - Label text above the field
- `placeholder: String?` - Placeholder text (optional)
- `isError: Boolean` - Show error state (default: false)
- `errorMessage: String?` - Error message to display
- `enabled: Boolean` - Enable/disable state (default: true)
- `readOnly: Boolean` - Read-only mode (default: false)
- `singleLine: Boolean` - Single line input (default: true)
- `maxLines: Int` - Maximum number of lines
- `keyboardOptions: KeyboardOptions` - Keyboard configuration
- `keyboardActions: KeyboardActions` - Keyboard action handlers
- `modifier: Modifier` - Compose modifier

### With Validation

```kotlin
var email by remember { mutableStateOf("") }
var isError by remember { mutableStateOf(false) }

CustomTextFieldCompose(
    value = email,
    onValueChange = {
        email = it
        isError = !it.contains("@")
    },
    label = "Email",
    isError = isError,
    errorMessage = if (isError) "Invalid email format" else null,
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
)
```

### Design Specifications
- Uses Material Design outlined text field style
- Label animates to top when focused
- Error state shows red border and error message below
- Follows theme color scheme for borders and text

## ClickableText

Text component that responds to tap gestures.

### Basic Usage

```kotlin
ClickableText(
    text = "Terms and Conditions",
    onClick = { /* Handle click */ },
    style = LabelMedium,
    color = colorResource(id = R.color.colorContentBrandDefault)
)
```

### Common Parameters
- `text: String` - Text content
- `onClick: () -> Unit` - Click handler
- `style: TextStyle` - Text style (default: BodyMedium)
- `color: Color` - Text color
- `modifier: Modifier` - Compose modifier

### Use Cases
- Navigation links
- Toggle actions
- Expandable sections
- Action triggers

## HyperlinkText

Text with hyperlink styling and behavior, typically for external links.

### Basic Usage

```kotlin
HyperlinkText(
    text = "Visit our website",
    url = "https://example.com",
    style = LabelMedium
)
```

### Common Parameters
- `text: String` - Display text
- `url: String` - Target URL
- `style: TextStyle` - Text style (default: BodyMedium)
- `color: Color` - Link color (typically brand color)
- `modifier: Modifier` - Compose modifier

### Design Specifications
- Typically styled with brand color and underline
- Opens URL in browser when clicked
- Follows Material Design link guidelines

## FixSizeText

Text component with fixed dimensions to prevent layout shifts.

### Basic Usage

```kotlin
FixSizeText(
    text = "Fixed Size Label",
    width = 120.dp,
    height = 40.dp,
    style = BodyMedium
)
```

### Common Parameters
- `text: String` - Text content
- `width: Dp` - Fixed width
- `height: Dp` - Fixed height
- `style: TextStyle` - Text style
- `textAlign: TextAlign` - Text alignment
- `overflow: TextOverflow` - Overflow behavior (default: Ellipsis)
- `maxLines: Int` - Maximum lines
- `modifier: Modifier` - Compose modifier

### Use Cases
- Table cells with consistent sizing
- Grid items with uniform dimensions
- Layouts requiring stable dimensions
- Preventing recomposition layout shifts

## Text Style Integration

All text components should use TextStyles from the theme:

```kotlin
// Import text styles
import tw.com.quickscanner.invoice.ui.composeview.theme.*

// Use appropriate style based on context
CustomTextFieldCompose(
    value = text,
    onValueChange = { text = it },
    label = "Label",
    textStyle = BodyLarge  // 16sp, Regular
)

ClickableText(
    text = "Click here",
    onClick = { },
    style = LabelMedium  // 14sp, Medium
)
```

Refer to [Text Styles Reference](text-styles.md) for complete style mapping.

## Common Patterns

### Form Input with State

```kotlin
@Composable
fun MyForm(viewModel: MyViewModel) {
    val name by viewModel.name.collectAsStateWithLifecycle()
    val nameError by viewModel.nameError.collectAsStateWithLifecycle()

    CustomTextFieldCompose(
        value = name,
        onValueChange = { viewModel.handleAction(MyAction.UpdateName(it)) },
        label = "Name",
        isError = nameError != null,
        errorMessage = nameError
    )
}
```

### Email Input

```kotlin
CustomTextFieldCompose(
    value = email,
    onValueChange = { email = it },
    label = "Email",
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Email,
        imeAction = ImeAction.Next
    )
)
```

### Password Input

```kotlin
var password by remember { mutableStateOf("") }
var passwordVisible by remember { mutableStateOf(false) }

CustomTextFieldCompose(
    value = password,
    onValueChange = { password = it },
    label = "Password",
    visualTransformation = if (passwordVisible)
        VisualTransformation.None
    else
        PasswordVisualTransformation(),
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
    trailingIcon = {
        IconButton(onClick = { passwordVisible = !passwordVisible }) {
            Icon(
                imageVector = if (passwordVisible)
                    Icons.Default.Visibility
                else
                    Icons.Default.VisibilityOff,
                contentDescription = if (passwordVisible) "Hide password" else "Show password"
            )
        }
    }
)
```

## Design System Integration

### Colors
- Input text: `colorContentDefault`
- Label text: `colorContentSubtle`
- Error text: `colorContentDanger`
- Border: `colorBorderDefault`
- Error border: `colorBorderDanger`
- Link text: `colorContentBrandDefault`

### Focus States
- Focused border: `colorBorderBrandDefault`
- Unfocused border: `colorBorderDefault`
- Error border: `colorBorderDanger`

## Best Practices

1. **Always provide labels**: Use clear, descriptive labels for accessibility

2. **Validate appropriately**: Show error states only after user interaction

3. **Use correct keyboard types**: Set appropriate keyboard type for input content

4. **Handle IME actions**: Configure Next/Done actions for better UX

5. **Consider mobile keyboards**: Design forms to work well with on-screen keyboards

6. **Use state hoisting**: Manage text state in ViewModel, not in Composable

## Related Components

- [Buttons](buttons.md) - For submit/action buttons with forms
- [Selection Components](selection.md) - For checkboxes and switches in forms

## See Also

- [Text Styles Reference](text-styles.md) - Typography mapping
- [Color Reference](colors.md) - Design system colors
- [Compose Best Practices](../../../../docs/01-compose-best-practices.md) - General Compose guidelines
