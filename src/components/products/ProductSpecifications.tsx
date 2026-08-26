'use client'

import type { ProductSpecs } from '@/components/products/types'
import { Card } from '@/components/ui'

type ProductSpecificationsProps = {
  specs: ProductSpecs
}

const specLabels: Array<{ key: keyof ProductSpecs; label: string }> = [
  { key: 'dimensions', label: 'Rozmery' },
  { key: 'weight', label: 'Hmotnosť' },
  { key: 'power', label: 'Napájanie' },
  { key: 'players', label: 'Počet hráčov' },
  { key: 'space', label: 'Odporúčaný priestor' },
  { key: 'notes', label: 'Ďalšie informácie' },
]

/**
 * Renders only specifications that actually contain data.
 * Empty fields, N/A values and fake data never render.
 */
export function ProductSpecifications({ specs }: ProductSpecificationsProps) {
  const filled = specLabels.filter(({ key }) => {
    const value = specs[key]
    return typeof value === 'string' && value.trim().length > 0
  })

  if (filled.length === 0) return null

  return (
    <Card className="p-3">
      <h3 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
        Technické parametre
      </h3>
      <dl className="mt-2 space-y-2">
        {filled.map(({ key, label }) => (
          <div key={key} className="grid grid-cols-[minmax(7rem,auto)_1fr] gap-2 text-sm">
            <dt className="text-zinc-500">{label}</dt>
            <dd className="text-zinc-900">{specs[key]}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
