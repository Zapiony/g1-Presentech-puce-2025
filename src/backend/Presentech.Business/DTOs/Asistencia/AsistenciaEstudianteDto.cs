namespace Presentech.Business.DTOs.Asistencia
{
    public class AsistenciaEstudianteDto
    {
        public int id_asistencia { get; set; }
        public int id_estudiante { get; set; }
        public string? nombres_estudiante { get; set; }
        public string? apellidos_estudiante { get; set; }
        public bool asistio { get; set; }
        public bool atrasado { get; set; }
        public string? justificativo { get; set; }
        public string? observaciones { get; set; }
    }
}
