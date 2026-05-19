import { BottomNav } from '../BottomNav'
import { Header } from '../Header'
import { useAuth } from '../../../hooks/useAuth'

export function AppLayout({ children, title }) {
  const { logout, user } = useAuth()

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Header title={title} user={user} onLogout={logout} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-16 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  )
}
