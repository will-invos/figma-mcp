# Text Style Mapping

Guide for mapping Figma text properties to Compose TextStyle definitions.

## Overview

When implementing text from Figma designs, map Figma text styles to the project's TextStyle definitions. These styles are defined in `ui/composeview/theme/TextStyle.kt` and provide consistent typography throughout the app.

## TextStyle Location

**File**: `core/designsystem/src/main/java/tw/com/quickscanner/invoice/ui/composeview/theme/TextStyle.kt`

## Using TextStyles in Compose

### Basic Usage

```kotlin
import tw.com.quickscanner.invoice.ui.composeview.theme.*

@Composable
fun MyComponent() {
    Text(
        text = "Heading",
        style = HeadingMedium,
        color = colorResource(id = R.color.colorContentBold)
    )

    Text(
        text = "Body text content",
        style = BodyMedium,
        color = colorResource(id = R.color.colorContentDefault)
    )
}
```

### Multiple Styles

```kotlin
@Composable
fun MyCard() {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "Card Title",
            style = HeadingLarge,
            color = colorResource(id = R.color.colorContentBold)
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Description text goes here",
            style = BodyMedium,
            color = colorResource(id = R.color.colorContentDefault)
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = "Additional info",
            style = BodySmall,
            color = colorResource(id = R.color.colorContentSubtle)
        )
    }
}
```

## Figma Properties to TextStyle Mapping

### Mapping Table

| FontSize | FontWeight | LineHeight | Project TextStyle | Usage |
|----------|------------|------------|-------------------|-------|
| 28sp | 500 (Medium) | 42sp | DisplayRegular | Page titles, major headings |
| 28sp | 500 (Medium) | 36sp | Display | Page titles, major headings |
| 24sp | 500 (Medium) | 32sp | HeadingLarge | Section headings |
| 20sp | 500 (Medium) | 28sp | HeadingMedium | Subsection headings |
| 18sp | 500 (Medium) | 26sp | HeadingSmall | Minor headings |
| 18sp | 400 (Regular) | 26sp | BodyXLarge | Large body text |
| 16sp | 400 (Regular) | 24sp | BodyLarge | Standard body text |
| 14sp | 400 (Regular) | 22sp | BodyMedium | Medium body text |
| 12sp | 400 (Regular) | 18sp | BodySmall | Small body text |
| 10sp | 400 (Regular) | 16sp | BodyXSmall | Very small body text |
| 16sp | 500 (Medium) | 24sp | LabelLarge | Large labels/buttons |
| 14sp | 500 (Medium) | 22sp | LabelMedium | Medium labels/buttons |
| 12sp | 500 (Medium) | 18sp | LabelSmall | Small labels/buttons |
| 10sp | 500 (Medium) | 16sp | LabelXSmall | Very small labels |
| 16sp | 400 (Regular) | 24sp | CodeLarge | Large code text |
| 14sp | 400 (Regular) | 22sp | CodeMedium | Medium code text |
| 12sp | 400 (Regular) | 18sp | CodeSmall | Small code text |

## Mapping Process

When you extract text style information from Figma, you'll get properties like:

```
textStyle:
  fontFamily: Noto Sans TC
  fontWeight: 500
  fontSize: 12
  lineHeight: 1.5em
  letterSpacing: 4%
```

Follow these steps to map to the correct TextStyle:

### Step 1: Match Font Size
Find rows in the mapping table that match the fontSize from Figma.

### Step 2: Match Font Weight
- **FontWeight 500 (Medium)**: Look at Label styles (for interactive) or Heading styles (for titles)
- **FontWeight 400 (Regular)**: Look at Body styles (for content) or Code styles (for monospace)

### Step 3: Consider Context
Choose based on the text's purpose:
- **Interactive elements** (buttons, clickable text) → Label styles
- **Headings and titles** → Heading styles
- **Body content** → Body styles
- **Code or monospace** → Code styles

## Selection Rules

### Font Weight Priority

**FontWeight 500 (Medium)**
- Interactive elements → `Label` styles
- Titles and headings → `Heading` styles
- Examples: Buttons, tabs, section headers

**FontWeight 400 (Regular)**
- Content text → `Body` styles
- Monospace text → `Code` styles
- Examples: Paragraphs, descriptions, code blocks

### Font Size Priority

Match the fontSize first, then consider fontWeight and context:

**Large Sizes (24sp+)**
- Page titles → `Display` or `HeadingLarge`
- Major headings → `HeadingLarge`

