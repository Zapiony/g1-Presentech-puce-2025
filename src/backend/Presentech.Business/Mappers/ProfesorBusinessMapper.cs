using Presentech.Business.DTOs.Profesor;
using Presentech.DataManagement.Models;

namespace Presentech.Business.Mappers
{
    public static class ProfesorBusinessMapper
    {
        public static ProfesorResponse ToResponse(ProfesorDataModel model) => new()
        {
            id_profesor            = model.id_profesor,
            nombres                = model.nombres,
            apellidos              = model.apellidos,
            correo_institucional   = model.correo_institucional,
            especialidad           = model.especialidad,
        };
    }
}
