# Guia de Desarrollo — PresenTech

> **Colegios Fe y Alegría**
> Sistema de Toma de Asistencias — Módulo Docente (Fase 1)

---

## Tabla de Contenidos

1. [Descripción del Sistema](#1-descripción-del-sistema)
2. [Alcance Actual](#2-alcance-actual)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Base de Datos — Propuesta Mejorada](#4-base-de-datos--propuesta-mejorada)
5. [Arquitectura del Backend](#5-arquitectura-del-backend)
6. [Arquitectura del Frontend](#6-arquitectura-del-frontend)
7. [Reglas de Negocio](#7-reglas-de-negocio)
8. [Convenciones y Estándares](#8-convenciones-y-estándares)
9. [Estructura de Carpetas del Proyecto](#9-estructura-de-carpetas-del-proyecto)
10. [Lista de Tareas — Checklist de Desarrollo](#10-lista-de-tareas--checklist-de-desarrollo)

---

## 1. Descripción del Sistema

**PresenTech** es una aplicación web de toma de asistencias diseñada para los colegios de la red **Fe y Alegría**. Su objetivo principal es agilizar y digitalizar el proceso de registro de asistencia de los estudiantes, reemplazando métodos manuales por una interfaz moderna, accesible y de fácil uso desde dispositivos móviles.

El sistema contará con dos portales:

| Portal | Usuarios | Estado |
|---|---|---|
| **Portal Docente** | Profesores del colegio | **Fase 1 — En desarrollo** |
| **Portal Administrativo** | Inspector / Administración | Fase 2 — Pendiente |

### Funcionalidades Principales del Portal Docente

- Autenticación con correo institucional y contraseña.
- Visualización del listado de clases (materias y paralelos) asignadas al docente.
- Vista de calendario semanal por clase, mostrando los días y horarios.
- Al seleccionar una clase en el calendario, se despliega el listado de estudiantes del paralelo.
- Marcado de asistencia alumno por alumno: **Presente**, **Ausente**, **Atrasado con justificativo**.
- Campo de observación general por sesión de clase.
- Importación del listado de estudiantes desde un archivo Excel (.xlsx) usando una librería moderna.
- Almacenamiento de cada registro de asistencia con totales calculados automáticamente.

---

## 2. Alcance Actual

> **IMPORTANTE:** En esta primera fase únicamente se desarrollará el **Portal Docente**. El portal administrativo para el inspector (reportes, gestión de paralelos, supervisión de asistencias) se implementará en una fase posterior una vez que el módulo docente esté completo y estable.

Todo el diseño de base de datos, backend y frontend descrito en esta guía corresponde al módulo docente. Las tablas de base de datos se diseñan desde el inicio con la escalabilidad necesaria para soportar el módulo administrativo sin cambios destructivos.

---

## 3. Stack Tecnológico

### Backend

| Componente | Tecnología / Versión |
|---|---|
| Framework | .NET 10 (C#) |
| Base de Datos | PostgreSQL 16 |
| Autenticación | JWT Bearer Tokens |
| Documentación API | Swagger / OpenAPI |
| Validación | FluentValidation |
| Mapeo | Mappers manuales (sin AutoMapper) |

#### Paquetes NuGet — Capa DataAccess

| Paquete | Versión |
|---|---|
| `Microsoft.EntityFrameworkCore` | 10.0.4 |
| `Microsoft.EntityFrameworkCore.Design` | 10.0.4 |
| `Microsoft.EntityFrameworkCore.Tools` | 10.0.4 |
| `Npgsql.EntityFrameworkCore.PostgreSQL` | 10.0.1 |

#### Paquetes NuGet — Capa API

| Paquete | Versión |
|---|---|
| `Asp.Versioning.Mvc` | 8.1.1 |
| `Asp.Versioning.Mvc.ApiExplorer` | 8.1.1 |
| `Microsoft.AspNetCore.Authentication.JwtBearer` | 8.0.25 |
| `Swashbuckle.AspNetCore` | 6.6.2 |

### Frontend

| Componente | Tecnología |
|---|---|
| Framework | React 18+ (con Vite) |
| Lenguaje | JavaScript (JSX) |
| Estilos | TailwindCSS |
| HTTP Client | Axios |
| Calendario | React Big Calendar o FullCalendar |
| Importación Excel | SheetJS (xlsx) |
| Routing | React Router v6 |

### Infraestructura

| Componente | Tecnología |
|---|---|
| Control de versiones | Git / GitHub |
| CI/CD | GitHub Actions |
| Hosting Backend | Azure App Service |
| Hosting Frontend | Azure Static Web Apps |

---

## 4. Base de Datos — Propuesta Mejorada

### Justificación de Mejoras

La propuesta original fue tomada como base. Se realizaron los siguientes ajustes sin añadir complejidad innecesaria:

- Se agregó la tabla `Estudiantes` (estaba referenciada pero no definida).
- Se agregó la tabla `Paralelo_Estudiantes` para representar la matrícula de alumnos en paralelos.
- Se separó la asistencia en dos tablas: `Registros_Asistencia` (cabecera de sesión) y `Asistencias` (detalle por alumno), normalizando la estructura y facilitando los reportes.
- Se usa `TIME` para `hora_inicio` y `hora_fin` en lugar de un string, lo que permite ordenamientos y validaciones de horario a nivel de base de datos.
- Se agregó el campo `materia` en `Clases`, ya que un mismo profesor puede dictar distintas materias a diferentes paralelos.
- Se agregan campos de auditoría (`activo`, `created_at`) donde corresponde para soporte de bajas lógicas.

### Diagrama Relacional (texto)

```
Profesores      1──N  Clases
Paralelos       1──N  Clases
Paralelos       1──N  Paralelo_Estudiantes
Estudiantes     1──N  Paralelo_Estudiantes
Clases          1──N  Clases_Horario
Dias_Semana     1──N  Clases_Horario
Clases_Horario  1──N  Registros_Asistencia
Registros_Asistencia  1──N  Asistencias
Estudiantes     1──N  Asistencias
```

### Tablas

#### `profesores`
| Campo | Tipo | Notas |
|---|---|---|
| `id_profesor` | SERIAL PK | |
| `nombres` | VARCHAR(100) | NOT NULL |
| `apellidos` | VARCHAR(100) | NOT NULL |
| `correo_institucional` | VARCHAR(150) | UNIQUE, NOT NULL |
| `contrasena_hash` | VARCHAR(255) | NOT NULL — bcrypt hash |
| `telefono` | VARCHAR(20) | NULLABLE |
| `especialidad` | VARCHAR(100) | NULLABLE |
| `activo` | BOOLEAN | DEFAULT TRUE |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

#### `estudiantes`
| Campo | Tipo | Notas |
|---|---|---|
| `id_estudiante` | SERIAL PK | |
| `nombres` | VARCHAR(100) | NOT NULL |
| `apellidos` | VARCHAR(100) | NOT NULL |
| `activo` | BOOLEAN | DEFAULT TRUE |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

#### `paralelos`
| Campo | Tipo | Notas |
|---|---|---|
| `id_paralelo` | SERIAL PK | |
| `nombre` | VARCHAR(150) | NOT NULL — Ej: "Ciencias - 2do Bachillerato A" |
| `descripcion` | TEXT | NULLABLE |
| `capacidad_maxima` | INT | NOT NULL |
| `activo` | BOOLEAN | DEFAULT TRUE |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

#### `paralelo_estudiantes`
| Campo | Tipo | Notas |
|---|---|---|
| `id_paralelo_estudiante` | SERIAL PK | |
| `id_paralelo` | INT FK → `paralelos` | NOT NULL |
| `id_estudiante` | INT FK → `estudiantes` | NOT NULL |
| `activo` | BOOLEAN | DEFAULT TRUE |

> UNIQUE (`id_paralelo`, `id_estudiante`)

#### `dias_semana`
| Campo | Tipo | Notas |
|---|---|---|
| `id_dia` | SERIAL PK | |
| `nombre` | VARCHAR(20) | NOT NULL — Lunes … Viernes |
| `orden` | INT | NOT NULL — 1=Lunes, 5=Viernes |

#### `clases`
| Campo | Tipo | Notas |
|---|---|---|
| `id_clase` | SERIAL PK | |
| `id_profesor` | INT FK → `profesores` | NOT NULL |
| `id_paralelo` | INT FK → `paralelos` | NOT NULL |
| `materia` | VARCHAR(100) | NOT NULL |
| `observaciones` | TEXT | NULLABLE |
| `activo` | BOOLEAN | DEFAULT TRUE |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

#### `clases_horario`
| Campo | Tipo | Notas |
|---|---|---|
| `id_horario` | SERIAL PK | |
| `id_clase` | INT FK → `clases` | NOT NULL |
| `id_dia` | INT FK → `dias_semana` | NOT NULL |
| `hora_inicio` | TIME | NOT NULL |
| `hora_fin` | TIME | NOT NULL |

#### `registros_asistencia`
Cabecera de cada sesión de clase tomada.

| Campo | Tipo | Notas |
|---|---|---|
| `id_registro` | SERIAL PK | |
| `id_horario` | INT FK → `clases_horario` | NOT NULL |
| `fecha` | DATE | NOT NULL |
| `total_presentes` | INT | Calculado al guardar |
| `total_ausentes` | INT | Calculado al guardar |
| `observaciones_sesion` | TEXT | NULLABLE |
| `created_at` | TIMESTAMP | DEFAULT NOW() |

> UNIQUE (`id_horario`, `fecha`) — no se puede registrar asistencia dos veces para el mismo horario y fecha.

#### `asistencias`
Detalle por alumno de cada sesión.

| Campo | Tipo | Notas |
|---|---|---|
| `id_asistencia` | SERIAL PK | |
| `id_registro` | INT FK → `registros_asistencia` | NOT NULL |
| `id_estudiante` | INT FK → `estudiantes` | NOT NULL |
| `asistio` | BOOLEAN | NOT NULL — TRUE = presente |
| `atrasado` | BOOLEAN | DEFAULT FALSE |
| `justificativo` | TEXT | NULLABLE — aplica cuando `atrasado = TRUE` |
| `observaciones` | TEXT | NULLABLE |

---

## 5. Arquitectura del Backend

El backend sigue una **arquitectura limpia de 4 capas** inspirada en el patrón de microservicios de referencia. Cada capa es un proyecto `.csproj` independiente dentro de la solución.

### Capas

| Capa | Proyecto | Responsabilidad |
|---|---|---|
| 1 | `Presentech.DataAccess` | Entidades EF Core, DbContext, Repositorios, Queries |
| 2 | `Presentech.DataManagement` | UnitOfWork, DataServices, DataModels, Mappers de acceso |
| 3 | `Presentech.Business` | Lógica de negocio, DTOs, Services, Validators, Mappers de dominio |
| 4 | `Presentech.Api` | Controllers, Extensions, Middleware, JWT, CORS, Swagger |

### Dependencias entre capas

```
Api → Business → DataManagement → DataAccess
```

Ninguna capa puede referenciar a una capa superior. `DataAccess` no conoce `Business`.

### Estructura de Carpetas del Backend

```
src/backend/
├── Presentech.DataAccess/
│   ├── Common/
│   │   └── PagedResult.cs
│   ├── Configurations/
│   │   ├── ProfesorConfiguration.cs
│   │   ├── EstudianteConfiguration.cs
│   │   ├── ParaleloConfiguration.cs
│   │   ├── ParaleloEstudianteConfiguration.cs
│   │   ├── DiaSemanaConfiguration.cs
│   │   ├── ClaseConfiguration.cs
│   │   ├── ClaseHorarioConfiguration.cs
│   │   ├── RegistroAsistenciaConfiguration.cs
│   │   └── AsistenciaConfiguration.cs
│   ├── Context/
│   │   └── PresentechDbContext.cs
│   ├── Entities/
│   │   ├── ProfesorEntity.cs
│   │   ├── EstudianteEntity.cs
│   │   ├── ParaleloEntity.cs
│   │   ├── ParaleloEstudianteEntity.cs
│   │   ├── DiaSemanaEntity.cs
│   │   ├── ClaseEntity.cs
│   │   ├── ClaseHorarioEntity.cs
│   │   ├── RegistroAsistenciaEntity.cs
│   │   └── AsistenciaEntity.cs
│   └── Repositories/
│       ├── Interfaces/
│       │   ├── IProfesorRepository.cs
│       │   ├── IEstudianteRepository.cs
│       │   ├── IParaleloRepository.cs
│       │   ├── IClaseRepository.cs
│       │   ├── IClaseHorarioRepository.cs
│       │   ├── IRegistroAsistenciaRepository.cs
│       │   └── IAsistenciaRepository.cs
│       ├── ProfesorRepository.cs
│       ├── EstudianteRepository.cs
│       ├── ParaleloRepository.cs
│       ├── ClaseRepository.cs
│       ├── ClaseHorarioRepository.cs
│       ├── RegistroAsistenciaRepository.cs
│       └── AsistenciaRepository.cs
│
├── Presentech.DataManagement/
│   ├── Interfaces/
│   │   ├── IProfesorDataService.cs
│   │   ├── IEstudianteDataService.cs
│   │   ├── IParaleloDataService.cs
│   │   ├── IClaseDataService.cs
│   │   ├── IAsistenciaDataService.cs
│   │   └── IUnitOfWork.cs
│   ├── Mappers/
│   │   ├── ProfesorDataMapper.cs
│   │   ├── EstudianteDataMapper.cs
│   │   ├── ParaleloDataMapper.cs
│   │   ├── ClaseDataMapper.cs
│   │   └── AsistenciaDataMapper.cs
│   ├── Models/
│   │   ├── ProfesorDataModel.cs
│   │   ├── EstudianteDataModel.cs
│   │   ├── ParaleloDataModel.cs
│   │   ├── ClaseDataModel.cs
│   │   ├── ClaseHorarioDataModel.cs
│   │   ├── RegistroAsistenciaDataModel.cs
│   │   └── AsistenciaDataModel.cs
│   └── Services/
│       ├── ProfesorDataService.cs
│       ├── EstudianteDataService.cs
│       ├── ParaleloDataService.cs
│       ├── ClaseDataService.cs
│       ├── AsistenciaDataService.cs
│       └── UnitOfWork.cs
│
├── Presentech.Business/
│   ├── DTOs/
│   │   ├── Auth/
│   │   │   ├── LoginRequest.cs
│   │   │   └── LoginResponse.cs
│   │   ├── Profesor/
│   │   │   └── ProfesorResponse.cs
│   │   ├── Clase/
│   │   │   ├── ClaseResponse.cs
│   │   │   └── ClaseHorarioResponse.cs
│   │   ├── Asistencia/
│   │   │   ├── RegistrarAsistenciaRequest.cs
│   │   │   ├── AsistenciaEstudianteDto.cs
│   │   │   └── RegistroAsistenciaResponse.cs
│   │   └── Estudiante/
│   │       ├── EstudianteResponse.cs
│   │       └── ImportarEstudiantesRequest.cs
│   ├── Exceptions/
│   │   ├── BusinessException.cs
│   │   ├── NotFoundException.cs
│   │   ├── UnauthorizedBusinessException.cs
│   │   └── ValidationException.cs
│   ├── Interfaces/
│   │   ├── IAuthService.cs
│   │   ├── IClaseService.cs
│   │   ├── IAsistenciaService.cs
│   │   └── IEstudianteService.cs
│   ├── Mappers/
│   │   ├── ProfesorBusinessMapper.cs
│   │   ├── ClaseBusinessMapper.cs
│   │   ├── AsistenciaBusinessMapper.cs
│   │   └── EstudianteBusinessMapper.cs
│   ├── Services/
│   │   ├── AuthService.cs
│   │   ├── ClaseService.cs
│   │   ├── AsistenciaService.cs
│   │   └── EstudianteService.cs
│   └── Validators/
│       ├── AuthValidator.cs
│       ├── AsistenciaValidator.cs
│       └── EstudianteValidator.cs
│
└── Presentech.Api/
    ├── Controllers/
    │   └── V1/
    │       ├── Auth/
    │       │   └── AuthController.cs
    │       ├── Clases/
    │       │   └── ClasesController.cs
    │       ├── Asistencias/
    │       │   └── AsistenciasController.cs
    │       └── Estudiantes/
    │           └── EstudiantesController.cs
    ├── Extensions/
    │   ├── ApiVersioningExtensions.cs
    │   ├── AuthenticationExtensions.cs
    │   ├── CorsExtensions.cs
    │   ├── ServiceCollectionExtensions.cs
    │   └── SwaggerExtensions.cs
    ├── Middleware/
    │   └── ExceptionHandlingMiddleware.cs
    ├── Models/
    │   ├── Common/
    │   │   ├── ApiResponse.cs
    │   │   └── ApiErrorResponse.cs
    │   └── Settings/
    │       └── JwtSettings.cs
    ├── appsettings.json
    └── Program.cs
```

### Endpoints API (Referencia)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Autenticación del profesor | No |
| GET | `/api/v1/clases/mis-clases` | Clases del profesor autenticado | JWT |
| GET | `/api/v1/clases/{id}/horario` | Horario semanal de una clase | JWT |
| GET | `/api/v1/clases/{id}/estudiantes` | Listado de estudiantes del paralelo | JWT |
| POST | `/api/v1/estudiantes/importar/{idParalelo}` | Importar estudiantes desde Excel | JWT |
| GET | `/api/v1/asistencias/{idHorario}/{fecha}` | Obtener registro de asistencia | JWT |
| POST | `/api/v1/asistencias` | Registrar asistencia de una sesión | JWT |
| PUT | `/api/v1/asistencias/{id}` | Actualizar registro existente | JWT |

---

## 6. Arquitectura del Frontend

### Filosofía de Diseño

- **Mobile First**: La aplicación está diseñada principalmente para ser usada en dispositivos móviles por los profesores. Los breakpoints parten de 375px y escalan hacia escritorio.
- **Sin emojis**: La interfaz es formal y profesional. No se usan emojis en ningún componente.
- **Colores de tema**: Azul institucional (`#1E3A5F`, `#2563EB`) y blanco (`#FFFFFF`), con variantes de gris claro para fondos secundarios y rojo/verde para acciones de asistencia.
- **Componentes independientes**: Cada componente es autocontenido y reutilizable.

### Estructura de Carpetas del Frontend

```
src/frontend/src/
├── assets/
│   └── logo.png
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   └── Badge/
│   ├── layout/
│   │   ├── Header/
│   │   └── BottomNav/
│   ├── auth/
│   │   └── LoginForm/
│   ├── clases/
│   │   ├── ClaseCard/
│   │   └── ClasesGrid/
│   ├── calendario/
│   │   └── CalendarioSemanal/
│   ├── estudiantes/
│   │   ├── EstudianteItem/
│   │   ├── EstudiantesLista/
│   │   └── ImportarExcelButton/
│   └── asistencias/
│       ├── AsistenciaItem/
│       └── AsistenciaForm/
├── pages/
│   ├── LoginPage/
│   ├── ClasesPage/
│   ├── CalendarioPage/
│   ├── EstudiantesPage/
│   └── AsistenciaPage/
├── services/
│   ├── api.js                  ← instancia Axios configurada
│   ├── authService.js
│   ├── clasesService.js
│   ├── asistenciasService.js
│   └── estudiantesService.js
├── context/
│   └── AuthContext.jsx         ← estado global del usuario autenticado
├── hooks/
│   ├── useAuth.js
│   └── useAsistencia.js
├── utils/
│   ├── dateUtils.js
│   └── excelUtils.js
├── App.jsx
└── main.jsx
```

### Flujo de Navegación

```
/login
  └── /clases                              ← Panel principal: listado de clases del profesor
        └── /clases/:id/calendario         ← Vista de calendario semanal
              └── /asistencia/:id/:fecha   ← Toma de asistencia del día seleccionado
```

---

## 7. Reglas de Negocio

1. **Un profesor solo puede ver sus propias clases.** El JWT contiene el `id_profesor` y el backend filtra siempre por ese identificador.
2. **No se puede registrar asistencia dos veces** para el mismo horario y fecha. El sistema detecta el registro existente y permite editarlo.
3. **El total de presentes y ausentes se calcula automáticamente** al guardar, contando los registros de la tabla `asistencias`.
4. **Un estudiante marcado como atrasado** se registra su atraso y por defecto cuenta como presente. El campo `justificativo` es obligatorio cuando `atrasado = TRUE`.
5. **La importación de Excel** reemplaza el listado de estudiantes del paralelo mediante baja lógica de los anteriores y alta de los nuevos. No se eliminan registros físicamente.
6. **El horario de clase** es una referencia semanal repetitiva. El `Registro_Asistencia` guarda la fecha concreta en que se tomó lista.
7. **La autenticación** usa JWT con expiración de 8 horas (una jornada escolar).
8. **El campo `observaciones_sesion`** en `registros_asistencia` es opcional y captura novedades generales de la sesión.

---

## 8. Convenciones y Estándares

### Backend (C#)

- Nombres de clases en **PascalCase**.
- Nombres de métodos en **PascalCase**.
- Nombres de variables y parámetros en **camelCase**.
- Interfaces prefijadas con `I`: `IClaseService`, `IUnitOfWork`.
- Entidades de base de datos sufijadas con `Entity`: `ClaseEntity`.
- DataModels sufijados con `DataModel`: `ClaseDataModel`.
- DTOs de request sufijados con `Request`: `LoginRequest`.
- DTOs de response sufijados con `Response`: `ClaseResponse`.
- Nunca se exponen entidades de base de datos directamente en los controllers.
- Todas las respuestas API se envuelven en `ApiResponse<T>`.

### Frontend (React)

- Componentes en **PascalCase** con su propia carpeta: `ClaseCard/index.jsx`.
- Hooks personalizados con prefijo `use`: `useAuth`, `useAsistencia`.
- Servicios en **camelCase**: `clasesService.js`.
- Las llamadas a API van exclusivamente en los archivos de servicio, nunca dentro de componentes directamente.
- No se usan emojis en ningún texto visible al usuario.
- Todos los textos en **español**.

### Git

- Ramas por funcionalidad: `feature/login`, `feature/toma-asistencia`.
- Rama principal: `main`.
- Rama de integración del equipo: `develop` (recomendado para integrar aportes antes de pasar a main).
- Commits en formato convencional: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.

---

## 9. Estructura de Carpetas del Proyecto

```
g1-Presentech-puce-2025/
├── docs/                                  ← Documentación del proyecto
├── src/
│   ├── backend/
│   │   ├── Presentech.DataAccess/
│   │   ├── Presentech.DataManagement/
│   │   ├── Presentech.Business/
│   │   └── Presentech.Api/
│   └── frontend/
│       ├── public/
│       └── src/
├── tests/                                 ← Proyectos de prueba (backend)
├── Guia_Desarrollo_PresenTech.md          ← Este archivo
├── schema.sql                             ← DDL de la base de datos (pendiente)
└── README.md
```

---

## 10. Lista de Tareas — Checklist de Desarrollo

> Marcar con `[x]` cada ítem al completarlo. Indicar entre paréntesis el nombre del integrante responsable.

### Fase 0 — Fundamentos

- [x] **DDL de la base de datos** — archivo `schema.sql` en la raíz del proyecto
  - [x] Script de creación de todas las tablas con tipos correctos
  - [x] Constraints (PK, FK, UNIQUE, NOT NULL, DEFAULT)
  - [x] Datos semilla: días de la semana, un profesor y un paralelo de prueba

### Fase 1 — Backend (.NET 10)

- [x] **Configuración inicial de la solución**
  - [x] Crear solución `.sln` con los 4 proyectos `.csproj`
  - [x] Configurar referencias entre proyectos según el orden de dependencias de capas
  - [x] Instalar paquetes NuGet en cada capa según las versiones especificadas en la sección de stack tecnológico

- [x] **Capa DataAccess**
  - [x] Entidades: `ProfesorEntity`, `EstudianteEntity`, `ParaleloEntity`, `ParaleloEstudianteEntity`, `DiaSemanaEntity`, `ClaseEntity`, `ClaseHorarioEntity`, `RegistroAsistenciaEntity`, `AsistenciaEntity`
  - [x] Configuraciones Fluent API para cada entidad
  - [x] `PresentechDbContext` con todos los `DbSet`
  - [x] Interfaces de repositorio para cada entidad
  - [x] Implementaciones de repositorios con CRUD base y consultas específicas
  - [x] `PagedResult.cs` para resultados paginados

- [x] **Capa DataManagement**
  - [x] `DataModel` por cada dominio relevante
  - [x] `Mapper` de entidad a DataModel por dominio
  - [x] `IDataService` e implementación por cada dominio
  - [x] `IUnitOfWork` y `UnitOfWork`

- [x] **Capa Business**
  - [x] DTOs de Auth: `LoginRequest`, `LoginResponse`
  - [x] DTOs de Clases: `ClaseResponse`, `ClaseHorarioResponse`
  - [x] DTOs de Asistencia: `RegistrarAsistenciaRequest`, `AsistenciaEstudianteDto`, `RegistroAsistenciaResponse`
  - [x] DTOs de Estudiante: `EstudianteResponse`, `ImportarEstudiantesRequest`
  - [x] Excepciones: `BusinessException`, `NotFoundException`, `UnauthorizedBusinessException`, `ValidationException`
  - [x] `AuthService` con generación y validación de JWT
  - [x] `ClaseService` con filtro por profesor autenticado
  - [x] `AsistenciaService` con cálculo automático de totales
  - [x] `EstudianteService` con lógica de procesamiento del archivo Excel
  - [x] Validators con FluentValidation por cada request

- [x] **Capa API**
  - [x] `AuthController`: `POST /api/v1/auth/login`
  - [x] `ClasesController`: `GET mis-clases`, `GET {id}/horario`, `GET {id}/estudiantes`
  - [x] `AsistenciasController`: `GET {idHorario}/{fecha}`, `POST`, `PUT {id}`
  - [x] `EstudiantesController`: `POST importar/{idParalelo}`
  - [x] `ApiResponse<T>` y `ApiErrorResponse`
  - [x] `ExceptionHandlingMiddleware`
  - [x] `ApiVersioningExtensions` con versión v1
  - [x] `AuthenticationExtensions` con JWT Bearer
  - [x] `CorsExtensions` para permitir el origen del frontend
  - [x] `SwaggerExtensions` con soporte de JWT en la UI
  - [x] `ServiceCollectionExtensions` para el registro de dependencias
  - [x] `Program.cs` con toda la configuración
  - [x] `appsettings.json` con string de conexión PostgreSQL y configuración JWT
  - [x] Prueba completa de todos los endpoints con Swagger UI

### Fase 2 — Frontend (React)

- [x] **Configuración inicial**
  - [x] Verificar proyecto Vite + React existente en `src/frontend`
  - [x] Instalar dependencias: Axios, React Router v6, React Big Calendar, SheetJS (xlsx), TailwindCSS
  - [x] Configurar Axios con base URL e interceptor de JWT en `services/api.js`
  - [x] Configurar React Router con rutas protegidas

- [x] **Componentes comunes**
  - [x] `Button` con variantes: primary, secondary, danger
  - [x] `Input` para texto y contraseña
  - [x] `Spinner` para indicador de carga
  - [x] `Modal` para confirmaciones
  - [x] `Badge` para estados: Presente, Ausente, Atrasado

- [x] **Layout**
  - [x] `Header` con nombre del docente y botón de cierre de sesión
  - [x] `BottomNav` para navegación móvil

- [x] **Módulo de Autenticación**
  - [x] `LoginPage` con formulario de correo y contraseña
  - [x] `AuthContext` para manejo del token JWT y datos del usuario en sesión
  - [x] Rutas protegidas que redirigen a `/login` si no hay sesión activa

- [x] **Módulo de Clases**
  - [x] `ClasesPage` con listado de clases del docente
  - [x] `ClaseCard` mostrando materia, paralelo y próxima clase
  - [x] Botón de importación Excel por clase usando SheetJS

- [x] **Módulo de Calendario**
  - [x] `CalendarioPage` con vista semanal de horarios de la clase seleccionada
  - [x] Al hacer clic en un bloque del día, navegar a la toma de asistencia

- [x] **Módulo de Asistencias**
  - [x] `AsistenciaPage` con listado de estudiantes del paralelo
  - [x] `AsistenciaItem` por alumno con acciones: Presente / Ausente / Atrasado
  - [x] Campo de justificativo cuando se marca como atrasado
  - [x] Campo de observaciones generales de la sesión
  - [x] Botón de envío con confirmación y resumen (X presentes / Y ausentes)
  - [x] Indicador de registro ya existente y modo edición si ya se tomó lista ese día

- [x] **Integración y pruebas**
  - [x] Conectar todos los servicios con el backend
  - [x] Prueba del flujo completo: Login → Clases → Calendario → Asistencia
  - [x] Prueba de importación de Excel con archivo de muestra
  - [x] Validar comportamiento en pantallas de 375px, 390px y 430px (móvil)

### Fase 3 — Portal Administrativo (Inspector) — PENDIENTE FASE FUTURA

- [ ] Definir requerimientos detallados del portal administrativo
- [ ] Diseño de módulos: reportes de asistencia, gestión de paralelos, gestión de profesores
- [ ] Implementación backend: endpoints para vistas administrativas con rol Inspector
- [ ] Implementación frontend: sección protegida por rol diferenciado del docente

---

*Última actualización: 2026-05-18*
*Documento base de desarrollo colaborativo — PresenTech, Colegios Fe y Alegría — PUCE 2025.*
