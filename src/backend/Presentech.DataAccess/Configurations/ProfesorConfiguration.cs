using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class ProfesorConfiguration : IEntityTypeConfiguration<ProfesorEntity>
    {
        public void Configure(EntityTypeBuilder<ProfesorEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("profesores");

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(p => p.id_profesor)
                   .HasName("PK_PROFESORES");

            builder.Property(p => p.id_profesor)
                   .ValueGeneratedOnAdd();

            // =========================
            // DATOS PERSONALES
            // =========================
            builder.Property(p => p.nombres)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.apellidos)
                   .IsRequired()
                   .HasMaxLength(100);

            // =========================
            // DATOS DE CONTACTO
            // =========================
            builder.Property(p => p.correo_institucional)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.Property(p => p.telefono)
                   .HasMaxLength(20);

            builder.Property(p => p.especialidad)
                   .HasMaxLength(100);

            // =========================
            // AUTENTICACIÓN
            // =========================
            builder.Property(p => p.contrasena_hash)
                   .IsRequired()
                   .HasMaxLength(255);

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

            // =========================
            // ÍNDICES / UNIQUE
            // =========================
            builder.HasIndex(p => p.correo_institucional)
                   .IsUnique()
                   .HasDatabaseName("UQ_PROFESORES_CORREO");

            // =========================
            // RELACIONES
            // =========================
            builder.HasMany(p => p.Clases)
                   .WithOne(c => c.Profesor)
                   .HasForeignKey(c => c.id_profesor)
                   .HasConstraintName("FK_CLASES_PROFESOR");
        }
    }
}
