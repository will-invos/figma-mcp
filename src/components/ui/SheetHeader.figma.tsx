import figma from '@figma/code-connect'
import SheetHeader from './SheetHeader'

figma.connect(SheetHeader, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=39089856-e367', {
  props: {
    title: figma.string('↳ Title'),
  },
  example: ({ title }) => <SheetHeader title={title} />,
})
