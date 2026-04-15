import { useState } from 'react'
import { Button, TextField, IconButton } from '@/components/ui'
import { setAuthUser, isValidEmail, mockDelay, type AuthUser } from './auth'
import { EyeIcon, EyeOffIcon, GoogleIcon, AppleIcon, LineIcon } from './auth-icons'
import './auth-shared.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = isValidEmail(email) && password.length > 0 && !loading

  const navigate = (hash: string) => {
    window.location.hash = hash
  }

  const completeLogin = async (user: AuthUser) => {
    setLoading(true)
    setError(null)
    await mockDelay()
    setAuthUser(user)
    // Trigger hash change to re-render router
    navigate('#/welcome')
    setLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    completeLogin({ email: email.trim(), loginAt: Date.now(), provider: 'email' })
  }

  const handleProvider = (provider: 'google' | 'apple' | 'line') => {
    completeLogin({
      email: `demo.${provider}@example.com`,
      loginAt: Date.now(),
      provider,
    })
  }

  return (
    <div className="auth-page">
      <header className="auth-page__nav">
        <h1 className="auth-page__title">登入</h1>
      </header>

      <main className="auth-page__body">
        <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-email">Email</label>
            <TextField
              id="login-email"
              inputType="email"
              inputMode="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-password">密碼</label>
            <TextField
              id="login-password"
              inputType={showPassword ? 'text' : 'password'}
              placeholder="請輸入密碼"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              trailingIcon={
                <IconButton
                  variant="ghost"
                  colorType="primary"
                  size="xsmall"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
                  type="button"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </IconButton>
              }
            />
          </div>

          <div className="auth-page__forgot-row">
            <button
              className="auth-page__link"
              type="button"
              onClick={() => navigate('#/forgot-password')}
            >
              忘記密碼？
            </button>
          </div>

          {error && (
            <div style={{ color: 'var(--color-content-danger-default)', fontSize: 14 }}>
              {error}
            </div>
          )}

          <Button
            variant="filled"
            colorType="primary"
            size="large"
            disabled={!canSubmit}
            loading={loading}
            type="submit"
            className="auth-page__submit"
          >
            登入
          </Button>
        </form>

        <div className="auth-page__divider">或使用其他方式登入</div>

        <div className="auth-page__providers">
          <Button
            variant="outline"
            size="large"
            className="auth-page__submit"
            leadingIcon={<GoogleIcon />}
            onClick={() => handleProvider('google')}
            disabled={loading}
          >
            以 Google 繼續
          </Button>
          <Button
            variant="outline"
            size="large"
            className="auth-page__submit"
            leadingIcon={<AppleIcon />}
            onClick={() => handleProvider('apple')}
            disabled={loading}
          >
            以 Apple 繼續
          </Button>
          <Button
            variant="outline"
            size="large"
            className="auth-page__submit"
            leadingIcon={<LineIcon />}
            onClick={() => handleProvider('line')}
            disabled={loading}
          >
            以 LINE 繼續
          </Button>
        </div>

        <p className="auth-page__bottom-text">
          還沒有帳號？
          <button
            className="auth-page__link"
            type="button"
            onClick={() => navigate('#/register')}
          >
            立即註冊
          </button>
        </p>
      </main>
    </div>
  )
}
