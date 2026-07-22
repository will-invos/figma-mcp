# Input Components

Specialized input components for specific data entry needs.

## Component Mapping

| Figma Component | Compose Component | File Path |
|-----------------|-------------------|-----------|
| Number Keypad | NumberKeypad | `ui/composeview/NumberKeypad.kt` |
| Date Picker | Date components | `ui/composeview/date/` |

## NumberKeypad

Custom numeric keypad for amount input.

### Basic Usage

```kotlin
@Composable
fun AmountInput(viewModel: AmountViewModel) {
    val amount by viewModel.amount.collectAsStateWithLifecycle()

    Column {
        Text(
            text = amount,
            style = DisplayRegular,
            modifier = Modifier.padding(16.dp)
        )

        NumberKeypad(
            onNumberClick = { digit ->
                viewModel.handleAction(AmountAction.AddDigit(digit))
            },
            onDeleteClick = {
                viewModel.handleAction(AmountAction.DeleteDigit)
            },
            onConfirmClick = {
                viewModel.handleAction(AmountAction.Confirm)
            }
        )
    }
}
```

### Common Parameters
- `onNumberClick: (String) -> Unit` - Callback when number button (0-9) is clicked
- `onDeleteClick: () -> Unit` - Callback when delete/backspace button is clicked
- `onConfirmClick: () -> Unit` - Callback when confirm/done button is clicked
- `modifier: Modifier` - Compose modifier

### With Decimal Support

```kotlin
@Composable
fun AmountInputWithDecimal(viewModel: AmountViewModel) {
    val amount by viewModel.amount.collectAsStateWithLifecycle()
    val formattedAmount by viewModel.formattedAmount.collectAsStateWithLifecycle()

    Column {
        Text(
            text = formattedAmount,  // e.g., "$123.45"
            style = DisplayRegular,
            modifier = Modifier.padding(16.dp)
        )

        NumberKeypad(
            onNumberClick = { digit ->
                when (digit) {
                    "." -> viewModel.handleAction(AmountAction.AddDecimalPoint)
                    else -> viewModel.handleAction(AmountAction.AddDigit(digit))
                }
            },
            onDeleteClick = {
                viewModel.handleAction(AmountAction.DeleteDigit)
            },
            onConfirmClick = {
                viewModel.handleAction(AmountAction.Confirm)
            }
        )
    }
}
```

### ViewModel Pattern

```kotlin
class AmountViewModel : BaseViewModel() {
    private val _amount = MutableStateFlow("")
    val amount: StateFlow<String> = _amount.asStateFlow()

    private val _formattedAmount = MutableStateFlow("$0.00")
    val formattedAmount: StateFlow<String> = _formattedAmount.asStateFlow()

    fun handleAction(action: AmountAction) {
        when (action) {
            is AmountAction.AddDigit -> addDigit(action.digit)
            is AmountAction.AddDecimalPoint -> addDecimalPoint()
            is AmountAction.DeleteDigit -> deleteDigit()
            is AmountAction.Confirm -> confirmAmount()
        }
    }

    private fun addDigit(digit: String) {
        val current = _amount.value
        if (current.length < MAX_DIGITS) {
            _amount.value = current + digit
            updateFormattedAmount()
        }
    }

    private fun deleteDigit() {
        val current = _amount.value
        if (current.isNotEmpty()) {
            _amount.value = current.dropLast(1)
            updateFormattedAmount()
        }
    }

    private fun updateFormattedAmount() {
        val value = _amount.value.toDoubleOrNull() ?: 0.0
        _formattedAmount.value = "$${"%.2f".format(value / 100)}"
    }

    companion object {
        private const val MAX_DIGITS = 10
    }
}

sealed class AmountAction {
    data class AddDigit(val digit: String) : AmountAction()
    object AddDecimalPoint : AmountAction()
    object DeleteDigit : AmountAction()
    object Confirm : AmountAction()
}
```

### Design Specifications
- 4×3 grid layout (numbers 1-9, 0, delete, confirm)
- Button size: Equal width/height for square buttons
- Spacing: 8dp between buttons
- Number buttons: `LabelLarge` text style
- Background: `colorBackgroundDefault`
- Button background: `colorBackgroundSubtle`
- Active button: `colorBackgroundBrandDefault`

### Use Cases
- Invoice amount entry
- Payment amount input
- Price input
- Quantity input
- Calculator-style number entry

## Date Picker Components

Date selection components for date input.

