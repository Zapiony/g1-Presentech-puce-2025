import { useState } from "react";
import { useNavigate } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";
import { ClaseCard } from "../components/clases/ClaseCard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle, FileSpreadsheet, Loader2 } from "lucide-react";

// Mock data
const mockClases = [
  {
    id: "1",
    materia: "Matemáticas",
    paralelo: "5to A",
    proximaClase: "Lunes 20 May, 8:00 AM",
    horarios: [
      { dia: "Lun", horaInicio: "08:00", horaFin: "09:30" },
      { dia: "Mié", horaInicio: "10:00", horaFin: "11:30" },
      { dia: "Vie", horaInicio: "08:00", horaFin: "09:30" },
    ],
  },
  {
    id: "2",
    materia: "Lengua y Literatura",
    paralelo: "5to A",
    proximaClase: "Martes 21 May, 10:00 AM",
    horarios: [
      { dia: "Mar", horaInicio: "10:00", horaFin: "11:30" },
      { dia: "Jue", horaInicio: "14:00", horaFin: "15:30" },
    ],
  },
  {
    id: "3",
    materia: "Ciencias Naturales",
    paralelo: "6to B",
    proximaClase: "Miércoles 22 May, 2:00 PM",
    horarios: [
      { dia: "Mié", horaInicio: "14:00", horaFin: "15:30" },
      { dia: "Vie", horaInicio: "10:00", horaFin: "11:30" },
    ],
  },
];

export default function ClasesPage() {
  const navigate = useNavigate();
  const [clases] = useState(mockClases);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedClaseId, setSelectedClaseId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const [previewData, setPreviewData] = useState<{ nombres: string; apellidos: string }[]>([]);

  const handleVerCalendario = (id: string) => {
    navigate(`/clases/${id}/calendario`);
  };

  const handleImportarExcel = (id: string) => {
    setSelectedClaseId(id);
    setImportDialogOpen(true);
    setFile(null);
    setImportError("");
    setPreviewData([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImportError("");

      // Simular previsualización de datos
      setPreviewData([
        { nombres: "Juan Carlos", apellidos: "Pérez López" },
        { nombres: "María Elena", apellidos: "García Ruiz" },
        { nombres: "Pedro José", apellidos: "Martínez Silva" },
      ]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setImportError("Por favor seleccione un archivo");
      return;
    }

    setImporting(true);
    setImportError("");

    try {
      // Simular importación
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Cerrar diálogo
      setImportDialogOpen(false);
      setFile(null);
      setPreviewData([]);
    } catch (error) {
      setImportError("Error al importar el archivo. Verifique el formato.");
    } finally {
      setImporting(false);
    }
  };

  const selectedClase = clases.find((c) => c.id === selectedClaseId);

  return (
    <AppLayout title="Mis clases">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {clases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay clases asignadas</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clases.map((clase) => (
              <ClaseCard
                key={clase.id}
                {...clase}
                onVerCalendario={handleVerCalendario}
                onImportarExcel={handleImportarExcel}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de importación */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Importar estudiantes</DialogTitle>
            <DialogDescription>
              {selectedClase && (
                <>
                  {selectedClase.materia} - {selectedClase.paralelo}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="excel-file">Archivo Excel (.xlsx, .xls)</Label>
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                disabled={importing}
              />
              <p className="text-xs text-muted-foreground">
                El archivo debe contener columnas: nombres, apellidos
              </p>
            </div>

            {previewData.length > 0 && (
              <div className="border border-border rounded-md p-3 bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">Vista previa ({previewData.length} estudiantes)</p>
                </div>
                <div className="space-y-1">
                  {previewData.slice(0, 3).map((student, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {student.nombres} {student.apellidos}
                    </p>
                  ))}
                  {previewData.length > 3 && (
                    <p className="text-xs text-muted-foreground">...</p>
                  )}
                </div>
              </div>
            )}

            {importError && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-error-bg border border-error">
                <AlertCircle className="h-4 w-4 text-error mt-0.5 flex-shrink-0" />
                <p className="text-sm text-error">{importError}</p>
              </div>
            )}

            <div className="bg-warning-bg border border-warning/30 rounded-md p-3">
              <p className="text-xs text-warning">
                La importación reemplazará la matrícula activa del paralelo
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setImportDialogOpen(false)}
              disabled={importing}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || importing}
              className="w-full sm:w-auto"
            >
              {importing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {importing ? "Importando..." : "Importar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
