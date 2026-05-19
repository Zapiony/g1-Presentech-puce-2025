import { dateFnsLocalizer, Calendar } from 'react-big-calendar'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { es } from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { createDateWithTime, getDateForSchoolDay, toIsoDate } from '../../../utils/dateUtils'

const locales = { es }

const localizer = dateFnsLocalizer({
  format,
  getDay,
  locales,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
})

const messages = {
  date: 'Fecha',
  day: 'Día',
  event: 'Clase',
  next: 'Siguiente',
  noEventsInRange: 'No hay clases en este rango.',
  previous: 'Anterior',
  today: 'Hoy',
  week: 'Semana',
}

export function CalendarioSemanal({ clase, onSelectHorario }) {
  const events = clase.horarios.map((horario) => {
    const date = getDateForSchoolDay(horario.orden_dia)

    return {
      end: createDateWithTime(date, horario.hora_fin),
      resource: {
        fecha: toIsoDate(date),
        horario,
      },
      start: createDateWithTime(date, horario.hora_inicio),
      title: clase.materia,
    }
  })

  return (
    <section className="rounded-lg border border-[#d9e2ef] bg-white p-3 shadow-sm">
      <div className="h-[620px] min-h-[520px]">
        <Calendar
          culture="es"
          defaultDate={new Date()}
          defaultView="week"
          endAccessor="end"
          events={events}
          localizer={localizer}
          messages={messages}
          onSelectEvent={(event) => onSelectHorario(event.resource)}
          startAccessor="start"
          step={30}
          toolbar
          views={['week']}
        />
      </div>
    </section>
  )
}
