/**
 * Singapore property finance calculations.
 * Rates current as of 2026 — BSD (Feb 2023 schedule), ABSD (Apr 2023 schedule),
 * TDSR 55%, LTV 75%, MAS medium-term stress rate 4%.
 */

// ---------- Mortgage ----------

export interface MortgageResult {
  monthly: number;
  totalInterest: number;
  totalPayable: number;
  schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[];
}

export function calcMortgage(loan: number, annualRatePct: number, years: number): MortgageResult {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRatePct / 100 / 12;
  const monthly = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const schedule: MortgageResult["schedule"] = [];
  let balance = loan;
  let principalPaid = 0;
  let interestPaid = 0;
  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    const principal = monthly - interest;
    balance = Math.max(0, balance - principal);
    principalPaid += principal;
    interestPaid += interest;
    if (m % 12 === 0 || m === n) {
      schedule.push({
        year: Math.ceil(m / 12),
        principalPaid,
        interestPaid,
        balance,
      });
    }
  }

  return {
    monthly,
    totalInterest: monthly * n - loan,
    totalPayable: monthly * n,
    schedule,
  };
}

// ---------- Affordability (TDSR / LTV) ----------

export const TDSR_LIMIT = 0.55;
export const LTV_LIMIT = 0.75;
export const STRESS_RATE = 4.0; // MAS medium-term floor rate for TDSR, % p.a.

export interface AffordabilityResult {
  maxMonthlyPayment: number;
  maxLoan: number;
  maxLoanByLtv: (budget: number) => number;
  maxPurchasePrice: number;
  constraint: "TDSR" | "LTV / cash";
}

export function calcAffordability(
  grossMonthlyIncome: number,
  existingMonthlyDebts: number,
  cashAndCpf: number,
  tenureYears: number,
): AffordabilityResult {
  const maxMonthlyPayment = Math.max(0, grossMonthlyIncome * TDSR_LIMIT - existingMonthlyDebts);

  // Present value of annuity at the stress rate.
  const n = Math.max(1, Math.round(Math.min(tenureYears, 30) * 12));
  const r = STRESS_RATE / 100 / 12;
  const maxLoanByTdsr = maxMonthlyPayment * ((1 - Math.pow(1 + r, -n)) / r);

  // Price ceiling from capital: cash covers the 25% downpayment (ignoring BSD for the headline figure).
  const maxPriceByCash = cashAndCpf / (1 - LTV_LIMIT);
  const maxPriceByTdsr = maxLoanByTdsr + cashAndCpf;

  const constrainedByTdsr = maxPriceByTdsr < maxPriceByCash;
  const maxPurchasePrice = Math.min(maxPriceByTdsr, maxPriceByCash);
  const maxLoan = Math.min(maxLoanByTdsr, maxPurchasePrice * LTV_LIMIT);

  return {
    maxMonthlyPayment,
    maxLoan,
    maxLoanByLtv: (budget: number) => budget * LTV_LIMIT,
    maxPurchasePrice,
    constraint: constrainedByTdsr ? "TDSR" : "LTV / cash",
  };
}

// ---------- Buyer's Stamp Duty ----------

/** Residential BSD tiers effective 15 Feb 2023. */
const BSD_TIERS: { upTo: number; rate: number }[] = [
  { upTo: 180_000, rate: 0.01 },
  { upTo: 360_000, rate: 0.02 },
  { upTo: 1_000_000, rate: 0.03 },
  { upTo: 1_500_000, rate: 0.04 },
  { upTo: 3_000_000, rate: 0.05 },
  { upTo: Infinity, rate: 0.06 },
];

export function calcBSD(price: number): number {
  let duty = 0;
  let prev = 0;
  for (const tier of BSD_TIERS) {
    if (price <= prev) break;
    const taxable = Math.min(price, tier.upTo) - prev;
    duty += taxable * tier.rate;
    prev = tier.upTo;
  }
  return Math.floor(duty);
}

// ---------- Additional Buyer's Stamp Duty ----------

export type ResidencyProfile = "citizen" | "pr" | "foreigner";

/** ABSD rates effective 27 Apr 2023. Index = number of existing residential properties (0, 1, 2+). */
const ABSD_RATES: Record<ResidencyProfile, [number, number, number]> = {
  citizen: [0, 0.2, 0.3],
  pr: [0.05, 0.3, 0.35],
  foreigner: [0.6, 0.6, 0.6],
};

export function calcABSD(price: number, profile: ResidencyProfile, existingProperties: number): number {
  const idx = Math.min(Math.max(existingProperties, 0), 2) as 0 | 1 | 2;
  return Math.floor(price * ABSD_RATES[profile][idx]);
}

export function absdRate(profile: ResidencyProfile, existingProperties: number): number {
  const idx = Math.min(Math.max(existingProperties, 0), 2) as 0 | 1 | 2;
  return ABSD_RATES[profile][idx];
}

// ---------- Formatting ----------

export function sgd(value: number, fractionDigits = 0): string {
  return `S$${value.toLocaleString("en-SG", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}
