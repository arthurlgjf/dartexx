import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type LabelProps = {
  required?: boolean
  children: ReactNode
} & Omit<ComponentProps<'label'>, 'children'>

export function Label({ required, children, className, ...rest }: LabelProps) {
  return (
    <label className={cn('block text-sm font-medium text-zinc-700', className)} {...rest}>
      {children}
      {required && <span className="ml-1 text-accent-500">*</span>}
    </label>
  )
}
