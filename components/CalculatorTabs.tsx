"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  calcMortgage,
  calcAffordability,
  calcBSD,
  calcABSD,
  absdRate,
  sgd,
  STRESS_RATE,
  type ResidencyProfile,
} from "@/lib/calculators";
import { inputCls, labelCls } from "./useLeadSubmit";

const tabs = [
  { id: "mortgage", label: "Mortgage" },
  { id: "affordability", label: "Affordability" },
  { id: "stamp-duty", label: "Stamp Duty" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Slider({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-dim">{label}</span>
        <span className="text-sm text-cream">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties}
        aria-label={label}
      />
    </div>
  );
}

function ResultCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-[2px] border border-gold/25 bg-gold/[0.06] p-5">
      <p className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-dim">{label}</p>
      <p className="mt-1.5 font-sans text-2xl font-light tracking-tight text-gold sm:text-3xl">
        {value}
      </p>
      {sub && <p className="mt-2 text-xs leading-relaxed text-ink-faint">{sub}</p>}
    </div>
  );
}

// ---------- Mortgage ----------

function MortgagePanel() {
  const [price, setPrice] = useState(3_000_000);
  const [ltv, setLtv] = useState(75);
  const [rate, setRate] = useState(3.2);
  const [years, setYears] = useState(30);

  const loan = (price * ltv) / 100;
  const r = useMemo(() => calcMortgage(loan, rate, years), [loan, rate, years]);
  const maxBalance = r.schedule[0]?.balance ?? loan;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-7">
        <div>
          <label htmlFor="m-price" className={labelCls}>
            Property price
          </label>
          <input
            id="m-price"
            type="number"
            min={100000}
            step={50000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <Slider label={`Loan · ${ltv}% LTV`} display={sgd(loan)} min={20} max={75} step={5} value={ltv} onChange={setLtv} />
        <Slider label="Interest rate" display={`${rate.toFixed(2)}% p.a.`} min={1.5} max={5.5} step={0.05} value={rate} onChange={setRate} />
        <Slider label="Tenure" display={`${years} years`} min={5} max={30} step={1} value={years} onChange={setYears} />
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label="Monthly Repayment" value={sgd(r.monthly)} />
          <ResultCard
            label="Total Interest"
            value={sgd(r.totalInterest)}
            sub={`Total payable ${sgd(r.totalPayable)}`}
          />
        </div>
      </div>

      <div>
        <p className={labelCls}>Outstanding balance over the tenure</p>
        <div className="rounded-[2px] border border-line bg-canvas-raised p-5 sm:p-7">
          <div className="flex h-56 items-end gap-[3px] sm:h-72">
            {r.schedule.map((row) => (
              <div
                key={row.year}
                className="group relative flex-1 rounded-t-sm bg-gradient-to-t from-gold-deep/70 to-gold transition-colors hover:to-gold-bright"
                style={{ height: `${Math.max(2, (row.balance / maxBalance) * 100)}%` }}
              >
                <span className="pointer-events-none absolute -top-9 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded border border-line bg-surface px-2 py-1 text-[0.6rem] text-cream group-hover:block">
                  Y{row.year} · {sgd(row.balance)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
            <span>Year 1</span>
            <span>Year {years}</span>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
          Illustration only. Actual bank packages vary — Ammar works with private bankers at all
          major lenders and can arrange preferential quotes.
        </p>
      </div>
    </div>
  );
}

// ---------- Affordability ----------

function AffordabilityPanel() {
  const [income, setIncome] = useState(30_000);
  const [debts, setDebts] = useState(2_000);
  const [cash, setCash] = useState(1_000_000);
  const [years, setYears] = useState(30);

  const r = useMemo(
    () => calcAffordability(income, debts, cash, years),
    [income, debts, cash, years],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-7">
        <div>
          <label htmlFor="a-income" className={labelCls}>
            Gross monthly household income
          </label>
          <input
            id="a-income"
            type="number"
            min={0}
            step={1000}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="a-debts" className={labelCls}>
            Existing monthly debt obligations
          </label>
          <input
            id="a-debts"
            type="number"
            min={0}
            step={500}
            value={debts}
            onChange={(e) => setDebts(Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="a-cash" className={labelCls}>
            Cash + CPF available
          </label>
          <input
            id="a-cash"
            type="number"
            min={0}
            step={50000}
            value={cash}
            onChange={(e) => setCash(Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <Slider label="Loan tenure" display={`${years} years`} min={5} max={30} step={1} value={years} onChange={setYears} />
      </div>

      <div className="space-y-4">
        <ResultCard
          label="Estimated Maximum Purchase Price"
          value={sgd(r.maxPurchasePrice)}
          sub={`Binding constraint: ${r.constraint}`}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label="Maximum Loan" value={sgd(r.maxLoan)} />
          <ResultCard label="Max Monthly Payment" value={sgd(r.maxMonthlyPayment)} />
        </div>
        <div className="rounded-[2px] border border-line bg-canvas-raised p-5 text-xs leading-relaxed text-ink-dim">
          <p className="mb-2 text-[0.62rem] uppercase tracking-[0.22em] text-gold">
            How this is computed
          </p>
          MAS rules cap total debt servicing at 55% of gross income (TDSR), stress-tested at{" "}
          {STRESS_RATE}% p.a. regardless of your actual package rate, with bank loans limited to
          75% of the purchase price (LTV). Buyer&apos;s stamp duty is additional — see the Stamp
          Duty tab.
        </div>
      </div>
    </div>
  );
}

// ---------- Stamp duty ----------

const profiles: { id: ResidencyProfile; label: string }[] = [
  { id: "citizen", label: "Singapore Citizen" },
  { id: "pr", label: "Permanent Resident" },
  { id: "foreigner", label: "Foreigner" },
];

function StampDutyPanel() {
  const [price, setPrice] = useState(3_000_000);
  const [profile, setProfile] = useState<ResidencyProfile>("citizen");
  const [count, setCount] = useState(0);

  const bsd = useMemo(() => calcBSD(price), [price]);
  const absd = useMemo(() => calcABSD(price, profile, count), [price, profile, count]);
  const rate = absdRate(profile, count);
  const total = bsd + absd;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-7">
        <div>
          <label htmlFor="s-price" className={labelCls}>
            Purchase price
          </label>
          <input
            id="s-price"
            type="number"
            min={100000}
            step={50000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <span className={labelCls}>Buyer profile</span>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {profiles.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProfile(p.id)}
                className={`rounded-[2px] border px-3 py-3 text-xs transition-all duration-300 ${
                  profile === p.id
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line bg-canvas-raised text-ink-dim hover:border-line-strong hover:text-cream"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className={labelCls}>Residential properties already owned</span>
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                className={`rounded-[2px] border px-3 py-3 text-xs transition-all duration-300 ${
                  count === n
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line bg-canvas-raised text-ink-dim hover:border-line-strong hover:text-cream"
                }`}
              >
                {n === 2 ? "2 or more" : n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <ResultCard
          label="Total Stamp Duty"
          value={sgd(total)}
          sub={`${((total / price) * 100).toFixed(2)}% of the purchase price`}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label="Buyer's Stamp Duty" value={sgd(bsd)} sub="Tiered 1% – 6%" />
          <ResultCard
            label="Additional BSD"
            value={sgd(absd)}
            sub={`${(rate * 100).toFixed(0)}% for this profile`}
          />
        </div>
        <div className="rounded-[2px] border border-line bg-canvas-raised p-5 text-xs leading-relaxed text-ink-dim">
          <p className="mb-2 text-[0.62rem] uppercase tracking-[0.22em] text-gold">Current rates</p>
          BSD (residential, from 15 Feb 2023): 1% on the first S$180K, 2% on the next S$180K, 3%
          to S$1M, 4% to S$1.5M, 5% to S$3M, 6% above. ABSD (from 27 Apr 2023): citizens 0/20/30%,
          PRs 5/30/35%, foreigners 60% flat. Nationals of the US, Switzerland, Liechtenstein,
          Norway and Iceland may qualify for citizen treatment under free trade agreements —
          Ammar can advise.
        </div>
      </div>
    </div>
  );
}

// ---------- Tabs shell ----------

export default function CalculatorTabs() {
  const [active, setActive] = useState<TabId>("mortgage");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Financial calculators"
        className="mb-10 flex w-full gap-1 rounded-full border border-line bg-canvas-raised p-1.5 sm:w-fit"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`relative flex-1 rounded-full px-5 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-300 sm:flex-none sm:px-8 ${
              active === t.id ? "text-canvas" : "text-ink-dim hover:text-cream"
            }`}
          >
            {active === t.id && (
              <motion.span
                layoutId="calc-tab-pill"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {active === "mortgage" && <MortgagePanel />}
          {active === "affordability" && <AffordabilityPanel />}
          {active === "stamp-duty" && <StampDutyPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
