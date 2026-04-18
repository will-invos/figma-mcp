import { useEffect, useState } from 'react'
import {
  Button, IconButton, Spinner,
  TextField, TextArea, Select, Checkbox, Radio, Switch, Slider, SearchField,
  DatePicker, MonthPicker,
  Tag, TagBar, Badge, Avatar,
  Alert, Tooltip, SnackBar, ProgressBar, CircularProgress, ProgressGroup,
  Dialog, BottomSheet, SheetHeader, CardItem, CardBanner,
  NavigationBar, TabBar, Divider,
  ListItem, ListHeader, ListFooter,
  useToast,
} from '@/components/ui'
import './Components.css'

// Inline icons used throughout
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 17s-7-4.35-7-9a5 5 0 0 1 9.21-2.66A5 5 0 0 1 17 8c0 4.65-7 9-7 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
)
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12l9-8 9 8M5 11v9h14v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
const ReceiptIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 3v18l3-2 3 2 3-2 3 2V3l-3 2-3-2-3 2-3-2zM9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7.25v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
)
const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>
)
const SearchIconBig = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75"/><path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
)
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v12M12 4l-4 4M12 4l4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="cs-section">
      <h2 className="cs-section__title">{title}</h2>
      <div className="cs-section__body">{children}</div>
    </section>
  )
}

const TOC_ITEMS: { id: string; label: string }[] = [
  { id: 'sec-navbar',      label: 'NavigationBar' },
  { id: 'sec-divider',     label: 'Divider' },
  { id: 'sec-buttons',     label: 'Buttons' },
  { id: 'sec-text-inputs', label: 'Forms — text inputs' },
  { id: 'sec-choice',      label: 'Forms — choice controls' },
  { id: 'sec-pickers',     label: 'Pickers' },
  { id: 'sec-tags',        label: 'Tags & Badges' },
  { id: 'sec-avatar',      label: 'Avatar' },
  { id: 'sec-alert',       label: 'Feedback — Alert' },
  { id: 'sec-progress',    label: 'Spinner & Progress' },
  { id: 'sec-toast',       label: 'Toast & Tooltip' },
  { id: 'sec-overlay',     label: 'Overlays' },
  { id: 'sec-cards',       label: 'Cards' },
  { id: 'sec-lists',       label: 'Lists' },
  { id: 'sec-tabbar',      label: 'TabBar' },
]

function Toc({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <nav className="cs-toc" aria-label="目錄">
      <h2 className="cs-toc__title">目錄</h2>
      <ul className="cs-toc__list">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={['cs-toc__link', item.id === activeId && 'cs-toc__link--active'].filter(Boolean).join(' ')}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Demo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="cs-demo">
      <div className="cs-demo__label">{label}</div>
      <div className="cs-demo__body">{children}</div>
    </div>
  )
}

function ToastDemo() {
  const { show, dismiss } = useToast()
  return (
    <div className="cs-row">
      <Button size="small" variant="outline" colorType="neutral" onClick={() => show({ message: '已儲存' })}>
        Rich (text)
      </Button>
      <Button
        size="small"
        variant="outline"
        colorType="neutral"
        onClick={() => show({ message: '操作完成', action: { label: '確定', onClick: () => {} } })}
      >
        Rich + button
      </Button>
      <Button
        size="small"
        variant="outline"
        colorType="neutral"
        onClick={() => {
          const id = show({ type: 'loading' })
          setTimeout(() => dismiss(id), 2500)
        }}
      >
        Loading
      </Button>
    </div>
  )
}

