import figma from '@figma/code-connect'
import ListFooter from './ListFooter'

figma.connect(ListFooter, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=f916ec3a-699e', {
  props: {
    text: figma.string('↳ Text'),
  },
  example: ({ text }) => <ListFooter text={text} />,
})
