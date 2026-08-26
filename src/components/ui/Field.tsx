import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

/** Shared styling for all text-entry controls. */
export const fieldBase =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 disabled:cursor-not-allowed disabled:opacity-50'

export function Input({ className, ...rest }: ComponentProps<'input'>) {
  return <input className={cn(fieldBase, className)} {...rest} />
}

export function Textarea({ className, ...rest }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldBase, 'resize-none', className)} {...rest} />
}

export function Select({ className, ...rest }: ComponentProps<'select'>) {
  return <select className={cn(fieldBase, 'appearance-none', className)} {...rest} />
}

export function Checkbox({ className, ...rest }: ComponentProps<'input'>) {
  return (
    <input
      type="checkbox"
      className={cn('size-4 rounded accent-[var(--color-accent-500)]', className)}
      {...rest}
    />
  )
}
