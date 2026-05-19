import { AppLayout } from '../components/layout'

export function PlaceholderPage({ title }) {
  return (
    <AppLayout title={title}>
      <section className="mx-auto max-w-6xl px-4 py-5">
        <div className="rounded-lg border border-[#d9e2ef] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#172033]">{title}</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Esta sección se implementará en el siguiente bloque del frontend.
          </p>
        </div>
      </section>
    </AppLayout>
  )
}
