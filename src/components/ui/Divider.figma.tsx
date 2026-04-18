import figma from '@figma/code-connect'
import Divider from './Divider'

figma.connect(Divider, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=9c4f8569-dffe', {
  example: () => <Divider />,
})
