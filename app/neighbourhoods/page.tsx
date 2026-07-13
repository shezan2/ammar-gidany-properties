import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { neighbourhoods } from "@/lib/neighbourhoods";

export const metadata: Metadata = {
  title: "Neighbourhood Guides",
  description:
    "Hyper-local guides to Singapore's prime districts — Bukit Timah, Orchard, East Coast, Holland Village and Sentosa Cove. Schools, dining, connectivity and market intelligence.",
};

export default function NeighbourhoodsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading
        eyebrow="Neighbourhood Intelligence"
        title={
          <>
            The districts,
            <br />
            <span className="italic text-gold-bright">street by street.</span>
          </>
        }
        description="Fourteen years of walking these neighbourhoods, distilled. Where the schools are, where the locals actually eat, and where the market is quietly moving."
        className="mb-16"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {neighbourhoods.map((n, i) => (
          <Reveal key={n.slug} delay={(i % 2) * 0.1}>
            <Link
              href={`/neighbourhoods/${n.slug}`}
              className={`group relative block overflow-hidden rounded-2xl border border-line ${
                i === 0 ? "aspect-[16/10] md:col-span-2 md:aspect-[21/9]" : "aspect-[16/11]"
              }`}
            >
              <Image
                src={n.hero.src}
                alt={n.hero.alt}
                fill
                priority={i === 0}
                sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/35 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">{n.district}</p>
                <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">{n.name}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-dim">{n.tagline}</p>
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.2em] text-cream/70 transition-colors duration-300 group-hover:text-gold">
                  Read the guide →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
