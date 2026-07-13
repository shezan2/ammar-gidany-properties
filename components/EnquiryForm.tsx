"use client";

import { useState, type FormEvent } from "react";
import { useLeadSubmit, inputCls, labelCls } from "./useLeadSubmit";
import Button from "./ui/Button";

interface EnquiryFormProps {
  subject: string;
  defaultMessage?: string;
}

export default function EnquiryForm({ subject, defaultMessage = "" }: EnquiryFormProps) {
  const { state, submit } = useLeadSubmit();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: defaultMessage,
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await submit({ type: "enquiry", subject, ...form });
  }

  if (state === "sent") {
    return (
      <div className="rounded-[2px] border border-gold/30 bg-gold/[0.06] p-8 text-center">
        <p className="font-display text-2xl text-gold">Thank you.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">
          Your enquiry is with Ammar directly — expect a personal reply within the hour during
          business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-name" className={labelCls}>
            Name
          </label>
          <input
            id="enq-name"
            required
            value={form.name}
            onChange={set("name")}
            className={inputCls}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="enq-phone" className={labelCls}>
            Phone / WhatsApp
          </label>
          <input
            id="enq-phone"
            value={form.phone}
            onChange={set("phone")}
            className={inputCls}
            placeholder="+65"
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <label htmlFor="enq-email" className={labelCls}>
          Email
        </label>
        <input
          id="enq-email"
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          className={inputCls}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="enq-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="enq-message"
          rows={4}
          value={form.message}
          onChange={set("message")}
          className={`${inputCls} resize-none`}
        />
      </div>
      {state === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong — please try again, or WhatsApp Ammar directly.
        </p>
      )}
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
