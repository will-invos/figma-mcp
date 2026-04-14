import figma from '@figma/code-connect'
import Select from './Select'

figma.connect(Select, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-304', {
  props: {
    placeholder: figma.string('↳ Placeholder'),
    status: figma.enum('Status', {
      Enabled: 'default',
      Error: 'error',
      Disabled: 'disabled',
    }),
    variant: figma.enum('Type', {
      'Single line': 'default',
      'Has label': 'inner-label',
    }),
    leadingIcon: figma.boolean('Show leading icon', {
      true: '<Icon />',
      false: undefined,
    }),
  },
  example: ({ placeholder, status, variant }) => (
    <Select
      variant={variant}
      placeholder={placeholder}
      status={status}
      options={[]}
    />
  ),
})
