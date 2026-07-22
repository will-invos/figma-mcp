# Figma Design System Mapping Rules

## Font System Mapping

This document defines the mapping between Figma design tokens and iOS code implementation for the invoice app.

### Typography Mapping

#### Display Fonts
| Figma Token | iOS Code | Size | Weight | Usage |
|-------------|----------|------|---------|-------|
| `Display/Large` | `UIFont.display` | 28pt | Medium | Main page titles, hero text |

#### Heading Fonts
| Figma Token | iOS Code | Size | Weight | Usage |
|-------------|----------|------|---------|-------|
| `Heading/Large` | `UIFont.headingLarge` | 24pt | Medium | Section headers, modal titles |
| `Heading/Medium` | `UIFont.headingMedium` | 20pt | Medium | Card titles, form section headers |
| `Heading/Small` | `UIFont.headingSmall` | 18pt | Medium | Subsection headers, list headers |

#### Body Text Fonts
| Figma Token | iOS Code | Size | Weight | Usage |
|-------------|----------|------|---------|-------|
| `Body/XLarge` | `UIFont.bodyXLarge` | 18pt | Regular | Primary content, important descriptions |
| `Body/Large` | `UIFont.bodyLarge` | 16pt | Regular | Standard body text, descriptions |
| `Body/Medium` | `UIFont.bodyMedium` | 14pt | Regular | Secondary text, form inputs |
| `Body/Small` | `UIFont.bodySmall` | 12pt | Regular | Helper text, metadata |
| `Body/XSmall` | `UIFont.bodyXSmall` | 10pt | Regular | Fine print, timestamps |

#### Label Fonts
| Figma Token | iOS Code | Size | Weight | Usage |
|-------------|----------|------|---------|-------|
| `Label/Large` | `UIFont.labelLarge` | 16pt | Medium | Button text, form labels |
| `Label/Medium` | `UIFont.labelMedium` | 14pt | Medium | Tab labels, secondary buttons |
| `Label/Small` | `UIFont.labelSmall` | 12pt | Medium | Tag labels, status indicators |
| `Label/XSmall` | `UIFont.labelXSmall` | 10pt | Medium | Badge text, minimal labels |

#### Code/Monospace Fonts
| Figma Token | iOS Code | Size | Weight | Usage |
|-------------|----------|------|---------|-------|
| `Code/Large` | `UIFont.codeLarge` | 16pt | Regular | Invoice numbers, IDs |
| `Code/Medium` | `UIFont.codeMedium` | 14pt | Regular | Serial numbers, codes |
| `Code/Small` | `UIFont.codeSmall` | 12pt | Regular | Reference numbers, small codes |

### Implementation Notes

#### Font Usage Guidelines
- **Display**: Use sparingly for main page titles and hero content
- **Heading**: Use for hierarchical content structure (H1, H2, H3 equivalent)
- **Body**: Use for readable content with appropriate line spacing
- **Label**: Use for interactive elements and short descriptive text
- **Code**: Use for machine-readable content that needs monospace formatting

#### Accessibility Considerations
- All fonts support Dynamic Type scaling
- Maintain minimum 12pt size for body text
- Ensure proper contrast ratios with background colors
- Test with Bold Text accessibility setting enabled

#### Swift Implementation Example
```swift
// Heading
titleLabel.font = .headingLarge
subtitleLabel.font = .headingMedium

// Body content
descriptionLabel.font = .bodyLarge
detailLabel.font = .bodyMedium

// Interactive elements
buttonTitleLabel.font = .labelMedium
tabBarItemLabel.font = .labelSmall

// Data display
invoiceNumberLabel.font = .codeMedium
```

#### Design Token Usage in Figma
When designing in Figma, use the corresponding token names to ensure consistency:
- Designers should reference this mapping when applying text styles
- All text layers should use defined tokens, not custom font sizes
- Maintain the semantic meaning of each token category



### Color System Mapping

