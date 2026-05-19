using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class ClaseConfiguration : IEntityTypeConfiguration<ClaseEntity>
    {
        public void Configure(EntityTypeBuilder<ClaseEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("clases");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(c => c.id_clase)
                   .HasName("PK_CLASES");

            builder.Property(c => c.id_clase)
                   .ValueGeneratedOnAdd();

            // =========================
            // DATOS DE LA CLASE
            // =========================
            builder.Property(c => c.materia)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(c => c.observaciones);

            // =========================
            // ESTADO / CICLO DE VIDA
            // =========================
            builder.Property(c => c.activo)
                   .IsRequired()
                   .HasDefaultValue(true);

            // =========================
            // AUDITORÍA
            // =========================
            builder.Property(c => c.created_at)
                   .IsRequired()
                   .HasColumnType("timestamp")
                   .HasDefaultValueSql("NOW()");

            // =========================
            // ÍNDICES
            // =========================
            builder.HasIndex(c => c.id_profesor)
                   .HasDatabaseName("IDX_CLASES_PROFESOR");

            builder.HasIndex(c => c.id_paralelo)
                   .HasDatabaseName("IDX_CLASES_PARALELO");

            // =========================
            // RELACIONES
            // =========================
            builder.HasOne(c => c.Paralelo)
                   .WithMany(p => p.Clases)
                   .HasForeignKey(c => c.id_paralelo)
                   .HasConstraintName("FK_CLASES_PARALELO");

            builder.HasMany(c => c.ClasesHorario)
                   .WithOne(ch => ch.Clase)
                   .HasForeignKey(ch => ch.id_clase)
                   .HasConstraintName("FK_HORARIO_CLASE");
        }
    }
}
