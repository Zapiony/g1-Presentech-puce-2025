using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Interfaces
{
    public interface IClaseHorarioDataService
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<ClaseHorarioDataModel?> ObtenerPorIdAsync(int id_horario, CancellationToken cancellationToken = default);
    }
}
