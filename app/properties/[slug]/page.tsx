import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LazyEmbed from "@/components/ui/LazyEmbed";
import PropertyGallery from "@/components/PropertyGallery";
import FavoriteButton from "@/components/FavoriteButton";
import MapLoader from "@/components/MapLoader";
import MortgageQuickCalc from "@/components/MortgageQuickCalc";
import EnquiryForm from "@/components/EnquiryForm";
import { getProperty, properties, formatPrice } from "@/lib/properties";
import { waLink } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.headline}. ${p.beds} bedrooms · ${p.builtSqft.toLocaleString()} sqft · ${p.tenure} · Guide ${formatPrice(p.price)}.`,
    openGraph: { images: [{ url: p.hero.src }] },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const idx = properties.findIndex((x) => x.slug === p.slug);
  const prev = properties[(idx - 1 + properties.length) % properties.length];
  const next = properties[(idx + 1) % properties.length];

  const mapMarkers = [
    {
      lat: p.lat,
      lng: p.lng,
      label: p.name,
      sublabel: p.address,
      kind: "property" as const,
    },
    ...p.amenities.map((a) => ({
      lat: a.lat,
      lng: a.lng,
      label: a.name,
      sublabel: a.distance,
      kind: a.type,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: p.name,
    description: p.headline,
    address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
    geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng },
    numberOfRooms: p.beds,
    floorSize: { "@type": "QuantitativeValue", value: p.builtSqft, unitText: "sqft" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Cinematic header */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={p.hero.src}
            alt={p.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-canvas/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-44 sm:px-8">
          <Reveal y={20}>
            <div className="flex items-center gap-3">
              <span className="glass rounded-full px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.25em] text-gold">
                {p.status}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/70">
                {p.district}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="font-display text-4xl font-medium leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
                  {p.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-ink-dim sm:text-lg">{p.headline}</p>
              </div>
              <div className="flex items-center gap-4">
                <FavoriteButton slug={p.slug} />
                <div className="text-right">
                  <p className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-faint">
                    Guide Price
                  </p>
                  <p className="font-sans text-2xl font-light tracking-[0.04em] text-gold sm:text-3xl">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line-strong/60 pt-6 text-sm text-cream/90">
              <span>{p.beds} Bedrooms</span>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden />
              <span>{p.baths} Bathrooms</span>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden />
              <span>{p.builtSqft.toLocaleString()} sqft built</span>
              {p.landSqft && (
                <>
                  <span className="h-3.5 w-px bg-line-strong" aria-hidden />
                  <span>{p.landSqft.toLocaleString()} sqft land</span>
                </>
              )}
              <span className="h-3.5 w-px bg-line-strong" aria-hidden />
              <span>{p.tenure}</span>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden />
              <span>TOP {p.topYear}</span>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden />
              <span>S${p.psf.toLocaleString()} psf</span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Gallery */}
        <section className="py-16 sm:py-20">
          <Reveal>
            <PropertyGallery images={p.gallery} name={p.name} />
          </Reveal>
        </section>

        {/* Narrative + sidebar */}
        <section className="grid gap-14 pb-20 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">The Residence</p>
              {p.description.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="mb-6 max-w-3xl font-display text-xl leading-[1.65] text-ink-dim sm:text-[1.35rem]"
                >
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-10">
              <p className="eyebrow mb-6">At a Glance</p>
              <ul className="grid gap-3.5 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[0.92rem] text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* 3D tour + film */}
            <Reveal className="mt-14">
              <p className="eyebrow mb-2">Walk Through It</p>
              <h2 className="mb-7 font-display text-3xl text-cream sm:text-4xl">
                Tour the home <span className="italic text-gold-bright">from anywhere.</span>
              </h2>
              <div className="space-y-6">
                <LazyEmbed
                  src={`https://my.matterport.com/show/?m=${p.matterportId}&play=1&brand=0`}
                  title={`${p.name} — interactive 3D tour`}
                  poster={p.gallery[1]?.src ?? p.hero.src}
                  posterAlt={p.gallery[1]?.alt ?? p.hero.alt}
                  badge="Matterport 3D Tour"
                />
                {p.youtubeId && (
                  <LazyEmbed
                    src={`https://www.youtube-nocookie.com/embed/${p.youtubeId}?autoplay=1&rel=0`}
                    title={`${p.name} — film walkthrough`}
                    poster={p.videoPoster}
                    posterAlt={`Preview frame from the ${p.name} film`}
                    badge="Film Walkthrough"
                  />
                )}
              </div>
            </Reveal>

            {/* Location */}
            <Reveal className="mt-14">
              <p className="eyebrow mb-2">The Setting</p>
              <h2 className="mb-7 font-display text-3xl text-cream sm:text-4xl">
                Everything that matters, <span className="italic text-gold-bright">minutes away.</span>
              </h2>
              <MapLoader
                center={[p.lat, p.lng]}
                zoom={15}
                markers={mapMarkers}
                className="h-[420px] sm:h-[480px]"
              />
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {p.amenities.map((a) => (
                  <li
                    key={a.name}
                    className="flex items-center justify-between gap-4 border-b border-line pb-3 text-sm"
                  >
                    <span className="text-ink">{a.name}</span>
                    <span className="shrink-0 text-xs text-gold">{a.distance}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <MortgageQuickCalc price={p.price} />
            </Reveal>
            <Reveal delay={0.15}>
              <div className="glass rounded-2xl p-6 sm:p-8" id="enquire">
                <p className="eyebrow mb-1.5">Private Viewing</p>
                <p className="mb-6 text-sm leading-relaxed text-ink-dim">
                  Viewings are by appointment and always accompanied by Ammar personally.
                </p>
                <EnquiryForm
                  subject={p.name}
                  defaultMessage={`Hello Ammar, I'd like to arrange a private viewing of ${p.name}.`}
                />
                <div className="mt-5 border-t border-line pt-5">
                  <a
                    href={waLink(`Hello Ammar, I'm interested in ${p.name} (guide ${formatPrice(p.price)}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.7rem] uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-bright"
                  >
                    Prefer WhatsApp? Message Ammar now →
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </section>
      </div>

      {/* Prev / next */}
      <nav className="grid border-t border-line sm:grid-cols-2" aria-label="More residences">
        {[
          { p: prev, dir: "Previous" },
          { p: next, dir: "Next" },
        ].map(({ p: other, dir }) => (
          <Link
            key={dir}
            href={`/properties/${other.slug}`}
            className={`group relative overflow-hidden px-6 py-12 transition-colors duration-500 hover:bg-surface sm:px-12 ${
              dir === "Next" ? "text-right sm:border-l sm:border-line" : ""
            }`}
          >
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-ink-faint">
              {dir} Residence
            </p>
            <p className="mt-2 font-display text-2xl text-cream transition-colors duration-300 group-hover:text-gold-bright sm:text-3xl">
              {other.name}
            </p>
            <p className="mt-1 text-sm text-ink-dim">{formatPrice(other.price)}</p>
          </Link>
        ))}
      </nav>
    </>
  );
}
