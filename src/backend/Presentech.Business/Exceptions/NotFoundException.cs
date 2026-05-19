namespace Presentech.Business.Exceptions
{
    public class NotFoundException : BusinessException
    {
        public NotFoundException(string recurso, object id)
            : base($"{recurso} con id '{id}' no fue encontrado.") { }
    }
}
