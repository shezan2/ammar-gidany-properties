"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

const HEADLINE_1 = "Where Singapore's";
const HEADLINE_2 = "finest homes";
const HEADLINE_3 = "change hands.";

function Line({ text, italic = false }: { text: string; italic?: boolean }) {
  return (
    <span className="block overflow-hidden">
      <span
        data-hero-line
        style={{ transform: "translateY(100%)" }}
        className={`block will-change-transform ${italic ? "italic text-gold-bright" : ""}`}
      >
        {text}
      </span>
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root
        .querySelectorAll<HTMLElement>("[data-hero-line], [data-hero-fade]")
        .forEach((el) => {
          el.style.transform = "none";
          el.style.opacity = "1";
        });
      const rule = root.querySelector<HTMLElement>("[data-hero-rule]");
      if (rule) rule.style.transform = "scaleX(1)";
      return;
    }

    animate(root.querySelectorAll("[data-hero-line]"), {
      translateY: ["100%", "0%"],
      duration: 1300,
      delay: stagger(140, { start: 300 }),
      ease: "outExpo",
    });

    animate(root.querySelectorAll("[data-hero-rule]"), {
      scaleX: [0, 1],
      duration: 1400,
      delay: 900,
      ease: "inOutQuart",
    });

    animate(root.querySelectorAll("[data-hero-fade]"), {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 1100,
      delay: stagger(150, { start: 1100 }),
      ease: "outCubic",
    });
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 animate-kenburns motion-reduce:animate-none">
        <Image
          src="/images/photo-1600596542815-ffad4c1539a9.jpg"
          alt="A luxury Singapore residence at dusk with an illuminated pool"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/45 to-canvas/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-canvas/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 sm:pb-28">
        <p
          data-hero-fade
          className="eyebrow mb-6 opacity-0"
        >
          Ammar Gidany · Districts 4 · 9 · 10 · 15
        </p>

        <h1 className="w-full font-display text-[clamp(2.9rem,9vw,6.8rem)] font-medium leading-[1.05] tracking-tight text-cream">
          <Line text={HEADLINE_1} />
          <Line text={HEADLINE_2} italic />
          <Line text={HEADLINE_3} />
        </h1>

        <div
          data-hero-rule
          style={{ transform: "scaleX(0)" }}
          className="hairline-gold mt-9 w-full max-w-md origin-left"
          aria-hidden
        />

        <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p data-hero-fade className="max-w-xl text-base leading-relaxed text-ink-dim opacity-0 sm:text-lg">
            Good Class Bungalows, prime-district residences and seafront penthouses —
            bought and sold with discretion, data and fourteen years of record results.
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-4 opacity-0">
            <MagneticButton>
              <Button href="/properties" size="lg">
                View the Portfolio
              </Button>
            </MagneticButton>
            <Button href="/valuation" variant="outline" size="lg">
              What&apos;s My Home Worth?
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 opacity-0 lg:flex"
        aria-hidden
      >
        <span className="text-[0.58rem] uppercase tracking-[0.35em] text-ink-faint">Scroll</span>
        <span className="h-12 w-px overflow-hidden bg-line-strong">
          <span className="block h-4 w-px animate-pulse-soft bg-gold" />
        </span>
      </div>
    </section>
  );
}
