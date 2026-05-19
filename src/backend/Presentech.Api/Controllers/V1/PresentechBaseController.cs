using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Presentech.Business.Exceptions;

namespace Presentech.Api.Controllers.V1;

public abstract class PresentechBaseController : ControllerBase
{
    protected int IdProfesor =>
        int.TryParse(User.FindFirstValue("id_profesor"), out var id) && id > 0
            ? id
            : throw new UnauthorizedBusinessException("Token inválido: no contiene id_profesor.");
}
