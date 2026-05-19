import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import ClasesPage from "./pages/ClasesPage";
import CalendarioPage from "./pages/CalendarioPage";
import AsistenciaPage from "./pages/AsistenciaPage";

// Componente para proteger rutas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("auth_token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/clases",
    element: (
      <ProtectedRoute>
        <ClasesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/clases/:id/calendario",
    element: (
      <ProtectedRoute>
        <CalendarioPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/asistencia/:idHorario/:fecha",
    element: (
      <ProtectedRoute>
        <AsistenciaPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/calendario",
    element: (
      <ProtectedRoute>
        <Navigate to="/clases" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/asistencia",
    element: (
      <ProtectedRoute>
        <Navigate to="/clases" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
