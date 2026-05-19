using Presentech.DataAccess.Entities;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Mappers
{
    public static class ProfesorDataMapper
    {
        // =========================
        // ENTITY → DATA MODEL
        // =========================
        public static ProfesorDataModel ToDataModel(ProfesorEntity entity)
        {
            return new ProfesorDataModel
            {
                id_profesor          = entity.id_profesor,
                nombres              = entity.nombres,
                apellidos            = entity.apellidos,
                correo_institucional = entity.correo_institucional,
                telefono             = entity.telefono,
                especialidad         = entity.especialidad,
                contrasena_hash      = entity.contrasena_hash,
                activo               = entity.activo,
                created_at           = entity.created_at,
            };
        }

        // =========================
        // DATA MODEL → ENTITY
        // =========================
        public static ProfesorEntity ToEntity(ProfesorDataModel model)
        {
            return new ProfesorEntity
            {
                id_profesor          = model.id_profesor,
                nombres              = model.nombres,
                apellidos            = model.apellidos,
                correo_institucional = model.correo_institucional,
                telefono             = model.telefono,
                especialidad         = model.especialidad,
                contrasena_hash      = model.contrasena_hash,
                activo               = model.activo,
                created_at           = model.created_at,
            };
        }
    }
}
