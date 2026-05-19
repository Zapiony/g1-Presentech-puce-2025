namespace Presentech.DataAccess.Entities
{
    public class ParaleloEstudianteEntity
    {
        // =========================
        // CLAVE PRIMARIA
        // =========================
        public int id_paralelo_estudiante { get; set; }

        // =========================
        // CLAVES FORÁNEAS
        // =========================
        public int id_paralelo { get; set; }
        public int id_estudiante { get; set; }

        // =========================
        // ESTADO / CICLO DE VIDA
        // =========================
        public bool activo { get; set; }

        // =========================
        // NAVEGACIÓN
        // =========================
        public ParaleloEntity Paralelo { get; set; } = null!;
        public EstudianteEntity Estudiante { get; set; } = null!;
    }
}
