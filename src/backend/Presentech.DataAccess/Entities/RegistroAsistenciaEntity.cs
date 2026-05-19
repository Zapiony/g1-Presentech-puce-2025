namespace Presentech.DataAccess.Entities
{
    public class RegistroAsistenciaEntity
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_registro { get; set; }

        // =========================
        // CLAVE FORÁNEA
        // =========================
        public int id_horario { get; set; }

        // =========================
        // DATOS DE LA SESIÓN
        // =========================
        public DateOnly fecha { get; set; }
        public int total_presentes { get; set; }
        public int total_ausentes { get; set; }
        public string? observaciones_sesion { get; set; }

        // =========================
        // AUDITORÍA
        // =========================
        public DateTime created_at { get; set; }

        // =========================
        // NAVEGACIÓN
        // =========================
        public ClaseHorarioEntity ClaseHorario { get; set; } = null!;
        public ICollection<AsistenciaEntity> Asistencias { get; set; } = new List<AsistenciaEntity>();
    }
}
