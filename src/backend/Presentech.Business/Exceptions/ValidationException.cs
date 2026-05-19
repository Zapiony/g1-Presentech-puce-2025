using FluentValidation.Results;

namespace Presentech.Business.Exceptions
{
    public class ValidationException : BusinessException
    {
        public IReadOnlyList<string> Errors { get; }

        public ValidationException(IEnumerable<ValidationFailure> failures)
            : base("Uno o más errores de validación ocurrieron.")
        {
            Errors = failures.Select(f => f.ErrorMessage).ToList();
        }
    }
}
