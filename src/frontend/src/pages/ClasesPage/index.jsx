import { RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button, Spinner } from '../../components/common'
import { ClasesGrid } from '../../components/clases'
import { AppLayout } from '../../components/layout'
import { getApiData, getApiErrorMessage } from '../../services/api'
import { obtenerMisClases } from '../../services/clasesService'

export function ClasesPage() {
  const [clases, setClases] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadClases = useCallback(async () => {
    setError('')
    setIsLoading(true)

    try {
      const response = await obtenerMisClases()
      setClases(getApiData(response) ?? [])
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isActive = true

    async function loadInitialClases() {
      try {
          const response = await obtenerMisClases()

        if (isActive) {
          setClases(getApiData(response) ?? [])
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

    loadInitialClases()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <AppLayout title="Mis clases">
      <section className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#172033]">Clases asignadas</h2>
            <p className="mt-1 text-sm text-[#667085]">
              Revisa materias, paralelos y horarios del módulo docente.
            </p>
          </div>
          <Button variant="secondary" onClick={loadClases} isLoading={isLoading}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
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

        {!isLoading && clases.length ? (
          <ClasesGrid clases={clases} onImportSuccess={loadClases} />
        ) : null}

        {!isLoading && !clases.length && !error ? (
          <div className="rounded-lg border border-[#d9e2ef] bg-white p-5 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-[#172033]">
              No hay clases asignadas
            </h2>
            <p className="mt-2 text-sm text-[#667085]">
              Cuando el docente tenga clases registradas, aparecerán en esta sección.
            </p>
          </div>
        ) : null}
      </section>
    </AppLayout>
  )
}
