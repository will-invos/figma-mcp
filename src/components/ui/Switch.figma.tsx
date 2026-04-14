import figma from '@figma/code-connect'
import Switch from './Switch'

figma.connect(Switch, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-395', {
  props: {
    checked: figma.enum('Status', {
      On: true,
      Off: false,
    }),
    disabled: figma.enum('Status', {
      'Disabled-on': true,
      'Disabled-off': true,
      On: false,
      Off: false,
    }),
  },
  example: ({ checked, disabled }) => (
    <Switch checked={checked} disabled={disabled} />
  ),
})
