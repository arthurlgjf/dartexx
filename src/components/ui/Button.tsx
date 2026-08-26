import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-button px-3 py-2 text-sm font-semibold leading-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-accent-500 text-white shadow-[0_2px_8px_rgba(166,36,49,0.2)] hover:bg-accent-600',
  secondary:
    'border border-zinc-300 bg-white text-zinc-800 hover:border-accent-500/60 hover:text-accent-600',
  ghost: 'text-zinc-600 hover:bg-black/5 hover:text-zinc-900',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

type ButtonProps = {
  variant?: Variant
  /** Renders an internal <Link> instead of a <button>. */
  href?: string
  children: ReactNode
} & Omit<ComponentProps<'button'>, 'children'>

export function Button({ variant = 'primary', href, children, className, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
