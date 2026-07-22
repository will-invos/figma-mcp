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

// web 輸出排除清單（2026-07-22 更正定案：web 對齊 app **全收錄顏色**；僅大間距維持排除）
const WEB_EXCLUDE = [
  /^space\/(0|1000|1200|1400|1600|1800|2000|2400|3000|3600|4000|5000)$/, // 大間距，web 未使用
]
const webInclude = (name) => !WEB_EXCLUDE.some((re) => re.test(name))

const lightTree = {}, darkTree = {}
let excluded = 0
for (const t of colors) {
  if (!webInclude(t.name)) { excluded++; continue }
  insert(lightTree, t.name, t.light); insert(darkTree, t.name, t.dark)
}
for (const t of sizes) {
  if (!webInclude(t.name)) { excluded++; continue }
  insert(lightTree, t.name, t.value)
}

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

// ---------- 5. Native 輸出（格式對齊既有交付：iOS Asset Catalog colorsets、Android colors.xml） ----------
function parseColor(s) {
  let m
  if ((m = s.match(/^#([0-9a-f]{6})$/i))) {
    const h = m[1]
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }
  }
  if ((m = s.match(/^rgba\((\d+), (\d+), (\d+), ([\d.]+)\)$/))) return { r: +m[1], g: +m[2], b: +m[3], a: +m[4] }
  throw new Error(`無法解析顏色：${s}`)
}
// color/background/skeleton-bold → colorBackgroundSkeletonBold
function camelName(name) {
  return name.split('/').map((seg, i) => {
    const parts = seg.split('-')
    const merged = parts.map((p, j) => (i === 0 && j === 0 ? p : p[0].toUpperCase() + p.slice(1))).join('')
    return merged
  }).join('')
}

// iOS：每色一個 .colorset/Contents.json（universal + light + dark appearance，sRGB float）
const iosDir = `${HERE}dist/native/ios-colors`
rmSync(iosDir, { recursive: true, force: true })
mkdirSync(iosDir, { recursive: true })
const colorEntry = (c, appearance) => ({
  ...(appearance ? { appearances: [{ appearance: 'luminosity', value: appearance }] } : {}),
  color: {
    'color-space': 'srgb',
    components: {
      alpha: c.a.toFixed(3),
      blue: (c.b / 255).toFixed(3),
      green: (c.g / 255).toFixed(3),
      red: (c.r / 255).toFixed(3),
    },
  },
  idiom: 'universal',
})
for (const t of colors) {
  const light = parseColor(t.light), dark = parseColor(t.dark)
  const dir = `${iosDir}/${camelName(t.name)}.colorset`
  mkdirSync(dir, { recursive: true })
  writeFileSync(`${dir}/Contents.json`, JSON.stringify({
    colors: [colorEntry(light, null), colorEntry(light, 'light'), colorEntry(dark, 'dark')],
    info: { author: 'iv-design-system tokens pipeline', version: 1 },
  }, null, 2) + '\n')
}

// Android：values/colors.xml（light）+ values-night/colors.xml（dark），ARGB hex
const argb = (c) => {
  const hex = (n) => Math.round(n).toString(16).padStart(2, '0')
  return `#${hex(c.a * 255)}${hex(c.r)}${hex(c.g)}${hex(c.b)}`
}
function androidXml(mode) {
  const rows = colors.map((t) => `    <color name="${camelName(t.name)}">${argb(parseColor(t[mode]))}</color>`)
  return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${rows.join('\n')}\n</resources>\n`
}
mkdirSync(`${HERE}dist/native/android/values`, { recursive: true })
mkdirSync(`${HERE}dist/native/android/values-night`, { recursive: true })
writeFileSync(`${HERE}dist/native/android/values/colors.xml`, androidXml('light'))
writeFileSync(`${HERE}dist/native/android/values-night/colors.xml`, androidXml('dark'))

console.log(`✅ tokens.json：colors ${colors.length}、sizes ${sizes.length}（母版全收）`)
console.log(`✅ dist/tokens.css 已產出（web 全收錄顏色；排除 ${excluded} 個大間距）`)
console.log(`✅ dist/native/：iOS colorsets ×${colors.length}、Android values(+night)/colors.xml`)
