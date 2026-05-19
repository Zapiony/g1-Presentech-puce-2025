using Presentech.DataManagement.Interfaces;
using Presentech.DataManagement.Mappers;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Services
{
    public class AsistenciaDataService : IAsistenciaDataService
    {
        private readonly IUnitOfWork _unitOfWork;

        public AsistenciaDataService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<RegistroAsistenciaDataModel?> ObtenerRegistroPorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.RegistroAsistenciaRepository.ObtenerPorHorarioYFechaAsync(id_horario, fecha, cancellationToken);
            return entity is null ? null : AsistenciaDataMapper.ToRegistroDataModel(entity);
        }

        public async Task<RegistroAsistenciaDataModel?> ObtenerRegistroPorIdAsync(int id_registro, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.RegistroAsistenciaRepository.ObtenerPorIdAsync(id_registro, cancellationToken);
            return entity is null ? null : AsistenciaDataMapper.ToRegistroDataModel(entity);
        }

        public async Task<RegistroAsistenciaDataModel?> ObtenerRegistroConAsistenciasAsync(int id_registro, CancellationToken cancellationToken = default)
        {
            var entity = await _unitOfWork.RegistroAsistenciaRepository.ObtenerConAsistenciasAsync(id_registro, cancellationToken);
            return entity is null ? null : AsistenciaDataMapper.ToRegistroDataModel(entity);
        }

        public async Task<IReadOnlyList<RegistroAsistenciaDataModel>> ObtenerRegistrosPorClaseAsync(int id_clase, CancellationToken cancellationToken = default)
        {
            var entities = await _unitOfWork.RegistroAsistenciaRepository.ObtenerPorClaseAsync(id_clase, cancellationToken);
            return entities.Select(AsistenciaDataMapper.ToRegistroDataModel).ToList();
        }

        // =========================
        // COMANDOS
        // =========================
        public async Task<RegistroAsistenciaDataModel> CrearRegistroAsync(RegistroAsistenciaDataModel registro, IEnumerable<AsistenciaDataModel> asistencias, CancellationToken cancellationToken = default)
        {
            var asistenciasList = asistencias.ToList();

            // Calcular totales antes de persistir
            registro.total_presentes = asistenciasList.Count(a => a.asistio || a.atrasado);
            registro.total_ausentes  = asistenciasList.Count(a => !a.asistio && !a.atrasado);

            var registroEntity = AsistenciaDataMapper.ToRegistroEntity(registro);
            await _unitOfWork.RegistroAsistenciaRepository.AgregarAsync(registroEntity, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            var asistenciaEntities = asistenciasList.Select(a =>
            {
                var entity = AsistenciaDataMapper.ToAsistenciaEntity(a);
                entity.id_registro = registroEntity.id_registro;
                return entity;
            });

            await _unitOfWork.AsistenciaRepository.AgregarRangoAsync(asistenciaEntities, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            registro.id_registro = registroEntity.id_registro;
            return registro;
        }

        public async Task<RegistroAsistenciaDataModel?> ActualizarRegistroAsync(RegistroAsistenciaDataModel registro, IEnumerable<AsistenciaDataModel> asistencias, CancellationToken cancellationToken = default)
        {
            var registroEntity = await _unitOfWork.RegistroAsistenciaRepository.ObtenerParaActualizarAsync(registro.id_registro, cancellationToken);

            if (registroEntity is null)
                return null;

            var asistenciasList = asistencias.ToList();

            // Recalcular totales
            registroEntity.total_presentes      = asistenciasList.Count(a => a.asistio || a.atrasado);
            registroEntity.total_ausentes        = asistenciasList.Count(a => !a.asistio && !a.atrasado);
            registroEntity.observaciones_sesion  = registro.observaciones_sesion;

            _unitOfWork.RegistroAsistenciaRepository.Actualizar(registroEntity);

            // Actualizar cada asistencia individual por id
            var asistenciaEntities = asistenciasList
                .Select(a =>
                {
                    var entity = AsistenciaDataMapper.ToAsistenciaEntity(a);
                    entity.id_registro = registro.id_registro;
                    return entity;
                })
                .ToList();

            _unitOfWork.AsistenciaRepository.ActualizarRango(asistenciaEntities);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return AsistenciaDataMapper.ToRegistroDataModel(registroEntity);
        }

        // =========================
        // VALIDACIONES
        // =========================
        public async Task<bool> ExistePorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default)
        {
            return await _unitOfWork.RegistroAsistenciaRepository.ExistePorHorarioYFechaAsync(id_horario, fecha, cancellationToken);
        }
    }
}
