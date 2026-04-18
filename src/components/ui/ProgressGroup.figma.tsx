import figma from '@figma/code-connect'
import ProgressGroup from './ProgressGroup'

figma.connect(ProgressGroup, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=922500f9-f9ea', {
  props: {
    textPosition: figma.enum('Text position', { Top: 'top', Aside: 'aside' }),
  },
  example: ({ textPosition }) => (
    <ProgressGroup
      value={50}
      textPosition={textPosition}
      leadingText="50%"
      trailingText="100/200"
    />
  ),
})
