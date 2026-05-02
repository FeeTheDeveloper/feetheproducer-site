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
  "mt-2 w-full rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-bone placeholder:text-white/35 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

const labelBase =
  "text-[11px] font-semibold uppercase tracking-widerx text-white/70";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message")
    };

    setStatus("submitting");
    setMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(data?.error || "Unable to send your message.");
      }

      form.reset();
      setStatus("success");
      setMessage("Message received. The FTP team will follow up soon.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to send your message."
      );
    }
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
            className={inputBase}
          />
        </label>

        <label className="block">
          <span className={labelBase}>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@email.com"
            className={inputBase}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelBase}>Service</span>
        <select
          name="service"
          required
          defaultValue=""
          className={cn(inputBase, "appearance-none pr-10")}
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
          placeholder="Tell us about the project, timeline, and sound you need."
          className={cn(inputBase, "resize-none")}
        />
      </label>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="text-[11px] uppercase tracking-widerx text-white/45">
          Routed through the FTP contact workflow and ready for email delivery.
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

      {message ? (
        <div
          className={cn(
            "rounded-2xl border p-4 text-sm",
            status === "success"
              ? "border-gold/40 bg-gold/10 text-gold"
              : "border-red/40 bg-red/10 text-red-ember"
          )}
          aria-live="polite"
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
