using Presentech.Business.DTOs.Clase;
using Presentech.Business.DTOs.Estudiante;
using Presentech.Business.Exceptions;
using Presentech.Business.Interfaces;
using Presentech.Business.Mappers;
using Presentech.DataManagement.Interfaces;

namespace Presentech.Business.Services
{
    public class ClaseService : IClaseService
    {
        private readonly IClaseDataService _claseDataService;
        private readonly IEstudianteDataService _estudianteDataService;

        public ClaseService(IClaseDataService claseDataService, IEstudianteDataService estudianteDataService)
        {
            _claseDataService      = claseDataService;
            _estudianteDataService = estudianteDataService;
        }

        public async Task<IReadOnlyList<ClaseResponse>> ObtenerMisClasesAsync(int id_profesor, CancellationToken cancellationToken = default)
        {
            var clases = await _claseDataService.ObtenerPorProfesorAsync(id_profesor, cancellationToken);
            return clases.Select(ClaseBusinessMapper.ToResponse).ToList();
        }

        public async Task<ClaseResponse> ObtenerConHorarioAsync(int id_clase, int id_profesor, CancellationToken cancellationToken = default)
        {
            var clase = await _claseDataService.ObtenerConHorarioAsync(id_clase, cancellationToken);

            if (clase is null) throw new NotFoundException("Clase", id_clase);
            if (clase.id_profesor != id_profesor) throw new UnauthorizedBusinessException();

            return ClaseBusinessMapper.ToResponse(clase);
        }

        public async Task<IReadOnlyList<EstudianteResponse>> ObtenerEstudiantesAsync(int id_clase, int id_profesor, CancellationToken cancellationToken = default)
        {
            var clase = await _claseDataService.ObtenerPorIdAsync(id_clase, cancellationToken);

            if (clase is null) throw new NotFoundException("Clase", id_clase);
            if (clase.id_profesor != id_profesor) throw new UnauthorizedBusinessException();

            var estudiantes = await _estudianteDataService.ObtenerPorParaleloAsync(clase.id_paralelo, cancellationToken);
            return estudiantes.Select(EstudianteBusinessMapper.ToResponse).ToList();
        }
    }
}
