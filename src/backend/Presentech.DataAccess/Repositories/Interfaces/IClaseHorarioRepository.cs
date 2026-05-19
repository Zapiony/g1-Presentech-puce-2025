using Presentech.DataAccess.Entities;

namespace Presentech.DataAccess.Repositories.Interfaces
{
    public interface IClaseHorarioRepository
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<IReadOnlyList<ClaseHorarioEntity>> ObtenerPorClaseAsync(int id_clase, CancellationToken cancellationToken = default);
        Task<ClaseHorarioEntity?> ObtenerPorIdAsync(int id_horario, CancellationToken cancellationToken = default);

        // =========================
        // COMANDOS
        // =========================
        Task AgregarAsync(ClaseHorarioEntity horario, CancellationToken cancellationToken = default);
        void Actualizar(ClaseHorarioEntity horario);
    }
}
