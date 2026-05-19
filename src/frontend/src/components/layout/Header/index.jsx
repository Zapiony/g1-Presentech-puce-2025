import { LogOut } from 'lucide-react'
import { Button } from '../../common'

export function Header({ title, user, onLogout }) {
  const teacherName = user ? `${user.nombres} ${user.apellidos}` : 'Docente'

  return (
    <header className="sticky top-0 z-30 border-b border-[#d9e2ef] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2563eb]">
            PresenTech
          </p>
          <h1 className="truncate text-xl font-semibold text-[#172033]">{title}</h1>
          <p className="truncate text-sm text-[#667085]">{teacherName}</p>
        </div>

        <Button
          aria-label="Cerrar sesión"
          className="h-10 w-10 px-0 sm:w-auto sm:px-4"
          variant="secondary"
          onClick={onLogout}
        >
          <LogOut aria-hidden="true" className="h-4 w-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </Button>
      </div>
    </header>
  )
}
