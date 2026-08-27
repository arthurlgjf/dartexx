import Link from 'next/link'
import { getPayload } from 'payload'

import configPromise from '@/payload.config'
import { FormRenderer } from '@/components/FormRenderer'
import { Reveal } from '@/components/motion/Reveal'
import { Button, Card, Logo, SiteHeader } from '@/components/ui'
import { ProductCollection } from '@/components/products/ProductCollection'
import type { Form, Product, Reference, SiteSetting } from '@/payload-types'

export const dynamic = 'force-dynamic'

const navLinks = [
  { href: '#automaty', label: 'Zábavné automaty' },
  { href: '#pre-koho', label: 'Kam sa hodia' },
  { href: '#ako-to-funguje', label: 'Ako to funguje' },
  { href: '#referencie', label: 'Referencie' },
  { href: '#predaj', label: 'Ďalšie služby' },
  { href: '#kontakt', label: 'Kontakt' },
]

const audiences = [
  {
    title: 'Eventy',
    lead: 'Interaktívny prvok do programu akéhokoľvek podujatia.',
    items: [
      'Firemné podujatia a párty',
      'Svadby',
      'Festivaly',
      'Teambuildingy',
      'Promo podujatia',
    ],
  },
  {
    title: 'Prevádzky',
    lead: 'Atrakcia, ktorá priláka hostí a predĺži ich pobyt.',
    items: [
      'Bazény a aquaparky',
      'Bary a puby',
      'Reštaurácie',
      'Hotely',
      'Zábavné prevádzky',
    ],
  },
  {
    title: 'Verejné & komerčné priestory',
    lead: 'Lákadlo, ktoré oživí priestor a pritiahne návštevníkov.',
    items: [
      'Nákupné centrá',
      'Jarmoky a trhy',
      'Mestské podujatia',
      'Turistické lokality',
      'Sezónne atrakcie',
    ],
  },
  {
    title: 'Firmy & organizátori',
    lead: 'Spoľahlivý partner pre aktivity pre vašich klientov aj zamestnancov.',
    items: [
      'Event agentúry',
      'Firmy',
      'Organizátori podujatí',
      'Marketingové aktivity',
    ],
  },
]

const defaultSteps = [
  {
    title: 'Pošlete dopyt',
    description: 'Napíšte nám dátum, miesto a typ podujatia — stačí cez formulár nižšie alebo telefónom.',
  },
  {
    title: 'Dostanete nezáväznú ponuku',
    description: 'Pripravíme výber automatov a cenovú ponuku prispôsobenú vášmu podujatiu.',
  },
  {
    title: 'Priviezeme a spustíme',
    description: 'Automaty dopravíme, nainštalujeme a vysvetlíme všetko, čo treba. Praktickú stránku máte vonku.',
  },
  {
    title: 'Po podujatí odvezieme',
    description: 'Demontáž a odvoz riešime my. Vy si užívate ďalší deň po úspešnej akcii.',
  },
]

