"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useFavorites } from "@/lib/favorites";
import { site, waLink } from "@/lib/site";

const links = [
  { href: "/properties", label: "Portfolio" },
  { href: "/valuation", label: "Valuation" },
  { href: "/calculators", label: "Calculators" },
  { href: "/neighbourhoods", label: "Neighbourhoods" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "border-b border-line bg-canvas/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group relative z-[60] flex items-baseline gap-2.5">
            <span className="font-display text-[1.45rem] font-semibold tracking-wide text-cream">
              Ammar Gidany
            </span>
            <span className="hidden text-[0.58rem] uppercase tracking-[0.3em] text-gold sm:block">
              Singapore
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  pathname.startsWith(l.href) ? "text-gold" : "text-ink-dim hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/properties"
              aria-label={`Shortlist — ${favorites.length} saved`}
              className="relative text-ink-dim transition-colors hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.6" aria-hidden>
                <path d="M12 21s-7.5-4.7-9.9-9.2C.5 8.6 2.3 4.9 5.7 4.2c2-.4 4 .4 5.3 2.1.4.5.7 1 1 1.5.3-.5.6-1 1-1.5 1.3-1.7 3.3-2.5 5.3-2.1 3.4.7 5.2 4.4 3.6 7.6C19.5 16.3 12 21 12 21z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.55rem] font-bold text-canvas">
                  {favorites.length}
                </span>
              )}
            </Link>
            <a
              href={waLink("Hello Ammar, I'd like to arrange a private consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/50 px-6 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-canvas"
            >
              Enquire
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-[14px] w-6">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-cream transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-px w-full bg-cream transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-px w-full bg-cream transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-canvas/[0.985] px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className={`block border-b border-line py-4 font-display text-3xl ${
                      pathname.startsWith(l.href) ? "text-gold" : "text-cream"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <a
                href={waLink("Hello Ammar, I'd like to arrange a private consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full bg-gold py-4 text-xs font-medium uppercase tracking-[0.2em] text-canvas"
              >
                WhatsApp Ammar
              </a>
              <a href={site.phoneHref} className="text-center text-sm text-ink-dim">
                {site.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
