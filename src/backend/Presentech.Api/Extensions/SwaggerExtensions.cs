using Microsoft.OpenApi.Models;

namespace Presentech.Api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title       = "PresenTech API",
                Version     = "v1",
                Description = "API REST del Sistema de Asistencias PresenTech — Portal Docente"
            });

            var securityScheme = new OpenApiSecurityScheme
            {
                Name          = "Authorization",
                Description   = "Ingrese el token JWT con el prefijo Bearer. Ejemplo: Bearer {token}",
                In            = ParameterLocation.Header,
                Type          = SecuritySchemeType.Http,
                Scheme        = "bearer",
                BearerFormat  = "JWT",
                Reference     = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id   = "Bearer"
                }
            };

            options.AddSecurityDefinition("Bearer", securityScheme);

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { securityScheme, Array.Empty<string>() }
            });
        });

        return services;
    }
}
