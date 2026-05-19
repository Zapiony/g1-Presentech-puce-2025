using System.Net;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Presentech.Api.Models.Common;
using Presentech.Business.Exceptions;

namespace Presentech.Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next   = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            await WriteErrorAsync(context, HttpStatusCode.BadRequest,
                ApiErrorResponse.Fail(ex.Message, ex.Errors));
        }
        catch (NotFoundException ex)
        {
            await WriteErrorAsync(context, HttpStatusCode.NotFound,
                ApiErrorResponse.Fail(ex.Message));
        }
        catch (UnauthorizedBusinessException ex)
        {
            await WriteErrorAsync(context, HttpStatusCode.Unauthorized,
                ApiErrorResponse.Fail(ex.Message));
        }
        catch (BusinessException ex)
        {
            await WriteErrorAsync(context, HttpStatusCode.BadRequest,
                ApiErrorResponse.Fail(ex.Message));
        }
        catch (DbUpdateException ex)
            when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
        {
            var mensaje = ExtraerMensajeUnicidad(pgEx.ConstraintName ?? pgEx.MessageText);
            await WriteErrorAsync(context, HttpStatusCode.Conflict,
                ApiErrorResponse.Fail(mensaje));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error interno no controlado en {Method} {Path}",
                context.Request.Method, context.Request.Path);

            var mensaje = $"{ex.GetType().Name}: {ex.Message}";
            if (ex.InnerException is not null)
                mensaje += $" | Inner: {ex.InnerException.GetType().Name}: {ex.InnerException.Message}";

            await WriteErrorAsync(context, HttpStatusCode.InternalServerError,
                ApiErrorResponse.Fail(mensaje));
        }

        // ── RESPUESTAS HTTP SIN EXCEPCIÓN (401 / 403) ──────────────────────
        if (!context.Response.HasStarted)
        {
            if (context.Response.StatusCode == (int)HttpStatusCode.Unauthorized)
            {
                await WriteErrorAsync(context, HttpStatusCode.Unauthorized,
                    ApiErrorResponse.Fail("No autenticado. Debe enviar un token JWT válido en el header Authorization."));
            }
            else if (context.Response.StatusCode == (int)HttpStatusCode.Forbidden)
            {
                await WriteErrorAsync(context, HttpStatusCode.Forbidden,
                    ApiErrorResponse.Fail("Acceso denegado. No tiene permisos suficientes para ejecutar esta acción."));
            }
        }
    }

    // =========================
    // MENSAJES DE UNICIDAD — DOMINIO PRESENTECH
    // =========================
    private static string ExtraerMensajeUnicidad(string constraintName)
    {
        if (constraintName.Contains("uq_profesores_correo"))
            return "Ya existe un profesor registrado con ese correo institucional.";

        if (constraintName.Contains("uq_pe_paralelo_estudiante"))
            return "Este estudiante ya está matriculado en ese paralelo.";

        if (constraintName.Contains("uq_registro_horario_fecha"))
            return "Ya existe un registro de asistencia para ese horario y fecha.";

        return "Ya existe un registro con los mismos datos únicos. Verifique los campos e intente nuevamente.";
    }

    private static async Task WriteErrorAsync(
        HttpContext context,
        HttpStatusCode statusCode,
        ApiErrorResponse response)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode  = (int)statusCode;

        var json = JsonSerializer.Serialize(response);
        await context.Response.WriteAsync(json);
    }
}
