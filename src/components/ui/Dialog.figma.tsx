import figma from '@figma/code-connect'
import Dialog from './Dialog'

figma.connect(Dialog, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-530', {
  props: {
    title: figma.string('↳ Title'),
    description: figma.string('↳ Description'),
  },
  example: ({ title, description }) => (
    <Dialog
      open={true}
      onClose={() => {}}
      title={title}
      description={description}
      actions={[
        { label: 'Cancel', onClick: () => {}, colorType: 'neutral' },
        { label: 'Confirm', onClick: () => {}, colorType: 'primary' },
      ]}
    />
  ),
})
