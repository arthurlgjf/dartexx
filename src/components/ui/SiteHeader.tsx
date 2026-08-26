'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/cn'
import { Button } from '@/components/ui'
import { Logo } from '@/components/ui'

type NavLink = { href: string; label: string }

export function SiteHeader({ siteName, navLinks }: { siteName: string; navLinks: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? 'bg-white/90 backdrop-blur-md'
          : 'bg-gradient-to-b from-black/50 to-transparent',
      )}
    >
      <div className="container-page flex h-14 items-center justify-between">
        <Link
          href="/"
          aria-label={siteName}
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
        >
          <Logo className={scrolled ? 'text-black' : 'text-white'} />
        </Link>
        <nav
          className={cn(
            'hidden items-center gap-3 text-sm lg:flex',
            scrolled ? 'text-zinc-700' : 'text-white',
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'transition',
                scrolled ? 'hover:text-zinc-900' : 'hover:text-white/80',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button href="#kontakt">Nezáväzná ponuka</Button>
      </div>
    </header>
  )
}
