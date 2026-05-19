using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Interfaces
{
    public interface IClaseDataService
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<IReadOnlyList<ClaseDataModel>> ObtenerPorProfesorAsync(int id_profesor, CancellationToken cancellationToken = default);
        Task<ClaseDataModel?> ObtenerPorIdAsync(int id_clase, CancellationToken cancellationToken = default);
        Task<ClaseDataModel?> ObtenerConHorarioAsync(int id_clase, CancellationToken cancellationToken = default);
    }
}
