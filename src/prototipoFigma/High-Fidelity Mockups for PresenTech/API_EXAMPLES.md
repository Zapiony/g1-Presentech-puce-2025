# Ejemplos de integración con API

Este documento muestra cómo reemplazar los datos mock con llamadas reales a la API.

## Autenticación

### Login (POST /api/v1/auth/login)

**Ubicación:** `src/app/pages/LoginPage.tsx`

```typescript
// Reemplazar esta función:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();
    
    // Guardar token y datos del docente
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("docente_name", data.docente.nombre);
    
    navigate("/clases");
  } catch (err) {
    setError("Credenciales incorrectas. Intente nuevamente.");
  } finally {
    setLoading(false);
  }
};
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "docente": {
    "id": "123",
    "nombre": "Juan Pérez",
    "email": "juan.perez@feyalegria.edu"
  }
}
```

## Clases

### Obtener clases del docente (GET /api/v1/clases/mis-clases)

**Ubicación:** `src/app/pages/ClasesPage.tsx`

```typescript
import { useEffect, useState } from "react";

export default function ClasesPage() {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch('/api/v1/clases/mis-clases', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar clases');
        }

        const data = await response.json();
        setClases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClases();
  }, []);

  // Renderizado con estados de carga y error...
}
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "materia": "Matemáticas",
    "paralelo": "5to A",
    "proximaClase": "2026-05-20T08:00:00Z",
    "horarios": [
      {
        "id": "h1",
        "dia": "Lunes",
        "horaInicio": "08:00",
        "horaFin": "09:30"
      }
    ]
  }
]
```

### Obtener horarios de una clase (GET /api/v1/clases/{id}/horario)

**Ubicación:** `src/app/pages/CalendarioPage.tsx`

```typescript
const { id } = useParams();
const [horarios, setHorarios] = useState([]);

useEffect(() => {
  const fetchHorarios = async () => {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`/api/v1/clases/${id}/horario`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setHorarios(data);
  };

  fetchHorarios();
}, [id]);
```

### Obtener estudiantes de una clase (GET /api/v1/clases/{id}/estudiantes)

```typescript
const fetchEstudiantes = async (claseId: string) => {
  const token = localStorage.getItem("auth_token");
  const response = await fetch(`/api/v1/clases/${claseId}/estudiantes`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
```

**Respuesta esperada:**
```json
[
  {
    "id": "e1",
    "nombres": "Juan Carlos",
    "apellidos": "Pérez López"
  }
]
```

## Importar estudiantes

### Importar desde Excel (POST /api/v1/estudiantes/importar/{idParalelo})

**Ubicación:** `src/app/pages/ClasesPage.tsx`

```typescript
const handleImport = async () => {
  if (!file || !selectedClaseId) return;

  setImporting(true);
  setImportError("");

  try {
    const token = localStorage.getItem("auth_token");
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `/api/v1/estudiantes/importar/${selectedClaseId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Error al importar archivo');
    }

    const data = await response.json();
    
    // Cerrar diálogo y actualizar lista
    setImportDialogOpen(false);
    // Recargar clases si es necesario
  } catch (error) {
    setImportError("Error al importar el archivo. Verifique el formato.");
  } finally {
    setImporting(false);
  }
};
```

**Respuesta esperada:**
```json
{
  "importados": 25,
  "estudiantes": [
    {
      "id": "e1",
      "nombres": "Juan Carlos",
      "apellidos": "Pérez López"
    }
  ]
}
```

## Asistencia

### Obtener asistencia existente (GET /api/v1/asistencias/{idHorario}/{fecha})

**Ubicación:** `src/app/pages/AsistenciaPage.tsx`

```typescript
useEffect(() => {
  const cargarAsistencia = async () => {
    const token = localStorage.getItem("auth_token");
    
    try {
      const response = await fetch(
        `/api/v1/asistencias/${idHorario}/${fecha}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Si existe asistencia, cargar datos
        setModoEdicion(true);
        setObservacionesGenerales(data.observacionesGenerales || "");
        
        // Transformar asistencias a formato local
        const asistenciasMap = {};
        data.asistencias.forEach(a => {
          asistenciasMap[a.estudianteId] = {
            estudianteId: a.estudianteId,
            estado: a.estado,
            justificativo: a.justificativo,
            observaciones: a.observaciones,
          };
        });
        setAsistencias(asistenciasMap);
      }
    } catch (error) {
      console.error("Error al cargar asistencia:", error);
    }
  };

  cargarAsistencia();
}, [idHorario, fecha]);
```

**Respuesta esperada:**
```json
{
  "id": "a1",
  "horarioId": "h1",
  "fecha": "2026-05-20",
  "observacionesGenerales": "Clase normal",
  "asistencias": [
    {
      "estudianteId": "e1",
      "estado": "presente",
      "justificativo": null,
      "observaciones": null
    },
    {
      "estudianteId": "e2",
      "estado": "atrasado",
      "justificativo": "Problema con transporte",
      "observaciones": null
    }
  ]
}
```

### Guardar nueva asistencia (POST /api/v1/asistencias)

```typescript
const handleConfirmarGuardado = async () => {
  setSaving(true);

  try {
    const token = localStorage.getItem("auth_token");
    
    // Transformar datos al formato del API
    const payload = {
      horarioId: idHorario,
      fecha: fecha,
      observacionesGenerales: observacionesGenerales,
      asistencias: Object.values(asistencias).map(a => ({
        estudianteId: a.estudianteId,
        estado: a.estado,
        justificativo: a.justificativo || null,
        observaciones: a.observaciones || null,
      })),
    };

    const response = await fetch('/api/v1/asistencias', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Error al guardar asistencia');
    }

    navigate("/clases");
  } catch (error) {
    alert("Error al guardar la asistencia");
  } finally {
    setSaving(false);
    setConfirmDialogOpen(false);
  }
};
```

### Actualizar asistencia existente (PUT /api/v1/asistencias/{id})

```typescript
// Similar a POST, pero usando PUT y el ID de la asistencia existente
const response = await fetch(`/api/v1/asistencias/${asistenciaId}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});
```

## Manejo de errores

### Interceptor de errores genérico

```typescript
// Crear un helper para fetch con manejo de errores
async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token");
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Si no está autenticado, redirigir a login
  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("docente_name");
    window.location.href = "/login";
    throw new Error('Sesión expirada');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }

  return response.json();
}

// Uso:
const clases = await apiFetch('/api/v1/clases/mis-clases');
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://api.presentech.edu
```

Usar en el código:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const response = await fetch(`${API_BASE_URL}/api/v1/clases/mis-clases`, {
  // ...
});
```

## Estados de carga

Recomendaciones para mejorar UX:

```typescript
// Usar estados de carga
if (loading) {
  return (
    <AppLayout title="Mis clases">
      <LoadingState message="Cargando clases..." />
    </AppLayout>
  );
}

// Manejar errores
if (error) {
  return (
    <AppLayout title="Mis clases">
      <ErrorState
        message={error}
        onRetry={() => window.location.reload()}
      />
    </AppLayout>
  );
}

// Manejar datos vacíos
if (clases.length === 0) {
  return (
    <AppLayout title="Mis clases">
      <EmptyState
        icon={GraduationCap}
        title="No hay clases asignadas"
        description="Cuando se le asignen clases, aparecerán aquí"
      />
    </AppLayout>
  );
}
```
