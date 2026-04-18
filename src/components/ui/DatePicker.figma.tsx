import figma from '@figma/code-connect'
import DatePicker from './DatePicker'

figma.connect(DatePicker, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=11abf97f-4890', {
  example: () => <DatePicker value="2026-04-15" />,
})
