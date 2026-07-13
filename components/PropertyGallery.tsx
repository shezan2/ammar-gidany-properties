"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { PropertyImage } from "@/lib/properties";

interface PropertyGalleryProps {
  images: PropertyImage[];
  name: string;
}

export default function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));
    },
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              i === 0 ? "col-span-2 aspect-[16/10] sm:row-span-2 sm:aspect-auto" : "aspect-[4/3]"
            }`}
            aria-label={`Open photo ${i + 1} of ${images.length}: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 50vw, 33vw"}
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-canvas/0 transition-colors duration-300 group-hover:bg-canvas/20" />
            {i === images.length - 1 && (
              <span className="glass absolute bottom-3 right-3 rounded-full px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-cream">
                {images.length} Photos
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-canvas/[0.97] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${name} photo gallery`}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink-dim">
                {name} — {index + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.6" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1 px-4 pb-6 sm:px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={images[index].src}
                    alt={images[index].alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="glass absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cream transition-colors hover:text-gold sm:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.6" aria-hidden>
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="glass absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cream transition-colors hover:text-gold sm:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.6" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="pb-6 text-center text-sm text-ink-dim">{images[index].alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
