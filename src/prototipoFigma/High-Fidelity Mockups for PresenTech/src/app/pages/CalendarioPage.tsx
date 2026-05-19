import { useNavigate, useParams } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { cn } from "../lib/utils";

// Mock data
const mockClase = {
  id: "1",
  materia: "Matemáticas",
  paralelo: "5to A",
  horarios: [
    { id: "h1", dia: "Lunes", horaInicio: "08:00", horaFin: "09:30" },
    { id: "h2", dia: "Miércoles", horaInicio: "10:00", horaFin: "11:30" },
    { id: "h3", dia: "Viernes", horaInicio: "08:00", horaFin: "09:30" },
  ],
};

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

// Semana actual (19-23 Mayo 2026)
const semanaActual = [
  { fecha: "2026-05-19", dia: "Lunes", numero: 19 },
  { fecha: "2026-05-20", dia: "Martes", numero: 20 },
  { fecha: "2026-05-21", dia: "Miércoles", numero: 21 },
  { fecha: "2026-05-22", dia: "Jueves", numero: 22 },
  { fecha: "2026-05-23", dia: "Viernes", numero: 23 },
];

export default function CalendarioPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleTomarAsistencia = (horarioId: string, fecha: string) => {
    navigate(`/asistencia/${horarioId}/${fecha}`);
  };

  return (
    <AppLayout title="Calendario semanal">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/clases")}
            className="mb-3 -ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a clases
          </Button>

          <div>
            <h2 className="text-lg font-medium text-foreground">{mockClase.materia}</h2>
            <p className="text-sm text-muted-foreground">{mockClase.paralelo}</p>
          </div>
        </div>

        {/* Horarios de la clase */}
        <div className="mb-6 p-4 bg-card border border-border rounded-lg">
          <p className="text-sm font-medium text-foreground mb-3">Horarios asignados</p>
          <div className="flex flex-wrap gap-2">
            {mockClase.horarios.map((horario) => (
              <Badge key={horario.id} variant="secondary">
                {horario.dia} {horario.horaInicio}-{horario.horaFin}
              </Badge>
            ))}
          </div>
        </div>

        {/* Calendario semanal */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">Semana del 19 al 23 de Mayo</h3>
          </div>

          {/* Vista mobile: lista vertical */}
          <div className="space-y-3 md:hidden">
            {semanaActual.map((diaInfo) => {
              const horariosDelDia = mockClase.horarios.filter(
                (h) => h.dia === diaInfo.dia
              );

              return (
                <div
                  key={diaInfo.fecha}
                  className={cn(
                    "border border-border rounded-lg overflow-hidden",
                    horariosDelDia.length > 0 ? "bg-card" : "bg-muted/30"
                  )}
                >
                  <div className="p-3 border-b border-border bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{diaInfo.dia}</p>
                        <p className="text-xs text-muted-foreground">Mayo {diaInfo.numero}</p>
                      </div>
                      {horariosDelDia.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {horariosDelDia.length} {horariosDelDia.length === 1 ? "clase" : "clases"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {horariosDelDia.length > 0 ? (
                    <div className="p-3 space-y-2">
                      {horariosDelDia.map((horario) => (
                        <Button
                          key={horario.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleTomarAsistencia(horario.id, diaInfo.fecha)}
                          className="w-full justify-start h-auto py-3"
                        >
                          <div className="text-left">
                            <p className="text-sm font-medium">
                              {horario.horaInicio} - {horario.horaFin}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Tomar asistencia
                            </p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">Sin clases programadas</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vista desktop: grid semanal */}
          <div className="hidden md:grid md:grid-cols-5 gap-3">
            {semanaActual.map((diaInfo) => {
              const horariosDelDia = mockClase.horarios.filter(
                (h) => h.dia === diaInfo.dia
              );

              return (
                <div
                  key={diaInfo.fecha}
                  className={cn(
                    "border border-border rounded-lg overflow-hidden min-h-[200px]",
                    horariosDelDia.length > 0 ? "bg-card" : "bg-muted/30"
                  )}
                >
                  <div className="p-3 border-b border-border bg-muted/50">
                    <p className="text-sm font-medium text-foreground">{diaInfo.dia}</p>
                    <p className="text-xs text-muted-foreground">Mayo {diaInfo.numero}</p>
                  </div>

                  <div className="p-2 space-y-2">
                    {horariosDelDia.length > 0 ? (
                      horariosDelDia.map((horario) => (
                        <Button
                          key={horario.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleTomarAsistencia(horario.id, diaInfo.fecha)}
                          className="w-full text-xs h-auto py-2"
                        >
                          <div className="text-left w-full">
                            <p className="font-medium">
                              {horario.horaInicio}-{horario.horaFin}
                            </p>
                          </div>
                        </Button>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        Sin clases
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
