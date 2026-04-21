import figma from '@figma/code-connect'
import Button from './Button'

/**
 * Figma Code Connect — Button
 *
 * Component set in 🧰 iOS - UI Kit 2025:
 *   setKey: e44907631aa3e7f7d9cfa9cc0a89c4ca7e834e49
 *   Variants: Style (Filled/Outline/Ghost/Text) × Type (Primary/Neutral/Danger/Prize/Donation/White/Inverse/Secondary) × State (Enabled/Disabled/Loading)
 *
 * Source: 🧰 iOS - UI Kit 2025 library (fileKey 8pE8KHl50y72IP7JseLH55)
 */
figma.connect(
  Button,
  'https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/%F0%9F%A7%B0-iOS---UI-Kit-2025?node-id=10905-4663',
  {
    props: {
      children: figma.string('↳ Text'),
      variant: figma.enum('Style', {
        Filled: 'filled',
        Outline: 'outline',
        Ghost: 'ghost',
        Text: 'text',
      }),
      colorType: figma.enum('Type', {
        Primary: 'primary',
        Neutral: 'neutral',
        Danger: 'danger',
        Prize: 'prize',
        Donation: 'donation',
        White: 'white',
        Inverse: 'inverse',
        Secondary: 'secondary',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
        Enabled: false,
        Loading: false,
      }),
      loading: figma.enum('State', {
        Loading: true,
        Enabled: false,
        Disabled: false,
      }),
    },
    example: ({ children, variant, colorType, disabled, loading }) => (
      <Button
        variant={variant}
        colorType={colorType}
        size="large"
        disabled={disabled}
        loading={loading}
      >
        {children}
      </Button>
    ),
  }
)
