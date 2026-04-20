import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

/**
 * Library build config — used for publishing as a consumable package.
 * Run: `npm run build:lib`
 *
 * Outputs to `dist/`:
 *   - index.js         (ES module bundle, react/react-dom external)
 *   - style.css        (single bundled CSS with all component styles + tokens)
 *   - index.d.ts       (type declarations via vite-plugin-dts)
 *
 * Consumers:
 *   import { Button } from '@invos/ios-ui-kit'
 *   import '@invos/ios-ui-kit/styles.css'
 */
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src/components/ui',
      include: ['src/components/ui/**/*.ts', 'src/components/ui/**/*.tsx'],
      exclude: [
        'src/components/ui/**/*.figma.tsx',
        'src/components/ui/**/*.stories.tsx',
        'src/components/ui/**/*.story.ts',
        'src/components/ui/**/*.story.tsx',
      ],
      outDir: 'dist',
      tsconfigPath: 'tsconfig.lib.json',
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/components/ui/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
