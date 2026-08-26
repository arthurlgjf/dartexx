'use client'

import { useCallback, useRef, useState } from 'react'

import type { ProductMedia } from '@/components/products/types'

type ProductGalleryProps = {
  images: ProductMedia[]
  /** Optional direct video URL (e.g. MP4) — rendered as the last slide. */
  videoUrl?: string | null
  productTitle: string
}

type Slide =
  | { kind: 'image'; url: string; alt: string }
  | { kind: 'video'; url: string }

export function ProductGallery({ images, videoUrl, productTitle }: ProductGalleryProps) {
  const slides: Slide[] = [
    ...images.map((image) => ({ kind: 'image' as const, url: image.url, alt: image.alt })),
    ...(videoUrl ? [{ kind: 'video' as const, url: videoUrl }] : []),
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (delta: number) =>
      setActiveIndex((current) => (current + delta + slides.length) % slides.length),
    [slides.length],
  )

  // Reset to first slide when the media set changes (render-time adjustment).
  const mediaKey = `${images.map((i) => i.url).join('|')}::${videoUrl ?? ''}`
  const [seenKey, setSeenKey] = useState(mediaKey)
  if (seenKey !== mediaKey) {
    setSeenKey(mediaKey)
    setActiveIndex(0)
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (slides.length < 2) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
  }

  if (slides.length === 0) {
    return (
      <div className="aspect-[4/3] w-full rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-accent-500/10" />
    )
  }

  return (
    <div>
      <div ref={stageRef} onKeyDown={handleKeyDown} className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
        {slides.map((slide, index) => (
          <div key={`${slide.kind}-${slide.url}`} hidden={index !== activeIndex}>
            {slide.kind === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slide.url} alt={slide.alt || productTitle} className="aspect-[4/3] h-auto w-full object-contain" />
            ) : (
              <video src={slide.url} controls preload="metadata" className="aspect-[4/3] w-full object-contain">
                Váš prehliadač nepodporuje prehrávanie videa.
              </video>
            )}
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Predchádzajúca fotografia"
              className="absolute top-1/2 left-2 grid size-5 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm backdrop-blur-md transition hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-2 fill-none stroke-current stroke-2">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Ďalšia fotografia"
              className="absolute top-1/2 right-2 grid size-5 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm backdrop-blur-md transition hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-2 fill-none stroke-current stroke-2">
                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur-md">
              {activeIndex + 1} / {slides.length}
            </p>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <ul role="listbox" aria-label="Galéria produktu" className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {slides.map((slide, index) => (
            <li key={`thumb-${slide.kind}-${slide.url}`}>
              <button
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                aria-label={slide.kind === 'image' ? `Náhľad ${index + 1}` : `Video ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`block h-8 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${
                  index === activeIndex ? 'border-accent-500' : 'border-zinc-300 opacity-60 hover:opacity-100'
                }`}
              >
                {slide.kind === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={slide.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="grid h-full w-full place-items-center bg-zinc-100 text-xs text-zinc-500">
                    ▶ Video
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
