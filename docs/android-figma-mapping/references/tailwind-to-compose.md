# Tailwind to Compose Mapping

Guide for converting Tailwind CSS classes from MCP Figma output to Jetpack Compose modifiers.

## Overview

When MCP Figma returns React + Tailwind JSX code, use this guide to convert Tailwind classes to equivalent Compose modifiers. This ensures consistent styling while following the project's Compose patterns.

## Layout & Flex

### Flex Direction

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `flex` | `Row` or `Column` (depends on flex-col/flex-row) | - |
| `flex-col` | `Column(...)` | `Column { }` |
| `flex-row` | `Row(...)` | `Row { }` |

### Flex Properties

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `flex-[1_0_0]` | `modifier = Modifier.weight(1f)` | `.weight(1f)` |
| `flex-none` | `modifier = Modifier` (no weight) | - |
| `shrink-0` | Implicit in Compose (no action needed) | - |

### Gap (Spacing Between Children)

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `gap-[4px]` | `verticalArrangement = Arrangement.spacedBy(4.dp)` (Column)<br/>`horizontalArrangement = Arrangement.spacedBy(4.dp)` (Row) | `Column(verticalArrangement = Arrangement.spacedBy(4.dp))` |
| `gap-[8px]` | `Arrangement.spacedBy(8.dp)` | `Row(horizontalArrangement = Arrangement.spacedBy(8.dp))` |
| `gap-[16px]` | `Arrangement.spacedBy(16.dp)` | - |
| `gap-[20px]` | `Arrangement.spacedBy(20.dp)` | - |
| `gap-[var(--space/500,20px)]` | `Arrangement.spacedBy(20.dp)` | Extract the fallback value |

## Alignment

### Items (Cross Axis Alignment)

| Tailwind Class | Compose Equivalent | Notes |
|----------------|-------------------|-------|
| `items-center` | Column: `horizontalAlignment = Alignment.CenterHorizontally`<br/>Row: `verticalAlignment = Alignment.CenterVertically` | Depends on parent container |
| `items-start` | Column: `horizontalAlignment = Alignment.Start`<br/>Row: `verticalAlignment = Alignment.Top` | - |
| `items-end` | Column: `horizontalAlignment = Alignment.End`<br/>Row: `verticalAlignment = Alignment.Bottom` | - |

### Justify (Main Axis Alignment)

| Tailwind Class | Compose Equivalent | Notes |
|----------------|-------------------|-------|
| `justify-center` | Column: `verticalArrangement = Arrangement.Center`<br/>Row: `horizontalArrangement = Arrangement.Center` | - |
| `justify-start` | Column: `verticalArrangement = Arrangement.Top`<br/>Row: `horizontalArrangement = Arrangement.Start` | - |
| `justify-end` | Column: `verticalArrangement = Arrangement.Bottom`<br/>Row: `horizontalArrangement = Arrangement.End` | - |
| `justify-between` | `Arrangement.SpaceBetween` | - |

## Padding & Margin

### Padding

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `p-[4px]` | `modifier = Modifier.padding(4.dp)` | `.padding(4.dp)` |
| `p-[8px]` | `modifier = Modifier.padding(8.dp)` | `.padding(8.dp)` |
| `p-[10px]` | `modifier = Modifier.padding(10.dp)` | `.padding(10.dp)` |
| `p-[12px]` | `modifier = Modifier.padding(12.dp)` | `.padding(12.dp)` |
| `p-[16px]` | `modifier = Modifier.padding(16.dp)` | `.padding(16.dp)` |
| `p-[var(--space/400,16px)]` | `modifier = Modifier.padding(16.dp)` | Extract fallback value |
| `px-[10px]` | `modifier = Modifier.padding(horizontal = 10.dp)` | Horizontal padding |
| `py-[8px]` | `modifier = Modifier.padding(vertical = 8.dp)` | Vertical padding |
| `px-[16px] py-[12px]` | `modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)` | Combined |
| `px-[var(--space/700,28px)]` | `modifier = Modifier.padding(horizontal = 28.dp)` | - |
| `py-[var(--space/800,32px)]` | `modifier = Modifier.padding(vertical = 32.dp)` | - |

### Padding Individual Sides

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `pt-[8px]` | `modifier = Modifier.padding(top = 8.dp)` | - |
| `pb-[8px]` | `modifier = Modifier.padding(bottom = 8.dp)` | - |
| `pl-[16px]` | `modifier = Modifier.padding(start = 16.dp)` | Use `start` for RTL support |
| `pr-[16px]` | `modifier = Modifier.padding(end = 16.dp)` | Use `end` for RTL support |

## Size & Dimensions

### Width

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `w-full` | `modifier = Modifier.fillMaxWidth()` | `.fillMaxWidth()` |
| `w-[24px]` | `modifier = Modifier.width(24.dp)` | `.width(24.dp)` |
| `w-[49px]` | `modifier = Modifier.width(49.dp)` | - |
| `w-[360px]` | `modifier = Modifier.width(360.dp)` | - |
| `min-w-px` | Compose handles this automatically | - |

