using Presentech.Business.DTOs.Asistencia;
using Presentech.DataManagement.Models;

namespace Presentech.Business.Mappers
{
    public static class AsistenciaBusinessMapper
    {
        public static RegistroAsistenciaResponse ToResponse(RegistroAsistenciaDataModel model) => new()
        {
            id_registro          = model.id_registro,
            id_horario           = model.id_horario,
            fecha                = model.fecha,
            total_presentes      = model.total_presentes,
            total_ausentes       = model.total_ausentes,
            observaciones_sesion = model.observaciones_sesion,
            asistencias          = model.asistencias.Select(ToDto).ToList(),
        };

        public static AsistenciaEstudianteDto ToDto(AsistenciaDataModel model) => new()
        {
            id_asistencia       = model.id_asistencia,
            id_estudiante       = model.id_estudiante,
            nombres_estudiante  = model.nombres_estudiante,
            apellidos_estudiante = model.apellidos_estudiante,
            asistio             = model.asistio,
            atrasado            = model.atrasado,
            justificativo       = model.justificativo,
            observaciones       = model.observaciones,
        };

        public static AsistenciaDataModel ToDataModel(AsistenciaEstudianteDto dto) => new()
        {
            id_asistencia        = dto.id_asistencia,
            id_registro          = 0,
            id_estudiante        = dto.id_estudiante,
            nombres_estudiante   = string.Empty,
            apellidos_estudiante = string.Empty,
            asistio              = dto.asistio,
            atrasado             = dto.atrasado,
            justificativo        = dto.justificativo,
            observaciones        = dto.observaciones,
        };
    }
}
