namespace Presentech.DataManagement.Models
{
    public class ClaseDataModel
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_clase { get; set; }

        // =========================
        // CLAVES FORÁNEAS
        // =========================
        public int id_profesor { get; set; }
        public int id_paralelo { get; set; }

        // =========================
        // DATOS DE LA CLASE
        // =========================
        public string materia { get; set; } = null!;
        public string? observaciones { get; set; }

        // =========================
        // DATOS DESNORMALIZADOS (del paralelo, para la UI)
        // =========================
        public string nombre_paralelo { get; set; } = null!;

        // =========================
        // ESTADO / CICLO DE VIDA
        // =========================
        public bool activo { get; set; }
        public DateTime created_at { get; set; }

        // =========================
        // HORARIOS DE LA CLASE
        // =========================
        public List<ClaseHorarioDataModel> horarios { get; set; } = new();
    }
}
