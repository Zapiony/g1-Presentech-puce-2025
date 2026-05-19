namespace Presentech.DataManagement.Models
{
    public class RegistroAsistenciaDataModel
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
        // DETALLE DE ASISTENCIAS (cargado bajo demanda)
        // =========================
        public List<AsistenciaDataModel> asistencias { get; set; } = new();
    }
}