### Height

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `h-full` | `modifier = Modifier.fillMaxHeight()` | `.fillMaxHeight()` |
| `h-[30px]` | `modifier = Modifier.height(30.dp)` | `.height(30.dp)` |
| `h-[40px]` | `modifier = Modifier.height(40.dp)` | - |
| `h-[56px]` | `modifier = Modifier.height(56.dp)` | - |
| `h-[96px]` | `modifier = Modifier.height(96.dp)` | - |
| `min-h-px` | Compose handles this automatically | - |

### Size (Width + Height)

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `size-full` | `modifier = Modifier.fillMaxSize()` | `.fillMaxSize()` |
| `size-[16px]` | `modifier = Modifier.size(16.dp)` | `.size(16.dp)` |
| `size-[20px]` | `modifier = Modifier.size(20.dp)` | - |
| `size-[24px]` | `modifier = Modifier.size(24.dp)` | - |
| `size-[40px]` | `modifier = Modifier.size(40.dp)` | - |

## Background Colors

### Color Variables

| Tailwind Class | Compose Equivalent | Notes |
|----------------|-------------------|-------|
| `bg-[var(--color-background-default,white)]` | `colorResource(R.color.colorBackgroundDefault)` | Map var name to color resource |
| `bg-[var(--color/background/brand/default,#3560ff)]` | `colorResource(R.color.colorBackgroundBrandDefault)` | - |
| `bg-[var(--color/background/neutral/subtle,#edeff3)]` | `colorResource(R.color.colorBackgroundNeutralSubtle)` | - |
| `bg-[var(--color/background/fixed/white,white)]` | `Color.White` | Fixed colors use Color.White |

### Variable Name Mapping

| Figma Variable | Android Color Resource |
|----------------|----------------------|
| `--color-background-default` | `R.color.colorBackgroundDefault` |
| `--color/background/brand/default` | `R.color.colorBackgroundBrandDefault` |
| `--color/background/transparent/default` | `Color.Transparent` |
| `--color/content/bold` | `R.color.colorContentBold` |
| `--color/content/default` | `R.color.colorContentDefault` |
| `--color/content/subtlest` | `R.color.colorContentSubtlest` |
| `--color/content/brand/default` | `R.color.colorContentBrandDefault` |
| `--color/content/danger/default` | `R.color.colorContentDangerDefault` |
| `--color/border/default` | `R.color.colorBorderDefault` |
| `--color/border/subtle` | `R.color.colorBorderSubtle` |
| `--color/border/brand` | `R.color.colorBorderBrandDefault` |

## Borders

### Border Width & Style

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `border` | `border = BorderStroke(1.dp, color)` | Default 1dp |
| `border-[var(--color/border/subtle,#edeff3)]` | `border = BorderStroke(1.dp, colorResource(R.color.colorBorderSubtle))` | - |
| `border-b` | Use `HorizontalDivider` instead | `HorizontalDivider(thickness = 1.dp, color = ...)` |
| `border-l` | `border = BorderStroke(...)` with modifier | Less common, use Box with background |
| `border-solid` | Default in Compose (no action needed) | - |

### Border Radius

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `rounded-[4px]` | `shape = RoundedCornerShape(4.dp)` | `RoundedCornerShape(4.dp)` |
| `rounded-[8px]` | `shape = RoundedCornerShape(8.dp)` | - |
| `rounded-[12px]` | `shape = RoundedCornerShape(12.dp)` | - |
| `rounded-[16px]` | `shape = RoundedCornerShape(16.dp)` | - |
| `rounded-[18px]` | `shape = RoundedCornerShape(18.dp)` | - |
| `rounded-[var(--radius/200,8px)]` | `shape = RoundedCornerShape(8.dp)` | Extract fallback |
| `rounded-[var(--radius/300,12px)]` | `shape = RoundedCornerShape(12.dp)` | - |
| `rounded-[var(--radius/400,16px)]` | `shape = RoundedCornerShape(16.dp)` | - |
| `rounded-tl-[8px]` | `shape = RoundedCornerShape(topStart = 8.dp)` | Specific corners |
| `rounded-tr-[8px]` | `shape = RoundedCornerShape(topEnd = 8.dp)` | - |

## Text Styles

### Font Properties

| Tailwind Class | Compose Equivalent | Notes |
|----------------|-------------------|-------|
| `text-[14px]` | Part of `TextStyle` (see text-styles.md) | Map to project TextStyle |
| `text-[12px]` | Part of `TextStyle` | - |
| `font-['Noto_Sans_TC:Regular']` | Use project TextStyle | Font family handled by TextStyle |
| `font-normal` | `fontWeight = FontWeight(400)` | Regular weight |
| `font-medium` | `fontWeight = FontWeight(500)` | Medium weight |
| `leading-[22px]` | Part of `TextStyle` lineHeight | - |
| `leading-[18px]` | Part of `TextStyle` lineHeight | - |
| `tracking-[0.56px]` | `letterSpacing = 0.56.sp` | - |
| `tracking-[0.48px]` | `letterSpacing = 0.48.sp` | - |

