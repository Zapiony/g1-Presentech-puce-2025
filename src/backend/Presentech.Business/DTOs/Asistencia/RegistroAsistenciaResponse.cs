namespace Presentech.Business.DTOs.Asistencia
{
    public class RegistroAsistenciaResponse
    {
        public int id_registro { get; set; }
        public int id_horario { get; set; }
        public DateOnly fecha { get; set; }
        public int total_presentes { get; set; }
        public int total_ausentes { get; set; }
        public string? observaciones_sesion { get; set; }
        public List<AsistenciaEstudianteDto> asistencias { get; set; } = new();
    }
}