This section defines the mapping between Figma design tokens and iOS color implementation for the invoice app.

#### Color Usage Philosophy
- **Semantic-First Approach**: Always use semantic color names rather than literal color values
- **Brand Color Handling**: Brand colors require `.Brand.` prefix for theme-aware implementation
- **Context-Aware Selection**: Choose colors based on UI element function and hierarchy

#### Background Colors
| Usage Context | iOS Color Token | Description |
|---------------|-----------------|-------------|
| Main app background | `.colorBackgroundDefault` | Primary white/light background |
| Modal/Dialog background | `.colorBackgroundDefault` | Same as main background for consistency |
| Overlay/Backdrop | `.colorBackgroundOverlay` | Semi-transparent backdrop for modals |
| Card/Section background | `.colorBackgroundPlain` | Subtle background for content sections |
| Image placeholder | `.colorBackgroundPlain` | Light background for image containers |
| Disabled elements | `.colorBackgroundDisable` | Muted background for inactive elements |
| Brand primary background | `.Brand.colorBackgroundBrandDefault` | Main brand color background |
| Neutral button background | `.colorBackgroundNeutralSubtle` | Light gray for secondary buttons |

#### Text/Content Colors
| Usage Context | iOS Color Token | Description |
|---------------|-----------------|-------------|
| Primary headings | `.colorContentBold` | High contrast text for titles |
| Body text | `.colorContentDefault` | Standard readable text color |
| Secondary text | `.colorContentSubtle` | Muted text for descriptions |
| Placeholder text | `.colorContentSubtlest` | Light text for hints/placeholders |
| Inverse text (on dark) | `.colorContentInverseBold` | White text on dark backgrounds |
| Brand text | `.Brand.colorContentBrandDefault` | Brand-colored text for links/highlights |
| Error text | `.colorContentDangerDefault` | Red text for error messages |
| Success text | `.colorContentSuccessDefault` | Green text for success messages |

#### Border Colors
| Usage Context | iOS Color Token | Description |
|---------------|-----------------|-------------|
| Default borders | `.colorBorderDefault` | Standard border color |
| Subtle dividers | `.colorBorderSubtle` | Light borders for sections |
| Bold separators | `.colorBorderBold` | Prominent borders |
| Brand borders | `.Brand.colorBorderBrand` | Brand-colored borders |
| Error borders | `.colorBorderDanger` | Red borders for error states |

#### Figma to iOS Color Mapping Examples
| Figma Design Color | Figma Context | iOS Implementation | Reasoning |
|-------------------|---------------|-------------------|----------|
| `#ffffff` | Dialog background | `.colorBackgroundDefault` | Semantic white background |
| `#16191d` | Primary text | `.colorContentBold` | High contrast heading text |
| `#3b404a` | Body text | `.colorContentDefault` | Standard readable content |
| `#eaecf0` | Button background | `.colorBackgroundNeutralSubtle` | Neutral button styling |
| `#007acc` | Brand button | `.Brand.colorBackgroundBrandDefault` | Theme-aware brand color |

#### Implementation Guidelines

```swift
// ✅ Correct - Semantic usage
view.backgroundColor = .colorBackgroundDefault
titleLabel.textColor = .colorContentBold
descriptionLabel.textColor = .colorContentDefault

// ❌ Incorrect - Don't use UIColor prefix
view.backgroundColor = UIColor.colorBackgroundDefault

// ✅ Correct - Brand colors with prefix
button.backgroundColor = .Brand.colorBackgroundBrandDefault
brandLabel.textColor = .Brand.colorContentBrandDefault

// ✅ Correct - Context-appropriate selection
placeholderLabel.textColor = .colorContentSubtlest
errorLabel.textColor = .colorContentDangerDefault
```

#### Color Selection Decision Tree
1. **Identify UI Element Function**
   - Is it background, text, or border?
   - Is it primary, secondary, or tertiary in hierarchy?

