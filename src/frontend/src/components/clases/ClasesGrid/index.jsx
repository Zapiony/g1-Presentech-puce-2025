import { ClaseCard } from '../ClaseCard'

export function ClasesGrid({ clases, onImportSuccess }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {clases.map((clase) => (
        <ClaseCard
          clase={clase}
          key={clase.id_clase}
          onImportSuccess={onImportSuccess}
        />
      ))}
    </div>
  )
}
