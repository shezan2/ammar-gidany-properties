"use client";

import { motion } from "motion/react";
import { useFavorites } from "@/lib/favorites";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
}

export default function FavoriteButton({ slug, className = "" }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavorites();
  const active = isFavorite(slug);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.82 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label={active ? "Remove from shortlist" : "Add to shortlist"}
      aria-pressed={active}
      className={`glass flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:border-gold/50 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-[18px] w-[18px] transition-all duration-300 ${
          active ? "fill-gold stroke-gold" : "fill-transparent stroke-cream/80"
        }`}
        strokeWidth="1.6"
        aria-hidden
      >
        <path d="M12 21s-7.5-4.7-9.9-9.2C.5 8.6 2.3 4.9 5.7 4.2c2-.4 4 .4 5.3 2.1.4.5.7 1 1 1.5.3-.5.6-1 1-1.5 1.3-1.7 3.3-2.5 5.3-2.1 3.4.7 5.2 4.4 3.6 7.6C19.5 16.3 12 21 12 21z" />
      </svg>
    </motion.button>
  );
}
