using Presentech.DataAccess.Context;
using Presentech.DataAccess.Entities;
using Presentech.DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Presentech.DataAccess.Repositories
{
    public class ClaseHorarioRepository : IClaseHorarioRepository
    {
        private readonly PresentechDbContext _context;

        public ClaseHorarioRepository(PresentechDbContext context)
        {
            _context = context;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<IReadOnlyList<ClaseHorarioEntity>> ObtenerPorClaseAsync(int id_clase, CancellationToken cancellationToken = default)
        {
            return await _context.ClasesHorario
                .AsNoTracking()
                .Include(ch => ch.DiaSemana)
                .Where(ch => ch.id_clase == id_clase)
                .OrderBy(ch => ch.DiaSemana.orden)
                .ThenBy(ch => ch.hora_inicio)
                .ToListAsync(cancellationToken);
        }

        public async Task<ClaseHorarioEntity?> ObtenerPorIdAsync(int id_horario, CancellationToken cancellationToken = default)
        {
            return await _context.ClasesHorario
                .AsNoTracking()
                .Include(ch => ch.DiaSemana)
                .FirstOrDefaultAsync(ch => ch.id_horario == id_horario, cancellationToken);
        }

        // =========================
        // COMANDOS
        // =========================
        public async Task AgregarAsync(ClaseHorarioEntity horario, CancellationToken cancellationToken = default)
        {
            await _context.ClasesHorario.AddAsync(horario, cancellationToken);
        }

        public void Actualizar(ClaseHorarioEntity horario)
        {
            _context.ClasesHorario.Update(horario);
        }
    }
}
