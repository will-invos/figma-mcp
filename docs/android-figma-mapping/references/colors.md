# Color Mapping

Guide for mapping Figma color styles to Android color resources in Compose.

## Overview

When implementing designs from Figma, always map Figma color styles to the project's color resources. Never use hardcoded color values. The application uses a comprehensive color system with support for light and dark modes.

## Color Resource Locations

- **XML Color Resources**: `app/src/main/res/values/colors.xml`
- **Night Mode Colors**: `app/src/main/res/values-night/colors.xml`

## Using Colors in Compose

### Basic Usage

```kotlin
import androidx.compose.ui.res.colorResource

@Composable
fun MyColoredComponent() {
    Box(
        modifier = Modifier
            .background(colorResource(id = R.color.colorBackgroundDefault))
            .padding(16.dp)
    ) {
        Text(
            text = "Colored Text",
            color = colorResource(id = R.color.colorContentDefault)
        )
    }
}
```

### Multiple Colors

```kotlin
@Composable
fun MyButton() {
    Button(
        onClick = { },
        colors = ButtonDefaults.buttonColors(
            containerColor = colorResource(id = R.color.colorBackgroundBrandDefault),
            contentColor = colorResource(id = R.color.colorContentFixedWhite)
        )
    ) {
        Text("Button")
    }
}
```

## Color System Categories

The color system is organized into semantic categories:

### Background Colors
Use for component backgrounds, surfaces, and containers.

| Color Name | Usage | Context |
|------------|-------|---------|
| `colorBackgroundDefault` | Default background | Main screen backgrounds |
| `colorBackgroundSubtle` | Subtle background | Secondary surfaces, cards |
| `colorBackgroundMuted` | Muted background | Disabled states |
| `colorBackgroundInverse` | Inverse background | Tooltips, dark overlays |
| `colorBackgroundBrandDefault` | Brand background | Primary buttons, brand elements |
| `colorBackgroundBrandHover` | Brand hover | Hover state for brand elements |
| `colorBackgroundBrandActive` | Brand active | Active/pressed state |
| `colorBackgroundBrandSubtle` | Brand subtle | Light brand backgrounds |
| `colorBackgroundSuccessDefault` | Success background | Success states |
| `colorBackgroundSuccessSubtle` | Success subtle | Success notifications |
| `colorBackgroundDangerDefault` | Danger background | Error states |
| `colorBackgroundDangerSubtle` | Danger subtle | Error notifications |
| `colorBackgroundWarningDefault` | Warning background | Warning states |
| `colorBackgroundWarningSubtle` | Warning subtle | Warning notifications |

### Content/Text Colors
Use for text, icons, and content.

| Color Name | Usage | Context |
|------------|-------|---------|
| `colorContentDefault` | Default content | Body text, main content |
| `colorContentBold` | Bold content | Headings, emphasized text |
| `colorContentSubtle` | Subtle content | Secondary text, captions |
| `colorContentMuted` | Muted content | Disabled text, placeholders |
| `colorContentInverse` | Inverse content | Text on dark backgrounds |
| `colorContentFixedWhite` | Fixed white | Text/icons on brand colors |
| `colorContentBrandDefault` | Brand content | Links, brand text |
| `colorContentBrandHover` | Brand hover | Link hover states |
| `colorContentSuccessDefault` | Success content | Success messages |
| `colorContentDangerDefault` | Danger content | Error messages |
| `colorContentWarningDefault` | Warning content | Warning messages |

### Border Colors
Use for borders, dividers, and outlines.

| Color Name | Usage | Context |
|------------|-------|---------|
| `colorBorderDefault` | Default border | Input borders, dividers |
| `colorBorderSubtle` | Subtle border | Light dividers |
| `colorBorderMuted` | Muted border | Very light dividers |
| `colorBorderBrandDefault` | Brand border | Focused inputs, brand outlines |
| `colorBorderSuccessDefault` | Success border | Success state borders |
| `colorBorderDangerDefault` | Danger border | Error state borders |
| `colorBorderWarningDefault` | Warning border | Warning state borders |

