using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Interfaces
{
    public interface IParaleloDataService
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<ParaleloDataModel?> ObtenerPorIdAsync(int id_paralelo, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<ParaleloDataModel>> ObtenerTodosActivosAsync(CancellationToken cancellationToken = default);
    }
}
