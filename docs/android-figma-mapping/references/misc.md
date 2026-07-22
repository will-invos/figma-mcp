# Other Components

Miscellaneous UI components for various purposes.

## Component Mapping

| Figma Component | Compose Component | File Path |
|-----------------|-------------------|-----------|
| Basic Tag | TagCompose | `ui/composeview/widgets/TagCompose.kt` |
| Category Tag | CategoryTagCompose | `ui/composeview/widgets/TagCompose.kt` |
| Category Badge | CategoryBadge | `ui/composeview/widgets/CategoryBadge.kt` |
| Banner | Banner components | `ui/composeview/banner/` |
| Web View | WebView components | `ui/composeview/webview/` |
| Search Bar | Search components | `ui/composeview/search/` |
| Scan Code | ScanCode components | `ui/composeview/scancode/` |

## Tag Components

Two types of tag components are available:
- **TagCompose**: General-purpose semantic tags
- **CategoryTagCompose**: Specialized tags for invoice categories and properties

### TagCompose (Basic Tag)

General-purpose tags with semantic colors. Icon is optional.

#### Naming Convention
Follows Figma's `Type + Style` format (e.g., `NeutralLight`, `PrimaryBold`)

#### Light Style Tags (Subtle Background)

```kotlin
// With icon
TagCompose(
    icon = R.drawable.icon_plus_filled,  // Optional
    text = "Tag",
    tagType = TagType.NeutralLight,
    tagSize = TagSize.Medium
)

// Without icon (text only)
TagCompose(
    text = "Label",
    tagType = TagType.PrimaryLight,
    tagSize = TagSize.Medium
)

// Other color options
TagCompose(text = "Success", tagType = TagType.SuccessLight, tagSize = TagSize.Medium)
TagCompose(text = "Danger", tagType = TagType.DangerLight, tagSize = TagSize.Medium)
TagCompose(text = "Warning", tagType = TagType.WarningLight, tagSize = TagSize.Medium)
```

#### Bold Style Tags (Strong Background)

```kotlin
TagCompose(
    icon = R.drawable.icon_check_filled,
    text = "Confirmed",
    tagType = TagType.PrimaryBold,  // Blue background, white text
    tagSize = TagSize.Medium
)

TagCompose(
    text = "Complete",
    tagType = TagType.SuccessBold,  // Green background, white text
    tagSize = TagSize.Small
)

TagCompose(
    text = "Error",
    tagType = TagType.DangerBold,  // Red background, white text
    tagSize = TagSize.Small
)

TagCompose(
    text = "Prize",
    tagType = TagType.PrizeBold,  // Yellow background, black text
    tagSize = TagSize.Small
)
```

#### Using String Resources

```kotlin
TagCompose(
    icon = R.drawable.icon_info,
    textRes = R.string.tag_text,  // Use string resource
    tagType = TagType.PrimaryLight,
    tagSize = TagSize.Medium
)
```

#### TagType Reference

| TagType | Description | Background | Text Color |
|---------|-------------|------------|------------|
| `NeutralLight` | Neutral subtle | Light gray | Default text |
| `PrimaryLight` | Brand subtle | Light blue | Brand dark text |
| `SuccessLight` | Success subtle | Light green | Success dark text |
| `DangerLight` | Danger subtle | Light red | Danger dark text |
| `WarningLight` | Warning subtle | Light yellow | Warning dark text |
| `NeutralBold` | Neutral strong | Dark gray | White |
| `PrimaryBold` | Brand strong | Blue | White |
| `SuccessBold` | Success strong | Green | White |
| `DangerBold` | Danger strong | Red | White |
| `PrizeBold` | Prize strong | Yellow | Black |

### CategoryTagCompose (Category Tag)

Specialized tags for invoice categories and properties. Automatically maps enum to icon, text, and colors.

#### For Invoice Categories

```kotlin
// Use InvoiceCategoryUiModel enum (recommended)
CategoryTagCompose(
    category = InvoiceCategoryUiModel.GROCERY,  // Shopping category
    tagSize = TagSize.Medium
)

CategoryTagCompose(
    category = InvoiceCategoryUiModel.RESTAURANT,  // Restaurant category
    tagSize = TagSize.Small
)

CategoryTagCompose(
    category = InvoiceCategoryUiModel.TRANSPORT,  // Transport category
    tagSize = TagSize.Small
)
```

#### InvoiceCategoryUiModel Reference

