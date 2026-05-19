using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class AsistenciaConfiguration : IEntityTypeConfiguration<AsistenciaEntity>
    {
        public void Configure(EntityTypeBuilder<AsistenciaEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("asistencias");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(a => a.id_asistencia)
                   .HasName("PK_ASISTENCIAS");

            builder.Property(a => a.id_asistencia)
                   .ValueGeneratedOnAdd();

            // =========================
            // DATOS DE ASISTENCIA
            // =========================
            builder.Property(a => a.asistio)
                   .IsRequired();

            builder.Property(a => a.atrasado)
                   .IsRequired()
                   .HasDefaultValue(false);

            builder.Property(a => a.justificativo);

            builder.Property(a => a.observaciones);

            // =========================
            // ÍNDICES
            // =========================
            builder.HasIndex(a => a.id_registro)
                   .HasDatabaseName("IDX_ASISTENCIAS_REGISTRO");

            // =========================
            // RELACIONES
            // =========================
            builder.HasOne(a => a.Estudiante)
                   .WithMany(e => e.Asistencias)
                   .HasForeignKey(a => a.id_estudiante)
                   .HasConstraintName("FK_ASISTENCIA_ESTUDIANTE");
        }
    }
}