export default async function HomePage() {
  let products: Product[] = []
  let references: Reference[] = []
  let steps: Array<{ title: string; description: string }> = defaultSteps
  let settings: SiteSetting | null = null
  let form: Form | null = null

  async function safely<T>(promise: Promise<T>): Promise<T | null> {
    try {
      return await promise
    } catch {
      // Sekcia s chybou sa preskočí — nesmie zneviditeľniť zvyšok stránky.
      return null
    }
  }

  try {
    const payload = await getPayload({ config: await configPromise })
    const [productsResult, referencesResult, processResult, settingsResult, formsResult] =
      await Promise.all([
        safely(payload.find({ collection: 'products', limit: 8, sort: '-createdAt', depth: 1 })),
        safely(payload.find({ collection: 'references', limit: 6, sort: '-createdAt', depth: 1 })),
        safely(payload.findGlobal({ slug: 'process' })),
        safely(payload.findGlobal({ slug: 'site-settings' })),
        safely(payload.find({ collection: 'forms', limit: 20, sort: 'createdAt' })),
      ])

    products = productsResult?.docs ?? []
    references = referencesResult?.docs ?? []
    if (processResult?.steps && processResult.steps.length > 0) {
      steps = processResult.steps.map((s) => ({
        title: String(s.title),
        description: String(s.description),
      }))
    }
    settings = settingsResult

    const forms = formsResult?.docs ?? []
    const contactForm = forms.find((f) =>
      ['kontakt', 'contact'].includes((f.title ?? '').trim().toLowerCase()),
    )
    form = contactForm ?? forms[0] ?? null
  } catch {
    // Databáza nie je dostupná — web sa vykreslí aj tak.
  }

  const siteName = (settings?.siteName as string) || 'Automaty na podujatia'

  return (
    <div className="min-h-dvh bg-white">
      {/* ── Hlavička — transparentná nad videom, biela po scrolly ─────────── */}
      <SiteHeader siteName={siteName} navLinks={navLinks} />

      {/* ── Hero — celoplošné video pozadie ──────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-start overflow-hidden border-b border-zinc-200 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        />
        <div className="container-page relative pt-24 pb-16">
          <div className="grid grid-cols-12 gap-x-3">
            <div className="col-span-12 flex flex-col items-start text-left lg:col-span-8 lg:col-start-1">
              <Reveal delay={0.08}>
                <h1 className="max-w-3xl text-white">
                  Podujatie plné zábavy,{' '}
                  <span className="text-accent-300">ktorú si ľudia zapamätajú.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 max-w-2xl text-[16px] leading-[24px] text-zinc-200">
                  Prenájom automatov a zábavných strojov pre podujatia, prevádzky aj verejné
                  priestory. Zaistíme dopravu, inštaláciu aj servis — vy pozvete hostí.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
                  <Button href="#kontakt">
                    Nezáväzná ponuka
                  </Button>
                  <Button
                    href="#automaty"
                    variant="secondary"
                    className="border-transparent bg-white text-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:border-transparent hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    Pozrieť automaty
                  </Button>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* ── Automaty ──────────────────────────────────────────────────────── */}
      <section id="automaty" className="border-b border-zinc-200 py-12">
        <div className="container-page">
          <Reveal className="grid grid-cols-12 gap-x-3">
            <h2 className="col-span-12">Čo si môžete prenajať</h2>
            <p className="col-span-12 mt-2 max-w-xl md:col-span-6 lg:col-span-5">
              Výber sa mení podľa sezóny a dostupnosti. Napíšte nám o svojom podujatí a pripravíme
              ponuku presne na mieru.
            </p>
          </Reveal>

          <div className="mt-6 grid grid-cols-12 gap-x-3 gap-y-6">
            {products.length > 0 ? (
              <Reveal delay={0.08} className="col-span-12">
                <ProductCollection products={products} />
              </Reveal>
            ) : (
              <Reveal delay={0.08} className="col-span-12">
                <Card className="border-dashed p-6 text-center">
                  <p className="mx-auto max-w-md text-zinc-600">
                    Aktuálnu ponuku automatov pripravujeme do tejto sekcie. Medzitým nám napíšte o
                    svojom podujatí a radi vám pošleme kompletný zoznam dostupných strojov.
                  </p>
                  <Button href="#kontakt" variant="secondary" className="mt-3">
                    Chcem aktuálnu ponuku
                  </Button>
                </Card>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── Pre koho ──────────────────────────────────────────────────────── */}
      <section id="pre-koho" className="border-b border-zinc-200 py-12">
        <div className="container-page">
          <Reveal className="grid grid-cols-12 gap-x-3">
            <h2 className="col-span-12">Kam sa hodia naše automaty?</h2>
            <p className="col-span-12 mt-2 max-w-xl md:col-span-6 lg:col-span-5">
              Takmer kamkoľvek, kde sa stretajú ľudia a majú mať s čím zabávať. Ak máte miesto,
              podujatie alebo príležitosť, automaty z nej vyťažia maximum.
            </p>
          </Reveal>

          <div className="mt-6 grid grid-cols-12 gap-x-3 gap-y-6">
            {audiences.map((segment, index) => (
              <Reveal
                key={segment.title}
                delay={(index % 4) * 0.08}
                y={24}
                className="col-span-12 sm:col-span-6 lg:col-span-3"
              >
                <Card className="flex h-full flex-col p-3">
                  <h3>{segment.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{segment.lead}</p>
                  <ul className="mt-2 space-y-1">
                    {segment.items.map((item) => (
                      <li key={item} className="flex items-start gap-1 text-sm text-zinc-700">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-5 flex flex-col items-start justify-between gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 sm:flex-row sm:items-center">
              <p className="max-w-xl text-sm text-zinc-600">
                Neviete si dať rady, či by automatom sedelo vaše prostredie? Napíšte nám — radi
                poradíme a navrhneme riešenie na mieru.
              </p>
              <Button href="#kontakt" variant="secondary" className="shrink-0">
                Poradiť s výberom
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Ako to funguje ────────────────────────────────────────────────── */}
      <section id="ako-to-funguje" className="border-b border-zinc-200 py-12">
        <div className="container-page">
          <Reveal className="grid grid-cols-12 gap-x-3">
            <h2 className="col-span-12">Ako to funguje</h2>
            <p className="col-span-12 mt-2 max-w-xl md:col-span-6 lg:col-span-5">
              Štyri kroky. O všetku praktickú stránku sa staráme my.
            </p>
          </Reveal>

          <ol className="mt-6 grid grid-cols-12 gap-x-3 gap-y-6">
            {steps.map((step, index) => (
              <li key={step.title} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Reveal delay={index * 0.1} y={24} className="h-full">
                  <Card className="flex h-full flex-col p-3">
                    <span className="text-sm font-semibold text-accent-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2">{step.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{step.description}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Referencie ────────────────────────────────────────────────────── */}
      <section id="referencie" className="border-b border-zinc-200 py-12">
        <div className="container-page">
          <Reveal className="grid grid-cols-12 gap-x-3">
            <h2 className="col-span-12">Referencie</h2>
            <p className="col-span-12 mt-2 max-w-xl md:col-span-6 lg:col-span-5">
              Automaty sme dodali na desiatky firemných aj súkromných podujatí po celom Slovensku.
            </p>
          </Reveal>

          {references.length > 0 ? (
            <div className="mt-6 grid grid-cols-12 gap-x-3 gap-y-6">
              {references.map((reference, index) => (
                <Reveal
                  key={reference.id}
                  delay={(index % 3) * 0.08}
                  y={24}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <Card className="flex h-full flex-col p-4">
                    <blockquote className="flex-1 text-sm text-zinc-700">
                      „{reference.quote}“
                    </blockquote>
                    <footer className="mt-3 border-t border-zinc-200 pt-2">
                      <p className="text-sm font-semibold text-zinc-900">{reference.author}</p>
                      {reference.event && (
                        <p className="text-xs text-zinc-500">{reference.event}</p>
                      )}
                    </footer>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : (
            <dl className="mt-6 grid grid-cols-12 gap-x-3 gap-y-6">
              {[
                ['Dlhoročné skúsenosti', 'Automaty prevádzkujeme a prenajímapy už mnoho rokov.'],
                ['Klienti po celom Slovensku', 'Realizujeme podujatia v mestách aj regiónoch.'],
                ['Skúsenosti s eventmi', 'Vieme, ako stroje zapracovať do programu podujatia.'],
              ].map(([title, text]) => (
                <div key={title} className="col-span-12 sm:col-span-4">
                  <dt className="font-semibold text-zinc-900">{title}</dt>
                  <dd className="mt-1 text-sm text-zinc-600">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* ── Ďalšie služby ───────────────────────────────────────────────── */}
      <section id="predaj-a-servis" className="border-b border-zinc-200 py-12">
        <div className="container-page">
          <Reveal className="grid grid-cols-12 gap-x-3">
            <h2 className="col-span-12">Ďalšie služby</h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-12 gap-x-3 gap-y-6">
            <Reveal y={24} className="col-span-12 md:col-span-6">
              <Card className="flex h-full flex-col p-4">
                <h3>Predaj automatov</h3>
                <p className="mt-2 flex-1 text-sm text-zinc-600">
                  Chcete mať automat k sebe natrvalo? Vybrané stroje predávame vrátane poradenstva
                  pri výbere a prevádzke.
                </p>
                <Button href="#kontakt" variant="secondary" className="mt-3 self-start">
                  Nezáväzný dopyt
                </Button>
              </Card>
            </Reveal>
            <Reveal delay={0.1} y={24} className="col-span-12 md:col-span-6">
              <Card className="flex h-full flex-col p-4">
                <h3>Servis automatov</h3>
                <p className="mt-2 flex-1 text-sm text-zinc-600">
                  Opravy, revízie a pravidelná údržba automatov — nielen tých z nášho prenájmu.
                </p>
                <Button href="#kontakt" variant="secondary" className="mt-3 self-start">
                  Nezáväzný dopyt
                </Button>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA / Kontakt ─────────────────────────────────────────────────── */}
      <section id="kontakt" className="border-t border-zinc-200 py-12">
        <div className="container-page grid grid-cols-12 gap-x-3 gap-y-6">
          <Reveal className="col-span-12 lg:col-span-5">
            <h2>Nezáväzná ponuka</h2>
            <p className="mt-2 max-w-md text-zinc-600">
              Napíšte nám niečo o vašom podujatí — dátum, miesto a koľko hostí čakáte. Pripravíme
              ponuku na mieru.
            </p>
            {settings?.phone || settings?.email ? (
              <div className="mt-4 space-y-1 text-sm text-zinc-700">
                {settings?.phone && (
                  <p>
                    Telefón: <span className="font-semibold text-zinc-900">{settings.phone}</span>
                  </p>
                )}
                {settings?.email && (
                  <p>
                    E-mail:{' '}
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-semibold text-accent-600 underline-offset-4 hover:underline"
                    >
                      {settings.email}
                    </a>
                  </p>
                )}
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} y={24} className="col-span-12 lg:col-span-7">
            <Card className="p-4">
              {form ? (
                <FormRenderer form={form} />
              ) : (
                <p className="text-sm text-zinc-600">
                  Formulár s adresou{' '}
                  <code className="rounded bg-zinc-100 px-1 text-accent-600">contact</code>{' '}
                  ešte neexistuje. Vytvorte ho v{' '}
                  <Link
                    href="/admin/collections/forms"
                    className="text-accent-600 underline underline-offset-4"
                  >
                    administrácii
                  </Link>
                  .
                </p>
              )}
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ── Pätka ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="container-page grid grid-cols-12 gap-x-3 gap-y-6 pt-6 pb-5">
          <div className="col-span-12 sm:col-span-5">
            <Logo className="h-3" />
            {(settings?.companyName || settings?.ico) && (
              <p className="mt-1 text-xs text-zinc-500">
                {settings?.companyName}
                {settings?.ico ? ` · IČO ${settings.ico}` : ''}
              </p>
            )}
            <p className="mt-2 text-xs text-zinc-400">
              © {new Date().getFullYear()} {siteName}. Všetky práva vyhradené.
            </p>
          </div>
          <nav className="col-span-12 grid gap-1 text-sm text-zinc-600 sm:col-span-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-zinc-900">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="col-span-12 text-sm text-zinc-600 sm:col-span-3">
            {settings?.email && (
              <p>
                <a href={`mailto:${settings.email}`} className="transition hover:text-zinc-900">
                  {settings.email}
                </a>
              </p>
            )}
            {settings?.phone && <p className="mt-1">{settings.phone}</p>}
            <Link
              href="/admin"
              className="mt-3 inline-block text-xs text-zinc-400 transition hover:text-zinc-600"
            >
              Administrácia
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
