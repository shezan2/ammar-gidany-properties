"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcMortgage, sgd, LTV_LIMIT } from "@/lib/calculators";

interface MortgageQuickCalcProps {
  price: number;
}

/** Compact monthly-repayment estimator, pre-filled with the listing's guide price. */
export default function MortgageQuickCalc({ price }: MortgageQuickCalcProps) {
  const [ltvPct, setLtvPct] = useState(LTV_LIMIT * 100);
  const [rate, setRate] = useState(3.2);
  const [years, setYears] = useState(30);

  const loan = (price * ltvPct) / 100;
  const result = useMemo(() => calcMortgage(loan, rate, years), [loan, rate, years]);

  const fill = (v: number, min: number, max: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="glass rounded-[2px] p-6 sm:p-8">
      <p className="eyebrow mb-1.5">Finance This Home</p>
      <p className="mb-7 text-sm text-ink-dim">
        Indicative monthly repayment at today&apos;s typical bank rates.
      </p>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-dim">
              Loan · {ltvPct.toFixed(0)}% LTV
            </span>
            <span className="text-sm text-cream">{sgd(loan)}</span>
          </div>
          <input
            type="range"
            min={20}
            max={75}
            step={5}
            value={ltvPct}
            onChange={(e) => setLtvPct(Number(e.target.value))}
            style={{ "--fill": `${fill(ltvPct, 20, 75)}%` } as React.CSSProperties}
            aria-label="Loan-to-value percentage"
          />
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-dim">
              Interest Rate
            </span>
            <span className="text-sm text-cream">{rate.toFixed(2)}% p.a.</span>
          </div>
          <input
            type="range"
            min={1.5}
            max={5.5}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            style={{ "--fill": `${fill(rate, 1.5, 5.5)}%` } as React.CSSProperties}
            aria-label="Interest rate"
          />
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-dim">Tenure</span>
            <span className="text-sm text-cream">{years} years</span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ "--fill": `${fill(years, 5, 30)}%` } as React.CSSProperties}
            aria-label="Loan tenure in years"
          />
        </div>
      </div>

      <div className="mt-8 rounded-[2px] border border-gold/25 bg-gold/[0.06] p-5">
        <p className="text-[0.62rem] uppercase tracking-[0.25em] text-ink-dim">
          Estimated Monthly
        </p>
        <p className="mt-1.5 font-sans text-3xl font-light tracking-tight text-gold">
          {sgd(result.monthly)}
        </p>
        <p className="mt-2 text-xs text-ink-faint">
          Downpayment {sgd(price - loan)} · Total interest {sgd(result.totalInterest)}
        </p>
      </div>

      <Link
        href="/calculators"
        className="mt-5 inline-block text-[0.68rem] uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-bright"
      >
        Full affordability &amp; stamp duty calculators →
      </Link>
    </div>
  );
}
