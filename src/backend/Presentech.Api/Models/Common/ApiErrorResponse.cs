namespace Presentech.Api.Models.Common;

public class ApiErrorResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = null!;
    public IReadOnlyCollection<string> Errors { get; set; } = Array.Empty<string>();

    public static ApiErrorResponse Fail(string message, IReadOnlyCollection<string>? errors = null) =>
        new() { Success = false, Message = message, Errors = errors ?? Array.Empty<string>() };
}
