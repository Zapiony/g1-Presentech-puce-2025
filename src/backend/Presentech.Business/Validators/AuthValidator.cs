using FluentValidation;
using Presentech.Business.DTOs.Auth;

namespace Presentech.Business.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.correo_institucional)
                .NotEmpty().WithMessage("El correo institucional es requerido.")
                .EmailAddress().WithMessage("El formato del correo no es válido.");

            RuleFor(x => x.contrasena)
                .NotEmpty().WithMessage("La contraseña es requerida.");
        }
    }
}
