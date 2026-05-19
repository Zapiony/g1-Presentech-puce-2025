using Presentech.DataAccess.Entities;

namespace Presentech.DataAccess.Repositories.Interfaces
{
    public interface IClaseRepository
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<IReadOnlyList<ClaseEntity>> ObtenerPorProfesorAsync(int id_profesor, CancellationToken cancellationToken = default);
        Task<ClaseEntity?> ObtenerPorIdAsync(int id_clase, CancellationToken cancellationToken = default);
        Task<ClaseEntity?> ObtenerConHorarioAsync(int id_clase, CancellationToken cancellationToken = default);

        // =========================
        // COMANDOS
        // =========================
        Task AgregarAsync(ClaseEntity clase, CancellationToken cancellationToken = default);
        void Actualizar(ClaseEntity clase);
    }
}
