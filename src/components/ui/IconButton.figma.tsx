import figma from '@figma/code-connect'
import IconButton from './IconButton'

/**
 * Figma Code Connect — IconButton (maps to "Icon button/Medium" in Figma)
 *
 * Component set in 🧰 iOS - UI Kit 2025:
 *   setKey: 28cb4faab4de891d5deefc357a4c863efab13c20
 *   Variants: Style (Filled/Outline/Ghost) × Type (Primary/Neutral/Danger/Prize/Donation) × State (Enabled/Disabled/Loading)
 *
 * Source: 🧰 iOS - UI Kit 2025 library (fileKey 8pE8KHl50y72IP7JseLH55)
 */
figma.connect(
  IconButton,
  'https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/%F0%9F%A7%B0-iOS---UI-Kit-2025?node-id=10905-4664',
  {
    props: {
      variant: figma.enum('Style', {
        Filled: 'filled',
        Outline: 'outline',
        Ghost: 'ghost',
      }),
      colorType: figma.enum('Type', {
        Primary: 'primary',
        Neutral: 'neutral',
        Danger: 'danger',
        Prize: 'prize',
        Donation: 'donation',
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
    example: ({ variant, colorType, disabled, loading }) => (
      <IconButton
        aria-label="Icon button"
        variant={variant}
        colorType={colorType}
        size="medium"
        disabled={disabled}
        loading={loading}
        icon={<i className="icon-star" aria-hidden="true" />}
      />
    ),
  }
)
