import figma from '@figma/code-connect'
import SearchField from './SearchField'

figma.connect(SearchField, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=87e416d1-9f17', {
  example: () => <SearchField placeholder="搜尋" />,
})
