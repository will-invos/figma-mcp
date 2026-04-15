import { useEffect, useState } from 'react'
import BankAccountSettings from './pages/BankAccountSettings'
import AddPaperInvoice from './pages/AddPaperInvoice'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Welcome from './pages/Welcome'
import { isAuthenticated } from './pages/auth'

const AUTH_ROUTES = new Set(['/login', '/register', '/forgot-password'])

function currentRoute(): string {
  return window.location.hash.replace(/^#/, '') || '/'
}

export default function App() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  // Auth guard: redirect based on auth state
  const authed = isAuthenticated()
  const isAuthRoute = AUTH_ROUTES.has(route)

  useEffect(() => {
    if (!authed && !isAuthRoute) {
      window.location.hash = '#/login'
    } else if (authed && isAuthRoute) {
      window.location.hash = '#/welcome'
    }
  }, [authed, isAuthRoute, route])

  // Auth pages
  if (route === '/login') return <Login />
  if (route === '/register') return <Register />
  if (route === '/forgot-password') return <ForgotPassword />

  // Protected routes — return null briefly while redirect effect runs
  if (!authed) return null

  if (route === '/bank') return <BankAccountSettings />
  if (route === '/invoice') return <AddPaperInvoice />
  // Default authenticated route
  return <Welcome />
}
