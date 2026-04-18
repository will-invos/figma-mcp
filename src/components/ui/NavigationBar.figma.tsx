import figma from '@figma/code-connect'
import NavigationBar from './NavigationBar'

figma.connect(NavigationBar, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=1173-0', {
  props: {
    title: figma.string('↳ Title'),
    titleSize: figma.enum('Title size', { Regular: 'regular', Large: 'large' }),
  },
  example: ({ title, titleSize }) => (
    <NavigationBar title={title} titleSize={titleSize} />
  ),
})
