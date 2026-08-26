import type { Metadata } from 'next'
import Link from 'next/link'

import { Reveal } from '@/components/motion/Reveal'
import { ProductDemo } from '@/components/playground/ProductDemo'
import { Badge, Button, Card, Checkbox, Input, Label, Select, Textarea } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Playground',
  robots: { index: false, follow: false },
}

const sections = [
  { id: 'tokeny', label: 'Tokeny' },
  { id: 'typografia', label: 'Typografia' },
  { id: 'medzery', label: 'Medzery' },
  { id: 'mriezka', label: 'Mriežka' },
  { id: 'tlacidla', label: 'Tlačidlá' },
  { id: 'odznaky', label: 'Odznaky' },
  { id: 'karty', label: 'Karty' },
  { id: 'produkt', label: 'Produktové karty' },
  { id: 'polia', label: 'Polia' },
  { id: 'pohyb', label: 'Pohyb' },
]

const colorTokens = [
  ['--color-surface', 'surface'],
  ['--color-surface-raised', 'surface-raised'],
  ['--color-line', 'line'],
  ['--color-accent-300', 'accent-300'],
  ['--color-accent-400', 'accent-400'],
  ['--color-accent-500', 'accent-500'],
  ['--color-accent-600', 'accent-600'],
]

function SectionHeading({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-50">{title}</h2>
      {hint && <p className="mt-1.5 text-sm text-zinc-500">{hint}</p>}
    </div>
  )
}

