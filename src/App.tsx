import { useState } from 'react'
import {
  Spinner,
  Button,
  IconButton,
  TextField,
  Select,
  Checkbox,
  Radio,
  Switch,
  Tag,
  Badge,
  Alert,
  ListItem,
  Dialog,
  Sheet,
  useToast,
} from '@/components/ui'

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 2l2.39 4.84L18 7.64l-4 3.9.94 5.46L10 14.27l-4.94 2.73.94-5.46-4-3.9 5.61-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 17s-7-4.35-7-9a5 5 0 0 1 9.21-2.66A5 5 0 0 1 17 8c0 4.65-7 9-7 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

function ToastDemo() {
  const { show } = useToast()

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button
        size="small"
        variant="outline"
        colorType="neutral"
        onClick={() => show({ message: 'Item saved successfully' })}
      >
        Show Toast
      </Button>
      <Button
        size="small"
        variant="outline"
        colorType="neutral"
        onClick={() => show({ message: 'Loading data...', type: 'loading' })}
      >
        Loading Toast
      </Button>
    </div>
  )
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 32,
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--color-content-subtle)',
  marginBottom: 12,
  marginTop: 0,
  paddingBottom: 8,
  borderBottom: '1px solid var(--color-border-subtle)',
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  alignItems: 'center',
  marginBottom: 8,
}

