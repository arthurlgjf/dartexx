'use client'

import { useState } from 'react'

import type { Product, ProductDetailData } from '@/components/products/types'
import { toProductDetailData } from '@/components/products/types'
import { ProductCard } from './ProductCard'
import { ProductDetailOverlay } from './ProductDetailOverlay'

type ProductCollectionProps = {
  products: Product[]
}

/**
 * Grid of ProductCards + shared ProductDetailOverlay.
 * The CTA inside the overlay dispatches a prefill event consumed by the lead form (#kontakt).
 */
export function ProductCollection({ products }: ProductCollectionProps) {
  const [selected, setSelected] = useState<ProductDetailData | null>(null)

  function handleRequestQuote(productTitle: string) {
    setSelected(null)
    window.dispatchEvent(new CustomEvent('automat:dopyt', { detail: productTitle }))
    requestAnimationFrame(() => {
      document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <>
      <ul className="grid grid-cols-12 gap-x-3 gap-y-6">
        {products.map((product) => {
          const data = toProductDetailData(product)
          return (
            <li key={data.id} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ProductCard
                product={data}
                onSelect={() => setSelected(data)}
              />
            </li>
          )
        })}
      </ul>

      {selected && (
        <ProductDetailOverlay
          product={selected}
          onClose={() => setSelected(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </>
  )
}
