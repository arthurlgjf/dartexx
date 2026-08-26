import type { Product } from '@/payload-types'

export type { Product }

/** Client-safe view model for ProductCard / ProductDetailOverlay. */
export type ProductMedia = {
  url: string
  alt: string
}

export type ProductSpecs = Partial<{
  dimensions: string
  weight: string
  power: string
  players: string
  space: string
  notes: string
}>

export type ProductDetailData = {
  id: string | number
  title: string
  category?: string | null
  excerpt?: string | null
  /** Lexical editor state (JSON) — rendered by RichText. */
  description?: unknown | null
  imageUrl?: string | null
  imageAlt?: string | null
  gallery: ProductMedia[]
  videoUrl?: string | null
  specs: ProductSpecs
}

/** Maps a Payload Product document to the client-safe detail model. */
export function toProductDetailData(product: Product): ProductDetailData {
  const gallery =
    product.gallery
      ?.map((item) =>
        typeof item.image !== 'number' && item.image?.url
          ? { url: item.image.url, alt: item.image.alt || product.title }
          : null,
      )
      .filter((item): item is ProductMedia => item !== null) ?? []

  return {
    id: product.id,
    title: product.title,
    category: product.category,
    excerpt: product.excerpt,
    description: product.description ?? null,
    imageUrl: typeof product.image !== 'number' ? (product.image?.url ?? null) : null,
    imageAlt:
      typeof product.image !== 'number' ? (product.image?.alt || product.title) : product.title,
    gallery,
    videoUrl: product.videoUrl ?? null,
    specs: {
      dimensions: product.specs?.dimensions || undefined,
      weight: product.specs?.weight || undefined,
      power: product.specs?.power || undefined,
      players: product.specs?.players || undefined,
      space: product.specs?.space || undefined,
      notes: product.specs?.notes || undefined,
    },
  }
}
