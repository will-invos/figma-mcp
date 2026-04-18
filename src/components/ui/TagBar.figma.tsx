import figma from '@figma/code-connect'
import TagBar from './TagBar'

figma.connect(TagBar, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=19639663-fdb5', {
  example: () => (
    <TagBar
      activeKey="all"
      items={[
        { key: 'all', label: '全部' },
        { key: 'unused', label: '未使用' },
        { key: 'used', label: '已兌換' },
      ]}
    />
  ),
})