- `OTHER`: Other (Gray)
- `RESTAURANT`: Restaurant (Orange)
- `HOME`: Home (Green)
- `TRANSPORT`: Transport (Teal)
- `GROCERY`: Shopping (Blue)
- `ENTERTAINMENT`: Entertainment (Gold)

#### For Invoice Properties

```kotlin
// Prize tag
CategoryTagCompose(
    tagType = InvoiceTagType.PRIZE,  // Yellow background + coin icon
    tagSize = TagSize.Small
)

// Donation tag
CategoryTagCompose(
    tagType = InvoiceTagType.DONATION,  // Pink background + donation icon
    tagSize = TagSize.Small
)

// Source type tags (light gray background)
CategoryTagCompose(tagType = InvoiceTagType.MANUAL, tagSize = TagSize.Small)
CategoryTagCompose(tagType = InvoiceTagType.CARRIER, tagSize = TagSize.Small)
CategoryTagCompose(tagType = InvoiceTagType.SCANNER, tagSize = TagSize.Small)
```

#### InvoiceTagType Reference

- `PRIZE`: Prize (Yellow background + black text)
- `DONATION`: Donation (Pink background + white text)
- `MANUAL`: Manual entry (Light gray background)
- `CARRIER`: Carrier invoice (Light gray background)
- `SCANNER`: Scanned invoice (Light gray background)

### Complete Usage Example

```kotlin
@Composable
fun InvoiceListItem(invoice: Invoice) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // 1. Show invoice category
        CategoryTagCompose(
            category = invoice.category,  // InvoiceCategoryUiModel enum
            tagSize = TagSize.Small
        )

        // 2. Show prize status (using InvoiceTagType)
        if (invoice.isPrize) {
            CategoryTagCompose(
                tagType = InvoiceTagType.PRIZE,
                tagSize = TagSize.Small
            )
        }

        // 3. Show donation status (using InvoiceTagType)
        if (invoice.isDonation) {
            CategoryTagCompose(
                tagType = InvoiceTagType.DONATION,
                tagSize = TagSize.Small
            )
        }

        // 4. Show invoice source (using InvoiceTagType)
        when (invoice.source) {
            InvoiceSource.MANUAL -> CategoryTagCompose(
                tagType = InvoiceTagType.MANUAL,
                tagSize = TagSize.Small
            )
            InvoiceSource.CARRIER -> CategoryTagCompose(
                tagType = InvoiceTagType.CARRIER,
                tagSize = TagSize.Small
            )
            InvoiceSource.SCANNER -> CategoryTagCompose(
                tagType = InvoiceTagType.SCANNER,
                tagSize = TagSize.Small
            )
        }

        // 5. Or use basic tag (TagCompose) for custom status
        if (invoice.isExpired) {
            TagCompose(
                text = "Expired",
                tagType = TagType.DangerLight,
                tagSize = TagSize.Small
            )
        }
    }
}
```

### Design Specifications

#### Medium Size
- Icon: 14dp × 14dp
- Horizontal padding: 8dp
- Vertical padding: 4dp
- Corner radius: 8dp
- Icon-text spacing: 6dp
- Text style: `LabelMedium` (14sp, FontWeight 500, LineHeight 22sp)

#### Small Size
- Icon: 12dp × 12dp
- Horizontal padding: 6dp
- Vertical padding: 2dp
- Corner radius: 6dp
- Icon-text spacing: 4dp
- Text style: `LabelSmall` (12sp, FontWeight 500, LineHeight 18sp)

#### Color Configuration
- **TagCompose**: Uses semantic color tokens for backgrounds and text
- **CategoryTagCompose**: Automatically retrieves colors from InvoiceCategoryResource

### Usage Guidelines

**Use TagCompose for**:
- General status tags
- Temporary labels
- Non-predefined tags
- Examples: "Expired", "Pending", "New"

**Use CategoryTagCompose + InvoiceCategoryUiModel for**:
- Invoice consumption categories
- Auto-mapped icons, text, and colors
- Examples: `GROCERY`, `RESTAURANT`, `TRANSPORT`

**Use CategoryTagCompose + InvoiceTagType for**:
- Invoice properties/attributes
- Prize, donation, source type tags
- Auto-mapped icons, text, and colors
- Examples: `PRIZE`, `DONATION`, `MANUAL`, `CARRIER`, `SCANNER`

### Detailed Examples

