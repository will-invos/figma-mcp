import figma from '@figma/code-connect'
import Tooltip from './Tooltip'

figma.connect(Tooltip, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=40164f53-d5c1', {
  example: () => (
    <Tooltip content="Tooltip text">
      <button>Hover me</button>
    </Tooltip>
  ),
})
