using FluentValidation;
using Presentech.Business.DTOs.Asistencia;

namespace Presentech.Business.Validators
{
    public class RegistrarAsistenciaRequestValidator : AbstractValidator<RegistrarAsistenciaRequest>
    {
        public RegistrarAsistenciaRequestValidator()
        {
            RuleFor(x => x.id_horario)
                .GreaterThan(0).WithMessage("El id_horario debe ser mayor a 0.");

            RuleFor(x => x.fecha)
                .NotEmpty().WithMessage("La fecha es requerida.");

            RuleFor(x => x.asistencias)
                .NotEmpty().WithMessage("La lista de asistencias no puede estar vacía.");

            RuleForEach(x => x.asistencias).ChildRules(a =>
            {
                a.RuleFor(x => x.id_estudiante)
                    .GreaterThan(0).WithMessage("El id_estudiante debe ser mayor a 0.");

                a.RuleFor(x => x.justificativo)
                    .NotEmpty()
                    .When(x => x.atrasado)
                    .WithMessage("El justificativo es requerido cuando el estudiante está marcado como atrasado.");
            });
        }
    }
}
