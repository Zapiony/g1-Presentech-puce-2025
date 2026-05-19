using Presentech.DataAccess.Entities;
using Presentech.DataManagement.Models;

namespace Presentech.DataManagement.Mappers
{
    public static class ClaseDataMapper
    {
        // =========================
        // CLASE ENTITY → DATA MODEL
        // (requiere que Paralelo y ClasesHorario estén incluidos)
        // =========================
        public static ClaseDataModel ToDataModel(ClaseEntity entity)
        {
            return new ClaseDataModel
            {
                id_clase        = entity.id_clase,
                id_profesor     = entity.id_profesor,
                id_paralelo     = entity.id_paralelo,
                materia         = entity.materia,
                observaciones   = entity.observaciones,
                nombre_paralelo = entity.Paralelo?.nombre ?? string.Empty,
                activo          = entity.activo,
                created_at      = entity.created_at,
                horarios        = entity.ClasesHorario?
                                      .Select(ToHorarioDataModel)
                                      .OrderBy(h => h.orden_dia)
                                      .ThenBy(h => h.hora_inicio)
                                      .ToList()
                                  ?? new List<ClaseHorarioDataModel>(),
            };
        }

        // =========================
        // HORARIO ENTITY → DATA MODEL
        // (requiere que DiaSemana esté incluido)
        // =========================
        public static ClaseHorarioDataModel ToHorarioDataModel(ClaseHorarioEntity entity)
        {
            return new ClaseHorarioDataModel
            {
                id_horario   = entity.id_horario,
                id_clase     = entity.id_clase,
                id_dia       = entity.id_dia,
                nombre_dia   = entity.DiaSemana?.nombre ?? string.Empty,
                orden_dia    = entity.DiaSemana?.orden ?? 0,
                hora_inicio  = entity.hora_inicio,
                hora_fin     = entity.hora_fin,
            };
        }
    }
}
