import { cloneElement, isValidElement } from 'react'
import { Spinner } from '../Spinner'

const variantClasses = {
  primary:
    'border-[#2563eb] bg-[#2563eb] text-white hover:bg-[#1d4ed8] disabled:border-[#93c5fd] disabled:bg-[#93c5fd]',
  secondary:
    'border-[#cbd5e1] bg-white text-[#344054] hover:bg-[#f8fafc] disabled:bg-[#f8fafc] disabled:text-[#98a2b3]',
  danger:
    'border-[#dc2626] bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:border-[#fca5a5] disabled:bg-[#fca5a5]',
}

export function Button({
  asChild = false,
  children,
  className = '',
  disabled = false,
  isLoading = false,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const composedClassName = `inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`
  const content = (
    <>
      {isLoading ? <Spinner size="sm" tone={variant === 'secondary' ? 'blue' : 'white'} /> : null}
      {children}
    </>
  )

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: `${composedClassName} ${children.props.className ?? ''}`,
      ...props,
    })
  }

  return (
    <button
      className={composedClassName}
      type={type}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  )
}
