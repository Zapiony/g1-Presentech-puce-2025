using Presentech.DataAccess.Entities;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Mappers
{
    public static class ParaleloDataMapper
    {
        // =========================
        // ENTITY → DATA MODEL
        // =========================
        public static ParaleloDataModel ToDataModel(ParaleloEntity entity)
        {
            return new ParaleloDataModel
            {
                id_paralelo      = entity.id_paralelo,
                nombre           = entity.nombre,
                descripcion      = entity.descripcion,
                capacidad_maxima = entity.capacidad_maxima,
                activo           = entity.activo,
                created_at       = entity.created_at,
            };
        }

        // =========================
        // DATA MODEL → ENTITY
        // =========================
        public static ParaleloEntity ToEntity(ParaleloDataModel model)
        {
            return new ParaleloEntity
            {
                id_paralelo      = model.id_paralelo,
                nombre           = model.nombre,
                descripcion      = model.descripcion,
                capacidad_maxima = model.capacidad_maxima,
                activo           = model.activo,
                created_at       = model.created_at,
            };
        }
    }
}
