/* ================================================================== *
 * Template：表單頁（新增 / 編輯 / 送出）
 * NavigationBar（關閉）→ FieldGroup 欄位（文字 / 下拉 / 單選 / 說明）
 * → 同意條款 Checkbox → 底部置底 CTA。
 * 元件選用見 CLAUDE.md 決策樹；日期欄位用原生 <input type="date">。
 * ================================================================== */
import { useState } from 'react'
import {
  NavigationBar,
  IconButton,
  Button,
  FieldGroup,
  TextField,
  Select,
  Radio,
  Checkbox,
  Divider,
  Sheet,
  ListItem,
} from '@/components/ui'

interface FormTemplateProps {
  onBack?: () => void
}

const BANK_OPTIONS = [
  { label: '004 臺灣銀行', value: '004' },
  { label: '700 中華郵政', value: '700' },
  { label: '013 國泰世華', value: '013' },
  { label: '822 中國信託', value: '822' },
]

/** 帳號格式：10–14 位數字，不含符號（與欄位 helpText 宣告一致） */
const ACCOUNT_PATTERN = /^\d{10,14}$/

export default function FormTemplate({ onBack }: FormTemplateProps) {
  const [holder, setHolder] = useState('')
  const [bank, setBank] = useState('')
  const [bankSheetOpen, setBankSheetOpen] = useState(false)
  const [accountType, setAccountType] = useState('general')
  const [account, setAccount] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [accountError, setAccountError] = useState(false)
  // Sheet 掛在頁面容器內（而非 document.body），範圍與主題都跟著這一頁走
  const [pageEl, setPageEl] = useState<HTMLDivElement | null>(null)

  // 按鈕啟用條件：所有欄位皆已填寫且已勾選條款（帳戶類型有預設值，永遠有值）。
  // 格式驗證不在此處把關，改由 handleSubmit 於按下儲存後執行。
  const canSubmit = holder.trim() !== '' && bank !== '' && account.trim() !== '' && agreed

  const handleSubmit = () => {
    if (!ACCOUNT_PATTERN.test(account)) {
      setAccountError(true)
      return
    }
    setAccountError(false)
    // 通過驗證 → 實際送出
  }

  return (
    <div className="tpl-page" ref={setPageEl}>
      <NavigationBar
        title="退款帳戶"
        titleSize="regular"
        leading={
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="medium"
            aria-label="關閉"
            icon={<i className="icon-cross" aria-hidden="true" />}
            onClick={onBack}
          />
        }
      />

      <div className="tpl-page__body tpl-page__body--plain">
        <div className="tpl-section">
          <FieldGroup headline="戶名">
            <TextField
              placeholder="請輸入戶名"
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
            />
          </FieldGroup>

          {/* 選項需要更大的點擊區 / 圖文排版時，用 onPickerOpen 把展開交給 Sheet 選單，
              取代原生下拉；欄位外觀與其他 Select 一致 */}
          <FieldGroup headline="銀行">
            <Select
              options={BANK_OPTIONS}
              placeholder="請選擇銀行"
              value={bank}
              onPickerOpen={() => setBankSheetOpen(true)}
            />
          </FieldGroup>

          <FieldGroup headline="帳戶類型">
            <div className="tpl-field-row">
              <Radio
                name="account-type"
                value="general"
                checked={accountType === 'general'}
                onChange={() => setAccountType('general')}
              >
                一般帳戶
              </Radio>
              <Radio
                name="account-type"
                value="digital"
                checked={accountType === 'digital'}
                onChange={() => setAccountType('digital')}
              >
                數位帳戶
              </Radio>
            </div>
          </FieldGroup>

          {/* 錯誤時 FieldGroup / TextField 同步轉 error，helpText 沿用同一句規則轉為錯誤色 */}
          <FieldGroup
            headline="帳號"
            helpText="請輸入 10–14 位數字，不含符號"
            status={accountError ? 'error' : 'default'}
          >
            <TextField
              placeholder="請輸入帳號"
              inputMode="numeric"
              status={accountError ? 'error' : 'default'}
              value={account}
              onChange={(e) => {
                setAccount(e.target.value)
                // 重新編輯即清除錯誤，下次按儲存再驗證
                if (accountError) setAccountError(false)
              }}
            />
          </FieldGroup>

          <div className="tpl-field-offset">
            <Checkbox
              checked={agreed}
              onChange={setAgreed}
              label={
                <>
                  我已閱讀並同意
                  <a className="tpl-link" href="#" onClick={(e) => e.preventDefault()}>
                    服務條款
                  </a>
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* 底部主要動作區：欄位未填齊或未勾選條款前為 disabled；格式驗證於按下後執行 */}
      <Divider />
      <div className="tpl-actions">
        <Button
          variant="filled"
          colorType="primary"
          size="large"
          text="儲存"
          disabled={!canSubmit}
          onClick={handleSubmit}
        />
      </div>

      <Sheet
        open={bankSheetOpen}
        onClose={() => setBankSheetOpen(false)}
        headline="選擇銀行"
        Handle={false}
        container={pageEl ?? undefined}
      >
        {BANK_OPTIONS.map((option, index) => (
          <ListItem
            key={option.value}
            headline={option.label}
            trailing={bank === option.value ? 'icon' : 'none'}
            trailingIcon={<i className="icon-check" aria-hidden="true" />}
            showDivider={index < BANK_OPTIONS.length - 1}
            onClick={() => {
              setBank(option.value)
              setBankSheetOpen(false)
            }}
          />
        ))}
      </Sheet>
    </div>
  )
}
