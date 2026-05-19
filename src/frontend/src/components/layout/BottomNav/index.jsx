import { CalendarDays, ClipboardCheck, GraduationCap, LayoutGrid } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { icon: LayoutGrid, label: 'Pruebas', to: '/' },
  { icon: GraduationCap, label: 'Clases', to: '/clases' },
  { icon: CalendarDays, label: 'Calendario', to: '/calendario' },
  { icon: ClipboardCheck, label: 'Asistencia', to: '/asistencia' },
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d9e2ef] bg-white sm:hidden">
      <div className="grid grid-cols-4">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            className={({ isActive }) =>
              `flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium ${
                isActive ? 'text-[#2563eb]' : 'text-[#667085]'
              }`
            }
            end={to === '/'}
            key={to}
            to={to}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
