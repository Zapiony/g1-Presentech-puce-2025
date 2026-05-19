using Presentech.DataManagement.Interfaces;
using Presentech.DataManagement.Mappers;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Services
{
    public class ProfesorDataService : IProfesorDataService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProfesorDataService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<ProfesorDataModel?> ObtenerPorIdAsync(int id_profesor, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.ProfesorRepository.ObtenerPorIdAsync(id_profesor, cancellationToken);
            return entity is null ? null : ProfesorDataMapper.ToDataModel(entity);
        }

        public async Task<ProfesorDataModel?> ObtenerPorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.ProfesorRepository.ObtenerPorCorreoAsync(correo_institucional, cancellationToken);
            return entity is null ? null : ProfesorDataMapper.ToDataModel(entity);
        }

        // =========================
        // VALIDACIONES
        // =========================
        public async Task<bool> ExistePorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default)
        {
            return await _unitOfWork.ProfesorRepository.ExistePorCorreoAsync(correo_institucional, cancellationToken);
        }
    }
}
