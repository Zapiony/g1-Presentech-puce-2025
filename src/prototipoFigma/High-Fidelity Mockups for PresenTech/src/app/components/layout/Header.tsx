import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  title: string;
  docenteName?: string;
  onLogout?: () => void;
}

export function Header({ title, docenteName, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-medium text-sm">PT</span>
            </div>
            <span className="font-medium text-primary-dark">PresenTech</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-medium text-foreground">{title}</h1>
        </div>

        {docenteName && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">{docenteName}</span>
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="h-8 w-8 p-0 sm:w-auto sm:px-3"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Salir</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
