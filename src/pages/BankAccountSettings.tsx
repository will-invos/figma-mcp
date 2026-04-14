import { useState } from 'react'
import { Button, TextField, Select, Radio, Checkbox } from '@/components/ui'
import './BankAccountSettings.css'

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7.25v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const BANK_OPTIONS = [
  { label: '004 臺灣銀行', value: '004' },
  { label: '005 土地銀行', value: '005' },
  { label: '006 合作金庫', value: '006' },
  { label: '007 第一銀行', value: '007' },
  { label: '008 華南銀行', value: '008' },
  { label: '009 彰化銀行', value: '009' },
  { label: '011 上海商銀', value: '011' },
  { label: '012 台北富邦', value: '012' },
  { label: '013 國泰世華', value: '013' },
  { label: '700 中華郵政', value: '700' },
  { label: '812 台新銀行', value: '812' },
  { label: '822 中國信託', value: '822' },
]

type IdentityType = 'local' | 'foreign'

export default function BankAccountSettings() {
  const [name, setName] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [identity, setIdentity] = useState<IdentityType | ''>('')
  const [idNumber, setIdNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)

  const canSubmit =
    name.trim() !== '' &&
    bankCode !== '' &&
    accountNumber.trim() !== '' &&
    identity !== '' &&
    idNumber.trim() !== '' &&
    phone.trim() !== '' &&
    agreed

  const handleSave = () => {
    if (!canSubmit) return
    // eslint-disable-next-line no-console
    console.log('Save:', { name, bankCode, accountNumber, identity, idNumber, phone })
  }

  return (
    <div className="bank-settings">
      {/* Navigation Bar */}
      <header className="bank-settings__nav">
        <button className="bank-settings__back" type="button" aria-label="返回">
          <ArrowLeftIcon />
        </button>
        <h1 className="bank-settings__title">設定領獎帳戶</h1>
      </header>

      {/* Form */}
      <main className="bank-settings__body">
        <div className="bank-settings__form">
          {/* 姓名 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="name">姓名</label>
            <TextField
              id="name"
              placeholder="請輸入完整姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 金融機構代號 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="bank-code">金融機構代號</label>
            <Select
              id="bank-code"
              placeholder="請選擇"
              options={BANK_OPTIONS}
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
            />
          </div>

          {/* 金融帳戶 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="account">金融帳戶</label>
            <TextField
              id="account"
              placeholder="請輸入帳戶號碼"
              inputType="text"
              inputMode="numeric"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              helpText="請輸入存簿帳號，勿登錄手機號碼，以免匯款失敗"
              helpIcon={<InfoIcon />}
            />
          </div>

          {/* 身份別 */}
          <div className="field-group">
            <span className="field-group__label">身份別</span>
            <div className="field-group__radios">
              <Radio
                name="identity"
                value="local"
                checked={identity === 'local'}
                onChange={() => setIdentity('local')}
              >
                本國人
              </Radio>
              <Radio
                name="identity"
                value="foreign"
                checked={identity === 'foreign'}
                onChange={() => setIdentity('foreign')}
              >
                外籍人士
              </Radio>
            </div>
          </div>

          {/* 身份證字號 / 居留證號碼 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="id-number">身份證字號 / 居留證號碼</label>
            <TextField
              id="id-number"
              placeholder="請輸入證件號碼"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>

          {/* 聯絡電話 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="phone">聯絡電話</label>
            <TextField
              id="phone"
              placeholder="請輸入市內電話或手機號碼"
              inputType="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* 同意條款 */}
          <div className="bank-settings__agreement">
            <Checkbox checked={agreed} onChange={setAgreed}>
              我已閱讀
              <a
                className="bank-settings__link"
                href="#"
                onClick={(e) => e.stopPropagation()}
              >
                中獎獎金匯款服務須知
              </a>
            </Checkbox>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bank-settings__footer">
        <Button
          variant="filled"
          colorType="primary"
          size="large"
          disabled={!canSubmit}
          onClick={handleSave}
          className="bank-settings__submit"
        >
          儲存
        </Button>
      </footer>
    </div>
  )
}
