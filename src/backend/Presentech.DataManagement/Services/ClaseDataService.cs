using Presentech.DataManagement.Interfaces;
using Presentech.DataManagement.Mappers;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Services
{
    public class ClaseDataService : IClaseDataService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ClaseDataService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<IReadOnlyList<ClaseDataModel>> ObtenerPorProfesorAsync(int id_profesor, CancellationToken cancellationToken = default)
        {
            var entities = await _unitOfWork.ClaseRepository.ObtenerPorProfesorAsync(id_profesor, cancellationToken);
            return entities.Select(ClaseDataMapper.ToDataModel).ToList();
        }

        public async Task<ClaseDataModel?> ObtenerPorIdAsync(int id_clase, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.ClaseRepository.ObtenerPorIdAsync(id_clase, cancellationToken);
            return entity is null ? null : ClaseDataMapper.ToDataModel(entity);
        }

        public async Task<ClaseDataModel?> ObtenerConHorarioAsync(int id_clase, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.ClaseRepository.ObtenerConHorarioAsync(id_clase, cancellationToken);
            return entity is null ? null : ClaseDataMapper.ToDataModel(entity);
        }
    }
}
