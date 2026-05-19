import { Badge, Button, Input } from '../../common'

function getStatus(asistencia) {
  if (asistencia.atrasado) return 'atrasado'
  return asistencia.asistio ? 'presente' : 'ausente'
}

export function AsistenciaItem({ asistencia, onChange }) {
  const status = getStatus(asistencia)

  const updateStatus = (nextStatus) => {
    onChange({
      ...asistencia,
      asistio: nextStatus !== 'ausente',
      atrasado: nextStatus === 'atrasado',
      justificativo: nextStatus === 'atrasado' ? asistencia.justificativo : null,
    })
  }

  return (
    <article className="rounded-lg border border-[#d9e2ef] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-[#172033]">
            {asistencia.apellidos_estudiante}, {asistencia.nombres_estudiante}
          </h3>
          <p className="mt-1 text-sm text-[#667085]">
            Estudiante {asistencia.id_estudiante}
          </p>
        </div>
        <Badge status={status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button
          variant={status === 'presente' ? 'primary' : 'secondary'}
          onClick={() => updateStatus('presente')}
        >
          Presente
        </Button>
        <Button
          variant={status === 'ausente' ? 'danger' : 'secondary'}
          onClick={() => updateStatus('ausente')}
        >
          Ausente
        </Button>
        <Button
          variant={status === 'atrasado' ? 'primary' : 'secondary'}
          onClick={() => updateStatus('atrasado')}
        >
          Atrasado
        </Button>
      </div>

      {asistencia.atrasado ? (
        <div className="mt-4">
          <Input
            label="Justificativo"
            value={asistencia.justificativo ?? ''}
            onChange={(value) =>
              onChange({
                ...asistencia,
                justificativo: value,
              })
            }
          />
        </div>
      ) : null}

      <label className="mt-4 block text-left text-sm font-medium text-[#344054]">
        Observaciones
        <textarea
          className="mt-2 min-h-20 w-full resize-y rounded-md border border-[#cbd5e1] px-3 py-2 text-sm text-[#172033] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]"
          value={asistencia.observaciones ?? ''}
          onChange={(event) =>
            onChange({
              ...asistencia,
              observaciones: event.target.value || null,
            })
          }
        />
      </label>
    </article>
  )
}
