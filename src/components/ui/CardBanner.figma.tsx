import figma from '@figma/code-connect'
import CardBanner from './CardBanner'

figma.connect(CardBanner, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=040acef5-ec90', {
  props: {
    title: figma.string('↳ Title'),
    description: figma.string('↳ Description'),
  },
  example: ({ title, description }) => (
    <CardBanner title={title} description={description} />
  ),
})
