# Containers & Layout

Layout structure and navigation components for app organization.

## Component Mapping

| Figma Component | Compose Component | File Path |
|-----------------|-------------------|-----------|
| Bottom Sheet | BottomSheet components | `ui/composeview/bottomsheet/` |
| App Bar | App Bar components | `ui/composeview/appbar/` |
| Navigation Bar with Back Button | TopBackAppBar | `ui/composeview/appbar/TopBackAppBar.kt` |
| Navigation Bar with Close Button | TopCloseAppBar | `ui/composeview/appbar/TopCloseAppBar.kt` |
| Custom App Bar | AppBar | `ui/composeview/appbar/AppBar.kt` |
| Collapsing App Bar | CollapsingToolbarScrollConnection | `ui/composeview/appbar/CollapsingToolbarScrollConnection.kt` |
| Tab Layout | Tab components | `ui/composeview/tab/` |

## App Bar Components

### TopBackAppBar

Navigation bar with back arrow for navigating within a flow.

#### Basic Usage

```kotlin
TopBackAppBar(
    titleRes = R.string.screen_title,
    showDivider = true,
    onBackPressed = { /* Handle back navigation */ }
)
```

#### Using Direct String

```kotlin
TopBackAppBar(
    title = "Screen Title",
    showDivider = true,
    onBackPressed = { /* Handle back navigation */ }
)
```

#### Common Parameters
- `title: String?` - Title text (direct string)
- `titleRes: Int?` - Title text (string resource)
- `showDivider: Boolean` - Show divider line below app bar (default: false)
- `onBackPressed: () -> Unit` - Back button click handler
- `modifier: Modifier` - Compose modifier

#### Design Specifications
- Navigation icon: Back arrow (←)
- Title: `HeadingMedium` text style
- Height: 56dp (standard app bar height)
- Background: `colorBackgroundDefault`
- Divider: `colorBorderDefault` (1dp height)

### TopCloseAppBar

Navigation bar with close (X) icon for dismissing/closing screens.

#### Basic Usage

```kotlin
TopCloseAppBar(
    titleRes = R.string.screen_title,
    showDivider = true,
    onBackPressed = { /* Handle close action */ }
)
```

#### Common Parameters
- `title: String?` - Title text (direct string)
- `titleRes: Int?` - Title text (string resource)
- `showDivider: Boolean` - Show divider line below app bar
- `onBackPressed: () -> Unit` - Close button click handler
- `modifier: Modifier` - Compose modifier

#### When to Use
- Modal dialogs or sheets
- Separate flows that need dismissal
- Bottom sheet headers
- Full-screen overlays

#### Design Specifications
- Navigation icon: Close icon (×)
- Same styling as TopBackAppBar
- Use case distinction: Close vs Navigate Back

### AppBar (Custom)

Flexible app bar for advanced customization.

#### Basic Usage

```kotlin
AppBar(
    title = "Screen Title",
    navigationIconRes = R.drawable.ic_back,
    showDivider = true,
    onBackPressed = { /* Handle navigation */ }
)
```

#### With Custom Actions

```kotlin
AppBar(
    title = "Screen Title",
    navigationIconRes = R.drawable.ic_close,
    showDivider = true,
    actions = {
        IconButton(onClick = { /* Share action */ }) {
            Icon(
                imageVector = ImageVector.vectorResource(R.drawable.icon_share),
                contentDescription = "Share"
            )
        }
        IconButton(onClick = { /* Settings action */ }) {
            Icon(
                imageVector = ImageVector.vectorResource(R.drawable.icon_settings),
                contentDescription = "Settings"
            )
        }
    },
    onBackPressed = { /* Handle navigation */ }
)
```

#### Common Parameters
- `title: String?` - Title text
- `navigationIconRes: Int?` - Custom navigation icon resource
- `showDivider: Boolean` - Show divider line
- `actions: @Composable RowScope.() -> Unit` - Action buttons
- `onBackPressed: (() -> Unit)?` - Navigation click handler
- `modifier: Modifier` - Compose modifier

#### Design Specifications
- Flexible layout for custom needs
- Supports multiple action buttons
- Consistent with Material Design top app bar
- Actions aligned to end of app bar

### CollapsingToolbarScrollConnection

Collapsing toolbar effect for scrollable content.

#### Basic Usage

```kotlin
@Composable
fun MyScreen() {
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()

    Scaffold(
        topBar = {
            LargeTopAppBar(
                title = { Text("Collapsing Title") },
                scrollBehavior = scrollBehavior
            )
        },
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
    ) { paddingValues ->
        LazyColumn(modifier = Modifier.padding(paddingValues)) {
            // Content
        }
    }
}
```

#### Use Cases
- Long scrollable content
- Enhanced visual hierarchy
- More screen space for content
- Parallax effects

#### Design Specifications
- Collapses on scroll up
- Expands on scroll down
- Smooth animation transitions
- Maintains title visibility

### Detailed Examples

See [App Bar Usage Examples](../examples/app-bar-usage.md) for:
- TopBackAppBar patterns
- TopCloseAppBar patterns
- Custom AppBar with actions
- Collapsing toolbar implementation

## Bottom Sheet Components

Bottom sheet components for modal content and selections.

