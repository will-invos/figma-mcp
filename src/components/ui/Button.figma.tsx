import figma from '@figma/code-connect'
import Button from './Button'

// Text button/Large — maps to Button component
figma.connect(Button, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-562', {
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
      White: 'white',
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
    leadingIcon: figma.boolean('Leading icon', {
      true: '<Icon />',
      false: undefined,
    }),
    trailingIcon: figma.boolean('Trailing icon', {
      true: '<Icon />',
      false: undefined,
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
})
