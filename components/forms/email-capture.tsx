"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

export function EmailCapture() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    if (typeof email !== "string" || !email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(data?.error || "Unable to subscribe right now.");
      }

      form.reset();
      setStatus("success");
      setMessage("You are in. Watch your inbox for the next drop.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now."
      );
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-gold/25 bg-ink-elevated/80 p-8 shadow-panel md:p-12">
      <div className="absolute inset-0 -z-10 bg-stage-glow opacity-80" aria-hidden />
      <div
        className="absolute -right-24 top-0 -z-10 h-72 w-72 rounded-full bg-gold-gradient opacity-15 blur-3xl"
        aria-hidden
      />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
            Lead Capture
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] text-bone md:text-5xl">
            Get exclusive beats,
            <br />
            <span className="text-gold-gradient">drops, and early access.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/70 md:text-base">
            Join the FTP list for first-listen previews, release alerts, and
            early access when new licenses hit the catalog.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
          <label className="block">
            <span className="sr-only">Email address</span>
            <div
              className={cn(
                "rounded-[24px] border bg-ink/75 p-2 transition backdrop-blur",
                status === "error"
                  ? "border-red-bright"
                  : "border-white/10 focus-within:border-gold/70"
              )}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-white/35 focus:outline-none"
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  disabled={status === "submitting"}
                  className="sm:min-w-[148px]"
                >
                  {status === "submitting" ? "Joining..." : "Join the List"}
                </Button>
              </div>
            </div>
          </label>

          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-widerx",
              status === "error"
                ? "text-red-bright"
                : status === "success"
                  ? "text-gold"
                  : "text-white/45"
            )}
            aria-live="polite"
          >
            {message || "No spam. Just drops, previews, and early access."}
          </p>
        </form>
      </div>
    </div>
  );
}
