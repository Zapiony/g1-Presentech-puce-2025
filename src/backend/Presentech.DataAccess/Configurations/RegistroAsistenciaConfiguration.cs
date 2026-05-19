using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class RegistroAsistenciaConfiguration : IEntityTypeConfiguration<RegistroAsistenciaEntity>
    {
        public void Configure(EntityTypeBuilder<RegistroAsistenciaEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("registros_asistencia");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(r => r.id_registro)
                   .HasName("PK_REGISTROS_ASISTENCIA");

            builder.Property(r => r.id_registro)
                   .ValueGeneratedOnAdd();

            // =========================
            // DATOS DE LA SESIÓN
            // =========================
            builder.Property(r => r.fecha)
                   .IsRequired()
                   .HasColumnType("date");

            builder.Property(r => r.total_presentes)
                   .IsRequired()
                   .HasDefaultValue(0);

            builder.Property(r => r.total_ausentes)
                   .IsRequired()
                   .HasDefaultValue(0);

            builder.Property(r => r.observaciones_sesion);

            // =========================
            // AUDITORÍA
            // =========================
            builder.Property(r => r.created_at)
                   .IsRequired()
                   .HasColumnType("timestamp")
                   .HasDefaultValueSql("NOW()");

            // =========================
            // ÍNDICES / UNIQUE
            // =========================
            builder.HasIndex(r => new { r.id_horario, r.fecha })
                   .IsUnique()
                   .HasDatabaseName("UQ_REGISTRO_HORARIO_FECHA");

            // =========================
            // RELACIONES
            // =========================
            builder.HasMany(r => r.Asistencias)
                   .WithOne(a => a.RegistroAsistencia)
                   .HasForeignKey(a => a.id_registro)
                   .HasConstraintName("FK_ASISTENCIA_REGISTRO");
        }
    }
}
