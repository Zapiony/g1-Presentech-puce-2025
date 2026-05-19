import { cloneElement, isValidElement } from 'react'
import { Spinner } from '../Spinner'

const variantClasses = {
  primary:
    'border-primary bg-primary text-primary-foreground hover:bg-primary/90 disabled:border-primary/40 disabled:bg-primary/40',
  secondary:
    'border-border bg-card text-foreground hover:bg-muted disabled:bg-muted disabled:text-muted-foreground',
  danger:
    'border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:border-destructive/40 disabled:bg-destructive/40',
  ghost:
    'border-transparent bg-transparent text-foreground hover:bg-muted disabled:text-muted-foreground',
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
  const composedClassName = `inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`
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
