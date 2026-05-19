using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class DiaSemanaConfiguration : IEntityTypeConfiguration<DiaSemanaEntity>
    {
        public void Configure(EntityTypeBuilder<DiaSemanaEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("dias_semana");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(d => d.id_dia)
                   .HasName("PK_DIAS_SEMANA");

            builder.Property(d => d.id_dia)
                   .ValueGeneratedOnAdd();

            // =========================
            // DATOS DEL DÍA
            // =========================
            builder.Property(d => d.nombre)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.Property(d => d.orden)
                   .IsRequired();

            // =========================
            // ÍNDICES / UNIQUE
            // =========================
            builder.HasIndex(d => d.orden)
                   .IsUnique()
                   .HasDatabaseName("UQ_DIAS_SEMANA_ORDEN");
        }
    }
}
