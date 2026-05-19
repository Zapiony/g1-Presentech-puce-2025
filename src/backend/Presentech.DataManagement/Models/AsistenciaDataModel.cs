namespace Presentech.DataManagement.Models
{
    public class AsistenciaDataModel
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
        // DATOS DEL ESTUDIANTE (desnormalizados para la UI)
        // =========================
        public string nombres_estudiante { get; set; } = null!;
        public string apellidos_estudiante { get; set; } = null!;

        // =========================
        // DATOS DE ASISTENCIA
        // =========================
        public bool asistio { get; set; }
        public bool atrasado { get; set; }
        public string? justificativo { get; set; }
        public string? observaciones { get; set; }
    }
}