2. **Determine Semantic Context**
   - Default/neutral state
   - Brand/highlight state  
   - Error/warning/success state
   - Disabled/inactive state

3. **Apply Appropriate Token**
   - Use semantic name, not literal color
   - Add `.Brand.` prefix for brand colors
   - Consider accessibility and contrast

#### Accessibility Considerations
- Ensure minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Test colors in both light and dark modes
- Verify colors work for colorblind users
- Use semantic tokens to support dynamic color changes

#### Brand Color Usage Rules
- Always use `.Brand.` prefix for brand-related colors
- Brand colors automatically adapt to selected theme
- Available brand color categories:
  - Background: `.Brand.colorBackgroundBrandDefault`
  - Content: `.Brand.colorContentBrandDefault` 
  - Border: `.Brand.colorBorderBrand`

### Component Mapping

Figma design system file: `8pE8KHl50y72IP7JseLH55`（iOS - UI Kit 2025）

#### Figma → iOS Component 總對照表

| Figma Section | Figma Component | iOS Component | 檔案 |
|---|---|---|---|
| **Buttons** | Text button (Large/Medium/Small) | `PrimitiveButton` | `UIObject/PrimitiveButton.swift` |
| **Buttons** | FAB | `FABButton` | `UIObject/FABButton.swift` |
| **Buttons** | Icon button | `IConButton` | `UIObject/IConButton.swift` |
| **Tags** | Tag (Light/Bold) | `TagView` | `UIObject/TagView/TagView.swift` |
| **Tags** | Category tag | `TagView` (`.category(...)`) | `UIObject/TagView/TagView.swift` |
| **Badges** | Category badge | `TagView` (`.category(...)`) | 同上 |
| **Forms** | Text field | `FormTextFieldView` | `UIObject/TextFieldView/FormTextFieldView.swift` |
| **Forms** | Text area | `FormTextFieldView`（多行模式） | 同上 |
| **Forms** | Select | `SelectionFieldView` | `UIObject/SelectionFieldView/SelectionFieldView.swift` |
| **Forms** | Checkbox / Checkbox item | `CustomCheckbox` | `UIObject/Checkbox/CustomCheckbox.swift` |
| **Forms** | Field group (Header + Text field + Help text) | `GroupFormTextFieldView` | `UIObject/TextFieldView/GroupFormTextFieldView.swift` |
| **Forms** | Radio item / Radio group | `RadioButtonGroup` / `RadioItemView` | `UIObject/RadioButtonGroup/RadioButtonGroup.swift` |
| **Forms** | Pin input | 自訂 | — |
| **Alerts** | Basic banner（原 Basic alert 更名） | `AlertBannerView` | `UIObject/AlertBannerView.swift` |
| **Alerts** | Rich banner（原 Rich alert 更名） | `AlertBannerView` | 同上 |
| **Dialogs** | Dialog | `AlertVC` | `UIObject/AlertVC.swift` |
| **Sheets** | Bottom sheet / Sheet header / Sheet footer | `BottomSheetVC` | `UIObject/BottomSheet/BottomSheetVC.swift` |
| **Hints** | Snackbar | `SnackBarView`（透過 VC extension） | `UIObject/SnackBar/SnackBarView.swift` |
| **Hints** | Toast | `ToastView` | `UIObject/ToastView.swift` |
| **Hints** | In-app notification | `InAppNotifyView` | `UIObject/InAppNotify/InAppNotifyView.swift` |
| **Hints** | Tooltip | `ToolTipView` | `UIObject/ToolTipView.swift` |
| **Controls** | Checkbox | `CustomCheckbox` | 同上 |
| **Controls** | Radio button | `RadioButtonGroup` | `UIObject/RadioButtonGroup/RadioButtonGroup.swift` |
| **Controls** | Switch | `UISwitch`（原生） | — |
| **Controls** | Spinner | `UIActivityIndicatorView`（原生） | — |
| **Controls** | Slider | `UISlider`（原生） | — |
| **Tabs** | Tab bar | `UITabBar`（原生，品牌外觀靠 appearance 設定） | — |
| **Tabs** | Tabs (Fill/Compact) | `SegmentedView` | `UIObject/SegmentedView.swift` |
| **Tabs** | Chip bar / Tag button（原 Tag bar 更名） | `ChipView` | `UIObject/ChipView.swift` |
| **Page status** | Page status (Empty/Error/...) | `EmptyView` | `UIObject/EmptyView/EmptyView.swift` |
| **Navigations** | Navigation Bar | `ViewControllerNavigationDecoratable` + `NavigationButton` | Protocol + UIObject |
| **Pickers** | Page Navigation（原 Month picker 更名，形態改為 prev/標題/next 導覽列） | 待確認（月份「切換」導覽列） | — |
| **Pickers** | —（Month picker 客製 UI，未納入元件庫） | `YearMonthPickerView` | `UIObject/YearMonthPickerView.swift` |
| **Pickers** | —（Date picker 採雙平台原生，已定案） | 原生 `UIDatePicker` | — |
| **Progress** | Progress bar | 自訂 | — |
| **Progress** | Circular Progress | `HalfCircularProgressView` | `UIObject/HalfCircularProgressView.swift` |
| **Elements** | Divider | `UIView`（1pt, `.colorBorderSubtle`） | — |
| **Typography** | Text | `UILabel` + font token | — |
| **Lists** | List item | 自訂 `UITableViewCell`（conform `Reusable`） | — |
| **Cards** | Card item / Grid item | 自訂 `UICollectionViewCell`（conform `Reusable`） | — |

