namespace Presentech.Business.DTOs.Asistencia
{
    public class RegistrarAsistenciaRequest
    {
        public int id_horario { get; set; }
        public DateOnly fecha { get; set; }
        public string? observaciones_sesion { get; set; }
        public List<AsistenciaEstudianteDto> asistencias { get; set; } = new();
    }
}
