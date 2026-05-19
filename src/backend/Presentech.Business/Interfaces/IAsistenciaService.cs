using Presentech.Business.DTOs.Asistencia;

namespace Presentech.Business.Interfaces
{
    public interface IAsistenciaService
    {
        Task<RegistroAsistenciaResponse?> ObtenerRegistroAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaResponse> RegistrarAsync(RegistrarAsistenciaRequest request, int id_profesor, CancellationToken cancellationToken = default);
        Task<RegistroAsistenciaResponse> ActualizarAsync(int id_registro, RegistrarAsistenciaRequest request, int id_profesor, CancellationToken cancellationToken = default);
    }
}
