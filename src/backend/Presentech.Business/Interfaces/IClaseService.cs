using Presentech.Business.DTOs.Clase;
using Presentech.Business.DTOs.Estudiante;

namespace Presentech.Business.Interfaces
{
    public interface IClaseService
    {
        Task<IReadOnlyList<ClaseResponse>> ObtenerMisClasesAsync(int id_profesor, CancellationToken cancellationToken = default);
        Task<ClaseResponse> ObtenerConHorarioAsync(int id_clase, int id_profesor, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<EstudianteResponse>> ObtenerEstudiantesAsync(int id_clase, int id_profesor, CancellationToken cancellationToken = default);
    }
}
