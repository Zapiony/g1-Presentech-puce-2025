import { CheckCircle, ChevronLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Spinner } from '../../components/common'
import { AppLayout } from '../../components/layout'
import { getApiData, getApiErrorMessage } from '../../services/api'
import { obtenerRegistroAsistencia } from '../../services/asistenciasService'
import { obtenerHorarioClase } from '../../services/clasesService'
import { formatTime } from '../../utils/claseUtils'
import { getCurrentSchoolWeek, toIsoDate } from '../../utils/dateUtils'

const dayNameByOrder = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
}

export function CalendarioPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clase, setClase] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [registeredSlots, setRegisteredSlots] = useState(new Set())

  const weekDays = useMemo(
    () =>
      getCurrentSchoolWeek().map((date, index) => ({
        date,
        fecha: toIsoDate(date),
        mes: format(date, 'MMMM', { locale: es }),
        nombre: dayNameByOrder[index + 1],
        numero: format(date, 'd'),
      })),
    [],
  )

  const weekTitle = useMemo(() => {
    const first = weekDays[0].date
    const last = weekDays[weekDays.length - 1].date
    return `Semana del ${format(first, 'd', { locale: es })} al ${format(last, 'd MMMM', {
      locale: es,
    })}`
  }, [weekDays])

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

  useEffect(() => {
    if (!clase) return
    let isActive = true

    async function checkRegisteredSlots() {
      const checks = clase.horarios.map(async (horario) => {
        const weekDay = weekDays[horario.orden_dia - 1]
        if (!weekDay) return null
        try {
          await obtenerRegistroAsistencia(horario.id_horario, weekDay.fecha)
          return `${horario.id_horario}_${weekDay.fecha}`
        } catch {
          return null
        }
      })
      const results = await Promise.all(checks)
      if (isActive) setRegisteredSlots(new Set(results.filter(Boolean)))
    }

    checkRegisteredSlots()
    return () => { isActive = false }
  }, [clase, weekDays])

  const handleTomarAsistencia = (horarioId, fecha) => {
    navigate(`/asistencia/${horarioId}/${fecha}`)
  }

  const getHorariosDelDia = (ordenDia) =>
    clase?.horarios?.filter((horario) => horario.orden_dia === ordenDia) ?? []

  return (
    <AppLayout title="Calendario semanal">
      <section className="container mx-auto max-w-4xl px-4 py-4 md:py-6">
        <div className="mb-6">
          <Button
            className="mb-3 -ml-2 min-h-9 px-2"
            variant="ghost"
            onClick={() => navigate('/clases')}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            Volver a clases
          </Button>

          <h2 className="text-lg font-medium text-foreground">
            {clase ? clase.materia : 'Horario de clase'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {clase ? clase.nombre_paralelo : 'Consulta los bloques semanales.'}
          </p>
        </div>

        {error ? (
          <p className="mb-4 rounded-md border border-error bg-error-bg px-3 py-2 text-sm text-error">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-lg border border-border bg-card">
            <Spinner size="lg" />
          </div>
        ) : null}

        {!isLoading && clase ? (
          <>
            <section className="mb-6 rounded-lg border border-border bg-card p-4">
              <p className="mb-3 text-sm font-medium text-foreground">Horarios asignados</p>
              <div className="flex flex-wrap gap-2">
                {clase.horarios.map((horario) => (
                  <span
                    className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    key={horario.id_horario}
                  >
                    {horario.nombre_dia} {formatTime(horario.hora_inicio)}-
                    {formatTime(horario.hora_fin)}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="mb-4 text-sm font-medium text-foreground">{weekTitle}</h3>

              <div className="space-y-3 md:hidden">
                {weekDays.map((day, index) => {
                  const horariosDelDia = getHorariosDelDia(index + 1)

                  return (
                    <DaySchedule
                      day={day}
                      horarios={horariosDelDia}
                      key={day.fecha}
                      registeredSlots={registeredSlots}
                      onTomarAsistencia={handleTomarAsistencia}
                    />
                  )
                })}
              </div>

              <div className="hidden gap-3 md:grid md:grid-cols-5">
                {weekDays.map((day, index) => {
                  const horariosDelDia = getHorariosDelDia(index + 1)

                  return (
                    <DaySchedule
                      day={day}
                      desktop
                      horarios={horariosDelDia}
                      key={day.fecha}
                      registeredSlots={registeredSlots}
                      onTomarAsistencia={handleTomarAsistencia}
                    />
                  )
                })}
              </div>
            </section>
          </>
        ) : null}
      </section>
    </AppLayout>
  )
}

function DaySchedule({ day, desktop = false, horarios, onTomarAsistencia, registeredSlots }) {
  return (
    <article
      className={`overflow-hidden rounded-lg border border-border ${
        horarios.length ? 'bg-card' : 'bg-muted/30'
      } ${desktop ? 'min-h-52' : ''}`}
    >
      <div className="border-b border-border bg-muted/50 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{day.nombre}</p>
            <p className="text-xs capitalize text-muted-foreground">
              {day.mes} {day.numero}
            </p>
          </div>
          {!desktop && horarios.length ? (
            <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {horarios.length} {horarios.length === 1 ? 'clase' : 'clases'}
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-2 p-3">
        {horarios.length ? (
          horarios.map((horario) => {
            const isRegistered = registeredSlots.has(`${horario.id_horario}_${day.fecha}`)
            return (
              <Button
                className={`h-auto w-full justify-start ${desktop ? 'py-2 text-xs' : 'py-3'} ${
                  isRegistered
                    ? 'border-success/25 bg-success-bg text-success hover:bg-success-bg/80'
                    : ''
                }`}
                key={horario.id_horario}
                variant="secondary"
                onClick={() => onTomarAsistencia(horario.id_horario, day.fecha)}
              >
                <span className="flex w-full items-center justify-between gap-2 text-left">
                  <span>
                    <span className={`block text-sm font-medium ${isRegistered ? 'text-success' : ''}`}>
                      {formatTime(horario.hora_inicio)} - {formatTime(horario.hora_fin)}
                    </span>
                    {!desktop ? (
                      <span className={`mt-0.5 block text-xs ${isRegistered ? 'text-success/80' : 'text-muted-foreground'}`}>
                        {isRegistered ? 'Registrada' : 'Tomar asistencia'}
                      </span>
                    ) : null}
                  </span>
                  {isRegistered ? (
                    <CheckCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-success" />
                  ) : null}
                </span>
              </Button>
            )
          })
        ) : (
          <p className="py-2 text-xs text-muted-foreground">
            {desktop ? 'Sin clases' : 'Sin clases programadas'}
          </p>
        )}
      </div>
    </article>
  )
}
