using Presentech.DataManagement.Interfaces;
using Presentech.DataManagement.Mappers;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Services
{
    public class ParaleloDataService : IParaleloDataService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ParaleloDataService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<ParaleloDataModel?> ObtenerPorIdAsync(int id_paralelo, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.ParaleloRepository.ObtenerPorIdAsync(id_paralelo, cancellationToken);
            return entity is null ? null : ParaleloDataMapper.ToDataModel(entity);
        }

        public async Task<IReadOnlyList<ParaleloDataModel>> ObtenerTodosActivosAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _unitOfWork.ParaleloRepository.ObtenerTodosActivosAsync(cancellationToken);
            return entities.Select(ParaleloDataMapper.ToDataModel).ToList();
        }
    }
}
