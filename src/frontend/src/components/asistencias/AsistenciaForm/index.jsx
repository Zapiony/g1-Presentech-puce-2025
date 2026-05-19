import { Save } from 'lucide-react'
import { Button, Modal } from '../../common'
import { AsistenciaItem } from '../AsistenciaItem'

export function AsistenciaForm({
  asistencias,
  isEditing,
  isSaving,
  onCancelConfirm,
  onChangeAsistencia,
  onConfirmSubmit,
  onSubmit,
  observacionesSesion,
  resumen,
  setObservacionesSesion,
  showConfirm,
}) {
  return (
    <>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <p className="mb-3 text-sm font-medium text-foreground">Resumen</p>
          <div className="flex flex-wrap gap-4">
            <SummaryItem colorClass="bg-success" label="Presentes" value={resumen.presentes} />
            <SummaryItem colorClass="bg-destructive" label="Ausentes" value={resumen.ausentes} />
            {resumen.atrasados > 0 ? (
              <SummaryItem colorClass="bg-warning" label="Atrasados" value={resumen.atrasados} />
            ) : null}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <label className="block text-left text-sm font-medium text-foreground">
            Observaciones de la sesión (opcional)
            <textarea
              className="mt-2 min-h-20 w-full resize-y rounded-md border border-input-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Comentarios generales sobre la clase"
              value={observacionesSesion}
              onChange={(event) => setObservacionesSesion(event.target.value)}
            />
          </label>
        </section>

        <div>
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Estudiantes ({asistencias.length})
          </h3>
          <div className="grid gap-4">
            {asistencias.map((asistencia) => (
              <AsistenciaItem
                asistencia={asistencia}
                key={asistencia.id_estudiante}
                onChange={onChangeAsistencia}
              />
            ))}
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-background p-4 md:relative md:bottom-auto md:border-t-0 md:p-0">
          <Button className="h-12 w-full" type="submit" isLoading={isSaving}>
            <Save aria-hidden="true" className="h-4 w-4" />
            {isEditing ? 'Actualizar asistencia' : 'Guardar asistencia'}
          </Button>
        </div>
      </form>

      <Modal
        confirmLabel={isEditing ? 'Actualizar' : 'Guardar'}
        isOpen={showConfirm}
        isSubmitting={isSaving}
        onClose={onCancelConfirm}
        onConfirm={onConfirmSubmit}
        title={isEditing ? 'Actualizar asistencia' : 'Guardar asistencia'}
      >
        Se registrarán {resumen.presentes} presentes y {resumen.ausentes} ausentes.
      </Modal>
    </>
  )
}

function SummaryItem({ colorClass, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${colorClass}`} />
      <span className="text-sm text-muted-foreground">
        {label}: <span className="font-medium text-foreground">{value}</span>
      </span>
    </div>
  )
}