#### Figma Icon Button → iOS IConButton

**File:** `invoice/Swift/UIObject/IConButton.swift`

**Figma Reference:** https://www.figma.com/design/Q9ItGuJJR4eHeZeKuqP1R4/UI-Kit-2025---Guideline---Spec?node-id=300-25048

An icon-only circular button supporting multiple styles, sizes, and interactive states.

**Size Mapping:**
| Figma Size | IConButton.Size | Button Size | Icon Size |
|-----------|----------------|-------------|-----------|
| Large | `.large` | 52×52 | 28×28 |
| Medium | `.medium` | 40×40 | 24×24 |
| Small | `.small` | 32×32 | 20×20 |
| XSmall | `.xSmall` | 24×24 | 16×16 |

**Style Mapping:**
| Figma Style | IConButton.Style | Background | Icon Color |
|------------|-----------------|------------|------------|
| Primary | `.primary` | Brand default | Inverse bold |
| Neutral | `.neutral` | Neutral subtle | Content default |
| Prize | `.prize` | Prize default | Fixed bold |
| Danger | `.danger` | Danger default | Inverse bold |
| Donation | `.donation` | Donation default | Inverse bold |
| Outline | `.outline` | Transparent + brand border | Brand default |
| Ghost | `.ghost` | Transparent | Brand default |
| Ghost-Neutral | `.ghostNeutral` | Transparent | Content default |

**States:**
| Figma State | iOS Property | Behavior |
|------------|-------------|----------|
| 啟用狀態 (Enabled) | default | Normal appearance |
| 點擊狀態 (Pressed) | `isHighlighted` | Active background color |
| 失效狀態 (Disabled) | `isEnabled = false` | Alpha 0.4 |
| 載入狀態 (Loading) | `isLoading = true` | Spinner + alpha 0.4 |
| 顯示紅點 (Badge) | `showBadgeDot = true` | Red dot (Large/Medium/Small only) |

**Implementation Examples:**
```swift
// Basic icon button
let button = IConButton(appearance: IConButton.Appearance(
    image: .icPlus,
    style: .primary,
    size: .large
))

// With badge dot
button.showBadgeDot = true

// Loading state
button.isLoading = true

// Dynamic icon change
button.setImage(.icCross)
```

