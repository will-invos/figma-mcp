# Feedback & Notifications

Components for user feedback, notifications, and status indicators.

## Component Mapping

| Figma Component | Compose Component | File Path |
|-----------------|-------------------|-----------|
| Loading Indicator | Loading components | `ui/composeview/loading/` |
| Dialog | Dialog components | `ui/composeview/dialog/` |
| Empty State | EmptyView components | `ui/composeview/emptyview/` |
| Notification Dot | NewNotifyDot | `ui/composeview/widgets/NewNotifyDot.kt` |
| Tooltip | ToolTipCompose | `ui/composeview/widgets/ToolTipCompose.kt` |

## Loading Components

Loading indicators for asynchronous operations.

### Basic Loading Indicator

```kotlin
@Composable
fun MyLoadingScreen() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        CircularProgressIndicator(
            color = colorResource(id = R.color.colorBackgroundBrandDefault)
        )
    }
}
```

### Inline Loading

```kotlin
@Composable
fun MyContent(isLoading: Boolean) {
    if (isLoading) {
        Row(
            horizontalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxWidth()
        ) {
            CircularProgressIndicator(
                modifier = Modifier.size(24.dp),
                strokeWidth = 2.dp
            )
        }
    } else {
        // Content
    }
}
```

### With Message

```kotlin
@Composable
fun LoadingWithMessage(message: String = "Loading...") {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalAlignment = Alignment.CenterVertically
    ) {
        CircularProgressIndicator()
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = message,
            style = BodyMedium,
            color = colorResource(id = R.color.colorContentSubtle)
        )
    }
}
```

### Design Specifications
- Default size: 40dp
- Stroke width: 4dp
- Color: `colorBackgroundBrandDefault`
- Inline size: 24dp with 2dp stroke

### File Location
Custom loading components are in `ui/composeview/loading/`

## Dialog Components

Modal dialogs for important information and confirmations.

### Basic Alert Dialog

```kotlin
@Composable
fun MyAlertDialog(
    title: String,
    message: String,
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(text = title, style = HeadingMedium)
        },
        text = {
            Text(text = message, style = BodyMedium)
        },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("Confirm")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
```

### Confirmation Dialog

```kotlin
@Composable
fun ConfirmDeleteDialog(
    itemName: String,
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        icon = {
            Icon(
                imageVector = Icons.Default.Warning,
                contentDescription = null,
                tint = colorResource(id = R.color.colorContentDanger)
            )
        },
        title = {
            Text("Delete $itemName?", style = HeadingMedium)
        },
        text = {
            Text(
                "This action cannot be undone.",
                style = BodyMedium
            )
        },
        confirmButton = {
            TextButton(
                onClick = onConfirm,
                colors = ButtonDefaults.textButtonColors(
                    contentColor = colorResource(id = R.color.colorContentDanger)
                )
            ) {
                Text("Delete")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
```

### Custom Dialog

```kotlin
@Composable
fun MyCustomDialog(
    onDismiss: () -> Unit,
    content: @Composable () -> Unit
) {
    Dialog(onDismissRequest = onDismiss) {
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = colorResource(id = R.color.colorBackgroundDefault)
        ) {
            Column(
                modifier = Modifier.padding(24.dp)
            ) {
                content()
            }
        }
    }
}
```

### Design Specifications
- Corner radius: 16dp
- Padding: 24dp
- Background: `colorBackgroundDefault`
- Title: `HeadingMedium`
- Body text: `BodyMedium`
- Buttons: `LabelMedium`

### File Location
Custom dialog components are in `ui/composeview/dialog/`

## Empty State Components

Empty state views when no content is available.

### Basic Empty State

```kotlin
@Composable
fun EmptyInvoiceList() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = ImageVector.vectorResource(R.drawable.icon_invoice_empty),
            contentDescription = null,
            modifier = Modifier.size(120.dp),
            tint = colorResource(id = R.color.colorContentSubtle)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "No invoices yet",
            style = HeadingMedium,
            color = colorResource(id = R.color.colorContentDefault)
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Start by adding your first invoice",
            style = BodyMedium,
            color = colorResource(id = R.color.colorContentSubtle),
            textAlign = TextAlign.Center
        )
    }
}
```

### Empty State with Action

```kotlin
@Composable
fun EmptyStateWithAction(
    title: String,
    message: String,
    actionText: String,
    onAction: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = ImageVector.vectorResource(R.drawable.icon_empty),
            contentDescription = null,
            modifier = Modifier.size(120.dp),
            tint = colorResource(id = R.color.colorContentSubtle)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(text = title, style = HeadingMedium)
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = message,
            style = BodyMedium,
            color = colorResource(id = R.color.colorContentSubtle),
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(24.dp))
        ButtonCompose(
            text = actionText,
            onClick = onAction
        )
    }
}
```

### Design Specifications
- Icon size: 120dp
- Icon color: `colorContentSubtle`
- Title: `HeadingMedium`
- Message: `BodyMedium`, `colorContentSubtle`
- Centered alignment
- Padding: 32dp

### File Location
Empty view components are in `ui/composeview/emptyview/`

