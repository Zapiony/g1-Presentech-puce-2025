namespace Presentech.Business.Exceptions
{
    public class UnauthorizedBusinessException : BusinessException
    {
        public UnauthorizedBusinessException(string message = "No tiene permisos para realizar esta acción.")
            : base(message) { }
    }
}
