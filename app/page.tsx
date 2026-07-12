import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Marquee from "@/components/ui/Marquee";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import PropertyCard from "@/components/PropertyCard";
import { properties, recentlySold, testimonials, formatPriceShort } from "@/lib/properties";
import { neighbourhoods } from "@/lib/neighbourhoods";
import { stats } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats band */}
      <section className="border-y border-line bg-canvas-raised">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="flex flex-col items-center gap-2 text-center">
              <span className="font-display text-4xl text-gold sm:text-5xl">
                <CountUp
                  value={s.value}
                  prefix={"prefix" in s ? s.prefix : ""}
                  suffix={s.suffix}
                  decimals={"decimals" in s ? s.decimals : 0}
                />
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ink-faint">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured portfolio */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Current Portfolio"
            title={
              <>
                Three residences.
                <br />
                <span className="italic text-gold-bright">Zero compromise.</span>
              </>
            }
            description="Every home Ammar represents is personally vetted, professionally filmed and priced with evidence. This is what is available today."
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button href="/properties" variant="outline">
              Explore All
            </Button>
          </Reveal>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12}>
              <PropertyCard property={p} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recently sold */}
      <section className="border-y border-line bg-canvas-raised py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Track Record"
            title={
              <>
                Recently sold, <span className="italic text-gold-bright">quietly.</span>
              </>
            }
            description="A selection of results from the past twelve months. Many of Ammar's transactions never reach the open market."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentlySold.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/25 to-transparent" />
                  <span className="glass absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-gold">
                    Sold · {s.days} days
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[0.6rem] uppercase tracking-[0.25em] text-cream/60">
                      {s.district}
                    </p>
                    <p className="mt-1 font-display text-xl text-cream">{s.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-display text-lg text-gold">
                        {formatPriceShort(s.soldPrice)}
                      </p>
                      {s.overAsking && (
                        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-emerald-400/90">
                          {s.overAsking}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Client Words"
            title={
              <>
                Trusted by families,
                <br />
                <span className="italic text-gold-bright">funds and founders.</span>
              </>
            }
            align="center"
            className="mb-16 items-center"
          />
        </div>
        <Marquee duration={55}>
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="w-[340px] shrink-0 rounded-2xl border border-line bg-surface p-7 sm:w-[420px]"
            >
              <svg viewBox="0 0 24 24" className="mb-4 h-6 w-6 fill-gold/60" aria-hidden>
                <path d="M9.6 4C5.9 6.1 3.5 9.6 3.5 13.7c0 3.4 2 6.3 5.1 6.3 2.4 0 4.2-1.9 4.2-4.2 0-2.2-1.6-3.9-3.7-3.9-.4 0-.9.1-1 .1.3-2.3 2.4-5 4.6-6.2L9.6 4zm10.7 0c-3.7 2.1-6.1 5.6-6.1 9.7 0 3.4 2 6.3 5.1 6.3 2.4 0 4.2-1.9 4.2-4.2 0-2.2-1.6-3.9-3.7-3.9-.4 0-.9.1-1 .1.3-2.3 2.4-5 4.6-6.2L20.3 4z" />
              </svg>
              <blockquote className="text-[0.92rem] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-display text-sm text-gold">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-cream">{t.name}</span>
                  <span className="block text-xs text-ink-faint">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </section>

      {/* Neighbourhood teasers */}
      <section className="border-t border-line bg-canvas-raised py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Neighbourhood Intelligence"
              title={
                <>
                  Know the street,
                  <br />
                  not just <span className="italic text-gold-bright">the skyline.</span>
                </>
              }
              description="Hyper-local guides to the districts Ammar works every week — schools, dining, connectivity and where the market is really moving."
            />
            <Reveal delay={0.2} className="shrink-0">
              <Button href="/neighbourhoods" variant="outline">
                All Guides
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {neighbourhoods.slice(0, 3).map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.1}>
                <Link
                  href={`/neighbourhoods/${n.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-line sm:aspect-[4/5]"
                >
                  <Image
                    src={n.hero.src}
                    alt={n.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                      {n.district}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-cream">{n.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-dim">{n.tagline}</p>
                    <p className="mt-4 text-[0.68rem] uppercase tracking-[0.2em] text-cream/70 transition-colors duration-300 group-hover:text-gold">
                      Read the guide →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation CTA */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=80"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/60 to-canvas" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow mb-6">Thinking of Selling?</p>
            <h2 className="font-display text-4xl font-medium leading-[1.08] text-cream sm:text-6xl">
              Your home may be worth more than{" "}
              <span className="italic text-gold-bright">you think.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
              Receive a private, evidence-based valuation within 24 hours — recent comparable
              transactions, current buyer demand, and a candid recommendation. No obligation.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button href="/valuation" size="lg">
                  Get My Free Valuation
                </Button>
              </MagneticButton>
              <Button href="/contact" variant="outline" size="lg">
                Speak to Ammar
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
