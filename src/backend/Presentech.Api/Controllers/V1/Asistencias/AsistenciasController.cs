using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentech.Api.Controllers.V1;
using Presentech.Api.Models.Common;
using Presentech.Business.DTOs.Asistencia;
using Presentech.Business.Interfaces;

namespace Presentech.Api.Controllers.V1.Asistencias;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/asistencias")]
[Authorize]
public class AsistenciasController : PresentechBaseController
{
    private readonly IAsistenciaService _asistenciaService;

    public AsistenciasController(IAsistenciaService asistenciaService)
    {
        _asistenciaService = asistenciaService;
    }

    /// <summary>Obtiene el registro de asistencia para un horario y fecha dados. Retorna null si no existe.</summary>
    [HttpGet("{idHorario:int}/{fecha}")]
    [ProducesResponseType(typeof(ApiResponse<RegistroAsistenciaResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ObtenerRegistro(
        int idHorario,
        DateOnly fecha,
        CancellationToken cancellationToken)
    {
        var result = await _asistenciaService.ObtenerRegistroAsync(idHorario, fecha, cancellationToken);
        return Ok(ApiResponse<RegistroAsistenciaResponse?>.Ok(result, "Consulta exitosa."));
    }

    /// <summary>Registra la asistencia de una sesión de clase.</summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<RegistroAsistenciaResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Registrar(
        [FromBody] RegistrarAsistenciaRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _asistenciaService.RegistrarAsync(request, IdProfesor, cancellationToken);
        return Ok(ApiResponse<RegistroAsistenciaResponse>.Ok(result, "Registro de asistencia creado exitosamente."));
    }

    /// <summary>Actualiza un registro de asistencia existente.</summary>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<RegistroAsistenciaResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ApiErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Actualizar(
        int id,
        [FromBody] RegistrarAsistenciaRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _asistenciaService.ActualizarAsync(id, request, IdProfesor, cancellationToken);
        return Ok(ApiResponse<RegistroAsistenciaResponse>.Ok(result, "Registro de asistencia actualizado exitosamente."));
    }
}
