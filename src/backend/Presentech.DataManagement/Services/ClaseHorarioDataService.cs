using Presentech.DataManagement.Interfaces;
using Presentech.DataManagement.Mappers;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Services
{
    public class ClaseHorarioDataService : IClaseHorarioDataService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ClaseHorarioDataService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<ClaseHorarioDataModel?> ObtenerPorIdAsync(int id_horario, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.ClaseHorarioRepository.ObtenerPorIdAsync(id_horario, cancellationToken);
            return entity is null ? null : ClaseDataMapper.ToHorarioDataModel(entity);
        }
    }
}
