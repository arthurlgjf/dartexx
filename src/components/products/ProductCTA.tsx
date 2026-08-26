'use client'

import { Button } from '@/components/ui'

type ProductCTAProps = {
  /** Called with the product title when the user requests a quotation. */
  onRequestQuote: (productTitle: string) => void
  productTitle: string
}

/** Single primary conversion action of the product detail overlay. */
export function ProductCTA({ onRequestQuote, productTitle }: ProductCTAProps) {
  return (
    <Button className="w-full" onClick={() => onRequestQuote(productTitle)}>
      Chcem cenovú ponuku
    </Button>
  )
}