See [Tag Usage Examples](../examples/tag-usage.md) for:
- Complete tag type comparisons
- Category vs property tags
- Multiple tag combinations
- Real-world usage patterns

## CategoryBadge

Badge component for category icons.

### Basic Usage

```kotlin
CategoryBadge(
    category = InvoiceCategoryUiModel.GROCERY,
    size = 40.dp
)
```

### Common Parameters
- `category: InvoiceCategoryUiModel` - Category to display
- `size: Dp` - Badge size (default: 40.dp)
- `modifier: Modifier` - Compose modifier

### Design Specifications
- Circular shape
- Category color background
- White icon
- Default size: 40dp

## Banner Components

Information banners for important messages.

### Basic Banner

```kotlin
@Composable
fun InfoBanner(message: String) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = colorResource(id = R.color.colorBackgroundBrandSubtle)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.Info,
                contentDescription = null,
                tint = colorResource(id = R.color.colorContentBrandDefault)
            )
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = message,
                style = BodyMedium,
                color = colorResource(id = R.color.colorContentDefault)
            )
        }
    }
}
```

### Dismissible Banner

```kotlin
@Composable
fun DismissibleBanner(
    message: String,
    onDismiss: () -> Unit
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = colorResource(id = R.color.colorBackgroundWarningSubtle)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                modifier = Modifier.weight(1f),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Warning,
                    contentDescription = null
                )
                Spacer(modifier = Modifier.width(12.dp))
                Text(text = message, style = BodyMedium)
            }
            IconButton(onClick = onDismiss) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "Dismiss"
                )
            }
        }
    }
}
```

### File Location
Custom banner components are in `ui/composeview/banner/`

## Search Components

Search bar components for filtering and finding content.

### Basic Search Bar

```kotlin
@Composable
fun SearchBar(
    query: String,
    onQueryChange: (String) -> Unit,
    onSearch: () -> Unit
) {
    TextField(
        value = query,
        onValueChange = onQueryChange,
        modifier = Modifier.fillMaxWidth(),
        placeholder = { Text("Search") },
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Search,
                contentDescription = "Search"
            )
        },
        trailingIcon = {
            if (query.isNotEmpty()) {
                IconButton(onClick = { onQueryChange("") }) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Clear"
                    )
                }
            }
        },
        singleLine = true,
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
        keyboardActions = KeyboardActions(onSearch = { onSearch() })
    )
}
```

### File Location
Custom search components are in `ui/composeview/search/`

## WebView Components

Web content display components.

### Basic WebView

```kotlin
@Composable
fun MyWebView(url: String) {
    AndroidView(
        factory = { context ->
            WebView(context).apply {
                webViewClient = WebViewClient()
                settings.javaScriptEnabled = true
                loadUrl(url)
            }
        },
        update = { webView ->
            webView.loadUrl(url)
        }
    )
}
```

### File Location
Custom WebView components are in `ui/composeview/webview/`

## ScanCode Components

Components for barcode/QR code scanning.

### File Location
Scan code components are in `ui/composeview/scancode/`

## Design System Integration

### Colors
- Tag backgrounds: Semantic color tokens based on type
- Banner info: `colorBackgroundBrandSubtle`
- Banner warning: `colorBackgroundWarningSubtle`
- Banner danger: `colorBackgroundDangerSubtle`

### Text Styles
- Tag text: `LabelMedium` (Medium), `LabelSmall` (Small)
- Banner text: `BodyMedium`
- Search placeholder: `BodyMedium`

## Best Practices

1. **Tag Usage**:
   - Use CategoryTagCompose for invoice-related tags
   - Use TagCompose for general-purpose tags
   - Keep tag text concise (1-2 words)
   - Use appropriate size for context

2. **Banners**:
   - Use for important information
   - Allow dismissal for non-critical messages
   - Use appropriate color for severity
   - Keep message brief and actionable

3. **Search**:
   - Provide clear placeholder text
   - Show search results immediately
   - Allow easy clearing of search
   - Handle empty states

## Related Components

- [Buttons](buttons.md) - For banner actions
- [Text Fields](text-fields.md) - For search input
- [Feedback & Notifications](feedback-notifications.md) - For related feedback components

## See Also

- [Tag Usage Examples](../examples/tag-usage.md) - Detailed tag patterns
- [Color Reference](colors.md) - Design system colors
- [Text Styles Reference](text-styles.md) - Typography mapping
