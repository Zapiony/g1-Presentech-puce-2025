using Presentech.DataAccess.Entities;

namespace Presentech.DataAccess.Repositories.Interfaces
{
    public interface IProfesorRepository
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<ProfesorEntity?> ObtenerPorIdAsync(int id_profesor, CancellationToken cancellationToken = default);
        Task<ProfesorEntity?> ObtenerPorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default);
        Task<ProfesorEntity?> ObtenerParaActualizarAsync(int id_profesor, CancellationToken cancellationToken = default);

        // =========================
        // COMANDOS
        // =========================
        Task AgregarAsync(ProfesorEntity profesor, CancellationToken cancellationToken = default);
        void Actualizar(ProfesorEntity profesor);

        // =========================
        // VALIDACIONES
        // =========================
        Task<bool> ExistePorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default);
    }
}
