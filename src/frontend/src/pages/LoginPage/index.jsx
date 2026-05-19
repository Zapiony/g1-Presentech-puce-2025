import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Input } from '../../components/common'
import { getApiErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const [credentials, setCredentials] = useState({
    correo_institucional: '',
    contrasena: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(credentials)
      navigate('/clases', { replace: true })
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
            <span className="text-2xl font-semibold text-primary-foreground">PT</span>
          </div>
          <h1 className="text-2xl font-semibold text-primary-dark">PresenTech</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Sistema de gestión de asistencia
          </p>
        </div>

        <form
          className="rounded-lg border border-border bg-card p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <h2 className="text-lg font-medium text-foreground">Acceso docente</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingrese sus credenciales institucionales
            </p>
          </div>

          <Input
            label="Correo institucional"
            type="email"
            value={credentials.correo_institucional}
            onChange={(value) =>
              setCredentials((current) => ({
                ...current,
                correo_institucional: value,
              }))
            }
          />

          <div className="mt-4">
            <Input
              label="Contraseña"
              type="password"
              value={credentials.contrasena}
              onChange={(value) =>
                setCredentials((current) => ({
                  ...current,
                  contrasena: value,
                }))
              }
            />
          </div>

          {error ? (
            <p className="mt-4 rounded-md border border-error bg-error-bg px-3 py-2 text-sm text-error">
              {error}
            </p>
          ) : null}

          <Button className="mt-5 w-full" type="submit" isLoading={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Fe y Alegría - Sistema educativo
        </p>
      </section>
    </main>
  )
}
