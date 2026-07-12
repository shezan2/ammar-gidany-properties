import Link from "next/link";
import { site, waLink } from "@/lib/site";
import AlertsSignup from "./AlertsSignup";

const nav = [
  { href: "/properties", label: "Portfolio" },
  { href: "/valuation", label: "Home Valuation" },
  { href: "/calculators", label: "Calculators" },
  { href: "/neighbourhoods", label: "Neighbourhood Guides" },
  { href: "/about", label: "About Ammar" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-raised">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-medium text-cream">Ammar Gidany</p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.3em] text-gold">
              Singapore Luxury Real Estate
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-dim">
              Be the first to hear about new and off-market residences across Districts 4, 9, 10
              and 15 — before they reach the portals.
            </p>
            <div className="mt-5">
              <AlertsSignup />
            </div>
          </div>

          <div>
            <p className="eyebrow mb-6">Explore</p>
            <ul className="space-y-3.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-dim transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-6">Contact</p>
            <ul className="space-y-3.5 text-sm text-ink-dim">
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={waLink("Hello Ammar, I found you through your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  WhatsApp — typically replies within the hour
                </a>
              </li>
              <li className="pt-2 leading-relaxed text-ink-faint">{site.address}</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-dim transition-colors hover:border-gold/50 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-dim transition-colors hover:border-gold/50 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M6.5 8.8H3.6V20h2.9V8.8zM5 7.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4zM20.4 13.9c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V8.8h-2.9V20h2.9v-6c0-1.6.8-2.5 2.1-2.5 1.2 0 1.9.8 1.9 2.5v6h3.1v-6.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="text-xs leading-relaxed text-ink-faint">
            {site.name} · {site.ceaReg} · {site.agency}
          </p>
          <p className="mt-2 text-xs text-ink-faint">
            © {new Date().getFullYear()} {site.name}. All property information is provided in good
            faith and subject to availability. This demonstration site uses illustrative data.
          </p>
        </div>
      </div>
    </footer>
  );
}
