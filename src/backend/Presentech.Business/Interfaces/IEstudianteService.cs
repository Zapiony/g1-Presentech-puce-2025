using Presentech.Business.DTOs.Estudiante;

namespace Presentech.Business.Interfaces
{
    public interface IEstudianteService
    {
        Task ImportarAsync(int id_paralelo, ImportarEstudiantesRequest request, CancellationToken cancellationToken = default);
    }
}
