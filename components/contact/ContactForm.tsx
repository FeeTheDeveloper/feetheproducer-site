"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SERVICE_OPTIONS = [
  "Lease a beat",
  "Exclusive buyout",
  "Custom production",
  "Sync / Film / TV placement",
  "Artist collaboration",
  "Brand partnership",
  "Other"
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-bone placeholder:text-white/40 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const labelBase = "text-[11px] font-semibold uppercase tracking-widerx text-white/70";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      (event.target as HTMLFormElement).reset();
    }, 700);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className={labelBase}>Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className={cn(inputBase, "mt-2")}
          />
        </label>
        <label className="block">
          <span className={labelBase}>Email</span>
          <input
            type="email"
            name="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={cn(inputBase, "mt-2")}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelBase}>Artist / Company Name</span>
        <input
          type="text"
          name="artist"
          placeholder="Stage name, label, or brand"
          className={cn(inputBase, "mt-2")}
        />
      </label>

      <label className="block">
        <span className={labelBase}>Service Needed</span>
        <select
          name="service"
          required
          defaultValue=""
          className={cn(inputBase, "mt-2 appearance-none pr-10")}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-ink">
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelBase}>Message</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about the project — vibe, timeline, budget, references."
          className={cn(inputBase, "mt-2 resize-none")}
        />
      </label>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="text-[11px] uppercase tracking-widerx text-white/50">
          We respond within 1–2 business days.
        </p>
        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
      </div>

      {status === "success" ? (
        <div className="rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-gold">
          Message received. We'll be in touch shortly.
        </div>
      ) : null}
    </form>
  );
}
