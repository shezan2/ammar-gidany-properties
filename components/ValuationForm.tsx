"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLeadSubmit, inputCls, labelCls } from "./useLeadSubmit";
import Button from "./ui/Button";

const districts = [
  "D01 · Boat Quay / Marina",
  "D04 · Sentosa / Harbourfront",
  "D09 · Orchard / River Valley",
  "D10 · Bukit Timah / Holland",
  "D11 · Newton / Novena",
  "D15 · East Coast / Katong",
  "D16 · Bedok / Upper East Coast",
  "D21 · Clementi / Upper Bukit Timah",
  "Other district",
];

const propertyTypes = [
  "Condominium",
  "Penthouse",
  "Terrace / Semi-D",
  "Detached / Bungalow",
  "Good Class Bungalow",
  "HDB",
];

const timelines = [
  "As soon as possible",
  "Within 3 months",
  "Within 6–12 months",
  "Just exploring value",
];

const steps = ["Property", "Details", "Timeline", "Contact"];

interface FormData {
  district: string;
  address: string;
  type: string;
  sqft: string;
  beds: string;
  condition: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

const initial: FormData = {
  district: "",
  address: "",
  type: "",
  sqft: "",
  beds: "",
  condition: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
};

export default function ValuationForm() {
  const { state, submit } = useLeadSubmit();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const pick = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canContinue = () => {
    if (step === 0) return form.district !== "" && form.type !== "";
    if (step === 1) return form.sqft !== "";
    if (step === 2) return form.timeline !== "";
    return form.name !== "" && form.email !== "";
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    await submit({ requestType: "valuation-request", ...form });
  }

  if (state === "sent") {
    return (
      <div className="glass rounded-2xl p-8 text-center sm:p-12">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-gold" strokeWidth="1.8" aria-hidden>
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </span>
        <h3 className="font-display text-3xl text-cream">Your valuation is underway.</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-dim">
          Ammar is pulling the latest comparable transactions for{" "}
          <span className="text-gold">{form.district || "your district"}</span> now. Expect a
          personal, evidence-based valuation within 24 hours — usually much sooner.
        </p>
        <ol className="mx-auto mt-8 max-w-sm space-y-3 text-left text-sm text-ink-dim">
          {[
            "Comparable sales & URA caveats reviewed",
            "Current buyer demand assessed",
            "Your valuation delivered by WhatsApp or email",
          ].map((line, i) => (
            <li key={line} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-[0.65rem] text-gold">
                {i + 1}
              </span>
              {line}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6 sm:p-10">
      {/* Progress */}
      <div className="mb-9">
        <div className="flex justify-between">
          {steps.map((label, i) => (
            <span
              key={label}
              className={`text-[0.6rem] uppercase tracking-[0.22em] ${
                i <= step ? "text-gold" : "text-ink-faint"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="mt-3 h-px w-full bg-line">
          <motion.div
            className="h-px bg-gold"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="v-district" className={labelCls}>
                  Where is the property?
                </label>
                <select
                  id="v-district"
                  value={form.district}
                  onChange={set("district")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Select district
                  </option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="v-address" className={labelCls}>
                  Street / development <span className="normal-case text-ink-faint">(optional)</span>
                </label>
                <input
                  id="v-address"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="e.g. Meyer Road, The Makena"
                  className={inputCls}
                />
              </div>
              <div>
                <span className={labelCls}>Property type</span>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {propertyTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => pick("type", t)}
                      className={`rounded-lg border px-3 py-3 text-xs transition-all duration-300 ${
                        form.type === t
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-line bg-canvas-raised text-ink-dim hover:border-line-strong hover:text-cream"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="v-sqft" className={labelCls}>
                    Approximate size (sqft)
                  </label>
                  <input
                    id="v-sqft"
                    type="number"
                    min={100}
                    value={form.sqft}
                    onChange={set("sqft")}
                    placeholder="e.g. 1,500"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="v-beds" className={labelCls}>
                    Bedrooms
                  </label>
                  <input
                    id="v-beds"
                    type="number"
                    min={0}
                    value={form.beds}
                    onChange={set("beds")}
                    placeholder="e.g. 3"
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <span className={labelCls}>Condition</span>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {["Renovated", "Original", "Partially done", "Needs work"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => pick("condition", c)}
                      className={`rounded-lg border px-3 py-3 text-xs transition-all duration-300 ${
                        form.condition === c
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-line bg-canvas-raised text-ink-dim hover:border-line-strong hover:text-cream"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <span className={labelCls}>When are you thinking of selling?</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {timelines.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => pick("timeline", t)}
                    className={`rounded-xl border p-5 text-left text-sm transition-all duration-300 ${
                      form.timeline === t
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-line bg-canvas-raised text-ink-dim hover:border-line-strong hover:text-cream"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-ink-faint">
                No pressure either way — around a third of Ammar&apos;s valuations are for owners
                who simply want to know where they stand.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="v-name" className={labelCls}>
                  Your name
                </label>
                <input
                  id="v-name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  className={inputCls}
                  autoComplete="name"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="v-email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="v-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="v-phone" className={labelCls}>
                    Phone / WhatsApp <span className="normal-case text-ink-faint">(optional)</span>
                  </label>
                  <input
                    id="v-phone"
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputCls}
                    autoComplete="tel"
                  />
                </div>
              </div>
              <p className="text-xs leading-relaxed text-ink-faint">
                Your details go to Ammar alone — never to a call centre, never sold on.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {state === "error" && (
        <p className="mt-5 text-sm text-red-400">
          Something went wrong — please try again, or WhatsApp Ammar directly.
        </p>
      )}

      <div className="mt-9 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`text-[0.68rem] uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-cream ${
            step === 0 ? "invisible" : ""
          }`}
        >
          ← Back
        </button>
        <Button type="submit" size="lg" disabled={!canContinue() || state === "sending"}>
          {state === "sending"
            ? "Sending…"
            : step === steps.length - 1
              ? "Get My Valuation"
              : "Continue"}
        </Button>
      </div>
    </form>
  );
}
