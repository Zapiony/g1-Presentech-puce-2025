using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Interfaces
{
    public interface IEstudianteDataService
    {
        // =========================
        // CONSULTAS
        // =========================
        Task<IReadOnlyList<EstudianteDataModel>> ObtenerPorParaleloAsync(int id_paralelo, CancellationToken cancellationToken = default);
        Task<EstudianteDataModel?> ObtenerPorIdAsync(int id_estudiante, CancellationToken cancellationToken = default);

        // =========================
        // COMANDOS
        // =========================
        Task<EstudianteDataModel> CrearAsync(EstudianteDataModel model, CancellationToken cancellationToken = default);

        // =========================
        // IMPORTACIÓN EXCEL (reemplaza matrícula completa del paralelo)
        // =========================
        Task ImportarEstudiantesAsync(int id_paralelo, IEnumerable<EstudianteDataModel> estudiantes, CancellationToken cancellationToken = default);
    }
}
