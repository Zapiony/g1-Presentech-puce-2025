import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Input } from '../../components/common'
import { getApiErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const [credentials, setCredentials] = useState({
    correo_institucional: 'cmendoza@feyalegria.edu.ec',
    contrasena: 'Test1234!',
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
      navigate('/', { replace: true })
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-svh bg-[#f4f7fb] px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2563eb]">
            PresenTech
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#172033]">
            Acceso docente
          </h1>
          <p className="mt-2 text-sm text-[#667085]">
            Inicia sesión para probar los endpoints del módulo docente.
          </p>
        </div>

        <form
          className="rounded-lg border border-[#d9e2ef] bg-white p-5 shadow-sm"
          onSubmit={handleSubmit}
        >
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
            <p className="mt-4 rounded-md bg-[#fef2f2] px-3 py-2 text-sm text-[#b42318]">
              {error}
            </p>
          ) : null}

          <Button className="mt-5 w-full" type="submit" isLoading={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </section>
    </main>
  )
}
