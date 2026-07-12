"use client";

import { motion, useReducedMotion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/** Word-by-word blur/rise reveal, in the spirit of ReactBits' BlurText. */
export default function BlurText({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  as: Tag = "span",
}: BlurTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block will-change-transform"
          initial={
            reduced ? false : { opacity: 0, filter: "blur(12px)", y: 24 }
          }
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.7,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
