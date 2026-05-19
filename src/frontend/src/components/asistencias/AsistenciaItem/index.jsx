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
    <article className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate font-medium text-foreground">
            {asistencia.nombres_estudiante} {asistencia.apellidos_estudiante}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Estudiante {asistencia.id_estudiante}
          </p>
        </div>
        <Badge status={status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button
          className={status === 'presente' ? 'bg-success hover:bg-success/90' : ''}
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
          className={status === 'atrasado' ? 'bg-warning hover:bg-warning/90' : ''}
          variant={status === 'atrasado' ? 'primary' : 'secondary'}
          onClick={() => updateStatus('atrasado')}
        >
          Atrasado
        </Button>
      </div>

      {asistencia.atrasado ? (
        <div className="mt-4 rounded-md border border-warning/20 bg-warning-bg p-3">
          <Input
            label="Justificativo"
            placeholder="Ingrese el motivo del atraso"
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

      <label className="mt-4 block text-left text-sm font-medium text-foreground">
        Observaciones
        <textarea
          className="mt-2 min-h-20 w-full resize-y rounded-md border border-input-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Observaciones..."
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
