import figma from '@figma/code-connect'
import Alert from './Alert'

figma.connect(Alert, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-495', {
  props: {
    children: figma.string('↳ Text'),
    colorType: figma.enum('Type', {
      Primary: 'primary',
      Neutral: 'neutral',
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
      Prize: 'prize',
    }),
    onClose: figma.boolean('Close button', {
      true: () => {},
      false: undefined,
    }),
  },
  example: ({ children, colorType, onClose }) => (
    <Alert colorType={colorType} onClose={onClose}>
      {children}
    </Alert>
  ),
})
