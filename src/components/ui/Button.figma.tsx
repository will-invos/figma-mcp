import figma from '@figma/code-connect'
import Button from './Button'

/**
 * Figma Code Connect — Button
 *
 * Component set in 🧰 iOS - UI Kit 2025:
 *   setKey: e44907631aa3e7f7d9cfa9cc0a89c4ca7e834e49
 *   Variants: Style (Filled/Outline/Ghost/Text) × Type (Primary/Neutral/Danger/Prize/Donation/White/Inverse/Secondary) × State (Enabled/Disabled/Loading)
 *
 * TODO: Replace the URL below with the actual node URL.
 * Copy from Figma: right-click Button component set → Copy/Paste as → Copy link.
 */
figma.connect(
  Button,
  'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=TODO',
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
