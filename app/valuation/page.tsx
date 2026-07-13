import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ValuationForm from "@/components/ValuationForm";

export const metadata: Metadata = {
  title: "What's My Home Worth? — Free Private Valuation",
  description:
    "Receive a private, evidence-based valuation of your Singapore property within 24 hours. Comparable transactions, buyer demand and a candid recommendation — no obligation.",
};

const trustPoints = [
  {
    title: "Evidence, not flattery",
    body: "Your number is built from URA caveats, recent closings and live buyer demand — not inflated to win your listing.",
  },
  {
    title: "24-hour turnaround",
    body: "A personal valuation from Ammar, typically delivered the same day by WhatsApp or email.",
  },
  {
    title: "Completely private",
    body: "No portals notified, no signboards, no calls from strangers. Your details never leave Ammar's desk.",
  },
];

export default function ValuationPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px]">
        <Image
          src="/images/photo-1600585154340-be6161a56a0c.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/70 via-canvas/85 to-canvas" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow mb-6">Free Home Valuation</p>
              <h1 className="font-display text-5xl font-medium leading-[1.05] text-cream sm:text-6xl">
                What&apos;s your home{" "}
                <span className="italic text-gold-bright">really worth?</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-dim sm:text-lg">
                Two minutes of questions. Twenty-four hours later, a valuation you can act on —
                grounded in the transactions that actually closed on your street, not portal
                asking prices.
              </p>
            </Reveal>

            <div className="mt-12 space-y-7">
              {trustPoints.map((t, i) => (
                <Reveal key={t.title} delay={0.1 + i * 0.1}>
                  <div className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-lg text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-cream">{t.title}</h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-dim">
                        {t.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-12">
              <figure className="border-l-2 border-gold/50 pl-6">
                <blockquote className="font-display text-xl italic leading-[1.5] text-ink-dim">
                  “Two agencies valued our Nassim apartment S$800K apart. Ammar&apos;s number sat
                  between them — and it was the one the market paid, seventeen days later.”
                </blockquote>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Sarah &amp; Dominic Teo — Sellers, The Nassim
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ValuationForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
