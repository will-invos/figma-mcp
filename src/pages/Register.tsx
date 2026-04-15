import { useState } from 'react'
import { Button, TextField, Checkbox, IconButton } from '@/components/ui'
import { setAuthUser, isValidEmail, isValidPassword, mockDelay } from './auth'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from './auth-icons'
import './auth-shared.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const passwordValid = isValidPassword(password)
  const confirmMatches = confirm.length > 0 && confirm === password

  const canSubmit =
    isValidEmail(email) &&
    passwordValid &&
    confirmMatches &&
    agreed &&
    !loading

  const navigate = (hash: string) => {
    window.location.hash = hash
  }

  const handleBack = () => {
    if (window.history.length > 1) window.history.back()
    else navigate('#/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    await mockDelay()
    setAuthUser({ email: email.trim(), loginAt: Date.now(), provider: 'email' })
    navigate('#/welcome')
    setLoading(false)
  }

  // Show password error only after user has typed something reasonable
  const showPasswordError = password.length > 0 && !passwordValid
  const showConfirmError = confirm.length > 0 && !confirmMatches

  return (
    <div className="auth-page">
      <header className="auth-page__nav">
        <button
          className="auth-page__back"
          type="button"
          aria-label="返回"
          onClick={handleBack}
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="auth-page__title">建立帳號</h1>
      </header>

      <main className="auth-page__body auth-page__body--with-footer">
        <form className="auth-page__form" id="register-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="register-email">Email</label>
            <TextField
              id="register-email"
              inputType="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="register-password">密碼</label>
            <TextField
              id="register-password"
              inputType={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="請設定密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              status={showPasswordError ? 'error' : 'default'}
              helpText={showPasswordError ? '密碼需至少 8 碼，並包含英文字母與數字' : '至少 8 碼，含英文字母與數字'}
              trailingIcon={
                <IconButton
                  variant="ghost"
                  colorType="primary"
                  size="xsmall"
                  aria-label={showPw ? '隱藏密碼' : '顯示密碼'}
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </IconButton>
              }
            />
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="register-confirm">確認密碼</label>
            <TextField
              id="register-confirm"
              inputType={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="再次輸入密碼"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              status={showConfirmError ? 'error' : 'default'}
              helpText={showConfirmError ? '兩次輸入的密碼不一致' : undefined}
              trailingIcon={
                <IconButton
                  variant="ghost"
                  colorType="primary"
                  size="xsmall"
                  aria-label={showConfirm ? '隱藏密碼' : '顯示密碼'}
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </IconButton>
              }
            />
          </div>

          <div style={{ paddingTop: 8 }}>
            <Checkbox checked={agreed} onChange={setAgreed}>
              我已閱讀並同意
              <a className="auth-page__link" href="#" onClick={(e) => e.stopPropagation()} style={{ padding: 0, marginLeft: 2 }}>
                服務條款
              </a>
              <span style={{ margin: '0 2px' }}>與</span>
              <a className="auth-page__link" href="#" onClick={(e) => e.stopPropagation()} style={{ padding: 0 }}>
                隱私政策
              </a>
            </Checkbox>
          </div>
        </form>
      </main>

      <footer className="auth-page__footer">
        <Button
          variant="filled"
          colorType="primary"
          size="large"
          disabled={!canSubmit}
          loading={loading}
          type="submit"
          form="register-form"
          className="auth-page__submit"
        >
          註冊
        </Button>
      </footer>
    </div>
  )
}
