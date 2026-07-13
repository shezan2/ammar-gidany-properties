import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "./ui/SpotlightCard";
import FavoriteButton from "./FavoriteButton";
import { formatPrice, type Property } from "@/lib/properties";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export default function PropertyCard({ property: p, priority = false }: PropertyCardProps) {
  return (
    <SpotlightCard className="rounded-[2px] border border-line bg-surface transition-colors duration-500 hover:border-gold/30">
      <Link href={`/properties/${p.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[2px]">
          <Image
            src={p.hero.src}
            alt={p.hero.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
          <span className="glass absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-gold">
            {p.status}
          </span>
          <FavoriteButton slug={p.slug} className="absolute right-4 top-4 z-[2]" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/70">{p.district}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 sm:p-7">
          <div>
            <h3 className="font-display text-2xl font-medium leading-snug text-cream transition-colors duration-300 group-hover:text-gold-bright sm:text-[1.7rem]">
              {p.name}
            </h3>
            <p className="mt-1.5 line-clamp-1 text-sm text-ink-dim">{p.headline}</p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-faint">Guide Price</p>
              <p className="mt-1 font-sans text-xl font-light tracking-[0.04em] text-gold">
                {formatPrice(p.price)}
              </p>
            </div>
            <p className="text-xs text-ink-faint">{p.tenure}</p>
          </div>
          <div className="flex items-center gap-5 border-t border-line pt-4 text-[0.8rem] text-ink-dim">
            <span>{p.beds} Beds</span>
            <span className="h-3 w-px bg-line-strong" aria-hidden />
            <span>{p.baths} Baths</span>
            <span className="h-3 w-px bg-line-strong" aria-hidden />
            <span>{p.builtSqft.toLocaleString()} sqft</span>
            {p.landSqft && (
              <>
                <span className="hidden h-3 w-px bg-line-strong sm:block" aria-hidden />
                <span className="hidden sm:inline">{p.landSqft.toLocaleString()} sqft land</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}