#### Figma Button Style → iOS PrimitiveButton.Style

This section defines the mapping between Figma design components and iOS implementation.

#### Button Component Mapping

When encountering button designs in Figma, always use the project's `PrimitiveButton` component.

**Implementation Rule:**
- **Figma Button** → **PrimitiveButton.swift**
- Never use `UIButton` directly for designed buttons
- Map Figma button styles to `PrimitiveButton.Style` enum values

**Style Mapping:**
| Figma Button Style | PrimitiveButton Style | Description |
|-------------------|----------------------|-------------|
| Primary/Brand Button | `.primary` | Main action buttons with brand color |
| Secondary/Neutral Button | `.neutral` | Secondary actions with neutral styling |
| Danger/Destructive Button | `.danger` | Destructive actions (delete, remove) |
| Success/Positive Button | `.donation` | Positive actions (donate, contribute) |
| Outline Button | `.outline` | Outlined buttons with brand border |
| Ghost Button | `.ghost` | Transparent buttons for subtle actions |
| Text Button | `.text` | Text-only buttons without background |
| White Button | `.white` | White buttons for dark backgrounds |

**Size Mapping:**
| Figma Button Size | PrimitiveButton Size | Height |
|------------------|---------------------|--------|
| Large Button | `.large` | 48pt |
| Medium Button | `.medium` | 40pt |
| Small Button | `.small` | 32pt |

**Implementation Example:**
```swift
// ✅ Correct - Use PrimitiveButton
let button = PrimitiveButton(
    appearance: PrimitiveButton.Appearance(size: .large, style: .primary),
    title: "確認"
)

// ✅ Correct - With icon
let iconButton = PrimitiveButton(
    appearance: PrimitiveButton.Appearance(size: .medium, style: .neutral),
    image: UIImage(named: "icon_home"),
    title: "首頁"
)

// ❌ Incorrect - Don't use UIButton directly
let button = UIButton(type: .system)
button.setTitle("確認", for: .normal)
```

**Special Cases:**
- **Loading State**: Use `button.isLoading = true`
- **Disabled State**: Use `button.isEnabled = false`
- **Dynamic Style Update**: Use `button.updateStyle(.danger)`

#### Design Priority Rules

**Primary Rule: Figma Design First**
- Always prioritize Figma design specifications over iOS Human Interface Guidelines
- Figma designs represent the approved visual design system
- iOS Guidelines serve as reference only when Figma specifications are unclear

**Implementation Priority:**
1. **Figma Specifications** (Primary)
   - Colors, typography, spacing, component styles
   - Exact measurements and visual appearance
   - Interaction behaviors as designed

2. **Project Design System** (Secondary)
   - Use established design tokens (colors, fonts, spacing)
   - Follow existing component patterns
   - Maintain consistency with implemented features

3. **iOS Guidelines** (Reference Only)
   - Consider for accessibility requirements
   - Reference for technical implementation best practices
   - Use when Figma doesn't specify platform-specific behaviors

**Decision Making Process:**
```
Figma Design Available? 
├── Yes → Follow Figma exactly
│   ├── Colors: Use semantic tokens that match Figma colors
│   ├── Typography: Use project fonts that match Figma specs
│   ├── Spacing: Use Figma measurements
│   └── Components: Use project components styled to match
└── No → Refer to project design system → iOS Guidelines
```

**Example Applications:**
```swift
// ✅ Figma shows text-left alignment
label.textAlignment = .left  // Not .center despite iOS convention

// ✅ Figma shows specific color #3b404a
label.textColor = .colorContentDefault  // Use semantic token that matches

// ✅ Figma shows 24pt font
label.font = .headingLarge  // Use project token that matches size

// ✅ Figma shows 16px spacing
stackView.setCustomSpacing(16, after: label)  // Use exact measurement
```

