import figma from '@figma/code-connect'
import FieldGroupHeader from './FieldGroupHeader'

figma.connect(FieldGroupHeader, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=cbbb5741-ba92', {
  props: {
    headline: figma.string('↳ Headline'),
    description: figma.string('↳ Description'),
  },
  example: ({ headline, description }) => (
    <FieldGroupHeader headline={headline} description={description} />
  ),
})
