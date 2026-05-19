import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

type EstadoAsistencia = "presente" | "ausente" | "atrasado" | null;

interface AsistenciaItemProps {
  estudianteId: string;
  nombres: string;
  apellidos: string;
  estadoInicial?: EstadoAsistencia;
  justificativoInicial?: string;
  observacionesInicial?: string;
  onChange: (data: {
    estudianteId: string;
    estado: EstadoAsistencia;
    justificativo?: string;
    observaciones?: string;
  }) => void;
}

export function AsistenciaItem({
  estudianteId,
  nombres,
  apellidos,
  estadoInicial = null,
  justificativoInicial = "",
  observacionesInicial = "",
  onChange,
}: AsistenciaItemProps) {
  const [estado, setEstado] = useState<EstadoAsistencia>(estadoInicial);
  const [justificativo, setJustificativo] = useState(justificativoInicial);
  const [observaciones, setObservaciones] = useState(observacionesInicial);

  const handleEstadoChange = (nuevoEstado: EstadoAsistencia) => {
    setEstado(nuevoEstado);

    // Si cambia a algo diferente de atrasado, limpiar justificativo
    if (nuevoEstado !== "atrasado") {
      setJustificativo("");
    }

    onChange({
      estudianteId,
      estado: nuevoEstado,
      justificativo: nuevoEstado === "atrasado" ? justificativo : undefined,
      observaciones,
    });
  };

  const handleJustificativoChange = (value: string) => {
    setJustificativo(value);
    onChange({
      estudianteId,
      estado,
      justificativo: value,
      observaciones,
    });
  };

  const handleObservacionesChange = (value: string) => {
    setObservaciones(value);
    onChange({
      estudianteId,
      estado,
      justificativo: estado === "atrasado" ? justificativo : undefined,
      observaciones: value,
    });
  };

  return (
    <>
      <tr className="border-b border-border hover:bg-muted/30">
        {/* Nombre del estudiante */}
        <td className="py-3 px-4 w-1/4 min-w-[180px]">
          <p className="text-sm font-medium text-foreground whitespace-nowrap">
            {nombres} {apellidos}
          </p>
        </td>

        {/* Acciones */}
        <td className="py-3 px-4 w-5/12">
          <div className="flex gap-2 flex-nowrap">
            <Button
              variant={estado === "presente" ? "default" : "outline"}
              size="sm"
              onClick={() => handleEstadoChange("presente")}
              className={cn(
                "h-8 text-xs whitespace-nowrap",
                estado === "presente" && "bg-success hover:bg-success/90 text-success-foreground"
              )}
            >
              Presente
            </Button>
            <Button
              variant={estado === "ausente" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleEstadoChange("ausente")}
              className="h-8 text-xs whitespace-nowrap"
            >
              Ausente
            </Button>
            <Button
              variant={estado === "atrasado" ? "default" : "outline"}
              size="sm"
              onClick={() => handleEstadoChange("atrasado")}
              className={cn(
                "h-8 text-xs whitespace-nowrap",
                estado === "atrasado" && "bg-warning hover:bg-warning/90 text-warning-foreground"
              )}
            >
              Atrasado
            </Button>
          </div>
        </td>

        {/* Observaciones */}
        <td className="py-3 px-4 w-1/3">
          <Input
            placeholder="Observaciones..."
            value={observaciones}
            onChange={(e) => handleObservacionesChange(e.target.value)}
            className="h-8 text-xs w-full"
          />
        </td>
      </tr>

      {/* Fila de justificativo (solo visible si está atrasado) */}
      {estado === "atrasado" && (
        <tr className="border-b border-border bg-warning-bg">
          <td colSpan={3} className="py-3 px-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-warning whitespace-nowrap">
                Justificativo:
              </span>
              <Input
                placeholder="Ingrese el motivo del atraso (requerido)"
                value={justificativo}
                onChange={(e) => handleJustificativoChange(e.target.value)}
                className="h-8 text-xs flex-1 bg-card"
                required
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
