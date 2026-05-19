namespace Presentech.Business.DTOs.Clase
{
    public class ClaseResponse
    {
        public int id_clase { get; set; }
        public int id_paralelo { get; set; }
        public string materia { get; set; } = string.Empty;
        public string nombre_paralelo { get; set; } = string.Empty;
        public List<ClaseHorarioResponse> horarios { get; set; } = new();
    }
}
