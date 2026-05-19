import { Button } from '../Button'

export function Modal({
  cancelLabel = 'Cancelar',
  children,
  confirmLabel = 'Confirmar',
  isOpen,
  isSubmitting = false,
  onClose,
  onConfirm,
  title,
  variant = 'primary',
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0f172a]/40 px-4 pb-20 pt-4 sm:items-center sm:py-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        aria-modal="true"
        className="w-full max-w-md max-h-[calc(100svh-6rem)] overflow-y-auto rounded-lg border border-[#d9e2ef] bg-white p-5 text-left shadow-xl sm:max-h-[calc(100svh-2rem)]"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-[#172033]">{title}</h2>
        <div className="mt-3 text-sm leading-6 text-[#667085]">{children}</div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} isLoading={isSubmitting}>
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  )
}
