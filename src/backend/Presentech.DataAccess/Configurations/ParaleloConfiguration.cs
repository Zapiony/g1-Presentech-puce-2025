using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class ParaleloConfiguration : IEntityTypeConfiguration<ParaleloEntity>
    {
        public void Configure(EntityTypeBuilder<ParaleloEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("paralelos");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(p => p.id_paralelo)
                   .HasName("PK_PARALELOS");

            builder.Property(p => p.id_paralelo)
                   .ValueGeneratedOnAdd();

            // =========================
            // DATOS DEL PARALELO
            // =========================
            builder.Property(p => p.nombre)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.Property(p => p.descripcion);

            builder.Property(p => p.capacidad_maxima)
                   .IsRequired();

            // =========================
            // ESTADO / CICLO DE VIDA
            // =========================
            builder.Property(p => p.activo)
                   .IsRequired()
                   .HasDefaultValue(true);

            // =========================
            // AUDITORÍA
            // =========================
            builder.Property(p => p.created_at)
                   .IsRequired()
                   .HasColumnType("timestamp")
                   .HasDefaultValueSql("NOW()");
        }
    }
}