const labelStyle: React.CSSProperties = {
  margin: '0 0 6px',
  fontSize: 12,
  color: 'var(--color-content-subtlest)',
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('a')
  const [switchOn, setSwitchOn] = useState(false)
  const [listSwitchChecked, setListSwitchChecked] = useState(false)
  const [listCheckboxChecked, setListCheckboxChecked] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1024,
        margin: '0 auto',
        padding: '24px 24px 64px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--color-content-bold)' }}>iOS UI Kit</h1>
        <button
          onClick={toggleDark}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 20,
            border: '1px solid var(--color-border-default)',
            background: 'var(--color-background-default)',
            color: 'var(--color-content-default)',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Buttons */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Buttons</h2>

        {/* Filled — all colorTypes × all sizes */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Filled — Large</p>
          <div style={rowStyle}>
            <Button size="large" variant="filled" colorType="primary">Primary</Button>
            <Button size="large" variant="filled" colorType="neutral">Neutral</Button>
            <Button size="large" variant="filled" colorType="danger">Danger</Button>
            <Button size="large" variant="filled" colorType="prize">Prize</Button>
            <Button size="large" variant="filled" colorType="white">White</Button>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Filled — Medium</p>
          <div style={rowStyle}>
            <Button size="medium" variant="filled" colorType="primary">Primary</Button>
            <Button size="medium" variant="filled" colorType="neutral">Neutral</Button>
            <Button size="medium" variant="filled" colorType="danger">Danger</Button>
            <Button size="medium" variant="filled" colorType="prize">Prize</Button>
            <Button size="medium" variant="filled" colorType="white">White</Button>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Filled — Small</p>
          <div style={rowStyle}>
            <Button size="small" variant="filled" colorType="primary">Primary</Button>
            <Button size="small" variant="filled" colorType="neutral">Neutral</Button>
            <Button size="small" variant="filled" colorType="danger">Danger</Button>
            <Button size="small" variant="filled" colorType="prize">Prize</Button>
            <Button size="small" variant="filled" colorType="white">White</Button>
          </div>
        </div>

        {/* Outline */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Outline</p>
          <div style={rowStyle}>
            <Button size="large" variant="outline">Large</Button>
            <Button size="medium" variant="outline">Medium</Button>
            <Button size="small" variant="outline">Small</Button>
          </div>
        </div>

        {/* Ghost */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Ghost</p>
          <div style={rowStyle}>
            <Button size="large" variant="ghost" colorType="primary">Primary</Button>
            <Button size="medium" variant="ghost" colorType="primary">Medium</Button>
            <Button size="small" variant="ghost" colorType="primary">Small</Button>
          </div>
        </div>

        {/* Text */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Text</p>
          <div style={rowStyle}>
            <Button size="large" variant="text" colorType="primary">Primary</Button>
            <Button size="large" variant="text" colorType="secondary">Secondary</Button>
          </div>
          <div style={{ ...rowStyle, marginTop: 6 }}>
            <Button size="medium" variant="text" colorType="primary">Medium</Button>
            <Button size="small" variant="text" colorType="primary">Small</Button>
          </div>
        </div>

        {/* States */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>States</p>
          <div style={rowStyle}>
            <Button size="medium" colorType="primary" loading>Loading</Button>
            <Button size="medium" colorType="primary" disabled>Disabled</Button>
            <Button size="medium" colorType="neutral" loading>Loading</Button>
            <Button size="medium" colorType="neutral" disabled>Disabled</Button>
          </div>
        </div>
      </section>

      {/* Icon Buttons */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Icon Buttons</h2>

        {/* Filled — all colorTypes × all sizes */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Filled — Large (52px)</p>
          <div style={rowStyle}>
            <IconButton variant="filled" colorType="primary" size="large" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="neutral" size="large" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="danger" size="large" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="prize" size="large" aria-label="Add"><PlusIcon /></IconButton>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Filled — Medium (40px)</p>
          <div style={rowStyle}>
            <IconButton variant="filled" colorType="primary" size="medium" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="neutral" size="medium" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="danger" size="medium" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="prize" size="medium" aria-label="Add"><PlusIcon /></IconButton>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Filled — Small (32px)</p>
          <div style={rowStyle}>
            <IconButton variant="filled" colorType="primary" size="small" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="neutral" size="small" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="danger" size="small" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="prize" size="small" aria-label="Add"><PlusIcon /></IconButton>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Filled — XSmall (24px)</p>
          <div style={rowStyle}>
            <IconButton variant="filled" colorType="primary" size="xsmall" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="neutral" size="xsmall" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="danger" size="xsmall" aria-label="Add"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="prize" size="xsmall" aria-label="Add"><PlusIcon /></IconButton>
          </div>
        </div>

        {/* Outline — all sizes */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Outline</p>
          <div style={rowStyle}>
            <IconButton variant="outline" colorType="primary" size="large" aria-label="Star"><StarIcon /></IconButton>
            <IconButton variant="outline" colorType="primary" size="medium" aria-label="Star"><StarIcon /></IconButton>
            <IconButton variant="outline" colorType="primary" size="small" aria-label="Star"><StarIcon /></IconButton>
            <IconButton variant="outline" colorType="primary" size="xsmall" aria-label="Star"><StarIcon /></IconButton>
          </div>
        </div>

        {/* Ghost — all colorTypes */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>Ghost</p>
          <div style={rowStyle}>
            <IconButton variant="ghost" colorType="primary" size="medium" aria-label="Heart"><HeartIcon /></IconButton>
            <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="Heart"><HeartIcon /></IconButton>
            <IconButton variant="ghost" colorType="danger" size="medium" aria-label="Heart"><HeartIcon /></IconButton>
            <IconButton variant="ghost" colorType="prize" size="medium" aria-label="Heart"><HeartIcon /></IconButton>
            <IconButton variant="ghost" colorType="donation" size="medium" aria-label="Heart"><HeartIcon /></IconButton>
          </div>
        </div>

        {/* States */}
        <div style={{ marginBottom: 12 }}>
          <p style={labelStyle}>States</p>
          <div style={rowStyle}>
            <IconButton variant="filled" colorType="primary" size="medium" loading aria-label="Loading"><PlusIcon /></IconButton>
            <IconButton variant="filled" colorType="primary" size="medium" disabled aria-label="Disabled"><PlusIcon /></IconButton>
            <IconButton variant="outline" colorType="primary" size="medium" loading aria-label="Loading"><StarIcon /></IconButton>
            <IconButton variant="ghost" colorType="primary" size="medium" disabled aria-label="Disabled"><HeartIcon /></IconButton>
          </div>
        </div>
      </section>

      {/* Form Controls */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Form Controls</h2>

        <div style={{ marginBottom: 16 }}>
          <TextField
            placeholder="Enter username"
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            variant="has-label"
            label="Email"
            placeholder="name@example.com"
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            variant="has-label"
            label="Email (error)"
            placeholder="name@example.com"
            status="error"
            helpText="Please enter a valid email address"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            placeholder="Disabled field"
            status="disabled"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <Select
            placeholder="Choose one..."
            value={selectValue}
            onChange={e => setSelectValue(e.target.value)}
            options={[
              { label: 'Design', value: 'design' },
              { label: 'Engineering', value: 'engineering' },
              { label: 'Product', value: 'product' },
            ]}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Select
            variant="has-label"
            label="Category"
            placeholder="Choose one..."
            value={selectValue}
            onChange={e => setSelectValue(e.target.value)}
            options={[
              { label: 'Design', value: 'design' },
              { label: 'Engineering', value: 'engineering' },
              { label: 'Product', value: 'product' },
            ]}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Select
            variant="has-label"
            label="Status (error)"
            placeholder="Select status..."
            status="error"
            helpText="Please select a status"
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Checkbox</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Checkbox checked={checkboxChecked} onChange={setCheckboxChecked}>
              Accept terms and conditions
            </Checkbox>
            <Checkbox checked={false} disabled>Disabled</Checkbox>
            <Checkbox checked={false} status="error">Error state</Checkbox>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Radio</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Radio name="demo" value="a" checked={radioValue === 'a'} onChange={() => setRadioValue('a')}>Option A</Radio>
            <Radio name="demo" value="b" checked={radioValue === 'b'} onChange={() => setRadioValue('b')}>Option B</Radio>
            <Radio name="demo" value="c" checked={false} disabled>Disabled</Radio>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Switch</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Switch checked={switchOn} onChange={setSwitchOn} />
            <Switch checked={true} disabled />
          </div>
        </div>
      </section>

      {/* Tags & Badges */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Tags &amp; Badges</h2>

        <div style={{ marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Tags — light</p>
          <div style={rowStyle}>
            <Tag colorType="neutral">Neutral</Tag>
            <Tag colorType="primary">Primary</Tag>
            <Tag colorType="success">Success</Tag>
            <Tag colorType="danger">Danger</Tag>
            <Tag colorType="warning">Warning</Tag>
            <Tag colorType="prize">Prize</Tag>
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Tags — bold</p>
          <div style={rowStyle}>
            <Tag variant="bold" colorType="neutral">Neutral</Tag>
            <Tag variant="bold" colorType="primary">Primary</Tag>
            <Tag variant="bold" colorType="success">Success</Tag>
            <Tag variant="bold" colorType="danger">Danger</Tag>
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Tags — sizes</p>
          <div style={rowStyle}>
            <Tag size="medium">Medium</Tag>
            <Tag size="small">Small</Tag>
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Badges</p>
          <div style={rowStyle}>
            <Badge variant="dot" size="small" />
            <Badge variant="dot" size="medium" />
            <Badge variant="dot" size="large" />
            <Badge variant="number" count={3} size="small" />
            <Badge variant="number" count={12} size="medium" />
            <Badge variant="number" count={100} size="large" />
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Alert</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Alert colorType="primary" icon={<InfoIcon />}>Primary alert with an info icon.</Alert>
          <Alert colorType="neutral">Neutral alert message here.</Alert>
          <Alert colorType="success" onClose={() => {}}>Success! Your changes were saved.</Alert>
          <Alert colorType="warning" onClose={() => {}}>Warning: Please review before continuing.</Alert>
          <Alert colorType="danger" onClose={() => {}}>Error occurred. Please try again.</Alert>
          <Alert colorType="prize">You have won a special prize!</Alert>
        </div>
      </section>

      {/* List Items */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>List Items</h2>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
          {/* Default type */}
          <ListItem
            headline="Default — None"
          />
          <ListItem
            headline="Default — Drill-in"
            trailing="drill-in"
            onClick={() => {}}
          />
          <ListItem
            headline="Default — Text"
            trailingText="Detail"
            trailing="text"
          />
          <ListItem
            headline="Default — Switch"
            trailing="switch"
            trailingChecked={listSwitchChecked}
            onTrailingChange={setListSwitchChecked}
          />
          <ListItem
            headline="Default — Checkbox"
            trailing="checkbox"
            trailingChecked={listCheckboxChecked}
            onTrailingChange={setListCheckboxChecked}
          />
          <ListItem
            headline="Default — Spinner"
            trailing="spinner"
          />
          {/* Has description type */}
          <ListItem
            headline="Description — Drill-in"
            type="has-description"
            description="Tap to go to the next screen"
            trailing="drill-in"
            onClick={() => {}}
          />
          <ListItem
            headline="Description — Text"
            type="has-description"
            description="Supporting info here"
            trailing="text"
            trailingText="Detail"
          />
          <ListItem
            headline="Description — Switch"
            type="has-description"
            description="Toggle this feature on or off"
            trailing="switch"
            trailingChecked={listSwitchChecked}
            onTrailingChange={setListSwitchChecked}
          />
          <ListItem
            headline="Description — Checkbox"
            type="has-description"
            description="Select this option"
            trailing="checkbox"
            trailingChecked={listCheckboxChecked}
            onTrailingChange={setListCheckboxChecked}
          />
          <ListItem
            headline="Description — Icon"
            type="has-description"
            description="Custom trailing icon"
            trailing="icon"
            trailingIcon={<StarIcon />}
          />
          {/* Compact type */}
          <ListItem
            headline="Compact — Drill-in"
            type="compact"
            trailing="drill-in"
            onClick={() => {}}
          />
          <ListItem
            headline="Compact — Text"
            type="compact"
            trailing="text"
            trailingText="Info"
          />
          {/* Disabled */}
          <ListItem
            headline="Disabled item"
            type="has-description"
            description="This item cannot be tapped"
            trailing="drill-in"
            disabled
          />
        </div>
      </section>

      {/* Dialog */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Dialog</h2>
        <div style={rowStyle}>
          <Button
            size="small"
            variant="outline"
            colorType="neutral"
            onClick={() => setDialogOpen(true)}
          >
            Open Dialog
          </Button>
        </div>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to proceed? This cannot be undone."
          actions={[
            { label: 'Cancel', onClick: () => setDialogOpen(false), colorType: 'neutral' },
            { label: 'Confirm', onClick: () => setDialogOpen(false), colorType: 'primary' },
          ]}
        />
      </section>

      {/* Sheet */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Sheet</h2>
        <div style={rowStyle}>
          <Button
            size="small"
            variant="outline"
            colorType="neutral"
            onClick={() => setSheetOpen(true)}
          >
            Open Sheet
          </Button>
        </div>
        <Sheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Sheet Title"
          footer={
            <Button colorType="primary" onClick={() => setSheetOpen(false)}>
              Done
            </Button>
          }
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{ margin: 0, color: 'var(--color-content-subtle)', fontSize: 14 }}>
              Sheet content goes here. Swipe down or tap outside to dismiss.
            </p>
          </div>
        </Sheet>
      </section>

      {/* Toast */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Toast</h2>
        <ToastDemo />
      </section>

      {/* Spinner */}
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Spinner</h2>
        <div style={{ marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Sizes</p>
          <div style={{ ...rowStyle, alignItems: 'center' }}>
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--color-content-subtlest)' }}>Colors</p>
          <div style={{ ...rowStyle, alignItems: 'center' }}>
            <Spinner size="medium" color="brand" />
            <Spinner size="medium" color="neutral" />
            <span style={{ background: 'var(--color-background-inverse-plain)', borderRadius: 8, padding: 8, display: 'flex' }}>
              <Spinner size="medium" color="white" />
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
