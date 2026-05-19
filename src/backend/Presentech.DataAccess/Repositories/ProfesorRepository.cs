using Presentech.DataAccess.Context;
using Presentech.DataAccess.Entities;
using Presentech.DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Presentech.DataAccess.Repositories
{
    public class ProfesorRepository : IProfesorRepository
    {
        private readonly PresentechDbContext _context;

        public ProfesorRepository(PresentechDbContext context)
        {
            _context = context;
        }

        // =========================
        // CONSULTAS
        // =========================
        public async Task<ProfesorEntity?> ObtenerPorIdAsync(int id_profesor, CancellationToken cancellationToken = default)
        {
            return await _context.Profesores
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.id_profesor == id_profesor && p.activo, cancellationToken);
        }

        public async Task<ProfesorEntity?> ObtenerPorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default)
        {
            return await _context.Profesores
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.correo_institucional == correo_institucional && p.activo, cancellationToken);
        }

        public async Task<ProfesorEntity?> ObtenerParaActualizarAsync(int id_profesor, CancellationToken cancellationToken = default)
        {
            return await _context.Profesores
                .FirstOrDefaultAsync(p => p.id_profesor == id_profesor && p.activo, cancellationToken);
        }

        // =========================
        // COMANDOS
        // =========================
        public async Task AgregarAsync(ProfesorEntity profesor, CancellationToken cancellationToken = default)
        {
            await _context.Profesores.AddAsync(profesor, cancellationToken);
        }

        public void Actualizar(ProfesorEntity profesor)
        {
            _context.Profesores.Update(profesor);
        }

        // =========================
        // VALIDACIONES
        // =========================
        public async Task<bool> ExistePorCorreoAsync(string correo_institucional, CancellationToken cancellationToken = default)
        {
            return await _context.Profesores
                .AsNoTracking()
                .AnyAsync(p => p.correo_institucional == correo_institucional, cancellationToken);
        }
    }
}
