import figma from '@figma/code-connect'
import CardItem from './CardItem'

figma.connect(CardItem, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=f7d94458-52d9', {
  props: {
    title: figma.string('↳ Title'),
    description: figma.string('↳ Description'),
  },
  example: ({ title, description }) => (
    <CardItem title={title} description={description} />
  ),
})