**Accessibility Considerations:**
- Maintain minimum contrast ratios even when following Figma
- Ensure touch targets meet minimum size requirements
- Test with accessibility features enabled
- Report accessibility conflicts with Figma to design team

## Tag Component Mapping

This section defines the mapping between Figma tag designs and iOS implementation.

### Tag Component Selection

When encountering tag designs in Figma, use the appropriate project tag component:

| Figma Tag Type | iOS Component | Usage |
|---------------|---------------|-------|
| Basic Tag (neutral, status) | `TagView` with `.general(style:colorType:title:)` | General purpose tags with customizable style and color type |
| Category Tag (with icon) | `TagView` with `.category(...)` | Invoice category tags (載具, 手輸, 掃描, 捐贈, etc.) |

### TagView

**File:** `/invoice/Swift/UIObject/TagView/TagView.swift`

**Figma Reference:** https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/iOS---UI-Kit-2025?node-id=3903-5379

A versatile tag component supporting multiple styles, types, and sizes.

#### Size Mapping
| Figma Size | TagView.Size | Font | Corner Radius | Padding |
|-----------|-------------------|------|---------------|--------|
| Medium | `.medium` | `.labelMedium` (14pt) | 8pt | 4/8/4/8 |
| Small | `.small` | `.labelSmall` (12pt) | 6pt | 2/6/2/6 |

#### Style Mapping
| Figma Style | TagView.Style | Description |
|------------|-------------------|-------------|
| Light background | `.light` | Subtle background with bold text |
| Bold/Filled background | `.bold` | Solid background with inverse text |

#### ColorType Mapping (for `.basic` tag type)
| Figma Color Intent | TagView.ColorType | Background (Light) | Content (Light) |
|-------------------|---------------------|-------------------|----------------|
| Neutral/Default | `.neutral` | `.colorBackgroundNeutralSubtle` | `.colorContentDefault` |
| Primary/Brand | `.primary` | `.Brand.colorBackgroundBrandSubtlest` | `.Brand.colorContentBrandBold` |
| Success/Positive | `.success` | `.colorBackgroundSuccessSubtlest` | `.colorContentSuccessBold` |
| Danger/Error | `.danger` | `.colorBackgroundDangerSubtlest` | `.colorContentDangerBold` |
| Warning | `.warning` | `.colorBackgroundPrizeSubtlest` | `.colorContentPrizeBold` |
| Prize/Award | `.prize` | `.colorBackgroundPrizeSubtlest` | `.colorContentPrizeBold` |

#### Category Mapping (for `.category` tag type)
| Figma Category | TagView.Category | Icon | Background | Content |
|---------------|----------------------|------|------------|--------|
| 購物 | `.shopping` | `.icShoppingCartFilled` | `.colorBackgroundCategoryShopping` | `.colorContentInverseBold` |
| 餐飲 | `.food` | `.icTablewareFilled` | `.colorBackgroundCategoryFood` | `.colorContentInverseBold` |
| 交通 | `.transportation` | `.icCarFilled` | `.colorBackgroundCategoryTransportation` | `.colorContentInverseBold` |
| 娛樂 | `.entertainment` | `.icGamepadFilled` | `.colorBackgroundCategoryEntertainment` | `.colorContentInverseBold` |
| 居家 | `.life` | `.icHomeFilled` | `.colorBackgroundCategoryLife` | `.colorContentInverseBold` |
| 其他 | `.other` | `.icDocumentFilled` | `.colorBackgroundCategoryOther` | `.colorContentInverseBold` |
| 捐贈 | `.donation` | `.icDonationFilled` | `.colorBackgroundDonationDefault` | `.colorContentInverseBold` |
| 中獎 | `.prize` | `.icCoinFilled` | `.colorBackgroundPrizeDefault` | `.colorContentFixedBold` |
| 手輸 | `.manual` | `.icPencilFilled` | `.colorBackgroundNeutralSubtle` | `.colorContentDefault` |
| 載具 | `.carrier` | `.icBarcode` | `.colorBackgroundNeutralSubtle` | `.colorContentDefault` |
| 掃描 | `.scanner` | `.icScannerFilled` | `.colorBackgroundNeutralSubtle` | `.colorContentDefault` |

