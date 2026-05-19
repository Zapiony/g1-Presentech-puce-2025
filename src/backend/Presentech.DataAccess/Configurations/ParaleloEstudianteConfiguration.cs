using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class ParaleloEstudianteConfiguration : IEntityTypeConfiguration<ParaleloEstudianteEntity>
    {
        public void Configure(EntityTypeBuilder<ParaleloEstudianteEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("paralelo_estudiantes");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(pe => pe.id_paralelo_estudiante)
                   .HasName("PK_PARALELO_ESTUDIANTES");

            builder.Property(pe => pe.id_paralelo_estudiante)
                   .ValueGeneratedOnAdd();

            // =========================
            // ESTADO / CICLO DE VIDA
            // =========================
            builder.Property(pe => pe.activo)
                   .IsRequired()
                   .HasDefaultValue(true);

            // =========================
            // ÍNDICES / UNIQUE
            // =========================
            builder.HasIndex(pe => new { pe.id_paralelo, pe.id_estudiante })
                   .IsUnique()
                   .HasDatabaseName("UQ_PE_PARALELO_ESTUDIANTE");

            // =========================
            // RELACIONES
            // =========================
            builder.HasOne(pe => pe.Paralelo)
                   .WithMany(p => p.ParaleloEstudiantes)
                   .HasForeignKey(pe => pe.id_paralelo)
                   .HasConstraintName("FK_PE_PARALELO");

            builder.HasOne(pe => pe.Estudiante)
                   .WithMany(e => e.ParaleloEstudiantes)
                   .HasForeignKey(pe => pe.id_estudiante)
                   .HasConstraintName("FK_PE_ESTUDIANTE");
        }
    }
}
