namespace Presentech.Business.DTOs.Auth
{
    public class LoginResponse
    {
        public string token { get; set; } = string.Empty;
        public int id_profesor { get; set; }
        public string nombres { get; set; } = string.Empty;
        public string apellidos { get; set; } = string.Empty;
        public string correo_institucional { get; set; } = string.Empty;
    }
}
