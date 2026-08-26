'use client'

import type { ProductDetailData } from '@/components/products/types'
import { Badge } from '@/components/ui'

type ProductCardProps = {
  product: Pick<ProductDetailData, 'title' | 'excerpt' | 'category' | 'imageUrl' | 'imageAlt'>
  /** Fired when the card is activated (click / Enter / Space). */
  onSelect?: (product: ProductCardProps['product']) => void
  /** Image aspect ratio — final value will be decided in Figma. */
  aspect?: '4/3' | '1/1' | '16/9'
}

const aspectClasses = {
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
} as const

export function ProductCard({ product, onSelect, aspect = '4/3' }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(product)}
      aria-haspopup="dialog"
      aria-label={`${product.title} — zobraziť detail`}
      className="group block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-accent-500/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      <div className={`relative overflow-hidden ${aspectClasses[aspect]} w-full bg-zinc-100`}>
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.imageAlt || product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-100 to-accent-500/10" />
        )}

        {product.category && (
          <span className="absolute top-2 left-2">
            <Badge tone="accent" className="backdrop-blur-md">
              {product.category}
            </Badge>
          </span>
        )}
      </div>

      <div className="flex flex-col p-4">
        <h3 className="line-clamp-2 font-semibold tracking-tight text-zinc-900">
          {product.title}
        </h3>
        {product.excerpt && (
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-600">
            {product.excerpt}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-600 transition group-hover:gap-2">
          Detail automatu
          <svg aria-hidden viewBox="0 0 16 16" className="size-4 fill-none stroke-current stroke-2">
            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only"> (otvorí sa detail)</span>
        </span>
      </div>
    </button>
  )
}
