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
        <section className="rounded-lg border border-[#d9e2ef] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#172033]">
                {isEditing ? 'Editar asistencia' : 'Nueva asistencia'}
              </h2>
              <p className="mt-1 text-sm text-[#667085]">
                {resumen.presentes} presentes, {resumen.ausentes} ausentes.
              </p>
            </div>
            <Button type="submit" isLoading={isSaving}>
              <Save aria-hidden="true" className="h-4 w-4" />
              {isEditing ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>

          <label className="mt-4 block text-left text-sm font-medium text-[#344054]">
            Observaciones generales de la sesión
            <textarea
              className="mt-2 min-h-24 w-full resize-y rounded-md border border-[#cbd5e1] px-3 py-2 text-sm text-[#172033] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]"
              value={observacionesSesion}
              onChange={(event) => setObservacionesSesion(event.target.value)}
            />
          </label>
        </section>

        <div className="grid gap-4">
          {asistencias.map((asistencia) => (
            <AsistenciaItem
              asistencia={asistencia}
              key={asistencia.id_estudiante}
              onChange={onChangeAsistencia}
            />
          ))}
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
