const statusClasses = {
  presente: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]',
  ausente: 'border-[#fecaca] bg-[#fef2f2] text-[#991b1b]',
  atrasado: 'border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]',
}

const statusLabels = {
  presente: 'Presente',
  ausente: 'Ausente',
  atrasado: 'Atrasado',
}

export function Badge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}
