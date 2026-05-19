using Presentech.Business.DTOs.Asistencia;
using Presentech.Business.Exceptions;
using Presentech.Business.Interfaces;
using Presentech.Business.Mappers;
using Presentech.Business.Validators;
using Presentech.DataManagement.Interfaces;
using Presentech.DataManagement.Models;

namespace Presentech.Business.Services
{
    public class AsistenciaService : IAsistenciaService
    {
        private readonly IAsistenciaDataService _asistenciaDataService;
        private readonly IClaseDataService _claseDataService;
        private readonly IClaseHorarioDataService _claseHorarioDataService;
        private readonly RegistrarAsistenciaRequestValidator _validator;

        public AsistenciaService(
            IAsistenciaDataService asistenciaDataService,
            IClaseDataService claseDataService,
            IClaseHorarioDataService claseHorarioDataService)
        {
            _asistenciaDataService   = asistenciaDataService;
            _claseDataService        = claseDataService;
            _claseHorarioDataService = claseHorarioDataService;
            _validator               = new RegistrarAsistenciaRequestValidator();
        }

        public async Task<RegistroAsistenciaResponse?> ObtenerRegistroAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default)
        {
            var header = await _asistenciaDataService.ObtenerRegistroPorHorarioYFechaAsync(id_horario, fecha, cancellationToken);
            if (header is null) return null;

            var registro = await _asistenciaDataService.ObtenerRegistroConAsistenciasAsync(header.id_registro, cancellationToken);
            return registro is null ? null : AsistenciaBusinessMapper.ToResponse(registro);
        }

        public async Task<RegistroAsistenciaResponse> RegistrarAsync(RegistrarAsistenciaRequest request, int id_profesor, CancellationToken cancellationToken = default)
        {
            var result = await _validator.ValidateAsync(request, cancellationToken);
            if (!result.IsValid)
                throw new ValidationException(result.Errors);

            await VerificarPropietarioHorarioAsync(request.id_horario, id_profesor, cancellationToken);

            if (await _asistenciaDataService.ExistePorHorarioYFechaAsync(request.id_horario, request.fecha, cancellationToken))
                throw new BusinessException($"Ya existe un registro de asistencia para ese horario en la fecha {request.fecha:yyyy-MM-dd}.");

            var registroModel = new RegistroAsistenciaDataModel
            {
                id_horario           = request.id_horario,
                fecha                = request.fecha,
                observaciones_sesion = request.observaciones_sesion,
            };

            var asistenciasModels = request.asistencias.Select(AsistenciaBusinessMapper.ToDataModel).ToList();

            var creado = await _asistenciaDataService.CrearRegistroAsync(registroModel, asistenciasModels, cancellationToken);

            var completo = await _asistenciaDataService.ObtenerRegistroConAsistenciasAsync(creado.id_registro, cancellationToken);
            return AsistenciaBusinessMapper.ToResponse(completo!);
        }

        public async Task<RegistroAsistenciaResponse> ActualizarAsync(int id_registro, RegistrarAsistenciaRequest request, int id_profesor, CancellationToken cancellationToken = default)
        {
            var result = await _validator.ValidateAsync(request, cancellationToken);
            if (!result.IsValid)
                throw new ValidationException(result.Errors);

            await VerificarPropietarioHorarioAsync(request.id_horario, id_profesor, cancellationToken);

            var registroModel = new RegistroAsistenciaDataModel
            {
                id_registro          = id_registro,
                id_horario           = request.id_horario,
                fecha                = request.fecha,
                observaciones_sesion = request.observaciones_sesion,
            };

            var asistenciasModels = request.asistencias.Select(AsistenciaBusinessMapper.ToDataModel).ToList();

            var actualizado = await _asistenciaDataService.ActualizarRegistroAsync(registroModel, asistenciasModels, cancellationToken);
            if (actualizado is null) throw new NotFoundException("Registro de asistencia", id_registro);

            var completo = await _asistenciaDataService.ObtenerRegistroConAsistenciasAsync(actualizado.id_registro, cancellationToken);
            return AsistenciaBusinessMapper.ToResponse(completo!);
        }

        private async Task VerificarPropietarioHorarioAsync(int id_horario, int id_profesor, CancellationToken cancellationToken)
        {
            var horario = await _claseHorarioDataService.ObtenerPorIdAsync(id_horario, cancellationToken);
            if (horario is null) throw new NotFoundException("Horario de clase", id_horario);

            var clase = await _claseDataService.ObtenerPorIdAsync(horario.id_clase, cancellationToken);
            if (clase is null || clase.id_profesor != id_profesor)
                throw new UnauthorizedBusinessException();
        }
    }
}