### Material Date Picker

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MyDatePicker(
    selectedDate: Long?,
    onDateSelected: (Long?) -> Unit,
    onDismiss: () -> Unit
) {
    val datePickerState = rememberDatePickerState(
        initialSelectedDateMillis = selectedDate
    )

    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(
                onClick = {
                    onDateSelected(datePickerState.selectedDateMillis)
                    onDismiss()
                }
            ) {
                Text("OK")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    ) {
        DatePicker(state = datePickerState)
    }
}
```

### Date Input with Display

```kotlin
@Composable
fun DateInputField(
    selectedDate: String,
    onDateClick: () -> Unit
) {
    OutlinedTextField(
        value = selectedDate,
        onValueChange = { },
        label = { Text("Date") },
        readOnly = true,
        trailingIcon = {
            IconButton(onClick = onDateClick) {
                Icon(
                    imageVector = Icons.Default.CalendarToday,
                    contentDescription = "Select date"
                )
            }
        },
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onDateClick() }
    )
}
```

### With ViewModel

```kotlin
@Composable
fun InvoiceDatePicker(viewModel: InvoiceViewModel) {
    val selectedDate by viewModel.selectedDate.collectAsStateWithLifecycle()
    val showDatePicker by viewModel.showDatePicker.collectAsStateWithLifecycle()
    val formattedDate by viewModel.formattedDate.collectAsStateWithLifecycle()

    DateInputField(
        selectedDate = formattedDate,
        onDateClick = { viewModel.handleAction(InvoiceAction.ShowDatePicker) }
    )

    if (showDatePicker) {
        MyDatePicker(
            selectedDate = selectedDate,
            onDateSelected = { date ->
                viewModel.handleAction(InvoiceAction.SelectDate(date))
            },
            onDismiss = {
                viewModel.handleAction(InvoiceAction.DismissDatePicker)
            }
        )
    }
}
```

### Date Range Picker

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MyDateRangePicker(
    onDateRangeSelected: (Pair<Long?, Long?>) -> Unit,
    onDismiss: () -> Unit
) {
    val dateRangePickerState = rememberDateRangePickerState()

    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(
                onClick = {
                    onDateRangeSelected(
                        Pair(
                            dateRangePickerState.selectedStartDateMillis,
                            dateRangePickerState.selectedEndDateMillis
                        )
                    )
                    onDismiss()
                }
            ) {
                Text("OK")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    ) {
        DateRangePicker(state = dateRangePickerState)
    }
}
```

### Design Specifications
- Uses Material 3 DatePicker
- Calendar view with month navigation
- Selected date highlighted with brand color
- Today's date marked distinctly
- Supports date range selection

### File Location
Custom date components are in `ui/composeview/date/`

## Common Patterns

### Invoice Amount Entry

```kotlin
@Composable
fun InvoiceAmountScreen(
    viewModel: InvoiceViewModel,
    onComplete: () -> Unit
) {
    val amount by viewModel.amount.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopBackAppBar(
                titleRes = R.string.enter_amount,
                onBackPressed = { /* navigate back */ }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .fillMaxSize()
        ) {
            // Amount display
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Amount",
                    style = BodyMedium,
                    color = colorResource(id = R.color.colorContentSubtle)
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = amount,
                    style = DisplayRegular,
                    color = colorResource(id = R.color.colorContentDefault)
                )
            }

            // Number keypad
            NumberKeypad(
                onNumberClick = { digit ->
                    viewModel.handleAction(InvoiceAction.AddDigit(digit))
                },
                onDeleteClick = {
                    viewModel.handleAction(InvoiceAction.DeleteDigit)
                },
                onConfirmClick = {
                    viewModel.handleAction(InvoiceAction.ConfirmAmount)
                    onComplete()
                },
                modifier = Modifier.padding(16.dp)
            )
        }
    }
}
```

### Date Filter

```kotlin
@Composable
fun DateFilterScreen(viewModel: FilterViewModel) {
    val startDate by viewModel.startDate.collectAsStateWithLifecycle()
    val endDate by viewModel.endDate.collectAsStateWithLifecycle()
    val showStartPicker by viewModel.showStartPicker.collectAsStateWithLifecycle()
    val showEndPicker by viewModel.showEndPicker.collectAsStateWithLifecycle()

    Column(modifier = Modifier.padding(16.dp)) {
        DateInputField(
            selectedDate = startDate,
            onDateClick = { viewModel.showStartDatePicker() }
        )

        Spacer(modifier = Modifier.height(16.dp))

        DateInputField(
            selectedDate = endDate,
            onDateClick = { viewModel.showEndDatePicker() }
        )
    }

    if (showStartPicker) {
        MyDatePicker(
            selectedDate = viewModel.startDateMillis,
            onDateSelected = { viewModel.selectStartDate(it) },
            onDismiss = { viewModel.dismissStartPicker() }
        )
    }

    if (showEndPicker) {
        MyDatePicker(
            selectedDate = viewModel.endDateMillis,
            onDateSelected = { viewModel.selectEndDate(it) },
            onDismiss = { viewModel.dismissEndPicker() }
        )
    }
}
```

## Design System Integration

### Colors
- Keypad button: `colorBackgroundSubtle`
- Keypad button pressed: `colorBackgroundBrandDefault`
- Keypad text: `colorContentDefault`
- Date picker selected: `colorBackgroundBrandDefault`
- Date picker today: `colorContentBrandDefault`

### Text Styles
- Amount display: `DisplayRegular`
- Keypad numbers: `LabelLarge`
- Date picker: `BodyMedium`

## Best Practices

1. **Number Keypad**:
   - Show large, easy-to-tap buttons
   - Provide clear visual feedback on press
   - Display formatted amount above keypad
   - Limit maximum input length
   - Handle decimal points appropriately

2. **Date Picker**:
   - Use Material DatePicker for consistency
   - Show current selection clearly
   - Provide easy month/year navigation
   - Consider date range for filters
   - Format dates according to locale

3. **Validation**:
   - Validate amount before confirmation
   - Prevent invalid date selections
   - Show error states clearly
   - Provide helpful error messages

4. **Accessibility**:
   - Ensure buttons are large enough
   - Provide content descriptions
   - Support screen readers
   - Test with TalkBack

## Related Components

- [Text Fields](text-fields.md) - For alternative text input
- [Buttons](buttons.md) - For keypad buttons
- [Feedback & Notifications](feedback-notifications.md) - For validation errors

## See Also

- [Color Reference](colors.md) - Design system colors
- [Text Styles Reference](text-styles.md) - Typography mapping
- [Material Design - Date Pickers](https://m3.material.io/components/date-pickers/overview)
