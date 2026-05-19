import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";
import { AsistenciaItem } from "../components/asistencias/AsistenciaItem";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { ChevronLeft, Save, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type EstadoAsistencia = "presente" | "ausente" | "atrasado" | null;

interface EstudianteAsistencia {
  estudianteId: string;
  estado: EstadoAsistencia;
  justificativo?: string;
  observaciones?: string;
}

// Mock data
const mockEstudiantes = [
  { id: "e1", nombres: "Juan Carlos", apellidos: "Pérez López" },
  { id: "e2", nombres: "María Elena", apellidos: "García Ruiz" },
  { id: "e3", nombres: "Pedro José", apellidos: "Martínez Silva" },
  { id: "e4", nombres: "Ana Sofía", apellidos: "Rodríguez Morales" },
  { id: "e5", nombres: "Luis Alberto", apellidos: "Hernández Castro" },
  { id: "e6", nombres: "Carmen Rosa", apellidos: "López Vargas" },
];

const mockHorario = {
  materia: "Matemáticas",
  paralelo: "5to A",
  dia: "Lunes",
  horaInicio: "08:00",
  horaFin: "09:30",
};

export default function AsistenciaPage() {
  const { idHorario, fecha } = useParams();
  const navigate = useNavigate();

  const [asistencias, setAsistencias] = useState<Record<string, EstudianteAsistencia>>({});
  const [observacionesGenerales, setObservacionesGenerales] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Simular carga de asistencia existente
  useEffect(() => {
    const cargarAsistencia = async () => {
      // En producción, aquí se haría una llamada al API
      // Si existe asistencia previa, setModoEdicion(true) y cargar datos
    };
    cargarAsistencia();
  }, [idHorario, fecha]);

  const handleAsistenciaChange = (data: EstudianteAsistencia) => {
    setAsistencias((prev) => ({
      ...prev,
      [data.estudianteId]: data,
    }));
  };

  const calcularResumen = () => {
    const presentes = Object.values(asistencias).filter(
      (a) => a.estado === "presente" || a.estado === "atrasado"
    ).length;
    const ausentes = Object.values(asistencias).filter((a) => a.estado === "ausente").length;
    const atrasados = Object.values(asistencias).filter((a) => a.estado === "atrasado").length;

    return { presentes, ausentes, atrasados };
  };

  const validarFormulario = (): { valido: boolean; errores: string[] } => {
    const errores: string[] = [];

    // Verificar que todos los estudiantes tengan un estado
    const estudiantesSinEstado = mockEstudiantes.filter(
      (est) => !asistencias[est.id]?.estado
    );
    if (estudiantesSinEstado.length > 0) {
      errores.push(`Faltan ${estudiantesSinEstado.length} estudiantes por marcar`);
    }

    // Verificar que los atrasados tengan justificativo
    const atrasadosSinJustificativo = Object.values(asistencias).filter(
      (a) => a.estado === "atrasado" && (!a.justificativo || a.justificativo.trim() === "")
    );
    if (atrasadosSinJustificativo.length > 0) {
      errores.push("Todos los estudiantes atrasados requieren justificativo");
    }

    return {
      valido: errores.length === 0,
      errores,
    };
  };

  const handleGuardar = () => {
    const validacion = validarFormulario();
    if (!validacion.valido) {
      alert(validacion.errores.join("\n"));
      return;
    }
    setConfirmDialogOpen(true);
  };

  const handleConfirmarGuardado = async () => {
    setSaving(true);

    try {
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirigir después de guardar
      navigate("/clases");
    } catch (error) {
      alert("Error al guardar la asistencia");
    } finally {
      setSaving(false);
      setConfirmDialogOpen(false);
    }
  };

  const resumen = calcularResumen();
  const fechaFormateada = fecha
    ? new Date(fecha).toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <AppLayout title="Asistencia" showBottomNav={false}>
      <div className="container max-w-3xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-3 -ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver
          </Button>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-medium text-foreground">{mockHorario.materia}</h2>
              <Badge variant="secondary">{mockHorario.paralelo}</Badge>
              {modoEdicion && <Badge variant="outline">Editando</Badge>}
            </div>
            <p className="text-sm text-muted-foreground capitalize">{fechaFormateada}</p>
            <p className="text-sm text-muted-foreground">
              {mockHorario.horaInicio} - {mockHorario.horaFin}
            </p>
          </div>
        </div>

        {/* Resumen */}
        <div className="mb-6 p-4 bg-card border border-border rounded-lg">
          <p className="text-sm font-medium text-foreground mb-3">Resumen</p>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-sm text-muted-foreground">
                Presentes: <span className="font-medium text-foreground">{resumen.presentes}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">
                Ausentes: <span className="font-medium text-foreground">{resumen.ausentes}</span>
              </span>
            </div>
            {resumen.atrasados > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-warning" />
                <span className="text-sm text-muted-foreground">
                  Atrasados: <span className="font-medium text-foreground">{resumen.atrasados}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tabla de estudiantes */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Estudiantes ({mockEstudiantes.length})
          </h3>
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium text-foreground whitespace-nowrap w-1/4">
                      Estudiante
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-foreground whitespace-nowrap w-5/12">
                      Acciones
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-foreground whitespace-nowrap w-1/3">
                      Observaciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockEstudiantes.map((estudiante) => (
                    <AsistenciaItem
                      key={estudiante.id}
                      estudianteId={estudiante.id}
                      nombres={estudiante.nombres}
                      apellidos={estudiante.apellidos}
                      estadoInicial={asistencias[estudiante.id]?.estado}
                      justificativoInicial={asistencias[estudiante.id]?.justificativo}
                      observacionesInicial={asistencias[estudiante.id]?.observaciones}
                      onChange={handleAsistenciaChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Deslice horizontalmente para ver toda la tabla en dispositivos móviles
          </p>
        </div>

        {/* Observaciones generales */}
        <div className="mb-6 space-y-2">
          <Label htmlFor="observaciones-generales">Observaciones de la sesión (opcional)</Label>
          <Textarea
            id="observaciones-generales"
            placeholder="Comentarios generales sobre la clase"
            value={observacionesGenerales}
            onChange={(e) => setObservacionesGenerales(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Botón guardar fijo */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:relative md:border-t-0 md:p-0">
          <Button onClick={handleGuardar} className="w-full h-12" size="lg">
            <Save className="h-4 w-4 mr-2" />
            {modoEdicion ? "Actualizar asistencia" : "Guardar asistencia"}
          </Button>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Confirmar {modoEdicion ? "actualización" : "guardado"}
            </DialogTitle>
            <DialogDescription>
              {mockHorario.materia} - {mockHorario.paralelo}
              <br />
              <span className="capitalize">{fechaFormateada}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Resumen de asistencia</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total estudiantes:</span>
                  <span className="font-medium">{mockEstudiantes.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Presentes:</span>
                  <span className="font-medium text-success">{resumen.presentes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ausentes:</span>
                  <span className="font-medium text-destructive">{resumen.ausentes}</span>
                </div>
                {resumen.atrasados > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Atrasados:</span>
                    <span className="font-medium text-warning">{resumen.atrasados}</span>
                  </div>
                )}
              </div>
            </div>

            {observacionesGenerales && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Observaciones generales</p>
                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                  {observacionesGenerales}
                </p>
              </div>
            )}

            <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
              <p className="text-xs text-foreground">
                ¿Confirma que desea {modoEdicion ? "actualizar" : "guardar"} esta asistencia?
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              disabled={saving}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmarGuardado}
              disabled={saving}
              className="w-full sm:w-auto"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {saving ? "Guardando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
