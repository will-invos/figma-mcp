import figma from '@figma/code-connect'
import TabBar from './TabBar'

// Tab bar — placeholder mapping. In Figma, tab items are individual instances;
// the React API takes them as a structured array.
figma.connect(TabBar, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=43a7374c-4a22', {
  example: () => (
    <TabBar
      activeKey="home"
      onChange={() => {}}
      items={[
        { key: 'home', label: '首頁', icon: <span /> },
        { key: 'invoice', label: '發票', icon: <span /> },
        { key: 'me', label: '我的', icon: <span /> },
      ]}
    />
  ),
})
