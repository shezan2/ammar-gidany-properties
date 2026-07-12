"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

/** Mouse-following radial spotlight card, in the spirit of ReactBits' SpotlightCard. */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(201, 169, 98, 0.10)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
