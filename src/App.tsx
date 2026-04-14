import { useEffect, useState } from 'react'
import BankAccountSettings from './pages/BankAccountSettings'
import AddPaperInvoice from './pages/AddPaperInvoice'

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

  if (route === '/bank') return <BankAccountSettings />
  return <AddPaperInvoice />
}