## Common Color Mappings

### Button Colors

```kotlin
// Primary Button
Button(
    colors = ButtonDefaults.buttonColors(
        containerColor = colorResource(id = R.color.colorBackgroundBrandDefault),
        contentColor = colorResource(id = R.color.colorContentFixedWhite)
    )
)

// Secondary Button
OutlinedButton(
    colors = ButtonDefaults.outlinedButtonColors(
        containerColor = Color.Transparent,
        contentColor = colorResource(id = R.color.colorContentBrandDefault)
    ),
    border = BorderStroke(
        1.dp,
        colorResource(id = R.color.colorBorderBrandDefault)
    )
)

// Text Button
TextButton(
    colors = ButtonDefaults.textButtonColors(
        contentColor = colorResource(id = R.color.colorContentBrandDefault)
    )
)
```

### Text Field Colors

```kotlin
OutlinedTextField(
    value = text,
    onValueChange = { text = it },
    colors = OutlinedTextFieldDefaults.colors(
        focusedBorderColor = colorResource(id = R.color.colorBorderBrandDefault),
        unfocusedBorderColor = colorResource(id = R.color.colorBorderDefault),
        errorBorderColor = colorResource(id = R.color.colorBorderDangerDefault),
        focusedTextColor = colorResource(id = R.color.colorContentDefault),
        unfocusedTextColor = colorResource(id = R.color.colorContentDefault),
        focusedLabelColor = colorResource(id = R.color.colorContentBrandDefault),
        unfocusedLabelColor = colorResource(id = R.color.colorContentSubtle)
    )
)
```

### Surface Colors

```kotlin
Surface(
    color = colorResource(id = R.color.colorBackgroundDefault),
    border = BorderStroke(1.dp, colorResource(id = R.color.colorBorderDefault)),
    shape = RoundedCornerShape(8.dp)
) {
    // Content
}
```

### State Colors

```kotlin
// Success state
Surface(
    color = colorResource(id = R.color.colorBackgroundSuccessSubtle),
    border = BorderStroke(1.dp, colorResource(id = R.color.colorBorderSuccessDefault))
) {
    Text(
        text = "Success message",
        color = colorResource(id = R.color.colorContentSuccessDefault)
    )
}

// Error state
Surface(
    color = colorResource(id = R.color.colorBackgroundDangerSubtle),
    border = BorderStroke(1.dp, colorResource(id = R.color.colorBorderDangerDefault))
) {
    Text(
        text = "Error message",
        color = colorResource(id = R.color.colorContentDangerDefault)
    )
}

// Warning state
Surface(
    color = colorResource(id = R.color.colorBackgroundWarningSubtle),
    border = BorderStroke(1.dp, colorResource(id = R.color.colorBorderWarningDefault))
) {
    Text(
        text = "Warning message",
        color = colorResource(id = R.color.colorContentWarningDefault)
    )
}
```

## Figma to Android Mapping

### Mapping Process

1. **Identify Figma Color**
   - Note the Figma color name/style
   - Understand the semantic meaning (background, content, border)
   - Check the context (default, brand, success, danger, etc.)

2. **Find Corresponding Android Color**
   - Match the semantic category (Background, Content, Border)
   - Match the context (Default, Brand, Success, Danger, Warning)
   - Match the intensity (Default, Subtle, Muted, Bold)

3. **Use in Compose**
   - Import: `import androidx.compose.ui.res.colorResource`
   - Apply: `colorResource(id = R.color.colorName)`

### Example Mapping

| Figma Color Name | Android Color Resource | Usage |
|------------------|------------------------|-------|
| Background/Primary | `colorBackgroundDefault` | Main backgrounds |
| Background/Secondary | `colorBackgroundSubtle` | Cards, secondary surfaces |
| Brand/Primary | `colorBackgroundBrandDefault` | Primary buttons |
| Brand/Secondary | `colorBackgroundBrandSubtle` | Brand highlights |
| Text/Primary | `colorContentDefault` | Body text |
| Text/Secondary | `colorContentSubtle` | Captions, secondary text |
| Border/Default | `colorBorderDefault` | Dividers, borders |
| Success/Background | `colorBackgroundSuccessSubtle` | Success notifications |
| Error/Background | `colorBackgroundDangerSubtle` | Error notifications |

