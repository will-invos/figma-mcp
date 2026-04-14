import figma from '@figma/code-connect'
import Radio from './Radio'

// Radio item
figma.connect(Radio, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-375', {
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
  example: ({ children, checked, disabled }) => (
    <Radio checked={checked} disabled={disabled}>
      {children}
    </Radio>
  ),
})
