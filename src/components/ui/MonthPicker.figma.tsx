import figma from '@figma/code-connect'
import MonthPicker from './MonthPicker'

figma.connect(MonthPicker, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=bd3d9dc2-7119', {
  example: () => <MonthPicker value="2026-04" />,
})
