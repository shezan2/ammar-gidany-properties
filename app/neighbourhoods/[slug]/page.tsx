import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import MapLoader from "@/components/MapLoader";
import PropertyCard from "@/components/PropertyCard";
import { getNeighbourhood, neighbourhoods } from "@/lib/neighbourhoods";
import { properties } from "@/lib/properties";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return neighbourhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighbourhood(slug);
  if (!n) return {};
  return {
    title: `${n.name} Guide`,
    description: `${n.tagline}. Schools, dining, connectivity and market intelligence for ${n.name}, ${n.district}.`,
  };
}

const columns = [
  { key: "schools", label: "Schools & Education" },
  { key: "dining", label: "Dining & Culture" },
  { key: "connectivity", label: "Connectivity" },
] as const;

export default async function NeighbourhoodPage({ params }: PageProps) {
  const { slug } = await params;
  const n = getNeighbourhood(slug);
  if (!n) notFound();

  const related = properties.filter((p) => n.relatedPropertySlugs.includes(p.slug));
  const others = neighbourhoods.filter((x) => x.slug !== n.slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="relative flex min-h-[72svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={n.hero.src}
            alt={n.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/45 to-canvas/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-44 sm:px-8">
          <Reveal y={20}>
            <p className="eyebrow mb-4">Neighbourhood Guide · {n.district}</p>
            <h1 className="font-display text-5xl font-medium leading-[1.03] text-cream sm:text-7xl">
              {n.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">{n.tagline}</p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Stats */}
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-line bg-line lg:grid-cols-4 -mt-0 my-14 sm:my-16">
          {n.stats.map((s) => (
            <div key={s.label} className="bg-canvas-raised p-6">
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-faint">{s.label}</p>
              <p className="mt-2 font-sans text-lg font-light leading-snug tracking-[0.02em] text-gold sm:text-xl">
                {s.value}
              </p>
            </div>
          ))}
        </section>

        {/* Intro */}
        <section className="max-w-3xl pb-16">
          <Reveal>
            {n.intro.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mb-6 font-display text-xl leading-[1.65] text-ink-dim sm:text-[1.35rem]"
              >
                {para}
              </p>
            ))}
          </Reveal>
        </section>

        {/* Three columns */}
        <section className="grid gap-6 pb-16 md:grid-cols-3">
          {columns.map((col, i) => (
            <Reveal key={col.key} delay={i * 0.1}>
              <div className="glass h-full rounded-[2px] p-7">
                <h2 className="eyebrow mb-6">{col.label}</h2>
                <ul className="space-y-5">
                  {n[col.key].map((item) => (
                    <li key={item.name}>
                      <p className="text-[0.95rem] font-medium text-cream">{item.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-dim">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </section>

        {/* Market note */}
        <Reveal className="pb-16">
          <div className="rounded-[2px] border border-gold/25 bg-gold/[0.05] p-8 sm:p-10">
            <p className="eyebrow mb-4">Ammar&apos;s Market Read</p>
            <p className="max-w-3xl font-display text-xl leading-relaxed text-cream sm:text-2xl">
              {n.marketNote}
            </p>
          </div>
        </Reveal>

        {/* Map */}
        <Reveal className="pb-16">
          <MapLoader
            center={[n.lat, n.lng]}
            zoom={14}
            markers={[
              { lat: n.lat, lng: n.lng, label: n.name, sublabel: n.district, kind: "property" },
              ...related.map((p) => ({
                lat: p.lat,
                lng: p.lng,
                label: p.name,
                sublabel: p.address,
                href: `/properties/${p.slug}`,
                kind: "property" as const,
              })),
            ]}
            className="h-[400px] sm:h-[460px]"
          />
        </Reveal>

        {/* Related listings */}
        {related.length > 0 && (
          <section className="pb-20">
            <Reveal>
              <p className="eyebrow mb-3">Currently Available Here</p>
              <h2 className="mb-10 font-display text-3xl text-cream sm:text-4xl">
                Ammar&apos;s listings in {n.name}
              </h2>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* CTA + other guides */}
        <section className="border-t border-line py-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <Reveal>
              <h2 className="max-w-xl font-display text-3xl leading-tight text-cream sm:text-4xl">
                Thinking of buying or selling in{" "}
                <span className="italic text-gold-bright">{n.name}?</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-dim">
                Ammar transacts here every quarter and holds a live database of buyers waiting for
                this district.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex shrink-0 gap-4">
              <Button href="/valuation" size="lg">
                Value My Home
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Ammar
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/neighbourhoods/${o.slug}`}
                className="group rounded-[2px] border border-line bg-canvas-raised p-5 transition-colors duration-300 hover:border-gold/40"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-faint">
                  Next Guide
                </p>
                <p className="mt-1.5 font-display text-xl text-cream transition-colors group-hover:text-gold-bright">
                  {o.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
