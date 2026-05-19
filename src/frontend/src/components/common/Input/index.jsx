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
    <label className="block text-left text-sm font-medium text-[#344054]" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={`mt-2 w-full rounded-md border px-3 py-2 text-[#172033] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe] ${
          error ? 'border-[#f04438]' : 'border-[#cbd5e1]'
        } ${className}`}
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value, event)}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-[#b42318]">{error}</span> : null}
    </label>
  )
}
