"use client";

import { useState, type FormEvent } from "react";
import { useLeadSubmit, inputCls } from "./useLeadSubmit";

export default function AlertsSignup({ compact = false }: { compact?: boolean }) {
  const { state, submit } = useLeadSubmit();
  const [email, setEmail] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    await submit({ type: "off-market-alerts", email });
  }

  if (state === "sent") {
    return (
      <p className={`text-sm text-gold ${compact ? "" : "max-w-md"}`}>
        You&apos;re on the list. New and off-market homes will reach your inbox before they reach
        the portals.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`flex w-full gap-2 ${compact ? "" : "max-w-md"}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address for off-market alerts"
        className={inputCls}
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="shrink-0 rounded-[2px] bg-gold px-5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-canvas transition-colors duration-300 hover:bg-gold-bright disabled:opacity-60"
      >
        {state === "sending" ? "…" : "Notify Me"}
      </button>
    </form>
  );
}
