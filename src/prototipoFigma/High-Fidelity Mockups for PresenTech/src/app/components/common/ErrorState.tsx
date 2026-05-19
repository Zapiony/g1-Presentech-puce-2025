import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Error de conexión",
  message = "No se pudo conectar con el servidor. Verifique su conexión a internet.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4 rounded-full bg-error-bg p-4">
        <AlertCircle className="h-8 w-8 text-error" />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Intentar nuevamente
        </Button>
      )}
    </div>
  );
}
