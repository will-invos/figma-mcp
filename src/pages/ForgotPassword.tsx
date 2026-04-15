import { useState } from 'react'
import { Button, TextField, Alert } from '@/components/ui'
import { isValidEmail, mockDelay } from './auth'
import { ArrowLeftIcon } from './auth-icons'
import './auth-shared.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const canSubmit = isValidEmail(email) && !loading && !sent

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
    setLoading(false)
    setSent(true)
    // Redirect back to login after showing success message
    setTimeout(() => navigate('#/login'), 3000)
  }

  return (
    <div className="auth-page">
      <header className="auth-page__nav">
        <button className="auth-page__back" type="button" aria-label="返回" onClick={handleBack}>
          <ArrowLeftIcon />
        </button>
        <h1 className="auth-page__title">忘記密碼</h1>
      </header>

      <main className="auth-page__body auth-page__body--with-footer">
        <p className="auth-page__description">
          輸入註冊時的 Email，我們會寄送重設密碼連結到你的信箱。
        </p>

        {sent && (
          <div style={{ marginBottom: 16 }}>
            <Alert colorType="success">
              重設連結已寄出，請前往信箱查看。
            </Alert>
          </div>
        )}

        <form className="auth-page__form" id="forgot-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="forgot-email">Email</label>
            <TextField
              id="forgot-email"
              inputType="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              status={sent ? 'disabled' : 'default'}
            />
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
          form="forgot-form"
          className="auth-page__submit"
        >
          {sent ? '已寄送' : '寄送重設連結'}
        </Button>
      </footer>
    </div>
  )
}
