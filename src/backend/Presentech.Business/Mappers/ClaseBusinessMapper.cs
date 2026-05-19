using Presentech.Business.DTOs.Clase;
using Presentech.DataManagement.Models;

namespace Presentech.Business.Mappers
{
    public static class ClaseBusinessMapper
    {
        public static ClaseResponse ToResponse(ClaseDataModel model) => new()
        {
            id_clase        = model.id_clase,
            id_paralelo     = model.id_paralelo,
            materia         = model.materia,
            nombre_paralelo = model.nombre_paralelo,
            horarios        = model.horarios.Select(ToHorarioResponse).ToList(),
        };

        public static ClaseHorarioResponse ToHorarioResponse(ClaseHorarioDataModel model) => new()
        {
            id_horario  = model.id_horario,
            nombre_dia  = model.nombre_dia,
            orden_dia   = model.orden_dia,
            hora_inicio = model.hora_inicio,
            hora_fin    = model.hora_fin,
        };
    }
}
