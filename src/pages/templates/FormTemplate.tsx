/* ================================================================== *
 * Template：表單頁（新增 / 編輯 / 送出）
 * NavigationBar（關閉）+ FieldGroup 欄位（文字 / 下拉 / 單選 / 說明）
 * + 同意條款 Checkbox + 底部置底 CTA。元件選用見 CLAUDE.md 決策樹。
 * 註：日期用原生 <input type="date">（已定案），不要用 <Select> 頂替。
 * ================================================================== */
import { useState } from 'react'
import {
  NavigationBar,
  IconButton,
  Button,
  FieldGroup,
  TextField,
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

export default function FormTemplate({ onBack }: FormTemplateProps) {
  const [holder, setHolder] = useState('')
  const [bank, setBank] = useState('')
  const [bankSheetOpen, setBankSheetOpen] = useState(false)
  const [accountType, setAccountType] = useState('general')
  const [account, setAccount] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [pageEl, setPageEl] = useState<HTMLDivElement | null>(null)

  const selectedBank = BANK_OPTIONS.find((option) => option.value === bank)

  return (
    <div className="tpl-page" ref={setPageEl}>
      <NavigationBar
        title="退款帳戶"
        titleSize="regular"
        leading={
          <IconButton
            variant="ghost"
            colorType="neutral"
            aria-label="關閉"
            icon={<i className="icon-cross" />}
            onClick={onBack}
          />
        }
      />

      <div className="tpl-page__body">
        <div className="tpl-section">
          <FieldGroup headline="戶名">
            <TextField
              placeholder="請輸入戶名"
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup headline="銀行">
            <div className={`ui-select ui-select--default${!bank ? ' ui-select--placeholder' : ''}`}>
              <div
                className="ui-select__input-wrapper"
                role="button"
                tabIndex={0}
                onClick={() => setBankSheetOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setBankSheetOpen(true)
                  }
                }}
              >
                <div className="ui-select__content">
                  <span className="text-body-large ui-select__value">
                    {selectedBank?.label ?? '請選擇銀行'}
                  </span>
                </div>
                <span className="ui-select__chevron" aria-hidden="true">
                  <i className="icon-chevron-down" />
                </span>
              </div>
            </div>
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

          <FieldGroup headline="帳號" helpText="請輸入 10–14 位數字，不含符號">
            <TextField
              placeholder="請輸入帳號"
              inputMode="numeric"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
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

      {/* 底部主要動作區：同意條款前為 disabled */}
      <Divider />
      <div className="tpl-actions">
        <Button
          variant="filled"
          colorType="primary"
          size="large"
          text="儲存"
          disabled={!agreed}
          onClick={() => {}}
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
