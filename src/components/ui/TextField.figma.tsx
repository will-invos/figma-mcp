import figma from '@figma/code-connect'
import TextField from './TextField'

// Text field — Simple variant (default)
figma.connect(TextField, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-85', {
  props: {
    placeholder: figma.string('↳ Placeholder'),
    value: figma.string('↳ Value'),
    label: figma.string('↳ Label'),
    status: figma.enum('Status', {
      Enabled: 'default',
      Error: 'error',
      Disabled: 'disabled',
    }),
    variant: figma.enum('Type', {
      Simple: 'default',
      'Has label': 'inner-label',
    }),
    leadingIcon: figma.boolean('Show leading icon', {
      true: '<Icon />',
      false: undefined,
    }),
    trailingIcon: figma.boolean('Show trailing icon', {
      true: '<Icon />',
      false: undefined,
    }),
  },
  example: ({ placeholder, status, variant, label }) => (
    <TextField
      variant={variant}
      label={label}
      placeholder={placeholder}
      status={status}
    />
  ),
})
