# Selection Components

Components for user selections, toggles, and menu choices.

> **`composeview/selector/` 包底下三個元件是當作一套來用的，不是分別獨立**。當 Figma 設計上看到一個可點的 row（顯示目前選擇 + chevron icon），點下去打開清單/picker 時，幾乎一定要把其中**兩個** selector 配對使用 — 一個負責 trigger row、一個負責 bottom-sheet picker。詳見下方〈[Trigger Row + Picker 配對 pattern](#trigger-row--picker-配對-pattern)〉。

## Component Mapping

| Figma Component | Compose Component | File Path |
|-----------------|-------------------|-----------|
| Checkbox | InvosCheckBox | `ui/composeview/widgets/InvosCheckBox.kt` |
| Radio Button | InvosRadioButton | `ui/composeview/widgets/InvosRadioButton.kt` |
| Switch | InvosSwitch | `ui/composeview/widgets/InvosSwitch.kt` |
| Trigger row（可點 row 顯示目前選擇 + chevron） | MenuSelectorRow | `ui/composeview/selector/MenuSelectorRow.kt` |
| Bottom-sheet picker（純文字清單） | SimpleTextSelector | `ui/composeview/selector/SimpleTextSelector.kt` |
| Bottom-sheet picker（icon + 文字清單） | IconTextSelector | `ui/composeview/selector/IconTextSelector.kt` |

## InvosRadioButton

Radio button component for mutually exclusive single-selection within a group.

### Basic Usage

```kotlin
InvosRadioButton(
    text = "Option A",
    isSelected = selectedOption == "A",
    onClick = { selectedOption = "A" }
)
```

### Common Parameters
- `text: String` - Label text displayed next to the radio button
- `description: String?` - Optional description text below the label (default: null)
- `isSelected: Boolean` - Whether this radio button is selected
- `isError: Boolean` - Show error state styling (default: false)
- `isEnabled: Boolean` - Enable/disable state (default: true)
- `onClick: () -> Unit` - Callback when tapped
- `modifier: Modifier` - Compose modifier

### Radio Group Pattern

```kotlin
@Composable
fun IdentityTypeSelector(
    selectedType: IdentityType?,
    onTypeSelected: (IdentityType) -> Unit
) {
    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        InvosRadioButton(
            text = "本國人",
            isSelected = selectedType == IdentityType.NATIONAL,
            onClick = { onTypeSelected(IdentityType.NATIONAL) }
        )
        InvosRadioButton(
            text = "外國人",
            isSelected = selectedType == IdentityType.FOREIGN,
            onClick = { onTypeSelected(IdentityType.FOREIGN) }
        )
    }
}
```

### With Description

```kotlin
InvosRadioButton(
    text = "Standard Delivery",
    description = "3-5 business days",
    isSelected = true,
    onClick = { }
)
```

### Design Specifications
- Radio button size: 24x24dp (Material3 default)
- Gap between radio and content: 8dp
- Label: `BodyLarge` (16sp), color `colorContentDefault`
- Description: `BodyMedium` (14sp), color `colorContentSubtle`
- Selected: Brand color (`colorContentBrandDefault`)
- Unselected: `colorBorderDefault`
- Error: `colorBorderDanger`
- Disabled: 40% opacity

## InvosCheckBox

Custom checkbox component following the app's design system.

### Basic Usage

```kotlin
var checked by remember { mutableStateOf(false) }

InvosCheckBox(
    checked = checked,
    onCheckedChange = { checked = it },
    label = "Accept terms and conditions"
)
```

### Common Parameters
- `checked: Boolean` - Current checked state
- `onCheckedChange: (Boolean) -> Unit` - Callback when state changes
- `label: String?` - Optional label text next to checkbox
- `enabled: Boolean` - Enable/disable state (default: true)
- `modifier: Modifier` - Compose modifier

### With State Management

```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel) {
    val isAccepted by viewModel.termsAccepted.collectAsStateWithLifecycle()

    InvosCheckBox(
        checked = isAccepted,
        onCheckedChange = { viewModel.handleAction(MyAction.AcceptTerms(it)) },
        label = "I accept the terms and conditions"
    )
}
```

### Design Specifications
- Uses custom styling consistent with app theme
- Checked: Brand color fill
- Unchecked: Border only
- Disabled: Reduced opacity

## InvosSwitch

Custom toggle switch component following the app's design system.

### Basic Usage

```kotlin
var enabled by remember { mutableStateOf(false) }

InvosSwitch(
    checked = enabled,
    onCheckedChange = { enabled = it },
    label = "Enable notifications"
)
```

### Common Parameters
- `checked: Boolean` - Current toggle state
- `onCheckedChange: (Boolean) -> Unit` - Callback when state changes
- `label: String?` - Optional label text next to switch
- `enabled: Boolean` - Enable/disable state (default: true)
- `modifier: Modifier` - Compose modifier

### Settings Example

```kotlin
@Composable
fun SettingsScreen(viewModel: SettingsViewModel) {
    val notificationsEnabled by viewModel.notificationsEnabled.collectAsStateWithLifecycle()
    val autoSyncEnabled by viewModel.autoSyncEnabled.collectAsStateWithLifecycle()

    Column(modifier = Modifier.padding(16.dp)) {
        InvosSwitch(
            checked = notificationsEnabled,
            onCheckedChange = {
                viewModel.handleAction(SettingsAction.ToggleNotifications(it))
            },
            label = "Push notifications"
        )

        Spacer(modifier = Modifier.height(16.dp))

        InvosSwitch(
            checked = autoSyncEnabled,
            onCheckedChange = {
                viewModel.handleAction(SettingsAction.ToggleAutoSync(it))
            },
            label = "Auto-sync invoices"
        )
    }
}
```

### Design Specifications
- Track color:
  - Checked: `colorBackgroundBrandDefault`
  - Unchecked: `colorBackgroundSubtle`
- Thumb color: `colorContentFixedWhite`
- Disabled: 40% opacity

## SimpleTextSelector

Bottom sheet menu selector for choosing from a list of options.

### Basic Usage

```kotlin
var isOpen by remember { mutableStateOf(false) }
var selectedIndex by remember { mutableStateOf(0) }

val items = listOf(
    SimpleTextItem("Option 1"),
    SimpleTextItem("Option 2"),
    SimpleTextItem("Option 3")
)

SimpleTextSelector(
    isOpen = mutableStateOf(isOpen),
    title = "Select an option",
    list = items,
    selectedIndex = selectedIndex
) { index ->
    selectedIndex = index
    isOpen = false
}
```

### Common Parameters
- `isOpen: MutableState<Boolean>` - Controls visibility of bottom sheet
- `title: String?` - Optional title (plain string)
- `titleRes: Int?` - Optional title (string resource)
- `list: List<BaseSimpleTextItem>` - List of items to display
- `selectedIndex: Int` - Currently selected item index
- `onItemSelected: (Int) -> Unit` - Callback when item is selected

### With ViewModel State

```kotlin
// In ViewModel
private val _selectorUiState = MutableStateFlow(
    MenuSelectorUiState<BaseSimpleTextItem>(
        title = "Select category",
        // Or use titleRes = R.string.select_category,
        dataList = listOf(
            SimpleTextItem("Category 1"),
            SimpleTextItem("Category 2"),
            SimpleTextResourceItem(R.string.category_3)
        )
    )
)
val selectorUiState: StateFlow<MenuSelectorUiState<BaseSimpleTextItem>> =
    _selectorUiState.asStateFlow()

fun openSelector() {
    _selectorUiState.update { state ->
        state.copy(show = state.show.apply { value = true })
    }
}

fun onItemSelected(index: Int) {
    _selectorUiState.update { state ->
        state.copy(
            show = state.show.apply { value = false },
            selectedIndex = index
        )
    }
    // Handle selection
}

// In Composable
@Composable
fun MyScreen(viewModel: MyViewModel) {
    val selectorState by viewModel.selectorUiState.collectAsStateWithLifecycle()

    SimpleTextSelector(
        isOpen = selectorState.show,
        title = selectorState.title,
        titleRes = selectorState.titleRes,
        list = selectorState.dataList,
        selectedIndex = selectorState.selectedIndex
    ) { selectedIndex ->
        viewModel.handleAction(MyAction.OnItemSelected(selectedIndex))
    }
}
```

### Custom Item Types

Implement `BaseSimpleTextItem` for custom items:

```kotlin
// BaseSimpleTextItem is a fun interface
fun interface BaseSimpleTextItem {
    @Composable
    fun getDisplayText(): String
}

// Simple text item
data class SimpleTextItem(
    private val text: String
) : BaseSimpleTextItem {
    @Composable
    override fun getDisplayText(): String = text
}

// String resource item
data class SimpleTextResourceItem(
    @StringRes private val textRes: Int
) : BaseSimpleTextItem {
    @Composable
    override fun getDisplayText(): String = stringResource(id = textRes)
}

// Custom item with extra data
data class CategoryItem(
    private val text: String,
    val categoryId: String,
    val icon: Int
) : BaseSimpleTextItem {
    @Composable
    override fun getDisplayText(): String = text
}
```

### Design Specifications
- Displays as bottom sheet modal
- Shows list of text items
- Highlights selected item
- Dismisses on selection or outside tap
- Title uses `HeadingMedium` text style
- Items use `BodyLarge` text style

### Detailed Example

See [Bottom Sheet Selector Examples](../examples/bottom-sheet-selector.md) for:
- Complete ViewModel integration
- State management patterns
- Custom item implementations
- Multiple selector handling

## MenuSelectorRow

**Trigger row** — 顯示目前選擇 + chevron icon 的可點 row。**本身不是 picker** — 點擊後通常打開 `SimpleTextSelector` 或 `IconTextSelector` 之類的 bottom-sheet picker。Figma 上看起來像「灰框 + 占位文字 + 右側箭頭」的 input field，幾乎都是這個元件。

### Basic Usage

```kotlin
MenuSelectorRow(
    style = MenuSelectorStyle.Single(
        placeholder = stringResource(R.string.select_placeholder),
        selectedText = uiState.bankCodeDisplayName // 已選 → 顯示文字；未選 → 顯示 placeholder
    ),
    status = MenuSelectorStatus.Enable,
    onSelected = {
        dismissKeyboard()
        onAction(SomeAction.OnPickerOpen)
    }
)
```

### Common Parameters
- `style: MenuSelectorStyle` — 必填，下面兩個 sealed variants 擇一
- `status: MenuSelectorStatus = Enable` — `Enable` / `Disable` / `Error`，控制邊框顏色與互動性
- `onSelected: () -> Unit` — 點擊 callback（通常用來打開 picker）
- `modifier: Modifier`

### Two Styles

| Style | Figma 排版 | 用途 |
|---|---|---|
| `MenuSelectorStyle.Single(leadingIcon?, placeholder, selectedText)` | 單行 row（label 不在元件內，由外部 `Text` 提供） | 表單欄位下面就是輸入區的場景，例：金融機構代號 |
| `MenuSelectorStyle.WithLabel(label, selectedText)` | 兩段式 row（label 在上、選擇值在下） | 沒有外部 label 的場景，元件本身要承擔 label 顯示 |

`MenuSelectorIcon` enum 提供常用 leading icon（如 `CreditCard`），不需要時傳 `null`。

### Anti-pattern

不要自己手刻 `Row { Text(...) Icon(chevron) }` 來做 trigger row。即便看起來只是一個 row + 一個箭頭，這個元件已經處理好邊框、padding、disabled / error 狀態 — 永遠用 `MenuSelectorRow`。

## IconTextSelector

**Bottom-sheet picker（icon + 文字清單）** — 跟 `SimpleTextSelector` 形狀幾乎一樣，差別在每個項目顯示 icon + text，不是純文字。當 Figma 設計上每個選項都帶一個圖示（例：信用卡發卡行、付款方式、載具種類）時用這個。

### Basic Usage

```kotlin
data class CarrierTypeItem(
    private val text: String,
    override val iconRes: Int
) : IconTextItem {
    @Composable
    override fun getDisplayText(): String = text
}

val items = listOf(
    CarrierTypeItem("手機條碼", R.drawable.icon_carrier_mobile),
    CarrierTypeItem("自然人憑證", R.drawable.icon_carrier_id_card),
)

IconTextSelector(
    isOpen = pickerOpen,
    list = items,
    selectedIndex = uiState.selectedIndex,
    titleStyle = TitleStyle.REGULAR(stringResource(R.string.select_carrier_title)),
    onDismiss = { onAction(SomeAction.OnPickerDismiss) },
    onClick = { index -> onAction(SomeAction.OnItemSelect(index)) }
)
```

### Common Parameters
與 `SimpleTextSelector` 相同（`isOpen`, `list`, `selectedIndex`, `titleStyle`, `onDismiss`, `onClick`），唯一差異是 list 的 generic 限制改為 `T : IconTextItem`，需提供 `iconRes`。

### IconTextItem 變體
- `SimpleIconTextItem(text, iconRes)` — 純文字 + drawable
- `SimpleIconTextResourceItem(textRes, iconRes)` — string resource + drawable
- 自訂：實作 `IconTextItem` interface 攜帶額外資料

### When to Use Which Bottom-Sheet Picker

| 每個選項顯示什麼 | 用哪個 |
|---|---|
| 純文字（例：銀行清單、城市清單） | `SimpleTextSelector` |
| icon + 文字（例：載具種類、信用卡品牌） | `IconTextSelector` |

## Trigger Row + Picker 配對 pattern

**這是 selector 包最常見的用法，包含 90%+ 的 form 下拉選單場景**。`MenuSelectorRow`（顯示）+ `SimpleTextSelector` 或 `IconTextSelector`（picker）兩個元件配對，由 `MutableState<Boolean>` 控制 picker 開關、`Int?` 表示選中的 index。

### 完整範例（以金融機構代號為例）

```kotlin
// 1) UiState
data class BankAccountEditUiState(
    val bankCode: String = "",
    val bankCodeDisplayName: String = "",
    val isBankCodePickerOpen: Boolean = false,
)

// 2) UiAction
sealed interface BankAccountEditUiAction {
    data object OnBankCodePickerOpen : BankAccountEditUiAction
    data object OnBankCodePickerDismiss : BankAccountEditUiAction
    data class OnBankCodeSelect(val index: Int) : BankAccountEditUiAction
}

// 3) ViewModel
class BankAccountEditViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(BankAccountEditUiState())
    val uiState = _uiState.asStateFlow()

    fun onAction(action: BankAccountEditUiAction) {
        when (action) {
            BankAccountEditUiAction.OnBankCodePickerOpen ->
                _uiState.update { it.copy(isBankCodePickerOpen = true) }
            BankAccountEditUiAction.OnBankCodePickerDismiss ->
                _uiState.update { it.copy(isBankCodePickerOpen = false) }
            is BankAccountEditUiAction.OnBankCodeSelect -> {
                val bank = BankCodeList.banks.getOrNull(action.index) ?: return
                _uiState.update {
                    it.copy(
                        bankCode = bank.code,
                        bankCodeDisplayName = bank.displayName,
                        isBankCodePickerOpen = false,
                    )
                }
            }
        }
    }
}

// 4) Screen
@Composable
fun BankAccountEditScreen(
    uiState: BankAccountEditUiState,
    onAction: (BankAccountEditUiAction) -> Unit,
) {
    // local mirror of UiState.isBankCodePickerOpen — required because
    // SimpleTextSelector's `isOpen` parameter is `MutableState<Boolean>`,
    // not a plain Boolean. Sync via LaunchedEffect.
    val pickerOpen = remember { mutableStateOf(uiState.isBankCodePickerOpen) }
    LaunchedEffect(uiState.isBankCodePickerOpen) {
        pickerOpen.value = uiState.isBankCodePickerOpen
    }

    Column {
        // Trigger row — 顯示目前選擇
        Text(stringResource(R.string.bank_code_input_title), style = LabelLarge)
        MenuSelectorRow(
            style = MenuSelectorStyle.Single(
                placeholder = stringResource(R.string.select_placeholder),
                selectedText = uiState.bankCodeDisplayName,
            ),
            status = MenuSelectorStatus.Enable,
            onSelected = { onAction(BankAccountEditUiAction.OnBankCodePickerOpen) }
        )
    }

    // Picker — overlay, by isBankCodePickerOpen
    SimpleTextSelector(
        isOpen = pickerOpen,
        list = BankCodeList.banks,
        selectedIndex = BankCodeList.indexOfCode(uiState.bankCode),
        titleStyle = TitleStyle.REGULAR(stringResource(R.string.bank_code_list_title)),
        onDismiss = { onAction(BankAccountEditUiAction.OnBankCodePickerDismiss) },
        onClick = { index -> onAction(BankAccountEditUiAction.OnBankCodeSelect(index)) }
    )
}
```

### 為什麼需要 `pickerOpen` local state

`SimpleTextSelector` / `IconTextSelector` 的 `isOpen` 參數型別是 `MutableState<Boolean>`（不是 `Boolean`）— bottom sheet 內部會自己改值來關閉。我們把 UiState 的純 Boolean 鏡射到一個 local `MutableState`，再用 `LaunchedEffect` 雙向同步。這個樣板的 boilerplate 是元件介面強制要求的，不是 anti-pattern。

> 若元件之後改成 stateless `isOpen: Boolean + onOpenChange: (Boolean) -> Unit`，這個 local mirror 就可以拿掉。

### 反例（不要這樣做）

```kotlin
// ❌ 不要自己手刻 trigger row
Row(modifier = Modifier.clickable { ... }) {
    Text(uiState.bankCodeDisplayName.ifEmpty { "請選擇" })
    Spacer(modifier = Modifier.weight(1f))
    Icon(painterResource(R.drawable.icon_chevron_down), contentDescription = null)
}

// ❌ 不要把 picker open state 留在 Composable local（用 remember + mutableStateOf 持有真實值）
// 因為頁面 recomposition / config change 會丟失
val isOpen = remember { mutableStateOf(false) }  // ← 真實開關狀態應該在 UiState
```

正確做法永遠是：**真實開關狀態放 UiState、Composable 端用 local mirror + LaunchedEffect 同步**。

## Common Patterns

### Form with Multiple Selections

```kotlin
@Composable
fun PreferencesForm(viewModel: PreferencesViewModel) {
    val autoSync by viewModel.autoSync.collectAsStateWithLifecycle()
    val notifications by viewModel.notifications.collectAsStateWithLifecycle()
    val newsletter by viewModel.newsletter.collectAsStateWithLifecycle()

    Column(modifier = Modifier.padding(16.dp)) {
        InvosSwitch(
            checked = autoSync,
            onCheckedChange = { viewModel.updateAutoSync(it) },
            label = "Auto-sync"
        )

        InvosCheckBox(
            checked = notifications,
            onCheckedChange = { viewModel.updateNotifications(it) },
            label = "Push notifications"
        )

        InvosCheckBox(
            checked = newsletter,
            onCheckedChange = { viewModel.updateNewsletter(it) },
            label = "Subscribe to newsletter"
        )
    }
}
```

### Selector with Display

```kotlin
@Composable
fun CategorySelector(viewModel: MyViewModel) {
    val selectedCategory by viewModel.selectedCategory.collectAsStateWithLifecycle()
    val selectorState by viewModel.selectorState.collectAsStateWithLifecycle()

    // Display current selection
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { viewModel.openCategorySelector() }
            .padding(16.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("Category", style = BodyMedium)
        Text(selectedCategory.name, style = LabelMedium)
    }

    // Selector bottom sheet
    SimpleTextSelector(
        isOpen = selectorState.show,
        title = "Select category",
        list = selectorState.dataList,
        selectedIndex = selectorState.selectedIndex,
        onItemSelected = { viewModel.selectCategory(it) }
    )
}
```

## Design System Integration

### Colors
- Checkbox/Switch checked: `colorBackgroundBrandDefault`
- Checkbox/Switch unchecked: `colorBorderDefault`
- Checkbox/Switch disabled: 40% opacity
- Selected item in selector: `colorBackgroundBrandSubtle`

### Text Styles
- Checkbox/Switch labels: `BodyMedium`
- Selector title: `HeadingMedium`
- Selector items: `BodyLarge`

## Best Practices

1. **Use appropriate components**:
   - Binary choice → `InvosSwitch`
   - Optional selection → `InvosCheckBox`
   - Mutually exclusive options (2-4 inline) → `InvosRadioButton`
   - Multiple options (5+) → `SimpleTextSelector`

2. **Manage state in ViewModel**: Don't use local state for important selections

3. **Provide clear labels**: Make selection purpose obvious

4. **Handle state updates**: Use proper state management patterns

5. **Consider accessibility**: Ensure selections work with screen readers

## Related Components

- [Text Fields](text-fields.md) - For text input in forms
- [Buttons](buttons.md) - For submit actions

## See Also

- [Bottom Sheet Selector Examples](../examples/bottom-sheet-selector.md) - Detailed selector patterns
- [Color Reference](colors.md) - Design system colors
- [Text Styles Reference](text-styles.md) - Typography mapping
