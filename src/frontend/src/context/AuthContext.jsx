import { useCallback, useMemo, useState } from 'react'
import { login as loginRequest } from '../services/authService'
import { getApiData } from '../services/api'
import { AuthContext } from './AuthContextValue'

const TOKEN_KEY = 'presentech_token'
const USER_KEY = 'presentech_user'

function getStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY)
  return rawUser ? JSON.parse(rawUser) : null
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(getStoredUser)

  const login = useCallback(async (credentials) => {
    const response = await loginRequest(credentials)
    const data = getApiData(response)

    if (!data?.token) {
      throw new Error('La respuesta de autenticación no contiene un token válido.')
    }

    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data))
    localStorage.setItem('docente_name', `${data.nombres} ${data.apellidos}`)
    setToken(data.token)
    setUser(data)

    return response
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem('docente_name')
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      token,
      user,
    }),
    [login, logout, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
