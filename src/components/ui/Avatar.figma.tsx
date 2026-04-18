import figma from '@figma/code-connect'
import Avatar from './Avatar'

figma.connect(Avatar, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=9349bac4-0a7e', {
  example: () => <Avatar name="Will" />,
})
