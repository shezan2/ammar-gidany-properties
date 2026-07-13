import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import BlurText from "@/components/ui/BlurText";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Ammar",
  description:
    "Fourteen years in Singapore's prime districts. Meet Ammar Gidany — the philosophy, the process and the person behind the results.",
};

const pillars = [
  {
    title: "Fewer clients, deeper work",
    body: "Ammar caps his book at a handful of active mandates at any time. Every listing gets his personal attention — not a team member's, not an assistant's.",
  },
  {
    title: "Evidence over enthusiasm",
    body: "Pricing built from URA caveats, closed transactions and live buyer demand. If your expectations can't be met, he'll say so before taking the mandate.",
  },
  {
    title: "Discretion as default",
    body: "Off-market first, portals last. Many of Ammar's finest transactions were never publicly advertised — and never will be.",
  },
];

const timeline = [
  {
    year: "2012",
    title: "First licence, first lesson",
    body: "Started in the East Coast rental market, learning the island one street at a time — and learning that trust compounds faster than commissions.",
  },
  {
    year: "2015",
    title: "The move to prime",
    body: "Closed a first landed transaction in Bukit Timah and never looked back. Districts 9, 10 and 15 became home turf.",
  },
  {
    year: "2018",
    title: "S$100M year",
    body: "Crossed nine figures in annual transactions, driven almost entirely by repeat clients and referrals.",
  },
  {
    year: "2021",
    title: "GCB & Sentosa practice",
    body: "Began specialising in Good Class Bungalows and Sentosa Cove waterfront homes — the most discreet end of the market.",
  },
  {
    year: "Today",
    title: "S$1.2B and counting",
    body: "486 homes transacted. An average of 19 days to sell. And still answering his own WhatsApp.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pt-44">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">About Ammar</p>
            </Reveal>
            <BlurText
              as="h1"
              text="Real estate is not about property. It's about people at a turning point."
              className="font-display text-4xl font-medium leading-[1.12] text-cream sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.4}>
              <div className="mt-9 max-w-xl space-y-6 font-display text-xl leading-[1.65] text-ink-dim sm:text-[1.35rem]">
                <p>
                  Every client Ammar has ever served was standing at a threshold — a growing
                  family, a company sold, a return home, a chapter closing. The property is just
                  the doorway. His job, as he sees it, is to make sure nobody stumbles walking
                  through it.
                </p>
                <p>
                  Born and raised in Singapore, Ammar grew up between Katong's shophouses and his
                  grandmother's flat in Tiong Bahru — which may explain why he can talk heritage
                  architecture and URA master plans with equal fluency. He entered real estate in
                  2012, spent three years learning the island street by street, and has spent the
                  decade since operating almost exclusively in the prime districts.
                </p>
                <p>
                  Today his practice is deliberately small: a handful of exclusive mandates,
                  clients who mostly arrive by referral, and a promise he has kept for fourteen
                  years — the person you engage is the person who shows up, negotiates, and picks
                  up the phone at 11pm.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.5} className="mt-10">
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <Button href="/contact#book" size="lg">
                    Meet Ammar
                  </Button>
                </MagneticButton>
                <Button
                  href={waLink("Hello Ammar, I read your story — I'd like to talk.")}
                  variant="outline"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Him Directly
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:pt-10">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/images/photo-1560250097-0b93528c311a.jpg"
                  alt="Portrait of Ammar Gidany"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent" />
              </div>
              <div className="glass absolute -bottom-6 left-6 right-6 rounded-xl p-5 sm:left-10 sm:right-auto sm:max-w-xs">
                <p className="font-display text-xl text-cream">Ammar Gidany</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-dim">
                  {site.ceaReg}
                  <br />
                  {site.agency}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-line bg-canvas-raised py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-4">The Philosophy</p>
            <h2 className="mb-14 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-cream sm:text-5xl">
              Three rules, <span className="italic text-gold-bright">never broken.</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.12}>
                <div className="glass h-full rounded-2xl p-8">
                  <span className="font-display text-5xl text-gold/40">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl text-cream">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-4">The Journey</p>
          <h2 className="mb-16 font-display text-4xl font-medium leading-[1.1] text-cream sm:text-5xl">
            Fourteen years, <span className="italic text-gold-bright">street by street.</span>
          </h2>
        </Reveal>
        <div className="relative border-l border-line pl-8 sm:pl-12">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08} className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-canvas sm:-left-[3.05rem]"
                aria-hidden
              />
              <p className="font-display text-lg text-gold">{t.year}</p>
              <h3 className="mt-1 font-display text-2xl text-cream">{t.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-dim">{t.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-line bg-canvas-raised py-20 sm:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-medium leading-[1.1] text-cream sm:text-5xl">
              The first conversation is{" "}
              <span className="italic text-gold-bright">always free.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-dim">
              Thirty minutes, no obligation, no follow-up pressure. Bring your questions about
              buying, selling or simply where the market is heading.
            </p>
            <div className="mt-9">
              <MagneticButton>
                <Button href="/contact#book" size="lg">
                  Book a Consultation
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