### Basic Bottom Sheet

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MyBottomSheet() {
    val sheetState = rememberModalBottomSheetState()
    var showBottomSheet by remember { mutableStateOf(false) }

    if (showBottomSheet) {
        ModalBottomSheet(
            onDismissRequest = { showBottomSheet = false },
            sheetState = sheetState
        ) {
            // Bottom sheet content
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Bottom Sheet Content", style = HeadingMedium)
                // More content
            }
        }
    }
}
```

### Use Cases
- Options menu
- Selection lists
- Detailed information
- Form inputs
- Confirmation dialogs

### Design Specifications
- Appears from bottom of screen
- Draggable to dismiss
- Optional backdrop
- Rounded top corners
- Background: `colorBackgroundDefault`

### File Location
Custom bottom sheet components are in `ui/composeview/bottomsheet/`

## Tab Components

Tab layout for organizing content into sections.

### Basic Tab Layout

```kotlin
@Composable
fun MyTabScreen() {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Tab 1", "Tab 2", "Tab 3")

    Column {
        TabRow(selectedTabIndex = selectedTab) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = { Text(title, style = LabelMedium) }
                )
            }
        }

        // Tab content
        when (selectedTab) {
            0 -> Tab1Content()
            1 -> Tab2Content()
            2 -> Tab3Content()
        }
    }
}
```

### With Pager

```kotlin
@Composable
fun MyTabScreenWithPager() {
    val pagerState = rememberPagerState(pageCount = { 3 })
    val tabs = listOf("Tab 1", "Tab 2", "Tab 3")

    Column {
        TabRow(
            selectedTabIndex = pagerState.currentPage
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = pagerState.currentPage == index,
                    onClick = {
                        // Scroll to page
                        scope.launch { pagerState.animateScrollToPage(index) }
                    },
                    text = { Text(title, style = LabelMedium) }
                )
            }
        }

        HorizontalPager(state = pagerState) { page ->
            when (page) {
                0 -> Tab1Content()
                1 -> Tab2Content()
                2 -> Tab3Content()
            }
        }
    }
}
```

### Design Specifications
- Selected tab: `colorContentBrandDefault`
- Unselected tab: `colorContentSubtle`
- Indicator: `colorBackgroundBrandDefault`
- Text style: `LabelMedium`

### File Location
Custom tab components are in `ui/composeview/tab/`

## Common Layout Patterns

### Screen with App Bar

```kotlin
@Composable
fun MyScreen(onBackPressed: () -> Unit) {
    Scaffold(
        topBar = {
            TopBackAppBar(
                titleRes = R.string.screen_title,
                showDivider = true,
                onBackPressed = onBackPressed
            )
        }
    ) { paddingValues ->
        // Screen content
        Column(modifier = Modifier.padding(paddingValues)) {
            // Content
        }
    }
}
```

### Screen with App Bar and FAB

```kotlin
@Composable
fun MyScreen(
    onBackPressed: () -> Unit,
    onFabClick: () -> Unit
) {
    Scaffold(
        topBar = {
            TopBackAppBar(
                titleRes = R.string.screen_title,
                showDivider = true,
                onBackPressed = onBackPressed
            )
        },
        floatingActionButton = {
            FABCompose(
                icon = R.drawable.icon_plus_filled,
                onClick = onFabClick
            )
        }
    ) { paddingValues ->
        // Screen content
    }
}
```

### Screen with Tabs

```kotlin
@Composable
fun MyScreen(onBackPressed: () -> Unit) {
    var selectedTab by remember { mutableStateOf(0) }

    Scaffold(
        topBar = {
            TopBackAppBar(
                titleRes = R.string.screen_title,
                showDivider = false,  // No divider, tabs provide visual separation
                onBackPressed = onBackPressed
            )
        }
    ) { paddingValues ->
        Column(modifier = Modifier.padding(paddingValues)) {
            TabRow(selectedTabIndex = selectedTab) {
                // Tabs
            }
            // Tab content
        }
    }
}
```

### Bottom Sheet with Header

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MyBottomSheet(onDismiss: () -> Unit) {
    ModalBottomSheet(
        onDismissRequest = onDismiss
    ) {
        Column {
            // Header with close button
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("Sheet Title", style = HeadingMedium)
                IconButton(onClick = onDismiss) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Close"
                    )
                }
            }

            Divider()

            // Bottom sheet content
            // ...
        }
    }
}
```

## Design System Integration

### Colors
- App bar background: `colorBackgroundDefault`
- App bar title: `colorContentBold`
- Navigation icon: `colorContentDefault`
- Divider: `colorBorderDefault`
- Tab selected: `colorContentBrandDefault`
- Tab unselected: `colorContentSubtle`
- Tab indicator: `colorBackgroundBrandDefault`

### Text Styles
- App bar title: `HeadingMedium`
- Tab text: `LabelMedium`
- Bottom sheet title: `HeadingMedium`

### Spacing
- App bar height: 56dp
- App bar padding: 16dp horizontal
- Tab height: 48dp
- Bottom sheet padding: 16dp

## Best Practices

1. **Choose correct app bar type**:
   - Within flow navigation → `TopBackAppBar`
   - Dismissible screens → `TopCloseAppBar`
   - Custom needs → `AppBar`

2. **Show divider appropriately**:
   - Show when content needs clear separation
   - Hide when tabs or other dividers exist

3. **Handle back navigation**:
   - Always provide proper navigation handling
   - Consider Android back button behavior

4. **Use Scaffold for layout**:
   - Provides proper padding for system bars
   - Handles FAB positioning automatically

5. **Consider tablet layouts**:
   - App bars may need different behavior on tablets
   - Test on different screen sizes

## Related Components

- [Buttons](buttons.md) - For FAB with app bars
- [Selection Components](selection.md) - For bottom sheet selectors

## See Also

- [App Bar Usage Examples](../examples/app-bar-usage.md) - Detailed app bar patterns
- [Color Reference](colors.md) - Design system colors
- [Text Styles Reference](text-styles.md) - Typography mapping
- [Compose Best Practices](../../../../docs/01-compose-best-practices.md) - General guidelines
