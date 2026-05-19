using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentech.Api.Controllers.V1;
using Presentech.Api.Models.Common;
using Presentech.Business.DTOs.Clase;
using Presentech.Business.DTOs.Estudiante;
using Presentech.Business.Interfaces;

namespace Presentech.Api.Controllers.V1.Clases;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/clases")]
[Authorize]
public class ClasesController : PresentechBaseController
{
    private readonly IClaseService _claseService;

    public ClasesController(IClaseService claseService)
    {
        _claseService = claseService;
    }

    /// <summary>Devuelve todas las clases asignadas al profesor autenticado.</summary>
    [HttpGet("mis-clases")]
    [ProducesResponseType(typeof(ApiResponse<IReadOnlyList<ClaseResponse>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ObtenerMisClases(CancellationToken cancellationToken)
    {
        var result = await _claseService.ObtenerMisClasesAsync(IdProfesor, cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<ClaseResponse>>.Ok(result, "Consulta exitosa."));
    }

    /// <summary>Devuelve una clase con su horario semanal completo.</summary>
    [HttpGet("{id:int}/horario")]
    [ProducesResponseType(typeof(ApiResponse<ClaseResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ObtenerHorario(int id, CancellationToken cancellationToken)
    {
        var result = await _claseService.ObtenerConHorarioAsync(id, IdProfesor, cancellationToken);
        return Ok(ApiResponse<ClaseResponse>.Ok(result, "Consulta exitosa."));
    }

    /// <summary>Devuelve el listado de estudiantes activos del paralelo de la clase.</summary>
    [HttpGet("{id:int}/estudiantes")]
    [ProducesResponseType(typeof(ApiResponse<IReadOnlyList<EstudianteResponse>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ObtenerEstudiantes(int id, CancellationToken cancellationToken)
    {
        var result = await _claseService.ObtenerEstudiantesAsync(id, IdProfesor, cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<EstudianteResponse>>.Ok(result, "Consulta exitosa."));
    }
}