### Text Color

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `text-[color:var(--color/content/bold,#101119)]` | `color = colorResource(R.color.colorContentBold)` | - |
| `text-[color:var(--color/content/default,#3b3c43)]` | `color = colorResource(R.color.colorContentDefault)` | - |
| `text-[color:var(--color/content/subtlest,#9b9baa)]` | `color = colorResource(R.color.colorContentSubtlest)` | - |
| `text-[color:var(--color/content/brand/default,#3560ff)]` | `color = colorResource(R.color.colorContentBrandDefault)` | - |

### Text Alignment

| Tailwind Class | Compose Equivalent | Example |
|----------------|-------------------|---------|
| `text-center` | `textAlign = TextAlign.Center` | - |
| `text-start` | `textAlign = TextAlign.Start` | - |
| `text-end` | `textAlign = TextAlign.End` | - |

## Special Cases

### Overflow

| Tailwind Class | Compose Equivalent | Notes |
|----------------|-------------------|-------|
| `overflow-clip` | `modifier = Modifier.clipToBounds()` | - |

### Position

| Tailwind Class | Compose Equivalent | Notes |
|----------------|-------------------|-------|
| `relative` | Default in Compose (no action needed) | - |
| `absolute` | Use `Box` with positioning modifiers | Less common in Compose |

### Content Stretch

| Tailwind Class | Compose Equivalent | Notes |
|----------------|-------------------|-------|
| `content-stretch` | Compose handles this automatically | No explicit modifier needed |

## Conversion Process

### Step-by-Step Guide

1. **Identify the container type**:
   - `flex flex-col` → `Column`
   - `flex flex-row` → `Row`
   - No flex → `Box` or standalone component

2. **Extract layout properties**:
   - Gap → `Arrangement.spacedBy(...)`
   - Items alignment → `horizontalAlignment` or `verticalAlignment`
   - Justify → Main axis arrangement

3. **Convert modifiers in order**:
   - Size (width, height, size)
   - Padding
   - Background
   - Border
   - Shape (rounded corners)

4. **Map colors using variable name**:
   - Extract `var(--color/category/variant)`
   - Convert to `R.color.colorCategoryVariant`
   - Use fallback hex if variable not found

5. **Handle text separately**:
   - Extract font properties (size, weight, lineHeight)
   - Map to project TextStyle using text-styles.md
   - Apply color separately

## Examples

### Example 1: Card Container

**Tailwind:**
```jsx
<div className="bg-[var(--color-background-default,white)]
                border border-[var(--color/border/subtle,#edeff3)]
                rounded-[var(--radius/400,16px)]
                flex flex-col
                items-center
                w-full">
```

**Compose:**
```kotlin
Card(
    modifier = Modifier.fillMaxWidth(),
    colors = CardDefaults.cardColors(
        containerColor = colorResource(R.color.colorBackgroundDefault)
    ),
    shape = RoundedCornerShape(16.dp),
    border = BorderStroke(1.dp, colorResource(R.color.colorBorderSubtle)),
    elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Children
    }
}
```

### Example 2: Row with Gap and Padding

**Tailwind:**
```jsx
<div className="flex gap-[8px] items-center px-[16px] py-[12px]">
```

**Compose:**
```kotlin
Row(
    modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    // Children
}
```

### Example 3: Text with Styling

**Tailwind:**
```jsx
<p className="font-['Noto_Sans_TC:Regular']
              text-[14px]
              text-[color:var(--color/content/bold,#101119)]
              leading-[22px]
              tracking-[0.56px]">
    手機條碼
</p>
```

**Compose:**
```kotlin
Text(
    text = "手機條碼",
    style = BodyMedium,  // 14px + Regular (400) + 22px line height
    color = colorResource(R.color.colorContentBold)
)
```

### Example 4: Button with Border

**Tailwind:**
```jsx
<div className="bg-[var(--color/background/transparent/default,rgba(0,0,0,0))]
                border border-[var(--color/border/brand,#3560ff)]
                rounded-[var(--radius/200,8px)]
                h-[30px]
                px-[var(--space/150,6px)]">
```

**Compose:**
```kotlin
ButtonCompose(
    text = "設定",
    onClick = { /* action */ },
    buttonType = ButtonType.Outline,
    buttonStyle = ButtonStyle.Small  // 30dp height
)
```

## Variable Extraction Helper

When you see `var(--variable-name, fallback)`:

1. Extract variable name: `--color/content/bold`
2. Convert to camelCase: `colorContentBold`
3. Prefix with category: `R.color.colorContentBold`
4. If not found, use fallback value

## Best Practices

1. **Prefer project components**: Check if a custom component exists before creating generic composables
2. **Use semantic colors**: Always map to `R.color.*` resources, never hardcode hex values
3. **Apply TextStyles**: Use predefined TextStyles from text-styles.md rather than individual properties
4. **Handle RTL**: Use `start`/`end` instead of `left`/`right` for padding and alignment
5. **Simplify when possible**: If Tailwind has many classes, check if a project component handles it all

## Related References

- [Text Style Mapping](text-styles.md) - Map font properties to TextStyles
- [Color Mapping](colors.md) - Complete color resource reference
- [Component Name Mapping](component-name-mapping.md) - Map Figma component names to project components
- [Component References](../README.md) - Full component documentation
