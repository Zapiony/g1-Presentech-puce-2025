using Presentech.DataAccess.Context;
using Presentech.DataAccess.Repositories;
using Presentech.DataAccess.Repositories.Interfaces;
using Presentech.DataManagement.Interfaces;

namespace Presentech.DataManagement.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PresentechDbContext _context;

        // =========================
        // REPOSITORIES — DOMINIO PRESENTECH
        // =========================
        private IProfesorRepository?           _profesorRepository;
        private IEstudianteRepository?         _estudianteRepository;
        private IParaleloRepository?           _paraleloRepository;
        private IClaseRepository?              _claseRepository;
        private IClaseHorarioRepository?       _claseHorarioRepository;
        private IRegistroAsistenciaRepository? _registroAsistenciaRepository;
        private IAsistenciaRepository?         _asistenciaRepository;

        public UnitOfWork(PresentechDbContext context)
        {
            _context = context;
        }

        // =========================
        // PROPIEDADES — REPOSITORIES
        // =========================
        public IProfesorRepository ProfesorRepository =>
            _profesorRepository ??= new ProfesorRepository(_context);

        public IEstudianteRepository EstudianteRepository =>
            _estudianteRepository ??= new EstudianteRepository(_context);

        public IParaleloRepository ParaleloRepository =>
            _paraleloRepository ??= new ParaleloRepository(_context);

        public IClaseRepository ClaseRepository =>
            _claseRepository ??= new ClaseRepository(_context);

        public IClaseHorarioRepository ClaseHorarioRepository =>
            _claseHorarioRepository ??= new ClaseHorarioRepository(_context);

        public IRegistroAsistenciaRepository RegistroAsistenciaRepository =>
            _registroAsistenciaRepository ??= new RegistroAsistenciaRepository(_context);

        public IAsistenciaRepository AsistenciaRepository =>
            _asistenciaRepository ??= new AsistenciaRepository(_context);

        // =========================
        // SAVE CHANGES
        // =========================
        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }

        // =========================
        // DISPOSE
        // =========================
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
