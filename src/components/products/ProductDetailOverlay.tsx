'use client'

import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { ProductDetailData } from '@/components/products/types'
import { Badge } from '@/components/ui'
import { ProductCTA } from './ProductCTA'
import { ProductGallery } from './ProductGallery'
import { ProductSpecifications } from './ProductSpecifications'

type ProductDetailOverlayProps = {
  product: ProductDetailData
  onClose: () => void
  /** Fired by the primary CTA with the product title. */
  onRequestQuote: (productTitle: string) => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ProductDetailOverlay({ product, onClose, onRequestQuote }: ProductDetailOverlayProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Mount: lock body scroll + move focus in. Unmount: unlock + restore focus.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = overflow
      previouslyFocused?.focus()
    }
  }, [])

  // Escape closes the overlay; Tab is trapped inside the dialog.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Close when the backdrop itself is clicked (not content inside the panel).
  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-zinc-900/50 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed inset-x-0 bottom-0 top-auto flex max-h-[94dvh] flex-col rounded-t-2xl border border-zinc-200 bg-white shadow-2xl outline-none sm:inset-0 sm:m-auto sm:max-h-[88dvh] sm:h-fit sm:w-full sm:max-w-4xl sm:rounded-2xl"
      >
        {/* ── Hlavička s close tlačidlom ─────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2 border-b border-zinc-200 px-3 py-2">
          <p className="truncate text-sm text-zinc-500">{product.category || 'Automat'}</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Zavrieť detail"
            className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-accent-500/50 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="size-2 fill-none stroke-current stroke-2">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Obsah ──────────────────────────────────────────────────────── */}
        <div className="overflow-y-auto">
          <div className="grid gap-x-3 gap-y-4 p-3 lg:grid-cols-12">
            {/* Média */}
            <div className="lg:col-span-6">
              <ProductGallery
                images={[
                  ...(product.imageUrl
                    ? [{ url: product.imageUrl, alt: product.imageAlt || product.title }]
                    : []),
                  ...product.gallery,
                ]}
                videoUrl={product.videoUrl}
                productTitle={product.title}
              />
            </div>

            {/* Informácie */}
            <div className="flex flex-col lg:col-span-6">
              {product.category && (
                <span className="mb-2 self-start">
                  <Badge tone="accent">{product.category}</Badge>
                </span>
              )}
              <h2 id={titleId}>
                {product.title}
              </h2>

              {product.excerpt && (
                <p className="mt-2 leading-relaxed text-zinc-600">{product.excerpt}</p>
              )}

              {product.description ? (
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 [&_li]:ml-2 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-zinc-900">
                  <RichText
                    data={
                      product.description as React.ComponentProps<typeof RichText>['data']
                    }
                  />
                </div>
              ) : null}

              <div className="mt-3">
                <ProductSpecifications specs={product.specs} />
              </div>

              <div className="mt-auto pt-4 max-sm:sticky max-sm:bottom-0 max-sm:-mx-3 max-sm:mt-4 max-sm:border-t max-sm:border-zinc-200 max-sm:bg-white max-sm:px-3 max-sm:py-2">
                <ProductCTA productTitle={product.title} onRequestQuote={onRequestQuote} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
