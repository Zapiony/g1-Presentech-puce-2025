import { CalendarDays, Clock, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../common'
import { formatHorario, formatTime, getProximaClase } from '../../../utils/claseUtils'
import { ImportarExcelButton } from '../../estudiantes/ImportarExcelButton'

export function ClaseCard({ clase, onImportSuccess }) {
  const proximaClase = getProximaClase(clase.horarios)

  return (
    <article className="rounded-lg border border-[#d9e2ef] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-[#172033]">
            {clase.materia}
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-[#667085]">
            <Users aria-hidden="true" className="h-4 w-4 shrink-0 text-[#2563eb]" />
            <span className="truncate">{clase.nombre_paralelo}</span>
          </p>
        </div>
        <span className="rounded-md bg-[#eff6ff] px-2.5 py-1 text-xs font-semibold text-[#1d4ed8]">
          Clase {clase.id_clase}
        </span>
      </div>

      <div className="mt-4 rounded-md border border-[#d9e2ef] bg-[#f8fafc] p-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#344054]">
          <CalendarDays aria-hidden="true" className="h-4 w-4 text-[#2563eb]" />
          Próxima clase
        </p>
        <p className="mt-1 text-sm text-[#667085]">
          {proximaClase ? formatHorario(proximaClase) : 'Horario no asignado'}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {clase.horarios.map((horario) => (
          <span
            className="inline-flex items-center gap-1 rounded-full border border-[#d9e2ef] px-2.5 py-1 text-xs font-medium text-[#475467]"
            key={horario.id_horario}
          >
            <Clock aria-hidden="true" className="h-3.5 w-3.5 text-[#2563eb]" />
            {horario.nombre_dia} {formatTime(horario.hora_inicio)}
          </span>
        ))}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Button asChild className="w-full">
          <Link to={`/clases/${clase.id_clase}/calendario`}>Ver calendario</Link>
        </Button>
        <ImportarExcelButton
          idParalelo={clase.id_paralelo}
          onImportSuccess={onImportSuccess}
        />
      </div>
    </article>
  )
}
