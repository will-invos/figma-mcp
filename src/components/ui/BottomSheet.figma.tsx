import figma from '@figma/code-connect'
import BottomSheet from './BottomSheet'

figma.connect(BottomSheet, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=90452b7e-6a38', {
  props: {
    title: figma.string('↳ Title'),
  },
  example: ({ title }) => (
    <BottomSheet open={true} onClose={() => {}} title={title}>
      <div />
    </BottomSheet>
  ),
})
