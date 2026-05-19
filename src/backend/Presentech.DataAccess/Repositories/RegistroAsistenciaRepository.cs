using Presentech.DataAccess.Context;
using Presentech.DataAccess.Entities;
using Presentech.DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Presentech.DataAccess.Repositories
{
    public class RegistroAsistenciaRepository : IRegistroAsistenciaRepository
    {
        private readonly PresentechDbContext _context;

        public RegistroAsistenciaRepository(PresentechDbContext context)
        {
            _context = context;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<RegistroAsistenciaEntity?> ObtenerPorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default)
        {
            return await _context.RegistrosAsistencia
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.id_horario == id_horario && r.fecha == fecha, cancellationToken);
        }

        public async Task<RegistroAsistenciaEntity?> ObtenerPorIdAsync(int id_registro, CancellationToken cancellationToken = default)
        {
            return await _context.RegistrosAsistencia
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.id_registro == id_registro, cancellationToken);
        }

        public async Task<RegistroAsistenciaEntity?> ObtenerConAsistenciasAsync(int id_registro, CancellationToken cancellationToken = default)
        {
            return await _context.RegistrosAsistencia
                .AsNoTracking()
                .Include(r => r.Asistencias)
                    .ThenInclude(a => a.Estudiante)
                .FirstOrDefaultAsync(r => r.id_registro == id_registro, cancellationToken);
        }

        public async Task<RegistroAsistenciaEntity?> ObtenerParaActualizarAsync(int id_registro, CancellationToken cancellationToken = default)
        {
            return await _context.RegistrosAsistencia
                .FirstOrDefaultAsync(r => r.id_registro == id_registro, cancellationToken);
        }

        public async Task<IReadOnlyList<RegistroAsistenciaEntity>> ObtenerPorClaseAsync(int id_clase, CancellationToken cancellationToken = default)
        {
            return await _context.RegistrosAsistencia
                .AsNoTracking()
                .Include(r => r.ClaseHorario)
                .Where(r => r.ClaseHorario.id_clase == id_clase)
                .OrderByDescending(r => r.fecha)
                .ToListAsync(cancellationToken);
        }

        // =========================
        // COMANDOS
        // =========================
        public async Task AgregarAsync(RegistroAsistenciaEntity registro, CancellationToken cancellationToken = default)
        {
            await _context.RegistrosAsistencia.AddAsync(registro, cancellationToken);
        }

        public void Actualizar(RegistroAsistenciaEntity registro)
        {
            _context.RegistrosAsistencia.Update(registro);
        }

        // =========================
        // VALIDACIONES
        // =========================
        public async Task<bool> ExistePorHorarioYFechaAsync(int id_horario, DateOnly fecha, CancellationToken cancellationToken = default)
        {
            return await _context.RegistrosAsistencia
                .AsNoTracking()
                .AnyAsync(r => r.id_horario == id_horario && r.fecha == fecha, cancellationToken);
        }
    }
}
