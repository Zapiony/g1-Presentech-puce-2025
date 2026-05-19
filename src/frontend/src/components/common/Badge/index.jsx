const statusClasses = {
  presente: 'border-success/25 bg-success-bg text-success',
  ausente: 'border-error/25 bg-error-bg text-error',
  atrasado: 'border-warning/25 bg-warning-bg text-warning',
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
