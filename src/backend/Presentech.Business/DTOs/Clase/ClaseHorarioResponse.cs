namespace Presentech.Business.DTOs.Clase
{
    public class ClaseHorarioResponse
    {
        public int id_horario { get; set; }
        public string nombre_dia { get; set; } = string.Empty;
        public int orden_dia { get; set; }
        public TimeOnly hora_inicio { get; set; }
        public TimeOnly hora_fin { get; set; }
    }
}
