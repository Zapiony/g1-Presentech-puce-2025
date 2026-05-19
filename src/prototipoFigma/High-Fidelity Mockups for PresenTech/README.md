# PresenTech

Sistema de gestión de asistencia para docentes de Fe y Alegría.

## Descripción

PresenTech es una aplicación web mobile-first diseñada para que los docentes puedan gestionar sus clases, consultar calendarios y tomar asistencia de manera rápida y eficiente desde sus dispositivos móviles.

## Características principales

### 🔐 Autenticación
- Inicio de sesión con credenciales institucionales
- Gestión de sesión persistente

### 📚 Gestión de Clases
- Vista de clases asignadas por docente
- Información de materias, paralelos y horarios
- Próximas clases programadas
- Importación de estudiantes desde archivos Excel

### 📅 Calendario Semanal
- Visualización de horarios semanales por clase
- Navegación a toma de asistencia desde bloques de calendario
- Vista adaptada para mobile y desktop

### ✅ Toma de Asistencia
- Registro de asistencia por estudiante (Presente, Ausente, Atrasado)
- Justificativos obligatorios para atrasos
- Observaciones por estudiante y por sesión
- Resumen automático de asistencia
- Modo edición para actualizar asistencias previas
- Confirmación antes de guardar

## Estructura del proyecto

```
src/app/
├── components/
│   ├── asistencias/
│   │   └── AsistenciaItem.tsx      # Item individual de asistencia
│   ├── clases/
│   │   └── ClaseCard.tsx           # Tarjeta de clase
│   ├── common/
│   │   ├── EmptyState.tsx          # Estado vacío
│   │   ├── ErrorState.tsx          # Estado de error
│   │   └── LoadingState.tsx        # Estado de carga
│   ├── layout/
│   │   ├── AppLayout.tsx           # Layout principal
│   │   ├── BottomNav.tsx           # Navegación inferior mobile
│   │   └── Header.tsx              # Encabezado
│   └── ui/                         # Componentes UI base (shadcn/ui)
├── lib/
│   └── utils.ts                    # Utilidades
├── pages/
│   ├── AsistenciaPage.tsx          # Página de toma de asistencia
│   ├── CalendarioPage.tsx          # Página de calendario semanal
│   ├── ClasesPage.tsx              # Página de mis clases
│   └── LoginPage.tsx               # Página de inicio de sesión
├── App.tsx                         # Componente raíz
└── routes.tsx                      # Configuración de rutas
```

## Paleta de colores

### Colores institucionales
- **Azul institucional oscuro**: `#1E3A5F`
- **Azul de acción**: `#2563EB`
- **Fondo claro**: `#F8FAFC`

### Estados semánticos
- **Presente/Éxito**: `#166534` (fondo `#F0FDF4`)
- **Ausente/Error**: `#991B1B` (fondo `#FEF2F2`)
- **Atrasado/Advertencia**: `#9A3412` (fondo `#FFF7ED`)

### Textos
- **Principal**: `#172033`
- **Secundario**: `#667085`
- **Bordes**: `#D9E2EF` / `#CBD5E1`

## Rutas

- `/login` - Inicio de sesión
- `/clases` - Mis clases
- `/clases/:id/calendario` - Calendario semanal de una clase
- `/asistencia/:idHorario/:fecha` - Toma de asistencia

## Tecnologías

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **React Router 7** - Enrutamiento
- **Tailwind CSS 4** - Estilos
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

## Diseño Mobile-First

La aplicación está optimizada para dispositivos móviles con pantallas de:
- 375px (iPhone SE)
- 390px (iPhone 12/13/14)
- 430px (iPhone 14 Pro Max)

Incluye adaptaciones responsive para tablet y desktop.

## Navegación

### Mobile
- Bottom navigation con 3 secciones principales:
  - Clases
  - Calendario
  - Asistencia

### Desktop
- Header fijo con información del docente
- Contenido centrado con ancho máximo

## Endpoints esperados (Backend)

```
POST   /api/v1/auth/login
GET    /api/v1/clases/mis-clases
GET    /api/v1/clases/{id}/horario
GET    /api/v1/clases/{id}/estudiantes
POST   /api/v1/estudiantes/importar/{idParalelo}
GET    /api/v1/asistencias/{idHorario}/{fecha}
POST   /api/v1/asistencias
PUT    /api/v1/asistencias/{id}
```

## Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo (ya está corriendo en este entorno)
# El servidor está disponible en la vista previa
```

## Notas importantes

- La aplicación usa datos mock para demostración
- El estado de autenticación se guarda en localStorage
- Los colores y estilos siguen las especificaciones institucionales
- No se usan emojis ni elementos decorativos innecesarios
- El diseño es sobrio, académico y profesional

## Créditos

Desarrollado para Fe y Alegría - Sistema educativo
