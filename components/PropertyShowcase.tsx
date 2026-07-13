import Image from "next/image";
import Link from "next/link";
import Reveal from "./ui/Reveal";
import FavoriteButton from "./FavoriteButton";
import { formatPrice, type Property } from "@/lib/properties";

function Specs({ p, className = "" }: { p: Property; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] uppercase tracking-[0.14em] text-ink-dim ${className}`}
    >
      <span>{p.beds} Beds</span>
      <span className="h-3 w-px bg-line-strong" aria-hidden />
      <span>{p.baths} Baths</span>
      <span className="h-3 w-px bg-line-strong" aria-hidden />
      <span>{p.builtSqft.toLocaleString()} sqft</span>
      <span className="hidden h-3 w-px bg-line-strong sm:block" aria-hidden />
      <span className="hidden sm:inline">{p.tenure}</span>
    </div>
  );
}

function StatusChip({ p }: { p: Property }) {
  return (
    <span className="glass absolute left-5 top-5 z-[2] rounded-full px-4 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-gold">
      {p.status}
    </span>
  );
}

/**
 * Editorial, asymmetric listing layout: one full-width feature with an
 * overlapping title panel, then an offset two-column pair beneath it.
 */
export default function PropertyShowcase({ properties }: { properties: Property[] }) {
  const [feature, ...rest] = properties;

  return (
    <div>
      {/* Feature */}
      <Reveal>
        <article className="group">
          <Link
            href={`/properties/${feature.slug}`}
            className="relative block aspect-[4/3] overflow-hidden rounded-[2px] border border-line sm:aspect-[21/10]"
          >
            <Image
              src={feature.hero.src}
              alt={feature.hero.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/50 via-transparent to-transparent" />
            <StatusChip p={feature} />
            <FavoriteButton slug={feature.slug} className="absolute right-5 top-5 z-[2]" />
          </Link>

          <div className="relative z-10 -mt-14 mr-6 max-w-3xl bg-canvas pt-7 sm:-mt-24 sm:ml-12 sm:mr-0 sm:px-10 sm:pt-9 lg:ml-20">
            <p className="eyebrow">
              {feature.district} — {feature.type}
            </p>
            <Link href={`/properties/${feature.slug}`} className="mt-4 block">
              <h3 className="font-display text-4xl font-medium leading-[1.05] text-cream transition-colors duration-300 hover:text-gold-bright sm:text-5xl lg:text-6xl">
                {feature.name}
              </h3>
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-dim sm:text-base">
              {feature.headline}
            </p>
            <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t border-line pt-6">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-faint">
                  Guide Price
                </p>
                <p className="mt-1.5 font-sans text-2xl font-light tracking-[0.04em] text-gold">
                  {formatPrice(feature.price)}
                </p>
              </div>
              <Specs p={feature} className="pb-1" />
            </div>
          </div>
        </article>
      </Reveal>

      {/* Offset pair */}
      <div className="mt-20 grid gap-x-10 gap-y-20 sm:mt-28 md:grid-cols-2 lg:gap-x-16">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.12} className={i % 2 === 1 ? "md:mt-28" : ""}>
            <article className="group">
              <Link
                href={`/properties/${p.slug}`}
                className="relative block aspect-[4/5] overflow-hidden rounded-[2px] border border-line"
              >
                <Image
                  src={p.hero.src}
                  alt={p.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 580px"
                  className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/45 via-transparent to-transparent" />
                <StatusChip p={p} />
                <FavoriteButton slug={p.slug} className="absolute right-5 top-5 z-[2]" />
              </Link>

              <div className="relative z-10 -mt-12 mr-8 bg-canvas pt-6 sm:mr-14 sm:pr-8">
                <p className="eyebrow text-[0.62rem]">{p.district}</p>
                <Link href={`/properties/${p.slug}`} className="mt-3 block">
                  <h3 className="font-display text-3xl font-medium leading-[1.1] text-cream transition-colors duration-300 hover:text-gold-bright sm:text-4xl">
                    {p.name}
                  </h3>
                </Link>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-line pt-5">
                  <p className="font-sans text-xl font-light tracking-[0.04em] text-gold">
                    {formatPrice(p.price)}
                  </p>
                  <Specs p={p} className="pb-0.5" />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
