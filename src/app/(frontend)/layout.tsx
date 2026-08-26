import React from 'react'
import './styles.css'

export const metadata = {
  description:
    'Prenájom automatov a zábavných strojov na firemné aj súkromné podujatia po celom Slovensku. Predaj a servis automatov.',
  title: {
    default: 'Automaty na podujatia | Prenájom zábavných strojov',
    template: '%s | Automaty na podujatia',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="sk">
      <body>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f%5B%5D=switzer@400,500,600,700&display=swap"
        />
        <main>{children}</main>
      </body>
    </html>
  )
}
