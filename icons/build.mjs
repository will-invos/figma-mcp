// Icon pipeline — SVG 源（src/assets/icons/）→ iOS Asset Catalog + Android vector drawable + 命名 manifest
// 用法：npm run icons:build（詳見 icons/README.md）
// 產出到 icons/dist/（gitignore，屬產物）；native 團隊 copy 過去。
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs'
import svg2vd from 'svg2vectordrawable'

const HERE = new URL('.', import.meta.url).pathname
const SRC = `${HERE}../src/assets/icons/`
const DIST = `${HERE}dist/`

// ---------- 掃描來源 ----------
const files = readdirSync(SRC).sort()
const svgs = files.filter((f) => f.endsWith('.svg'))
const anomalies = []
for (const f of files) {
  if (!f.endsWith('.svg')) anomalies.push({ file: f, issue: '非 SVG 格式（應在 Figma 重出為 SVG）' })
  if (/[A-Z]/.test(f)) anomalies.push({ file: f, issue: '檔名含大寫' })
  if (f.includes('volumn')) anomalies.push({ file: f, issue: 'typo：volumn → volume（Figma 圖層改名）' })
  if (f.includes('_') && !f.includes('twitter_x')) anomalies.push({ file: f, issue: '底線分隔（慣例為連字號；輸出已自動正規化）' })
}

// base 命名：去副檔名、底線轉連字號（bell_filled → bell-filled）
const baseName = (f) => f.replace(/\.svg$/, '').replaceAll('_', '-')
// Android 資源名：ic_ 前綴、連字號轉底線（arrow-down → ic_arrow_down）
const androidName = (base) => 'ic_' + base.replaceAll('-', '_')

// ---------- 產出 ----------
rmSync(DIST, { recursive: true, force: true })
const iosDir = `${DIST}ios/icons.xcassets`
const androidDir = `${DIST}android/drawable`
mkdirSync(iosDir, { recursive: true })
mkdirSync(androidDir, { recursive: true })
// Asset Catalog 根需要一個 Contents.json
writeFileSync(`${iosDir}/Contents.json`, JSON.stringify({ info: { author: 'invos-design-system', version: 1 } }, null, 2) + '\n')

const manifest = []
for (const f of svgs) {
  const base = baseName(f)
  const raw = readFileSync(`${SRC}${f}`, 'utf8')

  // iOS：imageset 內放正規化 SVG（fill=black→currentColor），template 模式 → 可 tint
  const iosSvg = raw.replaceAll('fill="black"', 'fill="currentColor"')
  const setDir = `${iosDir}/${base}.imageset`
  mkdirSync(setDir, { recursive: true })
  writeFileSync(`${setDir}/${base}.svg`, iosSvg)
  writeFileSync(`${setDir}/Contents.json`, JSON.stringify({
    images: [{ filename: `${base}.svg`, idiom: 'universal' }],
    info: { author: 'invos-design-system', version: 1 },
    properties: { 'preserves-vector-representation': true, 'template-rendering-intent': 'template' },
  }, null, 2) + '\n')

  // Android：vector drawable，fillColor 用 ?attr/colorControlNormal（可由 tint 覆蓋）
  const vdSrc = raw.replaceAll('fill="black"', 'fill="#000000"')
  let vd = await svg2vd(vdSrc, 2)
  vd = vd.replace(/android:fillColor="#FF000000"/g, 'android:fillColor="@android:color/black"')
  writeFileSync(`${androidDir}/${androidName(base)}.xml`, vd)

  manifest.push({ base, web: `icon-${base}`, ios: base, android: androidName(base) })
}

// ---------- manifest（命名對照 + 瑕疵）----------
writeFileSync(`${DIST}manifest.json`, JSON.stringify({
  $meta: { source: 'src/assets/icons/', count: svgs.length, note: '命名對照與瑕疵清單；產出檔在 icons/dist/（gitignore）' },
  anomalies,
  icons: manifest,
}, null, 2) + '\n')

console.log(`✅ icons/dist/：iOS imagesets ×${svgs.length}、Android drawable ×${svgs.length}`)
console.log(`✅ manifest.json：命名對照 ×${manifest.length}`)
if (anomalies.length) {
  console.log(`⚠️ 來源瑕疵 ${anomalies.length}（建議 Figma 端修）：`)
  anomalies.forEach((a) => console.log(`   ${a.file} — ${a.issue}`))
}