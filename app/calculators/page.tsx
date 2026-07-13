import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CalculatorTabs from "@/components/CalculatorTabs";

export const metadata: Metadata = {
  title: "Singapore Property Calculators — Mortgage, TDSR & Stamp Duty",
  description:
    "Plan your purchase with Singapore-specific tools: mortgage repayments, TDSR/LTV affordability, and Buyer's Stamp Duty + ABSD with current 2026 rates.",
};

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading
        eyebrow="Financial Planning"
        title={
          <>
            Know your numbers
            <br />
            <span className="italic text-gold-bright">before you fall in love.</span>
          </>
        }
        description="Singapore-specific tools using the actual MAS rules and IRAS rates — TDSR at 55%, LTV at 75%, and the current BSD and ABSD schedules. Indicative figures; Ammar will refine them with your banker."
        className="mb-14"
      />

      <Reveal>
        <CalculatorTabs />
      </Reveal>

      <Reveal className="mt-20">
        <div className="glass flex flex-col items-start justify-between gap-6 rounded-[2px] p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl text-cream sm:text-3xl">
              Want these numbers <span className="italic text-gold-bright">stress-tested?</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-dim">
              Ammar reviews your full position — CPF, existing property, sale timing, ABSD
              remission where applicable — and connects you with private bankers for live rates.
            </p>
          </div>
          <Link
            href="/contact#book"
            className="shrink-0 rounded-full bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-canvas transition-colors duration-300 hover:bg-gold-bright"
          >
            Book a Consultation
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
