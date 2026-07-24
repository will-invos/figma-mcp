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
  Select,
  Radio,
  Checkbox,
  Divider,
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
  const [accountType, setAccountType] = useState('general')
  const [account, setAccount] = useState('')
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="tpl-page">
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
            <Select
              placeholder="請選擇銀行"
              options={BANK_OPTIONS}
              value={bank}
              onChange={(e) => setBank(e.target.value)}
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
    </div>
  )
}
