namespace Presentech.DataAccess.Entities
{
    public class AsistenciaEntity
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_asistencia { get; set; }

        // =========================
        // CLAVES FORÁNEAS
        // =========================
        public int id_registro { get; set; }
        public int id_estudiante { get; set; }

        // =========================
        // DATOS DE ASISTENCIA
        // =========================
        public bool asistio { get; set; }
        public bool atrasado { get; set; }
        public string? justificativo { get; set; }
        public string? observaciones { get; set; }

        // =========================
        // NAVEGACIÓN
        // =========================
        public RegistroAsistenciaEntity RegistroAsistencia { get; set; } = null!;
        public EstudianteEntity Estudiante { get; set; } = null!;
    }
}
