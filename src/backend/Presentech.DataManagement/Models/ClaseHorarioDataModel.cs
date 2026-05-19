namespace Presentech.DataManagement.Models
{
    public class ClaseHorarioDataModel
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_horario { get; set; }

        // =========================
        // CLAVES FORÁNEAS
        // =========================
        public int id_clase { get; set; }
        public int id_dia { get; set; }

        // =========================
        // DATOS DEL DÍA (desnormalizados para la UI)
        // =========================
        public string nombre_dia { get; set; } = null!;
        public int orden_dia { get; set; }

        // =========================
        // HORARIO
        // =========================
        public TimeOnly hora_inicio { get; set; }
        public TimeOnly hora_fin { get; set; }
    }
}