**Medium Sizes (16-20sp)**
- Section headings → `HeadingMedium`, `HeadingSmall`
- Standard content → `BodyLarge`, `BodyXLarge`
- Large labels → `LabelLarge`

**Small Sizes (10-14sp)**
- Body text → `BodyMedium`, `BodySmall`
- Labels and buttons → `LabelMedium`, `LabelSmall`
- Captions → `BodyXSmall`, `LabelXSmall`

## Practical Examples

### Example 1: Button Text

**Figma Properties:**
- fontSize: 12sp
- fontWeight: 500
- lineHeight: 18sp

**Mapping:**
→ `LabelSmall` (12sp, FontWeight(500), 18sp)

```kotlin
Text(
    text = "Button Text",
    style = LabelSmall,
    color = colorResource(id = R.color.colorContentDefault)
)
```

### Example 2: Body Content

**Figma Properties:**
- fontSize: 16sp
- fontWeight: 400
- lineHeight: 24sp

**Mapping:**
→ `BodyLarge` (16sp, FontWeight(400), 24sp)

```kotlin
Text(
    text = "This is body content with standard size",
    style = BodyLarge,
    color = colorResource(id = R.color.colorContentDefault)
)
```

### Example 3: Section Heading

**Figma Properties:**
- fontSize: 20sp
- fontWeight: 500
- lineHeight: 28sp

**Mapping:**
→ `HeadingMedium` (20sp, FontWeight(500), 28sp)

```kotlin
Text(
    text = "Section Title",
    style = HeadingMedium,
    color = colorResource(id = R.color.colorContentBold)
)
```

### Example 4: Small Caption

**Figma Properties:**
- fontSize: 12sp
- fontWeight: 400
- lineHeight: 18sp

**Mapping:**
→ `BodySmall` (12sp, FontWeight(400), 18sp)

```kotlin
Text(
    text = "Caption text or metadata",
    style = BodySmall,
    color = colorResource(id = R.color.colorContentSubtle)
)
```

## Quick Reference for Common Figma Patterns

| Figma Pattern | TextStyle | Typical Usage |
|---------------|-----------|---------------|
| 12sp + Medium | `LabelSmall` | Buttons, tags, small interactive text |
| 12sp + Regular | `BodySmall` | Small body text, descriptions |
| 14sp + Medium | `LabelMedium` | Medium buttons, important labels |
| 14sp + Regular | `BodyMedium` | Standard body text |
| 16sp + Medium | `LabelLarge` | Large buttons, prominent labels |
| 16sp + Regular | `BodyLarge` | Large body text |
| 20sp + Medium | `HeadingMedium` | Section headings |
| 24sp + Medium | `HeadingLarge` | Page headings |
| 28sp + Medium | `Display` | Hero titles, major page titles |

## TextStyle Categories

### Display Styles
Large, prominent text for main titles.

```kotlin
Text("Main Title", style = DisplayRegular)  // 28sp, 42sp line height
Text("Page Title", style = Display)         // 28sp, 36sp line height
```

### Heading Styles
Hierarchical headings for content structure.

```kotlin
Text("Section Title", style = HeadingLarge)    // 24sp
Text("Subsection", style = HeadingMedium)      // 20sp
Text("Minor Heading", style = HeadingSmall)    // 18sp
```

### Body Styles
Content text with varying sizes.

```kotlin
Text("Large content", style = BodyXLarge)      // 18sp
Text("Standard content", style = BodyLarge)    // 16sp
Text("Medium content", style = BodyMedium)     // 14sp (most common)
Text("Small content", style = BodySmall)       // 12sp
Text("Tiny content", style = BodyXSmall)       // 10sp
```

### Label Styles
Interactive elements and labels.

```kotlin
Text("Large Button", style = LabelLarge)       // 16sp
Text("Button", style = LabelMedium)            // 14sp (most common)
Text("Small Button", style = LabelSmall)       // 12sp
Text("Tiny Label", style = LabelXSmall)        // 10sp
```

### Code Styles
Monospace text for code display.

```kotlin
Text("Code Large", style = CodeLarge)          // 16sp
Text("Code Medium", style = CodeMedium)        // 14sp
Text("Code Small", style = CodeSmall)          // 12sp
```

## Legacy Figma Text Style Names

If your Figma file uses named text styles, use this mapping:

