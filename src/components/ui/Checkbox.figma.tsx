import figma from '@figma/code-connect'
import Checkbox from './Checkbox'

// Checkbox item (checkbox with label)
figma.connect(Checkbox, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-432', {
  props: {
    children: figma.string('↳ Label'),
    description: figma.string('↳ Description'),
    checked: figma.enum('Checked', {
      True: true,
      False: false,
    }),
    status: figma.enum('Status', {
      Enabled: 'default',
      Error: 'error',
      Disabled: undefined,
    }),
    disabled: figma.enum('Status', {
      Disabled: true,
      Enabled: false,
      Error: false,
    }),
  },
  example: ({ children, checked, status, disabled }) => (
    <Checkbox checked={checked} status={status} disabled={disabled}>
      {children}
    </Checkbox>
  ),
})
