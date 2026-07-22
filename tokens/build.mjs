// Token pipeline — 把 Figma 倒出的 dump 轉成 tokens.json（git 母版）並產出 CSS
// 用法：npm run tokens:build（詳見 tokens/README.md）
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import StyleDictionary from 'style-dictionary'

const HERE = new URL('.', import.meta.url).pathname

// ---------- 1. 讀 Figma dump ----------
const colorLines = readFileSync(`${HERE}figma-dump/colors.txt`, 'utf8').trim().split('\n')
const sizeLines = readFileSync(`${HERE}figma-dump/sizes.txt`, 'utf8').trim().split('\n')

const colors = colorLines
  .map((l) => { const [name, light, dark] = l.split('|'); return { name, light, dark } })
  .sort((a, b) => a.name.localeCompare(b.name))
const sizes = sizeLines
  .map((l) => { const [name, val] = l.split('|'); return { name, value: `${val}px` } })
  .sort((a, b) => a.name.localeCompare(b.name))

// ---------- 2. 寫 tokens.json（排序後的中繼母版，供 git diff 審查） ----------
const master = {
  $meta: {
    source: 'Figma 🎨 Design System 2025',
    collections: {
      'Semantic: Colors': 'aca99ba7f5e3b863523761870ab4fa8d4b24c0be',
      'Sementic: Sizes': 'b2b4d349ff3e569ea2799606edbc77e3b5c1aa60',
    },
    note: '此檔由 tokens/build.mjs 從 figma-dump/*.txt 產生（排序保證 diff 穩定），不要手改。',
  },
  colors: Object.fromEntries(colors.map((t) => [t.name, { light: t.light, dark: t.dark }])),
  sizes: Object.fromEntries(sizes.map((t) => [t.name, t.value])),
}
writeFileSync(`${HERE}tokens.json`, JSON.stringify(master, null, 2) + '\n')

// ---------- 3. 組 Style Dictionary token tree ----------
function insert(tree, path, value) {
  const parts = path.split('/')
  let node = tree
  for (const p of parts.slice(0, -1)) {
    if (node[p] && 'value' in node[p]) throw new Error(`名稱衝突：${path}（${p} 已是 leaf）`)
    node = node[p] ??= {}
  }
  const leaf = parts.at(-1)
  if (node[leaf]) throw new Error(`名稱衝突：${path}`)
  node[leaf] = { value }
}

const lightTree = {}, darkTree = {}
for (const t of colors) { insert(lightTree, t.name, t.light); insert(darkTree, t.name, t.dark) }
for (const t of sizes) insert(lightTree, t.name, t.value)

// ---------- 4. 產出 CSS（light → :root、dark → [data-theme="dark"]） ----------
mkdirSync(`${HERE}dist`, { recursive: true })
async function buildCss(tokens, destination, selector) {
  const sd = new StyleDictionary({
    tokens,
    platforms: {
      css: {
        transforms: ['name/kebab'],
        buildPath: `${HERE}dist/`,
        files: [{ destination, format: 'css/variables', options: { selector } }],
      },
    },
    log: { verbosity: 'silent' },
  })
  await sd.buildAllPlatforms()
}
await buildCss(lightTree, 'tokens.light.css', ':root')
await buildCss(darkTree, 'tokens.dark.css', '[data-theme="dark"]')

const light = readFileSync(`${HERE}dist/tokens.light.css`, 'utf8')
const dark = readFileSync(`${HERE}dist/tokens.dark.css`, 'utf8')
writeFileSync(
  `${HERE}dist/tokens.css`,
  `/* 由 tokens/build.mjs 產生 — 唯讀投影，要改請改 Figma variables（見 tokens/README.md） */\n${light}\n${dark}`
)
rmSync(`${HERE}dist/tokens.light.css`)
rmSync(`${HERE}dist/tokens.dark.css`)

console.log(`✅ tokens.json：colors ${colors.length}、sizes ${sizes.length}`)
console.log('✅ dist/tokens.css 已產出')
