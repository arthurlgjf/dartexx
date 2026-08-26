'use client'

import { useState } from 'react'

import { ProductCard } from '@/components/products/ProductCard'
import { ProductDetailOverlay } from '@/components/products/ProductDetailOverlay'
import type { ProductDetailData } from '@/components/products/types'
import { Card } from '@/components/ui'

/** Builds a minimal Lexical document from plain paragraphs (for mock data only). */
function lexicalDoc(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function image(seed: string) {
  return `https://picsum.photos/seed/${seed}/1200/900`
}

const MOCK_PRODUCTS: Array<ProductDetailData & { aspect?: '4/3' | '1/1' | '16/9' }> = [
  {
    id: 'mock-1',
    title: 'Boxovací automat',
    category: 'Športové automaty',
    excerpt: 'Klasika, ktorá na každom podujatí vyvolá súťaživú náladu.',
    description: lexicalDoc([
      'Silomer so zabudovanou meracou silou úderu. Hostia si porovnávajú výsledky a vracajú sa sa k nemu celý večer.',
      'Vhodný pre vnútorné aj vonkajšie podujatia. Prevádzka je možná po celý deň bez dohľadu.',
    ]),
    imageUrl: image('boxer'),
    imageAlt: 'Boxovací automat',
    gallery: [
      { url: image('boxer-2'), alt: 'Boxovací automat z boku' },
      { url: image('boxer-3'), alt: 'Detail displeja' },
    ],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    specs: {
      dimensions: '78 × 105 × 210 cm',
      weight: 'cca 120 kg',
      power: '230 V / 50 Hz',
      players: '1 hráč',
      space: 'min. 2 × 2 m',
      notes: 'Možnosť prevádzky bez mincí na podujatiach.',
    },
    aspect: '4/3',
  },
  {
    id: 'mock-2',
    title: 'Air hokejový stôl',
    excerpt: null,
    description: null,
    imageUrl: image('airhockey'),
    imageAlt: 'Air hokejový stôl',
    gallery: [],
    videoUrl: null,
    specs: {
      players: '2 hráči',
    },
    aspect: '1/1',
  },
  {
    id: 'mock-3',
    title: 'Automat na šťastie s veľmi dlhým názvom na testovanie zalomení nadpisu',
    category: null,
    excerpt:
      'Extrémne dlhý krátky popis, ktorý slúži na testovanie line-clamp pri troch riadkoch — mal by sa elegantne orezať a nikdy nerozhádzať výšku karty ani zarovnanie obsahu v mriežke.',
    description: lexicalDoc(['Jeden odsek.']),
    imageUrl: image('dlhy'),
    imageAlt: 'Testovací automat',
    gallery: [{ url: image('dlhy-2'), alt: 'Druhá fotografia' }],
    videoUrl: null,
    specs: {},
    aspect: '16/9',
  },
  {
    id: 'mock-4',
    title: 'Bez fotografie',
    excerpt: 'Karta bez obrázka aj kategórie — kontrola fallback gradientu.',
    description: null,
    imageUrl: null,
    imageAlt: null,
    gallery: [],
    videoUrl: null,
    specs: {},
    aspect: '4/3',
  },
]

export function ProductDemo() {
  const [selected, setSelected] = useState<(typeof MOCK_PRODUCTS)[number] | null>(null)
  const [ctaLog, setCtaLog] = useState<string[]>([])

  function handleRequestQuote(productTitle: string) {
    setSelected(null)
    setCtaLog((log) => [...log.slice(-2), productTitle])
    document.getElementById('polia')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            aspect={product.aspect}
            onSelect={() => setSelected(product)}
          />
        ))}
      </div>

      <Card className="p-6">
        <p className="text-sm text-zinc-400">
          Kliknutie na kartu otvorí detail overlay. Tlačidlo „Chcem cenovú ponuku“ zatvorí overlay a
          zavolá callback (na reálnom webe predvyplní lead formulár):
        </p>
        {ctaLog.length > 0 ? (
          <ul className="mt-3 space-y-1 text-sm text-accent-300">
            {ctaLog.map((title, index) => (
              <li key={`${title}-${index}`}>→ {title}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-600">Zatiaľ žiadne kliky.</p>
        )}
      </Card>

      {selected && (
        <ProductDetailOverlay
          product={selected}
          onClose={() => setSelected(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </div>
  )
}
