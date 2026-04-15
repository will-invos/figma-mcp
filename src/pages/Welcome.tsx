import { Button, ListItem } from '@/components/ui'
import { clearAuthUser, getAuthUser } from './auth'
import './auth-shared.css'

export default function Welcome() {
  const user = getAuthUser()

  const navigate = (hash: string) => {
    window.location.hash = hash
  }

  const handleLogout = () => {
    clearAuthUser()
    navigate('#/login')
  }

  const providerLabel =
    user?.provider === 'google' ? 'Google 帳號'
    : user?.provider === 'apple' ? 'Apple 帳號'
    : user?.provider === 'line' ? 'LINE 帳號'
    : 'Email 帳號'

  return (
    <div className="auth-page">
      <header className="auth-page__nav">
        <h1 className="auth-page__title">首頁</h1>
      </header>

      <main className="auth-page__body" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <section
          style={{
            padding: 20,
            borderRadius: 12,
            background: 'var(--color-background-brand-subtlest)',
          }}
        >
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-content-subtle)' }}>
            已登入（{providerLabel}）
          </p>
          <h2 style={{ margin: '4px 0 0', fontSize: 20, color: 'var(--color-content-bold)' }}>
            歡迎回來
          </h2>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 16,
              color: 'var(--color-content-default)',
              wordBreak: 'break-all',
            }}
          >
            {user?.email ?? ''}
          </p>
        </section>

        <section>
          <h3
            style={{
              margin: '0 0 8px',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-content-subtle)',
            }}
          >
            我的功能
          </h3>
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <ListItem
              headline="設定領獎帳戶"
              type="has-description"
              description="綁定發票中獎匯款帳戶"
              trailing="drill-in"
              onClick={() => navigate('#/bank')}
            />
            <ListItem
              headline="新增紙本電子發票"
              type="has-description"
              description="手動登錄紙本電子發票進行對獎"
              trailing="drill-in"
              onClick={() => navigate('#/invoice')}
            />
          </div>
        </section>

        <Button
          variant="outline"
          size="large"
          className="auth-page__submit"
          onClick={handleLogout}
        >
          登出
        </Button>
      </main>
    </div>
  )
}
