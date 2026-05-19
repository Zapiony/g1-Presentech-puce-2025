-- =============================================================================
-- PresenTech -- DDL Base de Datos
-- Colegios Fe y Alegría
-- PostgreSQL 16
-- =============================================================================

-- =============================================================================
-- LIMPIEZA (útil para re-ejecución en entornos de desarrollo)
-- =============================================================================

DROP TABLE IF EXISTS asistencias              CASCADE;
DROP TABLE IF EXISTS registros_asistencia     CASCADE;
DROP TABLE IF EXISTS clases_horario           CASCADE;
DROP TABLE IF EXISTS clases                   CASCADE;
DROP TABLE IF EXISTS paralelo_estudiantes     CASCADE;
DROP TABLE IF EXISTS estudiantes              CASCADE;
DROP TABLE IF EXISTS paralelos                CASCADE;
DROP TABLE IF EXISTS dias_semana              CASCADE;
DROP TABLE IF EXISTS profesores               CASCADE;

-- =============================================================================
-- TABLA: profesores
-- Almacena los datos personales y de acceso de cada docente.
-- =============================================================================

CREATE TABLE profesores (
    id_profesor             SERIAL          PRIMARY KEY,
    nombres                 VARCHAR(100)    NOT NULL,
    apellidos               VARCHAR(100)    NOT NULL,
    correo_institucional    VARCHAR(150)    NOT NULL,
    contrasena_hash         VARCHAR(255)    NOT NULL,
    telefono                VARCHAR(20),
    especialidad            VARCHAR(100),
    activo                  BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_profesores_correo UNIQUE (correo_institucional)
);

-- =============================================================================
-- TABLA: estudiantes
-- Almacena los datos básicos de cada alumno.
-- Los estudiantes se asocian a paralelos mediante paralelo_estudiantes.
-- =============================================================================

