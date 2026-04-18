---
name: code-connect
description: Create or update a .figma.tsx Code Connect mapping file for a React component
---

# Code Connect

Create or update a `.figma.tsx` file that maps a React component's props to Figma component variant properties.

## Prerequisites

The user must specify:
- The target component name (e.g., "Avatar")
- The Figma component node ID or URL (if not already in `figma-tokens.json`)

## Step 1 — Analyze component props

1. Read `src/components/ui/{ComponentName}.tsx`
2. Extract the props interface — list every prop with its type:
   - Union types (e.g., `'filled' | 'outline'`) → will map to `figma.enum`
   - Boolean props (e.g., `disabled?: boolean`) → will map to `figma.boolean`
   - String props for text content (e.g., `children`, `label`) → will map to `figma.string`
   - Other props (callback, ReactNode) → typically not mapped

## Step 2 — Get Figma component info

1. Read `figma-tokens.json` to find the component set key if available
2. Call `get_design_context` or `get_metadata` (figma-remote MCP) with the component's node ID
3. From the Figma response, extract:
   - Variant property names and their possible values (e.g., `Style: [Filled, Outline, Ghost]`)
   - Text override property names (e.g., `↳ Text`)
   - Boolean toggle names (e.g., `Leading icon`)

## Step 3 — Build the mapping

Match React props to Figma properties:

| React prop type | Figma helper | Example |
|---|---|---|
| Union / enum | `figma.enum('FigmaPropertyName', { 'FigmaValue': 'reactValue', ... })` | variant, colorType, size |
| Boolean | `figma.boolean('FigmaPropertyName', { true: <value>, false: undefined })` | leadingIcon, disabled |
| String (text) | `figma.string('↳ FigmaPropertyName')` | children, label, placeholder |

### Mapping guidelines

- Figma enum values are PascalCase (e.g., `Filled`), React values are camelCase/kebab (e.g., `filled`)
- For state-driven booleans (like disabled/loading from a State enum), use `figma.enum` with boolean outputs
- Text overrides in Figma often use the `↳` prefix notation
- Props that have no Figma counterpart (event handlers, className, ref) are skipped

## Step 4 — Write `.figma.tsx`

Create `src/components/ui/{ComponentName}.figma.tsx`:

```tsx
import figma from '@figma/code-connect'
import ComponentName from './ComponentName'

figma.connect(ComponentName, 'https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}', {
  props: {
    // mapped props from Step 3
  },
  example: ({ prop1, prop2, ... }) => (
    <ComponentName
      prop1={prop1}
      prop2={prop2}
    />
  ),
})
```

### Template rules

- Import `figma` from `@figma/code-connect`
- Import the component from the sibling file (relative path `./ComponentName`)
- Use the full Figma URL with node-id parameter
- The `example` function should demonstrate realistic usage with all mapped props
- The file key for this project is `zbdxaNIbxN4Iujx6Qi1DlI` (MCP-test)

## Reference

Use `src/components/ui/Button.figma.tsx` as the canonical example. It demonstrates:
- `figma.enum` for variant and color type mapping
- `figma.boolean` for icon toggles
- `figma.enum` with boolean output for state-driven props (disabled, loading)
- `figma.string` for text content
- A complete `example` function

## Checklist before finishing

- [ ] Props interface fully analyzed
- [ ] Every mappable prop has a corresponding `figma.*` helper
- [ ] Figma property names match exactly (case-sensitive)
- [ ] Example function covers all mapped props
- [ ] File is at `src/components/ui/{ComponentName}.figma.tsx`
