namespace Presentech.Business.DTOs.Profesor
{
    public class ProfesorResponse
    {
        public int id_profesor { get; set; }
        public string nombres { get; set; } = string.Empty;
        public string apellidos { get; set; } = string.Empty;
        public string correo_institucional { get; set; } = string.Empty;
        public string? especialidad { get; set; }
    }
}
