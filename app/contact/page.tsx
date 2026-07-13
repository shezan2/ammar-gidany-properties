import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import LazyEmbed from "@/components/ui/LazyEmbed";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with Ammar Gidany — WhatsApp, phone, email or a scheduled private consultation. Typically replies within the hour.",
};

const channels = [
  {
    label: "WhatsApp",
    value: "Typically replies within the hour",
    href: waLink("Hello Ammar, I'd like to get in touch."),
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12.05 2a9.9 9.9 0 0 0-8.4 15.13L2.1 21.9l4.9-1.5A9.9 9.9 0 1 0 12.05 2zm0 18.02c-1.6 0-3.16-.43-4.52-1.24l-.32-.19-2.9.89.87-2.83-.2-.34a8.12 8.12 0 1 1 7.07 3.71zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.72 2.62 4.16 3.68.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
      </svg>
    ),
  },
  {
    label: "Call Ammar",
    value: site.phone,
    href: site.phoneHref,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.6" aria-hidden>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.6" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            One agent. <span className="italic text-gold-bright">One number.</span>
          </>
        }
        description="No call centres, no team inbox. Every message below lands with Ammar personally — and during business hours he usually replies within sixty minutes."
        className="mb-14"
      />

      <div className="mb-16 grid gap-4 sm:grid-cols-3">
        {channels.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="glass group flex h-full items-center gap-4 rounded-[2px] p-6 transition-colors duration-300 hover:border-gold/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-canvas">
                {c.icon}
              </span>
              <span>
                <span className="block font-display text-xl text-cream">{c.label}</span>
                <span className="mt-0.5 block text-xs text-ink-dim">{c.value}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="mb-2 font-display text-3xl text-cream">Send a message</h2>
          <p className="mb-8 text-sm text-ink-dim">
            Buying, selling, or just orienting yourself — all three are good reasons to write.
          </p>
          <EnquiryForm subject="General enquiry" />
          <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed text-ink-faint">
            {site.address}
            <br />
            {site.ceaReg} · {site.agency}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div id="book" className="scroll-mt-28">
            <h2 className="mb-2 font-display text-3xl text-cream">Book a consultation</h2>
            <p className="mb-8 text-sm text-ink-dim">
              Thirty minutes, in person or by video call — pick a slot that suits you.
            </p>
            <LazyEmbed
              src={site.calendlyUrl}
              title="Schedule a private consultation with Ammar"
              poster="/images/photo-1497366754035-f200968a6e72.jpg"
              posterAlt="A calm, well-appointed meeting room"
              badge="Calendar"
              aspect="aspect-[4/5] sm:aspect-[4/4.4]"
              allow="fullscreen"
            />
            <p className="mt-4 text-xs text-ink-faint">
              Prefer not to schedule? WhatsApp is always fastest.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
