using Presentech.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Presentech.DataAccess.Configurations
{
    public class ClaseHorarioConfiguration : IEntityTypeConfiguration<ClaseHorarioEntity>
    {
        public void Configure(EntityTypeBuilder<ClaseHorarioEntity> builder)
        {
            // =========================
            // TABLA
            // =========================
            builder.ToTable("clases_horario", tb =>
            {
                tb.HasCheckConstraint("CHK_HORARIO_HORAS", "hora_fin > hora_inicio");
            });

            // =========================
            // CLAVE PRIMARIA
            // =========================
            builder.HasKey(ch => ch.id_horario)
                   .HasName("PK_CLASES_HORARIO");

            builder.Property(ch => ch.id_horario)
                   .ValueGeneratedOnAdd();

            // =========================
            // HORARIO
            // =========================
            builder.Property(ch => ch.hora_inicio)
                   .IsRequired()
                   .HasColumnType("time");

            builder.Property(ch => ch.hora_fin)
                   .IsRequired()
                   .HasColumnType("time");

            // =========================
            // ÍNDICES
            // =========================
            builder.HasIndex(ch => ch.id_clase)
                   .HasDatabaseName("IDX_CLASES_HORARIO_CLASE");

            // =========================
            // RELACIONES
            // =========================
            builder.HasOne(ch => ch.DiaSemana)
                   .WithMany(d => d.ClasesHorario)
                   .HasForeignKey(ch => ch.id_dia)
                   .HasConstraintName("FK_HORARIO_DIA");

            builder.HasMany(ch => ch.RegistrosAsistencia)
                   .WithOne(r => r.ClaseHorario)
                   .HasForeignKey(r => r.id_horario)
                   .HasConstraintName("FK_REGISTRO_HORARIO");
        }
    }
}
