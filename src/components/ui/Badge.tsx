import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'neutral' | 'accent' | 'success' | 'danger'

const tones: Record<Tone, string> = {
  neutral: 'border-zinc-200 bg-zinc-50 text-zinc-600',
  accent: 'border-accent-200 bg-accent-50 text-accent-600',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  danger: 'border-red-200 bg-red-50 text-red-700',
}

type BadgeProps = {
  tone?: Tone
  children: ReactNode
} & Omit<ComponentProps<'span'>, 'children'>

export function Badge({ tone = 'neutral', children, className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
