import figma from '@figma/code-connect'
import FieldGroupHelpText from './FieldGroupHelpText'

figma.connect(FieldGroupHelpText, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=c261cdbb-19ae', {
  props: {
    text: figma.string('↳ Help text'),
    status: figma.enum('Status', { Default: 'default', Error: 'error' }),
    align: figma.enum('Align', { Left: 'left', Right: 'right' }),
  },
  example: ({ text, status, align }) => (
    <FieldGroupHelpText text={text} status={status} align={align} />
  ),
})
