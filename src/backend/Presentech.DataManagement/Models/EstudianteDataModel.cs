namespace Presentech.DataManagement.Models
{
    public class EstudianteDataModel
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_estudiante { get; set; }

        // =========================
        // DATOS PERSONALES
        // =========================
        public string nombres { get; set; } = null!;
        public string apellidos { get; set; } = null!;

        // =========================
        // ESTADO / CICLO DE VIDA
        // =========================
        public bool activo { get; set; }
        public DateTime created_at { get; set; }
    }
}
