import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import fs from 'fs'
import path from 'path'

/**
 * preflight.css 是選用的全域 reset，刻意不被 index.ts import
 * （否則就會混進 styles.css，變成強制套用在使用端全域）。
 * 因為沒有任何模組 import 它，bundler 不會自己帶上，要在這裡另外輸出。
 */
function emitPreflightCss() {
  return {
    name: 'emit-preflight-css',
    generateBundle() {
      const source = fs.readFileSync(
        path.resolve(__dirname, 'src/components/ui/preflight.css'),
        'utf8'
      )
      this.emitFile({ type: 'asset', fileName: 'preflight.css', source })
    },
  } as const
}

/**
 * Library build config — used for publishing as a consumable package.
 * Run: `npm run build:lib`
 *
 * Outputs to `dist/`:
 *   - index.js         (ES module bundle, react/react-dom external)
 *   - index.css        (single bundled CSS with all component styles + tokens)
 *   - preflight.css    (optional global reset, emitted separately — see below)
 *   - index.d.ts       (type declarations via vite-plugin-dts)
 *
 * Consumers:
 *   import { Button } from '@invos/design-system'
 *   import '@invos/design-system/styles.css'
 *   import '@invos/design-system/preflight.css'  // optional
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
    emitPreflightCss(),
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