export default function Components() {
  // Form state
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [select, setSelect] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [radio, setRadio] = useState('a')
  const [switchOn, setSwitchOn] = useState(true)
  const [slider, setSlider] = useState(40)
  const [date, setDate] = useState('2026-04-15')
  const [month, setMonth] = useState('2026-04')
  const [tagBar, setTagBar] = useState('all')
  const [tab, setTab] = useState('home')

  // Modal state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)

  // Active TOC section (driven by IntersectionObserver)
  const [activeId, setActiveId] = useState<string>(TOC_ITEMS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Sort by viewport position; first intersecting entry near the top is "active"
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleTocSelect = (id: string) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="cs-layout">
    <div className="cs-page">
      <header className="cs-header">
        <h1>iOS UI Kit 元件總覽</h1>
        <p>所有 React 元件對應 iOS UI Kit 2025 library。共 30 個元件。</p>
      </header>

      {/* === NavigationBar variations === */}
      <Section id="sec-navbar" title="NavigationBar">
        <Demo label="Regular — title only (no leading/trailing)">
          <NavigationBar title="首頁" />
        </Demo>

        <Demo label="Trailing: icon button">
          <NavigationBar
            title="發票紀錄"
            leading={<IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>}
            trailing={<IconButton variant="ghost" colorType="neutral" size="medium" aria-label="更多"><MoreIcon /></IconButton>}
          />
        </Demo>

        <Demo label="Leading: back icon (1 slot)">
          <NavigationBar
            title="設定領獎帳戶"
            leading={<IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>}
          />
        </Demo>

        <Demo label="Leading: text button only (e.g. modal cancel)">
          <NavigationBar
            title="編輯個人資料"
            leading={<Button variant="text" size="large">取消</Button>}
            trailing={<Button variant="text" size="large">完成</Button>}
          />
        </Demo>

        <Demo label="Leading: avatar slot">
          <NavigationBar
            title="會員中心"
            leading={<Avatar name="Will Huang" size="small" />}
            trailing={<Avatar name="Will Huang" size="small" />}
          />
        </Demo>

        <Demo label="Trailing: multiple icons">
          <NavigationBar
            title="收藏"
            leading={
              <>
                <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>
                <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="新增"><PlusIcon /></IconButton>
              </>
            } 
            trailing={
              <>
                <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="搜尋"><SearchIconBig /></IconButton>
                <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="分享"><ShareIcon /></IconButton>
              </>
            }
          />
        </Demo>

        <Demo label="Home + Large — title only">
          <NavigationBar title="首頁" titleSize="large" type="home" />
        </Demo>

        <Demo label="Home + Large — with trailing icon">
          <NavigationBar
            title="我的發票"
            titleSize="large"
            type="home"
            trailing={<IconButton variant="ghost" colorType="neutral" size="medium" aria-label="新增"><PlusIcon /></IconButton>}
          />
        </Demo>

        <Demo label="Default + Large — leading back + large title">
          <NavigationBar
            title="設定"
            titleSize="large"
            leading={<IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>}
          />
        </Demo>
      </Section>

      <Section id="sec-divider" title="Divider">
        <Demo label="Default">
          <Divider />
        </Demo>
      </Section>

      {/* === Buttons === */}
      <Section id="sec-buttons" title="Buttons">
        {/* === Button — Filled (all colorTypes) === */}
        <Demo label="Filled — all colorTypes (medium)">
          <div className="cs-row">
            <Button variant="filled" colorType="primary">Primary</Button>
            <Button variant="filled" colorType="neutral">Neutral</Button>
            <Button variant="filled" colorType="danger">Danger</Button>
            <Button variant="filled" colorType="prize">Prize</Button>
            <Button variant="filled" colorType="donation">Donation</Button>
            <Button variant="filled" colorType="white">White</Button>
          </div>
        </Demo>

        {/* === Button — sizes for each variant === */}
        <Demo label="Filled — sizes (Primary)">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="filled" colorType="primary" size="large">Large</Button>
            <Button variant="filled" colorType="primary" size="medium">Medium</Button>
            <Button variant="filled" colorType="primary" size="small">Small</Button>
          </div>
        </Demo>

        <Demo label="Outline — sizes">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="outline" size="large">Large</Button>
            <Button variant="outline" size="medium">Medium</Button>
            <Button variant="outline" size="small">Small</Button>
          </div>
        </Demo>

        <Demo label="Ghost — Primary, sizes">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="ghost" colorType="primary" size="large">Large</Button>
            <Button variant="ghost" colorType="primary" size="medium">Medium</Button>
            <Button variant="ghost" colorType="primary" size="small">Small</Button>
          </div>
        </Demo>

        <Demo label="Text — colorTypes">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="text" colorType="primary">Primary</Button>
            <Button variant="text" colorType="secondary">Secondary</Button>
          </div>
        </Demo>

        <Demo label="Text — sizes (Primary)">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="text" colorType="primary" size="large">Large</Button>
            <Button variant="text" colorType="primary" size="medium">Medium</Button>
            <Button variant="text" colorType="primary" size="small">Small</Button>
          </div>
        </Demo>

        {/* === Inverse variants on dark surface === */}
        <Demo label="Inverse (on dark surface)">
          <div className="cs-row" style={{ background: 'var(--color-background-inverse-plain, #000)', padding: 12, borderRadius: 8, alignItems: 'center' }}>
            <Button variant="ghost" colorType="inverse">Ghost Inverse</Button>
            <Button variant="text" colorType="inverse">Text Inverse</Button>
            <Button variant="filled" colorType="white">Filled White</Button>
          </div>
        </Demo>

        {/* === Buttons with icons === */}
        <Demo label="With leading icon">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="filled" colorType="primary" leadingIcon={<PlusIcon />}>Filled</Button>
            <Button variant="outline" leadingIcon={<PlusIcon />}>Outline</Button>
            <Button variant="ghost" colorType="primary" leadingIcon={<PlusIcon />}>Ghost</Button>
          </div>
        </Demo>

        <Demo label="With trailing icon">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="filled" colorType="primary" trailingIcon={<PlusIcon />}>Filled</Button>
            <Button variant="text" colorType="primary" trailingIcon={<PlusIcon />}>Text</Button>
          </div>
        </Demo>

        <Demo label="With both icons">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="outline" leadingIcon={<PlusIcon />} trailingIcon={<PlusIcon />}>Outline</Button>
          </div>
        </Demo>

        {/* === States (loading / disabled) === */}
        <Demo label="States — loading">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="filled" colorType="primary" loading>Loading</Button>
            <Button variant="filled" colorType="neutral" loading>Loading</Button>
            <Button variant="outline" loading>Loading</Button>
            <Button variant="ghost" colorType="primary" loading>Loading</Button>
          </div>
        </Demo>

        <Demo label="States — disabled">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Button variant="filled" colorType="primary" disabled>Disabled</Button>
            <Button variant="filled" colorType="danger" disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled</Button>
            <Button variant="ghost" colorType="primary" disabled>Disabled</Button>
            <Button variant="text" colorType="primary" disabled>Disabled</Button>
          </div>
        </Demo>

        {/* === IconButton variations === */}
        <Demo label="IconButton — Filled, all colorTypes (medium)">
          <div className="cs-row">
            <IconButton variant="filled" colorType="primary" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="neutral" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="danger" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="prize" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="donation" aria-label="add"><PlusIcon /></IconButton>
          </div>
        </Demo>

        <Demo label="IconButton — sizes (Filled Primary)">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <IconButton variant="filled" colorType="primary" size="large" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="primary" size="medium" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="primary" size="small" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="primary" size="xsmall" aria-label="add"><PlusIcon /></IconButton>
          </div>
        </Demo>

        <Demo label="IconButton — Outline (single colorType, sizes)">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <IconButton variant="outline" size="large" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="outline" size="medium" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="outline" size="small" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="outline" size="xsmall" aria-label="add"><PlusIcon /></IconButton>
          </div>
        </Demo>

        <Demo label="IconButton — Ghost, all colorTypes">
          <div className="cs-row">
            <IconButton variant="ghost" colorType="primary" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="ghost" colorType="neutral" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="ghost" colorType="danger" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="ghost" colorType="prize" aria-label="add"><PlusIcon /></IconButton>
            <IconButton variant="ghost" colorType="donation" aria-label="add"><PlusIcon /></IconButton>
          </div>
        </Demo>

        <Demo label="IconButton — states">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <IconButton variant="filled" colorType="primary" loading aria-label="loading"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="primary" disabled aria-label="disabled"><PlusIcon /></IconButton>
            <IconButton variant="outline" loading aria-label="loading"><HeartIcon /></IconButton>
            <IconButton variant="ghost" colorType="primary" disabled aria-label="disabled"><PlusIcon /></IconButton>
          </div>
        </Demo>
      </Section>

      {/* === Forms — text inputs === */}
      <Section id="sec-text-inputs" title="Forms — text inputs">
        {/* TextField — variants */}
        <Demo label="TextField — default (no label above)">
          <TextField placeholder="請輸入文字" value={text} onChange={(e) => setText(e.target.value)} />
        </Demo>
        <Demo label="TextField — inner-label (floating label)">
          <TextField variant="inner-label" label="Email" placeholder="name@example.com" />
        </Demo>

        {/* TextField — with icons */}
        <Demo label="TextField — leading icon">
          <TextField placeholder="搜尋..." leadingIcon={<SearchIconBig />} />
        </Demo>
        <Demo label="TextField — trailing icon">
          <TextField placeholder="輸入後可清除" trailingIcon={<CloseIcon />} />
        </Demo>
        <Demo label="TextField — both leading & trailing icons">
          <TextField placeholder="..." leadingIcon={<SearchIconBig />} trailingIcon={<CloseIcon />} />
        </Demo>

        {/* TextField — help text */}
        <Demo label="TextField — with help text + info icon">
          <TextField placeholder="輸入手機號碼" helpText="格式:0912-345-678" helpIcon={<InfoIcon />} />
        </Demo>

        {/* TextField — status */}
        <Demo label="TextField — status: error">
          <TextField placeholder="name@example.com" status="error" helpText="請輸入有效的 Email" helpIcon={<InfoIcon />} />
        </Demo>
        <Demo label="TextField — status: disabled">
          <TextField placeholder="無法編輯" status="disabled" defaultValue="已凍結欄位" />
        </Demo>

        {/* TextArea */}
        <Demo label="TextArea — default">
          <TextArea placeholder="請輸入內容" />
        </Demo>
        <Demo label="TextArea — inner-label">
          <TextArea variant="inner-label" label="備註" placeholder="請輸入備註" />
        </Demo>
        <Demo label="TextArea — error">
          <TextArea placeholder="必填欄位" status="error" />
        </Demo>
        <Demo label="TextArea — disabled">
          <TextArea placeholder="無法編輯" disabled value="此欄位已鎖定" />
        </Demo>

        {/* SearchField */}
        <Demo label="SearchField">
          <SearchField value={search} onChange={setSearch} placeholder="搜尋發票" />
        </Demo>

        {/* Select */}
        <Demo label="Select — default">
          <Select
            placeholder="請選擇"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            options={[
              { label: 'Design', value: 'design' },
              { label: 'Engineering', value: 'engineering' },
              { label: 'Product', value: 'product' },
            ]}
          />
        </Demo>
        <Demo label="Select — inner-label">
          <Select
            variant="inner-label"
            label="部門"
            placeholder="請選擇"
            options={[
              { label: 'Design', value: 'design' },
              { label: 'Engineering', value: 'engineering' },
            ]}
          />
        </Demo>
        <Demo label="Select — status: error">
          <Select
            placeholder="請選擇"
            status="error"
            helpText="請選擇一個選項"
            helpIcon={<InfoIcon />}
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]}
          />
        </Demo>
        <Demo label="Select — status: disabled">
          <Select
            placeholder="無法選擇"
            status="disabled"
            options={[
              { label: 'Option', value: 'a' },
            ]}
          />
        </Demo>
      </Section>

      {/* === Choice controls === */}
      <Section id="sec-choice" title="Forms — choice controls">
        <Demo label="Checkbox">
          <div className="cs-stack">
            <Checkbox checked={checkbox} onChange={setCheckbox}>同意條款</Checkbox>
            <Checkbox checked={false} disabled>Disabled</Checkbox>
            <Checkbox checked={false} status="error">Error state</Checkbox>
          </div>
        </Demo>
        <Demo label="Radio">
          <div className="cs-row">
            <Radio name="r" checked={radio === 'a'} onChange={() => setRadio('a')}>選項 A</Radio>
            <Radio name="r" checked={radio === 'b'} onChange={() => setRadio('b')}>選項 B</Radio>
            <Radio name="r" disabled>Disabled</Radio>
          </div>
        </Demo>
        <Demo label="Switch">
          <div className="cs-row">
            <Switch checked={switchOn} onChange={setSwitchOn} />
            <Switch checked={false} disabled />
          </div>
        </Demo>
        <Demo label="Slider">
          <Slider value={slider} onChange={setSlider} />
        </Demo>
      </Section>

      {/* === Pickers === */}
      <Section id="sec-pickers" title="Pickers">
        <Demo label="DatePicker">
          <DatePicker value={date} onChange={setDate} />
        </Demo>
        <Demo label="MonthPicker">
          <MonthPicker value={month} onChange={setMonth} />
        </Demo>
      </Section>

      {/* === Tags & Badges === */}
      <Section id="sec-tags" title="Tags & Badges">
        {/* Light × all colorTypes */}
        <Demo label="Light — Medium (all colorTypes)">
          <div className="cs-row">
            <Tag variant="light" colorType="neutral">Neutral</Tag>
            <Tag variant="light" colorType="primary">Primary</Tag>
            <Tag variant="light" colorType="success">Success</Tag>
            <Tag variant="light" colorType="danger">Danger</Tag>
            <Tag variant="light" colorType="warning">Warning</Tag>
            <Tag variant="light" colorType="prize">Prize</Tag>
          </div>
        </Demo>
        <Demo label="Light — Small (all colorTypes)">
          <div className="cs-row">
            <Tag variant="light" colorType="neutral" size="small">Neutral</Tag>
            <Tag variant="light" colorType="primary" size="small">Primary</Tag>
            <Tag variant="light" colorType="success" size="small">Success</Tag>
            <Tag variant="light" colorType="danger" size="small">Danger</Tag>
            <Tag variant="light" colorType="warning" size="small">Warning</Tag>
            <Tag variant="light" colorType="prize" size="small">Prize</Tag>
          </div>
        </Demo>

        {/* Bold × all colorTypes (Figma defines no Bold + Warning) */}
        <Demo label="Bold — Medium (all colorTypes)">
          <div className="cs-row">
            <Tag variant="bold" colorType="neutral">Neutral</Tag>
            <Tag variant="bold" colorType="primary">Primary</Tag>
            <Tag variant="bold" colorType="success">Success</Tag>
            <Tag variant="bold" colorType="danger">Danger</Tag>
            <Tag variant="bold" colorType="prize">Prize</Tag>
          </div>
        </Demo>
        <Demo label="Bold — Small (all colorTypes)">
          <div className="cs-row">
            <Tag variant="bold" colorType="neutral" size="small">Neutral</Tag>
            <Tag variant="bold" colorType="primary" size="small">Primary</Tag>
            <Tag variant="bold" colorType="success" size="small">Success</Tag>
            <Tag variant="bold" colorType="danger" size="small">Danger</Tag>
            <Tag variant="bold" colorType="prize" size="small">Prize</Tag>
          </div>
        </Demo>

        {/* Icons */}
        <Demo label="With leading icon">
          <div className="cs-row">
            <Tag variant="light" colorType="primary" leadingIcon={<PlusIcon />}>Tag</Tag>
            <Tag variant="bold" colorType="primary" leadingIcon={<PlusIcon />}>Tag</Tag>
            <Tag variant="light" colorType="primary" size="small" leadingIcon={<PlusIcon />}>Tag</Tag>
          </div>
        </Demo>
        <Demo label="With trailing icon">
          <div className="cs-row">
            <Tag variant="light" colorType="primary" trailingIcon={<PlusIcon />}>Tag</Tag>
            <Tag variant="bold" colorType="primary" trailingIcon={<PlusIcon />}>Tag</Tag>
          </div>
        </Demo>
        <Demo label="TagBar">
          <TagBar
            activeKey={tagBar}
            onChange={setTagBar}
            items={[
              { key: 'all', label: '全部' },
              { key: 'unused', label: '未對獎' },
              { key: 'won', label: '中獎' },
              { key: 'cashed', label: '已兌領' },
            ]}
          />
        </Demo>
        <Demo label="Badge">
          <div className="cs-row">
            <Badge variant="dot" size="small" />
            <Badge variant="dot" size="medium" />
            <Badge variant="dot" size="large" />
            <Badge variant="number" count={3} size="small" />
            <Badge variant="number" count={42} size="medium" />
            <Badge variant="number" count={999} size="large" />
          </div>
        </Demo>
      </Section>

      {/* === Avatar === */}
      <Section id="sec-avatar" title="Avatar">
        <Demo label="Sizes (initials fallback)">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Avatar name="Will Huang" size="small" />
            <Avatar name="Will Huang" size="medium" />
            <Avatar name="Will Huang" size="large" />
            <Avatar name="Will Huang" size="xlarge" />
          </div>
        </Demo>
      </Section>

      {/* === Feedback === */}
      <Section id="sec-alert" title="Feedback — Alert">
        <div className="cs-stack">
          <Alert colorType="primary" icon={<InfoIcon />}>Primary alert with icon</Alert>
          <Alert colorType="neutral">Neutral alert</Alert>
          <Alert colorType="success" onClose={() => {}}>Success alert (closeable)</Alert>
          <Alert colorType="warning" onClose={() => {}}>Warning alert</Alert>
          <Alert colorType="danger" onClose={() => {}}>Danger alert</Alert>
          <Alert colorType="prize">Prize alert</Alert>
        </div>
      </Section>

      <Section id="sec-progress" title="Feedback — Spinner & Progress">
        <Demo label="Spinner">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <Spinner size="xsmall" />
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
          </div>
        </Demo>
        <Demo label="ProgressBar">
          <div className="cs-stack">
            <ProgressBar value={30} label="30%" />
            <ProgressBar value={70} colorType="success" />
            <ProgressBar indeterminate value={0} colorType="prize" />
          </div>
        </Demo>
        <Demo label="CircularProgress">
          <div className="cs-row" style={{ alignItems: 'center' }}>
            <CircularProgress value={25} size="small" />
            <CircularProgress value={50} size="medium" showLabel />
            <CircularProgress value={80} size="large" colorType="success" showLabel />
            <CircularProgress value={0} indeterminate />
          </div>
        </Demo>
        <Demo label="ProgressGroup — text on top">
          <ProgressGroup value={50} textPosition="top" leadingText="50%" trailingText="100/200" />
        </Demo>
        <Demo label="ProgressGroup — text aside">
          <ProgressGroup value={50} textPosition="aside" trailingText="50%" />
        </Demo>
      </Section>

      <Section id="sec-toast" title="Feedback — Toast, SnackBar & Tooltip">
        <Demo label="Toast">
          <ToastDemo />
        </Demo>
        <Demo label="SnackBar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SnackBar
              text="已成功儲存"
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.8"/><path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
            <SnackBar
              text="網路連線中斷"
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.8"/><path d="M10 6v5M10 13.5v.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              trailing="button"
              buttonText="重試"
            />
            <SnackBar text="正在同步資料" trailing="spinner" />
          </div>
        </Demo>
        <Demo label="Tooltip — 12 tail positions (hover each button)">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, max-content)',
              gap: '64px 48px',
              padding: '64px 48px',
            }}
          >
            {(['top', 'bottom', 'left', 'right'] as const).flatMap((placement) =>
              (['start', 'center', 'end'] as const).map((align) => (
                <Tooltip
                  key={`${placement}-${align}`}
                  content="Tooltip"
                  placement={placement}
                  align={align}
                >
                  <Button size="small" variant="outline" colorType="neutral">
                    {placement}/{align}
                  </Button>
                </Tooltip>
              ))
            )}
          </div>
        </Demo>
      </Section>

      {/* === Overlays === */}
      <Section id="sec-overlay" title="Overlays — Dialog / Sheet">
        <Demo label="Dialog">
          <Button size="small" variant="outline" colorType="neutral" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="確認動作"
            description="確定要執行此動作嗎？此動作無法復原。"
            actions={[
              { label: '取消', onClick: () => setDialogOpen(false), colorType: 'neutral' },
              { label: '確認', onClick: () => setDialogOpen(false), colorType: 'primary' },
            ]}
          />
        </Demo>
        <Demo label="BottomSheet (handle)">
          <Button size="small" variant="outline" colorType="neutral" onClick={() => setBottomSheetOpen(true)}>Open BottomSheet</Button>
          <BottomSheet
            open={bottomSheetOpen}
            onClose={() => setBottomSheetOpen(false)}
            title="選項"
            footer={<Button onClick={() => setBottomSheetOpen(false)}>確定</Button>}
          >
            <p style={{ padding: '16px 0' }}>BottomSheet 從底部滑出。</p>
          </BottomSheet>
        </Demo>
        <Demo label="BottomSheet (header)">
          <Button size="small" variant="outline" colorType="neutral" onClick={() => setSheetOpen(true)}>Open BottomSheet</Button>
          <BottomSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="設定"
            showHandle={false}
            footer={<Button onClick={() => setSheetOpen(false)}>完成</Button>}
          >
            <p style={{ padding: '16px 0' }}>顯示標題列與關閉按鈕。</p>
          </BottomSheet>
        </Demo>
        <Demo label="SheetHeader (standalone)">
          <SheetHeader
            title="頁面標題"
            trailing={<Button variant="text" size="small">完成</Button>}
          />
        </Demo>
      </Section>

      {/* === Cards === */}
      <Section id="sec-cards" title="Cards">
        <Demo label="CardItem (medium)">
          <div style={{ maxWidth: 393 }}>
            <CardItem
              title="兌獎期限提醒"
              thumbnailUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=160&fit=crop"
              descriptions={[
                { text: '您有 1 張發票即將過期' },
                { text: '截止日 2026/05/15' },
              ]}
              action={<Button size="small">查看</Button>}
              divider
            />
            <CardItem
              title="設定領獎帳戶"
              descriptions={[{ text: '綁定發票中獎匯款帳戶' }]}
              trailing={<span>›</span>}
              onClick={() => {}}
            />
          </div>
        </Demo>
        <Demo label="CardBanner (large)">
          <div style={{ maxWidth: 361 }}>
            <CardBanner
              title="限時好禮"
              imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=720&h=240&fit=crop"
              aspectRatio="3 / 1"
              descriptions={[
                { text: '登錄發票即抽好禮' },
                { text: '活動至 2026/06/30' },
              ]}
              action={<Button size="small">參加</Button>}
            />
          </div>
        </Demo>
      </Section>

      {/* === Lists === */}
      <Section id="sec-lists" title="Lists">
        <Demo label="ListHeader">
          <div style={{ maxWidth: 393 }}>
            <ListHeader title="區段標題" size="small" trailing="查看全部" />
            <ListHeader title="區段標題" size="medium" trailing="查看全部" />
            <ListHeader title="頁面標題" size="large" trailing="編輯" />
          </div>
        </Demo>
        <Demo label="ListItem — Default">
          <div style={{ maxWidth: 393, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
            <ListItem headline="None" trailing="none" />
            <ListItem headline="Drill-in" trailing="drill-in" onClick={() => {}} />
            <ListItem headline="Text" trailing="text" trailingText="詳情" />
            <ListItem headline="Text button" trailing="text-button" trailingText="編輯" />
            <ListItem headline="Switch" trailing="switch" trailingChecked={switchOn} onTrailingChange={setSwitchOn} />
            <ListItem headline="Checkbox" trailing="checkbox" trailingChecked={checkbox} onTrailingChange={setCheckbox} />
            <ListItem headline="Spinner" trailing="spinner" />
            <ListItem headline="Disabled" trailing="drill-in" disabled showDivider={false} />
          </div>
        </Demo>
        <Demo label="ListItem — Has description">
          <div style={{ maxWidth: 393, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
            <ListItem headline="None" type="has-description" description="描述文字" trailing="none" />
            <ListItem headline="Drill-in" type="has-description" description="描述文字" trailing="drill-in" onClick={() => {}} />
            <ListItem headline="Text" type="has-description" description="描述文字" trailing="text" trailingText="詳情" />
            <ListItem headline="Switch" type="has-description" description="描述文字" trailing="switch" trailingChecked={switchOn} onTrailingChange={setSwitchOn} />
            <ListItem headline="Disabled" type="has-description" description="描述文字" trailing="drill-in" disabled showDivider={false} />
          </div>
        </Demo>
        <Demo label="ListItem — Compact">
          <div style={{ maxWidth: 393, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
            <ListItem headline="None" type="compact" trailing="none" />
            <ListItem headline="Drill-in" type="compact" trailing="drill-in" onClick={() => {}} />
            <ListItem headline="Text" type="compact" trailing="text" trailingText="詳情" />
            <ListItem headline="Disabled" type="compact" trailing="drill-in" disabled showDivider={false} />
          </div>
        </Demo>
        <Demo label="ListFooter">
          <div style={{ maxWidth: 393 }}>
            <ListHeader title="帳戶設定" size="small" />
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
              <ListItem headline="銀行帳號" trailing="drill-in" onClick={() => {}} />
              <ListItem headline="手機載具" trailing="text" trailingText="已綁定" />
              <ListItem headline="通知設定" trailing="drill-in" onClick={() => {}} showDivider={false} />
            </div>
            <ListFooter text="綁定帳戶用於自動匯款中獎獎金，請確認帳號正確。" />
          </div>
        </Demo>
      </Section>

      {/* === Navigation === */}
      <Section id="sec-tabbar" title="Navigation — TabBar">
        <Demo label="TabBar">
          <TabBar
            activeKey={tab}
            onChange={setTab}
            items={[
              { key: 'home', label: '首頁', icon: <HomeIcon /> },
              { key: 'invoice', label: '發票', icon: <ReceiptIcon />, badge: 3 },
              { key: 'me', label: '我的', icon: <UserIcon /> },
            ]}
          />
        </Demo>
      </Section>

      <footer className="cs-footer">
        共 30 個元件 · 全部使用 design tokens · 對應 iOS UI Kit 2025 library
      </footer>
    </div>
      <Toc activeId={activeId} onSelect={handleTocSelect} />
    </div>
  )
}
