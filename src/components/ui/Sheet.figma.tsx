import figma from '@figma/code-connect'
import Sheet from './Sheet'

figma.connect(Sheet, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-558', {
  props: {
    title: figma.string('↳ Title'),
  },
  example: ({ title }) => (
    <Sheet
      open={true}
      onClose={() => {}}
      title={title}
    >
      <div />
    </Sheet>
  ),
})
