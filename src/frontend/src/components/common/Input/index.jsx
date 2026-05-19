export function Input({
  className = '',
  error = '',
  label,
  onChange,
  type = 'text',
  value,
  ...props
}) {
  const inputId = props.id ?? props.name ?? label?.toLowerCase().replaceAll(' ', '-')

  return (
    <label className="block text-left text-sm font-medium text-foreground" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={`mt-2 min-h-10 w-full rounded-md border bg-card px-3 py-2 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
          error ? 'border-error' : 'border-input-border'
        } ${className}`}
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value, event)}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-error">{error}</span> : null}
    </label>
  )
}
