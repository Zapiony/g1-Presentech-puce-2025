using Presentech.Business.DTOs.Estudiante;
using Presentech.Business.Exceptions;
using Presentech.Business.Interfaces;
using Presentech.Business.Mappers;
using Presentech.Business.Validators;
using Presentech.DataManagement.Interfaces;

namespace Presentech.Business.Services
{
    public class EstudianteService : IEstudianteService
    {
        private readonly IEstudianteDataService _estudianteDataService;
        private readonly IParaleloDataService _paraleloDataService;
        private readonly ImportarEstudiantesRequestValidator _validator;

        public EstudianteService(IEstudianteDataService estudianteDataService, IParaleloDataService paraleloDataService)
        {
            _estudianteDataService = estudianteDataService;
            _paraleloDataService   = paraleloDataService;
            _validator             = new ImportarEstudiantesRequestValidator();
        }

        public async Task ImportarAsync(int id_paralelo, ImportarEstudiantesRequest request, CancellationToken cancellationToken = default)
        {
            var result = await _validator.ValidateAsync(request, cancellationToken);
            if (!result.IsValid)
                throw new ValidationException(result.Errors);

            var paralelo = await _paraleloDataService.ObtenerPorIdAsync(id_paralelo, cancellationToken);
            if (paralelo is null) throw new NotFoundException("Paralelo", id_paralelo);

            var estudiantesDataModels = request.estudiantes.Select(EstudianteBusinessMapper.ToDataModel);
            await _estudianteDataService.ImportarEstudiantesAsync(id_paralelo, estudiantesDataModels, cancellationToken);
        }
    }
}