## NewNotifyDot

Small notification indicator dot.

### Basic Usage

```kotlin
@Composable
fun NotificationIcon(hasNotification: Boolean) {
    Box {
        Icon(
            imageVector = Icons.Default.Notifications,
            contentDescription = "Notifications"
        )

        if (hasNotification) {
            NewNotifyDot(
                modifier = Modifier.align(Alignment.TopEnd)
            )
        }
    }
}
```

### With Badge Count

```kotlin
@Composable
fun NotificationWithCount(count: Int) {
    BadgedBox(
        badge = {
            if (count > 0) {
                Badge {
                    Text(
                        text = if (count > 99) "99+" else count.toString(),
                        style = LabelXSmall
                    )
                }
            }
        }
    ) {
        Icon(
            imageVector = Icons.Default.Notifications,
            contentDescription = "Notifications"
        )
    }
}
```

### Design Specifications
- Size: 8dp × 8dp
- Color: `colorBackgroundDanger` (red)
- Shape: Circle
- Position: Top-right of parent

## ToolTipCompose

Tooltip for providing contextual help.

### Basic Usage

```kotlin
@Composable
fun MyTooltip() {
    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = {
            PlainTooltip {
                Text("This is a tooltip", style = BodySmall)
            }
        },
        state = rememberTooltipState()
    ) {
        Icon(
            imageVector = Icons.Default.Info,
            contentDescription = "Info",
            modifier = Modifier.tooltipAnchor()
        )
    }
}
```

### Custom Tooltip

```kotlin
@Composable
fun CustomTooltip(
    tooltipText: String,
    content: @Composable () -> Unit
) {
    ToolTipCompose(
        text = tooltipText,
        content = content
    )
}
```

### Design Specifications
- Background: `colorBackgroundInverse`
- Text: `BodySmall`, `colorContentInverse`
- Padding: 8dp horizontal, 4dp vertical
- Corner radius: 4dp
- Max width: 200dp

## Common Patterns

### Loading State Management

```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when {
        uiState.isLoading -> LoadingScreen()
        uiState.error != null -> ErrorScreen(uiState.error)
        uiState.isEmpty -> EmptyStateScreen()
        else -> ContentScreen(uiState.data)
    }
}
```

### Confirmation Flow

```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel) {
    val showDeleteDialog by viewModel.showDeleteDialog.collectAsStateWithLifecycle()

    // Screen content
    // ...

    if (showDeleteDialog) {
        ConfirmDeleteDialog(
            itemName = "Invoice",
            onDismiss = { viewModel.dismissDeleteDialog() },
            onConfirm = { viewModel.confirmDelete() }
        )
    }
}
```

### Progress Indicator

```kotlin
@Composable
fun UploadScreen(viewModel: UploadViewModel) {
    val progress by viewModel.uploadProgress.collectAsStateWithLifecycle()
    val isUploading by viewModel.isUploading.collectAsStateWithLifecycle()

    Column(modifier = Modifier.padding(16.dp)) {
        if (isUploading) {
            LinearProgressIndicator(
                progress = progress,
                modifier = Modifier.fillMaxWidth(),
                color = colorResource(id = R.color.colorBackgroundBrandDefault)
            )
            Text(
                text = "${(progress * 100).toInt()}%",
                style = BodySmall,
                modifier = Modifier.padding(top = 8.dp)
            )
        }
    }
}
```

## Design System Integration

### Colors
- Loading indicator: `colorBackgroundBrandDefault`
- Dialog background: `colorBackgroundDefault`
- Empty state icon: `colorContentSubtle`
- Error state: `colorContentDanger`
- Success state: `colorContentSuccess`
- Notification dot: `colorBackgroundDanger`

### Text Styles
- Dialog title: `HeadingMedium`
- Dialog message: `BodyMedium`
- Empty state title: `HeadingMedium`
- Empty state message: `BodyMedium`
- Tooltip: `BodySmall`

## Best Practices

1. **Show appropriate feedback**:
   - Loading → Show progress indicator
   - Empty → Show empty state with action
   - Error → Show error message with retry
   - Success → Brief confirmation

2. **Handle loading states**:
   - Disable interactions during loading
   - Show progress for long operations
   - Provide cancellation option when appropriate

3. **Use dialogs sparingly**:
   - Only for critical decisions
   - Keep message concise
   - Provide clear actions

4. **Design empty states**:
   - Explain why it's empty
   - Provide action to add content
   - Use friendly illustration/icon

5. **Consider accessibility**:
   - Provide text alternatives for icons
   - Ensure sufficient color contrast
   - Support screen readers

## Related Components

- [Buttons](buttons.md) - For dialog actions
- [Containers & Layout](containers-layout.md) - For bottom sheets as alternatives to dialogs

## See Also

- [Color Reference](colors.md) - Design system colors
- [Text Styles Reference](text-styles.md) - Typography mapping
- [Material Design - Dialogs](https://m3.material.io/components/dialogs/overview)
- [Material Design - Progress Indicators](https://m3.material.io/components/progress-indicators/overview)