#### Implementation Examples
```swift
// ✅ Basic neutral tag
let carrierTag = TagView(
    tagType: .general(style: .light, colorType: .neutral, title: "載具"),
    size: .small
)

// ✅ Prize tag with icon
let prizeTag = TagView(
    tagType: .general(style: .light, colorType: .prize, title: "200元"),
    size: .small,
    leadingIcon: .icCoinFilled
)

// ✅ Danger tag (bold style)
let errorTag = TagView(
    tagType: .general(style: .bold, colorType: .danger, title: "錯誤"),
    size: .medium
)

// ✅ Category tag with icon
let donationTag = TagView(tagType: .category(.donation), size: .small)

// ✅ Category tag without icon
let carrierCategoryTag = TagView(tagType: .category(.carrier), size: .small, showIcon: false)
```

### Invoice List Tag Usage Guide

For invoice list rows, use the following tag mapping:

| Invoice State | TagType | Configuration |
|--------------|---------|---------------|
| 載具發票 | `.category(.carrier)` | size: `.small` |
| 手輸發票 | `.category(.manual)` | size: `.small` |
| 掃描發票 | `.category(.scanner)` | size: `.small` |
| 捐贈發票 | `.category(.donation)` | size: `.small` |
| 中獎發票（固定標籤） | `.category(.prize)` | size: `.small` |
| 中獎發票（獎金金額） | `.general(style: .light, colorType: .prize, title: "200元")` | size: `.small` |

### Migration from Legacy Tags

If you encounter legacy tag implementations using `SwiftPaddingLabel`, migrate to the new tag components:

```swift
// ❌ Legacy - Don't use
let label = SwiftPaddingLabel(.zero, top: 2, 2, 2, 2)
label.font = .invosCaption2
label.backgroundColor = .invosGrey1
label.layer.cornerRadius = 4

// ✅ New - Use TagView with category
let tag = TagView(tagType: .category(.carrier), size: .small)
```

#### Figma Tooltip → iOS ToolTipView

**File:** `invoice/Swift/UIObject/ToolTipView.swift`

**Figma Reference:** https://www.figma.com/design/Q9ItGuJJR4eHeZeKuqP1R4/UI-Kit-2025---Guideline---Spec?node-id=320-65872

A tooltip component with configurable tail position, supporting plain text or custom content.

**TailPosition Mapping:**
| Figma Tail Direction | ToolTipView.TailPosition | Arrow Direction |
|---------------------|--------------------------|-----------------|
| Top-Left | `.topLeading` | Up |
| Top-Center | `.topCenter` | Up |
| Top-Right | `.topTrailing` | Up |
| Bottom-Left | `.bottomLeading` | Down |
| Bottom-Center | `.bottomCenter` | Down |
| Bottom-Right | `.bottomTrailing` | Down |

**Specs:**
| Property | Value |
|----------|-------|
| Arrow size | 12 x 8 |
| Body corner radius | 8 |
| Body background | `.colorBackgroundToast` |
| Body padding (text mode) | top: 8, left: 12, bottom: 12, right: 12 |
| Text font | `.bodyLarge` |
| Text color | `.colorContentInverseBold` |
| Shadow | `.medium` (0, 4, blur 8) |

**Implementation Examples:**
```swift
// Plain text tooltip
let tooltip = ToolTipView(text: "提示文字", tailPosition: .topCenter)

// Custom content tooltip
let tooltip = ToolTipView(
    contentView: myCustomView,
    contentInsets: UIEdgeInsets(top: 8, left: 12, bottom: 8, right: 12),
    tailPosition: .bottomLeading
)
```

#### Figma Toast → iOS ToastView

