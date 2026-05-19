import { useState } from 'react'
import { Badge, Button, Input, Modal } from '../components/common'
import { AppLayout } from '../components/layout'
import { getApiErrorMessage } from '../services/api'
import {
  actualizarAsistencia,
  obtenerRegistroAsistencia,
  registrarAsistencia,
} from '../services/asistenciasService'
import {
  obtenerEstudiantesClase,
  obtenerHorarioClase,
  obtenerMisClases,
} from '../services/clasesService'
import { importarEstudiantes } from '../services/estudiantesService'

const fechaActual = new Date().toISOString().slice(0, 10)

const asistenciaBase = {
  id_horario: 1,
  fecha: fechaActual,
  observaciones_sesion: 'Clase tomada con normalidad.',
  asistencias: [
    {
      id_asistencia: 0,
      id_estudiante: 1,
      nombres_estudiante: 'Ana',
      apellidos_estudiante: 'García',
      asistio: true,
      atrasado: false,
      justificativo: null,
      observaciones: null,
    },
    {
      id_asistencia: 0,
      id_estudiante: 2,
      nombres_estudiante: 'Luis',
      apellidos_estudiante: 'Torres',
      asistio: true,
      atrasado: true,
      justificativo: 'Llegó tarde por cita médica.',
      observaciones: 'Ingreso 10 minutos tarde.',
    },
    {
      id_asistencia: 0,
      id_estudiante: 3,
      nombres_estudiante: 'María',
      apellidos_estudiante: 'Rodríguez',
      asistio: false,
      atrasado: false,
      justificativo: null,
      observaciones: 'No asistió a clase.',
    },
  ],
}

const estudiantesImportacionBase = {
  estudiantes: [
    { nombres: 'Valentina', apellidos: 'Cevallos' },
    { nombres: 'Mateo', apellidos: 'Andrade' },
    { nombres: 'Isabella', apellidos: 'Paredes' },
  ],
}

function formatJson(value) {
  return JSON.stringify(value, null, 2)
}

function parseJson(value) {
  return JSON.parse(value)
}

export function ApiTesterPage() {
  const [idClase, setIdClase] = useState('1')
  const [idHorario, setIdHorario] = useState('1')
  const [fecha, setFecha] = useState(fechaActual)
  const [idRegistro, setIdRegistro] = useState('1')
  const [idParalelo, setIdParalelo] = useState('1')
  const [asistenciaJson, setAsistenciaJson] = useState(formatJson(asistenciaBase))
  const [importacionJson, setImportacionJson] = useState(
    formatJson(estudiantesImportacionBase),
  )
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmation, setConfirmation] = useState(null)

  const runRequest = async (request) => {
    setError('')
    setIsLoading(true)

    try {
      const result = await request()
      setResponse(result)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
      setResponse(requestError.response?.data ?? null)
    } finally {
      setIsLoading(false)
    }
  }

  const requestConfirmation = (title, description, action) => {
    setConfirmation({ action, description, title })
  }

  const confirmAction = async () => {
    if (!confirmation) return

    const action = confirmation.action
    setConfirmation(null)
    await runRequest(action)
  }

  return (
    <AppLayout title="Pruebas de endpoints">
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div className="grid gap-4">
          <EndpointPanel title="Clases">
            <Button isLoading={isLoading} onClick={() => runRequest(obtenerMisClases)}>
              GET /clases/mis-clases
            </Button>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <Input label="ID clase" value={idClase} onChange={setIdClase} />
              <Button
                isLoading={isLoading}
                onClick={() => runRequest(() => obtenerHorarioClase(idClase))}
              >
                GET horario
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() => runRequest(() => obtenerEstudiantesClase(idClase))}
              >
                GET estudiantes
              </Button>
            </div>
          </EndpointPanel>

          <EndpointPanel title="Asistencias">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <Input label="ID horario" value={idHorario} onChange={setIdHorario} />
              <Input label="Fecha" type="date" value={fecha} onChange={setFecha} />
              <Button
                isLoading={isLoading}
                onClick={() =>
                  runRequest(() => obtenerRegistroAsistencia(idHorario, fecha))
                }
              >
                GET registro
              </Button>
            </div>
            <JsonEditor
              label="Body asistencia"
              value={asistenciaJson}
              onChange={setAsistenciaJson}
            />
            <StatusPreview value={asistenciaJson} />
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <Input
                label="ID registro para PUT"
                value={idRegistro}
                onChange={setIdRegistro}
              />
              <Button
                isLoading={isLoading}
                onClick={() =>
                  requestConfirmation(
                    'Registrar asistencia',
                    'Se creará un nuevo registro para el horario y fecha indicados.',
                    () => registrarAsistencia(parseJson(asistenciaJson)),
                  )
                }
              >
                POST asistencia
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() =>
                  requestConfirmation(
                    'Actualizar asistencia',
                    `Se actualizará el registro ${idRegistro} con el body actual.`,
                    () => actualizarAsistencia(idRegistro, parseJson(asistenciaJson)),
                  )
                }
              >
                PUT asistencia
              </Button>
            </div>
          </EndpointPanel>

          <EndpointPanel title="Estudiantes">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                label="ID paralelo"
                value={idParalelo}
                onChange={setIdParalelo}
              />
              <Button
                isLoading={isLoading}
                onClick={() =>
                  requestConfirmation(
                    'Importar estudiantes',
                    `Se reemplazará la matrícula activa del paralelo ${idParalelo}.`,
                    () => importarEstudiantes(idParalelo, parseJson(importacionJson)),
                  )
                }
              >
                POST importar
              </Button>
            </div>
            <JsonEditor
              label="Body importación"
              value={importacionJson}
              onChange={setImportacionJson}
            />
          </EndpointPanel>
        </div>

        <aside className="rounded-lg border border-[#d9e2ef] bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Respuesta</h2>
          {error ? (
            <p className="mt-3 rounded-md bg-[#fef2f2] px-3 py-2 text-sm text-[#b42318]">
              {error}
            </p>
          ) : null}
          <pre className="mt-3 min-h-80 overflow-auto rounded-md bg-[#111827] p-4 text-left text-xs leading-relaxed text-[#d1d5db]">
            {response ? formatJson(response) : 'Ejecuta una solicitud para ver el resultado.'}
          </pre>
        </aside>
      </section>

      <Modal
        confirmLabel="Ejecutar"
        isOpen={Boolean(confirmation)}
        isSubmitting={isLoading}
        onClose={() => setConfirmation(null)}
        onConfirm={confirmAction}
        title={confirmation?.title}
      >
        {confirmation?.description}
      </Modal>
    </AppLayout>
  )
}

function EndpointPanel({ children, title }) {
  return (
    <section className="rounded-lg border border-[#d9e2ef] bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </section>
  )
}

function JsonEditor({ label, onChange, value }) {
  return (
    <label className="block text-left text-sm font-medium text-[#344054]">
      {label}
      <textarea
        className="mt-2 min-h-52 w-full resize-y rounded-md border border-[#cbd5e1] px-3 py-2 font-mono text-xs leading-relaxed text-[#172033] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function StatusPreview({ value }) {
  let statuses

  try {
    const asistencia = parseJson(value)
    statuses = asistencia.asistencias?.slice(0, 6).map((item) => {
      if (item.atrasado) return 'atrasado'
      return item.asistio ? 'presente' : 'ausente'
    }) ?? []
  } catch {
    return null
  }

  if (!statuses?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status, index) => (
        <Badge key={`${status}-${index}`} status={status} />
      ))}
    </div>
  )
}
