import figma from '@figma/code-connect'
import Slider from './Slider'

figma.connect(Slider, 'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=ebc24394-00b1', {
  example: () => <Slider value={50} onChange={() => {}} />,
})
