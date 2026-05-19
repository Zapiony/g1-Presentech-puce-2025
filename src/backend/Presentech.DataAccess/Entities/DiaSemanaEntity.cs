namespace Presentech.DataAccess.Entities
{
    public class DiaSemanaEntity
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_dia { get; set; }

        // =========================
        // DATOS DEL DÍA
        // =========================
        public string nombre { get; set; } = null!;
        public int orden { get; set; }

        // =========================
        // NAVEGACIÓN
        // =========================
        public ICollection<ClaseHorarioEntity> ClasesHorario { get; set; } = new List<ClaseHorarioEntity>();
    }
}
