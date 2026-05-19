namespace Presentech.Business.DTOs.Auth
{
    public class LoginRequest
    {
        public string correo_institucional { get; set; } = string.Empty;
        public string contrasena { get; set; } = string.Empty;
    }
}