export default function PlaygroundPage() {
  return (
    <div className="min-h-dvh">
      {/* ── Horná lišta ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-zinc-400 transition hover:text-zinc-100">
              ← Web
            </Link>
            <Badge tone="danger">DEV</Badge>
          </div>
          <nav className="hidden items-center gap-5 md:flex">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-xs text-zinc-500 transition hover:text-zinc-100"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-32">
        {/* ── Úvod ───────────────────────────────────────────────────────── */}
        <div className="py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Playground
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Vývojové prostredie pre dizajn systém a opakovane použiteľné komponenty. Nie je súčasťou
            produkčného webu — nové primitívy pribúdajú do{' '}
            <code className="rounded bg-surface-raised px-1.5 py-0.5 text-sm text-accent-300">
              src/components/ui
            </code>{' '}
            a tu sa testujú.
          </p>
        </div>

        {/* ── Tokeny ─────────────────────────────────────────────────────── */}
        <section id="tokeny" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading
            title="Farebné tokeny"
            hint="Definované v (frontend)/styles.css pod @theme — používajú sa ako Tailwind utility triedy."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {colorTokens.map(([token, name]) => (
              <figure key={token}>
                <div
                  className="h-20 rounded-xl border border-line"
                  style={{ background: `var(${token})` }}
                />
                <figcaption className="mt-2 space-y-0.5">
                  <p className="text-xs font-medium text-zinc-300">{name}</p>
                  <code className="block truncate text-[10px] text-zinc-600">{token}</code>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Typografia ─────────────────────────────────────────────────── */}
        <section id="typografia" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading title="Typografia" hint="Škála nadpisov a textu používaná na webe." />
          <div className="space-y-8">
            <p className="text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-7xl">
              Nadpis stránky
            </p>
            <p className="text-3xl font-semibold tracking-tight text-zinc-50">Nadpis sekcie</p>
            <p className="text-xl font-semibold text-zinc-100">Nadpis karty</p>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
              Telo textu — obsah spravuje Payload CMS, ukladá ho Postgres od Supabase, transakčné
              e-maily odosiela Resend a pohyb dotvára GSAP.
            </p>
            <p className="text-sm text-zinc-500">Malý text / popisky</p>
            <code className="inline-block rounded bg-surface-raised px-2 py-1 text-sm text-accent-300">
              ukážka kódu v riadku
            </code>
          </div>
        </section>

        {/* ── Medzery ────────────────────────────────────────────────────── */}
        <section id="medzery" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading
            title="Rozostupy"
            hint="Predvolená Tailwind škála (4 px základ) — rytmus sekcií a odsadenie komponentov."
          />
          <div className="space-y-3">
            {['4', '8', '12', '16', '24', '32', '48', '64', '96', '128'].map((step) => (
              <div key={step} className="flex items-center gap-4">
                <code className="w-14 text-[10px] text-zinc-600">{step} px</code>
                <div
                  className="h-4 rounded-sm bg-accent-500/70"
                  style={{ width: `calc(var(--spacing) * ${step})` }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Mriežka ────────────────────────────────────────────────────── */}
        <section id="mriezka" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading
            title="Mriežka & kontajner"
            hint="Obsahový kontajner: max-w-6xl s odsadením px-6. 12-stĺpcová mriežka pre rozloženia."
          />
          <Card className="p-6">
            <div className="grid grid-cols-12 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="grid h-16 place-items-center rounded-md border border-line bg-white/[0.04] text-xs text-zinc-600"
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Breakpointy: sm 640 · md 768 · lg 1024 · xl 1280
            </p>
          </Card>
        </section>

        {/* ── Tlačidlá ───────────────────────────────────────────────────── */}
        <section id="tlacidla" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading
            title="Tlačidlá"
            hint="Button — varianty primary / secondary / ghost / danger, href vykreslí odkaz. Padding 16/8 px, radius 100 px, text 16 px/150 % semibold."
          />
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Hlavné</Button>
              <Button variant="secondary">Sekundárne</Button>
              <Button variant="ghost">Jemné</Button>
              <Button variant="danger">Kritické</Button>
              <Button disabled>Zakázané</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
              <Button href="/" variant="secondary">
                Ako odkaz →
              </Button>
            </div>
          </div>
        </section>

        {/* ── Odznaky ────────────────────────────────────────────────────── */}
        <section id="odznaky" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading title="Odznaky" />
          <div className="flex flex-wrap gap-3">
            <Badge>Neutrálny</Badge>
            <Badge tone="accent">Akcentový</Badge>
            <Badge tone="success">Úspech</Badge>
            <Badge tone="danger">Chyba</Badge>
            <Badge tone="accent">
              <span className="size-1.5 rounded-full bg-current" />
              S bodkou
            </Badge>
          </div>
        </section>

        {/* ── Karty ──────────────────────────────────────────────────────── */}
        <section id="karty" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading title="Karty" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="font-semibold text-zinc-100">Základná karta</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Ohraničený povrch s zaoblenými rohmi.
              </p>
            </Card>
            <Card interactive className="overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-surface-raised to-accent-500/15" />
              <div className="p-6">
                <h3 className="font-semibold text-zinc-100">Interaktívna</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Pri hoveri sa objaví akcentové orámovanie.
                </p>
              </div>
            </Card>
            <Card className="flex flex-col p-6">
              <h3 className="font-semibold text-zinc-100">S pätičkou</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Flex stĺpec, takže pätička zostáva dole aj v mriežke.
              </p>
              <div className="mt-auto pt-4 text-sm font-semibold text-accent-300">49,00 €</div>
            </Card>
          </div>
        </section>

        {/* ── Produktové karty + detail overlay ──────────────────────────── */}
        <section id="produkt" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading
            title="Produktové karty & detail overlay"
            hint="ProductCard → ProductDetailOverlay → CTA „Chcem cenovú ponuku“. Mock dáta s rôznymi dĺžkami textov, pomermi strán a neúplnými parametrami."
          />
          <ProductDemo />
        </section>

        {/* ── Polia ──────────────────────────────────────────────────────── */}
        <section id="polia" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading
            title="Formulárové polia"
            hint="Rovnaké primitívy, ktoré FormRenderer používa pre formuláre z CMS."
          />
          <Card className="max-w-2xl p-8">
            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="pg-name" required>
                    Textové pole
                  </Label>
                  <Input id="pg-name" placeholder="Ján Novák" />
                </div>
                <div>
                  <Label htmlFor="pg-email">E-mail</Label>
                  <Input id="pg-email" type="email" placeholder="jan@example.com" />
                </div>
                <div>
                  <Label htmlFor="pg-select">Výber</Label>
                  <Select id="pg-select" defaultValue="">
                    <option value="" disabled>
                      Vyberte…
                    </option>
                    <option value="one">Prvá možnosť</option>
                    <option value="two">Druhá možnosť</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pg-disabled">Zakázané</Label>
                  <Input id="pg-disabled" disabled placeholder="Nie je upraviteľné" />
                </div>
              </div>
              <div>
                <Label htmlFor="pg-textarea">Textová oblasť</Label>
                <Textarea id="pg-textarea" rows={4} placeholder="Napíšte niečo…" />
              </div>
              <label className="flex items-center gap-3">
                <Checkbox defaultChecked name="pg-check" />
                <span className="text-sm text-zinc-300">Zaškrtávacie pole</span>
              </label>
              <div className="space-y-2 border-t border-line pt-5">
                <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  Správa o úspechu
                </p>
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  Chybová správa
                </p>
              </div>
              <Button className="justify-self-start">Odoslať</Button>
            </form>
          </Card>
        </section>

        {/* ── Pohyb ──────────────────────────────────────────────────────── */}
        <section id="pohyb" className="scroll-mt-20 border-t border-line py-14">
          <SectionHeading
            title="Animácie"
            hint="Reveal obalí obsah GSAP ScrollTrigger animáciou (props: delay, y)."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {['Bez oneskorenia', 'oneskorenie 0,15 s', 'posun Y o 48 px'].map((label, index) => (
              <Reveal key={label} delay={index * 0.15} y={index === 2 ? 48 : 28}>
                <Card className="flex h-40 items-center justify-center p-6">
                  <p className="text-sm text-zinc-400">{label}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-24 grid place-items-center">
            <Reveal y={60}>
              <Card className="px-10 py-8 text-center">
                <p className="text-sm text-zinc-400">Opakuje sa aj pri návrate? Nie —</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">once: true. Animuje sa raz.</p>
              </Card>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-line pt-8 text-xs text-zinc-600">
          Playground má vypnuté indexovanie (noindex). Pri spustení webu možno priečinok{' '}
          <code className="rounded bg-surface-raised px-1 py-0.5">
            src/app/(frontend)/playground
          </code>{' '}
          úplne odstrániť.
        </footer>
      </main>
    </div>
  )
}
