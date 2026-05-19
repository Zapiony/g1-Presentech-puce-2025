import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AsistenciaForm } from '../../components/asistencias'
import { Button, Spinner } from '../../components/common'
import { AppLayout } from '../../components/layout'
import { useAsistencia } from '../../hooks/useAsistencia'
import { getApiErrorMessage } from '../../services/api'
import {
  actualizarAsistencia,
  registrarAsistencia,
} from '../../services/asistenciasService'

function calculateResumen(asistencias) {
  return {
    ausentes: asistencias.filter((item) => !item.asistio && !item.atrasado).length,
    presentes: asistencias.filter((item) => item.asistio || item.atrasado).length,
  }
}

export function AsistenciaPage() {
  const { fecha, idHorario } = useParams()
  const {
    asistencias,
    clase,
    error,
    isEditing,
    isLoading,
    observacionesSesion,
    registroExistente,
    setAsistencias,
    setObservacionesSesion,
  } = useAsistencia(idHorario, fecha)
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const resumen = useMemo(() => calculateResumen(asistencias), [asistencias])

  const handleChangeAsistencia = (updated) => {
    setAsistencias((current) =>
      current.map((item) =>
        item.id_estudiante === updated.id_estudiante ? updated : item,
      ),
    )
  }

  const validateForm = () => {
    const missingJustification = asistencias.find(
      (item) => item.atrasado && !item.justificativo?.trim(),
    )

    if (missingJustification) {
      setSaveError('Todo estudiante marcado como atrasado debe tener justificativo.')
      return false
    }

    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSaveError('')

    if (validateForm()) {
      setShowConfirm(true)
    }
  }

  const saveAttendance = async () => {
    setIsSaving(true)
    setSaveError('')

    const payload = {
      asistencias,
      fecha,
      id_horario: Number(idHorario),
      observaciones_sesion: observacionesSesion || null,
    }

    try {
      if (isEditing) {
        await actualizarAsistencia(registroExistente.id_registro, payload)
      } else {
        await registrarAsistencia(payload)
      }

      setShowConfirm(false)
    } catch (requestError) {
      setSaveError(getApiErrorMessage(requestError))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AppLayout title="Toma de asistencia">
      <section className="mx-auto max-w-4xl px-4 py-5">
        <div className="mb-4">
          <Button asChild variant="secondary">
            <Link to="/clases">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Volver a clases
            </Link>
          </Button>
          <h2 className="mt-4 text-xl font-semibold text-[#172033]">
            {clase ? clase.materia : 'Asistencia'}
          </h2>
          <p className="mt-1 text-sm text-[#667085]">
            {clase ? `${clase.nombre_paralelo} · ${fecha}` : fecha}
          </p>
        </div>

        {error || saveError ? (
          <p className="mb-4 rounded-md bg-[#fef2f2] px-3 py-2 text-sm text-[#b42318]">
            {error || saveError}
          </p>
        ) : null}

        {isEditing ? (
          <p className="mb-4 rounded-md border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-sm font-medium text-[#1d4ed8]">
            Ya existe un registro para esta fecha. Estás trabajando en modo edición.
          </p>
        ) : null}

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-lg border border-[#d9e2ef] bg-white">
            <Spinner size="lg" />
          </div>
        ) : null}

        {!isLoading && asistencias.length ? (
          <AsistenciaForm
            asistencias={asistencias}
            isEditing={isEditing}
            isSaving={isSaving}
            observacionesSesion={observacionesSesion}
            resumen={resumen}
            setObservacionesSesion={setObservacionesSesion}
            showConfirm={showConfirm}
            onCancelConfirm={() => setShowConfirm(false)}
            onChangeAsistencia={handleChangeAsistencia}
            onConfirmSubmit={saveAttendance}
            onSubmit={handleSubmit}
          />
        ) : null}

        {!isLoading && !asistencias.length && !error ? (
          <div className="rounded-lg border border-[#d9e2ef] bg-white p-5 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-[#172033]">
              No hay estudiantes activos
            </h2>
            <p className="mt-2 text-sm text-[#667085]">
              Importa estudiantes en el paralelo para poder tomar asistencia.
            </p>
          </div>
        ) : null}
      </section>
    </AppLayout>
  )
}
