using FluentValidation;
using Presentech.Business.DTOs.Estudiante;

namespace Presentech.Business.Validators
{
    public class ImportarEstudiantesRequestValidator : AbstractValidator<ImportarEstudiantesRequest>
    {
        public ImportarEstudiantesRequestValidator()
        {
            RuleFor(x => x.estudiantes)
                .NotEmpty().WithMessage("La lista de estudiantes no puede estar vacía.");

            RuleForEach(x => x.estudiantes).ChildRules(e =>
            {
                e.RuleFor(x => x.nombres)
                    .NotEmpty().WithMessage("El nombre del estudiante es requerido.");

                e.RuleFor(x => x.apellidos)
                    .NotEmpty().WithMessage("El apellido del estudiante es requerido.");
            });
        }
    }
}
