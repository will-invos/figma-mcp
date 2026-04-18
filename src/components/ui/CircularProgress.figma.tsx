import figma from '@figma/code-connect'
import CircularProgress from './CircularProgress'

figma.connect(CircularProgress, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=8d369203-381e', {
  example: () => <CircularProgress value={60} />,
})
