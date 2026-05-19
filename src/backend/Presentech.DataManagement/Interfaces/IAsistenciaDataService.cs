using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Interfaces
{
    public interface IAsistenciaDataService
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<RegistroAsistenciaDataModel?> ObtenerRegistroPorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaDataModel?> ObtenerRegistroPorIdAsync(int id_registro, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaDataModel?> ObtenerRegistroConAsistenciasAsync(int id_registro, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<RegistroAsistenciaDataModel>> ObtenerRegistrosPorClaseAsync(int id_clase, CancellationToken cancellationToken = default);

        // =========================
        // COMANDOS
        // =========================
        Task<RegistroAsistenciaDataModel> CrearRegistroAsync(RegistroAsistenciaDataModel registro, IEnumerable<AsistenciaDataModel> asistencias, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaDataModel?> ActualizarRegistroAsync(RegistroAsistenciaDataModel registro, IEnumerable<AsistenciaDataModel> asistencias, CancellationToken cancellationToken = default);

        // =========================
        // VALIDACIONES
        // =========================
        Task<bool> ExistePorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default);
    }
}
