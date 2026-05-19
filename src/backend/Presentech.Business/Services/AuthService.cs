using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Presentech.Business.DTOs.Auth;
using Presentech.Business.Exceptions;
using Presentech.Business.Interfaces;
using Presentech.Business.Models;
using Presentech.Business.Validators;
using Presentech.DataManagement.Interfaces;

namespace Presentech.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly IProfesorDataService _profesorDataService;
        private readonly JwtSettings _jwtSettings;
        private readonly LoginRequestValidator _validator;

        public AuthService(IProfesorDataService profesorDataService, JwtSettings jwtSettings)
        {
            _profesorDataService = profesorDataService;
            _jwtSettings         = jwtSettings;
            _validator           = new LoginRequestValidator();
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
        {
            var result = await _validator.ValidateAsync(request, cancellationToken);
            if (!result.IsValid)
                throw new ValidationException(result.Errors);

            var profesor = await _profesorDataService.ObtenerPorCorreoAsync(request.correo_institucional, cancellationToken);

            if (profesor is null || !profesor.activo || !BCrypt.Net.BCrypt.Verify(request.contrasena, profesor.contrasena_hash))
                throw new UnauthorizedBusinessException("Correo o contraseña incorrectos.");

            return new LoginResponse
            {
                token                = GenerarToken(profesor.id_profesor, profesor.correo_institucional),
                id_profesor          = profesor.id_profesor,
                nombres              = profesor.nombres,
                apellidos            = profesor.apellidos,
                correo_institucional = profesor.correo_institucional,
            };
        }

        private string GenerarToken(int id_profesor, string correo)
        {
            var key         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, id_profesor.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, correo),
                new Claim("id_profesor", id_profesor.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer:             _jwtSettings.Issuer,
                audience:           _jwtSettings.Audience,
                claims:             claims,
                expires:            DateTime.UtcNow.AddHours(_jwtSettings.ExpirationHours),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
