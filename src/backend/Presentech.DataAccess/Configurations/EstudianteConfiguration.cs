using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class EstudianteConfiguration : IEntityTypeConfiguration<EstudianteEntity>
    {
        public void Configure(EntityTypeBuilder<EstudianteEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("estudiantes");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(e => e.id_estudiante)
                   .HasName("PK_ESTUDIANTES");

            builder.Property(e => e.id_estudiante)
                   .ValueGeneratedOnAdd();

            // =========================
            // DATOS PERSONALES
            // =========================
            builder.Property(e => e.nombres)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(e => e.apellidos)
                   .IsRequired()
                   .HasMaxLength(100);

            // =========================
            // ESTADO / CICLO DE VIDA
            // =========================
            builder.Property(e => e.activo)
                   .IsRequired()
                   .HasDefaultValue(true);

            // =========================
            // AUDITORÍA
            // =========================
            builder.Property(e => e.created_at)
                   .IsRequired()
                   .HasColumnType("timestamp")
                   .HasDefaultValueSql("NOW()");
        }
    }
}
