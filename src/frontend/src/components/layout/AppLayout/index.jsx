import { BottomNav } from '../BottomNav'
import { Header } from '../Header'
import { useAuth } from '../../../hooks/useAuth'

export function AppLayout({ children, title }) {
  const { logout, user } = useAuth()

  return (
    <main className="min-h-svh bg-[#f4f7fb] pb-20 text-[#172033] sm:pb-0">
      <Header title={title} user={user} onLogout={logout} />
      {children}
      <BottomNav />
    </main>
  )
}
