using Presentech.DataAccess.Entities;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Mappers
{
    public static class AsistenciaDataMapper
    {
        // =========================
        // REGISTRO ENTITY → DATA MODEL
        // =========================
        public static RegistroAsistenciaDataModel ToRegistroDataModel(RegistroAsistenciaEntity entity)
        {
            return new RegistroAsistenciaDataModel
            {
                id_registro          = entity.id_registro,
                id_horario           = entity.id_horario,
                fecha                = entity.fecha,
                total_presentes      = entity.total_presentes,
                total_ausentes       = entity.total_ausentes,
                observaciones_sesion = entity.observaciones_sesion,
                created_at           = entity.created_at,
                asistencias          = entity.Asistencias?
                                           .Select(ToAsistenciaDataModel)
                                           .ToList()
                                       ?? new List<AsistenciaDataModel>(),
            };
        }

        // =========================
        // REGISTRO DATA MODEL → ENTITY
        // =========================
        public static RegistroAsistenciaEntity ToRegistroEntity(RegistroAsistenciaDataModel model)
        {
            return new RegistroAsistenciaEntity
            {
                id_registro          = model.id_registro,
                id_horario           = model.id_horario,
                fecha                = model.fecha,
                total_presentes      = model.total_presentes,
                total_ausentes       = model.total_ausentes,
                observaciones_sesion = model.observaciones_sesion,
                created_at           = model.created_at,
            };
        }

        // =========================
        // ASISTENCIA ENTITY → DATA MODEL
        // (requiere que Estudiante esté incluido)
        // =========================
        public static AsistenciaDataModel ToAsistenciaDataModel(AsistenciaEntity entity)
        {
            return new AsistenciaDataModel
            {
                id_asistencia       = entity.id_asistencia,
                id_registro         = entity.id_registro,
                id_estudiante       = entity.id_estudiante,
                nombres_estudiante  = entity.Estudiante?.nombres ?? string.Empty,
                apellidos_estudiante = entity.Estudiante?.apellidos ?? string.Empty,
                asistio             = entity.asistio,
                atrasado            = entity.atrasado,
                justificativo       = entity.justificativo,
                observaciones       = entity.observaciones,
            };
        }

        // =========================
        // ASISTENCIA DATA MODEL → ENTITY
        // =========================
        public static AsistenciaEntity ToAsistenciaEntity(AsistenciaDataModel model)
        {
            return new AsistenciaEntity
            {
                id_asistencia = model.id_asistencia,
                id_registro   = model.id_registro,
                id_estudiante = model.id_estudiante,
                asistio       = model.asistio,
                atrasado      = model.atrasado,
                justificativo = model.justificativo,
                observaciones = model.observaciones,
            };
        }
    }
}
