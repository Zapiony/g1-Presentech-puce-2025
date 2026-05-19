import { ArrowLeft, CalendarDays } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Spinner } from '../../components/common'
import { CalendarioSemanal } from '../../components/calendario'
import { AppLayout } from '../../components/layout'
import { getApiData, getApiErrorMessage } from '../../services/api'
import { obtenerHorarioClase } from '../../services/clasesService'
import { formatHorario } from '../../utils/claseUtils'

export function CalendarioPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clase, setClase] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadHorario = useCallback(async () => {
    setError('')
    setIsLoading(true)

    try {
      const response = await obtenerHorarioClase(id)
      setClase(getApiData(response))
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    let isActive = true

    async function loadInitialHorario() {
      try {
        const response = await obtenerHorarioClase(id)

        if (isActive) {
          setClase(getApiData(response))
        }
      } catch (requestError) {
        if (isActive) {
          setError(getApiErrorMessage(requestError))
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadInitialHorario()

    return () => {
      isActive = false
    }
  }, [id])

  const handleSelectHorario = ({ fecha, horario }) => {
    navigate(`/asistencia/${horario.id_horario}/${fecha}`)
  }

  return (
    <AppLayout title="Calendario semanal">
      <section className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button asChild variant="secondary">
              <Link to="/clases">
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Volver a clases
              </Link>
            </Button>
            <h2 className="mt-4 text-xl font-semibold text-[#172033]">
              {clase ? clase.materia : 'Horario de clase'}
            </h2>
            <p className="mt-1 text-sm text-[#667085]">
              {clase ? clase.nombre_paralelo : 'Consulta los bloques semanales.'}
            </p>
          </div>
          <Button variant="secondary" onClick={loadHorario} isLoading={isLoading}>
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            Actualizar
          </Button>
        </div>

        {error ? (
          <p className="mb-4 rounded-md bg-[#fef2f2] px-3 py-2 text-sm text-[#b42318]">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-lg border border-[#d9e2ef] bg-white">
            <Spinner size="lg" />
          </div>
        ) : null}

        {!isLoading && clase ? (
          <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-lg border border-[#d9e2ef] bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-[#172033]">Horarios</h3>
              <div className="mt-3 grid gap-2">
                {clase.horarios.map((horario) => (
                  <div
                    className="rounded-md border border-[#d9e2ef] bg-[#f8fafc] px-3 py-2 text-sm text-[#475467]"
                    key={horario.id_horario}
                  >
                    {formatHorario(horario)}
                  </div>
                ))}
              </div>
            </aside>
            <CalendarioSemanal clase={clase} onSelectHorario={handleSelectHorario} />
          </div>
        ) : null}
      </section>
    </AppLayout>
  )
}
