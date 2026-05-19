const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

const toneClasses = {
  blue: 'border-[#bfdbfe] border-t-[#2563eb]',
  white: 'border-white/40 border-t-white',
}

export function Spinner({ label = 'Cargando', size = 'md', tone = 'blue' }) {
  return (
    <span
      aria-label={label}
      className={`inline-block animate-spin rounded-full ${sizeClasses[size]} ${toneClasses[tone]}`}
      role="status"
    />
  )
}
