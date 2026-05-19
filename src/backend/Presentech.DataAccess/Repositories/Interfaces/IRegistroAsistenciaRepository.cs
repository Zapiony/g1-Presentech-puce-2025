using Presentech.DataAccess.Entities;

namespace Presentech.DataAccess.Repositories.Interfaces
{
    public interface IRegistroAsistenciaRepository
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<RegistroAsistenciaEntity?> ObtenerPorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaEntity?> ObtenerPorIdAsync(int id_registro, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaEntity?> ObtenerConAsistenciasAsync(int id_registro, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaEntity?> ObtenerParaActualizarAsync(int id_registro, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<RegistroAsistenciaEntity>> ObtenerPorClaseAsync(int id_clase, CancellationToken cancellationToken = default);

        // =========================
        // COMANDOS
        // =========================
        Task AgregarAsync(RegistroAsistenciaEntity registro, CancellationToken cancellationToken = default);
        void Actualizar(RegistroAsistenciaEntity registro);

        // =========================
        // VALIDACIONES
        // =========================
        Task<bool> ExistePorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default);
    }
}
