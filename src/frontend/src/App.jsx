import { Navigate, Route, Routes } from 'react-router-dom'
import { AsistenciaPage } from './pages/AsistenciaPage'
import { ProtectedRoute } from './routes/ProtectedRoute.jsx'
import { ApiTesterPage } from './pages/ApiTesterPage.jsx'
import { CalendarioPage } from './pages/CalendarioPage'
import { ClasesPage } from './pages/ClasesPage'
import { LoginPage } from './pages/LoginPage'
import { PlaceholderPage } from './pages/PlaceholderPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/clases" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pruebas"
        element={
          <ProtectedRoute>
            <ApiTesterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clases"
        element={
          <ProtectedRoute>
            <ClasesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clases/:id/calendario"
        element={
          <ProtectedRoute>
            <CalendarioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendario"
        element={
          <ProtectedRoute>
            <Navigate to="/clases" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/asistencia"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Asistencia" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/asistencia/:idHorario/:fecha"
        element={
          <ProtectedRoute>
            <AsistenciaPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
