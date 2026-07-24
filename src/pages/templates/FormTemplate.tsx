/* ================================================================== *
 * Template：表單頁（新增 / 編輯 / 送出）
 * NavigationBar（取消）+ FieldGroup 欄位 + 底部送出鈕。元件選用見 CLAUDE.md 決策樹。
 * 註：日期用原生 <input type="date">（已定案），不要用 <Select> 頂替。
 * ================================================================== */
import { useState } from 'react'
import { NavigationBar, Button, FieldGroup, TextField, TextArea } from '@/components/ui'

interface FormTemplateProps {
  onBack?: () => void
}

export default function FormTemplate({ onBack }: FormTemplateProps) {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  return (
    <div className="tpl-page">
      <NavigationBar
        title="新增載具"
        titleSize="regular"
        leading={
          <Button variant="text" colorType="secondary" size="medium" text="取消" onClick={onBack} />
        }
      />

      <div className="tpl-page__body">
        <div className="tpl-section">
          <FieldGroup headline="載具名稱" helpText="方便你辨識，例如「常用手機條碼」">
            <TextField
              placeholder="請輸入名稱"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup headline="手機條碼">
            <TextField placeholder="/ABC+123" />
          </FieldGroup>

          <FieldGroup headline="備註">
            {/* 注意：TextArea 的 onChange 直接回傳字串，不是 event */}
            <TextArea placeholder="選填" value={note} onChange={setNote} />
          </FieldGroup>
        </div>
      </div>

      {/* 底部主要動作區 */}
      <div className="tpl-actions">
        <Button variant="filled" colorType="primary" size="large" text="儲存" onClick={() => {}} />
      </div>
    </div>
  )
}
