import figma from '@figma/code-connect'
import Badge from './Badge'

figma.connect(Badge, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=26-483', {
  props: {
    variant: figma.enum('Style', {
      Dot: 'dot',
      Number: 'number',
    }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    count: figma.string('↳ Count'),
  },
  example: ({ variant, size }) => (
    <Badge variant={variant} size={size} />
  ),
})
