# Project: figma-mcp

React + TypeScript + Vite demo app with a custom iOS UI Kit and design tokens.

## Tech Stack
- React 19, TypeScript, Vite
- No CSS framework (plain CSS with design token CSS variables)
- No router library (hash-based routing in App.tsx)

## UI Kit
All components live in `src/components/ui/` with matching `.css` files.
Available: Button, IconButton, TextField, Select, Checkbox, Radio, Switch, Tag, Badge, Alert, ListItem, Dialog, Sheet, Toast, Spinner.
Design tokens: `src/components/ui/tokens/` (colors, radius, shadows, spacing, typography).

### Coding Rules
- **No hard-coded colors.** Never use hex (`#fff`), `rgb()`, `rgba()`, or named colors (`white`, `black`) directly in component CSS. Always reference a design token CSS variable (`var(--color-*)`). If a needed token doesn't exist, add it to `tokens/colors.css` first, then reference it.
  - ✅ `color: var(--color-content-fixed-white);`
  - ❌ `color: white;` / `color: #ffffff;` / `color: rgba(255,255,255,0.2);`
  - The only file allowed to contain raw color values is `tokens/colors.css` (token definitions).
- **No fallback values in `var()`.** Tokens are always defined; fallback hex is dead code that can silently diverge. Write `var(--color-background-brand-default)`, not `var(--color-background-brand-default, #3560ff)`.
- **Use typography tokens.** Use `var(--font-family)` (PingFang TC) for all UI text and `var(--font-family-code)` for monospace. No separate CN font variable — PingFang TC is the default. Typography classes are in `tokens/typography.css`.

## Figma Integration

### Design System
- **Figma file**: `zbdxaNIbxN4Iujx6Qi1DlI` (MCP-test)
- **Library**: 🧰 iOS - UI Kit 2025 (components), 🧰 Design System 2025 (variables, text styles)
- **Token reference**: `figma-tokens.json` — contains all component keys, text style keys, and variable collection keys

### Code Connect
Each UI component has a `.figma.tsx` mapping file (e.g., `TextField.figma.tsx`).
These map React component props ↔ Figma component variant properties and text overrides.

### Figma → Code workflow
1. Use `get_design_context` (figma-remote or figma-dev-mode MCP) with the node ID
2. Code Connect mappings will return React component usage instead of raw Tailwind
3. Adapt to the project's existing patterns (CSS variables, component APIs)

### Code → Figma workflow (IMPORTANT)
**Do NOT use `generate_figma_design` (HTML capture).** It loses variables, text styles, and component structure.

Instead, use `use_figma` Plugin API to directly assemble library component instances:
1. Read `figma-tokens.json` for component set keys and text style keys
2. Import components via `figma.importComponentSetByKeyAsync(setKey)`
3. Find the correct variant, create instances
4. Set text overrides via `instance.setProperties({ '↳ PropName#id': 'value' })`
5. Import and apply text styles via `figma.importStyleByKeyAsync(key)` → `textNode.textStyleId = style.id`
6. Import and bind variables via `figma.teamLibrary.getVariablesInLibraryCollectionAsync(collectionKey)` → `figma.variables.setBoundVariableForPaint()`

### Text Styles (from Design System 2025)
| Style                  | Font                      | Usage                          |
|------------------------|---------------------------|--------------------------------|
| iOS/Label/Large        | SF Pro Medium 16          | Field labels, section headers  |
| iOS/Body-CN/Large      | PingFang TC Regular 16    | Input placeholders, body text  |
| iOS/Body-CN/Medium     | PingFang TC Regular 14    | Descriptions, secondary text   |
| iOS/Body-CN/Small      | PingFang TC Regular 12    | Help text, captions            |
| iOS/Label-CN/Large     | PingFang TC Medium 16     | Nav title, button text         |

### Variable Collections
| Collection       | Key                                        | Library              |
|------------------|--------------------------------------------|----------------------|
| Semantic: Colors | `aca99ba7f5e3b863523761870ab4fa8d4b24c0be` | Design System 2025   |
| Sementic: Sizes  | `b2b4d349ff3e569ea2799606edbc77e3b5c1aa60` | Design System 2025   |

### Fonts
PingFang TC is NOT available in the remote Figma Plugin API. When modifying text directly (not via `setProperties`), use `Noto Sans TC` as a fallback, then re-apply the correct text style via `textNode.textStyleId`.
