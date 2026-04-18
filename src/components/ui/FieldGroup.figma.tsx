import figma from '@figma/code-connect'
import FieldGroup from './FieldGroup'
import TextField from './TextField'

figma.connect(FieldGroup, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=648cb01e-6fc7', {
  props: {
    status: figma.enum('Status', { Enabled: 'default', Error: 'error' }),
  },
  example: ({ status }) => (
    <FieldGroup label="Label" helpText="Help text" status={status}>
      <TextField placeholder="請輸入" />
    </FieldGroup>
  ),
})
