import figma from '@figma/code-connect'
import NavigationBar from './NavigationBar'

/**
 * Figma Code Connect — NavigationBar
 *
 * Component set in 🧰 iOS - UI Kit 2025:
 *   setKey: 1173e1cfb820dae8fcf2015bb87c96fe7e9c5378
 *   Variants: Title size (Regular/Large) × Type (Default/Home/Search/Tabs)
 *   Text prop: ↳ Title
 *
 * Source: 🧰 iOS - UI Kit 2025 library (fileKey 8pE8KHl50y72IP7JseLH55)
 */
figma.connect(
  NavigationBar,
  'https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/%F0%9F%A7%B0-iOS---UI-Kit-2025?node-id=3743-5891',
  {
    props: {
      title: figma.string('↳ Title'),
      titleSize: figma.enum('Title size', {
        Regular: 'regular',
        Large: 'large',
      }),
      type: figma.enum('Type', {
        Default: 'default',
        Home: 'home',
        Search: 'search',
        Tabs: 'tabs',
      }),
    },
    example: ({ title, titleSize, type }) => (
      <NavigationBar title={title} titleSize={titleSize} type={type} />
    ),
  }
)