## Dark Mode Support

All colors automatically adapt to dark mode through the values-night resources. When using `colorResource()`, the system automatically selects the appropriate color for the current theme.

```kotlin
// Automatically uses light or dark color based on system theme
Box(
    modifier = Modifier
        .background(colorResource(id = R.color.colorBackgroundDefault))
)
```

## Best Practices

1. **Never use hardcoded colors**
   ```kotlin
   // ❌ Bad
   Box(modifier = Modifier.background(Color(0xFF1E88E5)))

   // ✅ Good
   Box(modifier = Modifier.background(colorResource(id = R.color.colorBackgroundBrandDefault)))
   ```

2. **Use semantic color names**
   - Choose colors based on meaning, not appearance
   - `colorBackgroundBrandDefault` instead of "blue"
   - This ensures consistency and dark mode support

3. **Follow the color system**
   - Use Background colors for backgrounds
   - Use Content colors for text and icons
   - Use Border colors for borders and dividers

4. **Consider contrast**
   - Ensure sufficient contrast between text and background
   - Use Bold content colors for emphasis
   - Use Subtle colors for less important content

5. **Test in both themes**
   - Verify colors work in light mode
   - Verify colors work in dark mode
   - Check contrast ratios meet accessibility standards

6. **Use appropriate intensity**
   - Default: Primary use cases
   - Subtle: Less prominent, backgrounds
   - Muted: Very subtle, disabled states
   - Bold: Strong emphasis

## Common Patterns

### Card with Border

```kotlin
Surface(
    modifier = Modifier.fillMaxWidth(),
    color = colorResource(id = R.color.colorBackgroundDefault),
    shape = RoundedCornerShape(8.dp),
    border = BorderStroke(1.dp, colorResource(id = R.color.colorBorderDefault)),
    shadowElevation = 2.dp
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "Card Title",
            style = HeadingMedium,
            color = colorResource(id = R.color.colorContentBold)
        )
        Text(
            text = "Card content",
            style = BodyMedium,
            color = colorResource(id = R.color.colorContentDefault)
        )
    }
}
```

### Status Badge

```kotlin
@Composable
fun StatusBadge(isActive: Boolean) {
    Surface(
        color = if (isActive)
            colorResource(id = R.color.colorBackgroundSuccessSubtle)
        else
            colorResource(id = R.color.colorBackgroundMuted),
        shape = RoundedCornerShape(12.dp)
    ) {
        Text(
            text = if (isActive) "Active" else "Inactive",
            style = LabelSmall,
            color = if (isActive)
                colorResource(id = R.color.colorContentSuccessDefault)
            else
                colorResource(id = R.color.colorContentMuted),
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}
```

## Troubleshooting

### Color not found
- Verify the color exists in `values/colors.xml`
- Check spelling of color name
- Ensure using `R.color.` not `R.drawable.`

### Wrong color in dark mode
- Check `values-night/colors.xml` has the color defined
- Verify using `colorResource()` not `Color()`
- Test with device in dark mode

### Poor contrast
- Use Bold content colors for emphasis
- Avoid Muted colors on Subtle backgrounds
- Test with accessibility tools
- Check contrast ratio (4.5:1 for normal text, 3:1 for large text)

## Related Resources

- XML Color Definitions: `app/src/main/res/values/colors.xml`
- Dark Mode Colors: `app/src/main/res/values-night/colors.xml`
- [Material Design Color System](https://m3.material.io/styles/color/system/overview)
- [Android Color Resources](https://developer.android.com/guide/topics/resources/more-resources#Color)

## See Also

- [Text Styles Reference](text-styles.md) - Typography mapping
- [Component References](../README.md) - Component-specific color usage