CREATE TABLE estudiantes (
    id_estudiante   SERIAL          PRIMARY KEY,
    nombres         VARCHAR(100)    NOT NULL,
    apellidos       VARCHAR(100)    NOT NULL,
    activo          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- TABLA: paralelos
-- Representa un grupo de clase (ej: "Ciencias - 2do Bachillerato A").
-- =============================================================================

CREATE TABLE paralelos (
    id_paralelo         SERIAL          PRIMARY KEY,
    nombre              VARCHAR(150)    NOT NULL,
    descripcion         TEXT,
    capacidad_maxima    INT             NOT NULL,
    activo              BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- TABLA: paralelo_estudiantes
-- Matrícula: relación N:M entre paralelos y estudiantes.
-- La baja es lógica (activo = FALSE) para conservar el historial de asistencias.
-- =============================================================================

CREATE TABLE paralelo_estudiantes (
    id_paralelo_estudiante  SERIAL      PRIMARY KEY,
    id_paralelo             INT         NOT NULL,
    id_estudiante           INT         NOT NULL,
    activo                  BOOLEAN     NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_pe_paralelo    FOREIGN KEY (id_paralelo)   REFERENCES paralelos   (id_paralelo),
    CONSTRAINT fk_pe_estudiante  FOREIGN KEY (id_estudiante) REFERENCES estudiantes (id_estudiante),
    CONSTRAINT uq_pe_paralelo_estudiante UNIQUE (id_paralelo, id_estudiante)
);

-- =============================================================================
-- TABLA: dias_semana
-- Catálogo fijo: Lunes a Viernes.
-- Se pobla con datos semilla al final de este script.
-- =============================================================================

CREATE TABLE dias_semana (
    id_dia  SERIAL          PRIMARY KEY,
    nombre  VARCHAR(20)     NOT NULL,
    orden   INT             NOT NULL,

    CONSTRAINT uq_dias_semana_orden UNIQUE (orden)
);

-- =============================================================================
-- TABLA: clases
-- Asignación de un profesor a un paralelo para una materia específica.
-- Un mismo profesor puede tener múltiples clases (distintas materias o paralelos).
-- =============================================================================

CREATE TABLE clases (
    id_clase        SERIAL          PRIMARY KEY,
    id_profesor     INT             NOT NULL,
    id_paralelo     INT             NOT NULL,
    materia         VARCHAR(100)    NOT NULL,
    observaciones   TEXT,
    activo          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_clases_profesor FOREIGN KEY (id_profesor) REFERENCES profesores (id_profesor),
    CONSTRAINT fk_clases_paralelo FOREIGN KEY (id_paralelo) REFERENCES paralelos  (id_paralelo)
);

-- =============================================================================
-- TABLA: clases_horario
-- Define en qué día y a qué hora se dicta cada clase de forma recurrente.
-- Un clase puede tener varios horarios (ej: Lunes y Miércoles).
-- =============================================================================

CREATE TABLE clases_horario (
    id_horario      SERIAL  PRIMARY KEY,
    id_clase        INT     NOT NULL,
    id_dia          INT     NOT NULL,
    hora_inicio     TIME    NOT NULL,
    hora_fin        TIME    NOT NULL,

    CONSTRAINT fk_horario_clase FOREIGN KEY (id_clase) REFERENCES clases      (id_clase),
    CONSTRAINT fk_horario_dia   FOREIGN KEY (id_dia)   REFERENCES dias_semana (id_dia),
    CONSTRAINT chk_horario_horas CHECK (hora_fin > hora_inicio)
);

-- =============================================================================
-- TABLA: registros_asistencia
-- Cabecera de cada sesión en la que se tomó lista.
-- Una sola sesión por horario y fecha (no se puede duplicar).
-- Los totales se calculan en la capa de negocio al guardar.
-- =============================================================================

CREATE TABLE registros_asistencia (
    id_registro         SERIAL      PRIMARY KEY,
    id_horario          INT         NOT NULL,
    fecha               DATE        NOT NULL,
    total_presentes     INT         NOT NULL DEFAULT 0,
    total_ausentes      INT         NOT NULL DEFAULT 0,
    observaciones_sesion TEXT,
    created_at          TIMESTAMP   NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_registro_horario FOREIGN KEY (id_horario) REFERENCES clases_horario (id_horario),
    CONSTRAINT uq_registro_horario_fecha UNIQUE (id_horario, fecha)
);

-- =============================================================================
-- TABLA: asistencias
-- Detalle de asistencia por alumno para cada sesión registrada.
-- Si atrasado = TRUE, el campo justificativo debería estar presente.
-- Por regla de negocio, atrasado cuenta como presente.
-- =============================================================================

CREATE TABLE asistencias (
    id_asistencia   SERIAL      PRIMARY KEY,
    id_registro     INT         NOT NULL,
    id_estudiante   INT         NOT NULL,
    asistio         BOOLEAN     NOT NULL,
    atrasado        BOOLEAN     NOT NULL DEFAULT FALSE,
    justificativo   TEXT,
    observaciones   TEXT,

    CONSTRAINT fk_asistencia_registro   FOREIGN KEY (id_registro)   REFERENCES registros_asistencia (id_registro),
    CONSTRAINT fk_asistencia_estudiante FOREIGN KEY (id_estudiante) REFERENCES estudiantes          (id_estudiante)
);

-- =============================================================================
-- ÍNDICES
-- Mejoran el rendimiento de las consultas más frecuentes del sistema.
-- =============================================================================

-- Consulta principal del portal docente: clases por profesor
CREATE INDEX idx_clases_id_profesor    ON clases               (id_profesor);
CREATE INDEX idx_clases_id_paralelo    ON clases               (id_paralelo);

-- Búsqueda de horarios por clase
CREATE INDEX idx_clases_horario_clase  ON clases_horario       (id_clase);

-- Consulta de asistencias por sesión
CREATE INDEX idx_asistencias_registro  ON asistencias          (id_registro);

-- Búsqueda de estudiantes activos por paralelo
CREATE INDEX idx_pe_paralelo_activo    ON paralelo_estudiantes (id_paralelo, activo);

-- =============================================================================
-- DATOS SEMILLA
-- =============================================================================

-- Días de la semana (catálogo fijo, no cambia)
INSERT INTO dias_semana (nombre, orden) VALUES
    ('Lunes',     1),
    ('Martes',    2),
    ('Miércoles', 3),
    ('Jueves',    4),
    ('Viernes',   5);

-- Profesor de prueba
-- Contraseña: Test1234! (hash bcrypt de ejemplo — reemplazar con hash real en producción)
INSERT INTO profesores (nombres, apellidos, correo_institucional, contrasena_hash, telefono, especialidad)
VALUES (
    'Carlos',
    'Mendoza',
    'cmendoza@feyalegria.edu.ec',
    '$2a$12$examplehashplaceholderXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    '0991234567',
    'Ciencias Naturales'
);

-- Paralelo de prueba
INSERT INTO paralelos (nombre, descripcion, capacidad_maxima)
VALUES (
    'Ciencias - Segundo de Bachillerato A',
    'Paralelo A del Segundo Año de Bachillerato, especialidad Ciencias',
    35
);

-- Clase de prueba: profesor 1 → paralelo 1, materia Biología
INSERT INTO clases (id_profesor, id_paralelo, materia)
VALUES (1, 1, 'Biología');

-- Horarios de la clase de prueba: Lunes 08:00-09:00 y Miércoles 08:00-09:00
INSERT INTO clases_horario (id_clase, id_dia, hora_inicio, hora_fin)
VALUES
    (1, 1, '08:00', '09:00'),  -- Lunes
    (1, 3, '08:00', '09:00');  -- Miércoles

-- Estudiantes de prueba para el paralelo
INSERT INTO estudiantes (nombres, apellidos) VALUES
    ('Ana',      'García'),
    ('Luis',     'Torres'),
    ('María',    'Rodríguez'),
    ('Sebastián','Vargas'),
    ('Camila',   'Flores');

-- Matrícula de los 5 estudiantes en el paralelo de prueba
INSERT INTO paralelo_estudiantes (id_paralelo, id_estudiante) VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);
