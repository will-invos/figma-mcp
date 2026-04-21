import figma from '@figma/code-connect'
import ListItem from './ListItem'

/**
 * Figma Code Connect — ListItem
 *
 * Component set in 🧰 iOS - UI Kit 2025:
 *   setKey: 09766221213c56e244235692f3aeea506aa305a8
 *   Variants:
 *     Type: Default (56px) / Has description (80px) / Compact (48px)
 *     State: Enabled / Disabled
 *     Trailing elements: None / Drill-in / Text / Text button / CTA / Icon / Spinner / Switch / Checkbox
 *   Booleans: Leading icon, Leading addition, Badge, Divider, Trailing addition
 *
 * Source: 🧰 iOS - UI Kit 2025 library (fileKey 8pE8KHl50y72IP7JseLH55)
 */
figma.connect(
  ListItem,
  'https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/%F0%9F%A7%B0-iOS---UI-Kit-2025?node-id=3754-2508',
  {
    props: {
      headline: figma.string('↳ Headline'),
      description: figma.string('↳ Text'),
      type: figma.enum('Type', {
        Default: 'default',
        'Has description': 'rich',
        Compact: 'compact',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
        Enabled: false,
      }),
      trailing: figma.enum('Trailing elements', {
        None: 'none',
        'Drill-in': 'drill-in',
        Text: 'text',
        'Text button': 'text-button',
        CTA: 'cta',
        Icon: 'icon',
        Spinner: 'spinner',
        Switch: 'switch',
        Checkbox: 'checkbox',
      }),
      showDivider: figma.boolean('Divider'),
    },
    example: ({ headline, description, type, trailing, disabled, showDivider }) => (
      <ListItem
        headline={headline}
        description={description}
        type={type}
        trailing={trailing}
        disabled={disabled}
        showDivider={showDivider}
      />
    ),
  }
)
