import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

type CardProps = {
  /** Adds a hover state for clickable cards. */
  interactive?: boolean
} & ComponentProps<'div'>

export function Card({ interactive, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        interactive && 'transition hover:border-accent-500/40',
        className,
      )}
      {...rest}
    />
  )
}
