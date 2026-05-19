using Presentech.Business.DTOs.Estudiante;
using Presentech.DataManagement.Models;

namespace Presentech.Business.Mappers
{
    public static class EstudianteBusinessMapper
    {
        public static EstudianteResponse ToResponse(EstudianteDataModel model) => new()
        {
            id_estudiante = model.id_estudiante,
            nombres       = model.nombres,
            apellidos     = model.apellidos,
        };

        public static EstudianteDataModel ToDataModel(EstudianteImportDto dto) => new()
        {
            nombres   = dto.nombres,
            apellidos = dto.apellidos,
            activo    = true,
        };
    }
}
