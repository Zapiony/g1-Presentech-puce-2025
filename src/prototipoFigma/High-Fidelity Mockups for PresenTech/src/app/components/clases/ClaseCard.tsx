import { Calendar, Upload, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Horario {
  dia: string;
  horaInicio: string;
  horaFin: string;
}

interface ClaseCardProps {
  id: string;
  materia: string;
  paralelo: string;
  proximaClase?: string;
  horarios: Horario[];
  onVerCalendario: (id: string) => void;
  onImportarExcel: (id: string) => void;
}

export function ClaseCard({
  id,
  materia,
  paralelo,
  proximaClase,
  horarios,
  onVerCalendario,
  onImportarExcel,
}: ClaseCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-medium text-foreground">{materia}</h3>
        <p className="text-sm text-muted-foreground mt-1">{paralelo}</p>
      </div>

      {/* Próxima clase */}
      {proximaClase && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-primary/5 rounded-md">
          <Clock className="h-4 w-4 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Próxima clase</p>
            <p className="text-sm font-medium text-foreground truncate">{proximaClase}</p>
          </div>
        </div>
      )}

      {/* Horarios */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Horarios semanales</p>
        <div className="flex flex-wrap gap-1.5">
          {horarios.map((horario, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {horario.dia} {horario.horaInicio}-{horario.horaFin}
            </Badge>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col gap-2">
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={() => onVerCalendario(id)}
        >
          <Calendar className="h-4 w-4 mr-1.5" />
          Ver calendario
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onImportarExcel(id)}
        >
          <Upload className="h-4 w-4 mr-1.5" />
          Importar Excel
        </Button>
      </div>
    </div>
  );
}
