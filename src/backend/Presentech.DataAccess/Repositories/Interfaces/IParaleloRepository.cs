using Presentech.DataAccess.Entities;

namespace Presentech.DataAccess.Repositories.Interfaces
{
    public interface IParaleloRepository
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<ParaleloEntity?> ObtenerPorIdAsync(int id_paralelo, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<ParaleloEntity>> ObtenerTodosActivosAsync(CancellationToken cancellationToken = default);

        // =========================
        // COMANDOS
        // =========================
        Task AgregarAsync(ParaleloEntity paralelo, CancellationToken cancellationToken = default);
        void Actualizar(ParaleloEntity paralelo);
    }
}
