using Presentech.DataAccess.Context;
using Presentech.DataAccess.Entities;
using Presentech.DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Presentech.DataAccess.Repositories
{
    public class ParaleloRepository : IParaleloRepository
    {
        private readonly PresentechDbContext _context;

        public ParaleloRepository(PresentechDbContext context)
        {
            _context = context;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<ParaleloEntity?> ObtenerPorIdAsync(int id_paralelo, CancellationToken cancellationToken = default)
        {
            return await _context.Paralelos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.id_paralelo == id_paralelo && p.activo, cancellationToken);
        }

        public async Task<IReadOnlyList<ParaleloEntity>> ObtenerTodosActivosAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Paralelos
                .AsNoTracking()
                .Where(p => p.activo)
                .OrderBy(p => p.nombre)
                .ToListAsync(cancellationToken);
        }

        // =========================
        // COMANDOS
        // =========================
        public async Task AgregarAsync(ParaleloEntity paralelo, CancellationToken cancellationToken = default)
        {
            await _context.Paralelos.AddAsync(paralelo, cancellationToken);
        }

        public void Actualizar(ParaleloEntity paralelo)
        {
            _context.Paralelos.Update(paralelo);
        }
    }
}
