import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  showBottomNav?: boolean;
}

export function AppLayout({ children, title, showBottomNav = true }: AppLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth state
    localStorage.removeItem("auth_token");
    localStorage.removeItem("docente_name");
    navigate("/login");
  };

  const docenteName = localStorage.getItem("docente_name") || undefined;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title={title} docenteName={docenteName} onLogout={handleLogout} />
      <main className={cn("flex-1 overflow-auto", showBottomNav && "pb-16 md:pb-0")}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