| Figma Text Style | Project TextStyle |
|------------------|-------------------|
| Display | Display |
| Heading/Large | HeadingLarge |
| Heading/Medium | HeadingMedium |
| Heading/Small | HeadingSmall |
| Body/XLarge | BodyXLarge |
| Body/Large | BodyLarge |
| Body/Medium | BodyMedium |
| Body/Small | BodySmall |
| Body/XSmall | BodyXSmall |
| Label/Large | LabelLarge |
| Label/Medium | LabelMedium |
| Label/Small | LabelSmall |
| Label/XSmall | LabelXSmall |
| Code/Large | CodeLarge |
| Code/Medium | CodeMedium |
| Code/Small | CodeSmall |

## Component-Specific Text Styles

### App Bar Title
```kotlin
TopBackAppBar(
    title = "Screen Title",  // Uses HeadingMedium internally
    onBackPressed = { }
)
```

### Button Text
```kotlin
ButtonCompose(
    text = "Submit",  // Typically LabelMedium or LabelLarge
    onClick = { }
)
```

### Tag Text
```kotlin
TagCompose(
    text = "Label",  // Uses LabelMedium (Medium) or LabelSmall (Small)
    tagType = TagType.PrimaryLight,
    tagSize = TagSize.Medium
)
```

### Card Content
```kotlin
Column {
    Text("Card Title", style = HeadingMedium)
    Text("Card description", style = BodyMedium)
    Text("Metadata", style = BodySmall)
}
```

## Best Practices

1. **Use theme text styles, not custom styles**
   ```kotlin
   // ❌ Bad
   Text(
       text = "Title",
       fontSize = 20.sp,
       fontWeight = FontWeight.Medium,
       lineHeight = 28.sp
   )

   // ✅ Good
   Text(
       text = "Title",
       style = HeadingMedium
   )
   ```

2. **Match semantic meaning**
   - Use Heading styles for titles
   - Use Body styles for content
   - Use Label styles for interactive elements

3. **Consider hierarchy**
   - Larger styles for more important content
   - Smaller styles for supporting information
   - Consistent sizing within a screen

4. **Combine with appropriate colors**
   ```kotlin
   Text(
       text = "Important Heading",
       style = HeadingLarge,
       color = colorResource(id = R.color.colorContentBold)
   )

   Text(
       text = "Supporting text",
       style = BodySmall,
       color = colorResource(id = R.color.colorContentSubtle)
   )
   ```

5. **Test readability**
   - Ensure text is readable at all sizes
   - Check line height for comfortable reading
   - Verify sufficient color contrast

## Common Patterns

### Title and Description

```kotlin
Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    Text(
        text = "Main Title",
        style = HeadingLarge,
        color = colorResource(id = R.color.colorContentBold)
    )
    Text(
        text = "Description text that provides more context",
        style = BodyMedium,
        color = colorResource(id = R.color.colorContentDefault)
    )
}
```

### List Item

```kotlin
Row(
    modifier = Modifier.padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    Column(modifier = Modifier.weight(1f)) {
        Text(
            text = "Item Title",
            style = BodyLarge,
            color = colorResource(id = R.color.colorContentDefault)
        )
        Text(
            text = "Item subtitle or metadata",
            style = BodySmall,
            color = colorResource(id = R.color.colorContentSubtle)
        )
    }
    Text(
        text = "$99.99",
        style = LabelMedium,
        color = colorResource(id = R.color.colorContentBold)
    )
}
```

### Form Label and Value

```kotlin
Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
    Text(
        text = "Label",
        style = LabelSmall,
        color = colorResource(id = R.color.colorContentSubtle)
    )
    Text(
        text = "Value",
        style = BodyMedium,
        color = colorResource(id = R.color.colorContentDefault)
    )
}
```

## Troubleshooting

### Text too small/large
- Verify you're using the correct TextStyle
- Check if Figma fontSize matches mapping table
- Consider using next size up/down if needed

### Wrong font weight
- Ensure Medium (500) vs Regular (400) is correct
- Check if using Label vs Body appropriately
- Verify Figma fontWeight property

### Inconsistent line spacing
- Line heights are built into TextStyles
- Don't override lineHeight unless necessary
- Trust the predefined styles for consistency

### Text not appearing correctly
- Ensure importing from correct package: `tw.com.quickscanner.invoice.ui.composeview.theme.*`
- Check TextStyle is applied to `style` parameter, not individual properties
- Verify text color is set separately using `color` parameter

## Related Resources

- TextStyle Definitions: `ui/composeview/theme/TextStyle.kt`
- [Material Design Typography](https://m3.material.io/styles/typography/overview)
- [Compose Text](https://developer.android.com/jetpack/compose/text)

## See Also

- [Color Reference](colors.md) - For text color mapping
- [Component References](../README.md) - Component-specific text style usage
