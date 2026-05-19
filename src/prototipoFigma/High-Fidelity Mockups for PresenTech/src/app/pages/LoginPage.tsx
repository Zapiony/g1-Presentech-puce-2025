import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Demo: aceptar cualquier credencial válida
      if (email && password) {
        // Guardar estado de autenticación
        localStorage.setItem("auth_token", "demo_token");
        localStorage.setItem("docente_name", email.split("@")[0]);
        navigate("/clases");
      } else {
        setError("Por favor complete todos los campos");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        {/* Logo y marca */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-lg bg-primary flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-semibold text-2xl">PT</span>
          </div>
          <h1 className="text-2xl font-semibold text-primary-dark">PresenTech</h1>
          <p className="text-sm text-muted-foreground mt-2">Sistema de gestión de asistencia</p>
        </div>

        {/* Formulario */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-foreground">Acceso docente</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Ingrese sus credenciales institucionales
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="docente@feyalegria.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-error-bg border border-error">
                <AlertCircle className="h-4 w-4 text-error mt-0.5 flex-shrink-0" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Fe y Alegría - Sistema educativo
        </p>
      </div>
    </div>
  );
}
