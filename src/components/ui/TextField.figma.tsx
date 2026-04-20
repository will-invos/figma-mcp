import figma from '@figma/code-connect'
import TextField from './TextField'

/**
 * Figma Code Connect — TextField
 *
 * Component set in 🧰 iOS - UI Kit 2025:
 *   setKey: bce75f45f294148ce9ad00b269adc1a01c1ab917
 *   Variants: Type (Simple/Has label) × Status (Enabled/Error/Disabled) × Content (Empty/Filled)
 *
 * TODO: Replace the URL below with the actual node URL from Figma.
 */
figma.connect(
  TextField,
  'https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=TODO',
  {
    props: {
      placeholder: figma.string('↳ Placeholder'),
      value: figma.string('↳ Value'),
      label: figma.string('↳ Label'),
      variant: figma.enum('Type', {
        Simple: 'default',
        'Has label': 'inner-label',
      }),
      status: figma.enum('Status', {
        Enabled: 'default',
        Error: 'error',
        Disabled: 'disabled',
      }),
    },
    example: ({ placeholder, label, variant, status }) => (
      <TextField
        variant={variant}
        label={label}
        placeholder={placeholder}
        status={status}
      />
    ),
  }
)
