namespace Presentech.DataManagement.Models
{
    public class ParaleloDataModel
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_paralelo { get; set; }

        // =========================
        // DATOS DEL PARALELO
        // =========================
        public string nombre { get; set; } = null!;
        public string? descripcion { get; set; }
        public int capacidad_maxima { get; set; }

        // =========================
        // ESTADO / CICLO DE VIDA
        // =========================
        public bool activo { get; set; }
        public DateTime created_at { get; set; }
    }
}