**File:** `invoice/Swift/UIObject/ToastView.swift`

**Figma Reference:** https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/iOS---UI-Kit-2025?node-id=4762-16032

A centered overlay toast supporting loading and completed states, with optional CTA button.

**DisplayState Mapping:**
| Figma State | ToastView.DisplayState | Icon | CTA Button |
|------------|------------------------|------|------------|
| Loading | `.loading(String)` | Spinner (48pt) | Visible |
| Completed | `.completed(String)` | Checkmark (48pt) | Hidden |

**Specs:**
| Property | Value |
|----------|-------|
| Container width | 200pt |
| Container corner radius | 16 |
| Container background | `.colorBackgroundToast` |
| Container padding | 24 (all sides) |
| Icon size | 48×48 |
| Icon-to-text spacing | 8 |
| Text-to-CTA spacing | 24 |
| Text font | `.bodyLarge` |
| Text color | `.colorContentInverseBold` |
| CTA style | `PrimitiveButton` `.textInverse` / `.large` |

**Implementation Examples:**
```swift
// Show loading toast
let toast = ToastView()
toast.show()
toast.updateState(.loading("處理中..."))

// Update to completed
toast.updateState(.completed("完成"))

// Dismiss
toast.dismiss()

// React to CTA button
toast.ctaButtonTapped
    .subscribe(onNext: { toast.dismiss() })
    .disposed(by: disposeBag)
```

#### Figma Radio Item / Radio Group → iOS RadioButtonGroup

**File:** `invoice/Swift/UIObject/RadioButtonGroup/RadioButtonGroup.swift`

**Figma Reference (Radio item):** https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/iOS---UI-Kit-2025?node-id=6005-5524

**Figma Reference (Radio group):** https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/iOS---UI-Kit-2025?node-id=10473-3770

A radio button group supporting single selection with multiple layout options.

**LayoutType Mapping:**
| Figma Layout | RadioButtonGroup.LayoutType | Description |
|-------------|----------------------------|-------------|
| Vertical list | `.column` | Single column, vertical spacing 16pt |
| Two-column grid | `.twoColumns` | 2-per-row grid, spacing 16pt |
| Horizontal row | `.sideBySide` | Horizontal, spacing 16pt |

**Status Mapping:**
| Figma State | RadioButtonGroup.Status | Behavior |
|------------|------------------------|----------|
| Enabled | `.enabled` | Normal interaction |
| Error | `.error` | Danger border color on circle |
| Disabled | `.disabled` | Alpha 0.4, no interaction |

**Radio Circle Specs:**
| Property | Value |
|----------|-------|
| Circle size | 24×24 |
| Outer circle stroke | 2pt |
| Inner nub radius | 4pt |
| Unchecked border | `.colorBorderDefault` |
| Checked fill | `.Brand.colorBackgroundBrandDefault` |
| Checked nub | `.colorContentFixedWhite` |
| Error border | `.colorBorderDanger` |
| Circle-to-label spacing | 8 |
| Label font | `.bodyLarge` |
| Label color | `.colorContentDefault` (disabled: `.colorContentSubtlest`) |

**Implementation Examples:**
```swift
// Side-by-side radio group
let radioGroup = RadioButtonGroup(
    items: ["男", "女"],
    layout: .sideBySide,
    defaultIndex: 0
)

// Column layout
let radioGroup = RadioButtonGroup(
    items: ["選項一", "選項二", "選項三"],
    layout: .column
)

// Observe selection
radioGroup.selectedIndex
    .subscribe(onNext: { index in
        print("Selected: \(index ?? -1)")
    })
    .disposed(by: disposeBag)

// Set error state
radioGroup.status = .error
```

---

> **元件 API 使用細節（init 簽名、properties、methods）：使用前請直接 Read 該元件資料夾下的 .swift 原始碼（如 `invoice/Swift/UIObject/SelectionFieldView/*.swift`）**

