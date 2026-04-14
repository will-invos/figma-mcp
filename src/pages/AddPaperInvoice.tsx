import { useMemo, useState } from 'react'
import { Button, TextField, Radio } from '@/components/ui'
import './AddPaperInvoice.css'

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

const INVOICE_NUMBER_RE = /^[A-Z]{2}-?\d{8}$/

/** Format "AB12345678" or "ab-12345678" → "AB-12345678"; otherwise return input untouched. */
function normalizeInvoiceNumber(raw: string): string {
  const cleaned = raw.replace(/[\s-]/g, '').toUpperCase()
  if (/^[A-Z]{2}\d{8}$/.test(cleaned)) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`
  }
  return raw
}

/** Taiwan bi-monthly invoice period. "2026-03-15" → "2026 年 03-04 月". */
function derivePeriod(isoDate: string): string {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) return ''
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const start = month % 2 === 1 ? month : month - 1
  const end = start + 1
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${year} 年 ${pad(start)}-${pad(end)} 月`
}

function todayIso(): string {
  const d = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function AddPaperInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [issueDate, setIssueDate] = useState(todayIso())
  const [amount, setAmount] = useState('')
  const [randomCode, setRandomCode] = useState('')
  const [sellerName, setSellerName] = useState('')
  const [sellerTaxId, setSellerTaxId] = useState('')
  const [taxType, setTaxType] = useState<'normal' | 'special'>('normal')
  const [note, setNote] = useState('')

  const period = useMemo(() => derivePeriod(issueDate), [issueDate])

  const canSubmit =
    INVOICE_NUMBER_RE.test(invoiceNumber.toUpperCase()) &&
    issueDate !== '' &&
    amount.trim() !== '' &&
    /^\d{4}$/.test(randomCode) &&
    taxType !== undefined

  const handleInvoiceNumberBlur = () => {
    setInvoiceNumber((v) => normalizeInvoiceNumber(v))
  }

  const handleDigitChange =
    (setter: (v: string) => void, maxLen?: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let next = e.target.value.replace(/\D/g, '')
      if (maxLen) next = next.slice(0, maxLen)
      setter(next)
    }

  const handleBack = () => {
    if (window.history.length > 1) window.history.back()
    else window.location.hash = '#/'
  }

  const handleSave = () => {
    if (!canSubmit) return
    const payload = {
      invoiceNumber: normalizeInvoiceNumber(invoiceNumber),
      issueDate,
      period,
      amount: Number(amount),
      randomCode,
      sellerName: sellerName.trim() || undefined,
      sellerTaxId: sellerTaxId || undefined,
      taxType,
      note: note.trim() || undefined,
    }
    // eslint-disable-next-line no-console
    console.log('Save paper invoice:', payload)
  }

  return (
    <div className="add-invoice">
      {/* Navigation Bar */}
      <header className="add-invoice__nav">
        <button
          className="add-invoice__back"
          type="button"
          aria-label="返回"
          onClick={handleBack}
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="add-invoice__title">新增紙本電子發票</h1>
      </header>

      <main className="add-invoice__body">
        <div className="add-invoice__form">
          {/* 發票號碼 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="invoice-number">發票號碼</label>
            <TextField
              id="invoice-number"
              placeholder="AB-12345678"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value.toUpperCase())}
              onBlur={handleInvoiceNumberBlur}
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              maxLength={11}
              helpText="請輸入發票上方的 10 碼號碼（2 碼英文字母 + 8 碼數字）"
              helpIcon={<InfoIcon />}
            />
          </div>

          {/* 開立日期 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="issue-date">開立日期</label>
            <TextField
              id="issue-date"
              inputType="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
            {period && (
              <div className="add-invoice__period" aria-live="polite">
                對獎期別：{period}
              </div>
            )}
          </div>

          {/* 發票金額 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="amount">發票金額</label>
            <TextField
              id="amount"
              placeholder="請輸入金額"
              inputType="text"
              inputMode="numeric"
              value={amount}
              onChange={handleDigitChange(setAmount)}
              helpText="僅輸入數字，單位為新台幣元"
              helpIcon={<InfoIcon />}
            />
          </div>

          {/* 隨機碼 */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="random-code">隨機碼</label>
            <TextField
              id="random-code"
              placeholder="4 碼數字"
              inputType="text"
              inputMode="numeric"
              value={randomCode}
              onChange={handleDigitChange(setRandomCode, 4)}
              maxLength={4}
              helpText="發票右下角的 4 碼數字"
              helpIcon={<InfoIcon />}
            />
          </div>

          {/* 商家名稱（選填） */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="seller-name">
              商家名稱 <span className="field-group__optional">（選填）</span>
            </label>
            <TextField
              id="seller-name"
              placeholder="例：7-ELEVEN 大安店"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
          </div>

          {/* 統一編號（選填） */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="seller-tax-id">
              統一編號 <span className="field-group__optional">（選填）</span>
            </label>
            <TextField
              id="seller-tax-id"
              placeholder="8 碼數字"
              inputType="text"
              inputMode="numeric"
              value={sellerTaxId}
              onChange={handleDigitChange(setSellerTaxId, 8)}
              maxLength={8}
            />
          </div>

          {/* 發票類型 */}
          <div className="field-group">
            <span className="field-group__label">發票類型</span>
            <div className="field-group__radios">
              <Radio
                name="tax-type"
                value="normal"
                checked={taxType === 'normal'}
                onChange={() => setTaxType('normal')}
              >
                一般稅額
              </Radio>
              <Radio
                name="tax-type"
                value="special"
                checked={taxType === 'special'}
                onChange={() => setTaxType('special')}
              >
                特種稅額
              </Radio>
            </div>
          </div>

          {/* 備註（選填） */}
          <div className="field-group">
            <label className="field-group__label" htmlFor="note">
              備註 <span className="field-group__optional">（選填）</span>
            </label>
            <TextField
              id="note"
              placeholder="例：午餐 / 出差 / 家用"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="add-invoice__footer">
        <Button
          variant="filled"
          colorType="primary"
          size="large"
          disabled={!canSubmit}
          onClick={handleSave}
          className="add-invoice__submit"
        >
          儲存
        </Button>
      </footer>
    </div>
  )
}
