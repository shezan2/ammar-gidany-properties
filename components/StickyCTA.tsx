"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { waLink } from "@/lib/site";

/** Floating contact actions — WhatsApp + consultation booking, on every page. */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-8 sm:right-8"
        >
          <Link
            href="/contact#book"
            className="glass hidden items-center rounded-full px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:border-gold/60 hover:text-gold sm:flex"
          >
            Book a Consultation
          </Link>
          <a
            href={waLink("Hello Ammar, I'm browsing your portfolio and would like to speak.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_36px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-108"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
              <path d="M12.05 2a9.9 9.9 0 0 0-8.4 15.13L2.1 21.9l4.9-1.5A9.9 9.9 0 1 0 12.05 2zm0 18.02c-1.6 0-3.16-.43-4.52-1.24l-.32-.19-2.9.89.87-2.83-.2-.34a8.12 8.12 0 1 1 7.07 3.71zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.72 2.62 4.16 3.68.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
