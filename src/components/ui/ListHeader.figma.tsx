import figma from '@figma/code-connect'
import ListHeader from './ListHeader'

figma.connect(ListHeader, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=9d2392e8-e6cf', {
  props: {
    title: figma.string('↳ Title'),
  },
  example: ({ title }) => <ListHeader title={title} />,
})
