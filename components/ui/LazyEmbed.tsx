"use client";

import { useState } from "react";
import Image from "next/image";

interface LazyEmbedProps {
  src: string;
  title: string;
  poster: string;
  posterAlt: string;
  badge?: string;
  aspect?: string;
  allow?: string;
}

/**
 * Click-to-load iframe: shows a cinematic poster until the visitor asks for
 * the embed, keeping heavy third-party scripts off the critical path.
 */
export default function LazyEmbed({
  src,
  title,
  poster,
  posterAlt,
  badge,
  aspect = "aspect-video",
  allow = "fullscreen; autoplay; xr-spatial-tracking",
}: LazyEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-line bg-surface ${aspect}`}>
      {loaded ? (
        <iframe
          src={src}
          title={title}
          allow={allow}
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer text-left"
          aria-label={`Load ${title}`}
        >
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 820px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-canvas/20 to-transparent" />
          {badge && (
            <span className="glass absolute left-5 top-5 rounded-full px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-gold">
              {badge}
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-canvas/60 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-canvas">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-7 w-7 text-gold transition-colors group-hover:text-canvas"
                aria-hidden
              >
                <path d="M8 5.14v13.72L19 12 8 5.14z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-5 left-5 right-5 text-sm text-cream/90">{title}</span>
        </button>
      )}
    </div>
  );
}
