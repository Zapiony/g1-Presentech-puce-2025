import { Calendar, ClipboardList, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "../../lib/utils";

const navItems = [
  { path: "/clases", icon: GraduationCap, label: "Clases" },
  { path: "/calendario", icon: Calendar, label: "Calendario" },
  { path: "/asistencia", icon: ClipboardList, label: "Asistencia" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
