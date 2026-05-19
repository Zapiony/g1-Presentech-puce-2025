using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Interfaces
{
    public interface IProfesorDataService
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<ProfesorDataModel?> ObtenerPorIdAsync(int id_profesor, CancellationToken cancellationToken = default);
        Task<ProfesorDataModel?> ObtenerPorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default);

        // =========================
        // VALIDACIONES
        // =========================
        Task<bool> ExistePorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default);
    }
}
