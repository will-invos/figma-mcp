import figma from '@figma/code-connect'
import ProgressBar from './ProgressBar'

figma.connect(ProgressBar, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=3d3eaf5c-17ea', {
  example: () => <ProgressBar value={60} />,
})
