namespace Presentech.DataAccess.Entities
{
    public class ClaseHorarioEntity
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
        // HORARIO
        // =========================
        public TimeOnly hora_inicio { get; set; }
        public TimeOnly hora_fin { get; set; }

        // =========================
        // NAVEGACIÓN
        // =========================
        public ClaseEntity Clase { get; set; } = null!;
        public DiaSemanaEntity DiaSemana { get; set; } = null!;
        public ICollection<RegistroAsistenciaEntity> RegistrosAsistencia { get; set; } = new List<RegistroAsistenciaEntity>();
    }
}
